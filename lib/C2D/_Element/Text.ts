/**
 * 定义文字画面元素组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/Text.ts
 */

/// <reference path="Element.ts" />
/// <reference path="TextPhrase.ts" />
/// <reference path="IPoint.ts" />

namespace C2D {
    import Util = __Bigine_Util;

    export class Text extends Element {
        /**
         * 文本。
         */
        private _t: TextPhrase[];

        /**
         * 对齐方式。
         */
        private _l: Text.Align;

        /**
         * 字体配置（字号，行高，颜色，字间距，字体）。
         */
        private _tf: [number, number, string, number, string];

        /**
         * 阴影配置（横向偏移，纵向偏移，大小，颜色）。
         */
        private _ts: [number, number, number, string];

        /**
         * 当前文本结束位置。
         */
        private _cp: IPoint;

        /**
         * 当前文本行数。
         */
        private _tl: number;

        /**
         * 当前文本首行偏移 offset。
         */
        private _to: number;

        /**
         * 构造函数。
         */
        constructor(x: number, y: number, w: number, h: number, font?: string, size?: number, lineHeight?: number, align?: Text.Align, absolute?: boolean);
        constructor(bounds: IBounds, font?: string, size?: number, lineHeight?: number, align?: Text.Align, absolute?: boolean);
        constructor(x: any, y?: any, w?: any, h?: any, font?: any, size?: any, lineHeight?: any, align?: any, absolute?: boolean) {
            if ('object' == typeof x) {
                super(x, size);
                this._tf = [16, 24, '#000', 0, ''];
                this._tf[0] = 0 | w;
                this._tf[1] = 0 | Math.max(w, h);
                this._tf[2] = x['c'] || '#000';
                this._tf[4] = y || '';
                this._l = font;
                this._cp = { x: x.x, y: x.y };
            } else {
                super(x, y, w, h, absolute);
                this._tf = [16, 24, '#000', 0, ''];
                this._tf[0] = 0 | size;
                this._tf[1] = 0 | Math.max(size, lineHeight);
                this._tf[4] = font || '';
                this._l = align;
                this._cp = { x: x, y: y };
            }
            let aligns: typeof Text.Align = Text.Align;
            switch (this._l) {
                case aligns.Left:
                case aligns.Center:
                case aligns.Right:
                    break;
                default:
                    this._l = aligns.Left;
            }
            this._t = [];
            this._to = 0;
            this._ts = [0, 0, 0, '#000'];
        }

        /**
         * 缩放。
         */
        public s(ratio: number): Text {
            if (1 == ratio)
                return this;
            this._tf[0] = 0 | this._tf[0] * ratio;
            this._tf[1] = 0 | this._tf[1] * ratio;
            this._ts[0] = 0 | this._ts[0] * ratio;
            this._ts[1] = 0 | this._ts[1] * ratio;
            this._ts[2] = 0 | this._ts[2] * ratio;
            return <Text> super.s(ratio);
        }

        /**
         * 绘制。
         */
        public d(context: CanvasRenderingContext2D): CanvasRenderingContext2D | Thenable<CanvasRenderingContext2D> {
            var opacity: number = this.gO(),
                schedules: [number, TextPhrase, number, number][][] = [[]], // width, TextPhrase, offset, length
                line: [number, TextPhrase, number, number][] = schedules[0],
                aligns: typeof Text.Align = Text.Align,
                bounds: IBounds = this.gB(),
                //width: number = bounds.w,
                width: number = bounds.w - this._to,
                m: [number, number], // length, width
                offset: number;
            if (opacity && this._t.length) {
                context.canvas.style.letterSpacing = this._tf[3] + 'px';  // 设置字间距
                Util.each(this._t, (phrase: TextPhrase) => {
                    offset = 0;
                    while (offset != phrase.gL()) {
                        m = phrase.m(context, width, offset);
                        if (m[0]) {
                            line.push([m[1], phrase, offset, m[0]]);
                            width -= m[1];
                            offset += m[0];
                        } else {
                            line = [];
                            schedules.push(line);
                            width = bounds.w;
                        }
                    }
                });
                if (1 != opacity) {
                    context.save();
                    context.globalAlpha = opacity;
                }
                Util.each(schedules, (line2: [number, TextPhrase, number, number][], index: number) => {
                    if (this._l != aligns.Left) {
                        width = 0;
                        Util.each(line2, (section: [number, TextPhrase, number, number]) => {
                            width += section[0];
                        });
                        offset = bounds.w - width;
                        if (this._l == aligns.Center)
                            offset = 0 | offset / 2;
                    } else
                        offset = index == 0 ? this._to : 0; // x
                    offset += bounds.x;
                    width = bounds.y + this._tf[1] * (1 + index); // y
                    Util.each(line2, (section: [number, TextPhrase, number, number]) => {
                        section[1].d(context, offset, width - this._tf[0], section[2], section[3]);
                        offset += section[0];
                    });
                });
                if (1 != opacity)
                    context.restore();
            }
            (<IPoint> this._cp).x = offset;
            (<IPoint> this._cp).y = width;
            this._tl = schedules.length;
            return super.d(context);
        }

        /**
         * 设置字号。
         */
        public tf(size: number, font?: string, lineHeight?: number): Text {
            this._tf[0] = 0 | size;
            this._tf[1] = 0 | Math.max(size, lineHeight);
            this._tf[4] = font || '';
            return this;
        }

        /**
         * 获取字号。
         */
        public gTf(): [number, number, string] {
            let result: [number, number, string] = [0, 0, ''];
            result[0] = this._tf[0];
            result[1] = this._tf[1];
            result[2] = this._tf[4];
            return result;
        }

        /**
         * 设置字间距。
         */
        public tl(letterSpacing: number): Text {
            this._tf[3] = 0 | letterSpacing;
            return this;
        }

        /**
         * 设置颜色。
         */
        public tc(color: string): Text {
            this._tf[2] = color || '#000';
            return this;
        }

        /**
         * 设置当前文本首行偏移 offset。
         */
        public to(offset: number): Text {
            this._to = offset || 0;
            return this;
        }

        /**
         * 获取颜色。
         */
        public gTc(): string {
            return this._tf[2];
        }

        /**
         * 设置阴影。
         */
        public ts(size: number, offsetX?: number, offsetY?: number, color?: string): Text {
            this._ts = [0 | offsetX, 0 | offsetY, 0 | size, color || '#000'];
            return this;
        }

        /**
         * 获取阴影（横向偏移，纵向偏移，大小，颜色）。
         */
        public gTs(): [number, number, number, string] {
            return this._ts;
        }

        /**
         * 添加文字。
         */
        public a(text: TextPhrase): Text {
            this._t.push(text.p(this));
            return <Text> this.f();
        }

        /**
         * 获取文字。
         */
        public gT(): TextPhrase[] {
            return <TextPhrase[]> this._t;
        }

        /**
         * 清空所有已添加文字。
         */
        public c(): Text {
            this._t = [];
            this._tl = 0;
            return <Text> this.f();
        }

        /**
         * 获取光标位置。
         */
        public gCp(): IBounds {
            return <IBounds> this._cp;
        }

        /**
         * 获取文本行数。
         */
        public gTl(): number {
            return this._tl;
        }
    }

    export namespace Text {
        /**
         * 对齐方式。
         */
        export enum Align {
            /**
             * 左对齐。
             */
            Left,
            /**
             * 居中对齐。
             */
            Center,
            /**
             * 右对齐。
             */
            Right
        };
    }
}

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
         * 字体配置（字号，行高，颜色）。
         */
        private _tf: [number, number, string];

        /**
         * 阴影配置（横向偏移，纵向偏移，大小，颜色）。
         */
        private _ts: [number, number, number, string];

        /**
         * 构造函数。
         */
        constructor(x: number, y: number, w: number, h: number, size?: number, lineHeight?: number, align?: Text.Align, absolute?: boolean);
        constructor(bounds: IBounds, size?: number, lineHeight?: number, align?: Text.Align, absolute?: boolean);
        constructor(x: any, y?: any, w?: any, h?: any, size?: any, lineHeight?: any, align?: any, absolute?: boolean) {
            this._t = [];
            this._tf = [16, 24, '#000'];
            this._ts = [0, 0, 0, '#000'];
            if ('object' == typeof x) {
                super(x, size);
                this._tf[0] = 0 | y;
                this._tf[1] = 0 | Math.max(y, w);
                this._l = h;
            } else {
                super(x, y, w, h, absolute);
                this._tf[0] = 0 | size;
                this._tf[1] = 0 | Math.max(size, lineHeight);
                this._l = align;
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
                width: number = bounds.w,
                m: [number, number], // length, width
                offset: number;
            if (opacity && this._t.length) {
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
                        offset = 0; // x
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
            return super.d(context);
        }

        /**
         * 设置字号。
         */
        public tf(size: number, lineHeight?: number): Text {
            this._tf[0] = 0 | size;
            this._tf[1] = 0 | Math.max(size, lineHeight);
            return this;
        }

        /**
         * 获取字号。
         */
        public gTf(): [number, number] {
            return <[number, number]> this._tf.slice(0, 2);
        }

        /**
         * 设置颜色。
         */
        public tc(color: string): Text {
            this._tf[2] = color || '#000';
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
            return <Text> this.f();
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

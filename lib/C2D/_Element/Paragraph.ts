/**
 * 定义文字段落画面元素组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2017 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/Paragraph.ts
 */

/// <reference path="Element.ts" />
/// <reference path="Phrase.ts" />

namespace C2D {
    import Util = __Bigine_Util;

    export class Paragraph extends Element {
        /**
         * 字体配置（字号，行高，颜色，字间距，字体）。
         */
        private _tf: [number, number, string, number, string];

        /**
         * 文本。
         */
        private _t: Phrase[];

        /**
         * 阴影配置（横向偏移，纵向偏移，大小，颜色）。
         */
        private _ts: [number, number, number, string];

        /**
         * 当前文本首行偏移 offset。
         */
        private _to: number;

        /**
         * 构造函数。
         */
        constructor(x: number, y: number, w: number, h: number, font?: string, size?: number, lineHeight?: number, absolute?: boolean);
        constructor(bounds: IBounds, font?: string, size?: number, lineHeight?: number, absolute?: boolean);
        constructor(x: any, y?: any, w?: any, h?: any, font?: any, size?: any, lineHeight?: any, absolute?: boolean) {
            if ('object' == typeof x) {
                super(x, font);
                this._tf = [16, 24, '#000', 0, ''];
                this._tf[0] = 0 | w;
                this._tf[1] = 0 | Math.max(w, h);
                this._tf[2] = x['c'] || '#000';
                this._tf[3] = x['ls'] || 0;
                this._tf[4] = y || '';
            } else {
                super(x, y, w, h, absolute);
                this._tf = [16, 24, '#000', 0, ''];
                this._tf[0] = 0 | size;
                this._tf[1] = 0 | Math.max(size, lineHeight);
                this._tf[4] = font || '';
            }
            this._t = [];
            this._ts = [0, 0, 0, '#000'];
            this._to = 0;
        }

        /**
         * 缩放。
         */
        public s(ratio: number): Paragraph {
            if (1 == ratio)
                return this;
            this._tf[0] = 0 | this._tf[0] * ratio;
            this._tf[1] = 0 | this._tf[1] * ratio;
            this._ts[0] = 0 | this._ts[0] * ratio;
            this._ts[1] = 0 | this._ts[1] * ratio;
            this._ts[2] = 0 | this._ts[2] * ratio;
            return <Paragraph> super.s(ratio);
        }

        /**
         * 绘制。
         */
        public d(context: CanvasRenderingContext2D): CanvasRenderingContext2D | Thenable<CanvasRenderingContext2D> {
            var opacity: number = this.gO(),
                bounds: IBounds = this.gB(),
                x: number = this._to || bounds.x,
                y: number = bounds.y;
            if (opacity && this._t.length) {
                if (1 != opacity) {
                    context.save();
                    context.globalAlpha = opacity;
                }
                Util.each(this._t, (phrase: Phrase) => {
                    var pnt: IPoint = phrase.d(context, x, y);
                    x = pnt.x;
                    y = pnt.y;
                });
                if (1 != opacity)
                    context.restore();
            }
            return super.d(context);
        }

        /**
         * 获取末尾文字坐标。
         */
        public gP(context: CanvasRenderingContext2D): IPoint {
            var bounds: IBounds = this.gB(),
                x: number = this._to || bounds.x,
                y: number = bounds.y;
            Util.each(this._t, (phrase: Phrase) => {
                var pnt: IPoint = phrase.d(context, x, y);
                x = pnt.x;
                y = pnt.y;
            });
            return <IPoint> {x: x, y: y};
        }

        /**
         * 添加文字。
         */
        public a(phrase: Phrase): Paragraph {
            this._t.push(phrase.p(this));
            return <Paragraph> this.f();
        }

        /**
         * 获取文字。
         */
        public gT(): Phrase[] {
            return <Phrase[]> this._t;
        }

        /**
         * 清空所有已添加文字。
         */
        public c(): Paragraph {
            this._t = [];
            return <Paragraph> this.f();
        }

        /**
         * 获取字号。
         */
        public gTf(): [number, number, string, number, string] {
            return this._tf;
        }

        /**
         * 获取阴影（横向偏移，纵向偏移，大小，颜色）。
         */
        public gTs(): [number, number, number, string] {
            return this._ts;
        }

        /**
         * 设置当前文本首行偏移 offset。
         */
        public to(offset: number): Paragraph {
            this._to = offset || 0;
            return this;
        }
    }
}

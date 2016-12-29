/**
 * 定义线性圆角色块画面元素组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/ColorLinear.ts
 */

/// <reference path="Element.ts" />

namespace C2D {
    import Util = __Bigine_Util;

    export class ColorLinear extends Element {
        /**
         * [颜色值、位置]集合。
         */
        private _d: [string, number][];

        /**
         * 圆角弧长度。
         */
        private _ra: number;

        /**
         * 构造函数。
         */
        constructor(x: number, y: number, w: number, h: number, color: [string, number][], radius?: number, absolute?: boolean);
        constructor(bounds: IBounds, color: [string, number][], radius?: number, absolute?: boolean);
        constructor(x: any, y: any, w?: any, h?: any, color?: any, radius?: number, absolute?: boolean) {
            if ('object' == typeof x) {
                super(x, w);
                this._d = y;
                this._ra = color || 0;
            } else {
                super(x, y, w, h, absolute);
                this._d = color;
                this._ra = radius || 0;
            }
        }

        /**
         * 绘制。
         */
        public d(context: CanvasRenderingContext2D): CanvasRenderingContext2D | Thenable<CanvasRenderingContext2D> {
            var opacity: number = this.gO();
            if (opacity) {
                context.save();
                context.globalAlpha = opacity;
                var bounds: IBounds = this.gB();
                var gradient: CanvasGradient = context.createLinearGradient(bounds.x, bounds.y, bounds.x + bounds.w, bounds.y);
                Util.each(this._d, (color: [string, number]) => {
                    gradient.addColorStop(color[1], color[0]);
                });
                context.fillStyle = gradient;
                if (this._ra) {
                    context.beginPath();
                    context.moveTo(bounds.x + this._ra, bounds.y);
                    context.arcTo(bounds.x + bounds.w, bounds.y, bounds.x + bounds.w, bounds.y + bounds.h, this._ra);
                    context.arcTo(bounds.x + bounds.w, bounds.y + bounds.h, bounds.x, bounds.y + bounds.h, this._ra);
                    context.arcTo(bounds.x, bounds.y + bounds.h, bounds.x, bounds.y, this._ra);
                    context.arcTo(bounds.x, bounds.y, bounds.x + this._ra, bounds.y, this._ra);
                    context.stroke();
                    context.fill();
                } else {
                    context.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);
                }
                context.restore();
            }
            return super.d(context);
        }

        /**
         * 设置线性颜色。
         */
        public sD(color: [string, number][]): ColorLinear {
            this._d = color;
            if (!this.gO())
                return this;
            return <ColorLinear> this.f();
        }

        /**
         * 获取名称。
         */
        public gN(): string {
            return 'ColorLinear';
        }
    }
}

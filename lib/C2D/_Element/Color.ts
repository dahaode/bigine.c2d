/**
 * 定义色块画面元素组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/Color.ts
 */

/// <reference path="Element.ts" />

namespace C2D {
    export class Color extends Element {
        /**
         * 颜色值。
         */
        private _d: string;

        /**
         * 构造函数。
         */
        constructor(x: number, y: number, w: number, h: number, color: string, absolute?: boolean);
        constructor(bounds: IBounds, color: string, absolute?: boolean);
        constructor(x: any, y: any, w?: any, h?: any, color?: any, absolute?: boolean) {
            if ('object' == typeof x) {
                super(x, w);
                this._d = y;
            } else {
                super(x, y, w, h, absolute);
                this._d = color;
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
                context.fillStyle = this._d;
                context.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);
                context.restore();
            }
            return super.d(context);
        }

        /**
         * 获取名称。
         */
        public gN(): string {
            return 'Color';
        }
    }
}

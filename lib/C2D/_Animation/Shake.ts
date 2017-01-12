/**
 * 定义抖动镜头动画组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/Shake.ts
 */

/// <reference path="Animation.ts" />
/// <reference path="../_Element/Element.ts" />

namespace C2D {
    export class Shake extends Animation {
        /**
         * 原始 X 座标。
         */
        private _x: number;

        /**
         * 原始 Y 座标。
         */
        private _y: number;

        /**
         * 构造函数。
         */
        constructor(duration: number) {
            super(duration || 500);
        }

        /**
         * 帧执行。
         */
        protected $p(element: Element, elpased: number): void {
            if (1 == elpased) {
                var bounds: IBounds = element.gB();
                this._x = bounds.x;
                this._y = bounds.y;
            }

            if (this._d == elpased) {
                element.x(this._x)
                    .y(this._y);
            } else {
                var mod: number = elpased % 4,
                    rector: number = 3;
                switch (mod) {
                    case 1:
                        element.x(this._y + rector);
                        break;
                    case 2:
                        element.y(this._x + rector);
                        break;
                    case 3:
                        element.x(this._x);
                        break;
                    default:
                        element.y(this._y);
                        break;
                }
            }
        }
    }
}

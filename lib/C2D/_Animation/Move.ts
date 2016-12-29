/**
 * 定义位移动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/Move.ts
 */

/// <reference path="Animation.ts" />
/// <reference path="IMoveMetas.ts" />
/// <reference path="../_Element/Element.ts" />

namespace C2D {
    export class Move extends Animation {
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
        constructor(duration: number, metas: IMoveMetas) {
            super(duration, metas);
        }

        /**
         * 帧执行。
         */
        protected $p(element: Element, elpased: number): void {
            if (elpased % 2) {
                if (1 == elpased) {
                    var bounds: IBounds = element.gB();
                    this._x = bounds.x;
                    this._y = bounds.y;
                }
                element.x(((<IMoveMetas> this._m).x - this._x) * elpased / this._d + this._x)
                    .y(((<IMoveMetas> this._m).y - this._y) * elpased / this._d + this._y);
            }
        }

        /**
         * 中止。
         */
        public $h(): void {
            this._t.x(this._m['x'])
                .y(this._m['y']);
        }
    }
}

/**
 * 定义位移动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/Progress.ts
 */

/// <reference path="Animation.ts" />
/// <reference path="IProgressMetas.ts" />
/// <reference path="../_Element/Element.ts" />

namespace C2D {
    export class Progress extends Animation {
        /**
         * 构造函数。
         */
        constructor(duration: number, metas: IProgressMetas) {
            super(duration, metas);
        }

        /**
         * 帧执行。
         */
        protected $p(element: Element, elpased: number): void {
            element.x((elpased / this._d - 1) * this._m['width']);
        }

        /**
         * 中止。
         */
        public $h(): void {
            this._t.x(0);
        }
    }
}

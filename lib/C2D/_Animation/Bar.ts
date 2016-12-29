/**
 * 定义进度条动画组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/Bar.ts
 */

/// <reference path="Animation.ts" />
/// <reference path="../_Element/ColorLinear.ts" />

namespace C2D {
    import Util = __Bigine_Util;
    export class Bar extends Animation {
		/**
		 * 构造函数。
		 */
        constructor(color: Util.IHashTable<any>) {
            super(Infinity, color);
        }

        /**
         * 帧执行。
         */
        protected $p(element: Element, elpased: number): void {
            if (!(elpased % 8)) {
                this._m[1][1] = ((elpased / 8) % 11) / 10;
                (<ColorLinear> element).sD(<[string, number][]> this._m);
            }
        }
    }
}

/**
 * 定义 Gif 动画组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/Gif.ts
 */

/// <reference path="Animation.ts" />
/// <reference path="../_Element/Sprite.ts" />
/// <reference path="../_Element/Image.ts" />

namespace C2D {
    export class Gif extends Animation {
        /**
         * GIF 动画资源集合。
         */
    	private _x: any[];

        /**
         * 记录上一帧图片。
         */
    	private _f: Image;

		/**
		 * 构造函数。
		 */
        constructor(rr: any[], bound: IBounds) {
            super(Infinity, bound);
            this._x = rr;
        }

        /**
         * 帧执行。
         */
        protected $p(element: Element, elpased: number): void {
        	if (!(elpased % 3)) {
	        	let index: number = (elpased / 3) % this._x.length;
	        	if (elpased / 3 != 1) (<Sprite> element).e(this._f);
	        	this._f = new Image(this._x[index].o(), <IBounds> this._m);
	        	(<Sprite> element).a(this._f);
	        }
        }
    }
}

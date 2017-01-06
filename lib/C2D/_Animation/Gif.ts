/**
 * 定义 Gif 动画组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/Gif.ts
 */

/// <reference path="Animation.ts" />
/// <reference path="IGifMetas.ts" />
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
        constructor(rr: any[], metas: IGifMetas) {
            super(Infinity, metas);
            this._x = rr;
        }

        /**
         * 帧执行。
         */
        protected $p(element: Element, elpased: number): void {
            let interval: number = this._m['interval'];
        	if (!(elpased % interval)) {
	        	let index: number = (elpased / interval) % this._x.length;
	        	if (elpased / interval != 1) (<Sprite> element).e(this._f);
	        	this._f = new Image(this._x[index].o(), <IBounds> this._m['bound']);
	        	(<Sprite> element).a(this._f);
	        }
        }
    }
}

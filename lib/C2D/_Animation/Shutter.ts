/**
 * 定义百叶窗渐变动画组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/Shutter.ts
 */

/// <reference path="Animation.ts" />
/// <reference path="IShutterMetas.ts" />
/// <reference path="../_Element/Image.ts" />
/// <reference path="../_Element/Stage.ts" />

namespace C2D {
    import Util = __Bigine_Util;

    export class Shutter extends Animation {
        /**
         * 创建的临时叶片数组。
         */
        private _cs: Image[];

        /**
         * 构造函数。
         */
        constructor(duration: number, metas: IShutterMetas) {
            super(duration, metas);
            this._cs = [];
        }

        /**
         * 帧执行。
         */
        protected $p(element: Element, elpased: number): void {
            let count: number = 10,
                maxH: number = Math.round(720 / count),
                maxW: number = Math.round(1280 / count),
                //parent: Stage = <Stage> (<Component> element).$p(),
                room: Element = (<Sprite> element).q('n')[0],
                metas: IShutterMetas = <IShutterMetas> this._m;
            switch (elpased) {
                case 1:
                    this._cs = [];
                    room.o(0);
                    element.o(1);
                    for (var i: number = 0; i < count; i++) {
                        let bound: IBounds = metas.direction == 'H' ?
                            { x: 0, y: maxH * i, w: 1280, h: Math.ceil(maxH / this._d) } :
                            { x: maxW * i, y: 0, w: Math.ceil(maxW / this._d), h: 720 },
                            image: Image = new Image((<Image> room).$d(), bound, false, true);
                        (<Component> element).a(image, room, 1);
                        this._cs.push(image);
                    }
                    break;

                case this._d:
                    room.o(1);
                    Util.each(this._cs, (image: Image) => {
                        (<Component> element).e(image);
                    });
                    this._cs = [];
                    break;

                default:
                    Util.each(this._cs, (image: Image) => {
                        metas.direction == 'H' ?
                            image.sH(Math.ceil(maxH / this._d * elpased)) :
                            image.sW(Math.ceil(maxW / this._d * elpased));
                    });
                    break;
            }
        }
    }
}

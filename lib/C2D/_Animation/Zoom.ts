/**
 * 定义放大缩小镜头动画组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/Zoom.ts
 */

/// <reference path="Animation.ts" />
/// <reference path="IZoomMetas.ts" />
/// <reference path="../_Element/Element.ts" />

namespace C2D {
    export class Zoom extends Animation {
        /**
         * 原始 IBounds。
         */
        private _b: IBounds;

        /**
         * 构造函数。
         */
        constructor(duration: number, metas: IZoomMetas) {
            super(duration, metas);
        }

        /**
         * 帧执行。
         */
        protected $p(element: Element, elpased: number): void {
            if (1 == elpased)
                this._b = element.gB();
            let metas: IZoomMetas = <IZoomMetas> this._m,
                scale: number = metas.scale,
                px: number = scale * (5 / 3 - 1) * 1280 / this._d,
                py: number = scale * (5 / 3 - 1) * 720 / this._d;
            element.x(Math.round(this._b.x - metas.mx * px * elpased))
                .y(Math.round(this._b.y - metas.my * py * elpased))
                .sW(Math.round(this._b.w + px * elpased))
                .sH(Math.round(this._b.h + py * elpased));
        }

        /**
         * 中止。
         */
        public $h(): void {
            let metas: IZoomMetas = <IZoomMetas> this._m,
                px: number = metas.scale * (5 / 3 - 1) * 1280,
                py: number = metas.scale * (5 / 3 - 1) * 720;
            this._t.x(Math.round(this._b.x - metas.mx * px))
                .y(Math.round(this._b.y - metas.my * py))
                .sW(Math.round(this._b.w + px))
                .sH(Math.round(this._b.h + py));
        }
    }
}

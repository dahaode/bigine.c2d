/**
 * 定义雨雪动画组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/Dropping.ts
 */

/// <reference path="Animation.ts" />
/// <reference path="IDroppingMetas.ts" />
/// <reference path="../_Element/Drop.ts" />
/// <reference path="../_Element/Bounce.ts" />

namespace C2D {
    const DROP_CHANCE: number = 0.4;  // 创建drop的几率

    export class Dropping extends Animation {
        /**
         * 雨雪动画显示父组件容器。
         */
        private _g: Component;

        /**
         * 父组件容器的绘制缓存 canvas。
         */
        private _f: CanvasRenderingContext2D;

        /**
         * 下落粒子集合。
         */
        private _r: Array<Drop>;

        /**
         * 回弹粒子集合。
         */
        private _n: Array<Bounce>;

        /**
         * 构造函数。
         */
        constructor(duration: number, metas: IDroppingMetas) {
            super(duration, metas);
            this._r = [];
            this._n = [];
            this._g = null;
            this._f = null;
        }

        /**
         * 帧执行。
         */
        protected $p(element: Element, elpased: number): void {
            var h: number = 720,
                i: number = this._r.length,
                metas: IDroppingMetas = <IDroppingMetas> this._m;
            if (elpased == 1) {
                this._g = new Component({}, true);
                this._f = this._g.gC().getContext('2d');
                (<Sprite> this._g).o(1);
                (<Sprite> element).a(this._g, 'F');
                if (metas.type == "rain") {
                    this._f.lineWidth = 1;
                    this._f.strokeStyle = 'rgba(223, 223, 223, 0.6)';
                    this._f.fillStyle = 'rgba(223, 223, 223, 0.6)';
                } else {
                    this._f.lineWidth = 2;
                    this._f.strokeStyle = 'rgba(254, 254, 254, 0.8)';
                    this._f.fillStyle = 'rgba(254, 254, 254, 0.8)';
                }
            }
            this._f.clearRect(0, 0, 1280, h);
            while (i--) {
                var drop: Drop = this._r[i];
                drop.u();
                if (drop.gV('y') >= h) {
                    if (metas.hasBounce) {
                        var n: number = Math.round(4 + Math.random() * 4);
                        while (n--)
                            this._n.push(new Bounce(drop.gV('x'), h));
                    }
                    this._r.splice(i, 1);
                }
                drop.d(this._f);
            }
            if (metas.hasBounce) {
                i = this._n.length;
                while (i--) {
                    var bounce: Bounce = this._n[i];
                    bounce.u(metas.gravity);
                    bounce.d(this._f);
                    if (bounce.gV('y') > h)
                        this._n.splice(i, 1);
                }
            }
            if (this._r.length < metas.maxNum) {
                if (Math.random() < DROP_CHANCE) {
                    i = 0;
                    var len: number = metas.numLevel;
                    for (; i < len; i++) {
                        this._r.push(new Drop(this._m));
                    }
                }
            }
            this._g.uc(true);
        }

        /**
         * 立即中止。
         */
        public $h(): void {
            this._r = [];
            this._n = [];
            this._f = null;
            this._g.$p().e(this._g);
        }
    }
}

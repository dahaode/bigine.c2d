/**
 * 定义组件组合元素。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/Component.ts
 */

/// <reference path="Element.ts" />
/// <reference path="Context.ts" />

namespace C2D {
    import Util = __Bigine_Util;

    export class Component extends Sprite {
        /**
         * 设置主题配置集合。
         */
        protected _tm: Util.IHashTable<any>;

        /**
         * 是否初始化。
         */
        protected _pi: boolean;

        /**
         * Component 中的 Canvas 缓存。
         */
        private _cw: CanvasRenderingContext2D;

        /**
         * 缓存是否发生变更。
         */
        private _uc: boolean;

        constructor(theme?: Util.IHashTable<any>, transparent?: boolean, bound?: IBounds) {
            let w: number = bound ? bound.w : 1280,
                h: number = bound ? bound.h : 720,
                canvas: HTMLCanvasElement = document.createElement('canvas');
            super(0, 0, w, h, transparent);
            canvas.width = w;
            canvas.height = h;
            this._cw = canvas.getContext('2d');
            this._tm = theme;
            this._pi =
            this._uc = false;
            this.o(0);
        }

        /**
         * 第一次绘制 Lazy Draw。
         */
        protected pI(): Component {
            this._pi = true;
            return this;
        }

        /**
         * 发生变更。
         */
        public f(child?: Element): Component {
            Context.pC(() => this.cache());
            return this;
            //return <Component> super.f(child);
        }

        /**
         * 获取 Component 缓存。
         */
        public gC(): HTMLCanvasElement {
            return this._cw.canvas;
        }

        /**
         * 缓存是否发生变更。
         */
        public uc(uc?: boolean): boolean {
            if (uc != undefined) this._uc = uc;
            return this._uc;
        }

        /**
         * 计算 Canvas 绘制缓存。
         */
        private cache(/*child?: Element*/): Promise<CanvasRenderingContext2D> {
            return new Promise<CanvasRenderingContext2D>((resolve: (canvas: CanvasRenderingContext2D) => CanvasRenderingContext2D) => {
                var w: number = 1280,
                    h: number = 720,
                    opacity: number = this.gO(),
                    context: CanvasRenderingContext2D = Context.gC();
                if (!opacity || !this._d.length) {
                    this._cw.clearRect(0, 0, w, h);
                    // super.f(child);
                    // this._f = false;
                    this._uc = true;
                    resolve(context);
                } else {
                    if (1 != opacity) {
                        context.save();
                        context.globalAlpha = opacity;
                    }
                    context.clearRect(0, 0, w, h);
                    Util.Q.every(this._d, (el: Element) => el.d(context))
                        .then(() => {
                            if (1 != opacity)
                                context.restore();
                            this._cw.clearRect(0, 0, w, h);
                            this._cw.drawImage(context.canvas, 0, 0, w, h);
                            // super.f(child);
                            // this._f = false;
                            this._uc = true;
                            resolve(context);
                        });
                }
            });
        }
    }
}

/**
 * 定义抽象画面动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/Animation.ts
 */

/// <reference path="../../../include/mozRequestAnimationFrame.d.ts" />
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="ACenter.ts" />

namespace C2D {
    import Util = __Bigine_Util;

    export class Animation {
        /**
         * 动画时长（单位：帧）。
         */
        protected _d: number;

        /**
         * 元信息。
         */
        protected _m: Util.IHashTable<any>;

        /**
         * 链。
         */
        protected _c: Animation[];

        /**
         * 循环次数。
         */
        protected _l: number;

        /**
         * 是否已播放。
         */
        protected _p: boolean;

        /**
         * 是否已中止。
         */
        protected _h: boolean;

        /**
         * 对象。
         */
        protected _t: any;

        /**
         * 暂停。
         */
        protected _w: boolean;

        /**
         * 序号。
         */
        protected _i: number;

        /**
         * 构造函数。
         */
        constructor(duration: number, metas?: Util.IHashTable<any>) {
            this._d = Math.round(duration * 60 / 1000);
            this._m = metas || {};
            this._c = [];
            this._l = 1;
            this._p =
            this._h =
            this._w = false;
            this._i = ACenter.a(this);
        }

        /**
         * 链式动画。
         */
        public c(next: Animation): Animation {
            this._c.push(next);
            return this;
        }

        /**
         * 循环。
         */
        public l(times?: number): Animation {
            this._l = times || Infinity;
            return this;
        }

        /**
         * 执行。
         */
        public p(element: any): Promise<any> {
            let r: Promise<any> = Promise.resolve(element),
                counter: number = 0,
                once: () => Promise<any> = () => {
                    if (this._h)
                        return r;
                    return new Promise((resolve: (value: any) => void) => {
                        let index: number = 0,
                            done: () => void = () => {
                                if (!this._h) {
                                    if ('k' in element) element.k(null);
                                    this._h = true;
                                }
                                resolve(element);
                            },
                            task: FrameRequestCallback = (time: number) => {
                                if (this._h || index >= this._d)
                                    return done();
                                if (!this._w)
                                    this.$p(element, ++index, done);
                                Animation.f(task);
                            };
                        Animation.f(task);
                    }).then(() => {
                        if (!this._h && ++counter < this._l)
                            return once();
                        return element;
                    });
                },
                q: Promise<any>;
            if (this._p || this._h)
                return r;
            this._p = true;
            this._t = element;
            q = once();
            q.then(() => {
                ACenter.d(this._i);
            });
            if (!this._c.length)
                return q;
            return q.then(() => Util.Q.every(this._c, (anime: Animation) => anime.p(element)));
        }

        /**
         * 帧执行。
         */
        protected $p(element: any, elpased: number, done: () => void): void {
            //
        }

        /**
         * 中止。
         */
        public h(): Animation {
            if (this._h)
                return this;
            this._h = true;
            if ('k' in this._t)
                this._t.k(null);
            this.$h();
            Util.each(this._c, (anime: Animation) => {
                anime.h();
            });
            return this;
        }

        /**
         * 中止处理。
         */
        protected $h(): void {
            //
        }

        /**
         * 暂停。
         */
        public w(): Animation {
            this._w = true;
            return this;
        }

        /**
         * 恢复播放。
         */
        public r(): Animation {
            this._w = false;
            return this;
        }

        /**
         * 获取暂停状态。
         */
        public gW(): boolean {
            return this._w;
        }

        /**
         * 获取编号。
         */
        public gI(): number {
            return this._i;
        }
    }

    export namespace Animation {
        let raf: typeof window.requestAnimationFrame,
            jobs: FrameRequestCallback[] = [],
            proxy: FrameRequestCallback = (time: number) => {
                Util.each(jobs.splice(0, jobs.length), (callback: FrameRequestCallback) => {
                    callback(time);
                });
                raf(proxy);
            },
            elapsed: number = 0,
            size: number;

        if (Util.ENV.Window) {
            raf = window.requestAnimationFrame ||
                window.msRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame;
            if (raf) {
                raf(proxy);
            } else
                setInterval(() => {
                    elapsed += 5;
                    size = jobs.length;
                    if ((1 + elapsed % 50) % 3 || !size) return;
                    Util.each(jobs.splice(0, size), (callback: FrameRequestCallback) => {
                        callback(elapsed);
                    });
                }, 5);
        }

        /**
         * 帧处理。
         */
        export function f(callback: FrameRequestCallback, draw?: boolean): void {
            if (draw) {
                jobs.unshift(callback);
            } else
                jobs.push(callback);
        }
    }
}

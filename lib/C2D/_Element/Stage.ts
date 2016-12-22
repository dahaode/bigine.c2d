/**
 * 定义全画面舞台组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/Stage.ts
 */

/// <reference path="Sprite.ts" />
/// <reference path="../_Event/SpriteFocusEvent.ts" />
/// <reference path="../_Event/SpriteBlurEvent.ts" />
/// <reference path="../_Event/SpriteMouseMoveEvent.ts" />
/// <reference path="../_Event/SpriteClickEvent.ts" />
/// <reference path="Context.ts" />
/// <reference path="Component.ts" />

namespace C2D {
    import Util = __Bigine_Util;

    export class Stage extends Sprite {
        /**
         * 画板上下文。
         */
        private _c: CanvasRenderingContext2D;

        /**
         * 缩放比例（DOM 座标至内部座标转换系数）。
         */
        private _z: number;

        /**
         * 绑定视图。
         */
        private _v: HTMLElement;

        /**
         * DOM 事件处理函数集合。
         */
        private _h: ((event: MouseEvent) => void)[];

        /**
         * 鼠标事件元信息。
         */
        private _m: IMouseEventMetas;

        /**
         * 鼠标座标对应组合元素树。
         */
        private _e: Sprite[];

        /**
         * 是否正在绘制中。
         */
        private _n: boolean;

        /**
         * 真实绘制画板上下文。
         */
        private _w: CanvasRenderingContext2D;

        /**
         * 绘制画板中间缓存。
         */
        private _g: CanvasRenderingContext2D;

        /**
         * 缓存是否发生变更。
         */
        private _u: boolean;

        /**
         * 构造函数。
         */
        constructor(context: CanvasRenderingContext2D) {
            let canvas: HTMLCanvasElement = context.canvas,
                shadow: HTMLCanvasElement = document.createElement('canvas'),
                middle: HTMLCanvasElement = document.createElement('canvas'),
                parent: Node = canvas.parentNode,
                w: number = canvas.width,
                h: number = canvas.height;
            shadow.width = middle.width = w;
            shadow.height = middle.height = h;
            parent.appendChild(Context.gC(true).canvas);
            super(0, 0, w, h, false, true);
            this._c = context;
            this.z();
            this._m = {
                target: this,
                x: 0,
                y: 0,
                from: this,
                fromX: 0,
                fromY: 0,
                stage: this
            };
            this._h = [
                (event: MouseEvent) => {
                    event.stopPropagation();
                    let sprites: Sprite[][] = this.$s(event.offsetX * this._z, event.offsetY * this._z),
                        ev: SpriteMouseEvent;
                    if (sprites[0].length) {
                        ev = new SpriteFocusEvent(this._m);
                        Util.each(sprites[0], (element: Sprite) => {
                            element.dispatchEvent(ev);
                        });
                    }
                    if (sprites[2].length) {
                        ev = new SpriteBlurEvent(this._m);
                        Util.each(sprites[2], (element: Sprite) => {
                            element.dispatchEvent(ev);
                        });
                    }
                    if (sprites[1].length) {
                        ev = new SpriteMouseMoveEvent(this._m);
                        Util.each(sprites[1], (element: Sprite) => {
                            element.dispatchEvent(ev);
                        });
                    }
                    return false;
                },
                (event: MouseEvent) => {
                    this.$c();
                }
            ];
            this._e = [];
            this._u = false;
            this._n = false;
            this._w = shadow.getContext('2d');
            this._g = middle.getContext('2d');
            this.b(context.canvas);
            Stage.f(this.$d.bind(this));
            Stage.f(() => {
                if (this._u) {
                    this._c.clearRect(0, 0, w, h);
                    this._c.drawImage(this._g.canvas, 0, 0, w, h);
                    this._u = false;
                }
            });
        }

        /**
         * 移动 X 轴座标。
         */
        public x(distance: number): Stage {
            return this;
        }

        /**
         * 移动 Y 轴座标。
         */
        public y(distance: number): Stage {
            return this;
        }

        /**
         * 缩放。
         */
        public s(ratio: number): Stage {
            return this;
        }

        /**
         * 旋转。
         */
        public r(degrees: number): Stage {
            return this;
        }

        /**
         * 计算缩放比例。
         */
        public z(): Stage {
            var canvas: HTMLCanvasElement = this._c.canvas;
            this._z = canvas.width / canvas.scrollWidth;
            return this;
        }

        /**
         * 绘制。
         */
        public d(): Promise<CanvasRenderingContext2D> {
            if (this._n)
                return Promise.resolve(this._c);
            let w: number = 1280,
                h: number = 720;
            return Promise.all(this.$r())
                .then(() => {
                    this._n = true;
                    this._w.clearRect(0, 0, w, h);
                    return Util.Q.every(this._d, (element: Element, index: number) => {
                        if (element.gO())
                            this._w.drawImage((<Component> element).gC(), 0, 0, w, h);
                        return this._w;
                    });
                }).then(() => {
                    this._g.clearRect(0, 0, w, h);
                    this._g.drawImage(this._w.canvas, 0, 0, w, h);
                    this._u = true;
                    this._n = false;
                    return this._g;
                });
        }

        /**
         * 绑定视图。
         */
        public b(viewport: HTMLElement): Stage {
            if (this._v) {
                this._v.removeEventListener('mousemove', this._h[0]);
                this._v.removeEventListener('click', this._h[1]);
            }
            this._v = viewport;
            this._v.addEventListener('mousemove', this._h[0]);
            this._v.addEventListener('click', this._h[1]);
            return this;
        }

        /**
         * 模拟点击。
         */
        public t(x?: number, y?: number): Stage {
            x = x || this._m.x;
            y = y || this._m.y;
            var real: IMouseEventMetas = this._m;
            if (x != this._m.x || y != this._m.y)
                this.$s(x, y);
            this.$c();
            this._m = real;
            return this;
        }

        /**
         * 停止工作。
         */
        public h(): void {
            this.f = () => this;
            this._f = false;
            this._u = false;
            this._n = false;
            this._v.removeEventListener('mousemove', this._h[0]);
            this._v.removeEventListener('click', this._h[1]);
        }

        /**
         * 根据座标查找元素。
         */
        public $s(x: number, y: number): [Sprite[], Sprite[], Sprite[]] {
            x |= 0;
            y |= 0;
            var sprites: [Sprite[], Sprite[], Sprite[]] = [[], [], []],
                els: Sprite[] = this.$m(x, y).slice(0, -1), // 查找新座标点新树
                bounds: IBounds,
                inside: boolean,
                out: boolean;
            Util.each(this._e, (element: Sprite) => {
                bounds = element.gB();
                inside = -1 != Util.indexOf(els, element);
                out = x < bounds.x || y < bounds.y || x > bounds.x + bounds.w || y > bounds.y + bounds.h;
                if (!inside && !out) {
                    inside = true;
                    els.push(element);
                }
                sprites[inside ? 1 : 2].push(element);
            });
            this._e = els;
            this._m.fromX = this._m.x;
            this._m.fromY = this._m.y;
            this._m.x = x;
            this._m.y = y;
            Util.each(els, (element: Sprite) => {
                if (-1 == Util.indexOf(sprites[1], element))
                    sprites[0].push(element);
            });
            this._m.target = sprites[0][0] || sprites[1][0];
            this._m.from = sprites[2][0];
            return sprites;
        }

        /**
         * 模拟点击。
         */
        protected $c(): void {
            if (!this._m.target) return;
            var sprites: Sprite[] = [<Sprite> this._m.target],
                parent: Sprite = sprites[0].$p(),
                ev: SpriteClickEvent = new SpriteClickEvent(this._m);
            while (parent && parent != this) {
                sprites.push(parent);
                parent = parent.$p();
            }
            Util.each(sprites, (element: Sprite) => {
                element.dispatchEvent(ev);
            });
        }

        /**
         * 绘制调度。
         */
        private $d(): void {
            var event: SpriteFocusEvent,
                flag: boolean = false;
            Util.each(this._d, (element: Element) => {
                if ((<Component> element).uc()) {
                    flag = true;
                    (<Component> element).uc(false);
                }
            });
            if (flag) {
                Util.each(this.$s(this._m.x, this._m.y)[0], (element: Sprite) => {
                    if (!event)
                        event = new SpriteFocusEvent(this._m);
                    element.dispatchEvent(event);
                });
                this.d();
            }
        }
    }

    export namespace Stage {
        let raf: typeof window.requestAnimationFrame,
            jobs: FrameRequestCallback[] = [],
            proxy: FrameRequestCallback = (time: number) => {
                Util.each(jobs, (callback: FrameRequestCallback) => {
                    callback(time);
                });
                raf(proxy);
            },
            elapsed: number = 0,
            size: number;

        if (Util.ENV.Window) {
            raf = window.requestAnimationFrame || window.msRequestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame;
            if (raf) {
                raf(proxy);
            } else
                setInterval(() => {
                    elapsed += 5;
                    size = jobs.length;
                    if ((1 + elapsed % 50) % 3 || !size) return;
                    Util.each(jobs, (callback: FrameRequestCallback) => {
                        callback(elapsed);
                    });
                }, 5);
        }

        /**
         * 帧处理。
         */
        export function f(callback: FrameRequestCallback): void {
            jobs.push(callback);
        }
    }
}

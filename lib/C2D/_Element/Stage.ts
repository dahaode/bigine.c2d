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
         * 发生变化地组合元素序号。
         */
        private _u: number;

        /**
         * 绘制缓存。
         */
        private _k: [number, ImageData];

        /**
         * 绘制排期次数。
         */
        private _n: boolean[];

        /**
         * 真实绘制画板上下文。
         */
        private _w: CanvasRenderingContext2D;

        /**
         * 构造函数。
         */
        constructor(context: CanvasRenderingContext2D) {
            let canvas: HTMLCanvasElement = context.canvas,
                shadow: HTMLCanvasElement = document.createElement('canvas');
            shadow.width = canvas.width;
            shadow.height = canvas.height;
            shadow.style.display = 'none';
            canvas.parentNode.appendChild(shadow);
            super(0, 0, canvas.width, canvas.height, false, true);
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
            this._u = -1;
            this._k = [0, undefined];
            this._n = [];
            this._w = shadow.getContext('2d');
            this.b(context.canvas);
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
         * 发生变更。
         */
        public f(child?: Sprite): Stage {
            var fresh: boolean = !this._f,
                event: SpriteFocusEvent;
            this._f = true;
            if (child) {
                Util.some(this._d, (element: Element, index: number) => {
                    if (child == element) {
                        this._u = index;
                        return true;
                    }
                    return false;
                });
            } else
                this._u = 0;
            if (this._k[0] > this._u)
                this._k = [0, undefined];
            Util.each(this.$s(this._m.x, this._m.y)[0], (element: Sprite) => {
                if (!event)
                    event = new SpriteFocusEvent(this._m);
                element.dispatchEvent(event);
            });
            if (fresh)
                this.$d(true);
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
            if (!this._f)
                return Promise.resolve(this._c);
            return Promise.all(this.$r())
                .then(() => {
                    this._f = false;
                    return Util.Q.every(this._d, (element: Element, index: number) => {
                        if (this._k[0]) {
                            if (index < this._k[0])
                                return this._w;
                            if (index == this._k[0])
                                this._w.putImageData(this._k[1], 0, 0);
                        }
                        if (index && index == this._u && this._u != this._k[0])
                            this._k = [index, this._w.getImageData(0, 0, 1280, 720)];
                        return element.d(this._w);
                    });
                }).then(() => {
                    this._c.drawImage(this._w.canvas, 0, 0, 1280, 720);
                    return this._c;
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
            this._v.removeEventListener('mousemove', this._h[0]);
            this._v.removeEventListener('click', this._h[1]);
        }

        /**
         * 根据座标查找元素。
         */
        protected $s(x: number, y: number): [Sprite[], Sprite[], Sprite[]] {
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
         *
         * 确保每一帧只绘制一次。
         */
        private $d(triggered: boolean = false): void {
            let q: boolean[] = this._n;
            if (triggered && 2 > q.length)
                q.push(false);
            if (!q.length || q[0]) return;
            q[0] = true;
            Animation.f(() => {
                this.d().then(() => {
                    q.shift();
                    this.$d();
                });
            });
        }
    }
}

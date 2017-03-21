/**
 * 定义图像画面元素组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/Image.ts
 */

/// <reference path="Element.ts" />

namespace C2D {
    export class Image extends Element {
        /**
         * 数据。
         */
        private _d: Promise<HTMLImageElement>;

        /**
         * 平铺。
         */
        private _l: any;

        /**
         * 构造函数。
         */
        constructor(image: Promise<HTMLImageElement>, x?: number, y?: number, w?: number, h?: number, absolute?: boolean, tile?: any);
        constructor(image: Promise<HTMLImageElement>, bounds?: IBounds, absolute?: boolean, tile?: any);
        constructor(image: Promise<HTMLImageElement>, x?: any, y?: any, w?: any, h?: any, absolute?: any, tile?: any) {
            super(x, y, w, h, absolute);
            this._d = image;
            if (!x || 'number' == typeof x) {
                this._l = tile || 0;
            } else {
                this._l = w || 0;
            }
            if (!this._b.w || !this._b.h)
                image.then((img: HTMLImageElement) => {
                    if (this._b.w) {
                        this._b.h = 0 | this._b.w * img.height / img.width;
                    } else if (this._b.h) {
                        this._b.w = 0 | this._b.h * img.width / img.height;
                    } else {
                        this._b.w = img.width;
                        this._b.h = img.height;
                    }
                });
        }

        /**
         * 绘制。
         */
        public d(context: CanvasRenderingContext2D): CanvasRenderingContext2D | Thenable<CanvasRenderingContext2D> {
            var opacity: number = this.gO();
            if (opacity) {
                return this._d.then((img: HTMLImageElement) => {
                    if (1 != opacity) {
                        context.save();
                        context.globalAlpha = opacity;
                    }
                    var bounds: IBounds = this.gB(),
                        x: number,
                        y: number,
                        w: number,
                        h: number;
                    if (this._l) {
                        if ('number' == typeof this._l) {
                            x = Math.round(bounds.x / 720 * this._l);
                            y = Math.round(bounds.y / 720 * this._l);
                            w = Math.round(bounds.w / 720 * this._l);
                            h = Math.round(bounds.h / 720 * this._l);
                        } else {
                            x = this._l['x'];
                            y = this._l['y'];
                            w = this._l['w'];
                            h = this._l['h'];
                        }
                        context.drawImage(img, x, y, w, h, bounds.x, bounds.y, bounds.w, bounds.h);
                    } else {
                        context.drawImage(img, bounds.x, bounds.y, bounds.w, bounds.h);
                    }
                    if (1 != opacity)
                        context.restore();
                    return context;
                });
            }
            return super.d(context);
        }

        /**
         * 获取需绘制地图片集合。
         */
        protected $r(): Promise<HTMLImageElement>[] {
            return [this._d];
        }

        /**
         * 获取需绘制地图片。
         */
        public $d(): Promise<HTMLImageElement> {
            return this._d;
        }

        /**
         * 获取名称。
         */
        public gN(): string {
            return 'Image';
        }

        /**
         * 设置父元素。
         */
        public $p(parent?: Sprite): Sprite {
            if (!parent && this._p)
                return <Sprite> this._p;
            return <Sprite> super.$p(parent);
        }
    }
}

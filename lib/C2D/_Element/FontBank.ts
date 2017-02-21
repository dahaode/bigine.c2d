/**
 * 定义雪碧图字库组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2017 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/FontBank.ts
 */

namespace C2D {
    import Util = __Bigine_Util;
    const WIDTH: number = 1960;
    const HEIGHT: number = 1280;

    /**
     * 唯一实例。
     */
    var instance: FontBank;

    export class FontBank {
        /**
         * 下一个 x 坐标。
         */
        private _x: number;

        /**
         * 下一个 y 坐标。
         */
        private _y: number;

        /**
         * 该行纵向起点坐标。
         */
        private _o: number;

        /**
         * 该行最大行高。
         */
        private _h: number;

        /**
         * 当前页数。
         */
        private _n: number;

        /**
         * 雪碧图 hash 表。
         */
        private _s: Util.IHashTable<Util.IHashTable<any>>;

        /**
         * 雪碧图 canvas 数组。
         */
        private _c: CanvasRenderingContext2D[];

        /**
         * 文字预处理。
         */
        public static a(clobs?: string, font?: [number, string, string], shadow?: [number, number, number, string]): void {
            if (!clobs.length) return;
            if (!instance)
                instance = new FontBank;
            for (var i: number = 0; i < clobs.length; i++) {
                instance.d(clobs[i], font, shadow);
            }
        }

        /**
         * 获取 canvas。
         */
        public static c(n: number): HTMLCanvasElement {
            if (!instance)
                instance = new FontBank;
            return instance.gC(n);
        }

        /**
         * 获取文本范围。
         */
        public static s(clob: string): Util.IHashTable<any> {
            if (!clob.length) return;
            if (!instance)
                instance = new FontBank;
            return instance.gS(clob);
        }

        /**
         * 构造函数。
         */
        constructor() {
            this._c = [];
            this._s = {};
            this._x = 0;
            this.c();
        }

        /**
         * 创建 canvas。
         */
        public c(): void {
            let canvas: HTMLCanvasElement = document.createElement('canvas');
            canvas.width = WIDTH;
            canvas.height = HEIGHT;
            this._c.push(canvas.getContext('2d'));
            this._h = 0;
            this._o = 0;
            this._n = this._c.length - 1;
        }

        /**
         * 获取 canvas。
         */
        public gC(n: number): HTMLCanvasElement {
            return this._c[n].canvas;
        }

        /**
         * 获取文本范围。
         */
        public gS(clob: string): Util.IHashTable<any> {
            return this._s[clob];
        }

        /**
         * 绘制。
         */
        private d(clob: string, font?: [number, string, string], shadow?: [number, number, number, string]): void {
            let key: string = clob + font[2] + font[0].toString() + font[1];
            if (key in this._s) return;
            var w: number = this.w(clob, font, shadow),
                m: number = Math.ceil(font[0] / 2);
            if (this._x + w > WIDTH) {
                this._x = 0;
                this._o = this._o + this._h + 1;
                this._h = font[0];
                if (this._o > HEIGHT) this.c();
            }
            this._y = this._o + m;
            this._h = this._h > font[0] ? this._h : font[0];
            this._c[this._n].save();
            this._c[this._n].fillStyle = font[1];
            this._c[this._n].font = font[0] + 'px "' + font[2] + '", ' + TextPhrase.FONT;
            this._c[this._n].textBaseline = 'middle';
            if (shadow[2]) {
                this._c[this._n].shadowBlur = shadow[2];
                this._c[this._n].shadowOffsetX = shadow[0];
                this._c[this._n].shadowOffsetY = shadow[1];
                this._c[this._n].shadowColor = shadow[3];
            }
            var bound: Util.IHashTable<any> = {n: this._n, x: this._x, y: this._y - m, w: w, h: font[0] + 1};
            this._c[this._n].fillText(clob, this._x, this._y);
            this._c[this._n].restore();
            this._s[key] = bound;
            this._x = this._x + w;
        }

        /**
         * 获取文本宽度。
         */
        private w(clob: string, font?: [number, string, string], shadow?: [number, number, number, string]): number {
            this._c[0].save();
            this._c[0].fillStyle = font[1];
            this._c[0].font = font[0] + 'px "' + font[2] + '", ' + TextPhrase.FONT;
            this._c[0].textBaseline = 'middle';
            var w: number = Math.ceil(this._c[0].measureText(clob).width);
            this._c[0].restore();
            return w;
        }
    }
}

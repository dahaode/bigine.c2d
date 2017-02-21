/**
 * 定义画面短句组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2017 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/Phrase.ts
 */

/// <reference path="Paragraph.ts" />
/// <reference path="FontBank.ts" />
/// <reference path="IPoint.ts" />

namespace C2D {
    export class Phrase {
        /**
         * 内容。
         */
        private _t: string;

        /**
         * 颜色。
         */
        private _c: string;

        /**
         * 宿主。
         */
        private _p: Paragraph;

        /**
         * 构造函数。
         */
        constructor(clob?: string, color?: string) {
            this._t = (clob || '').toString();
            this._c = color;
        }

        /**
         * 设置主画面元素。
         */
        public p(text: Paragraph): Phrase {
            this._p = text;
            let tf: [number, number, string, number, string] = this._p.gTf();
            this._c = this._c || tf[2];
            FontBank.a(this._t, [tf[0], this._c, tf[4]], this._p.gTs());
            return this;
        }

        /**
         * 绘制。
         */
        public d(context: CanvasRenderingContext2D, x: number, y: number): IPoint {
            if (!this._p || !this._t.length) return <IPoint> {x: x, y: y};
            var pb: IBounds = this._p.gB(),
                tf: [number, number, string, number, string] = this._p.gTf();
            for (var i: number = 0; i < this._t.length; i++) {
                var key: string = this._t[i] + tf[4] + tf[0].toString() + this._c;
                var bounds: IBounds = <IBounds> FontBank.s(key);
                var canvas: HTMLCanvasElement = FontBank.c(bounds['n']);
                if (x + bounds.w - pb.x > pb.w) {
                    x = pb.x;
                    y += tf[1];
                }
                context.drawImage(canvas,
                    bounds.x, bounds.y, bounds.w, bounds.h,
                    x, y, bounds.w, bounds.h);
                x = x + 2 * tf[3] + bounds.w;
            }
            return <IPoint> {x: x, y: y};
        }

        /**
         * 获取长度。
         */
        public gL(): number {
            return this._t.length;
        }

        /**
         * 截取。
         */
        public a(length: number): Phrase {
            return new Phrase(this._t.substr(0, length), this._c);
        }
    }
}

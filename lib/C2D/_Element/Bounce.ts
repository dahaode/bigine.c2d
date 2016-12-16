/**
 * 定义回弹对象。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/Bounce.ts
 */

/// <reference path="Vector.ts" />

namespace C2D {
    export class Bounce {
        /**
         * 前速度。
         */
        private _d: Vector;

        /**
         * 半径。
         */
        private _u: number;

        /**
         * 后速度。
         */
        private _v: Vector;

        /**
         * 构造函数。
         */
        constructor(x: number, y: number) {
            var dist: number = Math.random() * 7;
            var angle: number = Math.PI + Math.random() * Math.PI;
            this._d = new Vector(x, y);
            this._u = 0.2 + Math.random() * 0.8;
            this._v = new Vector(Math.cos(angle) * dist, Math.sin(angle) * dist);
        }

        /**
         * 更新
         */
        public u(gravity: number): Bounce {
            this._v.y((this._v.y() + gravity) * 0.95);
            this._v.x(this._v.x() * 0.95);
            this._d.a(this._v);
            return this;
        }

        /*
         * 绘制
         */
        public d(context: CanvasRenderingContext2D): void {
            context.beginPath();
            context.arc(this._d.x(), this._d.y(), this._u, 0, Math.PI * 2);
            context.fill();
        }

        /*
         * 获取当前 横向速度 / 纵向速度
         */
        public gV(t: string): number {
            return this._d[t]();
        }
    }
}

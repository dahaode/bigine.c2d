/**
 * 定义下落粒子对象。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/Drop.ts
 */

/// <reference path="Vector.ts" />

namespace C2D {
    import Util = __Bigine_Util;

    export class Drop {
        /**
         * 速度对象。
         */
        private _v: Vector;

        /**
         * 速度实例。
         */
        private _d: Vector;

        /**
         * 上一次位置速度对象。
         */
        private _p: Vector;

        /**
         * 元素半径。
         */
        private _r: number;

        /**
         * 风向角度。
         */
        private _a: number;

        /**
         * 风向角度。
         */
        private _m: Util.IHashTable<any>;

        /**
         * 构造函数。
         */
        constructor(metas: Util.IHashTable<any>) {
            var eachAnger: number = 0.017453293,             // 将角度乘以 0.017453293 （2PI/360）即可转换为弧度。
                sx: number,                                  // 获得横向加速度 
                sy: number,                                  // 获得纵向加速度
                speed: number;                               // 获得drop初始速度
            this._v = new Vector(Math.random() * 1280, 0);   // 随机设置drop的初始坐标
            this._r = (metas['size_range'][0] + Math.random() * metas['size_range'][1]); //设置下落元素的大小
            this._p = this._v;
            this._a = metas['wind_direction'] * eachAnger;   //获得风向的角度
            speed = (metas['speed'][0] + Math.random() * metas['speed'][1]);
            sx = speed * Math.cos(this._a);
            sy = - speed * Math.sin(this._a);
            this._d = new Vector(sx, sy);                     //绑定一个速度实例
            this._m = metas;
        }

        /**
         * 更新
         */
        public u(): Drop {
            this._p = this._v.c();
            if (this._m['hasGravity'])
                this._d['_y'] += this._m['gravity'];
            this._v.a(this._d);
            return this;
        }

        /*
         * 绘制
         */
        public d(context: CanvasRenderingContext2D): void {
            context.beginPath();
            if (this._m['type'] == "rain") {   // 目前只分为两种情况，一种是 rain 即贝塞尔曲线
                context.moveTo(this._p.x(), this._p.y());
                var ax: number = Math.abs(this._r * Math.cos(this._a));
                var ay: number = Math.abs(this._r * Math.sin(this._a));
                context.bezierCurveTo(this._v.x() + ax, this._v.y() + ay, this._p.x() + ax , this._p.y() + ay, this._v.x(), this._v.y());
                context.stroke();
            } else {                           // 另一种是 snow 即圆形 
                context.moveTo(this._v.x(), this._v.y());
                context.arc(this._v.x(), this._v.y(), this._r, 0, Math.PI * 2);
                context.fill();
            }
        }

        /*
         * 获取当前 横向速度 / 纵向速度
         */
        public gV(t: string): number {
            return this._v[t]();
        }
    }
}

/**
 * 定义速度对象。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/Vector.ts
 */

namespace C2D {
    export class Vector {
        /**
         * 横向速度。
         */
        private _x: number;

        /**
         * 纵向速度。
         */
        private _y: number;

        /**
         * 构造函数。
         */
        constructor(x?: number, y?: number) {
            this._x = x || 0;
            this._y = y || 0;
        }

        /**
         * 速度改变函数,根据参数对速度进行增加
         * @param  {any}    v object || number 
         * @return {Vector}   [description]
         */
        public a(v: any): Vector {
            if (typeof v == 'number') {
                this._x += v;
                this._y += v;
            } else {
                this._x += v._x;
                this._y += v._y;
            }
            return this;
        }

        /*
         * 复制一个vector，来用作保存之前速度节点的记录
         */
        public c(): Vector {
            return new Vector(this._x, this._y);
        }

        /*
         * 获取、设置横向速度
         */
        public x(x?: number): number {
            if (x != undefined) this._x = x;
            return this._x;
        }

        /*
         * 获取、设置纵向速度
         */
        public y(y?: number): number {
            if (y != undefined) this._y = y;
            return this._y;
        }
    }
}

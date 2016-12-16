/**
 * 声明雨雪动画元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/IDroppingMetas.ts
 */

namespace C2D {
    import Util = __Bigine_Util;

    export interface IDroppingMetas extends Util.IHashTable<any> {
        /**
         * 最大粒子数量。
         */
        maxNum: number;
        /*
         * 每次生成粒子数
         */
        numLevel: number;
        /*
         * 重力加速度
         */
        gravity: number;
        /*
         * 效果（rain or snow）
         */
        type: string;
        /*
         * 速度范围
         */
        speed: [number, number];
        /*
         * 大小半径范围
         */
        size_range: [number, number];
        /*
         * 是否有反弹效果
         */
        hasBounce: boolean;
        /*
         * 风向角度
         */
        wind_direction: number;
        /*
         * 是否考虑重力
         */
        hasGravity: boolean;
    }
}

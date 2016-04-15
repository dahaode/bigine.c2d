/**
 * 声明放大缩小镜头动画元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/IZoomMetas.ts
 */

/// <reference path="../../../include/tsd.d.ts" />

namespace C2D {
    import Util = __Bigine_Util;

    export interface IZoomMetas extends Util.IHashTable<any> {
        /**
         * 镜头 X 轴系数。
         */
        mx: number;

        /**
         * 镜头 Y 轴系数。
         */
        my: number;

        /**
         * 放大/缩小系数。
         */
        scale: number;
    }
}

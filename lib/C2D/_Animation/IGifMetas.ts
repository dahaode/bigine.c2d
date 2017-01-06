/**
 * 声明 Gif 动画元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2017 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/IGifMetas.ts
 */

/// <reference path="../../../include/tsd.d.ts" />

namespace C2D {
    import Util = __Bigine_Util;

    export interface IGifMetas extends Util.IHashTable<any> {
        /**
         * 透明度。
         */
        bound: IBounds;
        /**
         * 透明度。
         */
        interval: number;
    }
}

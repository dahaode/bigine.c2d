/**
 * 声明透明度渐变动画元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/IFadeMetas.ts
 */

/// <reference path="../../../include/tsd.d.ts" />

namespace C2D {
    import Util = __Bigine_Util;

    export interface IFadeMetas extends Util.IHashTable<any> {
        /**
         * 透明度。
         */
        opacity: number;
    }
}

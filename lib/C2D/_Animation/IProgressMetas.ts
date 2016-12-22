/**
 * 声明进度条动画元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/IProgressMetas.ts
 */

/// <reference path="../../../include/tsd.d.ts" />

namespace C2D {
    import Util = __Bigine_Util;

    export interface IProgressMetas extends Util.IHashTable<any> {
        /**
         * 宽度。
         */
        width: number;
    }
}

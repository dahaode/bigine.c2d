/**
 * 声明百叶窗动画元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/IShutterMetas.ts
 */

/// <reference path="../../../include/tsd.d.ts" />

namespace C2D {
    import Util = __Bigine_Util;

    export interface IShutterMetas extends Util.IHashTable<any> {
        /**
         * 水平或垂直。
         */
        direction: string;
        /**
         * 是否取大尺寸图片。
         */
        bsize: boolean;
    }
}

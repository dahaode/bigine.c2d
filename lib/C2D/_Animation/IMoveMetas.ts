/**
 * 声明位移动画元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/IMoveMetas.ts
 */

/// <reference path="../../../include/tsd.d.ts" />

namespace C2D {
    import Util = __Bigine_Util;

    export interface IMoveMetas extends Util.IHashTable<any> {
        /**
         * X 轴座标。
         */
        x: number;

        /**
         * Y 轴座标。
         */
        y: number;
    }
}

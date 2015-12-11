/**
 * 声明（画面）鼠标事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      _Event/IMouseEventMetas.ts
 */

/// <reference path="../../include/tsd.d.ts" />
/// <reference path="../_Element/Stage.ts" />

namespace C2D {
    import Util = __Bigine_Util;

    export interface IMouseEventMetas extends Util.IEventMetas<Sprite> {
        /**
         * X 轴座标。
         */
        x: number;

        /**
         * Y 轴座标。
         */
        y: number;

        /**
         * 源对象。
         */
        from: Sprite;

        /**
         * 源 X 轴座标。
         */
        fromX: number;

        /**
         * 源 Y 轴座标。
         */
        fromY: number;

        /**
         * 舞台对象。
         */
        stage: Stage;
    }
}

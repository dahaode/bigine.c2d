/**
 * 声明画面元素区域接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      _Element/IBounds.ts
 */

namespace C2D {
    export interface IBounds {
        /**
         * X 轴座标。
         */
        x: number;

        /**
         * Y 轴座标。
         */
        y: number;

        /**
         * 宽度。
         */
        w: number;

        /**
         * 高度。
         */
        h: number;
    }
}

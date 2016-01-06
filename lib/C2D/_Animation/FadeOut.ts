/**
 * 定义透明度渐隐动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/FadeOut.ts
 */

/// <reference path="Fade.ts" />

namespace C2D {
    export class FadeOut extends Fade {
        /**
         * 构造函数。
         */
        constructor(duration: number) {
            super(duration, {
                opacity: 0
            });
        }
    }
}

/**
 * 定义透明度渐显动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      _Animation/FadeIn.ts
 */

/// <reference path="Fade.ts" />

namespace C2D {
    export class FadeIn extends Fade {
        /**
         * 构造函数。
         */
        constructor(duration: number) {
            super(duration, {
                opacity: 1
            });
        }
    }
}

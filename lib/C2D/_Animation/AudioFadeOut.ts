/**
 * 定义透明度渐变动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/AudioFadeOut.ts
 */

/// <reference path="Animation.ts" />
/// <reference path="IAudioFadeMetas.ts" />

namespace C2D {
    export class AudioFadeOut extends Animation {
        /**
         * 原始音量。
         */
        private _v: number;

        /**
         * 构造函数。
         */
        constructor(duration: number) {
            super(duration, <IAudioFadeMetas> {
                volume: 0
            });
        }

        /**
         * 帧执行。
         */
        protected $p(element: HTMLAudioElement, elpased: number): void {
            if (1 == elpased)
                this._v = element.volume;
            if (elpased % 2)
                element.volume = this._v - this._v * elpased / this._d;
        }
    }
}

/**
 * 定义音量渐变动画组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/AudioFade.ts
 */

/// <reference path="Animation.ts" />
/// <reference path="IAudioFadeMetas.ts" />

namespace C2D {
    export class AudioFade extends Animation {
        /**
         * 变化前音量。
         */
        private _vb: number;

        /**
         * 变化后音量。
         */
        private _va: number;

        /**
         * 单位帧音量变化。
         */
        private _v: number;

        /**
         * 构造函数。
         */
        constructor(duration: number, volume: number) {
            super(duration, <IAudioFadeMetas> {
                volume: volume
            });
            this._va = volume;
        }

        /**
         * 帧执行。
         */
        protected $p(element: HTMLAudioElement, elpased: number): void {
            if (1 == elpased) {
                this._vb = element.volume;
                this._v = (this._va - this._vb) / this._d;
            }
            element.volume = this._vb + this._v * elpased;
        }
    }
}

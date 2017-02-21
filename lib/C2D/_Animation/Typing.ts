/**
 * 定义打字效果动画组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2017 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/Typing.ts
 */

/// <reference path="Animation.ts" />
/// <reference path="../_Element/Paragraph.ts" />

namespace C2D {
    import Util = __Bigine_Util;

    export class Typing extends Animation {
        /**
         * 速度（单位：帧／字）。
         */
        private _r: number;

        /**
         * 文字集合。
         */
        private _s: Phrase[];

        /**
         * 构造函数。
         */
        constructor(rate?: number) {
            super(17);
            this._r = rate || 1;
            if (0 > this._r)
                this._r = 1;
        }

        /**
         * 帧执行。
         */
        protected $p(element: Paragraph, elpased: number): void {
            var length: number = 0;
            if (1 == elpased) {
                Util.each(this._s = element.gT(), (phrase: Phrase) => {
                    length += phrase.gL();
                });
                this._d = 0 | length * this._r;
                this._r = this._d / length;
            }
            elpased = 0 | elpased / this._r;
            element.c().o(1);
            Util.each(this._s, (phrase: Phrase) => {
                length = phrase.gL();
                if (length < elpased) {
                    element.a(phrase);
                    elpased -= length;
                } else if (elpased) {
                    element.a(phrase.a(elpased));
                    elpased = 0;
                }
            });
        }

        /**
         * 中止。
         */
        public $h(): void {
            (<Paragraph> this._t).c();
            Util.each(this._s, (phrase: Phrase) => {
                (<Paragraph> this._t).a(phrase);
            });
        }
    }
}

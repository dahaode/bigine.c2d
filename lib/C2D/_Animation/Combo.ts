/**
 * 定义画面组合动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/Combo.ts
 */

/// <reference path="Animation.ts" />
/// <reference path="../_Element/Element.ts" />

namespace C2D {
    import Util = __Bigine_Util;

    export class Combo extends Animation {
        /**
         * 动画组合。
         */
        private _a: Animation[];

        /**
         * 构造函数。
         */
        constructor(animations: Animation[]) {
            super(Infinity);
            this._a = animations;
        }

        /**
         * 执行。
         */
        public $p(element: Element, elapsed: number, done: () => void): void {
            if (1 == elapsed) {
                var p: Promise<Element>[] = [];
                Util.each(this._a, (anime: Animation) => {
                    p.push(anime.p(element));
                });
                Promise.all(p).then(done);
            }
        }

        /**
         * 中止处理。
         */
        public $h(): void {
            Util.each(this._a, (anime: Animation) => {
                anime.h();
            });
        }
    }
}

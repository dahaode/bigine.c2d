/**
 * 定义等待点击动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/WaitForClick.ts
 */

/// <reference path="Animation.ts" />
/// <reference path="../_Event/SpriteClickEvent.ts" />

namespace C2D {
    import Util = __Bigine_Util;

    export class WaitForClick extends Animation {
        /**
         * 功能函数。
         */
        private _f: Util.IEventListener<Sprite>;

        /**
         * 中止函数。
         */
        private _r: () => void;

        /**
         * 构造函数。
         */
        constructor(callback?: Util.IEventListener<Sprite>) {
            super(Infinity);
            this._f = callback;
        }

        /**
         * 执行。
         */
        public $p(element: Sprite, elapsed: number, done: () => void): void {
            if (1 == elapsed) {
                var type: string = 'click',
                    handler: Util.IEventListener<Sprite> = (event: SpriteClickEvent) => {
                        if (this._f)
                            this._f.call(undefined, event);
                        this._r();
                    };
                this._r = () => {
                    element.removeEventListener(type, handler);
                    done();
                };
                element.addEventListener(type, handler);
            }
        }

        /**
         * 中止。
         */
        public $h(): void {
            if (this._r)
                this._r();
        }
    }
}

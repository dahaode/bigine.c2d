/**
 * 定义画面按钮元素组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/Stage.ts
 */

/// <reference path="Sprite.ts" />
/// <reference path="../_Event/SpriteMouseEvent.ts" />
/// <reference path="../_Animation/FadeIn.ts" />
/// <reference path="../_Animation/FadeOut.ts" />
/// <reference path="../_Animation/Delay.ts" />

namespace C2D {
    import Util = __Bigine_Util;

    export class Button extends Sprite {
        /**
         * 按钮延时。
         */
        private _y: number;

        /**
         * 已点击。
         */
        private _c: boolean;

        /**
         * 构造函数。
         */
        constructor(x: number, y: number, w: number, h: number, delay?: number, absolute?: boolean);
        constructor(bounds: IBounds, delay?: number, absolute?: boolean);
        constructor(x: any, y?: any, w?: any, h?: any, delay?: number, absolute?: boolean) {
            if ('object' == typeof x) {
                super(x, false, w);
                this._y = 0 | y;
            } else {
                super(x, y, w, h, false, absolute);
                this._y = 0 | delay;
            }
            this._y = this._y || 100;
            this._c = false;
        }

        /**
         * 绑定功能。
         */
        public b(callback: Util.IEventListener<Button>, hover?: Element, defaults?: Element): Button {
            if (defaults)
                this.a(defaults.o(1));
            if (hover)
                this.a(hover.o(0));
            var animes: Animation[] = [],
                anime: Animation;
            return <Button> this.addEventListener('focus', () => {
                Util.each(animes, (animation: Animation) => {
                    animation.h();
                });
                animes = [];
                if (hover) {
                    anime = new FadeIn(250);
                    animes.push(anime);
                    hover.p(anime);
                }
            }).addEventListener('blur', () => {
                Util.each(animes, (animation: Animation) => {
                    animation.h();
                });
                animes = [];
                if (hover) {
                    anime = new FadeOut(250);
                    animes.push(anime);
                    hover.p(anime);
                }
            }).addEventListener('click', (event: Util.IEvent<Button>) => {
                Util.each(animes, (animation: Animation) => {
                    animation.h();
                });
                if (hover)
                    hover.o(1);
                if (this._c) return;
                this._c = true;
                callback(event);
                this.p(new Delay(this._y)).then(() => {
                    this._c = false;
                });
            });
        }
    }
}

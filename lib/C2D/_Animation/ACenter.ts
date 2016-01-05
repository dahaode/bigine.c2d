/**
 * 定义画面动画管理中心组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      _Animation/ACenter.ts
 */

/// <reference path="Animation.ts" />

namespace C2D {
    import Util = __Bigine_Util;

    export class ACenter {
        /**
         * 已注册动画。
         */
        private static _: Animation[] = [];

        /**
         * 注册动画。
         */
        public static a(animation: Animation): number {
            let _: Animation[] = ACenter._;
            _.push(animation);
            return _.length;
        }

        /**
         * 获取指定动画。
         */
        public static g(id: number): Animation {
            return ACenter._[--id];
        }

        /**
         * 播放完结。
         */
        public static d(id: number): void {
            let _: Animation[] = ACenter._;
            if (_[--id])
                delete _[id];
        }

        /**
         * 中止播放。
         */
        public static h(id: number): void;
        public static h(): void;
        public static h(id?: number): void {
            let _: Animation[] = ACenter._;
            if (!id)
                return Util.each(_, (animation: Animation, index: number) => {
                    animation.h();
                    delete _[index];
                });
            if (_[--id])
                _[id].h();
                delete _[id];
        }

        /**
         * 暂停动画。
         */
        public static w(id: number): void;
        public static w(): void;
        public static w(id?: number): void {
            let _: Animation[] = ACenter._;
            if (!id)
                return Util.each(_, (animation: Animation) => {
                    animation.w();
                });
            if (_[--id])
                _[id].w();
        }

        /**
         * 恢复动画。
         */
        public static r(id: number): void;
        public static r(): void;
        public static r(id?: number): void {
            let _: Animation[] = ACenter._;
            if (!id)
                return Util.each(_, (animation: Animation) => {
                    animation.r();
                });
            if (_[--id])
                _[id].r();
        }
    }
}

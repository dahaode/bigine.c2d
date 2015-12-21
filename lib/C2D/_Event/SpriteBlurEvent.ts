/**
 * 定义画面鼠标失焦事件组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      _Event/SpriteBlurEvent.ts
 */

/// <reference path="SpriteMouseEvent.ts" />

namespace C2D {
    export class SpriteBlurEvent extends SpriteMouseEvent {
        /**
         * 获取类型。
         */
        public gT(): string {
            return 'blur';
        }
    }
}

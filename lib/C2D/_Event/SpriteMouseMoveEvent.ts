/**
 * 定义画面鼠标移动事件组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Event/SpriteMouseMoveEvent.ts
 */

/// <reference path="SpriteMouseEvent.ts" />

namespace C2D {
    export class SpriteMouseMoveEvent extends SpriteMouseEvent {
        /**
         * 获取类型。
         */
        public gT(): string {
            return 'mousemove';
        }
    }
}

/**
 * 定义画面文字组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/TextPhrase.ts
 */

/// <reference path="Text.ts" />

namespace C2D {
    export class TextPhrase {
        /**
         * 字体。
         */
        public static FONT: string = '"Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", Arial, sans-serif';

        /**
         * 内容。
         */
        private _t: string;

        /**
         * 颜色。
         */
        private _c: string;

        /**
         * 宿主。
         */
        private _p: Text;

        /**
         * 构造函数。
         */
        constructor(clob?: string, color?: string) {
            this._t = (clob || '').toString();
            this._c = color || '';
        }

        /**
         * 设置文本内容。
         */
        public t(clob: string): TextPhrase {
            this._t = clob.toString();
            return this;
        }

        /**
         * 设置颜色。
         */
        public c(color: string): TextPhrase {
            this._c = color;
            return this;
        }

        /**
         * 设置主画面元素。
         */
        public p(text: Text): TextPhrase {
            this._p = text;
            return this;
        }

        /**
         * 计算可绘制字符数。
         */
        public m(context: CanvasRenderingContext2D, maxWidth: number, offset?: number): [number, number] {
            let clob: string = offset ?
                    this._t.substr(offset) :
                    this._t,
                compare: (text: string, maxWidth2: number) => [number, number] = (text: string, maxWidth2: number) => {
                    let length: number = text.length,
                        result2: [number, number] = [length, context.measureText(text).width],
                        result3: [number, number];
                    if (result2[1] <= maxWidth2) // 可以完全绘制
                        return result2;
                    if (1 == length) // 完全无法绘制
                        return [0, 0];
                    length = 0 | length / 2; // 中分
                    result2 = compare(text.substr(0, length), maxWidth2);
                    if (length != result2[0]) // 前半段仍无法全部绘制
                        return result2;
                    result3 = compare(text.substr(length), maxWidth2 - result2[1]);
                    result2[0] += result3[0];
                    result2[1] += result3[1];
                    return result2;
                },
                font: [number, number],
                shadow: [number, number, number, string],
                result: [number, number];
            offset = clob.length;
            if (!this._p || !offset)
                return [0, 0];
            font = this._p.gTf();
            shadow = this._p.gTs();
            context.save();
            context.font = font[0] + 'px/' + font[1] + 'px ' + TextPhrase.FONT;
            context.textBaseline = 'middle';
            if (shadow[2]) {
                context.shadowBlur = shadow[2];
                context.shadowOffsetX = shadow[0];
                context.shadowOffsetY = shadow[1];
                context.shadowColor = shadow[3];
            }
            if (context.measureText(clob[0]).width > maxWidth) {
                result = [0, 0];
            } else
                result = compare(clob, maxWidth);
            context.restore();
            return result;
        }

        /**
         * 绘制。
         */
        public d(context: CanvasRenderingContext2D, x: number, y: number, offset?: number, length?: number): void {
            if (!this._p) return;
            let clob: string = this._t.substr(offset || 0, length || this._t.length),
                color: string = this._c || this._p.gTc(),
                font: [number, number] = this._p.gTf(),
                shadow: [number, number, number, string] = this._p.gTs();
            if (!clob.length) return;
            context.save();
            context.fillStyle = color;
            context.font = font[0] + 'px/' + font[1] + 'px ' + TextPhrase.FONT;
            context.textBaseline = 'middle';
            if (shadow[2]) {
                context.shadowBlur = shadow[2];
                context.shadowOffsetX = shadow[0];
                context.shadowOffsetY = shadow[1];
                context.shadowColor = shadow[3];
            }
            context.fillText(clob, Math.ceil(x), Math.ceil(y));
            context.restore();
        }

        /**
         * 获取长度。
         */
        public gL(): number {
            return this._t.length;
        }

        /**
         * 截取。
         */
        public a(length: number): TextPhrase {
            return new TextPhrase(this._t.substr(0, length), this._c);
        }
    }
}

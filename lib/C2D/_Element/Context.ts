/**
 * 定义计算 Canvas 元素。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/Context.ts
 */

namespace C2D {
    export class Context {
        /**
         * 计算 Canvas。
         */
        private static _c: CanvasRenderingContext2D;

        /**
         * 计算队列。
         */
        private static _f: Promise<CanvasRenderingContext2D>;

        public static gC(create?: boolean): CanvasRenderingContext2D {
            if (create) {
                let canvas: HTMLCanvasElement = document.createElement('canvas');
	            canvas.width = 1280;
	            canvas.height = 720;
                canvas.style.display = 'none';
	            Context._c = canvas.getContext('2d');
                Context._f = Promise.resolve(Context._c);
            }
            return Context._c;
        }

        public static pC(func: () => Promise<CanvasRenderingContext2D>): void {
            Context._f = Context._f.then(func);
        }
    }
}

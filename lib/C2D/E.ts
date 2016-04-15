/**
 * 定义包异常。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      E.ts
 */

namespace C2D {
    export class E extends Error {
        public static ELEMENT_DEFERRED: string = '元素并未添加至舞台中';

        /**
         * 构造函数。
         */
        constructor(message: string) {
            super();
            if ('captureStackTrace' in Error)
                Error['captureStackTrace'](this, E);
            this.name = 'BigineC2DError';
            this.message = message;
        }
    }
}

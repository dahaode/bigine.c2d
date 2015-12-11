/**
 * 声明各浏览器早期版本 RAF 方法。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 */

interface Window {
    mozRequestAnimationFrame(callback: FrameRequestCallback): number;
    webkitRequestAnimationFrame(callback: FrameRequestCallback): number;
    oRequestAnimationFrame(callback: FrameRequestCallback): number;
}

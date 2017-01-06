declare namespace __Bigine_C2D {
    import Util = __Bigine_Util;
    class E extends Error {
        static ELEMENT_DEFERRED: string;
        constructor(message: string);
    }
    interface IBounds {
        x: number;
        y: number;
        w: number;
        h: number;
    }
    class ACenter {
        private static _;
        static a(animation: Animation): number;
        static g(id: number): Animation;
        static d(id: number): void;
        static h(id: number): void;
        static h(): void;
        static w(id: number): void;
        static w(): void;
        static r(id: number): void;
        static r(): void;
    }
    class Animation {
        protected _d: number;
        protected _m: Util.IHashTable<any>;
        protected _c: Animation[];
        protected _l: number;
        protected _p: boolean;
        protected _h: boolean;
        protected _t: any;
        protected _w: boolean;
        protected _i: number;
        constructor(duration: number, metas?: Util.IHashTable<any>);
        c(next: Animation): Animation;
        l(times?: number): Animation;
        p(element: any): Promise<any>;
        protected $p(element: any, elpased: number, done: () => void): void;
        h(): Animation;
        protected $h(): void;
        w(): Animation;
        r(): Animation;
        gW(): boolean;
        gI(): number;
    }
    namespace Animation {
        function f(callback: FrameRequestCallback, draw?: boolean): void;
    }
    class Element {
        protected _b: IBounds;
        protected _a: boolean;
        protected _s: number;
        protected _r: number;
        protected _o: number;
        protected _f: boolean;
        protected _p: Sprite;
        protected _i: string;
        constructor(x: number, y: number, w: number, h: number, absolute?: boolean);
        constructor(bounds: IBounds, absolute?: boolean);
        gB(): IBounds;
        x(value: number): Element;
        y(value: number): Element;
        sH(value: number): Element;
        sW(value: number): Element;
        s(ratio: number): Element;
        gS(): number;
        r(degrees: number): Element;
        gR(): number;
        o(value: number): Element;
        gO(): number;
        d(context: CanvasRenderingContext2D): CanvasRenderingContext2D | Thenable<CanvasRenderingContext2D>;
        p(animation: Animation): Promise<Element>;
        i(id: string): Element;
        gI(): string;
        f(): Element;
        $p(parent: Sprite): Element;
        gN(): string;
    }
    class Sprite extends Element implements Util.IEmittable {
        protected _d: Element[];
        private _l;
        private _t;
        constructor(x: number, y: number, w: number, h: number, transparent?: boolean, absolute?: boolean);
        constructor(bounds: IBounds, transparent?: boolean, absolute?: boolean);
        s(ratio: number): Sprite;
        r(degrees: number): Sprite;
        d(context: CanvasRenderingContext2D): CanvasRenderingContext2D | Thenable<CanvasRenderingContext2D>;
        f(child?: Element): Sprite;
        $p(parent?: Sprite): Sprite;
        addEventListener(type: string, listener: Util.IEventListener<Sprite>): Sprite;
        removeEventListener(type: string, listener: Util.IEventListener<Sprite>): Sprite;
        dispatchEvent(event: Util.IEvent<Sprite>): Sprite;
        a(element: Element, before?: string, step?: number): Sprite;
        a(element: Element, before?: Element, step?: number): Sprite;
        e(element: Element): Sprite;
        c(): Sprite;
        q(id: string): Element[];
        protected $m(x: number, y: number): Sprite[];
        protected $r(): Promise<HTMLImageElement>[];
    }
    interface IMouseEventMetas extends Util.IEventMetas<Sprite> {
        x: number;
        y: number;
        from: Sprite;
        fromX: number;
        fromY: number;
        stage: Stage;
    }
    class SpriteMouseEvent implements Util.IEvent<Sprite> {
        target: Sprite;
        x: number;
        y: number;
        from: Sprite;
        fromX: number;
        fromY: number;
        stage: Stage;
        constructor(metas: IMouseEventMetas);
        gT(): string;
    }
    class SpriteFocusEvent extends SpriteMouseEvent {
        gT(): string;
    }
    class SpriteBlurEvent extends SpriteMouseEvent {
        gT(): string;
    }
    class SpriteMouseMoveEvent extends SpriteMouseEvent {
        gT(): string;
    }
    class SpriteClickEvent extends SpriteMouseEvent {
        gT(): string;
    }
    class Context {
        private static _c;
        private static _f;
        static gC(create?: boolean): CanvasRenderingContext2D;
        static pC(func: () => Promise<CanvasRenderingContext2D>): void;
    }
    class Component extends Sprite {
        protected _tm: Util.IHashTable<any>;
        protected _pi: boolean;
        private _cw;
        private _uc;
        constructor(theme?: Util.IHashTable<any>, transparent?: boolean, bound?: IBounds);
        protected pI(): Component;
        f(child?: Element): Component;
        gC(): HTMLCanvasElement;
        uc(uc?: boolean): boolean;
        private cache();
    }
    class Stage extends Sprite {
        private _c;
        private _z;
        private _v;
        private _h;
        private _m;
        private _e;
        private _n;
        private _w;
        private _g;
        private _u;
        constructor(context: CanvasRenderingContext2D);
        x(distance: number): Stage;
        y(distance: number): Stage;
        s(ratio: number): Stage;
        r(degrees: number): Stage;
        z(): Stage;
        d(): Promise<CanvasRenderingContext2D>;
        b(viewport: HTMLElement): Stage;
        t(x?: number, y?: number): Stage;
        h(): void;
        $s(x: number, y: number): [Sprite[], Sprite[], Sprite[]];
        protected $c(): void;
        private $d();
    }
    namespace Stage {
        function f(callback: FrameRequestCallback): void;
    }
    class Color extends Element {
        private _d;
        constructor(x: number, y: number, w: number, h: number, color: string, absolute?: boolean);
        constructor(bounds: IBounds, color: string, absolute?: boolean);
        d(context: CanvasRenderingContext2D): CanvasRenderingContext2D | Thenable<CanvasRenderingContext2D>;
        gN(): string;
    }
    class Image extends Element {
        private _d;
        private _l;
        constructor(image: Promise<HTMLImageElement>, x?: number, y?: number, w?: number, h?: number, absolute?: boolean, tile?: number);
        constructor(image: Promise<HTMLImageElement>, bounds?: IBounds, absolute?: boolean, tile?: number);
        d(context: CanvasRenderingContext2D): CanvasRenderingContext2D | Thenable<CanvasRenderingContext2D>;
        protected $r(): Promise<HTMLImageElement>[];
        $d(): Promise<HTMLImageElement>;
        gN(): string;
        $p(parent?: Sprite): Sprite;
    }
    class TextPhrase {
        static FONT: string;
        private _t;
        private _c;
        private _p;
        constructor(clob?: string, color?: string);
        t(clob: string): TextPhrase;
        c(color: string): TextPhrase;
        p(text: Text): TextPhrase;
        m(context: CanvasRenderingContext2D, maxWidth: number, offset?: number): [number, number];
        d(context: CanvasRenderingContext2D, x: number, y: number, offset?: number, length?: number): void;
        gL(): number;
        a(length: number): TextPhrase;
    }
    interface IPoint {
        x: number;
        y: number;
    }
    class Text extends Element {
        private _t;
        private _l;
        private _tf;
        private _ts;
        private _cp;
        private _tl;
        private _to;
        private _th;
        constructor(x: number, y: number, w: number, h: number, font?: string, size?: number, lineHeight?: number, align?: Text.Align, absolute?: boolean);
        constructor(bounds: IBounds, font?: string, size?: number, lineHeight?: number, align?: Text.Align, absolute?: boolean);
        s(ratio: number): Text;
        cl(context: CanvasRenderingContext2D, bounds: IBounds): [number, TextPhrase, number, number][][];
        d(context: CanvasRenderingContext2D): CanvasRenderingContext2D | Thenable<CanvasRenderingContext2D>;
        th(schedules: [number, TextPhrase, number, number][][]): Text;
        tf(size: number, font?: string, lineHeight?: number): Text;
        gTf(): [number, number, string];
        tl(letterSpacing: number): Text;
        tc(color: string): Text;
        to(offset: number): Text;
        gTc(): string;
        ts(size: number, offsetX?: number, offsetY?: number, color?: string): Text;
        gTs(): [number, number, number, string];
        a(text: TextPhrase): Text;
        gT(): TextPhrase[];
        c(): Text;
        gCp(): IBounds;
        gTl(): number;
    }
    namespace Text {
        enum Align {
            Left = 0,
            Center = 1,
            Right = 2,
        }
    }
    interface IFadeMetas extends Util.IHashTable<any> {
        opacity: number;
    }
    class Fade extends Animation {
        private _o;
        constructor(duration: number, metas: IFadeMetas);
        protected $p(element: Element, elpased: number): void;
    }
    class FadeIn extends Fade {
        constructor(duration: number);
    }
    class FadeOut extends Fade {
        constructor(duration: number);
    }
    class Delay extends Animation {
    }
    class Button extends Sprite {
        private _y;
        private _c;
        constructor(x: number, y: number, w: number, h: number, delay?: number, absolute?: boolean);
        constructor(bounds: IBounds, delay?: number, absolute?: boolean);
        b(callback: Util.IEventListener<Button>, hover?: Element, defaults?: Element): Button;
    }
    class ColorLinear extends Element {
        private _d;
        private _ra;
        constructor(x: number, y: number, w: number, h: number, color: [string, number][], radius?: number, absolute?: boolean);
        constructor(bounds: IBounds, color: [string, number][], radius?: number, absolute?: boolean);
        d(context: CanvasRenderingContext2D): CanvasRenderingContext2D | Thenable<CanvasRenderingContext2D>;
        sD(color: [string, number][]): ColorLinear;
        gN(): string;
    }
    class Combo extends Animation {
        private _a;
        constructor(animations: Animation[]);
        $p(element: Element, elapsed: number, done: () => void): void;
        $h(): void;
    }
    interface IAudioFadeMetas extends Util.IHashTable<any> {
        volume: number;
    }
    class AudioFadeOut extends Animation {
        private _v;
        constructor(duration: number);
        protected $p(element: HTMLAudioElement, elpased: number): void;
    }
    interface IMoveMetas extends Util.IHashTable<any> {
        x: number;
        y: number;
    }
    class Move extends Animation {
        private _x;
        private _y;
        constructor(duration: number, metas: IMoveMetas);
        protected $p(element: Element, elpased: number): void;
        $h(): void;
    }
    class Type extends Animation {
        private _r;
        private _s;
        constructor(rate?: number);
        protected $p(element: Text, elpased: number): void;
        $h(): void;
    }
    class TypeDelay extends Delay {
        private _r;
        constructor(rate?: number);
        $p(element: Text, elapsed: number): void;
    }
    class WaitForClick extends Animation {
        private _f;
        private _r;
        constructor(callback?: Util.IEventListener<Sprite>);
        $p(element: Sprite, elapsed: number, done: () => void): void;
        $h(): void;
    }
    interface IShutterMetas extends Util.IHashTable<any> {
        direction: string;
        bsize: boolean;
    }
    class Shutter extends Animation {
        private _cs;
        constructor(duration: number, metas: IShutterMetas);
        protected $p(element: Element, elpased: number): void;
    }
    interface IZoomMetas extends Util.IHashTable<any> {
        mx: number;
        my: number;
        scale: number;
    }
    class Zoom extends Animation {
        private _b;
        constructor(duration: number, metas: IZoomMetas);
        protected $p(element: Element, elpased: number): void;
        $h(): void;
    }
    class Shake extends Animation {
        private _x;
        private _y;
        constructor(duration: number);
        protected $p(element: Element, elpased: number): void;
    }
    class AudioFade extends Animation {
        private _vb;
        private _va;
        private _v;
        constructor(duration: number, volume: number);
        protected $p(element: HTMLAudioElement, elpased: number): void;
    }
    interface IDroppingMetas extends Util.IHashTable<any> {
        maxNum: number;
        numLevel: number;
        gravity: number;
        type: string;
        speed: [number, number];
        size_range: [number, number];
        hasBounce: boolean;
        wind_direction: number;
        hasGravity: boolean;
    }
    class Vector {
        private _x;
        private _y;
        constructor(x?: number, y?: number);
        a(v: any): Vector;
        c(): Vector;
        x(x?: number): number;
        y(y?: number): number;
    }
    class Drop {
        private _v;
        private _d;
        private _p;
        private _r;
        private _a;
        private _m;
        constructor(metas: Util.IHashTable<any>);
        u(): Drop;
        d(context: CanvasRenderingContext2D): void;
        gV(t: string): number;
    }
    class Bounce {
        private _d;
        private _u;
        private _v;
        constructor(x: number, y: number);
        u(gravity: number): Bounce;
        d(context: CanvasRenderingContext2D): void;
        gV(t: string): number;
    }
    class Dropping extends Animation {
        private _g;
        private _f;
        private _r;
        private _n;
        constructor(duration: number, metas: IDroppingMetas);
        protected $p(element: Element, elpased: number): void;
        $h(): void;
    }
    interface IProgressMetas extends Util.IHashTable<any> {
        width: number;
    }
    class Progress extends Animation {
        constructor(duration: number, metas: IProgressMetas);
        protected $p(element: Element, elpased: number): void;
        $h(): void;
    }
    interface IGifMetas extends Util.IHashTable<any> {
        bound: IBounds;
        interval: number;
    }
    class Gif extends Animation {
        private _x;
        private _f;
        constructor(rr: any[], metas: IGifMetas);
        protected $p(element: Element, elpased: number): void;
    }
    class Bar extends Animation {
        constructor(color: Util.IHashTable<any>);
        protected $p(element: Element, elpased: number): void;
    }
    var version: string;
}

declare module "bigine.c2d" {
    export = __Bigine_C2D;
}

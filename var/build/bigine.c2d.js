var __Bigine_Util = require("bigine.util");
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 定义包异常。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      E.ts
 */
var C2D;
(function (C2D) {
    var E = (function (_super) {
        __extends(E, _super);
        /**
         * 构造函数。
         */
        function E(message) {
            _super.call(this);
            if ('captureStackTrace' in Error)
                Error['captureStackTrace'](this, E);
            this.name = 'BigineC2DError';
            this.message = message;
        }
        E.ELEMENT_DEFERRED = '元素并未添加至舞台中';
        return E;
    }(Error));
    C2D.E = E;
})(C2D || (C2D = {}));
/**
 * 声明画面元素区域接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/IBounds.ts
 */
/**
 * 定义画面动画管理中心组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/ACenter.ts
 */
/// <reference path="Animation.ts" />
var C2D;
(function (C2D) {
    var Util = __Bigine_Util;
    var ACenter = (function () {
        function ACenter() {
        }
        /**
         * 注册动画。
         */
        ACenter.a = function (animation) {
            var _ = ACenter._;
            _.push(animation);
            return _.length;
        };
        /**
         * 获取指定动画。
         */
        ACenter.g = function (id) {
            return ACenter._[--id];
        };
        /**
         * 播放完结。
         */
        ACenter.d = function (id) {
            var _ = ACenter._;
            if (_[--id])
                delete _[id];
        };
        ACenter.h = function (id) {
            var _ = ACenter._;
            if (!id)
                return Util.each(_, function (animation, index) {
                    animation.h();
                    delete _[index];
                });
            if (_[--id])
                _[id].h();
            delete _[id];
        };
        ACenter.w = function (id) {
            var _ = ACenter._;
            if (!id)
                return Util.each(_, function (animation) {
                    animation.w();
                });
            if (_[--id])
                _[id].w();
        };
        ACenter.r = function (id) {
            var _ = ACenter._;
            if (!id)
                return Util.each(_, function (animation) {
                    animation.r();
                });
            if (_[--id])
                _[id].r();
        };
        /**
         * 已注册动画。
         */
        ACenter._ = [];
        return ACenter;
    }());
    C2D.ACenter = ACenter;
})(C2D || (C2D = {}));
/**
 * 定义抽象画面动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/Animation.ts
 */
/// <reference path="../../../include/mozRequestAnimationFrame.d.ts" />
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="ACenter.ts" />
var C2D;
(function (C2D) {
    var Util = __Bigine_Util;
    var Animation = (function () {
        /**
         * 构造函数。
         */
        function Animation(duration, metas) {
            this._d = Math.round(duration * 60 / 1000);
            this._m = metas || {};
            this._c = [];
            this._l = 1;
            this._p =
                this._h =
                    this._w = false;
            this._i = C2D.ACenter.a(this);
        }
        /**
         * 链式动画。
         */
        Animation.prototype.c = function (next) {
            this._c.push(next);
            return this;
        };
        /**
         * 循环。
         */
        Animation.prototype.l = function (times) {
            this._l = times || Infinity;
            return this;
        };
        /**
         * 执行。
         */
        Animation.prototype.p = function (element) {
            var _this = this;
            var r = Promise.resolve(element), counter = 0, once = function () {
                if (_this._h)
                    return r;
                return new Promise(function (resolve) {
                    var index = 0, done = function () {
                        if (!_this._h) {
                            if ('k' in element)
                                element.k(null);
                            _this._h = true;
                        }
                        resolve(element);
                    }, task = function (time) {
                        if (_this._h || index >= _this._d)
                            return done();
                        if (!_this._w)
                            _this.$p(element, ++index, done);
                        Animation.f(task);
                    };
                    Animation.f(task);
                }).then(function () {
                    if (!_this._h && ++counter < _this._l)
                        return once();
                    return element;
                });
            }, q;
            if (this._p || this._h)
                return r;
            this._p = true;
            this._t = element;
            q = once();
            q.then(function () {
                C2D.ACenter.d(_this._i);
            });
            if (!this._c.length)
                return q;
            return q.then(function () { return Util.Q.every(_this._c, function (anime) { return anime.p(element); }); });
        };
        /**
         * 帧执行。
         */
        Animation.prototype.$p = function (element, elpased, done) {
            //
        };
        /**
         * 中止。
         */
        Animation.prototype.h = function () {
            if (this._h)
                return this;
            this._h = true;
            if ('k' in this._t)
                this._t.k(null);
            this.$h();
            Util.each(this._c, function (anime) {
                anime.h();
            });
            return this;
        };
        /**
         * 中止处理。
         */
        Animation.prototype.$h = function () {
            //
        };
        /**
         * 暂停。
         */
        Animation.prototype.w = function () {
            this._w = true;
            return this;
        };
        /**
         * 恢复播放。
         */
        Animation.prototype.r = function () {
            this._w = false;
            return this;
        };
        /**
         * 获取暂停状态。
         */
        Animation.prototype.gW = function () {
            return this._w;
        };
        /**
         * 获取编号。
         */
        Animation.prototype.gI = function () {
            return this._i;
        };
        return Animation;
    }());
    C2D.Animation = Animation;
    var Animation;
    (function (Animation) {
        var raf, jobs = [], proxy = function (time) {
            Util.each(jobs.splice(0, jobs.length), function (callback) {
                callback(time);
            });
            raf(proxy);
        }, elapsed = 0, size;
        if (Util.ENV.Window) {
            raf = window.requestAnimationFrame ||
                window.msRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame;
            if (raf) {
                raf(proxy);
            }
            else
                setInterval(function () {
                    elapsed += 5;
                    size = jobs.length;
                    if ((1 + elapsed % 50) % 3 || !size)
                        return;
                    Util.each(jobs.splice(0, size), function (callback) {
                        callback(elapsed);
                    });
                }, 5);
        }
        /**
         * 帧处理。
         */
        function f(callback, draw) {
            if (draw) {
                jobs.unshift(callback);
            }
            else
                jobs.push(callback);
        }
        Animation.f = f;
    })(Animation = C2D.Animation || (C2D.Animation = {}));
})(C2D || (C2D = {}));
/**
 * 定义抽象画面元素组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/Element.ts
 */
/// <reference path="../E.ts" />
/// <reference path="IBounds.ts" />
/// <reference path="../_Animation/Animation.ts" />
/// <reference path="Sprite.ts" />
var C2D;
(function (C2D) {
    var Util = __Bigine_Util;
    var Element = (function () {
        function Element(x) {
            var args = [];
            for (var _c = 1; _c < arguments.length; _c++) {
                args[_c - 1] = arguments[_c];
            }
            if (!x || 'number' == typeof x) {
                this._b = {
                    x: x,
                    y: args[0],
                    w: args[1],
                    h: args[2]
                };
                this._a = !!args[3];
            }
            else {
                this._b = x;
                this._a = !!args[0];
            }
            this._b.x |= 0;
            this._b.y |= 0;
            this._b.w |= 0;
            this._b.h |= 0;
            this._r = 0;
            this._s =
                this._o = 1;
            this._f = false;
            this._i = '';
        }
        /**
         * 获取区域信息。
         */
        Element.prototype.gB = function () {
            var bounds = Util.clone(this._b), r, w, h;
            if (0 && this._r) {
                r %= 180;
                if (0 > r)
                    r += 180;
                if (90 == r) {
                    r = bounds.x;
                    bounds.x = bounds.y;
                    bounds.y = r;
                    r = bounds.w;
                    bounds.w = bounds.h;
                    bounds.h = r;
                }
                else if (r) {
                    r *= Math.PI / 180;
                    w = (bounds.h / Math.abs(Math.tan(Math.PI / 2 - r)) + bounds.w) / 2 * Math.cos(r);
                    h = (bounds.h / Math.abs(Math.tan(r)) + bounds.w) / 2 * Math.sin(r);
                    bounds = {
                        x: bounds.x + bounds.w / 2 - w,
                        y: bounds.y + bounds.h / 2 - h,
                        w: 2 * w,
                        h: 2 * h
                    };
                }
            }
            if (!this._a) {
                if (!this._p)
                    throw new C2D.E(C2D.E.ELEMENT_DEFERRED);
                var bp = this._p.gB();
                bounds.x += bp.x;
                bounds.y += bp.y;
            }
            return bounds;
        };
        /**
         * 移动 X 轴座标。
         */
        Element.prototype.x = function (value) {
            this._b.x = value;
            if (!this.gO())
                return this;
            return this.f();
        };
        /**
         * 移动 Y 轴座标。
         */
        Element.prototype.y = function (value) {
            this._b.y = value;
            if (!this.gO())
                return this;
            return this.f();
        };
        /**
         * 设置高度。
         */
        Element.prototype.sH = function (value) {
            this._b.h = value;
            if (!this.gO())
                return this;
            return this.f();
        };
        /**
         * 设置宽度。
         */
        Element.prototype.sW = function (value) {
            this._b.w = value;
            if (!this.gO())
                return this;
            return this.f();
        };
        /**
         * 缩放。
         */
        Element.prototype.s = function (ratio) {
            if (1 == ratio)
                return this;
            this._b.w = 0 | this._b.w * ratio;
            this._b.h = 0 | this._b.h * ratio;
            this._s *= ratio;
            if (!this.gO())
                return this;
            return this.f();
        };
        /**
         * 获取缩放系数。
         */
        Element.prototype.gS = function () {
            return this._s;
        };
        /**
         * 旋转。
         */
        Element.prototype.r = function (degrees) {
            if (this._r == degrees)
                return this;
            this._r = degrees % 360;
            if (0 > this._r)
                this._r += 360;
            if (!this.gO())
                return this;
            return this.f();
        };
        /**
         * 获取旋转度数。
         */
        Element.prototype.gR = function () {
            return this._r;
        };
        /**
         * 透明度。
         */
        Element.prototype.o = function (value) {
            if (this._o == value)
                return this;
            if (0 > value) {
                value = 0;
            }
            else if (1 < value)
                value = 1;
            this._o = value;
            return this.f();
        };
        /**
         * 获取透明度。
         */
        Element.prototype.gO = function () {
            return this._o * (this._p ? this._p.gO() : 1);
        };
        /**
         * 绘制。
         */
        Element.prototype.d = function (context) {
            this._f = false;
            return context;
        };
        /**
         * 执行动画。
         */
        Element.prototype.p = function (animation) {
            if (this._k)
                this._k.h();
            this._k = animation;
            return animation.p(this);
        };
        /**
         * 设置编号。
         */
        Element.prototype.i = function (id) {
            this._i = id;
            return this;
        };
        /**
         * 获取编号。
         */
        Element.prototype.gI = function () {
            return this._i;
        };
        /**
         * 发生变更。
         */
        Element.prototype.f = function () {
            this._f = true;
            if (this._p)
                this._p.f(this);
            return this;
        };
        /**
         * 设置父元素。
         */
        Element.prototype.$p = function (parent) {
            this._p = parent;
            return this;
        };
        /**
         * 获取名称。
         */
        Element.prototype.gN = function () {
            return '';
        };
        /**
         * 设置 / 获取当前动画。
         */
        Element.prototype.k = function (anim) {
            if (anim || anim == null)
                this._k = anim;
            return this._k;
        };
        return Element;
    }());
    C2D.Element = Element;
})(C2D || (C2D = {}));
/**
 * 定义画面组合元素组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/Sprite.ts
 */
/// <reference path="Element.ts" />
var C2D;
(function (C2D) {
    var Util = __Bigine_Util;
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        function Sprite(x, y, w, h, transparent, absolute) {
            if ('object' == typeof x) {
                _super.call(this, x, w);
                this._t = !!y;
            }
            else {
                _super.call(this, x, y, w, h, absolute);
                this._t = !!transparent;
            }
            this._d = [];
            this._f = false;
            this._l = {};
        }
        /**
         * 缩放。
         */
        Sprite.prototype.s = function (ratio) {
            Util.each(this._d, function (el) {
                el.s(ratio);
            });
            return _super.prototype.s.call(this, ratio);
        };
        /**
         * 旋转。
         */
        Sprite.prototype.r = function (degrees) {
            Util.each(this._d, function (el) {
                el.r(degrees);
            });
            return _super.prototype.r.call(this, degrees);
        };
        /**
         * 绘制。
         */
        Sprite.prototype.d = function (context) {
            var _this = this;
            var opacity = this.gO();
            if (opacity && this._d.length) {
                if (1 != opacity) {
                    context.save();
                    context.globalAlpha = opacity;
                }
                return Util.Q.every(this._d, function (el) { return el.d(context); })
                    .then(function () {
                    if (1 != opacity)
                        context.restore();
                    return _super.prototype.d.call(_this, context);
                });
            }
            return _super.prototype.d.call(this, context);
        };
        /**
         * 发生变更。
         */
        Sprite.prototype.f = function (child) {
            this._f = true;
            if (this._p)
                this._p.f(this);
            return this;
        };
        /**
         * 设置父元素。
         */
        Sprite.prototype.$p = function (parent) {
            if (!parent && this._p)
                return this._p;
            return _super.prototype.$p.call(this, parent);
        };
        /**
         * 新增事件监听。
         */
        Sprite.prototype.addEventListener = function (type, listener) {
            this._l[type] = this._l[type] || [];
            this._l[type].push(listener);
            return this;
        };
        /**
         * 取消事件监听。
         */
        Sprite.prototype.removeEventListener = function (type, listener) {
            var _this = this;
            Util.some(this._l[type] || [], function (reged, index) {
                if (reged == listener) {
                    _this._l[type].splice(index, 1);
                    return true;
                }
                return false;
            });
            return this;
        };
        /**
         * 发生事件。
         */
        Sprite.prototype.dispatchEvent = function (event) {
            var type = event.gT();
            Util.each(this._l[type] || [], function (listener) {
                listener.call(undefined, event);
            });
            return this;
        };
        Sprite.prototype.a = function (element, before, step) {
            var index = -1;
            if ('string' == typeof before)
                before = this.q(before)[0];
            if (before)
                index = Util.indexOf(this._d, before);
            if (-1 == index)
                index = this._d.length;
            if (step)
                index = index + step;
            this._d.splice(index, 0, element.$p(this));
            if (!this.gO())
                return this;
            return this.f();
        };
        /**
         * 删除元素。
         */
        Sprite.prototype.e = function (element) {
            var index = Util.indexOf(this._d, element);
            if (-1 != index)
                this._d.splice(index, 1);
            if (!this.gO())
                return this;
            return this.f();
        };
        /**
         * 删除所有元素。
         */
        Sprite.prototype.c = function () {
            this._d = [];
            if (!this.gO())
                return this;
            return this.f();
        };
        /**
         * 根据编号查找元素。
         */
        Sprite.prototype.q = function (id) {
            var result = [];
            Util.each(this._d, function (element) {
                if ('q' in element)
                    result = result.concat(element.q(id));
                if (element.gI() == id)
                    result.push(element);
            });
            return result;
        };
        /**
         * 根据座标查找元素。
         */
        Sprite.prototype.$m = function (x, y) {
            var els = [], bounds;
            Util.some(Util.clone(this._d).reverse(), function (element) {
                if (!('$m' in element) || !element.gO())
                    return false;
                bounds = element.gB();
                if (bounds.x > x || bounds.y > y || bounds.x + bounds.w < x || bounds.y + bounds.h < y)
                    return false;
                els = els.concat(element.$m(x, y));
                return !element._t;
            });
            return this._t ?
                els :
                els.concat(this);
        };
        /**
         * 获取需绘制地图片集合。
         */
        Sprite.prototype.$r = function () {
            var resources = [];
            Util.each(this._d, function (element) {
                if (!('$r' in element))
                    return;
                resources = resources.concat(element.$r());
            });
            return resources;
        };
        return Sprite;
    }(C2D.Element));
    C2D.Sprite = Sprite;
})(C2D || (C2D = {}));
/**
 * 声明（画面）鼠标事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Event/IMouseEventMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../_Element/Stage.ts" />
/**
 * 定义画面抽象鼠标事件组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Event/SpriteMouseEvent.ts
 */
/// <reference path="IMouseEventMetas.ts" />
var C2D;
(function (C2D) {
    var SpriteMouseEvent = (function () {
        /**
         * 构造函数。
         */
        function SpriteMouseEvent(metas) {
            this.target = metas.target;
            this.x = metas.x;
            this.y = metas.y;
            this.from = metas.from;
            this.fromX = metas.fromX;
            this.fromY = metas.fromY;
            this.stage = metas.stage;
        }
        /**
         * 获取类型。
         */
        SpriteMouseEvent.prototype.gT = function () {
            return '';
        };
        return SpriteMouseEvent;
    }());
    C2D.SpriteMouseEvent = SpriteMouseEvent;
})(C2D || (C2D = {}));
/**
 * 定义画面鼠标聚焦事件组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Event/SpriteFocusEvent.ts
 */
/// <reference path="SpriteMouseEvent.ts" />
var C2D;
(function (C2D) {
    var SpriteFocusEvent = (function (_super) {
        __extends(SpriteFocusEvent, _super);
        function SpriteFocusEvent() {
            _super.apply(this, arguments);
        }
        /**
         * 获取类型。
         */
        SpriteFocusEvent.prototype.gT = function () {
            return 'focus';
        };
        return SpriteFocusEvent;
    }(C2D.SpriteMouseEvent));
    C2D.SpriteFocusEvent = SpriteFocusEvent;
})(C2D || (C2D = {}));
/**
 * 定义画面鼠标失焦事件组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Event/SpriteBlurEvent.ts
 */
/// <reference path="SpriteMouseEvent.ts" />
var C2D;
(function (C2D) {
    var SpriteBlurEvent = (function (_super) {
        __extends(SpriteBlurEvent, _super);
        function SpriteBlurEvent() {
            _super.apply(this, arguments);
        }
        /**
         * 获取类型。
         */
        SpriteBlurEvent.prototype.gT = function () {
            return 'blur';
        };
        return SpriteBlurEvent;
    }(C2D.SpriteMouseEvent));
    C2D.SpriteBlurEvent = SpriteBlurEvent;
})(C2D || (C2D = {}));
/**
 * 定义画面鼠标移动事件组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Event/SpriteMouseMoveEvent.ts
 */
/// <reference path="SpriteMouseEvent.ts" />
var C2D;
(function (C2D) {
    var SpriteMouseMoveEvent = (function (_super) {
        __extends(SpriteMouseMoveEvent, _super);
        function SpriteMouseMoveEvent() {
            _super.apply(this, arguments);
        }
        /**
         * 获取类型。
         */
        SpriteMouseMoveEvent.prototype.gT = function () {
            return 'mousemove';
        };
        return SpriteMouseMoveEvent;
    }(C2D.SpriteMouseEvent));
    C2D.SpriteMouseMoveEvent = SpriteMouseMoveEvent;
})(C2D || (C2D = {}));
/**
 * 定义画面鼠标点击事件组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Event/SpriteClickEvent.ts
 */
/// <reference path="SpriteMouseEvent.ts" />
var C2D;
(function (C2D) {
    var SpriteClickEvent = (function (_super) {
        __extends(SpriteClickEvent, _super);
        function SpriteClickEvent() {
            _super.apply(this, arguments);
        }
        /**
         * 获取类型。
         */
        SpriteClickEvent.prototype.gT = function () {
            return 'click';
        };
        return SpriteClickEvent;
    }(C2D.SpriteMouseEvent));
    C2D.SpriteClickEvent = SpriteClickEvent;
})(C2D || (C2D = {}));
/**
 * 定义计算 Canvas 元素。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/Context.ts
 */
var C2D;
(function (C2D) {
    var Context = (function () {
        function Context() {
        }
        /**
         * create calc canvas。
         */
        Context.gC = function (create) {
            if (create) {
                var canvas = document.createElement('canvas');
                canvas.width = 1280;
                canvas.height = 720;
                canvas.style.display = 'none';
                Context._c = canvas.getContext('2d');
                Context._f = Promise.resolve(Context._c);
            }
            return Context._c;
        };
        /**
         * push into calc queue。
         */
        Context.pC = function (func) {
            Context._f = Context._f.then(func);
        };
        return Context;
    }());
    C2D.Context = Context;
})(C2D || (C2D = {}));
/**
 * 定义组件组合元素。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/Component.ts
 */
/// <reference path="Element.ts" />
/// <reference path="Context.ts" />
var C2D;
(function (C2D) {
    var Util = __Bigine_Util;
    var Component = (function (_super) {
        __extends(Component, _super);
        function Component(theme, transparent, bound) {
            var x = bound ? bound.x : 0, y = bound ? bound.y : 0, w = bound ? bound.w : 1280, h = bound ? bound.h : 720, canvas = document.createElement('canvas');
            _super.call(this, x, y, w, h, transparent);
            canvas.width = w;
            canvas.height = h;
            this._cw = canvas.getContext('2d');
            this._tm = theme;
            this._pi =
                this._uc = false;
            this.o(0);
        }
        /**
         * 发生变更。
         */
        Component.prototype.f = function (child) {
            var _this = this;
            C2D.Context.pC(function () { return _this.cache(); });
            return this;
        };
        /**
         * 获取 Component 缓存。
         */
        Component.prototype.gC = function () {
            return this._cw.canvas;
        };
        /**
         * 缓存是否发生变更。
         */
        Component.prototype.uc = function (uc) {
            if (uc != undefined)
                this._uc = uc;
            return this._uc;
        };
        /**
         * 第一次绘制 Lazy Draw。
         */
        Component.prototype.pI = function () {
            this._pi = true;
            return this;
        };
        /**
         * 计算 Canvas 绘制缓存。
         */
        Component.prototype.cache = function () {
            var _this = this;
            return new Promise(function (resolve) {
                var w = 1280, h = 720, opacity = _this.gO(), context = C2D.Context.gC();
                if (!opacity || !_this._d.length) {
                    _this._cw.clearRect(0, 0, w, h);
                    _this._uc = true;
                    resolve(context);
                }
                else {
                    if (1 != opacity) {
                        context.save();
                        context.globalAlpha = opacity;
                    }
                    context.clearRect(0, 0, w, h);
                    Util.Q.every(_this._d, function (el) { return el.d(context); })
                        .then(function () {
                        if (1 != opacity)
                            context.restore();
                        _this._cw.clearRect(0, 0, w, h);
                        _this._cw.drawImage(context.canvas, 0, 0, w, h);
                        _this._uc = true;
                        resolve(context);
                    });
                }
            });
        };
        return Component;
    }(C2D.Sprite));
    C2D.Component = Component;
})(C2D || (C2D = {}));
/**
 * 定义全画面舞台组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/Stage.ts
 */
/// <reference path="Sprite.ts" />
/// <reference path="../_Event/SpriteFocusEvent.ts" />
/// <reference path="../_Event/SpriteBlurEvent.ts" />
/// <reference path="../_Event/SpriteMouseMoveEvent.ts" />
/// <reference path="../_Event/SpriteClickEvent.ts" />
/// <reference path="Context.ts" />
/// <reference path="Component.ts" />
var C2D;
(function (C2D) {
    var Util = __Bigine_Util;
    var Stage = (function (_super) {
        __extends(Stage, _super);
        /**
         * 构造函数。
         */
        function Stage(context) {
            var _this = this;
            var canvas = context.canvas, shadow = document.createElement('canvas'), middle = document.createElement('canvas'), parent = canvas.parentNode, w = canvas.width, h = canvas.height;
            shadow.width = middle.width = w;
            shadow.height = middle.height = h;
            parent.appendChild(C2D.Context.gC(true).canvas);
            _super.call(this, 0, 0, w, h, false, true);
            this._c = context;
            this.z();
            this._m = {
                target: this,
                x: 0,
                y: 0,
                from: this,
                fromX: 0,
                fromY: 0,
                stage: this
            };
            this._h = [
                function (event) {
                    event.stopPropagation();
                    var sprites = _this.$s(event.offsetX * _this._z, event.offsetY * _this._z), ev;
                    if (sprites[0].length) {
                        ev = new C2D.SpriteFocusEvent(_this._m);
                        Util.each(sprites[0], function (element) {
                            element.dispatchEvent(ev);
                        });
                    }
                    if (sprites[2].length) {
                        ev = new C2D.SpriteBlurEvent(_this._m);
                        Util.each(sprites[2], function (element) {
                            element.dispatchEvent(ev);
                        });
                    }
                    if (sprites[1].length) {
                        ev = new C2D.SpriteMouseMoveEvent(_this._m);
                        Util.each(sprites[1], function (element) {
                            element.dispatchEvent(ev);
                        });
                    }
                    return false;
                },
                function (event) {
                    _this.$c();
                }
            ];
            this._e = [];
            this._u = false;
            this._n = false;
            this._w = shadow.getContext('2d');
            this._g = middle.getContext('2d');
            this.b(context.canvas);
            Stage.f(this.$d.bind(this));
            Stage.f(function () {
                if (_this._u) {
                    _this._c.clearRect(0, 0, w, h);
                    _this._c.drawImage(_this._g.canvas, 0, 0, w, h);
                    _this._u = false;
                }
            });
        }
        /**
         * 移动 X 轴座标。
         */
        Stage.prototype.x = function (distance) {
            return this;
        };
        /**
         * 移动 Y 轴座标。
         */
        Stage.prototype.y = function (distance) {
            return this;
        };
        /**
         * 缩放。
         */
        Stage.prototype.s = function (ratio) {
            return this;
        };
        /**
         * 旋转。
         */
        Stage.prototype.r = function (degrees) {
            return this;
        };
        /**
         * 计算缩放比例。
         */
        Stage.prototype.z = function () {
            var canvas = this._c.canvas;
            this._z = canvas.width / canvas.scrollWidth;
            return this;
        };
        /**
         * 绘制。
         */
        Stage.prototype.d = function () {
            var _this = this;
            if (this._n)
                return Promise.resolve(this._c);
            var w = 1280, h = 720;
            return Promise.all(this.$r())
                .then(function () {
                _this._n = true;
                _this._w.clearRect(0, 0, w, h);
                return Util.Q.every(_this._d, function (element, index) {
                    if (element.gO())
                        _this._w.drawImage(element.gC(), 0, 0, w, h);
                    return _this._w;
                });
            }).then(function () {
                _this._g.clearRect(0, 0, w, h);
                _this._g.drawImage(_this._w.canvas, 0, 0, w, h);
                _this._u = true;
                _this._n = false;
                return _this._g;
            });
        };
        /**
         * 绑定视图。
         */
        Stage.prototype.b = function (viewport) {
            if (this._v) {
                this._v.removeEventListener('mousemove', this._h[0]);
                this._v.removeEventListener('click', this._h[1]);
            }
            this._v = viewport;
            this._v.addEventListener('mousemove', this._h[0]);
            this._v.addEventListener('click', this._h[1]);
            return this;
        };
        /**
         * 模拟点击。
         */
        Stage.prototype.t = function (x, y) {
            x = x || this._m.x;
            y = y || this._m.y;
            var real = this._m;
            if (x != this._m.x || y != this._m.y)
                this.$s(x, y);
            this.$c();
            this._m = real;
            return this;
        };
        /**
         * 停止工作。
         */
        Stage.prototype.h = function () {
            var _this = this;
            this.f = function () { return _this; };
            this._f = false;
            this._u = false;
            this._n = false;
            this._v.removeEventListener('mousemove', this._h[0]);
            this._v.removeEventListener('click', this._h[1]);
        };
        /**
         * 根据座标查找元素。
         */
        Stage.prototype.$s = function (x, y) {
            x |= 0;
            y |= 0;
            var sprites = [[], [], []], els = this.$m(x, y).slice(0, -1), // 查找新座标点新树
            bounds, inside, out;
            Util.each(this._e, function (element) {
                bounds = element.gB();
                inside = -1 != Util.indexOf(els, element);
                out = x < bounds.x || y < bounds.y || x > bounds.x + bounds.w || y > bounds.y + bounds.h;
                if (!inside && !out) {
                    inside = true;
                    els.push(element);
                }
                sprites[inside ? 1 : 2].push(element);
            });
            this._e = els;
            this._m.fromX = this._m.x;
            this._m.fromY = this._m.y;
            this._m.x = x;
            this._m.y = y;
            Util.each(els, function (element) {
                if (-1 == Util.indexOf(sprites[1], element))
                    sprites[0].push(element);
            });
            this._m.target = sprites[0][0] || sprites[1][0];
            this._m.from = sprites[2][0];
            return sprites;
        };
        /**
         * 模拟点击。
         */
        Stage.prototype.$c = function () {
            if (!this._m.target)
                return;
            var sprites = [this._m.target], parent = sprites[0].$p(), ev = new C2D.SpriteClickEvent(this._m);
            while (parent && parent != this) {
                sprites.push(parent);
                parent = parent.$p();
            }
            Util.each(sprites, function (element) {
                element.dispatchEvent(ev);
            });
        };
        /**
         * 绘制调度。
         */
        Stage.prototype.$d = function () {
            var _this = this;
            var event, flag = false;
            Util.each(this._d, function (element) {
                if (element.uc()) {
                    flag = true;
                    element.uc(false);
                }
            });
            if (flag) {
                Util.each(this.$s(this._m.x, this._m.y)[0], function (element) {
                    if (!event)
                        event = new C2D.SpriteFocusEvent(_this._m);
                    element.dispatchEvent(event);
                });
                this.d();
            }
        };
        return Stage;
    }(C2D.Sprite));
    C2D.Stage = Stage;
    var Stage;
    (function (Stage) {
        var raf, jobs = [], proxy = function (time) {
            Util.each(jobs, function (callback) {
                callback(time);
            });
            raf(proxy);
        }, elapsed = 0, size;
        if (Util.ENV.Window) {
            raf = window.requestAnimationFrame || window.msRequestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame;
            if (raf) {
                raf(proxy);
            }
            else
                setInterval(function () {
                    elapsed += 5;
                    size = jobs.length;
                    if ((1 + elapsed % 50) % 3 || !size)
                        return;
                    Util.each(jobs, function (callback) {
                        callback(elapsed);
                    });
                }, 5);
        }
        /**
         * 帧处理。
         */
        function f(callback) {
            jobs.push(callback);
        }
        Stage.f = f;
    })(Stage = C2D.Stage || (C2D.Stage = {}));
})(C2D || (C2D = {}));
/**
 * 定义色块画面元素组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/Color.ts
 */
/// <reference path="Element.ts" />
var C2D;
(function (C2D) {
    var Color = (function (_super) {
        __extends(Color, _super);
        function Color(x, y, w, h, color, absolute) {
            if ('object' == typeof x) {
                _super.call(this, x, w);
                this._d = y;
            }
            else {
                _super.call(this, x, y, w, h, absolute);
                this._d = color;
            }
        }
        /**
         * 绘制。
         */
        Color.prototype.d = function (context) {
            var opacity = this.gO();
            if (opacity) {
                context.save();
                context.globalAlpha = opacity;
                var bounds = this.gB();
                context.fillStyle = this._d;
                context.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);
                context.restore();
            }
            return _super.prototype.d.call(this, context);
        };
        /**
         * 获取名称。
         */
        Color.prototype.gN = function () {
            return 'Color';
        };
        return Color;
    }(C2D.Element));
    C2D.Color = Color;
})(C2D || (C2D = {}));
/**
 * 定义图像画面元素组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/Image.ts
 */
/// <reference path="Element.ts" />
var C2D;
(function (C2D) {
    var Image = (function (_super) {
        __extends(Image, _super);
        function Image(image, x, y, w, h, absolute, tile) {
            var _this = this;
            _super.call(this, x, y, w, h, absolute);
            this._d = image;
            if (!x || 'number' == typeof x) {
                this._l = tile || 0;
            }
            else {
                this._l = w || 0;
            }
            if (!this._b.w || !this._b.h)
                image.then(function (img) {
                    if (_this._b.w) {
                        _this._b.h = 0 | _this._b.w * img.height / img.width;
                    }
                    else if (_this._b.h) {
                        _this._b.w = 0 | _this._b.h * img.width / img.height;
                    }
                    else {
                        _this._b.w = img.width;
                        _this._b.h = img.height;
                    }
                });
        }
        /**
         * 绘制。
         */
        Image.prototype.d = function (context) {
            var _this = this;
            var opacity = this.gO();
            if (opacity) {
                return this._d.then(function (img) {
                    if (1 != opacity) {
                        context.save();
                        context.globalAlpha = opacity;
                    }
                    var bounds = _this.gB(), x, y, w, h;
                    if (_this._l) {
                        if ('number' == typeof _this._l) {
                            x = Math.round(bounds.x / 720 * _this._l);
                            y = Math.round(bounds.y / 720 * _this._l);
                            w = Math.round(bounds.w / 720 * _this._l);
                            h = Math.round(bounds.h / 720 * _this._l);
                        }
                        else {
                            x = _this._l['x'];
                            y = _this._l['y'];
                            w = _this._l['w'];
                            h = _this._l['h'];
                        }
                        context.drawImage(img, x, y, w, h, bounds.x, bounds.y, bounds.w, bounds.h);
                    }
                    else {
                        context.drawImage(img, bounds.x, bounds.y, bounds.w, bounds.h);
                    }
                    if (1 != opacity)
                        context.restore();
                    return context;
                });
            }
            return _super.prototype.d.call(this, context);
        };
        /**
         * 获取需绘制地图片集合。
         */
        Image.prototype.$r = function () {
            return [this._d];
        };
        /**
         * 获取需绘制地图片。
         */
        Image.prototype.$d = function () {
            return this._d;
        };
        /**
         * 获取名称。
         */
        Image.prototype.gN = function () {
            return 'Image';
        };
        /**
         * 设置父元素。
         */
        Image.prototype.$p = function (parent) {
            if (!parent && this._p)
                return this._p;
            return _super.prototype.$p.call(this, parent);
        };
        return Image;
    }(C2D.Element));
    C2D.Image = Image;
})(C2D || (C2D = {}));
/**
 * 定义画面文字组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/TextPhrase.ts
 */
/// <reference path="Text.ts" />
var C2D;
(function (C2D) {
    var TextPhrase = (function () {
        /**
         * 构造函数。
         */
        function TextPhrase(clob, color) {
            this._t = (clob || '').toString();
            this._c = color || '';
        }
        /**
         * 设置文本内容。
         */
        TextPhrase.prototype.t = function (clob) {
            this._t = clob.toString();
            return this;
        };
        /**
         * 设置颜色。
         */
        TextPhrase.prototype.c = function (color) {
            this._c = color;
            return this;
        };
        /**
         * 设置主画面元素。
         */
        TextPhrase.prototype.p = function (text) {
            this._p = text;
            return this;
        };
        /**
         * 计算可绘制字符数。
         */
        TextPhrase.prototype.m = function (context, maxWidth, offset) {
            var clob = offset ?
                this._t.substr(offset) :
                this._t, compare = function (text, maxWidth2) {
                var length = text.length, result2 = [length, context.measureText(text).width], result3;
                if (result2[1] <= maxWidth2)
                    return result2;
                if (1 == length)
                    return [0, 0];
                length = 0 | length / 2; // 中分
                result2 = compare(text.substr(0, length), maxWidth2);
                if (length != result2[0])
                    return result2;
                result3 = compare(text.substr(length), maxWidth2 - result2[1]);
                result2[0] += result3[0];
                result2[1] += result3[1];
                return result2;
            }, font, shadow, result;
            offset = clob.length;
            if (!this._p || !offset)
                return [0, 0];
            font = this._p.gTf();
            shadow = this._p.gTs();
            context.save();
            context.font = font[0] + 'px/' + font[1] + 'px "' + font[2] + '", ' + TextPhrase.FONT;
            context.textBaseline = 'middle';
            if (shadow[2]) {
                context.shadowBlur = shadow[2];
                context.shadowOffsetX = shadow[0];
                context.shadowOffsetY = shadow[1];
                context.shadowColor = shadow[3];
            }
            if (context.measureText(clob[0]).width > maxWidth) {
                result = [0, 0];
            }
            else
                result = compare(clob, maxWidth);
            context.restore();
            return result;
        };
        /**
         * 绘制。
         */
        TextPhrase.prototype.d = function (context, x, y, offset, length) {
            if (!this._p)
                return;
            var clob = this._t.substr(offset || 0, length || this._t.length), color = this._c || this._p.gTc(), font = this._p.gTf(), shadow = this._p.gTs();
            if (!clob.length)
                return;
            context.save();
            context.fillStyle = color;
            context.font = font[0] + 'px/' + font[1] + 'px "' + font[2] + '", ' + TextPhrase.FONT;
            context.textBaseline = 'middle';
            if (shadow[2]) {
                context.shadowBlur = shadow[2];
                context.shadowOffsetX = shadow[0];
                context.shadowOffsetY = shadow[1];
                context.shadowColor = shadow[3];
            }
            context.fillText(clob, Math.ceil(x), Math.ceil(y));
            context.restore();
        };
        /**
         * 获取长度。
         */
        TextPhrase.prototype.gL = function () {
            return this._t.length;
        };
        /**
         * 截取。
         */
        TextPhrase.prototype.a = function (length) {
            return new TextPhrase(this._t.substr(0, length), this._c);
        };
        /**
         * 字体。
         */
        TextPhrase.FONT = '"Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", Arial, sans-serif';
        return TextPhrase;
    }());
    C2D.TextPhrase = TextPhrase;
})(C2D || (C2D = {}));
/**
 * 声明点元素区域接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/IPoint.ts
 */
/**
 * 定义文字画面元素组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/Text.ts
 */
/// <reference path="Element.ts" />
/// <reference path="TextPhrase.ts" />
/// <reference path="IPoint.ts" />
var C2D;
(function (C2D) {
    var Util = __Bigine_Util;
    var Text = (function (_super) {
        __extends(Text, _super);
        function Text(x, y, w, h, font, size, lineHeight, align, absolute) {
            if ('object' == typeof x) {
                _super.call(this, x, size);
                this._tf = [16, 24, '#000', 0, ''];
                this._tf[0] = 0 | w;
                this._tf[1] = 0 | Math.max(w, h);
                this._tf[2] = x['c'] || '#000';
                this._tf[4] = y || '';
                this._l = font;
                this._cp = { x: x.x, y: x.y };
            }
            else {
                _super.call(this, x, y, w, h, absolute);
                this._tf = [16, 24, '#000', 0, ''];
                this._tf[0] = 0 | size;
                this._tf[1] = 0 | Math.max(size, lineHeight);
                this._tf[4] = font || '';
                this._l = align;
                this._cp = { x: x, y: y };
            }
            var aligns = Text.Align;
            switch (this._l) {
                case aligns.Left:
                case aligns.Center:
                case aligns.Right:
                    break;
                default:
                    this._l = aligns.Left;
            }
            this._t = [];
            this._to = 0;
            this._ts = [0, 0, 0, '#000'];
            this._th = [];
        }
        /**
         * 缩放。
         */
        Text.prototype.s = function (ratio) {
            if (1 == ratio)
                return this;
            this._tf[0] = 0 | this._tf[0] * ratio;
            this._tf[1] = 0 | this._tf[1] * ratio;
            this._ts[0] = 0 | this._ts[0] * ratio;
            this._ts[1] = 0 | this._ts[1] * ratio;
            this._ts[2] = 0 | this._ts[2] * ratio;
            return _super.prototype.s.call(this, ratio);
        };
        /**
         * 计算行数。
         */
        Text.prototype.cl = function (context, bounds) {
            if (this._th.length)
                return this._th;
            var schedules = [[]], // width, TextPhrase, offset, length
            line = schedules[0], width = bounds.w - this._to, m, // length, width
            offset;
            Util.each(this._t, function (phrase) {
                offset = 0;
                while (offset != phrase.gL()) {
                    m = phrase.m(context, width, offset);
                    if (m[0]) {
                        line.push([m[1], phrase, offset, m[0]]);
                        width -= m[1];
                        offset += m[0];
                    }
                    else {
                        line = [];
                        schedules.push(line);
                        width = bounds.w;
                    }
                }
            });
            return schedules;
        };
        /**
         * 绘制。
         */
        Text.prototype.d = function (context) {
            var _this = this;
            var opacity = this.gO(), schedules = [[]], // width, TextPhrase, offset, length
            //line: [number, TextPhrase, number, number][] = schedules[0],
            aligns = Text.Align, bounds = this.gB(), 
            //width: number = bounds.w,
            width = bounds.w - this._to, 
            //m: [number, number], // length, width
            offset;
            if (opacity && (this._t.length || this._th.length)) {
                context.canvas.style.letterSpacing = this._tf[3] + 'px'; // 设置字间距
                schedules = this.cl(context, bounds);
                // Util.each(this._t, (phrase: TextPhrase) => {
                //     offset = 0;
                //     while (offset != phrase.gL()) {
                //         m = phrase.m(context, width, offset);
                //         if (m[0]) {
                //             line.push([m[1], phrase, offset, m[0]]);
                //             width -= m[1];
                //             offset += m[0];
                //         } else {
                //             line = [];
                //             schedules.push(line);
                //             width = bounds.w;
                //         }
                //     }
                // });
                if (1 != opacity) {
                    context.save();
                    context.globalAlpha = opacity;
                }
                Util.each(schedules, function (line2, index) {
                    if (_this._l != aligns.Left) {
                        width = 0;
                        Util.each(line2, function (section) {
                            width += section[0];
                        });
                        offset = bounds.w - width;
                        if (_this._l == aligns.Center)
                            offset = 0 | offset / 2;
                    }
                    else
                        offset = index == 0 ? _this._to : 0; // x
                    offset += bounds.x;
                    width = bounds.y + _this._tf[1] * (1 + index); // y
                    Util.each(line2, function (section) {
                        section[1].d(context, offset, width - _this._tf[0], section[2], section[3]);
                        offset += section[0];
                    });
                });
                if (1 != opacity)
                    context.restore();
            }
            this._cp.x = offset;
            this._cp.y = width;
            this._tl = schedules.length;
            return _super.prototype.d.call(this, context);
        };
        /**
         * 设置文字行数据。
         */
        Text.prototype.th = function (schedules) {
            this._th = schedules;
            return this;
        };
        /**
         * 设置字号。
         */
        Text.prototype.tf = function (size, font, lineHeight) {
            this._tf[0] = 0 | size;
            this._tf[1] = 0 | Math.max(size, lineHeight);
            this._tf[4] = font || '';
            return this;
        };
        /**
         * 获取字号。
         */
        Text.prototype.gTf = function () {
            var result = [0, 0, ''];
            result[0] = this._tf[0];
            result[1] = this._tf[1];
            result[2] = this._tf[4];
            return result;
        };
        /**
         * 设置字间距。
         */
        Text.prototype.tl = function (letterSpacing) {
            this._tf[3] = 0 | letterSpacing;
            return this;
        };
        /**
         * 设置颜色。
         */
        Text.prototype.tc = function (color) {
            this._tf[2] = color || '#000';
            return this;
        };
        /**
         * 设置当前文本首行偏移 offset。
         */
        Text.prototype.to = function (offset) {
            this._to = offset || 0;
            return this;
        };
        /**
         * 获取颜色。
         */
        Text.prototype.gTc = function () {
            return this._tf[2];
        };
        /**
         * 设置阴影。
         */
        Text.prototype.ts = function (size, offsetX, offsetY, color) {
            this._ts = [0 | offsetX, 0 | offsetY, 0 | size, color || '#000'];
            return this;
        };
        /**
         * 获取阴影（横向偏移，纵向偏移，大小，颜色）。
         */
        Text.prototype.gTs = function () {
            return this._ts;
        };
        /**
         * 添加文字。
         */
        Text.prototype.a = function (text) {
            this._t.push(text.p(this));
            return this.f();
        };
        /**
         * 获取文字。
         */
        Text.prototype.gT = function () {
            return this._t;
        };
        /**
         * 清空所有已添加文字。
         */
        Text.prototype.c = function () {
            this._t = [];
            this._tl = 0;
            return this.f();
        };
        /**
         * 获取光标位置。
         */
        Text.prototype.gCp = function () {
            return this._cp;
        };
        /**
         * 获取文本行数。
         */
        Text.prototype.gTl = function () {
            return this._tl;
        };
        return Text;
    }(C2D.Element));
    C2D.Text = Text;
    var Text;
    (function (Text) {
        /**
         * 对齐方式。
         */
        (function (Align) {
            /**
             * 左对齐。
             */
            Align[Align["Left"] = 0] = "Left";
            /**
             * 居中对齐。
             */
            Align[Align["Center"] = 1] = "Center";
            /**
             * 右对齐。
             */
            Align[Align["Right"] = 2] = "Right";
        })(Text.Align || (Text.Align = {}));
        var Align = Text.Align;
        ;
    })(Text = C2D.Text || (C2D.Text = {}));
})(C2D || (C2D = {}));
/**
 * 声明透明度渐变动画元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/IFadeMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/**
 * 定义透明度渐变动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/Fade.ts
 */
/// <reference path="Animation.ts" />
/// <reference path="IFadeMetas.ts" />
/// <reference path="../_Element/Element.ts" />
var C2D;
(function (C2D) {
    var Fade = (function (_super) {
        __extends(Fade, _super);
        /**
         * 构造函数。
         */
        function Fade(duration, metas) {
            _super.call(this, duration, metas);
        }
        /**
         * 帧执行。
         */
        Fade.prototype.$p = function (element, elpased) {
            if (1 == elpased)
                this._o = element.gO();
            if (elpased % 2)
                element.o((this._m.opacity - this._o) * elpased / this._d + this._o);
        };
        return Fade;
    }(C2D.Animation));
    C2D.Fade = Fade;
})(C2D || (C2D = {}));
/**
 * 定义透明度渐显动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/FadeIn.ts
 */
/// <reference path="Fade.ts" />
var C2D;
(function (C2D) {
    var FadeIn = (function (_super) {
        __extends(FadeIn, _super);
        /**
         * 构造函数。
         */
        function FadeIn(duration) {
            _super.call(this, duration, {
                opacity: 1
            });
        }
        return FadeIn;
    }(C2D.Fade));
    C2D.FadeIn = FadeIn;
})(C2D || (C2D = {}));
/**
 * 定义透明度渐隐动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/FadeOut.ts
 */
/// <reference path="Fade.ts" />
var C2D;
(function (C2D) {
    var FadeOut = (function (_super) {
        __extends(FadeOut, _super);
        /**
         * 构造函数。
         */
        function FadeOut(duration) {
            _super.call(this, duration, {
                opacity: 0
            });
        }
        return FadeOut;
    }(C2D.Fade));
    C2D.FadeOut = FadeOut;
})(C2D || (C2D = {}));
/**
 * 定义冻结（延时）动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/Delay.ts
 */
/// <reference path="Animation.ts" />
var C2D;
(function (C2D) {
    var Delay = (function (_super) {
        __extends(Delay, _super);
        function Delay() {
            _super.apply(this, arguments);
        }
        return Delay;
    }(C2D.Animation));
    C2D.Delay = Delay;
})(C2D || (C2D = {}));
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
var C2D;
(function (C2D) {
    var Util = __Bigine_Util;
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(x, y, w, h, delay, absolute) {
            if ('object' == typeof x) {
                _super.call(this, x, false, w);
                this._y = 0 | y;
            }
            else {
                _super.call(this, x, y, w, h, false, absolute);
                this._y = 0 | delay;
            }
            this._y = this._y || 100;
            this._c = false;
        }
        /**
         * 绑定功能。
         */
        Button.prototype.b = function (callback, hover, defaults) {
            var _this = this;
            if (defaults)
                this.a(defaults.o(1));
            if (hover)
                this.a(hover.o(0));
            var animes = [], anime;
            return this.addEventListener('focus', function () {
                Util.each(animes, function (animation) {
                    animation.h();
                });
                animes = [];
                if (hover) {
                    anime = new C2D.FadeIn(250);
                    animes.push(anime);
                    hover.p(anime);
                }
            }).addEventListener('blur', function () {
                Util.each(animes, function (animation) {
                    animation.h();
                });
                animes = [];
                if (hover) {
                    anime = new C2D.FadeOut(250);
                    animes.push(anime);
                    hover.p(anime);
                }
            }).addEventListener('click', function (event) {
                Util.each(animes, function (animation) {
                    animation.h();
                });
                if (hover)
                    hover.o(1);
                if (_this._c)
                    return;
                _this._c = true;
                callback(event);
                _this.p(new C2D.Delay(_this._y)).then(function () {
                    _this._c = false;
                });
            });
        };
        return Button;
    }(C2D.Sprite));
    C2D.Button = Button;
})(C2D || (C2D = {}));
/**
 * 定义线性圆角色块画面元素组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/ColorLinear.ts
 */
/// <reference path="Element.ts" />
var C2D;
(function (C2D) {
    var Util = __Bigine_Util;
    var ColorLinear = (function (_super) {
        __extends(ColorLinear, _super);
        function ColorLinear(x, y, w, h, color, radius, absolute) {
            if ('object' == typeof x) {
                _super.call(this, x, w);
                this._d = y;
                this._ra = color || 0;
            }
            else {
                _super.call(this, x, y, w, h, absolute);
                this._d = color;
                this._ra = radius || 0;
            }
        }
        /**
         * 绘制。
         */
        ColorLinear.prototype.d = function (context) {
            var opacity = this.gO();
            if (opacity) {
                context.save();
                context.globalAlpha = opacity;
                var bounds = this.gB();
                var gradient = context.createLinearGradient(bounds.x, bounds.y, bounds.x + bounds.w, bounds.y);
                Util.each(this._d, function (color) {
                    gradient.addColorStop(color[1], color[0]);
                });
                context.fillStyle = gradient;
                if (this._ra) {
                    context.beginPath();
                    context.moveTo(bounds.x + this._ra, bounds.y);
                    context.arcTo(bounds.x + bounds.w, bounds.y, bounds.x + bounds.w, bounds.y + bounds.h, this._ra);
                    context.arcTo(bounds.x + bounds.w, bounds.y + bounds.h, bounds.x, bounds.y + bounds.h, this._ra);
                    context.arcTo(bounds.x, bounds.y + bounds.h, bounds.x, bounds.y, this._ra);
                    context.arcTo(bounds.x, bounds.y, bounds.x + this._ra, bounds.y, this._ra);
                    context.stroke();
                    context.fill();
                }
                else {
                    context.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);
                }
                context.restore();
            }
            return _super.prototype.d.call(this, context);
        };
        /**
         * 设置线性颜色。
         */
        ColorLinear.prototype.sD = function (color) {
            this._d = color;
            if (!this.gO())
                return this;
            return this.f();
        };
        /**
         * 获取名称。
         */
        ColorLinear.prototype.gN = function () {
            return 'ColorLinear';
        };
        return ColorLinear;
    }(C2D.Element));
    C2D.ColorLinear = ColorLinear;
})(C2D || (C2D = {}));
/**
 * 定义雪碧图字库组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2017 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/FontBank.ts
 */
var C2D;
(function (C2D) {
    var WIDTH = 1960;
    var HEIGHT = 1280;
    /**
     * 唯一实例。
     */
    var instance;
    var FontBank = (function () {
        /**
         * 构造函数。
         */
        function FontBank() {
            this._c = [];
            this._s = {};
            this._x = 0;
            this.c();
        }
        /**
         * 文字预处理。
         */
        FontBank.a = function (clobs, font, shadow) {
            if (!clobs.length)
                return;
            if (!instance)
                instance = new FontBank;
            for (var i = 0; i < clobs.length; i++) {
                instance.d(clobs[i], font, shadow);
            }
        };
        /**
         * 获取 canvas。
         */
        FontBank.c = function (n) {
            if (!instance)
                instance = new FontBank;
            return instance.gC(n);
        };
        /**
         * 获取文本范围。
         */
        FontBank.s = function (clob) {
            if (!clob.length)
                return;
            if (!instance)
                instance = new FontBank;
            return instance.gS(clob);
        };
        /**
         * 创建 canvas。
         */
        FontBank.prototype.c = function () {
            var canvas = document.createElement('canvas');
            canvas.width = WIDTH;
            canvas.height = HEIGHT;
            this._c.push(canvas.getContext('2d'));
            this._h = 0;
            this._o = 0;
            this._n = this._c.length - 1;
        };
        /**
         * 获取 canvas。
         */
        FontBank.prototype.gC = function (n) {
            return this._c[n].canvas;
        };
        /**
         * 获取文本范围。
         */
        FontBank.prototype.gS = function (clob) {
            return this._s[clob];
        };
        /**
         * 绘制。
         */
        FontBank.prototype.d = function (clob, font, shadow) {
            var key = clob + font[2] + font[0].toString() + font[1];
            if (key in this._s)
                return;
            var w = this.w(clob, font, shadow), m = Math.ceil(font[0] / 2);
            if (this._x + w > WIDTH) {
                this._x = 0;
                this._o = this._o + this._h + 2;
                this._h = font[0];
                if (this._o > HEIGHT)
                    this.c();
            }
            this._y = this._o + m;
            this._h = this._h > font[0] ? this._h : font[0];
            this._c[this._n].save();
            this._c[this._n].fillStyle = font[1];
            this._c[this._n].font = font[0] + 'px "' + font[2] + '", ' + C2D.TextPhrase.FONT;
            this._c[this._n].textBaseline = 'middle';
            if (shadow[2]) {
                this._c[this._n].shadowBlur = shadow[2];
                this._c[this._n].shadowOffsetX = shadow[0];
                this._c[this._n].shadowOffsetY = shadow[1];
                this._c[this._n].shadowColor = shadow[3];
            }
            var bound = { n: this._n, x: this._x, y: this._y - m, w: w, h: font[0] + 1 };
            this._c[this._n].fillText(clob, this._x, this._y);
            this._c[this._n].restore();
            this._s[key] = bound;
            this._x = this._x + w;
        };
        /**
         * 获取文本宽度。
         */
        FontBank.prototype.w = function (clob, font, shadow) {
            this._c[0].save();
            this._c[0].fillStyle = font[1];
            this._c[0].font = font[0] + 'px "' + font[2] + '", ' + C2D.TextPhrase.FONT;
            this._c[0].textBaseline = 'middle';
            var w = Math.ceil(this._c[0].measureText(clob).width);
            this._c[0].restore();
            return w;
        };
        return FontBank;
    }());
    C2D.FontBank = FontBank;
})(C2D || (C2D = {}));
/**
 * 定义画面短句组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2017 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/Phrase.ts
 */
/// <reference path="Paragraph.ts" />
/// <reference path="FontBank.ts" />
/// <reference path="IPoint.ts" />
var C2D;
(function (C2D) {
    var Phrase = (function () {
        /**
         * 构造函数。
         */
        function Phrase(clob, color) {
            this._t = (clob || '').toString();
            this._c = color;
        }
        /**
         * 设置主画面元素。
         */
        Phrase.prototype.p = function (text) {
            this._p = text;
            var tf = this._p.gTf();
            this._c = this._c || tf[2];
            C2D.FontBank.a(this._t, [tf[0], this._c, tf[4]], this._p.gTs());
            return this;
        };
        /**
         * 绘制。
         */
        Phrase.prototype.d = function (context, x, y) {
            if (!this._p || !this._t.length)
                return { x: x, y: y };
            var pb = this._p.gB(), tf = this._p.gTf();
            for (var i = 0; i < this._t.length; i++) {
                var key = this._t[i] + tf[4] + tf[0].toString() + this._c;
                var bounds = C2D.FontBank.s(key);
                var canvas = C2D.FontBank.c(bounds['n']);
                if (x + bounds.w - pb.x > pb.w) {
                    x = pb.x;
                    y += tf[1];
                }
                context.drawImage(canvas, bounds.x, bounds.y, bounds.w, bounds.h, x, y, bounds.w, bounds.h);
                x = x + 2 * tf[3] + bounds.w;
            }
            return { x: x, y: y };
        };
        /**
         * 获取长度。
         */
        Phrase.prototype.gL = function () {
            return this._t.length;
        };
        /**
         * 截取。
         */
        Phrase.prototype.a = function (length) {
            return new Phrase(this._t.substr(0, length), this._c);
        };
        return Phrase;
    }());
    C2D.Phrase = Phrase;
})(C2D || (C2D = {}));
/**
 * 定义文字段落画面元素组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2017 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/Paragraph.ts
 */
/// <reference path="Element.ts" />
/// <reference path="Phrase.ts" />
var C2D;
(function (C2D) {
    var Util = __Bigine_Util;
    var Paragraph = (function (_super) {
        __extends(Paragraph, _super);
        function Paragraph(x, y, w, h, font, size, lineHeight, absolute) {
            if ('object' == typeof x) {
                _super.call(this, x, font);
                this._tf = [16, 24, '#000', 0, ''];
                this._tf[0] = 0 | w;
                this._tf[1] = 0 | Math.max(w, h);
                this._tf[2] = x['c'] || '#000';
                this._tf[3] = x['ls'] || 0;
                this._tf[4] = y || '';
            }
            else {
                _super.call(this, x, y, w, h, absolute);
                this._tf = [16, 24, '#000', 0, ''];
                this._tf[0] = 0 | size;
                this._tf[1] = 0 | Math.max(size, lineHeight);
                this._tf[4] = font || '';
            }
            this._t = [];
            this._ts = [0, 0, 0, '#000'];
            this._to = 0;
        }
        /**
         * 缩放。
         */
        Paragraph.prototype.s = function (ratio) {
            if (1 == ratio)
                return this;
            this._tf[0] = 0 | this._tf[0] * ratio;
            this._tf[1] = 0 | this._tf[1] * ratio;
            this._ts[0] = 0 | this._ts[0] * ratio;
            this._ts[1] = 0 | this._ts[1] * ratio;
            this._ts[2] = 0 | this._ts[2] * ratio;
            return _super.prototype.s.call(this, ratio);
        };
        /**
         * 绘制。
         */
        Paragraph.prototype.d = function (context) {
            var opacity = this.gO(), bounds = this.gB(), x = this._to || bounds.x, y = bounds.y;
            if (opacity && this._t.length) {
                if (1 != opacity) {
                    context.save();
                    context.globalAlpha = opacity;
                }
                Util.each(this._t, function (phrase) {
                    var pnt = phrase.d(context, x, y);
                    x = pnt.x;
                    y = pnt.y;
                });
                if (1 != opacity)
                    context.restore();
            }
            return _super.prototype.d.call(this, context);
        };
        /**
         * 获取末尾文字坐标。
         */
        Paragraph.prototype.gP = function (context) {
            var bounds = this.gB(), x = this._to || bounds.x, y = bounds.y;
            Util.each(this._t, function (phrase) {
                var pnt = phrase.d(context, x, y);
                x = pnt.x;
                y = pnt.y;
            });
            return { x: x, y: y };
        };
        /**
         * 添加文字。
         */
        Paragraph.prototype.a = function (phrase) {
            this._t.push(phrase.p(this));
            return this.f();
        };
        /**
         * 获取文字。
         */
        Paragraph.prototype.gT = function () {
            return this._t;
        };
        /**
         * 清空所有已添加文字。
         */
        Paragraph.prototype.c = function () {
            this._t = [];
            return this.f();
        };
        /**
         * 获取字号。
         */
        Paragraph.prototype.gTf = function () {
            return this._tf;
        };
        /**
         * 获取阴影（横向偏移，纵向偏移，大小，颜色）。
         */
        Paragraph.prototype.gTs = function () {
            return this._ts;
        };
        /**
         * 设置当前文本首行偏移 offset。
         */
        Paragraph.prototype.to = function (offset) {
            this._to = offset || 0;
            return this;
        };
        return Paragraph;
    }(C2D.Element));
    C2D.Paragraph = Paragraph;
})(C2D || (C2D = {}));
/**
 * 定义画面组合动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/Combo.ts
 */
/// <reference path="Animation.ts" />
/// <reference path="../_Element/Element.ts" />
var C2D;
(function (C2D) {
    var Util = __Bigine_Util;
    var Combo = (function (_super) {
        __extends(Combo, _super);
        /**
         * 构造函数。
         */
        function Combo(animations) {
            _super.call(this, Infinity);
            this._a = animations;
        }
        /**
         * 执行。
         */
        Combo.prototype.$p = function (element, elapsed, done) {
            if (1 == elapsed) {
                var p = [];
                Util.each(this._a, function (anime) {
                    p.push(anime.p(element));
                });
                Promise.all(p).then(done);
            }
        };
        /**
         * 中止处理。
         */
        Combo.prototype.$h = function () {
            Util.each(this._a, function (anime) {
                anime.h();
            });
        };
        return Combo;
    }(C2D.Animation));
    C2D.Combo = Combo;
})(C2D || (C2D = {}));
/**
 * 声明音频音量渐变动画元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/IAudioFadeMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/**
 * 定义透明度渐变动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/AudioFadeOut.ts
 */
/// <reference path="Animation.ts" />
/// <reference path="IAudioFadeMetas.ts" />
var C2D;
(function (C2D) {
    var AudioFadeOut = (function (_super) {
        __extends(AudioFadeOut, _super);
        /**
         * 构造函数。
         */
        function AudioFadeOut(duration) {
            _super.call(this, duration, {
                volume: 0
            });
        }
        /**
         * 帧执行。
         */
        AudioFadeOut.prototype.$p = function (element, elpased) {
            if (1 == elpased)
                this._v = element.volume;
            if (elpased % 2)
                element.volume = this._v - this._v * elpased / this._d;
        };
        return AudioFadeOut;
    }(C2D.Animation));
    C2D.AudioFadeOut = AudioFadeOut;
})(C2D || (C2D = {}));
/**
 * 声明位移动画元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/IMoveMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/**
 * 定义位移动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/Move.ts
 */
/// <reference path="Animation.ts" />
/// <reference path="IMoveMetas.ts" />
/// <reference path="../_Element/Element.ts" />
var C2D;
(function (C2D) {
    var Move = (function (_super) {
        __extends(Move, _super);
        /**
         * 构造函数。
         */
        function Move(duration, metas) {
            _super.call(this, duration, metas);
        }
        /**
         * 帧执行。
         */
        Move.prototype.$p = function (element, elpased) {
            if (elpased % 2) {
                if (1 == elpased) {
                    var bounds = element.gB();
                    this._x = bounds.x;
                    this._y = bounds.y;
                }
                element.x((this._m.x - this._x) * elpased / this._d + this._x)
                    .y((this._m.y - this._y) * elpased / this._d + this._y);
            }
        };
        /**
         * 中止。
         */
        Move.prototype.$h = function () {
            this._t.x(this._m['x'])
                .y(this._m['y']);
        };
        return Move;
    }(C2D.Animation));
    C2D.Move = Move;
})(C2D || (C2D = {}));
/**
 * 定义打字效果动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/Type.ts
 */
/// <reference path="Animation.ts" />
/// <reference path="../_Element/Text.ts" />
var C2D;
(function (C2D) {
    var Util = __Bigine_Util;
    var Type = (function (_super) {
        __extends(Type, _super);
        /**
         * 构造函数。
         */
        function Type(rate) {
            _super.call(this, 17);
            this._r = rate || 1;
            if (0 > this._r)
                this._r = 1;
        }
        /**
         * 帧执行。
         */
        Type.prototype.$p = function (element, elpased) {
            var length = 0;
            if (1 == elpased) {
                Util.each(this._s = element.gT(), function (phrase) {
                    length += phrase.gL();
                });
                this._d = 0 | length * this._r;
                this._r = this._d / length;
            }
            elpased = 0 | elpased / this._r;
            element.c().o(1);
            Util.each(this._s, function (phrase) {
                length = phrase.gL();
                if (length < elpased) {
                    element.a(phrase);
                    elpased -= length;
                }
                else if (elpased) {
                    element.a(phrase.a(elpased));
                    elpased = 0;
                }
            });
        };
        /**
         * 中止。
         */
        Type.prototype.$h = function () {
            var _this = this;
            this._t.c();
            Util.each(this._s, function (phrase) {
                _this._t.a(phrase);
            });
        };
        return Type;
    }(C2D.Animation));
    C2D.Type = Type;
})(C2D || (C2D = {}));
/**
 * 定义打字延时动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/TypeDelay.ts
 */
/// <reference path="Delay.ts" />
/// <reference path="../_Element/Text.ts" />
var C2D;
(function (C2D) {
    var Util = __Bigine_Util;
    var TypeDelay = (function (_super) {
        __extends(TypeDelay, _super);
        /**
         * 构造函数。
         */
        function TypeDelay(rate) {
            _super.call(this, 17);
            this._r = rate || 1;
            if (0 > this._r)
                this._r = 1;
        }
        /**
         * 执行。
         */
        TypeDelay.prototype.$p = function (element, elapsed) {
            if (1 == elapsed) {
                var length = 0;
                Util.each(element.gT(), function (phrase) {
                    length += phrase.gL();
                });
                this._d = 0 | length * this._r;
            }
        };
        return TypeDelay;
    }(C2D.Delay));
    C2D.TypeDelay = TypeDelay;
})(C2D || (C2D = {}));
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
var C2D;
(function (C2D) {
    var WaitForClick = (function (_super) {
        __extends(WaitForClick, _super);
        /**
         * 构造函数。
         */
        function WaitForClick(callback) {
            _super.call(this, Infinity);
            this._f = callback;
        }
        /**
         * 执行。
         */
        WaitForClick.prototype.$p = function (element, elapsed, done) {
            var _this = this;
            if (1 == elapsed) {
                var type = 'click', handler = function (event) {
                    if (_this._f)
                        _this._f.call(undefined, event);
                    _this._r();
                };
                this._r = function () {
                    element.removeEventListener(type, handler);
                    done();
                };
                element.addEventListener(type, handler);
            }
        };
        /**
         * 中止。
         */
        WaitForClick.prototype.$h = function () {
            if (this._r)
                this._r();
        };
        return WaitForClick;
    }(C2D.Animation));
    C2D.WaitForClick = WaitForClick;
})(C2D || (C2D = {}));
/**
 * 声明百叶窗动画元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/IShutterMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/**
 * 定义百叶窗渐变动画组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/Shutter.ts
 */
/// <reference path="Animation.ts" />
/// <reference path="IShutterMetas.ts" />
/// <reference path="../_Element/Image.ts" />
var C2D;
(function (C2D) {
    var Util = __Bigine_Util;
    var Shutter = (function (_super) {
        __extends(Shutter, _super);
        /**
         * 构造函数。
         */
        function Shutter(duration, metas) {
            _super.call(this, duration, metas);
            this._cs = [];
        }
        /**
         * 帧执行。
         */
        Shutter.prototype.$p = function (element, elpased) {
            var _this = this;
            var count = 10, maxH = Math.round(720 / count), maxW = Math.round(1280 / count), room = element.q('n')[0], metas = this._m;
            switch (elpased) {
                case 1:
                    this._cs = [];
                    room.o(0);
                    element.o(1);
                    for (var i = 0; i < count; i++) {
                        var bound = metas.direction == 'H' ?
                            { x: 0, y: maxH * i, w: 1280, h: Math.ceil(maxH / this._d) } :
                            { x: maxW * i, y: 0, w: Math.ceil(maxW / this._d), h: 720 }, image = new C2D.Image(room.$d(), bound, false, metas['size']);
                        element.a(image, room, 1);
                        this._cs.push(image);
                    }
                    break;
                case this._d:
                    room.o(1);
                    Util.each(this._cs, function (image) {
                        element.e(image);
                    });
                    this._cs = [];
                    break;
                default:
                    if (elpased % 2) {
                        Util.each(this._cs, function (image) {
                            metas.direction == 'H' ?
                                image.sH(Math.ceil(maxH / _this._d * elpased)) :
                                image.sW(Math.ceil(maxW / _this._d * elpased));
                        });
                    }
                    break;
            }
        };
        return Shutter;
    }(C2D.Animation));
    C2D.Shutter = Shutter;
})(C2D || (C2D = {}));
/**
 * 声明放大缩小镜头动画元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/IZoomMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/**
 * 定义放大缩小镜头动画组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/Zoom.ts
 */
/// <reference path="Animation.ts" />
/// <reference path="IZoomMetas.ts" />
/// <reference path="../_Element/Element.ts" />
var C2D;
(function (C2D) {
    var Zoom = (function (_super) {
        __extends(Zoom, _super);
        /**
         * 构造函数。
         */
        function Zoom(duration, metas) {
            _super.call(this, duration, metas);
        }
        /**
         * 帧执行。
         */
        Zoom.prototype.$p = function (element, elpased) {
            if (elpased % 2) {
                if (1 == elpased)
                    this._b = element.gB();
                var metas = this._m, scale = metas.scale, px = scale * (5 / 3 - 1) * 1280 / this._d, py = scale * (5 / 3 - 1) * 720 / this._d;
                element.x(Math.round(this._b.x - metas.mx * px * elpased))
                    .y(Math.round(this._b.y - metas.my * py * elpased))
                    .sW(Math.round(this._b.w + px * elpased))
                    .sH(Math.round(this._b.h + py * elpased));
            }
        };
        /**
         * 中止。
         */
        Zoom.prototype.$h = function () {
            var metas = this._m, px = metas.scale * (5 / 3 - 1) * 1280, py = metas.scale * (5 / 3 - 1) * 720;
            this._t.x(Math.round(this._b.x - metas.mx * px))
                .y(Math.round(this._b.y - metas.my * py))
                .sW(Math.round(this._b.w + px))
                .sH(Math.round(this._b.h + py));
        };
        return Zoom;
    }(C2D.Animation));
    C2D.Zoom = Zoom;
})(C2D || (C2D = {}));
/**
 * 定义抖动镜头动画组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/Shake.ts
 */
/// <reference path="Animation.ts" />
/// <reference path="../_Element/Element.ts" />
var C2D;
(function (C2D) {
    var Shake = (function (_super) {
        __extends(Shake, _super);
        /**
         * 构造函数。
         */
        function Shake(duration, offset) {
            _super.call(this, duration || 500);
            this._o = offset || 3;
        }
        /**
         * 帧执行。
         */
        Shake.prototype.$p = function (element, elpased) {
            if (1 == elpased) {
                var bounds = element.gB();
                this._x = bounds.x;
                this._y = bounds.y;
            }
            if (this._d == elpased) {
                element.x(this._x)
                    .y(this._y);
            }
            else {
                var mod = elpased % 4, rector = this._o;
                switch (mod) {
                    case 1:
                        element.x(this._y + rector);
                        break;
                    case 2:
                        element.y(this._x + rector);
                        break;
                    case 3:
                        element.x(this._x);
                        break;
                    default:
                        element.y(this._y);
                        break;
                }
            }
        };
        return Shake;
    }(C2D.Animation));
    C2D.Shake = Shake;
})(C2D || (C2D = {}));
/**
 * 定义音量渐变动画组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/AudioFade.ts
 */
/// <reference path="Animation.ts" />
/// <reference path="IAudioFadeMetas.ts" />
var C2D;
(function (C2D) {
    var AudioFade = (function (_super) {
        __extends(AudioFade, _super);
        /**
         * 构造函数。
         */
        function AudioFade(duration, volume) {
            _super.call(this, duration, {
                volume: volume
            });
            this._va = volume;
        }
        /**
         * 帧执行。
         */
        AudioFade.prototype.$p = function (element, elpased) {
            if (1 == elpased) {
                this._vb = element.volume;
                this._v = (this._va - this._vb) / this._d;
            }
            if (elpased % 2)
                element.volume = this._vb + this._v * elpased;
        };
        return AudioFade;
    }(C2D.Animation));
    C2D.AudioFade = AudioFade;
})(C2D || (C2D = {}));
/**
 * 声明雨雪动画元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/IDroppingMetas.ts
 */
/**
 * 定义速度对象。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/Vector.ts
 */
var C2D;
(function (C2D) {
    var Vector = (function () {
        /**
         * 构造函数。
         */
        function Vector(x, y) {
            this._x = x || 0;
            this._y = y || 0;
        }
        /**
         * 速度改变函数,根据参数对速度进行增加
         * @param  {any}    v object || number
         * @return {Vector}   [description]
         */
        Vector.prototype.a = function (v) {
            if (typeof v == 'number') {
                this._x += v;
                this._y += v;
            }
            else {
                this._x += v._x;
                this._y += v._y;
            }
            return this;
        };
        /*
         * 复制一个vector，来用作保存之前速度节点的记录
         */
        Vector.prototype.c = function () {
            return new Vector(this._x, this._y);
        };
        /*
         * 获取、设置横向速度
         */
        Vector.prototype.x = function (x) {
            if (x != undefined)
                this._x = x;
            return this._x;
        };
        /*
         * 获取、设置纵向速度
         */
        Vector.prototype.y = function (y) {
            if (y != undefined)
                this._y = y;
            return this._y;
        };
        return Vector;
    }());
    C2D.Vector = Vector;
})(C2D || (C2D = {}));
/**
 * 定义下落粒子对象。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/Drop.ts
 */
/// <reference path="Vector.ts" />
var C2D;
(function (C2D) {
    var Drop = (function () {
        /**
         * 构造函数。
         */
        function Drop(metas) {
            var eachAnger = 0.017453293, // 将角度乘以 0.017453293 （2PI/360）即可转换为弧度。
            sx, // 获得横向加速度 
            sy, // 获得纵向加速度
            speed; // 获得drop初始速度
            this._v = new C2D.Vector(Math.random() * 1280, 0); // 随机设置drop的初始坐标
            this._r = (metas['size_range'][0] + Math.random() * metas['size_range'][1]); //设置下落元素的大小
            this._p = this._v;
            this._a = metas['wind_direction'] * eachAnger; //获得风向的角度
            speed = (metas['speed'][0] + Math.random() * metas['speed'][1]);
            sx = speed * Math.cos(this._a);
            sy = -speed * Math.sin(this._a);
            this._d = new C2D.Vector(sx, sy); //绑定一个速度实例
            this._m = metas;
        }
        /**
         * 更新
         */
        Drop.prototype.u = function () {
            this._p = this._v.c();
            if (this._m['hasGravity'])
                this._d['_y'] += this._m['gravity'];
            this._v.a(this._d);
            return this;
        };
        /*
         * 绘制
         */
        Drop.prototype.d = function (context) {
            context.beginPath();
            if (this._m['type'] == "rain") {
                context.moveTo(this._p.x(), this._p.y());
                var ax = Math.abs(this._r * Math.cos(this._a));
                var ay = Math.abs(this._r * Math.sin(this._a));
                context.bezierCurveTo(this._v.x() + ax, this._v.y() + ay, this._p.x() + ax, this._p.y() + ay, this._v.x(), this._v.y());
                context.stroke();
            }
            else {
                context.moveTo(this._v.x(), this._v.y());
                context.arc(this._v.x(), this._v.y(), this._r, 0, Math.PI * 2);
                context.fill();
            }
        };
        /*
         * 获取当前 横向速度 / 纵向速度
         */
        Drop.prototype.gV = function (t) {
            return this._v[t]();
        };
        return Drop;
    }());
    C2D.Drop = Drop;
})(C2D || (C2D = {}));
/**
 * 定义回弹对象。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Element/Bounce.ts
 */
/// <reference path="Vector.ts" />
var C2D;
(function (C2D) {
    var Bounce = (function () {
        /**
         * 构造函数。
         */
        function Bounce(x, y) {
            var dist = Math.random() * 7;
            var angle = Math.PI + Math.random() * Math.PI;
            this._d = new C2D.Vector(x, y);
            this._u = 0.2 + Math.random() * 0.8;
            this._v = new C2D.Vector(Math.cos(angle) * dist, Math.sin(angle) * dist);
        }
        /**
         * 更新
         */
        Bounce.prototype.u = function (gravity) {
            this._v.y((this._v.y() + gravity) * 0.95);
            this._v.x(this._v.x() * 0.95);
            this._d.a(this._v);
            return this;
        };
        /*
         * 绘制
         */
        Bounce.prototype.d = function (context) {
            context.beginPath();
            context.arc(this._d.x(), this._d.y(), this._u, 0, Math.PI * 2);
            context.fill();
        };
        /*
         * 获取当前 横向速度 / 纵向速度
         */
        Bounce.prototype.gV = function (t) {
            return this._d[t]();
        };
        return Bounce;
    }());
    C2D.Bounce = Bounce;
})(C2D || (C2D = {}));
/**
 * 定义雨雪动画组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/Dropping.ts
 */
/// <reference path="Animation.ts" />
/// <reference path="IDroppingMetas.ts" />
/// <reference path="../_Element/Drop.ts" />
/// <reference path="../_Element/Bounce.ts" />
var C2D;
(function (C2D) {
    var DROP_CHANCE = 0.4; // 创建drop的几率
    var Dropping = (function (_super) {
        __extends(Dropping, _super);
        /**
         * 构造函数。
         */
        function Dropping(duration, metas) {
            _super.call(this, Infinity, metas);
            this._r = [];
            this._n = [];
            this._g = null;
            this._f = null;
        }
        /**
         * 帧执行。
         */
        Dropping.prototype.$p = function (element, elpased) {
            if (elpased % 2) {
                var h = 720, i = this._r.length, metas = this._m;
                if (elpased == 1) {
                    this._g = new C2D.Component({}, true);
                    this._f = this._g.gC().getContext('2d');
                    this._g.o(1);
                    element.a(this._g, 'W');
                    if (metas.type == "rain") {
                        this._f.lineWidth = 2;
                        this._f.strokeStyle = 'rgba(223, 223, 223, 0.6)';
                        this._f.fillStyle = 'rgba(223, 223, 223, 0.6)';
                    }
                    else {
                        this._f.lineWidth = 2;
                        this._f.strokeStyle = 'rgba(254, 254, 254, 0.8)';
                        this._f.fillStyle = 'rgba(254, 254, 254, 0.8)';
                    }
                }
                this._f.clearRect(0, 0, 1280, h);
                while (i--) {
                    var drop = this._r[i];
                    drop.u();
                    if (drop.gV('y') >= h) {
                        if (metas.hasBounce) {
                            var n = Math.round(4 + Math.random() * 4);
                            while (n--)
                                this._n.push(new C2D.Bounce(drop.gV('x'), h));
                        }
                        this._r.splice(i, 1);
                    }
                    drop.d(this._f);
                }
                if (metas.hasBounce) {
                    i = this._n.length;
                    while (i--) {
                        var bounce = this._n[i];
                        bounce.u(metas.gravity);
                        bounce.d(this._f);
                        if (bounce.gV('y') > h)
                            this._n.splice(i, 1);
                    }
                }
                if (this._r.length < metas.maxNum) {
                    if (Math.random() < DROP_CHANCE) {
                        i = 0;
                        var len = metas.numLevel;
                        for (; i < len; i++) {
                            this._r.push(new C2D.Drop(this._m));
                        }
                    }
                }
                this._g.uc(true);
            }
        };
        /**
         * 立即中止。
         */
        Dropping.prototype.$h = function () {
            this._r = [];
            this._n = [];
            this._f = null;
            if (this._g)
                this._g.$p().e(this._g);
        };
        return Dropping;
    }(C2D.Animation));
    C2D.Dropping = Dropping;
})(C2D || (C2D = {}));
/**
 * 声明进度条动画元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/IProgressMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/**
 * 定义位移动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/Progress.ts
 */
/// <reference path="Animation.ts" />
/// <reference path="IProgressMetas.ts" />
/// <reference path="../_Element/Element.ts" />
var C2D;
(function (C2D) {
    var Progress = (function (_super) {
        __extends(Progress, _super);
        /**
         * 构造函数。
         */
        function Progress(duration, metas) {
            _super.call(this, duration, metas);
        }
        /**
         * 帧执行。
         */
        Progress.prototype.$p = function (element, elpased) {
            if (elpased % 2)
                element.x((elpased / this._d - 1) * this._m['width']);
        };
        /**
         * 中止。
         */
        Progress.prototype.$h = function () {
            this._t.x(0);
        };
        return Progress;
    }(C2D.Animation));
    C2D.Progress = Progress;
})(C2D || (C2D = {}));
/**
 * 声明 Gif 动画元信息接口规范。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2017 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/IGifMetas.ts
 */
/// <reference path="../../../include/tsd.d.ts" />
/**
 * 定义 Gif 动画组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/Gif.ts
 */
/// <reference path="Animation.ts" />
/// <reference path="IGifMetas.ts" />
/// <reference path="../_Element/Sprite.ts" />
/// <reference path="../_Element/Image.ts" />
var C2D;
(function (C2D) {
    var Gif = (function (_super) {
        __extends(Gif, _super);
        /**
         * 构造函数。
         */
        function Gif(rr, metas) {
            _super.call(this, Infinity, metas);
            this._x = rr;
        }
        /**
         * 帧执行。
         */
        Gif.prototype.$p = function (element, elpased) {
            var interval = this._m['interval'];
            if (!(elpased % interval)) {
                var index = (elpased / interval) % this._x.length;
                if (elpased / interval != 1)
                    element.e(this._f);
                this._f = new C2D.Image(this._x[index].o(), this._m['bound']);
                element.a(this._f);
            }
        };
        return Gif;
    }(C2D.Animation));
    C2D.Gif = Gif;
})(C2D || (C2D = {}));
/**
 * 定义进度条动画组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/Bar.ts
 */
/// <reference path="Animation.ts" />
/// <reference path="../_Element/ColorLinear.ts" />
var C2D;
(function (C2D) {
    var Bar = (function (_super) {
        __extends(Bar, _super);
        /**
         * 构造函数。
         */
        function Bar(color) {
            _super.call(this, Infinity, color);
        }
        /**
         * 帧执行。
         */
        Bar.prototype.$p = function (element, elpased) {
            if (!(elpased % 8)) {
                this._m[1][1] = ((elpased / 8) % 11) / 10;
                element.sD(this._m);
            }
        };
        return Bar;
    }(C2D.Animation));
    C2D.Bar = Bar;
})(C2D || (C2D = {}));
/**
 * 定义打字效果动画组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2017 Dahao.de
 * @license   GPL-3.0
 * @file      C2D/_Animation/Typing.ts
 */
/// <reference path="Animation.ts" />
/// <reference path="../_Element/Paragraph.ts" />
var C2D;
(function (C2D) {
    var Util = __Bigine_Util;
    var Typing = (function (_super) {
        __extends(Typing, _super);
        /**
         * 构造函数。
         */
        function Typing(rate) {
            _super.call(this, 17);
            this._r = rate || 1;
            if (0 > this._r)
                this._r = 1;
        }
        /**
         * 帧执行。
         */
        Typing.prototype.$p = function (element, elpased) {
            var length = 0;
            if (1 == elpased) {
                Util.each(this._s = element.gT(), function (phrase) {
                    length += phrase.gL();
                });
                this._d = 0 | length * this._r;
                this._r = this._d / length;
            }
            elpased = 0 | elpased / this._r;
            element.c().o(1);
            Util.each(this._s, function (phrase) {
                length = phrase.gL();
                if (length < elpased) {
                    element.a(phrase);
                    elpased -= length;
                }
                else if (elpased) {
                    element.a(phrase.a(elpased));
                    elpased = 0;
                }
            });
        };
        /**
         * 中止。
         */
        Typing.prototype.$h = function () {
            var _this = this;
            this._t.c();
            Util.each(this._s, function (phrase) {
                _this._t.a(phrase);
            });
        };
        return Typing;
    }(C2D.Animation));
    C2D.Typing = Typing;
})(C2D || (C2D = {}));
/**
 * 定义包主程序文件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      @c2d.ts
 */
/// <reference path="C2D/_Element/Stage.ts" />
/// <reference path="C2D/_Element/Color.ts" />
/// <reference path="C2D/_Element/Image.ts" />
/// <reference path="C2D/_Element/Text.ts" />
/// <reference path="C2D/_Element/Button.ts" />
/// <reference path="C2D/_Element/Component.ts" />
/// <reference path="C2D/_Element/ColorLinear.ts" />
/// <reference path="C2D/_Element/Paragraph.ts" />
/// <reference path="C2D/_Animation/Combo.ts" />
/// <reference path="C2D/_Animation/AudioFadeOut.ts" />
/// <reference path="C2D/_Animation/FadeIn.ts" />
/// <reference path="C2D/_Animation/FadeOut.ts" />
/// <reference path="C2D/_Animation/Move.ts" />
/// <reference path="C2D/_Animation/Type.ts" />
/// <reference path="C2D/_Animation/TypeDelay.ts" />
/// <reference path="C2D/_Animation/WaitForClick.ts" />
/// <reference path="C2D/_Animation/Shutter.ts" />
/// <reference path="C2D/_Animation/Zoom.ts" />
/// <reference path="C2D/_Animation/Shake.ts" />
/// <reference path="C2D/_Animation/AudioFade.ts" />
/// <reference path="C2D/_Animation/Dropping.ts" />
/// <reference path="C2D/_Animation/Progress.ts" />
/// <reference path="C2D/_Animation/Gif.ts" />
/// <reference path="C2D/_Animation/Bar.ts" />
/// <reference path="C2D/_Animation/Typing.ts" />
var C2D;
(function (C2D) {
    C2D.version = '0.3.7';
})(C2D || (C2D = {}));
module.exports = C2D;
//# sourceMappingURL=bigine.c2d.js.map

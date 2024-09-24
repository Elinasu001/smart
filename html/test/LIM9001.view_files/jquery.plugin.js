/**
 * BxSlider v4.1.2 - Fully loaded, responsive content slider
 * http://bxslider.com
 *
 * Copyright 2014, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
 * Written while drinking Belgian ales and listening to jazz
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */
!function (t) {
    var e = {}, s = {mode: "horizontal", slideSelector: "", infiniteLoop: !0, hideControlOnEnd: !1, speed: 500, easing: null, slideMargin: 0, startSlide: 0, randomStart: !1, captions: !1, ticker: !1, tickerHover: !1, adaptiveHeight: !1, adaptiveHeightSpeed: 500, video: !1, useCSS: !0, preloadImages: "visible", responsive: !0, slideZIndex: 50, touchEnabled: !0, swipeThreshold: 50, oneToOneTouch: !0, preventDefaultSwipeX: !0, preventDefaultSwipeY: !1, pager: !0, pagerType: "full", pagerShortSeparator: " / ", pagerSelector: null, buildPager: null, pagerCustom: null, controls: !0, nextText: "Next", prevText: "Prev", nextSelector: null, prevSelector: null, autoControls: !1, startText: "Start", stopText: "Stop", autoControlsCombine: !1, autoControlsSelector: null, auto: !1, pause: 4e3, autoStart: !0, autoDirection: "next", autoHover: !1, autoDelay: 0, minSlides: 1, maxSlides: 1, moveSlides: 0, slideWidth: 0, onSliderLoad: function () {
    }, onSlideBefore: function () {
    }, onSlideAfter: function () {
    }, onSlideNext: function () {
    }, onSlidePrev: function () {
    }, onSliderResize: function () {
    }};
    t.fn.bxSlider = function (n) {
        if (0 == this.length)return this;
        if (this.length > 1)return this.each(function () {
            t(this).bxSlider(n)
        }), this;
        var o = {}, r = this;
        e.el = this;
        var a = t(window).width(), l = t(window).height(), d = function () {
            o.settings = t.extend({}, s, n), o.settings.slideWidth = parseInt(o.settings.slideWidth), o.children = r.children(o.settings.slideSelector), o.children.length < o.settings.minSlides && (o.settings.minSlides = o.children.length), o.children.length < o.settings.maxSlides && (o.settings.maxSlides = o.children.length), o.settings.randomStart && (o.settings.startSlide = Math.floor(Math.random() * o.children.length)), o.active = {index: o.settings.startSlide}, o.carousel = o.settings.minSlides > 1 || o.settings.maxSlides > 1, o.carousel && (o.settings.preloadImages = "all"), o.minThreshold = o.settings.minSlides * o.settings.slideWidth + (o.settings.minSlides - 1) * o.settings.slideMargin, o.maxThreshold = o.settings.maxSlides * o.settings.slideWidth + (o.settings.maxSlides - 1) * o.settings.slideMargin, o.working = !1, o.controls = {}, o.interval = null, o.animProp = "vertical" == o.settings.mode ? "top" : "left", o.usingCSS = o.settings.useCSS && "fade" != o.settings.mode && function () {
                var t = document.createElement("div"), e = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                for (var i in e)if (void 0 !== t.style[e[i]])return o.cssPrefix = e[i].replace("Perspective", "").toLowerCase(), o.animProp = "-" + o.cssPrefix + "-transform", !0;
                return!1
            }(), "vertical" == o.settings.mode && (o.settings.maxSlides = o.settings.minSlides), r.data("origStyle", r.attr("style")), r.children(o.settings.slideSelector).each(function () {
                t(this).data("origStyle", t(this).attr("style"))
            }), c()
        }, c = function () {
            r.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'), o.viewport = r.parent(), o.loader = t('<div class="bx-loading" />'), o.viewport.prepend(o.loader), r.css({width: "horizontal" == o.settings.mode ? 100 * o.children.length + 215 + "%" : "auto", position: "relative"}), o.usingCSS && o.settings.easing ? r.css("-" + o.cssPrefix + "-transition-timing-function", o.settings.easing) : o.settings.easing || (o.settings.easing = "swing"), f(), o.viewport.css({width: "100%", overflow: "hidden", position: "relative"}), o.viewport.parent().css({maxWidth: p()}), o.settings.pager || o.viewport.parent().css({margin: "0 auto 0px"}), o.children.css({"float": "horizontal" == o.settings.mode ? "left" : "none", listStyle: "none", position: "relative"}), o.children.css("width", u()), "horizontal" == o.settings.mode && o.settings.slideMargin > 0 && o.children.css("marginRight", o.settings.slideMargin), "vertical" == o.settings.mode && o.settings.slideMargin > 0 && o.children.css("marginBottom", o.settings.slideMargin), "fade" == o.settings.mode && (o.children.css({position: "absolute", zIndex: 0, display: "none"}), o.children.eq(o.settings.startSlide).css({zIndex: o.settings.slideZIndex, display: "block"})), o.controls.el = t('<div class="bx-controls" />'), o.settings.captions && P(), o.active.last = o.settings.startSlide == x() - 1, o.settings.video && r.fitVids();
            var e = o.children.eq(o.settings.startSlide);
            "all" == o.settings.preloadImages && (e = o.children), o.settings.ticker ? o.settings.pager = !1 : (o.settings.pager && T(), o.settings.controls && C(), o.settings.auto && o.settings.autoControls && E(), (o.settings.controls || o.settings.autoControls || o.settings.pager) && o.viewport.after(o.controls.el)), g(e, h)
        }, g = function (e, i) {
            var s = e.find("img, iframe").length;
            if (0 == s)return i(), void 0;
            var n = 0;
            e.find("img, iframe").each(function () {
                t(this).one("load", function () {
                    ++n == s && i()
                }).each(function () {
                    this.complete && t(this).load()
                })
            })
        }, h = function () {
            if (o.settings.infiniteLoop && "fade" != o.settings.mode && !o.settings.ticker) {
                var e = "vertical" == o.settings.mode ? o.settings.minSlides : o.settings.maxSlides, i = o.children.slice(0, e).clone().addClass("bx-clone"), s = o.children.slice(-e).clone().addClass("bx-clone");
                r.append(i).prepend(s)
            }
            o.loader.remove(), S(), "vertical" == o.settings.mode && (o.settings.adaptiveHeight = !0), o.viewport.height(v()), r.redrawSlider(), o.settings.onSliderLoad(o.active.index), o.initialized = !0, o.settings.responsive && t(window).bind("resize", Z), o.settings.auto && o.settings.autoStart && H(), o.settings.ticker && L(), o.settings.pager && q(o.settings.startSlide), o.settings.controls && W(), o.settings.touchEnabled && !o.settings.ticker && O()
        }, v = function () {
            var e = 0, s = t();
            if ("vertical" == o.settings.mode || o.settings.adaptiveHeight)if (o.carousel) {
                var n = 1 == o.settings.moveSlides ? o.active.index : o.active.index * m();
                for (s = o.children.eq(n), i = 1; i <= o.settings.maxSlides - 1; i++)s = n + i >= o.children.length ? s.add(o.children.eq(i - 1)) : s.add(o.children.eq(n + i))
            } else s = o.children.eq(o.active.index); else s = o.children;
            return"vertical" == o.settings.mode ? (s.each(function () {
                e += t(this).outerHeight()
            }), o.settings.slideMargin > 0 && (e += o.settings.slideMargin * (o.settings.minSlides - 1))) : e = Math.max.apply(Math, s.map(function () {
                return t(this).outerHeight(!1)
            }).get()), e
        }, p = function () {
            var t = "100%";
            return o.settings.slideWidth > 0 && (t = "horizontal" == o.settings.mode ? o.settings.maxSlides * o.settings.slideWidth + (o.settings.maxSlides - 1) * o.settings.slideMargin : o.settings.slideWidth), t
        }, u = function () {
            var t = o.settings.slideWidth, e = o.viewport.width();
            return 0 == o.settings.slideWidth || o.settings.slideWidth > e && !o.carousel || "vertical" == o.settings.mode ? t = e : o.settings.maxSlides > 1 && "horizontal" == o.settings.mode && (e > o.maxThreshold || e < o.minThreshold && (t = (e - o.settings.slideMargin * (o.settings.minSlides - 1)) / o.settings.minSlides)), t
        }, f = function () {
            var t = 1;
            if ("horizontal" == o.settings.mode && o.settings.slideWidth > 0)if (o.viewport.width() < o.minThreshold)t = o.settings.minSlides; else if (o.viewport.width() > o.maxThreshold)t = o.settings.maxSlides; else {
                var e = o.children.first().width();
                t = Math.floor(o.viewport.width() / e)
            } else"vertical" == o.settings.mode && (t = o.settings.minSlides);
            return t
        }, x = function () {
            var t = 0;
            if (o.settings.moveSlides > 0)if (o.settings.infiniteLoop)t = o.children.length / m(); else for (var e = 0, i = 0; e < o.children.length;)++t, e = i + f(), i += o.settings.moveSlides <= f() ? o.settings.moveSlides : f(); else t = Math.ceil(o.children.length / f());
            return t
        }, m = function () {
            return o.settings.moveSlides > 0 && o.settings.moveSlides <= f() ? o.settings.moveSlides : f()
        }, S = function () {
            if (o.children.length > o.settings.maxSlides && o.active.last && !o.settings.infiniteLoop) {
                if ("horizontal" == o.settings.mode) {
                    var t = o.children.last(), e = t.position();
                    b(-(e.left - (o.viewport.width() - t.width())), "reset", 0)
                } else if ("vertical" == o.settings.mode) {
                    var i = o.children.length - o.settings.minSlides, e = o.children.eq(i).position();
                    b(-e.top, "reset", 0)
                }
            } else {
                var e = o.children.eq(o.active.index * m()).position();
                o.active.index == x() - 1 && (o.active.last = !0), void 0 != e && ("horizontal" == o.settings.mode ? b(-e.left, "reset", 0) : "vertical" == o.settings.mode && b(-e.top, "reset", 0))
            }
        }, b = function (t, e, i, s) {
            if (o.usingCSS) {
                var n = "vertical" == o.settings.mode ? "translate3d(0, " + t + "px, 0)" : "translate3d(" + t + "px, 0, 0)";
                r.css("-" + o.cssPrefix + "-transition-duration", i / 1e3 + "s"), "slide" == e ? (r.css(o.animProp, n), r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                    r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), D()
                })) : "reset" == e ? r.css(o.animProp, n) : "ticker" == e && (r.css("-" + o.cssPrefix + "-transition-timing-function", "linear"), r.css(o.animProp, n), r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                    r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), b(s.resetValue, "reset", 0), N()
                }))
            } else {
                var a = {};
                a[o.animProp] = t, "slide" == e ? r.animate(a, i, o.settings.easing, function () {
                    D()
                }) : "reset" == e ? r.css(o.animProp, t) : "ticker" == e && r.animate(a, speed, "linear", function () {
                    b(s.resetValue, "reset", 0), N()
                })
            }
        }, w = function () {
            for (var e = "", i = x(), s = 0; i > s; s++) {
                var n = "";
                o.settings.buildPager && t.isFunction(o.settings.buildPager) ? (n = o.settings.buildPager(s), o.pagerEl.addClass("bx-custom-pager")) : (n = s + 1, o.pagerEl.addClass("bx-default-pager")), e += '<div class="bx-pager-item"><a href="" data-slide-index="' + s + '" class="bx-pager-link">' + n + "</a></div>"
            }
            o.pagerEl.html(e)
        }, T = function () {
            o.settings.pagerCustom ? o.pagerEl = t(o.settings.pagerCustom) : (o.pagerEl = t('<div class="bx-pager" />'), o.settings.pagerSelector ? t(o.settings.pagerSelector).html(o.pagerEl) : o.controls.el.addClass("bx-has-pager").append(o.pagerEl), w()), o.pagerEl.on("click", "a", I)
        }, C = function () {
            o.controls.next = t('<a class="bx-next" href="">' + o.settings.nextText + "</a>"), o.controls.prev = t('<a class="bx-prev" href="">' + o.settings.prevText + "</a>"), o.controls.next.bind("click", y), o.controls.prev.bind("click", z), o.settings.nextSelector && t(o.settings.nextSelector).append(o.controls.next), o.settings.prevSelector && t(o.settings.prevSelector).append(o.controls.prev), o.settings.nextSelector || o.settings.prevSelector || (o.controls.directionEl = t('<div class="bx-controls-direction" />'), o.controls.directionEl.append(o.controls.prev).append(o.controls.next), o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl))
        }, E = function () {
            o.controls.start = t('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + o.settings.startText + "</a></div>"), o.controls.stop = t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + o.settings.stopText + "</a></div>"), o.controls.autoEl = t('<div class="bx-controls-auto" />'), o.controls.autoEl.on("click", ".bx-start", k), o.controls.autoEl.on("click", ".bx-stop", M), o.settings.autoControlsCombine ? o.controls.autoEl.append(o.controls.start) : o.controls.autoEl.append(o.controls.start).append(o.controls.stop), o.settings.autoControlsSelector ? t(o.settings.autoControlsSelector).html(o.controls.autoEl) : o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl), A(o.settings.autoStart ? "stop" : "start")
        }, P = function () {
            o.children.each(function () {
                var e = t(this).find("img:first").attr("title");
                void 0 != e && ("" + e).length && t(this).append('<div class="bx-caption"><span>' + e + "</span></div>")
            })
        }, y = function (t) {
            o.settings.auto && r.stopAuto(), r.goToNextSlide(), t.preventDefault()
        }, z = function (t) {
            o.settings.auto && r.stopAuto(), r.goToPrevSlide(), t.preventDefault()
        }, k = function (t) {
            r.startAuto(), t.preventDefault()
        }, M = function (t) {
            r.stopAuto(), t.preventDefault()
        }, I = function (e) {
            o.settings.auto && r.stopAuto();
            var i = t(e.currentTarget), s = parseInt(i.attr("data-slide-index"));
            s != o.active.index && r.goToSlide(s), e.preventDefault()
        }, q = function (e) {
            var i = o.children.length;
            return"short" == o.settings.pagerType ? (o.settings.maxSlides > 1 && (i = Math.ceil(o.children.length / o.settings.maxSlides)), o.pagerEl.html(e + 1 + o.settings.pagerShortSeparator + i), void 0) : (o.pagerEl.find("a").removeClass("active"), o.pagerEl.each(function (i, s) {
                t(s).find("a").eq(e).addClass("active")
            }), void 0)
        }, D = function () {
            if (o.settings.infiniteLoop) {
                var t = "";
                0 == o.active.index ? t = o.children.eq(0).position() : o.active.index == x() - 1 && o.carousel ? t = o.children.eq((x() - 1) * m()).position() : o.active.index == o.children.length - 1 && (t = o.children.eq(o.children.length - 1).position()), t && ("horizontal" == o.settings.mode ? b(-t.left, "reset", 0) : "vertical" == o.settings.mode && b(-t.top, "reset", 0))
            }
            o.working = !1, o.settings.onSlideAfter(o.children.eq(o.active.index), o.oldIndex, o.active.index)
        }, A = function (t) {
            o.settings.autoControlsCombine ? o.controls.autoEl.html(o.controls[t]) : (o.controls.autoEl.find("a").removeClass("active"), o.controls.autoEl.find("a:not(.bx-" + t + ")").addClass("active"))
        }, W = function () {
            1 == x() ? (o.controls.prev.addClass("disabled"), o.controls.next.addClass("disabled")) : !o.settings.infiniteLoop && o.settings.hideControlOnEnd && (0 == o.active.index ? (o.controls.prev.addClass("disabled"), o.controls.next.removeClass("disabled")) : o.active.index == x() - 1 ? (o.controls.next.addClass("disabled"), o.controls.prev.removeClass("disabled")) : (o.controls.prev.removeClass("disabled"), o.controls.next.removeClass("disabled")))
        }, H = function () {
            o.settings.autoDelay > 0 ? setTimeout(r.startAuto, o.settings.autoDelay) : r.startAuto(), o.settings.autoHover && r.hover(function () {
                o.interval && (r.stopAuto(!0), o.autoPaused = !0)
            }, function () {
                o.autoPaused && (r.startAuto(!0), o.autoPaused = null)
            })
        }, L = function () {
            var e = 0;
            if ("next" == o.settings.autoDirection)r.append(o.children.clone().addClass("bx-clone")); else {
                r.prepend(o.children.clone().addClass("bx-clone"));
                var i = o.children.first().position();
                e = "horizontal" == o.settings.mode ? -i.left : -i.top
            }
            b(e, "reset", 0), o.settings.pager = !1, o.settings.controls = !1, o.settings.autoControls = !1, o.settings.tickerHover && !o.usingCSS && o.viewport.hover(function () {
                r.stop()
            }, function () {
                var e = 0;
                o.children.each(function () {
                    e += "horizontal" == o.settings.mode ? t(this).outerWidth(!0) : t(this).outerHeight(!0)
                });
                var i = o.settings.speed / e, s = "horizontal" == o.settings.mode ? "left" : "top", n = i * (e - Math.abs(parseInt(r.css(s))));
                N(n)
            }), N()
        }, N = function (t) {
            speed = t ? t : o.settings.speed;
            var e = {left: 0, top: 0}, i = {left: 0, top: 0};
            "next" == o.settings.autoDirection ? e = r.find(".bx-clone").first().position() : i = o.children.first().position();
            var s = "horizontal" == o.settings.mode ? -e.left : -e.top, n = "horizontal" == o.settings.mode ? -i.left : -i.top, a = {resetValue: n};
            b(s, "ticker", speed, a)
        }, O = function () {
            o.touch = {start: {x: 0, y: 0}, end: {x: 0, y: 0}}, o.viewport.bind("touchstart", X)
        }, X = function (t) {
            if (o.working)t.preventDefault(); else {
                o.touch.originalPos = r.position();
                var e = t.originalEvent;
                o.touch.start.x = e.changedTouches[0].pageX, o.touch.start.y = e.changedTouches[0].pageY, o.viewport.bind("touchmove", Y), o.viewport.bind("touchend", V)
            }
        }, Y = function (t) {
            var e = t.originalEvent, i = Math.abs(e.changedTouches[0].pageX - o.touch.start.x), s = Math.abs(e.changedTouches[0].pageY - o.touch.start.y);
            if (3 * i > s && o.settings.preventDefaultSwipeX ? t.preventDefault() : 3 * s > i && o.settings.preventDefaultSwipeY && t.preventDefault(), "fade" != o.settings.mode && o.settings.oneToOneTouch) {
                var n = 0;
                if ("horizontal" == o.settings.mode) {
                    var r = e.changedTouches[0].pageX - o.touch.start.x;
                    n = o.touch.originalPos.left + r
                } else {
                    var r = e.changedTouches[0].pageY - o.touch.start.y;
                    n = o.touch.originalPos.top + r
                }
                b(n, "reset", 0)
            }
        }, V = function (t) {
            o.viewport.unbind("touchmove", Y);
            var e = t.originalEvent, i = 0;
            if (o.touch.end.x = e.changedTouches[0].pageX, o.touch.end.y = e.changedTouches[0].pageY, "fade" == o.settings.mode) {
                var s = Math.abs(o.touch.start.x - o.touch.end.x);
                s >= o.settings.swipeThreshold && (o.touch.start.x > o.touch.end.x ? r.goToNextSlide() : r.goToPrevSlide(), r.stopAuto())
            } else {
                var s = 0;
                "horizontal" == o.settings.mode ? (s = o.touch.end.x - o.touch.start.x, i = o.touch.originalPos.left) : (s = o.touch.end.y - o.touch.start.y, i = o.touch.originalPos.top), !o.settings.infiniteLoop && (0 == o.active.index && s > 0 || o.active.last && 0 > s) ? b(i, "reset", 200) : Math.abs(s) >= o.settings.swipeThreshold ? (0 > s ? r.goToNextSlide() : r.goToPrevSlide(), r.stopAuto()) : b(i, "reset", 200)
            }
            o.viewport.unbind("touchend", V)
        }, Z = function () {
            var e = t(window).width(), i = t(window).height();
            (a != e || l != i) && (a = e, l = i, r.redrawSlider(), o.settings.onSliderResize.call(r, o.active.index))
        };
        return r.goToSlide = function (e, i) {
            if (!o.working && o.active.index != e)if (o.working = !0, o.oldIndex = o.active.index, o.active.index = 0 > e ? x() - 1 : e >= x() ? 0 : e, o.settings.onSlideBefore(o.children.eq(o.active.index), o.oldIndex, o.active.index), "next" == i ? o.settings.onSlideNext(o.children.eq(o.active.index), o.oldIndex, o.active.index) : "prev" == i && o.settings.onSlidePrev(o.children.eq(o.active.index), o.oldIndex, o.active.index), o.active.last = o.active.index >= x() - 1, o.settings.pager && q(o.active.index), o.settings.controls && W(), "fade" == o.settings.mode)o.settings.adaptiveHeight && o.viewport.height() != v() && o.viewport.animate({height: v()}, o.settings.adaptiveHeightSpeed), o.children.filter(":visible").fadeOut(o.settings.speed).css({zIndex: 0}), o.children.eq(o.active.index).css("zIndex", o.settings.slideZIndex + 1).fadeIn(o.settings.speed, function () {
                t(this).css("zIndex", o.settings.slideZIndex), D()
            }); else {
                o.settings.adaptiveHeight && o.viewport.height() != v() && o.viewport.animate({height: v()}, o.settings.adaptiveHeightSpeed);
                var s = 0, n = {left: 0, top: 0};
                if (!o.settings.infiniteLoop && o.carousel && o.active.last)if ("horizontal" == o.settings.mode) {
                    var a = o.children.eq(o.children.length - 1);
                    n = a.position(), s = o.viewport.width() - a.outerWidth()
                } else {
                    var l = o.children.length - o.settings.minSlides;
                    n = o.children.eq(l).position()
                } else if (o.carousel && o.active.last && "prev" == i) {
                    var d = 1 == o.settings.moveSlides ? o.settings.maxSlides - m() : (x() - 1) * m() - (o.children.length - o.settings.maxSlides), a = r.children(".bx-clone").eq(d);
                    n = a.position()
                } else if ("next" == i && 0 == o.active.index)n = r.find("> .bx-clone").eq(o.settings.maxSlides).position(), o.active.last = !1; else if (e >= 0) {
                    var c = e * m();
                    n = o.children.eq(c).position()
                }
                if ("undefined" != typeof n) {
                    var g = "horizontal" == o.settings.mode ? -(n.left - s) : -n.top;
                    b(g, "slide", o.settings.speed)
                }
            }
        }, r.goToNextSlide = function () {
            if (o.settings.infiniteLoop || !o.active.last) {
                var t = parseInt(o.active.index) + 1;
                r.goToSlide(t, "next")
            }
        }, r.goToPrevSlide = function () {
            if (o.settings.infiniteLoop || 0 != o.active.index) {
                var t = parseInt(o.active.index) - 1;
                r.goToSlide(t, "prev")
            }
        }, r.startAuto = function (t) {
            o.interval || (o.interval = setInterval(function () {
                "next" == o.settings.autoDirection ? r.goToNextSlide() : r.goToPrevSlide()
            }, o.settings.pause), o.settings.autoControls && 1 != t && A("stop"))
        }, r.stopAuto = function (t) {
            o.interval && (clearInterval(o.interval), o.interval = null, o.settings.autoControls && 1 != t && A("start"))
        }, r.getCurrentSlide = function () {
            return o.active.index
        }, r.getCurrentSlideElement = function () {
            return o.children.eq(o.active.index)
        }, r.getSlideCount = function () {
            return o.children.length
        }, r.redrawSlider = function () {
            o.children.add(r.find(".bx-clone")).outerWidth(u()), o.viewport.css("height", v()), o.settings.ticker || S(), o.active.last && (o.active.index = x() - 1), o.active.index >= x() && (o.active.last = !0), o.settings.pager && !o.settings.pagerCustom && (w(), q(o.active.index))
        }, r.destroySlider = function () {
            o.initialized && (o.initialized = !1, t(".bx-clone", this).remove(), o.children.each(function () {
                void 0 != t(this).data("origStyle") ? t(this).attr("style", t(this).data("origStyle")) : t(this).removeAttr("style")
            }), void 0 != t(this).data("origStyle") ? this.attr("style", t(this).data("origStyle")) : t(this).removeAttr("style"), t(this).unwrap().unwrap(), o.controls.el && o.controls.el.remove(), o.controls.next && o.controls.next.remove(), o.controls.prev && o.controls.prev.remove(), o.pagerEl && o.settings.controls && o.pagerEl.remove(), t(".bx-caption", this).remove(), o.controls.autoEl && o.controls.autoEl.remove(), clearInterval(o.interval), o.settings.responsive && t(window).unbind("resize", Z))
        }, r.reloadSlider = function (t) {
            void 0 != t && (n = t), r.destroySlider(), d()
        }, d(), this
    }
}(jQuery);


/*classie*/
/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */

(function (window) {

    'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
    var hasClass, addClass, removeClass;

    if ('classList' in document.documentElement) {
        hasClass = function (elem, c) {
            return elem.classList.contains(c);
        };
        addClass = function (elem, c) {
            elem.classList.add(c);
        };
        removeClass = function (elem, c) {
            elem.classList.remove(c);
        };
    }
    else {
        hasClass = function (elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function (elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function (elem, c) {
            elem.className = elem.className.replace(classReg(c), ' ');
        };
    }

    function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }

    window.classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

})(window);

/*
 jquery.event.drag.js ~ v1.5 ~ Copyright (c) 2008, Three Dub Media (http://threedubmedia.com)
 Liscensed under the MIT License ~ http://threedubmedia.googlecode.com/files/MIT-LICENSE.txt
 */
(function (E) {
    E.fn.drag = function (L, K, J) {
        if (K) {
            this.bind("dragstart", L)
        }
        if (J) {
            this.bind("dragend", J)
        }
        return !L ? this.trigger("drag") : this.bind("drag", K ? K : L)
    };
    var A = E.event, B = A.special, F = B.drag = {not: ":input", distance: 0, which: 1, dragging: false, setup: function (J) {
        J = E.extend({distance: F.distance, which: F.which, not: F.not}, J || {});
        J.distance = I(J.distance);
        A.add(this, "mousedown", H, J);
        if (this.attachEvent) {
            this.attachEvent("ondragstart", D)
        }
    }, teardown: function () {
        A.remove(this, "mousedown", H);
        if (this === F.dragging) {
            F.dragging = F.proxy = false
        }
        G(this, true);
        if (this.detachEvent) {
            this.detachEvent("ondragstart", D)
        }
    }};
    B.dragstart = B.dragend = {setup: function () {
    }, teardown: function () {
    }};
    function H(L) {
        var K = this, J, M = L.data || {};
        if (M.elem) {
            K = L.dragTarget = M.elem;
            L.dragProxy = F.proxy || K;
            L.cursorOffsetX = M.pageX - M.left;
            L.cursorOffsetY = M.pageY - M.top;
            L.offsetX = L.pageX - L.cursorOffsetX;
            L.offsetY = L.pageY - L.cursorOffsetY
        } else {
            if (F.dragging || (M.which > 0 && L.which != M.which) || E(L.target).is(M.not)) {
                return
            }
        }
        switch (L.type) {
            case"mousedown":
                E.extend(M, E(K).offset(), {elem: K, target: L.target, pageX: L.pageX, pageY: L.pageY});
                A.add(document, "mousemove mouseup", H, M);
                G(K, false);
                F.dragging = null;
                return false;
            case !F.dragging && "mousemove":
                if (I(L.pageX - M.pageX) + I(L.pageY - M.pageY) < M.distance) {
                    break
                }
                L.target = M.target;
                J = C(L, "dragstart", K);
                if (J !== false) {
                    F.dragging = K;
                    F.proxy = L.dragProxy = E(J || K)[0]
                }
            case"mousemove":
                if (F.dragging) {
                    J = C(L, "drag", K);
                    if (B.drop) {
                        B.drop.allowed = (J !== false);
                        B.drop.handler(L)
                    }
                    if (J !== false) {
                        break
                    }
                    L.type = "mouseup"
                }
            case"mouseup":
                A.remove(document, "mousemove mouseup", H);
                if (F.dragging) {
                    if (B.drop) {
                        B.drop.handler(L)
                    }
                    C(L, "dragend", K)
                }
                G(K, true);
                F.dragging = F.proxy = M.elem = false;
                break
        }
        return true
    }

    function C(M, K, L) {
        M.type = K;
        var J = E.event.handle.call(L, M);
        return J === false ? false : J || M.result
    }

    function I(J) {
        return Math.pow(J, 2)
    }

    function D() {
        return(F.dragging === false)
    }

    function G(K, J) {
        if (!K) {
            return
        }
        K.unselectable = J ? "off" : "on";
        K.onselectstart = function () {
            return J
        };
        if (K.style) {
            K.style.MozUserSelect = J ? "" : "none"
        }
    }
})(jQuery);

/**
 * @name jQuery.touchSlider
 * @author dohoons ( http://dohoons.com/ )
 *
 * @version 201308
 * @since 201106
 *
 *
 * @example

 $("#target").touchSlider({
flexible : true
});

 */

(function ($) {

    $.fn.touchSlider = function (settings) {

        settings.supportsCssTransitions = (function (style) {
            var prefixes = ['Webkit', 'Moz', 'Ms'];
            for (var i = 0, l = prefixes.length; i < l; i++) {
                if (typeof style[prefixes[i] + 'Transition'] !== 'undefined') {
                    return true;
                }
            }
            return false;
        })(document.createElement('div').style);

        settings = jQuery.extend({
            roll: true,
            flexible: false,
            btn_prev: null,
            btn_next: null,
            paging: null,
            speed: 75,
            view: 1,
            range: 0.15,
            page: 1,
            transition: false,
            initComplete: null,
            counter: null,
            pager: null
        }, settings);

        var opts = [];
        opts = $.extend({}, $.fn.touchSlider.defaults, settings);

        return this.each(function () {

            var _this = this;

            $.fn.extend(this, touchSlider);
            this.opts = opts;
            this.init();

            $(window).bind("orientationchange resize", function () {
                _this.resize(_this);
            });
        });

    };

    var touchSlider = {

        init: function () {
            var _this = this;
            this._page = this.opts.page;
            this._view = this.opts.view;
            this._speed = this.opts.speed;
            this._tg = $(this);
            this._list = this._tg.children().children();
            this._width = parseInt(this._tg.css("width"));
            this._item_w = parseInt(this._list.css("width"));
            this._len = this._list.length;
            this._range = this.opts.range * this._width;
            this._pos = [];
            this._start = [];
            this._startX = 0;
            this._startY = 0;
            this._left = 0;
            this._top = 0;
            this._drag = false;
            this._scroll = false;
            this._btn_prev;
            this._btn_next;

            $(this)
                .unbind("touchstart", this.touchstart)
                .unbind("touchmove", this.touchmove)
                .unbind("touchend", this.touchend)
                .unbind("dragstart", this.touchstart)
                .unbind("drag", this.touchmove)
                .unbind("dragend", this.touchend)
                .bind("touchstart", this.touchstart)
                .bind("touchmove", this.touchmove)
                .bind("touchend", this.touchend)
                .bind("dragstart", this.touchstart)
                .bind("drag", this.touchmove)
                .bind("dragend", this.touchend)


            $(this).children().css({
                "width": this._width + "px",
                "overflow": "visible"
            });

            if (this.opts.flexible) this._item_w = this._width / this._view;
            if (this.opts.roll) this._len = Math.ceil(this._len / this._view) * this._view;

            var page_gap = (this.opts.page > 1 && this.opts.page <= this._len) ? (this.opts.page - 1) * this._item_w : 0;

            for (var i = 0; i < this._len; ++i) {
                this._pos[i] = this._item_w * i - page_gap;
                this._start[i] = this._pos[i];
                this._list.eq(i).css({
                    "float": "none",
                    "display": "block",
                    "position": "absolute",
                    "top": "0",
                    "left": this._pos[i] + "px",
                    "width": this._item_w + "px",
                    "height": this._list.eq(i).height() + "px"
                });

                if (this.opts.supportsCssTransitions && this.opts.transition) {
                    this._list.eq(i).css({
                        "-moz-transition": "0ms",
                        "-moz-transform": "",
                        "-ms-transition": "0ms",
                        "-ms-transform": "",
                        "-webkit-transition": "0ms",
                        "-webkit-transform": "",
                        "transition": "0ms",
                        "transform": ""
                    });
                }
            }

            if (this.opts.btn_prev && this.opts.btn_next) {
                this.opts.btn_prev.unbind("click").bind("click", function () {
                    _this.animate(1, true);
                    return false;
                })
                this.opts.btn_next.unbind("click").bind("click", function () {
                    _this.animate(-1, true);
                    return false;
                });
            }

            if (this.opts.paging) {
                $(this._list).each(function (i, el) {
                    var btn_page = _this.opts.paging.eq(0).clone();
                    _this.opts.paging.before(btn_page);

                    btn_page.bind("click", function (e) {
                        _this.go_page(i, e);
                        return false;
                    });
                });

                this.opts.paging.remove();
            }
            //height auto
            for (var i = 0; i < this._len; ++i) {
                if (this.opts.page - 1 == i) {
                    this._tg.css("height", this._list.eq(i).outerHeight() + "px");
                    if (this.opts.page - 1 < 1) {
                        $("#touchSlider5").next().find(".btn_popup_prev").hide();
                    } else if ((this.opts.page - 1 == this._len - 1)) {
                        $("#touchSlider5").next().find(".btn_popup_next").hide();
                    } else {
                        $("#touchSlider5").next().find(".btn_popup_next").show();
                        $("#touchSlider5").next().find(".btn_popup_prev").show();
                    }
                }
            }
            this.initComplete();
            this.pager();
            this.counter();


        },

        initComplete: function () {
            if (typeof(this.opts.initComplete) == "function") {
                this.opts.initComplete(this);
            }
        },

        resize: function (e) {
            if (e.opts.flexible) {
                var tmp_w = e._item_w;
                e._width = parseInt(e._tg.css("width"));
                e._item_w = e._width / e._view;
                e._range = e.opts.range * e._width;

                for (var i = 0; i < e._len; ++i) {
                    e._pos[i] = e._pos[i] / tmp_w * e._item_w;
                    e._start[i] = e._start[i] / tmp_w * e._item_w;
                    e._list.eq(i).css({
                        "left": e._pos[i] + "px",
                        "width": e._item_w + "px"
                    });


                    if (this.opts.supportsCssTransitions && this.opts.transition) {
                        e._list.eq(i).css({
                            "-moz-transition": "0ms",
                            "-moz-transform": "",
                            "-ms-transition": "0ms",
                            "-ms-transform": "",
                            "-webkit-transition": "0ms",
                            "-webkit-transform": "",
                            "transition": "0ms",
                            "transform": "",
                        });
                    }

                }
            }

            this.pager();
            this.counter();
        },

        touchstart: function (e) {
            if ((e.type == "touchstart" && e.originalEvent.touches.length <= 1) || e.type == "dragstart") {
                this._startX = e.pageX || e.originalEvent.touches[0].pageX;
                this._startY = e.pageY || e.originalEvent.touches[0].pageY;
                this._scroll = false;

                this._start = [];
                for (var i = 0; i < this._len; ++i) {
                    this._start[i] = this._pos[i];
                }
            }
        },

        touchmove: function (e) {
            if ((e.type == "touchmove" && e.originalEvent.touches.length <= 1) || e.type == "drag") {
                this._left = (e.pageX || e.originalEvent.touches[0].pageX) - this._startX;
                this._top = (e.pageY || e.originalEvent.touches[0].pageY) - this._startY;
                var w = this._left < 0 ? this._left * -1 : this._left;
                var h = this._top < 0 ? this._top * -1 : this._top;

                if (w < h || this._scroll) {
                    this._left = 0;
                    this._drag = false;
                    this._scroll = true;
                } else {
                    if (navigator.userAgent.indexOf("android 4.1") > -1) {
                        e.stopPropagation();
                    } else {
                        e.preventDefault();
                    }
                    this._drag = true;
                    this._scroll = false;
                    this.position(e);
                }

                for (var i = 0; i < this._len; ++i) {
                    var tmp = this._start[i] + this._left;

                    if (this.opts.supportsCssTransitions && this.opts.transition) {
                        var trans = "translate3d(" + tmp + "px,0,0)";
                        this._list.eq(i).css({
                            "left": "",
                            "-moz-transition": "0ms",
                            "-moz-transform": trans,
                            "-ms-transition": "0ms",
                            "-ms-transform": trans,
                            "-webkit-transition": "0ms",
                            "-webkit-transform": trans,
                            "transition": "0ms",
                            "transform": trans
                        });

                    } else {
                        this._list.eq(i).css("left", tmp + "px");
                    }
                    this._pos[i] = tmp;


                }
            }
        },

        touchend: function (e) {
            if ((e.type == "touchend" && e.originalEvent.touches.length <= 1) || e.type == "dragend") {
                if (this._scroll) {
                    this._drag = false;
                    this._scroll = false;
                    return false;
                }
                this.animate(this.direction());
                this._drag = false;
                this._scroll = true;
            }
            for (var i = 0; i < this._len; ++i) {
                if (this.opts.page - 1 == i) {
                    this._tg.css("height", this._list.eq(i).outerHeight() + "px");
                }
            }
        },

        position: function (d) {
            var gap = this._view * this._item_w;

            if (d == -1 || d == 1) {
                this._startX = 0;
                this._start = [];
                for (var i = 0; i < this._len; ++i) {
                    this._start[i] = this._pos[i];
                }
                this._left = d * gap;
            } else {
                if (this._left > gap) this._left = gap;
                if (this._left < -gap) this._left = -gap;
            }

            if (this.opts.roll) {
                var tmp_pos = [];
                for (var i = 0; i < this._len; ++i) {
                    tmp_pos[i] = this._pos[i];
                }
                tmp_pos.sort(function (a, b) {
                    return a - b;
                });


                var max_chk = tmp_pos[this._len - this._view];
                var p_min = $.inArray(tmp_pos[0], this._pos);
                var p_max = $.inArray(max_chk, this._pos);


                if (this._view <= 1) max_chk = this._len - 1;

                if ((d == 1 && tmp_pos[0] >= 0) || (this._drag && tmp_pos[0] > 0)) {
                    for (var i = 0; i < this._view; ++i, ++p_min, ++p_max) {
                        this._start[p_max] = this._start[p_min] - gap;
                        this._list.eq(p_max).css("left", this._start[p_max] + "px");
                    }
                } else if ((d == -1 && tmp_pos[max_chk] <= 0) || (this._drag && tmp_pos[max_chk] <= 0)) {
                    for (var i = 0; i < this._view; ++i, ++p_min, ++p_max) {
                        this._start[p_min] = this._start[p_max] + gap;
                        this._list.eq(p_min).css("left", this._start[p_min] + "px");
                    }
                }
            } else {
                if (this.limit_chk()) this._left = this._left / 2;
            }
        },

        animate: function (d, btn_click) {
            if (this._drag || !this._scroll || btn_click) {
                var _this = this;
                var speed = this._speed;

                if (btn_click) this.position(d);

                var gap = d * (this._item_w * this._view);

                if (this._left == 0 || (!this.opts.roll && this.limit_chk())) gap = 0;

                this._list.each(function (i, el) {
                    _this._pos[i] = _this._start[i] + gap;

                    if (_this.opts.supportsCssTransitions && _this.opts.transition) {
                        var transition = speed + "ms";
                        var transform = "translate3d(" + _this._pos[i] + "px,0,0)";

                        if (btn_click) transition = "0ms";

                        $(this).css({
                            "left": "",
                            "-moz-transition": transition,
                            "-moz-transform": transform,
                            "-ms-transition": transition,
                            "-ms-transform": transform,
                            "-webkit-transition": transition,
                            "-webkit-transform": transform,
                            "transition": transition,
                            "transform": transform,
                        });

                    } else {
                        $(this).animate({"left": _this._pos[i] + "px"}, speed);

                    }

                });

                this.pager();
                this.counter();
                //height auto
                for (var i = 0; i < this._len; ++i) {
                    if (this.opts.page - 1 == i) {
                        this._tg.css("height", this._list.eq(i).outerHeight() + "px");
                        if (this.opts.page - 1 < 1) {
                            $("#touchSlider5").next().find(".btn_popup_prev").hide();
                        } else if ((this.opts.page - 1 == this._len - 1)) {
                            $("#touchSlider5").next().find(".btn_popup_next").hide();
                        } else {
                            $("#touchSlider5").next().find(".btn_popup_next").show();
                            $("#touchSlider5").next().find(".btn_popup_prev").show();
                        }
                    }
                }
            }


        },

        direction: function () {
            var r = 0;

            if (this._left < -(this._range)) r = -1;
            else if (this._left > this._range) r = 1;

            if (!this._drag || this._scroll) r = 0;

            return r;
        },

        limit_chk: function () {
            var last_p = parseInt((this._len - 1) / this._view) * this._view;
            return ( (this._start[0] == 0 && this._left > 0) || (this._start[last_p] == 0 && this._left < 0) );

        },

        go_page: function (i, e) {
            var crt = ($.inArray(0, this._pos) / this._view) + 1;
            var cal = crt - (i + 1);

            while (cal != 0) {
                if (cal < 0) {
                    this.animate(-1, true);
                    cal++;
                } else if (cal > 0) {
                    this.animate(1, true);
                    cal--;
                }
            }
        },
        get_page: function () {
            return {
                total: Math.ceil(this._len / this._view),
                current: ($.inArray(0, this._pos) / this._view) + 1
            }
        },

        pager: function () {
            if ($.inArray(0, this._pos) < 0) {
                this.init();
            }
            this.opts.page = this.get_page().current;
            if (typeof(this.opts.pager) == "function") {
                this.opts.pager(this.get_page());
            }
        },

        counter: function () {
            touchSliderCallback(this.get_page());
        }

    };
})(jQuery);


$(document).ready(function () {
    //$("html,body").removeClass("overflow");
    // $("html,body").addClass("over_hidden");

});



/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
    {
        def: 'easeOutQuad',
        swing: function (x, t, b, c, d) {
            //alert(jQuery.easing.default);
            return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
        },
        easeInQuad: function (x, t, b, c, d) {
            return c*(t/=d)*t + b;
        },
        easeOutQuad: function (x, t, b, c, d) {
            return -c *(t/=d)*(t-2) + b;
        },
        easeInOutQuad: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },
        easeInCubic: function (x, t, b, c, d) {
            return c*(t/=d)*t*t + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        easeInOutCubic: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        },
        easeInQuart: function (x, t, b, c, d) {
            return c*(t/=d)*t*t*t + b;
        },
        easeOutQuart: function (x, t, b, c, d) {
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeInOutQuart: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        },
        easeInQuint: function (x, t, b, c, d) {
            return c*(t/=d)*t*t*t*t + b;
        },
        easeOutQuint: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        easeInOutQuint: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        },
        easeInSine: function (x, t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOutSine: function (x, t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOutSine: function (x, t, b, c, d) {
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        },
        easeInExpo: function (x, t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOutExpo: function (x, t, b, c, d) {
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOutExpo: function (x, t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeInCirc: function (x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        easeOutCirc: function (x, t, b, c, d) {
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        easeInOutCirc: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        },
        easeInElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        easeOutElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        },
        easeInOutElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        },
        easeInBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        easeOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeInOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        },
        easeInBounce: function (x, t, b, c, d) {
            return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
        },
        easeOutBounce: function (x, t, b, c, d) {
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeInOutBounce: function (x, t, b, c, d) {
            if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
            return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
        }
    });

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

/*! Overthrow v.0.1.0. An overflow:auto polyfill for responsive design. (c) 2012: Scott Jehl, Filament Group, Inc. http://filamentgroup.github.com/Overthrow/license.txt */
(function( w, undefined ){

    var doc = w.document,
        docElem = doc.documentElement,
        classtext = "overthrow-enabled",

    // Touch events are used in the polyfill, and thus are a prerequisite
        canBeFilledWithPoly = "ontouchmove" in doc,

    // The following attempts to determine whether the browser has native overflow support
    // so we can enable it but not polyfill
        overflowProbablyAlreadyWorks =
            // Features-first. iOS5 overflow scrolling property check - no UA needed here. thanks Apple :)
            "WebkitOverflowScrolling" in docElem.style ||
                // Touch events aren't supported and screen width is greater than X
                // ...basically, this is a loose "desktop browser" check.
                // It may wrongly opt-in very large tablets with no touch support.
            ( !canBeFilledWithPoly && w.screen.width > 1200 ) ||
                // Hang on to your hats.
                // Whitelist some popular, overflow-supporting mobile browsers for now and the future
                // These browsers are known to get overlow support right, but give us no way of detecting it.
            (function(){
                var ua = w.navigator.userAgent,
                // Webkit crosses platforms, and the browsers on our list run at least version 534
                    webkit = ua.match( /AppleWebKit\/([0-9]+)/ ),
                    wkversion = webkit && webkit[1],
                    wkLte534 = webkit && wkversion >= 534;

                return (
                    /* Android 3+ with webkit gte 534
                     ~: Mozilla/5.0 (Linux; U; Android 3.0; en-us; Xoom Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13 */
                ua.match( /Android ([0-9]+)/ ) && RegExp.$1 >= 3 && wkLte534 ||
                    /* Blackberry 7+ with webkit gte 534
                     ~: Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en-US) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0 Mobile Safari/534.11+ */
                ua.match( / Version\/([0-9]+)/ ) && RegExp.$1 >= 0 && w.blackberry && wkLte534 ||
                    /* Blackberry Playbook with webkit gte 534
                     ~: Mozilla/5.0 (PlayBook; U; RIM Tablet OS 1.0.0; en-US) AppleWebKit/534.8+ (KHTML, like Gecko) Version/0.0.1 Safari/534.8+ */
                ua.indexOf( /PlayBook/ ) > -1 && RegExp.$1 >= 0 && wkLte534 ||
                    /* Firefox Mobile (Fennec) 4 and up
                     ~: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:2.1.1) Gecko/ Firefox/4.0.2pre Fennec/4.0. */
                ua.match( /Fennec\/([0-9]+)/ ) && RegExp.$1 >= 4 ||
                    /* WebOS 3 and up (TouchPad too)
                     ~: Mozilla/5.0 (hp-tablet; Linux; hpwOS/3.0.0; U; en-US) AppleWebKit/534.6 (KHTML, like Gecko) wOSBrowser/233.48 Safari/534.6 TouchPad/1.0 */
                ua.match( /wOSBrowser\/([0-9]+)/ ) && RegExp.$1 >= 233 && wkLte534 ||
                    /* Nokia Browser N8
                     ~: Mozilla/5.0 (Symbian/3; Series60/5.2 NokiaN8-00/012.002; Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/533.4 (KHTML, like Gecko) NokiaBrowser/7.3.0 Mobile Safari/533.4 3gpp-gba
                     ~: Note: the N9 doesn't have native overflow with one-finger touch. wtf */
                ua.match( /NokiaBrowser\/([0-9\.]+)/ ) && parseFloat(RegExp.$1) === 7.3 && webkit && wkversion >= 533
                );
            })(),

    // Easing can use any of Robert Penner's equations (http://www.robertpenner.com/easing_terms_of_use.html). By default, overthrow includes ease-out-cubic
    // arguments: t = current iteration, b = initial value, c = end value, d = total iterations
    // use w.overthrow.easing to provide a custom function externally, or pass an easing function as a callback to the toss method
        defaultEasing = function (t, b, c, d) {
            return c*((t=t/d-1)*t*t + 1) + b;
        },

        enabled = false,

    // Keeper of intervals
        timeKeeper,

    /* toss scrolls and element with easing

     // elem is the element to scroll
     // options hash:
     * left is the desired horizontal scroll. Default is "+0". For relative distances, pass a string with "+" or "-" in front.
     * top is the desired vertical scroll. Default is "+0". For relative distances, pass a string with "+" or "-" in front.
     * duration is the number of milliseconds the throw will take. Default is 100.
     * easing is an optional custom easing function. Default is w.overthrow.easing. Must follow the easing function signature
     */
        toss = function( elem, options ){
            var i = 0,
                sLeft = elem.scrollLeft,
                sTop = elem.scrollTop,
            // Toss defaults
                o = {
                    top: "+0",
                    left: "+0",
                    duration: 100,
                    easing: w.overthrow.easing
                },
                endLeft, endTop;

            // Mixin based on predefined defaults
            if( options ){
                for( var j in o ){
                    if( options[ j ] !== undefined ){
                        o[ j ] = options[ j ];
                    }
                }
            }

            // Convert relative values to ints
            // First the left val
            if( typeof o.left === "string" ){
                o.left = parseFloat( o.left );
                endLeft = o.left + sLeft;
            }
            else {
                endLeft = o.left;
                o.left = o.left - sLeft;
            }
            // Then the top val
            if( typeof o.top === "string" ){
                o.top = parseFloat( o.top );
                endTop = o.top + sTop;
            }
            else {
                endTop = o.top;
                o.top = o.top - sTop;
            }

            timeKeeper = setInterval(function(){
                if( i++ < o.duration ){
                    elem.scrollLeft = o.easing( i, sLeft, o.left, o.duration );
                    elem.scrollTop = o.easing( i, sTop, o.top, o.duration );
                }
                else{
                    if( endLeft !== elem.scrollLeft ){
                        elem.scrollLeft = endLeft;
                    }
                    if( endTop !== elem.scrollTop ){
                        elem.scrollTop = endTop;
                    }
                    intercept();
                }
            }, 1 );

            // Return the values, post-mixin, with end values specified
            return { top: endTop, left: endLeft, duration: o.duration, easing: o.easing };
        },

    // find closest overthrow (elem or a parent)
        closest = function( target, ascend ){
            return !ascend && target.className && target.className.indexOf( "overthrow" ) > -1 && target || closest( target.parentNode );
        },

    // Intercept any throw in progress
        intercept = function(){
            clearInterval( timeKeeper );
        },

    // Enable and potentially polyfill overflow
        enable = function(){

            // If it's on,
            if( enabled ){
                return;
            }
            // It's on.
            enabled = true;

            // If overflowProbablyAlreadyWorks or at least the element canBeFilledWithPoly, add a class to cue CSS that assumes overflow scrolling will work (setting height on elements and such)
            if( overflowProbablyAlreadyWorks || canBeFilledWithPoly ){
                docElem.className += " " + classtext;
            }

            // Destroy everything later. If you want to.
            w.overthrow.forget = function(){
                // Strip the class name from docElem
                docElem.className = docElem.className.replace( classtext, "" );
                // Remove touch binding (check for method support since this part isn't qualified by touch support like the rest)
                if( doc.removeEventListener ){
                    doc.removeEventListener( "touchstart", start, false );
                }
                // reset easing to default
                w.overthrow.easing = defaultEasing;

                // Let 'em know
                enabled = false;
            };

            // If overflowProbablyAlreadyWorks or it doesn't look like the browser canBeFilledWithPoly, our job is done here. Exit viewport left.
            if( overflowProbablyAlreadyWorks || !canBeFilledWithPoly ){
                return;
            }

            // Fill 'er up!
            // From here down, all logic is associated with touch scroll handling
            // elem references the overthrow element in use
            var elem,

            // The last several Y values are kept here
                lastTops = [],

            // The last several X values are kept here
                lastLefts = [],

            // lastDown will be true if the last scroll direction was down, false if it was up
                lastDown,

            // lastRight will be true if the last scroll direction was right, false if it was left
                lastRight,

            // For a new gesture, or change in direction, reset the values from last scroll
                resetVertTracking = function(){
                    lastTops = [];
                    lastDown = null;
                },

                resetHorTracking = function(){
                    lastLefts = [];
                    lastRight = null;
                },

            // After releasing touchend, throw the overthrow element, depending on momentum
                finishScroll = function(){
                    // Come up with a distance and duration based on how
                    // Multipliers are tweaked to a comfortable balance across platforms
                    var top = ( lastTops[ 0 ] - lastTops[ lastTops.length -1 ] ) * 8,
                        left = ( lastLefts[ 0 ] - lastLefts[ lastLefts.length -1 ] ) * 8,
                        duration = Math.max( Math.abs( left ), Math.abs( top ) ) / 8;

                    // Make top and left relative-style strings (positive vals need "+" prefix)
                    top = ( top > 0 ? "+" : "" ) + top;
                    left = ( left > 0 ? "+" : "" ) + left;

                    // Make sure there's a significant amount of throw involved, otherwise, just stay still
                    if( !isNaN( duration ) && duration > 0 && ( Math.abs( left ) > 80 || Math.abs( top ) > 80 ) ){
                        toss( elem, { left: left, top: top, duration: duration } );
                    }
                },

            // On webkit, touch events hardly trickle through textareas and inputs
            // Disabling CSS pointer events makes sure they do, but it also makes the controls innaccessible
            // Toggling pointer events at the right moments seems to do the trick
            // Thanks Thomas Bachem http://stackoverflow.com/a/5798681 for the following
                inputs,
                setPointers = function( val ){
                    inputs = elem.querySelectorAll( "textarea, input" );
                    for( var i = 0, il = inputs.length; i < il; i++ ) {
                        inputs[ i ].style.pointerEvents = val;
                    }
                },

            // For nested overthrows, changeScrollTarget restarts a touch event cycle on a parent or child overthrow
                changeScrollTarget = function( startEvent, ascend ){
                    if( doc.createEvent ){
                        var newTarget = ( !ascend || ascend === undefined ) && elem.parentNode || elem.touchchild || elem,
                            tEnd;

                        if( newTarget !== elem ){
                            tEnd = doc.createEvent( "HTMLEvents" );
                            tEnd.initEvent( "touchend", true, true );
                            elem.dispatchEvent( tEnd );
                            newTarget.touchchild = elem;
                            elem = newTarget;
                            newTarget.dispatchEvent( startEvent );
                        }
                    }
                },

            // Touchstart handler
            // On touchstart, touchmove and touchend are freshly bound, and all three share a bunch of vars set by touchstart
            // Touchend unbinds them again, until next time
                start = function( e ){

                    // Stop any throw in progress
                    intercept();

                    // Reset the distance and direction tracking
                    resetVertTracking();
                    resetHorTracking();

                    elem = closest( e.target );

                    if( !elem || elem === docElem || e.touches.length > 1 ){
                        return;
                    }

                    setPointers( "none" );
                    var touchStartE = e,
                        scrollT = elem.scrollTop,
                        scrollL = elem.scrollLeft,
                        height = elem.offsetHeight,
                        width = elem.offsetWidth,
                        startY = e.touches[ 0 ].pageY,
                        startX = e.touches[ 0 ].pageX,
                        scrollHeight = elem.scrollHeight,
                        scrollWidth = elem.scrollWidth,

                    // Touchmove handler
                        move = function( e ){

                            var ty = scrollT + startY - e.touches[ 0 ].pageY,
                                tx = scrollL + startX - e.touches[ 0 ].pageX,
                                down = ty >= ( lastTops.length ? lastTops[ 0 ] : 0 ),
                                right = tx >= ( lastLefts.length ? lastLefts[ 0 ] : 0 );

                            // If there's room to scroll the current container, prevent the default window scroll
                            if( ( ty > 0 && ty < scrollHeight - height ) || ( tx > 0 && tx < scrollWidth - width ) ){
                                e.preventDefault();
                            }
                            // This bubbling is dumb. Needs a rethink.
                            else {
                                changeScrollTarget( touchStartE );
                            }

                            // If down and lastDown are inequal, the y scroll has changed direction. Reset tracking.
                            if( lastDown && down !== lastDown ){
                                resetVertTracking();
                            }

                            // If right and lastRight are inequal, the x scroll has changed direction. Reset tracking.
                            if( lastRight && right !== lastRight ){
                                resetHorTracking();
                            }

                            // remember the last direction in which we were headed
                            lastDown = down;
                            lastRight = right;

                            // set the container's scroll
                            elem.scrollTop = ty;
                            elem.scrollLeft = tx;

                            lastTops.unshift( ty );
                            lastLefts.unshift( tx );

                            if( lastTops.length > 3 ){
                                lastTops.pop();
                            }
                            if( lastLefts.length > 3 ){
                                lastLefts.pop();
                            }
                        },

                    // Touchend handler
                        end = function( e ){
                            // Apply momentum based easing for a graceful finish
                            finishScroll();
                            // Bring the pointers back
                            setPointers( "auto" );
                            setTimeout( function(){
                                setPointers( "none" );
                            }, 450 );
                            elem.removeEventListener( "touchmove", move, false );
                            elem.removeEventListener( "touchend", end, false );
                        };

                    elem.addEventListener( "touchmove", move, false );
                    elem.addEventListener( "touchend", end, false );
                };

            // Bind to touch, handle move and end within
            doc.addEventListener( "touchstart", start, false );
        };

    // Expose overthrow API
    w.overthrow = {
        set: enable,
        forget: function(){},
        easing: defaultEasing,
        toss: toss,
        intercept: intercept,
        closest: closest,
        support: overflowProbablyAlreadyWorks ? "native" : canBeFilledWithPoly && "polyfilled" || "none"
    };

    // Auto-init
    enable();

})( this );


/*! iScroll v5.1.3 ~ (c) 2008-2014 Matteo Spinelli ~ http://cubiq.org/license */
(function (window, document, Math) {
    var rAF = window.requestAnimationFrame	||
        window.webkitRequestAnimationFrame	||
        window.mozRequestAnimationFrame		||
        window.oRequestAnimationFrame		||
        window.msRequestAnimationFrame		||
        function (callback) { window.setTimeout(callback, 1000 / 60); };

    var utils = (function () {
        var me = {};

        var _elementStyle = document.createElement('div').style;
        var _vendor = (function () {
            var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
                transform,
                i = 0,
                l = vendors.length;

            for ( ; i < l; i++ ) {
                transform = vendors[i] + 'ransform';
                if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
            }

            return false;
        })();

        function _prefixStyle (style) {
            if ( _vendor === false ) return false;
            if ( _vendor === '' ) return style;
            return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
        }

        me.getTime = Date.now || function getTime () { return new Date().getTime(); };

        me.extend = function (target, obj) {
            for ( var i in obj ) {
                target[i] = obj[i];
            }
        };

        me.addEvent = function (el, type, fn, capture) {
            el.addEventListener(type, fn, !!capture);
        };

        me.removeEvent = function (el, type, fn, capture) {
            el.removeEventListener(type, fn, !!capture);
        };

        me.prefixPointerEvent = function (pointerEvent) {
            return window.MSPointerEvent ?
            'MSPointer' + pointerEvent.charAt(9).toUpperCase() + pointerEvent.substr(10):
                pointerEvent;
        };

        me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
            var distance = current - start,
                speed = Math.abs(distance) / time,
                destination,
                duration;

            deceleration = deceleration === undefined ? 0.0006 : deceleration;

            destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
            duration = speed / deceleration;

            if ( destination < lowerMargin ) {
                destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
                distance = Math.abs(destination - current);
                duration = distance / speed;
            } else if ( destination > 0 ) {
                destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
                distance = Math.abs(current) + destination;
                duration = distance / speed;
            }

            return {
                destination: Math.round(destination),
                duration: duration
            };
        };

        var _transform = _prefixStyle('transform');

        me.extend(me, {
            hasTransform: _transform !== false,
            hasPerspective: _prefixStyle('perspective') in _elementStyle,
            hasTouch: 'ontouchstart' in window,
            hasPointer: window.PointerEvent || window.MSPointerEvent, // IE10 is prefixed
            hasTransition: _prefixStyle('transition') in _elementStyle
        });

        // This should find all Android browsers lower than build 535.19 (both stock browser and webview)
        me.isBadAndroid = /Android /.test(window.navigator.appVersion) && !(/Chrome\/\d/.test(window.navigator.appVersion));

        me.extend(me.style = {}, {
            transform: _transform,
            transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
            transitionDuration: _prefixStyle('transitionDuration'),
            transitionDelay: _prefixStyle('transitionDelay'),
            transformOrigin: _prefixStyle('transformOrigin')
        });

        me.hasClass = function (e, c) {
            var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
            return re.test(e.className);
        };

        me.addClass = function (e, c) {
            if ( me.hasClass(e, c) ) {
                return;
            }

            var newclass = e.className.split(' ');
            newclass.push(c);
            e.className = newclass.join(' ');
        };

        me.removeClass = function (e, c) {
            if ( !me.hasClass(e, c) ) {
                return;
            }

            var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
            e.className = e.className.replace(re, ' ');
        };

        me.offset = function (el) {
            var left = -el.offsetLeft,
                top = -el.offsetTop;

            // jshint -W084
            while (el = el.offsetParent) {
                left -= el.offsetLeft;
                top -= el.offsetTop;
            }
            // jshint +W084

            return {
                left: left,
                top: top
            };
        };

        me.preventDefaultException = function (el, exceptions) {
            for ( var i in exceptions ) {
                if ( exceptions[i].test(el[i]) ) {
                    return true;
                }
            }

            return false;
        };

        me.extend(me.eventType = {}, {
            touchstart: 1,
            touchmove: 1,
            touchend: 1,

            mousedown: 2,
            mousemove: 2,
            mouseup: 2,

            pointerdown: 3,
            pointermove: 3,
            pointerup: 3,

            MSPointerDown: 3,
            MSPointerMove: 3,
            MSPointerUp: 3
        });

        me.extend(me.ease = {}, {
            quadratic: {
                style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                fn: function (k) {
                    return k * ( 2 - k );
                }
            },
            circular: {
                style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',	// Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
                fn: function (k) {
                    return Math.sqrt( 1 - ( --k * k ) );
                }
            },
            back: {
                style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                fn: function (k) {
                    var b = 4;
                    return ( k = k - 1 ) * k * ( ( b + 1 ) * k + b ) + 1;
                }
            },
            bounce: {
                style: '',
                fn: function (k) {
                    if ( ( k /= 1 ) < ( 1 / 2.75 ) ) {
                        return 7.5625 * k * k;
                    } else if ( k < ( 2 / 2.75 ) ) {
                        return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;
                    } else if ( k < ( 2.5 / 2.75 ) ) {
                        return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;
                    } else {
                        return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;
                    }
                }
            },
            elastic: {
                style: '',
                fn: function (k) {
                    var f = 0.22,
                        e = 0.4;

                    if ( k === 0 ) { return 0; }
                    if ( k == 1 ) { return 1; }

                    return ( e * Math.pow( 2, - 10 * k ) * Math.sin( ( k - f / 4 ) * ( 2 * Math.PI ) / f ) + 1 );
                }
            }
        });

        me.tap = function (e, eventName) {
            var ev = document.createEvent('Event');
            ev.initEvent(eventName, true, true);
            ev.pageX = e.pageX;
            ev.pageY = e.pageY;
            e.target.dispatchEvent(ev);
        };

        me.click = function (e) {
            var target = e.target,
                ev;

            if ( !(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName) ) {
                ev = document.createEvent('MouseEvents');
                ev.initMouseEvent('click', true, true, e.view, 1,
                    target.screenX, target.screenY, target.clientX, target.clientY,
                    e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
                    0, null);

                ev._constructed = true;
                target.dispatchEvent(ev);
            }
        };

        return me;
    })();

    function IScroll (el, options) {
        this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
        this.scroller = this.wrapper.children[0];
        this.scrollerStyle = this.scroller.style;		// cache style for better performance

        this.options = {

            resizeScrollbars: true,

            mouseWheelSpeed: 20,

            snapThreshold: 0.334,

// INSERT POINT: OPTIONS

            startX: 0,
            startY: 0,
            scrollY: true,
            directionLockThreshold: 5,
            momentum: true,

            bounce: true,
            bounceTime: 600,
            bounceEasing: '',

            preventDefault: true,
            preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },

            HWCompositing: true,
            useTransition: true,
            useTransform: true
        };

        for ( var i in options ) {
            this.options[i] = options[i];
        }

        // Normalize options
        this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';

        this.options.useTransition = utils.hasTransition && this.options.useTransition;
        this.options.useTransform = utils.hasTransform && this.options.useTransform;

        this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
        this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

        // If you want eventPassthrough I have to lock one of the axes
        this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
        this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;

        // With eventPassthrough we also need lockDirection mechanism
        this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
        this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

        this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;

        this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;

        if ( this.options.tap === true ) {
            this.options.tap = 'tap';
        }

        if ( this.options.shrinkScrollbars == 'scale' ) {
            this.options.useTransition = false;
        }

        this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;

// INSERT POINT: NORMALIZATION

        // Some defaults
        this.x = 0;
        this.y = 0;
        this.directionX = 0;
        this.directionY = 0;
        this._events = {};

// INSERT POINT: DEFAULTS

        this._init();
        this.refresh();

        this.scrollTo(this.options.startX, this.options.startY);
        this.enable();
    }

    IScroll.prototype = {
        version: '5.1.3',

        _init: function () {
            this._initEvents();

            if ( this.options.scrollbars || this.options.indicators ) {
                this._initIndicators();
            }

            if ( this.options.mouseWheel ) {
                this._initWheel();
            }

            if ( this.options.snap ) {
                this._initSnap();
            }

            if ( this.options.keyBindings ) {
                this._initKeys();
            }

// INSERT POINT: _init

        },

        destroy: function () {
            this._initEvents(true);

            this._execEvent('destroy');
        },

        _transitionEnd: function (e) {
            if ( e.target != this.scroller || !this.isInTransition ) {
                return;
            }

            this._transitionTime();
            if ( !this.resetPosition(this.options.bounceTime) ) {
                this.isInTransition = false;
                this._execEvent('scrollEnd');
            }
        },

        _start: function (e) {
            // React to left mouse button only
            if ( utils.eventType[e.type] != 1 ) {
                if ( e.button !== 0 ) {
                    return;
                }
            }

            if ( !this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated) ) {
                return;
            }

            if ( this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
                e.preventDefault();
            }

            var point = e.touches ? e.touches[0] : e,
                pos;

            this.initiated	= utils.eventType[e.type];
            this.moved		= false;
            this.distX		= 0;
            this.distY		= 0;
            this.directionX = 0;
            this.directionY = 0;
            this.directionLocked = 0;

            this._transitionTime();

            this.startTime = utils.getTime();

            if ( this.options.useTransition && this.isInTransition ) {
                this.isInTransition = false;
                pos = this.getComputedPosition();
                this._translate(Math.round(pos.x), Math.round(pos.y));
                this._execEvent('scrollEnd');
            } else if ( !this.options.useTransition && this.isAnimating ) {
                this.isAnimating = false;
                this._execEvent('scrollEnd');
            }

            this.startX    = this.x;
            this.startY    = this.y;
            this.absStartX = this.x;
            this.absStartY = this.y;
            this.pointX    = point.pageX;
            this.pointY    = point.pageY;

            this._execEvent('beforeScrollStart');
        },

        _move: function (e) {
            if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
                return;
            }

            if ( this.options.preventDefault ) {	// increases performance on Android? TODO: check!
                e.preventDefault();
            }

            var point		= e.touches ? e.touches[0] : e,
                deltaX		= point.pageX - this.pointX,
                deltaY		= point.pageY - this.pointY,
                timestamp	= utils.getTime(),
                newX, newY,
                absDistX, absDistY;

            this.pointX		= point.pageX;
            this.pointY		= point.pageY;

            this.distX		+= deltaX;
            this.distY		+= deltaY;
            absDistX		= Math.abs(this.distX);
            absDistY		= Math.abs(this.distY);

            // We need to move at least 10 pixels for the scrolling to initiate
            if ( timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10) ) {
                return;
            }

            // If you are scrolling in one direction lock the other
            if ( !this.directionLocked && !this.options.freeScroll ) {
                if ( absDistX > absDistY + this.options.directionLockThreshold ) {
                    this.directionLocked = 'h';		// lock horizontally
                } else if ( absDistY >= absDistX + this.options.directionLockThreshold ) {
                    this.directionLocked = 'v';		// lock vertically
                } else {
                    this.directionLocked = 'n';		// no lock
                }
            }

            if ( this.directionLocked == 'h' ) {
                if ( this.options.eventPassthrough == 'vertical' ) {
                    e.preventDefault();
                } else if ( this.options.eventPassthrough == 'horizontal' ) {
                    this.initiated = false;
                    return;
                }

                deltaY = 0;
            } else if ( this.directionLocked == 'v' ) {
                if ( this.options.eventPassthrough == 'horizontal' ) {
                    e.preventDefault();
                } else if ( this.options.eventPassthrough == 'vertical' ) {
                    this.initiated = false;
                    return;
                }

                deltaX = 0;
            }

            deltaX = this.hasHorizontalScroll ? deltaX : 0;
            deltaY = this.hasVerticalScroll ? deltaY : 0;

            newX = this.x + deltaX;
            newY = this.y + deltaY;

            // Slow down if outside of the boundaries
            if ( newX > 0 || newX < this.maxScrollX ) {
                newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
            }
            if ( newY > 0 || newY < this.maxScrollY ) {
                newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
            }

            this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
            this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

            if ( !this.moved ) {
                this._execEvent('scrollStart');
            }

            this.moved = true;

            this._translate(newX, newY);

            /* REPLACE START: _move */

            if ( timestamp - this.startTime > 300 ) {
                this.startTime = timestamp;
                this.startX = this.x;
                this.startY = this.y;
            }

            /* REPLACE END: _move */

        },

        _end: function (e) {
            if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
                return;
            }

            if ( this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
                e.preventDefault();
            }

            var point = e.changedTouches ? e.changedTouches[0] : e,
                momentumX,
                momentumY,
                duration = utils.getTime() - this.startTime,
                newX = Math.round(this.x),
                newY = Math.round(this.y),
                distanceX = Math.abs(newX - this.startX),
                distanceY = Math.abs(newY - this.startY),
                time = 0,
                easing = '';

            this.isInTransition = 0;
            this.initiated = 0;
            this.endTime = utils.getTime();

            // reset if we are outside of the boundaries
            if ( this.resetPosition(this.options.bounceTime) ) {
                return;
            }

            this.scrollTo(newX, newY);	// ensures that the last position is rounded

            // we scrolled less than 10 pixels
            if ( !this.moved ) {
                if ( this.options.tap ) {
                    utils.tap(e, this.options.tap);
                }

                if ( this.options.click ) {
                    utils.click(e);
                }

                this._execEvent('scrollCancel');
                return;
            }

            if ( this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100 ) {
                this._execEvent('flick');
                return;
            }

            // start momentum animation if needed
            if ( this.options.momentum && duration < 300 ) {
                momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : { destination: newX, duration: 0 };
                momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : { destination: newY, duration: 0 };
                newX = momentumX.destination;
                newY = momentumY.destination;
                time = Math.max(momentumX.duration, momentumY.duration);
                this.isInTransition = 1;
            }


            if ( this.options.snap ) {
                var snap = this._nearestSnap(newX, newY);
                this.currentPage = snap;
                time = this.options.snapSpeed || Math.max(
                    Math.max(
                        Math.min(Math.abs(newX - snap.x), 1000),
                        Math.min(Math.abs(newY - snap.y), 1000)
                    ), 300);
                newX = snap.x;
                newY = snap.y;

                this.directionX = 0;
                this.directionY = 0;
                easing = this.options.bounceEasing;
            }

// INSERT POINT: _end

            if ( newX != this.x || newY != this.y ) {
                // change easing function when scroller goes out of the boundaries
                if ( newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY ) {
                    easing = utils.ease.quadratic;
                }

                this.scrollTo(newX, newY, time, easing);
                return;
            }

            this._execEvent('scrollEnd');
        },

        _resize: function () {
            var that = this;

            clearTimeout(this.resizeTimeout);

            this.resizeTimeout = setTimeout(function () {
                that.refresh();
            }, this.options.resizePolling);
        },

        resetPosition: function (time) {
            var x = this.x,
                y = this.y;

            time = time || 0;

            if ( !this.hasHorizontalScroll || this.x > 0 ) {
                x = 0;
            } else if ( this.x < this.maxScrollX ) {
                x = this.maxScrollX;
            }

            if ( !this.hasVerticalScroll || this.y > 0 ) {
                y = 0;
            } else if ( this.y < this.maxScrollY ) {
                y = this.maxScrollY;
            }

            if ( x == this.x && y == this.y ) {
                return false;
            }

            this.scrollTo(x, y, time, this.options.bounceEasing);

            return true;
        },

        disable: function () {
            this.enabled = false;
        },

        enable: function () {
            this.enabled = true;
        },

        refresh: function () {
            var rf = this.wrapper.offsetHeight;		// Force reflow

            this.wrapperWidth	= this.wrapper.clientWidth;
            this.wrapperHeight	= this.wrapper.clientHeight;

            /* REPLACE START: refresh */

            this.scrollerWidth	= this.scroller.offsetWidth;
            this.scrollerHeight	= this.scroller.offsetHeight;

            this.maxScrollX		= this.wrapperWidth - this.scrollerWidth;
            this.maxScrollY		= this.wrapperHeight - this.scrollerHeight;

            /* REPLACE END: refresh */

            this.hasHorizontalScroll	= this.options.scrollX && this.maxScrollX < 0;
            this.hasVerticalScroll		= this.options.scrollY && this.maxScrollY < 0;

            if ( !this.hasHorizontalScroll ) {
                this.maxScrollX = 0;
                this.scrollerWidth = this.wrapperWidth;
            }

            if ( !this.hasVerticalScroll ) {
                this.maxScrollY = 0;
                this.scrollerHeight = this.wrapperHeight;
            }

            this.endTime = 0;
            this.directionX = 0;
            this.directionY = 0;

            this.wrapperOffset = utils.offset(this.wrapper);

            this._execEvent('refresh');

            this.resetPosition();

// INSERT POINT: _refresh

        },

        on: function (type, fn) {
            if ( !this._events[type] ) {
                this._events[type] = [];
            }

            this._events[type].push(fn);
        },

        off: function (type, fn) {
            if ( !this._events[type] ) {
                return;
            }

            var index = this._events[type].indexOf(fn);

            if ( index > -1 ) {
                this._events[type].splice(index, 1);
            }
        },

        _execEvent: function (type) {
            if ( !this._events[type] ) {
                return;
            }

            var i = 0,
                l = this._events[type].length;

            if ( !l ) {
                return;
            }

            for ( ; i < l; i++ ) {
                this._events[type][i].apply(this, [].slice.call(arguments, 1));
            }
        },

        scrollBy: function (x, y, time, easing) {
            x = this.x + x;
            y = this.y + y;
            time = time || 0;

            this.scrollTo(x, y, time, easing);
        },

        scrollTo: function (x, y, time, easing) {
            easing = easing || utils.ease.circular;

            this.isInTransition = this.options.useTransition && time > 0;

            if ( !time || (this.options.useTransition && easing.style) ) {
                this._transitionTimingFunction(easing.style);
                this._transitionTime(time);
                this._translate(x, y);
            } else {
                this._animate(x, y, time, easing.fn);
            }
        },

        scrollToElement: function (el, time, offsetX, offsetY, easing) {
            el = el.nodeType ? el : this.scroller.querySelector(el);

            if ( !el ) {
                return;
            }

            var pos = utils.offset(el);

            pos.left -= this.wrapperOffset.left;
            pos.top  -= this.wrapperOffset.top;

            // if offsetX/Y are true we center the element to the screen
            if ( offsetX === true ) {
                offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
            }
            if ( offsetY === true ) {
                offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
            }

            pos.left -= offsetX || 0;
            pos.top  -= offsetY || 0;

            pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
            pos.top  = pos.top  > 0 ? 0 : pos.top  < this.maxScrollY ? this.maxScrollY : pos.top;

            time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x-pos.left), Math.abs(this.y-pos.top)) : time;

            this.scrollTo(pos.left, pos.top, time, easing);
        },

        _transitionTime: function (time) {
            time = time || 0;

            this.scrollerStyle[utils.style.transitionDuration] = time + 'ms';

            if ( !time && utils.isBadAndroid ) {
                this.scrollerStyle[utils.style.transitionDuration] = '0.001s';
            }


            if ( this.indicators ) {
                for ( var i = this.indicators.length; i--; ) {
                    this.indicators[i].transitionTime(time);
                }
            }


// INSERT POINT: _transitionTime

        },

        _transitionTimingFunction: function (easing) {
            this.scrollerStyle[utils.style.transitionTimingFunction] = easing;


            if ( this.indicators ) {
                for ( var i = this.indicators.length; i--; ) {
                    this.indicators[i].transitionTimingFunction(easing);
                }
            }


// INSERT POINT: _transitionTimingFunction

        },

        _translate: function (x, y) {
            if ( this.options.useTransform ) {

                /* REPLACE START: _translate */

                this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;

                /* REPLACE END: _translate */

            } else {
                x = Math.round(x);
                y = Math.round(y);
                this.scrollerStyle.left = x + 'px';
                this.scrollerStyle.top = y + 'px';
            }

            this.x = x;
            this.y = y;


            if ( this.indicators ) {
                for ( var i = this.indicators.length; i--; ) {
                    this.indicators[i].updatePosition();
                }
            }


// INSERT POINT: _translate

        },

        _initEvents: function (remove) {
            var eventType = remove ? utils.removeEvent : utils.addEvent,
                target = this.options.bindToWrapper ? this.wrapper : window;

            eventType(window, 'orientationchange', this);
            eventType(window, 'resize', this);

            if ( this.options.click ) {
                eventType(this.wrapper, 'click', this, true);
            }

            if ( !this.options.disableMouse ) {
                eventType(this.wrapper, 'mousedown', this);
                eventType(target, 'mousemove', this);
                eventType(target, 'mousecancel', this);
                eventType(target, 'mouseup', this);
            }

            if ( utils.hasPointer && !this.options.disablePointer ) {
                eventType(this.wrapper, utils.prefixPointerEvent('pointerdown'), this);
                eventType(target, utils.prefixPointerEvent('pointermove'), this);
                eventType(target, utils.prefixPointerEvent('pointercancel'), this);
                eventType(target, utils.prefixPointerEvent('pointerup'), this);
            }

            if ( utils.hasTouch && !this.options.disableTouch ) {
                eventType(this.wrapper, 'touchstart', this);
                eventType(target, 'touchmove', this);
                eventType(target, 'touchcancel', this);
                eventType(target, 'touchend', this);
            }

            eventType(this.scroller, 'transitionend', this);
            eventType(this.scroller, 'webkitTransitionEnd', this);
            eventType(this.scroller, 'oTransitionEnd', this);
            eventType(this.scroller, 'MSTransitionEnd', this);
        },

        getComputedPosition: function () {
            var matrix = window.getComputedStyle(this.scroller, null), x, y; 

            if ( this.options.useTransform ) {
                matrix = matrix[utils.style.transform].split(')')[0].split(', ');
                x = +(matrix[12] || matrix[4]);
                y = +(matrix[13] || matrix[5]);
            } else {
                x = +matrix.left.replace(/[^-\d.]/g, '');
                y = +matrix.top.replace(/[^-\d.]/g, '');
            }

            return { x: x, y: y };
        },

        _initIndicators: function () {
            var interactive = this.options.interactiveScrollbars,
                customStyle = typeof this.options.scrollbars != 'string',
                indicators = [],
                indicator;

            var that = this;

            this.indicators = [];

            if ( this.options.scrollbars ) {
                // Vertical scrollbar
                if ( this.options.scrollY ) {
                    indicator = {
                        el: createDefaultScrollbar('v', interactive, this.options.scrollbars),
                        interactive: interactive,
                        defaultScrollbars: true,
                        customStyle: customStyle,
                        resize: this.options.resizeScrollbars,
                        shrink: this.options.shrinkScrollbars,
                        fade: this.options.fadeScrollbars,
                        listenX: false
                    };

                    this.wrapper.appendChild(indicator.el);
                    indicators.push(indicator);
                }

                // Horizontal scrollbar
                if ( this.options.scrollX ) {
                    indicator = {
                        el: createDefaultScrollbar('h', interactive, this.options.scrollbars),
                        interactive: interactive,
                        defaultScrollbars: true,
                        customStyle: customStyle,
                        resize: this.options.resizeScrollbars,
                        shrink: this.options.shrinkScrollbars,
                        fade: this.options.fadeScrollbars,
                        listenY: false
                    };

                    this.wrapper.appendChild(indicator.el);
                    indicators.push(indicator);
                }
            }

            if ( this.options.indicators ) {
                // TODO: check concat compatibility
                indicators = indicators.concat(this.options.indicators);
            }

            for ( var i = indicators.length; i--; ) {
                this.indicators.push( new Indicator(this, indicators[i]) );
            }

            // TODO: check if we can use array.map (wide compatibility and performance issues)
            function _indicatorsMap (fn) {
                for ( var i = that.indicators.length; i--; ) {
                    fn.call(that.indicators[i]);
                }
            }

            if ( this.options.fadeScrollbars ) {
                this.on('scrollEnd', function () {
                    _indicatorsMap(function () {
                        this.fade();
                    });
                });

                this.on('scrollCancel', function () {
                    _indicatorsMap(function () {
                        this.fade();
                    });
                });

                this.on('scrollStart', function () {
                    _indicatorsMap(function () {
                        this.fade(1);
                    });
                });

                this.on('beforeScrollStart', function () {
                    _indicatorsMap(function () {
                        this.fade(1, true);
                    });
                });
            }


            this.on('refresh', function () {
                _indicatorsMap(function () {
                    this.refresh();
                });
            });

            this.on('destroy', function () {
                _indicatorsMap(function () {
                    this.destroy();
                });

                delete this.indicators;
            });
        },

        _initWheel: function () {
            utils.addEvent(this.wrapper, 'wheel', this);
            utils.addEvent(this.wrapper, 'mousewheel', this);
            utils.addEvent(this.wrapper, 'DOMMouseScroll', this);

            this.on('destroy', function () {
                utils.removeEvent(this.wrapper, 'wheel', this);
                utils.removeEvent(this.wrapper, 'mousewheel', this);
                utils.removeEvent(this.wrapper, 'DOMMouseScroll', this);
            });
        },

        _wheel: function (e) {
            if ( !this.enabled ) {
                return;
            }

            e.preventDefault();
            e.stopPropagation();

            var wheelDeltaX, wheelDeltaY,
                newX, newY,
                that = this;

            if ( this.wheelTimeout === undefined ) {
                that._execEvent('scrollStart');
            }

            // Execute the scrollEnd event after 400ms the wheel stopped scrolling
            clearTimeout(this.wheelTimeout);
            this.wheelTimeout = setTimeout(function () {
                that._execEvent('scrollEnd');
                that.wheelTimeout = undefined;
            }, 400);

            if ( 'deltaX' in e ) {
                if (e.deltaMode === 1) {
                    wheelDeltaX = -e.deltaX * this.options.mouseWheelSpeed;
                    wheelDeltaY = -e.deltaY * this.options.mouseWheelSpeed;
                } else {
                    wheelDeltaX = -e.deltaX;
                    wheelDeltaY = -e.deltaY;
                }
            } else if ( 'wheelDeltaX' in e ) {
                wheelDeltaX = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed;
                wheelDeltaY = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
            } else if ( 'wheelDelta' in e ) {
                wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * this.options.mouseWheelSpeed;
            } else if ( 'detail' in e ) {
                wheelDeltaX = wheelDeltaY = -e.detail / 3 * this.options.mouseWheelSpeed;
            } else {
                return;
            }

            wheelDeltaX *= this.options.invertWheelDirection;
            wheelDeltaY *= this.options.invertWheelDirection;

            if ( !this.hasVerticalScroll ) {
                wheelDeltaX = wheelDeltaY;
                wheelDeltaY = 0;
            }

            if ( this.options.snap ) {
                newX = this.currentPage.pageX;
                newY = this.currentPage.pageY;

                if ( wheelDeltaX > 0 ) {
                    newX--;
                } else if ( wheelDeltaX < 0 ) {
                    newX++;
                }

                if ( wheelDeltaY > 0 ) {
                    newY--;
                } else if ( wheelDeltaY < 0 ) {
                    newY++;
                }

                this.goToPage(newX, newY);

                return;
            }

            newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
            newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);

            if ( newX > 0 ) {
                newX = 0;
            } else if ( newX < this.maxScrollX ) {
                newX = this.maxScrollX;
            }

            if ( newY > 0 ) {
                newY = 0;
            } else if ( newY < this.maxScrollY ) {
                newY = this.maxScrollY;
            }

            this.scrollTo(newX, newY, 0);

// INSERT POINT: _wheel
        },

        _initSnap: function () {
            this.currentPage = {};

            if ( typeof this.options.snap == 'string' ) {
                this.options.snap = this.scroller.querySelectorAll(this.options.snap);
            }

            this.on('refresh', function () {
                var i = 0, l,
                    m = 0, n,
                    cx, cy,
                    x = 0, y,
                    stepX = this.options.snapStepX || this.wrapperWidth,
                    stepY = this.options.snapStepY || this.wrapperHeight,
                    el;

                this.pages = [];

                if ( !this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight ) {
                    return;
                }

                if ( this.options.snap === true ) {
                    cx = Math.round( stepX / 2 );
                    cy = Math.round( stepY / 2 );

                    while ( x > -this.scrollerWidth ) {
                        this.pages[i] = [];
                        l = 0;
                        y = 0;

                        while ( y > -this.scrollerHeight ) {
                            this.pages[i][l] = {
                                x: Math.max(x, this.maxScrollX),
                                y: Math.max(y, this.maxScrollY),
                                width: stepX,
                                height: stepY,
                                cx: x - cx,
                                cy: y - cy
                            };

                            y -= stepY;
                            l++;
                        }

                        x -= stepX;
                        i++;
                    }
                } else {
                    el = this.options.snap;
                    l = el.length;
                    n = -1;

                    for ( ; i < l; i++ ) {
                        if ( i === 0 || el[i].offsetLeft <= el[i-1].offsetLeft ) {
                            m = 0;
                            n++;
                        }

                        if ( !this.pages[m] ) {
                            this.pages[m] = [];
                        }

                        x = Math.max(-el[i].offsetLeft, this.maxScrollX);
                        y = Math.max(-el[i].offsetTop, this.maxScrollY);
                        cx = x - Math.round(el[i].offsetWidth / 2);
                        cy = y - Math.round(el[i].offsetHeight / 2);

                        this.pages[m][n] = {
                            x: x,
                            y: y,
                            width: el[i].offsetWidth,
                            height: el[i].offsetHeight,
                            cx: cx,
                            cy: cy
                        };

                        if ( x > this.maxScrollX ) {
                            m++;
                        }
                    }
                }

                this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);

                // Update snap threshold if needed
                if ( this.options.snapThreshold % 1 === 0 ) {
                    this.snapThresholdX = this.options.snapThreshold;
                    this.snapThresholdY = this.options.snapThreshold;
                } else {
                    this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);
                    this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold);
                }
            });

            this.on('flick', function () {
                var time = this.options.snapSpeed || Math.max(
                        Math.max(
                            Math.min(Math.abs(this.x - this.startX), 1000),
                            Math.min(Math.abs(this.y - this.startY), 1000)
                        ), 300);

                this.goToPage(
                    this.currentPage.pageX + this.directionX,
                    this.currentPage.pageY + this.directionY,
                    time
                );
            });
        },

        _nearestSnap: function (x, y) {
            if ( !this.pages.length ) {
                return { x: 0, y: 0, pageX: 0, pageY: 0 };
            }

            var i = 0,
                l = this.pages.length,
                m = 0;

            // Check if we exceeded the snap threshold
            if ( Math.abs(x - this.absStartX) < this.snapThresholdX &&
                Math.abs(y - this.absStartY) < this.snapThresholdY ) {
                return this.currentPage;
            }

            if ( x > 0 ) {
                x = 0;
            } else if ( x < this.maxScrollX ) {
                x = this.maxScrollX;
            }

            if ( y > 0 ) {
                y = 0;
            } else if ( y < this.maxScrollY ) {
                y = this.maxScrollY;
            }

            for ( ; i < l; i++ ) {
                if ( x >= this.pages[i][0].cx ) {
                    x = this.pages[i][0].x;
                    break;
                }
            }

            l = this.pages[i].length;

            for ( ; m < l; m++ ) {
                if ( y >= this.pages[0][m].cy ) {
                    y = this.pages[0][m].y;
                    break;
                }
            }

            if ( i == this.currentPage.pageX ) {
                i += this.directionX;

                if ( i < 0 ) {
                    i = 0;
                } else if ( i >= this.pages.length ) {
                    i = this.pages.length - 1;
                }

                x = this.pages[i][0].x;
            }

            if ( m == this.currentPage.pageY ) {
                m += this.directionY;

                if ( m < 0 ) {
                    m = 0;
                } else if ( m >= this.pages[0].length ) {
                    m = this.pages[0].length - 1;
                }

                y = this.pages[0][m].y;
            }

            return {
                x: x,
                y: y,
                pageX: i,
                pageY: m
            };
        },

        goToPage: function (x, y, time, easing) {
            easing = easing || this.options.bounceEasing;

            if ( x >= this.pages.length ) {
                x = this.pages.length - 1;
            } else if ( x < 0 ) {
                x = 0;
            }

            if ( y >= this.pages[x].length ) {
                y = this.pages[x].length - 1;
            } else if ( y < 0 ) {
                y = 0;
            }

            var posX = this.pages[x][y].x,
                posY = this.pages[x][y].y;

            time = time === undefined ? this.options.snapSpeed || Math.max(
                Math.max(
                    Math.min(Math.abs(posX - this.x), 1000),
                    Math.min(Math.abs(posY - this.y), 1000)
                ), 300) : time;

            this.currentPage = {
                x: posX,
                y: posY,
                pageX: x,
                pageY: y
            };

            this.scrollTo(posX, posY, time, easing);
        },

        next: function (time, easing) {
            var x = this.currentPage.pageX,
                y = this.currentPage.pageY;

            x++;

            if ( x >= this.pages.length && this.hasVerticalScroll ) {
                x = 0;
                y++;
            }

            this.goToPage(x, y, time, easing);
        },

        prev: function (time, easing) {
            var x = this.currentPage.pageX,
                y = this.currentPage.pageY;

            x--;

            if ( x < 0 && this.hasVerticalScroll ) {
                x = 0;
                y--;
            }

            this.goToPage(x, y, time, easing);
        },

        _initKeys: function (e) {
            // default key bindings
            var keys = {
                pageUp: 33,
                pageDown: 34,
                end: 35,
                home: 36,
                left: 37,
                up: 38,
                right: 39,
                down: 40
            };
            var i;

            // if you give me characters I give you keycode
            if ( typeof this.options.keyBindings == 'object' ) {
                for ( i in this.options.keyBindings ) {
                    if ( typeof this.options.keyBindings[i] == 'string' ) {
                        this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0);
                    }
                }
            } else {
                this.options.keyBindings = {};
            }

            for ( i in keys ) {
                this.options.keyBindings[i] = this.options.keyBindings[i] || keys[i];
            }

            utils.addEvent(window, 'keydown', this);

            this.on('destroy', function () {
                utils.removeEvent(window, 'keydown', this);
            });
        },

        _key: function (e) {
            if ( !this.enabled ) {
                return;
            }

            var snap = this.options.snap,	// we are using this alot, better to cache it
                newX = snap ? this.currentPage.pageX : this.x,
                newY = snap ? this.currentPage.pageY : this.y,
                now = utils.getTime(),
                prevTime = this.keyTime || 0,
                acceleration = 0.250,
                pos;

            if ( this.options.useTransition && this.isInTransition ) {
                pos = this.getComputedPosition();

                this._translate(Math.round(pos.x), Math.round(pos.y));
                this.isInTransition = false;
            }

            this.keyAcceleration = now - prevTime < 200 ? Math.min(this.keyAcceleration + acceleration, 50) : 0;

            switch ( e.keyCode ) {
                case this.options.keyBindings.pageUp:
                    if ( this.hasHorizontalScroll && !this.hasVerticalScroll ) {
                        newX += snap ? 1 : this.wrapperWidth;
                    } else {
                        newY += snap ? 1 : this.wrapperHeight;
                    }
                    break;
                case this.options.keyBindings.pageDown:
                    if ( this.hasHorizontalScroll && !this.hasVerticalScroll ) {
                        newX -= snap ? 1 : this.wrapperWidth;
                    } else {
                        newY -= snap ? 1 : this.wrapperHeight;
                    }
                    break;
                case this.options.keyBindings.end:
                    newX = snap ? this.pages.length-1 : this.maxScrollX;
                    newY = snap ? this.pages[0].length-1 : this.maxScrollY;
                    break;
                case this.options.keyBindings.home:
                    newX = 0;
                    newY = 0;
                    break;
                case this.options.keyBindings.left:
                    newX += snap ? -1 : 5 + this.keyAcceleration>>0;
                    break;
                case this.options.keyBindings.up:
                    newY += snap ? 1 : 5 + this.keyAcceleration>>0;
                    break;
                case this.options.keyBindings.right:
                    newX -= snap ? -1 : 5 + this.keyAcceleration>>0;
                    break;
                case this.options.keyBindings.down:
                    newY -= snap ? 1 : 5 + this.keyAcceleration>>0;
                    break;
                default:
                    return;
            }

            if ( snap ) {
                this.goToPage(newX, newY);
                return;
            }

            if ( newX > 0 ) {
                newX = 0;
                this.keyAcceleration = 0;
            } else if ( newX < this.maxScrollX ) {
                newX = this.maxScrollX;
                this.keyAcceleration = 0;
            }

            if ( newY > 0 ) {
                newY = 0;
                this.keyAcceleration = 0;
            } else if ( newY < this.maxScrollY ) {
                newY = this.maxScrollY;
                this.keyAcceleration = 0;
            }

            this.scrollTo(newX, newY, 0);

            this.keyTime = now;
        },

        _animate: function (destX, destY, duration, easingFn) {
            var that = this,
                startX = this.x,
                startY = this.y,
                startTime = utils.getTime(),
                destTime = startTime + duration;

            function step () {
                var now = utils.getTime(),
                    newX, newY,
                    easing;

                if ( now >= destTime ) {
                    that.isAnimating = false;
                    that._translate(destX, destY);

                    if ( !that.resetPosition(that.options.bounceTime) ) {
                        that._execEvent('scrollEnd');
                    }

                    return;
                }

                now = ( now - startTime ) / duration;
                easing = easingFn(now);
                newX = ( destX - startX ) * easing + startX;
                newY = ( destY - startY ) * easing + startY;
                that._translate(newX, newY);

                if ( that.isAnimating ) {
                    rAF(step);
                }
            }

            this.isAnimating = true;
            step();
        },
        handleEvent: function (e) {
            switch ( e.type ) {
                case 'touchstart':
                case 'pointerdown':
                case 'MSPointerDown':
                case 'mousedown':
                    this._start(e);
                    break;
                case 'touchmove':
                case 'pointermove':
                case 'MSPointerMove':
                case 'mousemove':
                    this._move(e);
                    break;
                case 'touchend':
                case 'pointerup':
                case 'MSPointerUp':
                case 'mouseup':
                case 'touchcancel':
                case 'pointercancel':
                case 'MSPointerCancel':
                case 'mousecancel':
                    this._end(e);
                    break;
                case 'orientationchange':
                case 'resize':
                    this._resize();
                    break;
                case 'transitionend':
                case 'webkitTransitionEnd':
                case 'oTransitionEnd':
                case 'MSTransitionEnd':
                    this._transitionEnd(e);
                    break;
                case 'wheel':
                case 'DOMMouseScroll':
                case 'mousewheel':
                    this._wheel(e);
                    break;
                case 'keydown':
                    this._key(e);
                    break;
                case 'click':
                    if ( !e._constructed ) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    break;
            }
        }
    };
    function createDefaultScrollbar (direction, interactive, type) {
        var scrollbar = document.createElement('div'),
            indicator = document.createElement('div');

        if ( type === true ) {
            scrollbar.style.cssText = 'position:absolute;z-index:9999';
            indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px';
        }

        indicator.className = 'iScrollIndicator';

        if ( direction == 'h' ) {
            if ( type === true ) {
                scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
                indicator.style.height = '100%';
            }
            scrollbar.className = 'iScrollHorizontalScrollbar';
        } else {
            if ( type === true ) {
                scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
                indicator.style.width = '100%';
            }
            scrollbar.className = 'iScrollVerticalScrollbar';
        }

        scrollbar.style.cssText += ';overflow:hidden';

        if ( !interactive ) {
            scrollbar.style.pointerEvents = 'none';
        }

        scrollbar.appendChild(indicator);

        return scrollbar;
    }

    function Indicator (scroller, options) {
        this.wrapper = typeof options.el == 'string' ? document.querySelector(options.el) : options.el;
        this.wrapperStyle = this.wrapper.style;
        this.indicator = this.wrapper.children[0];
        this.indicatorStyle = this.indicator.style;
        this.scroller = scroller;

        this.options = {
            listenX: true,
            listenY: true,
            interactive: false,
            resize: true,
            defaultScrollbars: false,
            shrink: false,
            fade: false,
            speedRatioX: 0,
            speedRatioY: 0
        };

        for ( var i in options ) {
            this.options[i] = options[i];
        }

        this.sizeRatioX = 1;
        this.sizeRatioY = 1;
        this.maxPosX = 0;
        this.maxPosY = 0;

        if ( this.options.interactive ) {
            if ( !this.options.disableTouch ) {
                utils.addEvent(this.indicator, 'touchstart', this);
                utils.addEvent(window, 'touchend', this);
            }
            if ( !this.options.disablePointer ) {
                utils.addEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
                utils.addEvent(window, utils.prefixPointerEvent('pointerup'), this);
            }
            if ( !this.options.disableMouse ) {
                utils.addEvent(this.indicator, 'mousedown', this);
                utils.addEvent(window, 'mouseup', this);
            }
        }

        if ( this.options.fade ) {
            this.wrapperStyle[utils.style.transform] = this.scroller.translateZ;
            this.wrapperStyle[utils.style.transitionDuration] = utils.isBadAndroid ? '0.001s' : '0ms';
            this.wrapperStyle.opacity = '0';
        }
    }

    Indicator.prototype = {
        handleEvent: function (e) {
            switch ( e.type ) {
                case 'touchstart':
                case 'pointerdown':
                case 'MSPointerDown':
                case 'mousedown':
                    this._start(e);
                    break;
                case 'touchmove':
                case 'pointermove':
                case 'MSPointerMove':
                case 'mousemove':
                    this._move(e);
                    break;
                case 'touchend':
                case 'pointerup':
                case 'MSPointerUp':
                case 'mouseup':
                case 'touchcancel':
                case 'pointercancel':
                case 'MSPointerCancel':
                case 'mousecancel':
                    this._end(e);
                    break;
            }
        },

        destroy: function () {
            if ( this.options.interactive ) {
                utils.removeEvent(this.indicator, 'touchstart', this);
                utils.removeEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
                utils.removeEvent(this.indicator, 'mousedown', this);

                utils.removeEvent(window, 'touchmove', this);
                utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
                utils.removeEvent(window, 'mousemove', this);

                utils.removeEvent(window, 'touchend', this);
                utils.removeEvent(window, utils.prefixPointerEvent('pointerup'), this);
                utils.removeEvent(window, 'mouseup', this);
            }

            if ( this.options.defaultScrollbars ) {
                this.wrapper.parentNode.removeChild(this.wrapper);
            }
        },

        _start: function (e) {
            var point = e.touches ? e.touches[0] : e;

            e.preventDefault();
            e.stopPropagation();

            this.transitionTime();

            this.initiated = true;
            this.moved = false;
            this.lastPointX	= point.pageX;
            this.lastPointY	= point.pageY;

            this.startTime	= utils.getTime();

            if ( !this.options.disableTouch ) {
                utils.addEvent(window, 'touchmove', this);
            }
            if ( !this.options.disablePointer ) {
                utils.addEvent(window, utils.prefixPointerEvent('pointermove'), this);
            }
            if ( !this.options.disableMouse ) {
                utils.addEvent(window, 'mousemove', this);
            }

            this.scroller._execEvent('beforeScrollStart');
        },

        _move: function (e) {
            var point = e.touches ? e.touches[0] : e,
                deltaX, deltaY,
                newX, newY,
                timestamp = utils.getTime();

            if ( !this.moved ) {
                this.scroller._execEvent('scrollStart');
            }

            this.moved = true;

            deltaX = point.pageX - this.lastPointX;
            this.lastPointX = point.pageX;

            deltaY = point.pageY - this.lastPointY;
            this.lastPointY = point.pageY;

            newX = this.x + deltaX;
            newY = this.y + deltaY;

            this._pos(newX, newY);

// INSERT POINT: indicator._move

            e.preventDefault();
            e.stopPropagation();
        },

        _end: function (e) {
            if ( !this.initiated ) {
                return;
            }

            this.initiated = false;

            e.preventDefault();
            e.stopPropagation();

            utils.removeEvent(window, 'touchmove', this);
            utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
            utils.removeEvent(window, 'mousemove', this);

            if ( this.scroller.options.snap ) {
                var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);

                var time = this.options.snapSpeed || Math.max(
                        Math.max(
                            Math.min(Math.abs(this.scroller.x - snap.x), 1000),
                            Math.min(Math.abs(this.scroller.y - snap.y), 1000)
                        ), 300);

                if ( this.scroller.x != snap.x || this.scroller.y != snap.y ) {
                    this.scroller.directionX = 0;
                    this.scroller.directionY = 0;
                    this.scroller.currentPage = snap;
                    this.scroller.scrollTo(snap.x, snap.y, time, this.scroller.options.bounceEasing);
                }
            }

            if ( this.moved ) {
                this.scroller._execEvent('scrollEnd');
            }
        },

        transitionTime: function (time) {
            time = time || 0;
            this.indicatorStyle[utils.style.transitionDuration] = time + 'ms';

            if ( !time && utils.isBadAndroid ) {
                this.indicatorStyle[utils.style.transitionDuration] = '0.001s';
            }
        },

        transitionTimingFunction: function (easing) {
            this.indicatorStyle[utils.style.transitionTimingFunction] = easing;
        },

        refresh: function () {
            this.transitionTime();

            if ( this.options.listenX && !this.options.listenY ) {
                this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? 'block' : 'none';
            } else if ( this.options.listenY && !this.options.listenX ) {
                this.indicatorStyle.display = this.scroller.hasVerticalScroll ? 'block' : 'none';
            } else {
                this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? 'block' : 'none';
            }

            if ( this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ) {
                utils.addClass(this.wrapper, 'iScrollBothScrollbars');
                utils.removeClass(this.wrapper, 'iScrollLoneScrollbar');

                if ( this.options.defaultScrollbars && this.options.customStyle ) {
                    if ( this.options.listenX ) {
                        this.wrapper.style.right = '8px';
                    } else {
                        this.wrapper.style.bottom = '8px';
                    }
                }
            } else {
                utils.removeClass(this.wrapper, 'iScrollBothScrollbars');
                utils.addClass(this.wrapper, 'iScrollLoneScrollbar');

                if ( this.options.defaultScrollbars && this.options.customStyle ) {
                    if ( this.options.listenX ) {
                        this.wrapper.style.right = '2px';
                    } else {
                        this.wrapper.style.bottom = '2px';
                    }
                }
            }

            var r = this.wrapper.offsetHeight;	// force refresh

            if ( this.options.listenX ) {
                this.wrapperWidth = this.wrapper.clientWidth;
                if ( this.options.resize ) {
                    this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
                    this.indicatorStyle.width = this.indicatorWidth + 'px';
                } else {
                    this.indicatorWidth = this.indicator.clientWidth;
                }

                this.maxPosX = this.wrapperWidth - this.indicatorWidth;

                if ( this.options.shrink == 'clip' ) {
                    this.minBoundaryX = -this.indicatorWidth + 8;
                    this.maxBoundaryX = this.wrapperWidth - 8;
                } else {
                    this.minBoundaryX = 0;
                    this.maxBoundaryX = this.maxPosX;
                }

                this.sizeRatioX = this.options.speedRatioX || (this.scroller.maxScrollX && (this.maxPosX / this.scroller.maxScrollX));
            }

            if ( this.options.listenY ) {
                this.wrapperHeight = this.wrapper.clientHeight;
                if ( this.options.resize ) {
                    this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
                    this.indicatorStyle.height = this.indicatorHeight + 'px';
                } else {
                    this.indicatorHeight = this.indicator.clientHeight;
                }

                this.maxPosY = this.wrapperHeight - this.indicatorHeight;

                if ( this.options.shrink == 'clip' ) {
                    this.minBoundaryY = -this.indicatorHeight + 8;
                    this.maxBoundaryY = this.wrapperHeight - 8;
                } else {
                    this.minBoundaryY = 0;
                    this.maxBoundaryY = this.maxPosY;
                }

                this.maxPosY = this.wrapperHeight - this.indicatorHeight;
                this.sizeRatioY = this.options.speedRatioY || (this.scroller.maxScrollY && (this.maxPosY / this.scroller.maxScrollY));
            }

            this.updatePosition();
        },

        updatePosition: function () {
            var x = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0,
                y = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;

            if ( !this.options.ignoreBoundaries ) {
                if ( x < this.minBoundaryX ) {
                    if ( this.options.shrink == 'scale' ) {
                        this.width = Math.max(this.indicatorWidth + x, 8);
                        this.indicatorStyle.width = this.width + 'px';
                    }
                    x = this.minBoundaryX;
                } else if ( x > this.maxBoundaryX ) {
                    if ( this.options.shrink == 'scale' ) {
                        this.width = Math.max(this.indicatorWidth - (x - this.maxPosX), 8);
                        this.indicatorStyle.width = this.width + 'px';
                        x = this.maxPosX + this.indicatorWidth - this.width;
                    } else {
                        x = this.maxBoundaryX;
                    }
                } else if ( this.options.shrink == 'scale' && this.width != this.indicatorWidth ) {
                    this.width = this.indicatorWidth;
                    this.indicatorStyle.width = this.width + 'px';
                }

                if ( y < this.minBoundaryY ) {
                    if ( this.options.shrink == 'scale' ) {
                        this.height = Math.max(this.indicatorHeight + y * 3, 8);
                        this.indicatorStyle.height = this.height + 'px';
                    }
                    y = this.minBoundaryY;
                } else if ( y > this.maxBoundaryY ) {
                    if ( this.options.shrink == 'scale' ) {
                        this.height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, 8);
                        this.indicatorStyle.height = this.height + 'px';
                        y = this.maxPosY + this.indicatorHeight - this.height;
                    } else {
                        y = this.maxBoundaryY;
                    }
                } else if ( this.options.shrink == 'scale' && this.height != this.indicatorHeight ) {
                    this.height = this.indicatorHeight;
                    this.indicatorStyle.height = this.height + 'px';
                }
            }

            this.x = x;
            this.y = y;

            if ( this.scroller.options.useTransform ) {
                this.indicatorStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.scroller.translateZ;
            } else {
                this.indicatorStyle.left = x + 'px';
                this.indicatorStyle.top = y + 'px';
            }
        },

        _pos: function (x, y) {
            if ( x < 0 ) {
                x = 0;
            } else if ( x > this.maxPosX ) {
                x = this.maxPosX;
            }

            if ( y < 0 ) {
                y = 0;
            } else if ( y > this.maxPosY ) {
                y = this.maxPosY;
            }

            x = this.options.listenX ? Math.round(x / this.sizeRatioX) : this.scroller.x;
            y = this.options.listenY ? Math.round(y / this.sizeRatioY) : this.scroller.y;

            this.scroller.scrollTo(x, y);
        },

        fade: function (val, hold) {
            if ( hold && !this.visible ) {
                return;
            }

            clearTimeout(this.fadeTimeout);
            this.fadeTimeout = null;

            var time = val ? 250 : 500,
                delay = val ? 0 : 300;

            val = val ? '1' : '0';

            this.wrapperStyle[utils.style.transitionDuration] = time + 'ms';

            this.fadeTimeout = setTimeout((function (val) {
                this.wrapperStyle.opacity = val;
                this.visible = +val;
            }).bind(this, val), delay);
        }
    };

    IScroll.utils = utils;

    if ( typeof module != 'undefined' && module.exports ) {
        module.exports = IScroll;
    } else {
        window.IScroll = IScroll;
    }

})(window, document, Math);
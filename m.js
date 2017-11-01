/*=========================================
•                                         •
•   # Tornado UI - Final v1.1             •
•   https://github.com/EngCode/Tornado    •
•                                         •
•   Copyright 2016 Eng Code               •
•   Released under the MIT license        •
•   http://opensource.org/licenses/MIT    •
•                                         •
======================================== */

/*==== jRange ====*/
! function(a, b, c, d) {
    "use strict";
    var e = function() {
        return this.init.apply(this, arguments)
    };
    e.prototype = {
        defaults: {
            onstatechange: function() {},
            ondragend: function() {},
            onbarclicked: function() {},
            isRange: !1,
            showLabels: !0,
            showScale: !0,
            step: 1,
            format: "%s",
            theme: "theme-tornado",
            width: 300,
            disable: !1,
            snap: !1
        },
        template: '<div class="slider-container">			<div class="back-bar">                <div class="selected-bar"></div>                <div class="pointer low"></div><div class="pointer-label low">123456</div>                <div class="pointer high"></div><div class="pointer-label high">456789</div>                <div class="clickable-dummy"></div>            </div>            <div class="scale"></div>		</div>',
        init: function(b, c) {
            this.options = a.extend({}, this.defaults, c), this.inputNode = a(b), this.options.value = this.inputNode.val() || (this.options.isRange ? this.options.from + "," + this.options.from : "" + this.options.from), this.domNode = a(this.template), this.domNode.addClass(this.options.theme), this.inputNode.after(this.domNode), this.domNode.on("change", this.onChange), this.pointers = a(".pointer", this.domNode), this.lowPointer = this.pointers.first(), this.highPointer = this.pointers.last(), this.labels = a(".pointer-label", this.domNode), this.lowLabel = this.labels.first(), this.highLabel = this.labels.last(), this.scale = a(".scale", this.domNode), this.bar = a(".selected-bar", this.domNode), this.clickableBar = this.domNode.find(".clickable-dummy"), this.interval = this.options.to - this.options.from, this.render()
        },
        render: function() {
            return 0 !== this.inputNode.width() || this.options.width ? (this.options.width = this.options.width || this.inputNode.width(), this.domNode.width(this.options.width), this.inputNode.hide(), this.isSingle() && (this.lowPointer.hide(), this.lowLabel.hide()), this.options.showLabels || this.labels.hide(), this.attachEvents(), this.options.showScale && this.renderScale(), void this.setValue(this.options.value)) : void console.log("jRange : no width found, returning")
        },
        isSingle: function() {
            return "number" === typeof this.options.value ? !0 : -1 !== this.options.value.indexOf(",") || this.options.isRange ? !1 : !0
        },
        attachEvents: function() {
            this.clickableBar.click(a.proxy(this.barClicked, this)), this.pointers.on("mousedown touchstart", a.proxy(this.onDragStart, this)), this.pointers.bind("dragstart", function(a) {
                a.preventDefault()
            })
        },
        onDragStart: function(b) {
            if (!(this.options.disable || "mousedown" === b.type && 1 !== b.which)) {
                b.stopPropagation(), b.preventDefault();
                var d = a(b.target);
                this.pointers.removeClass("last-active"), d.addClass("focused last-active"), this[(d.hasClass("low") ? "low" : "high") + "Label"].addClass("focused"), a(c).on("mousemove.slider touchmove.slider", a.proxy(this.onDrag, this, d)), a(c).on("mouseup.slider touchend.slider touchcancel.slider", a.proxy(this.onDragEnd, this))
            }
        },
        onDrag: function(a, b) {
            b.stopPropagation(), b.preventDefault(), b.originalEvent.touches && b.originalEvent.touches.length ? b = b.originalEvent.touches[0] : b.originalEvent.changedTouches && b.originalEvent.changedTouches.length && (b = b.originalEvent.changedTouches[0]);
            var c = b.clientX - this.domNode.offset().left;
            this.domNode.trigger("change", [this, a, c])
        },
        onDragEnd: function() {
            this.pointers.removeClass("focused").trigger("rangeslideend"), this.labels.removeClass("focused"), a(c).off(".slider"), this.options.ondragend.call(this, this.options.value)
        },
        barClicked: function(a) {
            if (!this.options.disable) {
                var b = a.pageX - this.clickableBar.offset().left;
                if (this.isSingle()) this.setPosition(this.pointers.last(), b, !0, !0);
                else {
                    var i, c = Math.abs(parseFloat(this.pointers.first().css("left"), 10)),
                        d = this.pointers.first().width() / 2,
                        e = Math.abs(parseFloat(this.pointers.last().css("left"), 10)),
                        f = this.pointers.first().width() / 2,
                        g = Math.abs(c - b + d),
                        h = Math.abs(e - b + f);
                    i = g == h ? b < c ? this.pointers.first() : this.pointers.last() : g < h ? this.pointers.first() : this.pointers.last(), this.setPosition(i, b, !0, !0)
                }
                this.options.onbarclicked.call(this, this.options.value)
            }
        },
        onChange: function(a, b, c, d) {
            var e, f;
            e = 0, f = b.domNode.width(), b.isSingle() || (e = c.hasClass("high") ? parseFloat(b.lowPointer.css("left")) + b.lowPointer.width() / 2 : 0, f = c.hasClass("low") ? parseFloat(b.highPointer.css("left")) + b.highPointer.width() / 2 : b.domNode.width());
            var g = Math.min(Math.max(d, e), f);
            b.setPosition(c, g, !0)
        },
        setPosition: function(a, b, c, d) {
            var e, f, g = parseFloat(this.lowPointer.css("left")),
                h = parseFloat(this.highPointer.css("left")) || 0,
                i = this.highPointer.width() / 2;
            if (c || (b = this.prcToPx(b)), this.options.snap) {
                var j = this.correctPositionForSnap(b);
                if (-1 === j) return;
                b = j
            }
            a[0] === this.highPointer[0] ? h = Math.round(b - i) : g = Math.round(b - i), a[d ? "animate" : "css"]({
                left: Math.round(b - i)
            }), this.isSingle() ? e = 0 : (e = g + i, f = h + i);
            var k = Math.round(h + i - e);
            this.bar[d ? "animate" : "css"]({
                width: Math.abs(k),
                left: k > 0 ? e : e + k
            }), this.showPointerValue(a, b, d), this.isReadonly()
        },
        correctPositionForSnap: function(a) {
            var b = this.positionToValue(a) - this.options.from,
                c = this.options.width / (this.interval / this.options.step),
                d = b / this.options.step * c;
            return a <= d + c / 2 && a >= d - c / 2 ? d : -1
        },
        setValue: function(a) {
            var b = a.toString().split(",");
            b[0] = Math.min(Math.max(b[0], this.options.from), this.options.to) + "", b.length > 1 && (b[1] = Math.min(Math.max(b[1], this.options.from), this.options.to) + ""), this.options.value = a;
            var c = this.valuesToPrc(2 === b.length ? b : [0, b[0]]);
            this.isSingle() ? this.setPosition(this.highPointer, c[1]) : (this.setPosition(this.lowPointer, c[0]), this.setPosition(this.highPointer, c[1]))
        },
        renderScale: function() {
            for (var b = this.options.scale || [this.options.from, this.options.to], c = Math.round(100 / (b.length - 1) * 10) / 10, d = "", e = 0; e < b.length; e++) d += '<span style="left: ' + e * c + '%">' + ("|" != b[e] ? "<ins>" + b[e] + "</ins>" : "") + "</span>";
            this.scale.html(d), a("ins", this.scale).each(function() {
                a(this).css({
                    marginLeft: -a(this).outerWidth() / 2
                })
            })
        },
        getBarWidth: function() {
            var a = this.options.value.split(",");
            return a.length > 1 ? parseFloat(a[1]) - parseFloat(a[0]) : parseFloat(a[0])
        },
        showPointerValue: function(b, c, e) {
            var g, f = a(".pointer-label", this.domNode)[b.hasClass("low") ? "first" : "last"](),
                h = this.positionToValue(c);
            if (a.isFunction(this.options.format)) {
                var i = this.isSingle() ? d : b.hasClass("low") ? "low" : "high";
                g = this.options.format(h, i)
            } else g = this.options.format.replace("%s", h);
            var j = f.html(g).width(),
                k = c - j / 2;
            k = Math.min(Math.max(k, 0), this.options.width - j), f[e ? "animate" : "css"]({
                left: k
            }), this.setInputValue(b, h)
        },
        valuesToPrc: function(a) {
            var b = 100 * (parseFloat(a[0]) - parseFloat(this.options.from)) / this.interval,
                c = 100 * (parseFloat(a[1]) - parseFloat(this.options.from)) / this.interval;
            return [b, c]
        },
        prcToPx: function(a) {
            return this.domNode.width() * a / 100
        },
        isDecimal: function() {
            return -1 === (this.options.value + this.options.from + this.options.to).indexOf(".") ? !1 : !0
        },
        positionToValue: function(a) {
            var b = a / this.domNode.width() * this.interval;
            if (b = parseFloat(b, 10) + parseFloat(this.options.from, 10), this.isDecimal()) {
                var c = Math.round(Math.round(b / this.options.step) * this.options.step * 100) / 100;
                if (0 !== c)
                    for (c = "" + c, -1 === c.indexOf(".") && (c += "."); c.length - c.indexOf(".") < 3;) c += "0";
                else c = "0.00";
                return c
            }
            return Math.round(b / this.options.step) * this.options.step
        },
        setInputValue: function(a, b) {
            if (this.isSingle()) this.options.value = b.toString();
            else {
                var c = this.options.value.split(",");
                this.options.value = a.hasClass("low") ? b + "," + c[1] : c[0] + "," + b
            }
            this.inputNode.val() !== this.options.value && (this.inputNode.val(this.options.value).trigger("change"), this.options.onstatechange.call(this, this.options.value))
        },
        getValue: function() {
            return this.options.value
        },
        getOptions: function() {
            return this.options
        },
        getRange: function() {
            return this.options.from + "," + this.options.to
        },
        isReadonly: function() {
            this.domNode.toggleClass("slider-readonly", this.options.disable)
        },
        disable: function() {
            this.options.disable = !0, this.isReadonly()
        },
        enable: function() {
            this.options.disable = !1, this.isReadonly()
        },
        toggleDisable: function() {
            this.options.disable = !this.options.disable, this.isReadonly()
        },
        updateRange: function(a, b) {
            var c = a.toString().split(",");
            this.interval = parseInt(c[1]) - parseInt(c[0]), this.setValue(b ? b : this.getValue())
        }
    };
    var f = "jRange";
    a.fn[f] = function(c) {
        var g, d = arguments;
        return this.each(function() {
            var h = a(this),
                i = a.data(this, "plugin_" + f),
                j = "object" === typeof c && c;
            i || (h.data("plugin_" + f, i = new e(this, j)), a(b).resize(function() {
                i.setValue(i.getValue())
            })), "string" === typeof c && (g = i[c].apply(i, Array.prototype.slice.call(d, 1)))
        }), g || this
    }
}(jQuery, window, document);
/*==== Sticky-kit v1.1.2  ====*/
(function() {
    var b, f;
    b = this.jQuery || window.jQuery;
    f = b(window);
    b.fn.stick_in_parent = function(d) {
        var A, w, J, n, B, K, p, q, k, E, t;
        null == d && (d = {});
        t = d.sticky_class;
        B = d.inner_scrolling;
        E = d.recalc_every;
        k = d.parent;
        q = d.offset_top;
        p = d.spacer;
        w = d.bottoming;
        null == q && (q = 0);
        null == k && (k = void 0);
        null == B && (B = !0);
        null == t && (t = "is_stuck");
        A = b(document);
        null == w && (w = !0);
        J = function(a, d, n, C, F, u, r, G) {
            var v, H, m, D, I, c, g, x, y, z, h, l;
            if (!a.data("sticky_kit")) {
                a.data("sticky_kit", !0);
                I = A.height();
                g = a.parent();
                null != k && (g = g.closest(k));
                if (!g.length) throw "failed to find stick parent";
                v = m = !1;
                (h = null != p ? p && a.closest(p) : b("<div />")) && h.css("position", a.css("position"));
                x = function() {
                    var c, f, e;
                    if (!G && (I = A.height(), c = parseInt(g.css("border-top-width"), 10), f = parseInt(g.css("padding-top"), 10), d = parseInt(g.css("padding-bottom"), 10), n = g.offset().top + c + f, C = g.height(), m && (v = m = !1, null == p && (a.insertAfter(h), h.detach()), a.css({
                                position: "",
                                top: "",
                                width: "",
                                bottom: ""
                            }).removeClass(t), e = !0), F = a.offset().top - (parseInt(a.css("margin-top"), 10) || 0) - q,
                            u = a.outerHeight(!0), r = a.css("float"), h && h.css({
                                width: a.outerWidth(!0),
                                height: u,
                                display: a.css("display"),
                                "vertical-align": a.css("vertical-align"),
                                "float": r
                            }), e)) return l()
                };
                x();
                if (u !== C) return D = void 0, c = q, z = E, l = function() {
                    var b, l, e, k;
                    if (!G && (e = !1, null != z && (--z, 0 >= z && (z = E, x(), e = !0)), e || A.height() === I || x(), e = f.scrollTop(), null != D && (l = e - D), D = e, m ? (w && (k = e + u + c > C + n, v && !k && (v = !1, a.css({
                            position: "fixed",
                            bottom: "",
                            top: c
                        }).trigger("sticky_kit:unbottom"))), e < F && (m = !1, c = q, null == p && ("left" !== r && "right" !== r || a.insertAfter(h),
                            h.detach()), b = {
                            position: "",
                            width: "",
                            top: ""
                        }, a.css(b).removeClass(t).trigger("sticky_kit:unstick")), B && (b = f.height(), u + q > b && !v && (c -= l, c = Math.max(b - u, c), c = Math.min(q, c), m && a.css({
                            top: c + "px"
                        })))) : e > F && (m = !0, b = {
                            position: "fixed",
                            top: c
                        }, b.width = "border-box" === a.css("box-sizing") ? a.outerWidth() + "px" : a.width() + "px", a.css(b).addClass(t), null == p && (a.after(h), "left" !== r && "right" !== r || h.append(a)), a.trigger("sticky_kit:stick")), m && w && (null == k && (k = e + u + c > C + n), !v && k))) return v = !0, "static" === g.css("position") && g.css({
                            position: "relative"
                        }),
                        a.css({
                            position: "absolute",
                            bottom: d,
                            top: "auto"
                        }).trigger("sticky_kit:bottom")
                }, y = function() {
                    x();
                    return l()
                }, H = function() {
                    G = !0;
                    f.off("touchmove", l);
                    f.off("scroll", l);
                    f.off("resize", y);
                    b(document.body).off("sticky_kit:recalc", y);
                    a.off("sticky_kit:detach", H);
                    a.removeData("sticky_kit");
                    a.css({
                        position: "",
                        bottom: "",
                        top: "",
                        width: ""
                    });
                    g.position("position", "");
                    if (m) return null == p && ("left" !== r && "right" !== r || a.insertAfter(h), h.remove()), a.removeClass(t)
                }, f.on("touchmove", l), f.on("scroll", l), f.on("resize",
                    y), b(document.body).on("sticky_kit:recalc", y), a.on("sticky_kit:detach", H), setTimeout(l, 0)
            }
        };
        n = 0;
        for (K = this.length; n < K; n++) d = this[n], J(b(d));
        return this
    }
}).call(this);
/*==== Datepicker v0.4.0 ====*/
! function(t) {
    "function" == typeof define && define.amd ? define("datepicker", ["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
}(function(t) {
    "use strict";

    function e(t) {
        return j.call(t).slice(8, -1).toLowerCase()
    }

    function i(t) {
        return "string" == typeof t
    }

    function s(t) {
        return "number" == typeof t && !isNaN(t)
    }

    function a(t) {
        return "undefined" == typeof t
    }

    function n(t) {
        return "date" === e(t)
    }

    function r(t, e) {
        var i = [];
        return Array.from ? Array.from(t).slice(e || 0) : (s(e) && i.push(e), i.slice.apply(t, i))
    }

    function h(t, e) {
        var i = r(arguments, 2);
        return function() {
            return t.apply(e, i.concat(r(arguments)))
        }
    }

    function o(t) {
        return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
    }

    function l(t, e) {
        return [31, o(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
    }

    function d(t) {
        var e, i, s = String(t).toLowerCase(),
            a = s.match(x);
        if (!a || 0 === a.length) throw new Error("Invalid date format.");
        for (t = {
                source: s,
                parts: a
            }, e = a.length, i = 0; i < e; i++) switch (a[i]) {
            case "dd":
            case "d":
                t.hasDay = !0;
                break;
            case "mm":
            case "m":
                t.hasMonth = !0;
                break;
            case "yyyy":
            case "yy":
                t.hasYear = !0
        }
        return t
    }

    function u(e, i) {
        i = t.isPlainObject(i) ? i : {}, i.language && (i = t.extend({}, u.LANGUAGES[i.language], i)), this.$element = t(e), this.options = t.extend({}, u.DEFAULTS, i), this.isBuilt = !1, this.isShown = !1, this.isInput = !1, this.isInline = !1, this.initialValue = "", this.initialDate = null, this.startDate = null, this.endDate = null, this.init()
    }
    var c = t(window),
        f = window.document,
        p = t(f),
        w = window.Number,
        y = "datepicker",
        m = "click." + y,
        g = "keyup." + y,
        v = "focus." + y,
        D = "resize." + y,
        k = "show." + y,
        b = "hide." + y,
        $ = "pick." + y,
        x = /(y|m|d)+/g,
        C = /\d+/g,
        S = /^\d{2,4}$/,
        F = y + "-inline",
        V = y + "-dropdown",
        M = y + "-top-left",
        I = y + "-top-right",
        T = y + "-bottom-left",
        Y = y + "-bottom-right",
        A = [M, I, T, Y].join(" "),
        P = y + "-hide",
        N = Math.min,
        j = Object.prototype.toString;
    u.prototype = {
        constructor: u,
        init: function() {
            var e = this.options,
                i = this.$element,
                s = e.startDate,
                a = e.endDate,
                n = e.date;
            this.$trigger = t(e.trigger || i), this.isInput = i.is("input") || i.is("textarea"), this.isInline = e.inline && (e.container || !this.isInput), this.format = d(e.format), this.oldValue = this.initialValue = this.getValue(), n = this.parseDate(n || this.initialValue), s && (s = this.parseDate(s), n.getTime() < s.getTime() && (n = new Date(s)), this.startDate = s), a && (a = this.parseDate(a), s && a.getTime() < s.getTime() && (a = new Date(s)), n.getTime() > a.getTime() && (n = new Date(a)), this.endDate = a), this.date = n, this.viewDate = new Date(n), this.initialDate = new Date(this.date), this.bind(), (e.autoShow || this.isInline) && this.show(), e.autoPick && this.pick()
        },
        build: function() {
            var e, i = this.options,
                s = this.$element;
            this.isBuilt || (this.isBuilt = !0, this.$picker = e = t(i.template), this.$week = e.find('[data-view="week"]'), this.$yearsPicker = e.find('[data-view="years picker"]'), this.$yearsPrev = e.find('[data-view="years prev"]'), this.$yearsNext = e.find('[data-view="years next"]'), this.$yearsCurrent = e.find('[data-view="years current"]'), this.$years = e.find('[data-view="years"]'), this.$monthsPicker = e.find('[data-view="months picker"]'), this.$yearPrev = e.find('[data-view="year prev"]'), this.$yearNext = e.find('[data-view="year next"]'), this.$yearCurrent = e.find('[data-view="year current"]'), this.$months = e.find('[data-view="months"]'), this.$daysPicker = e.find('[data-view="days picker"]'), this.$monthPrev = e.find('[data-view="month prev"]'), this.$monthNext = e.find('[data-view="month next"]'), this.$monthCurrent = e.find('[data-view="month current"]'), this.$days = e.find('[data-view="days"]'), this.isInline ? t(i.container || s).append(e.addClass(F)) : (t(f.body).append(e.addClass(V)), e.addClass(P)), this.fillWeek())
        },
        unbuild: function() {
            this.isBuilt && (this.isBuilt = !1, this.$picker.remove())
        },
        bind: function() {
            var e = this.options,
                i = this.$element;
            t.isFunction(e.show) && i.on(k, e.show), t.isFunction(e.hide) && i.on(b, e.hide), t.isFunction(e.pick) && i.on($, e.pick), this.isInput && (i.on(g, t.proxy(this.keyup, this)), e.trigger || i.on(v, t.proxy(this.show, this))), this.$trigger.on(m, t.proxy(this.show, this))
        },
        unbind: function() {
            var e = this.options,
                i = this.$element;
            t.isFunction(e.show) && i.off(k, e.show), t.isFunction(e.hide) && i.off(b, e.hide), t.isFunction(e.pick) && i.off($, e.pick), this.isInput && (i.off(g, this.keyup), e.trigger || i.off(v, this.show)), this.$trigger.off(m, this.show)
        },
        showView: function(t) {
            var e = this.$yearsPicker,
                i = this.$monthsPicker,
                s = this.$daysPicker,
                a = this.format;
            if (a.hasYear || a.hasMonth || a.hasDay) switch (w(t)) {
                case 2:
                case "years":
                    i.addClass(P), s.addClass(P), a.hasYear ? (this.fillYears(), e.removeClass(P)) : this.showView(0);
                    break;
                case 1:
                case "months":
                    e.addClass(P), s.addClass(P), a.hasMonth ? (this.fillMonths(), i.removeClass(P)) : this.showView(2);
                    break;
                default:
                    e.addClass(P), i.addClass(P), a.hasDay ? (this.fillDays(), s.removeClass(P)) : this.showView(1)
            }
        },
        hideView: function() {
            this.options.autoHide && this.hide()
        },
        place: function() {
            var t = this.options,
                e = this.$element,
                i = this.$picker,
                s = p.outerWidth(),
                a = p.outerHeight(),
                n = e.outerWidth(),
                r = e.outerHeight(),
                h = i.width(),
                o = i.height(),
                l = e.offset(),
                d = l.left,
                u = l.top,
                c = parseFloat(t.offset) || 10,
                f = M;
            u > o && u + r + o > a ? (u -= o + c, f = T) : u += r + c, d + h > s && (d = d + n - h, f = f.replace("left", "right")), i.removeClass(A).addClass(f).css({
                top: u,
                left: d,
                zIndex: parseInt(t.zIndex, 10)
            })
        },
        trigger: function(e, i) {
            var s = t.Event(e, i);
            return this.$element.trigger(s), s
        },
        createItem: function(e) {
            var i = this.options,
                s = i.itemTag,
                a = {
                    text: "",
                    view: "",
                    muted: !1,
                    picked: !1,
                    disabled: !1
                };
            return t.extend(a, e), "<" + s + " " + (a.disabled ? 'class="' + i.disabledClass + '"' : a.picked ? 'class="' + i.pickedClass + '"' : a.muted ? 'class="' + i.mutedClass + '"' : "") + (a.view ? ' data-view="' + a.view + '"' : "") + ">" + a.text + "</" + s + ">"
        },
        fillAll: function() {
            this.fillYears(), this.fillMonths(), this.fillDays()
        },
        fillWeek: function() {
            var e, i = this.options,
                s = parseInt(i.weekStart, 10) % 7,
                a = i.daysMin,
                n = "";
            for (a = t.merge(a.slice(s), a.slice(0, s)), e = 0; e <= 6; e++) n += this.createItem({
                text: a[e]
            });
            this.$week.html(n)
        },
        fillYears: function() {
            var e, i = this.options,
                s = i.disabledClass || "",
                a = i.yearSuffix || "",
                n = t.isFunction(i.filter) && i.filter,
                r = this.startDate,
                h = this.endDate,
                o = this.viewDate,
                l = o.getFullYear(),
                d = o.getMonth(),
                u = o.getDate(),
                c = this.date,
                f = c.getFullYear(),
                p = !1,
                w = !1,
                y = !1,
                m = !1,
                g = !1,
                v = "",
                D = -5,
                k = 6;
            for (e = D; e <= k; e++) c = new Date(l + e, d, u), g = e === D || e === k, m = l + e === f, y = !1, r && (y = c.getFullYear() < r.getFullYear(), e === D && (p = y)), !y && h && (y = c.getFullYear() > h.getFullYear(), e === k && (w = y)), !y && n && (y = n.call(this.$element, c) === !1), v += this.createItem({
                text: l + e,
                view: y ? "year disabled" : m ? "year picked" : "year",
                muted: g,
                picked: m,
                disabled: y
            });
            this.$yearsPrev.toggleClass(s, p), this.$yearsNext.toggleClass(s, w), this.$yearsCurrent.toggleClass(s, !0).html(l + D + a + " - " + (l + k) + a), this.$years.html(v)
        },
        fillMonths: function() {
            var e, i = this.options,
                s = i.disabledClass || "",
                a = i.monthsShort,
                n = t.isFunction(i.filter) && i.filter,
                r = this.startDate,
                h = this.endDate,
                o = this.viewDate,
                l = o.getFullYear(),
                d = o.getDate(),
                u = this.date,
                c = u.getFullYear(),
                f = u.getMonth(),
                p = !1,
                w = !1,
                y = !1,
                m = !1,
                g = "";
            for (e = 0; e <= 11; e++) u = new Date(l, e, d), m = l === c && e === f, y = !1, r && (p = u.getFullYear() === r.getFullYear(), y = p && u.getMonth() < r.getMonth()), !y && h && (w = u.getFullYear() === h.getFullYear(), y = w && u.getMonth() > h.getMonth()), !y && n && (y = n.call(this.$element, u) === !1), g += this.createItem({
                index: e,
                text: a[e],
                view: y ? "month disabled" : m ? "month picked" : "month",
                picked: m,
                disabled: y
            });
            this.$yearPrev.toggleClass(s, p), this.$yearNext.toggleClass(s, w), this.$yearCurrent.toggleClass(s, p && w).html(l + i.yearSuffix || ""), this.$months.html(g)
        },
        fillDays: function() {
            var e, i, s, a = this.options,
                n = a.disabledClass || "",
                r = a.yearSuffix || "",
                h = a.monthsShort,
                o = parseInt(a.weekStart, 10) % 7,
                d = t.isFunction(a.filter) && a.filter,
                u = this.startDate,
                c = this.endDate,
                f = this.viewDate,
                p = f.getFullYear(),
                w = f.getMonth(),
                y = p,
                m = w,
                g = p,
                v = w,
                D = this.date,
                k = D.getFullYear(),
                b = D.getMonth(),
                $ = D.getDate(),
                x = !1,
                C = !1,
                S = !1,
                F = !1,
                V = [],
                M = [],
                I = [],
                T = 42;
            for (0 === w ? (y -= 1, m = 11) : m -= 1, e = l(y, m), D = new Date(p, w, 1), s = D.getDay() - o, s <= 0 && (s += 7), u && (x = D.getTime() <= u.getTime()), i = e - (s - 1); i <= e; i++) D = new Date(y, m, i), S = !1, u && (S = D.getTime() < u.getTime()), !S && d && (S = d.call(this.$element, D) === !1), V.push(this.createItem({
                text: i,
                view: "day prev",
                muted: !0,
                disabled: S
            }));
            for (11 === w ? (g += 1, v = 0) : v += 1, e = l(p, w), s = T - (V.length + e), D = new Date(p, w, e), c && (C = D.getTime() >= c.getTime()), i = 1; i <= s; i++) D = new Date(g, v, i), S = !1, c && (S = D.getTime() > c.getTime()), !S && d && (S = d.call(this.$element, D) === !1), M.push(this.createItem({
                text: i,
                view: "day next",
                muted: !0,
                disabled: S
            }));
            for (i = 1; i <= e; i++) D = new Date(p, w, i), F = p === k && w === b && i === $, S = !1, u && (S = D.getTime() < u.getTime()), !S && c && (S = D.getTime() > c.getTime()), !S && d && (S = d.call(this.$element, D) === !1), I.push(this.createItem({
                text: i,
                view: S ? "day disabled" : F ? "day picked" : "day",
                picked: F,
                disabled: S
            }));
            this.$monthPrev.toggleClass(n, x), this.$monthNext.toggleClass(n, C), this.$monthCurrent.toggleClass(n, x && C).html(a.yearFirst ? p + r + " " + h[w] : h[w] + " " + p + r), this.$days.html(V.join("") + I.join(" ") + M.join(""))
        },
        click: function(e) {
            var i, s, a, n, r, h, o = t(e.target),
                l = this.viewDate;
            if (e.stopPropagation(), e.preventDefault(), !o.hasClass("disabled")) switch (i = l.getFullYear(), s = l.getMonth(), a = l.getDate(), h = o.data("view")) {
                case "years prev":
                case "years next":
                    i = "years prev" === h ? i - 10 : i + 10, r = o.text(), n = S.test(r), n && (i = parseInt(r, 10), this.date = new Date(i, s, N(a, 28))), this.viewDate = new Date(i, s, N(a, 28)), this.fillYears(), n && (this.showView(1), this.pick("year"));
                    break;
                case "year prev":
                case "year next":
                    i = "year prev" === h ? i - 1 : i + 1, this.viewDate = new Date(i, s, N(a, 28)), this.fillMonths();
                    break;
                case "year current":
                    this.format.hasYear && this.showView(2);
                    break;
                case "year picked":
                    this.format.hasMonth ? this.showView(1) : this.hideView();
                    break;
                case "year":
                    i = parseInt(o.text(), 10), this.date = new Date(i, s, N(a, 28)), this.viewDate = new Date(i, s, N(a, 28)), this.format.hasMonth ? this.showView(1) : this.hideView(), this.pick("year");
                    break;
                case "month prev":
                case "month next":
                    s = "month prev" === h ? s - 1 : "month next" === h ? s + 1 : s, this.viewDate = new Date(i, s, N(a, 28)), this.fillDays();
                    break;
                case "month current":
                    this.format.hasMonth && this.showView(1);
                    break;
                case "month picked":
                    this.format.hasDay ? this.showView(0) : this.hideView();
                    break;
                case "month":
                    s = t.inArray(o.text(), this.options.monthsShort), this.date = new Date(i, s, N(a, 28)), this.viewDate = new Date(i, s, N(a, 28)), this.format.hasDay ? this.showView(0) : this.hideView(), this.pick("month");
                    break;
                case "day prev":
                case "day next":
                case "day":
                    s = "day prev" === h ? s - 1 : "day next" === h ? s + 1 : s, a = parseInt(o.text(), 10), this.date = new Date(i, s, a), this.viewDate = new Date(i, s, a), this.fillDays(), "day" === h && this.hideView(), this.pick("day");
                    break;
                case "day picked":
                    this.hideView(), this.pick("day")
            }
        },
        clickDoc: function(t) {
            for (var e, i = t.target, s = this.$trigger[0]; i !== f;) {
                if (i === s) {
                    e = !0;
                    break
                }
                i = i.parentNode
            }
            e || this.hide()
        },
        keyup: function() {
            this.update()
        },
        getValue: function() {
            var t = this.$element,
                e = "";
            return this.isInput ? e = t.val() : this.isInline ? this.options.container && (e = t.text()) : e = t.text(), e
        },
        setValue: function(t) {
            var e = this.$element;
            t = i(t) ? t : "", this.isInput ? e.val(t) : this.isInline ? this.options.container && e.text(t) : e.text(t)
        },
        show: function() {
            this.isBuilt || this.build(), this.isShown || this.trigger(k).isDefaultPrevented() || (this.isShown = !0, this.$picker.removeClass(P).on(m, t.proxy(this.click, this)), this.showView(this.options.startView), this.isInline || (c.on(D, this._place = h(this.place, this)), p.on(m, this._clickDoc = h(this.clickDoc, this)), this.place()))
        },
        hide: function() {
            this.isShown && (this.trigger(b).isDefaultPrevented() || (this.isShown = !1, this.$picker.addClass(P).off(m, this.click), this.isInline || (c.off(D, this._place), p.off(m, this._clickDoc))))
        },
        update: function() {
            var t = this.getValue();
            t !== this.oldValue && (this.setDate(t, !0), this.oldValue = t)
        },
        pick: function(t) {
            var e = this.$element,
                i = this.date;
            this.trigger($, {
                view: t || "",
                date: i
            }).isDefaultPrevented() || (this.setValue(i = this.formatDate(this.date)), this.isInput && e.trigger("change"))
        },
        reset: function() {
            this.setDate(this.initialDate, !0), this.setValue(this.initialValue), this.isShown && this.showView(this.options.startView)
        },
        getMonthName: function(e, i) {
            var n = this.options,
                r = n.months;
            return t.isNumeric(e) ? e = w(e) : a(i) && (i = e), i === !0 && (r = n.monthsShort), r[s(e) ? e : this.date.getMonth()]
        },
        getDayName: function(e, i, n) {
            var r = this.options,
                h = r.days;
            return t.isNumeric(e) ? e = w(e) : (a(n) && (n = i), a(i) && (i = e)), h = n === !0 ? r.daysMin : i === !0 ? r.daysShort : h, h[s(e) ? e : this.date.getDay()]
        },
        getDate: function(t) {
            var e = this.date;
            return t ? this.formatDate(e) : new Date(e)
        },
        setDate: function(e, s) {
            var a = this.options.filter;
            if (n(e) || i(e)) {
                if (e = this.parseDate(e), t.isFunction(a) && a.call(this.$element, e) === !1) return;
                this.date = e, this.viewDate = new Date(e), s || this.pick(), this.isBuilt && this.fillAll()
            }
        },
        setStartDate: function(t) {
            (n(t) || i(t)) && (this.startDate = this.parseDate(t), this.isBuilt && this.fillAll())
        },
        setEndDate: function(t) {
            (n(t) || i(t)) && (this.endDate = this.parseDate(t), this.isBuilt && this.fillAll())
        },
        parseDate: function(t) {
            var e, s, a, r, h, o, l = this.format,
                d = [];
            if (n(t)) return new Date(t.getFullYear(), t.getMonth(), t.getDate());
            if (i(t) && (d = t.match(C) || []), t = new Date, s = t.getFullYear(), a = t.getDate(), r = t.getMonth(), e = l.parts.length, d.length === e)
                for (o = 0; o < e; o++) switch (h = parseInt(d[o], 10) || 1, l.parts[o]) {
                    case "dd":
                    case "d":
                        a = h;
                        break;
                    case "mm":
                    case "m":
                        r = h - 1;
                        break;
                    case "yy":
                        s = 2e3 + h;
                        break;
                    case "yyyy":
                        s = h
                }
            return new Date(s, r, a)
        },
        formatDate: function(t) {
            var e, i, s, a, r, h = this.format,
                o = "";
            if (n(t))
                for (o = h.source, i = t.getFullYear(), a = {
                        d: t.getDate(),
                        m: t.getMonth() + 1,
                        yy: i.toString().substring(2),
                        yyyy: i
                    }, a.dd = (a.d < 10 ? "0" : "") + a.d, a.mm = (a.m < 10 ? "0" : "") + a.m, e = h.parts.length, r = 0; r < e; r++) s = h.parts[r], o = o.replace(s, a[s]);
            return o
        },
        destroy: function() {
            this.unbind(), this.unbuild(), this.$element.removeData(y)
        }
    }, u.LANGUAGES = {}, u.DEFAULTS = {
        autoShow: !1,
        autoHide: !1,
        autoPick: !1,
        inline: !1,
        container: null,
        trigger: null,
        language: "",
        format: "mm/dd/yyyy",
        date: null,
        startDate: null,
        endDate: null,
        startView: 0,
        weekStart: 0,
        yearFirst: !1,
        yearSuffix: "",
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        itemTag: "li",
        mutedClass: "muted",
        pickedClass: "picked",
        disabledClass: "disabled",
        template: '<div class="datepicker-container"><div class="datepicker-panel" data-view="years picker"><ul><li data-view="years prev">&lsaquo;</li><li data-view="years current"></li><li data-view="years next">&rsaquo;</li></ul><ul data-view="years"></ul></div><div class="datepicker-panel" data-view="months picker"><ul><li data-view="year prev">&lsaquo;</li><li data-view="year current"></li><li data-view="year next">&rsaquo;</li></ul><ul data-view="months"></ul></div><div class="datepicker-panel" data-view="days picker"><ul><li data-view="month prev">&lsaquo;</li><li data-view="month current"></li><li data-view="month next">&rsaquo;</li></ul><ul data-view="week"></ul><ul data-view="days"></ul></div></div>',
        offset: 10,
        zIndex: 1e3,
        filter: null,
        show: null,
        hide: null,
        pick: null
    }, u.setDefaults = function(e) {
        e = t.isPlainObject(e) ? e : {}, e.language && (e = t.extend({}, u.LANGUAGES[e.language], e)), t.extend(u.DEFAULTS, e)
    }, u.other = t.fn.datepicker, t.fn.datepicker = function(e) {
        var s, n = r(arguments, 1);
        return this.each(function() {
            var a, r, h = t(this),
                o = h.data(y);
            if (!o) {
                if (/destroy/.test(e)) return;
                a = t.extend({}, h.data(), t.isPlainObject(e) && e), h.data(y, o = new u(this, a))
            }
            i(e) && t.isFunction(r = o[e]) && (s = r.apply(o, n))
        }), a(s) ? this : s
    }, t.fn.datepicker.Constructor = u, t.fn.datepicker.languages = u.LANGUAGES, t.fn.datepicker.setDefaults = u.setDefaults, t.fn.datepicker.noConflict = function() {
        return t.fn.datepicker = u.other, this
    }
});
/*==== jQuery Tags Input Plugin 1.3.3 ====*/
! function(a) {
    var b = new Array,
        c = new Array;
    a.fn.doAutosize = function(b) {
        var c = a(this).data("minwidth"),
            d = a(this).data("maxwidth"),
            e = "",
            f = a(this),
            g = a("#" + a(this).data("tester_id"));
        if (e !== (e = f.val())) {
            var h = e.replace(/&/g, "&amp;").replace(/\s/g, " ").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            g.html(h);
            var i = g.width(),
                j = i + b.comfortZone >= c ? i + b.comfortZone : c,
                k = f.width(),
                l = j < k && j >= c || j > c && j < d;
            l && f.width(j)
        }
    }, a.fn.resetAutosize = function(b) {
        var c = a(this).data("minwidth") || b.minInputWidth || a(this).width(),
            d = a(this).data("maxwidth") || b.maxInputWidth || a(this).closest(".tagsinput").width() - b.inputPadding,
            f = a(this),
            g = a("<tester/>").css({
                position: "absolute",
                top: -9999,
                left: -9999,
                width: "auto",
                fontSize: f.css("fontSize"),
                fontFamily: f.css("fontFamily"),
                fontWeight: f.css("fontWeight"),
                letterSpacing: f.css("letterSpacing"),
                whiteSpace: "nowrap"
            }),
            h = a(this).attr("id") + "_autosize_tester";
        !a("#" + h).length > 0 && (g.attr("id", h), g.appendTo("body")), f.data("minwidth", c), f.data("maxwidth", d), f.data("tester_id", h), f.css("width", c)
    }, a.fn.addTag = function(d, e) {
        return e = jQuery.extend({
            focus: !1,
            callback: !0
        }, e), this.each(function() {
            var f = a(this).attr("id"),
                g = a(this).val().split(b[f]);
            if ("" == g[0] && (g = new Array), d = jQuery.trim(d), e.unique) {
                var h = a(this).tagExist(d);
                1 == h && a("#" + f + "_tag").addClass("not_valid")
            } else var h = !1;
            if ("" != d && 1 != h) {
                if (a("<span>").addClass("tag").append(a("<span>").text(d).append("&nbsp;&nbsp;"), a("<a>", {
                        href: "#",
                        title: "Removing tag",
                        text: "x"
                    }).click(function() {
                        return a("#" + f).removeTag(escape(d))
                    })).insertBefore("#" + f + "_addTag"), g.push(d), a("#" + f + "_tag").val(""), e.focus ? a("#" + f + "_tag").focus() : a("#" + f + "_tag").blur(), a.fn.tagsInput.updateTagsField(this, g), e.callback && c[f] && c[f].onAddTag) {
                    var i = c[f].onAddTag;
                    i.call(this, d)
                }
                if (c[f] && c[f].onChange) {
                    var j = g.length,
                        i = c[f].onChange;
                    i.call(this, a(this), g[j - 1])
                }
            }
        }), !1
    }, a.fn.removeTag = function(d) {
        return d = unescape(d), this.each(function() {
            var e = a(this).attr("id"),
                f = a(this).val().split(b[e]);
            for (a("#" + e + "_tagsinput .tag").remove(), str = "", i = 0; i < f.length; i++) f[i] != d && (str = str + b[e] + f[i]);
            if (a.fn.tagsInput.importTags(this, str), c[e] && c[e].onRemoveTag) {
                var g = c[e].onRemoveTag;
                g.call(this, d)
            }
        }), !1
    }, a.fn.tagExist = function(c) {
        var d = a(this).attr("id"),
            e = a(this).val().split(b[d]);
        return jQuery.inArray(c, e) >= 0
    }, a.fn.importTags = function(b) {
        var c = a(this).attr("id");
        a("#" + c + "_tagsinput .tag").remove(), a.fn.tagsInput.importTags(this, b)
    }, a.fn.tagsInput = function(e) {
        var f = jQuery.extend({
                interactive: !0,
                defaultText: "add a tag",
                minChars: 0,
                width: "300px",
                height: "100px",
                autocomplete: {
                    selectFirst: !1
                },
                hide: !0,
                delimiter: ",",
                unique: !0,
                removeWithBackspace: !0,
                placeholderColor: "#666666",
                autosize: !0,
                comfortZone: 20,
                inputPadding: 12
            }, e),
            g = 0;
        return this.each(function() {
            if ("undefined" === typeof a(this).attr("data-tagsinput-init")) {
                a(this).attr("data-tagsinput-init", !0), f.hide && a(this).hide();
                var e = a(this).attr("id");
                (!e || b[a(this).attr("id")]) && (e = a(this).attr("id", "tags" + (new Date).getTime() + g++).attr("id"));
                var h = jQuery.extend({
                    pid: e,
                    real_input: "#" + e,
                    holder: "#" + e + "_tagsinput",
                    input_wrapper: "#" + e + "_addTag",
                    fake_input: "#" + e + "_tag"
                }, f);
                b[e] = h.delimiter, (f.onAddTag || f.onRemoveTag || f.onChange) && (c[e] = new Array, c[e].onAddTag = f.onAddTag, c[e].onRemoveTag = f.onRemoveTag, c[e].onChange = f.onChange);
                var i = '<div id="' + e + '_tagsinput" class="tagsinput"><div id="' + e + '_addTag">';
                if (f.interactive && (i = i + '<input id="' + e + '_tag" value="" data-default="' + f.defaultText + '" />'), i += '</div><div class="tags_clear"></div></div>', a(i).insertAfter(this), a(h.holder).css("width", f.width), a(h.holder).css("min-height", f.height), a(h.holder).css("height", f.height), "" != a(h.real_input).val() && a.fn.tagsInput.importTags(a(h.real_input), a(h.real_input).val()), f.interactive) {
                    if (a(h.fake_input).val(a(h.fake_input).attr("data-default")), a(h.fake_input).css("color", f.placeholderColor), a(h.fake_input).resetAutosize(f), a(h.holder).bind("click", h, function(b) {
                            a(b.data.fake_input).focus()
                        }), a(h.fake_input).bind("focus", h, function(b) {
                            a(b.data.fake_input).val() == a(b.data.fake_input).attr("data-default") && a(b.data.fake_input).val(""), a(b.data.fake_input).css("color", "#000000")
                        }), void 0 != f.autocomplete_url) {
                        autocomplete_options = {
                            source: f.autocomplete_url
                        };
                        for (attrname in f.autocomplete) autocomplete_options[attrname] = f.autocomplete[attrname];
                        void 0 !== jQuery.Autocompleter ? (a(h.fake_input).autocomplete(f.autocomplete_url, f.autocomplete), a(h.fake_input).bind("result", h, function(b, c) {
                            c && a("#" + e).addTag(c[0] + "", {
                                focus: !0,
                                unique: f.unique
                            })
                        })) : void 0 !== jQuery.ui.autocomplete && (a(h.fake_input).autocomplete(autocomplete_options), a(h.fake_input).bind("autocompleteselect", h, function(b, c) {
                            return a(b.data.real_input).addTag(c.item.value, {
                                focus: !0,
                                unique: f.unique
                            }), !1
                        }))
                    } else a(h.fake_input).bind("blur", h, function(b) {
                        var c = a(this).attr("data-default");
                        return "" != a(b.data.fake_input).val() && a(b.data.fake_input).val() != c ? b.data.minChars <= a(b.data.fake_input).val().length && (!b.data.maxChars || b.data.maxChars >= a(b.data.fake_input).val().length) && a(b.data.real_input).addTag(a(b.data.fake_input).val(), {
                            focus: !0,
                            unique: f.unique
                        }) : (a(b.data.fake_input).val(a(b.data.fake_input).attr("data-default")), a(b.data.fake_input).css("color", f.placeholderColor)), !1
                    });
                    a(h.fake_input).bind("keypress", h, function(b) {
                        return d(b) ? (b.preventDefault(), b.data.minChars <= a(b.data.fake_input).val().length && (!b.data.maxChars || b.data.maxChars >= a(b.data.fake_input).val().length) && a(b.data.real_input).addTag(a(b.data.fake_input).val(), {
                            focus: !0,
                            unique: f.unique
                        }), a(b.data.fake_input).resetAutosize(f), !1) : void(b.data.autosize && a(b.data.fake_input).doAutosize(f))
                    }), h.removeWithBackspace && a(h.fake_input).bind("keydown", function(b) {
                        if (8 == b.keyCode && "" == a(this).val()) {
                            b.preventDefault();
                            var c = a(this).closest(".tagsinput").find(".tag:last").text(),
                                d = a(this).attr("id").replace(/_tag$/, "");
                            c = c.replace(/[\s]+x$/, ""), a("#" + d).removeTag(escape(c)), a(this).trigger("focus")
                        }
                    }), a(h.fake_input).blur(), h.unique && a(h.fake_input).keydown(function(b) {
                        (8 == b.keyCode || String.fromCharCode(b.which).match(/\w+|[\xe1\xe9\xed\xf3\xfa\xc1\xc9\xcd\xd3\xda\xf1\xd1,/]+/)) && a(this).removeClass("not_valid")
                    })
                }
            }
        }), this
    }, a.fn.tagsInput.updateTagsField = function(c, d) {
        var e = a(c).attr("id");
        a(c).val(d.join(b[e]))
    }, a.fn.tagsInput.importTags = function(d, e) {
        a(d).val("");
        var f = a(d).attr("id"),
            g = e.split(b[f]);
        for (i = 0; i < g.length; i++) a(d).addTag(g[i], {
            focus: !1,
            callback: !1
        });
        if (c[f] && c[f].onChange) {
            var h = c[f].onChange;
            h.call(d, d, g[i])
        }
    };
    var d = function(b) {
        var c = !1;
        return 13 == b.which ? !0 : ("string" === typeof b.data.delimiter ? b.which == b.data.delimiter.charCodeAt(0) && (c = !0) : a.each(b.data.delimiter, function(a, d) {
            b.which == d.charCodeAt(0) && (c = !0)
        }), c)
    }
}(jQuery);
/* easy-autocomplete jQuery plugin for autocompletion */
var EasyAutocomplete = function(a) {
        return a.Configuration = function(a) {
            function b() {
                if ("xml" === a.dataType && (a.getValue || (a.getValue = function(a) {
                        return $(a).text()
                    }), a.list || (a.list = {}), a.list.sort || (a.list.sort = {}), a.list.sort.method = function(b, c) {
                        return b = a.getValue(b), c = a.getValue(c), c > b ? -1 : b > c ? 1 : 0
                    }, a.list.match || (a.list.match = {}), a.list.match.method = function(a, b) {
                        return a.search(b) > -1
                    }), void 0 !== a.categories && a.categories instanceof Array) {
                    for (var b = [], c = 0, d = a.categories.length; d > c; c += 1) {
                        var e = a.categories[c];
                        for (var f in h.categories[0]) void 0 === e[f] && (e[f] = h.categories[0][f]);
                        b.push(e)
                    }
                    a.categories = b
                }
            }

            function c() {
                function b(a, c) {
                    var d = a || {};
                    for (var e in a) void 0 !== c[e] && null !== c[e] && ("object" != typeof c[e] || c[e] instanceof Array ? d[e] = c[e] : b(a[e], c[e]));
                    return void 0 !== c.data && null !== c.data && "object" == typeof c.data && (d.data = c.data), d
                }
                h = b(h, a)
            }

            function d() {
                if ("list-required" !== h.url && "function" != typeof h.url) {
                    var b = h.url;
                    h.url = function() {
                        return b
                    }
                }
                if (void 0 !== h.ajaxSettings.url && "function" != typeof h.ajaxSettings.url) {
                    var b = h.ajaxSettings.url;
                    h.ajaxSettings.url = function() {
                        return b
                    }
                }
                if ("string" == typeof h.listLocation) {
                    var c = h.listLocation;
                    "XML" === h.dataType.toUpperCase() ? h.listLocation = function(a) {
                        return $(a).find(c)
                    } : h.listLocation = function(a) {
                        return a[c]
                    }
                }
                if ("string" == typeof h.getValue) {
                    var d = h.getValue;
                    h.getValue = function(a) {
                        return a[d]
                    }
                }
                void 0 !== a.categories && (h.categoriesAssigned = !0)
            }

            function e() {
                void 0 !== a.ajaxSettings && "object" == typeof a.ajaxSettings ? h.ajaxSettings = a.ajaxSettings : h.ajaxSettings = {}
            }

            function f(a) {
                return void 0 !== h[a] && null !== h[a]
            }

            function g(a, b) {
                function c(b, d) {
                    for (var e in d) void 0 === b[e] && a.log("Property '" + e + "' does not exist in EasyAutocomplete options API."), "object" == typeof b[e] && -1 === $.inArray(e, i) && c(b[e], d[e])
                }
                c(h, b)
            }
            var h = {
                    data: "list-required",
                    url: "list-required",
                    dataType: "json",
                    listLocation: function(a) {
                        return a
                    },
                    xmlElementName: "",
                    getValue: function(a) {
                        return a
                    },
                    autocompleteOff: !0,
                    placeholder: !1,
                    ajaxCallback: function() {},
                    matchResponseProperty: !1,
                    list: {
                        sort: {
                            enabled: !1,
                            method: function(a, b) {
                                return a = h.getValue(a), b = h.getValue(b), b > a ? -1 : a > b ? 1 : 0
                            }
                        },
                        maxNumberOfElements: 6,
                        hideOnEmptyPhrase: !0,
                        match: {
                            enabled: !1,
                            caseSensitive: !1,
                            method: function(a, b) {
                                return a.search(b) > -1
                            }
                        },
                        showAnimation: {
                            type: "normal",
                            time: 400,
                            callback: function() {}
                        },
                        hideAnimation: {
                            type: "normal",
                            time: 400,
                            callback: function() {}
                        },
                        onClickEvent: function() {},
                        onSelectItemEvent: function() {},
                        onLoadEvent: function() {},
                        onChooseEvent: function() {},
                        onKeyEnterEvent: function() {},
                        onMouseOverEvent: function() {},
                        onMouseOutEvent: function() {},
                        onShowListEvent: function() {},
                        onHideListEvent: function() {}
                    },
                    highlightPhrase: !0,
                    theme: "",
                    cssClasses: "",
                    minCharNumber: 0,
                    requestDelay: 0,
                    adjustWidth: !0,
                    ajaxSettings: {},
                    preparePostData: function(a, b) {
                        return a
                    },
                    loggerEnabled: !0,
                    template: "",
                    categoriesAssigned: !1,
                    categories: [{
                        maxNumberOfElements: 4
                    }]
                },
                i = ["ajaxSettings", "template"];
            this.get = function(a) {
                return h[a]
            }, this.equals = function(a, b) {
                return !(!f(a) || h[a] !== b)
            }, this.checkDataUrlProperties = function() {
                return "list-required" !== h.url || "list-required" !== h.data
            }, this.checkRequiredProperties = function() {
                for (var a in h)
                    if ("required" === h[a]) return logger.error("Option " + a + " must be defined"), !1;
                return !0
            }, this.printPropertiesThatDoesntExist = function(a, b) {
                g(a, b)
            }, b(), c(), h.loggerEnabled === !0 && g(console, a), e(), d()
        }, a
    }(EasyAutocomplete || {}),
    EasyAutocomplete = function(a) {
        return a.Logger = function() {
            this.error = function(a) {
                console.log("ERROR: " + a)
            }, this.warning = function(a) {
                console.log("WARNING: " + a)
            }
        }, a
    }(EasyAutocomplete || {}),
    EasyAutocomplete = function(a) {
        return a.Constans = function() {
            var a = {
                CONTAINER_CLASS: "easy-autocomplete-container",
                CONTAINER_ID: "eac-container-",
                WRAPPER_CSS_CLASS: "easy-autocomplete"
            };
            this.getValue = function(b) {
                return a[b]
            }
        }, a
    }(EasyAutocomplete || {}),
    EasyAutocomplete = function(a) {
        return a.ListBuilderService = function(a, b) {
            function c(b, c) {
                function d() {
                    var d, e = {};
                    return void 0 !== b.xmlElementName && (e.xmlElementName = b.xmlElementName), void 0 !== b.listLocation ? d = b.listLocation : void 0 !== a.get("listLocation") && (d = a.get("listLocation")), void 0 !== d ? "string" == typeof d ? e.data = $(c).find(d) : "function" == typeof d && (e.data = d(c)) : e.data = c, e
                }

                function e() {
                    var a = {};
                    return void 0 !== b.listLocation ? "string" == typeof b.listLocation ? a.data = c[b.listLocation] : "function" == typeof b.listLocation && (a.data = b.listLocation(c)) : a.data = c, a
                }
                var f = {};
                if (f = "XML" === a.get("dataType").toUpperCase() ? d() : e(), void 0 !== b.header && (f.header = b.header), void 0 !== b.maxNumberOfElements && (f.maxNumberOfElements = b.maxNumberOfElements), void 0 !== a.get("list").maxNumberOfElements && (f.maxListSize = a.get("list").maxNumberOfElements), void 0 !== b.getValue)
                    if ("string" == typeof b.getValue) {
                        var g = b.getValue;
                        f.getValue = function(a) {
                            return a[g]
                        }
                    } else "function" == typeof b.getValue && (f.getValue = b.getValue);
                else f.getValue = a.get("getValue");
                return f
            }

            function d(b) {
                var c = [];
                return void 0 === b.xmlElementName && (b.xmlElementName = a.get("xmlElementName")), $(b.data).find(b.xmlElementName).each(function() {
                    c.push(this)
                }), c
            }
            this.init = function(b) {
                var c = [],
                    d = {};
                return d.data = a.get("listLocation")(b), d.getValue = a.get("getValue"), d.maxListSize = a.get("list").maxNumberOfElements, c.push(d), c
            }, this.updateCategories = function(b, d) {
                if (a.get("categoriesAssigned")) {
                    b = [];
                    for (var e = 0; e < a.get("categories").length; e += 1) {
                        var f = c(a.get("categories")[e], d);
                        b.push(f)
                    }
                }
                return b
            }, this.convertXml = function(b) {
                if ("XML" === a.get("dataType").toUpperCase())
                    for (var c = 0; c < b.length; c += 1) b[c].data = d(b[c]);
                return b
            }, this.processData = function(c, d) {
                for (var e = 0, f = c.length; f > e; e += 1) c[e].data = b(a, c[e], d);
                return c
            }, this.checkIfDataExists = function(a) {
                for (var b = 0, c = a.length; c > b; b += 1)
                    if (void 0 !== a[b].data && a[b].data instanceof Array && a[b].data.length > 0) return !0;
                return !1
            }
        }, a
    }(EasyAutocomplete || {}),
    EasyAutocomplete = function(a) {
        return a.proccess = function(b, c, d) {
            function e(a, c) {
                var d = [],
                    e = "";
                if (b.get("list").match.enabled)
                    for (var g = 0, h = a.length; h > g; g += 1) e = b.get("getValue")(a[g]), f(e, c) && d.push(a[g]);
                else d = a;
                return d
            }

            function f(a, c) {
                return b.get("list").match.caseSensitive || ("string" == typeof a && (a = a.toLowerCase()), c = c.toLowerCase()), !!b.get("list").match.method(a, c)
            }

            function g(a) {
                return void 0 !== c.maxNumberOfElements && a.length > c.maxNumberOfElements && (a = a.slice(0, c.maxNumberOfElements)), a
            }

            function h(a) {
                return b.get("list").sort.enabled && a.sort(b.get("list").sort.method), a
            }
            a.proccess.match = f;
            var i = c.data,
                j = d;
            return i = e(i, j), i = g(i), i = h(i)
        }, a
    }(EasyAutocomplete || {}),
    EasyAutocomplete = function(a) {
        return a.Template = function(a) {
            var b = {
                    basic: {
                        type: "basic",
                        method: function(a) {
                            return a
                        },
                        cssClass: ""
                    },
                    description: {
                        type: "description",
                        fields: {
                            description: "description"
                        },
                        method: function(a) {
                            return a + " - description"
                        },
                        cssClass: "eac-description"
                    },
                    iconLeft: {
                        type: "iconLeft",
                        fields: {
                            icon: ""
                        },
                        method: function(a) {
                            return a
                        },
                        cssClass: "eac-icon-left"
                    },
                    iconRight: {
                        type: "iconRight",
                        fields: {
                            iconSrc: ""
                        },
                        method: function(a) {
                            return a
                        },
                        cssClass: "eac-icon-right"
                    },
                    links: {
                        type: "links",
                        fields: {
                            link: ""
                        },
                        method: function(a) {
                            return a
                        },
                        cssClass: ""
                    },
                    custom: {
                        type: "custom",
                        method: function() {},
                        cssClass: ""
                    }
                },
                c = function(a) {
                    var c, d = a.fields;
                    return "description" === a.type ? (c = b.description.method, "string" == typeof d.description ? c = function(a, b) {
                        return a + " - <span>" + b[d.description] + "</span>"
                    } : "function" == typeof d.description && (c = function(a, b) {
                        return a + " - <span>" + d.description(b) + "</span>"
                    }), c) : "iconRight" === a.type ? ("string" == typeof d.iconSrc ? c = function(a, b) {
                        return a + "<img class='eac-icon' src='" + b[d.iconSrc] + "' />"
                    } : "function" == typeof d.iconSrc && (c = function(a, b) {
                        return a + "<img class='eac-icon' src='" + d.iconSrc(b) + "' />"
                    }), c) : "iconLeft" === a.type ? ("string" == typeof d.iconSrc ? c = function(a, b) {
                        return "<img class='eac-icon' src='" + b[d.iconSrc] + "' />" + a
                    } : "function" == typeof d.iconSrc && (c = function(a, b) {
                        return "<img class='eac-icon' src='" + d.iconSrc(b) + "' />" + a
                    }), c) : "links" === a.type ? ("string" == typeof d.link ? c = function(a, b) {
                        return "<a href='" + b[d.link] + "' >" + a + "</a>"
                    } : "function" == typeof d.link && (c = function(a, b) {
                        return "<a href='" + d.link(b) + "' >" + a + "</a>"
                    }), c) : "custom" === a.type ? a.method : b.basic.method
                },
                d = function(a) {
                    return a && a.type && a.type && b[a.type] ? c(a) : b.basic.method
                },
                e = function(a) {
                    var c = function() {
                        return ""
                    };
                    return a && a.type && a.type && b[a.type] ? function() {
                        var c = b[a.type].cssClass;
                        return function() {
                            return c
                        }
                    }() : c
                };
            this.getTemplateClass = e(a), this.build = d(a)
        }, a
    }(EasyAutocomplete || {}),
    EasyAutocomplete = function(a) {
        return a.main = function(b, c) {
            function d() {
                return 0 === t.length ? void p.error("Input field doesn't exist.") : o.checkDataUrlProperties() ? o.checkRequiredProperties() ? (e(), void g()) : void p.error("Will not work without mentioned properties.") : void p.error("One of options variables 'data' or 'url' must be defined.")
            }

            function e() {
                function a() {
                    var a = $("<div>"),
                        c = n.getValue("WRAPPER_CSS_CLASS");
                    o.get("theme") && "" !== o.get("theme") && (c += " eac-" + o.get("theme")), o.get("cssClasses") && "" !== o.get("cssClasses") && (c += " " + o.get("cssClasses")), "" !== q.getTemplateClass() && (c += " " + q.getTemplateClass()), a.addClass(c), t.wrap(a), o.get("adjustWidth") === !0 && b()
                }

                function b() {
                    var a = t.outerWidth();
                    t.parent().css("width", a)
                }

                function c() {
                    t.unwrap()
                }

                function d() {
                    var a = $("<div>").addClass(n.getValue("CONTAINER_CLASS"));
                    a.attr("id", f()).prepend($("<ul>")),
                        function() {
                            a.on("show.eac", function() {
                                switch (o.get("list").showAnimation.type) {
                                    case "slide":
                                        var b = o.get("list").showAnimation.time,
                                            c = o.get("list").showAnimation.callback;
                                        a.find("ul").slideDown(b, c);
                                        break;
                                    case "fade":
                                        var b = o.get("list").showAnimation.time,
                                            c = o.get("list").showAnimation.callback;
                                        a.find("ul").fadeIn(b), c;
                                        break;
                                    default:
                                        a.find("ul").show()
                                }
                                o.get("list").onShowListEvent()
                            }).on("hide.eac", function() {
                                switch (o.get("list").hideAnimation.type) {
                                    case "slide":
                                        var b = o.get("list").hideAnimation.time,
                                            c = o.get("list").hideAnimation.callback;
                                        a.find("ul").slideUp(b, c);
                                        break;
                                    case "fade":
                                        var b = o.get("list").hideAnimation.time,
                                            c = o.get("list").hideAnimation.callback;
                                        a.find("ul").fadeOut(b, c);
                                        break;
                                    default:
                                        a.find("ul").hide()
                                }
                                o.get("list").onHideListEvent()
                            }).on("selectElement.eac", function() {
                                a.find("ul li").removeClass("selected"), a.find("ul li").eq(w).addClass("selected"), o.get("list").onSelectItemEvent()
                            }).on("loadElements.eac", function(b, c, d) {
                                var e = "",
                                    f = a.find("ul");
                                f.empty().detach(), v = [];
                                for (var h = 0, i = 0, k = c.length; k > i; i += 1) {
                                    var l = c[i].data;
                                    if (0 !== l.length) {
                                        void 0 !== c[i].header && c[i].header.length > 0 && f.append("<div class='eac-category' >" + c[i].header + "</div>");
                                        for (var m = 0, n = l.length; n > m && h < c[i].maxListSize; m += 1) e = $("<li><div class='eac-item'></div></li>"),
                                            function() {
                                                var a = m,
                                                    b = h,
                                                    f = c[i].getValue(l[a]);
                                                e.find(" > div").on("click", function() {
                                                    t.val(f).trigger("change"), w = b, j(b), o.get("list").onClickEvent(), o.get("list").onChooseEvent()
                                                }).mouseover(function() {
                                                    w = b, j(b), o.get("list").onMouseOverEvent()
                                                }).mouseout(function() {
                                                    o.get("list").onMouseOutEvent()
                                                }).html(q.build(g(f, d), l[a]))
                                            }(), f.append(e), v.push(l[m]), h += 1
                                    }
                                }
                                a.append(f), o.get("list").onLoadEvent()
                            })
                        }(), t.after(a)
                }

                function e() {
                    t.next("." + n.getValue("CONTAINER_CLASS")).remove()
                }

                function g(a, b) {
                    return o.get("highlightPhrase") && "" !== b ? i(a, b) : a
                }

                function h(a) {
                    return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                }

                function i(a, b) {
                    var c = h(b);
                    return (a + "").replace(new RegExp("(" + c + ")", "gi"), "<b>$1</b>")
                }
                t.parent().hasClass(n.getValue("WRAPPER_CSS_CLASS")) && (e(), c()), a(), d(), u = $("#" + f()), o.get("placeholder") && t.attr("placeholder", o.get("placeholder"))
            }

            function f() {
                var a = t.attr("id");
                return a = n.getValue("CONTAINER_ID") + a
            }

            function g() {
                function a() {
                    s("autocompleteOff", !0) && n(), b(), c(), d(), e(), f(), g()
                }

                function b() {
                    t.focusout(function() {
                        var a, b = t.val();
                        o.get("list").match.caseSensitive || (b = b.toLowerCase());
                        for (var c = 0, d = v.length; d > c; c += 1)
                            if (a = o.get("getValue")(v[c]), o.get("list").match.caseSensitive || (a = a.toLowerCase()), a === b) return w = c, void j(w)
                    })
                }

                function c() {
                    t.off("keyup").keyup(function(a) {
                        function b(a) {
                            function b() {
                                var a = {},
                                    b = o.get("ajaxSettings") || {};
                                for (var c in b) a[c] = b[c];
                                return a
                            }

                            function c(a, b) {
                                return o.get("matchResponseProperty") !== !1 ? "string" == typeof o.get("matchResponseProperty") ? b[o.get("matchResponseProperty")] === a : "function" == typeof o.get("matchResponseProperty") ? o.get("matchResponseProperty")(b) === a : !0 : !0
                            }
                            if (!(a.length < o.get("minCharNumber"))) {
                                if ("list-required" !== o.get("data")) {
                                    var d = o.get("data"),
                                        e = r.init(d);
                                    e = r.updateCategories(e, d), e = r.processData(e, a), k(e, a), t.parent().find("li").length > 0 ? h() : i()
                                }
                                var f = b();
                                void 0 !== f.url && "" !== f.url || (f.url = o.get("url")), void 0 !== f.dataType && "" !== f.dataType || (f.dataType = o.get("dataType")), void 0 !== f.url && "list-required" !== f.url && (f.url = f.url(a), f.data = o.get("preparePostData")(f.data, a), $.ajax(f).done(function(b) {
                                    var d = r.init(b);
                                    d = r.updateCategories(d, b), d = r.convertXml(d), c(a, b) && (d = r.processData(d, a), k(d, a)), r.checkIfDataExists(d) && t.parent().find("li").length > 0 ? h() : i(), o.get("ajaxCallback")()
                                }).fail(function() {
                                    p.warning("Fail to load response data")
                                }).always(function() {}))
                            }
                        }
                        switch (a.keyCode) {
                            case 27:
                                i(), l();
                                break;
                            case 38:
                                a.preventDefault(), v.length > 0 && w > 0 && (w -= 1, t.val(o.get("getValue")(v[w])), j(w));
                                break;
                            case 40:
                                a.preventDefault(), v.length > 0 && w < v.length - 1 && (w += 1, t.val(o.get("getValue")(v[w])), j(w));
                                break;
                            default:
                                if (a.keyCode > 40 || 8 === a.keyCode) {
                                    var c = t.val();
                                    o.get("list").hideOnEmptyPhrase !== !0 || 8 !== a.keyCode || "" !== c ? o.get("requestDelay") > 0 ? (void 0 !== m && clearTimeout(m), m = setTimeout(function() {
                                        b(c)
                                    }, o.get("requestDelay"))) : b(c) : i()
                                }
                        }
                    })
                }

                function d() {
                    t.on("keydown", function(a) {
                        a = a || window.event;
                        var b = a.keyCode;
                        return 38 === b ? (suppressKeypress = !0, !1) : void 0
                    }).keydown(function(a) {
                        13 === a.keyCode && w > -1 && (t.val(o.get("getValue")(v[w])), o.get("list").onKeyEnterEvent(), o.get("list").onChooseEvent(), w = -1, i(), a.preventDefault())
                    })
                }

                function e() {
                    t.off("keypress")
                }

                function f() {
                    t.focus(function() {
                        "" !== t.val() && v.length > 0 && (w = -1, h())
                    })
                }

                function g() {
                    t.blur(function() {
                        setTimeout(function() {
                            w = -1, i()
                        }, 250)
                    })
                }

                function n() {
                    t.attr("autocomplete", "off")
                }
                a()
            }

            function h() {
                u.trigger("show.eac")
            }

            function i() {
                u.trigger("hide.eac")
            }

            function j(a) {
                u.trigger("selectElement.eac", a)
            }

            function k(a, b) {
                u.trigger("loadElements.eac", [a, b])
            }

            function l() {
                t.trigger("blur")
            }
            var m, n = new a.Constans,
                o = new a.Configuration(c),
                p = new a.Logger,
                q = new a.Template(c.template),
                r = new a.ListBuilderService(o, a.proccess),
                s = o.equals,
                t = b,
                u = "",
                v = [],
                w = -1;
            a.consts = n, this.getConstants = function() {
                return n
            }, this.getConfiguration = function() {
                return o
            }, this.getContainer = function() {
                return u
            }, this.getSelectedItemIndex = function() {
                return w
            }, this.getItems = function() {
                return v
            }, this.getItemData = function(a) {
                return v.length < a || void 0 === v[a] ? -1 : v[a]
            }, this.getSelectedItemData = function() {
                return this.getItemData(w)
            }, this.build = function() {
                e()
            }, this.init = function() {
                d()
            }
        }, a.eacHandles = [], a.getHandle = function(b) {
            return a.eacHandles[b]
        }, a.inputHasId = function(a) {
            return void 0 !== $(a).attr("id") && $(a).attr("id").length > 0
        }, a.assignRandomId = function(b) {
            var c = "";
            do c = "eac-" + Math.floor(1e4 * Math.random()); while (0 !== $("#" + c).length);
            elementId = a.consts.getValue("CONTAINER_ID") + c, $(b).attr("id", c)
        }, a.setHandle = function(b, c) {
            a.eacHandles[c] = b
        }, a
    }(EasyAutocomplete || {});
! function(a) {
    a.fn.easyAutocomplete = function(b) {
        return this.each(function() {
            var c = a(this),
                d = new EasyAutocomplete.main(c, b);
            EasyAutocomplete.inputHasId(c) || EasyAutocomplete.assignRandomId(c), d.init(), EasyAutocomplete.setHandle(d, c.attr("id"))
        })
    }, a.fn.getSelectedItemIndex = function() {
        var b = a(this).attr("id");
        return void 0 !== b ? EasyAutocomplete.getHandle(b).getSelectedItemIndex() : -1
    }, a.fn.getItems = function() {
        var b = a(this).attr("id");
        return void 0 !== b ? EasyAutocomplete.getHandle(b).getItems() : -1
    }, a.fn.getItemData = function(b) {
        var c = a(this).attr("id");
        return void 0 !== c && b > -1 ? EasyAutocomplete.getHandle(c).getItemData(b) : -1
    }, a.fn.getSelectedItemData = function() {
        var b = a(this).attr("id");
        return void 0 !== b ? EasyAutocomplete.getHandle(b).getSelectedItemData() : -1
    }
}(jQuery);
/*==== Scrollspy Plugin ====*/
! function(t, e) {
    t.fn.extend({
        scrollspy: function(n) {
            var a = {
                namespace: "scrollspy",
                activeClass: "active",
                animate: !1,
                offset: 0,
                container: e
            };
            n = t.extend({}, a, n);
            var o = function(t, e) {
                    return parseInt(t, 10) + parseInt(e, 10)
                },
                r = function(e) {
                    for (var n = [], a = 0; a < e.length; a++) {
                        var o = e[a],
                            r = t(o).attr("href"),
                            f = t(r);
                        if (f.length > 0) {
                            var s = Math.floor(f.offset().top),
                                i = s + Math.floor(f.outerHeight());
                            n.push({
                                element: f,
                                hash: r,
                                top: s,
                                bottom: i
                            })
                        }
                    }
                    return n
                },
                f = function(e, n) {
                    for (var a = 0; a < e.length; a++) {
                        var o = t(e[a]);
                        if (o.attr("href") === n) return o
                    }
                },
                s = function(e) {
                    for (var a = 0; a < e.length; a++) {
                        var o = t(e[a]);
                        o.parent().removeClass(n.activeClass)
                    }
                };
            return this.each(function() {
                for (var a = this, i = t(n.container), l = t(a).find("a"), c = 0; c < l.length; c++) {
                    var h = l[c];
                    t(h).on("click", function(a) {
                        var r = t(this).attr("href"),
                            f = t(r);
                        if (f.length > 0) {
                            var s = o(f.offset().top, n.offset);
                            n.animate ? t("html, body").animate({
                                scrollTop: s
                            }, 1e3) : e.scrollTo(0, s), a.preventDefault()
                        }
                    })
                }
                var v = r(l);
                i.bind("scroll." + n.namespace, function() {
                    for (var e, r = {
                            top: o(t(this).scrollTop(), Math.abs(n.offset)),
                            left: t(this).scrollLeft()
                        }, i = 0; i < v.length; i++) {
                        var c = v[i];
                        if (r.top >= c.top && r.top < c.bottom) {
                            var h = c.hash;
                            if (e = f(l, h)) {
                                n.onChange && n.onChange(c.element, t(a), r), s(l), e.parent().addClass(n.activeClass);
                                break
                            }
                        }
                    }!e && n.onExit && n.onExit(t(a), r)
                })
            })
        }
    })
}(jQuery, window, document, void 0);
/*==== Lightbox v2.9.0 by Lokesh Dhakar ====*/
! function(a, b) {
    "function" === typeof define && define.amd ? define(["jquery"], b) : "object" === typeof exports ? module.exports = b(require("jquery")) : a.lightbox = b(a.jQuery)
}(this, function(a) {
    function b(b) {
        this.album = [], this.currentImageIndex = void 0, this.init(), this.options = a.extend({}, this.constructor.defaults), this.option(b)
    }
    return b.defaults = {
        albumLabel: "Image %1 of %2",
        alwaysShowNavOnTouchDevices: !1,
        fadeDuration: 600,
        fitImagesInViewport: !0,
        imageFadeDuration: 600,
        positionFromTop: 50,
        resizeDuration: 700,
        showImageNumberLabel: !0,
        wrapAround: !1,
        disableScrolling: !1,
        sanitizeTitle: !1
    }, b.prototype.option = function(b) {
        a.extend(this.options, b)
    }, b.prototype.imageCountLabel = function(a, b) {
        return this.options.albumLabel.replace(/%1/g, a).replace(/%2/g, b)
    }, b.prototype.init = function() {
        var b = this;
        a(document).ready(function() {
            b.enable(), b.build()
        })
    }, b.prototype.enable = function() {
        var b = this;
        a("body").on("click", "a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]", function(c) {
            return b.start(a(c.currentTarget)), !1
        })
    }, b.prototype.build = function() {
        var b = this;
        a('<div id="lightboxOverlay" class="lightboxOverlay"></div><div id="lightbox" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" /><div class="lb-nav"><a class="lb-prev" href="" ></a><a class="lb-next" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo(a("body")), this.$lightbox = a("#lightbox"), this.$overlay = a("#lightboxOverlay"), this.$outerContainer = this.$lightbox.find(".lb-outerContainer"), this.$container = this.$lightbox.find(".lb-container"), this.$image = this.$lightbox.find(".lb-image"), this.$nav = this.$lightbox.find(".lb-nav"), this.containerPadding = {
            top: parseInt(this.$container.css("padding-top"), 10),
            right: parseInt(this.$container.css("padding-right"), 10),
            bottom: parseInt(this.$container.css("padding-bottom"), 10),
            left: parseInt(this.$container.css("padding-left"), 10)
        }, this.imageBorderWidth = {
            top: parseInt(this.$image.css("border-top-width"), 10),
            right: parseInt(this.$image.css("border-right-width"), 10),
            bottom: parseInt(this.$image.css("border-bottom-width"), 10),
            left: parseInt(this.$image.css("border-left-width"), 10)
        }, this.$overlay.hide().on("click", function() {
            return b.end(), !1
        }), this.$lightbox.hide().on("click", function(c) {
            return "lightbox" === a(c.target).attr("id") && b.end(), !1
        }), this.$outerContainer.on("click", function(c) {
            return "lightbox" === a(c.target).attr("id") && b.end(), !1
        }), this.$lightbox.find(".lb-prev").on("click", function() {
            return b.changeImage(0 === b.currentImageIndex ? b.album.length - 1 : b.currentImageIndex - 1), !1
        }), this.$lightbox.find(".lb-next").on("click", function() {
            return b.changeImage(b.currentImageIndex === b.album.length - 1 ? 0 : b.currentImageIndex + 1), !1
        }), this.$nav.on("mousedown", function(a) {
            3 === a.which && (b.$nav.css("pointer-events", "none"), b.$lightbox.one("contextmenu", function() {
                setTimeout(function() {
                    this.$nav.css("pointer-events", "auto")
                }.bind(b), 0)
            }))
        }), this.$lightbox.find(".lb-loader, .lb-close").on("click", function() {
            return b.end(), !1
        })
    }, b.prototype.start = function(b) {
        function f(a) {
            c.album.push({
                link: a.attr("href"),
                title: a.attr("data-title") || a.attr("title")
            })
        }
        var c = this,
            d = a(window);
        d.on("resize", a.proxy(this.sizeOverlay, this)), a("select, object, embed").css({
            visibility: "hidden"
        }), this.sizeOverlay(), this.album = [];
        var h, e = 0,
            g = b.attr("data-lightbox");
        if (g) {
            h = a(b.prop("tagName") + '[data-lightbox="' + g + '"]');
            for (var i = 0; i < h.length; i = ++i) f(a(h[i])), h[i] === b[0] && (e = i)
        } else if ("lightbox" === b.attr("rel")) f(b);
        else {
            h = a(b.prop("tagName") + '[rel="' + b.attr("rel") + '"]');
            for (var j = 0; j < h.length; j = ++j) f(a(h[j])), h[j] === b[0] && (e = j)
        }
        var k = d.scrollTop() + this.options.positionFromTop,
            l = d.scrollLeft();
        this.$lightbox.css({
            top: k + "px",
            left: l + "px"
        }).fadeIn(this.options.fadeDuration), this.options.disableScrolling && a("body").addClass("lb-disable-scrolling"), this.changeImage(e)
    }, b.prototype.changeImage = function(b) {
        var c = this;
        this.disableKeyboardNav();
        var d = this.$lightbox.find(".lb-image");
        this.$overlay.fadeIn(this.options.fadeDuration), a(".lb-loader").fadeIn("slow"), this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(), this.$outerContainer.addClass("animating");
        var e = new Image;
        e.onload = function() {
            var f, g, h, i, j, k, l;
            d.attr("src", c.album[b].link), f = a(e), d.width(e.width), d.height(e.height), c.options.fitImagesInViewport && (l = a(window).width(), k = a(window).height(), j = l - c.containerPadding.left - c.containerPadding.right - c.imageBorderWidth.left - c.imageBorderWidth.right - 20, i = k - c.containerPadding.top - c.containerPadding.bottom - c.imageBorderWidth.top - c.imageBorderWidth.bottom - 120, c.options.maxWidth && c.options.maxWidth < j && (j = c.options.maxWidth), c.options.maxHeight && c.options.maxHeight < j && (i = c.options.maxHeight), (e.width > j || e.height > i) && (e.width / j > e.height / i ? (h = j, g = parseInt(e.height / (e.width / h), 10), d.width(h), d.height(g)) : (g = i, h = parseInt(e.width / (e.height / g), 10), d.width(h), d.height(g)))), c.sizeContainer(d.width(), d.height())
        }, e.src = this.album[b].link, this.currentImageIndex = b
    }, b.prototype.sizeOverlay = function() {
        this.$overlay.width(a(document).width()).height(a(document).height())
    }, b.prototype.sizeContainer = function(a, b) {
        function h() {
            c.$lightbox.find(".lb-dataContainer").width(f), c.$lightbox.find(".lb-prevLink").height(g), c.$lightbox.find(".lb-nextLink").height(g), c.showImage()
        }
        var c = this,
            d = this.$outerContainer.outerWidth(),
            e = this.$outerContainer.outerHeight(),
            f = a + this.containerPadding.left + this.containerPadding.right + this.imageBorderWidth.left + this.imageBorderWidth.right,
            g = b + this.containerPadding.top + this.containerPadding.bottom + this.imageBorderWidth.top + this.imageBorderWidth.bottom;
        d !== f || e !== g ? this.$outerContainer.animate({
            width: f,
            height: g
        }, this.options.resizeDuration, "swing", function() {
            h()
        }) : h()
    }, b.prototype.showImage = function() {
        this.$lightbox.find(".lb-loader").stop(!0).hide(), this.$lightbox.find(".lb-image").fadeIn(this.options.imageFadeDuration), this.updateNav(), this.updateDetails(), this.preloadNeighboringImages(), this.enableKeyboardNav()
    }, b.prototype.updateNav = function() {
        var a = !1;
        try {
            document.createEvent("TouchEvent"), a = this.options.alwaysShowNavOnTouchDevices ? !0 : !1
        } catch (b) {}
        this.$lightbox.find(".lb-nav").show(), this.album.length > 1 && (this.options.wrapAround ? (a && this.$lightbox.find(".lb-prev, .lb-next").css("opacity", "1"), this.$lightbox.find(".lb-prev, .lb-next").show()) : (this.currentImageIndex > 0 && (this.$lightbox.find(".lb-prev").show(), a && this.$lightbox.find(".lb-prev").css("opacity", "1")), this.currentImageIndex < this.album.length - 1 && (this.$lightbox.find(".lb-next").show(), a && this.$lightbox.find(".lb-next").css("opacity", "1"))))
    }, b.prototype.updateDetails = function() {
        var b = this;
        if ("undefined" !== typeof this.album[this.currentImageIndex].title && "" !== this.album[this.currentImageIndex].title) {
            var c = this.$lightbox.find(".lb-caption");
            this.options.sanitizeTitle ? c.text(this.album[this.currentImageIndex].title) : c.html(this.album[this.currentImageIndex].title), c.fadeIn("fast").find("a").on("click", function() {
                void 0 !== a(this).attr("target") ? window.open(a(this).attr("href"), a(this).attr("target")) : location.href = a(this).attr("href")
            })
        }
        if (this.album.length > 1 && this.options.showImageNumberLabel) {
            var d = this.imageCountLabel(this.currentImageIndex + 1, this.album.length);
            this.$lightbox.find(".lb-number").text(d).fadeIn("fast")
        } else this.$lightbox.find(".lb-number").hide();
        this.$outerContainer.removeClass("animating"), this.$lightbox.find(".lb-dataContainer").fadeIn(this.options.resizeDuration, function() {
            return b.sizeOverlay()
        })
    }, b.prototype.preloadNeighboringImages = function() {
        if (this.album.length > this.currentImageIndex + 1) {
            var a = new Image;
            a.src = this.album[this.currentImageIndex + 1].link
        }
        if (this.currentImageIndex > 0) {
            var b = new Image;
            b.src = this.album[this.currentImageIndex - 1].link
        }
    }, b.prototype.enableKeyboardNav = function() {
        a(document).on("keyup.keyboard", a.proxy(this.keyboardAction, this))
    }, b.prototype.disableKeyboardNav = function() {
        a(document).off(".keyboard")
    }, b.prototype.keyboardAction = function(a) {
        var b = 27,
            c = 37,
            d = 39,
            e = a.keyCode,
            f = String.fromCharCode(e).toLowerCase();
        e === b || f.match(/x|o|c/) ? this.end() : "p" === f || e === c ? 0 !== this.currentImageIndex ? this.changeImage(this.currentImageIndex - 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(this.album.length - 1) : ("n" === f || e === d) && (this.currentImageIndex !== this.album.length - 1 ? this.changeImage(this.currentImageIndex + 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(0))
    }, b.prototype.end = function() {
        this.disableKeyboardNav(), a(window).off("resize", this.sizeOverlay), this.$lightbox.fadeOut(this.options.fadeDuration), this.$overlay.fadeOut(this.options.fadeDuration), a("select, object, embed").css({
            visibility: "visible"
        }), this.options.disableScrolling && a("body").removeClass("lb-disable-scrolling")
    }, new b
});
/*==== Slick Slider ====*/
! function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function(a) {
    "use strict";
    var b = window.Slick || {};
    b = function() {
        function c(c, d) {
            var f, e = this;
            e.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: a(c),
                appendDots: a(c),
                arrows: !1,
                asNavFor: null,
                prevArrow: '<button class="ti-arrow-left prev" data-role="none" aria-label="Next" tabindex="0" role="button"></button>',
                nextArrow: '<button class="ti-arrow-right next" data-role="none" aria-label="Next" tabindex="0" role="button"></button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(b, c) {
                    return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !1,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, e.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, a.extend(e, e.initials), e.activeBreakpoint = null, e.animType = null, e.animProp = null, e.breakpoints = [], e.breakpointSettings = [], e.cssTransitions = !1, e.focussed = !1, e.interrupted = !1, e.hidden = "hidden", e.paused = !0, e.positionProp = null, e.respondTo = null, e.rowCount = 1, e.shouldClick = !0, e.$slider = a(c), e.$slidesCache = null, e.transformType = null, e.transitionType = null, e.visibilityChange = "visibilitychange", e.windowWidth = 0, e.windowTimer = null, f = a(c).data("slick") || {}, e.options = a.extend({}, e.defaults, d, f), e.currentSlide = e.options.initialSlide, e.originalSettings = e.options, "undefined" != typeof document.hidden ? (e.hidden = "hidden", e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden", e.visibilityChange = "webkitvisibilitychange"), e.autoPlay = a.proxy(e.autoPlay, e), e.autoPlayClear = a.proxy(e.autoPlayClear, e), e.autoPlayIterator = a.proxy(e.autoPlayIterator, e), e.changeSlide = a.proxy(e.changeSlide, e), e.clickHandler = a.proxy(e.clickHandler, e), e.selectHandler = a.proxy(e.selectHandler, e), e.setPosition = a.proxy(e.setPosition, e), e.swipeHandler = a.proxy(e.swipeHandler, e), e.dragHandler = a.proxy(e.dragHandler, e), e.keyHandler = a.proxy(e.keyHandler, e), e.instanceUid = b++, e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, e.registerBreakpoints(), e.init(!0)
        }
        var b = 0;
        return c
    }(), b.prototype.activateADA = function() {
        var a = this;
        a.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, b.prototype.addSlide = b.prototype.slickAdd = function(b, c, d) {
        var e = this;
        if ("boolean" == typeof c) d = c, c = null;
        else if (0 > c || c >= e.slideCount) return !1;
        e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function(b, c) {
            a(c).attr("data-slick-index", b)
        }), e.$slidesCache = e.$slides, e.reinit()
    }, b.prototype.animateHeight = function() {
        var a = this;
        if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
            var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
            a.$list.animate({
                height: b
            }, a.options.speed)
        }
    }, b.prototype.animateSlide = function(b, c) {
        var d = {},
            e = this;
        e.animateHeight(), e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({
            left: b
        }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({
            top: b
        }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft), a({
            animStart: e.currentLeft
        }).animate({
            animStart: b
        }, {
            duration: e.options.speed,
            easing: e.options.easing,
            step: function(a) {
                a = Math.ceil(a), e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d))
            },
            complete: function() {
                c && c.call()
            }
        })) : (e.applyTransition(), b = Math.ceil(b), e.options.vertical === !1 ? d[e.animType] = "translate3d(" + b + "px, 0px, 0px)" : d[e.animType] = "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function() {
            e.disableTransition(), c.call()
        }, e.options.speed))
    }, b.prototype.getNavTarget = function() {
        var b = this,
            c = b.options.asNavFor;
        return c && null !== c && (c = a(c).not(b.$slider)), c
    }, b.prototype.asNavFor = function(b) {
        var c = this,
            d = c.getNavTarget();
        null !== d && "object" == typeof d && d.each(function() {
            var c = a(this).slick("getSlick");
            c.unslicked || c.slideHandler(b, !0)
        })
    }, b.prototype.applyTransition = function(a) {
        var b = this,
            c = {};
        b.options.fade === !1 ? c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }, b.prototype.autoPlay = function() {
        var a = this;
        a.autoPlayClear(), a.slideCount > a.options.slidesToShow && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
    }, b.prototype.autoPlayClear = function() {
        var a = this;
        a.autoPlayTimer && clearInterval(a.autoPlayTimer)
    }, b.prototype.autoPlayIterator = function() {
        var a = this,
            b = a.currentSlide + a.options.slidesToScroll;
        a.paused || a.interrupted || a.focussed || (a.options.infinite === !1 && (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1 ? a.direction = 0 : 0 === a.direction && (b = a.currentSlide - a.options.slidesToScroll, a.currentSlide - 1 === 0 && (a.direction = 1))), a.slideHandler(b))
    }, b.prototype.buildArrows = function() {
        var b = this;
        b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"), b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"), b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, b.prototype.buildDots = function() {
        var c, d, b = this;
        if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
            for (b.$slider.addClass("slick-dotted"), d = a("<ul />").addClass(b.options.dotsClass), c = 0; c <= b.getDotCount(); c += 1) d.append(a("<li />").append(b.options.customPaging.call(this, b, c)));
            b.$dots = d.appendTo(b.options.appendDots), b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }, b.prototype.buildOut = function() {
        var b = this;
        b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function(b, c) {
            a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "")
        }), b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable")
    }, b.prototype.buildRows = function() {
        var b, c, d, e, f, g, h, a = this;
        if (e = document.createDocumentFragment(), g = a.$slider.children(), a.options.rows > 1) {
            for (h = a.options.slidesPerRow * a.options.rows, f = Math.ceil(g.length / h), b = 0; f > b; b++) {
                var i = document.createElement("div");
                for (c = 0; c < a.options.rows; c++) {
                    var j = document.createElement("div");
                    for (d = 0; d < a.options.slidesPerRow; d++) {
                        var k = b * h + (c * a.options.slidesPerRow + d);
                        g.get(k) && j.appendChild(g.get(k))
                    }
                    i.appendChild(j)
                }
                e.appendChild(i)
            }
            a.$slider.empty().append(e), a.$slider.children().children().children().css({
                width: 100 / a.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, b.prototype.checkResponsive = function(b, c) {
        var e, f, g, d = this,
            h = !1,
            i = d.$slider.width(),
            j = window.innerWidth || a(window).width();
        if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)), d.options.responsive && d.options.responsive.length && null !== d.options.responsive) {
            f = null;
            for (e in d.breakpoints) d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e]));
            null !== f ? null !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : null !== d.activeBreakpoint && (d.activeBreakpoint = null, d.options = d.originalSettings, b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b), h = f), b || h === !1 || d.$slider.trigger("breakpoint", [d, h])
        }
    }, b.prototype.changeSlide = function(b, c) {
        var f, g, h, d = this,
            e = a(b.currentTarget);
        switch (e.is("a") && b.preventDefault(), e.is("li") || (e = e.closest("li")), h = d.slideCount % d.options.slidesToScroll !== 0, f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll, b.data.message) {
            case "previous":
                g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c);
                break;
            case "next":
                g = 0 === f ? d.options.slidesToScroll : f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c);
                break;
            case "index":
                var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll;
                d.slideHandler(d.checkNavigable(i), !1, c), e.children().trigger("focus");
                break;
            default:
                return
        }
    }, b.prototype.checkNavigable = function(a) {
        var c, d, b = this;
        if (c = b.getNavigableIndexes(), d = 0, a > c[c.length - 1]) a = c[c.length - 1];
        else
            for (var e in c) {
                if (a < c[e]) {
                    a = d;
                    break
                }
                d = c[e]
            }
        return a
    }, b.prototype.cleanUpEvents = function() {
        var b = this;
        b.options.dots && null !== b.$dots && a("li", b.$dots).off("click.slick", b.changeSlide).off("mouseenter.slick", a.proxy(b.interrupt, b, !0)).off("mouseleave.slick", a.proxy(b.interrupt, b, !1)), b.$slider.off("focus.slick blur.slick"), b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)), b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler), b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler), b.$list.off("touchend.slick mouseup.slick", b.swipeHandler), b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler), b.$list.off("click.slick", b.clickHandler), a(document).off(b.visibilityChange, b.visibility), b.cleanUpSlideEvents(), b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler), a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange), a(window).off("resize.slick.slick-" + b.instanceUid, b.resize), a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault), a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition)
    }, b.prototype.cleanUpSlideEvents = function() {
        var b = this;
        b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1))
    }, b.prototype.cleanUpRows = function() {
        var b, a = this;
        a.options.rows > 1 && (b = a.$slides.children().children(), b.removeAttr("style"), a.$slider.empty().append(b))
    }, b.prototype.clickHandler = function(a) {
        var b = this;
        b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault())
    }, b.prototype.destroy = function(b) {
        var c = this;
        c.autoPlayClear(), c.touchObject = {}, c.cleanUpEvents(), a(".slick-cloned", c.$slider).detach(), c.$dots && c.$dots.remove(), c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()), c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()), c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            a(this).attr("style", a(this).data("originalStyling"))
        }), c.$slideTrack.children(this.options.slide).detach(), c.$slideTrack.detach(), c.$list.detach(), c.$slider.append(c.$slides)), c.cleanUpRows(), c.$slider.removeClass("slick-slider"), c.$slider.removeClass("slick-initialized"), c.$slider.removeClass("slick-dotted"), c.unslicked = !0, b || c.$slider.trigger("destroy", [c])
    }, b.prototype.disableTransition = function(a) {
        var b = this,
            c = {};
        c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }, b.prototype.fadeSlide = function(a, b) {
        var c = this;
        c.cssTransitions === !1 ? (c.$slides.eq(a).css({
            zIndex: c.options.zIndex
        }), c.$slides.eq(a).animate({
            opacity: 1
        }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({
            opacity: 1,
            zIndex: c.options.zIndex
        }), b && setTimeout(function() {
            c.disableTransition(a), b.call()
        }, c.options.speed))
    }, b.prototype.fadeSlideOut = function(a) {
        var b = this;
        b.cssTransitions === !1 ? b.$slides.eq(a).animate({
            opacity: 1,
            zIndex: b.options.zIndex - 2
        }, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({
            opacity: 1,
            zIndex: b.options.zIndex - 2
        }))
    }, b.prototype.filterSlides = b.prototype.slickFilter = function(a) {
        var b = this;
        null !== a && (b.$slidesCache = b.$slides, b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit())
    }, b.prototype.focusHandler = function() {
        var b = this;
        b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(c) {
            c.stopImmediatePropagation();
            var d = a(this);
            setTimeout(function() {
                b.options.pauseOnFocus && (b.focussed = d.is(":focus"), b.autoPlay())
            }, 0)
        })
    }, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function() {
        var a = this;
        return a.currentSlide
    }, b.prototype.getDotCount = function() {
        var a = this,
            b = 0,
            c = 0,
            d = 0;
        if (a.options.infinite === !0)
            for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        else if (a.options.centerMode === !0) d = a.slideCount;
        else if (a.options.asNavFor)
            for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        else d = 1 + Math.ceil((a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll);
        return d - 1
    }, b.prototype.getLeft = function(a) {
        var c, d, f, b = this,
            e = 0;
        return b.slideOffset = 0, d = b.$slides.first().outerHeight(!0), b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = b.slideWidth * b.options.slidesToShow * -1, e = d * b.options.slidesToShow * -1), b.slideCount % b.options.slidesToScroll !== 0 && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth * -1, e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1) : (b.slideOffset = b.slideCount % b.options.slidesToScroll * b.slideWidth * -1, e = b.slideCount % b.options.slidesToScroll * d * -1))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth, e = (a + b.options.slidesToShow - b.slideCount) * d), b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0, e = 0), b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0, b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)), c = b.options.vertical === !1 ? a * b.slideWidth * -1 + b.slideOffset : a * d * -1 + e, b.options.variableWidth === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, b.options.centerMode === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, c += (b.$list.width() - f.outerWidth()) / 2)), c
    }, b.prototype.getOption = b.prototype.slickGetOption = function(a) {
        var b = this;
        return b.options[a]
    }, b.prototype.getNavigableIndexes = function() {
        var e, a = this,
            b = 0,
            c = 0,
            d = [];
        for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll, c = -1 * a.options.slidesToScroll, e = 2 * a.slideCount); e > b;) d.push(b), b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        return d
    }, b.prototype.getSlick = function() {
        return this
    }, b.prototype.getSlideCount = function() {
        var c, d, e, b = this;
        return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0, b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function(c, f) {
            return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f, !1) : void 0
        }), c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll
    }, b.prototype.goTo = b.prototype.slickGoTo = function(a, b) {
        var c = this;
        c.changeSlide({
            data: {
                message: "index",
                index: parseInt(a)
            }
        }, b)
    }, b.prototype.init = function(b) {
        var c = this;
        a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots(), c.checkResponsive(!0), c.focusHandler()), b && c.$slider.trigger("init", [c]), c.options.accessibility === !0 && c.initADA(), c.options.autoplay && (c.paused = !1, c.autoPlay())
    }, b.prototype.initADA = function() {
        var b = this;
        b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), b.$slideTrack.attr("role", "listbox"), b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c) {
            a(this).attr({
                role: "option",
                "aria-describedby": "slick-slide" + b.instanceUid + c
            })
        }), null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function(c) {
            a(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + b.instanceUid + c,
                id: "slick-slide" + b.instanceUid + c
            })
        }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), b.activateADA()
    }, b.prototype.initArrowEvents = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, a.changeSlide), a.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, a.changeSlide))
    }, b.prototype.initDotEvents = function() {
        var b = this;
        b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", {
            message: "index"
        }, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.interrupt, b, !0)).on("mouseleave.slick", a.proxy(b.interrupt, b, !1))
    }, b.prototype.initSlideEvents = function() {
        var b = this;
        b.options.pauseOnHover && (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1)))
    }, b.prototype.initializeEvents = function() {
        var b = this;
        b.initArrowEvents(), b.initDotEvents(), b.initSlideEvents(), b.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), a(document).on(b.visibilityChange, a.proxy(b.visibility, b)), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)), a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)), a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition)
    }, b.prototype.initUI = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show()
    }, b.prototype.keyHandler = function(a) {
        var b = this;
        a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({
            data: {
                message: b.options.rtl === !0 ? "next" : "previous"
            }
        }) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({
            data: {
                message: b.options.rtl === !0 ? "previous" : "next"
            }
        }))
    }, b.prototype.lazyLoad = function() {
        function g(c) {
            a("img[data-lazy]", c).each(function() {
                var c = a(this),
                    d = a(this).attr("data-lazy"),
                    e = document.createElement("img");
                e.onload = function() {
                    c.animate({
                        opacity: 0
                    }, 100, function() {
                        c.attr("src", d).animate({
                            opacity: 1
                        }, 200, function() {
                            c.removeAttr("data-lazy").removeClass("slick-loading")
                        }), b.$slider.trigger("lazyLoaded", [b, c, d])
                    })
                }, e.onerror = function() {
                    c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), b.$slider.trigger("lazyLoadError", [b, c, d])
                }, e.src = d
            })
        }
        var c, d, e, f, b = this;
        b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1), f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)), f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide, f = Math.ceil(e + b.options.slidesToShow), b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)), c = b.$slider.find(".slick-slide").slice(e, f), g(c), b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"), g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow), g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow), g(d))
    }, b.prototype.loadSlider = function() {
        var a = this;
        a.setPosition(), a.$slideTrack.css({
            opacity: 1
        }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
    }, b.prototype.next = b.prototype.slickNext = function() {
        var a = this;
        a.changeSlide({
            data: {
                message: "next"
            }
        })
    }, b.prototype.orientationChange = function() {
        var a = this;
        a.checkResponsive(), a.setPosition()
    }, b.prototype.pause = b.prototype.slickPause = function() {
        var a = this;
        a.autoPlayClear(), a.paused = !0
    }, b.prototype.play = b.prototype.slickPlay = function() {
        var a = this;
        a.autoPlay(), a.options.autoplay = !0, a.paused = !1, a.focussed = !1, a.interrupted = !1
    }, b.prototype.postSlide = function(a) {
        var b = this;
        b.unslicked || (b.$slider.trigger("afterChange", [b, a]), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay && b.autoPlay(), b.options.accessibility === !0 && b.initADA())
    }, b.prototype.prev = b.prototype.slickPrev = function() {
        var a = this;
        a.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, b.prototype.preventDefault = function(a) {
        a.preventDefault()
    }, b.prototype.progressiveLazyLoad = function(b) {
        b = b || 1;
        var e, f, g, c = this,
            d = a("img[data-lazy]", c.$slider);
        d.length ? (e = d.first(), f = e.attr("data-lazy"), g = document.createElement("img"), g.onload = function() {
            e.attr("src", f).removeAttr("data-lazy").removeClass("slick-loading"), c.options.adaptiveHeight === !0 && c.setPosition(), c.$slider.trigger("lazyLoaded", [c, e, f]), c.progressiveLazyLoad()
        }, g.onerror = function() {
            3 > b ? setTimeout(function() {
                c.progressiveLazyLoad(b + 1)
            }, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), c.$slider.trigger("lazyLoadError", [c, e, f]), c.progressiveLazyLoad())
        }, g.src = f) : c.$slider.trigger("allImagesLoaded", [c])
    }, b.prototype.refresh = function(b) {
        var d, e, c = this;
        e = c.slideCount - c.options.slidesToShow, !c.options.infinite && c.currentSlide > e && (c.currentSlide = e), c.slideCount <= c.options.slidesToShow && (c.currentSlide = 0), d = c.currentSlide, c.destroy(!0), a.extend(c, c.initials, {
            currentSlide: d
        }), c.init(), b || c.changeSlide({
            data: {
                message: "index",
                index: d
            }
        }, !1)
    }, b.prototype.registerBreakpoints = function() {
        var c, d, e, b = this,
            f = b.options.responsive || null;
        if ("array" === a.type(f) && f.length) {
            b.respondTo = b.options.respondTo || "window";
            for (c in f)
                if (e = b.breakpoints.length - 1, d = f[c].breakpoint, f.hasOwnProperty(c)) {
                    for (; e >= 0;) b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1), e--;
                    b.breakpoints.push(d), b.breakpointSettings[d] = f[c].settings
                }
            b.breakpoints.sort(function(a, c) {
                return b.options.mobileFirst ? a - c : c - a
            })
        }
    }, b.prototype.reinit = function() {
        var b = this;
        b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.registerBreakpoints(), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.cleanUpSlideEvents(), b.initSlideEvents(), b.checkResponsive(!1, !0), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.setPosition(), b.focusHandler(), b.paused = !b.options.autoplay, b.autoPlay(), b.$slider.trigger("reInit", [b])
    }, b.prototype.resize = function() {
        var b = this;
        a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function() {
            b.windowWidth = a(window).width(), b.checkResponsive(), b.unslicked || b.setPosition()
        }, 50))
    }, b.prototype.removeSlide = b.prototype.slickRemove = function(a, b, c) {
        var d = this;
        return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, void d.reinit())
    }, b.prototype.setCSS = function(a) {
        var d, e, b = this,
            c = {};
        b.options.rtl === !0 && (a = -a), d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px", e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px", c[b.positionProp] = a, b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {}, b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")", b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)", b.$slideTrack.css(c)))
    }, b.prototype.setDimensions = function() {
        var a = this;
        a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({
            padding: "0px " + a.options.centerPadding
        }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), a.options.centerMode === !0 && a.$list.css({
            padding: a.options.centerPadding + " 0px"
        })), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));
        var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
        a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b)
    }, b.prototype.setFade = function() {
        var c, b = this;
        b.$slides.each(function(d, e) {
            c = b.slideWidth * d * -1, b.options.rtl === !0 ? a(e).css({
                position: "relative",
                right: c,
                top: 0,
                zIndex: b.options.zIndex - 2,
                opacity: 1
            }) : a(e).css({
                position: "relative",
                left: c,
                top: 0,
                zIndex: b.options.zIndex - 2,
                opacty: 1
            })
        }), b.$slides.eq(b.currentSlide).css({
            zIndex: b.options.zIndex - 1,
            opacity: 1
        })
    }, b.prototype.setHeight = function() {
        var a = this;
        if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
            var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
            a.$list.css("height", b)
        }
    }, b.prototype.setOption = b.prototype.slickSetOption = function() {
        var c, d, e, f, h, b = this,
            g = !1;
        if ("object" === a.type(arguments[0]) ? (e = arguments[0], g = arguments[1], h = "multiple") : "string" === a.type(arguments[0]) && (e = arguments[0], f = arguments[1], g = arguments[2], "responsive" === arguments[0] && "array" === a.type(arguments[1]) ? h = "responsive" : "undefined" != typeof arguments[1] && (h = "single")), "single" === h) b.options[e] = f;
        else if ("multiple" === h) a.each(e, function(a, c) {
            b.options[a] = c
        });
        else if ("responsive" === h)
            for (d in f)
                if ("array" !== a.type(b.options.responsive)) b.options.responsive = [f[d]];
                else {
                    for (c = b.options.responsive.length - 1; c >= 0;) b.options.responsive[c].breakpoint === f[d].breakpoint && b.options.responsive.splice(c, 1), c--;
                    b.options.responsive.push(f[d])
                }
        g && (b.unload(), b.reinit())
    }, b.prototype.setPosition = function() {
        var a = this;
        a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a])
    }, b.prototype.setProps = function() {
        var a = this,
            b = document.body.style;
        a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = a.options.useTransform && null !== a.animType && a.animType !== !1
    }, b.prototype.setSlideClasses = function(a) {
        var c, d, e, f, b = this;
        d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), b.$slides.eq(a).addClass("slick-current"), b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2), b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a,
            d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")), b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow, e = b.options.infinite === !0 ? b.options.slidesToShow + a : a, b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === b.options.lazyLoad && b.lazyLoad()
    }, b.prototype.setupInfinite = function() {
        var c, d, e, b = this;
        if (b.options.fade === !0 && (b.options.centerMode = !1), b.options.infinite === !0 && b.options.fade === !1 && (d = null, b.slideCount > b.options.slidesToShow)) {
            for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow, c = b.slideCount; c > b.slideCount - e; c -= 1) d = c - 1, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");
            for (c = 0; e > c; c += 1) d = c, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");
            b.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                a(this).attr("id", "")
            })
        }
    }, b.prototype.interrupt = function(a) {
        var b = this;
        a || b.autoPlay(), b.interrupted = a
    }, b.prototype.selectHandler = function(b) {
        var c = this,
            d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"),
            e = parseInt(d.attr("data-slick-index"));
        return e || (e = 0), c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e), void c.asNavFor(e)) : void c.slideHandler(e)
    }, b.prototype.slideHandler = function(a, b, c) {
        var d, e, f, g, j, h = null,
            i = this;
        return b = b || !1, i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a), d = a, h = i.getLeft(d), g = i.getLeft(i.currentSlide), i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft, i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function() {
            i.postSlide(d)
        }) : i.postSlide(d))) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function() {
            i.postSlide(d)
        }) : i.postSlide(d))) : (i.options.autoplay && clearInterval(i.autoPlayTimer), e = 0 > d ? i.slideCount % i.options.slidesToScroll !== 0 ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? i.slideCount % i.options.slidesToScroll !== 0 ? 0 : d - i.slideCount : d, i.animating = !0, i.$slider.trigger("beforeChange", [i, i.currentSlide, e]), f = i.currentSlide, i.currentSlide = e, i.setSlideClasses(i.currentSlide), i.options.asNavFor && (j = i.getNavTarget(), j = j.slick("getSlick"), j.slideCount <= j.options.slidesToShow && j.setSlideClasses(i.currentSlide)), i.updateDots(), i.updateArrows(), i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f), i.fadeSlide(e, function() {
            i.postSlide(e)
        })) : i.postSlide(e), void i.animateHeight()) : void(c !== !0 ? i.animateSlide(h, function() {
            i.postSlide(e)
        }) : i.postSlide(e))))
    }, b.prototype.startLoad = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading")
    }, b.prototype.swipeDirection = function() {
        var a, b, c, d, e = this;
        return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "down" : "up" : "vertical"
    }, b.prototype.swipeEnd = function(a) {
        var c, d, b = this;
        if (b.dragging = !1, b.interrupted = !1, b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0, void 0 === b.touchObject.curX) return !1;
        if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]), b.touchObject.swipeLength >= b.touchObject.minSwipe) {
            switch (d = b.swipeDirection()) {
                case "left":
                case "down":
                    c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(), b.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(), b.currentDirection = 1
            }
            "vertical" != d && (b.slideHandler(c), b.touchObject = {}, b.$slider.trigger("swipe", [b, d]))
        } else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), b.touchObject = {})
    }, b.prototype.swipeHandler = function(a) {
        var b = this;
        if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold), a.data.action) {
            case "start":
                b.swipeStart(a);
                break;
            case "move":
                b.swipeMove(a);
                break;
            case "end":
                b.swipeEnd(a)
        }
    }, b.prototype.swipeMove = function(a) {
        var d, e, f, g, h, b = this;
        return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide), b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX, b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY, b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))), b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))), e = b.swipeDirection(), "vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(), g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1), b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1), f = b.touchObject.swipeLength, b.touchObject.edgeHit = !1, b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction, b.touchObject.edgeHit = !0), b.options.vertical === !1 ? b.swipeLeft = d + f * g : b.swipeLeft = d + f * (b.$list.height() / b.listWidth) * g, b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g), b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null, !1) : void b.setCSS(b.swipeLeft)) : void 0)
    }, b.prototype.swipeStart = function(a) {
        var c, b = this;
        return b.interrupted = !0, 1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]), b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX, b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY, void(b.dragging = !0))
    }, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function() {
        var a = this;
        null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit())
    }, b.prototype.unload = function() {
        var b = this;
        a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(), b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, b.prototype.unslick = function(a) {
        var b = this;
        b.$slider.trigger("unslick", [b, a]), b.destroy()
    }, b.prototype.updateArrows = function() {
        var b, a = this;
        b = Math.floor(a.options.slidesToShow / 2), a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, b.prototype.updateDots = function() {
        var a = this;
        null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }, b.prototype.visibility = function() {
        var a = this;
        a.options.autoplay && (document[a.hidden] ? a.interrupted = !0 : a.interrupted = !1)
    }, a.fn.slick = function() {
        var f, g, a = this,
            c = arguments[0],
            d = Array.prototype.slice.call(arguments, 1),
            e = a.length;
        for (f = 0; e > f; f++)
            if ("object" == typeof c || "undefined" == typeof c ? a[f].slick = new b(a[f], c) : g = a[f].slick[c].apply(a[f].slick, d), "undefined" != typeof g) return g;
        return a
    }
});
/*==== jQuery.marquee ====*/
! function(e) {
    e.fn.marquee = function(t) {
        return this.each(function() {
            var i, a, n, r, s, o = e.extend({}, e.fn.marquee.defaults, t),
                u = e(this),
                d = 3,
                p = "animation-play-state",
                l = !1,
                c = function(e, t, i) {
                    for (var a = ["webkit", "moz", "MS", "o", ""], n = 0; n < a.length; n++) a[n] || (t = t.toLowerCase()), e.addEventListener(a[n] + t, i, !1)
                },
                f = function(e) {
                    var t = [];
                    for (var i in e) e.hasOwnProperty(i) && t.push(i + ":" + e[i]);
                    return t.push(), "{" + t.join(",") + "}"
                },
                m = function() {
                    u.timer = setTimeout(B, o.delayBeforeStart)
                },
                g = {
                    pause: function() {
                        l && o.allowCss3Support ? i.css(p, "paused") : e.fn.pause && i.pause(), u.data("runningStatus", "paused"), u.trigger("paused")
                    },
                    resume: function() {
                        l && o.allowCss3Support ? i.css(p, "running") : e.fn.resume && i.resume(), u.data("runningStatus", "resumed"), u.trigger("resumed")
                    },
                    toggle: function() {
                        g["resumed" == u.data("runningStatus") ? "pause" : "resume"]()
                    },
                    destroy: function() {
                        clearTimeout(u.timer), u.find("*").andSelf().unbind(), u.html(u.find(".js-marquee:first").html())
                    }
                };
            if ("string" == typeof t) return void(e.isFunction(g[t]) && (i || (i = u.find(".js-marquee-wrapper")), u.data("css3AnimationIsSupported") === !0 && (l = !0), g[t]()));
            var h;
            e.each(o, function(e, t) {
                if (h = u.attr("data-" + e), "undefined" != typeof h) {
                    switch (h) {
                        case "true":
                            h = !0;
                            break;
                        case "false":
                            h = !1
                    }
                    o[e] = h
                }
            }), o.duration = o.speed || o.duration, r = "up" == o.direction || "down" == o.direction, o.gap = o.duplicated ? parseInt(o.gap) : 0, u.wrapInner('<div class="js-marquee"></div>');
            var v = u.find(".js-marquee").css({
                "margin-right": o.gap,
                "float": "left"
            });
            if (o.duplicated && v.clone(!0).appendTo(u), u.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>'), i = u.find(".js-marquee-wrapper"), r) {
                var y = u.height();
                i.removeAttr("style"), u.height(y), u.find(".js-marquee").css({
                    "float": "none",
                    "margin-bottom": o.gap,
                    "margin-right": 0
                }), o.duplicated && u.find(".js-marquee:last").css({
                    "margin-bottom": 0
                });
                var x = u.find(".js-marquee:first").height() + o.gap;
                o.startVisible && !o.duplicated ? (o._completeDuration = (parseInt(x, 10) + parseInt(y, 10)) / parseInt(y, 10) * o.duration, o.duration = parseInt(x, 10) / parseInt(y, 10) * o.duration) : o.duration = (parseInt(x, 10) + parseInt(y, 10)) / parseInt(y, 10) * o.duration
            } else s = u.find(".js-marquee:first").width() + o.gap, a = u.width(), o.startVisible && !o.duplicated ? (o._completeDuration = (parseInt(s, 10) + parseInt(a, 10)) / parseInt(a, 10) * o.duration, o.duration = parseInt(s, 10) / parseInt(a, 10) * o.duration) : o.duration = (parseInt(s, 10) + parseInt(a, 10)) / parseInt(a, 10) * o.duration;
            if (o.duplicated && (o.duration = o.duration / 2), o.allowCss3Support) {
                var I = document.body || document.createElement("div"),
                    b = "marqueeAnimation-" + Math.floor(1e7 * Math.random()),
                    S = "Webkit Moz O ms Khtml".split(" "),
                    w = "animation",
                    q = "",
                    j = "";
                if (I.style.animation && (j = "@keyframes " + b + " ", l = !0), l === !1)
                    for (var C = 0; C < S.length; C++)
                        if (void 0 !== I.style[S[C] + "AnimationName"]) {
                            var V = "-" + S[C].toLowerCase() + "-";
                            w = V + w, p = V + p, j = "@" + V + "keyframes " + b + " ", l = !0;
                            break
                        }
                l && (q = b + " " + o.duration / 1e3 + "s " + o.delayBeforeStart / 1e3 + "s infinite " + o.css3easing, u.data("css3AnimationIsSupported", !0))
            }
            var A = function() {
                    i.css("margin-top", "up" == o.direction ? y + "px" : "-" + x + "px")
                },
                k = function() {
                    i.css("margin-left", "left" == o.direction ? a + "px" : "-" + s + "px")
                };
            o.duplicated ? (r ? o.startVisible ? i.css("margin-top", 0) : i.css("margin-top", "up" == o.direction ? y + "px" : "-" + (2 * x - o.gap) + "px") : o.startVisible ? i.css("margin-left", 0) : i.css("margin-left", "left" == o.direction ? a + "px" : "-" + (2 * s - o.gap) + "px"), o.startVisible || (d = 1)) : o.startVisible ? d = 2 : r ? A() : k();
            var B = function() {
                if (o.duplicated && (1 === d ? (o._originalDuration = o.duration, r ? o.duration = "up" == o.direction ? o.duration + y / (x / o.duration) : 2 * o.duration : o.duration = "left" == o.direction ? o.duration + a / (s / o.duration) : 2 * o.duration, q && (q = b + " " + o.duration / 1e3 + "s " + o.delayBeforeStart / 1e3 + "s " + o.css3easing), d++) : 2 === d && (o.duration = o._originalDuration, q && (b += "0", j = e.trim(j) + "0 ", q = b + " " + o.duration / 1e3 + "s 0s infinite " + o.css3easing), d++)), r ? o.duplicated ? (d > 2 && i.css("margin-top", "up" == o.direction ? 0 : "-" + x + "px"), n = {
                        "margin-top": "up" == o.direction ? "-" + x + "px" : 0
                    }) : o.startVisible ? 2 === d ? (q && (q = b + " " + o.duration / 1e3 + "s " + o.delayBeforeStart / 1e3 + "s " + o.css3easing), n = {
                        "margin-top": "up" == o.direction ? "-" + x + "px" : y + "px"
                    }, d++) : 3 === d && (o.duration = o._completeDuration, q && (b += "0", j = e.trim(j) + "0 ", q = b + " " + o.duration / 1e3 + "s 0s infinite " + o.css3easing), A()) : (A(), n = {
                        "margin-top": "up" == o.direction ? "-" + i.height() + "px" : y + "px"
                    }) : o.duplicated ? (d > 2 && i.css("margin-left", "left" == o.direction ? 0 : "-" + s + "px"), n = {
                        "margin-left": "left" == o.direction ? "-" + s + "px" : 0
                    }) : o.startVisible ? 2 === d ? (q && (q = b + " " + o.duration / 1e3 + "s " + o.delayBeforeStart / 1e3 + "s " + o.css3easing), n = {
                        "margin-left": "left" == o.direction ? "-" + s + "px" : a + "px"
                    }, d++) : 3 === d && (o.duration = o._completeDuration, q && (b += "0", j = e.trim(j) + "0 ", q = b + " " + o.duration / 1e3 + "s 0s infinite " + o.css3easing), k()) : (k(), n = {
                        "margin-left": "left" == o.direction ? "-" + s + "px" : a + "px"
                    }), u.trigger("beforeStarting"), l) {
                    i.css(w, q);
                    var t = j + " { 100%  " + f(n) + "}",
                        p = i.find("style");
                    0 !== p.length ? p.filter(":last").html(t) : i.append("<style>" + t + "</style>"), c(i[0], "AnimationIteration", function() {
                        u.trigger("finished")
                    }), c(i[0], "AnimationEnd", function() {
                        B(), u.trigger("finished")
                    })
                } else i.animate(n, o.duration, o.easing, function() {
                    u.trigger("finished"), o.pauseOnCycle ? m() : B()
                });
                u.data("runningStatus", "resumed")
            };
            u.bind("pause", g.pause), u.bind("resume", g.resume), o.pauseOnHover && u.bind("mouseenter mouseleave", g.toggle), l && o.allowCss3Support ? B() : m()
        })
    }, e.fn.marquee.defaults = {
        allowCss3Support: !0,
        css3easing: "linear",
        easing: "linear",
        delayBeforeStart: 1e3,
        direction: "left",
        duplicated: !1,
        duration: 5e3,
        gap: 20,
        pauseOnCycle: !1,
        pauseOnHover: !1,
        startVisible: !1
    }
}(jQuery);
/*==== WOW - v1.1.3 ====*/
(function() {
    var a, b, c, d, e, f = function(a, b) {
            return function() {
                return a.apply(b, arguments)
            }
        },
        g = [].indexOf || function(a) {
            for (var b = 0, c = this.length; c > b; b++)
                if (b in this && this[b] === a) return b;
            return -1
        };
    b = function() {
        function a() {}
        return a.prototype.extend = function(a, b) {
            var c, d;
            for (c in b) d = b[c], null == a[c] && (a[c] = d);
            return a
        }, a.prototype.isMobile = function(a) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)
        }, a.prototype.createEvent = function(a, b, c, d) {
            var e;
            return null == b && (b = !1), null == c && (c = !1), null == d && (d = null), null != document.createEvent ? (e = document.createEvent("CustomEvent"), e.initCustomEvent(a, b, c, d)) : null != document.createEventObject ? (e = document.createEventObject(), e.eventType = a) : e.eventName = a, e
        }, a.prototype.emitEvent = function(a, b) {
            return null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : "on" + b in (null != a) ? a["on" + b]() : void 0
        }, a.prototype.addEvent = function(a, b, c) {
            return null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : a[b] = c
        }, a.prototype.removeEvent = function(a, b, c) {
            return null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b]
        }, a.prototype.innerHeight = function() {
            return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
        }, a
    }(), c = this.WeakMap || this.MozWeakMap || (c = function() {
        function a() {
            this.keys = [], this.values = []
        }
        return a.prototype.get = function(a) {
            var b, c, d, e, f;
            for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
                if (c = f[b], c === a) return this.values[b]
        }, a.prototype.set = function(a, b) {
            var c, d, e, f, g;
            for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
                if (d = g[c], d === a) return void(this.values[c] = b);
            return this.keys.push(a), this.values.push(b)
        }, a
    }()), a = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (a = function() {
        function a() {
            "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
        }
        return a.notSupported = !0, a.prototype.observe = function() {}, a
    }()), d = this.getComputedStyle || function(a, b) {
        return this.getPropertyValue = function(b) {
            var c;
            return "float" === b && (b = "styleFloat"), e.test(b) && b.replace(e, function(a, b) {
                return b.toUpperCase()
            }), (null != (c = a.currentStyle) ? c[b] : void 0) || null
        }, this
    }, e = /(\-([a-z]){1})/g, this.WOW = function() {
        function e(a) {
            null == a && (a = {}), this.scrollCallback = f(this.scrollCallback, this), this.scrollHandler = f(this.scrollHandler, this), this.resetAnimation = f(this.resetAnimation, this), this.start = f(this.start, this), this.scrolled = !0, this.config = this.util().extend(a, this.defaults), null != a.scrollContainer && (this.config.scrollContainer = document.querySelector(a.scrollContainer)), this.animationNameCache = new c, this.wowEvent = this.util().createEvent(this.config.boxClass)
        }
        return e.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null,
            scrollContainer: null
        }, e.prototype.init = function() {
            var a;
            return this.element = window.document.documentElement, "interactive" === (a = document.readyState) || "complete" === a ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
        }, e.prototype.start = function() {
            var b, c, d, e;
            if (this.stopped = !1, this.boxes = function() {
                    var a, c, d, e;
                    for (d = this.element.querySelectorAll("." + this.config.boxClass), e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                    return e
                }.call(this), this.all = function() {
                    var a, c, d, e;
                    for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                    return e
                }.call(this), this.boxes.length)
                if (this.disabled()) this.resetStyle();
                else
                    for (e = this.boxes, c = 0, d = e.length; d > c; c++) b = e[c], this.applyStyle(b, !0);
            return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new a(function(a) {
                return function(b) {
                    var c, d, e, f, g;
                    for (g = [], c = 0, d = b.length; d > c; c++) f = b[c], g.push(function() {
                        var a, b, c, d;
                        for (c = f.addedNodes || [], d = [], a = 0, b = c.length; b > a; a++) e = c[a], d.push(this.doSync(e));
                        return d
                    }.call(a));
                    return g
                }
            }(this)).observe(document.body, {
                childList: !0,
                subtree: !0
            }) : void 0
        }, e.prototype.stop = function() {
            return this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
        }, e.prototype.sync = function(b) {
            return a.notSupported ? this.doSync(this.element) : void 0
        }, e.prototype.doSync = function(a) {
            var b, c, d, e, f;
            if (null == a && (a = this.element), 1 === a.nodeType) {
                for (a = a.parentNode || a, e = a.querySelectorAll("." + this.config.boxClass), f = [], c = 0, d = e.length; d > c; c++) b = e[c], g.call(this.all, b) < 0 ? (this.boxes.push(b), this.all.push(b), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0), f.push(this.scrolled = !0)) : f.push(void 0);
                return f
            }
        }, e.prototype.show = function(a) {
            return this.applyStyle(a), a.className = a.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(a), this.util().emitEvent(a, this.wowEvent), this.util().addEvent(a, "animationend", this.resetAnimation), this.util().addEvent(a, "oanimationend", this.resetAnimation), this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation), a
        }, e.prototype.applyStyle = function(a, b) {
            var c, d, e;
            return d = a.getAttribute("data-wow-duration"), c = a.getAttribute("data-wow-delay"), e = a.getAttribute("data-wow-iteration"), this.animate(function(f) {
                return function() {
                    return f.customStyle(a, b, d, c, e)
                }
            }(this))
        }, e.prototype.animate = function() {
            return "requestAnimationFrame" in window ? function(a) {
                return window.requestAnimationFrame(a)
            } : function(a) {
                return a()
            }
        }(), e.prototype.resetStyle = function() {
            var a, b, c, d, e;
            for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], e.push(a.style.visibility = "visible");
            return e
        }, e.prototype.resetAnimation = function(a) {
            var b;
            return a.type.toLowerCase().indexOf("animationend") >= 0 ? (b = a.target || a.srcElement, b.className = b.className.replace(this.config.animateClass, "").trim()) : void 0
        }, e.prototype.customStyle = function(a, b, c, d, e) {
            return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible", c && this.vendorSet(a.style, {
                animationDuration: c
            }), d && this.vendorSet(a.style, {
                animationDelay: d
            }), e && this.vendorSet(a.style, {
                animationIterationCount: e
            }), this.vendorSet(a.style, {
                animationName: b ? "none" : this.cachedAnimationName(a)
            }), a
        }, e.prototype.vendors = ["moz", "webkit"], e.prototype.vendorSet = function(a, b) {
            var c, d, e, f;
            d = [];
            for (c in b) e = b[c], a["" + c] = e, d.push(function() {
                var b, d, g, h;
                for (g = this.vendors, h = [], b = 0, d = g.length; d > b; b++) f = g[b], h.push(a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = e);
                return h
            }.call(this));
            return d
        }, e.prototype.vendorCSS = function(a, b) {
            var c, e, f, g, h, i;
            for (h = d(a), g = h.getPropertyCSSValue(b), f = this.vendors, c = 0, e = f.length; e > c; c++) i = f[c], g = g || h.getPropertyCSSValue("-" + i + "-" + b);
            return g
        }, e.prototype.animationName = function(a) {
            var b;
            try {
                b = this.vendorCSS(a, "animation-name").cssText
            } catch (c) {
                b = d(a).getPropertyValue("animation-name")
            }
            return "none" === b ? "" : b
        }, e.prototype.cacheAnimationName = function(a) {
            return this.animationNameCache.set(a, this.animationName(a))
        }, e.prototype.cachedAnimationName = function(a) {
            return this.animationNameCache.get(a)
        }, e.prototype.scrollHandler = function() {
            return this.scrolled = !0
        }, e.prototype.scrollCallback = function() {
            var a;
            return !this.scrolled || (this.scrolled = !1, this.boxes = function() {
                var b, c, d, e;
                for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], a && (this.isVisible(a) ? this.show(a) : e.push(a));
                return e
            }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
        }, e.prototype.offsetTop = function(a) {
            for (var b; void 0 === a.offsetTop;) a = a.parentNode;
            for (b = a.offsetTop; a = a.offsetParent;) b += a.offsetTop;
            return b
        }, e.prototype.isVisible = function(a) {
            var b, c, d, e, f;
            return c = a.getAttribute("data-wow-offset") || this.config.offset, f = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset, e = f + Math.min(this.element.clientHeight, this.util().innerHeight()) - c, d = this.offsetTop(a), b = d + a.clientHeight, e >= d && b >= f
        }, e.prototype.util = function() {
            return null != this._util ? this._util : this._util = new b
        }, e.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }, e
    }()
}).call(this);

/* Loading Page */
$(window).on("load", function() {
    $(".tornado-loader").fadeOut(3000, function() {
        $(".tornado-loader").remove();
    });
});

/** Tornado jQuery **/
jQuery(document).ready(function($) {
    "use strict";

    /*=== Grid Fixs ===*/
    $(".row > *[data-order],.row-reverse > *[data-order]").each(function() {
        var colOrder = $(this).attr("data-order");
        $(this).css("order", colOrder)
    });

    $(".cols-gutter-40").parent().css({
        "padding-right": "20px",
        "padding-left": "20px",
    });

    $(".cols-gutter-50").parent().css({
        "padding-right": "25px",
        "padding-left": "25px",
    });

    $(".row-masonry").each(function() {
        var colmnsNumber = $(this).attr("data-columns");
        $(this).css({
            "-webkit-column-count": colmnsNumber,
            "-moz-column-count": colmnsNumber,
            "column-count": colmnsNumber,
        })
    })

    $(".card .card-footer").each(function() {
        var cardFooter = $(this).height();
        $(this).parent().css({
            "padding-bottom": cardFooter + "px",
        });
    });

    /*=== Navigation menu ===*/
    $(".navigation-menu").each(function() {
        $(this).prepend(" <button class='menu-button ti-menu'></button> ");
        $(this).children("ul").not(".mobile-menu").parent().append("<div class='mobile-menu'></div>");
        $(this).append("<span class='overlay-close'></span>");
        var mobileClone = $(this).children("div.mobile-menu");
        $(this).children("ul").not(".mobile-menu").clone().appendTo(mobileClone);
        $(".navigation-menu ul").parent("li").children("a").addClass("submenu ti-arrow-down");
        $(".navigation-menu .megamenu").siblings("a").addClass("submenu ti-arrow-down").parent("li").css("position", "static");
    });

    $(".navigation-menu .menu-button,.navigation-menu .overlay-close").on("click", function() {
        $(this).siblings(".mobile-menu").toggleClass("active").siblings(".menu-button").toggleClass("active");
    });

    $(".mobile-menu .submenu").on("click", function(mobtnEvent) {
        mobtnEvent.preventDefault();
        $(this).siblings("ul,.megamenu").slideToggle(700);
        $(this).parent("li").toggleClass("active").siblings("li").removeClass("active").children("ul,.megamenu").slideUp(700);
    });

    $(".sticky-navbar,[data-sticky]").stick_in_parent();

    $(".sticky-footer").each(function() {
        var stickyFooter = $(this).height();
        $(this).parent().css({
            "padding-bottom": stickyFooter + "px",
            "position": "relative",
        });
    });

    /*=== Dropdowns ===*/
    $(".dropdown-btn").each(function() {
        var dropdownbg = $(this).css("background-color");
        var dropdowncolor = $(this).css("color");
        $(this).next(".dropdown").css({
            "background-color": dropdownbg,
            "color": dropdowncolor
        }).parent().css("position", "relative");

        $(this).next(".dropdown").find("a").css({
            "color": dropdowncolor
        });

        $(this).click(function(e) {
            e.preventDefault();
            $(this).next(".dropdown").slideToggle(300).toggleClass("opened")
        });
    });

    /*=== Close if clicks outside ===*/
    window.onclick = function(event) {
        if (!event.target.matches('.dropdown-btn')) {
            var dropdowns = document.getElementsByClassName("opened");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('opened')) {
                    $(".opened").fadeOut(350);
                    openDropdown.classList.remove('opened');
                }
            }
        }
    }

    /*=== Forms ===*/
    $("*[placeholder]").each(function() {
        var placeHold = $(this).attr("placeholder");
        $(this).on({
            focusin: function() {
                $(this).attr("placeholder", " ");
            },

            focusout: function() {
                $(this).attr("placeholder", placeHold);
            }
        })
    });

    $('.datepicker').datepicker({
        autoHide: true,
        zIndex: 99,
    });

    $("body").on("change", ".file-input input[type='file']", function() {
        var filePath = [];
        for (var i = 0; i < $(this).get(0).files.length; ++i) {
            filePath.push($(this).get(0).files[i].name);
        }
        $(this).siblings(".file-path").val(filePath);
    });

    $('.tags-input').tagsInput({
        'height': 'auto',
        'width': '100%',
    })

    $(".autocomplete").each(function() {
        var apiurl = $(this).attr("data-url");
        var dataVal = $(this).attr("data-val");
        var options = {
            url: apiurl,
            getValue: dataVal,
            list: {
                match: {
                    enabled: true
                }
            },
            theme: "square"
        };

        $(this).easyAutocomplete(options);
    })

    $(".range-slider").each(function() {
        var dataMin = $(this).attr("data-min");
        var dataMax = $(this).attr("data-max");
        var rangeWidth = $(this).parent().innerWidth();
        $(this).jRange({
            from: dataMin,
            to: dataMax,
            step: 1,
            scale: [dataMin, dataMax],
            format: '%s',
            width: rangeWidth - 15,
            showLabels: true,
            snap: true,
        });
    });

    $(".alert .close-alert").on("click", function() {
        $(this).parent(".alert").fadeOut(500);
    });

    $(".clone-btn").click(function(e) {
        e.preventDefault();
        var conewrap = $(this).parent().clone();
        $(this).parent().after(conewrap).next(".form-clone").children(".clone-btn").addClass("remove-clone ti-minus-io").removeClass("ti-plus-io clone-btn");
    });

    $("body").on("click", ".remove-clone", function(e) {
        e.preventDefault();
        $(this).parent().remove();
    });

    /*=== Tooltip ===*/
    $(".tooltip").each(function() {
        var tooltipTitle = $(this).attr("title");
        $(this).append("<a href='javascript:void(0)' class='tooltip-box'>" + tooltipTitle + "</a>");
        $(this).removeAttr("title");
    });

    /*=== accordion ===*/
    $(".accordion:not(.collapsed) .accordion-item:first-of-type .accordion-title").addClass("active").next(".accordion-content").addClass("active");
    $(".accordion-title").on("click", function() {
        $(this).toggleClass("active").parent(".accordion-item").siblings().children(".accordion-title").removeClass("active");
        $(this).next(".accordion-content").slideToggle(350).toggleClass("active").parent(".accordion-item").siblings().children(".accordion-content").slideUp(350).removeClass("active");
    });

    /*=== Tabs System ===*/
    $(".tabs .tabs-menu li:first-child").addClass("active");
    $(".tabs .tab-content:first-of-type").addClass("active");
    $(".tabs-menu li").on("click", function() {
        var tabID = $(this).attr("data-tab");
        $(this).addClass("active").siblings().removeClass("active");
        $("#" + tabID).fadeIn(0).addClass("active").siblings(".tab-content").hide().removeClass("active");
    });

    /*=== Modals ===*/
    $(".modal-box").each(function() {
        $(this).prepend("<span class='modal-overlay'></span>");
    });

    $("[data-modal]").on("click", function() {
        $('a[data-modal]').attr('href', 'javascript:void(0)');
        var modalName = $(this).attr("data-modal");
        $("#" + modalName).toggleClass("active");
    });

    $(".modal-box .modal-overlay,.modal-box .close-modal").on("click", function() {
        $('a.close-modal').attr('href', 'javascript:void(0)');
        $(".modal-box").removeClass("active");
    });

    lightbox.option({
        'resizeDuration': 600,
        'wrapAround': true,
        disableScrolling: true,
        fadeDuration: 600,
        fitImagesInViewport: true,
        imageFadeDuration: 600,
    });

    /*===== Progress ====*/
    $(".progress-bar").each(function() {
        var dataValue = $(this).attr("data-value");
        var dataColor = $(this).attr("data-color");
        $(this).children(".bar").css({
            "width": dataValue + "%",
            "background-color": dataColor,
        })
    });

    $(".progress-bar.textual").each(function() {
        var dataValue = $(this).attr("data-value");
        $(this).children(".bar").text(dataValue + "%")
    });

    /*======= Backgrounds ======*/
    $("[data-src]").each(function() {
        var backgroundImage = $(this).attr("data-src");
        $(this).css("background-image", "url(" + backgroundImage + ")");
    });

    $(".video-bg").each(function() {
        $(this).parent().css({
            "overflow": "hidden",
            "position": "relative",
            "-webkit-backface-visibility": "hidden",
            "backface-visibility": "hidden",
            "-webkit-transform": "translateZ(0)",
            "transform": "translateZ(0)",
        });
    });

    /*=== Scrollspy ===*/
    $(".scrollspy").each(function() {
        var fixedNav = $(".sticky-navbar").height();
        $(this).scrollspy({
            offset: -fixedNav,
            animate: true,
        });
    });

    /* === viewport animations ===*/
    $("[data-delay]").each(function() {
        var vpDelay = $(this).attr("data-delay");
        $(this).css({
            "-webkit-animation-delay": vpDelay,
            "animation-delay": vpDelay,
        });
    });

    $("[class*='flipInX'],[class*='flipInY']").each(function() {
        $(this).parent().css({
            "-webkit-perspective": "1300px",
            "perspective": "1300px",
        });
    });

    /*=== wow.js ===*/
    function afterReveal(el) {
        el.addEventListener('animationend', function(event) {
            $(this).addClass("viewActive")
        });
    }

    new WOW({
        callback: afterReveal
    }).init()

    /*=== Parallax Mouse ===*/
    $('.parallax-mbg').on("mousemove", function(e) {
        var x = -(e.pageX + this.offsetLeft) / 20;
        var y = -(e.pageY + this.offsetTop) / 20;
        $(this).css('background-position', x + 'px ' + y + 'px');
    });

    $('.parallax-layers').on("mousemove", function(e) {
        parallax(e, this, 1);
        parallax(e, this.getElementsByClassName('layer'), 2);
    });

    /*/ ===== Slick Slider ===== /*/
    $("[data-transition='true'] [data-transition]").each(function() {
        var transName = $(this).attr("data-transition");
        var transNameLast = $(this).first().attr("data-transition");
        $(this).prev().attr("data-tsout", transName + "Out");
        $(this).last().attr("data-tsout", transNameLast + "Out");
    });

    $(document).ready(function() {
        $('.slick-slider[data-rtl]').slick("slickSetOption", "rtl", true, true);
        $('.slick-vertical').slick("slickSetOption", "verticalSwiping", true, true);
        $('.slick-slider[data-transition="true"]').slick("slickSetOption", "fade", true, false);
    });

    /*/ ==== Marquee ==== /*/
    $(".marquee").each(function() {
        var marqueeSpeed = $(this).attr("data-speed");
        var marqueeDirction = $(this).attr("data-dir");
        $(this).marquee({
            duration: marqueeSpeed,
            gap: 30,
            delayBeforeStart: 0,
            direction: marqueeDirction,
            duplicated: true
        });
    });

})
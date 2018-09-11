!function (t) {
    function e(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = {"exports": {}, "id": r, "loaded": !1};
        return t[r].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports
    }

    var n = {};
    return e.m = t, e.c = n, e.p = "", e(0)
}([function (t, e, n) {
    t.exports = n(1)
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {"default": t}
    }

    var o = n(2), i = r(o);
    n(18), n(19), n(21), n(22), n(23), n(24), n(25), n(26), n(27), n(28), n(29), n(30), n(31), n(32), n(33), n(34), n(35), i["default"].monitorInternal = 100, i["default"].addStyleSheet(".imga_wrapper{position:relative;display:inline-block;}.imga_flag{display: inline-block;position: absolute;bottom: 8px;left: 8px;border: 1px solid #fff;color: #fff;font-size: 12px;line-height: 12px;height: 12px;padding: 1px 2px;text-align: center;}"), new i["default"], window.riot && window.on && window.trigger && window.on("ad_put", function () {
        i["default"]._$.put()
    }), window.ad$ = i["default"]._$
}, function (module, exports, __webpack_require__) {
    "use strict";

    function _interopRequireDefault(t) {
        return t && t.__esModule ? t : {"default": t}
    }

    function _classCallCheck(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function getCookie(t) {
        var e, n = new RegExp("(^| )" + t + "=([^;]*)(;|$)");
        return e = document.cookie.match(n), e ? unescape(e[2]) : null
    }

    exports.__esModule = !0;
    var _main = __webpack_require__(3), _main2 = _interopRequireDefault(_main), _underscore = __webpack_require__(14),
        _underscore2 = _interopRequireDefault(_underscore), _reqwest = __webpack_require__(15),
        _reqwest2 = _interopRequireDefault(_reqwest), _store = __webpack_require__(17),
        _store2 = _interopRequireDefault(_store), interfaceType = function (t, e, n) {
            var r, o = t.content, i = o.render, a = !!t.cache;
            o.url && (a ? (r = _store2["default"].get(t.name), r ? (i.call(null, r, e), e.setAttribute("done", 1), n && n.call()) : AD.send(t, e, "content", null, n)) : AD.send(t, e, "content", null, n))
        }, fileType = function (t, e, n) {
            var r = t.content, o = r.render, i = r.data, a = r.url;
            if (a) {
                i && _underscore2["default"].isFunction(i) && i.call(t, e);
                var u = !0;
                (0, _main2["default"])(e, a, {
                    "done": function () {
                        u && (e.setAttribute("done", 1), o && o.call(null, t, e), n && n.call())
                    }, "error": function () {
                        u = !1, o && o.call(null, null, e)
                    }
                })
            }
        }, staticType = function (t, e, n) {
            var r = t.content, o = r.render;
            e.setAttribute("done", 1), o.call(null, null, e), n && n.call()
        }, AD = function () {
            function AD(t) {
                _classCallCheck(this, AD), this.showEl = [], this.el = t || "[ad-cursor]", this.store = _store2["default"], AD._$ = this
            }

            return AD.prototype.getAdByGroupName = function (t) {
                var e = [], n = [];
                _underscore2["default"].each(AD.space, function (r) {
                    r.group === t && (r.rule && _underscore2["default"].isFunction(r.rule) ? r.rule.call(null) && (e.push(r.distribution), n.push(r.name)) : (e.push(r.distribution), n.push(r.name)))
                });
                var r = AD.getHit(e);
                return r > -1 ? n[r] : ""
            }, AD.prototype.run = function (t, e) {
                var n = this, r = this.getAdByGroupName(t), o = AD.space[r];
                o && (!o.rule || _underscore2["default"].isFunction(o.rule) && o.rule.call(null) ? (e.setAttribute("ad_name", r), "interface" === o.type ? interfaceType(o, e, function () {
                    return n.monitor(e)
                }) : "file" === o.type ? fileType(o, e, function () {
                    return n.monitor(e)
                }) : "static" === o.type && staticType(o, e, function () {
                    return n.monitor(e)
                })) : e.style.display = "none")
            }, AD.prototype.put = function () {
                var t, e, n = this, r = document.querySelectorAll(n.el);
                _underscore2["default"].each(r, function (r) {
                    t = r.getAttribute("name"), e = r.getAttribute("done"), t && !e && n.run(t, r)
                })
            }, AD.prototype.registerEvent = function (t, e) {
                var n = AD.space[t], r = this;
                n && (AD.addEvent("click", e, function (t) {
                    e && "1" === e.getAttribute("done") && AD.send(n, e, "monitor", {"type": "click"})
                }), n.monitor.show && r.showEl.push({"name": t, "dom": e}))
            }, AD.prototype.updateCache = function (t, e) {
                var n, r = AD.space[t];
                if (!r) return !1;
                if (n = r.content, "interface" === r.type) {
                    var o = {
                        "url": n.url,
                        "method": n.type,
                        "type": n.dataType || "json",
                        "data": _underscore2["default"].isFunction(n.data) ? n.data() : {},
                        "success": function (n) {
                            _store2["default"].set(t, _underscore2["default"].extend(n, {"is_valid": !0})), e && e.call(r, n)
                        },
                        "error": function () {
                            _store2["default"].remove(t)
                        }
                    };
                    n.jsopName && (o.jsonpCallbackName = n.jsopName), (0, _reqwest2["default"])(o)
                }
            }, AD.prototype.monitor = function (t) {
                var e, n, r = this;
                e = t.getAttribute("ad_name"), e && r.registerEvent(e, t);
                var o = function () {
                    var r, o, a, u = !1;
                    i && i instanceof Function && i.call(window), n = t.getAttribute("done"), u = AD.inView(t, "top") || AD.inView(t, "bottom"), e = t.getAttribute("ad_name"), !t.getAttribute("show") && u && "1" === n && (r = AD.space[e], o = t.getAttribute("ad_id"), a = t.getAttribute("log_extra"), r && (o && a ? AD.send(r, t, "monitor", {
                        "type": "show",
                        "value": o,
                        "log_extra": a
                    }) : setTimeout(function () {
                        AD.send(r, t, "monitor", {
                            "type": "show",
                            "value": t.getAttribute("ad_id"),
                            "log_extra": t.getAttribute("log_extra")
                        })
                    }, AD.monitorInternal))), t.setAttribute("show", u ? "1" : "")
                };
                o();
                var i = window.onscroll;
                window.onscroll = _underscore2["default"].throttle(o, AD.showInternal)
            }, AD.plugins = function (t, e) {
                this[t] = e
            }, AD.add = function (t) {
                AD.space[t.name] = t
            }, AD.addStyleSheet = function (t) {
                var e = document.createElement("style"), n = Math.random().toString(16).slice(2, 9);
                e.id = n, /IE/.test(navigator.userAgent) && (e.type = "text/css", e.media = "screen"), (document.getElementsByTagName("head")[0] || document.body).appendChild(e), e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t))
            }, AD.createAD = function (t, e, n) {
                for (var r, o = document.createElement("a"), i = 0, a = n.length; i < a; i++) r = document.createElement("img"), r.src = n[i].src, o.appendChild(r);
                var u = document.createElement("span");
                u.textContent = "骞垮憡", u.setAttribute("class", "imga_flag"), o.appendChild(u), o.setAttribute("class", "imga_wrapper"), o.setAttribute("target", "_blank"), o.href = e, t.appendChild(o)
            }, AD.getHit = function getHit(weights) {
                var factory = function factory(weights) {
                    var total, current = 0, parts = [], i = 0, l = weights.length;
                    for (total = weights.reduce ? weights.reduce(function (t, e) {
                        return t + e
                    }, 0) : eval(weights.join("+")); i < l; i++) current += weights[i], parts.push("if( p < ", current / total, " ) return ", i / l, " + n;");
                    return Function("var p = Math.random(), n = Math.random() / " + l + ";" + parts.join(""))
                };
                return arguments.length > 0 && (weights = [].slice.call(arguments)), Math.floor(weights[0].length * factory.apply(null, weights)())
            }, AD.inView = function (t, e) {
                var n, r = t;
                "string" == typeof t && (r = document.querySelector(t));
                var o = r.getBoundingClientRect(), i = document.documentElement.clientHeight || document.body.clientHeight;
                if ("top" === e && (n = o.top > 0 && o.top < i), "bottom" === e && (n = o.bottom > 0 && o.bottom < i), "all" === e) {
                    var a = o.top < 0 && o.bottom > i, u = o.top > 0 && o.top < i && o.bottom > 0 && o.bottom < i;
                    n = a || u
                }
                return n
            }, AD.addEvent = function (t, e, n) {
                e && (e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent("on" + t, n))
            }, AD.removeEvent = function (t, e, n) {
                e && (e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent("on" + t, n))
            }, AD.send = function (t, e, n, r, o) {
                var i = t[n], a = i.headers, u = i.data, c = i.render, l = i["custom"], s = {
                    "url": i.url,
                    "method": i.type || "get",
                    "type": i.dataType || "json",
                    "headers": _underscore2["default"].isFunction(i.header) ? a.call() : {},
                    "data": _underscore2["default"].isFunction(i.data) ? u.call(e, r) : {},
                    "success": function (r) {
                        "content" === n && (_store2["default"].set(t.name, _underscore2["default"].extend(r, {"is_valid": !0})), e && e.setAttribute("done", 1)), c && c.call(null, r, e), o && o.call()
                    },
                    "error": function () {
                        c && c.call(null, null, e)
                    }
                };
                i.jsopName && (s.jsonpCallbackName = i.jsopName), "monitor" === n && l && r.type && l[r.type] && l[r.type].call(null, e), i && i.url && (0, _reqwest2["default"])(s)
            }, AD.getWeights = function (t) {
                var e = [], n = AD.space[t], r = [];
                return n && _underscore2["default"].each(AD.space, function (t) {
                    t.group === n.group && (r.push(t.distribution), e.push(t.name))
                }), {"weight": r, "group": e}
            }, AD.monitorConfig = function (t, e, n, r, o) {
                var i = AD.monitor_config, a = i[t];
                return a || (i[t] = {
                    "tag": "embeded_ad",
                    "is_ad_event": 1,
                    "log_extra": "",
                    "category": "web",
                    "utm_source": "toutiao",
                    "ext_value": 0,
                    "nt": 0,
                    "ad_extra_data": o,
                    "csrfmiddlewaretoken": getCookie("csrftoken")
                }), e && (i[t].label = e), n && (i[t].value = n), r && (i[t].log_extra = r), i[t]
            }, AD.reporter = function (t) {
                var e = new Image;
                e.src = t
            }, AD.cnzzReporter = function (t, e, n) {
                window._czc && _czc.push(["_trackEvent", t, e, n, 1, ""])
            }, AD.addClass = function (t, e) {
                if (t && t.getAttribute) {
                    var n = t.getAttribute("class");
                    if (n) {
                        var r = n.split(" ");
                        r.indexOf(e) < 0 && (n += " " + e, t.setAttribute("class", n))
                    }
                }
            }, AD
        }();
    AD.version = "0.0.1", AD.showInternal = 500, AD.monitorInternal = 1e3, AD.monitor_config = {}, AD.space = {}, AD._ = _underscore2["default"], AD.http = _reqwest2["default"], exports["default"] = AD
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {"default": t}
    }

    var o = n(4), i = r(o);
    t.exports = i["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t) for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e["default"] = t, e
    }

    function o(t) {
        return t && t.__esModule ? t : {"default": t}
    }

    function i() {
    }

    function a() {
        var t = m.shift();
        if (t) {
            var e = p.last(t);
            e.afterDequeue(), t.stream = u.apply(void 0, t), e.afterStreamStart()
        }
    }

    function u(t, e, n) {
        function r(t) {
            t = n.beforeWrite(t), g.write(t), n.afterWrite(t)
        }

        g = new d["default"](t, n), g.id = _++, g.name = n.name || g.id, c.streams[g.name] = g;
        var o = t.ownerDocument, u = {"close": o.close, "open": o.open, "write": o.write, "writeln": o.writeln};
        l(o, {
            "close": i, "open": i, "write": function () {
                for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                return r(e.join(""))
            }, "writeln": function () {
                for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                return r(e.join("") + "\n")
            }
        });
        var s = g.win.onerror || i;
        return g.win.onerror = function (t, e, r) {
            n.error({"msg": t + " - " + e + ": " + r}), s.apply(g.win, [t, e, r])
        }, g.write(e, function () {
            l(o, u), g.win.onerror = s, n.done(), g = null, a()
        }), g
    }

    function c(t, e, n) {
        if (p.isFunction(n)) n = {"done": n}; else if ("clear" === n) return m = [], g = null, void(_ = 0);
        n = p.defaults(n, h), t = /^#/.test(t) ? window.document.getElementById(t.substr(1)) : t.jquery ? t[0] : t;
        var r = [t, e, n];
        return t.postscribe = {
            "cancel": function () {
                r.stream ? r.stream.abort() : r[1] = i
            }
        }, n.beforeEnqueue(r), m.push(r), g || a(), t.postscribe
    }

    e.__esModule = !0;
    var l = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    };
    e["default"] = c;
    var s = n(5), d = o(s), f = n(13), p = r(f), h = {
        "afterAsync": i,
        "afterDequeue": i,
        "afterStreamStart": i,
        "afterWrite": i,
        "autoFix": !0,
        "beforeEnqueue": i,
        "beforeWriteToken": function (t) {
            return t
        },
        "beforeWrite": function (t) {
            return t
        },
        "done": i,
        "error": function (t) {
            throw new Error(t.msg)
        },
        "releaseAsync": !1
    }, _ = 0, m = [], g = null;
    l(c, {"streams": {}, "queue": m, "WriteStream": d["default"]})
}, function (t, e, n) {
    "use strict";

    function r(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t) for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e["default"] = t, e
    }

    function o(t) {
        return t && t.__esModule ? t : {"default": t}
    }

    function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function a(t, e) {
        var n = h + e, r = t.getAttribute(n);
        return f.existy(r) ? String(r) : r
    }

    function u(t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, r = h + e;
        f.existy(n) && "" !== n ? t.setAttribute(r, n) : t.removeAttribute(r)
    }

    e.__esModule = !0;
    var c = Object.assign || function (t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
            }
            return t
        }, l = n(6), s = o(l), d = n(13), f = r(d), p = !1, h = "data-ps-", _ = "ps-style", m = "ps-script",
        g = function () {
            function t(e) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                i(this, t), this.root = e, this.options = n, this.doc = e.ownerDocument, this.win = this.doc.defaultView || this.doc.parentWindow, this.parser = new s["default"]("", {"autoFix": n.autoFix}), this.actuals = [e], this.proxyHistory = "", this.proxyRoot = this.doc.createElement(e.nodeName), this.scriptStack = [], this.writeQueue = [], u(this.proxyRoot, "proxyof", 0)
            }

            return t.prototype.write = function () {
                var t;
                for ((t = this.writeQueue).push.apply(t, arguments); !this.deferredRemote && this.writeQueue.length;) {
                    var e = this.writeQueue.shift();
                    f.isFunction(e) ? this._callFunction(e) : this._writeImpl(e)
                }
            }, t.prototype._callFunction = function (t) {
                var e = {"type": "function", "value": t.name || t.toString()};
                this._onScriptStart(e), t.call(this.win, this.doc), this._onScriptDone(e)
            }, t.prototype._writeImpl = function (t) {
                this.parser.append(t);
                for (var e = void 0, n = void 0, r = void 0, o = []; (e = this.parser.readToken()) && !(n = f.isScript(e)) && !(r = f.isStyle(e));) e = this.options.beforeWriteToken(e), e && o.push(e);
                o.length > 0 && this._writeStaticTokens(o), n && this._handleScriptToken(e), r && this._handleStyleToken(e)
            }, t.prototype._writeStaticTokens = function (t) {
                var e = this._buildChunk(t);
                return e.actual ? (e.html = this.proxyHistory + e.actual, this.proxyHistory += e.proxy, this.proxyRoot.innerHTML = e.html, p && (e.proxyInnerHTML = this.proxyRoot.innerHTML), this._walkChunk(), p && (e.actualInnerHTML = this.root.innerHTML), e) : null
            }, t.prototype._buildChunk = function (t) {
                for (var e = this.actuals.length, n = [], r = [], o = [], i = t.length, a = 0; a < i; a++) {
                    var u = t[a], c = u.toString();
                    if (n.push(c), u.attrs) {
                        if (!/^noscript$/i.test(u.tagName)) {
                            var l = e++;
                            r.push(c.replace(/(\/?>)/, " " + h + "id=" + l + " $1")), u.attrs.id !== m && u.attrs.id !== _ && o.push("atomicTag" === u.type ? "" : "<" + u.tagName + " " + h + "proxyof=" + l + (u.unary ? " />" : ">"))
                        }
                    } else r.push(c), o.push("endTag" === u.type ? c : "")
                }
                return {"tokens": t, "raw": n.join(""), "actual": r.join(""), "proxy": o.join("")}
            }, t.prototype._walkChunk = function () {
                for (var t = void 0, e = [this.proxyRoot]; f.existy(t = e.shift());) {
                    var n = 1 === t.nodeType, r = n && a(t, "proxyof");
                    if (!r) {
                        n && (this.actuals[a(t, "id")] = t, u(t, "id"));
                        var o = t.parentNode && a(t.parentNode, "proxyof");
                        o && this.actuals[o].appendChild(t)
                    }
                    e.unshift.apply(e, f.toArray(t.childNodes))
                }
            }, t.prototype._handleScriptToken = function (t) {
                var e = this, n = this.parser.clear();
                n && this.writeQueue.unshift(n), t.src = t.attrs.src || t.attrs.SRC, t = this.options.beforeWriteToken(t), t && (t.src && this.scriptStack.length ? this.deferredRemote = t : this._onScriptStart(t), this._writeScriptToken(t, function () {
                    e._onScriptDone(t)
                }))
            }, t.prototype._handleStyleToken = function (t) {
                var e = this.parser.clear();
                e && this.writeQueue.unshift(e), t.type = t.attrs.type || t.attrs.TYPE || "text/css", t = this.options.beforeWriteToken(t), t && this._writeStyleToken(t), e && this.write()
            }, t.prototype._writeStyleToken = function (t) {
                var e = this._buildStyle(t);
                this._insertCursor(e, _), t.content && (e.styleSheet && !e.sheet ? e.styleSheet.cssText = t.content : e.appendChild(this.doc.createTextNode(t.content)))
            }, t.prototype._buildStyle = function (t) {
                var e = this.doc.createElement(t.tagName);
                return e.setAttribute("type", t.type), f.eachKey(t.attrs, function (t, n) {
                    e.setAttribute(t, n)
                }), e
            }, t.prototype._insertCursor = function (t, e) {
                this._writeImpl('<span id="' + e + '"/>');
                var n = this.doc.getElementById(e);
                n && n.parentNode.replaceChild(t, n)
            }, t.prototype._onScriptStart = function (t) {
                t.outerWrites = this.writeQueue, this.writeQueue = [], this.scriptStack.unshift(t)
            }, t.prototype._onScriptDone = function (t) {
                return t !== this.scriptStack[0] ? void this.options.error({"msg": "Bad script nesting or script finished twice"}) : (this.scriptStack.shift(), this.write.apply(this, t.outerWrites), void(!this.scriptStack.length && this.deferredRemote && (this._onScriptStart(this.deferredRemote), this.deferredRemote = null)))
            }, t.prototype._writeScriptToken = function (t, e) {
                var n = this._buildScript(t), r = this._shouldRelease(n), o = this.options.afterAsync;
                t.src && (n.src = t.src, this._scriptLoadHandler(n, r ? o : function () {
                    e(), o()
                }));
                try {
                    this._insertCursor(n, m), n.src && !r || e()
                } catch (t) {
                    this.options.error(t), e()
                }
            }, t.prototype._buildScript = function (t) {
                var e = this.doc.createElement(t.tagName);
                return f.eachKey(t.attrs, function (t, n) {
                    e.setAttribute(t, n)
                }), t.content && (e.text = t.content), e
            }, t.prototype._scriptLoadHandler = function (t, e) {
                function n() {
                    t = t.onload = t.onreadystatechange = t.onerror = null
                }

                function r() {
                    n(), null != e && e(), e = null
                }

                function o(t) {
                    n(), a(t), null != e && e(), e = null
                }

                function i(t, e) {
                    var n = t["on" + e];
                    null != n && (t["_on" + e] = n)
                }

                var a = this.options.error;
                i(t, "load"), i(t, "error"), c(t, {
                    "onload": function () {
                        if (t._onload) try {
                            t._onload.apply(this, Array.prototype.slice.call(arguments, 0))
                        } catch (e) {
                            o({"msg": "onload handler failed " + e + " @ " + t.src})
                        }
                        r()
                    }, "onerror": function () {
                        if (t._onerror) try {
                            t._onerror.apply(this, Array.prototype.slice.call(arguments, 0))
                        } catch (e) {
                            return void o({"msg": "onerror handler failed " + e + " @ " + t.src})
                        }
                        o({"msg": "remote script failed " + t.src})
                    }, "onreadystatechange": function () {
                        /^(loaded|complete)$/.test(t.readyState) && r()
                    }
                })
            }, t.prototype._shouldRelease = function (t) {
                var e = /^script$/i.test(t.nodeName);
                return !e || !!(this.options.releaseAsync && t.src && t.hasAttribute("async"))
            }, t
        }();
    e["default"] = g
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {"default": t}
    }

    var o = n(7), i = r(o);
    t.exports = i["default"]
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {"default": t}
    }

    function o(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t) for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e["default"] = t, e
    }

    function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    e.__esModule = !0;
    var a = n(8), u = o(a), c = n(9), l = o(c), s = n(12), d = r(s), f = n(11), p = {
        "comment": /^<!--/,
        "endTag": /^<\//,
        "atomicTag": /^<\s*(script|style|noscript|iframe|textarea)[\s\/>]/i,
        "startTag": /^</,
        "chars": /^[^<]/
    }, h = function () {
        function t() {
            var e = this, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            i(this, t), this.stream = n;
            var o = !1, a = {};
            for (var c in u) u.hasOwnProperty(c) && (r.autoFix && (a[c + "Fix"] = !0), o = o || a[c + "Fix"]);
            o ? (this._readToken = (0, d["default"])(this, a, function () {
                return e._readTokenImpl()
            }), this._peekToken = (0, d["default"])(this, a, function () {
                return e._peekTokenImpl()
            })) : (this._readToken = this._readTokenImpl, this._peekToken = this._peekTokenImpl)
        }

        return t.prototype.append = function (t) {
            this.stream += t
        }, t.prototype.prepend = function (t) {
            this.stream = t + this.stream
        }, t.prototype._readTokenImpl = function () {
            var t = this._peekTokenImpl();
            if (t) return this.stream = this.stream.slice(t.length), t
        }, t.prototype._peekTokenImpl = function () {
            for (var t in p) if (p.hasOwnProperty(t) && p[t].test(this.stream)) {
                var e = l[t](this.stream);
                if (e) return "startTag" === e.type && /script|style/i.test(e.tagName) ? null : (e.text = this.stream.substr(0, e.length), e)
            }
        }, t.prototype.peekToken = function () {
            return this._peekToken()
        }, t.prototype.readToken = function () {
            return this._readToken()
        }, t.prototype.readTokens = function (t) {
            for (var e = void 0; e = this.readToken();) if (t[e.type] && t[e.type](e) === !1) return
        }, t.prototype.clear = function () {
            var t = this.stream;
            return this.stream = "", t
        }, t.prototype.rest = function () {
            return this.stream
        }, t
    }();
    e["default"] = h, h.tokenToString = function (t) {
        return t.toString()
    }, h.escapeAttributes = function (t) {
        var e = {};
        for (var n in t) t.hasOwnProperty(n) && (e[n] = (0, f.escapeQuotes)(t[n], null));
        return e
    }, h.supports = u;
    for (var _ in u) u.hasOwnProperty(_) && (h.browserHasFlaw = h.browserHasFlaw || !u[_] && _)
}, function (t, e) {
    "use strict";
    e.__esModule = !0;
    var n = !1, r = !1, o = window.document.createElement("div");
    try {
        var i = "<P><I></P></I>";
        o.innerHTML = i, e.tagSoup = n = o.innerHTML !== i
    } catch (t) {
        e.tagSoup = n = !1
    }
    try {
        o.innerHTML = "<P><i><P></P></i></P>", e.selfClose = r = 2 === o.childNodes.length
    } catch (t) {
        e.selfClose = r = !1
    }
    o = null, e.tagSoup = n, e.selfClose = r
}, function (t, e, n) {
    "use strict";

    function r(t) {
        var e = t.indexOf("-->");
        if (e >= 0) return new l.CommentToken(t.substr(4, e - 1), e + 3)
    }

    function o(t) {
        var e = t.indexOf("<");
        return new l.CharsToken(e >= 0 ? e : t.length)
    }

    function i(t) {
        var e = t.indexOf(">");
        if (e !== -1) {
            var n = t.match(s.startTag);
            if (n) {
                var r = function () {
                    var t = {}, e = {}, r = n[2];
                    return n[2].replace(s.attr, function (n, o) {
                        arguments[2] || arguments[3] || arguments[4] || arguments[5] ? arguments[5] ? (t[arguments[5]] = "", e[arguments[5]] = !0) : t[o] = arguments[2] || arguments[3] || arguments[4] || s.fillAttr.test(o) && o || "" : t[o] = "", r = r.replace(n, "")
                    }), {"v": new l.StartTagToken(n[1], n[0].length, t, e, !!n[3], r.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""))}
                }();
                if ("object" === ("undefined" == typeof r ? "undefined" : c(r))) return r.v
            }
        }
    }

    function a(t) {
        var e = i(t);
        if (e) {
            var n = t.slice(e.length);
            if (n.match(new RegExp("</\\s*" + e.tagName + "\\s*>", "i"))) {
                var r = n.match(new RegExp("([\\s\\S]*?)</\\s*" + e.tagName + "\\s*>", "i"));
                if (r) return new l.AtomicTagToken(e.tagName, r[0].length + e.length, e.attrs, e.booleanAttrs, r[1])
            }
        }
    }

    function u(t) {
        var e = t.match(s.endTag);
        if (e) return new l.EndTagToken(e[1], e[0].length)
    }

    e.__esModule = !0;
    var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };
    e.comment = r, e.chars = o, e.startTag = i, e.atomicTag = a, e.endTag = u;
    var l = n(10), s = {
        "startTag": /^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=?\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
        "endTag": /^<\/([\-A-Za-z0-9_]+)[^>]*>/,
        "attr": /(?:([\-A-Za-z0-9_]+)\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))|(?:([\-A-Za-z0-9_]+)(\s|$)+)/g,
        "fillAttr": /^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i
    }
}, function (t, e, n) {
    "use strict";

    function r(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    e.__esModule = !0, e.EndTagToken = e.AtomicTagToken = e.StartTagToken = e.TagToken = e.CharsToken = e.CommentToken = e.Token = void 0;
    var o = n(11), i = (e.Token = function t(e, n) {
        r(this, t), this.type = e, this.length = n, this.text = ""
    }, e.CommentToken = function () {
        function t(e, n) {
            r(this, t), this.type = "comment", this.length = n || (e ? e.length : 0), this.text = "", this.content = e
        }

        return t.prototype.toString = function () {
            return "<!--" + this.content
        }, t
    }(), e.CharsToken = function () {
        function t(e) {
            r(this, t), this.type = "chars", this.length = e, this.text = ""
        }

        return t.prototype.toString = function () {
            return this.text
        }, t
    }(), e.TagToken = function () {
        function t(e, n, o, i, a) {
            r(this, t), this.type = e, this.length = o, this.text = "", this.tagName = n, this.attrs = i, this.booleanAttrs = a, this.unary = !1, this.html5Unary = !1
        }

        return t.formatTag = function (t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, n = "<" + t.tagName;
            for (var r in t.attrs) if (t.attrs.hasOwnProperty(r)) {
                n += " " + r;
                var i = t.attrs[r];
                "undefined" != typeof t.booleanAttrs && "undefined" != typeof t.booleanAttrs[r] || (n += '="' + (0, o.escapeQuotes)(i) + '"')
            }
            return t.rest && (n += " " + t.rest), n += t.unary && !t.html5Unary ? "/>" : ">", void 0 !== e && null !== e && (n += e + "</" + t.tagName + ">"), n
        }, t
    }());
    e.StartTagToken = function () {
        function t(e, n, o, i, a, u) {
            r(this, t), this.type = "startTag", this.length = n, this.text = "", this.tagName = e, this.attrs = o, this.booleanAttrs = i, this.html5Unary = !1, this.unary = a, this.rest = u
        }

        return t.prototype.toString = function () {
            return i.formatTag(this)
        }, t
    }(), e.AtomicTagToken = function () {
        function t(e, n, o, i, a) {
            r(this, t), this.type = "atomicTag", this.length = n, this.text = "", this.tagName = e, this.attrs = o, this.booleanAttrs = i, this.unary = !1, this.html5Unary = !1, this.content = a
        }

        return t.prototype.toString = function () {
            return i.formatTag(this, this.content)
        }, t
    }(), e.EndTagToken = function () {
        function t(e, n) {
            r(this, t), this.type = "endTag", this.length = n, this.text = "", this.tagName = e
        }

        return t.prototype.toString = function () {
            return "</" + this.tagName + ">"
        }, t
    }()
}, function (t, e) {
    "use strict";

    function n(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
        return t ? t.replace(/([^"]*)"/g, function (t, e) {
            return /\\/.test(e) ? e + '"' : e + '\\"'
        }) : e
    }

    e.__esModule = !0, e.escapeQuotes = n
}, function (t, e) {
    "use strict";

    function n(t) {
        return t && "startTag" === t.type && (t.unary = u.test(t.tagName) || t.unary, t.html5Unary = !/\/>$/.test(t.text)), t
    }

    function r(t, e) {
        var r = t.stream, o = n(e());
        return t.stream = r, o
    }

    function o(t, e) {
        var n = e.pop();
        t.prepend("</" + n.tagName + ">")
    }

    function i() {
        var t = [];
        return t.last = function () {
            return this[this.length - 1]
        }, t.lastTagNameEq = function (t) {
            var e = this.last();
            return e && e.tagName && e.tagName.toUpperCase() === t.toUpperCase()
        }, t.containsTagName = function (t) {
            for (var e, n = 0; e = this[n]; n++) if (e.tagName === t) return !0;
            return !1
        }, t
    }

    function a(t, e, a) {
        function u() {
            var e = r(t, a);
            e && s[e.type] && s[e.type](e)
        }

        var l = i(), s = {
            "startTag": function (n) {
                var r = n.tagName;
                "TR" === r.toUpperCase() && l.lastTagNameEq("TABLE") ? (t.prepend("<TBODY>"), u()) : e.selfCloseFix && c.test(r) && l.containsTagName(r) ? l.lastTagNameEq(r) ? o(t, l) : (t.prepend("</" + n.tagName + ">"), u()) : n.unary || l.push(n)
            }, "endTag": function (n) {
                var r = l.last();
                r ? e.tagSoupFix && !l.lastTagNameEq(n.tagName) ? o(t, l) : l.pop() : e.tagSoupFix && (a(), u())
            }
        };
        return function () {
            return u(), n(a())
        }
    }

    e.__esModule = !0, e["default"] = a;
    var u = /^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i,
        c = /^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i
}, function (t, e) {
    "use strict";

    function n(t) {
        return void 0 !== t && null !== t
    }

    function r(t) {
        return "function" == typeof t
    }

    function o(t, e, n) {
        var r = void 0, o = t && t.length || 0;
        for (r = 0; r < o; r++) e.call(n, t[r], r)
    }

    function i(t, e, n) {
        for (var r in t) t.hasOwnProperty(r) && e.call(n, r, t[r])
    }

    function a(t, e) {
        return t = t || {}, i(e, function (e, r) {
            n(t[e]) || (t[e] = r)
        }), t
    }

    function u(t) {
        try {
            return Array.prototype.slice.call(t)
        } catch (n) {
            var e = function () {
                var e = [];
                return o(t, function (t) {
                    e.push(t)
                }), {"v": e}
            }();
            if ("object" === ("undefined" == typeof e ? "undefined" : f(e))) return e.v
        }
    }

    function c(t) {
        return t[t.length - 1]
    }

    function l(t, e) {
        return !(!t || "startTag" !== t.type && "atomicTag" !== t.type || !("tagName" in t)) && !!~t.tagName.toLowerCase().indexOf(e)
    }

    function s(t) {
        return l(t, "script")
    }

    function d(t) {
        return l(t, "style")
    }

    e.__esModule = !0;
    var f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };
    e.existy = n, e.isFunction = r, e.each = o, e.eachKey = i, e.defaults = a, e.toArray = u, e.last = c, e.isTag = l, e.isScript = s, e.isStyle = d
}, function (t, e, n) {
    var r, o, i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };
    (function () {
        function n(t) {
            function e(e, n, r, o, i, a) {
                for (; i >= 0 && i < a; i += t) {
                    var u = o ? o[i] : i;
                    r = n(r, e[u], u, e)
                }
                return r
            }

            return function (n, r, o, i) {
                r = S(r, i, 4);
                var a = !D(n) && k.keys(n), u = (a || n).length, c = t > 0 ? 0 : u - 1;
                return arguments.length < 3 && (o = n[a ? a[c] : c], c += t), e(n, r, o, a, c, u)
            }
        }

        function a(t) {
            return function (e, n, r) {
                n = A(n, r);
                for (var o = R(e), i = t > 0 ? 0 : o - 1; i >= 0 && i < o; i += t) if (n(e[i], i, e)) return i;
                return -1
            }
        }

        function u(t, e, n) {
            return function (r, o, i) {
                var a = 0, u = R(r);
                if ("number" == typeof i) t > 0 ? a = i >= 0 ? i : Math.max(i + u, a) : u = i >= 0 ? Math.min(i + 1, u) : i + u + 1; else if (n && i && u) return i = n(r, o), r[i] === o ? i : -1;
                if (o !== o) return i = e(_.call(r, a, u), k.isNaN), i >= 0 ? i + a : -1;
                for (i = t > 0 ? a : u - 1; i >= 0 && i < u; i += t) if (r[i] === o) return i;
                return -1
            }
        }

        function c(t, e) {
            var n = N.length, r = t.constructor, o = k.isFunction(r) && r.prototype || f, i = "constructor";
            for (k.has(t, i) && !k.contains(e, i) && e.push(i); n--;) i = N[n], i in t && t[i] !== o[i] && !k.contains(e, i) && e.push(i)
        }

        var l = this, s = l._, d = Array.prototype, f = Object.prototype, p = Function.prototype, h = d.push,
            _ = d.slice, m = f.toString, g = f.hasOwnProperty, y = Array.isArray, v = Object.keys, w = p.bind,
            b = Object.create, x = function () {
            }, k = function t(e) {
                return e instanceof t ? e : this instanceof t ? void(this._wrapped = e) : new t(e)
            };
        "undefined" != typeof t && t.exports && (e = t.exports = k), e._ = k, k.VERSION = "1.8.3";
        var S = function (t, e, n) {
            if (void 0 === e) return t;
            switch (null == n ? 3 : n) {
                case 1:
                    return function (n) {
                        return t.call(e, n)
                    };
                case 2:
                    return function (n, r) {
                        return t.call(e, n, r)
                    };
                case 3:
                    return function (n, r, o) {
                        return t.call(e, n, r, o)
                    };
                case 4:
                    return function (n, r, o, i) {
                        return t.call(e, n, r, o, i)
                    }
            }
            return function () {
                return t.apply(e, arguments)
            }
        }, A = function (t, e, n) {
            return null == t ? k.identity : k.isFunction(t) ? S(t, e, n) : k.isObject(t) ? k.matcher(t) : k.property(t)
        };
        k.iteratee = function (t, e) {
            return A(t, e, 1 / 0)
        };
        var T = function (t, e) {
            return function (n) {
                var r = arguments.length;
                if (r < 2 || null == n) return n;
                for (var o = 1; o < r; o++) for (var i = arguments[o], a = t(i), u = a.length, c = 0; c < u; c++) {
                    var l = a[c];
                    e && void 0 !== n[l] || (n[l] = i[l])
                }
                return n
            }
        }, z = function (t) {
            if (!k.isObject(t)) return {};
            if (b) return b(t);
            x.prototype = t;
            var e = new x;
            return x.prototype = null, e
        }, j = function (t) {
            return function (e) {
                return null == e ? void 0 : e[t]
            }
        }, E = Math.pow(2, 53) - 1, R = j("length"), D = function (t) {
            var e = R(t);
            return "number" == typeof e && e >= 0 && e <= E
        };
        k.each = k.forEach = function (t, e, n) {
            e = S(e, n);
            var r, o;
            if (D(t)) for (r = 0, o = t.length; r < o; r++) e(t[r], r, t); else {
                var i = k.keys(t);
                for (r = 0, o = i.length; r < o; r++) e(t[i[r]], i[r], t)
            }
            return t
        }, k.map = k.collect = function (t, e, n) {
            e = A(e, n);
            for (var r = !D(t) && k.keys(t), o = (r || t).length, i = Array(o), a = 0; a < o; a++) {
                var u = r ? r[a] : a;
                i[a] = e(t[u], u, t)
            }
            return i
        }, k.reduce = k.foldl = k.inject = n(1), k.reduceRight = k.foldr = n(-1), k.find = k.detect = function (t, e, n) {
            var r;
            if (r = D(t) ? k.findIndex(t, e, n) : k.findKey(t, e, n), void 0 !== r && r !== -1) return t[r]
        }, k.filter = k.select = function (t, e, n) {
            var r = [];
            return e = A(e, n), k.each(t, function (t, n, o) {
                e(t, n, o) && r.push(t)
            }), r
        }, k.reject = function (t, e, n) {
            return k.filter(t, k.negate(A(e)), n)
        }, k.every = k.all = function (t, e, n) {
            e = A(e, n);
            for (var r = !D(t) && k.keys(t), o = (r || t).length, i = 0; i < o; i++) {
                var a = r ? r[i] : i;
                if (!e(t[a], a, t)) return !1
            }
            return !0
        }, k.some = k.any = function (t, e, n) {
            e = A(e, n);
            for (var r = !D(t) && k.keys(t), o = (r || t).length, i = 0; i < o; i++) {
                var a = r ? r[i] : i;
                if (e(t[a], a, t)) return !0
            }
            return !1
        }, k.contains = k.includes = k.include = function (t, e, n, r) {
            return D(t) || (t = k.values(t)), ("number" != typeof n || r) && (n = 0), k.indexOf(t, e, n) >= 0
        }, k.invoke = function (t, e) {
            var n = _.call(arguments, 2), r = k.isFunction(e);
            return k.map(t, function (t) {
                var o = r ? e : t[e];
                return null == o ? o : o.apply(t, n)
            })
        }, k.pluck = function (t, e) {
            return k.map(t, k.property(e))
        }, k.where = function (t, e) {
            return k.filter(t, k.matcher(e))
        }, k.findWhere = function (t, e) {
            return k.find(t, k.matcher(e))
        }, k.max = function (t, e, n) {
            var r, o, i = -(1 / 0), a = -(1 / 0);
            if (null == e && null != t) {
                t = D(t) ? t : k.values(t);
                for (var u = 0, c = t.length; u < c; u++) r = t[u], r > i && (i = r)
            } else e = A(e, n), k.each(t, function (t, n, r) {
                o = e(t, n, r), (o > a || o === -(1 / 0) && i === -(1 / 0)) && (i = t, a = o)
            });
            return i
        }, k.min = function (t, e, n) {
            var r, o, i = 1 / 0, a = 1 / 0;
            if (null == e && null != t) {
                t = D(t) ? t : k.values(t);
                for (var u = 0, c = t.length; u < c; u++) r = t[u], r < i && (i = r)
            } else e = A(e, n), k.each(t, function (t, n, r) {
                o = e(t, n, r), (o < a || o === 1 / 0 && i === 1 / 0) && (i = t, a = o)
            });
            return i
        }, k.shuffle = function (t) {
            for (var e, n = D(t) ? t : k.values(t), r = n.length, o = Array(r), i = 0; i < r; i++) e = k.random(0, i), e !== i && (o[i] = o[e]), o[e] = n[i];
            return o
        }, k.sample = function (t, e, n) {
            return null == e || n ? (D(t) || (t = k.values(t)), t[k.random(t.length - 1)]) : k.shuffle(t).slice(0, Math.max(0, e))
        }, k.sortBy = function (t, e, n) {
            return e = A(e, n), k.pluck(k.map(t, function (t, n, r) {
                return {"value": t, "index": n, "criteria": e(t, n, r)}
            }).sort(function (t, e) {
                var n = t.criteria, r = e.criteria;
                if (n !== r) {
                    if (n > r || void 0 === n) return 1;
                    if (n < r || void 0 === r) return -1
                }
                return t.index - e.index
            }), "value")
        };
        var C = function (t) {
            return function (e, n, r) {
                var o = {};
                return n = A(n, r), k.each(e, function (r, i) {
                    var a = n(r, i, e);
                    t(o, r, a)
                }), o
            }
        };
        k.groupBy = C(function (t, e, n) {
            k.has(t, n) ? t[n].push(e) : t[n] = [e]
        }), k.indexBy = C(function (t, e, n) {
            t[n] = e
        }), k.countBy = C(function (t, e, n) {
            k.has(t, n) ? t[n]++ : t[n] = 1
        }), k.toArray = function (t) {
            return t ? k.isArray(t) ? _.call(t) : D(t) ? k.map(t, k.identity) : k.values(t) : []
        }, k.size = function (t) {
            return null == t ? 0 : D(t) ? t.length : k.keys(t).length
        }, k.partition = function (t, e, n) {
            e = A(e, n);
            var r = [], o = [];
            return k.each(t, function (t, n, i) {
                (e(t, n, i) ? r : o).push(t)
            }), [r, o]
        }, k.first = k.head = k.take = function (t, e, n) {
            if (null != t) return null == e || n ? t[0] : k.initial(t, t.length - e)
        }, k.initial = function (t, e, n) {
            return _.call(t, 0, Math.max(0, t.length - (null == e || n ? 1 : e)))
        }, k.last = function (t, e, n) {
            if (null != t) return null == e || n ? t[t.length - 1] : k.rest(t, Math.max(0, t.length - e))
        }, k.rest = k.tail = k.drop = function (t, e, n) {
            return _.call(t, null == e || n ? 1 : e)
        }, k.compact = function (t) {
            return k.filter(t, k.identity)
        };
        var M = function t(e, n, r, o) {
            for (var i = [], a = 0, u = o || 0, c = R(e); u < c; u++) {
                var l = e[u];
                if (D(l) && (k.isArray(l) || k.isArguments(l))) {
                    n || (l = t(l, n, r));
                    var s = 0, d = l.length;
                    for (i.length += d; s < d;) i[a++] = l[s++]
                } else r || (i[a++] = l)
            }
            return i
        };
        k.flatten = function (t, e) {
            return M(t, e, !1)
        }, k.without = function (t) {
            return k.difference(t, _.call(arguments, 1))
        }, k.uniq = k.unique = function (t, e, n, r) {
            k.isBoolean(e) || (r = n, n = e, e = !1), null != n && (n = A(n, r));
            for (var o = [], i = [], a = 0, u = R(t); a < u; a++) {
                var c = t[a], l = n ? n(c, a, t) : c;
                e ? (a && i === l || o.push(c), i = l) : n ? k.contains(i, l) || (i.push(l), o.push(c)) : k.contains(o, c) || o.push(c)
            }
            return o
        }, k.union = function () {
            return k.uniq(M(arguments, !0, !0))
        }, k.intersection = function (t) {
            for (var e = [], n = arguments.length, r = 0, o = R(t); r < o; r++) {
                var i = t[r];
                if (!k.contains(e, i)) {
                    for (var a = 1; a < n && k.contains(arguments[a], i); a++) ;
                    a === n && e.push(i)
                }
            }
            return e
        }, k.difference = function (t) {
            var e = M(arguments, !0, !0, 1);
            return k.filter(t, function (t) {
                return !k.contains(e, t)
            })
        }, k.zip = function () {
            return k.unzip(arguments)
        }, k.unzip = function (t) {
            for (var e = t && k.max(t, R).length || 0, n = Array(e), r = 0; r < e; r++) n[r] = k.pluck(t, r);
            return n
        }, k.object = function (t, e) {
            for (var n = {}, r = 0, o = R(t); r < o; r++) e ? n[t[r]] = e[r] : n[t[r][0]] = t[r][1];
            return n
        }, k.findIndex = a(1), k.findLastIndex = a(-1), k.sortedIndex = function (t, e, n, r) {
            n = A(n, r, 1);
            for (var o = n(e), i = 0, a = R(t); i < a;) {
                var u = Math.floor((i + a) / 2);
                n(t[u]) < o ? i = u + 1 : a = u
            }
            return i
        }, k.indexOf = u(1, k.findIndex, k.sortedIndex), k.lastIndexOf = u(-1, k.findLastIndex), k.range = function (t, e, n) {
            null == e && (e = t || 0, t = 0), n = n || 1;
            for (var r = Math.max(Math.ceil((e - t) / n), 0), o = Array(r), i = 0; i < r; i++, t += n) o[i] = t;
            return o
        };
        var q = function (t, e, n, r, o) {
            if (!(r instanceof e)) return t.apply(n, o);
            var i = z(t.prototype), a = t.apply(i, o);
            return k.isObject(a) ? a : i
        };
        k.bind = function (t, e) {
            if (w && t.bind === w) return w.apply(t, _.call(arguments, 1));
            if (!k.isFunction(t)) throw new TypeError("Bind must be called on a function");
            var n = _.call(arguments, 2), r = function r() {
                return q(t, r, e, this, n.concat(_.call(arguments)))
            };
            return r
        }, k.partial = function (t) {
            var e = _.call(arguments, 1), n = function n() {
                for (var r = 0, o = e.length, i = Array(o), a = 0; a < o; a++) i[a] = e[a] === k ? arguments[r++] : e[a];
                for (; r < arguments.length;) i.push(arguments[r++]);
                return q(t, n, this, this, i)
            };
            return n
        }, k.bindAll = function (t) {
            var e, n, r = arguments.length;
            if (r <= 1) throw new Error("bindAll must be passed function names");
            for (e = 1; e < r; e++) n = arguments[e], t[n] = k.bind(t[n], t);
            return t
        }, k.memoize = function (t, e) {
            var n = function n(r) {
                var o = n.cache, i = "" + (e ? e.apply(this, arguments) : r);
                return k.has(o, i) || (o[i] = t.apply(this, arguments)), o[i]
            };
            return n.cache = {}, n
        }, k.delay = function (t, e) {
            var n = _.call(arguments, 2);
            return setTimeout(function () {
                return t.apply(null, n)
            }, e)
        }, k.defer = k.partial(k.delay, k, 1), k.throttle = function (t, e, n) {
            var r, o, i, a = null, u = 0;
            n || (n = {});
            var c = function () {
                u = n.leading === !1 ? 0 : k.now(), a = null, i = t.apply(r, o), a || (r = o = null)
            };
            return function () {
                var l = k.now();
                u || n.leading !== !1 || (u = l);
                var s = e - (l - u);
                return r = this, o = arguments, s <= 0 || s > e ? (a && (clearTimeout(a), a = null), u = l, i = t.apply(r, o), a || (r = o = null)) : a || n.trailing === !1 || (a = setTimeout(c, s)), i
            }
        }, k.debounce = function (t, e, n) {
            var r, o, i, a, u, c = function c() {
                var l = k.now() - a;
                l < e && l >= 0 ? r = setTimeout(c, e - l) : (r = null, n || (u = t.apply(i, o), r || (i = o = null)))
            };
            return function () {
                i = this, o = arguments, a = k.now();
                var l = n && !r;
                return r || (r = setTimeout(c, e)), l && (u = t.apply(i, o), i = o = null), u
            }
        }, k.wrap = function (t, e) {
            return k.partial(e, t)
        }, k.negate = function (t) {
            return function () {
                return !t.apply(this, arguments)
            }
        }, k.compose = function () {
            var t = arguments, e = t.length - 1;
            return function () {
                for (var n = e, r = t[e].apply(this, arguments); n--;) r = t[n].call(this, r);
                return r
            }
        }, k.after = function (t, e) {
            return function () {
                if (--t < 1) return e.apply(this, arguments)
            }
        }, k.before = function (t, e) {
            var n;
            return function () {
                return --t > 0 && (n = e.apply(this, arguments)), t <= 1 && (e = null), n
            }
        }, k.once = k.partial(k.before, 2);
        var O = !{"toString": null}.propertyIsEnumerable("toString"),
            N = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
        k.keys = function (t) {
            if (!k.isObject(t)) return [];
            if (v) return v(t);
            var e = [];
            for (var n in t) k.has(t, n) && e.push(n);
            return O && c(t, e), e
        }, k.allKeys = function (t) {
            if (!k.isObject(t)) return [];
            var e = [];
            for (var n in t) e.push(n);
            return O && c(t, e), e
        }, k.values = function (t) {
            for (var e = k.keys(t), n = e.length, r = Array(n), o = 0; o < n; o++) r[o] = t[e[o]];
            return r
        }, k.mapObject = function (t, e, n) {
            e = A(e, n);
            for (var r, o = k.keys(t), i = o.length, a = {}, u = 0; u < i; u++) r = o[u], a[r] = e(t[r], r, t);
            return a
        }, k.pairs = function (t) {
            for (var e = k.keys(t), n = e.length, r = Array(n), o = 0; o < n; o++) r[o] = [e[o], t[e[o]]];
            return r
        }, k.invert = function (t) {
            for (var e = {}, n = k.keys(t), r = 0, o = n.length; r < o; r++) e[t[n[r]]] = n[r];
            return e
        }, k.functions = k.methods = function (t) {
            var e = [];
            for (var n in t) k.isFunction(t[n]) && e.push(n);
            return e.sort()
        }, k.extend = T(k.allKeys), k.extendOwn = k.assign = T(k.keys), k.findKey = function (t, e, n) {
            e = A(e, n);
            for (var r, o = k.keys(t), i = 0, a = o.length; i < a; i++) if (r = o[i], e(t[r], r, t)) return r
        }, k.pick = function (t, e, n) {
            var r, o, i = {}, a = t;
            if (null == a) return i;
            k.isFunction(e) ? (o = k.allKeys(a), r = S(e, n)) : (o = M(arguments, !1, !1, 1), r = function (t, e, n) {
                return e in n
            }, a = Object(a));
            for (var u = 0, c = o.length; u < c; u++) {
                var l = o[u], s = a[l];
                r(s, l, a) && (i[l] = s)
            }
            return i
        }, k.omit = function (t, e, n) {
            if (k.isFunction(e)) e = k.negate(e); else {
                var r = k.map(M(arguments, !1, !1, 1), String);
                e = function (t, e) {
                    return !k.contains(r, e)
                }
            }
            return k.pick(t, e, n)
        }, k.defaults = T(k.allKeys, !0), k.create = function (t, e) {
            var n = z(t);
            return e && k.extendOwn(n, e), n
        }, k.clone = function (t) {
            return k.isObject(t) ? k.isArray(t) ? t.slice() : k.extend({}, t) : t
        }, k.tap = function (t, e) {
            return e(t), t
        }, k.isMatch = function (t, e) {
            var n = k.keys(e), r = n.length;
            if (null == t) return !r;
            for (var o = Object(t), i = 0; i < r; i++) {
                var a = n[i];
                if (e[a] !== o[a] || !(a in o)) return !1
            }
            return !0
        };
        var H = function t(e, n, r, o) {
            if (e === n) return 0 !== e || 1 / e === 1 / n;
            if (null == e || null == n) return e === n;
            e instanceof k && (e = e._wrapped), n instanceof k && (n = n._wrapped);
            var a = m.call(e);
            if (a !== m.call(n)) return !1;
            switch (a) {
                case"[object RegExp]":
                case"[object String]":
                    return "" + e == "" + n;
                case"[object Number]":
                    return +e !== +e ? +n !== +n : 0 === +e ? 1 / +e === 1 / n : +e === +n;
                case"[object Date]":
                case"[object Boolean]":
                    return +e === +n
            }
            var u = "[object Array]" === a;
            if (!u) {
                if ("object" != ("undefined" == typeof e ? "undefined" : i(e)) || "object" != ("undefined" == typeof n ? "undefined" : i(n))) return !1;
                var c = e.constructor, l = n.constructor;
                if (c !== l && !(k.isFunction(c) && c instanceof c && k.isFunction(l) && l instanceof l) && "constructor" in e && "constructor" in n) return !1
            }
            r = r || [], o = o || [];
            for (var s = r.length; s--;) if (r[s] === e) return o[s] === n;
            if (r.push(e), o.push(n), u) {
                if (s = e.length, s !== n.length) return !1;
                for (; s--;) if (!t(e[s], n[s], r, o)) return !1
            } else {
                var d, f = k.keys(e);
                if (s = f.length, k.keys(n).length !== s) return !1;
                for (; s--;) if (d = f[s], !k.has(n, d) || !t(e[d], n[d], r, o)) return !1
            }
            return r.pop(), o.pop(), !0
        };
        k.isEqual = function (t, e) {
            return H(t, e)
        }, k.isEmpty = function (t) {
            return null == t || (D(t) && (k.isArray(t) || k.isString(t) || k.isArguments(t)) ? 0 === t.length : 0 === k.keys(t).length)
        }, k.isElement = function (t) {
            return !(!t || 1 !== t.nodeType)
        }, k.isArray = y || function (t) {
            return "[object Array]" === m.call(t)
        }, k.isObject = function (t) {
            var e = "undefined" == typeof t ? "undefined" : i(t);
            return "function" === e || "object" === e && !!t
        }, k.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function (t) {
            k["is" + t] = function (e) {
                return m.call(e) === "[object " + t + "]"
            }
        }), k.isArguments(arguments) || (k.isArguments = function (t) {
            return k.has(t, "callee")
        }), "function" != typeof/./ && "object" != ("undefined" == typeof Int8Array ? "undefined" : i(Int8Array)) && (k.isFunction = function (t) {
            return "function" == typeof t || !1
        }), k.isFinite = function (t) {
            return isFinite(t) && !isNaN(parseFloat(t))
        }, k.isNaN = function (t) {
            return k.isNumber(t) && t !== +t
        }, k.isBoolean = function (t) {
            return t === !0 || t === !1 || "[object Boolean]" === m.call(t)
        }, k.isNull = function (t) {
            return null === t
        }, k.isUndefined = function (t) {
            return void 0 === t
        }, k.has = function (t, e) {
            return null != t && g.call(t, e)
        }, k.noConflict = function () {
            return l._ = s, this
        }, k.identity = function (t) {
            return t
        }, k.constant = function (t) {
            return function () {
                return t
            }
        }, k.noop = function () {
        }, k.property = j, k.propertyOf = function (t) {
            return null == t ? function () {
            } : function (e) {
                return t[e]
            }
        }, k.matcher = k.matches = function (t) {
            return t = k.extendOwn({}, t), function (e) {
                return k.isMatch(e, t)
            }
        }, k.times = function (t, e, n) {
            var r = Array(Math.max(0, t));
            e = S(e, n, 1);
            for (var o = 0; o < t; o++) r[o] = e(o);
            return r
        }, k.random = function (t, e) {
            return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1))
        }, k.now = Date.now || function () {
            return (new Date).getTime()
        };
        var I = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;"}, P = k.invert(I),
            F = function (t) {
                var e = function (e) {
                    return t[e]
                }, n = "(?:" + k.keys(t).join("|") + ")", r = RegExp(n), o = RegExp(n, "g");
                return function (t) {
                    return t = null == t ? "" : "" + t, r.test(t) ? t.replace(o, e) : t
                }
            };
        k.escape = F(I), k.unescape = F(P), k.result = function (t, e, n) {
            var r = null == t ? void 0 : t[e];
            return void 0 === r && (r = n), k.isFunction(r) ? r.call(t) : r
        };
        var B = 0;
        k.uniqueId = function (t) {
            var e = ++B + "";
            return t ? t + e : e
        }, k.templateSettings = {
            "evaluate": /<%([\s\S]+?)%>/g,
            "interpolate": /<%=([\s\S]+?)%>/g,
            "escape": /<%-([\s\S]+?)%>/g
        };
        var L = /(.)^/, $ = {"'": "'", "\\": "\\", "\r": "r", "\n": "n", "\u2028": "u2028", "\u2029": "u2029"},
            W = /\\|'|\r|\n|\u2028|\u2029/g, J = function (t) {
                return "\\" + $[t]
            };
        k.template = function (t, e, n) {
            !e && n && (e = n), e = k.defaults({}, e, k.templateSettings);
            var r = RegExp([(e.escape || L).source, (e.interpolate || L).source, (e.evaluate || L).source].join("|") + "|$", "g"),
                o = 0, i = "__p+='";
            t.replace(r, function (e, n, r, a, u) {
                return i += t.slice(o, u).replace(W, J), o = u + e.length, n ? i += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : r ? i += "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : a && (i += "';\n" + a + "\n__p+='"), e
            }), i += "';\n", e.variable || (i = "with(obj||{}){\n" + i + "}\n"), i = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";
            try {
                var a = new Function(e.variable || "obj", "_", i)
            } catch (t) {
                throw t.source = i, t
            }
            var u = function (t) {
                return a.call(this, t, k)
            }, c = e.variable || "obj";
            return u.source = "function(" + c + "){\n" + i + "}", u
        }, k.chain = function (t) {
            var e = k(t);
            return e._chain = !0, e
        };
        var U = function (t, e) {
            return t._chain ? k(e).chain() : e
        };
        k.mixin = function (t) {
            k.each(k.functions(t), function (e) {
                var n = k[e] = t[e];
                k.prototype[e] = function () {
                    var t = [this._wrapped];
                    return h.apply(t, arguments), U(this, n.apply(k, t))
                }
            })
        }, k.mixin(k), k.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (t) {
            var e = d[t];
            k.prototype[t] = function () {
                var n = this._wrapped;
                return e.apply(n, arguments), "shift" !== t && "splice" !== t || 0 !== n.length || delete n[0], U(this, n)
            }
        }), k.each(["concat", "join", "slice"], function (t) {
            var e = d[t];
            k.prototype[t] = function () {
                return U(this, e.apply(this._wrapped, arguments))
            }
        }), k.prototype.value = function () {
            return this._wrapped
        }, k.prototype.valueOf = k.prototype.toJSON = k.prototype.value, k.prototype.toString = function () {
            return "" + this._wrapped
        }, r = [], o = function () {
            return k
        }.apply(e, r), !(void 0 !== o && (t.exports = o))
    }).call(void 0)
}, function (module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__,
        _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        };
    !function (t, e, n) {
        "undefined" != typeof module && module.exports ? module.exports = n() : (__WEBPACK_AMD_DEFINE_FACTORY__ = n, __WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof __WEBPACK_AMD_DEFINE_FACTORY__ ? __WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module) : __WEBPACK_AMD_DEFINE_FACTORY__, !(void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)))
    }("reqwest", void 0, function () {
        function succeed(t) {
            var e = protocolRe.exec(t.url);
            return e = e && e[1] || context.location.protocol, httpsRe.test(e) ? twoHundo.test(t.request.status) : !!t.request.response
        }

        function handleReadyState(t, e, n) {
            return function () {
                return t._aborted ? n(t.request) : t._timedOut ? n(t.request, "Request is aborted: timeout") : void(t.request && 4 == t.request[readyState] && (t.request.onreadystatechange = noop, succeed(t) ? e(t.request) : n(t.request)))
            }
        }

        function setHeaders(t, e) {
            var n, r = e["headers"] || {};
            r["Accept"] = r["Accept"] || defaultHeaders["accept"][e["type"]] || defaultHeaders["accept"]["*"];
            var o = "undefined" != typeof FormData && e["data"] instanceof FormData;
            e["crossOrigin"] || r[requestedWith] || (r[requestedWith] = defaultHeaders["requestedWith"]), r[contentType] || o || (r[contentType] = e["contentType"] || defaultHeaders["contentType"]);
            for (n in r) r.hasOwnProperty(n) && "setRequestHeader" in t && t.setRequestHeader(n, r[n])
        }

        function setCredentials(t, e) {
            "undefined" != typeof e["withCredentials"] && "undefined" != typeof t.withCredentials && (t.withCredentials = !!e["withCredentials"])
        }

        function generalCallback(t) {
            lastValue = t
        }

        function urlappend(t, e) {
            return t + (/\?/.test(t) ? "&" : "?") + e
        }

        function handleJsonp(t, e, n, r) {
            var o = uniqid++, i = t["jsonpCallback"] || "callback",
                a = t["jsonpCallbackName"] || reqwest.getcallbackPrefix(o),
                u = new RegExp("((^|\\?|&)" + i + ")=([^&]+)"), c = r.match(u), l = doc.createElement("script"), s = 0,
                d = navigator.userAgent.indexOf("MSIE 10.0") !== -1;
            return c ? "?" === c[3] ? r = r.replace(u, "$1=" + a) : a = c[3] : r = urlappend(r, i + "=" + a), context[a] = generalCallback, l.type = "text/javascript", l.src = r, l.async = !0, "undefined" == typeof l.onreadystatechange || d || (l.htmlFor = l.id = "_reqwest_" + o), l.onload = l.onreadystatechange = function () {
                return !(l[readyState] && "complete" !== l[readyState] && "loaded" !== l[readyState] || s) && (l.onload = l.onreadystatechange = null, l.onclick && l.onclick(), e(lastValue), lastValue = void 0, head.removeChild(l), void(s = 1))
            }, head.appendChild(l), {
                "abort": function () {
                    l.onload = l.onreadystatechange = null, n({}, "Request is aborted: timeout", {}), lastValue = void 0, head.removeChild(l), s = 1
                }
            }
        }

        function getRequest(t, e) {
            var n, r = this.o, o = (r["method"] || "GET").toUpperCase(), i = "string" == typeof r ? r : r["url"],
                a = r["processData"] !== !1 && r["data"] && "string" != typeof r["data"] ? reqwest.toQueryString(r["data"]) : r["data"] || null,
                u = !1;
            return "jsonp" != r["type"] && "GET" != o || !a || (i = urlappend(i, a), a = null), "jsonp" == r["type"] ? handleJsonp(r, t, e, i) : (n = r.xhr && r.xhr(r) || xhr(r), n.open(o, i, r["async"] !== !1), setHeaders(n, r), setCredentials(n, r), context[xDomainRequest] && n instanceof context[xDomainRequest] ? (n.onload = t, n.onerror = e, n.onprogress = function () {
            }, u = !0) : n.onreadystatechange = handleReadyState(this, t, e), r["before"] && r["before"](n), u ? setTimeout(function () {
                n.send(a)
            }, 200) : n.send(a), n)
        }

        function Reqwest(t, e) {
            this.o = t, this.fn = e, init.apply(this, arguments)
        }

        function setType(t) {
            if (null !== t) return t.match("json") ? "json" : t.match("javascript") ? "js" : t.match("text") ? "html" : t.match("xml") ? "xml" : void 0
        }

        function init(o, fn) {
            function complete(t) {
                for (o["timeout"] && clearTimeout(self.timeout), self.timeout = null; self._completeHandlers.length > 0;) self._completeHandlers.shift()(t)
            }

            function success(resp) {
                var type = o["type"] || resp && setType(resp.getResponseHeader("Content-Type"));
                resp = "jsonp" !== type ? self.request : resp;
                var filteredResponse = globalSetupOptions.dataFilter(resp.responseText, type), r = filteredResponse;
                try {
                    resp.responseText = r
                } catch (t) {
                }
                if (r) switch (type) {
                    case"json":
                        try {
                            resp = context.JSON ? context.JSON.parse(r) : eval("(" + r + ")")
                        } catch (t) {
                            return error(resp, "Could not parse JSON in response", t)
                        }
                        break;
                    case"js":
                        resp = eval(r);
                        break;
                    case"html":
                        resp = r;
                        break;
                    case"xml":
                        resp = resp.responseXML && resp.responseXML.parseError && resp.responseXML.parseError.errorCode && resp.responseXML.parseError.reason ? null : resp.responseXML
                }
                for (self._responseArgs.resp = resp, self._fulfilled = !0, fn(resp), self._successHandler(resp); self._fulfillmentHandlers.length > 0;) resp = self._fulfillmentHandlers.shift()(resp);
                complete(resp)
            }

            function timedOut() {
                self._timedOut = !0, self.request.abort()
            }

            function error(t, e, n) {
                for (t = self.request, self._responseArgs.resp = t, self._responseArgs.msg = e, self._responseArgs.t = n, self._erred = !0; self._errorHandlers.length > 0;) self._errorHandlers.shift()(t, e, n);
                complete(t)
            }

            this.url = "string" == typeof o ? o : o["url"], this.timeout = null, this._fulfilled = !1, this._successHandler = function () {
            }, this._fulfillmentHandlers = [], this._errorHandlers = [], this._completeHandlers = [], this._erred = !1, this._responseArgs = {};
            var self = this;
            fn = fn || function () {
            }, o["timeout"] && (this.timeout = setTimeout(function () {
                timedOut()
            }, o["timeout"])), o["success"] && (this._successHandler = function () {
                o["success"].apply(o, arguments)
            }), o["error"] && this._errorHandlers.push(function () {
                o["error"].apply(o, arguments)
            }), o["complete"] && this._completeHandlers.push(function () {
                o["complete"].apply(o, arguments)
            }), this.request = getRequest.call(this, success, error)
        }

        function reqwest(t, e) {
            return new Reqwest(t, e)
        }

        function normalize(t) {
            return t ? t.replace(/\r?\n/g, "\r\n") : ""
        }

        function serial(t, e) {
            var n, r, o, i, a = t.name, u = t.tagName.toLowerCase(), c = function (t) {
                t && !t["disabled"] && e(a, normalize(t["attributes"]["value"] && t["attributes"]["value"]["specified"] ? t["value"] : t["text"]))
            };
            if (!t.disabled && a) switch (u) {
                case"input":
                    /reset|button|image|file/i.test(t.type) || (n = /checkbox/i.test(t.type), r = /radio/i.test(t.type), o = t.value, (!(n || r) || t.checked) && e(a, normalize(n && "" === o ? "on" : o)));
                    break;
                case"textarea":
                    e(a, normalize(t.value));
                    break;
                case"select":
                    if ("select-one" === t.type.toLowerCase()) c(t.selectedIndex >= 0 ? t.options[t.selectedIndex] : null); else for (i = 0; t.length && i < t.length; i++) t.options[i].selected && c(t.options[i])
            }
        }

        function eachFormElement() {
            var t, e, n = this, r = function (t, e) {
                var r, o, i;
                for (r = 0; r < e.length; r++) for (i = t[byTag](e[r]), o = 0; o < i.length; o++) serial(i[o], n)
            };
            for (e = 0; e < arguments.length; e++) t = arguments[e], /input|select|textarea/i.test(t.tagName) && serial(t, n), r(t, ["input", "select", "textarea"])
        }

        function serializeQueryString() {
            return reqwest.toQueryString(reqwest.serializeArray.apply(null, arguments))
        }

        function serializeHash() {
            var t = {};
            return eachFormElement.apply(function (e, n) {
                e in t ? (t[e] && !isArray(t[e]) && (t[e] = [t[e]]), t[e].push(n)) : t[e] = n
            }, arguments), t
        }

        function buildParams(t, e, n, r) {
            var o, i, a, u = /\[\]$/;
            if (isArray(e)) for (i = 0; e && i < e.length; i++) a = e[i], n || u.test(t) ? r(t, a) : buildParams(t + "[" + ("object" === ("undefined" == typeof a ? "undefined" : _typeof(a)) ? i : "") + "]", a, n, r); else if (e && "[object Object]" === e.toString()) for (o in e) buildParams(t + "[" + o + "]", e[o], n, r); else r(t, e)
        }

        var context = this;
        if ("window" in context) var doc = document, byTag = "getElementsByTagName",
            head = doc[byTag]("head")[0]; else {
            var XHR2;
            try {
                XHR2 = __webpack_require__(16)
            } catch (t) {
                throw new Error("Peer dependency `xhr2` required! Please npm install xhr2")
            }
        }
        var httpsRe = /^http/, protocolRe = /(^\w+):\/\//, twoHundo = /^(20\d|1223)$/, readyState = "readyState",
            contentType = "Content-Type", requestedWith = "X-Requested-With", uniqid = 0,
            callbackPrefix = "reqwest_" + +new Date, lastValue, xmlHttpRequest = "XMLHttpRequest",
            xDomainRequest = "XDomainRequest", noop = function () {
            }, isArray = "function" == typeof Array.isArray ? Array.isArray : function (t) {
                return t instanceof Array
            }, defaultHeaders = {
                "contentType": "application/x-www-form-urlencoded",
                "requestedWith": xmlHttpRequest,
                "accept": {
                    "*": "text/javascript, text/html, application/xml, text/xml, */*",
                    "xml": "application/xml, text/xml",
                    "html": "text/html",
                    "text": "text/plain",
                    "json": "application/json, text/javascript",
                    "js": "application/javascript, text/javascript"
                }
            }, xhr = function t(e) {
                if (e["crossOrigin"] === !0) {
                    var t = context[xmlHttpRequest] ? new XMLHttpRequest : null;
                    if (t && "withCredentials" in t) return t;
                    if (context[xDomainRequest]) return new XDomainRequest;
                    throw new Error("Browser does not support cross-origin requests")
                }
                return context[xmlHttpRequest] ? new XMLHttpRequest : XHR2 ? new XHR2 : new ActiveXObject("Microsoft.XMLHTTP")
            }, globalSetupOptions = {
                "dataFilter": function (t) {
                    return t
                }
            };
        return Reqwest.prototype = {
            "abort": function () {
                this._aborted = !0, this.request.abort()
            }, "retry": function () {
                init.call(this, this.o, this.fn)
            }, "then": function (t, e) {
                return t = t || function () {
                }, e = e || function () {
                }, this._fulfilled ? this._responseArgs.resp = t(this._responseArgs.resp) : this._erred ? e(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t) : (this._fulfillmentHandlers.push(t), this._errorHandlers.push(e)), this
            }, "always": function (t) {
                return this._fulfilled || this._erred ? t(this._responseArgs.resp) : this._completeHandlers.push(t), this
            }, "fail": function (t) {
                return this._erred ? t(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t) : this._errorHandlers.push(t), this
            }, "catch": function (t) {
                return this.fail(t)
            }
        }, reqwest.serializeArray = function () {
            var t = [];
            return eachFormElement.apply(function (e, n) {
                t.push({"name": e, "value": n})
            }, arguments), t
        }, reqwest.serialize = function () {
            if (0 === arguments.length) return "";
            var t, e, n = Array.prototype.slice.call(arguments, 0);
            return t = n.pop(), t && t.nodeType && n.push(t) && (t = null), t && (t = t.type), e = "map" == t ? serializeHash : "array" == t ? reqwest.serializeArray : serializeQueryString, e.apply(null, n)
        }, reqwest.toQueryString = function (t, e) {
            var n, r, o = e || !1, i = [], a = encodeURIComponent, u = function (t, e) {
                e = "function" == typeof e ? e() : null == e ? "" : e, i[i.length] = a(t) + "=" + a(e)
            };
            if (isArray(t)) for (r = 0; t && r < t.length; r++) u(t[r]["name"], t[r]["value"]); else for (n in t) t.hasOwnProperty(n) && buildParams(n, t[n], o, u);
            return i.join("&").replace(/%20/g, "+")
        }, reqwest.getcallbackPrefix = function () {
            return callbackPrefix
        }, reqwest.compat = function (t, e) {
            return t && (t["type"] && (t["method"] = t["type"]) && delete t["type"], t["dataType"] && (t["type"] = t["dataType"]), t["jsonpCallback"] && (t["jsonpCallbackName"] = t["jsonpCallback"]) && delete t["jsonpCallback"], t["jsonp"] && (t["jsonpCallback"] = t["jsonp"])), new Reqwest(t, e)
        }, reqwest.ajaxSetup = function (t) {
            t = t || {};
            for (var e in t) globalSetupOptions[e] = t[e]
        }, reqwest
    })
}, function (t, e) {
}, function (t, e, n) {
    var r, o, i;
    (function (n) {
        "use strict";
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        };
        !function (n, a) {
            o = [], r = a, i = "function" == typeof r ? r.apply(e, o) : r, !(void 0 !== i && (t.exports = i))
        }(void 0, function () {
            function t() {
                try {
                    return a in o && o[a]
                } catch (t) {
                    return !1
                }
            }

            var e, r = {}, o = "undefined" != typeof window ? window : n, i = o.document, a = "localStorage",
                u = "script";
            if (r.disabled = !1, r.version = "1.3.20", r.set = function (t, e) {
            }, r.get = function (t, e) {
            }, r.has = function (t) {
                return void 0 !== r.get(t)
            }, r.remove = function (t) {
            }, r.clear = function () {
            }, r.transact = function (t, e, n) {
                null == n && (n = e, e = null), null == e && (e = {});
                var o = r.get(t, e);
                n(o), r.set(t, o)
            }, r.getAll = function () {
            }, r.forEach = function () {
            }, r.serialize = function (t) {
                return JSON.stringify(t)
            }, r.deserialize = function (t) {
                if ("string" == typeof t) try {
                    return JSON.parse(t)
                } catch (e) {
                    return t || void 0
                }
            }, t()) e = o[a], r.set = function (t, n) {
                return void 0 === n ? r.remove(t) : (e.setItem(t, r.serialize(n)), n)
            }, r.get = function (t, n) {
                var o = r.deserialize(e.getItem(t));
                return void 0 === o ? n : o
            }, r.remove = function (t) {
                e.removeItem(t)
            }, r.clear = function () {
                e.clear()
            }, r.getAll = function () {
                var t = {};
                return r.forEach(function (e, n) {
                    t[e] = n
                }), t
            }, r.forEach = function (t) {
                for (var n = 0; n < e.length; n++) {
                    var o = e.key(n);
                    t(o, r.get(o))
                }
            }; else if (i && i.documentElement.addBehavior) {
                var c, l;
                try {
                    l = new ActiveXObject("htmlfile"), l.open(), l.write("<" + u + ">document.w=window</" + u + '><iframe src="/favicon.ico"></iframe>'), l.close(), c = l.w.frames[0].document, e = c.createElement("div")
                } catch (t) {
                    e = i.createElement("div"), c = i.body
                }
                var s = function (t) {
                    return function () {
                        var n = Array.prototype.slice.call(arguments, 0);
                        n.unshift(e), c.appendChild(e), e.addBehavior("#default#userData"), e.load(a);
                        var o = t.apply(r, n);
                        return c.removeChild(e), o
                    }
                }, d = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g"), f = function (t) {
                    return t.replace(/^d/, "___$&").replace(d, "___")
                };
                r.set = s(function (t, e, n) {
                    return e = f(e), void 0 === n ? r.remove(e) : (t.setAttribute(e, r.serialize(n)), t.save(a), n)
                }), r.get = s(function (t, e, n) {
                    e = f(e);
                    var o = r.deserialize(t.getAttribute(e));
                    return void 0 === o ? n : o
                }), r.remove = s(function (t, e) {
                    e = f(e), t.removeAttribute(e), t.save(a)
                }), r.clear = s(function (t) {
                    var e = t.XMLDocument.documentElement.attributes;
                    t.load(a);
                    for (var n = e.length - 1; n >= 0; n--) t.removeAttribute(e[n].name);
                    t.save(a)
                }), r.getAll = function (t) {
                    var e = {};
                    return r.forEach(function (t, n) {
                        e[t] = n
                    }), e
                }, r.forEach = s(function (t, e) {
                    for (var n, o = t.XMLDocument.documentElement.attributes, i = 0; n = o[i]; ++i) e(n.name, r.deserialize(t.getAttribute(n.name)))
                })
            }
            try {
                var p = "__storejs__";
                r.set(p, p), r.get(p) != p && (r.disabled = !0), r.remove(p)
            } catch (t) {
                r.disabled = !0
            }
            return r.enabled = !r.disabled, r
        })
    }).call(e, function () {
        return this
    }())
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {"default": t}
    }

    var o = n(2), i = r(o), a = n(19), u = n(20), c = void 0;
    i["default"].add({
        "name": "h_300*250_zy_4",
        "group": "home_right*top_1_zy",
        "type": "static",
        "distribution": 1,
        "content": {
            "render": function (t, e) {
                if (c = (0, a.adData)(4)) i["default"].addStyleSheet((0, a.bigPicStyle)("right-iframe-img")), i["default"].addStyleSheet("\n                    div[name='home_right*top_1_zy']{display: block !important;}\n                "), e.innerHTML = (0, a.bigPic)(c); else {
                    i["default"].cnzzReporter("home_right*top_1_zy", "fail", "h_300*250_zy_4");
                    var n = "home_right*top_1";
                    e.setAttribute("name", n), i["default"]._$.run(n, e)
                }
            }
        },
        "monitor": {
            "show": !0, "url": "/action_log/", "type": "post", "dataType": "json", "data": function (t) {
                return c && i["default"].monitorConfig("h_300*250_zy_4", t.type, c.ad_id, JSON.stringify(c.log_extra), JSON.stringify({"web_position": 4}))
            }, "custom": {
                "click": function (t) {
                    c && c.click_track_url_list && (c.click_track_url_list.forEach(function (t) {
                        return i["default"].reporter(t)
                    }), i["default"].cnzzReporter("home_right*top_1_zy", "click", "h_300*250_zy_4"))
                }, "show": function (t) {
                    c && c.track_url_list && (c.track_url_list.forEach(function (t) {
                        return i["default"].reporter(t)
                    }), i["default"].cnzzReporter("home_right*top_1_zy", "show", "h_300*250_zy_4"))
                }
            }
        }
    }), i["default"].add({
        "name": "h_300*250_TB_314",
        "group": "home_right*top_1",
        "type": "file",
        "distribution": (0, u.tbShow)(),
        "content": {
            "url": '<script src="//p.tanx.com/ex?i=mm_32479643_3494618_81668314" charset="gbk" id="tanx-s-mm_32479643_3494618_81668314"></script>',
            "render": function (t) {
                t && i["default"].addStyleSheet(".right-iframe-img{margin-bottom:16px; padding: 20px; background-color: #f4f5f6; position: relative; z-index: 1;}")
            }
        },
        "monitor": {
            "show": !0, "url": "/action_log/", "type": "post", "dataType": "json", "data": function (t) {
                i["default"].cnzzReporter("home_right*top_1", t.type, "h_300*250_TB_314")
            }
        }
    })
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {"default": t}
    }

    e.__esModule = !0, e.bigPicStyle = e.bigPic = e.adData = void 0;
    var o = n(2), i = r(o), a = n(20), u = window.imgUrl || "/c/dabwmc2ljlqfwwauduwvrqrgh6ptes9txqjcgpm4ptcivy5wxgx/",
        c = document.querySelector(".right-img"), l = c && c.getAttribute("name"),
        s = window.PAGE_SWITCH && window.PAGE_SWITCH.ttAdShow, d = "";
    l && (0 === l.indexOf("home") ? d = s ? "4,5,6,7" : "4" : 0 === l.indexOf("adetail") && s && (d = "8,9,10,11,12"));
    var f = "//www.toutiao.com" + u, p = function () {
        var t = document.querySelectorAll(".right-img"), e = new i["default"];
        i["default"]._.each(t, function (t) {
            t.setAttribute("ad-cursor", "1");
            var n = t.getAttribute("name");
            e.run(n, t)
        })
    };
    "" !== d ? i["default"].http({
        "url": f,
        "method": "POST",
        "data": {"web_positions": d},
        "type": "json",
        "success": function (t) {
            t && "success" === t.message ? window.webAds = t.data : window.webAds = [], p()
        },
        "error": function () {
            p()
        }
    }) : p();
    var h = e.adData = function (t) {
        var e = null;
        if (window.webAds && i["default"]._.isArray(window.webAds)) for (var n = void 0, r = 0, o = window.webAds.length; r < o; r++) n = window.webAds[r], n && n.web_position === t && (e = n);
        return e
    }, _ = e.bigPic = function (t) {
        var e = t.image_list[0];
        return '<div class="pic-wrap">\n                <a class="wrap" aid="' + t.ad_id + '" href="' + t.web_url + '" target="_blank">\n                    <img src="' + e.url + '" alt="">\n                </a>\n                <a class="wrap" href="' + t.web_url + '" target="_blank">\n                    <h4>' + t.title + '</h4>\n                </a>\n                <div class="y-box">\n                    <a href="' + t.web_url + '" target="_blank" class="source">' + (t.source || "") + '</a>\n                    <a href="https://ad.toutiao.com/promotion?source2=pcright1adtag" target="_blank" class="label">&nbsp;&nbsp;骞垮憡</a>\n                </div>\n            </div>'
    }, m = e.bigPicStyle = function (t) {
        return "\n        ." + t + " {margin-bottom:16px; padding: 20px; background-color: #f4f5f6;}\n        ." + t + " a {display: inline-block;}\n        ." + t + " .wrap {display: block}\n        ." + t + " img {width: 100%}\n        ." + t + " h4 {color: #222; font-size: 18px; padding: 12px 0 18px}\n        ." + t + " .y-box {font-size: 12px}\n        ." + t + " .avatar {border-radius: 50%; padding: 2px; background-color: #2a90d7; color: #fff}\n        ." + t + " .source, ." + t + " .comment {color: #999}\n        ." + t + " .label {color: #2a90d7}\n    "
    }, g = void 0;
    i["default"].add({
        "name": "h_300*250_zy_5",
        "group": "home_right*top_2_zy",
        "type": "static",
        "distribution": 1,
        "content": {
            "render": function (t, e) {
                if (g = h(5)) i["default"].addStyleSheet(m("right-iframe-img")), i["default"].addStyleSheet("\n                    div[name='home_right*top_2_zy']{display: block !important;}\n                "), e.innerHTML = _(g); else {
                    i["default"].cnzzReporter("home_right*top_2_zy", "fail", "h_300*250_zy_5");
                    var n = "home_right*top_2";
                    e.setAttribute("name", n), i["default"]._$.run(n, e)
                }
            }
        },
        "monitor": {
            "show": !0, "url": "/action_log/", "type": "post", "dataType": "json", "data": function (t) {
                return g && i["default"].monitorConfig("h_300*250_zy_5", t.type, g.ad_id, JSON.stringify(g.log_extra), JSON.stringify({"web_position": 5}))
            }, "custom": {
                "click": function (t) {
                    g && g.click_track_url_list && (g.click_track_url_list.forEach(function (t) {
                        return i["default"].reporter(t)
                    }), i["default"].cnzzReporter("home_right*top_2_zy", "click", "h_300*250_zy_5"))
                }, "show": function (t) {
                    g && g.track_url_list && (g.track_url_list.forEach(function (t) {
                        return i["default"].reporter(t)
                    }), i["default"].cnzzReporter("home_right*top_2_zy", "show", "h_300*250_zy_5"))
                }
            }
        }
    }), i["default"].add({
        "name": "h_300*250_TB_454",
        "group": "home_right*top_2",
        "type": "file",
        "distribution": (0, a.tbShow)(),
        "content": {
            "url": '<script src="//p.tanx.com/ex?i=mm_32479643_3494618_56064454" charset="gbk" id="tanx-s-mm_32479643_3494618_56064454"></script>',
            "render": function (t) {
                t && i["default"].addStyleSheet(".right-iframe-img{margin-bottom:16px; padding: 20px; background-color: #f4f5f6; position: relative; z-index: 1;}")
            }
        },
        "monitor": {
            "show": !0, "url": "/action_log/", "type": "post", "dataType": "json", "data": function (t) {
                i["default"].cnzzReporter("home_right*top_2", t.type, "h_300*250_TB_454")
            }
        }
    }), i["default"].add({
        "name": "h_300*250_IDG_8b0a",
        "group": "home_right*top_2",
        "type": "file",
        "distribution": 0,
        "content": {
            "url": '<script src="//ssp.idgtechnetwork.com.cn/jssdk/jssdk/jsRouter.js"></script>',
            "data": function () {
                window.tadSdkId = "c0de318dadbc4eb1bb8a529bed83b6f3", window.tadSpaceKey = "6e6982a41d224d069be46ff509ba8b0a", window.width = "300", window.height = "250"
            },
            "render": function () {
                i["default"].addStyleSheet(".right-iframe-ad{margin-bottom:16px; padding: 20px; background-color: #f4f5f6;}")
            }
        },
        "monitor": {
            "show": !0, "url": "/action_log/", "type": "post", "dataType": "json", "data": function (t) {
                i["default"].cnzzReporter("home_right*top_2", t.type, "h_300*250_IDG_8b0a")
            }
        }
    })
}, function (t, e) {
    "use strict";
    e.__esModule = !0;
    e.qihuShow = function () {
        var t = 1;
        return window.PAGE_SWITCH && window.PAGE_SWITCH.adScriptQihu === !1 && (t = 0), window["toutiao.web.toutiao_pc/pc/fe_switch"] && window["toutiao.web.toutiao_pc/pc/fe_switch"].adScriptQihu === !1 && (t = 0), t
    }, e.tbShow = function () {
        var t = 1;
        return window.PAGE_SWITCH && window.PAGE_SWITCH.adScriptTB === !1 && (t = 0), window["toutiao.web.toutiao_pc/pc/fe_switch"] && window["toutiao.web.toutiao_pc/pc/fe_switch"].adScriptTB === !1 && (t = 0), t
    }
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {"default": t}
    }

    var o = n(2), i = r(o), a = n(19), u = n(20), c = void 0;
    i["default"].add({
        "name": "h_300*250_zy_6",
        "group": "home_right*top_3_zy",
        "type": "static",
        "distribution": 1,
        "content": {
            "render": function (t, e) {
                if (c = (0, a.adData)(6)) i["default"].addStyleSheet((0, a.bigPicStyle)("right-iframe-img")), i["default"].addStyleSheet("\n                    div[name='home_right*top_3_zy']{display: block !important;}\n                "), e.innerHTML = (0, a.bigPic)(c); else {
                    i["default"].cnzzReporter("home_right*top_3_zy", "fail", "h_300*250_zy_6");
                    var n = "home_right*top_3";
                    e.setAttribute("name", n), i["default"]._$.run(n, e)
                }
            }
        },
        "monitor": {
            "show": !0, "url": "/action_log/", "type": "post", "dataType": "json", "data": function (t) {
                return c && i["default"].monitorConfig("h_300*250_zy_6", t.type, c.ad_id, JSON.stringify(c.log_extra), JSON.stringify({"web_position": 6}))
            }, "custom": {
                "click": function (t) {
                    c && c.click_track_url_list && (c.click_track_url_list.forEach(function (t) {
                        return i["default"].reporter(t)
                    }), i["default"].cnzzReporter("home_right*top_3_zy", "click", "h_300*250_zy_6"))
                }, "show": function (t) {
                    c && c.track_url_list && (c.track_url_list.forEach(function (t) {
                        return i["default"].reporter(t)
                    }), i["default"].cnzzReporter("home_right*top_3_zy", "show", "h_300*250_zy_6"))
                }
            }
        }
    }), i["default"].add({
        "name": "h_300*250_TB_483",
        "group": "home_right*top_3",
        "type": "file",
        "distribution": (0, u.tbShow)(),
        "content": {
            "url": '<script src="//p.tanx.com/ex?i=mm_32479643_3494618_56052483" charset="gbk" id="tanx-s-mm_32479643_3494618_56052483"></script>',
            "render": function (t) {
                t && i["default"].addStyleSheet(".right-iframe-img{margin-bottom:16px; padding: 20px; background-color: #f4f5f6; position: relative; z-index: 1;}")
            }
        },
        "monitor": {
            "show": !0, "url": "/action_log/", "type": "post", "dataType": "json", "data": function (t) {
                i["default"].cnzzReporter("home_right*top_3", t.type, "h_300*250_TB_483")
            }
        }
    }), i["default"].add({
        "name": "h_300*250_IDG_8bf3", "group": "home_right*top_3", "type": "file", "distribution": 0, "content": {
            "url": '<script src="//ssp.idgtechnetwork.com.cn/jssdk/jssdk/jsRouter.js"></script>',
            "data": function () {
                window.tadSdkId = "c0de318dadbc4eb1bb8a529bed83b6f3", window.tadSpaceKey = "c2c93499ecc5498c945547b275f38bf3", window.width = "300", window.height = "250"
            }, "render": function (t) {
                i["default"].addStyleSheet(".right-iframe-img{margin-bottom:16px; padding: 20px; background-color: #f4f5f6;}")
            }
        }, "monitor": {
            "show": !0, "url": "/action_log/", "type": "post", "dataType": "json", "data": function (t) {
                i["default"].cnzzReporter("home_right*top_3", t.type, "h_300*250_IDG_8bf3")
            }
        }
    })
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {"default": t}
    }

    var o = n(2), i = r(o), a = n(19), u = n(20), c = void 0;
    i["default"].add({
        "name": "h_300*250_zy_7",
        "group": "home_right*bottom_1_zy",
        "type": "static",
        "distribution": 1,
        "content": {
            "render": function (t, e) {
                if (c = (0, a.adData)(7)) i["default"].addStyleSheet((0, a.bigPicStyle)("imagindexhover")), e.innerHTML = (0, a.bigPic)(c); else {
                    i["default"].cnzzReporter("home_right*bottom_1_zy", "fail", "h_300*250_zy_7");
                    var n = "home_right*bottom_1";
                    e.setAttribute("name", n), i["default"]._$.run(n, e)
                }
            }
        },
        "monitor": {
            "show": !0, "url": "/action_log/", "type": "post", "dataType": "json", "data": function (t) {
                return c && i["default"].monitorConfig("h_300*250_zy_7", t.type, c.ad_id, JSON.stringify(c.log_extra), JSON.stringify({"web_position": 7}))
            }, "custom": {
                "click": function (t) {
                    c && c.click_track_url_list && (c.click_track_url_list.forEach(function (t) {
                        return i["default"].reporter(t)
                    }), i["default"].cnzzReporter("home_right*bottom_1_zy", "click", "h_300*250_zy_7"))
                }, "show": function (t) {
                    c && c.track_url_list && (c.track_url_list.forEach(function (t) {
                        return i["default"].reporter(t)
                    }), i["default"].cnzzReporter("home_right*bottom_1_zy", "show", "h_300*250_zy_7"))
                }
            }
        }
    }), i["default"].add({
        "name": "h_300*250_TB_340",
        "group": "home_right*bottom_1",
        "type": "file",
        "distribution": (0, u.tbShow)(),
        "content": {
            "url": '<script src="//p.tanx.com/ex?i=mm_32479643_3494618_63256340" id="tanx-s-mm_32479643_3494618_63256340" charset="gbk"></script>',
            "render": function (t) {
                t && i["default"].addStyleSheet("#imagindexhover{margin-top: -10px; padding: 0 20px; position: relative; z-index: 1;} #imagindexhover > ins{position: relative!important}")
            }
        },
        "monitor": {
            "show": !0, "url": "/action_log/", "type": "post", "dataType": "json", "data": function (t) {
                i["default"].cnzzReporter("home_right*bottom_1", t.type, "h_300*250_TB_340")
            }
        }
    })
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {"default": t}
    }

    e.__esModule = !0, e.getUid = void 0;
    var o = n(2), i = r(o), a = n(20), u = i["default"]._, c = function (t) {
        var e = 1, n = 0, r = "";
        if (t) for (e = 0, r = t.length - 1; r >= 0; r--) n = t.charCodeAt(r), e = (e << 6 & 268435455) + n + (n << 14), n = 266338304 & e, e = 0 !== n ? e ^ n >> 21 : e;
        return e
    }, l = e.getUid = function () {
        var t = window._qh_ad_uid_;
        if (t) return t;
        var e = new Date - 0, n = c(window.location.href);
        return t = "" + e + n + Math.random() + Math.random() + Math.random() + Math.random(), t = t.replace(/\./g, "").substring(0, 32), window._qh_ad_uid_ = t, t
    }, s = function () {
        var t = "o4wUxb";
        return window.location.host.indexOf("365yg") > -1 && (t = "UfPkeg"), t
    }, d = function () {
        return "\n        .jx-container { display: block !important; margin: 20px 0; }\n        .jx-container .imag-wrap { display: inline-block; width: 116px; height: 68px; }\n        .jx-container .imag-wrap img { width: 100%; height: 100% }\n        .jx-container .ainfo { display: inline-block; float: right; height: 68px; overflow: hidden; }\n        .jx-container .ainfo:before { content: ''; display: inline-block; width: 0; height: 100%; vertical-align: middle; }\n        .jx-container .ainfo-inner { display: inline-block; vertical-align: middle; }\n        .jx-container .atitle { width: 170px; height: 40px; font-size: 14px; color: #222; line-height: 20px; overflow: hidden; }\n        .jx-container span { font-size: 12px; color: #777; }\n        .jx-container em { color: #2A90D7; margin-left: 3px; }\n    "
    }, f = function (t) {
        var e = "_ad" + Math.random().toString(16).slice(2, 7),
            n = '\n        <a class="jx-container" href="' + t.curl + '">\n            <div class="imag-wrap">\n                <img src="' + t.img + '" alt="">\n            </div>\n            <div class="ainfo">\n                <div class="ainfo-inner">\n                    <h3 class="atitle">' + t.title + "</h3>\n                    <span>" + t.src + " <em>骞垮憡</em></span>\n                </div>\n            </div>\n        </a>\n    ";
        return {"html": n, "id": e}
    };
    i["default"].ad_cache = {}, i["default"].add({
        "name": "d_video_relate",
        "group": "vdetail_right*top_1",
        "type": "interface",
        "distribution": (0, a.qihuShow)(),
        "content": {
            "url": 0 === window.location.protocol.indexOf("https") ? "https://show-g.mediav.com/s" : "http://show.g.mediav.com/s",
            "type": "get",
            "dataType": "jsonp",
            "jsopName": "vad_360",
            "data": function () {
                return {
                    "jsonp": "vad_360",
                    "type": 1,
                    "of": 4,
                    "newf": 1,
                    "uid": l(),
                    "showid": s(),
                    "scheme": window.location.protocol.slice(0, -1),
                    "impct": 10
                }
            },
            "render": function (t, e) {
                i["default"].addStyleSheet(d());
                var n = void 0, r = void 0;
                t.ads && t.ads.length ? !function () {
                    var o = u.filter(t.ads, function (t) {
                        return !t._ad_used_
                    });
                    if (o.length) {
                        u.find(t.ads, function (t) {
                            return t.slot == o[0].slot && (t._ad_used_ = !0, !0)
                        }), n = o[0];
                        var a = document.querySelectorAll('div[ad-cursor][name="' + e.name + '"]');
                        a && o.length < a.length && i["default"]._$.updateCache(e.getAttribute("ad_name"))
                    } else {
                        var c = Math.floor(Math.random() * t.ads.length);
                        n = t.ads[c], i["default"]._$.updateCache(e.getAttribute("ad_name"))
                    }
                    r = f(n), e.innerHTML = r.html, e.setAttribute("cname", r.id), i["default"].ad_cache[r.id] = n, i["default"]._$.store.set(e.getAttribute("ad_name"), t)
                }() : i["default"]._$.updateCache(e.getAttribute("ad_name"))
            }
        },
        "cache": !0,
        "monitor": {
            "show": !0, "custom": {
                "click": function (t) {
                    var e = t.getAttribute("cname"), n = i["default"].ad_cache[e];
                    n && n.clktk && (n.clktk.forEach(function (t) {
                        i["default"].reporter(t)
                    }), i["default"].cnzzReporter(t.getAttribute("name"), "click", "video_feed"))
                }, "show": function (t) {
                    if ("1" !== t.getAttribute("showonce")) {
                        var e = t.getAttribute("cname"), n = i["default"].ad_cache[e];
                        n && n.imptk && (n.imptk.forEach(function (t) {
                            i["default"].reporter(t)
                        }), i["default"].cnzzReporter(t.getAttribute("name"), "show", "video_feed")), t.setAttribute("showonce", "1")
                    }
                }
            }
        }
    })
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {"default": t}
    }

    var o = n(2), i = r(o), a = n(19), u = n(20), c = void 0;
    i["default"].add({
        "name": "h_300*250_zy_8",
        "group": "adetail_right*top_1_zy",
        "type": "static",
        "distribution": (0, u.tbShow)(),
        "content": {
            "render": function (t, e) {
                if (c = (0, a.adData)(8)) i["default"].addStyleSheet((0, a.bigPicStyle)("right-img")), i["default"].addStyleSheet("\n                    .right-top-1{display: block !important;}\n                "), e.innerHTML = (0, a.bigPic)(c); else {
                    i["default"].cnzzReporter("adetail_right*top_1_zy", "fail", "h_300*250_zy_8");
                    var n = "adetail_right*top_1";
                    e.setAttribute("name", n), i["default"]._$.run(n, e)
                }
            }
        },
        "monitor": {
            "show": !0, "url": "/action_log/", "type": "post", "dataType": "json", "data": function (t) {
                return c && i["default"].monitorConfig("h_300*250_zy_8", t.type, c.ad_id, JSON.stringify(c.log_extra), JSON.stringify({"web_position": 8}))
            }, "custom": {
                "click": function (t) {
                    c && c.click_track_url_list && (c.click_track_url_list.forEach(function (t) {
                        return i["default"].reporter(t)
                    }), i["default"].cnzzReporter("adetail_right*top_1_zy", "click", "h_300*250_zy_8"))
                }, "show": function (t) {
                    c && c.track_url_list && (c.track_url_list.forEach(function (t) {
                        return i["default"].reporter(t)
                    }), i["default"].cnzzReporter("adetail_right*top_1_zy", "show", "h_300*250_zy_8"))
                }
            }
        }
    }), i["default"].add({
        "name": "h_300*250_TB_456",
        "group": "adetail_right*top_1",
        "type": "file",
        "distribution": (0, u.tbShow)(),
        "content": {
            "url": '<script src="//p.tanx.com/ex?i=mm_32479643_3494618_56064456" id="tanx-s-mm_32479643_3494618_56064456" charset="gbk"></script>',
            "render": function (t, e) {
                t && i["default"].addStyleSheet(".right-top-1{margin-bottom: 30px}"), e && i["default"].addClass(e, "right-lm-img")
            }
        },
        "monitor": {
            "show": !0, "url": "/action_log/", "type": "post", "dataType": "json", "data": function (t) {
                i["default"].cnzzReporter("adetail_right*top_1", t.type, "h_300*250_TB_456")
            }
        }
    }), i["default"].add({
        "name": "h_300*250_IDG_3ec2",
        "group": "adetail_right*top_1",
        "type": "file",
        "distribution": 0,
        "content": {
            "url": '<script src="//ssp.idgtechnetwork.com.cn/jssdk/jssdk/jsRouter.js"></script>',
            "data": function () {
                window.tadSdkId = "c0de318dadbc4eb1bb8a529bed83b6f3", window.tadSpaceKey = "f25dda3c8b6c454faf581b3633213ec2", window.width = "300", window.height = "250"
            },
            "render": function (t) {
                t && i["default"].addStyleSheet(".right-top-1{margin-bottom: 30px}")
            }
        },
        "monitor": {
            "show": !0, "url": "/action_log/", "type": "post", "dataType": "json", "data": function (t) {
                i["default"].cnzzReporter("adetail_right*top_1", t.type, "h_300*250_IDG_3ec2")
            }
        }
    })
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {"default": t}
    }

    var o = n(2), i = r(o), a = n(19), u = n(20), c = void 0;
    i["default"].add({
        "name": "h_300*250_zy_9",
        "group": "adetail_right*top_2_zy",
        "type": "static",
        "distribution": (0, u.tbShow)(),
        "content": {
            "render": function (t, e) {
                if (c = (0, a.adData)(9)) i["default"].addStyleSheet((0, a.bigPicStyle)("right-img")), i["default"].addStyleSheet("\n                    .right-top-2{display: block !important;}\n                "), e.innerHTML = (0, a.bigPic)(c); else {
                    i["default"].cnzzReporter("adetail_right*top_2_zy", "fail", "h_300*250_zy_9");
                    var n = "adetail_right*top_2";
                    e.setAttribute("name", n), i["default"]._$.run(n, e)
                }
            }
        },
        "monitor": {
            "show": !0, "url": "/action_log/", "type": "post", "dataType": "json", "data": function (t) {
                return c && i["default"].monitorConfig("h_300*250_zy_9", t.type, c.ad_id, JSON.stringify(c.log_extra), JSON.stringify({"web_position": 9}))
            }, "custom": {
                "click": function (t) {
                    c && c.click_track_url_list && (c.click_track_url_list.forEach(function (t) {
                        return i["default"].reporter(t)
                    }), i["default"].cnzzReporter("adetail_right*top_2_zy", "click", "h_300*250_zy_9"))
                }, "show": function (t) {
                    c && c.track_url_list && (c.track_url_list.forEach(function (t) {
                        return i["default"].reporter(t)
                    }), i["default"].cnzzReporter("adetail_right*top_2_zy", "show", "h_300*250_zy_9"))
                }
            }
        }
    }), i["default"].add({
        "name": "h_300*250_TB_903",
        "group": "adetail_right*top_2",
        "type": "file",
        "distribution": (0, u.tbShow)(),
        "content": {
            "url": '<script src="//p.tanx.com/ex?i=mm_32479643_3494618_75342903" id="tanx-s-mm_32479643_3494618_75342903" charset="gbk"></script>',
            "render": function (t, e) {
                t && i["default"].addStyleSheet(".right-top-2{margin-bottom: 30px}"), e && i["default"].addClass(e, "right-lm-img")
            }
        },
        "monitor": {
            "show": !0, "url": "/action_log/", "type": "post", "dataType": "json", "data": function (t) {
                i["default"].cnzzReporter("adetail_right*top_2", t.type, "h_300*250_TB_903")
            }
        }
    })
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {"default": t}
    }

    var o = n(2), i = r(o), a = n(19), u = n(20), c = void 0;
    i["default"].add({
        "name": "h_300*250_zy_10",
        "group": "adetail_right*top_3_zy",
        "type": "static",
        "distribution": 1,
        "content": {
            "render": function (t, e) {
                if (c = (0, a.adData)(10)) i["default"].addStyleSheet((0, a.bigPicStyle)("right-img")), i["default"].addStyleSheet("\n                    .right-top-3{display: block !important;}\n                "), e.innerHTML = (0, a.bigPic)(c); else {
                    i["default"].cnzzReporter("adetail_right*top_3_zy", "fail", "h_300*250_zy_10");
                    var n = "adetail_right*top_3";
                    e.setAttribute("name", n), i["default"]._$.run(n, e)
                }
            }
        },
        "monitor": {
            "show": !0, "url": "/action_log/", "type": "post", "dataType": "json", "data": function (t) {
                return c && i["default"].monitorConfig("h_300*250_zy_10", t.type, c.ad_id, JSON.stringify(c.log_extra), JSON.stringify({"web_position": 10}))
            }, "custom": {
                "click": function (t) {
                    c && c.click_track_url_list && (c.click_track_url_list.forEach(function (t) {
                        return i["default"].reporter(t)
                    }), i["default"].cnzzReporter("adetail_right*top_3_zy", "click", "h_300*250_zy_10"))
                }, "show": function (t) {
                    c && c.track_url_list && (c.track_url_list.forEach(function (t) {
                        return i["default"].reporter(t)
                    }), i["default"].cnzzReporter("adetail_right*top_3_zy", "show", "h_300*250_zy_10"))
                }
            }
        }
    }), i["default"].add({
        "name": "h_300*250_JX_1700462",
        "group": "adetail_right*top_3",
        "type": "file",
        "distribution": 0,
        "content": {
            "url": '<script type="text/javascript" language="javascript" charset="utf-8" src="//static.mediav.com/js/mvf_g2.js"></script>',
            "data": function () {
                window.mediav_ad_pub = "MKYcVN_1700462", window.mediav_ad_width = "300", window.mediav_ad_height = "250"
            },
            "render": function (t) {
                t && i["default"].addStyleSheet(".right-top-3{margin-bottom: 30px}")
            }
        },
        "monitor": {
            "show": !0, "url": "/action_log/", "type": "post", "dataType": "json", "data": function (t) {
                i["default"].cnzzReporter("adetail_right*top_3", t.type, "h_300*250_JX_1700462")
            }
        }
    }), i["default"].add({
        "name": "h_300*250_TB_4454",
        "group": "adetail_right*top_3",
        "type": "file",
        "distribution": (0, u.tbShow)(),
        "content": {
            "url": '<script src="//p.tanx.com/ex?i=mm_32479643_3494618_107024454" id="tanx-s-mm_32479643_3494618_107024454" charset="gbk"></script>',
            "render": function (t, e) {
                t && i["default"].addStyleSheet(".right-top-3{margin-bottom: 30px}"), e && i["default"].addClass(e, "right-lm-img")
            }
        },
        "monitor": {
            "show": !0, "url": "/action_log/", "type": "post", "dataType": "json", "data": function (t) {
                i["default"].cnzzReporter("adetail_right*top_3", t.type, "h_300*250_TB_4454")
            }
        }
    })
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {"default": t}
    }

    var o = n(2), i = r(o), a = n(19), u = n(20), c = void 0;
    i["default"].add({
        "name": "h_300*250_zy_11",
        "group": "adetail_right*top_4_zy",
        "type": "static",
        "distribution": 1,
        "content": {
            "render": function (t, e) {
                if (c = (0, a.adData)(11)) i["default"].addStyleSheet((0, a.bigPicStyle)("right-img")), i["default"].addStyleSheet("\n                    .right-top-4{display: block !important;}\n                "), e.innerHTML = (0, a.bigPic)(c); else {
                    i["default"].cnzzReporter("adetail_right*top_4_zy", "fail", "h_300*250_zy_11");
                    var n = "adetail_right*top_4";
                    e.setAttribute("name", n), i["default"]._$.run(n, e)
                }
            }
        },
        "monitor": {
            "show": !0, "url": "/action_log/", "type": "post", "dataType": "json", "data": function (t) {
                return c && i["default"].monitorConfig("h_300*250_zy_11", t.type, c.ad_id, JSON.stringify(c.log_extra), JSON.stringify({"web_position": 11}))
            }, "custom": {
                "click": function (t) {
                    c && c.click_track_url_list && (c.click_track_url_list.forEach(function (t) {
                        return i["default"].reporter(t)
                    }), i["default"].cnzzReporter("adetail_right*top_4_zy", "click", "h_300*250_zy_11"))
                }, "show": function (t) {
                    c && c.track_url_list && (c.track_url_list.forEach(function (t) {
                        return i["default"].reporter(t)
                    }), i["default"].cnzzReporter("adetail_right*top_4_zy", "show", "h_300*250_zy_11"))
                }
            }
        }
    }), i["default"].add({
        "name": "h_300*250_TB_461",
        "group": "adetail_right*top_4",
        "type": "file",
        "distribution": (0, u.tbShow)(),
        "content": {
            "url": '<script src="//p.tanx.com/ex?i=mm_32479643_3494618_56068461" id="tanx-s-mm_32479643_3494618_56068461" charset="gbk"></script>',
            "render": function (t, e) {
                t && i["default"].addStyleSheet(".right-top-4{margin-bottom: 30px}"), e && i["default"].addClass(e, "right-lm-img")
            }
        },
        "monitor": {
            "show": !0, "url": "/action_log/", "type": "post", "dataType": "json", "data": function (t) {
                i["default"].cnzzReporter("adetail_right*top_4", t.type, "h_300*250_TB_461")
            }
        }
    }), i["default"].add({
        "name": "h_300*250_IDG_703c",
        "group": "adetail_right*top_4",
        "type": "file",
        "distribution": 0,
        "content": {
            "url": '<script src="//ssp.idgtechnetwork.com.cn/jssdk/jssdk/jsRouter.js"></script>',
            "data": function () {
                window.tadSdkId = "c0de318dadbc4eb1bb8a529bed83b6f3", window.tadSpaceKey = "5daa221ece0f4e6c828017fb3778703c", window.width = "300", window.height = "250"
            },
            "render": function () {
                i["default"].addStyleSheet(".right-top-4{margin-bottom: 30px}")
            }
        },
        "monitor": {
            "show": !0, "url": "/action_log/", "type": "post", "dataType": "json", "data": function (t) {
                i["default"].cnzzReporter("adetail_right*top_4", t.type, "h_300*250_IDG_703c")
            }
        }
    })
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {"default": t}
    }

    var o = n(2), i = r(o), a = n(19), u = n(20), c = void 0;
    i["default"].add({
        "name": "h_300*250_zy_12",
        "group": "adetail_right*hover_1_zy",
        "type": "static",
        "distribution": (0, u.tbShow)(),
        "content": {
            "render": function (t, e) {
                if (c = (0, a.adData)(12)) i["default"].addStyleSheet((0, a.bigPicStyle)("right-img")), i["default"].addStyleSheet(".right-hover-1{position: fixed; top: 20px; width: 300px; box-sizing: border-box;}"), e.innerHTML = (0, a.bigPic)(c); else {
                    i["default"].cnzzReporter("adetail_right*hover_1_zy", "fail", "h_300*250_zy_12");
                    var n = "adetail_right*hover_1";
                    e.setAttribute("name", n), i["default"]._$.run(n, e)
                }
            }
        },
        "monitor": {
            "show": !0, "url": "/action_log/", "type": "post", "dataType": "json", "data": function (t) {
                return c && i["default"].monitorConfig("h_300*250_zy_12", t.type, c.ad_id, JSON.stringify(c.log_extra), JSON.stringify({"web_position": 12}))
            }, "custom": {
                "click": function (t) {
                    c && c.click_track_url_list && (c.click_track_url_list.forEach(function (t) {
                        return i["default"].reporter(t)
                    }), i["default"].cnzzReporter("adetail_right*hover_1_zy", "click", "h_300*250_zy_12"))
                }, "show": function (t) {
                    c && c.track_url_list && (c.track_url_list.forEach(function (t) {
                        return i["default"].reporter(t)
                    }), i["default"].cnzzReporter("adetail_right*hover_1_zy", "show", "h_300*250_zy_12"))
                }
            }
        }
    }), i["default"].add({
        "name": "h_300*250_TB_469",
        "group": "adetail_right*hover_1",
        "type": "file",
        "distribution": (0, u.tbShow)(),
        "content": {
            "url": '<script src="//p.tanx.com/ex?i=mm_32479643_3494618_63260469" id="tanx-s-mm_32479643_3494618_63260469" charset="gbk"></script>',
            "render": function (t) {
                t && i["default"].addStyleSheet(".right-hover-1{position: fixed; top: 20px;} #imagindexhover ins {position: absolute !important}")
            }
        },
        "monitor": {
            "show": !0, "url": "/action_log/", "type": "post", "dataType": "json", "data": function (t) {
                i["default"].cnzzReporter("adetail_right*hover_1", t.type, "h_300*250_TB_469")
            }
        }
    })
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {"default": t}
    }

    var o = n(2), i = r(o), a = n(20);
    i["default"].add({
        "name": "h_640*60_TB_146",
        "group": "adetail_main*bottom_1",
        "type": "file",
        "distribution": (0, a.tbShow)(),
        "content": {
            "url": '<script src="//p.tanx.com/ex?i=mm_32479643_3494618_75352146" id="tanx-s-mm_32479643_3494618_75352146" charset="gbk"></script>',
            "render": function (t) {
                t && i["default"].addStyleSheet(".bd-bottom-1{padding-left: 10px}")
            }
        },
        "monitor": {
            "show": !0, "url": "/action_log/", "type": "post", "dataType": "json", "data": function (t) {
                i["default"].cnzzReporter("adetail_main*bottom_1", t.type, "h_640*60_TB_146")
            }
        }
    })
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {"default": t}
    }

    var o = n(2), i = r(o), a = n(20);
    i["default"].add({
        "name": "h_950*90_TB_989",
        "group": "gallery_last*bottom_1",
        "type": "file",
        "distribution": (0, a.tbShow)(),
        "content": {
            "url": '<script src="//p.tanx.com/ex?i=mm_32479643_3494618_75344989" id="tanx-s-mm_32479643_3494618_75344989" charset="gbk"></script>',
            "render": function (t) {
                t && i["default"].addStyleSheet(".last-bottom-1{padding-left: 5px}")
            }
        },
        "monitor": {
            "show": !0, "url": "/action_log/", "type": "post", "dataType": "json", "data": function (t) {
                i["default"].cnzzReporter("gallery_last*bottom_1", t.type, "h_950*90_TB_989")
            }
        }
    })
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {"default": t}
    }

    var o = n(2), i = r(o), a = n(23), u = n(20), c = function (t) {
        var e = document.createElement("a");
        e.setAttribute("href", t.curl), e.setAttribute("target", "_blank"), e.setAttribute("class", "imwrap");
        var n = document.createElement("div");
        n.setAttribute("class", "img-wrap");
        var r = document.createElement("img");
        r.setAttribute("src", t.img), n.appendChild(r);
        var o = document.createElement("i");
        o.setAttribute("class", "hot-tag");
        var i = document.createElement("span");
        i.innerHTML = "骞垮憡", o.appendChild(i), n.appendChild(o), e.appendChild(n);
        var a = document.createElement("div");
        a.setAttribute("class", "img-title");
        var u = document.createElement("p");
        u.setAttribute("class", "img-title-inner");
        var c = document.createElement("span");
        return c.innerHTML = t.title, u.appendChild(c), a.appendChild(u), e.appendChild(a), e
    }, l = void 0;
    i["default"].add({
        "name": "gallery_related",
        "group": "gallery_related*middle_1",
        "type": "interface",
        "distribution": (0, u.qihuShow)(),
        "content": {
            "url": 0 === window.location.protocol.indexOf("https") ? "https://show-g.mediav.com/s" : "http://show.g.mediav.com/s",
            "type": "get",
            "dataType": "jsonp",
            "jsopName": "gma_360",
            "data": function () {
                return {
                    "jsonp": "gma_360",
                    "type": 1,
                    "of": 4,
                    "newf": 1,
                    "uid": (0, a.getUid)(),
                    "showid": "MTue8t",
                    "scheme": window.location.protocol.slice(0, -1),
                    "impct": 1
                }
            },
            "render": function (t, e) {
                if (t && t.ads && t.ads.length > 0) {
                    l = t.ads[0];
                    var n = c(l);
                    e.innerHTML = "", e.appendChild(n), i["default"].addStyleSheet(".imwrap{display: block !important;}")
                }
            }
        },
        "monitor": {
            "show": !0, "custom": {
                "click": function (t) {
                    l && l.clktk && (l.clktk.forEach(function (t) {
                        i["default"].reporter(t)
                    }), i["default"].cnzzReporter("gallery_related*middle_1", "click", "gallery_related"))
                }, "show": function (t) {
                    l && l.imptk && (l.imptk.forEach(function (t) {
                        i["default"].reporter(t)
                    }), i["default"].cnzzReporter("gallery_related*middle_1", "show", "gallery_related"))
                }
            }
        }
    })
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {"default": t}
    }

    var o = n(2), i = r(o), a = n(20);
    i["default"].add({
        "name": "h_300*250_TB_456-1",
        "group": "gallery_detail*top_1",
        "type": "file",
        "distribution": (0, a.tbShow)(),
        "content": {
            "url": '<script src="//p.tanx.com/ex?i=mm_32479643_3494618_56064456" id="tanx-s-mm_32479643_3494618_56064456" charset="gbk"></script>',
            "render": function (t) {
                t && i["default"].addStyleSheet(".right-top-1{margin-bottom: 30px}")
            }
        },
        "monitor": {
            "show": !0, "url": "/action_log/", "type": "post", "dataType": "json", "data": function (t) {
                i["default"].cnzzReporter("adetail_right*top_1", t.type, "h_300*250_TB_456")
            }
        }
    })
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {"default": t}
    }

    var o = n(2), i = r(o), a = n(23), u = n(20), c = function (t) {
        return '\n        <a class="jx-hv-container" href="' + t.curl + '">\n            <div class="ainfo">\n                <div class="ainfo-inner">\n                    <h3 class="atitle">' + t.title + "</h3>\n                    <span>" + t.src + ' <em>骞垮憡</em></span>\n                </div>\n            </div><div class="imag-wrap">\n                <img src="' + t.img + '" alt="">\n            </div>\n        </a>\n    '
    }, l = function () {
        return "\n        .jx-hv-container { display: block !important; margin: 8px 0; font-size: 0; }\n        .jx-hv-container .imag-wrap { display: inline-block; width: 118px; height: 68px; }\n        .jx-hv-container .imag-wrap img { width: 100%; height: 100% }\n        .jx-hv-container .ainfo { display: inline-block; height: 68px; overflow: hidden; margin-right: 10px;}\n        .jx-hv-container .ainfo:before { content: ''; display: inline-block; width: 0; height: 100%; vertical-align: middle; }\n        .jx-hv-container .ainfo-inner { display: inline-block; vertical-align: middle; }\n        .jx-hv-container .atitle { width: 170px; height: 40px; font-size: 14px; color: #222; line-height: 20px; overflow: hidden; }\n        .jx-hv-container span { font-size: 12px; color: #777; }\n        .jx-hv-container em { color: #2A90D7; margin-left: 3px; }\n    "
    }, s = void 0;
    i["default"].add({
        "name": "hot_video*cell_4",
        "group": "hot_video*cell_4",
        "type": "interface",
        "distribution": (0, u.qihuShow)(),
        "content": {
            "url": 0 === window.location.protocol.indexOf("https") ? "https://show-g.mediav.com/s" : "http://show.g.mediav.com/s",
            "type": "get",
            "dataType": "jsonp",
            "jsopName": "hva_360",
            "data": function () {
                return {
                    "jsonp": "hva_360",
                    "type": 1,
                    "of": 4,
                    "newf": 1,
                    "uid": (0, a.getUid)(),
                    "showid": "l2gPMp",
                    "scheme": window.location.protocol.slice(0, -1),
                    "impct": 10
                }
            },
            "render": function (t, e) {
                if (t && t.ads && t.ads.length > 0) {
                    s = t.ads[0];
                    var n = c(s);
                    e.innerHTML = n, i["default"].addStyleSheet(l())
                }
            }
        },
        "monitor": {
            "show": !0, "custom": {
                "click": function (t) {
                    s && s.clktk && (s.clktk.forEach(function (t) {
                        i["default"].reporter(t)
                    }), i["default"].cnzzReporter("hot_video*cell_4", "click", "hot_video*cell_4"))
                }, "show": function (t) {
                    s && s.imptk && (s.imptk.forEach(function (t) {
                        i["default"].reporter(t)
                    }), i["default"].cnzzReporter("hot_video*cell_4", "show", "hot_video*cell_4"))
                }
            }
        }
    })
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {"default": t}
    }

    var o = n(2), i = r(o), a = n(23), u = n(20), c = function (t) {
        return '\n        <a class="jx-hi-container" href="' + t.curl + '">\n            <div class="imag-wrap">\n                <img src="' + t.img + '" alt="">\n                <span class="tag">骞垮憡</span>\n            </div>\n            <div class="ainfo">\n                <h3 class="atitle">' + t.title + "</h3>\n            </div>\n        </a>\n    "
    }, l = function () {
        return "\n        .pane-module .picture-list .picture-item-a { margin-right: 12px; margin-bottom: 16px; }\n        .jx-hi-container { display: block !important; }\n        .jx-hi-container .imag-wrap { width: 144px; height: 84px; position: relative; }\n        .jx-hi-container .imag-wrap img { width: 100%; height: 100% }\n        .jx-hi-container .imag-wrap .tag { position: absolute; right: 8px; bottom: 8px; padding: 0 6px; \n            border-radius: 10px; background: #000; background: rgba(0, 0, 0, .7); color: #fff; line-height: 20px; }\n        .jx-hi-container .ainfo { overflow: hidden; }\n        .jx-hi-container .atitle { margin-top: 12px; height: 34px; font-size: 14px; color: #222; line-height: 18px;\n            overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2;\n            -webkit-box-orient: vertical; }\n    "
    }, s = void 0, d = void 0, f = function (t) {
        i["default"].add({
            "name": "hot_image*cell_6",
            "group": "hot_image*cell_6",
            "type": "static",
            "distribution": (0, u.qihuShow)(),
            "content": {
                "render": function (e, n) {
                    var r = c(t);
                    n.innerHTML = r
                }
            },
            "monitor": {
                "show": !0, "custom": {
                    "click": function (e) {
                        t && t.clktk && (t.clktk.forEach(function (t) {
                            i["default"].reporter(t)
                        }), i["default"].cnzzReporter("hot_image*cell_6", "click", "hot_image*cell_6"))
                    }, "show": function (e) {
                        t && t.imptk && (t.imptk.forEach(function (t) {
                            i["default"].reporter(t)
                        }), i["default"].cnzzReporter("hot_image*cell_6", "show", "hot_image*cell_6"))
                    }
                }
            }
        })
    };
    i["default"].add({
        "name": "hot_image*cell_5",
        "group": "hot_image*cell_5",
        "type": "interface",
        "distribution": (0, u.qihuShow)(),
        "content": {
            "url": 0 === window.location.protocol.indexOf("https") ? "https://show-g.mediav.com/s" : "http://show.g.mediav.com/s",
            "type": "get",
            "dataType": "jsonp",
            "jsopName": "hia_360",
            "data": function () {
                return {
                    "jsonp": "hia_360",
                    "type": 1,
                    "of": 4,
                    "newf": 1,
                    "uid": (0, a.getUid)(),
                    "showid": "gcxZAE",
                    "scheme": window.location.protocol.slice(0, -1),
                    "impct": 2
                }
            },
            "render": function (t, e) {
                if (t && t.ads && t.ads.length > 1) {
                    i["default"].addStyleSheet(l());
                    var n = t.ads;
                    s = n[0], d = n[1];
                    var r = c(s);
                    e.innerHTML = r, d && f(d), setTimeout(function () {
                        window.ad$.put()
                    })
                }
            }
        },
        "monitor": {
            "show": !0, "custom": {
                "click": function (t) {
                    s && s.clktk && (s.clktk.forEach(function (t) {
                        i["default"].reporter(t)
                    }), i["default"].cnzzReporter("hot_image*cell_5", "click", "hot_image*cell_5"))
                }, "show": function (t) {
                    s && s.imptk && (s.imptk.forEach(function (t) {
                        i["default"].reporter(t)
                    }), i["default"].cnzzReporter("hot_image*cell_5", "show", "hot_image*cell_5"))
                }
            }
        }
    })
}, function (t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {"default": t}
    }

    var o = n(2), i = r(o), a = n(23), u = n(20), c = function (t) {
        return '\n        <a class="jx-gi-container" href="' + t.curl + '">\n            <div class="imag-wrap">\n                <img src="' + t.img + '" alt="">\n                <span class="tag">骞垮憡</span>\n            </div>\n            <div class="ainfo">\n                <h3 class="atitle">' + t.title + "</h3>\n            </div>\n        </a>\n    "
    }, l = function () {
        return "\n        .jx-gi-container { display: block !important; margin-right: 8px; }\n        .jx-gi-container .imag-wrap { width: 234px; height: 130px; position: relative; }\n        .jx-gi-container .imag-wrap img { width: 100%; height: 100% }\n        .jx-gi-container .imag-wrap .tag { position: absolute; right: 8px; bottom: 8px; padding: 0 6px; \n            border-radius: 10px; background: #000; background: rgba(0, 0, 0, .7); color: #fff; line-height: 20px; }\n        .jx-gi-container .ainfo { overflow: hidden; }\n        .jx-gi-container .atitle { margin-top: 10px; height: 40px; font-size: 14px; color: #222; line-height: 20px;\n            overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2;\n            -webkit-box-orient: vertical; width: 234px; }\n    "
    }, s = void 0, d = void 0, f = function (t) {
        i["default"].add({
            "name": "gallery_last*cell_6",
            "group": "gallery_last*cell_6",
            "type": "static",
            "distribution": (0, u.qihuShow)(),
            "content": {
                "render": function (e, n) {
                    var r = c(t);
                    n.innerHTML = r
                }
            },
            "monitor": {
                "show": !0, "custom": {
                    "click": function (e) {
                        t && t.clktk && (t.clktk.forEach(function (t) {
                            i["default"].reporter(t)
                        }), i["default"].cnzzReporter("gallery_last*cell_6", "click", "gallery_last*cell_6"))
                    }, "show": function (e) {
                        t && t.imptk && (t.imptk.forEach(function (t) {
                            i["default"].reporter(t)
                        }), i["default"].cnzzReporter("gallery_last*cell_6", "show", "gallery_last*cell_6"))
                    }
                }
            }
        })
    };
    i["default"].add({
        "name": "gallery_last*cell_3",
        "group": "gallery_last*cell_3",
        "type": "interface",
        "distribution": (0, u.qihuShow)(),
        "content": {
            "url": 0 === window.location.protocol.indexOf("https") ? "https://show-g.mediav.com/s" : "http://show.g.mediav.com/s",
            "type": "get",
            "dataType": "jsonp",
            "jsopName": "gia_360",
            "data": function () {
                return {
                    "jsonp": "gia_360",
                    "type": 1,
                    "of": 4,
                    "newf": 1,
                    "uid": (0, a.getUid)(),
                    "showid": "mZU76x",
                    "scheme": window.location.protocol.slice(0, -1),
                    "impct": 2
                }
            },
            "render": function (t, e) {
                if (t && t.ads && t.ads.length > 0) {
                    i["default"].addStyleSheet(l());
                    var n = t.ads;
                    s = n[0], d = n[1];
                    var r = c(s);
                    e.innerHTML = r, d && f(d), setTimeout(function () {
                        window.ad$.put()
                    })
                }
            }
        },
        "monitor": {
            "show": !0, "custom": {
                "click": function (t) {
                    s && s.clktk && (s.clktk.forEach(function (t) {
                        i["default"].reporter(t)
                    }), i["default"].cnzzReporter("gallery_last*cell_3", "click", "gallery_last*cell_3"))
                }, "show": function (t) {
                    s && s.imptk && (s.imptk.forEach(function (t) {
                        i["default"].reporter(t)
                    }), i["default"].cnzzReporter("gallery_last*cell_3", "show", "gallery_last*cell_3"))
                }
            }
        }
    })
}]);
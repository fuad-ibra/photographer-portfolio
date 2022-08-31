(() => {
    "use strict";
    var __webpack_require__ = {};
    (() => {
        __webpack_require__.g = function() {
            if ("object" === typeof globalThis) return globalThis;
            try {
                return this || new Function("return this")();
            } catch (e) {
                if ("object" === typeof window) return window;
            }
        }();
    })();
    const modules_flsModules = {};
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
        }
    };
    function addTouchClass() {
        if (isMobile.any()) document.documentElement.classList.add("touch");
    }
    function addLoadedClass() {
        window.addEventListener("load", (function() {
            setTimeout((function() {
                document.documentElement.classList.add("loaded");
            }), 0);
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function functions_FLS(message) {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    }
    class Popup {
        constructor(options) {
            let config = {
                logging: true,
                init: true,
                attributeOpenButton: "data-popup",
                attributeCloseButton: "data-close",
                fixElementSelector: "[data-lp]",
                youtubeAttribute: "data-popup-youtube",
                youtubePlaceAttribute: "data-popup-youtube-place",
                setAutoplayYoutube: true,
                classes: {
                    popup: "popup",
                    popupContent: "popup__content",
                    popupActive: "popup_show",
                    bodyActive: "popup-show"
                },
                focusCatch: true,
                closeEsc: true,
                bodyLock: true,
                hashSettings: {
                    location: true,
                    goHash: true
                },
                on: {
                    beforeOpen: function() {},
                    afterOpen: function() {},
                    beforeClose: function() {},
                    afterClose: function() {}
                }
            };
            this.youTubeCode;
            this.isOpen = false;
            this.targetOpen = {
                selector: false,
                element: false
            };
            this.previousOpen = {
                selector: false,
                element: false
            };
            this.lastClosed = {
                selector: false,
                element: false
            };
            this._dataValue = false;
            this.hash = false;
            this._reopen = false;
            this._selectorOpen = false;
            this.lastFocusEl = false;
            this._focusEl = [ "a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])' ];
            this.options = {
                ...config,
                ...options,
                classes: {
                    ...config.classes,
                    ...options?.classes
                },
                hashSettings: {
                    ...config.hashSettings,
                    ...options?.hashSettings
                },
                on: {
                    ...config.on,
                    ...options?.on
                }
            };
            this.bodyLock = false;
            this.options.init ? this.initPopups() : null;
        }
        initPopups() {
            this.popupLogging(`Проснулся`);
            this.eventsPopup();
        }
        eventsPopup() {
            document.addEventListener("click", function(e) {
                const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
                if (buttonOpen) {
                    e.preventDefault();
                    this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : "error";
                    this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
                    if ("error" !== this._dataValue) {
                        if (!this.isOpen) this.lastFocusEl = buttonOpen;
                        this.targetOpen.selector = `${this._dataValue}`;
                        this._selectorOpen = true;
                        this.open();
                        return;
                    } else this.popupLogging(`Ой ой, не заполнен атрибут у ${buttonOpen.classList}`);
                    return;
                }
                const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
                if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
                    e.preventDefault();
                    this.close();
                    return;
                }
            }.bind(this));
            document.addEventListener("keydown", function(e) {
                if (this.options.closeEsc && 27 == e.which && "Escape" === e.code && this.isOpen) {
                    e.preventDefault();
                    this.close();
                    return;
                }
                if (this.options.focusCatch && 9 == e.which && this.isOpen) {
                    this._focusCatch(e);
                    return;
                }
            }.bind(this));
            if (this.options.hashSettings.goHash) {
                window.addEventListener("hashchange", function() {
                    if (window.location.hash) this._openToHash(); else this.close(this.targetOpen.selector);
                }.bind(this));
                window.addEventListener("load", function() {
                    if (window.location.hash) this._openToHash();
                }.bind(this));
            }
        }
        open(selectorValue) {
            if (bodyLockStatus) {
                this.bodyLock = document.documentElement.classList.contains("lock") && !this.isOpen ? true : false;
                if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) {
                    this.targetOpen.selector = selectorValue;
                    this._selectorOpen = true;
                }
                if (this.isOpen) {
                    this._reopen = true;
                    this.close();
                }
                if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
                if (!this._reopen) this.previousActiveElement = document.activeElement;
                this.targetOpen.element = document.querySelector(this.targetOpen.selector);
                if (this.targetOpen.element) {
                    if (this.youTubeCode) {
                        const codeVideo = this.youTubeCode;
                        const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
                        const iframe = document.createElement("iframe");
                        iframe.setAttribute("allowfullscreen", "");
                        const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
                        iframe.setAttribute("allow", `${autoplay}; encrypted-media`);
                        iframe.setAttribute("src", urlVideo);
                        if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
                            this.targetOpen.element.querySelector(".popup__text").setAttribute(`${this.options.youtubePlaceAttribute}`, "");
                        }
                        this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
                    }
                    if (this.options.hashSettings.location) {
                        this._getHash();
                        this._setHash();
                    }
                    this.options.on.beforeOpen(this);
                    document.dispatchEvent(new CustomEvent("beforePopupOpen", {
                        detail: {
                            popup: this
                        }
                    }));
                    this.targetOpen.element.classList.add(this.options.classes.popupActive);
                    document.documentElement.classList.add(this.options.classes.bodyActive);
                    if (!this._reopen) !this.bodyLock ? bodyLock() : null; else this._reopen = false;
                    this.targetOpen.element.setAttribute("aria-hidden", "false");
                    this.previousOpen.selector = this.targetOpen.selector;
                    this.previousOpen.element = this.targetOpen.element;
                    this._selectorOpen = false;
                    this.isOpen = true;
                    setTimeout((() => {
                        this._focusTrap();
                    }), 50);
                    this.options.on.afterOpen(this);
                    document.dispatchEvent(new CustomEvent("afterPopupOpen", {
                        detail: {
                            popup: this
                        }
                    }));
                    this.popupLogging(`Открыл попап`);
                } else this.popupLogging(`Ой ой, такого попапа нет.Проверьте корректность ввода. `);
            }
        }
        close(selectorValue) {
            if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) this.previousOpen.selector = selectorValue;
            if (!this.isOpen || !bodyLockStatus) return;
            this.options.on.beforeClose(this);
            document.dispatchEvent(new CustomEvent("beforePopupClose", {
                detail: {
                    popup: this
                }
            }));
            if (this.youTubeCode) if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";
            this.previousOpen.element.classList.remove(this.options.classes.popupActive);
            this.previousOpen.element.setAttribute("aria-hidden", "true");
            if (!this._reopen) {
                document.documentElement.classList.remove(this.options.classes.bodyActive);
                !this.bodyLock ? bodyUnlock() : null;
                this.isOpen = false;
            }
            this._removeHash();
            if (this._selectorOpen) {
                this.lastClosed.selector = this.previousOpen.selector;
                this.lastClosed.element = this.previousOpen.element;
            }
            this.options.on.afterClose(this);
            document.dispatchEvent(new CustomEvent("afterPopupClose", {
                detail: {
                    popup: this
                }
            }));
            setTimeout((() => {
                this._focusTrap();
            }), 50);
            this.popupLogging(`Закрыл попап`);
        }
        _getHash() {
            if (this.options.hashSettings.location) this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#");
        }
        _openToHash() {
            let classInHash = document.querySelector(`.${window.location.hash.replace("#", "")}`) ? `.${window.location.hash.replace("#", "")}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
            const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace(".", "#")}"]`);
            if (buttons && classInHash) this.open(classInHash);
        }
        _setHash() {
            history.pushState("", "", this.hash);
        }
        _removeHash() {
            history.pushState("", "", window.location.href.split("#")[0]);
        }
        _focusCatch(e) {
            const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
            const focusArray = Array.prototype.slice.call(focusable);
            const focusedIndex = focusArray.indexOf(document.activeElement);
            if (e.shiftKey && 0 === focusedIndex) {
                focusArray[focusArray.length - 1].focus();
                e.preventDefault();
            }
            if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
                focusArray[0].focus();
                e.preventDefault();
            }
        }
        _focusTrap() {
            const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
            if (!this.isOpen && this.lastFocusEl) this.lastFocusEl.focus(); else focusable[0].focus();
        }
        popupLogging(message) {
            this.options.logging ? functions_FLS(`[Попапос]: ${message}`) : null;
        }
    }
    modules_flsModules.popup = new Popup({});
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const loader = document.querySelector(".loader");
    const wrapper = document.querySelector(".wrapper");
    function init() {
        setTimeout((() => {
            loader.classList.add("hide");
            wrapper.classList.add("show");
        }), 2e3);
    }
    init();
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }
    function _defineProperty(obj, key, value) {
        if (key in obj) Object.defineProperty(obj, key, {
            value,
            enumerable: true,
            configurable: true,
            writable: true
        }); else obj[key] = value;
        return obj;
    }
    function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly) symbols = symbols.filter((function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            }));
            keys.push.apply(keys, symbols);
        }
        return keys;
    }
    function _objectSpread2(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = null != arguments[i] ? arguments[i] : {};
            if (i % 2) ownKeys(Object(source), true).forEach((function(key) {
                _defineProperty(target, key, source[key]);
            })); else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); else ownKeys(Object(source)).forEach((function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            }));
        }
        return target;
    }
    function _inherits(subClass, superClass) {
        if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                writable: true,
                configurable: true
            }
        });
        if (superClass) _setPrototypeOf(subClass, superClass);
    }
    function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        };
        return _getPrototypeOf(o);
    }
    function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };
        return _setPrototypeOf(o, p);
    }
    function _isNativeReflectConstruct() {
        if ("undefined" === typeof Reflect || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if ("function" === typeof Proxy) return true;
        try {
            Date.prototype.toString.call(Reflect.construct(Date, [], (function() {})));
            return true;
        } catch (e) {
            return false;
        }
    }
    function _assertThisInitialized(self) {
        if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return self;
    }
    function _possibleConstructorReturn(self, call) {
        if (call && ("object" === typeof call || "function" === typeof call)) return call;
        return _assertThisInitialized(self);
    }
    function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
            var result, Super = _getPrototypeOf(Derived);
            if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
            } else result = Super.apply(this, arguments);
            return _possibleConstructorReturn(this, result);
        };
    }
    function _superPropBase(object, property) {
        while (!Object.prototype.hasOwnProperty.call(object, property)) {
            object = _getPrototypeOf(object);
            if (null === object) break;
        }
        return object;
    }
    function _get(target, property, receiver) {
        if ("undefined" !== typeof Reflect && Reflect.get) _get = Reflect.get; else _get = function _get(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) return desc.get.call(receiver);
            return desc.value;
        };
        return _get(target, property, receiver || target);
    }
    function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
    }
    function _iterableToArray(iter) {
        if ("undefined" !== typeof Symbol && Symbol.iterator in Object(iter)) return Array.from(iter);
    }
    function _iterableToArrayLimit(arr, i) {
        if ("undefined" === typeof Symbol || !(Symbol.iterator in Object(arr))) return;
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = void 0;
        try {
            for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);
                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n && null != _i["return"]) _i["return"]();
            } finally {
                if (_d) throw _e;
            }
        }
        return _arr;
    }
    function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if ("string" === typeof o) return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if ("Object" === n && o.constructor) n = o.constructor.name;
        if ("Map" === n || "Set" === n) return Array.from(o);
        if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
        if (null == len || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
    }
    function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var defaults = {
        el: document,
        name: "scroll",
        offset: [ 0, 0 ],
        repeat: false,
        smooth: false,
        initPosition: {
            x: 0,
            y: 0
        },
        direction: "vertical",
        gestureDirection: "vertical",
        reloadOnContextChange: false,
        lerp: .1,
        class: "is-inview",
        scrollbarContainer: false,
        scrollbarClass: "c-scrollbar",
        scrollingClass: "has-scroll-scrolling",
        draggingClass: "has-scroll-dragging",
        smoothClass: "has-scroll-smooth",
        initClass: "has-scroll-init",
        getSpeed: false,
        getDirection: false,
        scrollFromAnywhere: false,
        multiplier: 1,
        firefoxMultiplier: 50,
        touchMultiplier: 2,
        resetNativeScroll: true,
        tablet: {
            smooth: false,
            direction: "vertical",
            gestureDirection: "vertical",
            breakpoint: 1024
        },
        smartphone: {
            smooth: false,
            direction: "vertical",
            gestureDirection: "vertical"
        }
    };
    var _default = function() {
        function _default() {
            var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            _classCallCheck(this, _default);
            Object.assign(this, defaults, options);
            this.smartphone = defaults.smartphone;
            if (options.smartphone) Object.assign(this.smartphone, options.smartphone);
            this.tablet = defaults.tablet;
            if (options.tablet) Object.assign(this.tablet, options.tablet);
            this.namespace = "locomotive";
            this.html = document.documentElement;
            this.windowHeight = window.innerHeight;
            this.windowWidth = window.innerWidth;
            this.windowMiddle = {
                x: this.windowWidth / 2,
                y: this.windowHeight / 2
            };
            this.els = {};
            this.currentElements = {};
            this.listeners = {};
            this.hasScrollTicking = false;
            this.hasCallEventSet = false;
            this.checkScroll = this.checkScroll.bind(this);
            this.checkResize = this.checkResize.bind(this);
            this.checkEvent = this.checkEvent.bind(this);
            this.instance = {
                scroll: {
                    x: 0,
                    y: 0
                },
                limit: {
                    x: this.html.offsetWidth,
                    y: this.html.offsetHeight
                },
                currentElements: this.currentElements
            };
            if (this.isMobile) if (this.isTablet) this.context = "tablet"; else this.context = "smartphone"; else this.context = "desktop";
            if (this.isMobile) this.direction = this[this.context].direction;
            if ("horizontal" === this.direction) this.directionAxis = "x"; else this.directionAxis = "y";
            if (this.getDirection) this.instance.direction = null;
            if (this.getDirection) this.instance.speed = 0;
            this.html.classList.add(this.initClass);
            window.addEventListener("resize", this.checkResize, false);
        }
        _createClass(_default, [ {
            key: "init",
            value: function init() {
                this.initEvents();
            }
        }, {
            key: "checkScroll",
            value: function checkScroll() {
                this.dispatchScroll();
            }
        }, {
            key: "checkResize",
            value: function checkResize() {
                var _this = this;
                if (!this.resizeTick) {
                    this.resizeTick = true;
                    requestAnimationFrame((function() {
                        _this.resize();
                        _this.resizeTick = false;
                    }));
                }
            }
        }, {
            key: "resize",
            value: function resize() {}
        }, {
            key: "checkContext",
            value: function checkContext() {
                if (!this.reloadOnContextChange) return;
                this.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1 || this.windowWidth < this.tablet.breakpoint;
                this.isTablet = this.isMobile && this.windowWidth >= this.tablet.breakpoint;
                var oldContext = this.context;
                if (this.isMobile) if (this.isTablet) this.context = "tablet"; else this.context = "smartphone"; else this.context = "desktop";
                if (oldContext != this.context) {
                    var oldSmooth = "desktop" == oldContext ? this.smooth : this[oldContext].smooth;
                    var newSmooth = "desktop" == this.context ? this.smooth : this[this.context].smooth;
                    if (oldSmooth != newSmooth) window.location.reload();
                }
            }
        }, {
            key: "initEvents",
            value: function initEvents() {
                var _this2 = this;
                this.scrollToEls = this.el.querySelectorAll("[data-".concat(this.name, "-to]"));
                this.setScrollTo = this.setScrollTo.bind(this);
                this.scrollToEls.forEach((function(el) {
                    el.addEventListener("click", _this2.setScrollTo, false);
                }));
            }
        }, {
            key: "setScrollTo",
            value: function setScrollTo(event) {
                event.preventDefault();
                this.scrollTo(event.currentTarget.getAttribute("data-".concat(this.name, "-href")) || event.currentTarget.getAttribute("href"), {
                    offset: event.currentTarget.getAttribute("data-".concat(this.name, "-offset"))
                });
            }
        }, {
            key: "addElements",
            value: function addElements() {}
        }, {
            key: "detectElements",
            value: function detectElements(hasCallEventSet) {
                var _this3 = this;
                var scrollTop = this.instance.scroll.y;
                var scrollBottom = scrollTop + this.windowHeight;
                var scrollLeft = this.instance.scroll.x;
                var scrollRight = scrollLeft + this.windowWidth;
                Object.entries(this.els).forEach((function(_ref) {
                    var _ref2 = _slicedToArray(_ref, 2), i = _ref2[0], el = _ref2[1];
                    if (el && (!el.inView || hasCallEventSet)) if ("horizontal" === _this3.direction) {
                        if (scrollRight >= el.left && scrollLeft < el.right) _this3.setInView(el, i);
                    } else if (scrollBottom >= el.top && scrollTop < el.bottom) _this3.setInView(el, i);
                    if (el && el.inView) if ("horizontal" === _this3.direction) {
                        var width = el.right - el.left;
                        el.progress = (_this3.instance.scroll.x - (el.left - _this3.windowWidth)) / (width + _this3.windowWidth);
                        if (scrollRight < el.left || scrollLeft > el.right) _this3.setOutOfView(el, i);
                    } else {
                        var height = el.bottom - el.top;
                        el.progress = (_this3.instance.scroll.y - (el.top - _this3.windowHeight)) / (height + _this3.windowHeight);
                        if (scrollBottom < el.top || scrollTop > el.bottom) _this3.setOutOfView(el, i);
                    }
                }));
                this.hasScrollTicking = false;
            }
        }, {
            key: "setInView",
            value: function setInView(current, i) {
                this.els[i].inView = true;
                current.el.classList.add(current["class"]);
                this.currentElements[i] = current;
                if (current.call && this.hasCallEventSet) {
                    this.dispatchCall(current, "enter");
                    if (!current.repeat) this.els[i].call = false;
                }
            }
        }, {
            key: "setOutOfView",
            value: function setOutOfView(current, i) {
                var _this4 = this;
                this.els[i].inView = false;
                Object.keys(this.currentElements).forEach((function(el) {
                    el === i && delete _this4.currentElements[el];
                }));
                if (current.call && this.hasCallEventSet) this.dispatchCall(current, "exit");
                if (current.repeat) current.el.classList.remove(current["class"]);
            }
        }, {
            key: "dispatchCall",
            value: function dispatchCall(current, way) {
                this.callWay = way;
                this.callValue = current.call.split(",").map((function(item) {
                    return item.trim();
                }));
                this.callObj = current;
                if (1 == this.callValue.length) this.callValue = this.callValue[0];
                var callEvent = new Event(this.namespace + "call");
                this.el.dispatchEvent(callEvent);
            }
        }, {
            key: "dispatchScroll",
            value: function dispatchScroll() {
                var scrollEvent = new Event(this.namespace + "scroll");
                this.el.dispatchEvent(scrollEvent);
            }
        }, {
            key: "setEvents",
            value: function setEvents(event, func) {
                if (!this.listeners[event]) this.listeners[event] = [];
                var list = this.listeners[event];
                list.push(func);
                if (1 === list.length) this.el.addEventListener(this.namespace + event, this.checkEvent, false);
                if ("call" === event) {
                    this.hasCallEventSet = true;
                    this.detectElements(true);
                }
            }
        }, {
            key: "unsetEvents",
            value: function unsetEvents(event, func) {
                if (!this.listeners[event]) return;
                var list = this.listeners[event];
                var index = list.indexOf(func);
                if (index < 0) return;
                list.splice(index, 1);
                if (0 === list.index) this.el.removeEventListener(this.namespace + event, this.checkEvent, false);
            }
        }, {
            key: "checkEvent",
            value: function checkEvent(event) {
                var _this5 = this;
                var name = event.type.replace(this.namespace, "");
                var list = this.listeners[name];
                if (!list || 0 === list.length) return;
                list.forEach((function(func) {
                    switch (name) {
                      case "scroll":
                        return func(_this5.instance);

                      case "call":
                        return func(_this5.callValue, _this5.callWay, _this5.callObj);

                      default:
                        return func();
                    }
                }));
            }
        }, {
            key: "startScroll",
            value: function startScroll() {}
        }, {
            key: "stopScroll",
            value: function stopScroll() {}
        }, {
            key: "setScroll",
            value: function setScroll(x, y) {
                this.instance.scroll = {
                    x: 0,
                    y: 0
                };
            }
        }, {
            key: "destroy",
            value: function destroy() {
                var _this6 = this;
                window.removeEventListener("resize", this.checkResize, false);
                Object.keys(this.listeners).forEach((function(event) {
                    _this6.el.removeEventListener(_this6.namespace + event, _this6.checkEvent, false);
                }));
                this.listeners = {};
                this.scrollToEls.forEach((function(el) {
                    el.removeEventListener("click", _this6.setScrollTo, false);
                }));
                this.html.classList.remove(this.initClass);
            }
        } ]);
        return _default;
    }();
    var commonjsGlobal = "undefined" !== typeof globalThis ? globalThis : "undefined" !== typeof window ? window : "undefined" !== typeof __webpack_require__.g ? __webpack_require__.g : "undefined" !== typeof self ? self : {};
    function createCommonjsModule(fn, module) {
        return module = {
            exports: {}
        }, fn(module, module.exports), module.exports;
    }
    var smoothscroll = createCommonjsModule((function(module, exports) {
        (function() {
            function polyfill() {
                var w = window;
                var d = document;
                if ("scrollBehavior" in d.documentElement.style && true !== w.__forceSmoothScrollPolyfill__) return;
                var Element = w.HTMLElement || w.Element;
                var SCROLL_TIME = 468;
                var original = {
                    scroll: w.scroll || w.scrollTo,
                    scrollBy: w.scrollBy,
                    elementScroll: Element.prototype.scroll || scrollElement,
                    scrollIntoView: Element.prototype.scrollIntoView
                };
                var now = w.performance && w.performance.now ? w.performance.now.bind(w.performance) : Date.now;
                function isMicrosoftBrowser(userAgent) {
                    var userAgentPatterns = [ "MSIE ", "Trident/", "Edge/" ];
                    return new RegExp(userAgentPatterns.join("|")).test(userAgent);
                }
                var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;
                function scrollElement(x, y) {
                    this.scrollLeft = x;
                    this.scrollTop = y;
                }
                function ease(k) {
                    return .5 * (1 - Math.cos(Math.PI * k));
                }
                function shouldBailOut(firstArg) {
                    if (null === firstArg || "object" !== typeof firstArg || void 0 === firstArg.behavior || "auto" === firstArg.behavior || "instant" === firstArg.behavior) return true;
                    if ("object" === typeof firstArg && "smooth" === firstArg.behavior) return false;
                    throw new TypeError("behavior member of ScrollOptions " + firstArg.behavior + " is not a valid value for enumeration ScrollBehavior.");
                }
                function hasScrollableSpace(el, axis) {
                    if ("Y" === axis) return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
                    if ("X" === axis) return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
                }
                function canOverflow(el, axis) {
                    var overflowValue = w.getComputedStyle(el, null)["overflow" + axis];
                    return "auto" === overflowValue || "scroll" === overflowValue;
                }
                function isScrollable(el) {
                    var isScrollableY = hasScrollableSpace(el, "Y") && canOverflow(el, "Y");
                    var isScrollableX = hasScrollableSpace(el, "X") && canOverflow(el, "X");
                    return isScrollableY || isScrollableX;
                }
                function findScrollableParent(el) {
                    while (el !== d.body && false === isScrollable(el)) el = el.parentNode || el.host;
                    return el;
                }
                function step(context) {
                    var time = now();
                    var value;
                    var currentX;
                    var currentY;
                    var elapsed = (time - context.startTime) / SCROLL_TIME;
                    elapsed = elapsed > 1 ? 1 : elapsed;
                    value = ease(elapsed);
                    currentX = context.startX + (context.x - context.startX) * value;
                    currentY = context.startY + (context.y - context.startY) * value;
                    context.method.call(context.scrollable, currentX, currentY);
                    if (currentX !== context.x || currentY !== context.y) w.requestAnimationFrame(step.bind(w, context));
                }
                function smoothScroll(el, x, y) {
                    var scrollable;
                    var startX;
                    var startY;
                    var method;
                    var startTime = now();
                    if (el === d.body) {
                        scrollable = w;
                        startX = w.scrollX || w.pageXOffset;
                        startY = w.scrollY || w.pageYOffset;
                        method = original.scroll;
                    } else {
                        scrollable = el;
                        startX = el.scrollLeft;
                        startY = el.scrollTop;
                        method = scrollElement;
                    }
                    step({
                        scrollable,
                        method,
                        startTime,
                        startX,
                        startY,
                        x,
                        y
                    });
                }
                w.scroll = w.scrollTo = function() {
                    if (void 0 === arguments[0]) return;
                    if (true === shouldBailOut(arguments[0])) {
                        original.scroll.call(w, void 0 !== arguments[0].left ? arguments[0].left : "object" !== typeof arguments[0] ? arguments[0] : w.scrollX || w.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : w.scrollY || w.pageYOffset);
                        return;
                    }
                    smoothScroll.call(w, d.body, void 0 !== arguments[0].left ? ~~arguments[0].left : w.scrollX || w.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : w.scrollY || w.pageYOffset);
                };
                w.scrollBy = function() {
                    if (void 0 === arguments[0]) return;
                    if (shouldBailOut(arguments[0])) {
                        original.scrollBy.call(w, void 0 !== arguments[0].left ? arguments[0].left : "object" !== typeof arguments[0] ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0);
                        return;
                    }
                    smoothScroll.call(w, d.body, ~~arguments[0].left + (w.scrollX || w.pageXOffset), ~~arguments[0].top + (w.scrollY || w.pageYOffset));
                };
                Element.prototype.scroll = Element.prototype.scrollTo = function() {
                    if (void 0 === arguments[0]) return;
                    if (true === shouldBailOut(arguments[0])) {
                        if ("number" === typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value could not be converted");
                        original.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" !== typeof arguments[0] ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop);
                        return;
                    }
                    var left = arguments[0].left;
                    var top = arguments[0].top;
                    smoothScroll.call(this, this, "undefined" === typeof left ? this.scrollLeft : ~~left, "undefined" === typeof top ? this.scrollTop : ~~top);
                };
                Element.prototype.scrollBy = function() {
                    if (void 0 === arguments[0]) return;
                    if (true === shouldBailOut(arguments[0])) {
                        original.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop);
                        return;
                    }
                    this.scroll({
                        left: ~~arguments[0].left + this.scrollLeft,
                        top: ~~arguments[0].top + this.scrollTop,
                        behavior: arguments[0].behavior
                    });
                };
                Element.prototype.scrollIntoView = function() {
                    if (true === shouldBailOut(arguments[0])) {
                        original.scrollIntoView.call(this, void 0 === arguments[0] ? true : arguments[0]);
                        return;
                    }
                    var scrollableParent = findScrollableParent(this);
                    var parentRects = scrollableParent.getBoundingClientRect();
                    var clientRects = this.getBoundingClientRect();
                    if (scrollableParent !== d.body) {
                        smoothScroll.call(this, scrollableParent, scrollableParent.scrollLeft + clientRects.left - parentRects.left, scrollableParent.scrollTop + clientRects.top - parentRects.top);
                        if ("fixed" !== w.getComputedStyle(scrollableParent).position) w.scrollBy({
                            left: parentRects.left,
                            top: parentRects.top,
                            behavior: "smooth"
                        });
                    } else w.scrollBy({
                        left: clientRects.left,
                        top: clientRects.top,
                        behavior: "smooth"
                    });
                };
            }
            module.exports = {
                polyfill
            };
        })();
    }));
    smoothscroll.polyfill;
    var _default$1 = function(_Core) {
        _inherits(_default, _Core);
        var _super = _createSuper(_default);
        function _default() {
            var _this;
            var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            _classCallCheck(this, _default);
            _this = _super.call(this, options);
            if (_this.resetNativeScroll) {
                if (history.scrollRestoration) history.scrollRestoration = "manual";
                window.scrollTo(0, 0);
            }
            window.addEventListener("scroll", _this.checkScroll, false);
            if (void 0 === window.smoothscrollPolyfill) {
                window.smoothscrollPolyfill = smoothscroll;
                window.smoothscrollPolyfill.polyfill();
            }
            return _this;
        }
        _createClass(_default, [ {
            key: "init",
            value: function init() {
                this.instance.scroll.y = window.pageYOffset;
                this.addElements();
                this.detectElements();
                _get(_getPrototypeOf(_default.prototype), "init", this).call(this);
            }
        }, {
            key: "checkScroll",
            value: function checkScroll() {
                var _this2 = this;
                _get(_getPrototypeOf(_default.prototype), "checkScroll", this).call(this);
                if (this.getDirection) this.addDirection();
                if (this.getSpeed) {
                    this.addSpeed();
                    this.speedTs = Date.now();
                }
                this.instance.scroll.y = window.pageYOffset;
                if (Object.entries(this.els).length) if (!this.hasScrollTicking) {
                    requestAnimationFrame((function() {
                        _this2.detectElements();
                    }));
                    this.hasScrollTicking = true;
                }
            }
        }, {
            key: "addDirection",
            value: function addDirection() {
                if (window.pageYOffset > this.instance.scroll.y) {
                    if ("down" !== this.instance.direction) this.instance.direction = "down";
                } else if (window.pageYOffset < this.instance.scroll.y) if ("up" !== this.instance.direction) this.instance.direction = "up";
            }
        }, {
            key: "addSpeed",
            value: function addSpeed() {
                if (window.pageYOffset != this.instance.scroll.y) this.instance.speed = (window.pageYOffset - this.instance.scroll.y) / Math.max(1, Date.now() - this.speedTs); else this.instance.speed = 0;
            }
        }, {
            key: "resize",
            value: function resize() {
                if (Object.entries(this.els).length) {
                    this.windowHeight = window.innerHeight;
                    this.updateElements();
                }
            }
        }, {
            key: "addElements",
            value: function addElements() {
                var _this3 = this;
                this.els = {};
                var els = this.el.querySelectorAll("[data-" + this.name + "]");
                els.forEach((function(el, index) {
                    el.getBoundingClientRect();
                    var cl = el.dataset[_this3.name + "Class"] || _this3["class"];
                    var id = "string" === typeof el.dataset[_this3.name + "Id"] ? el.dataset[_this3.name + "Id"] : index;
                    var top;
                    var left;
                    var offset = "string" === typeof el.dataset[_this3.name + "Offset"] ? el.dataset[_this3.name + "Offset"].split(",") : _this3.offset;
                    var repeat = el.dataset[_this3.name + "Repeat"];
                    var call = el.dataset[_this3.name + "Call"];
                    var target = el.dataset[_this3.name + "Target"];
                    var targetEl;
                    if (void 0 !== target) targetEl = document.querySelector("".concat(target)); else targetEl = el;
                    var targetElBCR = targetEl.getBoundingClientRect();
                    top = targetElBCR.top + _this3.instance.scroll.y;
                    left = targetElBCR.left + _this3.instance.scroll.x;
                    var bottom = top + targetEl.offsetHeight;
                    var right = left + targetEl.offsetWidth;
                    if ("false" == repeat) repeat = false; else if (void 0 != repeat) repeat = true; else repeat = _this3.repeat;
                    var relativeOffset = _this3.getRelativeOffset(offset);
                    top += relativeOffset[0];
                    bottom -= relativeOffset[1];
                    var mappedEl = {
                        el,
                        targetEl,
                        id,
                        class: cl,
                        top,
                        bottom,
                        left,
                        right,
                        offset,
                        progress: 0,
                        repeat,
                        inView: false,
                        call
                    };
                    _this3.els[id] = mappedEl;
                    if (el.classList.contains(cl)) _this3.setInView(_this3.els[id], id);
                }));
            }
        }, {
            key: "updateElements",
            value: function updateElements() {
                var _this4 = this;
                Object.entries(this.els).forEach((function(_ref) {
                    var _ref2 = _slicedToArray(_ref, 2), i = _ref2[0], el = _ref2[1];
                    var top = el.targetEl.getBoundingClientRect().top + _this4.instance.scroll.y;
                    var bottom = top + el.targetEl.offsetHeight;
                    var relativeOffset = _this4.getRelativeOffset(el.offset);
                    _this4.els[i].top = top + relativeOffset[0];
                    _this4.els[i].bottom = bottom - relativeOffset[1];
                }));
                this.hasScrollTicking = false;
            }
        }, {
            key: "getRelativeOffset",
            value: function getRelativeOffset(offset) {
                var relativeOffset = [ 0, 0 ];
                if (offset) for (var i = 0; i < offset.length; i++) if ("string" == typeof offset[i]) if (offset[i].includes("%")) relativeOffset[i] = parseInt(offset[i].replace("%", "") * this.windowHeight / 100); else relativeOffset[i] = parseInt(offset[i]); else relativeOffset[i] = offset[i];
                return relativeOffset;
            }
        }, {
            key: "scrollTo",
            value: function scrollTo(target) {
                var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                var offset = parseInt(options.offset) || 0;
                var callback = options.callback ? options.callback : false;
                if ("string" === typeof target) if ("top" === target) target = this.html; else if ("bottom" === target) target = this.html.offsetHeight - window.innerHeight; else {
                    target = document.querySelector(target);
                    if (!target) return;
                } else if ("number" === typeof target) target = parseInt(target); else if (target && target.tagName) ; else {
                    console.warn("`target` parameter is not valid");
                    return;
                }
                if ("number" !== typeof target) offset = target.getBoundingClientRect().top + offset + this.instance.scroll.y; else offset = target + offset;
                var isTargetReached = function isTargetReached() {
                    return parseInt(window.pageYOffset) === parseInt(offset);
                };
                if (callback) if (isTargetReached()) {
                    callback();
                    return;
                } else {
                    var onScroll = function onScroll() {
                        if (isTargetReached()) {
                            window.removeEventListener("scroll", onScroll);
                            callback();
                        }
                    };
                    window.addEventListener("scroll", onScroll);
                }
                window.scrollTo({
                    top: offset,
                    behavior: 0 === options.duration ? "auto" : "smooth"
                });
            }
        }, {
            key: "update",
            value: function update() {
                this.addElements();
                this.detectElements();
            }
        }, {
            key: "destroy",
            value: function destroy() {
                _get(_getPrototypeOf(_default.prototype), "destroy", this).call(this);
                window.removeEventListener("scroll", this.checkScroll, false);
            }
        } ]);
        return _default;
    }(_default);
    /*
object-assign
(c) Sindre Sorhus
@license MIT
*/    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var locomotive_scroll_esm_hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
        if (null === val || void 0 === val) throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(val);
    }
    function shouldUseNative() {
        try {
            if (!Object.assign) return false;
            var test1 = new String("abc");
            test1[5] = "de";
            if ("5" === Object.getOwnPropertyNames(test1)[0]) return false;
            var test2 = {};
            for (var i = 0; i < 10; i++) test2["_" + String.fromCharCode(i)] = i;
            var order2 = Object.getOwnPropertyNames(test2).map((function(n) {
                return test2[n];
            }));
            if ("0123456789" !== order2.join("")) return false;
            var test3 = {};
            "abcdefghijklmnopqrst".split("").forEach((function(letter) {
                test3[letter] = letter;
            }));
            if ("abcdefghijklmnopqrst" !== Object.keys(Object.assign({}, test3)).join("")) return false;
            return true;
        } catch (err) {
            return false;
        }
    }
    var objectAssign = shouldUseNative() ? Object.assign : function(target, source) {
        var from;
        var to = toObject(target);
        var symbols;
        for (var s = 1; s < arguments.length; s++) {
            from = Object(arguments[s]);
            for (var key in from) if (locomotive_scroll_esm_hasOwnProperty.call(from, key)) to[key] = from[key];
            if (getOwnPropertySymbols) {
                symbols = getOwnPropertySymbols(from);
                for (var i = 0; i < symbols.length; i++) if (propIsEnumerable.call(from, symbols[i])) to[symbols[i]] = from[symbols[i]];
            }
        }
        return to;
    };
    function E() {}
    E.prototype = {
        on: function(name, callback, ctx) {
            var e = this.e || (this.e = {});
            (e[name] || (e[name] = [])).push({
                fn: callback,
                ctx
            });
            return this;
        },
        once: function(name, callback, ctx) {
            var self = this;
            function listener() {
                self.off(name, listener);
                callback.apply(ctx, arguments);
            }
            listener._ = callback;
            return this.on(name, listener, ctx);
        },
        emit: function(name) {
            var data = [].slice.call(arguments, 1);
            var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
            var i = 0;
            var len = evtArr.length;
            for (i; i < len; i++) evtArr[i].fn.apply(evtArr[i].ctx, data);
            return this;
        },
        off: function(name, callback) {
            var e = this.e || (this.e = {});
            var evts = e[name];
            var liveEvents = [];
            if (evts && callback) for (var i = 0, len = evts.length; i < len; i++) if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
            liveEvents.length ? e[name] = liveEvents : delete e[name];
            return this;
        }
    };
    var tinyEmitter = E;
    var lethargy = createCommonjsModule((function(module, exports) {
        (function() {
            var root;
            root = null !== exports ? exports : this;
            root.Lethargy = function() {
                function Lethargy(stability, sensitivity, tolerance, delay) {
                    this.stability = null != stability ? Math.abs(stability) : 8;
                    this.sensitivity = null != sensitivity ? 1 + Math.abs(sensitivity) : 100;
                    this.tolerance = null != tolerance ? 1 + Math.abs(tolerance) : 1.1;
                    this.delay = null != delay ? delay : 150;
                    this.lastUpDeltas = function() {
                        var i, ref, results;
                        results = [];
                        for (i = 1, ref = 2 * this.stability; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) results.push(null);
                        return results;
                    }.call(this);
                    this.lastDownDeltas = function() {
                        var i, ref, results;
                        results = [];
                        for (i = 1, ref = 2 * this.stability; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) results.push(null);
                        return results;
                    }.call(this);
                    this.deltasTimestamp = function() {
                        var i, ref, results;
                        results = [];
                        for (i = 1, ref = 2 * this.stability; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) results.push(null);
                        return results;
                    }.call(this);
                }
                Lethargy.prototype.check = function(e) {
                    var lastDelta;
                    e = e.originalEvent || e;
                    if (null != e.wheelDelta) lastDelta = e.wheelDelta; else if (null != e.deltaY) lastDelta = -40 * e.deltaY; else if (null != e.detail || 0 === e.detail) lastDelta = -40 * e.detail;
                    this.deltasTimestamp.push(Date.now());
                    this.deltasTimestamp.shift();
                    if (lastDelta > 0) {
                        this.lastUpDeltas.push(lastDelta);
                        this.lastUpDeltas.shift();
                        return this.isInertia(1);
                    } else {
                        this.lastDownDeltas.push(lastDelta);
                        this.lastDownDeltas.shift();
                        return this.isInertia(-1);
                    }
                };
                Lethargy.prototype.isInertia = function(direction) {
                    var lastDeltas, lastDeltasNew, lastDeltasOld, newAverage, newSum, oldAverage, oldSum;
                    lastDeltas = -1 === direction ? this.lastDownDeltas : this.lastUpDeltas;
                    if (null === lastDeltas[0]) return direction;
                    if (this.deltasTimestamp[2 * this.stability - 2] + this.delay > Date.now() && lastDeltas[0] === lastDeltas[2 * this.stability - 1]) return false;
                    lastDeltasOld = lastDeltas.slice(0, this.stability);
                    lastDeltasNew = lastDeltas.slice(this.stability, 2 * this.stability);
                    oldSum = lastDeltasOld.reduce((function(t, s) {
                        return t + s;
                    }));
                    newSum = lastDeltasNew.reduce((function(t, s) {
                        return t + s;
                    }));
                    oldAverage = oldSum / lastDeltasOld.length;
                    newAverage = newSum / lastDeltasNew.length;
                    if (Math.abs(oldAverage) < Math.abs(newAverage * this.tolerance) && this.sensitivity < Math.abs(newAverage)) return direction; else return false;
                };
                Lethargy.prototype.showLastUpDeltas = function() {
                    return this.lastUpDeltas;
                };
                Lethargy.prototype.showLastDownDeltas = function() {
                    return this.lastDownDeltas;
                };
                return Lethargy;
            }();
        }).call(commonjsGlobal);
    }));
    var support = function getSupport() {
        return {
            hasWheelEvent: "onwheel" in document,
            hasMouseWheelEvent: "onmousewheel" in document,
            hasTouch: "ontouchstart" in window || window.TouchEvent || window.DocumentTouch && document instanceof DocumentTouch,
            hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
            hasPointer: !!window.navigator.msPointerEnabled,
            hasKeyDown: "onkeydown" in document,
            isFirefox: navigator.userAgent.indexOf("Firefox") > -1
        };
    }();
    var locomotive_scroll_esm_toString = Object.prototype.toString, hasOwnProperty$1 = Object.prototype.hasOwnProperty;
    var bindallStandalone = function(object) {
        if (!object) return console.warn("bindAll requires at least one argument.");
        var functions = Array.prototype.slice.call(arguments, 1);
        if (0 === functions.length) for (var method in object) if (hasOwnProperty$1.call(object, method)) if ("function" == typeof object[method] && "[object Function]" == locomotive_scroll_esm_toString.call(object[method])) functions.push(method);
        for (var i = 0; i < functions.length; i++) {
            var f = functions[i];
            object[f] = bind(object[f], object);
        }
    };
    function bind(func, context) {
        return function() {
            return func.apply(context, arguments);
        };
    }
    var Lethargy = lethargy.Lethargy;
    var EVT_ID = "virtualscroll";
    var src = VirtualScroll;
    var keyCodes = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        SPACE: 32
    };
    function VirtualScroll(options) {
        bindallStandalone(this, "_onWheel", "_onMouseWheel", "_onTouchStart", "_onTouchMove", "_onKeyDown");
        this.el = window;
        if (options && options.el) {
            this.el = options.el;
            delete options.el;
        }
        this.options = objectAssign({
            mouseMultiplier: 1,
            touchMultiplier: 2,
            firefoxMultiplier: 15,
            keyStep: 120,
            preventTouch: false,
            unpreventTouchClass: "vs-touchmove-allowed",
            limitInertia: false,
            useKeyboard: true,
            useTouch: true
        }, options);
        if (this.options.limitInertia) this._lethargy = new Lethargy;
        this._emitter = new tinyEmitter;
        this._event = {
            y: 0,
            x: 0,
            deltaX: 0,
            deltaY: 0
        };
        this.touchStartX = null;
        this.touchStartY = null;
        this.bodyTouchAction = null;
        if (void 0 !== this.options.passive) this.listenerOptions = {
            passive: this.options.passive
        };
    }
    VirtualScroll.prototype._notify = function(e) {
        var evt = this._event;
        evt.x += evt.deltaX;
        evt.y += evt.deltaY;
        this._emitter.emit(EVT_ID, {
            x: evt.x,
            y: evt.y,
            deltaX: evt.deltaX,
            deltaY: evt.deltaY,
            originalEvent: e
        });
    };
    VirtualScroll.prototype._onWheel = function(e) {
        var options = this.options;
        if (this._lethargy && false === this._lethargy.check(e)) return;
        var evt = this._event;
        evt.deltaX = e.wheelDeltaX || -1 * e.deltaX;
        evt.deltaY = e.wheelDeltaY || -1 * e.deltaY;
        if (support.isFirefox && 1 == e.deltaMode) {
            evt.deltaX *= options.firefoxMultiplier;
            evt.deltaY *= options.firefoxMultiplier;
        }
        evt.deltaX *= options.mouseMultiplier;
        evt.deltaY *= options.mouseMultiplier;
        this._notify(e);
    };
    VirtualScroll.prototype._onMouseWheel = function(e) {
        if (this.options.limitInertia && false === this._lethargy.check(e)) return;
        var evt = this._event;
        evt.deltaX = e.wheelDeltaX ? e.wheelDeltaX : 0;
        evt.deltaY = e.wheelDeltaY ? e.wheelDeltaY : e.wheelDelta;
        this._notify(e);
    };
    VirtualScroll.prototype._onTouchStart = function(e) {
        var t = e.targetTouches ? e.targetTouches[0] : e;
        this.touchStartX = t.pageX;
        this.touchStartY = t.pageY;
    };
    VirtualScroll.prototype._onTouchMove = function(e) {
        var options = this.options;
        if (options.preventTouch && !e.target.classList.contains(options.unpreventTouchClass)) e.preventDefault();
        var evt = this._event;
        var t = e.targetTouches ? e.targetTouches[0] : e;
        evt.deltaX = (t.pageX - this.touchStartX) * options.touchMultiplier;
        evt.deltaY = (t.pageY - this.touchStartY) * options.touchMultiplier;
        this.touchStartX = t.pageX;
        this.touchStartY = t.pageY;
        this._notify(e);
    };
    VirtualScroll.prototype._onKeyDown = function(e) {
        var evt = this._event;
        evt.deltaX = evt.deltaY = 0;
        var windowHeight = window.innerHeight - 40;
        switch (e.keyCode) {
          case keyCodes.LEFT:
          case keyCodes.UP:
            evt.deltaY = this.options.keyStep;
            break;

          case keyCodes.RIGHT:
          case keyCodes.DOWN:
            evt.deltaY = -this.options.keyStep;
            break;

          case e.shiftKey:
            evt.deltaY = windowHeight;
            break;

          case keyCodes.SPACE:
            evt.deltaY = -windowHeight;
            break;

          default:
            return;
        }
        this._notify(e);
    };
    VirtualScroll.prototype._bind = function() {
        if (support.hasWheelEvent) this.el.addEventListener("wheel", this._onWheel, this.listenerOptions);
        if (support.hasMouseWheelEvent) this.el.addEventListener("mousewheel", this._onMouseWheel, this.listenerOptions);
        if (support.hasTouch && this.options.useTouch) {
            this.el.addEventListener("touchstart", this._onTouchStart, this.listenerOptions);
            this.el.addEventListener("touchmove", this._onTouchMove, this.listenerOptions);
        }
        if (support.hasPointer && support.hasTouchWin) {
            this.bodyTouchAction = document.body.style.msTouchAction;
            document.body.style.msTouchAction = "none";
            this.el.addEventListener("MSPointerDown", this._onTouchStart, true);
            this.el.addEventListener("MSPointerMove", this._onTouchMove, true);
        }
        if (support.hasKeyDown && this.options.useKeyboard) document.addEventListener("keydown", this._onKeyDown);
    };
    VirtualScroll.prototype._unbind = function() {
        if (support.hasWheelEvent) this.el.removeEventListener("wheel", this._onWheel);
        if (support.hasMouseWheelEvent) this.el.removeEventListener("mousewheel", this._onMouseWheel);
        if (support.hasTouch) {
            this.el.removeEventListener("touchstart", this._onTouchStart);
            this.el.removeEventListener("touchmove", this._onTouchMove);
        }
        if (support.hasPointer && support.hasTouchWin) {
            document.body.style.msTouchAction = this.bodyTouchAction;
            this.el.removeEventListener("MSPointerDown", this._onTouchStart, true);
            this.el.removeEventListener("MSPointerMove", this._onTouchMove, true);
        }
        if (support.hasKeyDown && this.options.useKeyboard) document.removeEventListener("keydown", this._onKeyDown);
    };
    VirtualScroll.prototype.on = function(cb, ctx) {
        this._emitter.on(EVT_ID, cb, ctx);
        var events = this._emitter.e;
        if (events && events[EVT_ID] && 1 === events[EVT_ID].length) this._bind();
    };
    VirtualScroll.prototype.off = function(cb, ctx) {
        this._emitter.off(EVT_ID, cb, ctx);
        var events = this._emitter.e;
        if (!events[EVT_ID] || events[EVT_ID].length <= 0) this._unbind();
    };
    VirtualScroll.prototype.reset = function() {
        var evt = this._event;
        evt.x = 0;
        evt.y = 0;
    };
    VirtualScroll.prototype.destroy = function() {
        this._emitter.off();
        this._unbind();
    };
    function lerp(start, end, amt) {
        return (1 - amt) * start + amt * end;
    }
    function getTranslate(el) {
        var translate = {};
        if (!window.getComputedStyle) return;
        var style = getComputedStyle(el);
        var transform = style.transform || style.webkitTransform || style.mozTransform;
        var mat = transform.match(/^matrix3d\((.+)\)$/);
        if (mat) {
            translate.x = mat ? parseFloat(mat[1].split(", ")[12]) : 0;
            translate.y = mat ? parseFloat(mat[1].split(", ")[13]) : 0;
        } else {
            mat = transform.match(/^matrix\((.+)\)$/);
            translate.x = mat ? parseFloat(mat[1].split(", ")[4]) : 0;
            translate.y = mat ? parseFloat(mat[1].split(", ")[5]) : 0;
        }
        return translate;
    }
    function getParents(elem) {
        var parents = [];
        for (;elem && elem !== document; elem = elem.parentNode) parents.push(elem);
        return parents;
    }
    var NEWTON_ITERATIONS = 4;
    var NEWTON_MIN_SLOPE = .001;
    var SUBDIVISION_PRECISION = 1e-7;
    var SUBDIVISION_MAX_ITERATIONS = 10;
    var kSplineTableSize = 11;
    var kSampleStepSize = 1 / (kSplineTableSize - 1);
    var float32ArraySupported = "function" === typeof Float32Array;
    function A(aA1, aA2) {
        return 1 - 3 * aA2 + 3 * aA1;
    }
    function B(aA1, aA2) {
        return 3 * aA2 - 6 * aA1;
    }
    function C(aA1) {
        return 3 * aA1;
    }
    function calcBezier(aT, aA1, aA2) {
        return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
    }
    function getSlope(aT, aA1, aA2) {
        return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1);
    }
    function binarySubdivide(aX, aA, aB, mX1, mX2) {
        var currentX, currentT, i = 0;
        do {
            currentT = aA + (aB - aA) / 2;
            currentX = calcBezier(currentT, mX1, mX2) - aX;
            if (currentX > 0) aB = currentT; else aA = currentT;
        } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
        return currentT;
    }
    function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
        for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
            var currentSlope = getSlope(aGuessT, mX1, mX2);
            if (0 === currentSlope) return aGuessT;
            var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
            aGuessT -= currentX / currentSlope;
        }
        return aGuessT;
    }
    function LinearEasing(x) {
        return x;
    }
    var src$1 = function bezier(mX1, mY1, mX2, mY2) {
        if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) throw new Error("bezier x values must be in [0, 1] range");
        if (mX1 === mY1 && mX2 === mY2) return LinearEasing;
        var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
        for (var i = 0; i < kSplineTableSize; ++i) sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
        function getTForX(aX) {
            var intervalStart = 0;
            var currentSample = 1;
            var lastSample = kSplineTableSize - 1;
            for (;currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) intervalStart += kSampleStepSize;
            --currentSample;
            var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
            var guessForT = intervalStart + dist * kSampleStepSize;
            var initialSlope = getSlope(guessForT, mX1, mX2);
            if (initialSlope >= NEWTON_MIN_SLOPE) return newtonRaphsonIterate(aX, guessForT, mX1, mX2); else if (0 === initialSlope) return guessForT; else return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
        }
        return function BezierEasing(x) {
            if (0 === x) return 0;
            if (1 === x) return 1;
            return calcBezier(getTForX(x), mY1, mY2);
        };
    };
    var keyCodes$1 = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        SPACE: 32,
        TAB: 9,
        PAGEUP: 33,
        PAGEDOWN: 34,
        HOME: 36,
        END: 35
    };
    var _default$2 = function(_Core) {
        _inherits(_default, _Core);
        var _super = _createSuper(_default);
        function _default() {
            var _this;
            var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            _classCallCheck(this, _default);
            if (history.scrollRestoration) history.scrollRestoration = "manual";
            window.scrollTo(0, 0);
            _this = _super.call(this, options);
            if (_this.inertia) _this.lerp = .1 * _this.inertia;
            _this.isScrolling = false;
            _this.isDraggingScrollbar = false;
            _this.isTicking = false;
            _this.hasScrollTicking = false;
            _this.parallaxElements = {};
            _this.stop = false;
            _this.scrollbarContainer = options.scrollbarContainer;
            _this.checkKey = _this.checkKey.bind(_assertThisInitialized(_this));
            window.addEventListener("keydown", _this.checkKey, false);
            return _this;
        }
        _createClass(_default, [ {
            key: "init",
            value: function init() {
                var _this2 = this;
                this.html.classList.add(this.smoothClass);
                this.html.setAttribute("data-".concat(this.name, "-direction"), this.direction);
                this.instance = _objectSpread2({
                    delta: {
                        x: this.initPosition.x,
                        y: this.initPosition.y
                    },
                    scroll: {
                        x: this.initPosition.x,
                        y: this.initPosition.y
                    }
                }, this.instance);
                this.vs = new src({
                    el: this.scrollFromAnywhere ? document : this.el,
                    mouseMultiplier: navigator.platform.indexOf("Win") > -1 ? 1 : .4,
                    firefoxMultiplier: this.firefoxMultiplier,
                    touchMultiplier: this.touchMultiplier,
                    useKeyboard: false,
                    passive: true
                });
                this.vs.on((function(e) {
                    if (_this2.stop) return;
                    if (!_this2.isDraggingScrollbar) requestAnimationFrame((function() {
                        _this2.updateDelta(e);
                        if (!_this2.isScrolling) _this2.startScrolling();
                    }));
                }));
                this.setScrollLimit();
                this.initScrollBar();
                this.addSections();
                this.addElements();
                this.checkScroll(true);
                this.transformElements(true, true);
                _get(_getPrototypeOf(_default.prototype), "init", this).call(this);
            }
        }, {
            key: "setScrollLimit",
            value: function setScrollLimit() {
                this.instance.limit.y = this.el.offsetHeight - this.windowHeight;
                if ("horizontal" === this.direction) {
                    var totalWidth = 0;
                    var nodes = this.el.children;
                    for (var i = 0; i < nodes.length; i++) totalWidth += nodes[i].offsetWidth;
                    this.instance.limit.x = totalWidth - this.windowWidth;
                }
            }
        }, {
            key: "startScrolling",
            value: function startScrolling() {
                this.startScrollTs = Date.now();
                this.isScrolling = true;
                this.checkScroll();
                this.html.classList.add(this.scrollingClass);
            }
        }, {
            key: "stopScrolling",
            value: function stopScrolling() {
                cancelAnimationFrame(this.checkScrollRaf);
                this.startScrollTs = void 0;
                if (this.scrollToRaf) {
                    cancelAnimationFrame(this.scrollToRaf);
                    this.scrollToRaf = null;
                }
                this.isScrolling = false;
                this.instance.scroll.y = Math.round(this.instance.scroll.y);
                this.html.classList.remove(this.scrollingClass);
            }
        }, {
            key: "checkKey",
            value: function checkKey(e) {
                var _this3 = this;
                if (this.stop) {
                    if (e.keyCode == keyCodes$1.TAB) requestAnimationFrame((function() {
                        _this3.html.scrollTop = 0;
                        document.body.scrollTop = 0;
                        _this3.html.scrollLeft = 0;
                        document.body.scrollLeft = 0;
                    }));
                    return;
                }
                switch (e.keyCode) {
                  case keyCodes$1.TAB:
                    requestAnimationFrame((function() {
                        _this3.html.scrollTop = 0;
                        document.body.scrollTop = 0;
                        _this3.html.scrollLeft = 0;
                        document.body.scrollLeft = 0;
                        _this3.scrollTo(document.activeElement, {
                            offset: -window.innerHeight / 2
                        });
                    }));
                    break;

                  case keyCodes$1.UP:
                    if (this.isActiveElementScrollSensitive()) this.instance.delta[this.directionAxis] -= 240;
                    break;

                  case keyCodes$1.DOWN:
                    if (this.isActiveElementScrollSensitive()) this.instance.delta[this.directionAxis] += 240;
                    break;

                  case keyCodes$1.PAGEUP:
                    this.instance.delta[this.directionAxis] -= window.innerHeight;
                    break;

                  case keyCodes$1.PAGEDOWN:
                    this.instance.delta[this.directionAxis] += window.innerHeight;
                    break;

                  case keyCodes$1.HOME:
                    this.instance.delta[this.directionAxis] -= this.instance.limit[this.directionAxis];
                    break;

                  case keyCodes$1.END:
                    this.instance.delta[this.directionAxis] += this.instance.limit[this.directionAxis];
                    break;

                  case keyCodes$1.SPACE:
                    if (this.isActiveElementScrollSensitive()) if (e.shiftKey) this.instance.delta[this.directionAxis] -= window.innerHeight; else this.instance.delta[this.directionAxis] += window.innerHeight;
                    break;

                  default:
                    return;
                }
                if (this.instance.delta[this.directionAxis] < 0) this.instance.delta[this.directionAxis] = 0;
                if (this.instance.delta[this.directionAxis] > this.instance.limit[this.directionAxis]) this.instance.delta[this.directionAxis] = this.instance.limit[this.directionAxis];
                this.stopScrolling();
                this.isScrolling = true;
                this.checkScroll();
                this.html.classList.add(this.scrollingClass);
            }
        }, {
            key: "isActiveElementScrollSensitive",
            value: function isActiveElementScrollSensitive() {
                return !(document.activeElement instanceof HTMLInputElement) && !(document.activeElement instanceof HTMLTextAreaElement) && !(document.activeElement instanceof HTMLButtonElement) && !(document.activeElement instanceof HTMLSelectElement);
            }
        }, {
            key: "checkScroll",
            value: function checkScroll() {
                var _this4 = this;
                var forced = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : false;
                if (forced || this.isScrolling || this.isDraggingScrollbar) {
                    if (!this.hasScrollTicking) {
                        this.checkScrollRaf = requestAnimationFrame((function() {
                            return _this4.checkScroll();
                        }));
                        this.hasScrollTicking = true;
                    }
                    this.updateScroll();
                    var distance = Math.abs(this.instance.delta[this.directionAxis] - this.instance.scroll[this.directionAxis]);
                    var timeSinceStart = Date.now() - this.startScrollTs;
                    if (!this.animatingScroll && timeSinceStart > 100 && (distance < .5 && 0 != this.instance.delta[this.directionAxis] || distance < .5 && 0 == this.instance.delta[this.directionAxis])) this.stopScrolling();
                    Object.entries(this.sections).forEach((function(_ref) {
                        var _ref2 = _slicedToArray(_ref, 2), section = (_ref2[0], _ref2[1]);
                        if (section.persistent || _this4.instance.scroll[_this4.directionAxis] > section.offset[_this4.directionAxis] && _this4.instance.scroll[_this4.directionAxis] < section.limit[_this4.directionAxis]) {
                            if ("horizontal" === _this4.direction) _this4.transform(section.el, -_this4.instance.scroll[_this4.directionAxis], 0); else _this4.transform(section.el, 0, -_this4.instance.scroll[_this4.directionAxis]);
                            if (!section.inView) {
                                section.inView = true;
                                section.el.style.opacity = 1;
                                section.el.style.pointerEvents = "all";
                                section.el.setAttribute("data-".concat(_this4.name, "-section-inview"), "");
                            }
                        } else {
                            if (section.inView || forced) {
                                section.inView = false;
                                section.el.style.opacity = 0;
                                section.el.style.pointerEvents = "none";
                                section.el.removeAttribute("data-".concat(_this4.name, "-section-inview"));
                            }
                            _this4.transform(section.el, 0, 0);
                        }
                    }));
                    if (this.getDirection) this.addDirection();
                    if (this.getSpeed) {
                        this.addSpeed();
                        this.speedTs = Date.now();
                    }
                    this.detectElements();
                    this.transformElements();
                    if (this.hasScrollbar) {
                        var scrollBarTranslation = this.instance.scroll[this.directionAxis] / this.instance.limit[this.directionAxis] * this.scrollBarLimit[this.directionAxis];
                        if ("horizontal" === this.direction) this.transform(this.scrollbarThumb, scrollBarTranslation, 0); else this.transform(this.scrollbarThumb, 0, scrollBarTranslation);
                    }
                    _get(_getPrototypeOf(_default.prototype), "checkScroll", this).call(this);
                    this.hasScrollTicking = false;
                }
            }
        }, {
            key: "resize",
            value: function resize() {
                this.windowHeight = window.innerHeight;
                this.windowWidth = window.innerWidth;
                this.checkContext();
                this.windowMiddle = {
                    x: this.windowWidth / 2,
                    y: this.windowHeight / 2
                };
                this.update();
            }
        }, {
            key: "updateDelta",
            value: function updateDelta(e) {
                var delta;
                var gestureDirection = this[this.context] && this[this.context].gestureDirection ? this[this.context].gestureDirection : this.gestureDirection;
                if ("both" === gestureDirection) delta = e.deltaX + e.deltaY; else if ("vertical" === gestureDirection) delta = e.deltaY; else if ("horizontal" === gestureDirection) delta = e.deltaX; else delta = e.deltaY;
                this.instance.delta[this.directionAxis] -= delta * this.multiplier;
                if (this.instance.delta[this.directionAxis] < 0) this.instance.delta[this.directionAxis] = 0;
                if (this.instance.delta[this.directionAxis] > this.instance.limit[this.directionAxis]) this.instance.delta[this.directionAxis] = this.instance.limit[this.directionAxis];
            }
        }, {
            key: "updateScroll",
            value: function updateScroll(e) {
                if (this.isScrolling || this.isDraggingScrollbar) this.instance.scroll[this.directionAxis] = lerp(this.instance.scroll[this.directionAxis], this.instance.delta[this.directionAxis], this.lerp); else if (this.instance.scroll[this.directionAxis] > this.instance.limit[this.directionAxis]) this.setScroll(this.instance.scroll[this.directionAxis], this.instance.limit[this.directionAxis]); else if (this.instance.scroll.y < 0) this.setScroll(this.instance.scroll[this.directionAxis], 0); else this.setScroll(this.instance.scroll[this.directionAxis], this.instance.delta[this.directionAxis]);
            }
        }, {
            key: "addDirection",
            value: function addDirection() {
                if (this.instance.delta.y > this.instance.scroll.y) {
                    if ("down" !== this.instance.direction) this.instance.direction = "down";
                } else if (this.instance.delta.y < this.instance.scroll.y) if ("up" !== this.instance.direction) this.instance.direction = "up";
                if (this.instance.delta.x > this.instance.scroll.x) {
                    if ("right" !== this.instance.direction) this.instance.direction = "right";
                } else if (this.instance.delta.x < this.instance.scroll.x) if ("left" !== this.instance.direction) this.instance.direction = "left";
            }
        }, {
            key: "addSpeed",
            value: function addSpeed() {
                if (this.instance.delta[this.directionAxis] != this.instance.scroll[this.directionAxis]) this.instance.speed = (this.instance.delta[this.directionAxis] - this.instance.scroll[this.directionAxis]) / Math.max(1, Date.now() - this.speedTs); else this.instance.speed = 0;
            }
        }, {
            key: "initScrollBar",
            value: function initScrollBar() {
                this.scrollbar = document.createElement("span");
                this.scrollbarThumb = document.createElement("span");
                this.scrollbar.classList.add("".concat(this.scrollbarClass));
                this.scrollbarThumb.classList.add("".concat(this.scrollbarClass, "_thumb"));
                this.scrollbar.append(this.scrollbarThumb);
                if (this.scrollbarContainer) this.scrollbarContainer.append(this.scrollbar); else document.body.append(this.scrollbar);
                this.getScrollBar = this.getScrollBar.bind(this);
                this.releaseScrollBar = this.releaseScrollBar.bind(this);
                this.moveScrollBar = this.moveScrollBar.bind(this);
                this.scrollbarThumb.addEventListener("mousedown", this.getScrollBar);
                window.addEventListener("mouseup", this.releaseScrollBar);
                window.addEventListener("mousemove", this.moveScrollBar);
                this.hasScrollbar = false;
                if ("horizontal" == this.direction) {
                    if (this.instance.limit.x + this.windowWidth <= this.windowWidth) return;
                } else if (this.instance.limit.y + this.windowHeight <= this.windowHeight) return;
                this.hasScrollbar = true;
                this.scrollbarBCR = this.scrollbar.getBoundingClientRect();
                this.scrollbarHeight = this.scrollbarBCR.height;
                this.scrollbarWidth = this.scrollbarBCR.width;
                if ("horizontal" === this.direction) this.scrollbarThumb.style.width = "".concat(this.scrollbarWidth * this.scrollbarWidth / (this.instance.limit.x + this.scrollbarWidth), "px"); else this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit.y + this.scrollbarHeight), "px");
                this.scrollbarThumbBCR = this.scrollbarThumb.getBoundingClientRect();
                this.scrollBarLimit = {
                    x: this.scrollbarWidth - this.scrollbarThumbBCR.width,
                    y: this.scrollbarHeight - this.scrollbarThumbBCR.height
                };
            }
        }, {
            key: "reinitScrollBar",
            value: function reinitScrollBar() {
                this.hasScrollbar = false;
                if ("horizontal" == this.direction) {
                    if (this.instance.limit.x + this.windowWidth <= this.windowWidth) return;
                } else if (this.instance.limit.y + this.windowHeight <= this.windowHeight) return;
                this.hasScrollbar = true;
                this.scrollbarBCR = this.scrollbar.getBoundingClientRect();
                this.scrollbarHeight = this.scrollbarBCR.height;
                this.scrollbarWidth = this.scrollbarBCR.width;
                if ("horizontal" === this.direction) this.scrollbarThumb.style.width = "".concat(this.scrollbarWidth * this.scrollbarWidth / (this.instance.limit.x + this.scrollbarWidth), "px"); else this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit.y + this.scrollbarHeight), "px");
                this.scrollbarThumbBCR = this.scrollbarThumb.getBoundingClientRect();
                this.scrollBarLimit = {
                    x: this.scrollbarWidth - this.scrollbarThumbBCR.width,
                    y: this.scrollbarHeight - this.scrollbarThumbBCR.height
                };
            }
        }, {
            key: "destroyScrollBar",
            value: function destroyScrollBar() {
                this.scrollbarThumb.removeEventListener("mousedown", this.getScrollBar);
                window.removeEventListener("mouseup", this.releaseScrollBar);
                window.removeEventListener("mousemove", this.moveScrollBar);
                this.scrollbar.remove();
            }
        }, {
            key: "getScrollBar",
            value: function getScrollBar(e) {
                this.isDraggingScrollbar = true;
                this.checkScroll();
                this.html.classList.remove(this.scrollingClass);
                this.html.classList.add(this.draggingClass);
            }
        }, {
            key: "releaseScrollBar",
            value: function releaseScrollBar(e) {
                this.isDraggingScrollbar = false;
                if (this.isScrolling) this.html.classList.add(this.scrollingClass);
                this.html.classList.remove(this.draggingClass);
            }
        }, {
            key: "moveScrollBar",
            value: function moveScrollBar(e) {
                var _this5 = this;
                if (this.isDraggingScrollbar) requestAnimationFrame((function() {
                    var x = 100 * (e.clientX - _this5.scrollbarBCR.left) / _this5.scrollbarWidth * _this5.instance.limit.x / 100;
                    var y = 100 * (e.clientY - _this5.scrollbarBCR.top) / _this5.scrollbarHeight * _this5.instance.limit.y / 100;
                    if (y > 0 && y < _this5.instance.limit.y) _this5.instance.delta.y = y;
                    if (x > 0 && x < _this5.instance.limit.x) _this5.instance.delta.x = x;
                }));
            }
        }, {
            key: "addElements",
            value: function addElements() {
                var _this6 = this;
                this.els = {};
                this.parallaxElements = {};
                var els = this.el.querySelectorAll("[data-".concat(this.name, "]"));
                els.forEach((function(el, index) {
                    var targetParents = getParents(el);
                    var section = Object.entries(_this6.sections).map((function(_ref3) {
                        var _ref4 = _slicedToArray(_ref3, 2), section = (_ref4[0], _ref4[1]);
                        return section;
                    })).find((function(section) {
                        return targetParents.includes(section.el);
                    }));
                    var cl = el.dataset[_this6.name + "Class"] || _this6["class"];
                    var id = "string" === typeof el.dataset[_this6.name + "Id"] ? el.dataset[_this6.name + "Id"] : "el" + index;
                    var top;
                    var left;
                    var repeat = el.dataset[_this6.name + "Repeat"];
                    var call = el.dataset[_this6.name + "Call"];
                    var position = el.dataset[_this6.name + "Position"];
                    var delay = el.dataset[_this6.name + "Delay"];
                    var direction = el.dataset[_this6.name + "Direction"];
                    var sticky = "string" === typeof el.dataset[_this6.name + "Sticky"];
                    var speed = el.dataset[_this6.name + "Speed"] ? parseFloat(el.dataset[_this6.name + "Speed"]) / 10 : false;
                    var offset = "string" === typeof el.dataset[_this6.name + "Offset"] ? el.dataset[_this6.name + "Offset"].split(",") : _this6.offset;
                    var target = el.dataset[_this6.name + "Target"];
                    var targetEl;
                    if (void 0 !== target) targetEl = document.querySelector("".concat(target)); else targetEl = el;
                    var targetElBCR = targetEl.getBoundingClientRect();
                    if (null === section) {
                        top = targetElBCR.top + _this6.instance.scroll.y - getTranslate(targetEl).y;
                        left = targetElBCR.left + _this6.instance.scroll.x - getTranslate(targetEl).x;
                    } else if (!section.inView) {
                        top = targetElBCR.top - getTranslate(section.el).y - getTranslate(targetEl).y;
                        left = targetElBCR.left - getTranslate(section.el).x - getTranslate(targetEl).x;
                    } else {
                        top = targetElBCR.top + _this6.instance.scroll.y - getTranslate(targetEl).y;
                        left = targetElBCR.left + _this6.instance.scroll.x - getTranslate(targetEl).x;
                    }
                    var bottom = top + targetEl.offsetHeight;
                    var right = left + targetEl.offsetWidth;
                    var middle = {
                        x: (right - left) / 2 + left,
                        y: (bottom - top) / 2 + top
                    };
                    if (sticky) {
                        var elBCR = el.getBoundingClientRect();
                        var elTop = elBCR.top;
                        var elLeft = elBCR.left;
                        var elDistance = {
                            x: elLeft - left,
                            y: elTop - top
                        };
                        top += window.innerHeight;
                        left += window.innerWidth;
                        bottom = elTop + targetEl.offsetHeight - el.offsetHeight - elDistance[_this6.directionAxis];
                        right = elLeft + targetEl.offsetWidth - el.offsetWidth - elDistance[_this6.directionAxis];
                        middle = {
                            x: (right - left) / 2 + left,
                            y: (bottom - top) / 2 + top
                        };
                    }
                    if ("false" == repeat) repeat = false; else if (void 0 != repeat) repeat = true; else repeat = _this6.repeat;
                    var relativeOffset = [ 0, 0 ];
                    if (offset) if ("horizontal" === _this6.direction) {
                        for (var i = 0; i < offset.length; i++) if ("string" == typeof offset[i]) if (offset[i].includes("%")) relativeOffset[i] = parseInt(offset[i].replace("%", "") * _this6.windowWidth / 100); else relativeOffset[i] = parseInt(offset[i]); else relativeOffset[i] = offset[i];
                        left += relativeOffset[0];
                        right -= relativeOffset[1];
                    } else {
                        for (i = 0; i < offset.length; i++) if ("string" == typeof offset[i]) if (offset[i].includes("%")) relativeOffset[i] = parseInt(offset[i].replace("%", "") * _this6.windowHeight / 100); else relativeOffset[i] = parseInt(offset[i]); else relativeOffset[i] = offset[i];
                        top += relativeOffset[0];
                        bottom -= relativeOffset[1];
                    }
                    var mappedEl = {
                        el,
                        id,
                        class: cl,
                        section,
                        top,
                        middle,
                        bottom,
                        left,
                        right,
                        offset,
                        progress: 0,
                        repeat,
                        inView: false,
                        call,
                        speed,
                        delay,
                        position,
                        target: targetEl,
                        direction,
                        sticky
                    };
                    _this6.els[id] = mappedEl;
                    if (el.classList.contains(cl)) _this6.setInView(_this6.els[id], id);
                    if (false !== speed || sticky) _this6.parallaxElements[id] = mappedEl;
                }));
            }
        }, {
            key: "addSections",
            value: function addSections() {
                var _this7 = this;
                this.sections = {};
                var sections = this.el.querySelectorAll("[data-".concat(this.name, "-section]"));
                if (0 === sections.length) sections = [ this.el ];
                sections.forEach((function(section, index) {
                    var id = "string" === typeof section.dataset[_this7.name + "Id"] ? section.dataset[_this7.name + "Id"] : "section" + index;
                    var sectionBCR = section.getBoundingClientRect();
                    var offset = {
                        x: sectionBCR.left - 1.5 * window.innerWidth - getTranslate(section).x,
                        y: sectionBCR.top - 1.5 * window.innerHeight - getTranslate(section).y
                    };
                    var limit = {
                        x: offset.x + sectionBCR.width + 2 * window.innerWidth,
                        y: offset.y + sectionBCR.height + 2 * window.innerHeight
                    };
                    var persistent = "string" === typeof section.dataset[_this7.name + "Persistent"];
                    section.setAttribute("data-scroll-section-id", id);
                    var mappedSection = {
                        el: section,
                        offset,
                        limit,
                        inView: false,
                        persistent,
                        id
                    };
                    _this7.sections[id] = mappedSection;
                }));
            }
        }, {
            key: "transform",
            value: function transform(element, x, y, delay) {
                var transform;
                if (!delay) transform = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(x, ",").concat(y, ",0,1)"); else {
                    var start = getTranslate(element);
                    var lerpX = lerp(start.x, x, delay);
                    var lerpY = lerp(start.y, y, delay);
                    transform = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(lerpX, ",").concat(lerpY, ",0,1)");
                }
                element.style.webkitTransform = transform;
                element.style.msTransform = transform;
                element.style.transform = transform;
            }
        }, {
            key: "transformElements",
            value: function transformElements(isForced) {
                var _this8 = this;
                var setAllElements = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : false;
                var scrollRight = this.instance.scroll.x + this.windowWidth;
                var scrollBottom = this.instance.scroll.y + this.windowHeight;
                var scrollMiddle = {
                    x: this.instance.scroll.x + this.windowMiddle.x,
                    y: this.instance.scroll.y + this.windowMiddle.y
                };
                Object.entries(this.parallaxElements).forEach((function(_ref5) {
                    var _ref6 = _slicedToArray(_ref5, 2), current = (_ref6[0], _ref6[1]);
                    var transformDistance = false;
                    if (isForced) transformDistance = 0;
                    if (current.inView || setAllElements) switch (current.position) {
                      case "top":
                        transformDistance = _this8.instance.scroll[_this8.directionAxis] * -current.speed;
                        break;

                      case "elementTop":
                        transformDistance = (scrollBottom - current.top) * -current.speed;
                        break;

                      case "bottom":
                        transformDistance = (_this8.instance.limit[_this8.directionAxis] - scrollBottom + _this8.windowHeight) * current.speed;
                        break;

                      case "left":
                        transformDistance = _this8.instance.scroll[_this8.directionAxis] * -current.speed;
                        break;

                      case "elementLeft":
                        transformDistance = (scrollRight - current.left) * -current.speed;
                        break;

                      case "right":
                        transformDistance = (_this8.instance.limit[_this8.directionAxis] - scrollRight + _this8.windowHeight) * current.speed;
                        break;

                      default:
                        transformDistance = (scrollMiddle[_this8.directionAxis] - current.middle[_this8.directionAxis]) * -current.speed;
                        break;
                    }
                    if (current.sticky) if (current.inView) if ("horizontal" === _this8.direction) transformDistance = _this8.instance.scroll.x - current.left + window.innerWidth; else transformDistance = _this8.instance.scroll.y - current.top + window.innerHeight; else if ("horizontal" === _this8.direction) if (_this8.instance.scroll.x < current.left - window.innerWidth && _this8.instance.scroll.x < current.left - window.innerWidth / 2) transformDistance = 0; else if (_this8.instance.scroll.x > current.right && _this8.instance.scroll.x > current.right + 100) transformDistance = current.right - current.left + window.innerWidth; else transformDistance = false; else if (_this8.instance.scroll.y < current.top - window.innerHeight && _this8.instance.scroll.y < current.top - window.innerHeight / 2) transformDistance = 0; else if (_this8.instance.scroll.y > current.bottom && _this8.instance.scroll.y > current.bottom + 100) transformDistance = current.bottom - current.top + window.innerHeight; else transformDistance = false;
                    if (false !== transformDistance) if ("horizontal" === current.direction || "horizontal" === _this8.direction && "vertical" !== current.direction) _this8.transform(current.el, transformDistance, 0, isForced ? false : current.delay); else _this8.transform(current.el, 0, transformDistance, isForced ? false : current.delay);
                }));
            }
        }, {
            key: "scrollTo",
            value: function scrollTo(target) {
                var _this9 = this;
                var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                var offset = parseInt(options.offset) || 0;
                var duration = !isNaN(parseInt(options.duration)) ? parseInt(options.duration) : 1e3;
                var easing = options.easing || [ .25, 0, .35, 1 ];
                var disableLerp = options.disableLerp ? true : false;
                var callback = options.callback ? options.callback : false;
                easing = src$1.apply(void 0, _toConsumableArray(easing));
                if ("string" === typeof target) if ("top" === target) target = 0; else if ("bottom" === target) target = this.instance.limit.y; else if ("left" === target) target = 0; else if ("right" === target) target = this.instance.limit.x; else {
                    target = document.querySelector(target);
                    if (!target) return;
                } else if ("number" === typeof target) target = parseInt(target); else if (target && target.tagName) ; else {
                    console.warn("`target` parameter is not valid");
                    return;
                }
                if ("number" !== typeof target) {
                    var targetInScope = getParents(target).includes(this.el);
                    if (!targetInScope) return;
                    var targetBCR = target.getBoundingClientRect();
                    var offsetTop = targetBCR.top;
                    var offsetLeft = targetBCR.left;
                    var targetParents = getParents(target);
                    var parentSection = targetParents.find((function(candidate) {
                        return Object.entries(_this9.sections).map((function(_ref7) {
                            var _ref8 = _slicedToArray(_ref7, 2), section = (_ref8[0], _ref8[1]);
                            return section;
                        })).find((function(section) {
                            return section.el == candidate;
                        }));
                    }));
                    var parentSectionOffset = 0;
                    if (parentSection) parentSectionOffset = getTranslate(parentSection)[this.directionAxis]; else parentSectionOffset = -this.instance.scroll[this.directionAxis];
                    if ("horizontal" === this.direction) offset = offsetLeft + offset - parentSectionOffset; else offset = offsetTop + offset - parentSectionOffset;
                } else offset = target + offset;
                var scrollStart = parseFloat(this.instance.delta[this.directionAxis]);
                var scrollTarget = Math.max(0, Math.min(offset, this.instance.limit[this.directionAxis]));
                var scrollDiff = scrollTarget - scrollStart;
                var render = function render(p) {
                    if (disableLerp) if ("horizontal" === _this9.direction) _this9.setScroll(scrollStart + scrollDiff * p, _this9.instance.delta.y); else _this9.setScroll(_this9.instance.delta.x, scrollStart + scrollDiff * p); else _this9.instance.delta[_this9.directionAxis] = scrollStart + scrollDiff * p;
                };
                this.animatingScroll = true;
                this.stopScrolling();
                this.startScrolling();
                var start = Date.now();
                var loop = function loop() {
                    var p = (Date.now() - start) / duration;
                    if (p > 1) {
                        render(1);
                        _this9.animatingScroll = false;
                        if (0 == duration) _this9.update();
                        if (callback) callback();
                    } else {
                        _this9.scrollToRaf = requestAnimationFrame(loop);
                        render(easing(p));
                    }
                };
                loop();
            }
        }, {
            key: "update",
            value: function update() {
                this.setScrollLimit();
                this.addSections();
                this.addElements();
                this.detectElements();
                this.updateScroll();
                this.transformElements(true);
                this.reinitScrollBar();
                this.checkScroll(true);
            }
        }, {
            key: "startScroll",
            value: function startScroll() {
                this.stop = false;
            }
        }, {
            key: "stopScroll",
            value: function stopScroll() {
                this.stop = true;
            }
        }, {
            key: "setScroll",
            value: function setScroll(x, y) {
                this.instance = _objectSpread2(_objectSpread2({}, this.instance), {}, {
                    scroll: {
                        x,
                        y
                    },
                    delta: {
                        x,
                        y
                    },
                    speed: 0
                });
            }
        }, {
            key: "destroy",
            value: function destroy() {
                _get(_getPrototypeOf(_default.prototype), "destroy", this).call(this);
                this.stopScrolling();
                this.html.classList.remove(this.smoothClass);
                this.vs.destroy();
                this.destroyScrollBar();
                window.removeEventListener("keydown", this.checkKey, false);
            }
        } ]);
        return _default;
    }(_default);
    var Smooth = function() {
        function Smooth() {
            var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            _classCallCheck(this, Smooth);
            this.options = options;
            Object.assign(this, defaults, options);
            this.smartphone = defaults.smartphone;
            if (options.smartphone) Object.assign(this.smartphone, options.smartphone);
            this.tablet = defaults.tablet;
            if (options.tablet) Object.assign(this.tablet, options.tablet);
            if (!this.smooth && "horizontal" == this.direction) console.warn("🚨 `smooth:false` & `horizontal` direction are not yet compatible");
            if (!this.tablet.smooth && "horizontal" == this.tablet.direction) console.warn("🚨 `smooth:false` & `horizontal` direction are not yet compatible (tablet)");
            if (!this.smartphone.smooth && "horizontal" == this.smartphone.direction) console.warn("🚨 `smooth:false` & `horizontal` direction are not yet compatible (smartphone)");
            this.init();
        }
        _createClass(Smooth, [ {
            key: "init",
            value: function init() {
                this.options.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1 || window.innerWidth < this.tablet.breakpoint;
                this.options.isTablet = this.options.isMobile && window.innerWidth >= this.tablet.breakpoint;
                if (this.smooth && !this.options.isMobile || this.tablet.smooth && this.options.isTablet || this.smartphone.smooth && this.options.isMobile && !this.options.isTablet) this.scroll = new _default$2(this.options); else this.scroll = new _default$1(this.options);
                this.scroll.init();
                if (window.location.hash) {
                    var id = window.location.hash.slice(1, window.location.hash.length);
                    var target = document.getElementById(id);
                    if (target) this.scroll.scrollTo(target);
                }
            }
        }, {
            key: "update",
            value: function update() {
                this.scroll.update();
            }
        }, {
            key: "start",
            value: function start() {
                this.scroll.startScroll();
            }
        }, {
            key: "stop",
            value: function stop() {
                this.scroll.stopScroll();
            }
        }, {
            key: "scrollTo",
            value: function scrollTo(target, options) {
                this.scroll.scrollTo(target, options);
            }
        }, {
            key: "setScroll",
            value: function setScroll(x, y) {
                this.scroll.setScroll(x, y);
            }
        }, {
            key: "on",
            value: function on(event, func) {
                this.scroll.setEvents(event, func);
            }
        }, {
            key: "off",
            value: function off(event, func) {
                this.scroll.unsetEvents(event, func);
            }
        }, {
            key: "destroy",
            value: function destroy() {
                this.scroll.destroy();
            }
        } ]);
        return Smooth;
    }();
    null && function() {
        function Native() {
            var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            _classCallCheck(this, Native);
            this.options = options;
            Object.assign(this, defaults, options);
            this.smartphone = defaults.smartphone;
            if (options.smartphone) Object.assign(this.smartphone, options.smartphone);
            this.tablet = defaults.tablet;
            if (options.tablet) Object.assign(this.tablet, options.tablet);
            this.init();
        }
        _createClass(Native, [ {
            key: "init",
            value: function init() {
                this.scroll = new _default$1(this.options);
                this.scroll.init();
                if (window.location.hash) {
                    var id = window.location.hash.slice(1, window.location.hash.length);
                    var target = document.getElementById(id);
                    if (target) this.scroll.scrollTo(target);
                }
            }
        }, {
            key: "update",
            value: function update() {
                this.scroll.update();
            }
        }, {
            key: "start",
            value: function start() {
                this.scroll.startScroll();
            }
        }, {
            key: "stop",
            value: function stop() {
                this.scroll.stopScroll();
            }
        }, {
            key: "scrollTo",
            value: function scrollTo(target, options) {
                this.scroll.scrollTo(target, options);
            }
        }, {
            key: "setScroll",
            value: function setScroll(x, y) {
                this.scroll.setScroll(x, y);
            }
        }, {
            key: "on",
            value: function on(event, func) {
                this.scroll.setEvents(event, func);
            }
        }, {
            key: "off",
            value: function off(event, func) {
                this.scroll.unsetEvents(event, func);
            }
        }, {
            key: "destroy",
            value: function destroy() {
                this.scroll.destroy();
            }
        } ]);
    }();
    const locomotive_scroll_esm = Smooth;
    function scrollInit() {
        let scrollContainer = document.querySelector("[data-scroll-container]");
        locomotive_scroll = new locomotive_scroll_esm({
            el: scrollContainer,
            smooth: true,
            touchMultiplier: 4,
            smoothMobile: 1,
            smartphone: {
                smooth: true
            },
            tablet: {
                smooth: true
            }
        });
        setTimeout((() => {
            locomotive_scroll.destroy();
        }), 0);
        setTimeout((() => {
            locomotive_scroll.init();
        }), 50);
        setTimeout((() => {
            locomotive_scroll.update();
        }), 2e3);
    }
    let locomotive_scroll;
    scrollInit();
    window["FLS"] = true;
    isWebp();
    addTouchClass();
    addLoadedClass();
    menuInit();
})();
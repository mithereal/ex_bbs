(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // vendor/topbar.js
  var require_topbar = __commonJS({
    "vendor/topbar.js"(exports, module) {
      (function(window2, document2) {
        "use strict";
        (function() {
          var lastTime = 0;
          var vendors = ["ms", "moz", "webkit", "o"];
          for (var x = 0; x < vendors.length && !window2.requestAnimationFrame; ++x) {
            window2.requestAnimationFrame = window2[vendors[x] + "RequestAnimationFrame"];
            window2.cancelAnimationFrame = window2[vendors[x] + "CancelAnimationFrame"] || window2[vendors[x] + "CancelRequestAnimationFrame"];
          }
          if (!window2.requestAnimationFrame)
            window2.requestAnimationFrame = function(callback, element) {
              var currTime = new Date().getTime();
              var timeToCall = Math.max(0, 16 - (currTime - lastTime));
              var id = window2.setTimeout(function() {
                callback(currTime + timeToCall);
              }, timeToCall);
              lastTime = currTime + timeToCall;
              return id;
            };
          if (!window2.cancelAnimationFrame)
            window2.cancelAnimationFrame = function(id) {
              clearTimeout(id);
            };
        })();
        var canvas, progressTimerId, fadeTimerId, currentProgress, showing, addEvent = function(elem, type, handler) {
          if (elem.addEventListener)
            elem.addEventListener(type, handler, false);
          else if (elem.attachEvent)
            elem.attachEvent("on" + type, handler);
          else
            elem["on" + type] = handler;
        }, options = {
          autoRun: true,
          barThickness: 3,
          barColors: {
            0: "rgba(26,  188, 156, .9)",
            ".25": "rgba(52,  152, 219, .9)",
            ".50": "rgba(241, 196, 15,  .9)",
            ".75": "rgba(230, 126, 34,  .9)",
            "1.0": "rgba(211, 84,  0,   .9)"
          },
          shadowBlur: 10,
          shadowColor: "rgba(0,   0,   0,   .6)",
          className: null
        }, repaint = function() {
          canvas.width = window2.innerWidth;
          canvas.height = options.barThickness * 5;
          var ctx = canvas.getContext("2d");
          ctx.shadowBlur = options.shadowBlur;
          ctx.shadowColor = options.shadowColor;
          var lineGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
          for (var stop in options.barColors)
            lineGradient.addColorStop(stop, options.barColors[stop]);
          ctx.lineWidth = options.barThickness;
          ctx.beginPath();
          ctx.moveTo(0, options.barThickness / 2);
          ctx.lineTo(Math.ceil(currentProgress * canvas.width), options.barThickness / 2);
          ctx.strokeStyle = lineGradient;
          ctx.stroke();
        }, createCanvas = function() {
          canvas = document2.createElement("canvas");
          var style2 = canvas.style;
          style2.position = "fixed";
          style2.top = style2.left = style2.right = style2.margin = style2.padding = 0;
          style2.zIndex = 100001;
          style2.display = "none";
          if (options.className)
            canvas.classList.add(options.className);
          document2.body.appendChild(canvas);
          addEvent(window2, "resize", repaint);
        }, topbar2 = {
          config: function(opts) {
            for (var key in opts)
              if (options.hasOwnProperty(key))
                options[key] = opts[key];
          },
          show: function() {
            if (showing)
              return;
            showing = true;
            if (fadeTimerId !== null)
              window2.cancelAnimationFrame(fadeTimerId);
            if (!canvas)
              createCanvas();
            canvas.style.opacity = 1;
            canvas.style.display = "block";
            topbar2.progress(0);
            if (options.autoRun) {
              (function loop() {
                progressTimerId = window2.requestAnimationFrame(loop);
                topbar2.progress("+" + 0.05 * Math.pow(1 - Math.sqrt(currentProgress), 2));
              })();
            }
          },
          progress: function(to) {
            if (typeof to === "undefined")
              return currentProgress;
            if (typeof to === "string") {
              to = (to.indexOf("+") >= 0 || to.indexOf("-") >= 0 ? currentProgress : 0) + parseFloat(to);
            }
            currentProgress = to > 1 ? 1 : to;
            repaint();
            return currentProgress;
          },
          hide: function() {
            if (!showing)
              return;
            showing = false;
            if (progressTimerId != null) {
              window2.cancelAnimationFrame(progressTimerId);
              progressTimerId = null;
            }
            (function loop() {
              if (topbar2.progress("+.1") >= 1) {
                canvas.style.opacity -= 0.05;
                if (canvas.style.opacity <= 0.05) {
                  canvas.style.display = "none";
                  fadeTimerId = null;
                  return;
                }
              }
              fadeTimerId = window2.requestAnimationFrame(loop);
            })();
          }
        };
        if (typeof module === "object" && typeof module.exports === "object") {
          module.exports = topbar2;
        } else if (typeof define === "function" && define.amd) {
          define(function() {
            return topbar2;
          });
        } else {
          this.topbar = topbar2;
        }
      }).call(exports, window, document);
    }
  });

  // vendor/alpine.js
  var require_alpine = __commonJS({
    "vendor/alpine.js"(exports, module) {
      (function(global2, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = global2 || self, global2.Alpine = factory());
      })(exports, function() {
        "use strict";
        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }
          return obj;
        }
        function ownKeys(object, enumerableOnly) {
          var keys = Object.keys(object);
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly)
              symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
              });
            keys.push.apply(keys, symbols);
          }
          return keys;
        }
        function _objectSpread2(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};
            if (i % 2) {
              ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key]);
              });
            } else if (Object.getOwnPropertyDescriptors) {
              Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
            } else {
              ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
              });
            }
          }
          return target;
        }
        function domReady() {
          return new Promise((resolve) => {
            if (document.readyState == "loading") {
              document.addEventListener("DOMContentLoaded", resolve);
            } else {
              resolve();
            }
          });
        }
        function arrayUnique(array) {
          return Array.from(new Set(array));
        }
        function isTesting() {
          return navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom");
        }
        function checkedAttrLooseCompare(valueA, valueB) {
          return valueA == valueB;
        }
        function warnIfMalformedTemplate(el, directive) {
          if (el.tagName.toLowerCase() !== "template") {
            console.warn(`Alpine: [${directive}] directive should only be added to <template> tags. See https://github.com/alpinejs/alpine#${directive}`);
          } else if (el.content.childElementCount !== 1) {
            console.warn(`Alpine: <template> tag with [${directive}] encountered with an unexpected number of root elements. Make sure <template> has a single root element. `);
          }
        }
        function kebabCase(subject) {
          return subject.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
        }
        function camelCase(subject) {
          return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
        }
        function walk(el, callback) {
          if (callback(el) === false)
            return;
          let node = el.firstElementChild;
          while (node) {
            walk(node, callback);
            node = node.nextElementSibling;
          }
        }
        function debounce(func, wait) {
          var timeout;
          return function() {
            var context = this, args = arguments;
            var later = function later2() {
              timeout = null;
              func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
          };
        }
        const handleError = (el, expression, error) => {
          console.warn(`Alpine Error: "${error}"

Expression: "${expression}"
Element:`, el);
          if (!isTesting()) {
            Object.assign(error, {
              el,
              expression
            });
            throw error;
          }
        };
        function tryCatch(cb, {
          el,
          expression
        }) {
          try {
            const value = cb();
            return value instanceof Promise ? value.catch((e) => handleError(el, expression, e)) : value;
          } catch (e) {
            handleError(el, expression, e);
          }
        }
        function saferEval(el, expression, dataContext, additionalHelperVariables = {}) {
          return tryCatch(() => {
            if (typeof expression === "function") {
              return expression.call(dataContext);
            }
            return new Function(["$data", ...Object.keys(additionalHelperVariables)], `var __alpine_result; with($data) { __alpine_result = ${expression} }; return __alpine_result`)(dataContext, ...Object.values(additionalHelperVariables));
          }, {
            el,
            expression
          });
        }
        function saferEvalNoReturn(el, expression, dataContext, additionalHelperVariables = {}) {
          return tryCatch(() => {
            if (typeof expression === "function") {
              return Promise.resolve(expression.call(dataContext, additionalHelperVariables["$event"]));
            }
            let AsyncFunction = Function;
            AsyncFunction = Object.getPrototypeOf(async function() {
            }).constructor;
            if (Object.keys(dataContext).includes(expression)) {
              let methodReference = new Function(["dataContext", ...Object.keys(additionalHelperVariables)], `with(dataContext) { return ${expression} }`)(dataContext, ...Object.values(additionalHelperVariables));
              if (typeof methodReference === "function") {
                return Promise.resolve(methodReference.call(dataContext, additionalHelperVariables["$event"]));
              } else {
                return Promise.resolve();
              }
            }
            return Promise.resolve(new AsyncFunction(["dataContext", ...Object.keys(additionalHelperVariables)], `with(dataContext) { ${expression} }`)(dataContext, ...Object.values(additionalHelperVariables)));
          }, {
            el,
            expression
          });
        }
        const xAttrRE = /^x-(on|bind|data|text|html|model|if|for|show|cloak|transition|ref|spread)\b/;
        function isXAttr(attr) {
          const name = replaceAtAndColonWithStandardSyntax(attr.name);
          return xAttrRE.test(name);
        }
        function getXAttrs(el, component, type) {
          let directives = Array.from(el.attributes).filter(isXAttr).map(parseHtmlAttribute);
          let spreadDirective = directives.filter((directive) => directive.type === "spread")[0];
          if (spreadDirective) {
            let spreadObject = saferEval(el, spreadDirective.expression, component.$data);
            directives = directives.concat(Object.entries(spreadObject).map(([name, value]) => parseHtmlAttribute({
              name,
              value
            })));
          }
          if (type)
            return directives.filter((i) => i.type === type);
          return sortDirectives(directives);
        }
        function sortDirectives(directives) {
          let directiveOrder = ["bind", "model", "show", "catch-all"];
          return directives.sort((a, b) => {
            let typeA = directiveOrder.indexOf(a.type) === -1 ? "catch-all" : a.type;
            let typeB = directiveOrder.indexOf(b.type) === -1 ? "catch-all" : b.type;
            return directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB);
          });
        }
        function parseHtmlAttribute({
          name,
          value
        }) {
          const normalizedName = replaceAtAndColonWithStandardSyntax(name);
          const typeMatch = normalizedName.match(xAttrRE);
          const valueMatch = normalizedName.match(/:([a-zA-Z0-9\-:]+)/);
          const modifiers = normalizedName.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
          return {
            type: typeMatch ? typeMatch[1] : null,
            value: valueMatch ? valueMatch[1] : null,
            modifiers: modifiers.map((i) => i.replace(".", "")),
            expression: value
          };
        }
        function isBooleanAttr(attrName) {
          const booleanAttributes = ["disabled", "checked", "required", "readonly", "hidden", "open", "selected", "autofocus", "itemscope", "multiple", "novalidate", "allowfullscreen", "allowpaymentrequest", "formnovalidate", "autoplay", "controls", "loop", "muted", "playsinline", "default", "ismap", "reversed", "async", "defer", "nomodule"];
          return booleanAttributes.includes(attrName);
        }
        function replaceAtAndColonWithStandardSyntax(name) {
          if (name.startsWith("@")) {
            return name.replace("@", "x-on:");
          } else if (name.startsWith(":")) {
            return name.replace(":", "x-bind:");
          }
          return name;
        }
        function convertClassStringToArray(classList, filterFn = Boolean) {
          return classList.split(" ").filter(filterFn);
        }
        const TRANSITION_TYPE_IN = "in";
        const TRANSITION_TYPE_OUT = "out";
        const TRANSITION_CANCELLED = "cancelled";
        function transitionIn(el, show, reject, component, forceSkip = false) {
          if (forceSkip)
            return show();
          if (el.__x_transition && el.__x_transition.type === TRANSITION_TYPE_IN) {
            return;
          }
          const attrs = getXAttrs(el, component, "transition");
          const showAttr = getXAttrs(el, component, "show")[0];
          if (showAttr && showAttr.modifiers.includes("transition")) {
            let modifiers = showAttr.modifiers;
            if (modifiers.includes("out") && !modifiers.includes("in"))
              return show();
            const settingBothSidesOfTransition = modifiers.includes("in") && modifiers.includes("out");
            modifiers = settingBothSidesOfTransition ? modifiers.filter((i, index) => index < modifiers.indexOf("out")) : modifiers;
            transitionHelperIn(el, modifiers, show, reject);
          } else if (attrs.some((attr) => ["enter", "enter-start", "enter-end"].includes(attr.value))) {
            transitionClassesIn(el, component, attrs, show, reject);
          } else {
            show();
          }
        }
        function transitionOut(el, hide, reject, component, forceSkip = false) {
          if (forceSkip)
            return hide();
          if (el.__x_transition && el.__x_transition.type === TRANSITION_TYPE_OUT) {
            return;
          }
          const attrs = getXAttrs(el, component, "transition");
          const showAttr = getXAttrs(el, component, "show")[0];
          if (showAttr && showAttr.modifiers.includes("transition")) {
            let modifiers = showAttr.modifiers;
            if (modifiers.includes("in") && !modifiers.includes("out"))
              return hide();
            const settingBothSidesOfTransition = modifiers.includes("in") && modifiers.includes("out");
            modifiers = settingBothSidesOfTransition ? modifiers.filter((i, index) => index > modifiers.indexOf("out")) : modifiers;
            transitionHelperOut(el, modifiers, settingBothSidesOfTransition, hide, reject);
          } else if (attrs.some((attr) => ["leave", "leave-start", "leave-end"].includes(attr.value))) {
            transitionClassesOut(el, component, attrs, hide, reject);
          } else {
            hide();
          }
        }
        function transitionHelperIn(el, modifiers, showCallback, reject) {
          const styleValues = {
            duration: modifierValue(modifiers, "duration", 150),
            origin: modifierValue(modifiers, "origin", "center"),
            first: {
              opacity: 0,
              scale: modifierValue(modifiers, "scale", 95)
            },
            second: {
              opacity: 1,
              scale: 100
            }
          };
          transitionHelper(el, modifiers, showCallback, () => {
          }, reject, styleValues, TRANSITION_TYPE_IN);
        }
        function transitionHelperOut(el, modifiers, settingBothSidesOfTransition, hideCallback, reject) {
          const duration = settingBothSidesOfTransition ? modifierValue(modifiers, "duration", 150) : modifierValue(modifiers, "duration", 150) / 2;
          const styleValues = {
            duration,
            origin: modifierValue(modifiers, "origin", "center"),
            first: {
              opacity: 1,
              scale: 100
            },
            second: {
              opacity: 0,
              scale: modifierValue(modifiers, "scale", 95)
            }
          };
          transitionHelper(el, modifiers, () => {
          }, hideCallback, reject, styleValues, TRANSITION_TYPE_OUT);
        }
        function modifierValue(modifiers, key, fallback) {
          if (modifiers.indexOf(key) === -1)
            return fallback;
          const rawValue = modifiers[modifiers.indexOf(key) + 1];
          if (!rawValue)
            return fallback;
          if (key === "scale") {
            if (!isNumeric(rawValue))
              return fallback;
          }
          if (key === "duration") {
            let match = rawValue.match(/([0-9]+)ms/);
            if (match)
              return match[1];
          }
          if (key === "origin") {
            if (["top", "right", "left", "center", "bottom"].includes(modifiers[modifiers.indexOf(key) + 2])) {
              return [rawValue, modifiers[modifiers.indexOf(key) + 2]].join(" ");
            }
          }
          return rawValue;
        }
        function transitionHelper(el, modifiers, hook1, hook2, reject, styleValues, type) {
          if (el.__x_transition) {
            el.__x_transition.cancel && el.__x_transition.cancel();
          }
          const opacityCache = el.style.opacity;
          const transformCache = el.style.transform;
          const transformOriginCache = el.style.transformOrigin;
          const noModifiers = !modifiers.includes("opacity") && !modifiers.includes("scale");
          const transitionOpacity = noModifiers || modifiers.includes("opacity");
          const transitionScale = noModifiers || modifiers.includes("scale");
          const stages = {
            start() {
              if (transitionOpacity)
                el.style.opacity = styleValues.first.opacity;
              if (transitionScale)
                el.style.transform = `scale(${styleValues.first.scale / 100})`;
            },
            during() {
              if (transitionScale)
                el.style.transformOrigin = styleValues.origin;
              el.style.transitionProperty = [transitionOpacity ? `opacity` : ``, transitionScale ? `transform` : ``].join(" ").trim();
              el.style.transitionDuration = `${styleValues.duration / 1e3}s`;
              el.style.transitionTimingFunction = `cubic-bezier(0.4, 0.0, 0.2, 1)`;
            },
            show() {
              hook1();
            },
            end() {
              if (transitionOpacity)
                el.style.opacity = styleValues.second.opacity;
              if (transitionScale)
                el.style.transform = `scale(${styleValues.second.scale / 100})`;
            },
            hide() {
              hook2();
            },
            cleanup() {
              if (transitionOpacity)
                el.style.opacity = opacityCache;
              if (transitionScale)
                el.style.transform = transformCache;
              if (transitionScale)
                el.style.transformOrigin = transformOriginCache;
              el.style.transitionProperty = null;
              el.style.transitionDuration = null;
              el.style.transitionTimingFunction = null;
            }
          };
          transition(el, stages, type, reject);
        }
        const ensureStringExpression = (expression, el, component) => {
          return typeof expression === "function" ? component.evaluateReturnExpression(el, expression) : expression;
        };
        function transitionClassesIn(el, component, directives, showCallback, reject) {
          const enter = convertClassStringToArray(ensureStringExpression((directives.find((i) => i.value === "enter") || {
            expression: ""
          }).expression, el, component));
          const enterStart = convertClassStringToArray(ensureStringExpression((directives.find((i) => i.value === "enter-start") || {
            expression: ""
          }).expression, el, component));
          const enterEnd = convertClassStringToArray(ensureStringExpression((directives.find((i) => i.value === "enter-end") || {
            expression: ""
          }).expression, el, component));
          transitionClasses(el, enter, enterStart, enterEnd, showCallback, () => {
          }, TRANSITION_TYPE_IN, reject);
        }
        function transitionClassesOut(el, component, directives, hideCallback, reject) {
          const leave = convertClassStringToArray(ensureStringExpression((directives.find((i) => i.value === "leave") || {
            expression: ""
          }).expression, el, component));
          const leaveStart = convertClassStringToArray(ensureStringExpression((directives.find((i) => i.value === "leave-start") || {
            expression: ""
          }).expression, el, component));
          const leaveEnd = convertClassStringToArray(ensureStringExpression((directives.find((i) => i.value === "leave-end") || {
            expression: ""
          }).expression, el, component));
          transitionClasses(el, leave, leaveStart, leaveEnd, () => {
          }, hideCallback, TRANSITION_TYPE_OUT, reject);
        }
        function transitionClasses(el, classesDuring, classesStart, classesEnd, hook1, hook2, type, reject) {
          if (el.__x_transition) {
            el.__x_transition.cancel && el.__x_transition.cancel();
          }
          const originalClasses = el.__x_original_classes || [];
          const stages = {
            start() {
              el.classList.add(...classesStart);
            },
            during() {
              el.classList.add(...classesDuring);
            },
            show() {
              hook1();
            },
            end() {
              el.classList.remove(...classesStart.filter((i) => !originalClasses.includes(i)));
              el.classList.add(...classesEnd);
            },
            hide() {
              hook2();
            },
            cleanup() {
              el.classList.remove(...classesDuring.filter((i) => !originalClasses.includes(i)));
              el.classList.remove(...classesEnd.filter((i) => !originalClasses.includes(i)));
            }
          };
          transition(el, stages, type, reject);
        }
        function transition(el, stages, type, reject) {
          const finish = once(() => {
            stages.hide();
            if (el.isConnected) {
              stages.cleanup();
            }
            delete el.__x_transition;
          });
          el.__x_transition = {
            type,
            cancel: once(() => {
              reject(TRANSITION_CANCELLED);
              finish();
            }),
            finish,
            nextFrame: null
          };
          stages.start();
          stages.during();
          el.__x_transition.nextFrame = requestAnimationFrame(() => {
            let duration = Number(getComputedStyle(el).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3;
            if (duration === 0) {
              duration = Number(getComputedStyle(el).animationDuration.replace("s", "")) * 1e3;
            }
            stages.show();
            el.__x_transition.nextFrame = requestAnimationFrame(() => {
              stages.end();
              setTimeout(el.__x_transition.finish, duration);
            });
          });
        }
        function isNumeric(subject) {
          return !Array.isArray(subject) && !isNaN(subject);
        }
        function once(callback) {
          let called = false;
          return function() {
            if (!called) {
              called = true;
              callback.apply(this, arguments);
            }
          };
        }
        function handleForDirective(component, templateEl, expression, initialUpdate, extraVars) {
          warnIfMalformedTemplate(templateEl, "x-for");
          let iteratorNames = typeof expression === "function" ? parseForExpression(component.evaluateReturnExpression(templateEl, expression)) : parseForExpression(expression);
          let items = evaluateItemsAndReturnEmptyIfXIfIsPresentAndFalseOnElement(component, templateEl, iteratorNames, extraVars);
          let currentEl = templateEl;
          items.forEach((item, index) => {
            let iterationScopeVariables = getIterationScopeVariables(iteratorNames, item, index, items, extraVars());
            let currentKey = generateKeyForIteration(component, templateEl, index, iterationScopeVariables);
            let nextEl = lookAheadForMatchingKeyedElementAndMoveItIfFound(currentEl.nextElementSibling, currentKey);
            if (!nextEl) {
              nextEl = addElementInLoopAfterCurrentEl(templateEl, currentEl);
              transitionIn(nextEl, () => {
              }, () => {
              }, component, initialUpdate);
              nextEl.__x_for = iterationScopeVariables;
              component.initializeElements(nextEl, () => nextEl.__x_for);
            } else {
              delete nextEl.__x_for_key;
              nextEl.__x_for = iterationScopeVariables;
              component.updateElements(nextEl, () => nextEl.__x_for);
            }
            currentEl = nextEl;
            currentEl.__x_for_key = currentKey;
          });
          removeAnyLeftOverElementsFromPreviousUpdate(currentEl, component);
        }
        function parseForExpression(expression) {
          let forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
          let stripParensRE = /^\(|\)$/g;
          let forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
          let inMatch = String(expression).match(forAliasRE);
          if (!inMatch)
            return;
          let res = {};
          res.items = inMatch[2].trim();
          let item = inMatch[1].trim().replace(stripParensRE, "");
          let iteratorMatch = item.match(forIteratorRE);
          if (iteratorMatch) {
            res.item = item.replace(forIteratorRE, "").trim();
            res.index = iteratorMatch[1].trim();
            if (iteratorMatch[2]) {
              res.collection = iteratorMatch[2].trim();
            }
          } else {
            res.item = item;
          }
          return res;
        }
        function getIterationScopeVariables(iteratorNames, item, index, items, extraVars) {
          let scopeVariables = extraVars ? _objectSpread2({}, extraVars) : {};
          scopeVariables[iteratorNames.item] = item;
          if (iteratorNames.index)
            scopeVariables[iteratorNames.index] = index;
          if (iteratorNames.collection)
            scopeVariables[iteratorNames.collection] = items;
          return scopeVariables;
        }
        function generateKeyForIteration(component, el, index, iterationScopeVariables) {
          let bindKeyAttribute = getXAttrs(el, component, "bind").filter((attr) => attr.value === "key")[0];
          if (!bindKeyAttribute)
            return index;
          return component.evaluateReturnExpression(el, bindKeyAttribute.expression, () => iterationScopeVariables);
        }
        function evaluateItemsAndReturnEmptyIfXIfIsPresentAndFalseOnElement(component, el, iteratorNames, extraVars) {
          let ifAttribute = getXAttrs(el, component, "if")[0];
          if (ifAttribute && !component.evaluateReturnExpression(el, ifAttribute.expression)) {
            return [];
          }
          let items = component.evaluateReturnExpression(el, iteratorNames.items, extraVars);
          if (isNumeric(items) && items >= 0) {
            items = Array.from(Array(items).keys(), (i) => i + 1);
          }
          return items;
        }
        function addElementInLoopAfterCurrentEl(templateEl, currentEl) {
          let clone2 = document.importNode(templateEl.content, true);
          currentEl.parentElement.insertBefore(clone2, currentEl.nextElementSibling);
          return currentEl.nextElementSibling;
        }
        function lookAheadForMatchingKeyedElementAndMoveItIfFound(nextEl, currentKey) {
          if (!nextEl)
            return;
          if (nextEl.__x_for_key === void 0)
            return;
          if (nextEl.__x_for_key === currentKey)
            return nextEl;
          let tmpNextEl = nextEl;
          while (tmpNextEl) {
            if (tmpNextEl.__x_for_key === currentKey) {
              return tmpNextEl.parentElement.insertBefore(tmpNextEl, nextEl);
            }
            tmpNextEl = tmpNextEl.nextElementSibling && tmpNextEl.nextElementSibling.__x_for_key !== void 0 ? tmpNextEl.nextElementSibling : false;
          }
        }
        function removeAnyLeftOverElementsFromPreviousUpdate(currentEl, component) {
          var nextElementFromOldLoop = currentEl.nextElementSibling && currentEl.nextElementSibling.__x_for_key !== void 0 ? currentEl.nextElementSibling : false;
          while (nextElementFromOldLoop) {
            let nextElementFromOldLoopImmutable = nextElementFromOldLoop;
            let nextSibling = nextElementFromOldLoop.nextElementSibling;
            transitionOut(nextElementFromOldLoop, () => {
              nextElementFromOldLoopImmutable.remove();
            }, () => {
            }, component);
            nextElementFromOldLoop = nextSibling && nextSibling.__x_for_key !== void 0 ? nextSibling : false;
          }
        }
        function handleAttributeBindingDirective(component, el, attrName, expression, extraVars, attrType, modifiers) {
          var value = component.evaluateReturnExpression(el, expression, extraVars);
          if (attrName === "value") {
            if (Alpine.ignoreFocusedForValueBinding && document.activeElement.isSameNode(el))
              return;
            if (value === void 0 && String(expression).match(/\./)) {
              value = "";
            }
            if (el.type === "radio") {
              if (el.attributes.value === void 0 && attrType === "bind") {
                el.value = value;
              } else if (attrType !== "bind") {
                el.checked = checkedAttrLooseCompare(el.value, value);
              }
            } else if (el.type === "checkbox") {
              if (typeof value !== "boolean" && ![null, void 0].includes(value) && attrType === "bind") {
                el.value = String(value);
              } else if (attrType !== "bind") {
                if (Array.isArray(value)) {
                  el.checked = value.some((val) => checkedAttrLooseCompare(val, el.value));
                } else {
                  el.checked = !!value;
                }
              }
            } else if (el.tagName === "SELECT") {
              updateSelect(el, value);
            } else {
              if (el.value === value)
                return;
              el.value = value;
            }
          } else if (attrName === "class") {
            if (Array.isArray(value)) {
              const originalClasses = el.__x_original_classes || [];
              el.setAttribute("class", arrayUnique(originalClasses.concat(value)).join(" "));
            } else if (typeof value === "object") {
              const keysSortedByBooleanValue = Object.keys(value).sort((a, b) => value[a] - value[b]);
              keysSortedByBooleanValue.forEach((classNames) => {
                if (value[classNames]) {
                  convertClassStringToArray(classNames).forEach((className) => el.classList.add(className));
                } else {
                  convertClassStringToArray(classNames).forEach((className) => el.classList.remove(className));
                }
              });
            } else {
              const originalClasses = el.__x_original_classes || [];
              const newClasses = value ? convertClassStringToArray(value) : [];
              el.setAttribute("class", arrayUnique(originalClasses.concat(newClasses)).join(" "));
            }
          } else {
            attrName = modifiers.includes("camel") ? camelCase(attrName) : attrName;
            if ([null, void 0, false].includes(value)) {
              el.removeAttribute(attrName);
            } else {
              isBooleanAttr(attrName) ? setIfChanged(el, attrName, attrName) : setIfChanged(el, attrName, value);
            }
          }
        }
        function setIfChanged(el, attrName, value) {
          if (el.getAttribute(attrName) != value) {
            el.setAttribute(attrName, value);
          }
        }
        function updateSelect(el, value) {
          const arrayWrappedValue = [].concat(value).map((value2) => {
            return value2 + "";
          });
          Array.from(el.options).forEach((option) => {
            option.selected = arrayWrappedValue.includes(option.value || option.text);
          });
        }
        function handleTextDirective(el, output, expression) {
          if (output === void 0 && String(expression).match(/\./)) {
            output = "";
          }
          el.textContent = output;
        }
        function handleHtmlDirective(component, el, expression, extraVars) {
          el.innerHTML = component.evaluateReturnExpression(el, expression, extraVars);
        }
        function handleShowDirective(component, el, value, modifiers, initialUpdate = false) {
          const hide = () => {
            el.style.display = "none";
            el.__x_is_shown = false;
          };
          const show = () => {
            if (el.style.length === 1 && el.style.display === "none") {
              el.removeAttribute("style");
            } else {
              el.style.removeProperty("display");
            }
            el.__x_is_shown = true;
          };
          if (initialUpdate === true) {
            if (value) {
              show();
            } else {
              hide();
            }
            return;
          }
          const handle = (resolve, reject) => {
            if (value) {
              if (el.style.display === "none" || el.__x_transition) {
                transitionIn(el, () => {
                  show();
                }, reject, component);
              }
              resolve(() => {
              });
            } else {
              if (el.style.display !== "none") {
                transitionOut(el, () => {
                  resolve(() => {
                    hide();
                  });
                }, reject, component);
              } else {
                resolve(() => {
                });
              }
            }
          };
          if (modifiers.includes("immediate")) {
            handle((finish) => finish(), () => {
            });
            return;
          }
          if (component.showDirectiveLastElement && !component.showDirectiveLastElement.contains(el)) {
            component.executeAndClearRemainingShowDirectiveStack();
          }
          component.showDirectiveStack.push(handle);
          component.showDirectiveLastElement = el;
        }
        function handleIfDirective(component, el, expressionResult, initialUpdate, extraVars) {
          warnIfMalformedTemplate(el, "x-if");
          const elementHasAlreadyBeenAdded = el.nextElementSibling && el.nextElementSibling.__x_inserted_me === true;
          if (expressionResult && (!elementHasAlreadyBeenAdded || el.__x_transition)) {
            const clone2 = document.importNode(el.content, true);
            el.parentElement.insertBefore(clone2, el.nextElementSibling);
            transitionIn(el.nextElementSibling, () => {
            }, () => {
            }, component, initialUpdate);
            component.initializeElements(el.nextElementSibling, extraVars);
            el.nextElementSibling.__x_inserted_me = true;
          } else if (!expressionResult && elementHasAlreadyBeenAdded) {
            transitionOut(el.nextElementSibling, () => {
              el.nextElementSibling.remove();
            }, () => {
            }, component, initialUpdate);
          }
        }
        function registerListener(component, el, event, modifiers, expression, extraVars = {}) {
          const options = {
            passive: modifiers.includes("passive")
          };
          if (modifiers.includes("camel")) {
            event = camelCase(event);
          }
          let handler, listenerTarget;
          if (modifiers.includes("away")) {
            listenerTarget = document;
            handler = (e) => {
              if (el.contains(e.target))
                return;
              if (el.offsetWidth < 1 && el.offsetHeight < 1)
                return;
              runListenerHandler(component, expression, e, extraVars);
              if (modifiers.includes("once")) {
                document.removeEventListener(event, handler, options);
              }
            };
          } else {
            listenerTarget = modifiers.includes("window") ? window : modifiers.includes("document") ? document : el;
            handler = (e) => {
              if (listenerTarget === window || listenerTarget === document) {
                if (!document.body.contains(el)) {
                  listenerTarget.removeEventListener(event, handler, options);
                  return;
                }
              }
              if (isKeyEvent(event)) {
                if (isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers)) {
                  return;
                }
              }
              if (modifiers.includes("prevent"))
                e.preventDefault();
              if (modifiers.includes("stop"))
                e.stopPropagation();
              if (!modifiers.includes("self") || e.target === el) {
                const returnValue = runListenerHandler(component, expression, e, extraVars);
                returnValue.then((value) => {
                  if (value === false) {
                    e.preventDefault();
                  } else {
                    if (modifiers.includes("once")) {
                      listenerTarget.removeEventListener(event, handler, options);
                    }
                  }
                });
              }
            };
          }
          if (modifiers.includes("debounce")) {
            let nextModifier = modifiers[modifiers.indexOf("debounce") + 1] || "invalid-wait";
            let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
            handler = debounce(handler, wait);
          }
          listenerTarget.addEventListener(event, handler, options);
        }
        function runListenerHandler(component, expression, e, extraVars) {
          return component.evaluateCommandExpression(e.target, expression, () => {
            return _objectSpread2(_objectSpread2({}, extraVars()), {}, {
              "$event": e
            });
          });
        }
        function isKeyEvent(event) {
          return ["keydown", "keyup"].includes(event);
        }
        function isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers) {
          let keyModifiers = modifiers.filter((i) => {
            return !["window", "document", "prevent", "stop"].includes(i);
          });
          if (keyModifiers.includes("debounce")) {
            let debounceIndex = keyModifiers.indexOf("debounce");
            keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
          }
          if (keyModifiers.length === 0)
            return false;
          if (keyModifiers.length === 1 && keyModifiers[0] === keyToModifier(e.key))
            return false;
          const systemKeyModifiers = ["ctrl", "shift", "alt", "meta", "cmd", "super"];
          const selectedSystemKeyModifiers = systemKeyModifiers.filter((modifier) => keyModifiers.includes(modifier));
          keyModifiers = keyModifiers.filter((i) => !selectedSystemKeyModifiers.includes(i));
          if (selectedSystemKeyModifiers.length > 0) {
            const activelyPressedKeyModifiers = selectedSystemKeyModifiers.filter((modifier) => {
              if (modifier === "cmd" || modifier === "super")
                modifier = "meta";
              return e[`${modifier}Key`];
            });
            if (activelyPressedKeyModifiers.length === selectedSystemKeyModifiers.length) {
              if (keyModifiers[0] === keyToModifier(e.key))
                return false;
            }
          }
          return true;
        }
        function keyToModifier(key) {
          switch (key) {
            case "/":
              return "slash";
            case " ":
            case "Spacebar":
              return "space";
            default:
              return key && kebabCase(key);
          }
        }
        function registerModelListener(component, el, modifiers, expression, extraVars) {
          var event = el.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(el.type) || modifiers.includes("lazy") ? "change" : "input";
          const listenerExpression = `${expression} = rightSideOfExpression($event, ${expression})`;
          registerListener(component, el, event, modifiers, listenerExpression, () => {
            return _objectSpread2(_objectSpread2({}, extraVars()), {}, {
              rightSideOfExpression: generateModelAssignmentFunction(el, modifiers, expression)
            });
          });
        }
        function generateModelAssignmentFunction(el, modifiers, expression) {
          if (el.type === "radio") {
            if (!el.hasAttribute("name"))
              el.setAttribute("name", expression);
          }
          return (event, currentValue) => {
            if (event instanceof CustomEvent && event.detail) {
              return event.detail;
            } else if (el.type === "checkbox") {
              if (Array.isArray(currentValue)) {
                const newValue = modifiers.includes("number") ? safeParseNumber(event.target.value) : event.target.value;
                return event.target.checked ? currentValue.concat([newValue]) : currentValue.filter((el2) => !checkedAttrLooseCompare(el2, newValue));
              } else {
                return event.target.checked;
              }
            } else if (el.tagName.toLowerCase() === "select" && el.multiple) {
              return modifiers.includes("number") ? Array.from(event.target.selectedOptions).map((option) => {
                const rawValue = option.value || option.text;
                return safeParseNumber(rawValue);
              }) : Array.from(event.target.selectedOptions).map((option) => {
                return option.value || option.text;
              });
            } else {
              const rawValue = event.target.value;
              return modifiers.includes("number") ? safeParseNumber(rawValue) : modifiers.includes("trim") ? rawValue.trim() : rawValue;
            }
          };
        }
        function safeParseNumber(rawValue) {
          const number = rawValue ? parseFloat(rawValue) : null;
          return isNumeric(number) ? number : rawValue;
        }
        const { isArray } = Array;
        const { getPrototypeOf, create: ObjectCreate, defineProperty: ObjectDefineProperty, defineProperties: ObjectDefineProperties, isExtensible, getOwnPropertyDescriptor, getOwnPropertyNames, getOwnPropertySymbols, preventExtensions, hasOwnProperty } = Object;
        const { push: ArrayPush, concat: ArrayConcat, map: ArrayMap } = Array.prototype;
        function isUndefined(obj) {
          return obj === void 0;
        }
        function isFunction(obj) {
          return typeof obj === "function";
        }
        function isObject2(obj) {
          return typeof obj === "object";
        }
        const proxyToValueMap = new WeakMap();
        function registerProxy(proxy, value) {
          proxyToValueMap.set(proxy, value);
        }
        const unwrap = (replicaOrAny) => proxyToValueMap.get(replicaOrAny) || replicaOrAny;
        function wrapValue(membrane, value) {
          return membrane.valueIsObservable(value) ? membrane.getProxy(value) : value;
        }
        function unwrapDescriptor(descriptor) {
          if (hasOwnProperty.call(descriptor, "value")) {
            descriptor.value = unwrap(descriptor.value);
          }
          return descriptor;
        }
        function lockShadowTarget(membrane, shadowTarget, originalTarget) {
          const targetKeys = ArrayConcat.call(getOwnPropertyNames(originalTarget), getOwnPropertySymbols(originalTarget));
          targetKeys.forEach((key) => {
            let descriptor = getOwnPropertyDescriptor(originalTarget, key);
            if (!descriptor.configurable) {
              descriptor = wrapDescriptor(membrane, descriptor, wrapValue);
            }
            ObjectDefineProperty(shadowTarget, key, descriptor);
          });
          preventExtensions(shadowTarget);
        }
        class ReactiveProxyHandler {
          constructor(membrane, value) {
            this.originalTarget = value;
            this.membrane = membrane;
          }
          get(shadowTarget, key) {
            const { originalTarget, membrane } = this;
            const value = originalTarget[key];
            const { valueObserved } = membrane;
            valueObserved(originalTarget, key);
            return membrane.getProxy(value);
          }
          set(shadowTarget, key, value) {
            const { originalTarget, membrane: { valueMutated } } = this;
            const oldValue = originalTarget[key];
            if (oldValue !== value) {
              originalTarget[key] = value;
              valueMutated(originalTarget, key);
            } else if (key === "length" && isArray(originalTarget)) {
              valueMutated(originalTarget, key);
            }
            return true;
          }
          deleteProperty(shadowTarget, key) {
            const { originalTarget, membrane: { valueMutated } } = this;
            delete originalTarget[key];
            valueMutated(originalTarget, key);
            return true;
          }
          apply(shadowTarget, thisArg, argArray) {
          }
          construct(target, argArray, newTarget) {
          }
          has(shadowTarget, key) {
            const { originalTarget, membrane: { valueObserved } } = this;
            valueObserved(originalTarget, key);
            return key in originalTarget;
          }
          ownKeys(shadowTarget) {
            const { originalTarget } = this;
            return ArrayConcat.call(getOwnPropertyNames(originalTarget), getOwnPropertySymbols(originalTarget));
          }
          isExtensible(shadowTarget) {
            const shadowIsExtensible = isExtensible(shadowTarget);
            if (!shadowIsExtensible) {
              return shadowIsExtensible;
            }
            const { originalTarget, membrane } = this;
            const targetIsExtensible = isExtensible(originalTarget);
            if (!targetIsExtensible) {
              lockShadowTarget(membrane, shadowTarget, originalTarget);
            }
            return targetIsExtensible;
          }
          setPrototypeOf(shadowTarget, prototype) {
          }
          getPrototypeOf(shadowTarget) {
            const { originalTarget } = this;
            return getPrototypeOf(originalTarget);
          }
          getOwnPropertyDescriptor(shadowTarget, key) {
            const { originalTarget, membrane } = this;
            const { valueObserved } = this.membrane;
            valueObserved(originalTarget, key);
            let desc = getOwnPropertyDescriptor(originalTarget, key);
            if (isUndefined(desc)) {
              return desc;
            }
            const shadowDescriptor = getOwnPropertyDescriptor(shadowTarget, key);
            if (!isUndefined(shadowDescriptor)) {
              return shadowDescriptor;
            }
            desc = wrapDescriptor(membrane, desc, wrapValue);
            if (!desc.configurable) {
              ObjectDefineProperty(shadowTarget, key, desc);
            }
            return desc;
          }
          preventExtensions(shadowTarget) {
            const { originalTarget, membrane } = this;
            lockShadowTarget(membrane, shadowTarget, originalTarget);
            preventExtensions(originalTarget);
            return true;
          }
          defineProperty(shadowTarget, key, descriptor) {
            const { originalTarget, membrane } = this;
            const { valueMutated } = membrane;
            const { configurable } = descriptor;
            if (hasOwnProperty.call(descriptor, "writable") && !hasOwnProperty.call(descriptor, "value")) {
              const originalDescriptor = getOwnPropertyDescriptor(originalTarget, key);
              descriptor.value = originalDescriptor.value;
            }
            ObjectDefineProperty(originalTarget, key, unwrapDescriptor(descriptor));
            if (configurable === false) {
              ObjectDefineProperty(shadowTarget, key, wrapDescriptor(membrane, descriptor, wrapValue));
            }
            valueMutated(originalTarget, key);
            return true;
          }
        }
        function wrapReadOnlyValue(membrane, value) {
          return membrane.valueIsObservable(value) ? membrane.getReadOnlyProxy(value) : value;
        }
        class ReadOnlyHandler {
          constructor(membrane, value) {
            this.originalTarget = value;
            this.membrane = membrane;
          }
          get(shadowTarget, key) {
            const { membrane, originalTarget } = this;
            const value = originalTarget[key];
            const { valueObserved } = membrane;
            valueObserved(originalTarget, key);
            return membrane.getReadOnlyProxy(value);
          }
          set(shadowTarget, key, value) {
            return false;
          }
          deleteProperty(shadowTarget, key) {
            return false;
          }
          apply(shadowTarget, thisArg, argArray) {
          }
          construct(target, argArray, newTarget) {
          }
          has(shadowTarget, key) {
            const { originalTarget, membrane: { valueObserved } } = this;
            valueObserved(originalTarget, key);
            return key in originalTarget;
          }
          ownKeys(shadowTarget) {
            const { originalTarget } = this;
            return ArrayConcat.call(getOwnPropertyNames(originalTarget), getOwnPropertySymbols(originalTarget));
          }
          setPrototypeOf(shadowTarget, prototype) {
          }
          getOwnPropertyDescriptor(shadowTarget, key) {
            const { originalTarget, membrane } = this;
            const { valueObserved } = membrane;
            valueObserved(originalTarget, key);
            let desc = getOwnPropertyDescriptor(originalTarget, key);
            if (isUndefined(desc)) {
              return desc;
            }
            const shadowDescriptor = getOwnPropertyDescriptor(shadowTarget, key);
            if (!isUndefined(shadowDescriptor)) {
              return shadowDescriptor;
            }
            desc = wrapDescriptor(membrane, desc, wrapReadOnlyValue);
            if (hasOwnProperty.call(desc, "set")) {
              desc.set = void 0;
            }
            if (!desc.configurable) {
              ObjectDefineProperty(shadowTarget, key, desc);
            }
            return desc;
          }
          preventExtensions(shadowTarget) {
            return false;
          }
          defineProperty(shadowTarget, key, descriptor) {
            return false;
          }
        }
        function createShadowTarget(value) {
          let shadowTarget = void 0;
          if (isArray(value)) {
            shadowTarget = [];
          } else if (isObject2(value)) {
            shadowTarget = {};
          }
          return shadowTarget;
        }
        const ObjectDotPrototype = Object.prototype;
        function defaultValueIsObservable(value) {
          if (value === null) {
            return false;
          }
          if (typeof value !== "object") {
            return false;
          }
          if (isArray(value)) {
            return true;
          }
          const proto = getPrototypeOf(value);
          return proto === ObjectDotPrototype || proto === null || getPrototypeOf(proto) === null;
        }
        const defaultValueObserved = (obj, key) => {
        };
        const defaultValueMutated = (obj, key) => {
        };
        const defaultValueDistortion = (value) => value;
        function wrapDescriptor(membrane, descriptor, getValue) {
          const { set, get } = descriptor;
          if (hasOwnProperty.call(descriptor, "value")) {
            descriptor.value = getValue(membrane, descriptor.value);
          } else {
            if (!isUndefined(get)) {
              descriptor.get = function() {
                return getValue(membrane, get.call(unwrap(this)));
              };
            }
            if (!isUndefined(set)) {
              descriptor.set = function(value) {
                set.call(unwrap(this), membrane.unwrapProxy(value));
              };
            }
          }
          return descriptor;
        }
        class ReactiveMembrane {
          constructor(options) {
            this.valueDistortion = defaultValueDistortion;
            this.valueMutated = defaultValueMutated;
            this.valueObserved = defaultValueObserved;
            this.valueIsObservable = defaultValueIsObservable;
            this.objectGraph = new WeakMap();
            if (!isUndefined(options)) {
              const { valueDistortion, valueMutated, valueObserved, valueIsObservable } = options;
              this.valueDistortion = isFunction(valueDistortion) ? valueDistortion : defaultValueDistortion;
              this.valueMutated = isFunction(valueMutated) ? valueMutated : defaultValueMutated;
              this.valueObserved = isFunction(valueObserved) ? valueObserved : defaultValueObserved;
              this.valueIsObservable = isFunction(valueIsObservable) ? valueIsObservable : defaultValueIsObservable;
            }
          }
          getProxy(value) {
            const unwrappedValue = unwrap(value);
            const distorted = this.valueDistortion(unwrappedValue);
            if (this.valueIsObservable(distorted)) {
              const o = this.getReactiveState(unwrappedValue, distorted);
              return o.readOnly === value ? value : o.reactive;
            }
            return distorted;
          }
          getReadOnlyProxy(value) {
            value = unwrap(value);
            const distorted = this.valueDistortion(value);
            if (this.valueIsObservable(distorted)) {
              return this.getReactiveState(value, distorted).readOnly;
            }
            return distorted;
          }
          unwrapProxy(p) {
            return unwrap(p);
          }
          getReactiveState(value, distortedValue) {
            const { objectGraph } = this;
            let reactiveState = objectGraph.get(distortedValue);
            if (reactiveState) {
              return reactiveState;
            }
            const membrane = this;
            reactiveState = {
              get reactive() {
                const reactiveHandler = new ReactiveProxyHandler(membrane, distortedValue);
                const proxy = new Proxy(createShadowTarget(distortedValue), reactiveHandler);
                registerProxy(proxy, value);
                ObjectDefineProperty(this, "reactive", { value: proxy });
                return proxy;
              },
              get readOnly() {
                const readOnlyHandler = new ReadOnlyHandler(membrane, distortedValue);
                const proxy = new Proxy(createShadowTarget(distortedValue), readOnlyHandler);
                registerProxy(proxy, value);
                ObjectDefineProperty(this, "readOnly", { value: proxy });
                return proxy;
              }
            };
            objectGraph.set(distortedValue, reactiveState);
            return reactiveState;
          }
        }
        function wrap(data, mutationCallback) {
          let membrane = new ReactiveMembrane({
            valueMutated(target, key) {
              mutationCallback(target, key);
            }
          });
          return {
            data: membrane.getProxy(data),
            membrane
          };
        }
        function unwrap$1(membrane, observable) {
          let unwrappedData = membrane.unwrapProxy(observable);
          let copy = {};
          Object.keys(unwrappedData).forEach((key) => {
            if (["$el", "$refs", "$nextTick", "$watch"].includes(key))
              return;
            copy[key] = unwrappedData[key];
          });
          return copy;
        }
        class Component {
          constructor(el, componentForClone = null) {
            this.$el = el;
            const dataAttr = this.$el.getAttribute("x-data");
            const dataExpression = dataAttr === "" ? "{}" : dataAttr;
            const initExpression = this.$el.getAttribute("x-init");
            let dataExtras = {
              $el: this.$el
            };
            let canonicalComponentElementReference = componentForClone ? componentForClone.$el : this.$el;
            Object.entries(Alpine.magicProperties).forEach(([name, callback]) => {
              Object.defineProperty(dataExtras, `$${name}`, {
                get: function get() {
                  return callback(canonicalComponentElementReference);
                }
              });
            });
            this.unobservedData = componentForClone ? componentForClone.getUnobservedData() : saferEval(el, dataExpression, dataExtras);
            let {
              membrane,
              data
            } = this.wrapDataInObservable(this.unobservedData);
            this.$data = data;
            this.membrane = membrane;
            this.unobservedData.$el = this.$el;
            this.unobservedData.$refs = this.getRefsProxy();
            this.nextTickStack = [];
            this.unobservedData.$nextTick = (callback) => {
              this.nextTickStack.push(callback);
            };
            this.watchers = {};
            this.unobservedData.$watch = (property, callback) => {
              if (!this.watchers[property])
                this.watchers[property] = [];
              this.watchers[property].push(callback);
            };
            Object.entries(Alpine.magicProperties).forEach(([name, callback]) => {
              Object.defineProperty(this.unobservedData, `$${name}`, {
                get: function get() {
                  return callback(canonicalComponentElementReference, this.$el);
                }
              });
            });
            this.showDirectiveStack = [];
            this.showDirectiveLastElement;
            componentForClone || Alpine.onBeforeComponentInitializeds.forEach((callback) => callback(this));
            var initReturnedCallback;
            if (initExpression && !componentForClone) {
              this.pauseReactivity = true;
              initReturnedCallback = this.evaluateReturnExpression(this.$el, initExpression);
              this.pauseReactivity = false;
            }
            this.initializeElements(this.$el, () => {
            }, componentForClone);
            this.listenForNewElementsToInitialize();
            if (typeof initReturnedCallback === "function") {
              initReturnedCallback.call(this.$data);
            }
            componentForClone || setTimeout(() => {
              Alpine.onComponentInitializeds.forEach((callback) => callback(this));
            }, 0);
          }
          getUnobservedData() {
            return unwrap$1(this.membrane, this.$data);
          }
          wrapDataInObservable(data) {
            var self2 = this;
            let updateDom = debounce(function() {
              self2.updateElements(self2.$el);
            }, 0);
            return wrap(data, (target, key) => {
              if (self2.watchers[key]) {
                self2.watchers[key].forEach((callback) => callback(target[key]));
              } else if (Array.isArray(target)) {
                Object.keys(self2.watchers).forEach((fullDotNotationKey) => {
                  let dotNotationParts = fullDotNotationKey.split(".");
                  if (key === "length")
                    return;
                  dotNotationParts.reduce((comparisonData, part) => {
                    if (Object.is(target, comparisonData[part])) {
                      self2.watchers[fullDotNotationKey].forEach((callback) => callback(target));
                    }
                    return comparisonData[part];
                  }, self2.unobservedData);
                });
              } else {
                Object.keys(self2.watchers).filter((i) => i.includes(".")).forEach((fullDotNotationKey) => {
                  let dotNotationParts = fullDotNotationKey.split(".");
                  if (key !== dotNotationParts[dotNotationParts.length - 1])
                    return;
                  dotNotationParts.reduce((comparisonData, part) => {
                    if (Object.is(target, comparisonData)) {
                      self2.watchers[fullDotNotationKey].forEach((callback) => callback(target[key]));
                    }
                    return comparisonData[part];
                  }, self2.unobservedData);
                });
              }
              if (self2.pauseReactivity)
                return;
              updateDom();
            });
          }
          walkAndSkipNestedComponents(el, callback, initializeComponentCallback = () => {
          }) {
            walk(el, (el2) => {
              if (el2.hasAttribute("x-data")) {
                if (!el2.isSameNode(this.$el)) {
                  if (!el2.__x)
                    initializeComponentCallback(el2);
                  return false;
                }
              }
              return callback(el2);
            });
          }
          initializeElements(rootEl, extraVars = () => {
          }, componentForClone = false) {
            this.walkAndSkipNestedComponents(rootEl, (el) => {
              if (el.__x_for_key !== void 0)
                return false;
              if (el.__x_inserted_me !== void 0)
                return false;
              this.initializeElement(el, extraVars, componentForClone ? false : true);
            }, (el) => {
              if (!componentForClone)
                el.__x = new Component(el);
            });
            this.executeAndClearRemainingShowDirectiveStack();
            this.executeAndClearNextTickStack(rootEl);
          }
          initializeElement(el, extraVars, shouldRegisterListeners = true) {
            if (el.hasAttribute("class") && getXAttrs(el, this).length > 0) {
              el.__x_original_classes = convertClassStringToArray(el.getAttribute("class"));
            }
            shouldRegisterListeners && this.registerListeners(el, extraVars);
            this.resolveBoundAttributes(el, true, extraVars);
          }
          updateElements(rootEl, extraVars = () => {
          }) {
            this.walkAndSkipNestedComponents(rootEl, (el) => {
              if (el.__x_for_key !== void 0 && !el.isSameNode(this.$el))
                return false;
              this.updateElement(el, extraVars);
            }, (el) => {
              el.__x = new Component(el);
            });
            this.executeAndClearRemainingShowDirectiveStack();
            this.executeAndClearNextTickStack(rootEl);
          }
          executeAndClearNextTickStack(el) {
            if (el === this.$el && this.nextTickStack.length > 0) {
              requestAnimationFrame(() => {
                while (this.nextTickStack.length > 0) {
                  this.nextTickStack.shift()();
                }
              });
            }
          }
          executeAndClearRemainingShowDirectiveStack() {
            this.showDirectiveStack.reverse().map((handler) => {
              return new Promise((resolve, reject) => {
                handler(resolve, reject);
              });
            }).reduce((promiseChain, promise) => {
              return promiseChain.then(() => {
                return promise.then((finishElement) => {
                  finishElement();
                });
              });
            }, Promise.resolve(() => {
            })).catch((e) => {
              if (e !== TRANSITION_CANCELLED)
                throw e;
            });
            this.showDirectiveStack = [];
            this.showDirectiveLastElement = void 0;
          }
          updateElement(el, extraVars) {
            this.resolveBoundAttributes(el, false, extraVars);
          }
          registerListeners(el, extraVars) {
            getXAttrs(el, this).forEach(({
              type,
              value,
              modifiers,
              expression
            }) => {
              switch (type) {
                case "on":
                  registerListener(this, el, value, modifiers, expression, extraVars);
                  break;
                case "model":
                  registerModelListener(this, el, modifiers, expression, extraVars);
                  break;
              }
            });
          }
          resolveBoundAttributes(el, initialUpdate = false, extraVars) {
            let attrs = getXAttrs(el, this);
            attrs.forEach(({
              type,
              value,
              modifiers,
              expression
            }) => {
              switch (type) {
                case "model":
                  handleAttributeBindingDirective(this, el, "value", expression, extraVars, type, modifiers);
                  break;
                case "bind":
                  if (el.tagName.toLowerCase() === "template" && value === "key")
                    return;
                  handleAttributeBindingDirective(this, el, value, expression, extraVars, type, modifiers);
                  break;
                case "text":
                  var output = this.evaluateReturnExpression(el, expression, extraVars);
                  handleTextDirective(el, output, expression);
                  break;
                case "html":
                  handleHtmlDirective(this, el, expression, extraVars);
                  break;
                case "show":
                  var output = this.evaluateReturnExpression(el, expression, extraVars);
                  handleShowDirective(this, el, output, modifiers, initialUpdate);
                  break;
                case "if":
                  if (attrs.some((i) => i.type === "for"))
                    return;
                  var output = this.evaluateReturnExpression(el, expression, extraVars);
                  handleIfDirective(this, el, output, initialUpdate, extraVars);
                  break;
                case "for":
                  handleForDirective(this, el, expression, initialUpdate, extraVars);
                  break;
                case "cloak":
                  el.removeAttribute("x-cloak");
                  break;
              }
            });
          }
          evaluateReturnExpression(el, expression, extraVars = () => {
          }) {
            return saferEval(el, expression, this.$data, _objectSpread2(_objectSpread2({}, extraVars()), {}, {
              $dispatch: this.getDispatchFunction(el)
            }));
          }
          evaluateCommandExpression(el, expression, extraVars = () => {
          }) {
            return saferEvalNoReturn(el, expression, this.$data, _objectSpread2(_objectSpread2({}, extraVars()), {}, {
              $dispatch: this.getDispatchFunction(el)
            }));
          }
          getDispatchFunction(el) {
            return (event, detail = {}) => {
              el.dispatchEvent(new CustomEvent(event, {
                detail,
                bubbles: true
              }));
            };
          }
          listenForNewElementsToInitialize() {
            const targetNode = this.$el;
            const observerOptions = {
              childList: true,
              attributes: true,
              subtree: true
            };
            const observer = new MutationObserver((mutations) => {
              for (let i = 0; i < mutations.length; i++) {
                const closestParentComponent = mutations[i].target.closest("[x-data]");
                if (!(closestParentComponent && closestParentComponent.isSameNode(this.$el)))
                  continue;
                if (mutations[i].type === "attributes" && mutations[i].attributeName === "x-data") {
                  const xAttr = mutations[i].target.getAttribute("x-data") || "{}";
                  const rawData = saferEval(this.$el, xAttr, {
                    $el: this.$el
                  });
                  Object.keys(rawData).forEach((key) => {
                    if (this.$data[key] !== rawData[key]) {
                      this.$data[key] = rawData[key];
                    }
                  });
                }
                if (mutations[i].addedNodes.length > 0) {
                  mutations[i].addedNodes.forEach((node) => {
                    if (node.nodeType !== 1 || node.__x_inserted_me)
                      return;
                    if (node.matches("[x-data]") && !node.__x) {
                      node.__x = new Component(node);
                      return;
                    }
                    this.initializeElements(node);
                  });
                }
              }
            });
            observer.observe(targetNode, observerOptions);
          }
          getRefsProxy() {
            var self2 = this;
            var refObj = {};
            return new Proxy(refObj, {
              get(object, property) {
                if (property === "$isAlpineProxy")
                  return true;
                var ref;
                self2.walkAndSkipNestedComponents(self2.$el, (el) => {
                  if (el.hasAttribute("x-ref") && el.getAttribute("x-ref") === property) {
                    ref = el;
                  }
                });
                return ref;
              }
            });
          }
        }
        const Alpine = {
          version: "2.8.2",
          pauseMutationObserver: false,
          magicProperties: {},
          onComponentInitializeds: [],
          onBeforeComponentInitializeds: [],
          ignoreFocusedForValueBinding: false,
          start: async function start() {
            if (!isTesting()) {
              await domReady();
            }
            this.discoverComponents((el) => {
              this.initializeComponent(el);
            });
            document.addEventListener("turbolinks:load", () => {
              this.discoverUninitializedComponents((el) => {
                this.initializeComponent(el);
              });
            });
            this.listenForNewUninitializedComponentsAtRunTime();
          },
          discoverComponents: function discoverComponents(callback) {
            const rootEls = document.querySelectorAll("[x-data]");
            rootEls.forEach((rootEl) => {
              callback(rootEl);
            });
          },
          discoverUninitializedComponents: function discoverUninitializedComponents(callback, el = null) {
            const rootEls = (el || document).querySelectorAll("[x-data]");
            Array.from(rootEls).filter((el2) => el2.__x === void 0).forEach((rootEl) => {
              callback(rootEl);
            });
          },
          listenForNewUninitializedComponentsAtRunTime: function listenForNewUninitializedComponentsAtRunTime() {
            const targetNode = document.querySelector("body");
            const observerOptions = {
              childList: true,
              attributes: true,
              subtree: true
            };
            const observer = new MutationObserver((mutations) => {
              if (this.pauseMutationObserver)
                return;
              for (let i = 0; i < mutations.length; i++) {
                if (mutations[i].addedNodes.length > 0) {
                  mutations[i].addedNodes.forEach((node) => {
                    if (node.nodeType !== 1)
                      return;
                    if (node.parentElement && node.parentElement.closest("[x-data]"))
                      return;
                    this.discoverUninitializedComponents((el) => {
                      this.initializeComponent(el);
                    }, node.parentElement);
                  });
                }
              }
            });
            observer.observe(targetNode, observerOptions);
          },
          initializeComponent: function initializeComponent(el) {
            if (!el.__x) {
              try {
                el.__x = new Component(el);
              } catch (error) {
                setTimeout(() => {
                  throw error;
                }, 0);
              }
            }
          },
          clone: function clone2(component, newEl) {
            if (!newEl.__x) {
              newEl.__x = new Component(newEl, component);
            }
          },
          addMagicProperty: function addMagicProperty(name, callback) {
            this.magicProperties[name] = callback;
          },
          onComponentInitialized: function onComponentInitialized(callback) {
            this.onComponentInitializeds.push(callback);
          },
          onBeforeComponentInitialized: function onBeforeComponentInitialized(callback) {
            this.onBeforeComponentInitializeds.push(callback);
          }
        };
        if (!isTesting()) {
          window.Alpine = Alpine;
          if (window.deferLoadingAlpine) {
            window.deferLoadingAlpine(function() {
              window.Alpine.start();
            });
          } else {
            window.Alpine.start();
          }
        }
        return Alpine;
      });
    }
  });

  // ../deps/phoenix_html/priv/static/phoenix_html.js
  "use strict";
  (function() {
    var PolyfillEvent = eventConstructor();
    function eventConstructor() {
      if (typeof window.CustomEvent === "function")
        return window.CustomEvent;
      function CustomEvent2(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: void 0 };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      }
      CustomEvent2.prototype = window.Event.prototype;
      return CustomEvent2;
    }
    function buildHiddenInput(name, value) {
      var input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      return input;
    }
    function handleClick(element, targetModifierKey) {
      var to = element.getAttribute("data-to"), method = buildHiddenInput("_method", element.getAttribute("data-method")), csrf = buildHiddenInput("_csrf_token", element.getAttribute("data-csrf")), form = document.createElement("form"), target = element.getAttribute("target");
      form.method = element.getAttribute("data-method") === "get" ? "get" : "post";
      form.action = to;
      form.style.display = "hidden";
      if (target)
        form.target = target;
      else if (targetModifierKey)
        form.target = "_blank";
      form.appendChild(csrf);
      form.appendChild(method);
      document.body.appendChild(form);
      form.submit();
    }
    window.addEventListener("click", function(e) {
      var element = e.target;
      if (e.defaultPrevented)
        return;
      while (element && element.getAttribute) {
        var phoenixLinkEvent = new PolyfillEvent("phoenix.link.click", {
          "bubbles": true,
          "cancelable": true
        });
        if (!element.dispatchEvent(phoenixLinkEvent)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return false;
        }
        if (element.getAttribute("data-method")) {
          handleClick(element, e.metaKey || e.shiftKey);
          e.preventDefault();
          return false;
        } else {
          element = element.parentNode;
        }
      }
    }, false);
    window.addEventListener("phoenix.link.click", function(e) {
      var message = e.target.getAttribute("data-confirm");
      if (message && !window.confirm(message)) {
        e.preventDefault();
      }
    }, false);
  })();

  // ../deps/phoenix/priv/static/phoenix.mjs
  var closure = (value) => {
    if (typeof value === "function") {
      return value;
    } else {
      let closure22 = function() {
        return value;
      };
      return closure22;
    }
  };
  var globalSelf = typeof self !== "undefined" ? self : null;
  var phxWindow = typeof window !== "undefined" ? window : null;
  var global = globalSelf || phxWindow || global;
  var DEFAULT_VSN = "2.0.0";
  var SOCKET_STATES = { connecting: 0, open: 1, closing: 2, closed: 3 };
  var DEFAULT_TIMEOUT = 1e4;
  var WS_CLOSE_NORMAL = 1e3;
  var CHANNEL_STATES = {
    closed: "closed",
    errored: "errored",
    joined: "joined",
    joining: "joining",
    leaving: "leaving"
  };
  var CHANNEL_EVENTS = {
    close: "phx_close",
    error: "phx_error",
    join: "phx_join",
    reply: "phx_reply",
    leave: "phx_leave"
  };
  var TRANSPORTS = {
    longpoll: "longpoll",
    websocket: "websocket"
  };
  var XHR_STATES = {
    complete: 4
  };
  var Push = class {
    constructor(channel, event, payload, timeout) {
      this.channel = channel;
      this.event = event;
      this.payload = payload || function() {
        return {};
      };
      this.receivedResp = null;
      this.timeout = timeout;
      this.timeoutTimer = null;
      this.recHooks = [];
      this.sent = false;
    }
    resend(timeout) {
      this.timeout = timeout;
      this.reset();
      this.send();
    }
    send() {
      if (this.hasReceived("timeout")) {
        return;
      }
      this.startTimeout();
      this.sent = true;
      this.channel.socket.push({
        topic: this.channel.topic,
        event: this.event,
        payload: this.payload(),
        ref: this.ref,
        join_ref: this.channel.joinRef()
      });
    }
    receive(status, callback) {
      if (this.hasReceived(status)) {
        callback(this.receivedResp.response);
      }
      this.recHooks.push({ status, callback });
      return this;
    }
    reset() {
      this.cancelRefEvent();
      this.ref = null;
      this.refEvent = null;
      this.receivedResp = null;
      this.sent = false;
    }
    matchReceive({ status, response, _ref }) {
      this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
    }
    cancelRefEvent() {
      if (!this.refEvent) {
        return;
      }
      this.channel.off(this.refEvent);
    }
    cancelTimeout() {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
    startTimeout() {
      if (this.timeoutTimer) {
        this.cancelTimeout();
      }
      this.ref = this.channel.socket.makeRef();
      this.refEvent = this.channel.replyEventName(this.ref);
      this.channel.on(this.refEvent, (payload) => {
        this.cancelRefEvent();
        this.cancelTimeout();
        this.receivedResp = payload;
        this.matchReceive(payload);
      });
      this.timeoutTimer = setTimeout(() => {
        this.trigger("timeout", {});
      }, this.timeout);
    }
    hasReceived(status) {
      return this.receivedResp && this.receivedResp.status === status;
    }
    trigger(status, response) {
      this.channel.trigger(this.refEvent, { status, response });
    }
  };
  var Timer = class {
    constructor(callback, timerCalc) {
      this.callback = callback;
      this.timerCalc = timerCalc;
      this.timer = null;
      this.tries = 0;
    }
    reset() {
      this.tries = 0;
      clearTimeout(this.timer);
    }
    scheduleTimeout() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.tries = this.tries + 1;
        this.callback();
      }, this.timerCalc(this.tries + 1));
    }
  };
  var Channel = class {
    constructor(topic, params, socket) {
      this.state = CHANNEL_STATES.closed;
      this.topic = topic;
      this.params = closure(params || {});
      this.socket = socket;
      this.bindings = [];
      this.bindingRef = 0;
      this.timeout = this.socket.timeout;
      this.joinedOnce = false;
      this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
      this.pushBuffer = [];
      this.stateChangeRefs = [];
      this.rejoinTimer = new Timer(() => {
        if (this.socket.isConnected()) {
          this.rejoin();
        }
      }, this.socket.rejoinAfterMs);
      this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset()));
      this.stateChangeRefs.push(this.socket.onOpen(() => {
        this.rejoinTimer.reset();
        if (this.isErrored()) {
          this.rejoin();
        }
      }));
      this.joinPush.receive("ok", () => {
        this.state = CHANNEL_STATES.joined;
        this.rejoinTimer.reset();
        this.pushBuffer.forEach((pushEvent) => pushEvent.send());
        this.pushBuffer = [];
      });
      this.joinPush.receive("error", () => {
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.onClose(() => {
        this.rejoinTimer.reset();
        if (this.socket.hasLogger())
          this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`);
        this.state = CHANNEL_STATES.closed;
        this.socket.remove(this);
      });
      this.onError((reason) => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `error ${this.topic}`, reason);
        if (this.isJoining()) {
          this.joinPush.reset();
        }
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.joinPush.receive("timeout", () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout);
        let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), this.timeout);
        leavePush.send();
        this.state = CHANNEL_STATES.errored;
        this.joinPush.reset();
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
        this.trigger(this.replyEventName(ref), payload);
      });
    }
    join(timeout = this.timeout) {
      if (this.joinedOnce) {
        throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
      } else {
        this.timeout = timeout;
        this.joinedOnce = true;
        this.rejoin();
        return this.joinPush;
      }
    }
    onClose(callback) {
      this.on(CHANNEL_EVENTS.close, callback);
    }
    onError(callback) {
      return this.on(CHANNEL_EVENTS.error, (reason) => callback(reason));
    }
    on(event, callback) {
      let ref = this.bindingRef++;
      this.bindings.push({ event, ref, callback });
      return ref;
    }
    off(event, ref) {
      this.bindings = this.bindings.filter((bind) => {
        return !(bind.event === event && (typeof ref === "undefined" || ref === bind.ref));
      });
    }
    canPush() {
      return this.socket.isConnected() && this.isJoined();
    }
    push(event, payload, timeout = this.timeout) {
      payload = payload || {};
      if (!this.joinedOnce) {
        throw new Error(`tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
      }
      let pushEvent = new Push(this, event, function() {
        return payload;
      }, timeout);
      if (this.canPush()) {
        pushEvent.send();
      } else {
        pushEvent.startTimeout();
        this.pushBuffer.push(pushEvent);
      }
      return pushEvent;
    }
    leave(timeout = this.timeout) {
      this.rejoinTimer.reset();
      this.joinPush.cancelTimeout();
      this.state = CHANNEL_STATES.leaving;
      let onClose = () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `leave ${this.topic}`);
        this.trigger(CHANNEL_EVENTS.close, "leave");
      };
      let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), timeout);
      leavePush.receive("ok", () => onClose()).receive("timeout", () => onClose());
      leavePush.send();
      if (!this.canPush()) {
        leavePush.trigger("ok", {});
      }
      return leavePush;
    }
    onMessage(_event, payload, _ref) {
      return payload;
    }
    isMember(topic, event, payload, joinRef) {
      if (this.topic !== topic) {
        return false;
      }
      if (joinRef && joinRef !== this.joinRef()) {
        if (this.socket.hasLogger())
          this.socket.log("channel", "dropping outdated message", { topic, event, payload, joinRef });
        return false;
      } else {
        return true;
      }
    }
    joinRef() {
      return this.joinPush.ref;
    }
    rejoin(timeout = this.timeout) {
      if (this.isLeaving()) {
        return;
      }
      this.socket.leaveOpenTopic(this.topic);
      this.state = CHANNEL_STATES.joining;
      this.joinPush.resend(timeout);
    }
    trigger(event, payload, ref, joinRef) {
      let handledPayload = this.onMessage(event, payload, ref, joinRef);
      if (payload && !handledPayload) {
        throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
      }
      let eventBindings = this.bindings.filter((bind) => bind.event === event);
      for (let i = 0; i < eventBindings.length; i++) {
        let bind = eventBindings[i];
        bind.callback(handledPayload, ref, joinRef || this.joinRef());
      }
    }
    replyEventName(ref) {
      return `chan_reply_${ref}`;
    }
    isClosed() {
      return this.state === CHANNEL_STATES.closed;
    }
    isErrored() {
      return this.state === CHANNEL_STATES.errored;
    }
    isJoined() {
      return this.state === CHANNEL_STATES.joined;
    }
    isJoining() {
      return this.state === CHANNEL_STATES.joining;
    }
    isLeaving() {
      return this.state === CHANNEL_STATES.leaving;
    }
  };
  var Ajax = class {
    static request(method, endPoint, accept, body, timeout, ontimeout, callback) {
      if (global.XDomainRequest) {
        let req = new global.XDomainRequest();
        return this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
      } else {
        let req = new global.XMLHttpRequest();
        return this.xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback);
      }
    }
    static xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
      req.timeout = timeout;
      req.open(method, endPoint);
      req.onload = () => {
        let response = this.parseJSON(req.responseText);
        callback && callback(response);
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.onprogress = () => {
      };
      req.send(body);
      return req;
    }
    static xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback) {
      req.open(method, endPoint, true);
      req.timeout = timeout;
      req.setRequestHeader("Content-Type", accept);
      req.onerror = () => callback && callback(null);
      req.onreadystatechange = () => {
        if (req.readyState === XHR_STATES.complete && callback) {
          let response = this.parseJSON(req.responseText);
          callback(response);
        }
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.send(body);
      return req;
    }
    static parseJSON(resp) {
      if (!resp || resp === "") {
        return null;
      }
      try {
        return JSON.parse(resp);
      } catch (e) {
        console && console.log("failed to parse JSON response", resp);
        return null;
      }
    }
    static serialize(obj, parentKey) {
      let queryStr = [];
      for (var key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
          continue;
        }
        let paramKey = parentKey ? `${parentKey}[${key}]` : key;
        let paramVal = obj[key];
        if (typeof paramVal === "object") {
          queryStr.push(this.serialize(paramVal, paramKey));
        } else {
          queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
        }
      }
      return queryStr.join("&");
    }
    static appendParams(url, params) {
      if (Object.keys(params).length === 0) {
        return url;
      }
      let prefix = url.match(/\?/) ? "&" : "?";
      return `${url}${prefix}${this.serialize(params)}`;
    }
  };
  var LongPoll = class {
    constructor(endPoint) {
      this.endPoint = null;
      this.token = null;
      this.skipHeartbeat = true;
      this.reqs = /* @__PURE__ */ new Set();
      this.onopen = function() {
      };
      this.onerror = function() {
      };
      this.onmessage = function() {
      };
      this.onclose = function() {
      };
      this.pollEndpoint = this.normalizeEndpoint(endPoint);
      this.readyState = SOCKET_STATES.connecting;
      this.poll();
    }
    normalizeEndpoint(endPoint) {
      return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
    }
    endpointURL() {
      return Ajax.appendParams(this.pollEndpoint, { token: this.token });
    }
    closeAndRetry(code, reason, wasClean) {
      this.close(code, reason, wasClean);
      this.readyState = SOCKET_STATES.connecting;
    }
    ontimeout() {
      this.onerror("timeout");
      this.closeAndRetry(1005, "timeout", false);
    }
    isActive() {
      return this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting;
    }
    poll() {
      this.ajax("GET", null, () => this.ontimeout(), (resp) => {
        if (resp) {
          var { status, token, messages } = resp;
          this.token = token;
        } else {
          status = 0;
        }
        switch (status) {
          case 200:
            messages.forEach((msg) => {
              setTimeout(() => this.onmessage({ data: msg }), 0);
            });
            this.poll();
            break;
          case 204:
            this.poll();
            break;
          case 410:
            this.readyState = SOCKET_STATES.open;
            this.onopen({});
            this.poll();
            break;
          case 403:
            this.onerror(403);
            this.close(1008, "forbidden", false);
            break;
          case 0:
          case 500:
            this.onerror(500);
            this.closeAndRetry(1011, "internal server error", 500);
            break;
          default:
            throw new Error(`unhandled poll status ${status}`);
        }
      });
    }
    send(body) {
      this.ajax("POST", body, () => this.onerror("timeout"), (resp) => {
        if (!resp || resp.status !== 200) {
          this.onerror(resp && resp.status);
          this.closeAndRetry(1011, "internal server error", false);
        }
      });
    }
    close(code, reason, wasClean) {
      for (let req of this.reqs) {
        req.abort();
      }
      this.readyState = SOCKET_STATES.closed;
      let opts = Object.assign({ code: 1e3, reason: void 0, wasClean: true }, { code, reason, wasClean });
      if (typeof CloseEvent !== "undefined") {
        this.onclose(new CloseEvent("close", opts));
      } else {
        this.onclose(opts);
      }
    }
    ajax(method, body, onCallerTimeout, callback) {
      let req;
      let ontimeout = () => {
        this.reqs.delete(req);
        onCallerTimeout();
      };
      req = Ajax.request(method, this.endpointURL(), "application/json", body, this.timeout, ontimeout, (resp) => {
        this.reqs.delete(req);
        if (this.isActive()) {
          callback(resp);
        }
      });
      this.reqs.add(req);
    }
  };
  var serializer_default = {
    HEADER_LENGTH: 1,
    META_LENGTH: 4,
    KINDS: { push: 0, reply: 1, broadcast: 2 },
    encode(msg, callback) {
      if (msg.payload.constructor === ArrayBuffer) {
        return callback(this.binaryEncode(msg));
      } else {
        let payload = [msg.join_ref, msg.ref, msg.topic, msg.event, msg.payload];
        return callback(JSON.stringify(payload));
      }
    },
    decode(rawPayload, callback) {
      if (rawPayload.constructor === ArrayBuffer) {
        return callback(this.binaryDecode(rawPayload));
      } else {
        let [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload);
        return callback({ join_ref, ref, topic, event, payload });
      }
    },
    binaryEncode(message) {
      let { join_ref, ref, event, topic, payload } = message;
      let metaLength = this.META_LENGTH + join_ref.length + ref.length + topic.length + event.length;
      let header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
      let view = new DataView(header);
      let offset = 0;
      view.setUint8(offset++, this.KINDS.push);
      view.setUint8(offset++, join_ref.length);
      view.setUint8(offset++, ref.length);
      view.setUint8(offset++, topic.length);
      view.setUint8(offset++, event.length);
      Array.from(join_ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(topic, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(event, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      var combined = new Uint8Array(header.byteLength + payload.byteLength);
      combined.set(new Uint8Array(header), 0);
      combined.set(new Uint8Array(payload), header.byteLength);
      return combined.buffer;
    },
    binaryDecode(buffer) {
      let view = new DataView(buffer);
      let kind = view.getUint8(0);
      let decoder = new TextDecoder();
      switch (kind) {
        case this.KINDS.push:
          return this.decodePush(buffer, view, decoder);
        case this.KINDS.reply:
          return this.decodeReply(buffer, view, decoder);
        case this.KINDS.broadcast:
          return this.decodeBroadcast(buffer, view, decoder);
      }
    },
    decodePush(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let topicSize = view.getUint8(2);
      let eventSize = view.getUint8(3);
      let offset = this.HEADER_LENGTH + this.META_LENGTH - 1;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: joinRef, ref: null, topic, event, payload: data };
    },
    decodeReply(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let refSize = view.getUint8(2);
      let topicSize = view.getUint8(3);
      let eventSize = view.getUint8(4);
      let offset = this.HEADER_LENGTH + this.META_LENGTH;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let ref = decoder.decode(buffer.slice(offset, offset + refSize));
      offset = offset + refSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      let payload = { status: event, response: data };
      return { join_ref: joinRef, ref, topic, event: CHANNEL_EVENTS.reply, payload };
    },
    decodeBroadcast(buffer, view, decoder) {
      let topicSize = view.getUint8(1);
      let eventSize = view.getUint8(2);
      let offset = this.HEADER_LENGTH + 2;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: null, ref: null, topic, event, payload: data };
    }
  };
  var Socket = class {
    constructor(endPoint, opts = {}) {
      this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] };
      this.channels = [];
      this.sendBuffer = [];
      this.ref = 0;
      this.timeout = opts.timeout || DEFAULT_TIMEOUT;
      this.transport = opts.transport || global.WebSocket || LongPoll;
      this.establishedConnections = 0;
      this.defaultEncoder = serializer_default.encode.bind(serializer_default);
      this.defaultDecoder = serializer_default.decode.bind(serializer_default);
      this.closeWasClean = false;
      this.binaryType = opts.binaryType || "arraybuffer";
      this.connectClock = 1;
      if (this.transport !== LongPoll) {
        this.encode = opts.encode || this.defaultEncoder;
        this.decode = opts.decode || this.defaultDecoder;
      } else {
        this.encode = this.defaultEncoder;
        this.decode = this.defaultDecoder;
      }
      let awaitingConnectionOnPageShow = null;
      if (phxWindow && phxWindow.addEventListener) {
        phxWindow.addEventListener("pagehide", (_e) => {
          if (this.conn) {
            this.disconnect();
            awaitingConnectionOnPageShow = this.connectClock;
          }
        });
        phxWindow.addEventListener("pageshow", (_e) => {
          if (awaitingConnectionOnPageShow === this.connectClock) {
            awaitingConnectionOnPageShow = null;
            this.connect();
          }
        });
      }
      this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 3e4;
      this.rejoinAfterMs = (tries) => {
        if (opts.rejoinAfterMs) {
          return opts.rejoinAfterMs(tries);
        } else {
          return [1e3, 2e3, 5e3][tries - 1] || 1e4;
        }
      };
      this.reconnectAfterMs = (tries) => {
        if (opts.reconnectAfterMs) {
          return opts.reconnectAfterMs(tries);
        } else {
          return [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][tries - 1] || 5e3;
        }
      };
      this.logger = opts.logger || null;
      this.longpollerTimeout = opts.longpollerTimeout || 2e4;
      this.params = closure(opts.params || {});
      this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
      this.vsn = opts.vsn || DEFAULT_VSN;
      this.heartbeatTimer = null;
      this.pendingHeartbeatRef = null;
      this.reconnectTimer = new Timer(() => {
        this.teardown(() => this.connect());
      }, this.reconnectAfterMs);
    }
    getLongPollTransport() {
      return LongPoll;
    }
    replaceTransport(newTransport) {
      this.connectClock++;
      this.closeWasClean = true;
      this.reconnectTimer.reset();
      this.sendBuffer = [];
      if (this.conn) {
        this.conn.close();
        this.conn = null;
      }
      this.transport = newTransport;
    }
    protocol() {
      return location.protocol.match(/^https/) ? "wss" : "ws";
    }
    endPointURL() {
      let uri = Ajax.appendParams(Ajax.appendParams(this.endPoint, this.params()), { vsn: this.vsn });
      if (uri.charAt(0) !== "/") {
        return uri;
      }
      if (uri.charAt(1) === "/") {
        return `${this.protocol()}:${uri}`;
      }
      return `${this.protocol()}://${location.host}${uri}`;
    }
    disconnect(callback, code, reason) {
      this.connectClock++;
      this.closeWasClean = true;
      this.reconnectTimer.reset();
      this.teardown(callback, code, reason);
    }
    connect(params) {
      if (params) {
        console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor");
        this.params = closure(params);
      }
      if (this.conn) {
        return;
      }
      this.connectClock++;
      this.closeWasClean = false;
      this.conn = new this.transport(this.endPointURL());
      this.conn.binaryType = this.binaryType;
      this.conn.timeout = this.longpollerTimeout;
      this.conn.onopen = () => this.onConnOpen();
      this.conn.onerror = (error) => this.onConnError(error);
      this.conn.onmessage = (event) => this.onConnMessage(event);
      this.conn.onclose = (event) => this.onConnClose(event);
    }
    log(kind, msg, data) {
      this.logger(kind, msg, data);
    }
    hasLogger() {
      return this.logger !== null;
    }
    onOpen(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.open.push([ref, callback]);
      return ref;
    }
    onClose(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.close.push([ref, callback]);
      return ref;
    }
    onError(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.error.push([ref, callback]);
      return ref;
    }
    onMessage(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.message.push([ref, callback]);
      return ref;
    }
    ping(callback) {
      if (!this.isConnected()) {
        return false;
      }
      let ref = this.makeRef();
      let startTime = Date.now();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref });
      let onMsgRef = this.onMessage((msg) => {
        if (msg.ref === ref) {
          this.off([onMsgRef]);
          callback(Date.now() - startTime);
        }
      });
      return true;
    }
    onConnOpen() {
      if (this.hasLogger())
        this.log("transport", `connected to ${this.endPointURL()}`);
      this.closeWasClean = false;
      this.establishedConnections++;
      this.flushSendBuffer();
      this.reconnectTimer.reset();
      this.resetHeartbeat();
      this.stateChangeCallbacks.open.forEach(([, callback]) => callback());
    }
    heartbeatTimeout() {
      if (this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null;
        if (this.hasLogger()) {
          this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
        }
        this.abnormalClose("heartbeat timeout");
      }
    }
    resetHeartbeat() {
      if (this.conn && this.conn.skipHeartbeat) {
        return;
      }
      this.pendingHeartbeatRef = null;
      clearTimeout(this.heartbeatTimer);
      setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
    }
    teardown(callback, code, reason) {
      if (!this.conn) {
        return callback && callback();
      }
      this.waitForBufferDone(() => {
        if (this.conn) {
          if (code) {
            this.conn.close(code, reason || "");
          } else {
            this.conn.close();
          }
        }
        this.waitForSocketClosed(() => {
          if (this.conn) {
            this.conn.onclose = function() {
            };
            this.conn = null;
          }
          callback && callback();
        });
      });
    }
    waitForBufferDone(callback, tries = 1) {
      if (tries === 5 || !this.conn || !this.conn.bufferedAmount) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForBufferDone(callback, tries + 1);
      }, 150 * tries);
    }
    waitForSocketClosed(callback, tries = 1) {
      if (tries === 5 || !this.conn || this.conn.readyState === SOCKET_STATES.closed) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForSocketClosed(callback, tries + 1);
      }, 150 * tries);
    }
    onConnClose(event) {
      let closeCode = event && event.code;
      if (this.hasLogger())
        this.log("transport", "close", event);
      this.triggerChanError();
      clearTimeout(this.heartbeatTimer);
      if (!this.closeWasClean && closeCode !== 1e3) {
        this.reconnectTimer.scheduleTimeout();
      }
      this.stateChangeCallbacks.close.forEach(([, callback]) => callback(event));
    }
    onConnError(error) {
      if (this.hasLogger())
        this.log("transport", error);
      let transportBefore = this.transport;
      let establishedBefore = this.establishedConnections;
      this.stateChangeCallbacks.error.forEach(([, callback]) => {
        callback(error, transportBefore, establishedBefore);
      });
      if (transportBefore === this.transport || establishedBefore > 0) {
        this.triggerChanError();
      }
    }
    triggerChanError() {
      this.channels.forEach((channel) => {
        if (!(channel.isErrored() || channel.isLeaving() || channel.isClosed())) {
          channel.trigger(CHANNEL_EVENTS.error);
        }
      });
    }
    connectionState() {
      switch (this.conn && this.conn.readyState) {
        case SOCKET_STATES.connecting:
          return "connecting";
        case SOCKET_STATES.open:
          return "open";
        case SOCKET_STATES.closing:
          return "closing";
        default:
          return "closed";
      }
    }
    isConnected() {
      return this.connectionState() === "open";
    }
    remove(channel) {
      this.off(channel.stateChangeRefs);
      this.channels = this.channels.filter((c) => c.joinRef() !== channel.joinRef());
    }
    off(refs) {
      for (let key in this.stateChangeCallbacks) {
        this.stateChangeCallbacks[key] = this.stateChangeCallbacks[key].filter(([ref]) => {
          return refs.indexOf(ref) === -1;
        });
      }
    }
    channel(topic, chanParams = {}) {
      let chan = new Channel(topic, chanParams, this);
      this.channels.push(chan);
      return chan;
    }
    push(data) {
      if (this.hasLogger()) {
        let { topic, event, payload, ref, join_ref } = data;
        this.log("push", `${topic} ${event} (${join_ref}, ${ref})`, payload);
      }
      if (this.isConnected()) {
        this.encode(data, (result) => this.conn.send(result));
      } else {
        this.sendBuffer.push(() => this.encode(data, (result) => this.conn.send(result)));
      }
    }
    makeRef() {
      let newRef = this.ref + 1;
      if (newRef === this.ref) {
        this.ref = 0;
      } else {
        this.ref = newRef;
      }
      return this.ref.toString();
    }
    sendHeartbeat() {
      if (this.pendingHeartbeatRef && !this.isConnected()) {
        return;
      }
      this.pendingHeartbeatRef = this.makeRef();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
      this.heartbeatTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs);
    }
    abnormalClose(reason) {
      this.closeWasClean = false;
      if (this.isConnected()) {
        this.conn.close(WS_CLOSE_NORMAL, reason);
      }
    }
    flushSendBuffer() {
      if (this.isConnected() && this.sendBuffer.length > 0) {
        this.sendBuffer.forEach((callback) => callback());
        this.sendBuffer = [];
      }
    }
    onConnMessage(rawMessage) {
      this.decode(rawMessage.data, (msg) => {
        let { topic, event, payload, ref, join_ref } = msg;
        if (ref && ref === this.pendingHeartbeatRef) {
          clearTimeout(this.heartbeatTimer);
          this.pendingHeartbeatRef = null;
          setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
        }
        if (this.hasLogger())
          this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
        for (let i = 0; i < this.channels.length; i++) {
          const channel = this.channels[i];
          if (!channel.isMember(topic, event, payload, join_ref)) {
            continue;
          }
          channel.trigger(event, payload, ref, join_ref);
        }
        for (let i = 0; i < this.stateChangeCallbacks.message.length; i++) {
          let [, callback] = this.stateChangeCallbacks.message[i];
          callback(msg);
        }
      });
    }
    leaveOpenTopic(topic) {
      let dupChannel = this.channels.find((c) => c.topic === topic && (c.isJoined() || c.isJoining()));
      if (dupChannel) {
        if (this.hasLogger())
          this.log("transport", `leaving duplicate topic "${topic}"`);
        dupChannel.leave();
      }
    }
  };

  // ../deps/phoenix_live_view/priv/static/phoenix_live_view.esm.js
  var CONSECUTIVE_RELOADS = "consecutive-reloads";
  var MAX_RELOADS = 10;
  var RELOAD_JITTER_MIN = 5e3;
  var RELOAD_JITTER_MAX = 1e4;
  var FAILSAFE_JITTER = 3e4;
  var PHX_EVENT_CLASSES = [
    "phx-click-loading",
    "phx-change-loading",
    "phx-submit-loading",
    "phx-keydown-loading",
    "phx-keyup-loading",
    "phx-blur-loading",
    "phx-focus-loading"
  ];
  var PHX_COMPONENT = "data-phx-component";
  var PHX_LIVE_LINK = "data-phx-link";
  var PHX_TRACK_STATIC = "track-static";
  var PHX_LINK_STATE = "data-phx-link-state";
  var PHX_REF = "data-phx-ref";
  var PHX_REF_SRC = "data-phx-ref-src";
  var PHX_TRACK_UPLOADS = "track-uploads";
  var PHX_UPLOAD_REF = "data-phx-upload-ref";
  var PHX_PREFLIGHTED_REFS = "data-phx-preflighted-refs";
  var PHX_DONE_REFS = "data-phx-done-refs";
  var PHX_DROP_TARGET = "drop-target";
  var PHX_ACTIVE_ENTRY_REFS = "data-phx-active-refs";
  var PHX_LIVE_FILE_UPDATED = "phx:live-file:updated";
  var PHX_SKIP = "data-phx-skip";
  var PHX_PRUNE = "data-phx-prune";
  var PHX_PAGE_LOADING = "page-loading";
  var PHX_CONNECTED_CLASS = "phx-connected";
  var PHX_DISCONNECTED_CLASS = "phx-loading";
  var PHX_NO_FEEDBACK_CLASS = "phx-no-feedback";
  var PHX_ERROR_CLASS = "phx-error";
  var PHX_PARENT_ID = "data-phx-parent-id";
  var PHX_MAIN = "data-phx-main";
  var PHX_ROOT_ID = "data-phx-root-id";
  var PHX_TRIGGER_ACTION = "trigger-action";
  var PHX_FEEDBACK_FOR = "feedback-for";
  var PHX_HAS_FOCUSED = "phx-has-focused";
  var FOCUSABLE_INPUTS = ["text", "textarea", "number", "email", "password", "search", "tel", "url", "date", "time", "datetime-local", "color", "range"];
  var CHECKABLE_INPUTS = ["checkbox", "radio"];
  var PHX_HAS_SUBMITTED = "phx-has-submitted";
  var PHX_SESSION = "data-phx-session";
  var PHX_VIEW_SELECTOR = `[${PHX_SESSION}]`;
  var PHX_STICKY = "data-phx-sticky";
  var PHX_STATIC = "data-phx-static";
  var PHX_READONLY = "data-phx-readonly";
  var PHX_DISABLED = "data-phx-disabled";
  var PHX_DISABLE_WITH = "disable-with";
  var PHX_DISABLE_WITH_RESTORE = "data-phx-disable-with-restore";
  var PHX_HOOK = "hook";
  var PHX_DEBOUNCE = "debounce";
  var PHX_THROTTLE = "throttle";
  var PHX_UPDATE = "update";
  var PHX_KEY = "key";
  var PHX_PRIVATE = "phxPrivate";
  var PHX_AUTO_RECOVER = "auto-recover";
  var PHX_LV_DEBUG = "phx:live-socket:debug";
  var PHX_LV_PROFILE = "phx:live-socket:profiling";
  var PHX_LV_LATENCY_SIM = "phx:live-socket:latency-sim";
  var PHX_PROGRESS = "progress";
  var LOADER_TIMEOUT = 1;
  var BEFORE_UNLOAD_LOADER_TIMEOUT = 200;
  var BINDING_PREFIX = "phx-";
  var PUSH_TIMEOUT = 3e4;
  var DEBOUNCE_TRIGGER = "debounce-trigger";
  var THROTTLED = "throttled";
  var DEBOUNCE_PREV_KEY = "debounce-prev-key";
  var DEFAULTS = {
    debounce: 300,
    throttle: 300
  };
  var DYNAMICS = "d";
  var STATIC = "s";
  var COMPONENTS = "c";
  var EVENTS = "e";
  var REPLY = "r";
  var TITLE = "t";
  var TEMPLATES = "p";
  var EntryUploader = class {
    constructor(entry, chunkSize, liveSocket2) {
      this.liveSocket = liveSocket2;
      this.entry = entry;
      this.offset = 0;
      this.chunkSize = chunkSize;
      this.chunkTimer = null;
      this.uploadChannel = liveSocket2.channel(`lvu:${entry.ref}`, { token: entry.metadata() });
    }
    error(reason) {
      clearTimeout(this.chunkTimer);
      this.uploadChannel.leave();
      this.entry.error(reason);
    }
    upload() {
      this.uploadChannel.onError((reason) => this.error(reason));
      this.uploadChannel.join().receive("ok", (_data) => this.readNextChunk()).receive("error", (reason) => this.error(reason));
    }
    isDone() {
      return this.offset >= this.entry.file.size;
    }
    readNextChunk() {
      let reader = new window.FileReader();
      let blob = this.entry.file.slice(this.offset, this.chunkSize + this.offset);
      reader.onload = (e) => {
        if (e.target.error === null) {
          this.offset += e.target.result.byteLength;
          this.pushChunk(e.target.result);
        } else {
          return logError("Read error: " + e.target.error);
        }
      };
      reader.readAsArrayBuffer(blob);
    }
    pushChunk(chunk) {
      if (!this.uploadChannel.isJoined()) {
        return;
      }
      this.uploadChannel.push("chunk", chunk).receive("ok", () => {
        this.entry.progress(this.offset / this.entry.file.size * 100);
        if (!this.isDone()) {
          this.chunkTimer = setTimeout(() => this.readNextChunk(), this.liveSocket.getLatencySim() || 0);
        }
      });
    }
  };
  var logError = (msg, obj) => console.error && console.error(msg, obj);
  var isCid = (cid) => {
    let type = typeof cid;
    return type === "number" || type === "string" && /^(0|[1-9]\d*)$/.test(cid);
  };
  function detectDuplicateIds() {
    let ids = new Set();
    let elems = document.querySelectorAll("*[id]");
    for (let i = 0, len = elems.length; i < len; i++) {
      if (ids.has(elems[i].id)) {
        console.error(`Multiple IDs detected: ${elems[i].id}. Ensure unique element ids.`);
      } else {
        ids.add(elems[i].id);
      }
    }
  }
  var debug = (view, kind, msg, obj) => {
    if (view.liveSocket.isDebugEnabled()) {
      console.log(`${view.id} ${kind}: ${msg} - `, obj);
    }
  };
  var closure2 = (val) => typeof val === "function" ? val : function() {
    return val;
  };
  var clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };
  var closestPhxBinding = (el, binding, borderEl) => {
    do {
      if (el.matches(`[${binding}]`)) {
        return el;
      }
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1 && !(borderEl && borderEl.isSameNode(el) || el.matches(PHX_VIEW_SELECTOR)));
    return null;
  };
  var isObject = (obj) => {
    return obj !== null && typeof obj === "object" && !(obj instanceof Array);
  };
  var isEqualObj = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);
  var isEmpty = (obj) => {
    for (let x in obj) {
      return false;
    }
    return true;
  };
  var maybe = (el, callback) => el && callback(el);
  var channelUploader = function(entries, onError, resp, liveSocket2) {
    entries.forEach((entry) => {
      let entryUploader = new EntryUploader(entry, resp.config.chunk_size, liveSocket2);
      entryUploader.upload();
    });
  };
  var Browser = {
    canPushState() {
      return typeof history.pushState !== "undefined";
    },
    dropLocal(localStorage, namespace, subkey) {
      return localStorage.removeItem(this.localKey(namespace, subkey));
    },
    updateLocal(localStorage, namespace, subkey, initial, func) {
      let current = this.getLocal(localStorage, namespace, subkey);
      let key = this.localKey(namespace, subkey);
      let newVal = current === null ? initial : func(current);
      localStorage.setItem(key, JSON.stringify(newVal));
      return newVal;
    },
    getLocal(localStorage, namespace, subkey) {
      return JSON.parse(localStorage.getItem(this.localKey(namespace, subkey)));
    },
    updateCurrentState(callback) {
      if (!this.canPushState()) {
        return;
      }
      history.replaceState(callback(history.state || {}), "", window.location.href);
    },
    pushState(kind, meta, to) {
      if (this.canPushState()) {
        if (to !== window.location.href) {
          if (meta.type == "redirect" && meta.scroll) {
            let currentState = history.state || {};
            currentState.scroll = meta.scroll;
            history.replaceState(currentState, "", window.location.href);
          }
          delete meta.scroll;
          history[kind + "State"](meta, "", to || null);
          let hashEl = this.getHashTargetEl(window.location.hash);
          if (hashEl) {
            hashEl.scrollIntoView();
          } else if (meta.type === "redirect") {
            window.scroll(0, 0);
          }
        }
      } else {
        this.redirect(to);
      }
    },
    setCookie(name, value) {
      document.cookie = `${name}=${value}`;
    },
    getCookie(name) {
      return document.cookie.replace(new RegExp(`(?:(?:^|.*;s*)${name}s*=s*([^;]*).*$)|^.*$`), "$1");
    },
    redirect(toURL, flash) {
      if (flash) {
        Browser.setCookie("__phoenix_flash__", flash + "; max-age=60000; path=/");
      }
      window.location = toURL;
    },
    localKey(namespace, subkey) {
      return `${namespace}-${subkey}`;
    },
    getHashTargetEl(maybeHash) {
      let hash = maybeHash.toString().substring(1);
      if (hash === "") {
        return;
      }
      return document.getElementById(hash) || document.querySelector(`a[name="${hash}"]`);
    }
  };
  var browser_default = Browser;
  var DOM = {
    byId(id) {
      return document.getElementById(id) || logError(`no id found for ${id}`);
    },
    removeClass(el, className) {
      el.classList.remove(className);
      if (el.classList.length === 0) {
        el.removeAttribute("class");
      }
    },
    all(node, query, callback) {
      if (!node) {
        return [];
      }
      let array = Array.from(node.querySelectorAll(query));
      return callback ? array.forEach(callback) : array;
    },
    childNodeLength(html) {
      let template = document.createElement("template");
      template.innerHTML = html;
      return template.content.childElementCount;
    },
    isUploadInput(el) {
      return el.type === "file" && el.getAttribute(PHX_UPLOAD_REF) !== null;
    },
    findUploadInputs(node) {
      return this.all(node, `input[type="file"][${PHX_UPLOAD_REF}]`);
    },
    findComponentNodeList(node, cid) {
      return this.filterWithinSameLiveView(this.all(node, `[${PHX_COMPONENT}="${cid}"]`), node);
    },
    isPhxDestroyed(node) {
      return node.id && DOM.private(node, "destroyed") ? true : false;
    },
    markPhxChildDestroyed(el) {
      if (this.isPhxChild(el)) {
        el.setAttribute(PHX_SESSION, "");
      }
      this.putPrivate(el, "destroyed", true);
    },
    findPhxChildrenInFragment(html, parentId) {
      let template = document.createElement("template");
      template.innerHTML = html;
      return this.findPhxChildren(template.content, parentId);
    },
    isIgnored(el, phxUpdate) {
      return (el.getAttribute(phxUpdate) || el.getAttribute("data-phx-update")) === "ignore";
    },
    isPhxUpdate(el, phxUpdate, updateTypes) {
      return el.getAttribute && updateTypes.indexOf(el.getAttribute(phxUpdate)) >= 0;
    },
    findPhxSticky(el) {
      return this.all(el, `[${PHX_STICKY}]`);
    },
    findPhxChildren(el, parentId) {
      return this.all(el, `${PHX_VIEW_SELECTOR}[${PHX_PARENT_ID}="${parentId}"]`);
    },
    findParentCIDs(node, cids) {
      let initial = new Set(cids);
      return cids.reduce((acc, cid) => {
        let selector = `[${PHX_COMPONENT}="${cid}"] [${PHX_COMPONENT}]`;
        this.filterWithinSameLiveView(this.all(node, selector), node).map((el) => parseInt(el.getAttribute(PHX_COMPONENT))).forEach((childCID) => acc.delete(childCID));
        return acc;
      }, initial);
    },
    filterWithinSameLiveView(nodes, parent) {
      if (parent.querySelector(PHX_VIEW_SELECTOR)) {
        return nodes.filter((el) => this.withinSameLiveView(el, parent));
      } else {
        return nodes;
      }
    },
    withinSameLiveView(node, parent) {
      while (node = node.parentNode) {
        if (node.isSameNode(parent)) {
          return true;
        }
        if (node.getAttribute(PHX_SESSION) !== null) {
          return false;
        }
      }
    },
    private(el, key) {
      return el[PHX_PRIVATE] && el[PHX_PRIVATE][key];
    },
    deletePrivate(el, key) {
      el[PHX_PRIVATE] && delete el[PHX_PRIVATE][key];
    },
    putPrivate(el, key, value) {
      if (!el[PHX_PRIVATE]) {
        el[PHX_PRIVATE] = {};
      }
      el[PHX_PRIVATE][key] = value;
    },
    updatePrivate(el, key, defaultVal, updateFunc) {
      let existing = this.private(el, key);
      if (existing === void 0) {
        this.putPrivate(el, key, updateFunc(defaultVal));
      } else {
        this.putPrivate(el, key, updateFunc(existing));
      }
    },
    copyPrivates(target, source) {
      if (source[PHX_PRIVATE]) {
        target[PHX_PRIVATE] = source[PHX_PRIVATE];
      }
    },
    putTitle(str) {
      let titleEl = document.querySelector("title");
      let { prefix, suffix } = titleEl.dataset;
      document.title = `${prefix || ""}${str}${suffix || ""}`;
    },
    debounce(el, event, phxDebounce, defaultDebounce, phxThrottle, defaultThrottle, asyncFilter, callback) {
      let debounce = el.getAttribute(phxDebounce);
      let throttle = el.getAttribute(phxThrottle);
      if (debounce === "") {
        debounce = defaultDebounce;
      }
      if (throttle === "") {
        throttle = defaultThrottle;
      }
      let value = debounce || throttle;
      switch (value) {
        case null:
          return callback();
        case "blur":
          if (this.once(el, "debounce-blur")) {
            el.addEventListener("blur", () => callback());
          }
          return;
        default:
          let timeout = parseInt(value);
          let trigger = () => throttle ? this.deletePrivate(el, THROTTLED) : callback();
          let currentCycle = this.incCycle(el, DEBOUNCE_TRIGGER, trigger);
          if (isNaN(timeout)) {
            return logError(`invalid throttle/debounce value: ${value}`);
          }
          if (throttle) {
            let newKeyDown = false;
            if (event.type === "keydown") {
              let prevKey = this.private(el, DEBOUNCE_PREV_KEY);
              this.putPrivate(el, DEBOUNCE_PREV_KEY, event.key);
              newKeyDown = prevKey !== event.key;
            }
            if (!newKeyDown && this.private(el, THROTTLED)) {
              return false;
            } else {
              callback();
              this.putPrivate(el, THROTTLED, true);
              setTimeout(() => {
                if (asyncFilter()) {
                  this.triggerCycle(el, DEBOUNCE_TRIGGER);
                }
              }, timeout);
            }
          } else {
            setTimeout(() => {
              if (asyncFilter()) {
                this.triggerCycle(el, DEBOUNCE_TRIGGER, currentCycle);
              }
            }, timeout);
          }
          let form = el.form;
          if (form && this.once(form, "bind-debounce")) {
            form.addEventListener("submit", () => {
              Array.from(new FormData(form).entries(), ([name]) => {
                let input = form.querySelector(`[name="${name}"]`);
                this.incCycle(input, DEBOUNCE_TRIGGER);
                this.deletePrivate(input, THROTTLED);
              });
            });
          }
          if (this.once(el, "bind-debounce")) {
            el.addEventListener("blur", () => this.triggerCycle(el, DEBOUNCE_TRIGGER));
          }
      }
    },
    triggerCycle(el, key, currentCycle) {
      let [cycle, trigger] = this.private(el, key);
      if (!currentCycle) {
        currentCycle = cycle;
      }
      if (currentCycle === cycle) {
        this.incCycle(el, key);
        trigger();
      }
    },
    once(el, key) {
      if (this.private(el, key) === true) {
        return false;
      }
      this.putPrivate(el, key, true);
      return true;
    },
    incCycle(el, key, trigger = function() {
    }) {
      let [currentCycle] = this.private(el, key) || [0, trigger];
      currentCycle++;
      this.putPrivate(el, key, [currentCycle, trigger]);
      return currentCycle;
    },
    discardError(container, el, phxFeedbackFor) {
      let field = el.getAttribute && el.getAttribute(phxFeedbackFor);
      let input = field && container.querySelector(`[id="${field}"], [name="${field}"]`);
      if (!input) {
        return;
      }
      if (!(this.private(input, PHX_HAS_FOCUSED) || this.private(input.form, PHX_HAS_SUBMITTED))) {
        el.classList.add(PHX_NO_FEEDBACK_CLASS);
      }
    },
    showError(inputEl, phxFeedbackFor) {
      if (inputEl.id || inputEl.name) {
        this.all(inputEl.form, `[${phxFeedbackFor}="${inputEl.id}"], [${phxFeedbackFor}="${inputEl.name}"]`, (el) => {
          this.removeClass(el, PHX_NO_FEEDBACK_CLASS);
        });
      }
    },
    isPhxChild(node) {
      return node.getAttribute && node.getAttribute(PHX_PARENT_ID);
    },
    isPhxSticky(node) {
      return node.getAttribute && node.getAttribute(PHX_STICKY) !== null;
    },
    firstPhxChild(el) {
      return this.isPhxChild(el) ? el : this.all(el, `[${PHX_PARENT_ID}]`)[0];
    },
    dispatchEvent(target, name, opts = {}) {
      let bubbles = opts.bubbles === void 0 ? true : !!opts.bubbles;
      let eventOpts = { bubbles, cancelable: true, detail: opts.detail || {} };
      let event = name === "click" ? new MouseEvent("click", eventOpts) : new CustomEvent(name, eventOpts);
      target.dispatchEvent(event);
    },
    cloneNode(node, html) {
      if (typeof html === "undefined") {
        return node.cloneNode(true);
      } else {
        let cloned = node.cloneNode(false);
        cloned.innerHTML = html;
        return cloned;
      }
    },
    mergeAttrs(target, source, opts = {}) {
      let exclude = opts.exclude || [];
      let isIgnored = opts.isIgnored;
      let sourceAttrs = source.attributes;
      for (let i = sourceAttrs.length - 1; i >= 0; i--) {
        let name = sourceAttrs[i].name;
        if (exclude.indexOf(name) < 0) {
          target.setAttribute(name, source.getAttribute(name));
        }
      }
      let targetAttrs = target.attributes;
      for (let i = targetAttrs.length - 1; i >= 0; i--) {
        let name = targetAttrs[i].name;
        if (isIgnored) {
          if (name.startsWith("data-") && !source.hasAttribute(name)) {
            target.removeAttribute(name);
          }
        } else {
          if (!source.hasAttribute(name)) {
            target.removeAttribute(name);
          }
        }
      }
    },
    mergeFocusedInput(target, source) {
      if (!(target instanceof HTMLSelectElement)) {
        DOM.mergeAttrs(target, source, { exclude: ["value"] });
      }
      if (source.readOnly) {
        target.setAttribute("readonly", true);
      } else {
        target.removeAttribute("readonly");
      }
    },
    hasSelectionRange(el) {
      return el.setSelectionRange && (el.type === "text" || el.type === "textarea");
    },
    restoreFocus(focused, selectionStart, selectionEnd) {
      if (!DOM.isTextualInput(focused)) {
        return;
      }
      let wasFocused = focused.matches(":focus");
      if (focused.readOnly) {
        focused.blur();
      }
      if (!wasFocused) {
        focused.focus();
      }
      if (this.hasSelectionRange(focused)) {
        focused.setSelectionRange(selectionStart, selectionEnd);
      }
    },
    isFormInput(el) {
      return /^(?:input|select|textarea)$/i.test(el.tagName) && el.type !== "button";
    },
    syncAttrsToProps(el) {
      if (el instanceof HTMLInputElement && CHECKABLE_INPUTS.indexOf(el.type.toLocaleLowerCase()) >= 0) {
        el.checked = el.getAttribute("checked") !== null;
      }
    },
    isTextualInput(el) {
      return FOCUSABLE_INPUTS.indexOf(el.type) >= 0;
    },
    isNowTriggerFormExternal(el, phxTriggerExternal) {
      return el.getAttribute && el.getAttribute(phxTriggerExternal) !== null;
    },
    syncPendingRef(fromEl, toEl, disableWith) {
      let ref = fromEl.getAttribute(PHX_REF);
      if (ref === null) {
        return true;
      }
      let refSrc = fromEl.getAttribute(PHX_REF_SRC);
      if (DOM.isFormInput(fromEl) || fromEl.getAttribute(disableWith) !== null) {
        if (DOM.isUploadInput(fromEl)) {
          DOM.mergeAttrs(fromEl, toEl, { isIgnored: true });
        }
        DOM.putPrivate(fromEl, PHX_REF, toEl);
        return false;
      } else {
        PHX_EVENT_CLASSES.forEach((className) => {
          fromEl.classList.contains(className) && toEl.classList.add(className);
        });
        toEl.setAttribute(PHX_REF, ref);
        toEl.setAttribute(PHX_REF_SRC, refSrc);
        return true;
      }
    },
    cleanChildNodes(container, phxUpdate) {
      if (DOM.isPhxUpdate(container, phxUpdate, ["append", "prepend"])) {
        let toRemove = [];
        container.childNodes.forEach((childNode) => {
          if (!childNode.id) {
            let isEmptyTextNode = childNode.nodeType === Node.TEXT_NODE && childNode.nodeValue.trim() === "";
            if (!isEmptyTextNode) {
              logError(`only HTML element tags with an id are allowed inside containers with phx-update.

removing illegal node: "${(childNode.outerHTML || childNode.nodeValue).trim()}"

`);
            }
            toRemove.push(childNode);
          }
        });
        toRemove.forEach((childNode) => childNode.remove());
      }
    },
    replaceRootContainer(container, tagName, attrs) {
      let retainedAttrs = new Set(["id", PHX_SESSION, PHX_STATIC, PHX_MAIN, PHX_ROOT_ID]);
      if (container.tagName.toLowerCase() === tagName.toLowerCase()) {
        Array.from(container.attributes).filter((attr) => !retainedAttrs.has(attr.name.toLowerCase())).forEach((attr) => container.removeAttribute(attr.name));
        Object.keys(attrs).filter((name) => !retainedAttrs.has(name.toLowerCase())).forEach((attr) => container.setAttribute(attr, attrs[attr]));
        return container;
      } else {
        let newContainer = document.createElement(tagName);
        Object.keys(attrs).forEach((attr) => newContainer.setAttribute(attr, attrs[attr]));
        retainedAttrs.forEach((attr) => newContainer.setAttribute(attr, container.getAttribute(attr)));
        newContainer.innerHTML = container.innerHTML;
        container.replaceWith(newContainer);
        return newContainer;
      }
    },
    getSticky(el, name, defaultVal) {
      let op = (DOM.private(el, "sticky") || []).find(([existingName]) => name === existingName);
      if (op) {
        let [_name, _op, stashedResult] = op;
        return stashedResult;
      } else {
        return typeof defaultVal === "function" ? defaultVal() : defaultVal;
      }
    },
    deleteSticky(el, name) {
      this.updatePrivate(el, "sticky", [], (ops) => {
        return ops.filter(([existingName, _]) => existingName !== name);
      });
    },
    putSticky(el, name, op) {
      let stashedResult = op(el);
      this.updatePrivate(el, "sticky", [], (ops) => {
        let existingIndex = ops.findIndex(([existingName]) => name === existingName);
        if (existingIndex >= 0) {
          ops[existingIndex] = [name, op, stashedResult];
        } else {
          ops.push([name, op, stashedResult]);
        }
        return ops;
      });
    },
    applyStickyOperations(el) {
      let ops = DOM.private(el, "sticky");
      if (!ops) {
        return;
      }
      ops.forEach(([name, op, _stashed]) => this.putSticky(el, name, op));
    }
  };
  var dom_default = DOM;
  var UploadEntry = class {
    static isActive(fileEl, file) {
      let isNew = file._phxRef === void 0;
      let activeRefs = fileEl.getAttribute(PHX_ACTIVE_ENTRY_REFS).split(",");
      let isActive = activeRefs.indexOf(LiveUploader.genFileRef(file)) >= 0;
      return file.size > 0 && (isNew || isActive);
    }
    static isPreflighted(fileEl, file) {
      let preflightedRefs = fileEl.getAttribute(PHX_PREFLIGHTED_REFS).split(",");
      let isPreflighted = preflightedRefs.indexOf(LiveUploader.genFileRef(file)) >= 0;
      return isPreflighted && this.isActive(fileEl, file);
    }
    constructor(fileEl, file, view) {
      this.ref = LiveUploader.genFileRef(file);
      this.fileEl = fileEl;
      this.file = file;
      this.view = view;
      this.meta = null;
      this._isCancelled = false;
      this._isDone = false;
      this._progress = 0;
      this._lastProgressSent = -1;
      this._onDone = function() {
      };
      this._onElUpdated = this.onElUpdated.bind(this);
      this.fileEl.addEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
    }
    metadata() {
      return this.meta;
    }
    progress(progress) {
      this._progress = Math.floor(progress);
      if (this._progress > this._lastProgressSent) {
        if (this._progress >= 100) {
          this._progress = 100;
          this._lastProgressSent = 100;
          this._isDone = true;
          this.view.pushFileProgress(this.fileEl, this.ref, 100, () => {
            LiveUploader.untrackFile(this.fileEl, this.file);
            this._onDone();
          });
        } else {
          this._lastProgressSent = this._progress;
          this.view.pushFileProgress(this.fileEl, this.ref, this._progress);
        }
      }
    }
    cancel() {
      this._isCancelled = true;
      this._isDone = true;
      this._onDone();
    }
    isDone() {
      return this._isDone;
    }
    error(reason = "failed") {
      this.view.pushFileProgress(this.fileEl, this.ref, { error: reason });
      LiveUploader.clearFiles(this.fileEl);
    }
    onDone(callback) {
      this._onDone = () => {
        this.fileEl.removeEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
        callback();
      };
    }
    onElUpdated() {
      let activeRefs = this.fileEl.getAttribute(PHX_ACTIVE_ENTRY_REFS).split(",");
      if (activeRefs.indexOf(this.ref) === -1) {
        this.cancel();
      }
    }
    toPreflightPayload() {
      return {
        last_modified: this.file.lastModified,
        name: this.file.name,
        size: this.file.size,
        type: this.file.type,
        ref: this.ref
      };
    }
    uploader(uploaders) {
      if (this.meta.uploader) {
        let callback = uploaders[this.meta.uploader] || logError(`no uploader configured for ${this.meta.uploader}`);
        return { name: this.meta.uploader, callback };
      } else {
        return { name: "channel", callback: channelUploader };
      }
    }
    zipPostFlight(resp) {
      this.meta = resp.entries[this.ref];
      if (!this.meta) {
        logError(`no preflight upload response returned with ref ${this.ref}`, { input: this.fileEl, response: resp });
      }
    }
  };
  var liveUploaderFileRef = 0;
  var LiveUploader = class {
    static genFileRef(file) {
      let ref = file._phxRef;
      if (ref !== void 0) {
        return ref;
      } else {
        file._phxRef = (liveUploaderFileRef++).toString();
        return file._phxRef;
      }
    }
    static getEntryDataURL(inputEl, ref, callback) {
      let file = this.activeFiles(inputEl).find((file2) => this.genFileRef(file2) === ref);
      callback(URL.createObjectURL(file));
    }
    static hasUploadsInProgress(formEl) {
      let active = 0;
      dom_default.findUploadInputs(formEl).forEach((input) => {
        if (input.getAttribute(PHX_PREFLIGHTED_REFS) !== input.getAttribute(PHX_DONE_REFS)) {
          active++;
        }
      });
      return active > 0;
    }
    static serializeUploads(inputEl) {
      let files = this.activeFiles(inputEl);
      let fileData = {};
      files.forEach((file) => {
        let entry = { path: inputEl.name };
        let uploadRef = inputEl.getAttribute(PHX_UPLOAD_REF);
        fileData[uploadRef] = fileData[uploadRef] || [];
        entry.ref = this.genFileRef(file);
        entry.name = file.name || entry.ref;
        entry.type = file.type;
        entry.size = file.size;
        fileData[uploadRef].push(entry);
      });
      return fileData;
    }
    static clearFiles(inputEl) {
      inputEl.value = null;
      inputEl.removeAttribute(PHX_UPLOAD_REF);
      dom_default.putPrivate(inputEl, "files", []);
    }
    static untrackFile(inputEl, file) {
      dom_default.putPrivate(inputEl, "files", dom_default.private(inputEl, "files").filter((f) => !Object.is(f, file)));
    }
    static trackFiles(inputEl, files) {
      if (inputEl.getAttribute("multiple") !== null) {
        let newFiles = files.filter((file) => !this.activeFiles(inputEl).find((f) => Object.is(f, file)));
        dom_default.putPrivate(inputEl, "files", this.activeFiles(inputEl).concat(newFiles));
        inputEl.value = null;
      } else {
        dom_default.putPrivate(inputEl, "files", files);
      }
    }
    static activeFileInputs(formEl) {
      let fileInputs = dom_default.findUploadInputs(formEl);
      return Array.from(fileInputs).filter((el) => el.files && this.activeFiles(el).length > 0);
    }
    static activeFiles(input) {
      return (dom_default.private(input, "files") || []).filter((f) => UploadEntry.isActive(input, f));
    }
    static inputsAwaitingPreflight(formEl) {
      let fileInputs = dom_default.findUploadInputs(formEl);
      return Array.from(fileInputs).filter((input) => this.filesAwaitingPreflight(input).length > 0);
    }
    static filesAwaitingPreflight(input) {
      return this.activeFiles(input).filter((f) => !UploadEntry.isPreflighted(input, f));
    }
    constructor(inputEl, view, onComplete) {
      this.view = view;
      this.onComplete = onComplete;
      this._entries = Array.from(LiveUploader.filesAwaitingPreflight(inputEl) || []).map((file) => new UploadEntry(inputEl, file, view));
      this.numEntriesInProgress = this._entries.length;
    }
    entries() {
      return this._entries;
    }
    initAdapterUpload(resp, onError, liveSocket2) {
      this._entries = this._entries.map((entry) => {
        entry.zipPostFlight(resp);
        entry.onDone(() => {
          this.numEntriesInProgress--;
          if (this.numEntriesInProgress === 0) {
            this.onComplete();
          }
        });
        return entry;
      });
      let groupedEntries = this._entries.reduce((acc, entry) => {
        let { name, callback } = entry.uploader(liveSocket2.uploaders);
        acc[name] = acc[name] || { callback, entries: [] };
        acc[name].entries.push(entry);
        return acc;
      }, {});
      for (let name in groupedEntries) {
        let { callback, entries } = groupedEntries[name];
        callback(entries, onError, resp, liveSocket2);
      }
    }
  };
  var Hooks = {
    LiveFileUpload: {
      activeRefs() {
        return this.el.getAttribute(PHX_ACTIVE_ENTRY_REFS);
      },
      preflightedRefs() {
        return this.el.getAttribute(PHX_PREFLIGHTED_REFS);
      },
      mounted() {
        this.preflightedWas = this.preflightedRefs();
      },
      updated() {
        let newPreflights = this.preflightedRefs();
        if (this.preflightedWas !== newPreflights) {
          this.preflightedWas = newPreflights;
          if (newPreflights === "") {
            this.__view.cancelSubmit(this.el.form);
          }
        }
        if (this.activeRefs() === "") {
          this.el.value = null;
        }
        this.el.dispatchEvent(new CustomEvent(PHX_LIVE_FILE_UPDATED));
      }
    },
    LiveImgPreview: {
      mounted() {
        this.ref = this.el.getAttribute("data-phx-entry-ref");
        this.inputEl = document.getElementById(this.el.getAttribute(PHX_UPLOAD_REF));
        LiveUploader.getEntryDataURL(this.inputEl, this.ref, (url) => {
          this.url = url;
          this.el.src = url;
        });
      },
      destroyed() {
        URL.revokeObjectURL(this.url);
      }
    }
  };
  var hooks_default = Hooks;
  var DOMPostMorphRestorer = class {
    constructor(containerBefore, containerAfter, updateType) {
      let idsBefore = new Set();
      let idsAfter = new Set([...containerAfter.children].map((child) => child.id));
      let elementsToModify = [];
      Array.from(containerBefore.children).forEach((child) => {
        if (child.id) {
          idsBefore.add(child.id);
          if (idsAfter.has(child.id)) {
            let previousElementId = child.previousElementSibling && child.previousElementSibling.id;
            elementsToModify.push({ elementId: child.id, previousElementId });
          }
        }
      });
      this.containerId = containerAfter.id;
      this.updateType = updateType;
      this.elementsToModify = elementsToModify;
      this.elementIdsToAdd = [...idsAfter].filter((id) => !idsBefore.has(id));
    }
    perform() {
      let container = dom_default.byId(this.containerId);
      this.elementsToModify.forEach((elementToModify) => {
        if (elementToModify.previousElementId) {
          maybe(document.getElementById(elementToModify.previousElementId), (previousElem) => {
            maybe(document.getElementById(elementToModify.elementId), (elem) => {
              let isInRightPlace = elem.previousElementSibling && elem.previousElementSibling.id == previousElem.id;
              if (!isInRightPlace) {
                previousElem.insertAdjacentElement("afterend", elem);
              }
            });
          });
        } else {
          maybe(document.getElementById(elementToModify.elementId), (elem) => {
            let isInRightPlace = elem.previousElementSibling == null;
            if (!isInRightPlace) {
              container.insertAdjacentElement("afterbegin", elem);
            }
          });
        }
      });
      if (this.updateType == "prepend") {
        this.elementIdsToAdd.reverse().forEach((elemId) => {
          maybe(document.getElementById(elemId), (elem) => container.insertAdjacentElement("afterbegin", elem));
        });
      }
    }
  };
  var DOCUMENT_FRAGMENT_NODE = 11;
  function morphAttrs(fromNode, toNode) {
    var toNodeAttrs = toNode.attributes;
    var attr;
    var attrName;
    var attrNamespaceURI;
    var attrValue;
    var fromValue;
    if (toNode.nodeType === DOCUMENT_FRAGMENT_NODE || fromNode.nodeType === DOCUMENT_FRAGMENT_NODE) {
      return;
    }
    for (var i = toNodeAttrs.length - 1; i >= 0; i--) {
      attr = toNodeAttrs[i];
      attrName = attr.name;
      attrNamespaceURI = attr.namespaceURI;
      attrValue = attr.value;
      if (attrNamespaceURI) {
        attrName = attr.localName || attrName;
        fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);
        if (fromValue !== attrValue) {
          if (attr.prefix === "xmlns") {
            attrName = attr.name;
          }
          fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
        }
      } else {
        fromValue = fromNode.getAttribute(attrName);
        if (fromValue !== attrValue) {
          fromNode.setAttribute(attrName, attrValue);
        }
      }
    }
    var fromNodeAttrs = fromNode.attributes;
    for (var d = fromNodeAttrs.length - 1; d >= 0; d--) {
      attr = fromNodeAttrs[d];
      attrName = attr.name;
      attrNamespaceURI = attr.namespaceURI;
      if (attrNamespaceURI) {
        attrName = attr.localName || attrName;
        if (!toNode.hasAttributeNS(attrNamespaceURI, attrName)) {
          fromNode.removeAttributeNS(attrNamespaceURI, attrName);
        }
      } else {
        if (!toNode.hasAttribute(attrName)) {
          fromNode.removeAttribute(attrName);
        }
      }
    }
  }
  var range;
  var NS_XHTML = "http://www.w3.org/1999/xhtml";
  var doc = typeof document === "undefined" ? void 0 : document;
  var HAS_TEMPLATE_SUPPORT = !!doc && "content" in doc.createElement("template");
  var HAS_RANGE_SUPPORT = !!doc && doc.createRange && "createContextualFragment" in doc.createRange();
  function createFragmentFromTemplate(str) {
    var template = doc.createElement("template");
    template.innerHTML = str;
    return template.content.childNodes[0];
  }
  function createFragmentFromRange(str) {
    if (!range) {
      range = doc.createRange();
      range.selectNode(doc.body);
    }
    var fragment = range.createContextualFragment(str);
    return fragment.childNodes[0];
  }
  function createFragmentFromWrap(str) {
    var fragment = doc.createElement("body");
    fragment.innerHTML = str;
    return fragment.childNodes[0];
  }
  function toElement(str) {
    str = str.trim();
    if (HAS_TEMPLATE_SUPPORT) {
      return createFragmentFromTemplate(str);
    } else if (HAS_RANGE_SUPPORT) {
      return createFragmentFromRange(str);
    }
    return createFragmentFromWrap(str);
  }
  function compareNodeNames(fromEl, toEl) {
    var fromNodeName = fromEl.nodeName;
    var toNodeName = toEl.nodeName;
    var fromCodeStart, toCodeStart;
    if (fromNodeName === toNodeName) {
      return true;
    }
    fromCodeStart = fromNodeName.charCodeAt(0);
    toCodeStart = toNodeName.charCodeAt(0);
    if (fromCodeStart <= 90 && toCodeStart >= 97) {
      return fromNodeName === toNodeName.toUpperCase();
    } else if (toCodeStart <= 90 && fromCodeStart >= 97) {
      return toNodeName === fromNodeName.toUpperCase();
    } else {
      return false;
    }
  }
  function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === NS_XHTML ? doc.createElement(name) : doc.createElementNS(namespaceURI, name);
  }
  function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
      var nextChild = curChild.nextSibling;
      toEl.appendChild(curChild);
      curChild = nextChild;
    }
    return toEl;
  }
  function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
      fromEl[name] = toEl[name];
      if (fromEl[name]) {
        fromEl.setAttribute(name, "");
      } else {
        fromEl.removeAttribute(name);
      }
    }
  }
  var specialElHandlers = {
    OPTION: function(fromEl, toEl) {
      var parentNode = fromEl.parentNode;
      if (parentNode) {
        var parentName = parentNode.nodeName.toUpperCase();
        if (parentName === "OPTGROUP") {
          parentNode = parentNode.parentNode;
          parentName = parentNode && parentNode.nodeName.toUpperCase();
        }
        if (parentName === "SELECT" && !parentNode.hasAttribute("multiple")) {
          if (fromEl.hasAttribute("selected") && !toEl.selected) {
            fromEl.setAttribute("selected", "selected");
            fromEl.removeAttribute("selected");
          }
          parentNode.selectedIndex = -1;
        }
      }
      syncBooleanAttrProp(fromEl, toEl, "selected");
    },
    INPUT: function(fromEl, toEl) {
      syncBooleanAttrProp(fromEl, toEl, "checked");
      syncBooleanAttrProp(fromEl, toEl, "disabled");
      if (fromEl.value !== toEl.value) {
        fromEl.value = toEl.value;
      }
      if (!toEl.hasAttribute("value")) {
        fromEl.removeAttribute("value");
      }
    },
    TEXTAREA: function(fromEl, toEl) {
      var newValue = toEl.value;
      if (fromEl.value !== newValue) {
        fromEl.value = newValue;
      }
      var firstChild = fromEl.firstChild;
      if (firstChild) {
        var oldValue = firstChild.nodeValue;
        if (oldValue == newValue || !newValue && oldValue == fromEl.placeholder) {
          return;
        }
        firstChild.nodeValue = newValue;
      }
    },
    SELECT: function(fromEl, toEl) {
      if (!toEl.hasAttribute("multiple")) {
        var selectedIndex = -1;
        var i = 0;
        var curChild = fromEl.firstChild;
        var optgroup;
        var nodeName;
        while (curChild) {
          nodeName = curChild.nodeName && curChild.nodeName.toUpperCase();
          if (nodeName === "OPTGROUP") {
            optgroup = curChild;
            curChild = optgroup.firstChild;
          } else {
            if (nodeName === "OPTION") {
              if (curChild.hasAttribute("selected")) {
                selectedIndex = i;
                break;
              }
              i++;
            }
            curChild = curChild.nextSibling;
            if (!curChild && optgroup) {
              curChild = optgroup.nextSibling;
              optgroup = null;
            }
          }
        }
        fromEl.selectedIndex = selectedIndex;
      }
    }
  };
  var ELEMENT_NODE = 1;
  var DOCUMENT_FRAGMENT_NODE$1 = 11;
  var TEXT_NODE = 3;
  var COMMENT_NODE = 8;
  function noop() {
  }
  function defaultGetNodeKey(node) {
    if (node) {
      return node.getAttribute && node.getAttribute("id") || node.id;
    }
  }
  function morphdomFactory(morphAttrs2) {
    return function morphdom2(fromNode, toNode, options) {
      if (!options) {
        options = {};
      }
      if (typeof toNode === "string") {
        if (fromNode.nodeName === "#document" || fromNode.nodeName === "HTML" || fromNode.nodeName === "BODY") {
          var toNodeHtml = toNode;
          toNode = doc.createElement("html");
          toNode.innerHTML = toNodeHtml;
        } else {
          toNode = toElement(toNode);
        }
      }
      var getNodeKey = options.getNodeKey || defaultGetNodeKey;
      var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
      var onNodeAdded = options.onNodeAdded || noop;
      var onBeforeElUpdated = options.onBeforeElUpdated || noop;
      var onElUpdated = options.onElUpdated || noop;
      var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
      var onNodeDiscarded = options.onNodeDiscarded || noop;
      var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
      var childrenOnly = options.childrenOnly === true;
      var fromNodesLookup = Object.create(null);
      var keyedRemovalList = [];
      function addKeyedRemoval(key) {
        keyedRemovalList.push(key);
      }
      function walkDiscardedChildNodes(node, skipKeyedNodes) {
        if (node.nodeType === ELEMENT_NODE) {
          var curChild = node.firstChild;
          while (curChild) {
            var key = void 0;
            if (skipKeyedNodes && (key = getNodeKey(curChild))) {
              addKeyedRemoval(key);
            } else {
              onNodeDiscarded(curChild);
              if (curChild.firstChild) {
                walkDiscardedChildNodes(curChild, skipKeyedNodes);
              }
            }
            curChild = curChild.nextSibling;
          }
        }
      }
      function removeNode(node, parentNode, skipKeyedNodes) {
        if (onBeforeNodeDiscarded(node) === false) {
          return;
        }
        if (parentNode) {
          parentNode.removeChild(node);
        }
        onNodeDiscarded(node);
        walkDiscardedChildNodes(node, skipKeyedNodes);
      }
      function indexTree(node) {
        if (node.nodeType === ELEMENT_NODE || node.nodeType === DOCUMENT_FRAGMENT_NODE$1) {
          var curChild = node.firstChild;
          while (curChild) {
            var key = getNodeKey(curChild);
            if (key) {
              fromNodesLookup[key] = curChild;
            }
            indexTree(curChild);
            curChild = curChild.nextSibling;
          }
        }
      }
      indexTree(fromNode);
      function handleNodeAdded(el) {
        onNodeAdded(el);
        var curChild = el.firstChild;
        while (curChild) {
          var nextSibling = curChild.nextSibling;
          var key = getNodeKey(curChild);
          if (key) {
            var unmatchedFromEl = fromNodesLookup[key];
            if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
              curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
              morphEl(unmatchedFromEl, curChild);
            } else {
              handleNodeAdded(curChild);
            }
          } else {
            handleNodeAdded(curChild);
          }
          curChild = nextSibling;
        }
      }
      function cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey) {
        while (curFromNodeChild) {
          var fromNextSibling = curFromNodeChild.nextSibling;
          if (curFromNodeKey = getNodeKey(curFromNodeChild)) {
            addKeyedRemoval(curFromNodeKey);
          } else {
            removeNode(curFromNodeChild, fromEl, true);
          }
          curFromNodeChild = fromNextSibling;
        }
      }
      function morphEl(fromEl, toEl, childrenOnly2) {
        var toElKey = getNodeKey(toEl);
        if (toElKey) {
          delete fromNodesLookup[toElKey];
        }
        if (!childrenOnly2) {
          if (onBeforeElUpdated(fromEl, toEl) === false) {
            return;
          }
          morphAttrs2(fromEl, toEl);
          onElUpdated(fromEl);
          if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
            return;
          }
        }
        if (fromEl.nodeName !== "TEXTAREA") {
          morphChildren(fromEl, toEl);
        } else {
          specialElHandlers.TEXTAREA(fromEl, toEl);
        }
      }
      function morphChildren(fromEl, toEl) {
        var curToNodeChild = toEl.firstChild;
        var curFromNodeChild = fromEl.firstChild;
        var curToNodeKey;
        var curFromNodeKey;
        var fromNextSibling;
        var toNextSibling;
        var matchingFromEl;
        outer:
          while (curToNodeChild) {
            toNextSibling = curToNodeChild.nextSibling;
            curToNodeKey = getNodeKey(curToNodeChild);
            while (curFromNodeChild) {
              fromNextSibling = curFromNodeChild.nextSibling;
              if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
                continue outer;
              }
              curFromNodeKey = getNodeKey(curFromNodeChild);
              var curFromNodeType = curFromNodeChild.nodeType;
              var isCompatible = void 0;
              if (curFromNodeType === curToNodeChild.nodeType) {
                if (curFromNodeType === ELEMENT_NODE) {
                  if (curToNodeKey) {
                    if (curToNodeKey !== curFromNodeKey) {
                      if (matchingFromEl = fromNodesLookup[curToNodeKey]) {
                        if (fromNextSibling === matchingFromEl) {
                          isCompatible = false;
                        } else {
                          fromEl.insertBefore(matchingFromEl, curFromNodeChild);
                          if (curFromNodeKey) {
                            addKeyedRemoval(curFromNodeKey);
                          } else {
                            removeNode(curFromNodeChild, fromEl, true);
                          }
                          curFromNodeChild = matchingFromEl;
                        }
                      } else {
                        isCompatible = false;
                      }
                    }
                  } else if (curFromNodeKey) {
                    isCompatible = false;
                  }
                  isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                  if (isCompatible) {
                    morphEl(curFromNodeChild, curToNodeChild);
                  }
                } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                  isCompatible = true;
                  if (curFromNodeChild.nodeValue !== curToNodeChild.nodeValue) {
                    curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                  }
                }
              }
              if (isCompatible) {
                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
                continue outer;
              }
              if (curFromNodeKey) {
                addKeyedRemoval(curFromNodeKey);
              } else {
                removeNode(curFromNodeChild, fromEl, true);
              }
              curFromNodeChild = fromNextSibling;
            }
            if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
              fromEl.appendChild(matchingFromEl);
              morphEl(matchingFromEl, curToNodeChild);
            } else {
              var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
              if (onBeforeNodeAddedResult !== false) {
                if (onBeforeNodeAddedResult) {
                  curToNodeChild = onBeforeNodeAddedResult;
                }
                if (curToNodeChild.actualize) {
                  curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                }
                fromEl.appendChild(curToNodeChild);
                handleNodeAdded(curToNodeChild);
              }
            }
            curToNodeChild = toNextSibling;
            curFromNodeChild = fromNextSibling;
          }
        cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey);
        var specialElHandler = specialElHandlers[fromEl.nodeName];
        if (specialElHandler) {
          specialElHandler(fromEl, toEl);
        }
      }
      var morphedNode = fromNode;
      var morphedNodeType = morphedNode.nodeType;
      var toNodeType = toNode.nodeType;
      if (!childrenOnly) {
        if (morphedNodeType === ELEMENT_NODE) {
          if (toNodeType === ELEMENT_NODE) {
            if (!compareNodeNames(fromNode, toNode)) {
              onNodeDiscarded(fromNode);
              morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
            }
          } else {
            morphedNode = toNode;
          }
        } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) {
          if (toNodeType === morphedNodeType) {
            if (morphedNode.nodeValue !== toNode.nodeValue) {
              morphedNode.nodeValue = toNode.nodeValue;
            }
            return morphedNode;
          } else {
            morphedNode = toNode;
          }
        }
      }
      if (morphedNode === toNode) {
        onNodeDiscarded(fromNode);
      } else {
        if (toNode.isSameNode && toNode.isSameNode(morphedNode)) {
          return;
        }
        morphEl(morphedNode, toNode, childrenOnly);
        if (keyedRemovalList) {
          for (var i = 0, len = keyedRemovalList.length; i < len; i++) {
            var elToRemove = fromNodesLookup[keyedRemovalList[i]];
            if (elToRemove) {
              removeNode(elToRemove, elToRemove.parentNode, false);
            }
          }
        }
      }
      if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
        if (morphedNode.actualize) {
          morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
        }
        fromNode.parentNode.replaceChild(morphedNode, fromNode);
      }
      return morphedNode;
    };
  }
  var morphdom = morphdomFactory(morphAttrs);
  var morphdom_esm_default = morphdom;
  var DOMPatch = class {
    static patchEl(fromEl, toEl, activeElement) {
      morphdom_esm_default(fromEl, toEl, {
        childrenOnly: false,
        onBeforeElUpdated: (fromEl2, toEl2) => {
          if (activeElement && activeElement.isSameNode(fromEl2) && dom_default.isFormInput(fromEl2)) {
            dom_default.mergeFocusedInput(fromEl2, toEl2);
            return false;
          }
        }
      });
    }
    constructor(view, container, id, html, targetCID) {
      this.view = view;
      this.liveSocket = view.liveSocket;
      this.container = container;
      this.id = id;
      this.rootID = view.root.id;
      this.html = html;
      this.targetCID = targetCID;
      this.cidPatch = isCid(this.targetCID);
      this.callbacks = {
        beforeadded: [],
        beforeupdated: [],
        beforephxChildAdded: [],
        afteradded: [],
        afterupdated: [],
        afterdiscarded: [],
        afterphxChildAdded: [],
        aftertransitionsDiscarded: []
      };
    }
    before(kind, callback) {
      this.callbacks[`before${kind}`].push(callback);
    }
    after(kind, callback) {
      this.callbacks[`after${kind}`].push(callback);
    }
    trackBefore(kind, ...args) {
      this.callbacks[`before${kind}`].forEach((callback) => callback(...args));
    }
    trackAfter(kind, ...args) {
      this.callbacks[`after${kind}`].forEach((callback) => callback(...args));
    }
    markPrunableContentForRemoval() {
      dom_default.all(this.container, "[phx-update=append] > *, [phx-update=prepend] > *", (el) => {
        el.setAttribute(PHX_PRUNE, "");
      });
    }
    perform() {
      let { view, liveSocket: liveSocket2, container, html } = this;
      let targetContainer = this.isCIDPatch() ? this.targetCIDContainer(html) : container;
      if (this.isCIDPatch() && !targetContainer) {
        return;
      }
      let focused = liveSocket2.getActiveElement();
      let { selectionStart, selectionEnd } = focused && dom_default.hasSelectionRange(focused) ? focused : {};
      let phxUpdate = liveSocket2.binding(PHX_UPDATE);
      let phxFeedbackFor = liveSocket2.binding(PHX_FEEDBACK_FOR);
      let disableWith = liveSocket2.binding(PHX_DISABLE_WITH);
      let phxTriggerExternal = liveSocket2.binding(PHX_TRIGGER_ACTION);
      let phxRemove = liveSocket2.binding("remove");
      let added = [];
      let updates = [];
      let appendPrependUpdates = [];
      let pendingRemoves = [];
      let externalFormTriggered = null;
      let diffHTML = liveSocket2.time("premorph container prep", () => {
        return this.buildDiffHTML(container, html, phxUpdate, targetContainer);
      });
      this.trackBefore("added", container);
      this.trackBefore("updated", container, container);
      liveSocket2.time("morphdom", () => {
        morphdom_esm_default(targetContainer, diffHTML, {
          childrenOnly: targetContainer.getAttribute(PHX_COMPONENT) === null,
          getNodeKey: (node) => {
            return dom_default.isPhxDestroyed(node) ? null : node.id;
          },
          onBeforeNodeAdded: (el) => {
            this.trackBefore("added", el);
            return el;
          },
          onNodeAdded: (el) => {
            if (el instanceof HTMLImageElement && el.srcset) {
              el.srcset = el.srcset;
            } else if (el instanceof HTMLVideoElement && el.autoplay) {
              el.play();
            }
            if (dom_default.isNowTriggerFormExternal(el, phxTriggerExternal)) {
              externalFormTriggered = el;
            }
            dom_default.discardError(targetContainer, el, phxFeedbackFor);
            if (dom_default.isPhxChild(el) && view.ownsElement(el) || dom_default.isPhxSticky(el) && view.ownsElement(el.parentNode)) {
              this.trackAfter("phxChildAdded", el);
            }
            added.push(el);
          },
          onNodeDiscarded: (el) => {
            if (dom_default.isPhxChild(el) || dom_default.isPhxSticky(el)) {
              liveSocket2.destroyViewByEl(el);
            }
            this.trackAfter("discarded", el);
          },
          onBeforeNodeDiscarded: (el) => {
            if (el.getAttribute && el.getAttribute(PHX_PRUNE) !== null) {
              return true;
            }
            if (el.parentNode !== null && dom_default.isPhxUpdate(el.parentNode, phxUpdate, ["append", "prepend"]) && el.id) {
              return false;
            }
            if (el.getAttribute && el.getAttribute(phxRemove)) {
              pendingRemoves.push(el);
              return false;
            }
            if (this.skipCIDSibling(el)) {
              return false;
            }
            return true;
          },
          onElUpdated: (el) => {
            if (dom_default.isNowTriggerFormExternal(el, phxTriggerExternal)) {
              externalFormTriggered = el;
            }
            updates.push(el);
          },
          onBeforeElUpdated: (fromEl, toEl) => {
            dom_default.cleanChildNodes(toEl, phxUpdate);
            if (this.skipCIDSibling(toEl)) {
              return false;
            }
            if (dom_default.isPhxSticky(fromEl)) {
              return false;
            }
            if (dom_default.isIgnored(fromEl, phxUpdate)) {
              this.trackBefore("updated", fromEl, toEl);
              dom_default.mergeAttrs(fromEl, toEl, { isIgnored: true });
              updates.push(fromEl);
              dom_default.applyStickyOperations(fromEl);
              return false;
            }
            if (fromEl.type === "number" && (fromEl.validity && fromEl.validity.badInput)) {
              return false;
            }
            if (!dom_default.syncPendingRef(fromEl, toEl, disableWith)) {
              if (dom_default.isUploadInput(fromEl)) {
                this.trackBefore("updated", fromEl, toEl);
                updates.push(fromEl);
              }
              dom_default.applyStickyOperations(fromEl);
              return false;
            }
            if (dom_default.isPhxChild(toEl)) {
              let prevSession = fromEl.getAttribute(PHX_SESSION);
              dom_default.mergeAttrs(fromEl, toEl, { exclude: [PHX_STATIC] });
              if (prevSession !== "") {
                fromEl.setAttribute(PHX_SESSION, prevSession);
              }
              fromEl.setAttribute(PHX_ROOT_ID, this.rootID);
              dom_default.applyStickyOperations(fromEl);
              return false;
            }
            dom_default.copyPrivates(toEl, fromEl);
            dom_default.discardError(targetContainer, toEl, phxFeedbackFor);
            let isFocusedFormEl = focused && fromEl.isSameNode(focused) && dom_default.isFormInput(fromEl);
            if (isFocusedFormEl) {
              this.trackBefore("updated", fromEl, toEl);
              dom_default.mergeFocusedInput(fromEl, toEl);
              dom_default.syncAttrsToProps(fromEl);
              updates.push(fromEl);
              dom_default.applyStickyOperations(fromEl);
              return false;
            } else {
              if (dom_default.isPhxUpdate(toEl, phxUpdate, ["append", "prepend"])) {
                appendPrependUpdates.push(new DOMPostMorphRestorer(fromEl, toEl, toEl.getAttribute(phxUpdate)));
              }
              dom_default.syncAttrsToProps(toEl);
              dom_default.applyStickyOperations(toEl);
              this.trackBefore("updated", fromEl, toEl);
              return true;
            }
          }
        });
      });
      if (liveSocket2.isDebugEnabled()) {
        detectDuplicateIds();
      }
      if (appendPrependUpdates.length > 0) {
        liveSocket2.time("post-morph append/prepend restoration", () => {
          appendPrependUpdates.forEach((update) => update.perform());
        });
      }
      liveSocket2.silenceEvents(() => dom_default.restoreFocus(focused, selectionStart, selectionEnd));
      dom_default.dispatchEvent(document, "phx:update");
      added.forEach((el) => this.trackAfter("added", el));
      updates.forEach((el) => this.trackAfter("updated", el));
      if (pendingRemoves.length > 0) {
        liveSocket2.transitionRemoves(pendingRemoves);
        liveSocket2.requestDOMUpdate(() => {
          pendingRemoves.forEach((el) => {
            let child = dom_default.firstPhxChild(el);
            if (child) {
              liveSocket2.destroyViewByEl(child);
            }
            el.remove();
          });
          this.trackAfter("transitionsDiscarded", pendingRemoves);
        });
      }
      if (externalFormTriggered) {
        liveSocket2.disconnect();
        externalFormTriggered.submit();
      }
      return true;
    }
    isCIDPatch() {
      return this.cidPatch;
    }
    skipCIDSibling(el) {
      return el.nodeType === Node.ELEMENT_NODE && el.getAttribute(PHX_SKIP) !== null;
    }
    targetCIDContainer(html) {
      if (!this.isCIDPatch()) {
        return;
      }
      let [first, ...rest] = dom_default.findComponentNodeList(this.container, this.targetCID);
      if (rest.length === 0 && dom_default.childNodeLength(html) === 1) {
        return first;
      } else {
        return first && first.parentNode;
      }
    }
    buildDiffHTML(container, html, phxUpdate, targetContainer) {
      let isCIDPatch = this.isCIDPatch();
      let isCIDWithSingleRoot = isCIDPatch && targetContainer.getAttribute(PHX_COMPONENT) === this.targetCID.toString();
      if (!isCIDPatch || isCIDWithSingleRoot) {
        return html;
      } else {
        let diffContainer = null;
        let template = document.createElement("template");
        diffContainer = dom_default.cloneNode(targetContainer);
        let [firstComponent, ...rest] = dom_default.findComponentNodeList(diffContainer, this.targetCID);
        template.innerHTML = html;
        rest.forEach((el) => el.remove());
        Array.from(diffContainer.childNodes).forEach((child) => {
          if (child.id && child.nodeType === Node.ELEMENT_NODE && child.getAttribute(PHX_COMPONENT) !== this.targetCID.toString()) {
            child.setAttribute(PHX_SKIP, "");
            child.innerHTML = "";
          }
        });
        Array.from(template.content.childNodes).forEach((el) => diffContainer.insertBefore(el, firstComponent));
        firstComponent.remove();
        return diffContainer.outerHTML;
      }
    }
  };
  var Rendered = class {
    static extract(diff) {
      let { [REPLY]: reply, [EVENTS]: events, [TITLE]: title } = diff;
      delete diff[REPLY];
      delete diff[EVENTS];
      delete diff[TITLE];
      return { diff, title, reply: reply || null, events: events || [] };
    }
    constructor(viewId, rendered) {
      this.viewId = viewId;
      this.rendered = {};
      this.mergeDiff(rendered);
    }
    parentViewId() {
      return this.viewId;
    }
    toString(onlyCids) {
      return this.recursiveToString(this.rendered, this.rendered[COMPONENTS], onlyCids);
    }
    recursiveToString(rendered, components = rendered[COMPONENTS], onlyCids) {
      onlyCids = onlyCids ? new Set(onlyCids) : null;
      let output = { buffer: "", components, onlyCids };
      this.toOutputBuffer(rendered, null, output);
      return output.buffer;
    }
    componentCIDs(diff) {
      return Object.keys(diff[COMPONENTS] || {}).map((i) => parseInt(i));
    }
    isComponentOnlyDiff(diff) {
      if (!diff[COMPONENTS]) {
        return false;
      }
      return Object.keys(diff).length === 1;
    }
    getComponent(diff, cid) {
      return diff[COMPONENTS][cid];
    }
    mergeDiff(diff) {
      let newc = diff[COMPONENTS];
      let cache = {};
      delete diff[COMPONENTS];
      this.rendered = this.mutableMerge(this.rendered, diff);
      this.rendered[COMPONENTS] = this.rendered[COMPONENTS] || {};
      if (newc) {
        let oldc = this.rendered[COMPONENTS];
        for (let cid in newc) {
          newc[cid] = this.cachedFindComponent(cid, newc[cid], oldc, newc, cache);
        }
        for (let cid in newc) {
          oldc[cid] = newc[cid];
        }
        diff[COMPONENTS] = newc;
      }
    }
    cachedFindComponent(cid, cdiff, oldc, newc, cache) {
      if (cache[cid]) {
        return cache[cid];
      } else {
        let ndiff, stat, scid = cdiff[STATIC];
        if (isCid(scid)) {
          let tdiff;
          if (scid > 0) {
            tdiff = this.cachedFindComponent(scid, newc[scid], oldc, newc, cache);
          } else {
            tdiff = oldc[-scid];
          }
          stat = tdiff[STATIC];
          ndiff = this.cloneMerge(tdiff, cdiff);
          ndiff[STATIC] = stat;
        } else {
          ndiff = cdiff[STATIC] !== void 0 ? cdiff : this.cloneMerge(oldc[cid] || {}, cdiff);
        }
        cache[cid] = ndiff;
        return ndiff;
      }
    }
    mutableMerge(target, source) {
      if (source[STATIC] !== void 0) {
        return source;
      } else {
        this.doMutableMerge(target, source);
        return target;
      }
    }
    doMutableMerge(target, source) {
      for (let key in source) {
        let val = source[key];
        let targetVal = target[key];
        if (isObject(val) && val[STATIC] === void 0 && isObject(targetVal)) {
          this.doMutableMerge(targetVal, val);
        } else {
          target[key] = val;
        }
      }
    }
    cloneMerge(target, source) {
      let merged = __spreadValues(__spreadValues({}, target), source);
      for (let key in merged) {
        let val = source[key];
        let targetVal = target[key];
        if (isObject(val) && val[STATIC] === void 0 && isObject(targetVal)) {
          merged[key] = this.cloneMerge(targetVal, val);
        }
      }
      return merged;
    }
    componentToString(cid) {
      return this.recursiveCIDToString(this.rendered[COMPONENTS], cid);
    }
    pruneCIDs(cids) {
      cids.forEach((cid) => delete this.rendered[COMPONENTS][cid]);
    }
    get() {
      return this.rendered;
    }
    isNewFingerprint(diff = {}) {
      return !!diff[STATIC];
    }
    templateStatic(part, templates) {
      if (typeof part === "number") {
        return templates[part];
      } else {
        return part;
      }
    }
    toOutputBuffer(rendered, templates, output) {
      if (rendered[DYNAMICS]) {
        return this.comprehensionToBuffer(rendered, templates, output);
      }
      let { [STATIC]: statics } = rendered;
      statics = this.templateStatic(statics, templates);
      output.buffer += statics[0];
      for (let i = 1; i < statics.length; i++) {
        this.dynamicToBuffer(rendered[i - 1], templates, output);
        output.buffer += statics[i];
      }
    }
    comprehensionToBuffer(rendered, templates, output) {
      let { [DYNAMICS]: dynamics, [STATIC]: statics } = rendered;
      statics = this.templateStatic(statics, templates);
      let compTemplates = templates || rendered[TEMPLATES];
      for (let d = 0; d < dynamics.length; d++) {
        let dynamic = dynamics[d];
        output.buffer += statics[0];
        for (let i = 1; i < statics.length; i++) {
          this.dynamicToBuffer(dynamic[i - 1], compTemplates, output);
          output.buffer += statics[i];
        }
      }
    }
    dynamicToBuffer(rendered, templates, output) {
      if (typeof rendered === "number") {
        output.buffer += this.recursiveCIDToString(output.components, rendered, output.onlyCids);
      } else if (isObject(rendered)) {
        this.toOutputBuffer(rendered, templates, output);
      } else {
        output.buffer += rendered;
      }
    }
    recursiveCIDToString(components, cid, onlyCids) {
      let component = components[cid] || logError(`no component for CID ${cid}`, components);
      let template = document.createElement("template");
      template.innerHTML = this.recursiveToString(component, components, onlyCids);
      let container = template.content;
      let skip = onlyCids && !onlyCids.has(cid);
      let [hasChildNodes, hasChildComponents] = Array.from(container.childNodes).reduce(([hasNodes, hasComponents], child, i) => {
        if (child.nodeType === Node.ELEMENT_NODE) {
          if (child.getAttribute(PHX_COMPONENT)) {
            return [hasNodes, true];
          }
          child.setAttribute(PHX_COMPONENT, cid);
          if (!child.id) {
            child.id = `${this.parentViewId()}-${cid}-${i}`;
          }
          if (skip) {
            child.setAttribute(PHX_SKIP, "");
            child.innerHTML = "";
          }
          return [true, hasComponents];
        } else {
          if (child.nodeValue.trim() !== "") {
            logError(`only HTML element tags are allowed at the root of components.

got: "${child.nodeValue.trim()}"

within:
`, template.innerHTML.trim());
            child.replaceWith(this.createSpan(child.nodeValue, cid));
            return [true, hasComponents];
          } else {
            child.remove();
            return [hasNodes, hasComponents];
          }
        }
      }, [false, false]);
      if (!hasChildNodes && !hasChildComponents) {
        logError("expected at least one HTML element tag inside a component, but the component is empty:\n", template.innerHTML.trim());
        return this.createSpan("", cid).outerHTML;
      } else if (!hasChildNodes && hasChildComponents) {
        logError("expected at least one HTML element tag directly inside a component, but only subcomponents were found. A component must render at least one HTML tag directly inside itself.", template.innerHTML.trim());
        return template.innerHTML;
      } else {
        return template.innerHTML;
      }
    }
    createSpan(text, cid) {
      let span = document.createElement("span");
      span.innerText = text;
      span.setAttribute(PHX_COMPONENT, cid);
      return span;
    }
  };
  var viewHookID = 1;
  var ViewHook = class {
    static makeID() {
      return viewHookID++;
    }
    static elementID(el) {
      return el.phxHookId;
    }
    constructor(view, el, callbacks) {
      this.__view = view;
      this.liveSocket = view.liveSocket;
      this.__callbacks = callbacks;
      this.__listeners = new Set();
      this.__isDisconnected = false;
      this.el = el;
      this.el.phxHookId = this.constructor.makeID();
      for (let key in this.__callbacks) {
        this[key] = this.__callbacks[key];
      }
    }
    __mounted() {
      this.mounted && this.mounted();
    }
    __updated() {
      this.updated && this.updated();
    }
    __beforeUpdate() {
      this.beforeUpdate && this.beforeUpdate();
    }
    __destroyed() {
      this.destroyed && this.destroyed();
    }
    __reconnected() {
      if (this.__isDisconnected) {
        this.__isDisconnected = false;
        this.reconnected && this.reconnected();
      }
    }
    __disconnected() {
      this.__isDisconnected = true;
      this.disconnected && this.disconnected();
    }
    pushEvent(event, payload = {}, onReply = function() {
    }) {
      return this.__view.pushHookEvent(null, event, payload, onReply);
    }
    pushEventTo(phxTarget, event, payload = {}, onReply = function() {
    }) {
      return this.__view.withinTargets(phxTarget, (view, targetCtx) => {
        return view.pushHookEvent(targetCtx, event, payload, onReply);
      });
    }
    handleEvent(event, callback) {
      let callbackRef = (customEvent, bypass) => bypass ? event : callback(customEvent.detail);
      window.addEventListener(`phx:${event}`, callbackRef);
      this.__listeners.add(callbackRef);
      return callbackRef;
    }
    removeHandleEvent(callbackRef) {
      let event = callbackRef(null, true);
      window.removeEventListener(`phx:${event}`, callbackRef);
      this.__listeners.delete(callbackRef);
    }
    upload(name, files) {
      return this.__view.dispatchUploads(name, files);
    }
    uploadTo(phxTarget, name, files) {
      return this.__view.withinTargets(phxTarget, (view) => view.dispatchUploads(name, files));
    }
    __cleanup__() {
      this.__listeners.forEach((callbackRef) => this.removeHandleEvent(callbackRef));
    }
  };
  var JS = {
    exec(eventType, phxEvent, view, sourceEl, defaults) {
      let [defaultKind, defaultArgs] = defaults || [null, {}];
      let commands = phxEvent.charAt(0) === "[" ? JSON.parse(phxEvent) : [[defaultKind, defaultArgs]];
      commands.forEach(([kind, args]) => {
        if (kind === defaultKind && defaultArgs.data) {
          args.data = Object.assign(args.data || {}, defaultArgs.data);
        }
        this.filterToEls(sourceEl, args).forEach((el) => {
          this[`exec_${kind}`](eventType, phxEvent, view, sourceEl, el, args);
        });
      });
    },
    isVisible(el) {
      return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length > 0);
    },
    exec_dispatch(eventType, phxEvent, view, sourceEl, el, { to, event, detail, bubbles }) {
      detail = detail || {};
      detail.dispatcher = sourceEl;
      dom_default.dispatchEvent(el, event, { detail, bubbles });
    },
    exec_push(eventType, phxEvent, view, sourceEl, el, args) {
      if (!view.isConnected()) {
        return;
      }
      let { event, data, target, page_loading, loading, value, dispatcher } = args;
      let pushOpts = { loading, value, target, page_loading: !!page_loading };
      let targetSrc = eventType === "change" && dispatcher ? dispatcher : sourceEl;
      let phxTarget = target || targetSrc.getAttribute(view.binding("target")) || targetSrc;
      view.withinTargets(phxTarget, (targetView, targetCtx) => {
        if (eventType === "change") {
          let { newCid, _target, callback } = args;
          _target = _target || (sourceEl instanceof HTMLInputElement ? sourceEl.name : void 0);
          if (_target) {
            pushOpts._target = _target;
          }
          targetView.pushInput(sourceEl, targetCtx, newCid, event || phxEvent, pushOpts, callback);
        } else if (eventType === "submit") {
          targetView.submitForm(sourceEl, targetCtx, event || phxEvent, pushOpts);
        } else {
          targetView.pushEvent(eventType, sourceEl, targetCtx, event || phxEvent, data, pushOpts);
        }
      });
    },
    exec_add_class(eventType, phxEvent, view, sourceEl, el, { names, transition, time }) {
      this.addOrRemoveClasses(el, names, [], transition, time, view);
    },
    exec_remove_class(eventType, phxEvent, view, sourceEl, el, { names, transition, time }) {
      this.addOrRemoveClasses(el, [], names, transition, time, view);
    },
    exec_transition(eventType, phxEvent, view, sourceEl, el, { time, transition }) {
      let [transition_start, running, transition_end] = transition;
      let onStart = () => this.addOrRemoveClasses(el, transition_start.concat(running), []);
      let onDone = () => this.addOrRemoveClasses(el, transition_end, transition_start.concat(running));
      view.transition(time, onStart, onDone);
    },
    exec_toggle(eventType, phxEvent, view, sourceEl, el, { display, ins, outs, time }) {
      this.toggle(eventType, view, el, display, ins, outs, time);
    },
    exec_show(eventType, phxEvent, view, sourceEl, el, { display, transition, time }) {
      this.show(eventType, view, el, display, transition, time);
    },
    exec_hide(eventType, phxEvent, view, sourceEl, el, { display, transition, time }) {
      this.hide(eventType, view, el, display, transition, time);
    },
    exec_set_attr(eventType, phxEvent, view, sourceEl, el, { attr: [attr, val] }) {
      this.setOrRemoveAttrs(el, [[attr, val]], []);
    },
    exec_remove_attr(eventType, phxEvent, view, sourceEl, el, { attr }) {
      this.setOrRemoveAttrs(el, [], [attr]);
    },
    show(eventType, view, el, display, transition, time) {
      if (!this.isVisible(el)) {
        this.toggle(eventType, view, el, display, transition, null, time);
      }
    },
    hide(eventType, view, el, display, transition, time) {
      if (this.isVisible(el)) {
        this.toggle(eventType, view, el, display, null, transition, time);
      }
    },
    toggle(eventType, view, el, display, ins, outs, time) {
      let [inClasses, inStartClasses, inEndClasses] = ins || [[], [], []];
      let [outClasses, outStartClasses, outEndClasses] = outs || [[], [], []];
      if (inClasses.length > 0 || outClasses.length > 0) {
        if (this.isVisible(el)) {
          let onStart = () => {
            this.addOrRemoveClasses(el, outStartClasses, inClasses.concat(inStartClasses).concat(inEndClasses));
            window.requestAnimationFrame(() => {
              this.addOrRemoveClasses(el, outClasses, []);
              window.requestAnimationFrame(() => this.addOrRemoveClasses(el, outEndClasses, outStartClasses));
            });
          };
          el.dispatchEvent(new Event("phx:hide-start"));
          view.transition(time, onStart, () => {
            this.addOrRemoveClasses(el, [], outClasses.concat(outEndClasses));
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = "none");
            el.dispatchEvent(new Event("phx:hide-end"));
          });
        } else {
          if (eventType === "remove") {
            return;
          }
          let onStart = () => {
            this.addOrRemoveClasses(el, inStartClasses, outClasses.concat(outStartClasses).concat(outEndClasses));
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = display || "block");
            window.requestAnimationFrame(() => {
              this.addOrRemoveClasses(el, inClasses, []);
              window.requestAnimationFrame(() => this.addOrRemoveClasses(el, inEndClasses, inStartClasses));
            });
          };
          el.dispatchEvent(new Event("phx:show-start"));
          view.transition(time, onStart, () => {
            this.addOrRemoveClasses(el, [], inClasses.concat(inEndClasses));
            el.dispatchEvent(new Event("phx:show-end"));
          });
        }
      } else {
        if (this.isVisible(el)) {
          window.requestAnimationFrame(() => {
            el.dispatchEvent(new Event("phx:hide-start"));
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = "none");
            el.dispatchEvent(new Event("phx:hide-end"));
          });
        } else {
          window.requestAnimationFrame(() => {
            el.dispatchEvent(new Event("phx:show-start"));
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = display || "block");
            el.dispatchEvent(new Event("phx:show-end"));
          });
        }
      }
    },
    addOrRemoveClasses(el, adds, removes, transition, time, view) {
      let [transition_run, transition_start, transition_end] = transition || [[], [], []];
      if (transition_run.length > 0) {
        let onStart = () => this.addOrRemoveClasses(el, transition_start.concat(transition_run), []);
        let onDone = () => this.addOrRemoveClasses(el, adds.concat(transition_end), removes.concat(transition_run).concat(transition_start));
        return view.transition(time, onStart, onDone);
      }
      window.requestAnimationFrame(() => {
        let [prevAdds, prevRemoves] = dom_default.getSticky(el, "classes", [[], []]);
        let keepAdds = adds.filter((name) => prevAdds.indexOf(name) < 0 && !el.classList.contains(name));
        let keepRemoves = removes.filter((name) => prevRemoves.indexOf(name) < 0 && el.classList.contains(name));
        let newAdds = prevAdds.filter((name) => removes.indexOf(name) < 0).concat(keepAdds);
        let newRemoves = prevRemoves.filter((name) => adds.indexOf(name) < 0).concat(keepRemoves);
        dom_default.putSticky(el, "classes", (currentEl) => {
          currentEl.classList.remove(...newRemoves);
          currentEl.classList.add(...newAdds);
          return [newAdds, newRemoves];
        });
      });
    },
    setOrRemoveAttrs(el, sets, removes) {
      let [prevSets, prevRemoves] = dom_default.getSticky(el, "attrs", [[], []]);
      let alteredAttrs = sets.map(([attr, _val]) => attr).concat(removes);
      let newSets = prevSets.filter(([attr, _val]) => !alteredAttrs.includes(attr)).concat(sets);
      let newRemoves = prevRemoves.filter((attr) => !alteredAttrs.includes(attr)).concat(removes);
      dom_default.putSticky(el, "attrs", (currentEl) => {
        newRemoves.forEach((attr) => currentEl.removeAttribute(attr));
        newSets.forEach(([attr, val]) => currentEl.setAttribute(attr, val));
        return [newSets, newRemoves];
      });
    },
    hasAllClasses(el, classes) {
      return classes.every((name) => el.classList.contains(name));
    },
    isToggledOut(el, outClasses) {
      return !this.isVisible(el) || this.hasAllClasses(el, outClasses);
    },
    filterToEls(sourceEl, { to }) {
      return to ? dom_default.all(document, to) : [sourceEl];
    }
  };
  var js_default = JS;
  var serializeForm = (form, meta, onlyNames = []) => {
    let formData = new FormData(form);
    let toRemove = [];
    formData.forEach((val, key, _index) => {
      if (val instanceof File) {
        toRemove.push(key);
      }
    });
    toRemove.forEach((key) => formData.delete(key));
    let params = new URLSearchParams();
    for (let [key, val] of formData.entries()) {
      if (onlyNames.length === 0 || onlyNames.indexOf(key) >= 0) {
        params.append(key, val);
      }
    }
    for (let metaKey in meta) {
      params.append(metaKey, meta[metaKey]);
    }
    return params.toString();
  };
  var View = class {
    constructor(el, liveSocket2, parentView, flash) {
      this.liveSocket = liveSocket2;
      this.flash = flash;
      this.parent = parentView;
      this.root = parentView ? parentView.root : this;
      this.el = el;
      this.id = this.el.id;
      this.ref = 0;
      this.childJoins = 0;
      this.loaderTimer = null;
      this.pendingDiffs = [];
      this.pruningCIDs = [];
      this.redirect = false;
      this.href = null;
      this.joinCount = this.parent ? this.parent.joinCount - 1 : 0;
      this.joinPending = true;
      this.destroyed = false;
      this.joinCallback = function(onDone) {
        onDone && onDone();
      };
      this.stopCallback = function() {
      };
      this.pendingJoinOps = this.parent ? null : [];
      this.viewHooks = {};
      this.uploaders = {};
      this.formSubmits = [];
      this.children = this.parent ? null : {};
      this.root.children[this.id] = {};
      this.channel = this.liveSocket.channel(`lv:${this.id}`, () => {
        return {
          redirect: this.redirect ? this.href : void 0,
          url: this.redirect ? void 0 : this.href || void 0,
          params: this.connectParams(),
          session: this.getSession(),
          static: this.getStatic(),
          flash: this.flash
        };
      });
      this.showLoader(this.liveSocket.loaderTimeout);
      this.bindChannel();
    }
    setHref(href) {
      this.href = href;
    }
    setRedirect(href) {
      this.redirect = true;
      this.href = href;
    }
    isMain() {
      return this.el.getAttribute(PHX_MAIN) !== null;
    }
    connectParams() {
      let params = this.liveSocket.params(this.el);
      let manifest = dom_default.all(document, `[${this.binding(PHX_TRACK_STATIC)}]`).map((node) => node.src || node.href).filter((url) => typeof url === "string");
      if (manifest.length > 0) {
        params["_track_static"] = manifest;
      }
      params["_mounts"] = this.joinCount;
      return params;
    }
    isConnected() {
      return this.channel.canPush();
    }
    getSession() {
      return this.el.getAttribute(PHX_SESSION);
    }
    getStatic() {
      let val = this.el.getAttribute(PHX_STATIC);
      return val === "" ? null : val;
    }
    destroy(callback = function() {
    }) {
      this.destroyAllChildren();
      this.destroyed = true;
      delete this.root.children[this.id];
      if (this.parent) {
        delete this.root.children[this.parent.id][this.id];
      }
      clearTimeout(this.loaderTimer);
      let onFinished = () => {
        callback();
        for (let id in this.viewHooks) {
          this.destroyHook(this.viewHooks[id]);
        }
      };
      dom_default.markPhxChildDestroyed(this.el);
      this.log("destroyed", () => ["the child has been removed from the parent"]);
      this.channel.leave().receive("ok", onFinished).receive("error", onFinished).receive("timeout", onFinished);
    }
    setContainerClasses(...classes) {
      this.el.classList.remove(PHX_CONNECTED_CLASS, PHX_DISCONNECTED_CLASS, PHX_ERROR_CLASS);
      this.el.classList.add(...classes);
    }
    showLoader(timeout) {
      clearTimeout(this.loaderTimer);
      if (timeout) {
        this.loaderTimer = setTimeout(() => this.showLoader(), timeout);
      } else {
        for (let id in this.viewHooks) {
          this.viewHooks[id].__disconnected();
        }
        this.setContainerClasses(PHX_DISCONNECTED_CLASS);
      }
    }
    hideLoader() {
      clearTimeout(this.loaderTimer);
      this.setContainerClasses(PHX_CONNECTED_CLASS);
    }
    triggerReconnected() {
      for (let id in this.viewHooks) {
        this.viewHooks[id].__reconnected();
      }
    }
    log(kind, msgCallback) {
      this.liveSocket.log(this, kind, msgCallback);
    }
    transition(time, onStart, onDone = function() {
    }) {
      this.liveSocket.transition(time, onStart, onDone);
    }
    withinTargets(phxTarget, callback) {
      if (phxTarget instanceof HTMLElement || phxTarget instanceof SVGElement) {
        return this.liveSocket.owner(phxTarget, (view) => callback(view, phxTarget));
      }
      if (isCid(phxTarget)) {
        let targets = dom_default.findComponentNodeList(this.el, phxTarget);
        if (targets.length === 0) {
          logError(`no component found matching phx-target of ${phxTarget}`);
        } else {
          callback(this, parseInt(phxTarget));
        }
      } else {
        let targets = Array.from(document.querySelectorAll(phxTarget));
        if (targets.length === 0) {
          logError(`nothing found matching the phx-target selector "${phxTarget}"`);
        }
        targets.forEach((target) => this.liveSocket.owner(target, (view) => callback(view, target)));
      }
    }
    applyDiff(type, rawDiff, callback) {
      this.log(type, () => ["", clone(rawDiff)]);
      let { diff, reply, events, title } = Rendered.extract(rawDiff);
      if (title) {
        dom_default.putTitle(title);
      }
      callback({ diff, reply, events });
      return reply;
    }
    onJoin(resp) {
      let { rendered, container } = resp;
      if (container) {
        let [tag, attrs] = container;
        this.el = dom_default.replaceRootContainer(this.el, tag, attrs);
      }
      this.childJoins = 0;
      this.joinPending = true;
      this.flash = null;
      browser_default.dropLocal(this.liveSocket.localStorage, window.location.pathname, CONSECUTIVE_RELOADS);
      this.applyDiff("mount", rendered, ({ diff, events }) => {
        this.rendered = new Rendered(this.id, diff);
        let html = this.renderContainer(null, "join");
        this.dropPendingRefs();
        let forms = this.formsForRecovery(html);
        this.joinCount++;
        if (forms.length > 0) {
          forms.forEach(([form, newForm, newCid], i) => {
            this.pushFormRecovery(form, newCid, (resp2) => {
              if (i === forms.length - 1) {
                this.onJoinComplete(resp2, html, events);
              }
            });
          });
        } else {
          this.onJoinComplete(resp, html, events);
        }
      });
    }
    dropPendingRefs() {
      dom_default.all(document, `[${PHX_REF_SRC}="${this.id}"][${PHX_REF}]`, (el) => {
        el.removeAttribute(PHX_REF);
        el.removeAttribute(PHX_REF_SRC);
      });
    }
    onJoinComplete({ live_patch }, html, events) {
      if (this.joinCount > 1 || this.parent && !this.parent.isJoinPending()) {
        return this.applyJoinPatch(live_patch, html, events);
      }
      let newChildren = dom_default.findPhxChildrenInFragment(html, this.id).filter((toEl) => {
        let fromEl = toEl.id && this.el.querySelector(`[id="${toEl.id}"]`);
        let phxStatic = fromEl && fromEl.getAttribute(PHX_STATIC);
        if (phxStatic) {
          toEl.setAttribute(PHX_STATIC, phxStatic);
        }
        return this.joinChild(toEl);
      });
      if (newChildren.length === 0) {
        if (this.parent) {
          this.root.pendingJoinOps.push([this, () => this.applyJoinPatch(live_patch, html, events)]);
          this.parent.ackJoin(this);
        } else {
          this.onAllChildJoinsComplete();
          this.applyJoinPatch(live_patch, html, events);
        }
      } else {
        this.root.pendingJoinOps.push([this, () => this.applyJoinPatch(live_patch, html, events)]);
      }
    }
    attachTrueDocEl() {
      this.el = dom_default.byId(this.id);
      this.el.setAttribute(PHX_ROOT_ID, this.root.id);
    }
    applyJoinPatch(live_patch, html, events) {
      this.attachTrueDocEl();
      let patch = new DOMPatch(this, this.el, this.id, html, null);
      patch.markPrunableContentForRemoval();
      this.performPatch(patch, false);
      this.joinNewChildren();
      dom_default.all(this.el, `[${this.binding(PHX_HOOK)}], [data-phx-${PHX_HOOK}]`, (hookEl) => {
        let hook = this.addHook(hookEl);
        if (hook) {
          hook.__mounted();
        }
      });
      this.joinPending = false;
      this.liveSocket.dispatchEvents(events);
      this.applyPendingUpdates();
      if (live_patch) {
        let { kind, to } = live_patch;
        this.liveSocket.historyPatch(to, kind);
      }
      this.hideLoader();
      if (this.joinCount > 1) {
        this.triggerReconnected();
      }
      this.stopCallback();
    }
    triggerBeforeUpdateHook(fromEl, toEl) {
      this.liveSocket.triggerDOM("onBeforeElUpdated", [fromEl, toEl]);
      let hook = this.getHook(fromEl);
      let isIgnored = hook && dom_default.isIgnored(fromEl, this.binding(PHX_UPDATE));
      if (hook && !fromEl.isEqualNode(toEl) && !(isIgnored && isEqualObj(fromEl.dataset, toEl.dataset))) {
        hook.__beforeUpdate();
        return hook;
      }
    }
    performPatch(patch, pruneCids) {
      let removedEls = [];
      let phxChildrenAdded = false;
      let updatedHookIds = new Set();
      patch.after("added", (el) => {
        this.liveSocket.triggerDOM("onNodeAdded", [el]);
        let newHook = this.addHook(el);
        if (newHook) {
          newHook.__mounted();
        }
      });
      patch.after("phxChildAdded", (el) => {
        if (dom_default.isPhxSticky(el)) {
          this.liveSocket.joinRootViews();
        } else {
          phxChildrenAdded = true;
        }
      });
      patch.before("updated", (fromEl, toEl) => {
        let hook = this.triggerBeforeUpdateHook(fromEl, toEl);
        if (hook) {
          updatedHookIds.add(fromEl.id);
        }
      });
      patch.after("updated", (el) => {
        if (updatedHookIds.has(el.id)) {
          this.getHook(el).__updated();
        }
      });
      patch.after("discarded", (el) => {
        if (el.nodeType === Node.ELEMENT_NODE) {
          removedEls.push(el);
        }
      });
      patch.after("transitionsDiscarded", (els) => this.afterElementsRemoved(els, pruneCids));
      patch.perform();
      this.afterElementsRemoved(removedEls, pruneCids);
      return phxChildrenAdded;
    }
    afterElementsRemoved(elements, pruneCids) {
      let destroyedCIDs = [];
      elements.forEach((parent) => {
        let components = dom_default.all(parent, `[${PHX_COMPONENT}]`);
        let hooks = dom_default.all(parent, `[${this.binding(PHX_HOOK)}]`);
        components.concat(parent).forEach((el) => {
          let cid = this.componentID(el);
          if (isCid(cid) && destroyedCIDs.indexOf(cid) === -1) {
            destroyedCIDs.push(cid);
          }
        });
        hooks.concat(parent).forEach((hookEl) => {
          let hook = this.getHook(hookEl);
          hook && this.destroyHook(hook);
        });
      });
      if (pruneCids) {
        this.maybePushComponentsDestroyed(destroyedCIDs);
      }
    }
    joinNewChildren() {
      dom_default.findPhxChildren(this.el, this.id).forEach((el) => this.joinChild(el));
    }
    getChildById(id) {
      return this.root.children[this.id][id];
    }
    getDescendentByEl(el) {
      if (el.id === this.id) {
        return this;
      } else {
        return this.children[el.getAttribute(PHX_PARENT_ID)][el.id];
      }
    }
    destroyDescendent(id) {
      for (let parentId in this.root.children) {
        for (let childId in this.root.children[parentId]) {
          if (childId === id) {
            return this.root.children[parentId][childId].destroy();
          }
        }
      }
    }
    joinChild(el) {
      let child = this.getChildById(el.id);
      if (!child) {
        let view = new View(el, this.liveSocket, this);
        this.root.children[this.id][view.id] = view;
        view.join();
        this.childJoins++;
        return true;
      }
    }
    isJoinPending() {
      return this.joinPending;
    }
    ackJoin(_child) {
      this.childJoins--;
      if (this.childJoins === 0) {
        if (this.parent) {
          this.parent.ackJoin(this);
        } else {
          this.onAllChildJoinsComplete();
        }
      }
    }
    onAllChildJoinsComplete() {
      this.joinCallback(() => {
        this.pendingJoinOps.forEach(([view, op]) => {
          if (!view.isDestroyed()) {
            op();
          }
        });
        this.pendingJoinOps = [];
      });
    }
    update(diff, events) {
      if (this.isJoinPending() || this.liveSocket.hasPendingLink() && !dom_default.isPhxSticky(this.el)) {
        return this.pendingDiffs.push({ diff, events });
      }
      this.rendered.mergeDiff(diff);
      let phxChildrenAdded = false;
      if (this.rendered.isComponentOnlyDiff(diff)) {
        this.liveSocket.time("component patch complete", () => {
          let parentCids = dom_default.findParentCIDs(this.el, this.rendered.componentCIDs(diff));
          parentCids.forEach((parentCID) => {
            if (this.componentPatch(this.rendered.getComponent(diff, parentCID), parentCID)) {
              phxChildrenAdded = true;
            }
          });
        });
      } else if (!isEmpty(diff)) {
        this.liveSocket.time("full patch complete", () => {
          let html = this.renderContainer(diff, "update");
          let patch = new DOMPatch(this, this.el, this.id, html, null);
          phxChildrenAdded = this.performPatch(patch, true);
        });
      }
      this.liveSocket.dispatchEvents(events);
      if (phxChildrenAdded) {
        this.joinNewChildren();
      }
    }
    renderContainer(diff, kind) {
      return this.liveSocket.time(`toString diff (${kind})`, () => {
        let tag = this.el.tagName;
        let cids = diff ? this.rendered.componentCIDs(diff).concat(this.pruningCIDs) : null;
        let html = this.rendered.toString(cids);
        return `<${tag}>${html}</${tag}>`;
      });
    }
    componentPatch(diff, cid) {
      if (isEmpty(diff))
        return false;
      let html = this.rendered.componentToString(cid);
      let patch = new DOMPatch(this, this.el, this.id, html, cid);
      let childrenAdded = this.performPatch(patch, true);
      return childrenAdded;
    }
    getHook(el) {
      return this.viewHooks[ViewHook.elementID(el)];
    }
    addHook(el) {
      if (ViewHook.elementID(el) || !el.getAttribute) {
        return;
      }
      let hookName = el.getAttribute(`data-phx-${PHX_HOOK}`) || el.getAttribute(this.binding(PHX_HOOK));
      if (hookName && !this.ownsElement(el)) {
        return;
      }
      let callbacks = this.liveSocket.getHookCallbacks(hookName);
      if (callbacks) {
        if (!el.id) {
          logError(`no DOM ID for hook "${hookName}". Hooks require a unique ID on each element.`, el);
        }
        let hook = new ViewHook(this, el, callbacks);
        this.viewHooks[ViewHook.elementID(hook.el)] = hook;
        return hook;
      } else if (hookName !== null) {
        logError(`unknown hook found for "${hookName}"`, el);
      }
    }
    destroyHook(hook) {
      hook.__destroyed();
      hook.__cleanup__();
      delete this.viewHooks[ViewHook.elementID(hook.el)];
    }
    applyPendingUpdates() {
      this.pendingDiffs.forEach(({ diff, events }) => this.update(diff, events));
      this.pendingDiffs = [];
    }
    onChannel(event, cb) {
      this.liveSocket.onChannel(this.channel, event, (resp) => {
        if (this.isJoinPending()) {
          this.root.pendingJoinOps.push([this, () => cb(resp)]);
        } else {
          this.liveSocket.requestDOMUpdate(() => cb(resp));
        }
      });
    }
    bindChannel() {
      this.liveSocket.onChannel(this.channel, "diff", (rawDiff) => {
        this.liveSocket.requestDOMUpdate(() => {
          this.applyDiff("update", rawDiff, ({ diff, events }) => this.update(diff, events));
        });
      });
      this.onChannel("redirect", ({ to, flash }) => this.onRedirect({ to, flash }));
      this.onChannel("live_patch", (redir) => this.onLivePatch(redir));
      this.onChannel("live_redirect", (redir) => this.onLiveRedirect(redir));
      this.channel.onError((reason) => this.onError(reason));
      this.channel.onClose((reason) => this.onClose(reason));
    }
    destroyAllChildren() {
      for (let id in this.root.children[this.id]) {
        this.getChildById(id).destroy();
      }
    }
    onLiveRedirect(redir) {
      let { to, kind, flash } = redir;
      let url = this.expandURL(to);
      this.liveSocket.historyRedirect(url, kind, flash);
    }
    onLivePatch(redir) {
      let { to, kind } = redir;
      this.href = this.expandURL(to);
      this.liveSocket.historyPatch(to, kind);
    }
    expandURL(to) {
      return to.startsWith("/") ? `${window.location.protocol}//${window.location.host}${to}` : to;
    }
    onRedirect({ to, flash }) {
      this.liveSocket.redirect(to, flash);
    }
    isDestroyed() {
      return this.destroyed;
    }
    join(callback) {
      if (this.isMain()) {
        this.stopCallback = this.liveSocket.withPageLoading({ to: this.href, kind: "initial" });
      }
      this.joinCallback = (onDone) => {
        onDone = onDone || function() {
        };
        callback ? callback(this.joinCount, onDone) : onDone();
      };
      this.liveSocket.wrapPush(this, { timeout: false }, () => {
        return this.channel.join().receive("ok", (data) => {
          if (!this.isDestroyed()) {
            this.liveSocket.requestDOMUpdate(() => this.onJoin(data));
          }
        }).receive("error", (resp) => !this.isDestroyed() && this.onJoinError(resp)).receive("timeout", () => !this.isDestroyed() && this.onJoinError({ reason: "timeout" }));
      });
    }
    onJoinError(resp) {
      if (resp.reason === "unauthorized" || resp.reason === "stale") {
        this.log("error", () => ["unauthorized live_redirect. Falling back to page request", resp]);
        return this.onRedirect({ to: this.href });
      }
      if (resp.redirect || resp.live_redirect) {
        this.joinPending = false;
        this.channel.leave();
      }
      if (resp.redirect) {
        return this.onRedirect(resp.redirect);
      }
      if (resp.live_redirect) {
        return this.onLiveRedirect(resp.live_redirect);
      }
      this.log("error", () => ["unable to join", resp]);
      if (this.liveSocket.isConnected()) {
        this.liveSocket.reloadWithJitter(this);
      }
    }
    onClose(reason) {
      if (this.isDestroyed()) {
        return;
      }
      if (this.liveSocket.hasPendingLink() && reason !== "leave") {
        return this.liveSocket.reloadWithJitter(this);
      }
      this.destroyAllChildren();
      this.liveSocket.dropActiveElement(this);
      if (document.activeElement) {
        document.activeElement.blur();
      }
      if (this.liveSocket.isUnloaded()) {
        this.showLoader(BEFORE_UNLOAD_LOADER_TIMEOUT);
      }
    }
    onError(reason) {
      this.onClose(reason);
      if (this.liveSocket.isConnected()) {
        this.log("error", () => ["view crashed", reason]);
      }
      if (!this.liveSocket.isUnloaded()) {
        this.displayError();
      }
    }
    displayError() {
      if (this.isMain()) {
        dom_default.dispatchEvent(window, "phx:page-loading-start", { detail: { to: this.href, kind: "error" } });
      }
      this.showLoader();
      this.setContainerClasses(PHX_DISCONNECTED_CLASS, PHX_ERROR_CLASS);
    }
    pushWithReply(refGenerator, event, payload, onReply = function() {
    }) {
      if (!this.isConnected()) {
        return;
      }
      let [ref, [el], opts] = refGenerator ? refGenerator() : [null, [], {}];
      let onLoadingDone = function() {
      };
      if (opts.page_loading || el && el.getAttribute(this.binding(PHX_PAGE_LOADING)) !== null) {
        onLoadingDone = this.liveSocket.withPageLoading({ kind: "element", target: el });
      }
      if (typeof payload.cid !== "number") {
        delete payload.cid;
      }
      return this.liveSocket.wrapPush(this, { timeout: true }, () => {
        return this.channel.push(event, payload, PUSH_TIMEOUT).receive("ok", (resp) => {
          if (ref !== null) {
            this.undoRefs(ref);
          }
          let finish = (hookReply) => {
            if (resp.redirect) {
              this.onRedirect(resp.redirect);
            }
            if (resp.live_patch) {
              this.onLivePatch(resp.live_patch);
            }
            if (resp.live_redirect) {
              this.onLiveRedirect(resp.live_redirect);
            }
            onLoadingDone();
            onReply(resp, hookReply);
          };
          if (resp.diff) {
            this.liveSocket.requestDOMUpdate(() => {
              let hookReply = this.applyDiff("update", resp.diff, ({ diff, events }) => {
                this.update(diff, events);
              });
              finish(hookReply);
            });
          } else {
            finish(null);
          }
        });
      });
    }
    undoRefs(ref) {
      dom_default.all(document, `[${PHX_REF_SRC}="${this.id}"][${PHX_REF}="${ref}"]`, (el) => {
        let disabledVal = el.getAttribute(PHX_DISABLED);
        el.removeAttribute(PHX_REF);
        el.removeAttribute(PHX_REF_SRC);
        if (el.getAttribute(PHX_READONLY) !== null) {
          el.readOnly = false;
          el.removeAttribute(PHX_READONLY);
        }
        if (disabledVal !== null) {
          el.disabled = disabledVal === "true" ? true : false;
          el.removeAttribute(PHX_DISABLED);
        }
        PHX_EVENT_CLASSES.forEach((className) => dom_default.removeClass(el, className));
        let disableRestore = el.getAttribute(PHX_DISABLE_WITH_RESTORE);
        if (disableRestore !== null) {
          el.innerText = disableRestore;
          el.removeAttribute(PHX_DISABLE_WITH_RESTORE);
        }
        let toEl = dom_default.private(el, PHX_REF);
        if (toEl) {
          let hook = this.triggerBeforeUpdateHook(el, toEl);
          DOMPatch.patchEl(el, toEl, this.liveSocket.getActiveElement());
          if (hook) {
            hook.__updated();
          }
          dom_default.deletePrivate(el, PHX_REF);
        }
      });
    }
    putRef(elements, event, opts = {}) {
      let newRef = this.ref++;
      let disableWith = this.binding(PHX_DISABLE_WITH);
      if (opts.loading) {
        elements = elements.concat(dom_default.all(document, opts.loading));
      }
      elements.forEach((el) => {
        el.classList.add(`phx-${event}-loading`);
        el.setAttribute(PHX_REF, newRef);
        el.setAttribute(PHX_REF_SRC, this.el.id);
        let disableText = el.getAttribute(disableWith);
        if (disableText !== null) {
          if (!el.getAttribute(PHX_DISABLE_WITH_RESTORE)) {
            el.setAttribute(PHX_DISABLE_WITH_RESTORE, el.innerText);
          }
          if (disableText !== "") {
            el.innerText = disableText;
          }
          el.setAttribute("disabled", "");
        }
      });
      return [newRef, elements, opts];
    }
    componentID(el) {
      let cid = el.getAttribute && el.getAttribute(PHX_COMPONENT);
      return cid ? parseInt(cid) : null;
    }
    targetComponentID(target, targetCtx, opts = {}) {
      if (isCid(targetCtx)) {
        return targetCtx;
      }
      let cidOrSelector = target.getAttribute(this.binding("target"));
      if (isCid(cidOrSelector)) {
        return parseInt(cidOrSelector);
      } else if (targetCtx && (cidOrSelector !== null || opts.target)) {
        return this.closestComponentID(targetCtx);
      } else {
        return null;
      }
    }
    closestComponentID(targetCtx) {
      if (isCid(targetCtx)) {
        return targetCtx;
      } else if (targetCtx) {
        return maybe(targetCtx.closest(`[${PHX_COMPONENT}]`), (el) => this.ownsElement(el) && this.componentID(el));
      } else {
        return null;
      }
    }
    pushHookEvent(targetCtx, event, payload, onReply) {
      if (!this.isConnected()) {
        this.log("hook", () => ["unable to push hook event. LiveView not connected", event, payload]);
        return false;
      }
      let [ref, els, opts] = this.putRef([], "hook");
      this.pushWithReply(() => [ref, els, opts], "event", {
        type: "hook",
        event,
        value: payload,
        cid: this.closestComponentID(targetCtx)
      }, (resp, reply) => onReply(reply, ref));
      return ref;
    }
    extractMeta(el, meta, value) {
      let prefix = this.binding("value-");
      for (let i = 0; i < el.attributes.length; i++) {
        if (!meta) {
          meta = {};
        }
        let name = el.attributes[i].name;
        if (name.startsWith(prefix)) {
          meta[name.replace(prefix, "")] = el.getAttribute(name);
        }
      }
      if (el.value !== void 0) {
        if (!meta) {
          meta = {};
        }
        meta.value = el.value;
        if (el.tagName === "INPUT" && CHECKABLE_INPUTS.indexOf(el.type) >= 0 && !el.checked) {
          delete meta.value;
        }
      }
      if (value) {
        if (!meta) {
          meta = {};
        }
        for (let key in value) {
          meta[key] = value[key];
        }
      }
      return meta;
    }
    pushEvent(type, el, targetCtx, phxEvent, meta, opts = {}) {
      this.pushWithReply(() => this.putRef([el], type, opts), "event", {
        type,
        event: phxEvent,
        value: this.extractMeta(el, meta, opts.value),
        cid: this.targetComponentID(el, targetCtx, opts)
      });
    }
    pushFileProgress(fileEl, entryRef, progress, onReply = function() {
    }) {
      this.liveSocket.withinOwners(fileEl.form, (view, targetCtx) => {
        view.pushWithReply(null, "progress", {
          event: fileEl.getAttribute(view.binding(PHX_PROGRESS)),
          ref: fileEl.getAttribute(PHX_UPLOAD_REF),
          entry_ref: entryRef,
          progress,
          cid: view.targetComponentID(fileEl.form, targetCtx)
        }, onReply);
      });
    }
    pushInput(inputEl, targetCtx, forceCid, phxEvent, opts, callback) {
      let uploads;
      let cid = isCid(forceCid) ? forceCid : this.targetComponentID(inputEl.form, targetCtx);
      let refGenerator = () => this.putRef([inputEl, inputEl.form], "change", opts);
      let formData;
      if (inputEl.getAttribute(this.binding("change"))) {
        formData = serializeForm(inputEl.form, { _target: opts._target }, [inputEl.name]);
      } else {
        formData = serializeForm(inputEl.form, { _target: opts._target });
      }
      if (dom_default.isUploadInput(inputEl) && inputEl.files && inputEl.files.length > 0) {
        LiveUploader.trackFiles(inputEl, Array.from(inputEl.files));
      }
      uploads = LiveUploader.serializeUploads(inputEl);
      let event = {
        type: "form",
        event: phxEvent,
        value: formData,
        uploads,
        cid
      };
      this.pushWithReply(refGenerator, "event", event, (resp) => {
        dom_default.showError(inputEl, this.liveSocket.binding(PHX_FEEDBACK_FOR));
        if (dom_default.isUploadInput(inputEl) && inputEl.getAttribute("data-phx-auto-upload") !== null) {
          if (LiveUploader.filesAwaitingPreflight(inputEl).length > 0) {
            let [ref, _els] = refGenerator();
            this.uploadFiles(inputEl.form, targetCtx, ref, cid, (_uploads) => {
              callback && callback(resp);
              this.triggerAwaitingSubmit(inputEl.form);
            });
          }
        } else {
          callback && callback(resp);
        }
      });
    }
    triggerAwaitingSubmit(formEl) {
      let awaitingSubmit = this.getScheduledSubmit(formEl);
      if (awaitingSubmit) {
        let [_el, _ref, _opts, callback] = awaitingSubmit;
        this.cancelSubmit(formEl);
        callback();
      }
    }
    getScheduledSubmit(formEl) {
      return this.formSubmits.find(([el, _ref, _opts, _callback]) => el.isSameNode(formEl));
    }
    scheduleSubmit(formEl, ref, opts, callback) {
      if (this.getScheduledSubmit(formEl)) {
        return true;
      }
      this.formSubmits.push([formEl, ref, opts, callback]);
    }
    cancelSubmit(formEl) {
      this.formSubmits = this.formSubmits.filter(([el, ref, _callback]) => {
        if (el.isSameNode(formEl)) {
          this.undoRefs(ref);
          return false;
        } else {
          return true;
        }
      });
    }
    pushFormSubmit(formEl, targetCtx, phxEvent, opts, onReply) {
      let filterIgnored = (el) => {
        let userIgnored = closestPhxBinding(el, `${this.binding(PHX_UPDATE)}=ignore`, el.form);
        return !(userIgnored || closestPhxBinding(el, "data-phx-update=ignore", el.form));
      };
      let filterDisables = (el) => {
        return el.hasAttribute(this.binding(PHX_DISABLE_WITH));
      };
      let filterButton = (el) => el.tagName == "BUTTON";
      let filterInput = (el) => ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);
      let refGenerator = () => {
        let formElements = Array.from(formEl.elements);
        let disables = formElements.filter(filterDisables);
        let buttons = formElements.filter(filterButton).filter(filterIgnored);
        let inputs = formElements.filter(filterInput).filter(filterIgnored);
        buttons.forEach((button) => {
          button.setAttribute(PHX_DISABLED, button.disabled);
          button.disabled = true;
        });
        inputs.forEach((input) => {
          input.setAttribute(PHX_READONLY, input.readOnly);
          input.readOnly = true;
          if (input.files) {
            input.setAttribute(PHX_DISABLED, input.disabled);
            input.disabled = true;
          }
        });
        formEl.setAttribute(this.binding(PHX_PAGE_LOADING), "");
        return this.putRef([formEl].concat(disables).concat(buttons).concat(inputs), "submit", opts);
      };
      let cid = this.targetComponentID(formEl, targetCtx);
      if (LiveUploader.hasUploadsInProgress(formEl)) {
        let [ref, _els] = refGenerator();
        let push = () => this.pushFormSubmit(formEl, targetCtx, phxEvent, opts, onReply);
        return this.scheduleSubmit(formEl, ref, opts, push);
      } else if (LiveUploader.inputsAwaitingPreflight(formEl).length > 0) {
        let [ref, els] = refGenerator();
        let proxyRefGen = () => [ref, els, opts];
        this.uploadFiles(formEl, targetCtx, ref, cid, (_uploads) => {
          let formData = serializeForm(formEl, {});
          this.pushWithReply(proxyRefGen, "event", {
            type: "form",
            event: phxEvent,
            value: formData,
            cid
          }, onReply);
        });
      } else {
        let formData = serializeForm(formEl, {});
        this.pushWithReply(refGenerator, "event", {
          type: "form",
          event: phxEvent,
          value: formData,
          cid
        }, onReply);
      }
    }
    uploadFiles(formEl, targetCtx, ref, cid, onComplete) {
      let joinCountAtUpload = this.joinCount;
      let inputEls = LiveUploader.activeFileInputs(formEl);
      let numFileInputsInProgress = inputEls.length;
      inputEls.forEach((inputEl) => {
        let uploader = new LiveUploader(inputEl, this, () => {
          numFileInputsInProgress--;
          if (numFileInputsInProgress === 0) {
            onComplete();
          }
        });
        this.uploaders[inputEl] = uploader;
        let entries = uploader.entries().map((entry) => entry.toPreflightPayload());
        let payload = {
          ref: inputEl.getAttribute(PHX_UPLOAD_REF),
          entries,
          cid: this.targetComponentID(inputEl.form, targetCtx)
        };
        this.log("upload", () => ["sending preflight request", payload]);
        this.pushWithReply(null, "allow_upload", payload, (resp) => {
          this.log("upload", () => ["got preflight response", resp]);
          if (resp.error) {
            this.undoRefs(ref);
            let [entry_ref, reason] = resp.error;
            this.log("upload", () => [`error for entry ${entry_ref}`, reason]);
          } else {
            let onError = (callback) => {
              this.channel.onError(() => {
                if (this.joinCount === joinCountAtUpload) {
                  callback();
                }
              });
            };
            uploader.initAdapterUpload(resp, onError, this.liveSocket);
          }
        });
      });
    }
    dispatchUploads(name, filesOrBlobs) {
      let inputs = dom_default.findUploadInputs(this.el).filter((el) => el.name === name);
      if (inputs.length === 0) {
        logError(`no live file inputs found matching the name "${name}"`);
      } else if (inputs.length > 1) {
        logError(`duplicate live file inputs found matching the name "${name}"`);
      } else {
        dom_default.dispatchEvent(inputs[0], PHX_TRACK_UPLOADS, { detail: { files: filesOrBlobs } });
      }
    }
    pushFormRecovery(form, newCid, callback) {
      this.liveSocket.withinOwners(form, (view, targetCtx) => {
        let input = form.elements[0];
        let phxEvent = form.getAttribute(this.binding(PHX_AUTO_RECOVER)) || form.getAttribute(this.binding("change"));
        js_default.exec("change", phxEvent, view, input, ["push", { _target: input.name, newCid, callback }]);
      });
    }
    pushLinkPatch(href, targetEl, callback) {
      let linkRef = this.liveSocket.setPendingLink(href);
      let refGen = targetEl ? () => this.putRef([targetEl], "click") : null;
      let fallback = () => this.liveSocket.redirect(window.location.href);
      let push = this.pushWithReply(refGen, "live_patch", { url: href }, (resp) => {
        this.liveSocket.requestDOMUpdate(() => {
          if (resp.link_redirect) {
            this.liveSocket.replaceMain(href, null, callback, linkRef);
          } else {
            if (this.liveSocket.commitPendingLink(linkRef)) {
              this.href = href;
            }
            this.applyPendingUpdates();
            callback && callback(linkRef);
          }
        });
      });
      if (push) {
        push.receive("timeout", fallback);
      } else {
        fallback();
      }
    }
    formsForRecovery(html) {
      if (this.joinCount === 0) {
        return [];
      }
      let phxChange = this.binding("change");
      let template = document.createElement("template");
      template.innerHTML = html;
      return dom_default.all(this.el, `form[${phxChange}]`).filter((form) => form.id && this.ownsElement(form)).filter((form) => form.elements.length > 0).filter((form) => form.getAttribute(this.binding(PHX_AUTO_RECOVER)) !== "ignore").map((form) => {
        let newForm = template.content.querySelector(`form[id="${form.id}"][${phxChange}="${form.getAttribute(phxChange)}"]`);
        if (newForm) {
          return [form, newForm, this.targetComponentID(newForm)];
        } else {
          return [form, null, null];
        }
      }).filter(([form, newForm, newCid]) => newForm);
    }
    maybePushComponentsDestroyed(destroyedCIDs) {
      let willDestroyCIDs = destroyedCIDs.filter((cid) => {
        return dom_default.findComponentNodeList(this.el, cid).length === 0;
      });
      if (willDestroyCIDs.length > 0) {
        this.pruningCIDs.push(...willDestroyCIDs);
        this.pushWithReply(null, "cids_will_destroy", { cids: willDestroyCIDs }, () => {
          this.pruningCIDs = this.pruningCIDs.filter((cid) => willDestroyCIDs.indexOf(cid) !== -1);
          let completelyDestroyCIDs = willDestroyCIDs.filter((cid) => {
            return dom_default.findComponentNodeList(this.el, cid).length === 0;
          });
          if (completelyDestroyCIDs.length > 0) {
            this.pushWithReply(null, "cids_destroyed", { cids: completelyDestroyCIDs }, (resp) => {
              this.rendered.pruneCIDs(resp.cids);
            });
          }
        });
      }
    }
    ownsElement(el) {
      return el.getAttribute(PHX_PARENT_ID) === this.id || maybe(el.closest(PHX_VIEW_SELECTOR), (node) => node.id) === this.id;
    }
    submitForm(form, targetCtx, phxEvent, opts = {}) {
      dom_default.putPrivate(form, PHX_HAS_SUBMITTED, true);
      let phxFeedback = this.liveSocket.binding(PHX_FEEDBACK_FOR);
      let inputs = Array.from(form.elements);
      this.liveSocket.blurActiveElement(this);
      this.pushFormSubmit(form, targetCtx, phxEvent, opts, () => {
        inputs.forEach((input) => dom_default.showError(input, phxFeedback));
        this.liveSocket.restorePreviouslyActiveFocus();
      });
    }
    binding(kind) {
      return this.liveSocket.binding(kind);
    }
  };
  var LiveSocket = class {
    constructor(url, phxSocket, opts = {}) {
      this.unloaded = false;
      if (!phxSocket || phxSocket.constructor.name === "Object") {
        throw new Error(`
      a phoenix Socket must be provided as the second argument to the LiveSocket constructor. For example:

          import {Socket} from "phoenix"
          import {LiveSocket} from "phoenix_live_view"
          let liveSocket = new LiveSocket("/live", Socket, {...})
      `);
      }
      this.socket = new phxSocket(url, opts);
      this.bindingPrefix = opts.bindingPrefix || BINDING_PREFIX;
      this.opts = opts;
      this.params = closure2(opts.params || {});
      this.viewLogger = opts.viewLogger;
      this.metadataCallbacks = opts.metadata || {};
      this.defaults = Object.assign(clone(DEFAULTS), opts.defaults || {});
      this.activeElement = null;
      this.prevActive = null;
      this.silenced = false;
      this.main = null;
      this.outgoingMainEl = null;
      this.clickStartedAtTarget = null;
      this.linkRef = 1;
      this.roots = {};
      this.href = window.location.href;
      this.pendingLink = null;
      this.currentLocation = clone(window.location);
      this.hooks = opts.hooks || {};
      this.uploaders = opts.uploaders || {};
      this.loaderTimeout = opts.loaderTimeout || LOADER_TIMEOUT;
      this.reloadWithJitterTimer = null;
      this.maxReloads = opts.maxReloads || MAX_RELOADS;
      this.reloadJitterMin = opts.reloadJitterMin || RELOAD_JITTER_MIN;
      this.reloadJitterMax = opts.reloadJitterMax || RELOAD_JITTER_MAX;
      this.failsafeJitter = opts.failsafeJitter || FAILSAFE_JITTER;
      this.localStorage = opts.localStorage || window.localStorage;
      this.sessionStorage = opts.sessionStorage || window.sessionStorage;
      this.boundTopLevelEvents = false;
      this.domCallbacks = Object.assign({ onNodeAdded: closure2(), onBeforeElUpdated: closure2() }, opts.dom || {});
      this.transitions = new TransitionSet();
      window.addEventListener("pagehide", (_e) => {
        this.unloaded = true;
      });
      this.socket.onOpen(() => {
        if (this.isUnloaded()) {
          window.location.reload();
        }
      });
    }
    isProfileEnabled() {
      return this.sessionStorage.getItem(PHX_LV_PROFILE) === "true";
    }
    isDebugEnabled() {
      return this.sessionStorage.getItem(PHX_LV_DEBUG) === "true";
    }
    isDebugDisabled() {
      return this.sessionStorage.getItem(PHX_LV_DEBUG) === "false";
    }
    enableDebug() {
      this.sessionStorage.setItem(PHX_LV_DEBUG, "true");
    }
    enableProfiling() {
      this.sessionStorage.setItem(PHX_LV_PROFILE, "true");
    }
    disableDebug() {
      this.sessionStorage.setItem(PHX_LV_DEBUG, "false");
    }
    disableProfiling() {
      this.sessionStorage.removeItem(PHX_LV_PROFILE);
    }
    enableLatencySim(upperBoundMs) {
      this.enableDebug();
      console.log("latency simulator enabled for the duration of this browser session. Call disableLatencySim() to disable");
      this.sessionStorage.setItem(PHX_LV_LATENCY_SIM, upperBoundMs);
    }
    disableLatencySim() {
      this.sessionStorage.removeItem(PHX_LV_LATENCY_SIM);
    }
    getLatencySim() {
      let str = this.sessionStorage.getItem(PHX_LV_LATENCY_SIM);
      return str ? parseInt(str) : null;
    }
    getSocket() {
      return this.socket;
    }
    connect() {
      if (window.location.hostname === "localhost" && !this.isDebugDisabled()) {
        this.enableDebug();
      }
      let doConnect = () => {
        if (this.joinRootViews()) {
          this.bindTopLevelEvents();
          this.socket.connect();
        } else if (this.main) {
          this.socket.connect();
        }
      };
      if (["complete", "loaded", "interactive"].indexOf(document.readyState) >= 0) {
        doConnect();
      } else {
        document.addEventListener("DOMContentLoaded", () => doConnect());
      }
    }
    disconnect(callback) {
      clearTimeout(this.reloadWithJitterTimer);
      this.socket.disconnect(callback);
    }
    replaceTransport(transport) {
      clearTimeout(this.reloadWithJitterTimer);
      this.socket.replaceTransport(transport);
      this.connect();
    }
    execJS(el, encodedJS, eventType = null) {
      this.owner(el, (view) => js_default.exec(eventType, encodedJS, view, el));
    }
    triggerDOM(kind, args) {
      this.domCallbacks[kind](...args);
    }
    time(name, func) {
      if (!this.isProfileEnabled() || !console.time) {
        return func();
      }
      console.time(name);
      let result = func();
      console.timeEnd(name);
      return result;
    }
    log(view, kind, msgCallback) {
      if (this.viewLogger) {
        let [msg, obj] = msgCallback();
        this.viewLogger(view, kind, msg, obj);
      } else if (this.isDebugEnabled()) {
        let [msg, obj] = msgCallback();
        debug(view, kind, msg, obj);
      }
    }
    requestDOMUpdate(callback) {
      this.transitions.after(callback);
    }
    transition(time, onStart, onDone = function() {
    }) {
      this.transitions.addTransition(time, onStart, onDone);
    }
    onChannel(channel, event, cb) {
      channel.on(event, (data) => {
        let latency = this.getLatencySim();
        if (!latency) {
          cb(data);
        } else {
          console.log(`simulating ${latency}ms of latency from server to client`);
          setTimeout(() => cb(data), latency);
        }
      });
    }
    wrapPush(view, opts, push) {
      let latency = this.getLatencySim();
      let oldJoinCount = view.joinCount;
      if (!latency) {
        if (this.isConnected() && opts.timeout) {
          return push().receive("timeout", () => {
            if (view.joinCount === oldJoinCount && !view.isDestroyed()) {
              this.reloadWithJitter(view, () => {
                this.log(view, "timeout", () => ["received timeout while communicating with server. Falling back to hard refresh for recovery"]);
              });
            }
          });
        } else {
          return push();
        }
      }
      console.log(`simulating ${latency}ms of latency from client to server`);
      let fakePush = {
        receives: [],
        receive(kind, cb) {
          this.receives.push([kind, cb]);
        }
      };
      setTimeout(() => {
        if (view.isDestroyed()) {
          return;
        }
        fakePush.receives.reduce((acc, [kind, cb]) => acc.receive(kind, cb), push());
      }, latency);
      return fakePush;
    }
    reloadWithJitter(view, log) {
      clearTimeout(this.reloadWithJitterTimer);
      this.disconnect();
      let minMs = this.reloadJitterMin;
      let maxMs = this.reloadJitterMax;
      let afterMs = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
      let tries = browser_default.updateLocal(this.localStorage, window.location.pathname, CONSECUTIVE_RELOADS, 0, (count) => count + 1);
      if (tries > this.maxReloads) {
        afterMs = this.failsafeJitter;
      }
      this.reloadWithJitterTimer = setTimeout(() => {
        if (view.isDestroyed() || view.isConnected()) {
          return;
        }
        view.destroy();
        log ? log() : this.log(view, "join", () => [`encountered ${tries} consecutive reloads`]);
        if (tries > this.maxReloads) {
          this.log(view, "join", () => [`exceeded ${this.maxReloads} consecutive reloads. Entering failsafe mode`]);
        }
        if (this.hasPendingLink()) {
          window.location = this.pendingLink;
        } else {
          window.location.reload();
        }
      }, afterMs);
    }
    getHookCallbacks(name) {
      return name && name.startsWith("Phoenix.") ? hooks_default[name.split(".")[1]] : this.hooks[name];
    }
    isUnloaded() {
      return this.unloaded;
    }
    isConnected() {
      return this.socket.isConnected();
    }
    getBindingPrefix() {
      return this.bindingPrefix;
    }
    binding(kind) {
      return `${this.getBindingPrefix()}${kind}`;
    }
    channel(topic, params) {
      return this.socket.channel(topic, params);
    }
    joinRootViews() {
      let rootsFound = false;
      dom_default.all(document, `${PHX_VIEW_SELECTOR}:not([${PHX_PARENT_ID}])`, (rootEl) => {
        if (!this.getRootById(rootEl.id)) {
          let view = this.newRootView(rootEl);
          view.setHref(this.getHref());
          view.join();
          if (rootEl.getAttribute(PHX_MAIN)) {
            this.main = view;
          }
        }
        rootsFound = true;
      });
      return rootsFound;
    }
    redirect(to, flash) {
      this.disconnect();
      browser_default.redirect(to, flash);
    }
    replaceMain(href, flash, callback = null, linkRef = this.setPendingLink(href)) {
      this.outgoingMainEl = this.outgoingMainEl || this.main.el;
      let newMainEl = dom_default.cloneNode(this.outgoingMainEl, "");
      this.main.showLoader(this.loaderTimeout);
      this.main.destroy();
      this.main = this.newRootView(newMainEl, flash);
      this.main.setRedirect(href);
      this.transitionRemoves();
      this.main.join((joinCount, onDone) => {
        if (joinCount === 1 && this.commitPendingLink(linkRef)) {
          this.requestDOMUpdate(() => {
            dom_default.findPhxSticky(document).forEach((el) => newMainEl.appendChild(el));
            this.outgoingMainEl.replaceWith(newMainEl);
            this.outgoingMainEl = null;
            callback && requestAnimationFrame(callback);
            onDone();
          });
        }
      });
    }
    transitionRemoves(elements) {
      let removeAttr = this.binding("remove");
      elements = elements || dom_default.all(document, `[${removeAttr}]`);
      elements.forEach((el) => {
        if (document.body.contains(el)) {
          this.execJS(el, el.getAttribute(removeAttr), "remove");
        }
      });
    }
    isPhxView(el) {
      return el.getAttribute && el.getAttribute(PHX_SESSION) !== null;
    }
    newRootView(el, flash) {
      let view = new View(el, this, null, flash);
      this.roots[view.id] = view;
      return view;
    }
    owner(childEl, callback) {
      let view = maybe(childEl.closest(PHX_VIEW_SELECTOR), (el) => this.getViewByEl(el)) || this.main;
      if (view) {
        callback(view);
      }
    }
    withinOwners(childEl, callback) {
      this.owner(childEl, (view) => callback(view, childEl));
    }
    getViewByEl(el) {
      let rootId = el.getAttribute(PHX_ROOT_ID);
      return maybe(this.getRootById(rootId), (root) => root.getDescendentByEl(el));
    }
    getRootById(id) {
      return this.roots[id];
    }
    destroyAllViews() {
      for (let id in this.roots) {
        this.roots[id].destroy();
        delete this.roots[id];
      }
      this.main = null;
    }
    destroyViewByEl(el) {
      let root = this.getRootById(el.getAttribute(PHX_ROOT_ID));
      if (root && root.id === el.id) {
        root.destroy();
        delete this.roots[root.id];
      } else if (root) {
        root.destroyDescendent(el.id);
      }
    }
    setActiveElement(target) {
      if (this.activeElement === target) {
        return;
      }
      this.activeElement = target;
      let cancel = () => {
        if (target === this.activeElement) {
          this.activeElement = null;
        }
        target.removeEventListener("mouseup", this);
        target.removeEventListener("touchend", this);
      };
      target.addEventListener("mouseup", cancel);
      target.addEventListener("touchend", cancel);
    }
    getActiveElement() {
      if (document.activeElement === document.body) {
        return this.activeElement || document.activeElement;
      } else {
        return document.activeElement || document.body;
      }
    }
    dropActiveElement(view) {
      if (this.prevActive && view.ownsElement(this.prevActive)) {
        this.prevActive = null;
      }
    }
    restorePreviouslyActiveFocus() {
      if (this.prevActive && this.prevActive !== document.body) {
        this.prevActive.focus();
      }
    }
    blurActiveElement() {
      this.prevActive = this.getActiveElement();
      if (this.prevActive !== document.body) {
        this.prevActive.blur();
      }
    }
    bindTopLevelEvents() {
      if (this.boundTopLevelEvents) {
        return;
      }
      this.boundTopLevelEvents = true;
      this.socket.onClose((event) => {
        if (event && event.code === 1e3 && this.main) {
          this.reloadWithJitter(this.main);
        }
      });
      document.body.addEventListener("click", function() {
      });
      window.addEventListener("pageshow", (e) => {
        if (e.persisted) {
          this.getSocket().disconnect();
          this.withPageLoading({ to: window.location.href, kind: "redirect" });
          window.location.reload();
        }
      }, true);
      this.bindNav();
      this.bindClicks();
      this.bindForms();
      this.bind({ keyup: "keyup", keydown: "keydown" }, (e, type, view, targetEl, phxEvent, eventTarget) => {
        let matchKey = targetEl.getAttribute(this.binding(PHX_KEY));
        let pressedKey = e.key && e.key.toLowerCase();
        if (matchKey && matchKey.toLowerCase() !== pressedKey) {
          return;
        }
        let data = __spreadValues({ key: e.key }, this.eventMeta(type, e, targetEl));
        js_default.exec(type, phxEvent, view, targetEl, ["push", { data }]);
      });
      this.bind({ blur: "focusout", focus: "focusin" }, (e, type, view, targetEl, phxEvent, eventTarget) => {
        if (!eventTarget) {
          let data = __spreadValues({ key: e.key }, this.eventMeta(type, e, targetEl));
          js_default.exec(type, phxEvent, view, targetEl, ["push", { data }]);
        }
      });
      this.bind({ blur: "blur", focus: "focus" }, (e, type, view, targetEl, targetCtx, phxEvent, phxTarget) => {
        if (phxTarget === "window") {
          let data = this.eventMeta(type, e, targetEl);
          js_default.exec(type, phxEvent, view, targetEl, ["push", { data }]);
        }
      });
      window.addEventListener("dragover", (e) => e.preventDefault());
      window.addEventListener("drop", (e) => {
        e.preventDefault();
        let dropTargetId = maybe(closestPhxBinding(e.target, this.binding(PHX_DROP_TARGET)), (trueTarget) => {
          return trueTarget.getAttribute(this.binding(PHX_DROP_TARGET));
        });
        let dropTarget = dropTargetId && document.getElementById(dropTargetId);
        let files = Array.from(e.dataTransfer.files || []);
        if (!dropTarget || dropTarget.disabled || files.length === 0 || !(dropTarget.files instanceof FileList)) {
          return;
        }
        LiveUploader.trackFiles(dropTarget, files);
        dropTarget.dispatchEvent(new Event("input", { bubbles: true }));
      });
      this.on(PHX_TRACK_UPLOADS, (e) => {
        let uploadTarget = e.target;
        if (!dom_default.isUploadInput(uploadTarget)) {
          return;
        }
        let files = Array.from(e.detail.files || []).filter((f) => f instanceof File || f instanceof Blob);
        LiveUploader.trackFiles(uploadTarget, files);
        uploadTarget.dispatchEvent(new Event("input", { bubbles: true }));
      });
    }
    eventMeta(eventName, e, targetEl) {
      let callback = this.metadataCallbacks[eventName];
      return callback ? callback(e, targetEl) : {};
    }
    setPendingLink(href) {
      this.linkRef++;
      this.pendingLink = href;
      return this.linkRef;
    }
    commitPendingLink(linkRef) {
      if (this.linkRef !== linkRef) {
        return false;
      } else {
        this.href = this.pendingLink;
        this.pendingLink = null;
        return true;
      }
    }
    getHref() {
      return this.href;
    }
    hasPendingLink() {
      return !!this.pendingLink;
    }
    bind(events, callback) {
      for (let event in events) {
        let browserEventName = events[event];
        this.on(browserEventName, (e) => {
          let binding = this.binding(event);
          let windowBinding = this.binding(`window-${event}`);
          let targetPhxEvent = e.target.getAttribute && e.target.getAttribute(binding);
          if (targetPhxEvent) {
            this.debounce(e.target, e, browserEventName, () => {
              this.withinOwners(e.target, (view) => {
                callback(e, event, view, e.target, targetPhxEvent, null);
              });
            });
          } else {
            dom_default.all(document, `[${windowBinding}]`, (el) => {
              let phxEvent = el.getAttribute(windowBinding);
              this.debounce(el, e, browserEventName, () => {
                this.withinOwners(el, (view) => {
                  callback(e, event, view, el, phxEvent, "window");
                });
              });
            });
          }
        });
      }
    }
    bindClicks() {
      window.addEventListener("mousedown", (e) => this.clickStartedAtTarget = e.target);
      this.bindClick("click", "click", false);
      this.bindClick("mousedown", "capture-click", true);
    }
    bindClick(eventName, bindingName, capture) {
      let click = this.binding(bindingName);
      window.addEventListener(eventName, (e) => {
        let target = null;
        if (capture) {
          target = e.target.matches(`[${click}]`) ? e.target : e.target.querySelector(`[${click}]`);
        } else {
          let clickStartedAtTarget = this.clickStartedAtTarget || e.target;
          target = closestPhxBinding(clickStartedAtTarget, click);
          this.dispatchClickAway(e, clickStartedAtTarget);
          this.clickStartedAtTarget = null;
        }
        let phxEvent = target && target.getAttribute(click);
        if (!phxEvent) {
          return;
        }
        if (target.getAttribute("href") === "#") {
          e.preventDefault();
        }
        this.debounce(target, e, "click", () => {
          this.withinOwners(target, (view) => {
            js_default.exec("click", phxEvent, view, target, ["push", { data: this.eventMeta("click", e, target) }]);
          });
        });
      }, capture);
    }
    dispatchClickAway(e, clickStartedAt) {
      let phxClickAway = this.binding("click-away");
      dom_default.all(document, `[${phxClickAway}]`, (el) => {
        if (!(el.isSameNode(clickStartedAt) || el.contains(clickStartedAt))) {
          this.withinOwners(e.target, (view) => {
            let phxEvent = el.getAttribute(phxClickAway);
            if (js_default.isVisible(el)) {
              js_default.exec("click", phxEvent, view, el, ["push", { data: this.eventMeta("click", e, e.target) }]);
            }
          });
        }
      });
    }
    bindNav() {
      if (!browser_default.canPushState()) {
        return;
      }
      if (history.scrollRestoration) {
        history.scrollRestoration = "manual";
      }
      let scrollTimer = null;
      window.addEventListener("scroll", (_e) => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          browser_default.updateCurrentState((state) => Object.assign(state, { scroll: window.scrollY }));
        }, 100);
      });
      window.addEventListener("popstate", (event) => {
        if (!this.registerNewLocation(window.location)) {
          return;
        }
        let { type, id, root, scroll } = event.state || {};
        let href = window.location.href;
        this.requestDOMUpdate(() => {
          if (this.main.isConnected() && (type === "patch" && id === this.main.id)) {
            this.main.pushLinkPatch(href, null);
          } else {
            this.replaceMain(href, null, () => {
              if (root) {
                this.replaceRootHistory();
              }
              if (typeof scroll === "number") {
                setTimeout(() => {
                  window.scrollTo(0, scroll);
                }, 0);
              }
            });
          }
        });
      }, false);
      window.addEventListener("click", (e) => {
        let target = closestPhxBinding(e.target, PHX_LIVE_LINK);
        let type = target && target.getAttribute(PHX_LIVE_LINK);
        let wantsNewTab = e.metaKey || e.ctrlKey || e.button === 1;
        if (!type || !this.isConnected() || !this.main || wantsNewTab) {
          return;
        }
        let href = target.href;
        let linkState = target.getAttribute(PHX_LINK_STATE);
        e.preventDefault();
        e.stopImmediatePropagation();
        if (this.pendingLink === href) {
          return;
        }
        this.requestDOMUpdate(() => {
          if (type === "patch") {
            this.pushHistoryPatch(href, linkState, target);
          } else if (type === "redirect") {
            this.historyRedirect(href, linkState);
          } else {
            throw new Error(`expected ${PHX_LIVE_LINK} to be "patch" or "redirect", got: ${type}`);
          }
        });
      }, false);
    }
    dispatchEvent(event, payload = {}) {
      dom_default.dispatchEvent(window, `phx:${event}`, { detail: payload });
    }
    dispatchEvents(events) {
      events.forEach(([event, payload]) => this.dispatchEvent(event, payload));
    }
    withPageLoading(info, callback) {
      dom_default.dispatchEvent(window, "phx:page-loading-start", { detail: info });
      let done = () => dom_default.dispatchEvent(window, "phx:page-loading-stop", { detail: info });
      return callback ? callback(done) : done;
    }
    pushHistoryPatch(href, linkState, targetEl) {
      this.withPageLoading({ to: href, kind: "patch" }, (done) => {
        this.main.pushLinkPatch(href, targetEl, (linkRef) => {
          this.historyPatch(href, linkState, linkRef);
          done();
        });
      });
    }
    historyPatch(href, linkState, linkRef = this.setPendingLink(href)) {
      if (!this.commitPendingLink(linkRef)) {
        return;
      }
      browser_default.pushState(linkState, { type: "patch", id: this.main.id }, href);
      this.registerNewLocation(window.location);
    }
    historyRedirect(href, linkState, flash) {
      let scroll = window.scrollY;
      this.withPageLoading({ to: href, kind: "redirect" }, (done) => {
        this.replaceMain(href, flash, () => {
          browser_default.pushState(linkState, { type: "redirect", id: this.main.id, scroll }, href);
          this.registerNewLocation(window.location);
          done();
        });
      });
    }
    replaceRootHistory() {
      browser_default.pushState("replace", { root: true, type: "patch", id: this.main.id });
    }
    registerNewLocation(newLocation) {
      let { pathname, search } = this.currentLocation;
      if (pathname + search === newLocation.pathname + newLocation.search) {
        return false;
      } else {
        this.currentLocation = clone(newLocation);
        return true;
      }
    }
    bindForms() {
      let iterations = 0;
      this.on("submit", (e) => {
        let phxEvent = e.target.getAttribute(this.binding("submit"));
        if (!phxEvent) {
          return;
        }
        e.preventDefault();
        e.target.disabled = true;
        this.withinOwners(e.target, (view) => {
          js_default.exec("submit", phxEvent, view, e.target, ["push", {}]);
        });
      }, false);
      for (let type of ["change", "input"]) {
        this.on(type, (e) => {
          let phxChange = this.binding("change");
          let input = e.target;
          let inputEvent = input.getAttribute(phxChange);
          let formEvent = input.form && input.form.getAttribute(phxChange);
          let phxEvent = inputEvent || formEvent;
          if (!phxEvent) {
            return;
          }
          if (input.type === "number" && input.validity && input.validity.badInput) {
            return;
          }
          let dispatcher = inputEvent ? input : input.form;
          let currentIterations = iterations;
          iterations++;
          let { at, type: lastType } = dom_default.private(input, "prev-iteration") || {};
          if (at === currentIterations - 1 && type !== lastType) {
            return;
          }
          dom_default.putPrivate(input, "prev-iteration", { at: currentIterations, type });
          this.debounce(input, e, type, () => {
            this.withinOwners(dispatcher, (view) => {
              dom_default.putPrivate(input, PHX_HAS_FOCUSED, true);
              if (!dom_default.isTextualInput(input)) {
                this.setActiveElement(input);
              }
              js_default.exec("change", phxEvent, view, input, ["push", { _target: e.target.name, dispatcher }]);
            });
          });
        }, false);
      }
    }
    debounce(el, event, eventType, callback) {
      if (eventType === "blur" || eventType === "focusout") {
        return callback();
      }
      let phxDebounce = this.binding(PHX_DEBOUNCE);
      let phxThrottle = this.binding(PHX_THROTTLE);
      let defaultDebounce = this.defaults.debounce.toString();
      let defaultThrottle = this.defaults.throttle.toString();
      this.withinOwners(el, (view) => {
        let asyncFilter = () => !view.isDestroyed() && document.body.contains(el);
        dom_default.debounce(el, event, phxDebounce, defaultDebounce, phxThrottle, defaultThrottle, asyncFilter, () => {
          callback();
        });
      });
    }
    silenceEvents(callback) {
      this.silenced = true;
      callback();
      this.silenced = false;
    }
    on(event, callback) {
      window.addEventListener(event, (e) => {
        if (!this.silenced) {
          callback(e);
        }
      });
    }
  };
  var TransitionSet = class {
    constructor() {
      this.transitions = new Set();
      this.pendingOps = [];
      this.reset();
    }
    reset() {
      this.transitions.forEach((timer) => {
        cancelTimeout(timer);
        this.transitions.delete(timer);
      });
      this.flushPendingOps();
    }
    after(callback) {
      if (this.size() === 0) {
        callback();
      } else {
        this.pushPendingOp(callback);
      }
    }
    addTransition(time, onStart, onDone) {
      onStart();
      let timer = setTimeout(() => {
        this.transitions.delete(timer);
        onDone();
        if (this.size() === 0) {
          this.flushPendingOps();
        }
      }, time);
      this.transitions.add(timer);
    }
    pushPendingOp(op) {
      this.pendingOps.push(op);
    }
    size() {
      return this.transitions.size;
    }
    flushPendingOps() {
      this.pendingOps.forEach((op) => op());
      this.pendingOps = [];
    }
  };

  // js/root.js
  var import_topbar = __toModule(require_topbar());
  var import_alpine = __toModule(require_alpine());

  // js/init_toast.js
  var InitToast = {
    mounted() {
      init();
    }
  };
  var init = () => {
    const toastEl = document.querySelector(".toast");
    if (toastEl && toastEl.innerText !== "") {
      toastEl.classList.add("mr-4");
      setTimeout(() => {
        toastEl.classList.toggle("-mr-64", "mr-4");
      }, 3e3);
    }
  };
  init();

  // js/init_checkout.js
  var stripe;
  var InitCheckout = {
    mounted() {
      const successCallback = (paymentIntent) => {
        this.pushEvent("payment-success", paymentIntent);
      };
      init2(this.el, successCallback);
    }
  };
  var init2 = (form, successCallback) => {
    const clientKey = form.dataset.key;
    stripe = Stripe(clientKey);
    const clientSecret = form.dataset.secret;
    var elements = stripe.elements();
    var card = elements.create("card", { style });
    card.mount("#card-element");
    card.on("change", function(event) {
      var displayError = document.getElementById("card-errors");
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = "";
      }
    });
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card
        }
      }).then(function(result) {
        if (result.error) {
          console.log(result.error.message);
        } else {
          if (result.paymentIntent.status === "succeeded") {
            successCallback(result.paymentIntent);
          }
        }
      });
    });
  };
  var style = {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  };

  // js/root.js
  var csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");
  var Hooks2 = {};
  Hooks2.InitToast = InitToast;
  Hooks2.InitCheckout = InitCheckout;
  var liveSocket = new LiveSocket("/live", Socket, {
    hooks: Hooks2,
    params: { _csrf_token: csrfToken },
    dom: {
      onBeforeElUpdated(from, to) {
        if (from.__x) {
          window.Alpine.clone(from.__x, to);
        }
      }
    }
  });
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/js/service-worker.js");
    });
  }
  import_topbar.default.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" });
  window.addEventListener("phx:page-loading-start", (info) => import_topbar.default.show());
  window.addEventListener("phx:page-loading-stop", (info) => import_topbar.default.hide());
  liveSocket.connect();
  window.liveSocket = liveSocket;
})();
/**
 * @license MIT
 * topbar 1.0.0, 2021-01-06
 * http://buunguyen.github.io/topbar
 * Copyright (c) 2021 Buu Nguyen
 */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vYXNzZXRzL3ZlbmRvci90b3BiYXIuanMiLCAiLi4vLi4vLi4vYXNzZXRzL3ZlbmRvci9hbHBpbmUuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2h0bWwvcHJpdi9zdGF0aWMvcGhvZW5peF9odG1sLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC91dGlscy5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvY29uc3RhbnRzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9wdXNoLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC90aW1lci5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvY2hhbm5lbC5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvYWpheC5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvbG9uZ3BvbGwuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L3ByZXNlbmNlLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9zZXJpYWxpemVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9zb2NrZXQuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvY29uc3RhbnRzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2VudHJ5X3VwbG9hZGVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L3V0aWxzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2Jyb3dzZXIuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvZG9tLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L3VwbG9hZF9lbnRyeS5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXhfbGl2ZV92aWV3L2Fzc2V0cy9qcy9waG9lbml4X2xpdmVfdmlldy9saXZlX3VwbG9hZGVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2hvb2tzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2RvbV9wb3N0X21vcnBoX3Jlc3RvcmVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL25vZGVfbW9kdWxlcy9tb3JwaGRvbS9kaXN0L21vcnBoZG9tLWVzbS5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXhfbGl2ZV92aWV3L2Fzc2V0cy9qcy9waG9lbml4X2xpdmVfdmlldy9kb21fcGF0Y2guanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvcmVuZGVyZWQuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvdmlld19ob29rLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2pzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L3ZpZXcuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvbGl2ZV9zb2NrZXQuanMiLCAiLi4vLi4vLi4vYXNzZXRzL2pzL3Jvb3QuanMiLCAiLi4vLi4vLi4vYXNzZXRzL2pzL2luaXRfdG9hc3QuanMiLCAiLi4vLi4vLi4vYXNzZXRzL2pzL2luaXRfY2hlY2tvdXQuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogQGxpY2Vuc2UgTUlUXG4gKiB0b3BiYXIgMS4wLjAsIDIwMjEtMDEtMDZcbiAqIGh0dHA6Ly9idXVuZ3V5ZW4uZ2l0aHViLmlvL3RvcGJhclxuICogQ29weXJpZ2h0IChjKSAyMDIxIEJ1dSBOZ3V5ZW5cbiAqL1xuKGZ1bmN0aW9uICh3aW5kb3csIGRvY3VtZW50KSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIC8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3BhdWxpcmlzaC8xNTc5NjcxXG4gIChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGxhc3RUaW1lID0gMDtcbiAgICB2YXIgdmVuZG9ycyA9IFtcIm1zXCIsIFwibW96XCIsIFwid2Via2l0XCIsIFwib1wiXTtcbiAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHZlbmRvcnMubGVuZ3RoICYmICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lOyArK3gpIHtcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPVxuICAgICAgICB3aW5kb3dbdmVuZG9yc1t4XSArIFwiUmVxdWVzdEFuaW1hdGlvbkZyYW1lXCJdO1xuICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID1cbiAgICAgICAgd2luZG93W3ZlbmRvcnNbeF0gKyBcIkNhbmNlbEFuaW1hdGlvbkZyYW1lXCJdIHx8XG4gICAgICAgIHdpbmRvd1t2ZW5kb3JzW3hdICsgXCJDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcIl07XG4gICAgfVxuICAgIGlmICghd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSlcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGN1cnJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHZhciB0aW1lVG9DYWxsID0gTWF0aC5tYXgoMCwgMTYgLSAoY3VyclRpbWUgLSBsYXN0VGltZSkpO1xuICAgICAgICB2YXIgaWQgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY2FsbGJhY2soY3VyclRpbWUgKyB0aW1lVG9DYWxsKTtcbiAgICAgICAgfSwgdGltZVRvQ2FsbCk7XG4gICAgICAgIGxhc3RUaW1lID0gY3VyclRpbWUgKyB0aW1lVG9DYWxsO1xuICAgICAgICByZXR1cm4gaWQ7XG4gICAgICB9O1xuICAgIGlmICghd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKVxuICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChpZCk7XG4gICAgICB9O1xuICB9KSgpO1xuXG4gIHZhciBjYW52YXMsXG4gICAgcHJvZ3Jlc3NUaW1lcklkLFxuICAgIGZhZGVUaW1lcklkLFxuICAgIGN1cnJlbnRQcm9ncmVzcyxcbiAgICBzaG93aW5nLFxuICAgIGFkZEV2ZW50ID0gZnVuY3Rpb24gKGVsZW0sIHR5cGUsIGhhbmRsZXIpIHtcbiAgICAgIGlmIChlbGVtLmFkZEV2ZW50TGlzdGVuZXIpIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgICBlbHNlIGlmIChlbGVtLmF0dGFjaEV2ZW50KSBlbGVtLmF0dGFjaEV2ZW50KFwib25cIiArIHR5cGUsIGhhbmRsZXIpO1xuICAgICAgZWxzZSBlbGVtW1wib25cIiArIHR5cGVdID0gaGFuZGxlcjtcbiAgICB9LFxuICAgIG9wdGlvbnMgPSB7XG4gICAgICBhdXRvUnVuOiB0cnVlLFxuICAgICAgYmFyVGhpY2tuZXNzOiAzLFxuICAgICAgYmFyQ29sb3JzOiB7XG4gICAgICAgIDA6IFwicmdiYSgyNiwgIDE4OCwgMTU2LCAuOSlcIixcbiAgICAgICAgXCIuMjVcIjogXCJyZ2JhKDUyLCAgMTUyLCAyMTksIC45KVwiLFxuICAgICAgICBcIi41MFwiOiBcInJnYmEoMjQxLCAxOTYsIDE1LCAgLjkpXCIsXG4gICAgICAgIFwiLjc1XCI6IFwicmdiYSgyMzAsIDEyNiwgMzQsICAuOSlcIixcbiAgICAgICAgXCIxLjBcIjogXCJyZ2JhKDIxMSwgODQsICAwLCAgIC45KVwiLFxuICAgICAgfSxcbiAgICAgIHNoYWRvd0JsdXI6IDEwLFxuICAgICAgc2hhZG93Q29sb3I6IFwicmdiYSgwLCAgIDAsICAgMCwgICAuNilcIixcbiAgICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICB9LFxuICAgIHJlcGFpbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgIGNhbnZhcy5oZWlnaHQgPSBvcHRpb25zLmJhclRoaWNrbmVzcyAqIDU7IC8vIG5lZWQgc3BhY2UgZm9yIHNoYWRvd1xuXG4gICAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIGN0eC5zaGFkb3dCbHVyID0gb3B0aW9ucy5zaGFkb3dCbHVyO1xuICAgICAgY3R4LnNoYWRvd0NvbG9yID0gb3B0aW9ucy5zaGFkb3dDb2xvcjtcblxuICAgICAgdmFyIGxpbmVHcmFkaWVudCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCBjYW52YXMud2lkdGgsIDApO1xuICAgICAgZm9yICh2YXIgc3RvcCBpbiBvcHRpb25zLmJhckNvbG9ycylcbiAgICAgICAgbGluZUdyYWRpZW50LmFkZENvbG9yU3RvcChzdG9wLCBvcHRpb25zLmJhckNvbG9yc1tzdG9wXSk7XG4gICAgICBjdHgubGluZVdpZHRoID0gb3B0aW9ucy5iYXJUaGlja25lc3M7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKDAsIG9wdGlvbnMuYmFyVGhpY2tuZXNzIC8gMik7XG4gICAgICBjdHgubGluZVRvKFxuICAgICAgICBNYXRoLmNlaWwoY3VycmVudFByb2dyZXNzICogY2FudmFzLndpZHRoKSxcbiAgICAgICAgb3B0aW9ucy5iYXJUaGlja25lc3MgLyAyXG4gICAgICApO1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gbGluZUdyYWRpZW50O1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH0sXG4gICAgY3JlYXRlQ2FudmFzID0gZnVuY3Rpb24gKCkge1xuICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIHZhciBzdHlsZSA9IGNhbnZhcy5zdHlsZTtcbiAgICAgIHN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xuICAgICAgc3R5bGUudG9wID0gc3R5bGUubGVmdCA9IHN0eWxlLnJpZ2h0ID0gc3R5bGUubWFyZ2luID0gc3R5bGUucGFkZGluZyA9IDA7XG4gICAgICBzdHlsZS56SW5kZXggPSAxMDAwMDE7XG4gICAgICBzdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICBpZiAob3B0aW9ucy5jbGFzc05hbWUpIGNhbnZhcy5jbGFzc0xpc3QuYWRkKG9wdGlvbnMuY2xhc3NOYW1lKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgICAgIGFkZEV2ZW50KHdpbmRvdywgXCJyZXNpemVcIiwgcmVwYWludCk7XG4gICAgfSxcbiAgICB0b3BiYXIgPSB7XG4gICAgICBjb25maWc6IGZ1bmN0aW9uIChvcHRzKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvcHRzKVxuICAgICAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KGtleSkpIG9wdGlvbnNba2V5XSA9IG9wdHNba2V5XTtcbiAgICAgIH0sXG4gICAgICBzaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChzaG93aW5nKSByZXR1cm47XG4gICAgICAgIHNob3dpbmcgPSB0cnVlO1xuICAgICAgICBpZiAoZmFkZVRpbWVySWQgIT09IG51bGwpIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShmYWRlVGltZXJJZCk7XG4gICAgICAgIGlmICghY2FudmFzKSBjcmVhdGVDYW52YXMoKTtcbiAgICAgICAgY2FudmFzLnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICBjYW52YXMuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgdG9wYmFyLnByb2dyZXNzKDApO1xuICAgICAgICBpZiAob3B0aW9ucy5hdXRvUnVuKSB7XG4gICAgICAgICAgKGZ1bmN0aW9uIGxvb3AoKSB7XG4gICAgICAgICAgICBwcm9ncmVzc1RpbWVySWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgICAgICAgICAgdG9wYmFyLnByb2dyZXNzKFxuICAgICAgICAgICAgICBcIitcIiArIDAuMDUgKiBNYXRoLnBvdygxIC0gTWF0aC5zcXJ0KGN1cnJlbnRQcm9ncmVzcyksIDIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwcm9ncmVzczogZnVuY3Rpb24gKHRvKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdG8gPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBjdXJyZW50UHJvZ3Jlc3M7XG4gICAgICAgIGlmICh0eXBlb2YgdG8gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICB0byA9XG4gICAgICAgICAgICAodG8uaW5kZXhPZihcIitcIikgPj0gMCB8fCB0by5pbmRleE9mKFwiLVwiKSA+PSAwXG4gICAgICAgICAgICAgID8gY3VycmVudFByb2dyZXNzXG4gICAgICAgICAgICAgIDogMCkgKyBwYXJzZUZsb2F0KHRvKTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50UHJvZ3Jlc3MgPSB0byA+IDEgPyAxIDogdG87XG4gICAgICAgIHJlcGFpbnQoKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm9ncmVzcztcbiAgICAgIH0sXG4gICAgICBoaWRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghc2hvd2luZykgcmV0dXJuO1xuICAgICAgICBzaG93aW5nID0gZmFsc2U7XG4gICAgICAgIGlmIChwcm9ncmVzc1RpbWVySWQgIT0gbnVsbCkge1xuICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShwcm9ncmVzc1RpbWVySWQpO1xuICAgICAgICAgIHByb2dyZXNzVGltZXJJZCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgKGZ1bmN0aW9uIGxvb3AoKSB7XG4gICAgICAgICAgaWYgKHRvcGJhci5wcm9ncmVzcyhcIisuMVwiKSA+PSAxKSB7XG4gICAgICAgICAgICBjYW52YXMuc3R5bGUub3BhY2l0eSAtPSAwLjA1O1xuICAgICAgICAgICAgaWYgKGNhbnZhcy5zdHlsZS5vcGFjaXR5IDw9IDAuMDUpIHtcbiAgICAgICAgICAgICAgY2FudmFzLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgZmFkZVRpbWVySWQgPSBudWxsO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGZhZGVUaW1lcklkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICAgICAgfSkoKTtcbiAgICAgIH0sXG4gICAgfTtcblxuICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHRvcGJhcjtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdG9wYmFyO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRoaXMudG9wYmFyID0gdG9wYmFyO1xuICB9XG59LmNhbGwodGhpcywgd2luZG93LCBkb2N1bWVudCkpO1xuIiwgIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgKGdsb2JhbCA9IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwuQWxwaW5lID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBpZiAoa2V5IGluIG9iaikge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtrZXldID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIGZ1bmN0aW9uIG93bktleXMob2JqZWN0LCBlbnVtZXJhYmxlT25seSkge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTtcblxuICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgICB2YXIgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KTtcbiAgICAgIGlmIChlbnVtZXJhYmxlT25seSkgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7XG4gICAgICB9KTtcbiAgICAgIGtleXMucHVzaC5hcHBseShrZXlzLCBzeW1ib2xzKTtcbiAgICB9XG5cbiAgICByZXR1cm4ga2V5cztcbiAgfVxuXG4gIGZ1bmN0aW9uIF9vYmplY3RTcHJlYWQyKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTtcblxuICAgICAgaWYgKGkgJSAyKSB7XG4gICAgICAgIG93bktleXMoT2JqZWN0KHNvdXJjZSksIHRydWUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhzb3VyY2UpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG93bktleXMoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgLy8gVGhhbmtzIEBzdGltdWx1czpcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3N0aW11bHVzanMvc3RpbXVsdXMvYmxvYi9tYXN0ZXIvcGFja2FnZXMvJTQwc3RpbXVsdXMvY29yZS9zcmMvYXBwbGljYXRpb24udHNcbiAgZnVuY3Rpb24gZG9tUmVhZHkoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT0gXCJsb2FkaW5nXCIpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgcmVzb2x2ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gYXJyYXlVbmlxdWUoYXJyYXkpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KGFycmF5KSk7XG4gIH1cbiAgZnVuY3Rpb24gaXNUZXN0aW5nKCkge1xuICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluY2x1ZGVzKFwiTm9kZS5qc1wiKSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluY2x1ZGVzKFwianNkb21cIik7XG4gIH1cbiAgZnVuY3Rpb24gY2hlY2tlZEF0dHJMb29zZUNvbXBhcmUodmFsdWVBLCB2YWx1ZUIpIHtcbiAgICByZXR1cm4gdmFsdWVBID09IHZhbHVlQjtcbiAgfVxuICBmdW5jdGlvbiB3YXJuSWZNYWxmb3JtZWRUZW1wbGF0ZShlbCwgZGlyZWN0aXZlKSB7XG4gICAgaWYgKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ3RlbXBsYXRlJykge1xuICAgICAgY29uc29sZS53YXJuKGBBbHBpbmU6IFske2RpcmVjdGl2ZX1dIGRpcmVjdGl2ZSBzaG91bGQgb25seSBiZSBhZGRlZCB0byA8dGVtcGxhdGU+IHRhZ3MuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYWxwaW5lanMvYWxwaW5lIyR7ZGlyZWN0aXZlfWApO1xuICAgIH0gZWxzZSBpZiAoZWwuY29udGVudC5jaGlsZEVsZW1lbnRDb3VudCAhPT0gMSkge1xuICAgICAgY29uc29sZS53YXJuKGBBbHBpbmU6IDx0ZW1wbGF0ZT4gdGFnIHdpdGggWyR7ZGlyZWN0aXZlfV0gZW5jb3VudGVyZWQgd2l0aCBhbiB1bmV4cGVjdGVkIG51bWJlciBvZiByb290IGVsZW1lbnRzLiBNYWtlIHN1cmUgPHRlbXBsYXRlPiBoYXMgYSBzaW5nbGUgcm9vdCBlbGVtZW50LiBgKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24ga2ViYWJDYXNlKHN1YmplY3QpIHtcbiAgICByZXR1cm4gc3ViamVjdC5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS5yZXBsYWNlKC9bX1xcc10vLCAnLScpLnRvTG93ZXJDYXNlKCk7XG4gIH1cbiAgZnVuY3Rpb24gY2FtZWxDYXNlKHN1YmplY3QpIHtcbiAgICByZXR1cm4gc3ViamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLy0oXFx3KS9nLCAobWF0Y2gsIGNoYXIpID0+IGNoYXIudG9VcHBlckNhc2UoKSk7XG4gIH1cbiAgZnVuY3Rpb24gd2FsayhlbCwgY2FsbGJhY2spIHtcbiAgICBpZiAoY2FsbGJhY2soZWwpID09PSBmYWxzZSkgcmV0dXJuO1xuICAgIGxldCBub2RlID0gZWwuZmlyc3RFbGVtZW50Q2hpbGQ7XG5cbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgd2Fsayhub2RlLCBjYWxsYmFjayk7XG4gICAgICBub2RlID0gbm9kZS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQpIHtcbiAgICB2YXIgdGltZW91dDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLFxuICAgICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uIGxhdGVyKCkge1xuICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIH07XG5cbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgaGFuZGxlRXJyb3IgPSAoZWwsIGV4cHJlc3Npb24sIGVycm9yKSA9PiB7XG4gICAgY29uc29sZS53YXJuKGBBbHBpbmUgRXJyb3I6IFwiJHtlcnJvcn1cIlxcblxcbkV4cHJlc3Npb246IFwiJHtleHByZXNzaW9ufVwiXFxuRWxlbWVudDpgLCBlbCk7XG5cbiAgICBpZiAoIWlzVGVzdGluZygpKSB7XG4gICAgICBPYmplY3QuYXNzaWduKGVycm9yLCB7XG4gICAgICAgIGVsLFxuICAgICAgICBleHByZXNzaW9uXG4gICAgICB9KTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiB0cnlDYXRjaChjYiwge1xuICAgIGVsLFxuICAgIGV4cHJlc3Npb25cbiAgfSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGNiKCk7XG4gICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlID8gdmFsdWUuY2F0Y2goZSA9PiBoYW5kbGVFcnJvcihlbCwgZXhwcmVzc2lvbiwgZSkpIDogdmFsdWU7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaGFuZGxlRXJyb3IoZWwsIGV4cHJlc3Npb24sIGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNhZmVyRXZhbChlbCwgZXhwcmVzc2lvbiwgZGF0YUNvbnRleHQsIGFkZGl0aW9uYWxIZWxwZXJWYXJpYWJsZXMgPSB7fSkge1xuICAgIHJldHVybiB0cnlDYXRjaCgoKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGV4cHJlc3Npb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIGV4cHJlc3Npb24uY2FsbChkYXRhQ29udGV4dCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgRnVuY3Rpb24oWyckZGF0YScsIC4uLk9iamVjdC5rZXlzKGFkZGl0aW9uYWxIZWxwZXJWYXJpYWJsZXMpXSwgYHZhciBfX2FscGluZV9yZXN1bHQ7IHdpdGgoJGRhdGEpIHsgX19hbHBpbmVfcmVzdWx0ID0gJHtleHByZXNzaW9ufSB9OyByZXR1cm4gX19hbHBpbmVfcmVzdWx0YCkoZGF0YUNvbnRleHQsIC4uLk9iamVjdC52YWx1ZXMoYWRkaXRpb25hbEhlbHBlclZhcmlhYmxlcykpO1xuICAgIH0sIHtcbiAgICAgIGVsLFxuICAgICAgZXhwcmVzc2lvblxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIHNhZmVyRXZhbE5vUmV0dXJuKGVsLCBleHByZXNzaW9uLCBkYXRhQ29udGV4dCwgYWRkaXRpb25hbEhlbHBlclZhcmlhYmxlcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRyeUNhdGNoKCgpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgZXhwcmVzc2lvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGV4cHJlc3Npb24uY2FsbChkYXRhQ29udGV4dCwgYWRkaXRpb25hbEhlbHBlclZhcmlhYmxlc1snJGV2ZW50J10pKTtcbiAgICAgIH1cblxuICAgICAgbGV0IEFzeW5jRnVuY3Rpb24gPSBGdW5jdGlvbjtcbiAgICAgIC8qIE1PREVSTi1PTkxZOlNUQVJUICovXG5cbiAgICAgIEFzeW5jRnVuY3Rpb24gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoYXN5bmMgZnVuY3Rpb24gKCkge30pLmNvbnN0cnVjdG9yO1xuICAgICAgLyogTU9ERVJOLU9OTFk6RU5EICovXG4gICAgICAvLyBGb3IgdGhlIGNhc2VzIHdoZW4gdXNlcnMgcGFzcyBvbmx5IGEgZnVuY3Rpb24gcmVmZXJlbmNlIHRvIHRoZSBjYWxsZXI6IGB4LW9uOmNsaWNrPVwiZm9vXCJgXG4gICAgICAvLyBXaGVyZSBcImZvb1wiIGlzIGEgZnVuY3Rpb24uIEFsc28sIHdlJ2xsIHBhc3MgdGhlIGZ1bmN0aW9uIHRoZSBldmVudCBpbnN0YW5jZSB3aGVuIHdlIGNhbGwgaXQuXG5cbiAgICAgIGlmIChPYmplY3Qua2V5cyhkYXRhQ29udGV4dCkuaW5jbHVkZXMoZXhwcmVzc2lvbikpIHtcbiAgICAgICAgbGV0IG1ldGhvZFJlZmVyZW5jZSA9IG5ldyBGdW5jdGlvbihbJ2RhdGFDb250ZXh0JywgLi4uT2JqZWN0LmtleXMoYWRkaXRpb25hbEhlbHBlclZhcmlhYmxlcyldLCBgd2l0aChkYXRhQ29udGV4dCkgeyByZXR1cm4gJHtleHByZXNzaW9ufSB9YCkoZGF0YUNvbnRleHQsIC4uLk9iamVjdC52YWx1ZXMoYWRkaXRpb25hbEhlbHBlclZhcmlhYmxlcykpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgbWV0aG9kUmVmZXJlbmNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShtZXRob2RSZWZlcmVuY2UuY2FsbChkYXRhQ29udGV4dCwgYWRkaXRpb25hbEhlbHBlclZhcmlhYmxlc1snJGV2ZW50J10pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQXN5bmNGdW5jdGlvbihbJ2RhdGFDb250ZXh0JywgLi4uT2JqZWN0LmtleXMoYWRkaXRpb25hbEhlbHBlclZhcmlhYmxlcyldLCBgd2l0aChkYXRhQ29udGV4dCkgeyAke2V4cHJlc3Npb259IH1gKShkYXRhQ29udGV4dCwgLi4uT2JqZWN0LnZhbHVlcyhhZGRpdGlvbmFsSGVscGVyVmFyaWFibGVzKSkpO1xuICAgIH0sIHtcbiAgICAgIGVsLFxuICAgICAgZXhwcmVzc2lvblxuICAgIH0pO1xuICB9XG4gIGNvbnN0IHhBdHRyUkUgPSAvXngtKG9ufGJpbmR8ZGF0YXx0ZXh0fGh0bWx8bW9kZWx8aWZ8Zm9yfHNob3d8Y2xvYWt8dHJhbnNpdGlvbnxyZWZ8c3ByZWFkKVxcYi87XG4gIGZ1bmN0aW9uIGlzWEF0dHIoYXR0cikge1xuICAgIGNvbnN0IG5hbWUgPSByZXBsYWNlQXRBbmRDb2xvbldpdGhTdGFuZGFyZFN5bnRheChhdHRyLm5hbWUpO1xuICAgIHJldHVybiB4QXR0clJFLnRlc3QobmFtZSk7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0WEF0dHJzKGVsLCBjb21wb25lbnQsIHR5cGUpIHtcbiAgICBsZXQgZGlyZWN0aXZlcyA9IEFycmF5LmZyb20oZWwuYXR0cmlidXRlcykuZmlsdGVyKGlzWEF0dHIpLm1hcChwYXJzZUh0bWxBdHRyaWJ1dGUpOyAvLyBHZXQgYW4gb2JqZWN0IG9mIGRpcmVjdGl2ZXMgZnJvbSB4LXNwcmVhZC5cblxuICAgIGxldCBzcHJlYWREaXJlY3RpdmUgPSBkaXJlY3RpdmVzLmZpbHRlcihkaXJlY3RpdmUgPT4gZGlyZWN0aXZlLnR5cGUgPT09ICdzcHJlYWQnKVswXTtcblxuICAgIGlmIChzcHJlYWREaXJlY3RpdmUpIHtcbiAgICAgIGxldCBzcHJlYWRPYmplY3QgPSBzYWZlckV2YWwoZWwsIHNwcmVhZERpcmVjdGl2ZS5leHByZXNzaW9uLCBjb21wb25lbnQuJGRhdGEpOyAvLyBBZGQgeC1zcHJlYWQgZGlyZWN0aXZlcyB0byB0aGUgcGlsZSBvZiBleGlzdGluZyBkaXJlY3RpdmVzLlxuXG4gICAgICBkaXJlY3RpdmVzID0gZGlyZWN0aXZlcy5jb25jYXQoT2JqZWN0LmVudHJpZXMoc3ByZWFkT2JqZWN0KS5tYXAoKFtuYW1lLCB2YWx1ZV0pID0+IHBhcnNlSHRtbEF0dHJpYnV0ZSh7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIHZhbHVlXG4gICAgICB9KSkpO1xuICAgIH1cblxuICAgIGlmICh0eXBlKSByZXR1cm4gZGlyZWN0aXZlcy5maWx0ZXIoaSA9PiBpLnR5cGUgPT09IHR5cGUpO1xuICAgIHJldHVybiBzb3J0RGlyZWN0aXZlcyhkaXJlY3RpdmVzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNvcnREaXJlY3RpdmVzKGRpcmVjdGl2ZXMpIHtcbiAgICBsZXQgZGlyZWN0aXZlT3JkZXIgPSBbJ2JpbmQnLCAnbW9kZWwnLCAnc2hvdycsICdjYXRjaC1hbGwnXTtcbiAgICByZXR1cm4gZGlyZWN0aXZlcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBsZXQgdHlwZUEgPSBkaXJlY3RpdmVPcmRlci5pbmRleE9mKGEudHlwZSkgPT09IC0xID8gJ2NhdGNoLWFsbCcgOiBhLnR5cGU7XG4gICAgICBsZXQgdHlwZUIgPSBkaXJlY3RpdmVPcmRlci5pbmRleE9mKGIudHlwZSkgPT09IC0xID8gJ2NhdGNoLWFsbCcgOiBiLnR5cGU7XG4gICAgICByZXR1cm4gZGlyZWN0aXZlT3JkZXIuaW5kZXhPZih0eXBlQSkgLSBkaXJlY3RpdmVPcmRlci5pbmRleE9mKHR5cGVCKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlSHRtbEF0dHJpYnV0ZSh7XG4gICAgbmFtZSxcbiAgICB2YWx1ZVxuICB9KSB7XG4gICAgY29uc3Qgbm9ybWFsaXplZE5hbWUgPSByZXBsYWNlQXRBbmRDb2xvbldpdGhTdGFuZGFyZFN5bnRheChuYW1lKTtcbiAgICBjb25zdCB0eXBlTWF0Y2ggPSBub3JtYWxpemVkTmFtZS5tYXRjaCh4QXR0clJFKTtcbiAgICBjb25zdCB2YWx1ZU1hdGNoID0gbm9ybWFsaXplZE5hbWUubWF0Y2goLzooW2EtekEtWjAtOVxcLTpdKykvKTtcbiAgICBjb25zdCBtb2RpZmllcnMgPSBub3JtYWxpemVkTmFtZS5tYXRjaCgvXFwuW14uXFxdXSsoPz1bXlxcXV0qJCkvZykgfHwgW107XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IHR5cGVNYXRjaCA/IHR5cGVNYXRjaFsxXSA6IG51bGwsXG4gICAgICB2YWx1ZTogdmFsdWVNYXRjaCA/IHZhbHVlTWF0Y2hbMV0gOiBudWxsLFxuICAgICAgbW9kaWZpZXJzOiBtb2RpZmllcnMubWFwKGkgPT4gaS5yZXBsYWNlKCcuJywgJycpKSxcbiAgICAgIGV4cHJlc3Npb246IHZhbHVlXG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBpc0Jvb2xlYW5BdHRyKGF0dHJOYW1lKSB7XG4gICAgLy8gQXMgcGVyIEhUTUwgc3BlYyB0YWJsZSBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbmRpY2VzLmh0bWwjYXR0cmlidXRlcy0zOmJvb2xlYW4tYXR0cmlidXRlXG4gICAgLy8gQXJyYXkgcm91Z2hseSBvcmRlcmVkIGJ5IGVzdGltYXRlZCB1c2FnZVxuICAgIGNvbnN0IGJvb2xlYW5BdHRyaWJ1dGVzID0gWydkaXNhYmxlZCcsICdjaGVja2VkJywgJ3JlcXVpcmVkJywgJ3JlYWRvbmx5JywgJ2hpZGRlbicsICdvcGVuJywgJ3NlbGVjdGVkJywgJ2F1dG9mb2N1cycsICdpdGVtc2NvcGUnLCAnbXVsdGlwbGUnLCAnbm92YWxpZGF0ZScsICdhbGxvd2Z1bGxzY3JlZW4nLCAnYWxsb3dwYXltZW50cmVxdWVzdCcsICdmb3Jtbm92YWxpZGF0ZScsICdhdXRvcGxheScsICdjb250cm9scycsICdsb29wJywgJ211dGVkJywgJ3BsYXlzaW5saW5lJywgJ2RlZmF1bHQnLCAnaXNtYXAnLCAncmV2ZXJzZWQnLCAnYXN5bmMnLCAnZGVmZXInLCAnbm9tb2R1bGUnXTtcbiAgICByZXR1cm4gYm9vbGVhbkF0dHJpYnV0ZXMuaW5jbHVkZXMoYXR0ck5hbWUpO1xuICB9XG4gIGZ1bmN0aW9uIHJlcGxhY2VBdEFuZENvbG9uV2l0aFN0YW5kYXJkU3ludGF4KG5hbWUpIHtcbiAgICBpZiAobmFtZS5zdGFydHNXaXRoKCdAJykpIHtcbiAgICAgIHJldHVybiBuYW1lLnJlcGxhY2UoJ0AnLCAneC1vbjonKTtcbiAgICB9IGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgnOicpKSB7XG4gICAgICByZXR1cm4gbmFtZS5yZXBsYWNlKCc6JywgJ3gtYmluZDonKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuICBmdW5jdGlvbiBjb252ZXJ0Q2xhc3NTdHJpbmdUb0FycmF5KGNsYXNzTGlzdCwgZmlsdGVyRm4gPSBCb29sZWFuKSB7XG4gICAgcmV0dXJuIGNsYXNzTGlzdC5zcGxpdCgnICcpLmZpbHRlcihmaWx0ZXJGbik7XG4gIH1cbiAgY29uc3QgVFJBTlNJVElPTl9UWVBFX0lOID0gJ2luJztcbiAgY29uc3QgVFJBTlNJVElPTl9UWVBFX09VVCA9ICdvdXQnO1xuICBjb25zdCBUUkFOU0lUSU9OX0NBTkNFTExFRCA9ICdjYW5jZWxsZWQnO1xuICBmdW5jdGlvbiB0cmFuc2l0aW9uSW4oZWwsIHNob3csIHJlamVjdCwgY29tcG9uZW50LCBmb3JjZVNraXAgPSBmYWxzZSkge1xuICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gdHJhbnNpdGlvbiBvbiB0aGUgaW5pdGlhbCBwYWdlIGxvYWQuXG4gICAgaWYgKGZvcmNlU2tpcCkgcmV0dXJuIHNob3coKTtcblxuICAgIGlmIChlbC5fX3hfdHJhbnNpdGlvbiAmJiBlbC5fX3hfdHJhbnNpdGlvbi50eXBlID09PSBUUkFOU0lUSU9OX1RZUEVfSU4pIHtcbiAgICAgIC8vIHRoZXJlIGlzIGFscmVhZHkgYSBzaW1pbGFyIHRyYW5zaXRpb24gZ29pbmcgb24sIHRoaXMgd2FzIHByb2JhYmx5IHRyaWdnZXJlZCBieVxuICAgICAgLy8gYSBjaGFuZ2UgaW4gYSBkaWZmZXJlbnQgcHJvcGVydHksIGxldCdzIGp1c3QgbGVhdmUgdGhlIHByZXZpb3VzIG9uZSBkb2luZyBpdHMgam9iXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYXR0cnMgPSBnZXRYQXR0cnMoZWwsIGNvbXBvbmVudCwgJ3RyYW5zaXRpb24nKTtcbiAgICBjb25zdCBzaG93QXR0ciA9IGdldFhBdHRycyhlbCwgY29tcG9uZW50LCAnc2hvdycpWzBdOyAvLyBJZiB0aGlzIGlzIHRyaWdnZXJlZCBieSBhIHgtc2hvdy50cmFuc2l0aW9uLlxuXG4gICAgaWYgKHNob3dBdHRyICYmIHNob3dBdHRyLm1vZGlmaWVycy5pbmNsdWRlcygndHJhbnNpdGlvbicpKSB7XG4gICAgICBsZXQgbW9kaWZpZXJzID0gc2hvd0F0dHIubW9kaWZpZXJzOyAvLyBJZiB4LXNob3cudHJhbnNpdGlvbi5vdXQsIHdlJ2xsIHNraXAgdGhlIFwiaW5cIiB0cmFuc2l0aW9uLlxuXG4gICAgICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKCdvdXQnKSAmJiAhbW9kaWZpZXJzLmluY2x1ZGVzKCdpbicpKSByZXR1cm4gc2hvdygpO1xuICAgICAgY29uc3Qgc2V0dGluZ0JvdGhTaWRlc09mVHJhbnNpdGlvbiA9IG1vZGlmaWVycy5pbmNsdWRlcygnaW4nKSAmJiBtb2RpZmllcnMuaW5jbHVkZXMoJ291dCcpOyAvLyBJZiB4LXNob3cudHJhbnNpdGlvbi5pbi4uLm91dC4uLiBvbmx5IHVzZSBcImluXCIgcmVsYXRlZCBtb2RpZmllcnMgZm9yIHRoaXMgdHJhbnNpdGlvbi5cblxuICAgICAgbW9kaWZpZXJzID0gc2V0dGluZ0JvdGhTaWRlc09mVHJhbnNpdGlvbiA/IG1vZGlmaWVycy5maWx0ZXIoKGksIGluZGV4KSA9PiBpbmRleCA8IG1vZGlmaWVycy5pbmRleE9mKCdvdXQnKSkgOiBtb2RpZmllcnM7XG4gICAgICB0cmFuc2l0aW9uSGVscGVySW4oZWwsIG1vZGlmaWVycywgc2hvdywgcmVqZWN0KTsgLy8gT3RoZXJ3aXNlLCB3ZSBjYW4gYXNzdW1lIHgtdHJhbnNpdGlvbjplbnRlci5cbiAgICB9IGVsc2UgaWYgKGF0dHJzLnNvbWUoYXR0ciA9PiBbJ2VudGVyJywgJ2VudGVyLXN0YXJ0JywgJ2VudGVyLWVuZCddLmluY2x1ZGVzKGF0dHIudmFsdWUpKSkge1xuICAgICAgdHJhbnNpdGlvbkNsYXNzZXNJbihlbCwgY29tcG9uZW50LCBhdHRycywgc2hvdywgcmVqZWN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSWYgbmVpdGhlciwganVzdCBzaG93IHRoYXQgZGFtbiB0aGluZy5cbiAgICAgIHNob3coKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbk91dChlbCwgaGlkZSwgcmVqZWN0LCBjb21wb25lbnQsIGZvcmNlU2tpcCA9IGZhbHNlKSB7XG4gICAgLy8gV2UgZG9uJ3Qgd2FudCB0byB0cmFuc2l0aW9uIG9uIHRoZSBpbml0aWFsIHBhZ2UgbG9hZC5cbiAgICBpZiAoZm9yY2VTa2lwKSByZXR1cm4gaGlkZSgpO1xuXG4gICAgaWYgKGVsLl9feF90cmFuc2l0aW9uICYmIGVsLl9feF90cmFuc2l0aW9uLnR5cGUgPT09IFRSQU5TSVRJT05fVFlQRV9PVVQpIHtcbiAgICAgIC8vIHRoZXJlIGlzIGFscmVhZHkgYSBzaW1pbGFyIHRyYW5zaXRpb24gZ29pbmcgb24sIHRoaXMgd2FzIHByb2JhYmx5IHRyaWdnZXJlZCBieVxuICAgICAgLy8gYSBjaGFuZ2UgaW4gYSBkaWZmZXJlbnQgcHJvcGVydHksIGxldCdzIGp1c3QgbGVhdmUgdGhlIHByZXZpb3VzIG9uZSBkb2luZyBpdHMgam9iXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYXR0cnMgPSBnZXRYQXR0cnMoZWwsIGNvbXBvbmVudCwgJ3RyYW5zaXRpb24nKTtcbiAgICBjb25zdCBzaG93QXR0ciA9IGdldFhBdHRycyhlbCwgY29tcG9uZW50LCAnc2hvdycpWzBdO1xuXG4gICAgaWYgKHNob3dBdHRyICYmIHNob3dBdHRyLm1vZGlmaWVycy5pbmNsdWRlcygndHJhbnNpdGlvbicpKSB7XG4gICAgICBsZXQgbW9kaWZpZXJzID0gc2hvd0F0dHIubW9kaWZpZXJzO1xuICAgICAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcygnaW4nKSAmJiAhbW9kaWZpZXJzLmluY2x1ZGVzKCdvdXQnKSkgcmV0dXJuIGhpZGUoKTtcbiAgICAgIGNvbnN0IHNldHRpbmdCb3RoU2lkZXNPZlRyYW5zaXRpb24gPSBtb2RpZmllcnMuaW5jbHVkZXMoJ2luJykgJiYgbW9kaWZpZXJzLmluY2x1ZGVzKCdvdXQnKTtcbiAgICAgIG1vZGlmaWVycyA9IHNldHRpbmdCb3RoU2lkZXNPZlRyYW5zaXRpb24gPyBtb2RpZmllcnMuZmlsdGVyKChpLCBpbmRleCkgPT4gaW5kZXggPiBtb2RpZmllcnMuaW5kZXhPZignb3V0JykpIDogbW9kaWZpZXJzO1xuICAgICAgdHJhbnNpdGlvbkhlbHBlck91dChlbCwgbW9kaWZpZXJzLCBzZXR0aW5nQm90aFNpZGVzT2ZUcmFuc2l0aW9uLCBoaWRlLCByZWplY3QpO1xuICAgIH0gZWxzZSBpZiAoYXR0cnMuc29tZShhdHRyID0+IFsnbGVhdmUnLCAnbGVhdmUtc3RhcnQnLCAnbGVhdmUtZW5kJ10uaW5jbHVkZXMoYXR0ci52YWx1ZSkpKSB7XG4gICAgICB0cmFuc2l0aW9uQ2xhc3Nlc091dChlbCwgY29tcG9uZW50LCBhdHRycywgaGlkZSwgcmVqZWN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGlkZSgpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiB0cmFuc2l0aW9uSGVscGVySW4oZWwsIG1vZGlmaWVycywgc2hvd0NhbGxiYWNrLCByZWplY3QpIHtcbiAgICAvLyBEZWZhdWx0IHZhbHVlcyBpbnNwaXJlZCBieTogaHR0cHM6Ly9tYXRlcmlhbC5pby9kZXNpZ24vbW90aW9uL3NwZWVkLmh0bWwjZHVyYXRpb25cbiAgICBjb25zdCBzdHlsZVZhbHVlcyA9IHtcbiAgICAgIGR1cmF0aW9uOiBtb2RpZmllclZhbHVlKG1vZGlmaWVycywgJ2R1cmF0aW9uJywgMTUwKSxcbiAgICAgIG9yaWdpbjogbW9kaWZpZXJWYWx1ZShtb2RpZmllcnMsICdvcmlnaW4nLCAnY2VudGVyJyksXG4gICAgICBmaXJzdDoge1xuICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICBzY2FsZTogbW9kaWZpZXJWYWx1ZShtb2RpZmllcnMsICdzY2FsZScsIDk1KVxuICAgICAgfSxcbiAgICAgIHNlY29uZDoge1xuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBzY2FsZTogMTAwXG4gICAgICB9XG4gICAgfTtcbiAgICB0cmFuc2l0aW9uSGVscGVyKGVsLCBtb2RpZmllcnMsIHNob3dDYWxsYmFjaywgKCkgPT4ge30sIHJlamVjdCwgc3R5bGVWYWx1ZXMsIFRSQU5TSVRJT05fVFlQRV9JTik7XG4gIH1cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbkhlbHBlck91dChlbCwgbW9kaWZpZXJzLCBzZXR0aW5nQm90aFNpZGVzT2ZUcmFuc2l0aW9uLCBoaWRlQ2FsbGJhY2ssIHJlamVjdCkge1xuICAgIC8vIE1ha2UgdGhlIFwib3V0XCIgdHJhbnNpdGlvbiAuNXggc2xvd2VyIHRoYW4gdGhlIFwiaW5cIi4gKFZpc3VhbGx5IGJldHRlcilcbiAgICAvLyBIT1dFVkVSLCBpZiB0aGV5IGV4cGxpY2l0bHkgc2V0IGEgZHVyYXRpb24gZm9yIHRoZSBcIm91dFwiIHRyYW5zaXRpb24sXG4gICAgLy8gdXNlIHRoYXQuXG4gICAgY29uc3QgZHVyYXRpb24gPSBzZXR0aW5nQm90aFNpZGVzT2ZUcmFuc2l0aW9uID8gbW9kaWZpZXJWYWx1ZShtb2RpZmllcnMsICdkdXJhdGlvbicsIDE1MCkgOiBtb2RpZmllclZhbHVlKG1vZGlmaWVycywgJ2R1cmF0aW9uJywgMTUwKSAvIDI7XG4gICAgY29uc3Qgc3R5bGVWYWx1ZXMgPSB7XG4gICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICBvcmlnaW46IG1vZGlmaWVyVmFsdWUobW9kaWZpZXJzLCAnb3JpZ2luJywgJ2NlbnRlcicpLFxuICAgICAgZmlyc3Q6IHtcbiAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgc2NhbGU6IDEwMFxuICAgICAgfSxcbiAgICAgIHNlY29uZDoge1xuICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICBzY2FsZTogbW9kaWZpZXJWYWx1ZShtb2RpZmllcnMsICdzY2FsZScsIDk1KVxuICAgICAgfVxuICAgIH07XG4gICAgdHJhbnNpdGlvbkhlbHBlcihlbCwgbW9kaWZpZXJzLCAoKSA9PiB7fSwgaGlkZUNhbGxiYWNrLCByZWplY3QsIHN0eWxlVmFsdWVzLCBUUkFOU0lUSU9OX1RZUEVfT1VUKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vZGlmaWVyVmFsdWUobW9kaWZpZXJzLCBrZXksIGZhbGxiYWNrKSB7XG4gICAgLy8gSWYgdGhlIG1vZGlmaWVyIGlzbid0IHByZXNlbnQsIHVzZSB0aGUgZGVmYXVsdC5cbiAgICBpZiAobW9kaWZpZXJzLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHJldHVybiBmYWxsYmFjazsgLy8gSWYgaXQgSVMgcHJlc2VudCwgZ3JhYiB0aGUgdmFsdWUgYWZ0ZXIgaXQ6IHgtc2hvdy50cmFuc2l0aW9uLmR1cmF0aW9uLjUwMG1zXG5cbiAgICBjb25zdCByYXdWYWx1ZSA9IG1vZGlmaWVyc1ttb2RpZmllcnMuaW5kZXhPZihrZXkpICsgMV07XG4gICAgaWYgKCFyYXdWYWx1ZSkgcmV0dXJuIGZhbGxiYWNrO1xuXG4gICAgaWYgKGtleSA9PT0gJ3NjYWxlJykge1xuICAgICAgLy8gQ2hlY2sgaWYgdGhlIHZlcnkgbmV4dCB2YWx1ZSBpcyBOT1QgYSBudW1iZXIgYW5kIHJldHVybiB0aGUgZmFsbGJhY2suXG4gICAgICAvLyBJZiB4LXNob3cudHJhbnNpdGlvbi5zY2FsZSwgd2UnbGwgdXNlIHRoZSBkZWZhdWx0IHNjYWxlIHZhbHVlLlxuICAgICAgLy8gVGhhdCBpcyBob3cgYSB1c2VyIG9wdHMgb3V0IG9mIHRoZSBvcGFjaXR5IHRyYW5zaXRpb24uXG4gICAgICBpZiAoIWlzTnVtZXJpYyhyYXdWYWx1ZSkpIHJldHVybiBmYWxsYmFjaztcbiAgICB9XG5cbiAgICBpZiAoa2V5ID09PSAnZHVyYXRpb24nKSB7XG4gICAgICAvLyBTdXBwb3J0IHgtc2hvdy50cmFuc2l0aW9uLmR1cmF0aW9uLjUwMG1zICYmIGR1cmF0aW9uLjUwMFxuICAgICAgbGV0IG1hdGNoID0gcmF3VmFsdWUubWF0Y2goLyhbMC05XSspbXMvKTtcbiAgICAgIGlmIChtYXRjaCkgcmV0dXJuIG1hdGNoWzFdO1xuICAgIH1cblxuICAgIGlmIChrZXkgPT09ICdvcmlnaW4nKSB7XG4gICAgICAvLyBTdXBwb3J0IGNoYWluaW5nIG9yaWdpbiBkaXJlY3Rpb25zOiB4LXNob3cudHJhbnNpdGlvbi50b3AucmlnaHRcbiAgICAgIGlmIChbJ3RvcCcsICdyaWdodCcsICdsZWZ0JywgJ2NlbnRlcicsICdib3R0b20nXS5pbmNsdWRlcyhtb2RpZmllcnNbbW9kaWZpZXJzLmluZGV4T2Yoa2V5KSArIDJdKSkge1xuICAgICAgICByZXR1cm4gW3Jhd1ZhbHVlLCBtb2RpZmllcnNbbW9kaWZpZXJzLmluZGV4T2Yoa2V5KSArIDJdXS5qb2luKCcgJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJhd1ZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbkhlbHBlcihlbCwgbW9kaWZpZXJzLCBob29rMSwgaG9vazIsIHJlamVjdCwgc3R5bGVWYWx1ZXMsIHR5cGUpIHtcbiAgICAvLyBjbGVhciB0aGUgcHJldmlvdXMgdHJhbnNpdGlvbiBpZiBleGlzdHMgdG8gYXZvaWQgY2FjaGluZyB0aGUgd3Jvbmcgc3R5bGVzXG4gICAgaWYgKGVsLl9feF90cmFuc2l0aW9uKSB7XG4gICAgICBlbC5fX3hfdHJhbnNpdGlvbi5jYW5jZWwgJiYgZWwuX194X3RyYW5zaXRpb24uY2FuY2VsKCk7XG4gICAgfSAvLyBJZiB0aGUgdXNlciBzZXQgdGhlc2Ugc3R5bGUgdmFsdWVzLCB3ZSdsbCBwdXQgdGhlbSBiYWNrIHdoZW4gd2UncmUgZG9uZSB3aXRoIHRoZW0uXG5cblxuICAgIGNvbnN0IG9wYWNpdHlDYWNoZSA9IGVsLnN0eWxlLm9wYWNpdHk7XG4gICAgY29uc3QgdHJhbnNmb3JtQ2FjaGUgPSBlbC5zdHlsZS50cmFuc2Zvcm07XG4gICAgY29uc3QgdHJhbnNmb3JtT3JpZ2luQ2FjaGUgPSBlbC5zdHlsZS50cmFuc2Zvcm1PcmlnaW47IC8vIElmIG5vIG1vZGlmaWVycyBhcmUgcHJlc2VudDogeC1zaG93LnRyYW5zaXRpb24sIHdlJ2xsIGRlZmF1bHQgdG8gYm90aCBvcGFjaXR5IGFuZCBzY2FsZS5cblxuICAgIGNvbnN0IG5vTW9kaWZpZXJzID0gIW1vZGlmaWVycy5pbmNsdWRlcygnb3BhY2l0eScpICYmICFtb2RpZmllcnMuaW5jbHVkZXMoJ3NjYWxlJyk7XG4gICAgY29uc3QgdHJhbnNpdGlvbk9wYWNpdHkgPSBub01vZGlmaWVycyB8fCBtb2RpZmllcnMuaW5jbHVkZXMoJ29wYWNpdHknKTtcbiAgICBjb25zdCB0cmFuc2l0aW9uU2NhbGUgPSBub01vZGlmaWVycyB8fCBtb2RpZmllcnMuaW5jbHVkZXMoJ3NjYWxlJyk7IC8vIFRoZXNlIGFyZSB0aGUgZXhwbGljaXQgc3RhZ2VzIG9mIGEgdHJhbnNpdGlvbiAoc2FtZSBzdGFnZXMgZm9yIGluIGFuZCBmb3Igb3V0KS5cbiAgICAvLyBUaGlzIHdheSB5b3UgY2FuIGdldCBhIGJpcmRzIGV5ZSB2aWV3IG9mIHRoZSBob29rcywgYW5kIHRoZSBkaWZmZXJlbmNlc1xuICAgIC8vIGJldHdlZW4gdGhlbS5cblxuICAgIGNvbnN0IHN0YWdlcyA9IHtcbiAgICAgIHN0YXJ0KCkge1xuICAgICAgICBpZiAodHJhbnNpdGlvbk9wYWNpdHkpIGVsLnN0eWxlLm9wYWNpdHkgPSBzdHlsZVZhbHVlcy5maXJzdC5vcGFjaXR5O1xuICAgICAgICBpZiAodHJhbnNpdGlvblNjYWxlKSBlbC5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGUoJHtzdHlsZVZhbHVlcy5maXJzdC5zY2FsZSAvIDEwMH0pYDtcbiAgICAgIH0sXG5cbiAgICAgIGR1cmluZygpIHtcbiAgICAgICAgaWYgKHRyYW5zaXRpb25TY2FsZSkgZWwuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gc3R5bGVWYWx1ZXMub3JpZ2luO1xuICAgICAgICBlbC5zdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgPSBbdHJhbnNpdGlvbk9wYWNpdHkgPyBgb3BhY2l0eWAgOiBgYCwgdHJhbnNpdGlvblNjYWxlID8gYHRyYW5zZm9ybWAgOiBgYF0uam9pbignICcpLnRyaW0oKTtcbiAgICAgICAgZWwuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gYCR7c3R5bGVWYWx1ZXMuZHVyYXRpb24gLyAxMDAwfXNgO1xuICAgICAgICBlbC5zdHlsZS50cmFuc2l0aW9uVGltaW5nRnVuY3Rpb24gPSBgY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpYDtcbiAgICAgIH0sXG5cbiAgICAgIHNob3coKSB7XG4gICAgICAgIGhvb2sxKCk7XG4gICAgICB9LFxuXG4gICAgICBlbmQoKSB7XG4gICAgICAgIGlmICh0cmFuc2l0aW9uT3BhY2l0eSkgZWwuc3R5bGUub3BhY2l0eSA9IHN0eWxlVmFsdWVzLnNlY29uZC5vcGFjaXR5O1xuICAgICAgICBpZiAodHJhbnNpdGlvblNjYWxlKSBlbC5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGUoJHtzdHlsZVZhbHVlcy5zZWNvbmQuc2NhbGUgLyAxMDB9KWA7XG4gICAgICB9LFxuXG4gICAgICBoaWRlKCkge1xuICAgICAgICBob29rMigpO1xuICAgICAgfSxcblxuICAgICAgY2xlYW51cCgpIHtcbiAgICAgICAgaWYgKHRyYW5zaXRpb25PcGFjaXR5KSBlbC5zdHlsZS5vcGFjaXR5ID0gb3BhY2l0eUNhY2hlO1xuICAgICAgICBpZiAodHJhbnNpdGlvblNjYWxlKSBlbC5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1DYWNoZTtcbiAgICAgICAgaWYgKHRyYW5zaXRpb25TY2FsZSkgZWwuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gdHJhbnNmb3JtT3JpZ2luQ2FjaGU7XG4gICAgICAgIGVsLnN0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eSA9IG51bGw7XG4gICAgICAgIGVsLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IG51bGw7XG4gICAgICAgIGVsLnN0eWxlLnRyYW5zaXRpb25UaW1pbmdGdW5jdGlvbiA9IG51bGw7XG4gICAgICB9XG5cbiAgICB9O1xuICAgIHRyYW5zaXRpb24oZWwsIHN0YWdlcywgdHlwZSwgcmVqZWN0KTtcbiAgfVxuXG4gIGNvbnN0IGVuc3VyZVN0cmluZ0V4cHJlc3Npb24gPSAoZXhwcmVzc2lvbiwgZWwsIGNvbXBvbmVudCkgPT4ge1xuICAgIHJldHVybiB0eXBlb2YgZXhwcmVzc2lvbiA9PT0gJ2Z1bmN0aW9uJyA/IGNvbXBvbmVudC5ldmFsdWF0ZVJldHVybkV4cHJlc3Npb24oZWwsIGV4cHJlc3Npb24pIDogZXhwcmVzc2lvbjtcbiAgfTtcblxuICBmdW5jdGlvbiB0cmFuc2l0aW9uQ2xhc3Nlc0luKGVsLCBjb21wb25lbnQsIGRpcmVjdGl2ZXMsIHNob3dDYWxsYmFjaywgcmVqZWN0KSB7XG4gICAgY29uc3QgZW50ZXIgPSBjb252ZXJ0Q2xhc3NTdHJpbmdUb0FycmF5KGVuc3VyZVN0cmluZ0V4cHJlc3Npb24oKGRpcmVjdGl2ZXMuZmluZChpID0+IGkudmFsdWUgPT09ICdlbnRlcicpIHx8IHtcbiAgICAgIGV4cHJlc3Npb246ICcnXG4gICAgfSkuZXhwcmVzc2lvbiwgZWwsIGNvbXBvbmVudCkpO1xuICAgIGNvbnN0IGVudGVyU3RhcnQgPSBjb252ZXJ0Q2xhc3NTdHJpbmdUb0FycmF5KGVuc3VyZVN0cmluZ0V4cHJlc3Npb24oKGRpcmVjdGl2ZXMuZmluZChpID0+IGkudmFsdWUgPT09ICdlbnRlci1zdGFydCcpIHx8IHtcbiAgICAgIGV4cHJlc3Npb246ICcnXG4gICAgfSkuZXhwcmVzc2lvbiwgZWwsIGNvbXBvbmVudCkpO1xuICAgIGNvbnN0IGVudGVyRW5kID0gY29udmVydENsYXNzU3RyaW5nVG9BcnJheShlbnN1cmVTdHJpbmdFeHByZXNzaW9uKChkaXJlY3RpdmVzLmZpbmQoaSA9PiBpLnZhbHVlID09PSAnZW50ZXItZW5kJykgfHwge1xuICAgICAgZXhwcmVzc2lvbjogJydcbiAgICB9KS5leHByZXNzaW9uLCBlbCwgY29tcG9uZW50KSk7XG4gICAgdHJhbnNpdGlvbkNsYXNzZXMoZWwsIGVudGVyLCBlbnRlclN0YXJ0LCBlbnRlckVuZCwgc2hvd0NhbGxiYWNrLCAoKSA9PiB7fSwgVFJBTlNJVElPTl9UWVBFX0lOLCByZWplY3QpO1xuICB9XG4gIGZ1bmN0aW9uIHRyYW5zaXRpb25DbGFzc2VzT3V0KGVsLCBjb21wb25lbnQsIGRpcmVjdGl2ZXMsIGhpZGVDYWxsYmFjaywgcmVqZWN0KSB7XG4gICAgY29uc3QgbGVhdmUgPSBjb252ZXJ0Q2xhc3NTdHJpbmdUb0FycmF5KGVuc3VyZVN0cmluZ0V4cHJlc3Npb24oKGRpcmVjdGl2ZXMuZmluZChpID0+IGkudmFsdWUgPT09ICdsZWF2ZScpIHx8IHtcbiAgICAgIGV4cHJlc3Npb246ICcnXG4gICAgfSkuZXhwcmVzc2lvbiwgZWwsIGNvbXBvbmVudCkpO1xuICAgIGNvbnN0IGxlYXZlU3RhcnQgPSBjb252ZXJ0Q2xhc3NTdHJpbmdUb0FycmF5KGVuc3VyZVN0cmluZ0V4cHJlc3Npb24oKGRpcmVjdGl2ZXMuZmluZChpID0+IGkudmFsdWUgPT09ICdsZWF2ZS1zdGFydCcpIHx8IHtcbiAgICAgIGV4cHJlc3Npb246ICcnXG4gICAgfSkuZXhwcmVzc2lvbiwgZWwsIGNvbXBvbmVudCkpO1xuICAgIGNvbnN0IGxlYXZlRW5kID0gY29udmVydENsYXNzU3RyaW5nVG9BcnJheShlbnN1cmVTdHJpbmdFeHByZXNzaW9uKChkaXJlY3RpdmVzLmZpbmQoaSA9PiBpLnZhbHVlID09PSAnbGVhdmUtZW5kJykgfHwge1xuICAgICAgZXhwcmVzc2lvbjogJydcbiAgICB9KS5leHByZXNzaW9uLCBlbCwgY29tcG9uZW50KSk7XG4gICAgdHJhbnNpdGlvbkNsYXNzZXMoZWwsIGxlYXZlLCBsZWF2ZVN0YXJ0LCBsZWF2ZUVuZCwgKCkgPT4ge30sIGhpZGVDYWxsYmFjaywgVFJBTlNJVElPTl9UWVBFX09VVCwgcmVqZWN0KTtcbiAgfVxuICBmdW5jdGlvbiB0cmFuc2l0aW9uQ2xhc3NlcyhlbCwgY2xhc3Nlc0R1cmluZywgY2xhc3Nlc1N0YXJ0LCBjbGFzc2VzRW5kLCBob29rMSwgaG9vazIsIHR5cGUsIHJlamVjdCkge1xuICAgIC8vIGNsZWFyIHRoZSBwcmV2aW91cyB0cmFuc2l0aW9uIGlmIGV4aXN0cyB0byBhdm9pZCBjYWNoaW5nIHRoZSB3cm9uZyBjbGFzc2VzXG4gICAgaWYgKGVsLl9feF90cmFuc2l0aW9uKSB7XG4gICAgICBlbC5fX3hfdHJhbnNpdGlvbi5jYW5jZWwgJiYgZWwuX194X3RyYW5zaXRpb24uY2FuY2VsKCk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3JpZ2luYWxDbGFzc2VzID0gZWwuX194X29yaWdpbmFsX2NsYXNzZXMgfHwgW107XG4gICAgY29uc3Qgc3RhZ2VzID0ge1xuICAgICAgc3RhcnQoKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlc1N0YXJ0KTtcbiAgICAgIH0sXG5cbiAgICAgIGR1cmluZygpIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzRHVyaW5nKTtcbiAgICAgIH0sXG5cbiAgICAgIHNob3coKSB7XG4gICAgICAgIGhvb2sxKCk7XG4gICAgICB9LFxuXG4gICAgICBlbmQoKSB7XG4gICAgICAgIC8vIERvbid0IHJlbW92ZSBjbGFzc2VzIHRoYXQgd2VyZSBpbiB0aGUgb3JpZ2luYWwgY2xhc3MgYXR0cmlidXRlLlxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKC4uLmNsYXNzZXNTdGFydC5maWx0ZXIoaSA9PiAhb3JpZ2luYWxDbGFzc2VzLmluY2x1ZGVzKGkpKSk7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlc0VuZCk7XG4gICAgICB9LFxuXG4gICAgICBoaWRlKCkge1xuICAgICAgICBob29rMigpO1xuICAgICAgfSxcblxuICAgICAgY2xlYW51cCgpIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSguLi5jbGFzc2VzRHVyaW5nLmZpbHRlcihpID0+ICFvcmlnaW5hbENsYXNzZXMuaW5jbHVkZXMoaSkpKTtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSguLi5jbGFzc2VzRW5kLmZpbHRlcihpID0+ICFvcmlnaW5hbENsYXNzZXMuaW5jbHVkZXMoaSkpKTtcbiAgICAgIH1cblxuICAgIH07XG4gICAgdHJhbnNpdGlvbihlbCwgc3RhZ2VzLCB0eXBlLCByZWplY3QpO1xuICB9XG4gIGZ1bmN0aW9uIHRyYW5zaXRpb24oZWwsIHN0YWdlcywgdHlwZSwgcmVqZWN0KSB7XG4gICAgY29uc3QgZmluaXNoID0gb25jZSgoKSA9PiB7XG4gICAgICBzdGFnZXMuaGlkZSgpOyAvLyBBZGRpbmcgYW4gXCJpc0Nvbm5lY3RlZFwiIGNoZWNrLCBpbiBjYXNlIHRoZSBjYWxsYmFja1xuICAgICAgLy8gcmVtb3ZlZCB0aGUgZWxlbWVudCBmcm9tIHRoZSBET00uXG5cbiAgICAgIGlmIChlbC5pc0Nvbm5lY3RlZCkge1xuICAgICAgICBzdGFnZXMuY2xlYW51cCgpO1xuICAgICAgfVxuXG4gICAgICBkZWxldGUgZWwuX194X3RyYW5zaXRpb247XG4gICAgfSk7XG4gICAgZWwuX194X3RyYW5zaXRpb24gPSB7XG4gICAgICAvLyBTZXQgdHJhbnNpdGlvbiB0eXBlIHNvIHdlIGNhbiBhdm9pZCBjbGVhcmluZyB0cmFuc2l0aW9uIGlmIHRoZSBkaXJlY3Rpb24gaXMgdGhlIHNhbWVcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAvLyBjcmVhdGUgYSBjYWxsYmFjayBmb3IgdGhlIGxhc3Qgc3RhZ2VzIG9mIHRoZSB0cmFuc2l0aW9uIHNvIHdlIGNhbiBjYWxsIGl0XG4gICAgICAvLyBmcm9tIGRpZmZlcmVudCBwb2ludCBhbmQgZWFybHkgdGVybWluYXRlIGl0LiBPbmNlIHdpbGwgZW5zdXJlIHRoYXQgZnVuY3Rpb25cbiAgICAgIC8vIGlzIG9ubHkgY2FsbGVkIG9uZSB0aW1lLlxuICAgICAgY2FuY2VsOiBvbmNlKCgpID0+IHtcbiAgICAgICAgcmVqZWN0KFRSQU5TSVRJT05fQ0FOQ0VMTEVEKTtcbiAgICAgICAgZmluaXNoKCk7XG4gICAgICB9KSxcbiAgICAgIGZpbmlzaCxcbiAgICAgIC8vIFRoaXMgc3RvcmUgdGhlIG5leHQgYW5pbWF0aW9uIGZyYW1lIHNvIHdlIGNhbiBjYW5jZWwgaXRcbiAgICAgIG5leHRGcmFtZTogbnVsbFxuICAgIH07XG4gICAgc3RhZ2VzLnN0YXJ0KCk7XG4gICAgc3RhZ2VzLmR1cmluZygpO1xuICAgIGVsLl9feF90cmFuc2l0aW9uLm5leHRGcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAvLyBOb3RlOiBTYWZhcmkncyB0cmFuc2l0aW9uRHVyYXRpb24gcHJvcGVydHkgd2lsbCBsaXN0IG91dCBjb21tYSBzZXBhcmF0ZWQgdHJhbnNpdGlvbiBkdXJhdGlvbnNcbiAgICAgIC8vIGZvciBldmVyeSBzaW5nbGUgdHJhbnNpdGlvbiBwcm9wZXJ0eS4gTGV0J3MgZ3JhYiB0aGUgZmlyc3Qgb25lIGFuZCBjYWxsIGl0IGEgZGF5LlxuICAgICAgbGV0IGR1cmF0aW9uID0gTnVtYmVyKGdldENvbXB1dGVkU3R5bGUoZWwpLnRyYW5zaXRpb25EdXJhdGlvbi5yZXBsYWNlKC8sLiovLCAnJykucmVwbGFjZSgncycsICcnKSkgKiAxMDAwO1xuXG4gICAgICBpZiAoZHVyYXRpb24gPT09IDApIHtcbiAgICAgICAgZHVyYXRpb24gPSBOdW1iZXIoZ2V0Q29tcHV0ZWRTdHlsZShlbCkuYW5pbWF0aW9uRHVyYXRpb24ucmVwbGFjZSgncycsICcnKSkgKiAxMDAwO1xuICAgICAgfVxuXG4gICAgICBzdGFnZXMuc2hvdygpO1xuICAgICAgZWwuX194X3RyYW5zaXRpb24ubmV4dEZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgc3RhZ2VzLmVuZCgpO1xuICAgICAgICBzZXRUaW1lb3V0KGVsLl9feF90cmFuc2l0aW9uLmZpbmlzaCwgZHVyYXRpb24pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gaXNOdW1lcmljKHN1YmplY3QpIHtcbiAgICByZXR1cm4gIUFycmF5LmlzQXJyYXkoc3ViamVjdCkgJiYgIWlzTmFOKHN1YmplY3QpO1xuICB9IC8vIFRoYW5rcyBAdnVlanNcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Z1ZWpzL3Z1ZS9ibG9iLzRkZTQ2NDlkOTYzNzI2MmE5YjAwNzcyMGI1OWY4MGFjNzJhNTYyMGMvc3JjL3NoYXJlZC91dGlsLmpzXG5cbiAgZnVuY3Rpb24gb25jZShjYWxsYmFjaykge1xuICAgIGxldCBjYWxsZWQgPSBmYWxzZTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFjYWxsZWQpIHtcbiAgICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlRm9yRGlyZWN0aXZlKGNvbXBvbmVudCwgdGVtcGxhdGVFbCwgZXhwcmVzc2lvbiwgaW5pdGlhbFVwZGF0ZSwgZXh0cmFWYXJzKSB7XG4gICAgd2FybklmTWFsZm9ybWVkVGVtcGxhdGUodGVtcGxhdGVFbCwgJ3gtZm9yJyk7XG4gICAgbGV0IGl0ZXJhdG9yTmFtZXMgPSB0eXBlb2YgZXhwcmVzc2lvbiA9PT0gJ2Z1bmN0aW9uJyA/IHBhcnNlRm9yRXhwcmVzc2lvbihjb21wb25lbnQuZXZhbHVhdGVSZXR1cm5FeHByZXNzaW9uKHRlbXBsYXRlRWwsIGV4cHJlc3Npb24pKSA6IHBhcnNlRm9yRXhwcmVzc2lvbihleHByZXNzaW9uKTtcbiAgICBsZXQgaXRlbXMgPSBldmFsdWF0ZUl0ZW1zQW5kUmV0dXJuRW1wdHlJZlhJZklzUHJlc2VudEFuZEZhbHNlT25FbGVtZW50KGNvbXBvbmVudCwgdGVtcGxhdGVFbCwgaXRlcmF0b3JOYW1lcywgZXh0cmFWYXJzKTsgLy8gQXMgd2Ugd2FsayB0aGUgYXJyYXksIHdlJ2xsIGFsc28gd2FsayB0aGUgRE9NICh1cGRhdGluZy9jcmVhdGluZyBhcyB3ZSBnbykuXG5cbiAgICBsZXQgY3VycmVudEVsID0gdGVtcGxhdGVFbDtcbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgbGV0IGl0ZXJhdGlvblNjb3BlVmFyaWFibGVzID0gZ2V0SXRlcmF0aW9uU2NvcGVWYXJpYWJsZXMoaXRlcmF0b3JOYW1lcywgaXRlbSwgaW5kZXgsIGl0ZW1zLCBleHRyYVZhcnMoKSk7XG4gICAgICBsZXQgY3VycmVudEtleSA9IGdlbmVyYXRlS2V5Rm9ySXRlcmF0aW9uKGNvbXBvbmVudCwgdGVtcGxhdGVFbCwgaW5kZXgsIGl0ZXJhdGlvblNjb3BlVmFyaWFibGVzKTtcbiAgICAgIGxldCBuZXh0RWwgPSBsb29rQWhlYWRGb3JNYXRjaGluZ0tleWVkRWxlbWVudEFuZE1vdmVJdElmRm91bmQoY3VycmVudEVsLm5leHRFbGVtZW50U2libGluZywgY3VycmVudEtleSk7IC8vIElmIHdlIGhhdmVuJ3QgZm91bmQgYSBtYXRjaGluZyBrZXksIGluc2VydCB0aGUgZWxlbWVudCBhdCB0aGUgY3VycmVudCBwb3NpdGlvbi5cblxuICAgICAgaWYgKCFuZXh0RWwpIHtcbiAgICAgICAgbmV4dEVsID0gYWRkRWxlbWVudEluTG9vcEFmdGVyQ3VycmVudEVsKHRlbXBsYXRlRWwsIGN1cnJlbnRFbCk7IC8vIEFuZCB0cmFuc2l0aW9uIGl0IGluIGlmIGl0J3Mgbm90IHRoZSBmaXJzdCBwYWdlIGxvYWQuXG5cbiAgICAgICAgdHJhbnNpdGlvbkluKG5leHRFbCwgKCkgPT4ge30sICgpID0+IHt9LCBjb21wb25lbnQsIGluaXRpYWxVcGRhdGUpO1xuICAgICAgICBuZXh0RWwuX194X2ZvciA9IGl0ZXJhdGlvblNjb3BlVmFyaWFibGVzO1xuICAgICAgICBjb21wb25lbnQuaW5pdGlhbGl6ZUVsZW1lbnRzKG5leHRFbCwgKCkgPT4gbmV4dEVsLl9feF9mb3IpOyAvLyBPdGhlcndpc2UgdXBkYXRlIHRoZSBlbGVtZW50IHdlIGZvdW5kLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVGVtcG9yYXJpbHkgcmVtb3ZlIHRoZSBrZXkgaW5kaWNhdG9yIHRvIGFsbG93IHRoZSBub3JtYWwgXCJ1cGRhdGVFbGVtZW50c1wiIHRvIHdvcmsuXG4gICAgICAgIGRlbGV0ZSBuZXh0RWwuX194X2Zvcl9rZXk7XG4gICAgICAgIG5leHRFbC5fX3hfZm9yID0gaXRlcmF0aW9uU2NvcGVWYXJpYWJsZXM7XG4gICAgICAgIGNvbXBvbmVudC51cGRhdGVFbGVtZW50cyhuZXh0RWwsICgpID0+IG5leHRFbC5fX3hfZm9yKTtcbiAgICAgIH1cblxuICAgICAgY3VycmVudEVsID0gbmV4dEVsO1xuICAgICAgY3VycmVudEVsLl9feF9mb3Jfa2V5ID0gY3VycmVudEtleTtcbiAgICB9KTtcbiAgICByZW1vdmVBbnlMZWZ0T3ZlckVsZW1lbnRzRnJvbVByZXZpb3VzVXBkYXRlKGN1cnJlbnRFbCwgY29tcG9uZW50KTtcbiAgfSAvLyBUaGlzIHdhcyB0YWtlbiBmcm9tIFZ1ZUpTIDIuKiBjb3JlLiBUaGFua3MgVnVlIVxuXG4gIGZ1bmN0aW9uIHBhcnNlRm9yRXhwcmVzc2lvbihleHByZXNzaW9uKSB7XG4gICAgbGV0IGZvckl0ZXJhdG9yUkUgPSAvLChbXixcXH1cXF1dKikoPzosKFteLFxcfVxcXV0qKSk/JC87XG4gICAgbGV0IHN0cmlwUGFyZW5zUkUgPSAvXlxcKHxcXCkkL2c7XG4gICAgbGV0IGZvckFsaWFzUkUgPSAvKFtcXHNcXFNdKj8pXFxzKyg/OmlufG9mKVxccysoW1xcc1xcU10qKS87XG4gICAgbGV0IGluTWF0Y2ggPSBTdHJpbmcoZXhwcmVzc2lvbikubWF0Y2goZm9yQWxpYXNSRSk7XG4gICAgaWYgKCFpbk1hdGNoKSByZXR1cm47XG4gICAgbGV0IHJlcyA9IHt9O1xuICAgIHJlcy5pdGVtcyA9IGluTWF0Y2hbMl0udHJpbSgpO1xuICAgIGxldCBpdGVtID0gaW5NYXRjaFsxXS50cmltKCkucmVwbGFjZShzdHJpcFBhcmVuc1JFLCAnJyk7XG4gICAgbGV0IGl0ZXJhdG9yTWF0Y2ggPSBpdGVtLm1hdGNoKGZvckl0ZXJhdG9yUkUpO1xuXG4gICAgaWYgKGl0ZXJhdG9yTWF0Y2gpIHtcbiAgICAgIHJlcy5pdGVtID0gaXRlbS5yZXBsYWNlKGZvckl0ZXJhdG9yUkUsICcnKS50cmltKCk7XG4gICAgICByZXMuaW5kZXggPSBpdGVyYXRvck1hdGNoWzFdLnRyaW0oKTtcblxuICAgICAgaWYgKGl0ZXJhdG9yTWF0Y2hbMl0pIHtcbiAgICAgICAgcmVzLmNvbGxlY3Rpb24gPSBpdGVyYXRvck1hdGNoWzJdLnRyaW0oKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVzLml0ZW0gPSBpdGVtO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRJdGVyYXRpb25TY29wZVZhcmlhYmxlcyhpdGVyYXRvck5hbWVzLCBpdGVtLCBpbmRleCwgaXRlbXMsIGV4dHJhVmFycykge1xuICAgIC8vIFdlIG11c3QgY3JlYXRlIGEgbmV3IG9iamVjdCwgc28gZWFjaCBpdGVyYXRpb24gaGFzIGEgbmV3IHNjb3BlXG4gICAgbGV0IHNjb3BlVmFyaWFibGVzID0gZXh0cmFWYXJzID8gX29iamVjdFNwcmVhZDIoe30sIGV4dHJhVmFycykgOiB7fTtcbiAgICBzY29wZVZhcmlhYmxlc1tpdGVyYXRvck5hbWVzLml0ZW1dID0gaXRlbTtcbiAgICBpZiAoaXRlcmF0b3JOYW1lcy5pbmRleCkgc2NvcGVWYXJpYWJsZXNbaXRlcmF0b3JOYW1lcy5pbmRleF0gPSBpbmRleDtcbiAgICBpZiAoaXRlcmF0b3JOYW1lcy5jb2xsZWN0aW9uKSBzY29wZVZhcmlhYmxlc1tpdGVyYXRvck5hbWVzLmNvbGxlY3Rpb25dID0gaXRlbXM7XG4gICAgcmV0dXJuIHNjb3BlVmFyaWFibGVzO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVLZXlGb3JJdGVyYXRpb24oY29tcG9uZW50LCBlbCwgaW5kZXgsIGl0ZXJhdGlvblNjb3BlVmFyaWFibGVzKSB7XG4gICAgbGV0IGJpbmRLZXlBdHRyaWJ1dGUgPSBnZXRYQXR0cnMoZWwsIGNvbXBvbmVudCwgJ2JpbmQnKS5maWx0ZXIoYXR0ciA9PiBhdHRyLnZhbHVlID09PSAna2V5JylbMF07IC8vIElmIHRoZSBkZXYgaGFzbid0IHNwZWNpZmllZCBhIGtleSwganVzdCByZXR1cm4gdGhlIGluZGV4IG9mIHRoZSBpdGVyYXRpb24uXG5cbiAgICBpZiAoIWJpbmRLZXlBdHRyaWJ1dGUpIHJldHVybiBpbmRleDtcbiAgICByZXR1cm4gY29tcG9uZW50LmV2YWx1YXRlUmV0dXJuRXhwcmVzc2lvbihlbCwgYmluZEtleUF0dHJpYnV0ZS5leHByZXNzaW9uLCAoKSA9PiBpdGVyYXRpb25TY29wZVZhcmlhYmxlcyk7XG4gIH1cblxuICBmdW5jdGlvbiBldmFsdWF0ZUl0ZW1zQW5kUmV0dXJuRW1wdHlJZlhJZklzUHJlc2VudEFuZEZhbHNlT25FbGVtZW50KGNvbXBvbmVudCwgZWwsIGl0ZXJhdG9yTmFtZXMsIGV4dHJhVmFycykge1xuICAgIGxldCBpZkF0dHJpYnV0ZSA9IGdldFhBdHRycyhlbCwgY29tcG9uZW50LCAnaWYnKVswXTtcblxuICAgIGlmIChpZkF0dHJpYnV0ZSAmJiAhY29tcG9uZW50LmV2YWx1YXRlUmV0dXJuRXhwcmVzc2lvbihlbCwgaWZBdHRyaWJ1dGUuZXhwcmVzc2lvbikpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBsZXQgaXRlbXMgPSBjb21wb25lbnQuZXZhbHVhdGVSZXR1cm5FeHByZXNzaW9uKGVsLCBpdGVyYXRvck5hbWVzLml0ZW1zLCBleHRyYVZhcnMpOyAvLyBUaGlzIGFkZHMgc3VwcG9ydCBmb3IgdGhlIGBpIGluIG5gIHN5bnRheC5cblxuICAgIGlmIChpc051bWVyaWMoaXRlbXMpICYmIGl0ZW1zID49IDApIHtcbiAgICAgIGl0ZW1zID0gQXJyYXkuZnJvbShBcnJheShpdGVtcykua2V5cygpLCBpID0+IGkgKyAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXRlbXM7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRFbGVtZW50SW5Mb29wQWZ0ZXJDdXJyZW50RWwodGVtcGxhdGVFbCwgY3VycmVudEVsKSB7XG4gICAgbGV0IGNsb25lID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0ZW1wbGF0ZUVsLmNvbnRlbnQsIHRydWUpO1xuICAgIGN1cnJlbnRFbC5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShjbG9uZSwgY3VycmVudEVsLm5leHRFbGVtZW50U2libGluZyk7XG4gICAgcmV0dXJuIGN1cnJlbnRFbC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBsb29rQWhlYWRGb3JNYXRjaGluZ0tleWVkRWxlbWVudEFuZE1vdmVJdElmRm91bmQobmV4dEVsLCBjdXJyZW50S2V5KSB7XG4gICAgaWYgKCFuZXh0RWwpIHJldHVybjsgLy8gSWYgd2UgYXJlIGFscmVhZHkgcGFzdCB0aGUgeC1mb3IgZ2VuZXJhdGVkIGVsZW1lbnRzLCB3ZSBkb24ndCBuZWVkIHRvIGxvb2sgYWhlYWQuXG5cbiAgICBpZiAobmV4dEVsLl9feF9mb3Jfa2V5ID09PSB1bmRlZmluZWQpIHJldHVybjsgLy8gSWYgdGhlIHRoZSBrZXkncyBETyBtYXRjaCwgbm8gbmVlZCB0byBsb29rIGFoZWFkLlxuXG4gICAgaWYgKG5leHRFbC5fX3hfZm9yX2tleSA9PT0gY3VycmVudEtleSkgcmV0dXJuIG5leHRFbDsgLy8gSWYgdGhleSBkb24ndCwgd2UnbGwgbG9vayBhaGVhZCBmb3IgYSBtYXRjaC5cbiAgICAvLyBJZiB3ZSBmaW5kIGl0LCB3ZSdsbCBtb3ZlIGl0IHRvIHRoZSBjdXJyZW50IHBvc2l0aW9uIGluIHRoZSBsb29wLlxuXG4gICAgbGV0IHRtcE5leHRFbCA9IG5leHRFbDtcblxuICAgIHdoaWxlICh0bXBOZXh0RWwpIHtcbiAgICAgIGlmICh0bXBOZXh0RWwuX194X2Zvcl9rZXkgPT09IGN1cnJlbnRLZXkpIHtcbiAgICAgICAgcmV0dXJuIHRtcE5leHRFbC5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZSh0bXBOZXh0RWwsIG5leHRFbCk7XG4gICAgICB9XG5cbiAgICAgIHRtcE5leHRFbCA9IHRtcE5leHRFbC5uZXh0RWxlbWVudFNpYmxpbmcgJiYgdG1wTmV4dEVsLm5leHRFbGVtZW50U2libGluZy5fX3hfZm9yX2tleSAhPT0gdW5kZWZpbmVkID8gdG1wTmV4dEVsLm5leHRFbGVtZW50U2libGluZyA6IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUFueUxlZnRPdmVyRWxlbWVudHNGcm9tUHJldmlvdXNVcGRhdGUoY3VycmVudEVsLCBjb21wb25lbnQpIHtcbiAgICB2YXIgbmV4dEVsZW1lbnRGcm9tT2xkTG9vcCA9IGN1cnJlbnRFbC5uZXh0RWxlbWVudFNpYmxpbmcgJiYgY3VycmVudEVsLm5leHRFbGVtZW50U2libGluZy5fX3hfZm9yX2tleSAhPT0gdW5kZWZpbmVkID8gY3VycmVudEVsLm5leHRFbGVtZW50U2libGluZyA6IGZhbHNlO1xuXG4gICAgd2hpbGUgKG5leHRFbGVtZW50RnJvbU9sZExvb3ApIHtcbiAgICAgIGxldCBuZXh0RWxlbWVudEZyb21PbGRMb29wSW1tdXRhYmxlID0gbmV4dEVsZW1lbnRGcm9tT2xkTG9vcDtcbiAgICAgIGxldCBuZXh0U2libGluZyA9IG5leHRFbGVtZW50RnJvbU9sZExvb3AubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgdHJhbnNpdGlvbk91dChuZXh0RWxlbWVudEZyb21PbGRMb29wLCAoKSA9PiB7XG4gICAgICAgIG5leHRFbGVtZW50RnJvbU9sZExvb3BJbW11dGFibGUucmVtb3ZlKCk7XG4gICAgICB9LCAoKSA9PiB7fSwgY29tcG9uZW50KTtcbiAgICAgIG5leHRFbGVtZW50RnJvbU9sZExvb3AgPSBuZXh0U2libGluZyAmJiBuZXh0U2libGluZy5fX3hfZm9yX2tleSAhPT0gdW5kZWZpbmVkID8gbmV4dFNpYmxpbmcgOiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVBdHRyaWJ1dGVCaW5kaW5nRGlyZWN0aXZlKGNvbXBvbmVudCwgZWwsIGF0dHJOYW1lLCBleHByZXNzaW9uLCBleHRyYVZhcnMsIGF0dHJUeXBlLCBtb2RpZmllcnMpIHtcbiAgICB2YXIgdmFsdWUgPSBjb21wb25lbnQuZXZhbHVhdGVSZXR1cm5FeHByZXNzaW9uKGVsLCBleHByZXNzaW9uLCBleHRyYVZhcnMpO1xuXG4gICAgaWYgKGF0dHJOYW1lID09PSAndmFsdWUnKSB7XG4gICAgICBpZiAoQWxwaW5lLmlnbm9yZUZvY3VzZWRGb3JWYWx1ZUJpbmRpbmcgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5pc1NhbWVOb2RlKGVsKSkgcmV0dXJuOyAvLyBJZiBuZXN0ZWQgbW9kZWwga2V5IGlzIHVuZGVmaW5lZCwgc2V0IHRoZSBkZWZhdWx0IHZhbHVlIHRvIGVtcHR5IHN0cmluZy5cblxuICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgU3RyaW5nKGV4cHJlc3Npb24pLm1hdGNoKC9cXC4vKSkge1xuICAgICAgICB2YWx1ZSA9ICcnO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWwudHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgICAvLyBTZXQgcmFkaW8gdmFsdWUgZnJvbSB4LWJpbmQ6dmFsdWUsIGlmIG5vIFwidmFsdWVcIiBhdHRyaWJ1dGUgZXhpc3RzLlxuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgYW55IGluaXRpYWwgc3RhdGUgdmFsdWVzLCByYWRpbyB3aWxsIGhhdmUgYSBjb3JyZWN0XG4gICAgICAgIC8vIFwiY2hlY2tlZFwiIHZhbHVlIHNpbmNlIHgtYmluZDp2YWx1ZSBpcyBwcm9jZXNzZWQgYmVmb3JlIHgtbW9kZWwuXG4gICAgICAgIGlmIChlbC5hdHRyaWJ1dGVzLnZhbHVlID09PSB1bmRlZmluZWQgJiYgYXR0clR5cGUgPT09ICdiaW5kJykge1xuICAgICAgICAgIGVsLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAoYXR0clR5cGUgIT09ICdiaW5kJykge1xuICAgICAgICAgIGVsLmNoZWNrZWQgPSBjaGVja2VkQXR0ckxvb3NlQ29tcGFyZShlbC52YWx1ZSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGVsLnR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgLy8gSWYgd2UgYXJlIGV4cGxpY2l0bHkgYmluZGluZyBhIHN0cmluZyB0byB0aGUgOnZhbHVlLCBzZXQgdGhlIHN0cmluZyxcbiAgICAgICAgLy8gSWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbiwgbGVhdmUgaXQgYWxvbmUsIGl0IHdpbGwgYmUgc2V0IHRvIFwib25cIlxuICAgICAgICAvLyBhdXRvbWF0aWNhbGx5LlxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnYm9vbGVhbicgJiYgIVtudWxsLCB1bmRlZmluZWRdLmluY2x1ZGVzKHZhbHVlKSAmJiBhdHRyVHlwZSA9PT0gJ2JpbmQnKSB7XG4gICAgICAgICAgZWwudmFsdWUgPSBTdHJpbmcodmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGF0dHJUeXBlICE9PSAnYmluZCcpIHtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIC8vIEknbSBwdXJwb3NlbHkgbm90IHVzaW5nIEFycmF5LmluY2x1ZGVzIGhlcmUgYmVjYXVzZSBpdCdzXG4gICAgICAgICAgICAvLyBzdHJpY3QsIGFuZCBiZWNhdXNlIG9mIE51bWVyaWMvU3RyaW5nIG1pcy1jYXN0aW5nLCBJXG4gICAgICAgICAgICAvLyB3YW50IHRoZSBcImluY2x1ZGVzXCIgdG8gYmUgXCJmdXp6eVwiLlxuICAgICAgICAgICAgZWwuY2hlY2tlZCA9IHZhbHVlLnNvbWUodmFsID0+IGNoZWNrZWRBdHRyTG9vc2VDb21wYXJlKHZhbCwgZWwudmFsdWUpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWwuY2hlY2tlZCA9ICEhdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGVsLnRhZ05hbWUgPT09ICdTRUxFQ1QnKSB7XG4gICAgICAgIHVwZGF0ZVNlbGVjdChlbCwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGVsLnZhbHVlID09PSB2YWx1ZSkgcmV0dXJuO1xuICAgICAgICBlbC52YWx1ZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYXR0ck5hbWUgPT09ICdjbGFzcycpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBjb25zdCBvcmlnaW5hbENsYXNzZXMgPSBlbC5fX3hfb3JpZ2luYWxfY2xhc3NlcyB8fCBbXTtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsIGFycmF5VW5pcXVlKG9yaWdpbmFsQ2xhc3Nlcy5jb25jYXQodmFsdWUpKS5qb2luKCcgJykpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIFNvcnRpbmcgdGhlIGtleXMgLyBjbGFzcyBuYW1lcyBieSB0aGVpciBib29sZWFuIHZhbHVlIHdpbGwgZW5zdXJlIHRoYXRcbiAgICAgICAgLy8gYW55dGhpbmcgdGhhdCBldmFsdWF0ZXMgdG8gYGZhbHNlYCBhbmQgbmVlZHMgdG8gcmVtb3ZlIGNsYXNzZXMgaXMgcnVuIGZpcnN0LlxuICAgICAgICBjb25zdCBrZXlzU29ydGVkQnlCb29sZWFuVmFsdWUgPSBPYmplY3Qua2V5cyh2YWx1ZSkuc29ydCgoYSwgYikgPT4gdmFsdWVbYV0gLSB2YWx1ZVtiXSk7XG4gICAgICAgIGtleXNTb3J0ZWRCeUJvb2xlYW5WYWx1ZS5mb3JFYWNoKGNsYXNzTmFtZXMgPT4ge1xuICAgICAgICAgIGlmICh2YWx1ZVtjbGFzc05hbWVzXSkge1xuICAgICAgICAgICAgY29udmVydENsYXNzU3RyaW5nVG9BcnJheShjbGFzc05hbWVzKS5mb3JFYWNoKGNsYXNzTmFtZSA9PiBlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb252ZXJ0Q2xhc3NTdHJpbmdUb0FycmF5KGNsYXNzTmFtZXMpLmZvckVhY2goY2xhc3NOYW1lID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsQ2xhc3NlcyA9IGVsLl9feF9vcmlnaW5hbF9jbGFzc2VzIHx8IFtdO1xuICAgICAgICBjb25zdCBuZXdDbGFzc2VzID0gdmFsdWUgPyBjb252ZXJ0Q2xhc3NTdHJpbmdUb0FycmF5KHZhbHVlKSA6IFtdO1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgYXJyYXlVbmlxdWUob3JpZ2luYWxDbGFzc2VzLmNvbmNhdChuZXdDbGFzc2VzKSkuam9pbignICcpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYXR0ck5hbWUgPSBtb2RpZmllcnMuaW5jbHVkZXMoJ2NhbWVsJykgPyBjYW1lbENhc2UoYXR0ck5hbWUpIDogYXR0ck5hbWU7IC8vIElmIGFuIGF0dHJpYnV0ZSdzIGJvdW5kIHZhbHVlIGlzIG51bGwsIHVuZGVmaW5lZCBvciBmYWxzZSwgcmVtb3ZlIHRoZSBhdHRyaWJ1dGVcblxuICAgICAgaWYgKFtudWxsLCB1bmRlZmluZWQsIGZhbHNlXS5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzQm9vbGVhbkF0dHIoYXR0ck5hbWUpID8gc2V0SWZDaGFuZ2VkKGVsLCBhdHRyTmFtZSwgYXR0ck5hbWUpIDogc2V0SWZDaGFuZ2VkKGVsLCBhdHRyTmFtZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldElmQ2hhbmdlZChlbCwgYXR0ck5hbWUsIHZhbHVlKSB7XG4gICAgaWYgKGVsLmdldEF0dHJpYnV0ZShhdHRyTmFtZSkgIT0gdmFsdWUpIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVNlbGVjdChlbCwgdmFsdWUpIHtcbiAgICBjb25zdCBhcnJheVdyYXBwZWRWYWx1ZSA9IFtdLmNvbmNhdCh2YWx1ZSkubWFwKHZhbHVlID0+IHtcbiAgICAgIHJldHVybiB2YWx1ZSArICcnO1xuICAgIH0pO1xuICAgIEFycmF5LmZyb20oZWwub3B0aW9ucykuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgb3B0aW9uLnNlbGVjdGVkID0gYXJyYXlXcmFwcGVkVmFsdWUuaW5jbHVkZXMob3B0aW9uLnZhbHVlIHx8IG9wdGlvbi50ZXh0KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVRleHREaXJlY3RpdmUoZWwsIG91dHB1dCwgZXhwcmVzc2lvbikge1xuICAgIC8vIElmIG5lc3RlZCBtb2RlbCBrZXkgaXMgdW5kZWZpbmVkLCBzZXQgdGhlIGRlZmF1bHQgdmFsdWUgdG8gZW1wdHkgc3RyaW5nLlxuICAgIGlmIChvdXRwdXQgPT09IHVuZGVmaW5lZCAmJiBTdHJpbmcoZXhwcmVzc2lvbikubWF0Y2goL1xcLi8pKSB7XG4gICAgICBvdXRwdXQgPSAnJztcbiAgICB9XG5cbiAgICBlbC50ZXh0Q29udGVudCA9IG91dHB1dDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUh0bWxEaXJlY3RpdmUoY29tcG9uZW50LCBlbCwgZXhwcmVzc2lvbiwgZXh0cmFWYXJzKSB7XG4gICAgZWwuaW5uZXJIVE1MID0gY29tcG9uZW50LmV2YWx1YXRlUmV0dXJuRXhwcmVzc2lvbihlbCwgZXhwcmVzc2lvbiwgZXh0cmFWYXJzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVNob3dEaXJlY3RpdmUoY29tcG9uZW50LCBlbCwgdmFsdWUsIG1vZGlmaWVycywgaW5pdGlhbFVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgaGlkZSA9ICgpID0+IHtcbiAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICBlbC5fX3hfaXNfc2hvd24gPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2hvdyA9ICgpID0+IHtcbiAgICAgIGlmIChlbC5zdHlsZS5sZW5ndGggPT09IDEgJiYgZWwuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnKSB7XG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLnN0eWxlLnJlbW92ZVByb3BlcnR5KCdkaXNwbGF5Jyk7XG4gICAgICB9XG5cbiAgICAgIGVsLl9feF9pc19zaG93biA9IHRydWU7XG4gICAgfTtcblxuICAgIGlmIChpbml0aWFsVXBkYXRlID09PSB0cnVlKSB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgc2hvdygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGlkZSgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlID0gKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGlmIChlbC5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgfHwgZWwuX194X3RyYW5zaXRpb24pIHtcbiAgICAgICAgICB0cmFuc2l0aW9uSW4oZWwsICgpID0+IHtcbiAgICAgICAgICAgIHNob3coKTtcbiAgICAgICAgICB9LCByZWplY3QsIGNvbXBvbmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXNvbHZlKCgpID0+IHt9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChlbC5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScpIHtcbiAgICAgICAgICB0cmFuc2l0aW9uT3V0KGVsLCAoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKCgpID0+IHtcbiAgICAgICAgICAgICAgaGlkZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSwgcmVqZWN0LCBjb21wb25lbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoKCkgPT4ge30pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTsgLy8gVGhlIHdvcmtpbmcgb2YgeC1zaG93IGlzIGEgYml0IGNvbXBsZXggYmVjYXVzZSB3ZSBuZWVkIHRvXG4gICAgLy8gd2FpdCBmb3IgYW55IGNoaWxkIHRyYW5zaXRpb25zIHRvIGZpbmlzaCBiZWZvcmUgaGlkaW5nXG4gICAgLy8gc29tZSBlbGVtZW50LiBBbHNvLCB0aGlzIGhhcyB0byBiZSBkb25lIHJlY3Vyc2l2ZWx5LlxuICAgIC8vIElmIHgtc2hvdy5pbW1lZGlhdGUsIGZvcmVnb2UgdGhlIHdhaXRpbmcuXG5cblxuICAgIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoJ2ltbWVkaWF0ZScpKSB7XG4gICAgICBoYW5kbGUoZmluaXNoID0+IGZpbmlzaCgpLCAoKSA9PiB7fSk7XG4gICAgICByZXR1cm47XG4gICAgfSAvLyB4LXNob3cgaXMgZW5jb3VudGVyZWQgZHVyaW5nIGEgRE9NIHRyZWUgd2Fsay4gSWYgYW4gZWxlbWVudFxuICAgIC8vIHdlIGVuY291bnRlciBpcyBOT1QgYSBjaGlsZCBvZiBhbm90aGVyIHgtc2hvdyBlbGVtZW50IHdlXG4gICAgLy8gY2FuIGV4ZWN1dGUgdGhlIHByZXZpb3VzIHgtc2hvdyBzdGFjayAoaWYgb25lIGV4aXN0cykuXG5cblxuICAgIGlmIChjb21wb25lbnQuc2hvd0RpcmVjdGl2ZUxhc3RFbGVtZW50ICYmICFjb21wb25lbnQuc2hvd0RpcmVjdGl2ZUxhc3RFbGVtZW50LmNvbnRhaW5zKGVsKSkge1xuICAgICAgY29tcG9uZW50LmV4ZWN1dGVBbmRDbGVhclJlbWFpbmluZ1Nob3dEaXJlY3RpdmVTdGFjaygpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudC5zaG93RGlyZWN0aXZlU3RhY2sucHVzaChoYW5kbGUpO1xuICAgIGNvbXBvbmVudC5zaG93RGlyZWN0aXZlTGFzdEVsZW1lbnQgPSBlbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUlmRGlyZWN0aXZlKGNvbXBvbmVudCwgZWwsIGV4cHJlc3Npb25SZXN1bHQsIGluaXRpYWxVcGRhdGUsIGV4dHJhVmFycykge1xuICAgIHdhcm5JZk1hbGZvcm1lZFRlbXBsYXRlKGVsLCAneC1pZicpO1xuICAgIGNvbnN0IGVsZW1lbnRIYXNBbHJlYWR5QmVlbkFkZGVkID0gZWwubmV4dEVsZW1lbnRTaWJsaW5nICYmIGVsLm5leHRFbGVtZW50U2libGluZy5fX3hfaW5zZXJ0ZWRfbWUgPT09IHRydWU7XG5cbiAgICBpZiAoZXhwcmVzc2lvblJlc3VsdCAmJiAoIWVsZW1lbnRIYXNBbHJlYWR5QmVlbkFkZGVkIHx8IGVsLl9feF90cmFuc2l0aW9uKSkge1xuICAgICAgY29uc3QgY2xvbmUgPSBkb2N1bWVudC5pbXBvcnROb2RlKGVsLmNvbnRlbnQsIHRydWUpO1xuICAgICAgZWwucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUoY2xvbmUsIGVsLm5leHRFbGVtZW50U2libGluZyk7XG4gICAgICB0cmFuc2l0aW9uSW4oZWwubmV4dEVsZW1lbnRTaWJsaW5nLCAoKSA9PiB7fSwgKCkgPT4ge30sIGNvbXBvbmVudCwgaW5pdGlhbFVwZGF0ZSk7XG4gICAgICBjb21wb25lbnQuaW5pdGlhbGl6ZUVsZW1lbnRzKGVsLm5leHRFbGVtZW50U2libGluZywgZXh0cmFWYXJzKTtcbiAgICAgIGVsLm5leHRFbGVtZW50U2libGluZy5fX3hfaW5zZXJ0ZWRfbWUgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoIWV4cHJlc3Npb25SZXN1bHQgJiYgZWxlbWVudEhhc0FscmVhZHlCZWVuQWRkZWQpIHtcbiAgICAgIHRyYW5zaXRpb25PdXQoZWwubmV4dEVsZW1lbnRTaWJsaW5nLCAoKSA9PiB7XG4gICAgICAgIGVsLm5leHRFbGVtZW50U2libGluZy5yZW1vdmUoKTtcbiAgICAgIH0sICgpID0+IHt9LCBjb21wb25lbnQsIGluaXRpYWxVcGRhdGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyTGlzdGVuZXIoY29tcG9uZW50LCBlbCwgZXZlbnQsIG1vZGlmaWVycywgZXhwcmVzc2lvbiwgZXh0cmFWYXJzID0ge30pIHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgcGFzc2l2ZTogbW9kaWZpZXJzLmluY2x1ZGVzKCdwYXNzaXZlJylcbiAgICB9O1xuXG4gICAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcygnY2FtZWwnKSkge1xuICAgICAgZXZlbnQgPSBjYW1lbENhc2UoZXZlbnQpO1xuICAgIH1cblxuICAgIGxldCBoYW5kbGVyLCBsaXN0ZW5lclRhcmdldDtcblxuICAgIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoJ2F3YXknKSkge1xuICAgICAgbGlzdGVuZXJUYXJnZXQgPSBkb2N1bWVudDtcblxuICAgICAgaGFuZGxlciA9IGUgPT4ge1xuICAgICAgICAvLyBEb24ndCBkbyBhbnl0aGluZyBpZiB0aGUgY2xpY2sgY2FtZSBmcm9tIHRoZSBlbGVtZW50IG9yIHdpdGhpbiBpdC5cbiAgICAgICAgaWYgKGVsLmNvbnRhaW5zKGUudGFyZ2V0KSkgcmV0dXJuOyAvLyBEb24ndCBkbyBhbnl0aGluZyBpZiB0aGlzIGVsZW1lbnQgaXNuJ3QgY3VycmVudGx5IHZpc2libGUuXG5cbiAgICAgICAgaWYgKGVsLm9mZnNldFdpZHRoIDwgMSAmJiBlbC5vZmZzZXRIZWlnaHQgPCAxKSByZXR1cm47IC8vIE5vdyB0aGF0IHdlIGFyZSBzdXJlIHRoZSBlbGVtZW50IGlzIHZpc2libGUsIEFORCB0aGUgY2xpY2tcbiAgICAgICAgLy8gaXMgZnJvbSBvdXRzaWRlIGl0LCBsZXQncyBydW4gdGhlIGV4cHJlc3Npb24uXG5cbiAgICAgICAgcnVuTGlzdGVuZXJIYW5kbGVyKGNvbXBvbmVudCwgZXhwcmVzc2lvbiwgZSwgZXh0cmFWYXJzKTtcblxuICAgICAgICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKCdvbmNlJykpIHtcbiAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdGVuZXJUYXJnZXQgPSBtb2RpZmllcnMuaW5jbHVkZXMoJ3dpbmRvdycpID8gd2luZG93IDogbW9kaWZpZXJzLmluY2x1ZGVzKCdkb2N1bWVudCcpID8gZG9jdW1lbnQgOiBlbDtcblxuICAgICAgaGFuZGxlciA9IGUgPT4ge1xuICAgICAgICAvLyBSZW1vdmUgdGhpcyBnbG9iYWwgZXZlbnQgaGFuZGxlciBpZiB0aGUgZWxlbWVudCB0aGF0IGRlY2xhcmVkIGl0XG4gICAgICAgIC8vIGhhcyBiZWVuIHJlbW92ZWQuIEl0J3Mgbm93IHN0YWxlLlxuICAgICAgICBpZiAobGlzdGVuZXJUYXJnZXQgPT09IHdpbmRvdyB8fCBsaXN0ZW5lclRhcmdldCA9PT0gZG9jdW1lbnQpIHtcbiAgICAgICAgICBpZiAoIWRvY3VtZW50LmJvZHkuY29udGFpbnMoZWwpKSB7XG4gICAgICAgICAgICBsaXN0ZW5lclRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNLZXlFdmVudChldmVudCkpIHtcbiAgICAgICAgICBpZiAoaXNMaXN0ZW5pbmdGb3JBU3BlY2lmaWNLZXlUaGF0SGFzbnRCZWVuUHJlc3NlZChlLCBtb2RpZmllcnMpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcygncHJldmVudCcpKSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoJ3N0b3AnKSkgZS5zdG9wUHJvcGFnYXRpb24oKTsgLy8gSWYgdGhlIC5zZWxmIG1vZGlmaWVyIGlzbid0IHByZXNlbnQsIG9yIGlmIGl0IGlzIHByZXNlbnQgYW5kXG4gICAgICAgIC8vIHRoZSB0YXJnZXQgZWxlbWVudCBtYXRjaGVzIHRoZSBlbGVtZW50IHdlIGFyZSByZWdpc3RlcmluZyB0aGVcbiAgICAgICAgLy8gZXZlbnQgb24sIHJ1biB0aGUgaGFuZGxlclxuXG4gICAgICAgIGlmICghbW9kaWZpZXJzLmluY2x1ZGVzKCdzZWxmJykgfHwgZS50YXJnZXQgPT09IGVsKSB7XG4gICAgICAgICAgY29uc3QgcmV0dXJuVmFsdWUgPSBydW5MaXN0ZW5lckhhbmRsZXIoY29tcG9uZW50LCBleHByZXNzaW9uLCBlLCBleHRyYVZhcnMpO1xuICAgICAgICAgIHJldHVyblZhbHVlLnRoZW4odmFsdWUgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKCdvbmNlJykpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lclRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoJ2RlYm91bmNlJykpIHtcbiAgICAgIGxldCBuZXh0TW9kaWZpZXIgPSBtb2RpZmllcnNbbW9kaWZpZXJzLmluZGV4T2YoJ2RlYm91bmNlJykgKyAxXSB8fCAnaW52YWxpZC13YWl0JztcbiAgICAgIGxldCB3YWl0ID0gaXNOdW1lcmljKG5leHRNb2RpZmllci5zcGxpdCgnbXMnKVswXSkgPyBOdW1iZXIobmV4dE1vZGlmaWVyLnNwbGl0KCdtcycpWzBdKSA6IDI1MDtcbiAgICAgIGhhbmRsZXIgPSBkZWJvdW5jZShoYW5kbGVyLCB3YWl0KTtcbiAgICB9XG5cbiAgICBsaXN0ZW5lclRhcmdldC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1bkxpc3RlbmVySGFuZGxlcihjb21wb25lbnQsIGV4cHJlc3Npb24sIGUsIGV4dHJhVmFycykge1xuICAgIHJldHVybiBjb21wb25lbnQuZXZhbHVhdGVDb21tYW5kRXhwcmVzc2lvbihlLnRhcmdldCwgZXhwcmVzc2lvbiwgKCkgPT4ge1xuICAgICAgcmV0dXJuIF9vYmplY3RTcHJlYWQyKF9vYmplY3RTcHJlYWQyKHt9LCBleHRyYVZhcnMoKSksIHt9LCB7XG4gICAgICAgICckZXZlbnQnOiBlXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzS2V5RXZlbnQoZXZlbnQpIHtcbiAgICByZXR1cm4gWydrZXlkb3duJywgJ2tleXVwJ10uaW5jbHVkZXMoZXZlbnQpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNMaXN0ZW5pbmdGb3JBU3BlY2lmaWNLZXlUaGF0SGFzbnRCZWVuUHJlc3NlZChlLCBtb2RpZmllcnMpIHtcbiAgICBsZXQga2V5TW9kaWZpZXJzID0gbW9kaWZpZXJzLmZpbHRlcihpID0+IHtcbiAgICAgIHJldHVybiAhWyd3aW5kb3cnLCAnZG9jdW1lbnQnLCAncHJldmVudCcsICdzdG9wJ10uaW5jbHVkZXMoaSk7XG4gICAgfSk7XG5cbiAgICBpZiAoa2V5TW9kaWZpZXJzLmluY2x1ZGVzKCdkZWJvdW5jZScpKSB7XG4gICAgICBsZXQgZGVib3VuY2VJbmRleCA9IGtleU1vZGlmaWVycy5pbmRleE9mKCdkZWJvdW5jZScpO1xuICAgICAga2V5TW9kaWZpZXJzLnNwbGljZShkZWJvdW5jZUluZGV4LCBpc051bWVyaWMoKGtleU1vZGlmaWVyc1tkZWJvdW5jZUluZGV4ICsgMV0gfHwgJ2ludmFsaWQtd2FpdCcpLnNwbGl0KCdtcycpWzBdKSA/IDIgOiAxKTtcbiAgICB9IC8vIElmIG5vIG1vZGlmaWVyIGlzIHNwZWNpZmllZCwgd2UnbGwgY2FsbCBpdCBhIHByZXNzLlxuXG5cbiAgICBpZiAoa2V5TW9kaWZpZXJzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlOyAvLyBJZiBvbmUgaXMgcGFzc2VkLCBBTkQgaXQgbWF0Y2hlcyB0aGUga2V5IHByZXNzZWQsIHdlJ2xsIGNhbGwgaXQgYSBwcmVzcy5cblxuICAgIGlmIChrZXlNb2RpZmllcnMubGVuZ3RoID09PSAxICYmIGtleU1vZGlmaWVyc1swXSA9PT0ga2V5VG9Nb2RpZmllcihlLmtleSkpIHJldHVybiBmYWxzZTsgLy8gVGhlIHVzZXIgaXMgbGlzdGVuaW5nIGZvciBrZXkgY29tYmluYXRpb25zLlxuXG4gICAgY29uc3Qgc3lzdGVtS2V5TW9kaWZpZXJzID0gWydjdHJsJywgJ3NoaWZ0JywgJ2FsdCcsICdtZXRhJywgJ2NtZCcsICdzdXBlciddO1xuICAgIGNvbnN0IHNlbGVjdGVkU3lzdGVtS2V5TW9kaWZpZXJzID0gc3lzdGVtS2V5TW9kaWZpZXJzLmZpbHRlcihtb2RpZmllciA9PiBrZXlNb2RpZmllcnMuaW5jbHVkZXMobW9kaWZpZXIpKTtcbiAgICBrZXlNb2RpZmllcnMgPSBrZXlNb2RpZmllcnMuZmlsdGVyKGkgPT4gIXNlbGVjdGVkU3lzdGVtS2V5TW9kaWZpZXJzLmluY2x1ZGVzKGkpKTtcblxuICAgIGlmIChzZWxlY3RlZFN5c3RlbUtleU1vZGlmaWVycy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBhY3RpdmVseVByZXNzZWRLZXlNb2RpZmllcnMgPSBzZWxlY3RlZFN5c3RlbUtleU1vZGlmaWVycy5maWx0ZXIobW9kaWZpZXIgPT4ge1xuICAgICAgICAvLyBBbGlhcyBcImNtZFwiIGFuZCBcInN1cGVyXCIgdG8gXCJtZXRhXCJcbiAgICAgICAgaWYgKG1vZGlmaWVyID09PSAnY21kJyB8fCBtb2RpZmllciA9PT0gJ3N1cGVyJykgbW9kaWZpZXIgPSAnbWV0YSc7XG4gICAgICAgIHJldHVybiBlW2Ake21vZGlmaWVyfUtleWBdO1xuICAgICAgfSk7IC8vIElmIGFsbCB0aGUgbW9kaWZpZXJzIHNlbGVjdGVkIGFyZSBwcmVzc2VkLCAuLi5cblxuICAgICAgaWYgKGFjdGl2ZWx5UHJlc3NlZEtleU1vZGlmaWVycy5sZW5ndGggPT09IHNlbGVjdGVkU3lzdGVtS2V5TW9kaWZpZXJzLmxlbmd0aCkge1xuICAgICAgICAvLyBBTkQgdGhlIHJlbWFpbmluZyBrZXkgaXMgcHJlc3NlZCBhcyB3ZWxsLiBJdCdzIGEgcHJlc3MuXG4gICAgICAgIGlmIChrZXlNb2RpZmllcnNbMF0gPT09IGtleVRvTW9kaWZpZXIoZS5rZXkpKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSAvLyBXZSdsbCBjYWxsIGl0IE5PVCBhIHZhbGlkIGtleXByZXNzLlxuXG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGtleVRvTW9kaWZpZXIoa2V5KSB7XG4gICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgJy8nOlxuICAgICAgICByZXR1cm4gJ3NsYXNoJztcblxuICAgICAgY2FzZSAnICc6XG4gICAgICBjYXNlICdTcGFjZWJhcic6XG4gICAgICAgIHJldHVybiAnc3BhY2UnO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4ga2V5ICYmIGtlYmFiQ2FzZShrZXkpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyTW9kZWxMaXN0ZW5lcihjb21wb25lbnQsIGVsLCBtb2RpZmllcnMsIGV4cHJlc3Npb24sIGV4dHJhVmFycykge1xuICAgIC8vIElmIHRoZSBlbGVtZW50IHdlIGFyZSBiaW5kaW5nIHRvIGlzIGEgc2VsZWN0LCBhIHJhZGlvLCBvciBjaGVja2JveFxuICAgIC8vIHdlJ2xsIGxpc3RlbiBmb3IgdGhlIGNoYW5nZSBldmVudCBpbnN0ZWFkIG9mIHRoZSBcImlucHV0XCIgZXZlbnQuXG4gICAgdmFyIGV2ZW50ID0gZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc2VsZWN0JyB8fCBbJ2NoZWNrYm94JywgJ3JhZGlvJ10uaW5jbHVkZXMoZWwudHlwZSkgfHwgbW9kaWZpZXJzLmluY2x1ZGVzKCdsYXp5JykgPyAnY2hhbmdlJyA6ICdpbnB1dCc7XG4gICAgY29uc3QgbGlzdGVuZXJFeHByZXNzaW9uID0gYCR7ZXhwcmVzc2lvbn0gPSByaWdodFNpZGVPZkV4cHJlc3Npb24oJGV2ZW50LCAke2V4cHJlc3Npb259KWA7XG4gICAgcmVnaXN0ZXJMaXN0ZW5lcihjb21wb25lbnQsIGVsLCBldmVudCwgbW9kaWZpZXJzLCBsaXN0ZW5lckV4cHJlc3Npb24sICgpID0+IHtcbiAgICAgIHJldHVybiBfb2JqZWN0U3ByZWFkMihfb2JqZWN0U3ByZWFkMih7fSwgZXh0cmFWYXJzKCkpLCB7fSwge1xuICAgICAgICByaWdodFNpZGVPZkV4cHJlc3Npb246IGdlbmVyYXRlTW9kZWxBc3NpZ25tZW50RnVuY3Rpb24oZWwsIG1vZGlmaWVycywgZXhwcmVzc2lvbilcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVNb2RlbEFzc2lnbm1lbnRGdW5jdGlvbihlbCwgbW9kaWZpZXJzLCBleHByZXNzaW9uKSB7XG4gICAgaWYgKGVsLnR5cGUgPT09ICdyYWRpbycpIHtcbiAgICAgIC8vIFJhZGlvIGJ1dHRvbnMgb25seSB3b3JrIHByb3Blcmx5IHdoZW4gdGhleSBzaGFyZSBhIG5hbWUgYXR0cmlidXRlLlxuICAgICAgLy8gUGVvcGxlIG1pZ2h0IGFzc3VtZSB3ZSB0YWtlIGNhcmUgb2YgdGhhdCBmb3IgdGhlbSwgYmVjYXVzZVxuICAgICAgLy8gdGhleSBhbHJlYWR5IHNldCBhIHNoYXJlZCBcIngtbW9kZWxcIiBhdHRyaWJ1dGUuXG4gICAgICBpZiAoIWVsLmhhc0F0dHJpYnV0ZSgnbmFtZScpKSBlbC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBleHByZXNzaW9uKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKGV2ZW50LCBjdXJyZW50VmFsdWUpID0+IHtcbiAgICAgIC8vIENoZWNrIGZvciBldmVudC5kZXRhaWwgZHVlIHRvIGFuIGlzc3VlIHdoZXJlIElFMTEgaGFuZGxlcyBvdGhlciBldmVudHMgYXMgYSBDdXN0b21FdmVudC5cbiAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEN1c3RvbUV2ZW50ICYmIGV2ZW50LmRldGFpbCkge1xuICAgICAgICByZXR1cm4gZXZlbnQuZGV0YWlsO1xuICAgICAgfSBlbHNlIGlmIChlbC50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgIC8vIElmIHRoZSBkYXRhIHdlIGFyZSBiaW5kaW5nIHRvIGlzIGFuIGFycmF5LCB0b2dnbGUgaXRzIHZhbHVlIGluc2lkZSB0aGUgYXJyYXkuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IG1vZGlmaWVycy5pbmNsdWRlcygnbnVtYmVyJykgPyBzYWZlUGFyc2VOdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlKSA6IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LmNoZWNrZWQgPyBjdXJyZW50VmFsdWUuY29uY2F0KFtuZXdWYWx1ZV0pIDogY3VycmVudFZhbHVlLmZpbHRlcihlbCA9PiAhY2hlY2tlZEF0dHJMb29zZUNvbXBhcmUoZWwsIG5ld1ZhbHVlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5jaGVja2VkO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3NlbGVjdCcgJiYgZWwubXVsdGlwbGUpIHtcbiAgICAgICAgcmV0dXJuIG1vZGlmaWVycy5pbmNsdWRlcygnbnVtYmVyJykgPyBBcnJheS5mcm9tKGV2ZW50LnRhcmdldC5zZWxlY3RlZE9wdGlvbnMpLm1hcChvcHRpb24gPT4ge1xuICAgICAgICAgIGNvbnN0IHJhd1ZhbHVlID0gb3B0aW9uLnZhbHVlIHx8IG9wdGlvbi50ZXh0O1xuICAgICAgICAgIHJldHVybiBzYWZlUGFyc2VOdW1iZXIocmF3VmFsdWUpO1xuICAgICAgICB9KSA6IEFycmF5LmZyb20oZXZlbnQudGFyZ2V0LnNlbGVjdGVkT3B0aW9ucykubWFwKG9wdGlvbiA9PiB7XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbi52YWx1ZSB8fCBvcHRpb24udGV4dDtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCByYXdWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgcmV0dXJuIG1vZGlmaWVycy5pbmNsdWRlcygnbnVtYmVyJykgPyBzYWZlUGFyc2VOdW1iZXIocmF3VmFsdWUpIDogbW9kaWZpZXJzLmluY2x1ZGVzKCd0cmltJykgPyByYXdWYWx1ZS50cmltKCkgOiByYXdWYWx1ZTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gc2FmZVBhcnNlTnVtYmVyKHJhd1ZhbHVlKSB7XG4gICAgY29uc3QgbnVtYmVyID0gcmF3VmFsdWUgPyBwYXJzZUZsb2F0KHJhd1ZhbHVlKSA6IG51bGw7XG4gICAgcmV0dXJuIGlzTnVtZXJpYyhudW1iZXIpID8gbnVtYmVyIDogcmF3VmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogQ29weXJpZ2h0IChDKSAyMDE3IHNhbGVzZm9yY2UuY29tLCBpbmMuXG4gICAqL1xuICBjb25zdCB7IGlzQXJyYXkgfSA9IEFycmF5O1xuICBjb25zdCB7IGdldFByb3RvdHlwZU9mLCBjcmVhdGU6IE9iamVjdENyZWF0ZSwgZGVmaW5lUHJvcGVydHk6IE9iamVjdERlZmluZVByb3BlcnR5LCBkZWZpbmVQcm9wZXJ0aWVzOiBPYmplY3REZWZpbmVQcm9wZXJ0aWVzLCBpc0V4dGVuc2libGUsIGdldE93blByb3BlcnR5RGVzY3JpcHRvciwgZ2V0T3duUHJvcGVydHlOYW1lcywgZ2V0T3duUHJvcGVydHlTeW1ib2xzLCBwcmV2ZW50RXh0ZW5zaW9ucywgaGFzT3duUHJvcGVydHksIH0gPSBPYmplY3Q7XG4gIGNvbnN0IHsgcHVzaDogQXJyYXlQdXNoLCBjb25jYXQ6IEFycmF5Q29uY2F0LCBtYXA6IEFycmF5TWFwLCB9ID0gQXJyYXkucHJvdG90eXBlO1xuICBmdW5jdGlvbiBpc1VuZGVmaW5lZChvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IHVuZGVmaW5lZDtcbiAgfVxuICBmdW5jdGlvbiBpc0Z1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbic7XG4gIH1cbiAgZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCc7XG4gIH1cbiAgY29uc3QgcHJveHlUb1ZhbHVlTWFwID0gbmV3IFdlYWtNYXAoKTtcbiAgZnVuY3Rpb24gcmVnaXN0ZXJQcm94eShwcm94eSwgdmFsdWUpIHtcbiAgICAgIHByb3h5VG9WYWx1ZU1hcC5zZXQocHJveHksIHZhbHVlKTtcbiAgfVxuICBjb25zdCB1bndyYXAgPSAocmVwbGljYU9yQW55KSA9PiBwcm94eVRvVmFsdWVNYXAuZ2V0KHJlcGxpY2FPckFueSkgfHwgcmVwbGljYU9yQW55O1xuXG4gIGZ1bmN0aW9uIHdyYXBWYWx1ZShtZW1icmFuZSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBtZW1icmFuZS52YWx1ZUlzT2JzZXJ2YWJsZSh2YWx1ZSkgPyBtZW1icmFuZS5nZXRQcm94eSh2YWx1ZSkgOiB2YWx1ZTtcbiAgfVxuICAvKipcbiAgICogVW53cmFwIHByb3BlcnR5IGRlc2NyaXB0b3JzIHdpbGwgc2V0IHZhbHVlIG9uIG9yaWdpbmFsIGRlc2NyaXB0b3JcbiAgICogV2Ugb25seSBuZWVkIHRvIHVud3JhcCBpZiB2YWx1ZSBpcyBzcGVjaWZpZWRcbiAgICogQHBhcmFtIGRlc2NyaXB0b3IgZXh0ZXJuYWwgZGVzY3JwaXRvciBwcm92aWRlZCB0byBkZWZpbmUgbmV3IHByb3BlcnR5IG9uIG9yaWdpbmFsIHZhbHVlXG4gICAqL1xuICBmdW5jdGlvbiB1bndyYXBEZXNjcmlwdG9yKGRlc2NyaXB0b3IpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGRlc2NyaXB0b3IsICd2YWx1ZScpKSB7XG4gICAgICAgICAgZGVzY3JpcHRvci52YWx1ZSA9IHVud3JhcChkZXNjcmlwdG9yLnZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkZXNjcmlwdG9yO1xuICB9XG4gIGZ1bmN0aW9uIGxvY2tTaGFkb3dUYXJnZXQobWVtYnJhbmUsIHNoYWRvd1RhcmdldCwgb3JpZ2luYWxUYXJnZXQpIHtcbiAgICAgIGNvbnN0IHRhcmdldEtleXMgPSBBcnJheUNvbmNhdC5jYWxsKGdldE93blByb3BlcnR5TmFtZXMob3JpZ2luYWxUYXJnZXQpLCBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMob3JpZ2luYWxUYXJnZXQpKTtcbiAgICAgIHRhcmdldEtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgbGV0IGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob3JpZ2luYWxUYXJnZXQsIGtleSk7XG4gICAgICAgICAgLy8gV2UgZG8gbm90IG5lZWQgdG8gd3JhcCB0aGUgZGVzY3JpcHRvciBpZiBjb25maWd1cmFibGVcbiAgICAgICAgICAvLyBCZWNhdXNlIHdlIGNhbiBkZWFsIHdpdGggd3JhcHBpbmcgaXQgd2hlbiB1c2VyIGdvZXMgdGhyb3VnaFxuICAgICAgICAgIC8vIEdldCBvd24gcHJvcGVydHkgZGVzY3JpcHRvci4gVGhlcmUgaXMgYWxzbyBhIGNoYW5jZSB0aGF0IHRoaXMgZGVzY3JpcHRvclxuICAgICAgICAgIC8vIGNvdWxkIGNoYW5nZSBzb21ldGltZSBpbiB0aGUgZnV0dXJlLCBzbyB3ZSBjYW4gZGVmZXIgd3JhcHBpbmdcbiAgICAgICAgICAvLyB1bnRpbCB3ZSBuZWVkIHRvXG4gICAgICAgICAgaWYgKCFkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSkge1xuICAgICAgICAgICAgICBkZXNjcmlwdG9yID0gd3JhcERlc2NyaXB0b3IobWVtYnJhbmUsIGRlc2NyaXB0b3IsIHdyYXBWYWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIE9iamVjdERlZmluZVByb3BlcnR5KHNoYWRvd1RhcmdldCwga2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgIH0pO1xuICAgICAgcHJldmVudEV4dGVuc2lvbnMoc2hhZG93VGFyZ2V0KTtcbiAgfVxuICBjbGFzcyBSZWFjdGl2ZVByb3h5SGFuZGxlciB7XG4gICAgICBjb25zdHJ1Y3RvcihtZW1icmFuZSwgdmFsdWUpIHtcbiAgICAgICAgICB0aGlzLm9yaWdpbmFsVGFyZ2V0ID0gdmFsdWU7XG4gICAgICAgICAgdGhpcy5tZW1icmFuZSA9IG1lbWJyYW5lO1xuICAgICAgfVxuICAgICAgZ2V0KHNoYWRvd1RhcmdldCwga2V5KSB7XG4gICAgICAgICAgY29uc3QgeyBvcmlnaW5hbFRhcmdldCwgbWVtYnJhbmUgfSA9IHRoaXM7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBvcmlnaW5hbFRhcmdldFtrZXldO1xuICAgICAgICAgIGNvbnN0IHsgdmFsdWVPYnNlcnZlZCB9ID0gbWVtYnJhbmU7XG4gICAgICAgICAgdmFsdWVPYnNlcnZlZChvcmlnaW5hbFRhcmdldCwga2V5KTtcbiAgICAgICAgICByZXR1cm4gbWVtYnJhbmUuZ2V0UHJveHkodmFsdWUpO1xuICAgICAgfVxuICAgICAgc2V0KHNoYWRvd1RhcmdldCwga2V5LCB2YWx1ZSkge1xuICAgICAgICAgIGNvbnN0IHsgb3JpZ2luYWxUYXJnZXQsIG1lbWJyYW5lOiB7IHZhbHVlTXV0YXRlZCB9IH0gPSB0aGlzO1xuICAgICAgICAgIGNvbnN0IG9sZFZhbHVlID0gb3JpZ2luYWxUYXJnZXRba2V5XTtcbiAgICAgICAgICBpZiAob2xkVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgIG9yaWdpbmFsVGFyZ2V0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgdmFsdWVNdXRhdGVkKG9yaWdpbmFsVGFyZ2V0LCBrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdsZW5ndGgnICYmIGlzQXJyYXkob3JpZ2luYWxUYXJnZXQpKSB7XG4gICAgICAgICAgICAgIC8vIGZpeCBmb3IgaXNzdWUgIzIzNjogcHVzaCB3aWxsIGFkZCB0aGUgbmV3IGluZGV4LCBhbmQgYnkgdGhlIHRpbWUgbGVuZ3RoXG4gICAgICAgICAgICAgIC8vIGlzIHVwZGF0ZWQsIHRoZSBpbnRlcm5hbCBsZW5ndGggaXMgYWxyZWFkeSBlcXVhbCB0byB0aGUgbmV3IGxlbmd0aCB2YWx1ZVxuICAgICAgICAgICAgICAvLyB0aGVyZWZvcmUsIHRoZSBvbGRWYWx1ZSBpcyBlcXVhbCB0byB0aGUgdmFsdWUuIFRoaXMgaXMgdGhlIGZvcmtpbmcgbG9naWNcbiAgICAgICAgICAgICAgLy8gdG8gc3VwcG9ydCB0aGlzIHVzZSBjYXNlLlxuICAgICAgICAgICAgICB2YWx1ZU11dGF0ZWQob3JpZ2luYWxUYXJnZXQsIGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgZGVsZXRlUHJvcGVydHkoc2hhZG93VGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgICBjb25zdCB7IG9yaWdpbmFsVGFyZ2V0LCBtZW1icmFuZTogeyB2YWx1ZU11dGF0ZWQgfSB9ID0gdGhpcztcbiAgICAgICAgICBkZWxldGUgb3JpZ2luYWxUYXJnZXRba2V5XTtcbiAgICAgICAgICB2YWx1ZU11dGF0ZWQob3JpZ2luYWxUYXJnZXQsIGtleSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBhcHBseShzaGFkb3dUYXJnZXQsIHRoaXNBcmcsIGFyZ0FycmF5KSB7XG4gICAgICAgICAgLyogTm8gb3AgKi9cbiAgICAgIH1cbiAgICAgIGNvbnN0cnVjdCh0YXJnZXQsIGFyZ0FycmF5LCBuZXdUYXJnZXQpIHtcbiAgICAgICAgICAvKiBObyBvcCAqL1xuICAgICAgfVxuICAgICAgaGFzKHNoYWRvd1RhcmdldCwga2V5KSB7XG4gICAgICAgICAgY29uc3QgeyBvcmlnaW5hbFRhcmdldCwgbWVtYnJhbmU6IHsgdmFsdWVPYnNlcnZlZCB9IH0gPSB0aGlzO1xuICAgICAgICAgIHZhbHVlT2JzZXJ2ZWQob3JpZ2luYWxUYXJnZXQsIGtleSk7XG4gICAgICAgICAgcmV0dXJuIGtleSBpbiBvcmlnaW5hbFRhcmdldDtcbiAgICAgIH1cbiAgICAgIG93bktleXMoc2hhZG93VGFyZ2V0KSB7XG4gICAgICAgICAgY29uc3QgeyBvcmlnaW5hbFRhcmdldCB9ID0gdGhpcztcbiAgICAgICAgICByZXR1cm4gQXJyYXlDb25jYXQuY2FsbChnZXRPd25Qcm9wZXJ0eU5hbWVzKG9yaWdpbmFsVGFyZ2V0KSwgZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9yaWdpbmFsVGFyZ2V0KSk7XG4gICAgICB9XG4gICAgICBpc0V4dGVuc2libGUoc2hhZG93VGFyZ2V0KSB7XG4gICAgICAgICAgY29uc3Qgc2hhZG93SXNFeHRlbnNpYmxlID0gaXNFeHRlbnNpYmxlKHNoYWRvd1RhcmdldCk7XG4gICAgICAgICAgaWYgKCFzaGFkb3dJc0V4dGVuc2libGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNoYWRvd0lzRXh0ZW5zaWJsZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgeyBvcmlnaW5hbFRhcmdldCwgbWVtYnJhbmUgfSA9IHRoaXM7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0SXNFeHRlbnNpYmxlID0gaXNFeHRlbnNpYmxlKG9yaWdpbmFsVGFyZ2V0KTtcbiAgICAgICAgICBpZiAoIXRhcmdldElzRXh0ZW5zaWJsZSkge1xuICAgICAgICAgICAgICBsb2NrU2hhZG93VGFyZ2V0KG1lbWJyYW5lLCBzaGFkb3dUYXJnZXQsIG9yaWdpbmFsVGFyZ2V0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRhcmdldElzRXh0ZW5zaWJsZTtcbiAgICAgIH1cbiAgICAgIHNldFByb3RvdHlwZU9mKHNoYWRvd1RhcmdldCwgcHJvdG90eXBlKSB7XG4gICAgICB9XG4gICAgICBnZXRQcm90b3R5cGVPZihzaGFkb3dUYXJnZXQpIHtcbiAgICAgICAgICBjb25zdCB7IG9yaWdpbmFsVGFyZ2V0IH0gPSB0aGlzO1xuICAgICAgICAgIHJldHVybiBnZXRQcm90b3R5cGVPZihvcmlnaW5hbFRhcmdldCk7XG4gICAgICB9XG4gICAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc2hhZG93VGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgICBjb25zdCB7IG9yaWdpbmFsVGFyZ2V0LCBtZW1icmFuZSB9ID0gdGhpcztcbiAgICAgICAgICBjb25zdCB7IHZhbHVlT2JzZXJ2ZWQgfSA9IHRoaXMubWVtYnJhbmU7XG4gICAgICAgICAgLy8ga2V5cyBsb29rZWQgdXAgdmlhIGhhc093blByb3BlcnR5IG5lZWQgdG8gYmUgcmVhY3RpdmVcbiAgICAgICAgICB2YWx1ZU9ic2VydmVkKG9yaWdpbmFsVGFyZ2V0LCBrZXkpO1xuICAgICAgICAgIGxldCBkZXNjID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9yaWdpbmFsVGFyZ2V0LCBrZXkpO1xuICAgICAgICAgIGlmIChpc1VuZGVmaW5lZChkZXNjKSkge1xuICAgICAgICAgICAgICByZXR1cm4gZGVzYztcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3Qgc2hhZG93RGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzaGFkb3dUYXJnZXQsIGtleSk7XG4gICAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChzaGFkb3dEZXNjcmlwdG9yKSkge1xuICAgICAgICAgICAgICByZXR1cm4gc2hhZG93RGVzY3JpcHRvcjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gTm90ZTogYnkgYWNjZXNzaW5nIHRoZSBkZXNjcmlwdG9yLCB0aGUga2V5IGlzIG1hcmtlZCBhcyBvYnNlcnZlZFxuICAgICAgICAgIC8vIGJ1dCBhY2Nlc3MgdG8gdGhlIHZhbHVlLCBzZXR0ZXIgb3IgZ2V0dGVyIChpZiBhdmFpbGFibGUpIGNhbm5vdCBvYnNlcnZlXG4gICAgICAgICAgLy8gbXV0YXRpb25zLCBqdXN0IGxpa2UgcmVndWxhciBtZXRob2RzLCBpbiB3aGljaCBjYXNlIHdlIGp1c3QgZG8gbm90aGluZy5cbiAgICAgICAgICBkZXNjID0gd3JhcERlc2NyaXB0b3IobWVtYnJhbmUsIGRlc2MsIHdyYXBWYWx1ZSk7XG4gICAgICAgICAgaWYgKCFkZXNjLmNvbmZpZ3VyYWJsZSkge1xuICAgICAgICAgICAgICAvLyBJZiBkZXNjcmlwdG9yIGZyb20gb3JpZ2luYWwgdGFyZ2V0IGlzIG5vdCBjb25maWd1cmFibGUsXG4gICAgICAgICAgICAgIC8vIFdlIG11c3QgY29weSB0aGUgd3JhcHBlZCBkZXNjcmlwdG9yIG92ZXIgdG8gdGhlIHNoYWRvdyB0YXJnZXQuXG4gICAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgcHJveHkgd2lsbCB0aHJvdyBhbiBpbnZhcmlhbnQgZXJyb3IuXG4gICAgICAgICAgICAgIC8vIFRoaXMgaXMgb3VyIGxhc3QgY2hhbmNlIHRvIGxvY2sgdGhlIHZhbHVlLlxuICAgICAgICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9Qcm94eS9oYW5kbGVyL2dldE93blByb3BlcnR5RGVzY3JpcHRvciNJbnZhcmlhbnRzXG4gICAgICAgICAgICAgIE9iamVjdERlZmluZVByb3BlcnR5KHNoYWRvd1RhcmdldCwga2V5LCBkZXNjKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGRlc2M7XG4gICAgICB9XG4gICAgICBwcmV2ZW50RXh0ZW5zaW9ucyhzaGFkb3dUYXJnZXQpIHtcbiAgICAgICAgICBjb25zdCB7IG9yaWdpbmFsVGFyZ2V0LCBtZW1icmFuZSB9ID0gdGhpcztcbiAgICAgICAgICBsb2NrU2hhZG93VGFyZ2V0KG1lbWJyYW5lLCBzaGFkb3dUYXJnZXQsIG9yaWdpbmFsVGFyZ2V0KTtcbiAgICAgICAgICBwcmV2ZW50RXh0ZW5zaW9ucyhvcmlnaW5hbFRhcmdldCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBkZWZpbmVQcm9wZXJ0eShzaGFkb3dUYXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICAgICAgICAgIGNvbnN0IHsgb3JpZ2luYWxUYXJnZXQsIG1lbWJyYW5lIH0gPSB0aGlzO1xuICAgICAgICAgIGNvbnN0IHsgdmFsdWVNdXRhdGVkIH0gPSBtZW1icmFuZTtcbiAgICAgICAgICBjb25zdCB7IGNvbmZpZ3VyYWJsZSB9ID0gZGVzY3JpcHRvcjtcbiAgICAgICAgICAvLyBXZSBoYXZlIHRvIGNoZWNrIGZvciB2YWx1ZSBpbiBkZXNjcmlwdG9yXG4gICAgICAgICAgLy8gYmVjYXVzZSBPYmplY3QuZnJlZXplKHByb3h5KSBjYWxscyB0aGlzIG1ldGhvZFxuICAgICAgICAgIC8vIHdpdGggb25seSB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIHdyaXRlYWJsZTogZmFsc2UgfVxuICAgICAgICAgIC8vIEFkZGl0aW9uYWxseSwgbWV0aG9kIHdpbGwgb25seSBiZSBjYWxsZWQgd2l0aCB3cml0ZWFibGU6ZmFsc2VcbiAgICAgICAgICAvLyBpZiB0aGUgZGVzY3JpcHRvciBoYXMgYSB2YWx1ZSwgYXMgb3Bwb3NlZCB0byBnZXR0ZXIvc2V0dGVyXG4gICAgICAgICAgLy8gU28gd2UgY2FuIGp1c3QgY2hlY2sgaWYgd3JpdGFibGUgaXMgcHJlc2VudCBhbmQgdGhlbiBzZWUgaWZcbiAgICAgICAgICAvLyB2YWx1ZSBpcyBwcmVzZW50LiBUaGlzIGVsaW1pbmF0ZXMgZ2V0dGVyIGFuZCBzZXR0ZXIgZGVzY3JpcHRvcnNcbiAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChkZXNjcmlwdG9yLCAnd3JpdGFibGUnKSAmJiAhaGFzT3duUHJvcGVydHkuY2FsbChkZXNjcmlwdG9yLCAndmFsdWUnKSkge1xuICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbERlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob3JpZ2luYWxUYXJnZXQsIGtleSk7XG4gICAgICAgICAgICAgIGRlc2NyaXB0b3IudmFsdWUgPSBvcmlnaW5hbERlc2NyaXB0b3IudmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIE9iamVjdERlZmluZVByb3BlcnR5KG9yaWdpbmFsVGFyZ2V0LCBrZXksIHVud3JhcERlc2NyaXB0b3IoZGVzY3JpcHRvcikpO1xuICAgICAgICAgIGlmIChjb25maWd1cmFibGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIE9iamVjdERlZmluZVByb3BlcnR5KHNoYWRvd1RhcmdldCwga2V5LCB3cmFwRGVzY3JpcHRvcihtZW1icmFuZSwgZGVzY3JpcHRvciwgd3JhcFZhbHVlKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbHVlTXV0YXRlZChvcmlnaW5hbFRhcmdldCwga2V5KTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXBSZWFkT25seVZhbHVlKG1lbWJyYW5lLCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG1lbWJyYW5lLnZhbHVlSXNPYnNlcnZhYmxlKHZhbHVlKSA/IG1lbWJyYW5lLmdldFJlYWRPbmx5UHJveHkodmFsdWUpIDogdmFsdWU7XG4gIH1cbiAgY2xhc3MgUmVhZE9ubHlIYW5kbGVyIHtcbiAgICAgIGNvbnN0cnVjdG9yKG1lbWJyYW5lLCB2YWx1ZSkge1xuICAgICAgICAgIHRoaXMub3JpZ2luYWxUYXJnZXQgPSB2YWx1ZTtcbiAgICAgICAgICB0aGlzLm1lbWJyYW5lID0gbWVtYnJhbmU7XG4gICAgICB9XG4gICAgICBnZXQoc2hhZG93VGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgICBjb25zdCB7IG1lbWJyYW5lLCBvcmlnaW5hbFRhcmdldCB9ID0gdGhpcztcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IG9yaWdpbmFsVGFyZ2V0W2tleV07XG4gICAgICAgICAgY29uc3QgeyB2YWx1ZU9ic2VydmVkIH0gPSBtZW1icmFuZTtcbiAgICAgICAgICB2YWx1ZU9ic2VydmVkKG9yaWdpbmFsVGFyZ2V0LCBrZXkpO1xuICAgICAgICAgIHJldHVybiBtZW1icmFuZS5nZXRSZWFkT25seVByb3h5KHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHNldChzaGFkb3dUYXJnZXQsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBkZWxldGVQcm9wZXJ0eShzaGFkb3dUYXJnZXQsIGtleSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGFwcGx5KHNoYWRvd1RhcmdldCwgdGhpc0FyZywgYXJnQXJyYXkpIHtcbiAgICAgICAgICAvKiBObyBvcCAqL1xuICAgICAgfVxuICAgICAgY29uc3RydWN0KHRhcmdldCwgYXJnQXJyYXksIG5ld1RhcmdldCkge1xuICAgICAgICAgIC8qIE5vIG9wICovXG4gICAgICB9XG4gICAgICBoYXMoc2hhZG93VGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgICBjb25zdCB7IG9yaWdpbmFsVGFyZ2V0LCBtZW1icmFuZTogeyB2YWx1ZU9ic2VydmVkIH0gfSA9IHRoaXM7XG4gICAgICAgICAgdmFsdWVPYnNlcnZlZChvcmlnaW5hbFRhcmdldCwga2V5KTtcbiAgICAgICAgICByZXR1cm4ga2V5IGluIG9yaWdpbmFsVGFyZ2V0O1xuICAgICAgfVxuICAgICAgb3duS2V5cyhzaGFkb3dUYXJnZXQpIHtcbiAgICAgICAgICBjb25zdCB7IG9yaWdpbmFsVGFyZ2V0IH0gPSB0aGlzO1xuICAgICAgICAgIHJldHVybiBBcnJheUNvbmNhdC5jYWxsKGdldE93blByb3BlcnR5TmFtZXMob3JpZ2luYWxUYXJnZXQpLCBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMob3JpZ2luYWxUYXJnZXQpKTtcbiAgICAgIH1cbiAgICAgIHNldFByb3RvdHlwZU9mKHNoYWRvd1RhcmdldCwgcHJvdG90eXBlKSB7XG4gICAgICB9XG4gICAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc2hhZG93VGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgICBjb25zdCB7IG9yaWdpbmFsVGFyZ2V0LCBtZW1icmFuZSB9ID0gdGhpcztcbiAgICAgICAgICBjb25zdCB7IHZhbHVlT2JzZXJ2ZWQgfSA9IG1lbWJyYW5lO1xuICAgICAgICAgIC8vIGtleXMgbG9va2VkIHVwIHZpYSBoYXNPd25Qcm9wZXJ0eSBuZWVkIHRvIGJlIHJlYWN0aXZlXG4gICAgICAgICAgdmFsdWVPYnNlcnZlZChvcmlnaW5hbFRhcmdldCwga2V5KTtcbiAgICAgICAgICBsZXQgZGVzYyA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihvcmlnaW5hbFRhcmdldCwga2V5KTtcbiAgICAgICAgICBpZiAoaXNVbmRlZmluZWQoZGVzYykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGRlc2M7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHNoYWRvd0Rlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc2hhZG93VGFyZ2V0LCBrZXkpO1xuICAgICAgICAgIGlmICghaXNVbmRlZmluZWQoc2hhZG93RGVzY3JpcHRvcikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNoYWRvd0Rlc2NyaXB0b3I7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIE5vdGU6IGJ5IGFjY2Vzc2luZyB0aGUgZGVzY3JpcHRvciwgdGhlIGtleSBpcyBtYXJrZWQgYXMgb2JzZXJ2ZWRcbiAgICAgICAgICAvLyBidXQgYWNjZXNzIHRvIHRoZSB2YWx1ZSBvciBnZXR0ZXIgKGlmIGF2YWlsYWJsZSkgY2Fubm90IGJlIG9ic2VydmVkLFxuICAgICAgICAgIC8vIGp1c3QgbGlrZSByZWd1bGFyIG1ldGhvZHMsIGluIHdoaWNoIGNhc2Ugd2UganVzdCBkbyBub3RoaW5nLlxuICAgICAgICAgIGRlc2MgPSB3cmFwRGVzY3JpcHRvcihtZW1icmFuZSwgZGVzYywgd3JhcFJlYWRPbmx5VmFsdWUpO1xuICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGRlc2MsICdzZXQnKSkge1xuICAgICAgICAgICAgICBkZXNjLnNldCA9IHVuZGVmaW5lZDsgLy8gcmVhZE9ubHkgbWVtYnJhbmUgZG9lcyBub3QgYWxsb3cgc2V0dGVyc1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWRlc2MuY29uZmlndXJhYmxlKSB7XG4gICAgICAgICAgICAgIC8vIElmIGRlc2NyaXB0b3IgZnJvbSBvcmlnaW5hbCB0YXJnZXQgaXMgbm90IGNvbmZpZ3VyYWJsZSxcbiAgICAgICAgICAgICAgLy8gV2UgbXVzdCBjb3B5IHRoZSB3cmFwcGVkIGRlc2NyaXB0b3Igb3ZlciB0byB0aGUgc2hhZG93IHRhcmdldC5cbiAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBwcm94eSB3aWxsIHRocm93IGFuIGludmFyaWFudCBlcnJvci5cbiAgICAgICAgICAgICAgLy8gVGhpcyBpcyBvdXIgbGFzdCBjaGFuY2UgdG8gbG9jayB0aGUgdmFsdWUuXG4gICAgICAgICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1Byb3h5L2hhbmRsZXIvZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yI0ludmFyaWFudHNcbiAgICAgICAgICAgICAgT2JqZWN0RGVmaW5lUHJvcGVydHkoc2hhZG93VGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZGVzYztcbiAgICAgIH1cbiAgICAgIHByZXZlbnRFeHRlbnNpb25zKHNoYWRvd1RhcmdldCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGRlZmluZVByb3BlcnR5KHNoYWRvd1RhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICB9XG4gIGZ1bmN0aW9uIGNyZWF0ZVNoYWRvd1RhcmdldCh2YWx1ZSkge1xuICAgICAgbGV0IHNoYWRvd1RhcmdldCA9IHVuZGVmaW5lZDtcbiAgICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgIHNoYWRvd1RhcmdldCA9IFtdO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgICAgc2hhZG93VGFyZ2V0ID0ge307XG4gICAgICB9XG4gICAgICByZXR1cm4gc2hhZG93VGFyZ2V0O1xuICB9XG4gIGNvbnN0IE9iamVjdERvdFByb3RvdHlwZSA9IE9iamVjdC5wcm90b3R5cGU7XG4gIGZ1bmN0aW9uIGRlZmF1bHRWYWx1ZUlzT2JzZXJ2YWJsZSh2YWx1ZSkge1xuICAgICAgLy8gaW50ZW50aW9uYWxseSBjaGVja2luZyBmb3IgbnVsbFxuICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gdHJlYXQgYWxsIG5vbi1vYmplY3QgdHlwZXMsIGluY2x1ZGluZyB1bmRlZmluZWQsIGFzIG5vbi1vYnNlcnZhYmxlIHZhbHVlc1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHByb3RvID0gZ2V0UHJvdG90eXBlT2YodmFsdWUpO1xuICAgICAgcmV0dXJuIChwcm90byA9PT0gT2JqZWN0RG90UHJvdG90eXBlIHx8IHByb3RvID09PSBudWxsIHx8IGdldFByb3RvdHlwZU9mKHByb3RvKSA9PT0gbnVsbCk7XG4gIH1cbiAgY29uc3QgZGVmYXVsdFZhbHVlT2JzZXJ2ZWQgPSAob2JqLCBrZXkpID0+IHtcbiAgICAgIC8qIGRvIG5vdGhpbmcgKi9cbiAgfTtcbiAgY29uc3QgZGVmYXVsdFZhbHVlTXV0YXRlZCA9IChvYmosIGtleSkgPT4ge1xuICAgICAgLyogZG8gbm90aGluZyAqL1xuICB9O1xuICBjb25zdCBkZWZhdWx0VmFsdWVEaXN0b3J0aW9uID0gKHZhbHVlKSA9PiB2YWx1ZTtcbiAgZnVuY3Rpb24gd3JhcERlc2NyaXB0b3IobWVtYnJhbmUsIGRlc2NyaXB0b3IsIGdldFZhbHVlKSB7XG4gICAgICBjb25zdCB7IHNldCwgZ2V0IH0gPSBkZXNjcmlwdG9yO1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoZGVzY3JpcHRvciwgJ3ZhbHVlJykpIHtcbiAgICAgICAgICBkZXNjcmlwdG9yLnZhbHVlID0gZ2V0VmFsdWUobWVtYnJhbmUsIGRlc2NyaXB0b3IudmFsdWUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChnZXQpKSB7XG4gICAgICAgICAgICAgIGRlc2NyaXB0b3IuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgLy8gaW52b2tpbmcgdGhlIG9yaWdpbmFsIGdldHRlciB3aXRoIHRoZSBvcmlnaW5hbCB0YXJnZXRcbiAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRWYWx1ZShtZW1icmFuZSwgZ2V0LmNhbGwodW53cmFwKHRoaXMpKSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghaXNVbmRlZmluZWQoc2V0KSkge1xuICAgICAgICAgICAgICBkZXNjcmlwdG9yLnNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgLy8gQXQgdGhpcyBwb2ludCB3ZSBkb24ndCBoYXZlIGEgY2xlYXIgaW5kaWNhdGlvbiBvZiB3aGV0aGVyXG4gICAgICAgICAgICAgICAgICAvLyBvciBub3QgYSB2YWxpZCBtdXRhdGlvbiB3aWxsIG9jY3VyLCB3ZSBkb24ndCBoYXZlIHRoZSBrZXksXG4gICAgICAgICAgICAgICAgICAvLyBhbmQgd2UgYXJlIG5vdCBzdXJlIHdoeSBhbmQgaG93IHRoZXkgYXJlIGludm9raW5nIHRoaXMgc2V0dGVyLlxuICAgICAgICAgICAgICAgICAgLy8gTmV2ZXJ0aGVsZXNzIHdlIHByZXNlcnZlIHRoZSBvcmlnaW5hbCBzZW1hbnRpY3MgYnkgaW52b2tpbmcgdGhlXG4gICAgICAgICAgICAgICAgICAvLyBvcmlnaW5hbCBzZXR0ZXIgd2l0aCB0aGUgb3JpZ2luYWwgdGFyZ2V0IGFuZCB0aGUgdW53cmFwcGVkIHZhbHVlXG4gICAgICAgICAgICAgICAgICBzZXQuY2FsbCh1bndyYXAodGhpcyksIG1lbWJyYW5lLnVud3JhcFByb3h5KHZhbHVlKSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGRlc2NyaXB0b3I7XG4gIH1cbiAgY2xhc3MgUmVhY3RpdmVNZW1icmFuZSB7XG4gICAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgICAgdGhpcy52YWx1ZURpc3RvcnRpb24gPSBkZWZhdWx0VmFsdWVEaXN0b3J0aW9uO1xuICAgICAgICAgIHRoaXMudmFsdWVNdXRhdGVkID0gZGVmYXVsdFZhbHVlTXV0YXRlZDtcbiAgICAgICAgICB0aGlzLnZhbHVlT2JzZXJ2ZWQgPSBkZWZhdWx0VmFsdWVPYnNlcnZlZDtcbiAgICAgICAgICB0aGlzLnZhbHVlSXNPYnNlcnZhYmxlID0gZGVmYXVsdFZhbHVlSXNPYnNlcnZhYmxlO1xuICAgICAgICAgIHRoaXMub2JqZWN0R3JhcGggPSBuZXcgV2Vha01hcCgpO1xuICAgICAgICAgIGlmICghaXNVbmRlZmluZWQob3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgY29uc3QgeyB2YWx1ZURpc3RvcnRpb24sIHZhbHVlTXV0YXRlZCwgdmFsdWVPYnNlcnZlZCwgdmFsdWVJc09ic2VydmFibGUgfSA9IG9wdGlvbnM7XG4gICAgICAgICAgICAgIHRoaXMudmFsdWVEaXN0b3J0aW9uID0gaXNGdW5jdGlvbih2YWx1ZURpc3RvcnRpb24pID8gdmFsdWVEaXN0b3J0aW9uIDogZGVmYXVsdFZhbHVlRGlzdG9ydGlvbjtcbiAgICAgICAgICAgICAgdGhpcy52YWx1ZU11dGF0ZWQgPSBpc0Z1bmN0aW9uKHZhbHVlTXV0YXRlZCkgPyB2YWx1ZU11dGF0ZWQgOiBkZWZhdWx0VmFsdWVNdXRhdGVkO1xuICAgICAgICAgICAgICB0aGlzLnZhbHVlT2JzZXJ2ZWQgPSBpc0Z1bmN0aW9uKHZhbHVlT2JzZXJ2ZWQpID8gdmFsdWVPYnNlcnZlZCA6IGRlZmF1bHRWYWx1ZU9ic2VydmVkO1xuICAgICAgICAgICAgICB0aGlzLnZhbHVlSXNPYnNlcnZhYmxlID0gaXNGdW5jdGlvbih2YWx1ZUlzT2JzZXJ2YWJsZSkgPyB2YWx1ZUlzT2JzZXJ2YWJsZSA6IGRlZmF1bHRWYWx1ZUlzT2JzZXJ2YWJsZTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICBnZXRQcm94eSh2YWx1ZSkge1xuICAgICAgICAgIGNvbnN0IHVud3JhcHBlZFZhbHVlID0gdW53cmFwKHZhbHVlKTtcbiAgICAgICAgICBjb25zdCBkaXN0b3J0ZWQgPSB0aGlzLnZhbHVlRGlzdG9ydGlvbih1bndyYXBwZWRWYWx1ZSk7XG4gICAgICAgICAgaWYgKHRoaXMudmFsdWVJc09ic2VydmFibGUoZGlzdG9ydGVkKSkge1xuICAgICAgICAgICAgICBjb25zdCBvID0gdGhpcy5nZXRSZWFjdGl2ZVN0YXRlKHVud3JhcHBlZFZhbHVlLCBkaXN0b3J0ZWQpO1xuICAgICAgICAgICAgICAvLyB3aGVuIHRyeWluZyB0byBleHRyYWN0IHRoZSB3cml0YWJsZSB2ZXJzaW9uIG9mIGEgcmVhZG9ubHlcbiAgICAgICAgICAgICAgLy8gd2UgcmV0dXJuIHRoZSByZWFkb25seS5cbiAgICAgICAgICAgICAgcmV0dXJuIG8ucmVhZE9ubHkgPT09IHZhbHVlID8gdmFsdWUgOiBvLnJlYWN0aXZlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZGlzdG9ydGVkO1xuICAgICAgfVxuICAgICAgZ2V0UmVhZE9ubHlQcm94eSh2YWx1ZSkge1xuICAgICAgICAgIHZhbHVlID0gdW53cmFwKHZhbHVlKTtcbiAgICAgICAgICBjb25zdCBkaXN0b3J0ZWQgPSB0aGlzLnZhbHVlRGlzdG9ydGlvbih2YWx1ZSk7XG4gICAgICAgICAgaWYgKHRoaXMudmFsdWVJc09ic2VydmFibGUoZGlzdG9ydGVkKSkge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRSZWFjdGl2ZVN0YXRlKHZhbHVlLCBkaXN0b3J0ZWQpLnJlYWRPbmx5O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZGlzdG9ydGVkO1xuICAgICAgfVxuICAgICAgdW53cmFwUHJveHkocCkge1xuICAgICAgICAgIHJldHVybiB1bndyYXAocCk7XG4gICAgICB9XG4gICAgICBnZXRSZWFjdGl2ZVN0YXRlKHZhbHVlLCBkaXN0b3J0ZWRWYWx1ZSkge1xuICAgICAgICAgIGNvbnN0IHsgb2JqZWN0R3JhcGgsIH0gPSB0aGlzO1xuICAgICAgICAgIGxldCByZWFjdGl2ZVN0YXRlID0gb2JqZWN0R3JhcGguZ2V0KGRpc3RvcnRlZFZhbHVlKTtcbiAgICAgICAgICBpZiAocmVhY3RpdmVTdGF0ZSkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVhY3RpdmVTdGF0ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgbWVtYnJhbmUgPSB0aGlzO1xuICAgICAgICAgIHJlYWN0aXZlU3RhdGUgPSB7XG4gICAgICAgICAgICAgIGdldCByZWFjdGl2ZSgpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlYWN0aXZlSGFuZGxlciA9IG5ldyBSZWFjdGl2ZVByb3h5SGFuZGxlcihtZW1icmFuZSwgZGlzdG9ydGVkVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgLy8gY2FjaGluZyB0aGUgcmVhY3RpdmUgcHJveHkgYWZ0ZXIgdGhlIGZpcnN0IHRpbWUgaXQgaXMgYWNjZXNzZWRcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3h5ID0gbmV3IFByb3h5KGNyZWF0ZVNoYWRvd1RhcmdldChkaXN0b3J0ZWRWYWx1ZSksIHJlYWN0aXZlSGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICByZWdpc3RlclByb3h5KHByb3h5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBPYmplY3REZWZpbmVQcm9wZXJ0eSh0aGlzLCAncmVhY3RpdmUnLCB7IHZhbHVlOiBwcm94eSB9KTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBwcm94eTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZ2V0IHJlYWRPbmx5KCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcmVhZE9ubHlIYW5kbGVyID0gbmV3IFJlYWRPbmx5SGFuZGxlcihtZW1icmFuZSwgZGlzdG9ydGVkVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgLy8gY2FjaGluZyB0aGUgcmVhZE9ubHkgcHJveHkgYWZ0ZXIgdGhlIGZpcnN0IHRpbWUgaXQgaXMgYWNjZXNzZWRcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3h5ID0gbmV3IFByb3h5KGNyZWF0ZVNoYWRvd1RhcmdldChkaXN0b3J0ZWRWYWx1ZSksIHJlYWRPbmx5SGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICByZWdpc3RlclByb3h5KHByb3h5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBPYmplY3REZWZpbmVQcm9wZXJ0eSh0aGlzLCAncmVhZE9ubHknLCB7IHZhbHVlOiBwcm94eSB9KTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBwcm94eTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgb2JqZWN0R3JhcGguc2V0KGRpc3RvcnRlZFZhbHVlLCByZWFjdGl2ZVN0YXRlKTtcbiAgICAgICAgICByZXR1cm4gcmVhY3RpdmVTdGF0ZTtcbiAgICAgIH1cbiAgfVxuICAvKiogdmVyc2lvbjogMC4yNi4wICovXG5cbiAgZnVuY3Rpb24gd3JhcChkYXRhLCBtdXRhdGlvbkNhbGxiYWNrKSB7XG5cbiAgICBsZXQgbWVtYnJhbmUgPSBuZXcgUmVhY3RpdmVNZW1icmFuZSh7XG4gICAgICB2YWx1ZU11dGF0ZWQodGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgbXV0YXRpb25DYWxsYmFjayh0YXJnZXQsIGtleSk7XG4gICAgICB9XG5cbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogbWVtYnJhbmUuZ2V0UHJveHkoZGF0YSksXG4gICAgICBtZW1icmFuZTogbWVtYnJhbmVcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIHVud3JhcCQxKG1lbWJyYW5lLCBvYnNlcnZhYmxlKSB7XG4gICAgbGV0IHVud3JhcHBlZERhdGEgPSBtZW1icmFuZS51bndyYXBQcm94eShvYnNlcnZhYmxlKTtcbiAgICBsZXQgY29weSA9IHt9O1xuICAgIE9iamVjdC5rZXlzKHVud3JhcHBlZERhdGEpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmIChbJyRlbCcsICckcmVmcycsICckbmV4dFRpY2snLCAnJHdhdGNoJ10uaW5jbHVkZXMoa2V5KSkgcmV0dXJuO1xuICAgICAgY29weVtrZXldID0gdW53cmFwcGVkRGF0YVtrZXldO1xuICAgIH0pO1xuICAgIHJldHVybiBjb3B5O1xuICB9XG5cbiAgY2xhc3MgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihlbCwgY29tcG9uZW50Rm9yQ2xvbmUgPSBudWxsKSB7XG4gICAgICB0aGlzLiRlbCA9IGVsO1xuICAgICAgY29uc3QgZGF0YUF0dHIgPSB0aGlzLiRlbC5nZXRBdHRyaWJ1dGUoJ3gtZGF0YScpO1xuICAgICAgY29uc3QgZGF0YUV4cHJlc3Npb24gPSBkYXRhQXR0ciA9PT0gJycgPyAne30nIDogZGF0YUF0dHI7XG4gICAgICBjb25zdCBpbml0RXhwcmVzc2lvbiA9IHRoaXMuJGVsLmdldEF0dHJpYnV0ZSgneC1pbml0Jyk7XG4gICAgICBsZXQgZGF0YUV4dHJhcyA9IHtcbiAgICAgICAgJGVsOiB0aGlzLiRlbFxuICAgICAgfTtcbiAgICAgIGxldCBjYW5vbmljYWxDb21wb25lbnRFbGVtZW50UmVmZXJlbmNlID0gY29tcG9uZW50Rm9yQ2xvbmUgPyBjb21wb25lbnRGb3JDbG9uZS4kZWwgOiB0aGlzLiRlbDtcbiAgICAgIE9iamVjdC5lbnRyaWVzKEFscGluZS5tYWdpY1Byb3BlcnRpZXMpLmZvckVhY2goKFtuYW1lLCBjYWxsYmFja10pID0+IHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRhdGFFeHRyYXMsIGAkJHtuYW1lfWAsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhjYW5vbmljYWxDb21wb25lbnRFbGVtZW50UmVmZXJlbmNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnVub2JzZXJ2ZWREYXRhID0gY29tcG9uZW50Rm9yQ2xvbmUgPyBjb21wb25lbnRGb3JDbG9uZS5nZXRVbm9ic2VydmVkRGF0YSgpIDogc2FmZXJFdmFsKGVsLCBkYXRhRXhwcmVzc2lvbiwgZGF0YUV4dHJhcyk7XG4gICAgICAvLyBDb25zdHJ1Y3QgYSBQcm94eS1iYXNlZCBvYnNlcnZhYmxlLiBUaGlzIHdpbGwgYmUgdXNlZCB0byBoYW5kbGUgcmVhY3Rpdml0eS5cblxuICAgICAgbGV0IHtcbiAgICAgICAgbWVtYnJhbmUsXG4gICAgICAgIGRhdGFcbiAgICAgIH0gPSB0aGlzLndyYXBEYXRhSW5PYnNlcnZhYmxlKHRoaXMudW5vYnNlcnZlZERhdGEpO1xuICAgICAgdGhpcy4kZGF0YSA9IGRhdGE7XG4gICAgICB0aGlzLm1lbWJyYW5lID0gbWVtYnJhbmU7IC8vIEFmdGVyIG1ha2luZyB1c2VyLXN1cHBsaWVkIGRhdGEgbWV0aG9kcyByZWFjdGl2ZSwgd2UgY2FuIG5vdyBhZGRcbiAgICAgIC8vIG91ciBtYWdpYyBwcm9wZXJ0aWVzIHRvIHRoZSBvcmlnaW5hbCBkYXRhIGZvciBhY2Nlc3MuXG5cbiAgICAgIHRoaXMudW5vYnNlcnZlZERhdGEuJGVsID0gdGhpcy4kZWw7XG4gICAgICB0aGlzLnVub2JzZXJ2ZWREYXRhLiRyZWZzID0gdGhpcy5nZXRSZWZzUHJveHkoKTtcbiAgICAgIHRoaXMubmV4dFRpY2tTdGFjayA9IFtdO1xuXG4gICAgICB0aGlzLnVub2JzZXJ2ZWREYXRhLiRuZXh0VGljayA9IGNhbGxiYWNrID0+IHtcbiAgICAgICAgdGhpcy5uZXh0VGlja1N0YWNrLnB1c2goY2FsbGJhY2spO1xuICAgICAgfTtcblxuICAgICAgdGhpcy53YXRjaGVycyA9IHt9O1xuXG4gICAgICB0aGlzLnVub2JzZXJ2ZWREYXRhLiR3YXRjaCA9IChwcm9wZXJ0eSwgY2FsbGJhY2spID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLndhdGNoZXJzW3Byb3BlcnR5XSkgdGhpcy53YXRjaGVyc1twcm9wZXJ0eV0gPSBbXTtcbiAgICAgICAgdGhpcy53YXRjaGVyc1twcm9wZXJ0eV0ucHVzaChjYWxsYmFjayk7XG4gICAgICB9O1xuICAgICAgLyogTU9ERVJOLU9OTFk6U1RBUlQgKi9cbiAgICAgIC8vIFdlIHJlbW92ZSB0aGlzIHBpZWNlIG9mIGNvZGUgZnJvbSB0aGUgbGVnYWN5IGJ1aWxkLlxuICAgICAgLy8gSW4gSUUxMSwgd2UgaGF2ZSBhbHJlYWR5IGRlZmluZWQgb3VyIGhlbHBlcnMgYXQgdGhpcyBwb2ludC5cbiAgICAgIC8vIFJlZ2lzdGVyIGN1c3RvbSBtYWdpYyBwcm9wZXJ0aWVzLlxuXG5cbiAgICAgIE9iamVjdC5lbnRyaWVzKEFscGluZS5tYWdpY1Byb3BlcnRpZXMpLmZvckVhY2goKFtuYW1lLCBjYWxsYmFja10pID0+IHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMudW5vYnNlcnZlZERhdGEsIGAkJHtuYW1lfWAsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhjYW5vbmljYWxDb21wb25lbnRFbGVtZW50UmVmZXJlbmNlLCB0aGlzLiRlbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgLyogTU9ERVJOLU9OTFk6RU5EICovXG5cbiAgICAgIHRoaXMuc2hvd0RpcmVjdGl2ZVN0YWNrID0gW107XG4gICAgICB0aGlzLnNob3dEaXJlY3RpdmVMYXN0RWxlbWVudDtcbiAgICAgIGNvbXBvbmVudEZvckNsb25lIHx8IEFscGluZS5vbkJlZm9yZUNvbXBvbmVudEluaXRpYWxpemVkcy5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKHRoaXMpKTtcbiAgICAgIHZhciBpbml0UmV0dXJuZWRDYWxsYmFjazsgLy8gSWYgeC1pbml0IGlzIHByZXNlbnQgQU5EIHdlIGFyZW4ndCBjbG9uaW5nIChza2lwIHgtaW5pdCBvbiBjbG9uZSlcblxuICAgICAgaWYgKGluaXRFeHByZXNzaW9uICYmICFjb21wb25lbnRGb3JDbG9uZSkge1xuICAgICAgICAvLyBXZSB3YW50IHRvIGFsbG93IGRhdGEgbWFuaXB1bGF0aW9uLCBidXQgbm90IHRyaWdnZXIgRE9NIHVwZGF0ZXMganVzdCB5ZXQuXG4gICAgICAgIC8vIFdlIGhhdmVuJ3QgZXZlbiBpbml0aWFsaXplZCB0aGUgZWxlbWVudHMgd2l0aCB0aGVpciBBbHBpbmUgYmluZGluZ3MuIEkgbWVhbiBjJ21vbi5cbiAgICAgICAgdGhpcy5wYXVzZVJlYWN0aXZpdHkgPSB0cnVlO1xuICAgICAgICBpbml0UmV0dXJuZWRDYWxsYmFjayA9IHRoaXMuZXZhbHVhdGVSZXR1cm5FeHByZXNzaW9uKHRoaXMuJGVsLCBpbml0RXhwcmVzc2lvbik7XG4gICAgICAgIHRoaXMucGF1c2VSZWFjdGl2aXR5ID0gZmFsc2U7XG4gICAgICB9IC8vIFJlZ2lzdGVyIGFsbCBvdXIgbGlzdGVuZXJzIGFuZCBzZXQgYWxsIG91ciBhdHRyaWJ1dGUgYmluZGluZ3MuXG4gICAgICAvLyBJZiB3ZSdyZSBjbG9uaW5nIGEgY29tcG9uZW50LCB0aGUgdGhpcmQgcGFyYW1ldGVyIGVuc3VyZXMgbm8gZHVwbGljYXRlXG4gICAgICAvLyBldmVudCBsaXN0ZW5lcnMgYXJlIHJlZ2lzdGVyZWQgKHRoZSBtdXRhdGlvbiBvYnNlcnZlciB3aWxsIHRha2UgY2FyZSBvZiB0aGVtKVxuXG5cbiAgICAgIHRoaXMuaW5pdGlhbGl6ZUVsZW1lbnRzKHRoaXMuJGVsLCAoKSA9PiB7fSwgY29tcG9uZW50Rm9yQ2xvbmUpOyAvLyBVc2UgbXV0YXRpb24gb2JzZXJ2ZXIgdG8gZGV0ZWN0IG5ldyBlbGVtZW50cyBiZWluZyBhZGRlZCB3aXRoaW4gdGhpcyBjb21wb25lbnQgYXQgcnVuLXRpbWUuXG4gICAgICAvLyBBbHBpbmUncyBqdXN0IHNvIGRhcm4gZmxleGlibGUgYW1pcml0ZT9cblxuICAgICAgdGhpcy5saXN0ZW5Gb3JOZXdFbGVtZW50c1RvSW5pdGlhbGl6ZSgpO1xuXG4gICAgICBpZiAodHlwZW9mIGluaXRSZXR1cm5lZENhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIFJ1biB0aGUgY2FsbGJhY2sgcmV0dXJuZWQgZnJvbSB0aGUgXCJ4LWluaXRcIiBob29rIHRvIGFsbG93IHRoZSB1c2VyIHRvIGRvIHN0dWZmIGFmdGVyXG4gICAgICAgIC8vIEFscGluZSdzIGdvdCBpdCdzIGdydWJieSBsaXR0bGUgcGF3cyBhbGwgb3ZlciBldmVyeXRoaW5nLlxuICAgICAgICBpbml0UmV0dXJuZWRDYWxsYmFjay5jYWxsKHRoaXMuJGRhdGEpO1xuICAgICAgfVxuXG4gICAgICBjb21wb25lbnRGb3JDbG9uZSB8fCBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgQWxwaW5lLm9uQ29tcG9uZW50SW5pdGlhbGl6ZWRzLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2sodGhpcykpO1xuICAgICAgfSwgMCk7XG4gICAgfVxuXG4gICAgZ2V0VW5vYnNlcnZlZERhdGEoKSB7XG4gICAgICByZXR1cm4gdW53cmFwJDEodGhpcy5tZW1icmFuZSwgdGhpcy4kZGF0YSk7XG4gICAgfVxuXG4gICAgd3JhcERhdGFJbk9ic2VydmFibGUoZGF0YSkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgbGV0IHVwZGF0ZURvbSA9IGRlYm91bmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi51cGRhdGVFbGVtZW50cyhzZWxmLiRlbCk7XG4gICAgICB9LCAwKTtcbiAgICAgIHJldHVybiB3cmFwKGRhdGEsICh0YXJnZXQsIGtleSkgPT4ge1xuICAgICAgICBpZiAoc2VsZi53YXRjaGVyc1trZXldKSB7XG4gICAgICAgICAgLy8gSWYgdGhlcmUncyBhIHdhdGNoZXIgZm9yIHRoaXMgc3BlY2lmaWMga2V5LCBydW4gaXQuXG4gICAgICAgICAgc2VsZi53YXRjaGVyc1trZXldLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2sodGFyZ2V0W2tleV0pKTtcbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkpIHtcbiAgICAgICAgICAvLyBBcnJheXMgYXJlIHNwZWNpYWwgY2FzZXMsIGlmIGFueSBvZiB0aGUgaXRlbXMgY2hhbmdlLCB3ZSBjb25zaWRlciB0aGUgYXJyYXkgYXMgbXV0YXRlZC5cbiAgICAgICAgICBPYmplY3Qua2V5cyhzZWxmLndhdGNoZXJzKS5mb3JFYWNoKGZ1bGxEb3ROb3RhdGlvbktleSA9PiB7XG4gICAgICAgICAgICBsZXQgZG90Tm90YXRpb25QYXJ0cyA9IGZ1bGxEb3ROb3RhdGlvbktleS5zcGxpdCgnLicpOyAvLyBJZ25vcmUgbGVuZ3RoIG11dGF0aW9ucyBzaW5jZSB0aGV5IHdvdWxkIHJlc3VsdCBpbiBkdXBsaWNhdGUgY2FsbHMuXG4gICAgICAgICAgICAvLyBGb3IgZXhhbXBsZSwgd2hlbiBjYWxsaW5nIHB1c2gsIHdlIHdvdWxkIGdldCBhIG11dGF0aW9uIGZvciB0aGUgaXRlbSdzIGtleVxuICAgICAgICAgICAgLy8gYW5kIGEgc2Vjb25kIG11dGF0aW9uIGZvciB0aGUgbGVuZ3RoIHByb3BlcnR5LlxuXG4gICAgICAgICAgICBpZiAoa2V5ID09PSAnbGVuZ3RoJykgcmV0dXJuO1xuICAgICAgICAgICAgZG90Tm90YXRpb25QYXJ0cy5yZWR1Y2UoKGNvbXBhcmlzb25EYXRhLCBwYXJ0KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChPYmplY3QuaXModGFyZ2V0LCBjb21wYXJpc29uRGF0YVtwYXJ0XSkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLndhdGNoZXJzW2Z1bGxEb3ROb3RhdGlvbktleV0uZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjayh0YXJnZXQpKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiBjb21wYXJpc29uRGF0YVtwYXJ0XTtcbiAgICAgICAgICAgIH0sIHNlbGYudW5vYnNlcnZlZERhdGEpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIExldCdzIHdhbGsgdGhyb3VnaCB0aGUgd2F0Y2hlcnMgd2l0aCBcImRvdC1ub3RhdGlvblwiIChmb28uYmFyKSBhbmQgc2VlXG4gICAgICAgICAgLy8gaWYgdGhpcyBtdXRhdGlvbiBmaXRzIGFueSBvZiB0aGVtLlxuICAgICAgICAgIE9iamVjdC5rZXlzKHNlbGYud2F0Y2hlcnMpLmZpbHRlcihpID0+IGkuaW5jbHVkZXMoJy4nKSkuZm9yRWFjaChmdWxsRG90Tm90YXRpb25LZXkgPT4ge1xuICAgICAgICAgICAgbGV0IGRvdE5vdGF0aW9uUGFydHMgPSBmdWxsRG90Tm90YXRpb25LZXkuc3BsaXQoJy4nKTsgLy8gSWYgdGhpcyBkb3Qtbm90YXRpb24gd2F0Y2hlcidzIGxhc3QgXCJwYXJ0XCIgZG9lc24ndCBtYXRjaCB0aGUgY3VycmVudFxuICAgICAgICAgICAgLy8ga2V5LCB0aGVuIHNraXAgaXQgZWFybHkgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMuXG5cbiAgICAgICAgICAgIGlmIChrZXkgIT09IGRvdE5vdGF0aW9uUGFydHNbZG90Tm90YXRpb25QYXJ0cy5sZW5ndGggLSAxXSkgcmV0dXJuOyAvLyBOb3csIHdhbGsgdGhyb3VnaCB0aGUgZG90LW5vdGF0aW9uIFwicGFydHNcIiByZWN1cnNpdmVseSB0byBmaW5kXG4gICAgICAgICAgICAvLyBhIG1hdGNoLCBhbmQgY2FsbCB0aGUgd2F0Y2hlciBpZiBvbmUncyBmb3VuZC5cblxuICAgICAgICAgICAgZG90Tm90YXRpb25QYXJ0cy5yZWR1Y2UoKGNvbXBhcmlzb25EYXRhLCBwYXJ0KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChPYmplY3QuaXModGFyZ2V0LCBjb21wYXJpc29uRGF0YSkpIHtcbiAgICAgICAgICAgICAgICAvLyBSdW4gdGhlIHdhdGNoZXJzLlxuICAgICAgICAgICAgICAgIHNlbGYud2F0Y2hlcnNbZnVsbERvdE5vdGF0aW9uS2V5XS5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKHRhcmdldFtrZXldKSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4gY29tcGFyaXNvbkRhdGFbcGFydF07XG4gICAgICAgICAgICB9LCBzZWxmLnVub2JzZXJ2ZWREYXRhKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSAvLyBEb24ndCByZWFjdCB0byBkYXRhIGNoYW5nZXMgZm9yIGNhc2VzIGxpa2UgdGhlIGB4LWNyZWF0ZWRgIGhvb2suXG5cblxuICAgICAgICBpZiAoc2VsZi5wYXVzZVJlYWN0aXZpdHkpIHJldHVybjtcbiAgICAgICAgdXBkYXRlRG9tKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB3YWxrQW5kU2tpcE5lc3RlZENvbXBvbmVudHMoZWwsIGNhbGxiYWNrLCBpbml0aWFsaXplQ29tcG9uZW50Q2FsbGJhY2sgPSAoKSA9PiB7fSkge1xuICAgICAgd2FsayhlbCwgZWwgPT4ge1xuICAgICAgICAvLyBXZSd2ZSBoaXQgYSBjb21wb25lbnQuXG4gICAgICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoJ3gtZGF0YScpKSB7XG4gICAgICAgICAgLy8gSWYgaXQncyBub3QgdGhlIGN1cnJlbnQgb25lLlxuICAgICAgICAgIGlmICghZWwuaXNTYW1lTm9kZSh0aGlzLiRlbCkpIHtcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgaXQgaWYgaXQncyBub3QuXG4gICAgICAgICAgICBpZiAoIWVsLl9feCkgaW5pdGlhbGl6ZUNvbXBvbmVudENhbGxiYWNrKGVsKTsgLy8gTm93IHdlJ2xsIGxldCB0aGF0IHN1Yi1jb21wb25lbnQgZGVhbCB3aXRoIGl0c2VsZi5cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlbCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplRWxlbWVudHMocm9vdEVsLCBleHRyYVZhcnMgPSAoKSA9PiB7fSwgY29tcG9uZW50Rm9yQ2xvbmUgPSBmYWxzZSkge1xuICAgICAgdGhpcy53YWxrQW5kU2tpcE5lc3RlZENvbXBvbmVudHMocm9vdEVsLCBlbCA9PiB7XG4gICAgICAgIC8vIERvbid0IHRvdWNoIHNwYXducyBmcm9tIGZvciBsb29wXG4gICAgICAgIGlmIChlbC5fX3hfZm9yX2tleSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7IC8vIERvbid0IHRvdWNoIHNwYXducyBmcm9tIGlmIGRpcmVjdGl2ZXNcblxuICAgICAgICBpZiAoZWwuX194X2luc2VydGVkX21lICE9PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplRWxlbWVudChlbCwgZXh0cmFWYXJzLCBjb21wb25lbnRGb3JDbG9uZSA/IGZhbHNlIDogdHJ1ZSk7XG4gICAgICB9LCBlbCA9PiB7XG4gICAgICAgIGlmICghY29tcG9uZW50Rm9yQ2xvbmUpIGVsLl9feCA9IG5ldyBDb21wb25lbnQoZWwpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmV4ZWN1dGVBbmRDbGVhclJlbWFpbmluZ1Nob3dEaXJlY3RpdmVTdGFjaygpO1xuICAgICAgdGhpcy5leGVjdXRlQW5kQ2xlYXJOZXh0VGlja1N0YWNrKHJvb3RFbCk7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZUVsZW1lbnQoZWwsIGV4dHJhVmFycywgc2hvdWxkUmVnaXN0ZXJMaXN0ZW5lcnMgPSB0cnVlKSB7XG4gICAgICAvLyBUbyBzdXBwb3J0IGNsYXNzIGF0dHJpYnV0ZSBtZXJnaW5nLCB3ZSBoYXZlIHRvIGtub3cgd2hhdCB0aGUgZWxlbWVudCdzXG4gICAgICAvLyBvcmlnaW5hbCBjbGFzcyBhdHRyaWJ1dGUgbG9va2VkIGxpa2UgZm9yIHJlZmVyZW5jZS5cbiAgICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoJ2NsYXNzJykgJiYgZ2V0WEF0dHJzKGVsLCB0aGlzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGVsLl9feF9vcmlnaW5hbF9jbGFzc2VzID0gY29udmVydENsYXNzU3RyaW5nVG9BcnJheShlbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykpO1xuICAgICAgfVxuXG4gICAgICBzaG91bGRSZWdpc3Rlckxpc3RlbmVycyAmJiB0aGlzLnJlZ2lzdGVyTGlzdGVuZXJzKGVsLCBleHRyYVZhcnMpO1xuICAgICAgdGhpcy5yZXNvbHZlQm91bmRBdHRyaWJ1dGVzKGVsLCB0cnVlLCBleHRyYVZhcnMpO1xuICAgIH1cblxuICAgIHVwZGF0ZUVsZW1lbnRzKHJvb3RFbCwgZXh0cmFWYXJzID0gKCkgPT4ge30pIHtcbiAgICAgIHRoaXMud2Fsa0FuZFNraXBOZXN0ZWRDb21wb25lbnRzKHJvb3RFbCwgZWwgPT4ge1xuICAgICAgICAvLyBEb24ndCB0b3VjaCBzcGF3bnMgZnJvbSBmb3IgbG9vcCAoYW5kIGNoZWNrIGlmIHRoZSByb290IGlzIGFjdHVhbGx5IGEgZm9yIGxvb3AgaW4gYSBwYXJlbnQsIGRvbid0IHNraXAgaXQuKVxuICAgICAgICBpZiAoZWwuX194X2Zvcl9rZXkgIT09IHVuZGVmaW5lZCAmJiAhZWwuaXNTYW1lTm9kZSh0aGlzLiRlbCkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgdGhpcy51cGRhdGVFbGVtZW50KGVsLCBleHRyYVZhcnMpO1xuICAgICAgfSwgZWwgPT4ge1xuICAgICAgICBlbC5fX3ggPSBuZXcgQ29tcG9uZW50KGVsKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5leGVjdXRlQW5kQ2xlYXJSZW1haW5pbmdTaG93RGlyZWN0aXZlU3RhY2soKTtcbiAgICAgIHRoaXMuZXhlY3V0ZUFuZENsZWFyTmV4dFRpY2tTdGFjayhyb290RWwpO1xuICAgIH1cblxuICAgIGV4ZWN1dGVBbmRDbGVhck5leHRUaWNrU3RhY2soZWwpIHtcbiAgICAgIC8vIFNraXAgc3Bhd25zIGZyb20gYWxwaW5lIGRpcmVjdGl2ZXNcbiAgICAgIGlmIChlbCA9PT0gdGhpcy4kZWwgJiYgdGhpcy5uZXh0VGlja1N0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gV2UgcnVuIHRoZSB0aWNrIHN0YWNrIGFmdGVyIHRoZSBuZXh0IGZyYW1lIHRvIGFsbG93IGFueVxuICAgICAgICAvLyBydW5uaW5nIHRyYW5zaXRpb25zIHRvIHBhc3MgdGhlIGluaXRpYWwgc2hvdyBzdGFnZS5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICB3aGlsZSAodGhpcy5uZXh0VGlja1N0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMubmV4dFRpY2tTdGFjay5zaGlmdCgpKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBleGVjdXRlQW5kQ2xlYXJSZW1haW5pbmdTaG93RGlyZWN0aXZlU3RhY2soKSB7XG4gICAgICAvLyBUaGUgZ29hbCBoZXJlIGlzIHRvIHN0YXJ0IGFsbCB0aGUgeC1zaG93IHRyYW5zaXRpb25zXG4gICAgICAvLyBhbmQgYnVpbGQgYSBuZXN0ZWQgcHJvbWlzZSBjaGFpbiBzbyB0aGF0IGVsZW1lbnRzXG4gICAgICAvLyBvbmx5IGhpZGUgd2hlbiB0aGUgY2hpbGRyZW4gYXJlIGZpbmlzaGVkIGhpZGluZy5cbiAgICAgIHRoaXMuc2hvd0RpcmVjdGl2ZVN0YWNrLnJldmVyc2UoKS5tYXAoaGFuZGxlciA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgaGFuZGxlcihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH0pLnJlZHVjZSgocHJvbWlzZUNoYWluLCBwcm9taXNlKSA9PiB7XG4gICAgICAgIHJldHVybiBwcm9taXNlQ2hhaW4udGhlbigoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihmaW5pc2hFbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGZpbmlzaEVsZW1lbnQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9LCBQcm9taXNlLnJlc29sdmUoKCkgPT4ge30pKS5jYXRjaChlID0+IHtcbiAgICAgICAgaWYgKGUgIT09IFRSQU5TSVRJT05fQ0FOQ0VMTEVEKSB0aHJvdyBlO1xuICAgICAgfSk7IC8vIFdlJ3ZlIHByb2Nlc3NlZCB0aGUgaGFuZGxlciBzdGFjay4gbGV0J3MgY2xlYXIgaXQuXG5cbiAgICAgIHRoaXMuc2hvd0RpcmVjdGl2ZVN0YWNrID0gW107XG4gICAgICB0aGlzLnNob3dEaXJlY3RpdmVMYXN0RWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB1cGRhdGVFbGVtZW50KGVsLCBleHRyYVZhcnMpIHtcbiAgICAgIHRoaXMucmVzb2x2ZUJvdW5kQXR0cmlidXRlcyhlbCwgZmFsc2UsIGV4dHJhVmFycyk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJMaXN0ZW5lcnMoZWwsIGV4dHJhVmFycykge1xuICAgICAgZ2V0WEF0dHJzKGVsLCB0aGlzKS5mb3JFYWNoKCh7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBtb2RpZmllcnMsXG4gICAgICAgIGV4cHJlc3Npb25cbiAgICAgIH0pID0+IHtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgY2FzZSAnb24nOlxuICAgICAgICAgICAgcmVnaXN0ZXJMaXN0ZW5lcih0aGlzLCBlbCwgdmFsdWUsIG1vZGlmaWVycywgZXhwcmVzc2lvbiwgZXh0cmFWYXJzKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnbW9kZWwnOlxuICAgICAgICAgICAgcmVnaXN0ZXJNb2RlbExpc3RlbmVyKHRoaXMsIGVsLCBtb2RpZmllcnMsIGV4cHJlc3Npb24sIGV4dHJhVmFycyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVzb2x2ZUJvdW5kQXR0cmlidXRlcyhlbCwgaW5pdGlhbFVwZGF0ZSA9IGZhbHNlLCBleHRyYVZhcnMpIHtcbiAgICAgIGxldCBhdHRycyA9IGdldFhBdHRycyhlbCwgdGhpcyk7XG4gICAgICBhdHRycy5mb3JFYWNoKCh7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBtb2RpZmllcnMsXG4gICAgICAgIGV4cHJlc3Npb25cbiAgICAgIH0pID0+IHtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgY2FzZSAnbW9kZWwnOlxuICAgICAgICAgICAgaGFuZGxlQXR0cmlidXRlQmluZGluZ0RpcmVjdGl2ZSh0aGlzLCBlbCwgJ3ZhbHVlJywgZXhwcmVzc2lvbiwgZXh0cmFWYXJzLCB0eXBlLCBtb2RpZmllcnMpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdiaW5kJzpcbiAgICAgICAgICAgIC8vIFRoZSA6a2V5IGJpbmRpbmcgb24gYW4geC1mb3IgaXMgc3BlY2lhbCwgaWdub3JlIGl0LlxuICAgICAgICAgICAgaWYgKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RlbXBsYXRlJyAmJiB2YWx1ZSA9PT0gJ2tleScpIHJldHVybjtcbiAgICAgICAgICAgIGhhbmRsZUF0dHJpYnV0ZUJpbmRpbmdEaXJlY3RpdmUodGhpcywgZWwsIHZhbHVlLCBleHByZXNzaW9uLCBleHRyYVZhcnMsIHR5cGUsIG1vZGlmaWVycyk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgICAgdmFyIG91dHB1dCA9IHRoaXMuZXZhbHVhdGVSZXR1cm5FeHByZXNzaW9uKGVsLCBleHByZXNzaW9uLCBleHRyYVZhcnMpO1xuICAgICAgICAgICAgaGFuZGxlVGV4dERpcmVjdGl2ZShlbCwgb3V0cHV0LCBleHByZXNzaW9uKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnaHRtbCc6XG4gICAgICAgICAgICBoYW5kbGVIdG1sRGlyZWN0aXZlKHRoaXMsIGVsLCBleHByZXNzaW9uLCBleHRyYVZhcnMpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdzaG93JzpcbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSB0aGlzLmV2YWx1YXRlUmV0dXJuRXhwcmVzc2lvbihlbCwgZXhwcmVzc2lvbiwgZXh0cmFWYXJzKTtcbiAgICAgICAgICAgIGhhbmRsZVNob3dEaXJlY3RpdmUodGhpcywgZWwsIG91dHB1dCwgbW9kaWZpZXJzLCBpbml0aWFsVXBkYXRlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnaWYnOlxuICAgICAgICAgICAgLy8gSWYgdGhpcyBlbGVtZW50IGFsc28gaGFzIHgtZm9yIG9uIGl0LCBkb24ndCBwcm9jZXNzIHgtaWYuXG4gICAgICAgICAgICAvLyBXZSB3aWxsIGxldCB0aGUgXCJ4LWZvclwiIGRpcmVjdGl2ZSBoYW5kbGUgdGhlIFwiaWZcImluZy5cbiAgICAgICAgICAgIGlmIChhdHRycy5zb21lKGkgPT4gaS50eXBlID09PSAnZm9yJykpIHJldHVybjtcbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSB0aGlzLmV2YWx1YXRlUmV0dXJuRXhwcmVzc2lvbihlbCwgZXhwcmVzc2lvbiwgZXh0cmFWYXJzKTtcbiAgICAgICAgICAgIGhhbmRsZUlmRGlyZWN0aXZlKHRoaXMsIGVsLCBvdXRwdXQsIGluaXRpYWxVcGRhdGUsIGV4dHJhVmFycyk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ2Zvcic6XG4gICAgICAgICAgICBoYW5kbGVGb3JEaXJlY3RpdmUodGhpcywgZWwsIGV4cHJlc3Npb24sIGluaXRpYWxVcGRhdGUsIGV4dHJhVmFycyk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ2Nsb2FrJzpcbiAgICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgneC1jbG9haycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGV2YWx1YXRlUmV0dXJuRXhwcmVzc2lvbihlbCwgZXhwcmVzc2lvbiwgZXh0cmFWYXJzID0gKCkgPT4ge30pIHtcbiAgICAgIHJldHVybiBzYWZlckV2YWwoZWwsIGV4cHJlc3Npb24sIHRoaXMuJGRhdGEsIF9vYmplY3RTcHJlYWQyKF9vYmplY3RTcHJlYWQyKHt9LCBleHRyYVZhcnMoKSksIHt9LCB7XG4gICAgICAgICRkaXNwYXRjaDogdGhpcy5nZXREaXNwYXRjaEZ1bmN0aW9uKGVsKVxuICAgICAgfSkpO1xuICAgIH1cblxuICAgIGV2YWx1YXRlQ29tbWFuZEV4cHJlc3Npb24oZWwsIGV4cHJlc3Npb24sIGV4dHJhVmFycyA9ICgpID0+IHt9KSB7XG4gICAgICByZXR1cm4gc2FmZXJFdmFsTm9SZXR1cm4oZWwsIGV4cHJlc3Npb24sIHRoaXMuJGRhdGEsIF9vYmplY3RTcHJlYWQyKF9vYmplY3RTcHJlYWQyKHt9LCBleHRyYVZhcnMoKSksIHt9LCB7XG4gICAgICAgICRkaXNwYXRjaDogdGhpcy5nZXREaXNwYXRjaEZ1bmN0aW9uKGVsKVxuICAgICAgfSkpO1xuICAgIH1cblxuICAgIGdldERpc3BhdGNoRnVuY3Rpb24oZWwpIHtcbiAgICAgIHJldHVybiAoZXZlbnQsIGRldGFpbCA9IHt9KSA9PiB7XG4gICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGV2ZW50LCB7XG4gICAgICAgICAgZGV0YWlsLFxuICAgICAgICAgIGJ1YmJsZXM6IHRydWVcbiAgICAgICAgfSkpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBsaXN0ZW5Gb3JOZXdFbGVtZW50c1RvSW5pdGlhbGl6ZSgpIHtcbiAgICAgIGNvbnN0IHRhcmdldE5vZGUgPSB0aGlzLiRlbDtcbiAgICAgIGNvbnN0IG9ic2VydmVyT3B0aW9ucyA9IHtcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgICBzdWJ0cmVlOiB0cnVlXG4gICAgICB9O1xuICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbnMgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG11dGF0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIC8vIEZpbHRlciBvdXQgbXV0YXRpb25zIHRyaWdnZXJlZCBmcm9tIGNoaWxkIGNvbXBvbmVudHMuXG4gICAgICAgICAgY29uc3QgY2xvc2VzdFBhcmVudENvbXBvbmVudCA9IG11dGF0aW9uc1tpXS50YXJnZXQuY2xvc2VzdCgnW3gtZGF0YV0nKTtcbiAgICAgICAgICBpZiAoIShjbG9zZXN0UGFyZW50Q29tcG9uZW50ICYmIGNsb3Nlc3RQYXJlbnRDb21wb25lbnQuaXNTYW1lTm9kZSh0aGlzLiRlbCkpKSBjb250aW51ZTtcblxuICAgICAgICAgIGlmIChtdXRhdGlvbnNbaV0udHlwZSA9PT0gJ2F0dHJpYnV0ZXMnICYmIG11dGF0aW9uc1tpXS5hdHRyaWJ1dGVOYW1lID09PSAneC1kYXRhJykge1xuICAgICAgICAgICAgY29uc3QgeEF0dHIgPSBtdXRhdGlvbnNbaV0udGFyZ2V0LmdldEF0dHJpYnV0ZSgneC1kYXRhJykgfHwgJ3t9JztcbiAgICAgICAgICAgIGNvbnN0IHJhd0RhdGEgPSBzYWZlckV2YWwodGhpcy4kZWwsIHhBdHRyLCB7XG4gICAgICAgICAgICAgICRlbDogdGhpcy4kZWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgT2JqZWN0LmtleXMocmF3RGF0YSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy4kZGF0YVtrZXldICE9PSByYXdEYXRhW2tleV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRkYXRhW2tleV0gPSByYXdEYXRhW2tleV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChtdXRhdGlvbnNbaV0uYWRkZWROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBtdXRhdGlvbnNbaV0uYWRkZWROb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSAhPT0gMSB8fCBub2RlLl9feF9pbnNlcnRlZF9tZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgIGlmIChub2RlLm1hdGNoZXMoJ1t4LWRhdGFdJykgJiYgIW5vZGUuX194KSB7XG4gICAgICAgICAgICAgICAgbm9kZS5fX3ggPSBuZXcgQ29tcG9uZW50KG5vZGUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZUVsZW1lbnRzKG5vZGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0Tm9kZSwgb2JzZXJ2ZXJPcHRpb25zKTtcbiAgICB9XG5cbiAgICBnZXRSZWZzUHJveHkoKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB2YXIgcmVmT2JqID0ge307XG4gICAgICAvLyBPbmUgb2YgdGhlIGdvYWxzIG9mIHRoaXMgaXMgdG8gbm90IGhvbGQgZWxlbWVudHMgaW4gbWVtb3J5LCBidXQgcmF0aGVyIHJlLWV2YWx1YXRlXG4gICAgICAvLyB0aGUgRE9NIHdoZW4gdGhlIHN5c3RlbSBuZWVkcyBzb21ldGhpbmcgZnJvbSBpdC4gVGhpcyB3YXksIHRoZSBmcmFtZXdvcmsgaXMgZmxleGlibGUgYW5kXG4gICAgICAvLyBmcmllbmRseSB0byBvdXRzaWRlIERPTSBjaGFuZ2VzIGZyb20gbGlicmFyaWVzIGxpa2UgVnVlL0xpdmV3aXJlLlxuICAgICAgLy8gRm9yIHRoaXMgcmVhc29uLCBJJ20gdXNpbmcgYW4gXCJvbi1kZW1hbmRcIiBwcm94eSB0byBmYWtlIGEgXCIkcmVmc1wiIG9iamVjdC5cblxuICAgICAgcmV0dXJuIG5ldyBQcm94eShyZWZPYmosIHtcbiAgICAgICAgZ2V0KG9iamVjdCwgcHJvcGVydHkpIHtcbiAgICAgICAgICBpZiAocHJvcGVydHkgPT09ICckaXNBbHBpbmVQcm94eScpIHJldHVybiB0cnVlO1xuICAgICAgICAgIHZhciByZWY7IC8vIFdlIGNhbid0IGp1c3QgcXVlcnkgdGhlIERPTSBiZWNhdXNlIGl0J3MgaGFyZCB0byBmaWx0ZXIgb3V0IHJlZnMgaW5cbiAgICAgICAgICAvLyBuZXN0ZWQgY29tcG9uZW50cy5cblxuICAgICAgICAgIHNlbGYud2Fsa0FuZFNraXBOZXN0ZWRDb21wb25lbnRzKHNlbGYuJGVsLCBlbCA9PiB7XG4gICAgICAgICAgICBpZiAoZWwuaGFzQXR0cmlidXRlKCd4LXJlZicpICYmIGVsLmdldEF0dHJpYnV0ZSgneC1yZWYnKSA9PT0gcHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgcmVmID0gZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHJlZjtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICB9XG5cbiAgfVxuXG4gIGNvbnN0IEFscGluZSA9IHtcbiAgICB2ZXJzaW9uOiBcIjIuOC4yXCIsXG4gICAgcGF1c2VNdXRhdGlvbk9ic2VydmVyOiBmYWxzZSxcbiAgICBtYWdpY1Byb3BlcnRpZXM6IHt9LFxuICAgIG9uQ29tcG9uZW50SW5pdGlhbGl6ZWRzOiBbXSxcbiAgICBvbkJlZm9yZUNvbXBvbmVudEluaXRpYWxpemVkczogW10sXG4gICAgaWdub3JlRm9jdXNlZEZvclZhbHVlQmluZGluZzogZmFsc2UsXG4gICAgc3RhcnQ6IGFzeW5jIGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgaWYgKCFpc1Rlc3RpbmcoKSkge1xuICAgICAgICBhd2FpdCBkb21SZWFkeSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRpc2NvdmVyQ29tcG9uZW50cyhlbCA9PiB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUNvbXBvbmVudChlbCk7XG4gICAgICB9KTsgLy8gSXQncyBlYXNpZXIgYW5kIG1vcmUgcGVyZm9ybWFudCB0byBqdXN0IHN1cHBvcnQgVHVyYm9saW5rcyB0aGFuIGxpc3RlblxuICAgICAgLy8gdG8gTXV0YXRpb25PYnNlcnZlciBtdXRhdGlvbnMgYXQgdGhlIGRvY3VtZW50IGxldmVsLlxuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidHVyYm9saW5rczpsb2FkXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5kaXNjb3ZlclVuaW5pdGlhbGl6ZWRDb21wb25lbnRzKGVsID0+IHtcbiAgICAgICAgICB0aGlzLmluaXRpYWxpemVDb21wb25lbnQoZWwpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5saXN0ZW5Gb3JOZXdVbmluaXRpYWxpemVkQ29tcG9uZW50c0F0UnVuVGltZSgpO1xuICAgIH0sXG4gICAgZGlzY292ZXJDb21wb25lbnRzOiBmdW5jdGlvbiBkaXNjb3ZlckNvbXBvbmVudHMoY2FsbGJhY2spIHtcbiAgICAgIGNvbnN0IHJvb3RFbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbeC1kYXRhXScpO1xuICAgICAgcm9vdEVscy5mb3JFYWNoKHJvb3RFbCA9PiB7XG4gICAgICAgIGNhbGxiYWNrKHJvb3RFbCk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGRpc2NvdmVyVW5pbml0aWFsaXplZENvbXBvbmVudHM6IGZ1bmN0aW9uIGRpc2NvdmVyVW5pbml0aWFsaXplZENvbXBvbmVudHMoY2FsbGJhY2ssIGVsID0gbnVsbCkge1xuICAgICAgY29uc3Qgcm9vdEVscyA9IChlbCB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbCgnW3gtZGF0YV0nKTtcbiAgICAgIEFycmF5LmZyb20ocm9vdEVscykuZmlsdGVyKGVsID0+IGVsLl9feCA9PT0gdW5kZWZpbmVkKS5mb3JFYWNoKHJvb3RFbCA9PiB7XG4gICAgICAgIGNhbGxiYWNrKHJvb3RFbCk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGxpc3RlbkZvck5ld1VuaW5pdGlhbGl6ZWRDb21wb25lbnRzQXRSdW5UaW1lOiBmdW5jdGlvbiBsaXN0ZW5Gb3JOZXdVbmluaXRpYWxpemVkQ29tcG9uZW50c0F0UnVuVGltZSgpIHtcbiAgICAgIGNvbnN0IHRhcmdldE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgICBjb25zdCBvYnNlcnZlck9wdGlvbnMgPSB7XG4gICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgICAgc3VidHJlZTogdHJ1ZVxuICAgICAgfTtcbiAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25zID0+IHtcbiAgICAgICAgaWYgKHRoaXMucGF1c2VNdXRhdGlvbk9ic2VydmVyKSByZXR1cm47XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtdXRhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAobXV0YXRpb25zW2ldLmFkZGVkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbXV0YXRpb25zW2ldLmFkZGVkTm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgICAgLy8gRGlzY2FyZCBub24tZWxlbWVudCBub2RlcyAobGlrZSBsaW5lLWJyZWFrcylcbiAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgIT09IDEpIHJldHVybjsgLy8gRGlzY2FyZCBhbnkgY2hhbmdlcyBoYXBwZW5pbmcgd2l0aGluIGFuIGV4aXN0aW5nIGNvbXBvbmVudC5cbiAgICAgICAgICAgICAgLy8gVGhleSB3aWxsIHRha2UgY2FyZSBvZiB0aGVtc2VsdmVzLlxuXG4gICAgICAgICAgICAgIGlmIChub2RlLnBhcmVudEVsZW1lbnQgJiYgbm9kZS5wYXJlbnRFbGVtZW50LmNsb3Nlc3QoJ1t4LWRhdGFdJykpIHJldHVybjtcbiAgICAgICAgICAgICAgdGhpcy5kaXNjb3ZlclVuaW5pdGlhbGl6ZWRDb21wb25lbnRzKGVsID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVDb21wb25lbnQoZWwpO1xuICAgICAgICAgICAgICB9LCBub2RlLnBhcmVudEVsZW1lbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0Tm9kZSwgb2JzZXJ2ZXJPcHRpb25zKTtcbiAgICB9LFxuICAgIGluaXRpYWxpemVDb21wb25lbnQ6IGZ1bmN0aW9uIGluaXRpYWxpemVDb21wb25lbnQoZWwpIHtcbiAgICAgIGlmICghZWwuX194KSB7XG4gICAgICAgIC8vIFdyYXAgaW4gYSB0cnkvY2F0Y2ggc28gdGhhdCB3ZSBkb24ndCBwcmV2ZW50IG90aGVyIGNvbXBvbmVudHNcbiAgICAgICAgLy8gZnJvbSBpbml0aWFsaXppbmcgd2hlbiBvbmUgY29tcG9uZW50IGNvbnRhaW5zIGFuIGVycm9yLlxuICAgICAgICB0cnkge1xuICAgICAgICAgIGVsLl9feCA9IG5ldyBDb21wb25lbnQoZWwpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgfSwgMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGNsb25lOiBmdW5jdGlvbiBjbG9uZShjb21wb25lbnQsIG5ld0VsKSB7XG4gICAgICBpZiAoIW5ld0VsLl9feCkge1xuICAgICAgICBuZXdFbC5fX3ggPSBuZXcgQ29tcG9uZW50KG5ld0VsLCBjb21wb25lbnQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgYWRkTWFnaWNQcm9wZXJ0eTogZnVuY3Rpb24gYWRkTWFnaWNQcm9wZXJ0eShuYW1lLCBjYWxsYmFjaykge1xuICAgICAgdGhpcy5tYWdpY1Byb3BlcnRpZXNbbmFtZV0gPSBjYWxsYmFjaztcbiAgICB9LFxuICAgIG9uQ29tcG9uZW50SW5pdGlhbGl6ZWQ6IGZ1bmN0aW9uIG9uQ29tcG9uZW50SW5pdGlhbGl6ZWQoY2FsbGJhY2spIHtcbiAgICAgIHRoaXMub25Db21wb25lbnRJbml0aWFsaXplZHMucHVzaChjYWxsYmFjayk7XG4gICAgfSxcbiAgICBvbkJlZm9yZUNvbXBvbmVudEluaXRpYWxpemVkOiBmdW5jdGlvbiBvbkJlZm9yZUNvbXBvbmVudEluaXRpYWxpemVkKGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLm9uQmVmb3JlQ29tcG9uZW50SW5pdGlhbGl6ZWRzLnB1c2goY2FsbGJhY2spO1xuICAgIH1cbiAgfTtcblxuICBpZiAoIWlzVGVzdGluZygpKSB7XG4gICAgd2luZG93LkFscGluZSA9IEFscGluZTtcblxuICAgIGlmICh3aW5kb3cuZGVmZXJMb2FkaW5nQWxwaW5lKSB7XG4gICAgICB3aW5kb3cuZGVmZXJMb2FkaW5nQWxwaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93LkFscGluZS5zdGFydCgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5BbHBpbmUuc3RhcnQoKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gQWxwaW5lO1xuXG59KSkpO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBQb2x5ZmlsbEV2ZW50ID0gZXZlbnRDb25zdHJ1Y3RvcigpO1xuXG4gIGZ1bmN0aW9uIGV2ZW50Q29uc3RydWN0b3IoKSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHdpbmRvdy5DdXN0b21FdmVudDtcbiAgICAvLyBJRTw9OSBTdXBwb3J0XG4gICAgZnVuY3Rpb24gQ3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcykge1xuICAgICAgcGFyYW1zID0gcGFyYW1zIHx8IHtidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogZmFsc2UsIGRldGFpbDogdW5kZWZpbmVkfTtcbiAgICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbCk7XG4gICAgICByZXR1cm4gZXZ0O1xuICAgIH1cbiAgICBDdXN0b21FdmVudC5wcm90b3R5cGUgPSB3aW5kb3cuRXZlbnQucHJvdG90eXBlO1xuICAgIHJldHVybiBDdXN0b21FdmVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1aWxkSGlkZGVuSW5wdXQobmFtZSwgdmFsdWUpIHtcbiAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgaW5wdXQudHlwZSA9IFwiaGlkZGVuXCI7XG4gICAgaW5wdXQubmFtZSA9IG5hbWU7XG4gICAgaW5wdXQudmFsdWUgPSB2YWx1ZTtcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVDbGljayhlbGVtZW50LCB0YXJnZXRNb2RpZmllcktleSkge1xuICAgIHZhciB0byA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS10b1wiKSxcbiAgICAgICAgbWV0aG9kID0gYnVpbGRIaWRkZW5JbnB1dChcIl9tZXRob2RcIiwgZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1ldGhvZFwiKSksXG4gICAgICAgIGNzcmYgPSBidWlsZEhpZGRlbklucHV0KFwiX2NzcmZfdG9rZW5cIiwgZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNzcmZcIikpLFxuICAgICAgICBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIiksXG4gICAgICAgIHRhcmdldCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwidGFyZ2V0XCIpO1xuXG4gICAgZm9ybS5tZXRob2QgPSAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1ldGhvZFwiKSA9PT0gXCJnZXRcIikgPyBcImdldFwiIDogXCJwb3N0XCI7XG4gICAgZm9ybS5hY3Rpb24gPSB0bztcbiAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSBcImhpZGRlblwiO1xuXG4gICAgaWYgKHRhcmdldCkgZm9ybS50YXJnZXQgPSB0YXJnZXQ7XG4gICAgZWxzZSBpZiAodGFyZ2V0TW9kaWZpZXJLZXkpIGZvcm0udGFyZ2V0ID0gXCJfYmxhbmtcIjtcblxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoY3NyZik7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChtZXRob2QpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XG4gICAgZm9ybS5zdWJtaXQoKTtcbiAgfVxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgIHZhciBlbGVtZW50ID0gZS50YXJnZXQ7XG4gICAgaWYgKGUuZGVmYXVsdFByZXZlbnRlZCkgcmV0dXJuO1xuXG4gICAgd2hpbGUgKGVsZW1lbnQgJiYgZWxlbWVudC5nZXRBdHRyaWJ1dGUpIHtcbiAgICAgIHZhciBwaG9lbml4TGlua0V2ZW50ID0gbmV3IFBvbHlmaWxsRXZlbnQoJ3Bob2VuaXgubGluay5jbGljaycsIHtcbiAgICAgICAgXCJidWJibGVzXCI6IHRydWUsIFwiY2FuY2VsYWJsZVwiOiB0cnVlXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFlbGVtZW50LmRpc3BhdGNoRXZlbnQocGhvZW5peExpbmtFdmVudCkpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtbWV0aG9kXCIpKSB7XG4gICAgICAgIGhhbmRsZUNsaWNrKGVsZW1lbnQsIGUubWV0YUtleSB8fCBlLnNoaWZ0S2V5KTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgfVxuICAgIH1cbiAgfSwgZmFsc2UpO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwaG9lbml4LmxpbmsuY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBtZXNzYWdlID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb25maXJtXCIpO1xuICAgIGlmKG1lc3NhZ2UgJiYgIXdpbmRvdy5jb25maXJtKG1lc3NhZ2UpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9LCBmYWxzZSk7XG59KSgpO1xuIiwgIi8vIHdyYXBzIHZhbHVlIGluIGNsb3N1cmUgb3IgcmV0dXJucyBjbG9zdXJlXG5leHBvcnQgbGV0IGNsb3N1cmUgPSAodmFsdWUpID0+IHtcbiAgaWYodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpe1xuICAgIHJldHVybiB2YWx1ZVxuICB9IGVsc2Uge1xuICAgIGxldCBjbG9zdXJlID0gZnVuY3Rpb24gKCl7IHJldHVybiB2YWx1ZSB9XG4gICAgcmV0dXJuIGNsb3N1cmVcbiAgfVxufVxuIiwgImV4cG9ydCBjb25zdCBnbG9iYWxTZWxmID0gdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogbnVsbFxuZXhwb3J0IGNvbnN0IHBoeFdpbmRvdyA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiBudWxsXG5leHBvcnQgY29uc3QgZ2xvYmFsID0gZ2xvYmFsU2VsZiB8fCBwaHhXaW5kb3cgfHwgZ2xvYmFsXG5leHBvcnQgY29uc3QgREVGQVVMVF9WU04gPSBcIjIuMC4wXCJcbmV4cG9ydCBjb25zdCBTT0NLRVRfU1RBVEVTID0ge2Nvbm5lY3Rpbmc6IDAsIG9wZW46IDEsIGNsb3Npbmc6IDIsIGNsb3NlZDogM31cbmV4cG9ydCBjb25zdCBERUZBVUxUX1RJTUVPVVQgPSAxMDAwMFxuZXhwb3J0IGNvbnN0IFdTX0NMT1NFX05PUk1BTCA9IDEwMDBcbmV4cG9ydCBjb25zdCBDSEFOTkVMX1NUQVRFUyA9IHtcbiAgY2xvc2VkOiBcImNsb3NlZFwiLFxuICBlcnJvcmVkOiBcImVycm9yZWRcIixcbiAgam9pbmVkOiBcImpvaW5lZFwiLFxuICBqb2luaW5nOiBcImpvaW5pbmdcIixcbiAgbGVhdmluZzogXCJsZWF2aW5nXCIsXG59XG5leHBvcnQgY29uc3QgQ0hBTk5FTF9FVkVOVFMgPSB7XG4gIGNsb3NlOiBcInBoeF9jbG9zZVwiLFxuICBlcnJvcjogXCJwaHhfZXJyb3JcIixcbiAgam9pbjogXCJwaHhfam9pblwiLFxuICByZXBseTogXCJwaHhfcmVwbHlcIixcbiAgbGVhdmU6IFwicGh4X2xlYXZlXCJcbn1cblxuZXhwb3J0IGNvbnN0IFRSQU5TUE9SVFMgPSB7XG4gIGxvbmdwb2xsOiBcImxvbmdwb2xsXCIsXG4gIHdlYnNvY2tldDogXCJ3ZWJzb2NrZXRcIlxufVxuZXhwb3J0IGNvbnN0IFhIUl9TVEFURVMgPSB7XG4gIGNvbXBsZXRlOiA0XG59XG4iLCAiLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgUHVzaFxuICogQHBhcmFtIHtDaGFubmVsfSBjaGFubmVsIC0gVGhlIENoYW5uZWxcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCAtIFRoZSBldmVudCwgZm9yIGV4YW1wbGUgYFwicGh4X2pvaW5cImBcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXlsb2FkIC0gVGhlIHBheWxvYWQsIGZvciBleGFtcGxlIGB7dXNlcl9pZDogMTIzfWBcbiAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lb3V0IC0gVGhlIHB1c2ggdGltZW91dCBpbiBtaWxsaXNlY29uZHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVzaCB7XG4gIGNvbnN0cnVjdG9yKGNoYW5uZWwsIGV2ZW50LCBwYXlsb2FkLCB0aW1lb3V0KXtcbiAgICB0aGlzLmNoYW5uZWwgPSBjaGFubmVsXG4gICAgdGhpcy5ldmVudCA9IGV2ZW50XG4gICAgdGhpcy5wYXlsb2FkID0gcGF5bG9hZCB8fCBmdW5jdGlvbiAoKXsgcmV0dXJuIHt9IH1cbiAgICB0aGlzLnJlY2VpdmVkUmVzcCA9IG51bGxcbiAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0XG4gICAgdGhpcy50aW1lb3V0VGltZXIgPSBudWxsXG4gICAgdGhpcy5yZWNIb29rcyA9IFtdXG4gICAgdGhpcy5zZW50ID0gZmFsc2VcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZW91dFxuICAgKi9cbiAgcmVzZW5kKHRpbWVvdXQpe1xuICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXRcbiAgICB0aGlzLnJlc2V0KClcbiAgICB0aGlzLnNlbmQoKVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBzZW5kKCl7XG4gICAgaWYodGhpcy5oYXNSZWNlaXZlZChcInRpbWVvdXRcIikpeyByZXR1cm4gfVxuICAgIHRoaXMuc3RhcnRUaW1lb3V0KClcbiAgICB0aGlzLnNlbnQgPSB0cnVlXG4gICAgdGhpcy5jaGFubmVsLnNvY2tldC5wdXNoKHtcbiAgICAgIHRvcGljOiB0aGlzLmNoYW5uZWwudG9waWMsXG4gICAgICBldmVudDogdGhpcy5ldmVudCxcbiAgICAgIHBheWxvYWQ6IHRoaXMucGF5bG9hZCgpLFxuICAgICAgcmVmOiB0aGlzLnJlZixcbiAgICAgIGpvaW5fcmVmOiB0aGlzLmNoYW5uZWwuam9pblJlZigpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0geyp9IHN0YXR1c1xuICAgKiBAcGFyYW0geyp9IGNhbGxiYWNrXG4gICAqL1xuICByZWNlaXZlKHN0YXR1cywgY2FsbGJhY2spe1xuICAgIGlmKHRoaXMuaGFzUmVjZWl2ZWQoc3RhdHVzKSl7XG4gICAgICBjYWxsYmFjayh0aGlzLnJlY2VpdmVkUmVzcC5yZXNwb25zZSlcbiAgICB9XG5cbiAgICB0aGlzLnJlY0hvb2tzLnB1c2goe3N0YXR1cywgY2FsbGJhY2t9KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlc2V0KCl7XG4gICAgdGhpcy5jYW5jZWxSZWZFdmVudCgpXG4gICAgdGhpcy5yZWYgPSBudWxsXG4gICAgdGhpcy5yZWZFdmVudCA9IG51bGxcbiAgICB0aGlzLnJlY2VpdmVkUmVzcCA9IG51bGxcbiAgICB0aGlzLnNlbnQgPSBmYWxzZVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBtYXRjaFJlY2VpdmUoe3N0YXR1cywgcmVzcG9uc2UsIF9yZWZ9KXtcbiAgICB0aGlzLnJlY0hvb2tzLmZpbHRlcihoID0+IGguc3RhdHVzID09PSBzdGF0dXMpXG4gICAgICAuZm9yRWFjaChoID0+IGguY2FsbGJhY2socmVzcG9uc2UpKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjYW5jZWxSZWZFdmVudCgpe1xuICAgIGlmKCF0aGlzLnJlZkV2ZW50KXsgcmV0dXJuIH1cbiAgICB0aGlzLmNoYW5uZWwub2ZmKHRoaXMucmVmRXZlbnQpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNhbmNlbFRpbWVvdXQoKXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0VGltZXIpXG4gICAgdGhpcy50aW1lb3V0VGltZXIgPSBudWxsXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHN0YXJ0VGltZW91dCgpe1xuICAgIGlmKHRoaXMudGltZW91dFRpbWVyKXsgdGhpcy5jYW5jZWxUaW1lb3V0KCkgfVxuICAgIHRoaXMucmVmID0gdGhpcy5jaGFubmVsLnNvY2tldC5tYWtlUmVmKClcbiAgICB0aGlzLnJlZkV2ZW50ID0gdGhpcy5jaGFubmVsLnJlcGx5RXZlbnROYW1lKHRoaXMucmVmKVxuXG4gICAgdGhpcy5jaGFubmVsLm9uKHRoaXMucmVmRXZlbnQsIHBheWxvYWQgPT4ge1xuICAgICAgdGhpcy5jYW5jZWxSZWZFdmVudCgpXG4gICAgICB0aGlzLmNhbmNlbFRpbWVvdXQoKVxuICAgICAgdGhpcy5yZWNlaXZlZFJlc3AgPSBwYXlsb2FkXG4gICAgICB0aGlzLm1hdGNoUmVjZWl2ZShwYXlsb2FkKVxuICAgIH0pXG5cbiAgICB0aGlzLnRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy50cmlnZ2VyKFwidGltZW91dFwiLCB7fSlcbiAgICB9LCB0aGlzLnRpbWVvdXQpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhc1JlY2VpdmVkKHN0YXR1cyl7XG4gICAgcmV0dXJuIHRoaXMucmVjZWl2ZWRSZXNwICYmIHRoaXMucmVjZWl2ZWRSZXNwLnN0YXR1cyA9PT0gc3RhdHVzXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRyaWdnZXIoc3RhdHVzLCByZXNwb25zZSl7XG4gICAgdGhpcy5jaGFubmVsLnRyaWdnZXIodGhpcy5yZWZFdmVudCwge3N0YXR1cywgcmVzcG9uc2V9KVxuICB9XG59XG4iLCAiLyoqXG4gKlxuICogQ3JlYXRlcyBhIHRpbWVyIHRoYXQgYWNjZXB0cyBhIGB0aW1lckNhbGNgIGZ1bmN0aW9uIHRvIHBlcmZvcm1cbiAqIGNhbGN1bGF0ZWQgdGltZW91dCByZXRyaWVzLCBzdWNoIGFzIGV4cG9uZW50aWFsIGJhY2tvZmYuXG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCByZWNvbm5lY3RUaW1lciA9IG5ldyBUaW1lcigoKSA9PiB0aGlzLmNvbm5lY3QoKSwgZnVuY3Rpb24odHJpZXMpe1xuICogICByZXR1cm4gWzEwMDAsIDUwMDAsIDEwMDAwXVt0cmllcyAtIDFdIHx8IDEwMDAwXG4gKiB9KVxuICogcmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgLy8gZmlyZXMgYWZ0ZXIgMTAwMFxuICogcmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgLy8gZmlyZXMgYWZ0ZXIgNTAwMFxuICogcmVjb25uZWN0VGltZXIucmVzZXQoKVxuICogcmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgLy8gZmlyZXMgYWZ0ZXIgMTAwMFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0aW1lckNhbGNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZXIge1xuICBjb25zdHJ1Y3RvcihjYWxsYmFjaywgdGltZXJDYWxjKXtcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2tcbiAgICB0aGlzLnRpbWVyQ2FsYyA9IHRpbWVyQ2FsY1xuICAgIHRoaXMudGltZXIgPSBudWxsXG4gICAgdGhpcy50cmllcyA9IDBcbiAgfVxuXG4gIHJlc2V0KCl7XG4gICAgdGhpcy50cmllcyA9IDBcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcilcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW5jZWxzIGFueSBwcmV2aW91cyBzY2hlZHVsZVRpbWVvdXQgYW5kIHNjaGVkdWxlcyBjYWxsYmFja1xuICAgKi9cbiAgc2NoZWR1bGVUaW1lb3V0KCl7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpXG5cbiAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnRyaWVzID0gdGhpcy50cmllcyArIDFcbiAgICAgIHRoaXMuY2FsbGJhY2soKVxuICAgIH0sIHRoaXMudGltZXJDYWxjKHRoaXMudHJpZXMgKyAxKSlcbiAgfVxufVxuIiwgImltcG9ydCB7Y2xvc3VyZX0gZnJvbSBcIi4vdXRpbHNcIlxuaW1wb3J0IHtcbiAgQ0hBTk5FTF9FVkVOVFMsXG4gIENIQU5ORUxfU1RBVEVTLFxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQgUHVzaCBmcm9tIFwiLi9wdXNoXCJcbmltcG9ydCBUaW1lciBmcm9tIFwiLi90aW1lclwiXG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0b3BpY1xuICogQHBhcmFtIHsoT2JqZWN0fGZ1bmN0aW9uKX0gcGFyYW1zXG4gKiBAcGFyYW0ge1NvY2tldH0gc29ja2V0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYW5uZWwge1xuICBjb25zdHJ1Y3Rvcih0b3BpYywgcGFyYW1zLCBzb2NrZXQpe1xuICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5jbG9zZWRcbiAgICB0aGlzLnRvcGljID0gdG9waWNcbiAgICB0aGlzLnBhcmFtcyA9IGNsb3N1cmUocGFyYW1zIHx8IHt9KVxuICAgIHRoaXMuc29ja2V0ID0gc29ja2V0XG4gICAgdGhpcy5iaW5kaW5ncyA9IFtdXG4gICAgdGhpcy5iaW5kaW5nUmVmID0gMFxuICAgIHRoaXMudGltZW91dCA9IHRoaXMuc29ja2V0LnRpbWVvdXRcbiAgICB0aGlzLmpvaW5lZE9uY2UgPSBmYWxzZVxuICAgIHRoaXMuam9pblB1c2ggPSBuZXcgUHVzaCh0aGlzLCBDSEFOTkVMX0VWRU5UUy5qb2luLCB0aGlzLnBhcmFtcywgdGhpcy50aW1lb3V0KVxuICAgIHRoaXMucHVzaEJ1ZmZlciA9IFtdXG4gICAgdGhpcy5zdGF0ZUNoYW5nZVJlZnMgPSBbXVxuXG4gICAgdGhpcy5yZWpvaW5UaW1lciA9IG5ldyBUaW1lcigoKSA9PiB7XG4gICAgICBpZih0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5yZWpvaW4oKSB9XG4gICAgfSwgdGhpcy5zb2NrZXQucmVqb2luQWZ0ZXJNcylcbiAgICB0aGlzLnN0YXRlQ2hhbmdlUmVmcy5wdXNoKHRoaXMuc29ja2V0Lm9uRXJyb3IoKCkgPT4gdGhpcy5yZWpvaW5UaW1lci5yZXNldCgpKSlcbiAgICB0aGlzLnN0YXRlQ2hhbmdlUmVmcy5wdXNoKHRoaXMuc29ja2V0Lm9uT3BlbigoKSA9PiB7XG4gICAgICB0aGlzLnJlam9pblRpbWVyLnJlc2V0KClcbiAgICAgIGlmKHRoaXMuaXNFcnJvcmVkKCkpeyB0aGlzLnJlam9pbigpIH1cbiAgICB9KVxuICAgIClcbiAgICB0aGlzLmpvaW5QdXNoLnJlY2VpdmUoXCJva1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuam9pbmVkXG4gICAgICB0aGlzLnJlam9pblRpbWVyLnJlc2V0KClcbiAgICAgIHRoaXMucHVzaEJ1ZmZlci5mb3JFYWNoKHB1c2hFdmVudCA9PiBwdXNoRXZlbnQuc2VuZCgpKVxuICAgICAgdGhpcy5wdXNoQnVmZmVyID0gW11cbiAgICB9KVxuICAgIHRoaXMuam9pblB1c2gucmVjZWl2ZShcImVycm9yXCIsICgpID0+IHtcbiAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5lcnJvcmVkXG4gICAgICBpZih0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5yZWpvaW5UaW1lci5zY2hlZHVsZVRpbWVvdXQoKSB9XG4gICAgfSlcbiAgICB0aGlzLm9uQ2xvc2UoKCkgPT4ge1xuICAgICAgdGhpcy5yZWpvaW5UaW1lci5yZXNldCgpXG4gICAgICBpZih0aGlzLnNvY2tldC5oYXNMb2dnZXIoKSkgdGhpcy5zb2NrZXQubG9nKFwiY2hhbm5lbFwiLCBgY2xvc2UgJHt0aGlzLnRvcGljfSAke3RoaXMuam9pblJlZigpfWApXG4gICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuY2xvc2VkXG4gICAgICB0aGlzLnNvY2tldC5yZW1vdmUodGhpcylcbiAgICB9KVxuICAgIHRoaXMub25FcnJvcihyZWFzb24gPT4ge1xuICAgICAgaWYodGhpcy5zb2NrZXQuaGFzTG9nZ2VyKCkpIHRoaXMuc29ja2V0LmxvZyhcImNoYW5uZWxcIiwgYGVycm9yICR7dGhpcy50b3BpY31gLCByZWFzb24pXG4gICAgICBpZih0aGlzLmlzSm9pbmluZygpKXsgdGhpcy5qb2luUHVzaC5yZXNldCgpIH1cbiAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5lcnJvcmVkXG4gICAgICBpZih0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5yZWpvaW5UaW1lci5zY2hlZHVsZVRpbWVvdXQoKSB9XG4gICAgfSlcbiAgICB0aGlzLmpvaW5QdXNoLnJlY2VpdmUoXCJ0aW1lb3V0XCIsICgpID0+IHtcbiAgICAgIGlmKHRoaXMuc29ja2V0Lmhhc0xvZ2dlcigpKSB0aGlzLnNvY2tldC5sb2coXCJjaGFubmVsXCIsIGB0aW1lb3V0ICR7dGhpcy50b3BpY30gKCR7dGhpcy5qb2luUmVmKCl9KWAsIHRoaXMuam9pblB1c2gudGltZW91dClcbiAgICAgIGxldCBsZWF2ZVB1c2ggPSBuZXcgUHVzaCh0aGlzLCBDSEFOTkVMX0VWRU5UUy5sZWF2ZSwgY2xvc3VyZSh7fSksIHRoaXMudGltZW91dClcbiAgICAgIGxlYXZlUHVzaC5zZW5kKClcbiAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5lcnJvcmVkXG4gICAgICB0aGlzLmpvaW5QdXNoLnJlc2V0KClcbiAgICAgIGlmKHRoaXMuc29ja2V0LmlzQ29ubmVjdGVkKCkpeyB0aGlzLnJlam9pblRpbWVyLnNjaGVkdWxlVGltZW91dCgpIH1cbiAgICB9KVxuICAgIHRoaXMub24oQ0hBTk5FTF9FVkVOVFMucmVwbHksIChwYXlsb2FkLCByZWYpID0+IHtcbiAgICAgIHRoaXMudHJpZ2dlcih0aGlzLnJlcGx5RXZlbnROYW1lKHJlZiksIHBheWxvYWQpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBKb2luIHRoZSBjaGFubmVsXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gdGltZW91dFxuICAgKiBAcmV0dXJucyB7UHVzaH1cbiAgICovXG4gIGpvaW4odGltZW91dCA9IHRoaXMudGltZW91dCl7XG4gICAgaWYodGhpcy5qb2luZWRPbmNlKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInRyaWVkIHRvIGpvaW4gbXVsdGlwbGUgdGltZXMuICdqb2luJyBjYW4gb25seSBiZSBjYWxsZWQgYSBzaW5nbGUgdGltZSBwZXIgY2hhbm5lbCBpbnN0YW5jZVwiKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0XG4gICAgICB0aGlzLmpvaW5lZE9uY2UgPSB0cnVlXG4gICAgICB0aGlzLnJlam9pbigpXG4gICAgICByZXR1cm4gdGhpcy5qb2luUHVzaFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIb29rIGludG8gY2hhbm5lbCBjbG9zZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25DbG9zZShjYWxsYmFjayl7XG4gICAgdGhpcy5vbihDSEFOTkVMX0VWRU5UUy5jbG9zZSwgY2FsbGJhY2spXG4gIH1cblxuICAvKipcbiAgICogSG9vayBpbnRvIGNoYW5uZWwgZXJyb3JzXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICBvbkVycm9yKGNhbGxiYWNrKXtcbiAgICByZXR1cm4gdGhpcy5vbihDSEFOTkVMX0VWRU5UUy5lcnJvciwgcmVhc29uID0+IGNhbGxiYWNrKHJlYXNvbikpXG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlcyBvbiBjaGFubmVsIGV2ZW50c1xuICAgKlxuICAgKiBTdWJzY3JpcHRpb24gcmV0dXJucyBhIHJlZiBjb3VudGVyLCB3aGljaCBjYW4gYmUgdXNlZCBsYXRlciB0b1xuICAgKiB1bnN1YnNjcmliZSB0aGUgZXhhY3QgZXZlbnQgbGlzdGVuZXJcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3QgcmVmMSA9IGNoYW5uZWwub24oXCJldmVudFwiLCBkb19zdHVmZilcbiAgICogY29uc3QgcmVmMiA9IGNoYW5uZWwub24oXCJldmVudFwiLCBkb19vdGhlcl9zdHVmZilcbiAgICogY2hhbm5lbC5vZmYoXCJldmVudFwiLCByZWYxKVxuICAgKiAvLyBTaW5jZSB1bnN1YnNjcmlwdGlvbiwgZG9fc3R1ZmYgd29uJ3QgZmlyZSxcbiAgICogLy8gd2hpbGUgZG9fb3RoZXJfc3R1ZmYgd2lsbCBrZWVwIGZpcmluZyBvbiB0aGUgXCJldmVudFwiXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKiBAcmV0dXJucyB7aW50ZWdlcn0gcmVmXG4gICAqL1xuICBvbihldmVudCwgY2FsbGJhY2spe1xuICAgIGxldCByZWYgPSB0aGlzLmJpbmRpbmdSZWYrK1xuICAgIHRoaXMuYmluZGluZ3MucHVzaCh7ZXZlbnQsIHJlZiwgY2FsbGJhY2t9KVxuICAgIHJldHVybiByZWZcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZXMgb2ZmIG9mIGNoYW5uZWwgZXZlbnRzXG4gICAqXG4gICAqIFVzZSB0aGUgcmVmIHJldHVybmVkIGZyb20gYSBjaGFubmVsLm9uKCkgdG8gdW5zdWJzY3JpYmUgb25lXG4gICAqIGhhbmRsZXIsIG9yIHBhc3Mgbm90aGluZyBmb3IgdGhlIHJlZiB0byB1bnN1YnNjcmliZSBhbGxcbiAgICogaGFuZGxlcnMgZm9yIHRoZSBnaXZlbiBldmVudC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogLy8gVW5zdWJzY3JpYmUgdGhlIGRvX3N0dWZmIGhhbmRsZXJcbiAgICogY29uc3QgcmVmMSA9IGNoYW5uZWwub24oXCJldmVudFwiLCBkb19zdHVmZilcbiAgICogY2hhbm5lbC5vZmYoXCJldmVudFwiLCByZWYxKVxuICAgKlxuICAgKiAvLyBVbnN1YnNjcmliZSBhbGwgaGFuZGxlcnMgZnJvbSBldmVudFxuICAgKiBjaGFubmVsLm9mZihcImV2ZW50XCIpXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IHJlZlxuICAgKi9cbiAgb2ZmKGV2ZW50LCByZWYpe1xuICAgIHRoaXMuYmluZGluZ3MgPSB0aGlzLmJpbmRpbmdzLmZpbHRlcigoYmluZCkgPT4ge1xuICAgICAgcmV0dXJuICEoYmluZC5ldmVudCA9PT0gZXZlbnQgJiYgKHR5cGVvZiByZWYgPT09IFwidW5kZWZpbmVkXCIgfHwgcmVmID09PSBiaW5kLnJlZikpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2FuUHVzaCgpeyByZXR1cm4gdGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSAmJiB0aGlzLmlzSm9pbmVkKCkgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhIG1lc3NhZ2UgYGV2ZW50YCB0byBwaG9lbml4IHdpdGggdGhlIHBheWxvYWQgYHBheWxvYWRgLlxuICAgKiBQaG9lbml4IHJlY2VpdmVzIHRoaXMgaW4gdGhlIGBoYW5kbGVfaW4oZXZlbnQsIHBheWxvYWQsIHNvY2tldClgXG4gICAqIGZ1bmN0aW9uLiBpZiBwaG9lbml4IHJlcGxpZXMgb3IgaXQgdGltZXMgb3V0IChkZWZhdWx0IDEwMDAwbXMpLFxuICAgKiB0aGVuIG9wdGlvbmFsbHkgdGhlIHJlcGx5IGNhbiBiZSByZWNlaXZlZC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY2hhbm5lbC5wdXNoKFwiZXZlbnRcIilcbiAgICogICAucmVjZWl2ZShcIm9rXCIsIHBheWxvYWQgPT4gY29uc29sZS5sb2coXCJwaG9lbml4IHJlcGxpZWQ6XCIsIHBheWxvYWQpKVxuICAgKiAgIC5yZWNlaXZlKFwiZXJyb3JcIiwgZXJyID0+IGNvbnNvbGUubG9nKFwicGhvZW5peCBlcnJvcmVkXCIsIGVycikpXG4gICAqICAgLnJlY2VpdmUoXCJ0aW1lb3V0XCIsICgpID0+IGNvbnNvbGUubG9nKFwidGltZWQgb3V0IHB1c2hpbmdcIikpXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gcGF5bG9hZFxuICAgKiBAcGFyYW0ge251bWJlcn0gW3RpbWVvdXRdXG4gICAqIEByZXR1cm5zIHtQdXNofVxuICAgKi9cbiAgcHVzaChldmVudCwgcGF5bG9hZCwgdGltZW91dCA9IHRoaXMudGltZW91dCl7XG4gICAgcGF5bG9hZCA9IHBheWxvYWQgfHwge31cbiAgICBpZighdGhpcy5qb2luZWRPbmNlKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdHJpZWQgdG8gcHVzaCAnJHtldmVudH0nIHRvICcke3RoaXMudG9waWN9JyBiZWZvcmUgam9pbmluZy4gVXNlIGNoYW5uZWwuam9pbigpIGJlZm9yZSBwdXNoaW5nIGV2ZW50c2ApXG4gICAgfVxuICAgIGxldCBwdXNoRXZlbnQgPSBuZXcgUHVzaCh0aGlzLCBldmVudCwgZnVuY3Rpb24gKCl7IHJldHVybiBwYXlsb2FkIH0sIHRpbWVvdXQpXG4gICAgaWYodGhpcy5jYW5QdXNoKCkpe1xuICAgICAgcHVzaEV2ZW50LnNlbmQoKVxuICAgIH0gZWxzZSB7XG4gICAgICBwdXNoRXZlbnQuc3RhcnRUaW1lb3V0KClcbiAgICAgIHRoaXMucHVzaEJ1ZmZlci5wdXNoKHB1c2hFdmVudClcbiAgICB9XG5cbiAgICByZXR1cm4gcHVzaEV2ZW50XG4gIH1cblxuICAvKiogTGVhdmVzIHRoZSBjaGFubmVsXG4gICAqXG4gICAqIFVuc3Vic2NyaWJlcyBmcm9tIHNlcnZlciBldmVudHMsIGFuZFxuICAgKiBpbnN0cnVjdHMgY2hhbm5lbCB0byB0ZXJtaW5hdGUgb24gc2VydmVyXG4gICAqXG4gICAqIFRyaWdnZXJzIG9uQ2xvc2UoKSBob29rc1xuICAgKlxuICAgKiBUbyByZWNlaXZlIGxlYXZlIGFja25vd2xlZGdlbWVudHMsIHVzZSB0aGUgYHJlY2VpdmVgXG4gICAqIGhvb2sgdG8gYmluZCB0byB0aGUgc2VydmVyIGFjaywgaWU6XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNoYW5uZWwubGVhdmUoKS5yZWNlaXZlKFwib2tcIiwgKCkgPT4gYWxlcnQoXCJsZWZ0IVwiKSApXG4gICAqXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gdGltZW91dFxuICAgKiBAcmV0dXJucyB7UHVzaH1cbiAgICovXG4gIGxlYXZlKHRpbWVvdXQgPSB0aGlzLnRpbWVvdXQpe1xuICAgIHRoaXMucmVqb2luVGltZXIucmVzZXQoKVxuICAgIHRoaXMuam9pblB1c2guY2FuY2VsVGltZW91dCgpXG5cbiAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMubGVhdmluZ1xuICAgIGxldCBvbkNsb3NlID0gKCkgPT4ge1xuICAgICAgaWYodGhpcy5zb2NrZXQuaGFzTG9nZ2VyKCkpIHRoaXMuc29ja2V0LmxvZyhcImNoYW5uZWxcIiwgYGxlYXZlICR7dGhpcy50b3BpY31gKVxuICAgICAgdGhpcy50cmlnZ2VyKENIQU5ORUxfRVZFTlRTLmNsb3NlLCBcImxlYXZlXCIpXG4gICAgfVxuICAgIGxldCBsZWF2ZVB1c2ggPSBuZXcgUHVzaCh0aGlzLCBDSEFOTkVMX0VWRU5UUy5sZWF2ZSwgY2xvc3VyZSh7fSksIHRpbWVvdXQpXG4gICAgbGVhdmVQdXNoLnJlY2VpdmUoXCJva1wiLCAoKSA9PiBvbkNsb3NlKCkpXG4gICAgICAucmVjZWl2ZShcInRpbWVvdXRcIiwgKCkgPT4gb25DbG9zZSgpKVxuICAgIGxlYXZlUHVzaC5zZW5kKClcbiAgICBpZighdGhpcy5jYW5QdXNoKCkpeyBsZWF2ZVB1c2gudHJpZ2dlcihcIm9rXCIsIHt9KSB9XG5cbiAgICByZXR1cm4gbGVhdmVQdXNoXG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGFibGUgbWVzc2FnZSBob29rXG4gICAqXG4gICAqIFJlY2VpdmVzIGFsbCBldmVudHMgZm9yIHNwZWNpYWxpemVkIG1lc3NhZ2UgaGFuZGxpbmdcbiAgICogYmVmb3JlIGRpc3BhdGNoaW5nIHRvIHRoZSBjaGFubmVsIGNhbGxiYWNrcy5cbiAgICpcbiAgICogTXVzdCByZXR1cm4gdGhlIHBheWxvYWQsIG1vZGlmaWVkIG9yIHVubW9kaWZpZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXlsb2FkXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gcmVmXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICBvbk1lc3NhZ2UoX2V2ZW50LCBwYXlsb2FkLCBfcmVmKXsgcmV0dXJuIHBheWxvYWQgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNNZW1iZXIodG9waWMsIGV2ZW50LCBwYXlsb2FkLCBqb2luUmVmKXtcbiAgICBpZih0aGlzLnRvcGljICE9PSB0b3BpYyl7IHJldHVybiBmYWxzZSB9XG5cbiAgICBpZihqb2luUmVmICYmIGpvaW5SZWYgIT09IHRoaXMuam9pblJlZigpKXtcbiAgICAgIGlmKHRoaXMuc29ja2V0Lmhhc0xvZ2dlcigpKSB0aGlzLnNvY2tldC5sb2coXCJjaGFubmVsXCIsIFwiZHJvcHBpbmcgb3V0ZGF0ZWQgbWVzc2FnZVwiLCB7dG9waWMsIGV2ZW50LCBwYXlsb2FkLCBqb2luUmVmfSlcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgam9pblJlZigpeyByZXR1cm4gdGhpcy5qb2luUHVzaC5yZWYgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVqb2luKHRpbWVvdXQgPSB0aGlzLnRpbWVvdXQpe1xuICAgIGlmKHRoaXMuaXNMZWF2aW5nKCkpeyByZXR1cm4gfVxuICAgIHRoaXMuc29ja2V0LmxlYXZlT3BlblRvcGljKHRoaXMudG9waWMpXG4gICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmpvaW5pbmdcbiAgICB0aGlzLmpvaW5QdXNoLnJlc2VuZCh0aW1lb3V0KVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0cmlnZ2VyKGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5SZWYpe1xuICAgIGxldCBoYW5kbGVkUGF5bG9hZCA9IHRoaXMub25NZXNzYWdlKGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5SZWYpXG4gICAgaWYocGF5bG9hZCAmJiAhaGFuZGxlZFBheWxvYWQpeyB0aHJvdyBuZXcgRXJyb3IoXCJjaGFubmVsIG9uTWVzc2FnZSBjYWxsYmFja3MgbXVzdCByZXR1cm4gdGhlIHBheWxvYWQsIG1vZGlmaWVkIG9yIHVubW9kaWZpZWRcIikgfVxuXG4gICAgbGV0IGV2ZW50QmluZGluZ3MgPSB0aGlzLmJpbmRpbmdzLmZpbHRlcihiaW5kID0+IGJpbmQuZXZlbnQgPT09IGV2ZW50KVxuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGV2ZW50QmluZGluZ3MubGVuZ3RoOyBpKyspe1xuICAgICAgbGV0IGJpbmQgPSBldmVudEJpbmRpbmdzW2ldXG4gICAgICBiaW5kLmNhbGxiYWNrKGhhbmRsZWRQYXlsb2FkLCByZWYsIGpvaW5SZWYgfHwgdGhpcy5qb2luUmVmKCkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByZXBseUV2ZW50TmFtZShyZWYpeyByZXR1cm4gYGNoYW5fcmVwbHlfJHtyZWZ9YCB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0Nsb3NlZCgpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuY2xvc2VkIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzRXJyb3JlZCgpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuZXJyb3JlZCB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0pvaW5lZCgpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuam9pbmVkIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzSm9pbmluZygpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuam9pbmluZyB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0xlYXZpbmcoKXsgcmV0dXJuIHRoaXMuc3RhdGUgPT09IENIQU5ORUxfU1RBVEVTLmxlYXZpbmcgfVxufVxuIiwgImltcG9ydCB7XG4gIGdsb2JhbCxcbiAgWEhSX1NUQVRFU1xufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBamF4IHtcblxuICBzdGF0aWMgcmVxdWVzdChtZXRob2QsIGVuZFBvaW50LCBhY2NlcHQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spe1xuICAgIGlmKGdsb2JhbC5YRG9tYWluUmVxdWVzdCl7XG4gICAgICBsZXQgcmVxID0gbmV3IGdsb2JhbC5YRG9tYWluUmVxdWVzdCgpIC8vIElFOCwgSUU5XG4gICAgICByZXR1cm4gdGhpcy54ZG9tYWluUmVxdWVzdChyZXEsIG1ldGhvZCwgZW5kUG9pbnQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCByZXEgPSBuZXcgZ2xvYmFsLlhNTEh0dHBSZXF1ZXN0KCkgLy8gSUU3KywgRmlyZWZveCwgQ2hyb21lLCBPcGVyYSwgU2FmYXJpXG4gICAgICByZXR1cm4gdGhpcy54aHJSZXF1ZXN0KHJlcSwgbWV0aG9kLCBlbmRQb2ludCwgYWNjZXB0LCBib2R5LCB0aW1lb3V0LCBvbnRpbWVvdXQsIGNhbGxiYWNrKVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyB4ZG9tYWluUmVxdWVzdChyZXEsIG1ldGhvZCwgZW5kUG9pbnQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spe1xuICAgIHJlcS50aW1lb3V0ID0gdGltZW91dFxuICAgIHJlcS5vcGVuKG1ldGhvZCwgZW5kUG9pbnQpXG4gICAgcmVxLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGxldCByZXNwb25zZSA9IHRoaXMucGFyc2VKU09OKHJlcS5yZXNwb25zZVRleHQpXG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhyZXNwb25zZSlcbiAgICB9XG4gICAgaWYob250aW1lb3V0KXsgcmVxLm9udGltZW91dCA9IG9udGltZW91dCB9XG5cbiAgICAvLyBXb3JrIGFyb3VuZCBidWcgaW4gSUU5IHRoYXQgcmVxdWlyZXMgYW4gYXR0YWNoZWQgb25wcm9ncmVzcyBoYW5kbGVyXG4gICAgcmVxLm9ucHJvZ3Jlc3MgPSAoKSA9PiB7IH1cblxuICAgIHJlcS5zZW5kKGJvZHkpXG4gICAgcmV0dXJuIHJlcVxuICB9XG5cbiAgc3RhdGljIHhoclJlcXVlc3QocmVxLCBtZXRob2QsIGVuZFBvaW50LCBhY2NlcHQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spe1xuICAgIHJlcS5vcGVuKG1ldGhvZCwgZW5kUG9pbnQsIHRydWUpXG4gICAgcmVxLnRpbWVvdXQgPSB0aW1lb3V0XG4gICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgYWNjZXB0KVxuICAgIHJlcS5vbmVycm9yID0gKCkgPT4gY2FsbGJhY2sgJiYgY2FsbGJhY2sobnVsbClcbiAgICByZXEub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgaWYocmVxLnJlYWR5U3RhdGUgPT09IFhIUl9TVEFURVMuY29tcGxldGUgJiYgY2FsbGJhY2spe1xuICAgICAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLnBhcnNlSlNPTihyZXEucmVzcG9uc2VUZXh0KVxuICAgICAgICBjYWxsYmFjayhyZXNwb25zZSlcbiAgICAgIH1cbiAgICB9XG4gICAgaWYob250aW1lb3V0KXsgcmVxLm9udGltZW91dCA9IG9udGltZW91dCB9XG5cbiAgICByZXEuc2VuZChib2R5KVxuICAgIHJldHVybiByZXFcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZUpTT04ocmVzcCl7XG4gICAgaWYoIXJlc3AgfHwgcmVzcCA9PT0gXCJcIil7IHJldHVybiBudWxsIH1cblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwKVxuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgY29uc29sZSAmJiBjb25zb2xlLmxvZyhcImZhaWxlZCB0byBwYXJzZSBKU09OIHJlc3BvbnNlXCIsIHJlc3ApXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBzZXJpYWxpemUob2JqLCBwYXJlbnRLZXkpe1xuICAgIGxldCBxdWVyeVN0ciA9IFtdXG4gICAgZm9yKHZhciBrZXkgaW4gb2JqKXtcbiAgICAgIGlmKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKXsgY29udGludWUgfVxuICAgICAgbGV0IHBhcmFtS2V5ID0gcGFyZW50S2V5ID8gYCR7cGFyZW50S2V5fVske2tleX1dYCA6IGtleVxuICAgICAgbGV0IHBhcmFtVmFsID0gb2JqW2tleV1cbiAgICAgIGlmKHR5cGVvZiBwYXJhbVZhbCA9PT0gXCJvYmplY3RcIil7XG4gICAgICAgIHF1ZXJ5U3RyLnB1c2godGhpcy5zZXJpYWxpemUocGFyYW1WYWwsIHBhcmFtS2V5KSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXJ5U3RyLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtS2V5KSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtVmFsKSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHF1ZXJ5U3RyLmpvaW4oXCImXCIpXG4gIH1cblxuICBzdGF0aWMgYXBwZW5kUGFyYW1zKHVybCwgcGFyYW1zKXtcbiAgICBpZihPYmplY3Qua2V5cyhwYXJhbXMpLmxlbmd0aCA9PT0gMCl7IHJldHVybiB1cmwgfVxuXG4gICAgbGV0IHByZWZpeCA9IHVybC5tYXRjaCgvXFw/LykgPyBcIiZcIiA6IFwiP1wiXG4gICAgcmV0dXJuIGAke3VybH0ke3ByZWZpeH0ke3RoaXMuc2VyaWFsaXplKHBhcmFtcyl9YFxuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgU09DS0VUX1NUQVRFUyxcbiAgVFJBTlNQT1JUU1xufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQgQWpheCBmcm9tIFwiLi9hamF4XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9uZ1BvbGwge1xuXG4gIGNvbnN0cnVjdG9yKGVuZFBvaW50KXtcbiAgICB0aGlzLmVuZFBvaW50ID0gbnVsbFxuICAgIHRoaXMudG9rZW4gPSBudWxsXG4gICAgdGhpcy5za2lwSGVhcnRiZWF0ID0gdHJ1ZVxuICAgIHRoaXMucmVxcyA9IG5ldyBTZXQoKVxuICAgIHRoaXMub25vcGVuID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgIHRoaXMub25lcnJvciA9IGZ1bmN0aW9uICgpeyB9IC8vIG5vb3BcbiAgICB0aGlzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uICgpeyB9IC8vIG5vb3BcbiAgICB0aGlzLm9uY2xvc2UgPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgdGhpcy5wb2xsRW5kcG9pbnQgPSB0aGlzLm5vcm1hbGl6ZUVuZHBvaW50KGVuZFBvaW50KVxuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFNPQ0tFVF9TVEFURVMuY29ubmVjdGluZ1xuICAgIHRoaXMucG9sbCgpXG4gIH1cblxuICBub3JtYWxpemVFbmRwb2ludChlbmRQb2ludCl7XG4gICAgcmV0dXJuIChlbmRQb2ludFxuICAgICAgLnJlcGxhY2UoXCJ3czovL1wiLCBcImh0dHA6Ly9cIilcbiAgICAgIC5yZXBsYWNlKFwid3NzOi8vXCIsIFwiaHR0cHM6Ly9cIilcbiAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoLiopXFwvXCIgKyBUUkFOU1BPUlRTLndlYnNvY2tldCksIFwiJDEvXCIgKyBUUkFOU1BPUlRTLmxvbmdwb2xsKSlcbiAgfVxuXG4gIGVuZHBvaW50VVJMKCl7XG4gICAgcmV0dXJuIEFqYXguYXBwZW5kUGFyYW1zKHRoaXMucG9sbEVuZHBvaW50LCB7dG9rZW46IHRoaXMudG9rZW59KVxuICB9XG5cbiAgY2xvc2VBbmRSZXRyeShjb2RlLCByZWFzb24sIHdhc0NsZWFuKXtcbiAgICB0aGlzLmNsb3NlKGNvZGUsIHJlYXNvbiwgd2FzQ2xlYW4pXG4gICAgdGhpcy5yZWFkeVN0YXRlID0gU09DS0VUX1NUQVRFUy5jb25uZWN0aW5nXG4gIH1cblxuICBvbnRpbWVvdXQoKXtcbiAgICB0aGlzLm9uZXJyb3IoXCJ0aW1lb3V0XCIpXG4gICAgdGhpcy5jbG9zZUFuZFJldHJ5KDEwMDUsIFwidGltZW91dFwiLCBmYWxzZSlcbiAgfVxuXG4gIGlzQWN0aXZlKCl7IHJldHVybiB0aGlzLnJlYWR5U3RhdGUgPT09IFNPQ0tFVF9TVEFURVMub3BlbiB8fCB0aGlzLnJlYWR5U3RhdGUgPT09IFNPQ0tFVF9TVEFURVMuY29ubmVjdGluZyB9XG5cbiAgcG9sbCgpe1xuICAgIHRoaXMuYWpheChcIkdFVFwiLCBudWxsLCAoKSA9PiB0aGlzLm9udGltZW91dCgpLCByZXNwID0+IHtcbiAgICAgIGlmKHJlc3Ape1xuICAgICAgICB2YXIge3N0YXR1cywgdG9rZW4sIG1lc3NhZ2VzfSA9IHJlc3BcbiAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0dXMgPSAwXG4gICAgICB9XG5cbiAgICAgIHN3aXRjaChzdGF0dXMpe1xuICAgICAgICBjYXNlIDIwMDpcbiAgICAgICAgICBtZXNzYWdlcy5mb3JFYWNoKG1zZyA9PiB7XG4gICAgICAgICAgICAvLyBUYXNrcyBhcmUgd2hhdCB0aGluZ3MgbGlrZSBldmVudCBoYW5kbGVycywgc2V0VGltZW91dCBjYWxsYmFja3MsXG4gICAgICAgICAgICAvLyBwcm9taXNlIHJlc29sdmVzIGFuZCBtb3JlIGFyZSBydW4gd2l0aGluLlxuICAgICAgICAgICAgLy8gSW4gbW9kZXJuIGJyb3dzZXJzLCB0aGVyZSBhcmUgdHdvIGRpZmZlcmVudCBraW5kcyBvZiB0YXNrcyxcbiAgICAgICAgICAgIC8vIG1pY3JvdGFza3MgYW5kIG1hY3JvdGFza3MuXG4gICAgICAgICAgICAvLyBNaWNyb3Rhc2tzIGFyZSBtYWlubHkgdXNlZCBmb3IgUHJvbWlzZXMsIHdoaWxlIG1hY3JvdGFza3MgYXJlXG4gICAgICAgICAgICAvLyB1c2VkIGZvciBldmVyeXRoaW5nIGVsc2UuXG4gICAgICAgICAgICAvLyBNaWNyb3Rhc2tzIGFsd2F5cyBoYXZlIHByaW9yaXR5IG92ZXIgbWFjcm90YXNrcy4gSWYgdGhlIEpTIGVuZ2luZVxuICAgICAgICAgICAgLy8gaXMgbG9va2luZyBmb3IgYSB0YXNrIHRvIHJ1biwgaXQgd2lsbCBhbHdheXMgdHJ5IHRvIGVtcHR5IHRoZVxuICAgICAgICAgICAgLy8gbWljcm90YXNrIHF1ZXVlIGJlZm9yZSBhdHRlbXB0aW5nIHRvIHJ1biBhbnl0aGluZyBmcm9tIHRoZVxuICAgICAgICAgICAgLy8gbWFjcm90YXNrIHF1ZXVlLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIEZvciB0aGUgV2ViU29ja2V0IHRyYW5zcG9ydCwgbWVzc2FnZXMgYWx3YXlzIGFycml2ZSBpbiB0aGVpciBvd25cbiAgICAgICAgICAgIC8vIGV2ZW50LiBUaGlzIG1lYW5zIHRoYXQgaWYgYW55IHByb21pc2VzIGFyZSByZXNvbHZlZCBmcm9tIHdpdGhpbixcbiAgICAgICAgICAgIC8vIHRoZWlyIGNhbGxiYWNrcyB3aWxsIGFsd2F5cyBmaW5pc2ggZXhlY3V0aW9uIGJ5IHRoZSB0aW1lIHRoZVxuICAgICAgICAgICAgLy8gbmV4dCBtZXNzYWdlIGV2ZW50IGhhbmRsZXIgaXMgcnVuLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIEluIG9yZGVyIHRvIGVtdWxhdGUgdGhpcyBiZWhhdmlvdXIsIHdlIG5lZWQgdG8gbWFrZSBzdXJlIGVhY2hcbiAgICAgICAgICAgIC8vIG9ubWVzc2FnZSBoYW5kbGVyIGlzIHJ1biB3aXRoaW4gaXQncyBvd24gbWFjcm90YXNrLlxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLm9ubWVzc2FnZSh7ZGF0YTogbXNnfSksIDApXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLnBvbGwoKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjA0OlxuICAgICAgICAgIHRoaXMucG9sbCgpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0MTA6XG4gICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gU09DS0VUX1NUQVRFUy5vcGVuXG4gICAgICAgICAgdGhpcy5vbm9wZW4oe30pXG4gICAgICAgICAgdGhpcy5wb2xsKClcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQwMzpcbiAgICAgICAgICB0aGlzLm9uZXJyb3IoNDAzKVxuICAgICAgICAgIHRoaXMuY2xvc2UoMTAwOCwgXCJmb3JiaWRkZW5cIiwgZmFsc2UpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICBjYXNlIDUwMDpcbiAgICAgICAgICB0aGlzLm9uZXJyb3IoNTAwKVxuICAgICAgICAgIHRoaXMuY2xvc2VBbmRSZXRyeSgxMDExLCBcImludGVybmFsIHNlcnZlciBlcnJvclwiLCA1MDApXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKGB1bmhhbmRsZWQgcG9sbCBzdGF0dXMgJHtzdGF0dXN9YClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgc2VuZChib2R5KXtcbiAgICB0aGlzLmFqYXgoXCJQT1NUXCIsIGJvZHksICgpID0+IHRoaXMub25lcnJvcihcInRpbWVvdXRcIiksIHJlc3AgPT4ge1xuICAgICAgaWYoIXJlc3AgfHwgcmVzcC5zdGF0dXMgIT09IDIwMCl7XG4gICAgICAgIHRoaXMub25lcnJvcihyZXNwICYmIHJlc3Auc3RhdHVzKVxuICAgICAgICB0aGlzLmNsb3NlQW5kUmV0cnkoMTAxMSwgXCJpbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIiwgZmFsc2UpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGNsb3NlKGNvZGUsIHJlYXNvbiwgd2FzQ2xlYW4pe1xuICAgIGZvcihsZXQgcmVxIG9mIHRoaXMucmVxcyl7IHJlcS5hYm9ydCgpIH1cbiAgICB0aGlzLnJlYWR5U3RhdGUgPSBTT0NLRVRfU1RBVEVTLmNsb3NlZFxuICAgIGxldCBvcHRzID0gT2JqZWN0LmFzc2lnbih7Y29kZTogMTAwMCwgcmVhc29uOiB1bmRlZmluZWQsIHdhc0NsZWFuOiB0cnVlfSwge2NvZGUsIHJlYXNvbiwgd2FzQ2xlYW59KVxuICAgIGlmKHR5cGVvZihDbG9zZUV2ZW50KSAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICB0aGlzLm9uY2xvc2UobmV3IENsb3NlRXZlbnQoXCJjbG9zZVwiLCBvcHRzKSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vbmNsb3NlKG9wdHMpXG4gICAgfVxuICB9XG5cbiAgYWpheChtZXRob2QsIGJvZHksIG9uQ2FsbGVyVGltZW91dCwgY2FsbGJhY2spe1xuICAgIGxldCByZXFcbiAgICBsZXQgb250aW1lb3V0ID0gKCkgPT4ge1xuICAgICAgdGhpcy5yZXFzLmRlbGV0ZShyZXEpXG4gICAgICBvbkNhbGxlclRpbWVvdXQoKVxuICAgIH1cbiAgICByZXEgPSBBamF4LnJlcXVlc3QobWV0aG9kLCB0aGlzLmVuZHBvaW50VVJMKCksIFwiYXBwbGljYXRpb24vanNvblwiLCBib2R5LCB0aGlzLnRpbWVvdXQsIG9udGltZW91dCwgcmVzcCA9PiB7XG4gICAgICB0aGlzLnJlcXMuZGVsZXRlKHJlcSlcbiAgICAgIGlmKHRoaXMuaXNBY3RpdmUoKSl7IGNhbGxiYWNrKHJlc3ApIH1cbiAgICB9KVxuICAgIHRoaXMucmVxcy5hZGQocmVxKVxuICB9XG59XG4iLCAiLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgUHJlc2VuY2VcbiAqIEBwYXJhbSB7Q2hhbm5lbH0gY2hhbm5lbCAtIFRoZSBDaGFubmVsXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIFRoZSBvcHRpb25zLFxuICogICAgICAgIGZvciBleGFtcGxlIGB7ZXZlbnRzOiB7c3RhdGU6IFwic3RhdGVcIiwgZGlmZjogXCJkaWZmXCJ9fWBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlc2VuY2Uge1xuXG4gIGNvbnN0cnVjdG9yKGNoYW5uZWwsIG9wdHMgPSB7fSl7XG4gICAgbGV0IGV2ZW50cyA9IG9wdHMuZXZlbnRzIHx8IHtzdGF0ZTogXCJwcmVzZW5jZV9zdGF0ZVwiLCBkaWZmOiBcInByZXNlbmNlX2RpZmZcIn1cbiAgICB0aGlzLnN0YXRlID0ge31cbiAgICB0aGlzLnBlbmRpbmdEaWZmcyA9IFtdXG4gICAgdGhpcy5jaGFubmVsID0gY2hhbm5lbFxuICAgIHRoaXMuam9pblJlZiA9IG51bGxcbiAgICB0aGlzLmNhbGxlciA9IHtcbiAgICAgIG9uSm9pbjogZnVuY3Rpb24gKCl7IH0sXG4gICAgICBvbkxlYXZlOiBmdW5jdGlvbiAoKXsgfSxcbiAgICAgIG9uU3luYzogZnVuY3Rpb24gKCl7IH1cbiAgICB9XG5cbiAgICB0aGlzLmNoYW5uZWwub24oZXZlbnRzLnN0YXRlLCBuZXdTdGF0ZSA9PiB7XG4gICAgICBsZXQge29uSm9pbiwgb25MZWF2ZSwgb25TeW5jfSA9IHRoaXMuY2FsbGVyXG5cbiAgICAgIHRoaXMuam9pblJlZiA9IHRoaXMuY2hhbm5lbC5qb2luUmVmKClcbiAgICAgIHRoaXMuc3RhdGUgPSBQcmVzZW5jZS5zeW5jU3RhdGUodGhpcy5zdGF0ZSwgbmV3U3RhdGUsIG9uSm9pbiwgb25MZWF2ZSlcblxuICAgICAgdGhpcy5wZW5kaW5nRGlmZnMuZm9yRWFjaChkaWZmID0+IHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFByZXNlbmNlLnN5bmNEaWZmKHRoaXMuc3RhdGUsIGRpZmYsIG9uSm9pbiwgb25MZWF2ZSlcbiAgICAgIH0pXG4gICAgICB0aGlzLnBlbmRpbmdEaWZmcyA9IFtdXG4gICAgICBvblN5bmMoKVxuICAgIH0pXG5cbiAgICB0aGlzLmNoYW5uZWwub24oZXZlbnRzLmRpZmYsIGRpZmYgPT4ge1xuICAgICAgbGV0IHtvbkpvaW4sIG9uTGVhdmUsIG9uU3luY30gPSB0aGlzLmNhbGxlclxuXG4gICAgICBpZih0aGlzLmluUGVuZGluZ1N5bmNTdGF0ZSgpKXtcbiAgICAgICAgdGhpcy5wZW5kaW5nRGlmZnMucHVzaChkaWZmKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFByZXNlbmNlLnN5bmNEaWZmKHRoaXMuc3RhdGUsIGRpZmYsIG9uSm9pbiwgb25MZWF2ZSlcbiAgICAgICAgb25TeW5jKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgb25Kb2luKGNhbGxiYWNrKXsgdGhpcy5jYWxsZXIub25Kb2luID0gY2FsbGJhY2sgfVxuXG4gIG9uTGVhdmUoY2FsbGJhY2speyB0aGlzLmNhbGxlci5vbkxlYXZlID0gY2FsbGJhY2sgfVxuXG4gIG9uU3luYyhjYWxsYmFjayl7IHRoaXMuY2FsbGVyLm9uU3luYyA9IGNhbGxiYWNrIH1cblxuICBsaXN0KGJ5KXsgcmV0dXJuIFByZXNlbmNlLmxpc3QodGhpcy5zdGF0ZSwgYnkpIH1cblxuICBpblBlbmRpbmdTeW5jU3RhdGUoKXtcbiAgICByZXR1cm4gIXRoaXMuam9pblJlZiB8fCAodGhpcy5qb2luUmVmICE9PSB0aGlzLmNoYW5uZWwuam9pblJlZigpKVxuICB9XG5cbiAgLy8gbG93ZXItbGV2ZWwgcHVibGljIHN0YXRpYyBBUElcblxuICAvKipcbiAgICogVXNlZCB0byBzeW5jIHRoZSBsaXN0IG9mIHByZXNlbmNlcyBvbiB0aGUgc2VydmVyXG4gICAqIHdpdGggdGhlIGNsaWVudCdzIHN0YXRlLiBBbiBvcHRpb25hbCBgb25Kb2luYCBhbmQgYG9uTGVhdmVgIGNhbGxiYWNrIGNhblxuICAgKiBiZSBwcm92aWRlZCB0byByZWFjdCB0byBjaGFuZ2VzIGluIHRoZSBjbGllbnQncyBsb2NhbCBwcmVzZW5jZXMgYWNyb3NzXG4gICAqIGRpc2Nvbm5lY3RzIGFuZCByZWNvbm5lY3RzIHdpdGggdGhlIHNlcnZlci5cbiAgICpcbiAgICogQHJldHVybnMge1ByZXNlbmNlfVxuICAgKi9cbiAgc3RhdGljIHN5bmNTdGF0ZShjdXJyZW50U3RhdGUsIG5ld1N0YXRlLCBvbkpvaW4sIG9uTGVhdmUpe1xuICAgIGxldCBzdGF0ZSA9IHRoaXMuY2xvbmUoY3VycmVudFN0YXRlKVxuICAgIGxldCBqb2lucyA9IHt9XG4gICAgbGV0IGxlYXZlcyA9IHt9XG5cbiAgICB0aGlzLm1hcChzdGF0ZSwgKGtleSwgcHJlc2VuY2UpID0+IHtcbiAgICAgIGlmKCFuZXdTdGF0ZVtrZXldKXtcbiAgICAgICAgbGVhdmVzW2tleV0gPSBwcmVzZW5jZVxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy5tYXAobmV3U3RhdGUsIChrZXksIG5ld1ByZXNlbmNlKSA9PiB7XG4gICAgICBsZXQgY3VycmVudFByZXNlbmNlID0gc3RhdGVba2V5XVxuICAgICAgaWYoY3VycmVudFByZXNlbmNlKXtcbiAgICAgICAgbGV0IG5ld1JlZnMgPSBuZXdQcmVzZW5jZS5tZXRhcy5tYXAobSA9PiBtLnBoeF9yZWYpXG4gICAgICAgIGxldCBjdXJSZWZzID0gY3VycmVudFByZXNlbmNlLm1ldGFzLm1hcChtID0+IG0ucGh4X3JlZilcbiAgICAgICAgbGV0IGpvaW5lZE1ldGFzID0gbmV3UHJlc2VuY2UubWV0YXMuZmlsdGVyKG0gPT4gY3VyUmVmcy5pbmRleE9mKG0ucGh4X3JlZikgPCAwKVxuICAgICAgICBsZXQgbGVmdE1ldGFzID0gY3VycmVudFByZXNlbmNlLm1ldGFzLmZpbHRlcihtID0+IG5ld1JlZnMuaW5kZXhPZihtLnBoeF9yZWYpIDwgMClcbiAgICAgICAgaWYoam9pbmVkTWV0YXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgam9pbnNba2V5XSA9IG5ld1ByZXNlbmNlXG4gICAgICAgICAgam9pbnNba2V5XS5tZXRhcyA9IGpvaW5lZE1ldGFzXG4gICAgICAgIH1cbiAgICAgICAgaWYobGVmdE1ldGFzLmxlbmd0aCA+IDApe1xuICAgICAgICAgIGxlYXZlc1trZXldID0gdGhpcy5jbG9uZShjdXJyZW50UHJlc2VuY2UpXG4gICAgICAgICAgbGVhdmVzW2tleV0ubWV0YXMgPSBsZWZ0TWV0YXNcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgam9pbnNba2V5XSA9IG5ld1ByZXNlbmNlXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gdGhpcy5zeW5jRGlmZihzdGF0ZSwge2pvaW5zOiBqb2lucywgbGVhdmVzOiBsZWF2ZXN9LCBvbkpvaW4sIG9uTGVhdmUpXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogVXNlZCB0byBzeW5jIGEgZGlmZiBvZiBwcmVzZW5jZSBqb2luIGFuZCBsZWF2ZVxuICAgKiBldmVudHMgZnJvbSB0aGUgc2VydmVyLCBhcyB0aGV5IGhhcHBlbi4gTGlrZSBgc3luY1N0YXRlYCwgYHN5bmNEaWZmYFxuICAgKiBhY2NlcHRzIG9wdGlvbmFsIGBvbkpvaW5gIGFuZCBgb25MZWF2ZWAgY2FsbGJhY2tzIHRvIHJlYWN0IHRvIGEgdXNlclxuICAgKiBqb2luaW5nIG9yIGxlYXZpbmcgZnJvbSBhIGRldmljZS5cbiAgICpcbiAgICogQHJldHVybnMge1ByZXNlbmNlfVxuICAgKi9cbiAgc3RhdGljIHN5bmNEaWZmKHN0YXRlLCBkaWZmLCBvbkpvaW4sIG9uTGVhdmUpe1xuICAgIGxldCB7am9pbnMsIGxlYXZlc30gPSB0aGlzLmNsb25lKGRpZmYpXG4gICAgaWYoIW9uSm9pbil7IG9uSm9pbiA9IGZ1bmN0aW9uICgpeyB9IH1cbiAgICBpZighb25MZWF2ZSl7IG9uTGVhdmUgPSBmdW5jdGlvbiAoKXsgfSB9XG5cbiAgICB0aGlzLm1hcChqb2lucywgKGtleSwgbmV3UHJlc2VuY2UpID0+IHtcbiAgICAgIGxldCBjdXJyZW50UHJlc2VuY2UgPSBzdGF0ZVtrZXldXG4gICAgICBzdGF0ZVtrZXldID0gdGhpcy5jbG9uZShuZXdQcmVzZW5jZSlcbiAgICAgIGlmKGN1cnJlbnRQcmVzZW5jZSl7XG4gICAgICAgIGxldCBqb2luZWRSZWZzID0gc3RhdGVba2V5XS5tZXRhcy5tYXAobSA9PiBtLnBoeF9yZWYpXG4gICAgICAgIGxldCBjdXJNZXRhcyA9IGN1cnJlbnRQcmVzZW5jZS5tZXRhcy5maWx0ZXIobSA9PiBqb2luZWRSZWZzLmluZGV4T2YobS5waHhfcmVmKSA8IDApXG4gICAgICAgIHN0YXRlW2tleV0ubWV0YXMudW5zaGlmdCguLi5jdXJNZXRhcylcbiAgICAgIH1cbiAgICAgIG9uSm9pbihrZXksIGN1cnJlbnRQcmVzZW5jZSwgbmV3UHJlc2VuY2UpXG4gICAgfSlcbiAgICB0aGlzLm1hcChsZWF2ZXMsIChrZXksIGxlZnRQcmVzZW5jZSkgPT4ge1xuICAgICAgbGV0IGN1cnJlbnRQcmVzZW5jZSA9IHN0YXRlW2tleV1cbiAgICAgIGlmKCFjdXJyZW50UHJlc2VuY2UpeyByZXR1cm4gfVxuICAgICAgbGV0IHJlZnNUb1JlbW92ZSA9IGxlZnRQcmVzZW5jZS5tZXRhcy5tYXAobSA9PiBtLnBoeF9yZWYpXG4gICAgICBjdXJyZW50UHJlc2VuY2UubWV0YXMgPSBjdXJyZW50UHJlc2VuY2UubWV0YXMuZmlsdGVyKHAgPT4ge1xuICAgICAgICByZXR1cm4gcmVmc1RvUmVtb3ZlLmluZGV4T2YocC5waHhfcmVmKSA8IDBcbiAgICAgIH0pXG4gICAgICBvbkxlYXZlKGtleSwgY3VycmVudFByZXNlbmNlLCBsZWZ0UHJlc2VuY2UpXG4gICAgICBpZihjdXJyZW50UHJlc2VuY2UubWV0YXMubGVuZ3RoID09PSAwKXtcbiAgICAgICAgZGVsZXRlIHN0YXRlW2tleV1cbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBzdGF0ZVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGFycmF5IG9mIHByZXNlbmNlcywgd2l0aCBzZWxlY3RlZCBtZXRhZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByZXNlbmNlc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjaG9vc2VyXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcmVzZW5jZX1cbiAgICovXG4gIHN0YXRpYyBsaXN0KHByZXNlbmNlcywgY2hvb3Nlcil7XG4gICAgaWYoIWNob29zZXIpeyBjaG9vc2VyID0gZnVuY3Rpb24gKGtleSwgcHJlcyl7IHJldHVybiBwcmVzIH0gfVxuXG4gICAgcmV0dXJuIHRoaXMubWFwKHByZXNlbmNlcywgKGtleSwgcHJlc2VuY2UpID0+IHtcbiAgICAgIHJldHVybiBjaG9vc2VyKGtleSwgcHJlc2VuY2UpXG4gICAgfSlcbiAgfVxuXG4gIC8vIHByaXZhdGVcblxuICBzdGF0aWMgbWFwKG9iaiwgZnVuYyl7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikubWFwKGtleSA9PiBmdW5jKGtleSwgb2JqW2tleV0pKVxuICB9XG5cbiAgc3RhdGljIGNsb25lKG9iail7IHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpIH1cbn1cbiIsICIvKiBUaGUgZGVmYXVsdCBzZXJpYWxpemVyIGZvciBlbmNvZGluZyBhbmQgZGVjb2RpbmcgbWVzc2FnZXMgKi9cbmltcG9ydCB7XG4gIENIQU5ORUxfRVZFTlRTXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgSEVBREVSX0xFTkdUSDogMSxcbiAgTUVUQV9MRU5HVEg6IDQsXG4gIEtJTkRTOiB7cHVzaDogMCwgcmVwbHk6IDEsIGJyb2FkY2FzdDogMn0sXG5cbiAgZW5jb2RlKG1zZywgY2FsbGJhY2spe1xuICAgIGlmKG1zZy5wYXlsb2FkLmNvbnN0cnVjdG9yID09PSBBcnJheUJ1ZmZlcil7XG4gICAgICByZXR1cm4gY2FsbGJhY2sodGhpcy5iaW5hcnlFbmNvZGUobXNnKSlcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHBheWxvYWQgPSBbbXNnLmpvaW5fcmVmLCBtc2cucmVmLCBtc2cudG9waWMsIG1zZy5ldmVudCwgbXNnLnBheWxvYWRdXG4gICAgICByZXR1cm4gY2FsbGJhY2soSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpXG4gICAgfVxuICB9LFxuXG4gIGRlY29kZShyYXdQYXlsb2FkLCBjYWxsYmFjayl7XG4gICAgaWYocmF3UGF5bG9hZC5jb25zdHJ1Y3RvciA9PT0gQXJyYXlCdWZmZXIpe1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKHRoaXMuYmluYXJ5RGVjb2RlKHJhd1BheWxvYWQpKVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgW2pvaW5fcmVmLCByZWYsIHRvcGljLCBldmVudCwgcGF5bG9hZF0gPSBKU09OLnBhcnNlKHJhd1BheWxvYWQpXG4gICAgICByZXR1cm4gY2FsbGJhY2soe2pvaW5fcmVmLCByZWYsIHRvcGljLCBldmVudCwgcGF5bG9hZH0pXG4gICAgfVxuICB9LFxuXG4gIC8vIHByaXZhdGVcblxuICBiaW5hcnlFbmNvZGUobWVzc2FnZSl7XG4gICAgbGV0IHtqb2luX3JlZiwgcmVmLCBldmVudCwgdG9waWMsIHBheWxvYWR9ID0gbWVzc2FnZVxuICAgIGxldCBtZXRhTGVuZ3RoID0gdGhpcy5NRVRBX0xFTkdUSCArIGpvaW5fcmVmLmxlbmd0aCArIHJlZi5sZW5ndGggKyB0b3BpYy5sZW5ndGggKyBldmVudC5sZW5ndGhcbiAgICBsZXQgaGVhZGVyID0gbmV3IEFycmF5QnVmZmVyKHRoaXMuSEVBREVSX0xFTkdUSCArIG1ldGFMZW5ndGgpXG4gICAgbGV0IHZpZXcgPSBuZXcgRGF0YVZpZXcoaGVhZGVyKVxuICAgIGxldCBvZmZzZXQgPSAwXG5cbiAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCB0aGlzLktJTkRTLnB1c2gpIC8vIGtpbmRcbiAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCBqb2luX3JlZi5sZW5ndGgpXG4gICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgcmVmLmxlbmd0aClcbiAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCB0b3BpYy5sZW5ndGgpXG4gICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgZXZlbnQubGVuZ3RoKVxuICAgIEFycmF5LmZyb20oam9pbl9yZWYsIGNoYXIgPT4gdmlldy5zZXRVaW50OChvZmZzZXQrKywgY2hhci5jaGFyQ29kZUF0KDApKSlcbiAgICBBcnJheS5mcm9tKHJlZiwgY2hhciA9PiB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCBjaGFyLmNoYXJDb2RlQXQoMCkpKVxuICAgIEFycmF5LmZyb20odG9waWMsIGNoYXIgPT4gdmlldy5zZXRVaW50OChvZmZzZXQrKywgY2hhci5jaGFyQ29kZUF0KDApKSlcbiAgICBBcnJheS5mcm9tKGV2ZW50LCBjaGFyID0+IHZpZXcuc2V0VWludDgob2Zmc2V0KyssIGNoYXIuY2hhckNvZGVBdCgwKSkpXG5cbiAgICB2YXIgY29tYmluZWQgPSBuZXcgVWludDhBcnJheShoZWFkZXIuYnl0ZUxlbmd0aCArIHBheWxvYWQuYnl0ZUxlbmd0aClcbiAgICBjb21iaW5lZC5zZXQobmV3IFVpbnQ4QXJyYXkoaGVhZGVyKSwgMClcbiAgICBjb21iaW5lZC5zZXQobmV3IFVpbnQ4QXJyYXkocGF5bG9hZCksIGhlYWRlci5ieXRlTGVuZ3RoKVxuXG4gICAgcmV0dXJuIGNvbWJpbmVkLmJ1ZmZlclxuICB9LFxuXG4gIGJpbmFyeURlY29kZShidWZmZXIpe1xuICAgIGxldCB2aWV3ID0gbmV3IERhdGFWaWV3KGJ1ZmZlcilcbiAgICBsZXQga2luZCA9IHZpZXcuZ2V0VWludDgoMClcbiAgICBsZXQgZGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigpXG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSB0aGlzLktJTkRTLnB1c2g6IHJldHVybiB0aGlzLmRlY29kZVB1c2goYnVmZmVyLCB2aWV3LCBkZWNvZGVyKVxuICAgICAgY2FzZSB0aGlzLktJTkRTLnJlcGx5OiByZXR1cm4gdGhpcy5kZWNvZGVSZXBseShidWZmZXIsIHZpZXcsIGRlY29kZXIpXG4gICAgICBjYXNlIHRoaXMuS0lORFMuYnJvYWRjYXN0OiByZXR1cm4gdGhpcy5kZWNvZGVCcm9hZGNhc3QoYnVmZmVyLCB2aWV3LCBkZWNvZGVyKVxuICAgIH1cbiAgfSxcblxuICBkZWNvZGVQdXNoKGJ1ZmZlciwgdmlldywgZGVjb2Rlcil7XG4gICAgbGV0IGpvaW5SZWZTaXplID0gdmlldy5nZXRVaW50OCgxKVxuICAgIGxldCB0b3BpY1NpemUgPSB2aWV3LmdldFVpbnQ4KDIpXG4gICAgbGV0IGV2ZW50U2l6ZSA9IHZpZXcuZ2V0VWludDgoMylcbiAgICBsZXQgb2Zmc2V0ID0gdGhpcy5IRUFERVJfTEVOR1RIICsgdGhpcy5NRVRBX0xFTkdUSCAtIDEgLy8gcHVzaGVzIGhhdmUgbm8gcmVmXG4gICAgbGV0IGpvaW5SZWYgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBqb2luUmVmU2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgam9pblJlZlNpemVcbiAgICBsZXQgdG9waWMgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyB0b3BpY1NpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIHRvcGljU2l6ZVxuICAgIGxldCBldmVudCA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIGV2ZW50U2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgZXZlbnRTaXplXG4gICAgbGV0IGRhdGEgPSBidWZmZXIuc2xpY2Uob2Zmc2V0LCBidWZmZXIuYnl0ZUxlbmd0aClcbiAgICByZXR1cm4ge2pvaW5fcmVmOiBqb2luUmVmLCByZWY6IG51bGwsIHRvcGljOiB0b3BpYywgZXZlbnQ6IGV2ZW50LCBwYXlsb2FkOiBkYXRhfVxuICB9LFxuXG4gIGRlY29kZVJlcGx5KGJ1ZmZlciwgdmlldywgZGVjb2Rlcil7XG4gICAgbGV0IGpvaW5SZWZTaXplID0gdmlldy5nZXRVaW50OCgxKVxuICAgIGxldCByZWZTaXplID0gdmlldy5nZXRVaW50OCgyKVxuICAgIGxldCB0b3BpY1NpemUgPSB2aWV3LmdldFVpbnQ4KDMpXG4gICAgbGV0IGV2ZW50U2l6ZSA9IHZpZXcuZ2V0VWludDgoNClcbiAgICBsZXQgb2Zmc2V0ID0gdGhpcy5IRUFERVJfTEVOR1RIICsgdGhpcy5NRVRBX0xFTkdUSFxuICAgIGxldCBqb2luUmVmID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgam9pblJlZlNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIGpvaW5SZWZTaXplXG4gICAgbGV0IHJlZiA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIHJlZlNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIHJlZlNpemVcbiAgICBsZXQgdG9waWMgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyB0b3BpY1NpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIHRvcGljU2l6ZVxuICAgIGxldCBldmVudCA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIGV2ZW50U2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgZXZlbnRTaXplXG4gICAgbGV0IGRhdGEgPSBidWZmZXIuc2xpY2Uob2Zmc2V0LCBidWZmZXIuYnl0ZUxlbmd0aClcbiAgICBsZXQgcGF5bG9hZCA9IHtzdGF0dXM6IGV2ZW50LCByZXNwb25zZTogZGF0YX1cbiAgICByZXR1cm4ge2pvaW5fcmVmOiBqb2luUmVmLCByZWY6IHJlZiwgdG9waWM6IHRvcGljLCBldmVudDogQ0hBTk5FTF9FVkVOVFMucmVwbHksIHBheWxvYWQ6IHBheWxvYWR9XG4gIH0sXG5cbiAgZGVjb2RlQnJvYWRjYXN0KGJ1ZmZlciwgdmlldywgZGVjb2Rlcil7XG4gICAgbGV0IHRvcGljU2l6ZSA9IHZpZXcuZ2V0VWludDgoMSlcbiAgICBsZXQgZXZlbnRTaXplID0gdmlldy5nZXRVaW50OCgyKVxuICAgIGxldCBvZmZzZXQgPSB0aGlzLkhFQURFUl9MRU5HVEggKyAyXG4gICAgbGV0IHRvcGljID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgdG9waWNTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyB0b3BpY1NpemVcbiAgICBsZXQgZXZlbnQgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBldmVudFNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIGV2ZW50U2l6ZVxuICAgIGxldCBkYXRhID0gYnVmZmVyLnNsaWNlKG9mZnNldCwgYnVmZmVyLmJ5dGVMZW5ndGgpXG5cbiAgICByZXR1cm4ge2pvaW5fcmVmOiBudWxsLCByZWY6IG51bGwsIHRvcGljOiB0b3BpYywgZXZlbnQ6IGV2ZW50LCBwYXlsb2FkOiBkYXRhfVxuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgZ2xvYmFsLFxuICBwaHhXaW5kb3csXG4gIENIQU5ORUxfRVZFTlRTLFxuICBERUZBVUxUX1RJTUVPVVQsXG4gIERFRkFVTFRfVlNOLFxuICBTT0NLRVRfU1RBVEVTLFxuICBUUkFOU1BPUlRTLFxuICBXU19DTE9TRV9OT1JNQUxcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbiAgY2xvc3VyZVxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmltcG9ydCBBamF4IGZyb20gXCIuL2FqYXhcIlxuaW1wb3J0IENoYW5uZWwgZnJvbSBcIi4vY2hhbm5lbFwiXG5pbXBvcnQgTG9uZ1BvbGwgZnJvbSBcIi4vbG9uZ3BvbGxcIlxuaW1wb3J0IFNlcmlhbGl6ZXIgZnJvbSBcIi4vc2VyaWFsaXplclwiXG5pbXBvcnQgVGltZXIgZnJvbSBcIi4vdGltZXJcIlxuXG4vKiogSW5pdGlhbGl6ZXMgdGhlIFNvY2tldCAqXG4gKlxuICogRm9yIElFOCBzdXBwb3J0IHVzZSBhbiBFUzUtc2hpbSAoaHR0cHM6Ly9naXRodWIuY29tL2VzLXNoaW1zL2VzNS1zaGltKVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbmRQb2ludCAtIFRoZSBzdHJpbmcgV2ViU29ja2V0IGVuZHBvaW50LCBpZSwgYFwid3M6Ly9leGFtcGxlLmNvbS9zb2NrZXRcImAsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYFwid3NzOi8vZXhhbXBsZS5jb21cImBcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgXCIvc29ja2V0XCJgIChpbmhlcml0ZWQgaG9zdCAmIHByb3RvY29sKVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzXSAtIE9wdGlvbmFsIGNvbmZpZ3VyYXRpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLnRyYW5zcG9ydF0gLSBUaGUgV2Vic29ja2V0IFRyYW5zcG9ydCwgZm9yIGV4YW1wbGUgV2ViU29ja2V0IG9yIFBob2VuaXguTG9uZ1BvbGwuXG4gKlxuICogRGVmYXVsdHMgdG8gV2ViU29ja2V0IHdpdGggYXV0b21hdGljIExvbmdQb2xsIGZhbGxiYWNrLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdHMuZW5jb2RlXSAtIFRoZSBmdW5jdGlvbiB0byBlbmNvZGUgb3V0Z29pbmcgbWVzc2FnZXMuXG4gKlxuICogRGVmYXVsdHMgdG8gSlNPTiBlbmNvZGVyLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLmRlY29kZV0gLSBUaGUgZnVuY3Rpb24gdG8gZGVjb2RlIGluY29taW5nIG1lc3NhZ2VzLlxuICpcbiAqIERlZmF1bHRzIHRvIEpTT046XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogKHBheWxvYWQsIGNhbGxiYWNrKSA9PiBjYWxsYmFjayhKU09OLnBhcnNlKHBheWxvYWQpKVxuICogYGBgXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLnRpbWVvdXRdIC0gVGhlIGRlZmF1bHQgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gdHJpZ2dlciBwdXNoIHRpbWVvdXRzLlxuICpcbiAqIERlZmF1bHRzIGBERUZBVUxUX1RJTUVPVVRgXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdHMuaGVhcnRiZWF0SW50ZXJ2YWxNc10gLSBUaGUgbWlsbGlzZWMgaW50ZXJ2YWwgdG8gc2VuZCBhIGhlYXJ0YmVhdCBtZXNzYWdlXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdHMucmVjb25uZWN0QWZ0ZXJNc10gLSBUaGUgb3B0aW9uYWwgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBtaWxsc2VjXG4gKiBzb2NrZXQgcmVjb25uZWN0IGludGVydmFsLlxuICpcbiAqIERlZmF1bHRzIHRvIHN0ZXBwZWQgYmFja29mZiBvZjpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBmdW5jdGlvbih0cmllcyl7XG4gKiAgIHJldHVybiBbMTAsIDUwLCAxMDAsIDE1MCwgMjAwLCAyNTAsIDUwMCwgMTAwMCwgMjAwMF1bdHJpZXMgLSAxXSB8fCA1MDAwXG4gKiB9XG4gKiBgYGBgXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLnJlam9pbkFmdGVyTXNdIC0gVGhlIG9wdGlvbmFsIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbWlsbHNlY1xuICogcmVqb2luIGludGVydmFsIGZvciBpbmRpdmlkdWFsIGNoYW5uZWxzLlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGZ1bmN0aW9uKHRyaWVzKXtcbiAqICAgcmV0dXJuIFsxMDAwLCAyMDAwLCA1MDAwXVt0cmllcyAtIDFdIHx8IDEwMDAwXG4gKiB9XG4gKiBgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdHMubG9nZ2VyXSAtIFRoZSBvcHRpb25hbCBmdW5jdGlvbiBmb3Igc3BlY2lhbGl6ZWQgbG9nZ2luZywgaWU6XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogZnVuY3Rpb24oa2luZCwgbXNnLCBkYXRhKSB7XG4gKiAgIGNvbnNvbGUubG9nKGAke2tpbmR9OiAke21zZ31gLCBkYXRhKVxuICogfVxuICogYGBgXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLmxvbmdwb2xsZXJUaW1lb3V0XSAtIFRoZSBtYXhpbXVtIHRpbWVvdXQgb2YgYSBsb25nIHBvbGwgQUpBWCByZXF1ZXN0LlxuICpcbiAqIERlZmF1bHRzIHRvIDIwcyAoZG91YmxlIHRoZSBzZXJ2ZXIgbG9uZyBwb2xsIHRpbWVyKS5cbiAqXG4gKiBAcGFyYW0geyhPYmplY3R8ZnVuY3Rpb24pfSBbb3B0cy5wYXJhbXNdIC0gVGhlIG9wdGlvbmFsIHBhcmFtcyB0byBwYXNzIHdoZW4gY29ubmVjdGluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmJpbmFyeVR5cGVdIC0gVGhlIGJpbmFyeSB0eXBlIHRvIHVzZSBmb3IgYmluYXJ5IFdlYlNvY2tldCBmcmFtZXMuXG4gKlxuICogRGVmYXVsdHMgdG8gXCJhcnJheWJ1ZmZlclwiXG4gKlxuICogQHBhcmFtIHt2c259IFtvcHRzLnZzbl0gLSBUaGUgc2VyaWFsaXplcidzIHByb3RvY29sIHZlcnNpb24gdG8gc2VuZCBvbiBjb25uZWN0LlxuICpcbiAqIERlZmF1bHRzIHRvIERFRkFVTFRfVlNOLlxuKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvY2tldCB7XG4gIGNvbnN0cnVjdG9yKGVuZFBvaW50LCBvcHRzID0ge30pe1xuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MgPSB7b3BlbjogW10sIGNsb3NlOiBbXSwgZXJyb3I6IFtdLCBtZXNzYWdlOiBbXX1cbiAgICB0aGlzLmNoYW5uZWxzID0gW11cbiAgICB0aGlzLnNlbmRCdWZmZXIgPSBbXVxuICAgIHRoaXMucmVmID0gMFxuICAgIHRoaXMudGltZW91dCA9IG9wdHMudGltZW91dCB8fCBERUZBVUxUX1RJTUVPVVRcbiAgICB0aGlzLnRyYW5zcG9ydCA9IG9wdHMudHJhbnNwb3J0IHx8IGdsb2JhbC5XZWJTb2NrZXQgfHwgTG9uZ1BvbGxcbiAgICB0aGlzLmVzdGFibGlzaGVkQ29ubmVjdGlvbnMgPSAwXG4gICAgdGhpcy5kZWZhdWx0RW5jb2RlciA9IFNlcmlhbGl6ZXIuZW5jb2RlLmJpbmQoU2VyaWFsaXplcilcbiAgICB0aGlzLmRlZmF1bHREZWNvZGVyID0gU2VyaWFsaXplci5kZWNvZGUuYmluZChTZXJpYWxpemVyKVxuICAgIHRoaXMuY2xvc2VXYXNDbGVhbiA9IGZhbHNlXG4gICAgdGhpcy5iaW5hcnlUeXBlID0gb3B0cy5iaW5hcnlUeXBlIHx8IFwiYXJyYXlidWZmZXJcIlxuICAgIHRoaXMuY29ubmVjdENsb2NrID0gMVxuICAgIGlmKHRoaXMudHJhbnNwb3J0ICE9PSBMb25nUG9sbCl7XG4gICAgICB0aGlzLmVuY29kZSA9IG9wdHMuZW5jb2RlIHx8IHRoaXMuZGVmYXVsdEVuY29kZXJcbiAgICAgIHRoaXMuZGVjb2RlID0gb3B0cy5kZWNvZGUgfHwgdGhpcy5kZWZhdWx0RGVjb2RlclxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVuY29kZSA9IHRoaXMuZGVmYXVsdEVuY29kZXJcbiAgICAgIHRoaXMuZGVjb2RlID0gdGhpcy5kZWZhdWx0RGVjb2RlclxuICAgIH1cbiAgICBsZXQgYXdhaXRpbmdDb25uZWN0aW9uT25QYWdlU2hvdyA9IG51bGxcbiAgICBpZihwaHhXaW5kb3cgJiYgcGh4V2luZG93LmFkZEV2ZW50TGlzdGVuZXIpe1xuICAgICAgcGh4V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlaGlkZVwiLCBfZSA9PiB7XG4gICAgICAgIGlmKHRoaXMuY29ubil7XG4gICAgICAgICAgdGhpcy5kaXNjb25uZWN0KClcbiAgICAgICAgICBhd2FpdGluZ0Nvbm5lY3Rpb25PblBhZ2VTaG93ID0gdGhpcy5jb25uZWN0Q2xvY2tcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHBoeFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgX2UgPT4ge1xuICAgICAgICBpZihhd2FpdGluZ0Nvbm5lY3Rpb25PblBhZ2VTaG93ID09PSB0aGlzLmNvbm5lY3RDbG9jayl7XG4gICAgICAgICAgYXdhaXRpbmdDb25uZWN0aW9uT25QYWdlU2hvdyA9IG51bGxcbiAgICAgICAgICB0aGlzLmNvbm5lY3QoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICB0aGlzLmhlYXJ0YmVhdEludGVydmFsTXMgPSBvcHRzLmhlYXJ0YmVhdEludGVydmFsTXMgfHwgMzAwMDBcbiAgICB0aGlzLnJlam9pbkFmdGVyTXMgPSAodHJpZXMpID0+IHtcbiAgICAgIGlmKG9wdHMucmVqb2luQWZ0ZXJNcyl7XG4gICAgICAgIHJldHVybiBvcHRzLnJlam9pbkFmdGVyTXModHJpZXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gWzEwMDAsIDIwMDAsIDUwMDBdW3RyaWVzIC0gMV0gfHwgMTAwMDBcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5yZWNvbm5lY3RBZnRlck1zID0gKHRyaWVzKSA9PiB7XG4gICAgICBpZihvcHRzLnJlY29ubmVjdEFmdGVyTXMpe1xuICAgICAgICByZXR1cm4gb3B0cy5yZWNvbm5lY3RBZnRlck1zKHRyaWVzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFsxMCwgNTAsIDEwMCwgMTUwLCAyMDAsIDI1MCwgNTAwLCAxMDAwLCAyMDAwXVt0cmllcyAtIDFdIHx8IDUwMDBcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRzLmxvZ2dlciB8fCBudWxsXG4gICAgdGhpcy5sb25ncG9sbGVyVGltZW91dCA9IG9wdHMubG9uZ3BvbGxlclRpbWVvdXQgfHwgMjAwMDBcbiAgICB0aGlzLnBhcmFtcyA9IGNsb3N1cmUob3B0cy5wYXJhbXMgfHwge30pXG4gICAgdGhpcy5lbmRQb2ludCA9IGAke2VuZFBvaW50fS8ke1RSQU5TUE9SVFMud2Vic29ja2V0fWBcbiAgICB0aGlzLnZzbiA9IG9wdHMudnNuIHx8IERFRkFVTFRfVlNOXG4gICAgdGhpcy5oZWFydGJlYXRUaW1lciA9IG51bGxcbiAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSBudWxsXG4gICAgdGhpcy5yZWNvbm5lY3RUaW1lciA9IG5ldyBUaW1lcigoKSA9PiB7XG4gICAgICB0aGlzLnRlYXJkb3duKCgpID0+IHRoaXMuY29ubmVjdCgpKVxuICAgIH0sIHRoaXMucmVjb25uZWN0QWZ0ZXJNcylcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBMb25nUG9sbCB0cmFuc3BvcnQgcmVmZXJlbmNlXG4gICAqL1xuICBnZXRMb25nUG9sbFRyYW5zcG9ydCgpeyByZXR1cm4gTG9uZ1BvbGwgfVxuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0cyBhbmQgcmVwbGFjZXMgdGhlIGFjdGl2ZSB0cmFuc3BvcnRcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbmV3VHJhbnNwb3J0IC0gVGhlIG5ldyB0cmFuc3BvcnQgY2xhc3MgdG8gaW5zdGFudGlhdGVcbiAgICpcbiAgICovXG4gIHJlcGxhY2VUcmFuc3BvcnQobmV3VHJhbnNwb3J0KXtcbiAgICB0aGlzLmNvbm5lY3RDbG9jaysrXG4gICAgdGhpcy5jbG9zZVdhc0NsZWFuID0gdHJ1ZVxuICAgIHRoaXMucmVjb25uZWN0VGltZXIucmVzZXQoKVxuICAgIHRoaXMuc2VuZEJ1ZmZlciA9IFtdXG4gICAgaWYodGhpcy5jb25uKXtcbiAgICAgIHRoaXMuY29ubi5jbG9zZSgpXG4gICAgICB0aGlzLmNvbm4gPSBudWxsXG4gICAgfVxuICAgIHRoaXMudHJhbnNwb3J0ID0gbmV3VHJhbnNwb3J0XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc29ja2V0IHByb3RvY29sXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBwcm90b2NvbCgpeyByZXR1cm4gbG9jYXRpb24ucHJvdG9jb2wubWF0Y2goL15odHRwcy8pID8gXCJ3c3NcIiA6IFwid3NcIiB9XG5cbiAgLyoqXG4gICAqIFRoZSBmdWxseSBxdWFsaWZlZCBzb2NrZXQgdXJsXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBlbmRQb2ludFVSTCgpe1xuICAgIGxldCB1cmkgPSBBamF4LmFwcGVuZFBhcmFtcyhcbiAgICAgIEFqYXguYXBwZW5kUGFyYW1zKHRoaXMuZW5kUG9pbnQsIHRoaXMucGFyYW1zKCkpLCB7dnNuOiB0aGlzLnZzbn0pXG4gICAgaWYodXJpLmNoYXJBdCgwKSAhPT0gXCIvXCIpeyByZXR1cm4gdXJpIH1cbiAgICBpZih1cmkuY2hhckF0KDEpID09PSBcIi9cIil7IHJldHVybiBgJHt0aGlzLnByb3RvY29sKCl9OiR7dXJpfWAgfVxuXG4gICAgcmV0dXJuIGAke3RoaXMucHJvdG9jb2woKX06Ly8ke2xvY2F0aW9uLmhvc3R9JHt1cml9YFxuICB9XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RzIHRoZSBzb2NrZXRcbiAgICpcbiAgICogU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DbG9zZUV2ZW50I1N0YXR1c19jb2RlcyBmb3IgdmFsaWQgc3RhdHVzIGNvZGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIE9wdGlvbmFsIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCBhZnRlciBzb2NrZXQgaXMgZGlzY29ubmVjdGVkLlxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IGNvZGUgLSBBIHN0YXR1cyBjb2RlIGZvciBkaXNjb25uZWN0aW9uIChPcHRpb25hbCkuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWFzb24gLSBBIHRleHR1YWwgZGVzY3JpcHRpb24gb2YgdGhlIHJlYXNvbiB0byBkaXNjb25uZWN0LiAoT3B0aW9uYWwpXG4gICAqL1xuICBkaXNjb25uZWN0KGNhbGxiYWNrLCBjb2RlLCByZWFzb24pe1xuICAgIHRoaXMuY29ubmVjdENsb2NrKytcbiAgICB0aGlzLmNsb3NlV2FzQ2xlYW4gPSB0cnVlXG4gICAgdGhpcy5yZWNvbm5lY3RUaW1lci5yZXNldCgpXG4gICAgdGhpcy50ZWFyZG93bihjYWxsYmFjaywgY29kZSwgcmVhc29uKVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBUaGUgcGFyYW1zIHRvIHNlbmQgd2hlbiBjb25uZWN0aW5nLCBmb3IgZXhhbXBsZSBge3VzZXJfaWQ6IHVzZXJUb2tlbn1gXG4gICAqXG4gICAqIFBhc3NpbmcgcGFyYW1zIHRvIGNvbm5lY3QgaXMgZGVwcmVjYXRlZDsgcGFzcyB0aGVtIGluIHRoZSBTb2NrZXQgY29uc3RydWN0b3IgaW5zdGVhZDpcbiAgICogYG5ldyBTb2NrZXQoXCIvc29ja2V0XCIsIHtwYXJhbXM6IHt1c2VyX2lkOiB1c2VyVG9rZW59fSlgLlxuICAgKi9cbiAgY29ubmVjdChwYXJhbXMpe1xuICAgIGlmKHBhcmFtcyl7XG4gICAgICBjb25zb2xlICYmIGNvbnNvbGUubG9nKFwicGFzc2luZyBwYXJhbXMgdG8gY29ubmVjdCBpcyBkZXByZWNhdGVkLiBJbnN0ZWFkIHBhc3MgOnBhcmFtcyB0byB0aGUgU29ja2V0IGNvbnN0cnVjdG9yXCIpXG4gICAgICB0aGlzLnBhcmFtcyA9IGNsb3N1cmUocGFyYW1zKVxuICAgIH1cbiAgICBpZih0aGlzLmNvbm4peyByZXR1cm4gfVxuXG4gICAgdGhpcy5jb25uZWN0Q2xvY2srK1xuICAgIHRoaXMuY2xvc2VXYXNDbGVhbiA9IGZhbHNlXG4gICAgdGhpcy5jb25uID0gbmV3IHRoaXMudHJhbnNwb3J0KHRoaXMuZW5kUG9pbnRVUkwoKSlcbiAgICB0aGlzLmNvbm4uYmluYXJ5VHlwZSA9IHRoaXMuYmluYXJ5VHlwZVxuICAgIHRoaXMuY29ubi50aW1lb3V0ID0gdGhpcy5sb25ncG9sbGVyVGltZW91dFxuICAgIHRoaXMuY29ubi5vbm9wZW4gPSAoKSA9PiB0aGlzLm9uQ29ubk9wZW4oKVxuICAgIHRoaXMuY29ubi5vbmVycm9yID0gZXJyb3IgPT4gdGhpcy5vbkNvbm5FcnJvcihlcnJvcilcbiAgICB0aGlzLmNvbm4ub25tZXNzYWdlID0gZXZlbnQgPT4gdGhpcy5vbkNvbm5NZXNzYWdlKGV2ZW50KVxuICAgIHRoaXMuY29ubi5vbmNsb3NlID0gZXZlbnQgPT4gdGhpcy5vbkNvbm5DbG9zZShldmVudClcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2dzIHRoZSBtZXNzYWdlLiBPdmVycmlkZSBgdGhpcy5sb2dnZXJgIGZvciBzcGVjaWFsaXplZCBsb2dnaW5nLiBub29wcyBieSBkZWZhdWx0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBraW5kXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtc2dcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICovXG4gIGxvZyhraW5kLCBtc2csIGRhdGEpeyB0aGlzLmxvZ2dlcihraW5kLCBtc2csIGRhdGEpIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIGEgbG9nZ2VyIGhhcyBiZWVuIHNldCBvbiB0aGlzIHNvY2tldC5cbiAgICovXG4gIGhhc0xvZ2dlcigpeyByZXR1cm4gdGhpcy5sb2dnZXIgIT09IG51bGwgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgY2FsbGJhY2tzIGZvciBjb25uZWN0aW9uIG9wZW4gZXZlbnRzXG4gICAqXG4gICAqIEBleGFtcGxlIHNvY2tldC5vbk9wZW4oZnVuY3Rpb24oKXsgY29uc29sZS5pbmZvKFwidGhlIHNvY2tldCB3YXMgb3BlbmVkXCIpIH0pXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICBvbk9wZW4oY2FsbGJhY2spe1xuICAgIGxldCByZWYgPSB0aGlzLm1ha2VSZWYoKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3Mub3Blbi5wdXNoKFtyZWYsIGNhbGxiYWNrXSlcbiAgICByZXR1cm4gcmVmXG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGNhbGxiYWNrcyBmb3IgY29ubmVjdGlvbiBjbG9zZSBldmVudHNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICovXG4gIG9uQ2xvc2UoY2FsbGJhY2spe1xuICAgIGxldCByZWYgPSB0aGlzLm1ha2VSZWYoKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MuY2xvc2UucHVzaChbcmVmLCBjYWxsYmFja10pXG4gICAgcmV0dXJuIHJlZlxuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBjYWxsYmFja3MgZm9yIGNvbm5lY3Rpb24gZXJyb3IgZXZlbnRzXG4gICAqXG4gICAqIEBleGFtcGxlIHNvY2tldC5vbkVycm9yKGZ1bmN0aW9uKGVycm9yKXsgYWxlcnQoXCJBbiBlcnJvciBvY2N1cnJlZFwiKSB9KVxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25FcnJvcihjYWxsYmFjayl7XG4gICAgbGV0IHJlZiA9IHRoaXMubWFrZVJlZigpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5lcnJvci5wdXNoKFtyZWYsIGNhbGxiYWNrXSlcbiAgICByZXR1cm4gcmVmXG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGNhbGxiYWNrcyBmb3IgY29ubmVjdGlvbiBtZXNzYWdlIGV2ZW50c1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25NZXNzYWdlKGNhbGxiYWNrKXtcbiAgICBsZXQgcmVmID0gdGhpcy5tYWtlUmVmKClcbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLm1lc3NhZ2UucHVzaChbcmVmLCBjYWxsYmFja10pXG4gICAgcmV0dXJuIHJlZlxuICB9XG5cbiAgLyoqXG4gICAqIFBpbmdzIHRoZSBzZXJ2ZXIgYW5kIGludm9rZXMgdGhlIGNhbGxiYWNrIHdpdGggdGhlIFJUVCBpbiBtaWxsaXNlY29uZHNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICpcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBwaW5nIHdhcyBwdXNoZWQgb3IgZmFsc2UgaWYgdW5hYmxlIHRvIGJlIHB1c2hlZC5cbiAgICovXG4gIHBpbmcoY2FsbGJhY2spe1xuICAgIGlmKCF0aGlzLmlzQ29ubmVjdGVkKCkpeyByZXR1cm4gZmFsc2UgfVxuICAgIGxldCByZWYgPSB0aGlzLm1ha2VSZWYoKVxuICAgIGxldCBzdGFydFRpbWUgPSBEYXRlLm5vdygpXG4gICAgdGhpcy5wdXNoKHt0b3BpYzogXCJwaG9lbml4XCIsIGV2ZW50OiBcImhlYXJ0YmVhdFwiLCBwYXlsb2FkOiB7fSwgcmVmOiByZWZ9KVxuICAgIGxldCBvbk1zZ1JlZiA9IHRoaXMub25NZXNzYWdlKG1zZyA9PiB7XG4gICAgICBpZihtc2cucmVmID09PSByZWYpe1xuICAgICAgICB0aGlzLm9mZihbb25Nc2dSZWZdKVxuICAgICAgICBjYWxsYmFjayhEYXRlLm5vdygpIC0gc3RhcnRUaW1lKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgb25Db25uT3Blbigpe1xuICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpIHRoaXMubG9nKFwidHJhbnNwb3J0XCIsIGBjb25uZWN0ZWQgdG8gJHt0aGlzLmVuZFBvaW50VVJMKCl9YClcbiAgICB0aGlzLmNsb3NlV2FzQ2xlYW4gPSBmYWxzZVxuICAgIHRoaXMuZXN0YWJsaXNoZWRDb25uZWN0aW9ucysrXG4gICAgdGhpcy5mbHVzaFNlbmRCdWZmZXIoKVxuICAgIHRoaXMucmVjb25uZWN0VGltZXIucmVzZXQoKVxuICAgIHRoaXMucmVzZXRIZWFydGJlYXQoKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3Mub3Blbi5mb3JFYWNoKChbLCBjYWxsYmFja10pID0+IGNhbGxiYWNrKCkpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG5cbiAgaGVhcnRiZWF0VGltZW91dCgpe1xuICAgIGlmKHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZil7XG4gICAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSBudWxsXG4gICAgICBpZih0aGlzLmhhc0xvZ2dlcigpKXsgdGhpcy5sb2coXCJ0cmFuc3BvcnRcIiwgXCJoZWFydGJlYXQgdGltZW91dC4gQXR0ZW1wdGluZyB0byByZS1lc3RhYmxpc2ggY29ubmVjdGlvblwiKSB9XG4gICAgICB0aGlzLmFibm9ybWFsQ2xvc2UoXCJoZWFydGJlYXQgdGltZW91dFwiKVxuICAgIH1cbiAgfVxuXG4gIHJlc2V0SGVhcnRiZWF0KCl7XG4gICAgaWYodGhpcy5jb25uICYmIHRoaXMuY29ubi5za2lwSGVhcnRiZWF0KXsgcmV0dXJuIH1cbiAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSBudWxsXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuaGVhcnRiZWF0VGltZXIpXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnNlbmRIZWFydGJlYXQoKSwgdGhpcy5oZWFydGJlYXRJbnRlcnZhbE1zKVxuICB9XG5cbiAgdGVhcmRvd24oY2FsbGJhY2ssIGNvZGUsIHJlYXNvbil7XG4gICAgaWYoIXRoaXMuY29ubil7XG4gICAgICByZXR1cm4gY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgIH1cblxuICAgIHRoaXMud2FpdEZvckJ1ZmZlckRvbmUoKCkgPT4ge1xuICAgICAgaWYodGhpcy5jb25uKXtcbiAgICAgICAgaWYoY29kZSl7IHRoaXMuY29ubi5jbG9zZShjb2RlLCByZWFzb24gfHwgXCJcIikgfSBlbHNlIHsgdGhpcy5jb25uLmNsb3NlKCkgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLndhaXRGb3JTb2NrZXRDbG9zZWQoKCkgPT4ge1xuICAgICAgICBpZih0aGlzLmNvbm4pe1xuICAgICAgICAgIHRoaXMuY29ubi5vbmNsb3NlID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgICAgICAgIHRoaXMuY29ubiA9IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHdhaXRGb3JCdWZmZXJEb25lKGNhbGxiYWNrLCB0cmllcyA9IDEpe1xuICAgIGlmKHRyaWVzID09PSA1IHx8ICF0aGlzLmNvbm4gfHwgIXRoaXMuY29ubi5idWZmZXJlZEFtb3VudCl7XG4gICAgICBjYWxsYmFjaygpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMud2FpdEZvckJ1ZmZlckRvbmUoY2FsbGJhY2ssIHRyaWVzICsgMSlcbiAgICB9LCAxNTAgKiB0cmllcylcbiAgfVxuXG4gIHdhaXRGb3JTb2NrZXRDbG9zZWQoY2FsbGJhY2ssIHRyaWVzID0gMSl7XG4gICAgaWYodHJpZXMgPT09IDUgfHwgIXRoaXMuY29ubiB8fCB0aGlzLmNvbm4ucmVhZHlTdGF0ZSA9PT0gU09DS0VUX1NUQVRFUy5jbG9zZWQpe1xuICAgICAgY2FsbGJhY2soKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLndhaXRGb3JTb2NrZXRDbG9zZWQoY2FsbGJhY2ssIHRyaWVzICsgMSlcbiAgICB9LCAxNTAgKiB0cmllcylcbiAgfVxuXG4gIG9uQ29ubkNsb3NlKGV2ZW50KXtcbiAgICBsZXQgY2xvc2VDb2RlID0gZXZlbnQgJiYgZXZlbnQuY29kZVxuICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpIHRoaXMubG9nKFwidHJhbnNwb3J0XCIsIFwiY2xvc2VcIiwgZXZlbnQpXG4gICAgdGhpcy50cmlnZ2VyQ2hhbkVycm9yKClcbiAgICBjbGVhclRpbWVvdXQodGhpcy5oZWFydGJlYXRUaW1lcilcbiAgICBpZighdGhpcy5jbG9zZVdhc0NsZWFuICYmIGNsb3NlQ29kZSAhPT0gMTAwMCl7XG4gICAgICB0aGlzLnJlY29ubmVjdFRpbWVyLnNjaGVkdWxlVGltZW91dCgpXG4gICAgfVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MuY2xvc2UuZm9yRWFjaCgoWywgY2FsbGJhY2tdKSA9PiBjYWxsYmFjayhldmVudCkpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIG9uQ29ubkVycm9yKGVycm9yKXtcbiAgICBpZih0aGlzLmhhc0xvZ2dlcigpKSB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBlcnJvcilcbiAgICBsZXQgdHJhbnNwb3J0QmVmb3JlID0gdGhpcy50cmFuc3BvcnRcbiAgICBsZXQgZXN0YWJsaXNoZWRCZWZvcmUgPSB0aGlzLmVzdGFibGlzaGVkQ29ubmVjdGlvbnNcbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLmVycm9yLmZvckVhY2goKFssIGNhbGxiYWNrXSkgPT4ge1xuICAgICAgY2FsbGJhY2soZXJyb3IsIHRyYW5zcG9ydEJlZm9yZSwgZXN0YWJsaXNoZWRCZWZvcmUpXG4gICAgfSlcbiAgICBpZih0cmFuc3BvcnRCZWZvcmUgPT09IHRoaXMudHJhbnNwb3J0IHx8IGVzdGFibGlzaGVkQmVmb3JlID4gMCl7XG4gICAgICB0aGlzLnRyaWdnZXJDaGFuRXJyb3IoKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdHJpZ2dlckNoYW5FcnJvcigpe1xuICAgIHRoaXMuY2hhbm5lbHMuZm9yRWFjaChjaGFubmVsID0+IHtcbiAgICAgIGlmKCEoY2hhbm5lbC5pc0Vycm9yZWQoKSB8fCBjaGFubmVsLmlzTGVhdmluZygpIHx8IGNoYW5uZWwuaXNDbG9zZWQoKSkpe1xuICAgICAgICBjaGFubmVsLnRyaWdnZXIoQ0hBTk5FTF9FVkVOVFMuZXJyb3IpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgY29ubmVjdGlvblN0YXRlKCl7XG4gICAgc3dpdGNoKHRoaXMuY29ubiAmJiB0aGlzLmNvbm4ucmVhZHlTdGF0ZSl7XG4gICAgICBjYXNlIFNPQ0tFVF9TVEFURVMuY29ubmVjdGluZzogcmV0dXJuIFwiY29ubmVjdGluZ1wiXG4gICAgICBjYXNlIFNPQ0tFVF9TVEFURVMub3BlbjogcmV0dXJuIFwib3BlblwiXG4gICAgICBjYXNlIFNPQ0tFVF9TVEFURVMuY2xvc2luZzogcmV0dXJuIFwiY2xvc2luZ1wiXG4gICAgICBkZWZhdWx0OiByZXR1cm4gXCJjbG9zZWRcIlxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzQ29ubmVjdGVkKCl7IHJldHVybiB0aGlzLmNvbm5lY3Rpb25TdGF0ZSgpID09PSBcIm9wZW5cIiB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqXG4gICAqIEBwYXJhbSB7Q2hhbm5lbH1cbiAgICovXG4gIHJlbW92ZShjaGFubmVsKXtcbiAgICB0aGlzLm9mZihjaGFubmVsLnN0YXRlQ2hhbmdlUmVmcylcbiAgICB0aGlzLmNoYW5uZWxzID0gdGhpcy5jaGFubmVscy5maWx0ZXIoYyA9PiBjLmpvaW5SZWYoKSAhPT0gY2hhbm5lbC5qb2luUmVmKCkpXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBgb25PcGVuYCwgYG9uQ2xvc2VgLCBgb25FcnJvcixgIGFuZCBgb25NZXNzYWdlYCByZWdpc3RyYXRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0ge3JlZnN9IC0gbGlzdCBvZiByZWZzIHJldHVybmVkIGJ5IGNhbGxzIHRvXG4gICAqICAgICAgICAgICAgICAgICBgb25PcGVuYCwgYG9uQ2xvc2VgLCBgb25FcnJvcixgIGFuZCBgb25NZXNzYWdlYFxuICAgKi9cbiAgb2ZmKHJlZnMpe1xuICAgIGZvcihsZXQga2V5IGluIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3Mpe1xuICAgICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrc1trZXldID0gdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrc1trZXldLmZpbHRlcigoW3JlZl0pID0+IHtcbiAgICAgICAgcmV0dXJuIHJlZnMuaW5kZXhPZihyZWYpID09PSAtMVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIGEgbmV3IGNoYW5uZWwgZm9yIHRoZSBnaXZlbiB0b3BpY1xuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdG9waWNcbiAgICogQHBhcmFtIHtPYmplY3R9IGNoYW5QYXJhbXMgLSBQYXJhbWV0ZXJzIGZvciB0aGUgY2hhbm5lbFxuICAgKiBAcmV0dXJucyB7Q2hhbm5lbH1cbiAgICovXG4gIGNoYW5uZWwodG9waWMsIGNoYW5QYXJhbXMgPSB7fSl7XG4gICAgbGV0IGNoYW4gPSBuZXcgQ2hhbm5lbCh0b3BpYywgY2hhblBhcmFtcywgdGhpcylcbiAgICB0aGlzLmNoYW5uZWxzLnB1c2goY2hhbilcbiAgICByZXR1cm4gY2hhblxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAqL1xuICBwdXNoKGRhdGEpe1xuICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpe1xuICAgICAgbGV0IHt0b3BpYywgZXZlbnQsIHBheWxvYWQsIHJlZiwgam9pbl9yZWZ9ID0gZGF0YVxuICAgICAgdGhpcy5sb2coXCJwdXNoXCIsIGAke3RvcGljfSAke2V2ZW50fSAoJHtqb2luX3JlZn0sICR7cmVmfSlgLCBwYXlsb2FkKVxuICAgIH1cblxuICAgIGlmKHRoaXMuaXNDb25uZWN0ZWQoKSl7XG4gICAgICB0aGlzLmVuY29kZShkYXRhLCByZXN1bHQgPT4gdGhpcy5jb25uLnNlbmQocmVzdWx0KSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZW5kQnVmZmVyLnB1c2goKCkgPT4gdGhpcy5lbmNvZGUoZGF0YSwgcmVzdWx0ID0+IHRoaXMuY29ubi5zZW5kKHJlc3VsdCkpKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIG5leHQgbWVzc2FnZSByZWYsIGFjY291bnRpbmcgZm9yIG92ZXJmbG93c1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgbWFrZVJlZigpe1xuICAgIGxldCBuZXdSZWYgPSB0aGlzLnJlZiArIDFcbiAgICBpZihuZXdSZWYgPT09IHRoaXMucmVmKXsgdGhpcy5yZWYgPSAwIH0gZWxzZSB7IHRoaXMucmVmID0gbmV3UmVmIH1cblxuICAgIHJldHVybiB0aGlzLnJlZi50b1N0cmluZygpXG4gIH1cblxuICBzZW5kSGVhcnRiZWF0KCl7XG4gICAgaWYodGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmICYmICF0aGlzLmlzQ29ubmVjdGVkKCkpeyByZXR1cm4gfVxuICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IHRoaXMubWFrZVJlZigpXG4gICAgdGhpcy5wdXNoKHt0b3BpYzogXCJwaG9lbml4XCIsIGV2ZW50OiBcImhlYXJ0YmVhdFwiLCBwYXlsb2FkOiB7fSwgcmVmOiB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWZ9KVxuICAgIHRoaXMuaGVhcnRiZWF0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGVhcnRiZWF0VGltZW91dCgpLCB0aGlzLmhlYXJ0YmVhdEludGVydmFsTXMpXG4gIH1cblxuICBhYm5vcm1hbENsb3NlKHJlYXNvbil7XG4gICAgdGhpcy5jbG9zZVdhc0NsZWFuID0gZmFsc2VcbiAgICBpZih0aGlzLmlzQ29ubmVjdGVkKCkpeyB0aGlzLmNvbm4uY2xvc2UoV1NfQ0xPU0VfTk9STUFMLCByZWFzb24pIH1cbiAgfVxuXG4gIGZsdXNoU2VuZEJ1ZmZlcigpe1xuICAgIGlmKHRoaXMuaXNDb25uZWN0ZWQoKSAmJiB0aGlzLnNlbmRCdWZmZXIubGVuZ3RoID4gMCl7XG4gICAgICB0aGlzLnNlbmRCdWZmZXIuZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjaygpKVxuICAgICAgdGhpcy5zZW5kQnVmZmVyID0gW11cbiAgICB9XG4gIH1cblxuICBvbkNvbm5NZXNzYWdlKHJhd01lc3NhZ2Upe1xuICAgIHRoaXMuZGVjb2RlKHJhd01lc3NhZ2UuZGF0YSwgbXNnID0+IHtcbiAgICAgIGxldCB7dG9waWMsIGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5fcmVmfSA9IG1zZ1xuICAgICAgaWYocmVmICYmIHJlZiA9PT0gdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmKXtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaGVhcnRiZWF0VGltZXIpXG4gICAgICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IG51bGxcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnNlbmRIZWFydGJlYXQoKSwgdGhpcy5oZWFydGJlYXRJbnRlcnZhbE1zKVxuICAgICAgfVxuXG4gICAgICBpZih0aGlzLmhhc0xvZ2dlcigpKSB0aGlzLmxvZyhcInJlY2VpdmVcIiwgYCR7cGF5bG9hZC5zdGF0dXMgfHwgXCJcIn0gJHt0b3BpY30gJHtldmVudH0gJHtyZWYgJiYgXCIoXCIgKyByZWYgKyBcIilcIiB8fCBcIlwifWAsIHBheWxvYWQpXG5cbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoYW5uZWxzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgY29uc3QgY2hhbm5lbCA9IHRoaXMuY2hhbm5lbHNbaV1cbiAgICAgICAgaWYoIWNoYW5uZWwuaXNNZW1iZXIodG9waWMsIGV2ZW50LCBwYXlsb2FkLCBqb2luX3JlZikpeyBjb250aW51ZSB9XG4gICAgICAgIGNoYW5uZWwudHJpZ2dlcihldmVudCwgcGF5bG9hZCwgcmVmLCBqb2luX3JlZilcbiAgICAgIH1cblxuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MubWVzc2FnZS5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGxldCBbLCBjYWxsYmFja10gPSB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLm1lc3NhZ2VbaV1cbiAgICAgICAgY2FsbGJhY2sobXNnKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBsZWF2ZU9wZW5Ub3BpYyh0b3BpYyl7XG4gICAgbGV0IGR1cENoYW5uZWwgPSB0aGlzLmNoYW5uZWxzLmZpbmQoYyA9PiBjLnRvcGljID09PSB0b3BpYyAmJiAoYy5pc0pvaW5lZCgpIHx8IGMuaXNKb2luaW5nKCkpKVxuICAgIGlmKGR1cENoYW5uZWwpe1xuICAgICAgaWYodGhpcy5oYXNMb2dnZXIoKSkgdGhpcy5sb2coXCJ0cmFuc3BvcnRcIiwgYGxlYXZpbmcgZHVwbGljYXRlIHRvcGljIFwiJHt0b3BpY31cImApXG4gICAgICBkdXBDaGFubmVsLmxlYXZlKClcbiAgICB9XG4gIH1cbn1cbiIsICJcbmV4cG9ydCBjb25zdCBDT05TRUNVVElWRV9SRUxPQURTID0gXCJjb25zZWN1dGl2ZS1yZWxvYWRzXCJcbmV4cG9ydCBjb25zdCBNQVhfUkVMT0FEUyA9IDEwXG5leHBvcnQgY29uc3QgUkVMT0FEX0pJVFRFUl9NSU4gPSA1MDAwXG5leHBvcnQgY29uc3QgUkVMT0FEX0pJVFRFUl9NQVggPSAxMDAwMFxuZXhwb3J0IGNvbnN0IEZBSUxTQUZFX0pJVFRFUiA9IDMwMDAwXG5leHBvcnQgY29uc3QgUEhYX0VWRU5UX0NMQVNTRVMgPSBbXG4gIFwicGh4LWNsaWNrLWxvYWRpbmdcIiwgXCJwaHgtY2hhbmdlLWxvYWRpbmdcIiwgXCJwaHgtc3VibWl0LWxvYWRpbmdcIixcbiAgXCJwaHgta2V5ZG93bi1sb2FkaW5nXCIsIFwicGh4LWtleXVwLWxvYWRpbmdcIiwgXCJwaHgtYmx1ci1sb2FkaW5nXCIsIFwicGh4LWZvY3VzLWxvYWRpbmdcIlxuXVxuZXhwb3J0IGNvbnN0IFBIWF9DT01QT05FTlQgPSBcImRhdGEtcGh4LWNvbXBvbmVudFwiXG5leHBvcnQgY29uc3QgUEhYX0xJVkVfTElOSyA9IFwiZGF0YS1waHgtbGlua1wiXG5leHBvcnQgY29uc3QgUEhYX1RSQUNLX1NUQVRJQyA9IFwidHJhY2stc3RhdGljXCJcbmV4cG9ydCBjb25zdCBQSFhfTElOS19TVEFURSA9IFwiZGF0YS1waHgtbGluay1zdGF0ZVwiXG5leHBvcnQgY29uc3QgUEhYX1JFRiA9IFwiZGF0YS1waHgtcmVmXCJcbmV4cG9ydCBjb25zdCBQSFhfUkVGX1NSQyA9IFwiZGF0YS1waHgtcmVmLXNyY1wiXG5leHBvcnQgY29uc3QgUEhYX1RSQUNLX1VQTE9BRFMgPSBcInRyYWNrLXVwbG9hZHNcIlxuZXhwb3J0IGNvbnN0IFBIWF9VUExPQURfUkVGID0gXCJkYXRhLXBoeC11cGxvYWQtcmVmXCJcbmV4cG9ydCBjb25zdCBQSFhfUFJFRkxJR0hURURfUkVGUyA9IFwiZGF0YS1waHgtcHJlZmxpZ2h0ZWQtcmVmc1wiXG5leHBvcnQgY29uc3QgUEhYX0RPTkVfUkVGUyA9IFwiZGF0YS1waHgtZG9uZS1yZWZzXCJcbmV4cG9ydCBjb25zdCBQSFhfRFJPUF9UQVJHRVQgPSBcImRyb3AtdGFyZ2V0XCJcbmV4cG9ydCBjb25zdCBQSFhfQUNUSVZFX0VOVFJZX1JFRlMgPSBcImRhdGEtcGh4LWFjdGl2ZS1yZWZzXCJcbmV4cG9ydCBjb25zdCBQSFhfTElWRV9GSUxFX1VQREFURUQgPSBcInBoeDpsaXZlLWZpbGU6dXBkYXRlZFwiXG5leHBvcnQgY29uc3QgUEhYX1NLSVAgPSBcImRhdGEtcGh4LXNraXBcIlxuZXhwb3J0IGNvbnN0IFBIWF9QUlVORSA9IFwiZGF0YS1waHgtcHJ1bmVcIlxuZXhwb3J0IGNvbnN0IFBIWF9QQUdFX0xPQURJTkcgPSBcInBhZ2UtbG9hZGluZ1wiXG5leHBvcnQgY29uc3QgUEhYX0NPTk5FQ1RFRF9DTEFTUyA9IFwicGh4LWNvbm5lY3RlZFwiXG5leHBvcnQgY29uc3QgUEhYX0RJU0NPTk5FQ1RFRF9DTEFTUyA9IFwicGh4LWxvYWRpbmdcIlxuZXhwb3J0IGNvbnN0IFBIWF9OT19GRUVEQkFDS19DTEFTUyA9IFwicGh4LW5vLWZlZWRiYWNrXCJcbmV4cG9ydCBjb25zdCBQSFhfRVJST1JfQ0xBU1MgPSBcInBoeC1lcnJvclwiXG5leHBvcnQgY29uc3QgUEhYX1BBUkVOVF9JRCA9IFwiZGF0YS1waHgtcGFyZW50LWlkXCJcbmV4cG9ydCBjb25zdCBQSFhfTUFJTiA9IFwiZGF0YS1waHgtbWFpblwiXG5leHBvcnQgY29uc3QgUEhYX1JPT1RfSUQgPSBcImRhdGEtcGh4LXJvb3QtaWRcIlxuZXhwb3J0IGNvbnN0IFBIWF9UUklHR0VSX0FDVElPTiA9IFwidHJpZ2dlci1hY3Rpb25cIlxuZXhwb3J0IGNvbnN0IFBIWF9GRUVEQkFDS19GT1IgPSBcImZlZWRiYWNrLWZvclwiXG5leHBvcnQgY29uc3QgUEhYX0hBU19GT0NVU0VEID0gXCJwaHgtaGFzLWZvY3VzZWRcIlxuZXhwb3J0IGNvbnN0IEZPQ1VTQUJMRV9JTlBVVFMgPSBbXCJ0ZXh0XCIsIFwidGV4dGFyZWFcIiwgXCJudW1iZXJcIiwgXCJlbWFpbFwiLCBcInBhc3N3b3JkXCIsIFwic2VhcmNoXCIsIFwidGVsXCIsIFwidXJsXCIsIFwiZGF0ZVwiLCBcInRpbWVcIiwgXCJkYXRldGltZS1sb2NhbFwiLCBcImNvbG9yXCIsIFwicmFuZ2VcIl1cbmV4cG9ydCBjb25zdCBDSEVDS0FCTEVfSU5QVVRTID0gW1wiY2hlY2tib3hcIiwgXCJyYWRpb1wiXVxuZXhwb3J0IGNvbnN0IFBIWF9IQVNfU1VCTUlUVEVEID0gXCJwaHgtaGFzLXN1Ym1pdHRlZFwiXG5leHBvcnQgY29uc3QgUEhYX1NFU1NJT04gPSBcImRhdGEtcGh4LXNlc3Npb25cIlxuZXhwb3J0IGNvbnN0IFBIWF9WSUVXX1NFTEVDVE9SID0gYFske1BIWF9TRVNTSU9OfV1gXG5leHBvcnQgY29uc3QgUEhYX1NUSUNLWSA9IFwiZGF0YS1waHgtc3RpY2t5XCJcbmV4cG9ydCBjb25zdCBQSFhfU1RBVElDID0gXCJkYXRhLXBoeC1zdGF0aWNcIlxuZXhwb3J0IGNvbnN0IFBIWF9SRUFET05MWSA9IFwiZGF0YS1waHgtcmVhZG9ubHlcIlxuZXhwb3J0IGNvbnN0IFBIWF9ESVNBQkxFRCA9IFwiZGF0YS1waHgtZGlzYWJsZWRcIlxuZXhwb3J0IGNvbnN0IFBIWF9ESVNBQkxFX1dJVEggPSBcImRpc2FibGUtd2l0aFwiXG5leHBvcnQgY29uc3QgUEhYX0RJU0FCTEVfV0lUSF9SRVNUT1JFID0gXCJkYXRhLXBoeC1kaXNhYmxlLXdpdGgtcmVzdG9yZVwiXG5leHBvcnQgY29uc3QgUEhYX0hPT0sgPSBcImhvb2tcIlxuZXhwb3J0IGNvbnN0IFBIWF9ERUJPVU5DRSA9IFwiZGVib3VuY2VcIlxuZXhwb3J0IGNvbnN0IFBIWF9USFJPVFRMRSA9IFwidGhyb3R0bGVcIlxuZXhwb3J0IGNvbnN0IFBIWF9VUERBVEUgPSBcInVwZGF0ZVwiXG5leHBvcnQgY29uc3QgUEhYX0tFWSA9IFwia2V5XCJcbmV4cG9ydCBjb25zdCBQSFhfUFJJVkFURSA9IFwicGh4UHJpdmF0ZVwiXG5leHBvcnQgY29uc3QgUEhYX0FVVE9fUkVDT1ZFUiA9IFwiYXV0by1yZWNvdmVyXCJcbmV4cG9ydCBjb25zdCBQSFhfTFZfREVCVUcgPSBcInBoeDpsaXZlLXNvY2tldDpkZWJ1Z1wiXG5leHBvcnQgY29uc3QgUEhYX0xWX1BST0ZJTEUgPSBcInBoeDpsaXZlLXNvY2tldDpwcm9maWxpbmdcIlxuZXhwb3J0IGNvbnN0IFBIWF9MVl9MQVRFTkNZX1NJTSA9IFwicGh4OmxpdmUtc29ja2V0OmxhdGVuY3ktc2ltXCJcbmV4cG9ydCBjb25zdCBQSFhfUFJPR1JFU1MgPSBcInByb2dyZXNzXCJcbmV4cG9ydCBjb25zdCBMT0FERVJfVElNRU9VVCA9IDFcbmV4cG9ydCBjb25zdCBCRUZPUkVfVU5MT0FEX0xPQURFUl9USU1FT1VUID0gMjAwXG5leHBvcnQgY29uc3QgQklORElOR19QUkVGSVggPSBcInBoeC1cIlxuZXhwb3J0IGNvbnN0IFBVU0hfVElNRU9VVCA9IDMwMDAwXG5leHBvcnQgY29uc3QgTElOS19IRUFERVIgPSBcIngtcmVxdWVzdGVkLXdpdGhcIlxuZXhwb3J0IGNvbnN0IFJFU1BPTlNFX1VSTF9IRUFERVIgPSBcIngtcmVzcG9uc2UtdXJsXCJcbmV4cG9ydCBjb25zdCBERUJPVU5DRV9UUklHR0VSID0gXCJkZWJvdW5jZS10cmlnZ2VyXCJcbmV4cG9ydCBjb25zdCBUSFJPVFRMRUQgPSBcInRocm90dGxlZFwiXG5leHBvcnQgY29uc3QgREVCT1VOQ0VfUFJFVl9LRVkgPSBcImRlYm91bmNlLXByZXYta2V5XCJcbmV4cG9ydCBjb25zdCBERUZBVUxUUyA9IHtcbiAgZGVib3VuY2U6IDMwMCxcbiAgdGhyb3R0bGU6IDMwMFxufVxuXG4vLyBSZW5kZXJlZFxuZXhwb3J0IGNvbnN0IERZTkFNSUNTID0gXCJkXCJcbmV4cG9ydCBjb25zdCBTVEFUSUMgPSBcInNcIlxuZXhwb3J0IGNvbnN0IENPTVBPTkVOVFMgPSBcImNcIlxuZXhwb3J0IGNvbnN0IEVWRU5UUyA9IFwiZVwiXG5leHBvcnQgY29uc3QgUkVQTFkgPSBcInJcIlxuZXhwb3J0IGNvbnN0IFRJVExFID0gXCJ0XCJcbmV4cG9ydCBjb25zdCBURU1QTEFURVMgPSBcInBcIlxuIiwgImltcG9ydCB7XG4gIGxvZ0Vycm9yXG59IGZyb20gXCIuL3V0aWxzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50cnlVcGxvYWRlciB7XG4gIGNvbnN0cnVjdG9yKGVudHJ5LCBjaHVua1NpemUsIGxpdmVTb2NrZXQpe1xuICAgIHRoaXMubGl2ZVNvY2tldCA9IGxpdmVTb2NrZXRcbiAgICB0aGlzLmVudHJ5ID0gZW50cnlcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgICB0aGlzLmNodW5rU2l6ZSA9IGNodW5rU2l6ZVxuICAgIHRoaXMuY2h1bmtUaW1lciA9IG51bGxcbiAgICB0aGlzLnVwbG9hZENoYW5uZWwgPSBsaXZlU29ja2V0LmNoYW5uZWwoYGx2dToke2VudHJ5LnJlZn1gLCB7dG9rZW46IGVudHJ5Lm1ldGFkYXRhKCl9KVxuICB9XG5cbiAgZXJyb3IocmVhc29uKXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5jaHVua1RpbWVyKVxuICAgIHRoaXMudXBsb2FkQ2hhbm5lbC5sZWF2ZSgpXG4gICAgdGhpcy5lbnRyeS5lcnJvcihyZWFzb24pXG4gIH1cblxuICB1cGxvYWQoKXtcbiAgICB0aGlzLnVwbG9hZENoYW5uZWwub25FcnJvcihyZWFzb24gPT4gdGhpcy5lcnJvcihyZWFzb24pKVxuICAgIHRoaXMudXBsb2FkQ2hhbm5lbC5qb2luKClcbiAgICAgIC5yZWNlaXZlKFwib2tcIiwgX2RhdGEgPT4gdGhpcy5yZWFkTmV4dENodW5rKCkpXG4gICAgICAucmVjZWl2ZShcImVycm9yXCIsIHJlYXNvbiA9PiB0aGlzLmVycm9yKHJlYXNvbikpXG4gIH1cblxuICBpc0RvbmUoKXsgcmV0dXJuIHRoaXMub2Zmc2V0ID49IHRoaXMuZW50cnkuZmlsZS5zaXplIH1cblxuICByZWFkTmV4dENodW5rKCl7XG4gICAgbGV0IHJlYWRlciA9IG5ldyB3aW5kb3cuRmlsZVJlYWRlcigpXG4gICAgbGV0IGJsb2IgPSB0aGlzLmVudHJ5LmZpbGUuc2xpY2UodGhpcy5vZmZzZXQsIHRoaXMuY2h1bmtTaXplICsgdGhpcy5vZmZzZXQpXG4gICAgcmVhZGVyLm9ubG9hZCA9IChlKSA9PiB7XG4gICAgICBpZihlLnRhcmdldC5lcnJvciA9PT0gbnVsbCl7XG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IGUudGFyZ2V0LnJlc3VsdC5ieXRlTGVuZ3RoXG4gICAgICAgIHRoaXMucHVzaENodW5rKGUudGFyZ2V0LnJlc3VsdClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBsb2dFcnJvcihcIlJlYWQgZXJyb3I6IFwiICsgZS50YXJnZXQuZXJyb3IpXG4gICAgICB9XG4gICAgfVxuICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKVxuICB9XG5cbiAgcHVzaENodW5rKGNodW5rKXtcbiAgICBpZighdGhpcy51cGxvYWRDaGFubmVsLmlzSm9pbmVkKCkpeyByZXR1cm4gfVxuICAgIHRoaXMudXBsb2FkQ2hhbm5lbC5wdXNoKFwiY2h1bmtcIiwgY2h1bmspXG4gICAgICAucmVjZWl2ZShcIm9rXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5lbnRyeS5wcm9ncmVzcygodGhpcy5vZmZzZXQgLyB0aGlzLmVudHJ5LmZpbGUuc2l6ZSkgKiAxMDApXG4gICAgICAgIGlmKCF0aGlzLmlzRG9uZSgpKXtcbiAgICAgICAgICB0aGlzLmNodW5rVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMucmVhZE5leHRDaHVuaygpLCB0aGlzLmxpdmVTb2NrZXQuZ2V0TGF0ZW5jeVNpbSgpIHx8IDApXG4gICAgICAgIH1cbiAgICAgIH0pXG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBQSFhfVklFV19TRUxFQ1RPUlxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQgRW50cnlVcGxvYWRlciBmcm9tIFwiLi9lbnRyeV91cGxvYWRlclwiXG5cbmV4cG9ydCBsZXQgbG9nRXJyb3IgPSAobXNnLCBvYmopID0+IGNvbnNvbGUuZXJyb3IgJiYgY29uc29sZS5lcnJvcihtc2csIG9iailcblxuZXhwb3J0IGxldCBpc0NpZCA9IChjaWQpID0+IHtcbiAgbGV0IHR5cGUgPSB0eXBlb2YoY2lkKVxuICByZXR1cm4gdHlwZSA9PT0gXCJudW1iZXJcIiB8fCAodHlwZSA9PT0gXCJzdHJpbmdcIiAmJiAvXigwfFsxLTldXFxkKikkLy50ZXN0KGNpZCkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3REdXBsaWNhdGVJZHMoKXtcbiAgbGV0IGlkcyA9IG5ldyBTZXQoKVxuICBsZXQgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiKltpZF1cIilcbiAgZm9yKGxldCBpID0gMCwgbGVuID0gZWxlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuICAgIGlmKGlkcy5oYXMoZWxlbXNbaV0uaWQpKXtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYE11bHRpcGxlIElEcyBkZXRlY3RlZDogJHtlbGVtc1tpXS5pZH0uIEVuc3VyZSB1bmlxdWUgZWxlbWVudCBpZHMuYClcbiAgICB9IGVsc2Uge1xuICAgICAgaWRzLmFkZChlbGVtc1tpXS5pZClcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGxldCBkZWJ1ZyA9ICh2aWV3LCBraW5kLCBtc2csIG9iaikgPT4ge1xuICBpZih2aWV3LmxpdmVTb2NrZXQuaXNEZWJ1Z0VuYWJsZWQoKSl7XG4gICAgY29uc29sZS5sb2coYCR7dmlldy5pZH0gJHtraW5kfTogJHttc2d9IC0gYCwgb2JqKVxuICB9XG59XG5cbi8vIHdyYXBzIHZhbHVlIGluIGNsb3N1cmUgb3IgcmV0dXJucyBjbG9zdXJlXG5leHBvcnQgbGV0IGNsb3N1cmUgPSAodmFsKSA9PiB0eXBlb2YgdmFsID09PSBcImZ1bmN0aW9uXCIgPyB2YWwgOiBmdW5jdGlvbiAoKXsgcmV0dXJuIHZhbCB9XG5cbmV4cG9ydCBsZXQgY2xvbmUgPSAob2JqKSA9PiB7IHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpIH1cblxuZXhwb3J0IGxldCBjbG9zZXN0UGh4QmluZGluZyA9IChlbCwgYmluZGluZywgYm9yZGVyRWwpID0+IHtcbiAgZG8ge1xuICAgIGlmKGVsLm1hdGNoZXMoYFske2JpbmRpbmd9XWApKXsgcmV0dXJuIGVsIH1cbiAgICBlbCA9IGVsLnBhcmVudEVsZW1lbnQgfHwgZWwucGFyZW50Tm9kZVxuICB9IHdoaWxlKGVsICE9PSBudWxsICYmIGVsLm5vZGVUeXBlID09PSAxICYmICEoKGJvcmRlckVsICYmIGJvcmRlckVsLmlzU2FtZU5vZGUoZWwpKSB8fCBlbC5tYXRjaGVzKFBIWF9WSUVXX1NFTEVDVE9SKSkpXG4gIHJldHVybiBudWxsXG59XG5cbmV4cG9ydCBsZXQgaXNPYmplY3QgPSAob2JqKSA9PiB7XG4gIHJldHVybiBvYmogIT09IG51bGwgJiYgdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJiAhKG9iaiBpbnN0YW5jZW9mIEFycmF5KVxufVxuXG5leHBvcnQgbGV0IGlzRXF1YWxPYmogPSAob2JqMSwgb2JqMikgPT4gSlNPTi5zdHJpbmdpZnkob2JqMSkgPT09IEpTT04uc3RyaW5naWZ5KG9iajIpXG5cbmV4cG9ydCBsZXQgaXNFbXB0eSA9IChvYmopID0+IHtcbiAgZm9yKGxldCB4IGluIG9iail7IHJldHVybiBmYWxzZSB9XG4gIHJldHVybiB0cnVlXG59XG5cbmV4cG9ydCBsZXQgbWF5YmUgPSAoZWwsIGNhbGxiYWNrKSA9PiBlbCAmJiBjYWxsYmFjayhlbClcblxuZXhwb3J0IGxldCBjaGFubmVsVXBsb2FkZXIgPSBmdW5jdGlvbiAoZW50cmllcywgb25FcnJvciwgcmVzcCwgbGl2ZVNvY2tldCl7XG4gIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgbGV0IGVudHJ5VXBsb2FkZXIgPSBuZXcgRW50cnlVcGxvYWRlcihlbnRyeSwgcmVzcC5jb25maWcuY2h1bmtfc2l6ZSwgbGl2ZVNvY2tldClcbiAgICBlbnRyeVVwbG9hZGVyLnVwbG9hZCgpXG4gIH0pXG59XG4iLCAibGV0IEJyb3dzZXIgPSB7XG4gIGNhblB1c2hTdGF0ZSgpeyByZXR1cm4gKHR5cGVvZiAoaGlzdG9yeS5wdXNoU3RhdGUpICE9PSBcInVuZGVmaW5lZFwiKSB9LFxuXG4gIGRyb3BMb2NhbChsb2NhbFN0b3JhZ2UsIG5hbWVzcGFjZSwgc3Via2V5KXtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5sb2NhbEtleShuYW1lc3BhY2UsIHN1YmtleSkpXG4gIH0sXG5cbiAgdXBkYXRlTG9jYWwobG9jYWxTdG9yYWdlLCBuYW1lc3BhY2UsIHN1YmtleSwgaW5pdGlhbCwgZnVuYyl7XG4gICAgbGV0IGN1cnJlbnQgPSB0aGlzLmdldExvY2FsKGxvY2FsU3RvcmFnZSwgbmFtZXNwYWNlLCBzdWJrZXkpXG4gICAgbGV0IGtleSA9IHRoaXMubG9jYWxLZXkobmFtZXNwYWNlLCBzdWJrZXkpXG4gICAgbGV0IG5ld1ZhbCA9IGN1cnJlbnQgPT09IG51bGwgPyBpbml0aWFsIDogZnVuYyhjdXJyZW50KVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkobmV3VmFsKSlcbiAgICByZXR1cm4gbmV3VmFsXG4gIH0sXG5cbiAgZ2V0TG9jYWwobG9jYWxTdG9yYWdlLCBuYW1lc3BhY2UsIHN1YmtleSl7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5sb2NhbEtleShuYW1lc3BhY2UsIHN1YmtleSkpKVxuICB9LFxuXG4gIHVwZGF0ZUN1cnJlbnRTdGF0ZShjYWxsYmFjayl7XG4gICAgaWYoIXRoaXMuY2FuUHVzaFN0YXRlKCkpeyByZXR1cm4gfVxuICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKGNhbGxiYWNrKGhpc3Rvcnkuc3RhdGUgfHwge30pLCBcIlwiLCB3aW5kb3cubG9jYXRpb24uaHJlZilcbiAgfSxcblxuICBwdXNoU3RhdGUoa2luZCwgbWV0YSwgdG8pe1xuICAgIGlmKHRoaXMuY2FuUHVzaFN0YXRlKCkpe1xuICAgICAgaWYodG8gIT09IHdpbmRvdy5sb2NhdGlvbi5ocmVmKXtcbiAgICAgICAgaWYobWV0YS50eXBlID09IFwicmVkaXJlY3RcIiAmJiBtZXRhLnNjcm9sbCl7XG4gICAgICAgICAgLy8gSWYgd2UncmUgcmVkaXJlY3Rpbmcgc3RvcmUgdGhlIGN1cnJlbnQgc2Nyb2xsWSBmb3IgdGhlIGN1cnJlbnQgaGlzdG9yeSBzdGF0ZS5cbiAgICAgICAgICBsZXQgY3VycmVudFN0YXRlID0gaGlzdG9yeS5zdGF0ZSB8fCB7fVxuICAgICAgICAgIGN1cnJlbnRTdGF0ZS5zY3JvbGwgPSBtZXRhLnNjcm9sbFxuICAgICAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKGN1cnJlbnRTdGF0ZSwgXCJcIiwgd2luZG93LmxvY2F0aW9uLmhyZWYpXG4gICAgICAgIH1cblxuICAgICAgICBkZWxldGUgbWV0YS5zY3JvbGwgLy8gT25seSBzdG9yZSB0aGUgc2Nyb2xsIGluIHRoZSByZWRpcmVjdCBjYXNlLlxuICAgICAgICBoaXN0b3J5W2tpbmQgKyBcIlN0YXRlXCJdKG1ldGEsIFwiXCIsIHRvIHx8IG51bGwpIC8vIElFIHdpbGwgY29lcmNlIHVuZGVmaW5lZCB0byBzdHJpbmdcbiAgICAgICAgbGV0IGhhc2hFbCA9IHRoaXMuZ2V0SGFzaFRhcmdldEVsKHdpbmRvdy5sb2NhdGlvbi5oYXNoKVxuXG4gICAgICAgIGlmKGhhc2hFbCl7XG4gICAgICAgICAgaGFzaEVsLnNjcm9sbEludG9WaWV3KClcbiAgICAgICAgfSBlbHNlIGlmKG1ldGEudHlwZSA9PT0gXCJyZWRpcmVjdFwiKXtcbiAgICAgICAgICB3aW5kb3cuc2Nyb2xsKDAsIDApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZWRpcmVjdCh0bylcbiAgICB9XG4gIH0sXG5cbiAgc2V0Q29va2llKG5hbWUsIHZhbHVlKXtcbiAgICBkb2N1bWVudC5jb29raWUgPSBgJHtuYW1lfT0ke3ZhbHVlfWBcbiAgfSxcblxuICBnZXRDb29raWUobmFtZSl7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNvb2tpZS5yZXBsYWNlKG5ldyBSZWdFeHAoYCg/Oig/Ol58Lio7XFxzKikke25hbWV9XFxzKlxcPVxccyooW147XSopLiokKXxeLiokYCksIFwiJDFcIilcbiAgfSxcblxuICByZWRpcmVjdCh0b1VSTCwgZmxhc2gpe1xuICAgIGlmKGZsYXNoKXsgQnJvd3Nlci5zZXRDb29raWUoXCJfX3Bob2VuaXhfZmxhc2hfX1wiLCBmbGFzaCArIFwiOyBtYXgtYWdlPTYwMDAwOyBwYXRoPS9cIikgfVxuICAgIHdpbmRvdy5sb2NhdGlvbiA9IHRvVVJMXG4gIH0sXG5cbiAgbG9jYWxLZXkobmFtZXNwYWNlLCBzdWJrZXkpeyByZXR1cm4gYCR7bmFtZXNwYWNlfS0ke3N1YmtleX1gIH0sXG5cbiAgZ2V0SGFzaFRhcmdldEVsKG1heWJlSGFzaCl7XG4gICAgbGV0IGhhc2ggPSBtYXliZUhhc2gudG9TdHJpbmcoKS5zdWJzdHJpbmcoMSlcbiAgICBpZihoYXNoID09PSBcIlwiKXsgcmV0dXJuIH1cbiAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaGFzaCkgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgYVtuYW1lPVwiJHtoYXNofVwiXWApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQnJvd3NlclxuIiwgImltcG9ydCB7XG4gIENIRUNLQUJMRV9JTlBVVFMsXG4gIERFQk9VTkNFX1BSRVZfS0VZLFxuICBERUJPVU5DRV9UUklHR0VSLFxuICBGT0NVU0FCTEVfSU5QVVRTLFxuICBQSFhfQ09NUE9ORU5ULFxuICBQSFhfRVZFTlRfQ0xBU1NFUyxcbiAgUEhYX0hBU19GT0NVU0VELFxuICBQSFhfSEFTX1NVQk1JVFRFRCxcbiAgUEhYX01BSU4sXG4gIFBIWF9OT19GRUVEQkFDS19DTEFTUyxcbiAgUEhYX1BBUkVOVF9JRCxcbiAgUEhYX1BSSVZBVEUsXG4gIFBIWF9SRUYsXG4gIFBIWF9SRUZfU1JDLFxuICBQSFhfUk9PVF9JRCxcbiAgUEhYX1NFU1NJT04sXG4gIFBIWF9TVEFUSUMsXG4gIFBIWF9VUExPQURfUkVGLFxuICBQSFhfVklFV19TRUxFQ1RPUixcbiAgUEhYX1NUSUNLWSxcbiAgVEhST1RUTEVEXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCB7XG4gIGxvZ0Vycm9yXG59IGZyb20gXCIuL3V0aWxzXCJcblxubGV0IERPTSA9IHtcbiAgYnlJZChpZCl7IHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkgfHwgbG9nRXJyb3IoYG5vIGlkIGZvdW5kIGZvciAke2lkfWApIH0sXG5cbiAgcmVtb3ZlQ2xhc3MoZWwsIGNsYXNzTmFtZSl7XG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpXG4gICAgaWYoZWwuY2xhc3NMaXN0Lmxlbmd0aCA9PT0gMCl7IGVsLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpIH1cbiAgfSxcblxuICBhbGwobm9kZSwgcXVlcnksIGNhbGxiYWNrKXtcbiAgICBpZighbm9kZSl7IHJldHVybiBbXSB9XG4gICAgbGV0IGFycmF5ID0gQXJyYXkuZnJvbShub2RlLnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnkpKVxuICAgIHJldHVybiBjYWxsYmFjayA/IGFycmF5LmZvckVhY2goY2FsbGJhY2spIDogYXJyYXlcbiAgfSxcblxuICBjaGlsZE5vZGVMZW5ndGgoaHRtbCl7XG4gICAgbGV0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpXG4gICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gaHRtbFxuICAgIHJldHVybiB0ZW1wbGF0ZS5jb250ZW50LmNoaWxkRWxlbWVudENvdW50XG4gIH0sXG5cbiAgaXNVcGxvYWRJbnB1dChlbCl7IHJldHVybiBlbC50eXBlID09PSBcImZpbGVcIiAmJiBlbC5nZXRBdHRyaWJ1dGUoUEhYX1VQTE9BRF9SRUYpICE9PSBudWxsIH0sXG5cbiAgZmluZFVwbG9hZElucHV0cyhub2RlKXsgcmV0dXJuIHRoaXMuYWxsKG5vZGUsIGBpbnB1dFt0eXBlPVwiZmlsZVwiXVske1BIWF9VUExPQURfUkVGfV1gKSB9LFxuXG4gIGZpbmRDb21wb25lbnROb2RlTGlzdChub2RlLCBjaWQpe1xuICAgIHJldHVybiB0aGlzLmZpbHRlcldpdGhpblNhbWVMaXZlVmlldyh0aGlzLmFsbChub2RlLCBgWyR7UEhYX0NPTVBPTkVOVH09XCIke2NpZH1cIl1gKSwgbm9kZSlcbiAgfSxcblxuICBpc1BoeERlc3Ryb3llZChub2RlKXtcbiAgICByZXR1cm4gbm9kZS5pZCAmJiBET00ucHJpdmF0ZShub2RlLCBcImRlc3Ryb3llZFwiKSA/IHRydWUgOiBmYWxzZVxuICB9LFxuXG4gIG1hcmtQaHhDaGlsZERlc3Ryb3llZChlbCl7XG4gICAgaWYodGhpcy5pc1BoeENoaWxkKGVsKSl7IGVsLnNldEF0dHJpYnV0ZShQSFhfU0VTU0lPTiwgXCJcIikgfVxuICAgIHRoaXMucHV0UHJpdmF0ZShlbCwgXCJkZXN0cm95ZWRcIiwgdHJ1ZSlcbiAgfSxcblxuICBmaW5kUGh4Q2hpbGRyZW5JbkZyYWdtZW50KGh0bWwsIHBhcmVudElkKXtcbiAgICBsZXQgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIilcbiAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSBodG1sXG4gICAgcmV0dXJuIHRoaXMuZmluZFBoeENoaWxkcmVuKHRlbXBsYXRlLmNvbnRlbnQsIHBhcmVudElkKVxuICB9LFxuXG4gIGlzSWdub3JlZChlbCwgcGh4VXBkYXRlKXtcbiAgICByZXR1cm4gKGVsLmdldEF0dHJpYnV0ZShwaHhVcGRhdGUpIHx8IGVsLmdldEF0dHJpYnV0ZShcImRhdGEtcGh4LXVwZGF0ZVwiKSkgPT09IFwiaWdub3JlXCJcbiAgfSxcblxuICBpc1BoeFVwZGF0ZShlbCwgcGh4VXBkYXRlLCB1cGRhdGVUeXBlcyl7XG4gICAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZSAmJiB1cGRhdGVUeXBlcy5pbmRleE9mKGVsLmdldEF0dHJpYnV0ZShwaHhVcGRhdGUpKSA+PSAwXG4gIH0sXG5cbiAgZmluZFBoeFN0aWNreShlbCl7IHJldHVybiB0aGlzLmFsbChlbCwgYFske1BIWF9TVElDS1l9XWApIH0sXG5cbiAgZmluZFBoeENoaWxkcmVuKGVsLCBwYXJlbnRJZCl7XG4gICAgcmV0dXJuIHRoaXMuYWxsKGVsLCBgJHtQSFhfVklFV19TRUxFQ1RPUn1bJHtQSFhfUEFSRU5UX0lEfT1cIiR7cGFyZW50SWR9XCJdYClcbiAgfSxcblxuICBmaW5kUGFyZW50Q0lEcyhub2RlLCBjaWRzKXtcbiAgICBsZXQgaW5pdGlhbCA9IG5ldyBTZXQoY2lkcylcbiAgICByZXR1cm4gY2lkcy5yZWR1Y2UoKGFjYywgY2lkKSA9PiB7XG4gICAgICBsZXQgc2VsZWN0b3IgPSBgWyR7UEhYX0NPTVBPTkVOVH09XCIke2NpZH1cIl0gWyR7UEhYX0NPTVBPTkVOVH1dYFxuXG4gICAgICB0aGlzLmZpbHRlcldpdGhpblNhbWVMaXZlVmlldyh0aGlzLmFsbChub2RlLCBzZWxlY3RvciksIG5vZGUpXG4gICAgICAgIC5tYXAoZWwgPT4gcGFyc2VJbnQoZWwuZ2V0QXR0cmlidXRlKFBIWF9DT01QT05FTlQpKSlcbiAgICAgICAgLmZvckVhY2goY2hpbGRDSUQgPT4gYWNjLmRlbGV0ZShjaGlsZENJRCkpXG5cbiAgICAgIHJldHVybiBhY2NcbiAgICB9LCBpbml0aWFsKVxuICB9LFxuXG4gIGZpbHRlcldpdGhpblNhbWVMaXZlVmlldyhub2RlcywgcGFyZW50KXtcbiAgICBpZihwYXJlbnQucXVlcnlTZWxlY3RvcihQSFhfVklFV19TRUxFQ1RPUikpe1xuICAgICAgcmV0dXJuIG5vZGVzLmZpbHRlcihlbCA9PiB0aGlzLndpdGhpblNhbWVMaXZlVmlldyhlbCwgcGFyZW50KSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5vZGVzXG4gICAgfVxuICB9LFxuXG4gIHdpdGhpblNhbWVMaXZlVmlldyhub2RlLCBwYXJlbnQpe1xuICAgIHdoaWxlKG5vZGUgPSBub2RlLnBhcmVudE5vZGUpe1xuICAgICAgaWYobm9kZS5pc1NhbWVOb2RlKHBhcmVudCkpeyByZXR1cm4gdHJ1ZSB9XG4gICAgICBpZihub2RlLmdldEF0dHJpYnV0ZShQSFhfU0VTU0lPTikgIT09IG51bGwpeyByZXR1cm4gZmFsc2UgfVxuICAgIH1cbiAgfSxcblxuICBwcml2YXRlKGVsLCBrZXkpeyByZXR1cm4gZWxbUEhYX1BSSVZBVEVdICYmIGVsW1BIWF9QUklWQVRFXVtrZXldIH0sXG5cbiAgZGVsZXRlUHJpdmF0ZShlbCwga2V5KXsgZWxbUEhYX1BSSVZBVEVdICYmIGRlbGV0ZSAoZWxbUEhYX1BSSVZBVEVdW2tleV0pIH0sXG5cbiAgcHV0UHJpdmF0ZShlbCwga2V5LCB2YWx1ZSl7XG4gICAgaWYoIWVsW1BIWF9QUklWQVRFXSl7IGVsW1BIWF9QUklWQVRFXSA9IHt9IH1cbiAgICBlbFtQSFhfUFJJVkFURV1ba2V5XSA9IHZhbHVlXG4gIH0sXG5cbiAgdXBkYXRlUHJpdmF0ZShlbCwga2V5LCBkZWZhdWx0VmFsLCB1cGRhdGVGdW5jKXtcbiAgICBsZXQgZXhpc3RpbmcgPSB0aGlzLnByaXZhdGUoZWwsIGtleSlcbiAgICBpZihleGlzdGluZyA9PT0gdW5kZWZpbmVkKXtcbiAgICAgIHRoaXMucHV0UHJpdmF0ZShlbCwga2V5LCB1cGRhdGVGdW5jKGRlZmF1bHRWYWwpKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnB1dFByaXZhdGUoZWwsIGtleSwgdXBkYXRlRnVuYyhleGlzdGluZykpXG4gICAgfVxuICB9LFxuXG4gIGNvcHlQcml2YXRlcyh0YXJnZXQsIHNvdXJjZSl7XG4gICAgaWYoc291cmNlW1BIWF9QUklWQVRFXSl7XG4gICAgICB0YXJnZXRbUEhYX1BSSVZBVEVdID0gc291cmNlW1BIWF9QUklWQVRFXVxuICAgIH1cbiAgfSxcblxuICBwdXRUaXRsZShzdHIpe1xuICAgIGxldCB0aXRsZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInRpdGxlXCIpXG4gICAgbGV0IHtwcmVmaXgsIHN1ZmZpeH0gPSB0aXRsZUVsLmRhdGFzZXRcbiAgICBkb2N1bWVudC50aXRsZSA9IGAke3ByZWZpeCB8fCBcIlwifSR7c3RyfSR7c3VmZml4IHx8IFwiXCJ9YFxuICB9LFxuXG4gIGRlYm91bmNlKGVsLCBldmVudCwgcGh4RGVib3VuY2UsIGRlZmF1bHREZWJvdW5jZSwgcGh4VGhyb3R0bGUsIGRlZmF1bHRUaHJvdHRsZSwgYXN5bmNGaWx0ZXIsIGNhbGxiYWNrKXtcbiAgICBsZXQgZGVib3VuY2UgPSBlbC5nZXRBdHRyaWJ1dGUocGh4RGVib3VuY2UpXG4gICAgbGV0IHRocm90dGxlID0gZWwuZ2V0QXR0cmlidXRlKHBoeFRocm90dGxlKVxuICAgIGlmKGRlYm91bmNlID09PSBcIlwiKXsgZGVib3VuY2UgPSBkZWZhdWx0RGVib3VuY2UgfVxuICAgIGlmKHRocm90dGxlID09PSBcIlwiKXsgdGhyb3R0bGUgPSBkZWZhdWx0VGhyb3R0bGUgfVxuICAgIGxldCB2YWx1ZSA9IGRlYm91bmNlIHx8IHRocm90dGxlXG4gICAgc3dpdGNoKHZhbHVlKXtcbiAgICAgIGNhc2UgbnVsbDogcmV0dXJuIGNhbGxiYWNrKClcblxuICAgICAgY2FzZSBcImJsdXJcIjpcbiAgICAgICAgaWYodGhpcy5vbmNlKGVsLCBcImRlYm91bmNlLWJsdXJcIikpe1xuICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsICgpID0+IGNhbGxiYWNrKCkpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxldCB0aW1lb3V0ID0gcGFyc2VJbnQodmFsdWUpXG4gICAgICAgIGxldCB0cmlnZ2VyID0gKCkgPT4gdGhyb3R0bGUgPyB0aGlzLmRlbGV0ZVByaXZhdGUoZWwsIFRIUk9UVExFRCkgOiBjYWxsYmFjaygpXG4gICAgICAgIGxldCBjdXJyZW50Q3ljbGUgPSB0aGlzLmluY0N5Y2xlKGVsLCBERUJPVU5DRV9UUklHR0VSLCB0cmlnZ2VyKVxuICAgICAgICBpZihpc05hTih0aW1lb3V0KSl7IHJldHVybiBsb2dFcnJvcihgaW52YWxpZCB0aHJvdHRsZS9kZWJvdW5jZSB2YWx1ZTogJHt2YWx1ZX1gKSB9XG4gICAgICAgIGlmKHRocm90dGxlKXtcbiAgICAgICAgICBsZXQgbmV3S2V5RG93biA9IGZhbHNlXG4gICAgICAgICAgaWYoZXZlbnQudHlwZSA9PT0gXCJrZXlkb3duXCIpe1xuICAgICAgICAgICAgbGV0IHByZXZLZXkgPSB0aGlzLnByaXZhdGUoZWwsIERFQk9VTkNFX1BSRVZfS0VZKVxuICAgICAgICAgICAgdGhpcy5wdXRQcml2YXRlKGVsLCBERUJPVU5DRV9QUkVWX0tFWSwgZXZlbnQua2V5KVxuICAgICAgICAgICAgbmV3S2V5RG93biA9IHByZXZLZXkgIT09IGV2ZW50LmtleVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKCFuZXdLZXlEb3duICYmIHRoaXMucHJpdmF0ZShlbCwgVEhST1RUTEVEKSl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICAgICAgdGhpcy5wdXRQcml2YXRlKGVsLCBUSFJPVFRMRUQsIHRydWUpXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgaWYoYXN5bmNGaWx0ZXIoKSl7IHRoaXMudHJpZ2dlckN5Y2xlKGVsLCBERUJPVU5DRV9UUklHR0VSKSB9XG4gICAgICAgICAgICB9LCB0aW1lb3V0KVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmKGFzeW5jRmlsdGVyKCkpeyB0aGlzLnRyaWdnZXJDeWNsZShlbCwgREVCT1VOQ0VfVFJJR0dFUiwgY3VycmVudEN5Y2xlKSB9XG4gICAgICAgICAgfSwgdGltZW91dClcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmb3JtID0gZWwuZm9ybVxuICAgICAgICBpZihmb3JtICYmIHRoaXMub25jZShmb3JtLCBcImJpbmQtZGVib3VuY2VcIikpe1xuICAgICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBBcnJheS5mcm9tKChuZXcgRm9ybURhdGEoZm9ybSkpLmVudHJpZXMoKSwgKFtuYW1lXSkgPT4ge1xuICAgICAgICAgICAgICBsZXQgaW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoYFtuYW1lPVwiJHtuYW1lfVwiXWApXG4gICAgICAgICAgICAgIHRoaXMuaW5jQ3ljbGUoaW5wdXQsIERFQk9VTkNFX1RSSUdHRVIpXG4gICAgICAgICAgICAgIHRoaXMuZGVsZXRlUHJpdmF0ZShpbnB1dCwgVEhST1RUTEVEKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMub25jZShlbCwgXCJiaW5kLWRlYm91bmNlXCIpKXtcbiAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCAoKSA9PiB0aGlzLnRyaWdnZXJDeWNsZShlbCwgREVCT1VOQ0VfVFJJR0dFUikpXG4gICAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgdHJpZ2dlckN5Y2xlKGVsLCBrZXksIGN1cnJlbnRDeWNsZSl7XG4gICAgbGV0IFtjeWNsZSwgdHJpZ2dlcl0gPSB0aGlzLnByaXZhdGUoZWwsIGtleSlcbiAgICBpZighY3VycmVudEN5Y2xlKXsgY3VycmVudEN5Y2xlID0gY3ljbGUgfVxuICAgIGlmKGN1cnJlbnRDeWNsZSA9PT0gY3ljbGUpe1xuICAgICAgdGhpcy5pbmNDeWNsZShlbCwga2V5KVxuICAgICAgdHJpZ2dlcigpXG4gICAgfVxuICB9LFxuXG4gIG9uY2UoZWwsIGtleSl7XG4gICAgaWYodGhpcy5wcml2YXRlKGVsLCBrZXkpID09PSB0cnVlKXsgcmV0dXJuIGZhbHNlIH1cbiAgICB0aGlzLnB1dFByaXZhdGUoZWwsIGtleSwgdHJ1ZSlcbiAgICByZXR1cm4gdHJ1ZVxuICB9LFxuXG4gIGluY0N5Y2xlKGVsLCBrZXksIHRyaWdnZXIgPSBmdW5jdGlvbiAoKXsgfSl7XG4gICAgbGV0IFtjdXJyZW50Q3ljbGVdID0gdGhpcy5wcml2YXRlKGVsLCBrZXkpIHx8IFswLCB0cmlnZ2VyXVxuICAgIGN1cnJlbnRDeWNsZSsrXG4gICAgdGhpcy5wdXRQcml2YXRlKGVsLCBrZXksIFtjdXJyZW50Q3ljbGUsIHRyaWdnZXJdKVxuICAgIHJldHVybiBjdXJyZW50Q3ljbGVcbiAgfSxcblxuICBkaXNjYXJkRXJyb3IoY29udGFpbmVyLCBlbCwgcGh4RmVlZGJhY2tGb3Ipe1xuICAgIGxldCBmaWVsZCA9IGVsLmdldEF0dHJpYnV0ZSAmJiBlbC5nZXRBdHRyaWJ1dGUocGh4RmVlZGJhY2tGb3IpXG4gICAgLy8gVE9ETzogUmVtb3ZlIGlkIGxvb2t1cCBhZnRlciB3ZSB1cGRhdGUgUGhvZW5peCB0byB1c2UgaW5wdXRfbmFtZSBpbnN0ZWFkIG9mIGlucHV0X2lkXG4gICAgbGV0IGlucHV0ID0gZmllbGQgJiYgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoYFtpZD1cIiR7ZmllbGR9XCJdLCBbbmFtZT1cIiR7ZmllbGR9XCJdYClcbiAgICBpZighaW5wdXQpeyByZXR1cm4gfVxuXG4gICAgaWYoISh0aGlzLnByaXZhdGUoaW5wdXQsIFBIWF9IQVNfRk9DVVNFRCkgfHwgdGhpcy5wcml2YXRlKGlucHV0LmZvcm0sIFBIWF9IQVNfU1VCTUlUVEVEKSkpe1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChQSFhfTk9fRkVFREJBQ0tfQ0xBU1MpXG4gICAgfVxuICB9LFxuXG4gIHNob3dFcnJvcihpbnB1dEVsLCBwaHhGZWVkYmFja0Zvcil7XG4gICAgaWYoaW5wdXRFbC5pZCB8fCBpbnB1dEVsLm5hbWUpe1xuICAgICAgdGhpcy5hbGwoaW5wdXRFbC5mb3JtLCBgWyR7cGh4RmVlZGJhY2tGb3J9PVwiJHtpbnB1dEVsLmlkfVwiXSwgWyR7cGh4RmVlZGJhY2tGb3J9PVwiJHtpbnB1dEVsLm5hbWV9XCJdYCwgKGVsKSA9PiB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoZWwsIFBIWF9OT19GRUVEQkFDS19DTEFTUylcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuXG4gIGlzUGh4Q2hpbGQobm9kZSl7XG4gICAgcmV0dXJuIG5vZGUuZ2V0QXR0cmlidXRlICYmIG5vZGUuZ2V0QXR0cmlidXRlKFBIWF9QQVJFTlRfSUQpXG4gIH0sXG5cbiAgaXNQaHhTdGlja3kobm9kZSl7XG4gICAgcmV0dXJuIG5vZGUuZ2V0QXR0cmlidXRlICYmIG5vZGUuZ2V0QXR0cmlidXRlKFBIWF9TVElDS1kpICE9PSBudWxsXG4gIH0sXG5cbiAgZmlyc3RQaHhDaGlsZChlbCl7XG4gICAgcmV0dXJuIHRoaXMuaXNQaHhDaGlsZChlbCkgPyBlbCA6IHRoaXMuYWxsKGVsLCBgWyR7UEhYX1BBUkVOVF9JRH1dYClbMF1cbiAgfSxcblxuICBkaXNwYXRjaEV2ZW50KHRhcmdldCwgbmFtZSwgb3B0cyA9IHt9KXtcbiAgICBsZXQgYnViYmxlcyA9IG9wdHMuYnViYmxlcyA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6ICEhb3B0cy5idWJibGVzXG4gICAgbGV0IGV2ZW50T3B0cyA9IHtidWJibGVzOiBidWJibGVzLCBjYW5jZWxhYmxlOiB0cnVlLCBkZXRhaWw6IG9wdHMuZGV0YWlsIHx8IHt9fVxuICAgIGxldCBldmVudCA9IG5hbWUgPT09IFwiY2xpY2tcIiA/IG5ldyBNb3VzZUV2ZW50KFwiY2xpY2tcIiwgZXZlbnRPcHRzKSA6IG5ldyBDdXN0b21FdmVudChuYW1lLCBldmVudE9wdHMpXG4gICAgdGFyZ2V0LmRpc3BhdGNoRXZlbnQoZXZlbnQpXG4gIH0sXG5cbiAgY2xvbmVOb2RlKG5vZGUsIGh0bWwpe1xuICAgIGlmKHR5cGVvZiAoaHRtbCkgPT09IFwidW5kZWZpbmVkXCIpe1xuICAgICAgcmV0dXJuIG5vZGUuY2xvbmVOb2RlKHRydWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBjbG9uZWQgPSBub2RlLmNsb25lTm9kZShmYWxzZSlcbiAgICAgIGNsb25lZC5pbm5lckhUTUwgPSBodG1sXG4gICAgICByZXR1cm4gY2xvbmVkXG4gICAgfVxuICB9LFxuXG4gIG1lcmdlQXR0cnModGFyZ2V0LCBzb3VyY2UsIG9wdHMgPSB7fSl7XG4gICAgbGV0IGV4Y2x1ZGUgPSBvcHRzLmV4Y2x1ZGUgfHwgW11cbiAgICBsZXQgaXNJZ25vcmVkID0gb3B0cy5pc0lnbm9yZWRcbiAgICBsZXQgc291cmNlQXR0cnMgPSBzb3VyY2UuYXR0cmlidXRlc1xuICAgIGZvcihsZXQgaSA9IHNvdXJjZUF0dHJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKXtcbiAgICAgIGxldCBuYW1lID0gc291cmNlQXR0cnNbaV0ubmFtZVxuICAgICAgaWYoZXhjbHVkZS5pbmRleE9mKG5hbWUpIDwgMCl7IHRhcmdldC5zZXRBdHRyaWJ1dGUobmFtZSwgc291cmNlLmdldEF0dHJpYnV0ZShuYW1lKSkgfVxuICAgIH1cblxuICAgIGxldCB0YXJnZXRBdHRycyA9IHRhcmdldC5hdHRyaWJ1dGVzXG4gICAgZm9yKGxldCBpID0gdGFyZ2V0QXR0cnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pe1xuICAgICAgbGV0IG5hbWUgPSB0YXJnZXRBdHRyc1tpXS5uYW1lXG4gICAgICBpZihpc0lnbm9yZWQpe1xuICAgICAgICBpZihuYW1lLnN0YXJ0c1dpdGgoXCJkYXRhLVwiKSAmJiAhc291cmNlLmhhc0F0dHJpYnV0ZShuYW1lKSl7IHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUobmFtZSkgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYoIXNvdXJjZS5oYXNBdHRyaWJ1dGUobmFtZSkpeyB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKG5hbWUpIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgbWVyZ2VGb2N1c2VkSW5wdXQodGFyZ2V0LCBzb3VyY2Upe1xuICAgIC8vIHNraXAgc2VsZWN0cyBiZWNhdXNlIEZGIHdpbGwgcmVzZXQgaGlnaGxpZ2h0ZWQgaW5kZXggZm9yIGFueSBzZXRBdHRyaWJ1dGVcbiAgICBpZighKHRhcmdldCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KSl7IERPTS5tZXJnZUF0dHJzKHRhcmdldCwgc291cmNlLCB7ZXhjbHVkZTogW1widmFsdWVcIl19KSB9XG4gICAgaWYoc291cmNlLnJlYWRPbmx5KXtcbiAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoXCJyZWFkb25seVwiLCB0cnVlKVxuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKFwicmVhZG9ubHlcIilcbiAgICB9XG4gIH0sXG5cbiAgaGFzU2VsZWN0aW9uUmFuZ2UoZWwpe1xuICAgIHJldHVybiBlbC5zZXRTZWxlY3Rpb25SYW5nZSAmJiAoZWwudHlwZSA9PT0gXCJ0ZXh0XCIgfHwgZWwudHlwZSA9PT0gXCJ0ZXh0YXJlYVwiKVxuICB9LFxuXG4gIHJlc3RvcmVGb2N1cyhmb2N1c2VkLCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKXtcbiAgICBpZighRE9NLmlzVGV4dHVhbElucHV0KGZvY3VzZWQpKXsgcmV0dXJuIH1cbiAgICBsZXQgd2FzRm9jdXNlZCA9IGZvY3VzZWQubWF0Y2hlcyhcIjpmb2N1c1wiKVxuICAgIGlmKGZvY3VzZWQucmVhZE9ubHkpeyBmb2N1c2VkLmJsdXIoKSB9XG4gICAgaWYoIXdhc0ZvY3VzZWQpeyBmb2N1c2VkLmZvY3VzKCkgfVxuICAgIGlmKHRoaXMuaGFzU2VsZWN0aW9uUmFuZ2UoZm9jdXNlZCkpe1xuICAgICAgZm9jdXNlZC5zZXRTZWxlY3Rpb25SYW5nZShzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKVxuICAgIH1cbiAgfSxcblxuICBpc0Zvcm1JbnB1dChlbCl7IHJldHVybiAvXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYSkkL2kudGVzdChlbC50YWdOYW1lKSAmJiBlbC50eXBlICE9PSBcImJ1dHRvblwiIH0sXG5cbiAgc3luY0F0dHJzVG9Qcm9wcyhlbCl7XG4gICAgaWYoZWwgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmIENIRUNLQUJMRV9JTlBVVFMuaW5kZXhPZihlbC50eXBlLnRvTG9jYWxlTG93ZXJDYXNlKCkpID49IDApe1xuICAgICAgZWwuY2hlY2tlZCA9IGVsLmdldEF0dHJpYnV0ZShcImNoZWNrZWRcIikgIT09IG51bGxcbiAgICB9XG4gIH0sXG5cbiAgaXNUZXh0dWFsSW5wdXQoZWwpeyByZXR1cm4gRk9DVVNBQkxFX0lOUFVUUy5pbmRleE9mKGVsLnR5cGUpID49IDAgfSxcblxuICBpc05vd1RyaWdnZXJGb3JtRXh0ZXJuYWwoZWwsIHBoeFRyaWdnZXJFeHRlcm5hbCl7XG4gICAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZSAmJiBlbC5nZXRBdHRyaWJ1dGUocGh4VHJpZ2dlckV4dGVybmFsKSAhPT0gbnVsbFxuICB9LFxuXG4gIHN5bmNQZW5kaW5nUmVmKGZyb21FbCwgdG9FbCwgZGlzYWJsZVdpdGgpe1xuICAgIGxldCByZWYgPSBmcm9tRWwuZ2V0QXR0cmlidXRlKFBIWF9SRUYpXG4gICAgaWYocmVmID09PSBudWxsKXsgcmV0dXJuIHRydWUgfVxuICAgIGxldCByZWZTcmMgPSBmcm9tRWwuZ2V0QXR0cmlidXRlKFBIWF9SRUZfU1JDKVxuXG4gICAgaWYoRE9NLmlzRm9ybUlucHV0KGZyb21FbCkgfHwgZnJvbUVsLmdldEF0dHJpYnV0ZShkaXNhYmxlV2l0aCkgIT09IG51bGwpe1xuICAgICAgaWYoRE9NLmlzVXBsb2FkSW5wdXQoZnJvbUVsKSl7IERPTS5tZXJnZUF0dHJzKGZyb21FbCwgdG9FbCwge2lzSWdub3JlZDogdHJ1ZX0pIH1cbiAgICAgIERPTS5wdXRQcml2YXRlKGZyb21FbCwgUEhYX1JFRiwgdG9FbClcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICBQSFhfRVZFTlRfQ0xBU1NFUy5mb3JFYWNoKGNsYXNzTmFtZSA9PiB7XG4gICAgICAgIGZyb21FbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSAmJiB0b0VsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKVxuICAgICAgfSlcbiAgICAgIHRvRWwuc2V0QXR0cmlidXRlKFBIWF9SRUYsIHJlZilcbiAgICAgIHRvRWwuc2V0QXR0cmlidXRlKFBIWF9SRUZfU1JDLCByZWZTcmMpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfSxcblxuICBjbGVhbkNoaWxkTm9kZXMoY29udGFpbmVyLCBwaHhVcGRhdGUpe1xuICAgIGlmKERPTS5pc1BoeFVwZGF0ZShjb250YWluZXIsIHBoeFVwZGF0ZSwgW1wiYXBwZW5kXCIsIFwicHJlcGVuZFwiXSkpe1xuICAgICAgbGV0IHRvUmVtb3ZlID0gW11cbiAgICAgIGNvbnRhaW5lci5jaGlsZE5vZGVzLmZvckVhY2goY2hpbGROb2RlID0+IHtcbiAgICAgICAgaWYoIWNoaWxkTm9kZS5pZCl7XG4gICAgICAgICAgLy8gU2tpcCB3YXJuaW5nIGlmIGl0J3MgYW4gZW1wdHkgdGV4dCBub2RlIChlLmcuIGEgbmV3LWxpbmUpXG4gICAgICAgICAgbGV0IGlzRW1wdHlUZXh0Tm9kZSA9IGNoaWxkTm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUgJiYgY2hpbGROb2RlLm5vZGVWYWx1ZS50cmltKCkgPT09IFwiXCJcbiAgICAgICAgICBpZighaXNFbXB0eVRleHROb2RlKXtcbiAgICAgICAgICAgIGxvZ0Vycm9yKFwib25seSBIVE1MIGVsZW1lbnQgdGFncyB3aXRoIGFuIGlkIGFyZSBhbGxvd2VkIGluc2lkZSBjb250YWluZXJzIHdpdGggcGh4LXVwZGF0ZS5cXG5cXG5cIiArXG4gICAgICAgICAgICAgIGByZW1vdmluZyBpbGxlZ2FsIG5vZGU6IFwiJHsoY2hpbGROb2RlLm91dGVySFRNTCB8fCBjaGlsZE5vZGUubm9kZVZhbHVlKS50cmltKCl9XCJcXG5cXG5gKVxuICAgICAgICAgIH1cbiAgICAgICAgICB0b1JlbW92ZS5wdXNoKGNoaWxkTm9kZSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRvUmVtb3ZlLmZvckVhY2goY2hpbGROb2RlID0+IGNoaWxkTm9kZS5yZW1vdmUoKSlcbiAgICB9XG4gIH0sXG5cbiAgcmVwbGFjZVJvb3RDb250YWluZXIoY29udGFpbmVyLCB0YWdOYW1lLCBhdHRycyl7XG4gICAgbGV0IHJldGFpbmVkQXR0cnMgPSBuZXcgU2V0KFtcImlkXCIsIFBIWF9TRVNTSU9OLCBQSFhfU1RBVElDLCBQSFhfTUFJTiwgUEhYX1JPT1RfSURdKVxuICAgIGlmKGNvbnRhaW5lci50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IHRhZ05hbWUudG9Mb3dlckNhc2UoKSl7XG4gICAgICBBcnJheS5mcm9tKGNvbnRhaW5lci5hdHRyaWJ1dGVzKVxuICAgICAgICAuZmlsdGVyKGF0dHIgPT4gIXJldGFpbmVkQXR0cnMuaGFzKGF0dHIubmFtZS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgLmZvckVhY2goYXR0ciA9PiBjb250YWluZXIucmVtb3ZlQXR0cmlidXRlKGF0dHIubmFtZSkpXG5cbiAgICAgIE9iamVjdC5rZXlzKGF0dHJzKVxuICAgICAgICAuZmlsdGVyKG5hbWUgPT4gIXJldGFpbmVkQXR0cnMuaGFzKG5hbWUudG9Mb3dlckNhc2UoKSkpXG4gICAgICAgIC5mb3JFYWNoKGF0dHIgPT4gY29udGFpbmVyLnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyc1thdHRyXSkpXG5cbiAgICAgIHJldHVybiBjb250YWluZXJcblxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgbmV3Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKVxuICAgICAgT2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goYXR0ciA9PiBuZXdDb250YWluZXIuc2V0QXR0cmlidXRlKGF0dHIsIGF0dHJzW2F0dHJdKSlcbiAgICAgIHJldGFpbmVkQXR0cnMuZm9yRWFjaChhdHRyID0+IG5ld0NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoYXR0ciwgY29udGFpbmVyLmdldEF0dHJpYnV0ZShhdHRyKSkpXG4gICAgICBuZXdDb250YWluZXIuaW5uZXJIVE1MID0gY29udGFpbmVyLmlubmVySFRNTFxuICAgICAgY29udGFpbmVyLnJlcGxhY2VXaXRoKG5ld0NvbnRhaW5lcilcbiAgICAgIHJldHVybiBuZXdDb250YWluZXJcbiAgICB9XG4gIH0sXG5cbiAgZ2V0U3RpY2t5KGVsLCBuYW1lLCBkZWZhdWx0VmFsKXtcbiAgICBsZXQgb3AgPSAoRE9NLnByaXZhdGUoZWwsIFwic3RpY2t5XCIpIHx8IFtdKS5maW5kKChbZXhpc3RpbmdOYW1lLCBdKSA9PiBuYW1lID09PSBleGlzdGluZ05hbWUpXG4gICAgaWYob3Ape1xuICAgICAgbGV0IFtfbmFtZSwgX29wLCBzdGFzaGVkUmVzdWx0XSA9IG9wXG4gICAgICByZXR1cm4gc3Rhc2hlZFJlc3VsdFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHlwZW9mKGRlZmF1bHRWYWwpID09PSBcImZ1bmN0aW9uXCIgPyBkZWZhdWx0VmFsKCkgOiBkZWZhdWx0VmFsXG4gICAgfVxuICB9LFxuXG4gIGRlbGV0ZVN0aWNreShlbCwgbmFtZSl7XG4gICAgdGhpcy51cGRhdGVQcml2YXRlKGVsLCBcInN0aWNreVwiLCBbXSwgb3BzID0+IHtcbiAgICAgIHJldHVybiBvcHMuZmlsdGVyKChbZXhpc3RpbmdOYW1lLCBfXSkgPT4gZXhpc3RpbmdOYW1lICE9PSBuYW1lKVxuICAgIH0pXG4gIH0sXG5cbiAgcHV0U3RpY2t5KGVsLCBuYW1lLCBvcCl7XG4gICAgbGV0IHN0YXNoZWRSZXN1bHQgPSBvcChlbClcbiAgICB0aGlzLnVwZGF0ZVByaXZhdGUoZWwsIFwic3RpY2t5XCIsIFtdLCBvcHMgPT4ge1xuICAgICAgbGV0IGV4aXN0aW5nSW5kZXggPSBvcHMuZmluZEluZGV4KChbZXhpc3RpbmdOYW1lLCBdKSA9PiBuYW1lID09PSBleGlzdGluZ05hbWUpXG4gICAgICBpZihleGlzdGluZ0luZGV4ID49IDApe1xuICAgICAgICBvcHNbZXhpc3RpbmdJbmRleF0gPSBbbmFtZSwgb3AsIHN0YXNoZWRSZXN1bHRdXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHMucHVzaChbbmFtZSwgb3AsIHN0YXNoZWRSZXN1bHRdKVxuICAgICAgfVxuICAgICAgcmV0dXJuIG9wc1xuICAgIH0pXG4gIH0sXG5cbiAgYXBwbHlTdGlja3lPcGVyYXRpb25zKGVsKXtcbiAgICBsZXQgb3BzID0gRE9NLnByaXZhdGUoZWwsIFwic3RpY2t5XCIpXG4gICAgaWYoIW9wcyl7IHJldHVybiB9XG5cbiAgICBvcHMuZm9yRWFjaCgoW25hbWUsIG9wLCBfc3Rhc2hlZF0pID0+IHRoaXMucHV0U3RpY2t5KGVsLCBuYW1lLCBvcCkpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRE9NXG4iLCAiaW1wb3J0IHtcbiAgUEhYX0FDVElWRV9FTlRSWV9SRUZTLFxuICBQSFhfTElWRV9GSUxFX1VQREFURUQsXG4gIFBIWF9QUkVGTElHSFRFRF9SRUZTXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCB7XG4gIGNoYW5uZWxVcGxvYWRlcixcbiAgbG9nRXJyb3Jcbn0gZnJvbSBcIi4vdXRpbHNcIlxuXG5pbXBvcnQgTGl2ZVVwbG9hZGVyIGZyb20gXCIuL2xpdmVfdXBsb2FkZXJcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGxvYWRFbnRyeSB7XG4gIHN0YXRpYyBpc0FjdGl2ZShmaWxlRWwsIGZpbGUpe1xuICAgIGxldCBpc05ldyA9IGZpbGUuX3BoeFJlZiA9PT0gdW5kZWZpbmVkXG4gICAgbGV0IGFjdGl2ZVJlZnMgPSBmaWxlRWwuZ2V0QXR0cmlidXRlKFBIWF9BQ1RJVkVfRU5UUllfUkVGUykuc3BsaXQoXCIsXCIpXG4gICAgbGV0IGlzQWN0aXZlID0gYWN0aXZlUmVmcy5pbmRleE9mKExpdmVVcGxvYWRlci5nZW5GaWxlUmVmKGZpbGUpKSA+PSAwXG4gICAgcmV0dXJuIGZpbGUuc2l6ZSA+IDAgJiYgKGlzTmV3IHx8IGlzQWN0aXZlKVxuICB9XG5cbiAgc3RhdGljIGlzUHJlZmxpZ2h0ZWQoZmlsZUVsLCBmaWxlKXtcbiAgICBsZXQgcHJlZmxpZ2h0ZWRSZWZzID0gZmlsZUVsLmdldEF0dHJpYnV0ZShQSFhfUFJFRkxJR0hURURfUkVGUykuc3BsaXQoXCIsXCIpXG4gICAgbGV0IGlzUHJlZmxpZ2h0ZWQgPSBwcmVmbGlnaHRlZFJlZnMuaW5kZXhPZihMaXZlVXBsb2FkZXIuZ2VuRmlsZVJlZihmaWxlKSkgPj0gMFxuICAgIHJldHVybiBpc1ByZWZsaWdodGVkICYmIHRoaXMuaXNBY3RpdmUoZmlsZUVsLCBmaWxlKVxuICB9XG5cbiAgY29uc3RydWN0b3IoZmlsZUVsLCBmaWxlLCB2aWV3KXtcbiAgICB0aGlzLnJlZiA9IExpdmVVcGxvYWRlci5nZW5GaWxlUmVmKGZpbGUpXG4gICAgdGhpcy5maWxlRWwgPSBmaWxlRWxcbiAgICB0aGlzLmZpbGUgPSBmaWxlXG4gICAgdGhpcy52aWV3ID0gdmlld1xuICAgIHRoaXMubWV0YSA9IG51bGxcbiAgICB0aGlzLl9pc0NhbmNlbGxlZCA9IGZhbHNlXG4gICAgdGhpcy5faXNEb25lID0gZmFsc2VcbiAgICB0aGlzLl9wcm9ncmVzcyA9IDBcbiAgICB0aGlzLl9sYXN0UHJvZ3Jlc3NTZW50ID0gLTFcbiAgICB0aGlzLl9vbkRvbmUgPSBmdW5jdGlvbiAoKXsgfVxuICAgIHRoaXMuX29uRWxVcGRhdGVkID0gdGhpcy5vbkVsVXBkYXRlZC5iaW5kKHRoaXMpXG4gICAgdGhpcy5maWxlRWwuYWRkRXZlbnRMaXN0ZW5lcihQSFhfTElWRV9GSUxFX1VQREFURUQsIHRoaXMuX29uRWxVcGRhdGVkKVxuICB9XG5cbiAgbWV0YWRhdGEoKXsgcmV0dXJuIHRoaXMubWV0YSB9XG5cbiAgcHJvZ3Jlc3MocHJvZ3Jlc3Mpe1xuICAgIHRoaXMuX3Byb2dyZXNzID0gTWF0aC5mbG9vcihwcm9ncmVzcylcbiAgICBpZih0aGlzLl9wcm9ncmVzcyA+IHRoaXMuX2xhc3RQcm9ncmVzc1NlbnQpe1xuICAgICAgaWYodGhpcy5fcHJvZ3Jlc3MgPj0gMTAwKXtcbiAgICAgICAgdGhpcy5fcHJvZ3Jlc3MgPSAxMDBcbiAgICAgICAgdGhpcy5fbGFzdFByb2dyZXNzU2VudCA9IDEwMFxuICAgICAgICB0aGlzLl9pc0RvbmUgPSB0cnVlXG4gICAgICAgIHRoaXMudmlldy5wdXNoRmlsZVByb2dyZXNzKHRoaXMuZmlsZUVsLCB0aGlzLnJlZiwgMTAwLCAoKSA9PiB7XG4gICAgICAgICAgTGl2ZVVwbG9hZGVyLnVudHJhY2tGaWxlKHRoaXMuZmlsZUVsLCB0aGlzLmZpbGUpXG4gICAgICAgICAgdGhpcy5fb25Eb25lKClcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2xhc3RQcm9ncmVzc1NlbnQgPSB0aGlzLl9wcm9ncmVzc1xuICAgICAgICB0aGlzLnZpZXcucHVzaEZpbGVQcm9ncmVzcyh0aGlzLmZpbGVFbCwgdGhpcy5yZWYsIHRoaXMuX3Byb2dyZXNzKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNhbmNlbCgpe1xuICAgIHRoaXMuX2lzQ2FuY2VsbGVkID0gdHJ1ZVxuICAgIHRoaXMuX2lzRG9uZSA9IHRydWVcbiAgICB0aGlzLl9vbkRvbmUoKVxuICB9XG5cbiAgaXNEb25lKCl7IHJldHVybiB0aGlzLl9pc0RvbmUgfVxuXG4gIGVycm9yKHJlYXNvbiA9IFwiZmFpbGVkXCIpe1xuICAgIHRoaXMudmlldy5wdXNoRmlsZVByb2dyZXNzKHRoaXMuZmlsZUVsLCB0aGlzLnJlZiwge2Vycm9yOiByZWFzb259KVxuICAgIExpdmVVcGxvYWRlci5jbGVhckZpbGVzKHRoaXMuZmlsZUVsKVxuICB9XG5cbiAgLy9wcml2YXRlXG5cbiAgb25Eb25lKGNhbGxiYWNrKXtcbiAgICB0aGlzLl9vbkRvbmUgPSAoKSA9PiB7XG4gICAgICB0aGlzLmZpbGVFbC5yZW1vdmVFdmVudExpc3RlbmVyKFBIWF9MSVZFX0ZJTEVfVVBEQVRFRCwgdGhpcy5fb25FbFVwZGF0ZWQpXG4gICAgICBjYWxsYmFjaygpXG4gICAgfVxuICB9XG5cbiAgb25FbFVwZGF0ZWQoKXtcbiAgICBsZXQgYWN0aXZlUmVmcyA9IHRoaXMuZmlsZUVsLmdldEF0dHJpYnV0ZShQSFhfQUNUSVZFX0VOVFJZX1JFRlMpLnNwbGl0KFwiLFwiKVxuICAgIGlmKGFjdGl2ZVJlZnMuaW5kZXhPZih0aGlzLnJlZikgPT09IC0xKXsgdGhpcy5jYW5jZWwoKSB9XG4gIH1cblxuICB0b1ByZWZsaWdodFBheWxvYWQoKXtcbiAgICByZXR1cm4ge1xuICAgICAgbGFzdF9tb2RpZmllZDogdGhpcy5maWxlLmxhc3RNb2RpZmllZCxcbiAgICAgIG5hbWU6IHRoaXMuZmlsZS5uYW1lLFxuICAgICAgc2l6ZTogdGhpcy5maWxlLnNpemUsXG4gICAgICB0eXBlOiB0aGlzLmZpbGUudHlwZSxcbiAgICAgIHJlZjogdGhpcy5yZWZcbiAgICB9XG4gIH1cblxuICB1cGxvYWRlcih1cGxvYWRlcnMpe1xuICAgIGlmKHRoaXMubWV0YS51cGxvYWRlcil7XG4gICAgICBsZXQgY2FsbGJhY2sgPSB1cGxvYWRlcnNbdGhpcy5tZXRhLnVwbG9hZGVyXSB8fCBsb2dFcnJvcihgbm8gdXBsb2FkZXIgY29uZmlndXJlZCBmb3IgJHt0aGlzLm1ldGEudXBsb2FkZXJ9YClcbiAgICAgIHJldHVybiB7bmFtZTogdGhpcy5tZXRhLnVwbG9hZGVyLCBjYWxsYmFjazogY2FsbGJhY2t9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7bmFtZTogXCJjaGFubmVsXCIsIGNhbGxiYWNrOiBjaGFubmVsVXBsb2FkZXJ9XG4gICAgfVxuICB9XG5cbiAgemlwUG9zdEZsaWdodChyZXNwKXtcbiAgICB0aGlzLm1ldGEgPSByZXNwLmVudHJpZXNbdGhpcy5yZWZdXG4gICAgaWYoIXRoaXMubWV0YSl7IGxvZ0Vycm9yKGBubyBwcmVmbGlnaHQgdXBsb2FkIHJlc3BvbnNlIHJldHVybmVkIHdpdGggcmVmICR7dGhpcy5yZWZ9YCwge2lucHV0OiB0aGlzLmZpbGVFbCwgcmVzcG9uc2U6IHJlc3B9KSB9XG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBQSFhfRE9ORV9SRUZTLFxuICBQSFhfUFJFRkxJR0hURURfUkVGUyxcbiAgUEhYX1VQTE9BRF9SRUZcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbn0gZnJvbSBcIi4vdXRpbHNcIlxuXG5pbXBvcnQgRE9NIGZyb20gXCIuL2RvbVwiXG5pbXBvcnQgVXBsb2FkRW50cnkgZnJvbSBcIi4vdXBsb2FkX2VudHJ5XCJcblxubGV0IGxpdmVVcGxvYWRlckZpbGVSZWYgPSAwXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpdmVVcGxvYWRlciB7XG4gIHN0YXRpYyBnZW5GaWxlUmVmKGZpbGUpe1xuICAgIGxldCByZWYgPSBmaWxlLl9waHhSZWZcbiAgICBpZihyZWYgIT09IHVuZGVmaW5lZCl7XG4gICAgICByZXR1cm4gcmVmXG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGUuX3BoeFJlZiA9IChsaXZlVXBsb2FkZXJGaWxlUmVmKyspLnRvU3RyaW5nKClcbiAgICAgIHJldHVybiBmaWxlLl9waHhSZWZcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0RW50cnlEYXRhVVJMKGlucHV0RWwsIHJlZiwgY2FsbGJhY2spe1xuICAgIGxldCBmaWxlID0gdGhpcy5hY3RpdmVGaWxlcyhpbnB1dEVsKS5maW5kKGZpbGUgPT4gdGhpcy5nZW5GaWxlUmVmKGZpbGUpID09PSByZWYpXG4gICAgY2FsbGJhY2soVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKSlcbiAgfVxuXG4gIHN0YXRpYyBoYXNVcGxvYWRzSW5Qcm9ncmVzcyhmb3JtRWwpe1xuICAgIGxldCBhY3RpdmUgPSAwXG4gICAgRE9NLmZpbmRVcGxvYWRJbnB1dHMoZm9ybUVsKS5mb3JFYWNoKGlucHV0ID0+IHtcbiAgICAgIGlmKGlucHV0LmdldEF0dHJpYnV0ZShQSFhfUFJFRkxJR0hURURfUkVGUykgIT09IGlucHV0LmdldEF0dHJpYnV0ZShQSFhfRE9ORV9SRUZTKSl7XG4gICAgICAgIGFjdGl2ZSsrXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gYWN0aXZlID4gMFxuICB9XG5cbiAgc3RhdGljIHNlcmlhbGl6ZVVwbG9hZHMoaW5wdXRFbCl7XG4gICAgbGV0IGZpbGVzID0gdGhpcy5hY3RpdmVGaWxlcyhpbnB1dEVsKVxuICAgIGxldCBmaWxlRGF0YSA9IHt9XG4gICAgZmlsZXMuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgIGxldCBlbnRyeSA9IHtwYXRoOiBpbnB1dEVsLm5hbWV9XG4gICAgICBsZXQgdXBsb2FkUmVmID0gaW5wdXRFbC5nZXRBdHRyaWJ1dGUoUEhYX1VQTE9BRF9SRUYpXG4gICAgICBmaWxlRGF0YVt1cGxvYWRSZWZdID0gZmlsZURhdGFbdXBsb2FkUmVmXSB8fCBbXVxuICAgICAgZW50cnkucmVmID0gdGhpcy5nZW5GaWxlUmVmKGZpbGUpXG4gICAgICBlbnRyeS5uYW1lID0gZmlsZS5uYW1lIHx8IGVudHJ5LnJlZlxuICAgICAgZW50cnkudHlwZSA9IGZpbGUudHlwZVxuICAgICAgZW50cnkuc2l6ZSA9IGZpbGUuc2l6ZVxuICAgICAgZmlsZURhdGFbdXBsb2FkUmVmXS5wdXNoKGVudHJ5KVxuICAgIH0pXG4gICAgcmV0dXJuIGZpbGVEYXRhXG4gIH1cblxuICBzdGF0aWMgY2xlYXJGaWxlcyhpbnB1dEVsKXtcbiAgICBpbnB1dEVsLnZhbHVlID0gbnVsbFxuICAgIGlucHV0RWwucmVtb3ZlQXR0cmlidXRlKFBIWF9VUExPQURfUkVGKVxuICAgIERPTS5wdXRQcml2YXRlKGlucHV0RWwsIFwiZmlsZXNcIiwgW10pXG4gIH1cblxuICBzdGF0aWMgdW50cmFja0ZpbGUoaW5wdXRFbCwgZmlsZSl7XG4gICAgRE9NLnB1dFByaXZhdGUoaW5wdXRFbCwgXCJmaWxlc1wiLCBET00ucHJpdmF0ZShpbnB1dEVsLCBcImZpbGVzXCIpLmZpbHRlcihmID0+ICFPYmplY3QuaXMoZiwgZmlsZSkpKVxuICB9XG5cbiAgc3RhdGljIHRyYWNrRmlsZXMoaW5wdXRFbCwgZmlsZXMpe1xuICAgIGlmKGlucHV0RWwuZ2V0QXR0cmlidXRlKFwibXVsdGlwbGVcIikgIT09IG51bGwpe1xuICAgICAgbGV0IG5ld0ZpbGVzID0gZmlsZXMuZmlsdGVyKGZpbGUgPT4gIXRoaXMuYWN0aXZlRmlsZXMoaW5wdXRFbCkuZmluZChmID0+IE9iamVjdC5pcyhmLCBmaWxlKSkpXG4gICAgICBET00ucHV0UHJpdmF0ZShpbnB1dEVsLCBcImZpbGVzXCIsIHRoaXMuYWN0aXZlRmlsZXMoaW5wdXRFbCkuY29uY2F0KG5ld0ZpbGVzKSlcbiAgICAgIGlucHV0RWwudmFsdWUgPSBudWxsXG4gICAgfSBlbHNlIHtcbiAgICAgIERPTS5wdXRQcml2YXRlKGlucHV0RWwsIFwiZmlsZXNcIiwgZmlsZXMpXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGFjdGl2ZUZpbGVJbnB1dHMoZm9ybUVsKXtcbiAgICBsZXQgZmlsZUlucHV0cyA9IERPTS5maW5kVXBsb2FkSW5wdXRzKGZvcm1FbClcbiAgICByZXR1cm4gQXJyYXkuZnJvbShmaWxlSW5wdXRzKS5maWx0ZXIoZWwgPT4gZWwuZmlsZXMgJiYgdGhpcy5hY3RpdmVGaWxlcyhlbCkubGVuZ3RoID4gMClcbiAgfVxuXG4gIHN0YXRpYyBhY3RpdmVGaWxlcyhpbnB1dCl7XG4gICAgcmV0dXJuIChET00ucHJpdmF0ZShpbnB1dCwgXCJmaWxlc1wiKSB8fCBbXSkuZmlsdGVyKGYgPT4gVXBsb2FkRW50cnkuaXNBY3RpdmUoaW5wdXQsIGYpKVxuICB9XG5cbiAgc3RhdGljIGlucHV0c0F3YWl0aW5nUHJlZmxpZ2h0KGZvcm1FbCl7XG4gICAgbGV0IGZpbGVJbnB1dHMgPSBET00uZmluZFVwbG9hZElucHV0cyhmb3JtRWwpXG4gICAgcmV0dXJuIEFycmF5LmZyb20oZmlsZUlucHV0cykuZmlsdGVyKGlucHV0ID0+IHRoaXMuZmlsZXNBd2FpdGluZ1ByZWZsaWdodChpbnB1dCkubGVuZ3RoID4gMClcbiAgfVxuXG4gIHN0YXRpYyBmaWxlc0F3YWl0aW5nUHJlZmxpZ2h0KGlucHV0KXtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVGaWxlcyhpbnB1dCkuZmlsdGVyKGYgPT4gIVVwbG9hZEVudHJ5LmlzUHJlZmxpZ2h0ZWQoaW5wdXQsIGYpKVxuICB9XG5cbiAgY29uc3RydWN0b3IoaW5wdXRFbCwgdmlldywgb25Db21wbGV0ZSl7XG4gICAgdGhpcy52aWV3ID0gdmlld1xuICAgIHRoaXMub25Db21wbGV0ZSA9IG9uQ29tcGxldGVcbiAgICB0aGlzLl9lbnRyaWVzID1cbiAgICAgIEFycmF5LmZyb20oTGl2ZVVwbG9hZGVyLmZpbGVzQXdhaXRpbmdQcmVmbGlnaHQoaW5wdXRFbCkgfHwgW10pXG4gICAgICAgIC5tYXAoZmlsZSA9PiBuZXcgVXBsb2FkRW50cnkoaW5wdXRFbCwgZmlsZSwgdmlldykpXG5cbiAgICB0aGlzLm51bUVudHJpZXNJblByb2dyZXNzID0gdGhpcy5fZW50cmllcy5sZW5ndGhcbiAgfVxuXG4gIGVudHJpZXMoKXsgcmV0dXJuIHRoaXMuX2VudHJpZXMgfVxuXG4gIGluaXRBZGFwdGVyVXBsb2FkKHJlc3AsIG9uRXJyb3IsIGxpdmVTb2NrZXQpe1xuICAgIHRoaXMuX2VudHJpZXMgPVxuICAgICAgdGhpcy5fZW50cmllcy5tYXAoZW50cnkgPT4ge1xuICAgICAgICBlbnRyeS56aXBQb3N0RmxpZ2h0KHJlc3ApXG4gICAgICAgIGVudHJ5Lm9uRG9uZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5udW1FbnRyaWVzSW5Qcm9ncmVzcy0tXG4gICAgICAgICAgaWYodGhpcy5udW1FbnRyaWVzSW5Qcm9ncmVzcyA9PT0gMCl7IHRoaXMub25Db21wbGV0ZSgpIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGVudHJ5XG4gICAgICB9KVxuXG4gICAgbGV0IGdyb3VwZWRFbnRyaWVzID0gdGhpcy5fZW50cmllcy5yZWR1Y2UoKGFjYywgZW50cnkpID0+IHtcbiAgICAgIGxldCB7bmFtZSwgY2FsbGJhY2t9ID0gZW50cnkudXBsb2FkZXIobGl2ZVNvY2tldC51cGxvYWRlcnMpXG4gICAgICBhY2NbbmFtZV0gPSBhY2NbbmFtZV0gfHwge2NhbGxiYWNrOiBjYWxsYmFjaywgZW50cmllczogW119XG4gICAgICBhY2NbbmFtZV0uZW50cmllcy5wdXNoKGVudHJ5KVxuICAgICAgcmV0dXJuIGFjY1xuICAgIH0sIHt9KVxuXG4gICAgZm9yKGxldCBuYW1lIGluIGdyb3VwZWRFbnRyaWVzKXtcbiAgICAgIGxldCB7Y2FsbGJhY2ssIGVudHJpZXN9ID0gZ3JvdXBlZEVudHJpZXNbbmFtZV1cbiAgICAgIGNhbGxiYWNrKGVudHJpZXMsIG9uRXJyb3IsIHJlc3AsIGxpdmVTb2NrZXQpXG4gICAgfVxuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgUEhYX0FDVElWRV9FTlRSWV9SRUZTLFxuICBQSFhfTElWRV9GSUxFX1VQREFURUQsXG4gIFBIWF9QUkVGTElHSFRFRF9SRUZTLFxuICBQSFhfVVBMT0FEX1JFRlxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQgTGl2ZVVwbG9hZGVyIGZyb20gXCIuL2xpdmVfdXBsb2FkZXJcIlxuXG5sZXQgSG9va3MgPSB7XG4gIExpdmVGaWxlVXBsb2FkOiB7XG4gICAgYWN0aXZlUmVmcygpeyByZXR1cm4gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoUEhYX0FDVElWRV9FTlRSWV9SRUZTKSB9LFxuXG4gICAgcHJlZmxpZ2h0ZWRSZWZzKCl7IHJldHVybiB0aGlzLmVsLmdldEF0dHJpYnV0ZShQSFhfUFJFRkxJR0hURURfUkVGUykgfSxcblxuICAgIG1vdW50ZWQoKXsgdGhpcy5wcmVmbGlnaHRlZFdhcyA9IHRoaXMucHJlZmxpZ2h0ZWRSZWZzKCkgfSxcblxuICAgIHVwZGF0ZWQoKXtcbiAgICAgIGxldCBuZXdQcmVmbGlnaHRzID0gdGhpcy5wcmVmbGlnaHRlZFJlZnMoKVxuICAgICAgaWYodGhpcy5wcmVmbGlnaHRlZFdhcyAhPT0gbmV3UHJlZmxpZ2h0cyl7XG4gICAgICAgIHRoaXMucHJlZmxpZ2h0ZWRXYXMgPSBuZXdQcmVmbGlnaHRzXG4gICAgICAgIGlmKG5ld1ByZWZsaWdodHMgPT09IFwiXCIpe1xuICAgICAgICAgIHRoaXMuX192aWV3LmNhbmNlbFN1Ym1pdCh0aGlzLmVsLmZvcm0pXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYodGhpcy5hY3RpdmVSZWZzKCkgPT09IFwiXCIpeyB0aGlzLmVsLnZhbHVlID0gbnVsbCB9XG4gICAgICB0aGlzLmVsLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFBIWF9MSVZFX0ZJTEVfVVBEQVRFRCkpXG4gICAgfVxuICB9LFxuXG4gIExpdmVJbWdQcmV2aWV3OiB7XG4gICAgbW91bnRlZCgpe1xuICAgICAgdGhpcy5yZWYgPSB0aGlzLmVsLmdldEF0dHJpYnV0ZShcImRhdGEtcGh4LWVudHJ5LXJlZlwiKVxuICAgICAgdGhpcy5pbnB1dEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5lbC5nZXRBdHRyaWJ1dGUoUEhYX1VQTE9BRF9SRUYpKVxuICAgICAgTGl2ZVVwbG9hZGVyLmdldEVudHJ5RGF0YVVSTCh0aGlzLmlucHV0RWwsIHRoaXMucmVmLCB1cmwgPT4ge1xuICAgICAgICB0aGlzLnVybCA9IHVybFxuICAgICAgICB0aGlzLmVsLnNyYyA9IHVybFxuICAgICAgfSlcbiAgICB9LFxuICAgIGRlc3Ryb3llZCgpe1xuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh0aGlzLnVybClcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSG9va3NcbiIsICJpbXBvcnQge1xuICBtYXliZVxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmltcG9ydCBET00gZnJvbSBcIi4vZG9tXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRE9NUG9zdE1vcnBoUmVzdG9yZXIge1xuICBjb25zdHJ1Y3Rvcihjb250YWluZXJCZWZvcmUsIGNvbnRhaW5lckFmdGVyLCB1cGRhdGVUeXBlKXtcbiAgICBsZXQgaWRzQmVmb3JlID0gbmV3IFNldCgpXG4gICAgbGV0IGlkc0FmdGVyID0gbmV3IFNldChbLi4uY29udGFpbmVyQWZ0ZXIuY2hpbGRyZW5dLm1hcChjaGlsZCA9PiBjaGlsZC5pZCkpXG5cbiAgICBsZXQgZWxlbWVudHNUb01vZGlmeSA9IFtdXG5cbiAgICBBcnJheS5mcm9tKGNvbnRhaW5lckJlZm9yZS5jaGlsZHJlbikuZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICBpZihjaGlsZC5pZCl7IC8vIGFsbCBvZiBvdXIgY2hpbGRyZW4gc2hvdWxkIGJlIGVsZW1lbnRzIHdpdGggaWRzXG4gICAgICAgIGlkc0JlZm9yZS5hZGQoY2hpbGQuaWQpXG4gICAgICAgIGlmKGlkc0FmdGVyLmhhcyhjaGlsZC5pZCkpe1xuICAgICAgICAgIGxldCBwcmV2aW91c0VsZW1lbnRJZCA9IGNoaWxkLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgJiYgY2hpbGQucHJldmlvdXNFbGVtZW50U2libGluZy5pZFxuICAgICAgICAgIGVsZW1lbnRzVG9Nb2RpZnkucHVzaCh7ZWxlbWVudElkOiBjaGlsZC5pZCwgcHJldmlvdXNFbGVtZW50SWQ6IHByZXZpb3VzRWxlbWVudElkfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICB0aGlzLmNvbnRhaW5lcklkID0gY29udGFpbmVyQWZ0ZXIuaWRcbiAgICB0aGlzLnVwZGF0ZVR5cGUgPSB1cGRhdGVUeXBlXG4gICAgdGhpcy5lbGVtZW50c1RvTW9kaWZ5ID0gZWxlbWVudHNUb01vZGlmeVxuICAgIHRoaXMuZWxlbWVudElkc1RvQWRkID0gWy4uLmlkc0FmdGVyXS5maWx0ZXIoaWQgPT4gIWlkc0JlZm9yZS5oYXMoaWQpKVxuICB9XG5cbiAgLy8gV2UgZG8gdGhlIGZvbGxvd2luZyB0byBvcHRpbWl6ZSBhcHBlbmQvcHJlcGVuZCBvcGVyYXRpb25zOlxuICAvLyAgIDEpIFRyYWNrIGlkcyBvZiBtb2RpZmllZCBlbGVtZW50cyAmIG9mIG5ldyBlbGVtZW50c1xuICAvLyAgIDIpIEFsbCB0aGUgbW9kaWZpZWQgZWxlbWVudHMgYXJlIHB1dCBiYWNrIGluIHRoZSBjb3JyZWN0IHBvc2l0aW9uIGluIHRoZSBET00gdHJlZVxuICAvLyAgICAgIGJ5IHN0b3JpbmcgdGhlIGlkIG9mIHRoZWlyIHByZXZpb3VzIHNpYmxpbmdcbiAgLy8gICAzKSBOZXcgZWxlbWVudHMgYXJlIGdvaW5nIHRvIGJlIHB1dCBpbiB0aGUgcmlnaHQgcGxhY2UgYnkgbW9ycGhkb20gZHVyaW5nIGFwcGVuZC5cbiAgLy8gICAgICBGb3IgcHJlcGVuZCwgd2UgbW92ZSB0aGVtIHRvIHRoZSBmaXJzdCBwb3NpdGlvbiBpbiB0aGUgY29udGFpbmVyXG4gIHBlcmZvcm0oKXtcbiAgICBsZXQgY29udGFpbmVyID0gRE9NLmJ5SWQodGhpcy5jb250YWluZXJJZClcbiAgICB0aGlzLmVsZW1lbnRzVG9Nb2RpZnkuZm9yRWFjaChlbGVtZW50VG9Nb2RpZnkgPT4ge1xuICAgICAgaWYoZWxlbWVudFRvTW9kaWZ5LnByZXZpb3VzRWxlbWVudElkKXtcbiAgICAgICAgbWF5YmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFRvTW9kaWZ5LnByZXZpb3VzRWxlbWVudElkKSwgcHJldmlvdXNFbGVtID0+IHtcbiAgICAgICAgICBtYXliZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VG9Nb2RpZnkuZWxlbWVudElkKSwgZWxlbSA9PiB7XG4gICAgICAgICAgICBsZXQgaXNJblJpZ2h0UGxhY2UgPSBlbGVtLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgJiYgZWxlbS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmlkID09IHByZXZpb3VzRWxlbS5pZFxuICAgICAgICAgICAgaWYoIWlzSW5SaWdodFBsYWNlKXtcbiAgICAgICAgICAgICAgcHJldmlvdXNFbGVtLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIGVsZW0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRoaXMgaXMgdGhlIGZpcnN0IGVsZW1lbnQgaW4gdGhlIGNvbnRhaW5lclxuICAgICAgICBtYXliZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VG9Nb2RpZnkuZWxlbWVudElkKSwgZWxlbSA9PiB7XG4gICAgICAgICAgbGV0IGlzSW5SaWdodFBsYWNlID0gZWxlbS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nID09IG51bGxcbiAgICAgICAgICBpZighaXNJblJpZ2h0UGxhY2Upe1xuICAgICAgICAgICAgY29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyYmVnaW5cIiwgZWxlbSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcblxuICAgIGlmKHRoaXMudXBkYXRlVHlwZSA9PSBcInByZXBlbmRcIil7XG4gICAgICB0aGlzLmVsZW1lbnRJZHNUb0FkZC5yZXZlcnNlKCkuZm9yRWFjaChlbGVtSWQgPT4ge1xuICAgICAgICBtYXliZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtSWQpLCBlbGVtID0+IGNvbnRhaW5lci5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmJlZ2luXCIsIGVsZW0pKVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cbiIsICJ2YXIgRE9DVU1FTlRfRlJBR01FTlRfTk9ERSA9IDExO1xuXG5mdW5jdGlvbiBtb3JwaEF0dHJzKGZyb21Ob2RlLCB0b05vZGUpIHtcbiAgICB2YXIgdG9Ob2RlQXR0cnMgPSB0b05vZGUuYXR0cmlidXRlcztcbiAgICB2YXIgYXR0cjtcbiAgICB2YXIgYXR0ck5hbWU7XG4gICAgdmFyIGF0dHJOYW1lc3BhY2VVUkk7XG4gICAgdmFyIGF0dHJWYWx1ZTtcbiAgICB2YXIgZnJvbVZhbHVlO1xuXG4gICAgLy8gZG9jdW1lbnQtZnJhZ21lbnRzIGRvbnQgaGF2ZSBhdHRyaWJ1dGVzIHNvIGxldHMgbm90IGRvIGFueXRoaW5nXG4gICAgaWYgKHRvTm9kZS5ub2RlVHlwZSA9PT0gRE9DVU1FTlRfRlJBR01FTlRfTk9ERSB8fCBmcm9tTm9kZS5ub2RlVHlwZSA9PT0gRE9DVU1FTlRfRlJBR01FTlRfTk9ERSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBhdHRyaWJ1dGVzIG9uIG9yaWdpbmFsIERPTSBlbGVtZW50XG4gICAgZm9yICh2YXIgaSA9IHRvTm9kZUF0dHJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGF0dHIgPSB0b05vZGVBdHRyc1tpXTtcbiAgICAgICAgYXR0ck5hbWUgPSBhdHRyLm5hbWU7XG4gICAgICAgIGF0dHJOYW1lc3BhY2VVUkkgPSBhdHRyLm5hbWVzcGFjZVVSSTtcbiAgICAgICAgYXR0clZhbHVlID0gYXR0ci52YWx1ZTtcblxuICAgICAgICBpZiAoYXR0ck5hbWVzcGFjZVVSSSkge1xuICAgICAgICAgICAgYXR0ck5hbWUgPSBhdHRyLmxvY2FsTmFtZSB8fCBhdHRyTmFtZTtcbiAgICAgICAgICAgIGZyb21WYWx1ZSA9IGZyb21Ob2RlLmdldEF0dHJpYnV0ZU5TKGF0dHJOYW1lc3BhY2VVUkksIGF0dHJOYW1lKTtcblxuICAgICAgICAgICAgaWYgKGZyb21WYWx1ZSAhPT0gYXR0clZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGF0dHIucHJlZml4ID09PSAneG1sbnMnKXtcbiAgICAgICAgICAgICAgICAgICAgYXR0ck5hbWUgPSBhdHRyLm5hbWU7IC8vIEl0J3Mgbm90IGFsbG93ZWQgdG8gc2V0IGFuIGF0dHJpYnV0ZSB3aXRoIHRoZSBYTUxOUyBuYW1lc3BhY2Ugd2l0aG91dCBzcGVjaWZ5aW5nIHRoZSBgeG1sbnNgIHByZWZpeFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmcm9tTm9kZS5zZXRBdHRyaWJ1dGVOUyhhdHRyTmFtZXNwYWNlVVJJLCBhdHRyTmFtZSwgYXR0clZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZyb21WYWx1ZSA9IGZyb21Ob2RlLmdldEF0dHJpYnV0ZShhdHRyTmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChmcm9tVmFsdWUgIT09IGF0dHJWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGZyb21Ob2RlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBhbnkgZXh0cmEgYXR0cmlidXRlcyBmb3VuZCBvbiB0aGUgb3JpZ2luYWwgRE9NIGVsZW1lbnQgdGhhdFxuICAgIC8vIHdlcmVuJ3QgZm91bmQgb24gdGhlIHRhcmdldCBlbGVtZW50LlxuICAgIHZhciBmcm9tTm9kZUF0dHJzID0gZnJvbU5vZGUuYXR0cmlidXRlcztcblxuICAgIGZvciAodmFyIGQgPSBmcm9tTm9kZUF0dHJzLmxlbmd0aCAtIDE7IGQgPj0gMDsgZC0tKSB7XG4gICAgICAgIGF0dHIgPSBmcm9tTm9kZUF0dHJzW2RdO1xuICAgICAgICBhdHRyTmFtZSA9IGF0dHIubmFtZTtcbiAgICAgICAgYXR0ck5hbWVzcGFjZVVSSSA9IGF0dHIubmFtZXNwYWNlVVJJO1xuXG4gICAgICAgIGlmIChhdHRyTmFtZXNwYWNlVVJJKSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9IGF0dHIubG9jYWxOYW1lIHx8IGF0dHJOYW1lO1xuXG4gICAgICAgICAgICBpZiAoIXRvTm9kZS5oYXNBdHRyaWJ1dGVOUyhhdHRyTmFtZXNwYWNlVVJJLCBhdHRyTmFtZSkpIHtcbiAgICAgICAgICAgICAgICBmcm9tTm9kZS5yZW1vdmVBdHRyaWJ1dGVOUyhhdHRyTmFtZXNwYWNlVVJJLCBhdHRyTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRvTm9kZS5oYXNBdHRyaWJ1dGUoYXR0ck5hbWUpKSB7XG4gICAgICAgICAgICAgICAgZnJvbU5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxudmFyIHJhbmdlOyAvLyBDcmVhdGUgYSByYW5nZSBvYmplY3QgZm9yIGVmZmljZW50bHkgcmVuZGVyaW5nIHN0cmluZ3MgdG8gZWxlbWVudHMuXG52YXIgTlNfWEhUTUwgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCc7XG5cbnZhciBkb2MgPSB0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogZG9jdW1lbnQ7XG52YXIgSEFTX1RFTVBMQVRFX1NVUFBPUlQgPSAhIWRvYyAmJiAnY29udGVudCcgaW4gZG9jLmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG52YXIgSEFTX1JBTkdFX1NVUFBPUlQgPSAhIWRvYyAmJiBkb2MuY3JlYXRlUmFuZ2UgJiYgJ2NyZWF0ZUNvbnRleHR1YWxGcmFnbWVudCcgaW4gZG9jLmNyZWF0ZVJhbmdlKCk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUZyYWdtZW50RnJvbVRlbXBsYXRlKHN0cikge1xuICAgIHZhciB0ZW1wbGF0ZSA9IGRvYy5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHN0cjtcbiAgICByZXR1cm4gdGVtcGxhdGUuY29udGVudC5jaGlsZE5vZGVzWzBdO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGcmFnbWVudEZyb21SYW5nZShzdHIpIHtcbiAgICBpZiAoIXJhbmdlKSB7XG4gICAgICAgIHJhbmdlID0gZG9jLmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgIHJhbmdlLnNlbGVjdE5vZGUoZG9jLmJvZHkpO1xuICAgIH1cblxuICAgIHZhciBmcmFnbWVudCA9IHJhbmdlLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChzdHIpO1xuICAgIHJldHVybiBmcmFnbWVudC5jaGlsZE5vZGVzWzBdO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGcmFnbWVudEZyb21XcmFwKHN0cikge1xuICAgIHZhciBmcmFnbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdib2R5Jyk7XG4gICAgZnJhZ21lbnQuaW5uZXJIVE1MID0gc3RyO1xuICAgIHJldHVybiBmcmFnbWVudC5jaGlsZE5vZGVzWzBdO1xufVxuXG4vKipcbiAqIFRoaXMgaXMgYWJvdXQgdGhlIHNhbWVcbiAqIHZhciBodG1sID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhzdHIsICd0ZXh0L2h0bWwnKTtcbiAqIHJldHVybiBodG1sLmJvZHkuZmlyc3RDaGlsZDtcbiAqXG4gKiBAbWV0aG9kIHRvRWxlbWVudFxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICovXG5mdW5jdGlvbiB0b0VsZW1lbnQoc3RyKSB7XG4gICAgc3RyID0gc3RyLnRyaW0oKTtcbiAgICBpZiAoSEFTX1RFTVBMQVRFX1NVUFBPUlQpIHtcbiAgICAgIC8vIGF2b2lkIHJlc3RyaWN0aW9ucyBvbiBjb250ZW50IGZvciB0aGluZ3MgbGlrZSBgPHRyPjx0aD5IaTwvdGg+PC90cj5gIHdoaWNoXG4gICAgICAvLyBjcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQgZG9lc24ndCBzdXBwb3J0XG4gICAgICAvLyA8dGVtcGxhdGU+IHN1cHBvcnQgbm90IGF2YWlsYWJsZSBpbiBJRVxuICAgICAgcmV0dXJuIGNyZWF0ZUZyYWdtZW50RnJvbVRlbXBsYXRlKHN0cik7XG4gICAgfSBlbHNlIGlmIChIQVNfUkFOR0VfU1VQUE9SVCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZUZyYWdtZW50RnJvbVJhbmdlKHN0cik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUZyYWdtZW50RnJvbVdyYXAoc3RyKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdHdvIG5vZGUncyBuYW1lcyBhcmUgdGhlIHNhbWUuXG4gKlxuICogTk9URTogV2UgZG9uJ3QgYm90aGVyIGNoZWNraW5nIGBuYW1lc3BhY2VVUklgIGJlY2F1c2UgeW91IHdpbGwgbmV2ZXIgZmluZCB0d28gSFRNTCBlbGVtZW50cyB3aXRoIHRoZSBzYW1lXG4gKiAgICAgICBub2RlTmFtZSBhbmQgZGlmZmVyZW50IG5hbWVzcGFjZSBVUklzLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gYVxuICogQHBhcmFtIHtFbGVtZW50fSBiIFRoZSB0YXJnZXQgZWxlbWVudFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gY29tcGFyZU5vZGVOYW1lcyhmcm9tRWwsIHRvRWwpIHtcbiAgICB2YXIgZnJvbU5vZGVOYW1lID0gZnJvbUVsLm5vZGVOYW1lO1xuICAgIHZhciB0b05vZGVOYW1lID0gdG9FbC5ub2RlTmFtZTtcbiAgICB2YXIgZnJvbUNvZGVTdGFydCwgdG9Db2RlU3RhcnQ7XG5cbiAgICBpZiAoZnJvbU5vZGVOYW1lID09PSB0b05vZGVOYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZyb21Db2RlU3RhcnQgPSBmcm9tTm9kZU5hbWUuY2hhckNvZGVBdCgwKTtcbiAgICB0b0NvZGVTdGFydCA9IHRvTm9kZU5hbWUuY2hhckNvZGVBdCgwKTtcblxuICAgIC8vIElmIHRoZSB0YXJnZXQgZWxlbWVudCBpcyBhIHZpcnR1YWwgRE9NIG5vZGUgb3IgU1ZHIG5vZGUgdGhlbiB3ZSBtYXlcbiAgICAvLyBuZWVkIHRvIG5vcm1hbGl6ZSB0aGUgdGFnIG5hbWUgYmVmb3JlIGNvbXBhcmluZy4gTm9ybWFsIEhUTUwgZWxlbWVudHMgdGhhdCBhcmVcbiAgICAvLyBpbiB0aGUgXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCJcbiAgICAvLyBhcmUgY29udmVydGVkIHRvIHVwcGVyIGNhc2VcbiAgICBpZiAoZnJvbUNvZGVTdGFydCA8PSA5MCAmJiB0b0NvZGVTdGFydCA+PSA5NykgeyAvLyBmcm9tIGlzIHVwcGVyIGFuZCB0byBpcyBsb3dlclxuICAgICAgICByZXR1cm4gZnJvbU5vZGVOYW1lID09PSB0b05vZGVOYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgfSBlbHNlIGlmICh0b0NvZGVTdGFydCA8PSA5MCAmJiBmcm9tQ29kZVN0YXJ0ID49IDk3KSB7IC8vIHRvIGlzIHVwcGVyIGFuZCBmcm9tIGlzIGxvd2VyXG4gICAgICAgIHJldHVybiB0b05vZGVOYW1lID09PSBmcm9tTm9kZU5hbWUudG9VcHBlckNhc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBlbGVtZW50LCBvcHRpb25hbGx5IHdpdGggYSBrbm93biBuYW1lc3BhY2UgVVJJLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIHRoZSBlbGVtZW50IG5hbWUsIGUuZy4gJ2Rpdicgb3IgJ3N2ZydcbiAqIEBwYXJhbSB7c3RyaW5nfSBbbmFtZXNwYWNlVVJJXSB0aGUgZWxlbWVudCdzIG5hbWVzcGFjZSBVUkksIGkuZS4gdGhlIHZhbHVlIG9mXG4gKiBpdHMgYHhtbG5zYCBhdHRyaWJ1dGUgb3IgaXRzIGluZmVycmVkIG5hbWVzcGFjZS5cbiAqXG4gKiBAcmV0dXJuIHtFbGVtZW50fVxuICovXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50TlMobmFtZSwgbmFtZXNwYWNlVVJJKSB7XG4gICAgcmV0dXJuICFuYW1lc3BhY2VVUkkgfHwgbmFtZXNwYWNlVVJJID09PSBOU19YSFRNTCA/XG4gICAgICAgIGRvYy5jcmVhdGVFbGVtZW50KG5hbWUpIDpcbiAgICAgICAgZG9jLmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIG5hbWUpO1xufVxuXG4vKipcbiAqIENvcGllcyB0aGUgY2hpbGRyZW4gb2Ygb25lIERPTSBlbGVtZW50IHRvIGFub3RoZXIgRE9NIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gbW92ZUNoaWxkcmVuKGZyb21FbCwgdG9FbCkge1xuICAgIHZhciBjdXJDaGlsZCA9IGZyb21FbC5maXJzdENoaWxkO1xuICAgIHdoaWxlIChjdXJDaGlsZCkge1xuICAgICAgICB2YXIgbmV4dENoaWxkID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgIHRvRWwuYXBwZW5kQ2hpbGQoY3VyQ2hpbGQpO1xuICAgICAgICBjdXJDaGlsZCA9IG5leHRDaGlsZDtcbiAgICB9XG4gICAgcmV0dXJuIHRvRWw7XG59XG5cbmZ1bmN0aW9uIHN5bmNCb29sZWFuQXR0clByb3AoZnJvbUVsLCB0b0VsLCBuYW1lKSB7XG4gICAgaWYgKGZyb21FbFtuYW1lXSAhPT0gdG9FbFtuYW1lXSkge1xuICAgICAgICBmcm9tRWxbbmFtZV0gPSB0b0VsW25hbWVdO1xuICAgICAgICBpZiAoZnJvbUVsW25hbWVdKSB7XG4gICAgICAgICAgICBmcm9tRWwuc2V0QXR0cmlidXRlKG5hbWUsICcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZyb21FbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbnZhciBzcGVjaWFsRWxIYW5kbGVycyA9IHtcbiAgICBPUFRJT046IGZ1bmN0aW9uKGZyb21FbCwgdG9FbCkge1xuICAgICAgICB2YXIgcGFyZW50Tm9kZSA9IGZyb21FbC5wYXJlbnROb2RlO1xuICAgICAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgdmFyIHBhcmVudE5hbWUgPSBwYXJlbnROb2RlLm5vZGVOYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAocGFyZW50TmFtZSA9PT0gJ09QVEdST1VQJykge1xuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUgPSBwYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgcGFyZW50TmFtZSA9IHBhcmVudE5vZGUgJiYgcGFyZW50Tm9kZS5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcmVudE5hbWUgPT09ICdTRUxFQ1QnICYmICFwYXJlbnROb2RlLmhhc0F0dHJpYnV0ZSgnbXVsdGlwbGUnKSkge1xuICAgICAgICAgICAgICAgIGlmIChmcm9tRWwuaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpICYmICF0b0VsLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdvcmthcm91bmQgZm9yIE1TIEVkZ2UgYnVnIHdoZXJlIHRoZSAnc2VsZWN0ZWQnIGF0dHJpYnV0ZSBjYW4gb25seSBiZVxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmVkIGlmIHNldCB0byBhIG5vbi1lbXB0eSB2YWx1ZTpcbiAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubWljcm9zb2Z0LmNvbS9lbi11cy9taWNyb3NvZnQtZWRnZS9wbGF0Zm9ybS9pc3N1ZXMvMTIwODc2NzkvXG4gICAgICAgICAgICAgICAgICAgIGZyb21FbC5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGZyb21FbC5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gcmVzZXQgc2VsZWN0IGVsZW1lbnQncyBzZWxlY3RlZEluZGV4IHRvIC0xLCBvdGhlcndpc2Ugc2V0dGluZ1xuICAgICAgICAgICAgICAgIC8vIGZyb21FbC5zZWxlY3RlZCB1c2luZyB0aGUgc3luY0Jvb2xlYW5BdHRyUHJvcCBiZWxvdyBoYXMgbm8gZWZmZWN0LlxuICAgICAgICAgICAgICAgIC8vIFRoZSBjb3JyZWN0IHNlbGVjdGVkSW5kZXggd2lsbCBiZSBzZXQgaW4gdGhlIFNFTEVDVCBzcGVjaWFsIGhhbmRsZXIgYmVsb3cuXG4gICAgICAgICAgICAgICAgcGFyZW50Tm9kZS5zZWxlY3RlZEluZGV4ID0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3luY0Jvb2xlYW5BdHRyUHJvcChmcm9tRWwsIHRvRWwsICdzZWxlY3RlZCcpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogVGhlIFwidmFsdWVcIiBhdHRyaWJ1dGUgaXMgc3BlY2lhbCBmb3IgdGhlIDxpbnB1dD4gZWxlbWVudCBzaW5jZSBpdCBzZXRzXG4gICAgICogdGhlIGluaXRpYWwgdmFsdWUuIENoYW5naW5nIHRoZSBcInZhbHVlXCIgYXR0cmlidXRlIHdpdGhvdXQgY2hhbmdpbmcgdGhlXG4gICAgICogXCJ2YWx1ZVwiIHByb3BlcnR5IHdpbGwgaGF2ZSBubyBlZmZlY3Qgc2luY2UgaXQgaXMgb25seSB1c2VkIHRvIHRoZSBzZXQgdGhlXG4gICAgICogaW5pdGlhbCB2YWx1ZS4gIFNpbWlsYXIgZm9yIHRoZSBcImNoZWNrZWRcIiBhdHRyaWJ1dGUsIGFuZCBcImRpc2FibGVkXCIuXG4gICAgICovXG4gICAgSU5QVVQ6IGZ1bmN0aW9uKGZyb21FbCwgdG9FbCkge1xuICAgICAgICBzeW5jQm9vbGVhbkF0dHJQcm9wKGZyb21FbCwgdG9FbCwgJ2NoZWNrZWQnKTtcbiAgICAgICAgc3luY0Jvb2xlYW5BdHRyUHJvcChmcm9tRWwsIHRvRWwsICdkaXNhYmxlZCcpO1xuXG4gICAgICAgIGlmIChmcm9tRWwudmFsdWUgIT09IHRvRWwudmFsdWUpIHtcbiAgICAgICAgICAgIGZyb21FbC52YWx1ZSA9IHRvRWwudmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRvRWwuaGFzQXR0cmlidXRlKCd2YWx1ZScpKSB7XG4gICAgICAgICAgICBmcm9tRWwucmVtb3ZlQXR0cmlidXRlKCd2YWx1ZScpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIFRFWFRBUkVBOiBmdW5jdGlvbihmcm9tRWwsIHRvRWwpIHtcbiAgICAgICAgdmFyIG5ld1ZhbHVlID0gdG9FbC52YWx1ZTtcbiAgICAgICAgaWYgKGZyb21FbC52YWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGZyb21FbC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZpcnN0Q2hpbGQgPSBmcm9tRWwuZmlyc3RDaGlsZDtcbiAgICAgICAgaWYgKGZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIC8vIE5lZWRlZCBmb3IgSUUuIEFwcGFyZW50bHkgSUUgc2V0cyB0aGUgcGxhY2Vob2xkZXIgYXMgdGhlXG4gICAgICAgICAgICAvLyBub2RlIHZhbHVlIGFuZCB2aXNlIHZlcnNhLiBUaGlzIGlnbm9yZXMgYW4gZW1wdHkgdXBkYXRlLlxuICAgICAgICAgICAgdmFyIG9sZFZhbHVlID0gZmlyc3RDaGlsZC5ub2RlVmFsdWU7XG5cbiAgICAgICAgICAgIGlmIChvbGRWYWx1ZSA9PSBuZXdWYWx1ZSB8fCAoIW5ld1ZhbHVlICYmIG9sZFZhbHVlID09IGZyb21FbC5wbGFjZWhvbGRlcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZpcnN0Q2hpbGQubm9kZVZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFNFTEVDVDogZnVuY3Rpb24oZnJvbUVsLCB0b0VsKSB7XG4gICAgICAgIGlmICghdG9FbC5oYXNBdHRyaWJ1dGUoJ211bHRpcGxlJykpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZEluZGV4ID0gLTE7XG4gICAgICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgICAgICAvLyBXZSBoYXZlIHRvIGxvb3AgdGhyb3VnaCBjaGlsZHJlbiBvZiBmcm9tRWwsIG5vdCB0b0VsIHNpbmNlIG5vZGVzIGNhbiBiZSBtb3ZlZFxuICAgICAgICAgICAgLy8gZnJvbSB0b0VsIHRvIGZyb21FbCBkaXJlY3RseSB3aGVuIG1vcnBoaW5nLlxuICAgICAgICAgICAgLy8gQXQgdGhlIHRpbWUgdGhpcyBzcGVjaWFsIGhhbmRsZXIgaXMgaW52b2tlZCwgYWxsIGNoaWxkcmVuIGhhdmUgYWxyZWFkeSBiZWVuIG1vcnBoZWRcbiAgICAgICAgICAgIC8vIGFuZCBhcHBlbmRlZCB0byAvIHJlbW92ZWQgZnJvbSBmcm9tRWwsIHNvIHVzaW5nIGZyb21FbCBoZXJlIGlzIHNhZmUgYW5kIGNvcnJlY3QuXG4gICAgICAgICAgICB2YXIgY3VyQ2hpbGQgPSBmcm9tRWwuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgIHZhciBvcHRncm91cDtcbiAgICAgICAgICAgIHZhciBub2RlTmFtZTtcbiAgICAgICAgICAgIHdoaWxlKGN1ckNoaWxkKSB7XG4gICAgICAgICAgICAgICAgbm9kZU5hbWUgPSBjdXJDaGlsZC5ub2RlTmFtZSAmJiBjdXJDaGlsZC5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIGlmIChub2RlTmFtZSA9PT0gJ09QVEdST1VQJykge1xuICAgICAgICAgICAgICAgICAgICBvcHRncm91cCA9IGN1ckNoaWxkO1xuICAgICAgICAgICAgICAgICAgICBjdXJDaGlsZCA9IG9wdGdyb3VwLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGVOYW1lID09PSAnT1BUSU9OJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckNoaWxkLmhhc0F0dHJpYnV0ZSgnc2VsZWN0ZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN1ckNoaWxkID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY3VyQ2hpbGQgJiYgb3B0Z3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ckNoaWxkID0gb3B0Z3JvdXAubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRncm91cCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZyb21FbC5zZWxlY3RlZEluZGV4ID0gc2VsZWN0ZWRJbmRleDtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciBFTEVNRU5UX05PREUgPSAxO1xudmFyIERPQ1VNRU5UX0ZSQUdNRU5UX05PREUkMSA9IDExO1xudmFyIFRFWFRfTk9ERSA9IDM7XG52YXIgQ09NTUVOVF9OT0RFID0gODtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbmZ1bmN0aW9uIGRlZmF1bHRHZXROb2RlS2V5KG5vZGUpIHtcbiAgaWYgKG5vZGUpIHtcbiAgICAgIHJldHVybiAobm9kZS5nZXRBdHRyaWJ1dGUgJiYgbm9kZS5nZXRBdHRyaWJ1dGUoJ2lkJykpIHx8IG5vZGUuaWQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gbW9ycGhkb21GYWN0b3J5KG1vcnBoQXR0cnMpIHtcblxuICAgIHJldHVybiBmdW5jdGlvbiBtb3JwaGRvbShmcm9tTm9kZSwgdG9Ob2RlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucykge1xuICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0b05vZGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoZnJvbU5vZGUubm9kZU5hbWUgPT09ICcjZG9jdW1lbnQnIHx8IGZyb21Ob2RlLm5vZGVOYW1lID09PSAnSFRNTCcgfHwgZnJvbU5vZGUubm9kZU5hbWUgPT09ICdCT0RZJykge1xuICAgICAgICAgICAgICAgIHZhciB0b05vZGVIdG1sID0gdG9Ob2RlO1xuICAgICAgICAgICAgICAgIHRvTm9kZSA9IGRvYy5jcmVhdGVFbGVtZW50KCdodG1sJyk7XG4gICAgICAgICAgICAgICAgdG9Ob2RlLmlubmVySFRNTCA9IHRvTm9kZUh0bWw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvTm9kZSA9IHRvRWxlbWVudCh0b05vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGdldE5vZGVLZXkgPSBvcHRpb25zLmdldE5vZGVLZXkgfHwgZGVmYXVsdEdldE5vZGVLZXk7XG4gICAgICAgIHZhciBvbkJlZm9yZU5vZGVBZGRlZCA9IG9wdGlvbnMub25CZWZvcmVOb2RlQWRkZWQgfHwgbm9vcDtcbiAgICAgICAgdmFyIG9uTm9kZUFkZGVkID0gb3B0aW9ucy5vbk5vZGVBZGRlZCB8fCBub29wO1xuICAgICAgICB2YXIgb25CZWZvcmVFbFVwZGF0ZWQgPSBvcHRpb25zLm9uQmVmb3JlRWxVcGRhdGVkIHx8IG5vb3A7XG4gICAgICAgIHZhciBvbkVsVXBkYXRlZCA9IG9wdGlvbnMub25FbFVwZGF0ZWQgfHwgbm9vcDtcbiAgICAgICAgdmFyIG9uQmVmb3JlTm9kZURpc2NhcmRlZCA9IG9wdGlvbnMub25CZWZvcmVOb2RlRGlzY2FyZGVkIHx8IG5vb3A7XG4gICAgICAgIHZhciBvbk5vZGVEaXNjYXJkZWQgPSBvcHRpb25zLm9uTm9kZURpc2NhcmRlZCB8fCBub29wO1xuICAgICAgICB2YXIgb25CZWZvcmVFbENoaWxkcmVuVXBkYXRlZCA9IG9wdGlvbnMub25CZWZvcmVFbENoaWxkcmVuVXBkYXRlZCB8fCBub29wO1xuICAgICAgICB2YXIgY2hpbGRyZW5Pbmx5ID0gb3B0aW9ucy5jaGlsZHJlbk9ubHkgPT09IHRydWU7XG5cbiAgICAgICAgLy8gVGhpcyBvYmplY3QgaXMgdXNlZCBhcyBhIGxvb2t1cCB0byBxdWlja2x5IGZpbmQgYWxsIGtleWVkIGVsZW1lbnRzIGluIHRoZSBvcmlnaW5hbCBET00gdHJlZS5cbiAgICAgICAgdmFyIGZyb21Ob2Rlc0xvb2t1cCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHZhciBrZXllZFJlbW92YWxMaXN0ID0gW107XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkS2V5ZWRSZW1vdmFsKGtleSkge1xuICAgICAgICAgICAga2V5ZWRSZW1vdmFsTGlzdC5wdXNoKGtleSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB3YWxrRGlzY2FyZGVkQ2hpbGROb2Rlcyhub2RlLCBza2lwS2V5ZWROb2Rlcykge1xuICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAgIHZhciBjdXJDaGlsZCA9IG5vZGUuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoY3VyQ2hpbGQpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChza2lwS2V5ZWROb2RlcyAmJiAoa2V5ID0gZ2V0Tm9kZUtleShjdXJDaGlsZCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBhcmUgc2tpcHBpbmcga2V5ZWQgbm9kZXMgdGhlbiB3ZSBhZGQgdGhlIGtleVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBsaXN0IHNvIHRoYXQgaXQgY2FuIGJlIGhhbmRsZWQgYXQgdGhlIHZlcnkgZW5kLlxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkS2V5ZWRSZW1vdmFsKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IHJlcG9ydCB0aGUgbm9kZSBhcyBkaXNjYXJkZWQgaWYgaXQgaXMgbm90IGtleWVkLiBXZSBkbyB0aGlzIGJlY2F1c2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGF0IHRoZSBlbmQgd2UgbG9vcCB0aHJvdWdoIGFsbCBrZXllZCBlbGVtZW50cyB0aGF0IHdlcmUgdW5tYXRjaGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhbmQgdGhlbiBkaXNjYXJkIHRoZW0gaW4gb25lIGZpbmFsIHBhc3MuXG4gICAgICAgICAgICAgICAgICAgICAgICBvbk5vZGVEaXNjYXJkZWQoY3VyQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckNoaWxkLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWxrRGlzY2FyZGVkQ2hpbGROb2RlcyhjdXJDaGlsZCwgc2tpcEtleWVkTm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY3VyQ2hpbGQgPSBjdXJDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlcyBhIERPTSBub2RlIG91dCBvZiB0aGUgb3JpZ2luYWwgRE9NXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSAge05vZGV9IG5vZGUgVGhlIG5vZGUgdG8gcmVtb3ZlXG4gICAgICAgICAqIEBwYXJhbSAge05vZGV9IHBhcmVudE5vZGUgVGhlIG5vZGVzIHBhcmVudFxuICAgICAgICAgKiBAcGFyYW0gIHtCb29sZWFufSBza2lwS2V5ZWROb2RlcyBJZiB0cnVlIHRoZW4gZWxlbWVudHMgd2l0aCBrZXlzIHdpbGwgYmUgc2tpcHBlZCBhbmQgbm90IGRpc2NhcmRlZC5cbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gcmVtb3ZlTm9kZShub2RlLCBwYXJlbnROb2RlLCBza2lwS2V5ZWROb2Rlcykge1xuICAgICAgICAgICAgaWYgKG9uQmVmb3JlTm9kZURpc2NhcmRlZChub2RlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb25Ob2RlRGlzY2FyZGVkKG5vZGUpO1xuICAgICAgICAgICAgd2Fsa0Rpc2NhcmRlZENoaWxkTm9kZXMobm9kZSwgc2tpcEtleWVkTm9kZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gLy8gVHJlZVdhbGtlciBpbXBsZW1lbnRhdGlvbiBpcyBubyBmYXN0ZXIsIGJ1dCBrZWVwaW5nIHRoaXMgYXJvdW5kIGluIGNhc2UgdGhpcyBjaGFuZ2VzIGluIHRoZSBmdXR1cmVcbiAgICAgICAgLy8gZnVuY3Rpb24gaW5kZXhUcmVlKHJvb3QpIHtcbiAgICAgICAgLy8gICAgIHZhciB0cmVlV2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihcbiAgICAgICAgLy8gICAgICAgICByb290LFxuICAgICAgICAvLyAgICAgICAgIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5UKTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIHZhciBlbDtcbiAgICAgICAgLy8gICAgIHdoaWxlKChlbCA9IHRyZWVXYWxrZXIubmV4dE5vZGUoKSkpIHtcbiAgICAgICAgLy8gICAgICAgICB2YXIga2V5ID0gZ2V0Tm9kZUtleShlbCk7XG4gICAgICAgIC8vICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAvLyAgICAgICAgICAgICBmcm9tTm9kZXNMb29rdXBba2V5XSA9IGVsO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIC8vIE5vZGVJdGVyYXRvciBpbXBsZW1lbnRhdGlvbiBpcyBubyBmYXN0ZXIsIGJ1dCBrZWVwaW5nIHRoaXMgYXJvdW5kIGluIGNhc2UgdGhpcyBjaGFuZ2VzIGluIHRoZSBmdXR1cmVcbiAgICAgICAgLy9cbiAgICAgICAgLy8gZnVuY3Rpb24gaW5kZXhUcmVlKG5vZGUpIHtcbiAgICAgICAgLy8gICAgIHZhciBub2RlSXRlcmF0b3IgPSBkb2N1bWVudC5jcmVhdGVOb2RlSXRlcmF0b3Iobm9kZSwgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQpO1xuICAgICAgICAvLyAgICAgdmFyIGVsO1xuICAgICAgICAvLyAgICAgd2hpbGUoKGVsID0gbm9kZUl0ZXJhdG9yLm5leHROb2RlKCkpKSB7XG4gICAgICAgIC8vICAgICAgICAgdmFyIGtleSA9IGdldE5vZGVLZXkoZWwpO1xuICAgICAgICAvLyAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgZnJvbU5vZGVzTG9va3VwW2tleV0gPSBlbDtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cblxuICAgICAgICBmdW5jdGlvbiBpbmRleFRyZWUobm9kZSkge1xuICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSB8fCBub2RlLm5vZGVUeXBlID09PSBET0NVTUVOVF9GUkFHTUVOVF9OT0RFJDEpIHtcbiAgICAgICAgICAgICAgICB2YXIgY3VyQ2hpbGQgPSBub2RlLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGN1ckNoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBrZXkgPSBnZXROb2RlS2V5KGN1ckNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbU5vZGVzTG9va3VwW2tleV0gPSBjdXJDaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFdhbGsgcmVjdXJzaXZlbHlcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhUcmVlKGN1ckNoaWxkKTtcblxuICAgICAgICAgICAgICAgICAgICBjdXJDaGlsZCA9IGN1ckNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGluZGV4VHJlZShmcm9tTm9kZSk7XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlTm9kZUFkZGVkKGVsKSB7XG4gICAgICAgICAgICBvbk5vZGVBZGRlZChlbCk7XG5cbiAgICAgICAgICAgIHZhciBjdXJDaGlsZCA9IGVsLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB3aGlsZSAoY3VyQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dFNpYmxpbmcgPSBjdXJDaGlsZC5uZXh0U2libGluZztcblxuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBnZXROb2RlS2V5KGN1ckNoaWxkKTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB1bm1hdGNoZWRGcm9tRWwgPSBmcm9tTm9kZXNMb29rdXBba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgd2UgZmluZCBhIGR1cGxpY2F0ZSAjaWQgbm9kZSBpbiBjYWNoZSwgcmVwbGFjZSBgZWxgIHdpdGggY2FjaGUgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5kIG1vcnBoIGl0IHRvIHRoZSBjaGlsZCBub2RlLlxuICAgICAgICAgICAgICAgICAgICBpZiAodW5tYXRjaGVkRnJvbUVsICYmIGNvbXBhcmVOb2RlTmFtZXMoY3VyQ2hpbGQsIHVubWF0Y2hlZEZyb21FbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ckNoaWxkLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHVubWF0Y2hlZEZyb21FbCwgY3VyQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9ycGhFbCh1bm1hdGNoZWRGcm9tRWwsIGN1ckNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVOb2RlQWRkZWQoY3VyQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vIHJlY3Vyc2l2ZWx5IGNhbGwgZm9yIGN1ckNoaWxkIGFuZCBpdCdzIGNoaWxkcmVuIHRvIHNlZSBpZiB3ZSBmaW5kIHNvbWV0aGluZyBpblxuICAgICAgICAgICAgICAgICAgLy8gZnJvbU5vZGVzTG9va3VwXG4gICAgICAgICAgICAgICAgICBoYW5kbGVOb2RlQWRkZWQoY3VyQ2hpbGQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGN1ckNoaWxkID0gbmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjbGVhbnVwRnJvbUVsKGZyb21FbCwgY3VyRnJvbU5vZGVDaGlsZCwgY3VyRnJvbU5vZGVLZXkpIHtcbiAgICAgICAgICAgIC8vIFdlIGhhdmUgcHJvY2Vzc2VkIGFsbCBvZiB0aGUgXCJ0byBub2Rlc1wiLiBJZiBjdXJGcm9tTm9kZUNoaWxkIGlzXG4gICAgICAgICAgICAvLyBub24tbnVsbCB0aGVuIHdlIHN0aWxsIGhhdmUgc29tZSBmcm9tIG5vZGVzIGxlZnQgb3ZlciB0aGF0IG5lZWRcbiAgICAgICAgICAgIC8vIHRvIGJlIHJlbW92ZWRcbiAgICAgICAgICAgIHdoaWxlIChjdXJGcm9tTm9kZUNoaWxkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZyb21OZXh0U2libGluZyA9IGN1ckZyb21Ob2RlQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgaWYgKChjdXJGcm9tTm9kZUtleSA9IGdldE5vZGVLZXkoY3VyRnJvbU5vZGVDaGlsZCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBub2RlIGlzIGtleWVkIGl0IG1pZ2h0IGJlIG1hdGNoZWQgdXAgbGF0ZXIgc28gd2UgZGVmZXJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGFjdHVhbCByZW1vdmFsIHRvIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgIGFkZEtleWVkUmVtb3ZhbChjdXJGcm9tTm9kZUtleSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTk9URTogd2Ugc2tpcCBuZXN0ZWQga2V5ZWQgbm9kZXMgZnJvbSBiZWluZyByZW1vdmVkIHNpbmNlIHRoZXJlIGlzXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgIHN0aWxsIGEgY2hhbmNlIHRoZXkgd2lsbCBiZSBtYXRjaGVkIHVwIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZU5vZGUoY3VyRnJvbU5vZGVDaGlsZCwgZnJvbUVsLCB0cnVlIC8qIHNraXAga2V5ZWQgbm9kZXMgKi8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbW9ycGhFbChmcm9tRWwsIHRvRWwsIGNoaWxkcmVuT25seSkge1xuICAgICAgICAgICAgdmFyIHRvRWxLZXkgPSBnZXROb2RlS2V5KHRvRWwpO1xuXG4gICAgICAgICAgICBpZiAodG9FbEtleSkge1xuICAgICAgICAgICAgICAgIC8vIElmIGFuIGVsZW1lbnQgd2l0aCBhbiBJRCBpcyBiZWluZyBtb3JwaGVkIHRoZW4gaXQgd2lsbCBiZSBpbiB0aGUgZmluYWxcbiAgICAgICAgICAgICAgICAvLyBET00gc28gY2xlYXIgaXQgb3V0IG9mIHRoZSBzYXZlZCBlbGVtZW50cyBjb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgZGVsZXRlIGZyb21Ob2Rlc0xvb2t1cFt0b0VsS2V5XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFjaGlsZHJlbk9ubHkpIHtcbiAgICAgICAgICAgICAgICAvLyBvcHRpb25hbFxuICAgICAgICAgICAgICAgIGlmIChvbkJlZm9yZUVsVXBkYXRlZChmcm9tRWwsIHRvRWwpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIGF0dHJpYnV0ZXMgb24gb3JpZ2luYWwgRE9NIGVsZW1lbnQgZmlyc3RcbiAgICAgICAgICAgICAgICBtb3JwaEF0dHJzKGZyb21FbCwgdG9FbCk7XG4gICAgICAgICAgICAgICAgLy8gb3B0aW9uYWxcbiAgICAgICAgICAgICAgICBvbkVsVXBkYXRlZChmcm9tRWwpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG9uQmVmb3JlRWxDaGlsZHJlblVwZGF0ZWQoZnJvbUVsLCB0b0VsKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGZyb21FbC5ub2RlTmFtZSAhPT0gJ1RFWFRBUkVBJykge1xuICAgICAgICAgICAgICBtb3JwaENoaWxkcmVuKGZyb21FbCwgdG9FbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzcGVjaWFsRWxIYW5kbGVycy5URVhUQVJFQShmcm9tRWwsIHRvRWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbW9ycGhDaGlsZHJlbihmcm9tRWwsIHRvRWwpIHtcbiAgICAgICAgICAgIHZhciBjdXJUb05vZGVDaGlsZCA9IHRvRWwuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgIHZhciBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbUVsLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB2YXIgY3VyVG9Ob2RlS2V5O1xuICAgICAgICAgICAgdmFyIGN1ckZyb21Ob2RlS2V5O1xuXG4gICAgICAgICAgICB2YXIgZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgdmFyIHRvTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB2YXIgbWF0Y2hpbmdGcm9tRWw7XG5cbiAgICAgICAgICAgIC8vIHdhbGsgdGhlIGNoaWxkcmVuXG4gICAgICAgICAgICBvdXRlcjogd2hpbGUgKGN1clRvTm9kZUNoaWxkKSB7XG4gICAgICAgICAgICAgICAgdG9OZXh0U2libGluZyA9IGN1clRvTm9kZUNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGN1clRvTm9kZUtleSA9IGdldE5vZGVLZXkoY3VyVG9Ob2RlQ2hpbGQpO1xuXG4gICAgICAgICAgICAgICAgLy8gd2FsayB0aGUgZnJvbU5vZGUgY2hpbGRyZW4gYWxsIHRoZSB3YXkgdGhyb3VnaFxuICAgICAgICAgICAgICAgIHdoaWxlIChjdXJGcm9tTm9kZUNoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyb21OZXh0U2libGluZyA9IGN1ckZyb21Ob2RlQ2hpbGQubmV4dFNpYmxpbmc7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1clRvTm9kZUNoaWxkLmlzU2FtZU5vZGUgJiYgY3VyVG9Ob2RlQ2hpbGQuaXNTYW1lTm9kZShjdXJGcm9tTm9kZUNoaWxkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VyVG9Ob2RlQ2hpbGQgPSB0b05leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVLZXkgPSBnZXROb2RlS2V5KGN1ckZyb21Ob2RlQ2hpbGQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJGcm9tTm9kZVR5cGUgPSBjdXJGcm9tTm9kZUNoaWxkLm5vZGVUeXBlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgbWVhbnMgaWYgdGhlIGN1ckZyb21Ob2RlQ2hpbGQgZG9lc250IGhhdmUgYSBtYXRjaCB3aXRoIHRoZSBjdXJUb05vZGVDaGlsZFxuICAgICAgICAgICAgICAgICAgICB2YXIgaXNDb21wYXRpYmxlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJGcm9tTm9kZVR5cGUgPT09IGN1clRvTm9kZUNoaWxkLm5vZGVUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBCb3RoIG5vZGVzIGJlaW5nIGNvbXBhcmVkIGFyZSBFbGVtZW50IG5vZGVzXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyVG9Ob2RlS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSB0YXJnZXQgbm9kZSBoYXMgYSBrZXkgc28gd2Ugd2FudCB0byBtYXRjaCBpdCB1cCB3aXRoIHRoZSBjb3JyZWN0IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW4gdGhlIG9yaWdpbmFsIERPTSB0cmVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJUb05vZGVLZXkgIT09IGN1ckZyb21Ob2RlS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgY3VycmVudCBlbGVtZW50IGluIHRoZSBvcmlnaW5hbCBET00gdHJlZSBkb2VzIG5vdCBoYXZlIGEgbWF0Y2hpbmcga2V5IHNvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQncyBjaGVjayBvdXIgbG9va3VwIHRvIHNlZSBpZiB0aGVyZSBpcyBhIG1hdGNoaW5nIGVsZW1lbnQgaW4gdGhlIG9yaWdpbmFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBET00gdHJlZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChtYXRjaGluZ0Zyb21FbCA9IGZyb21Ob2Rlc0xvb2t1cFtjdXJUb05vZGVLZXldKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmcm9tTmV4dFNpYmxpbmcgPT09IG1hdGNoaW5nRnJvbUVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNwZWNpYWwgY2FzZSBmb3Igc2luZ2xlIGVsZW1lbnQgcmVtb3ZhbHMuIFRvIGF2b2lkIHJlbW92aW5nIHRoZSBvcmlnaW5hbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBET00gbm9kZSBvdXQgb2YgdGhlIHRyZWUgKHNpbmNlIHRoYXQgY2FuIGJyZWFrIENTUyB0cmFuc2l0aW9ucywgZXRjLiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlIHdpbGwgaW5zdGVhZCBkaXNjYXJkIHRoZSBjdXJyZW50IG5vZGUgYW5kIHdhaXQgdW50aWwgdGhlIG5leHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXRlcmF0aW9uIHRvIHByb3Blcmx5IG1hdGNoIHVwIHRoZSBrZXllZCB0YXJnZXQgZWxlbWVudCB3aXRoIGl0cyBtYXRjaGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlbGVtZW50IGluIHRoZSBvcmlnaW5hbCB0cmVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGZvdW5kIGEgbWF0Y2hpbmcga2V5ZWQgZWxlbWVudCBzb21ld2hlcmUgaW4gdGhlIG9yaWdpbmFsIERPTSB0cmVlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBMZXQncyBtb3ZlIHRoZSBvcmlnaW5hbCBET00gbm9kZSBpbnRvIHRoZSBjdXJyZW50IHBvc2l0aW9uIGFuZCBtb3JwaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpdC5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiBXZSB1c2UgaW5zZXJ0QmVmb3JlIGluc3RlYWQgb2YgcmVwbGFjZUNoaWxkIGJlY2F1c2Ugd2Ugd2FudCB0byBnbyB0aHJvdWdoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBgcmVtb3ZlTm9kZSgpYCBmdW5jdGlvbiBmb3IgdGhlIG5vZGUgdGhhdCBpcyBiZWluZyBkaXNjYXJkZWQgc28gdGhhdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbGwgbGlmZWN5Y2xlIGhvb2tzIGFyZSBjb3JyZWN0bHkgaW52b2tlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tRWwuaW5zZXJ0QmVmb3JlKG1hdGNoaW5nRnJvbUVsLCBjdXJGcm9tTm9kZUNoaWxkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmcm9tTmV4dFNpYmxpbmcgPSBjdXJGcm9tTm9kZUNoaWxkLm5leHRTaWJsaW5nO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJGcm9tTm9kZUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2luY2UgdGhlIG5vZGUgaXMga2V5ZWQgaXQgbWlnaHQgYmUgbWF0Y2hlZCB1cCBsYXRlciBzbyB3ZSBkZWZlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGFjdHVhbCByZW1vdmFsIHRvIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRLZXllZFJlbW92YWwoY3VyRnJvbU5vZGVLZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTk9URTogd2Ugc2tpcCBuZXN0ZWQga2V5ZWQgbm9kZXMgZnJvbSBiZWluZyByZW1vdmVkIHNpbmNlIHRoZXJlIGlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICBzdGlsbCBhIGNoYW5jZSB0aGV5IHdpbGwgYmUgbWF0Y2hlZCB1cCBsYXRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTm9kZShjdXJGcm9tTm9kZUNoaWxkLCBmcm9tRWwsIHRydWUgLyogc2tpcCBrZXllZCBub2RlcyAqLyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gbWF0Y2hpbmdGcm9tRWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgbm9kZXMgYXJlIG5vdCBjb21wYXRpYmxlIHNpbmNlIHRoZSBcInRvXCIgbm9kZSBoYXMgYSBrZXkgYW5kIHRoZXJlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXMgbm8gbWF0Y2hpbmcga2V5ZWQgbm9kZSBpbiB0aGUgc291cmNlIHRyZWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VyRnJvbU5vZGVLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIG9yaWdpbmFsIGhhcyBhIGtleVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSBpc0NvbXBhdGlibGUgIT09IGZhbHNlICYmIGNvbXBhcmVOb2RlTmFtZXMoY3VyRnJvbU5vZGVDaGlsZCwgY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0NvbXBhdGlibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgZm91bmQgY29tcGF0aWJsZSBET00gZWxlbWVudHMgc28gdHJhbnNmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBjdXJyZW50IFwiZnJvbVwiIG5vZGUgdG8gbWF0Y2ggdGhlIGN1cnJlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGFyZ2V0IERPTSBub2RlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBNT1JQSFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3JwaEVsKGN1ckZyb21Ob2RlQ2hpbGQsIGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VyRnJvbU5vZGVUeXBlID09PSBURVhUX05PREUgfHwgY3VyRnJvbU5vZGVUeXBlID09IENPTU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJvdGggbm9kZXMgYmVpbmcgY29tcGFyZWQgYXJlIFRleHQgb3IgQ29tbWVudCBub2Rlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2ltcGx5IHVwZGF0ZSBub2RlVmFsdWUgb24gdGhlIG9yaWdpbmFsIG5vZGUgdG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGFuZ2UgdGhlIHRleHQgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVDaGlsZC5ub2RlVmFsdWUgIT09IGN1clRvTm9kZUNoaWxkLm5vZGVWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkLm5vZGVWYWx1ZSA9IGN1clRvTm9kZUNoaWxkLm5vZGVWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0NvbXBhdGlibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkdmFuY2UgYm90aCB0aGUgXCJ0b1wiIGNoaWxkIGFuZCB0aGUgXCJmcm9tXCIgY2hpbGQgc2luY2Ugd2UgZm91bmQgYSBtYXRjaFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm90aGluZyBlbHNlIHRvIGRvIGFzIHdlIGFscmVhZHkgcmVjdXJzaXZlbHkgY2FsbGVkIG1vcnBoQ2hpbGRyZW4gYWJvdmVcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1clRvTm9kZUNoaWxkID0gdG9OZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIE5vIGNvbXBhdGlibGUgbWF0Y2ggc28gcmVtb3ZlIHRoZSBvbGQgbm9kZSBmcm9tIHRoZSBET00gYW5kIGNvbnRpbnVlIHRyeWluZyB0byBmaW5kIGFcbiAgICAgICAgICAgICAgICAgICAgLy8gbWF0Y2ggaW4gdGhlIG9yaWdpbmFsIERPTS4gSG93ZXZlciwgd2Ugb25seSBkbyB0aGlzIGlmIHRoZSBmcm9tIG5vZGUgaXMgbm90IGtleWVkXG4gICAgICAgICAgICAgICAgICAgIC8vIHNpbmNlIGl0IGlzIHBvc3NpYmxlIHRoYXQgYSBrZXllZCBub2RlIG1pZ2h0IG1hdGNoIHVwIHdpdGggYSBub2RlIHNvbWV3aGVyZSBlbHNlIGluIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyB0YXJnZXQgdHJlZSBhbmQgd2UgZG9uJ3Qgd2FudCB0byBkaXNjYXJkIGl0IGp1c3QgeWV0IHNpbmNlIGl0IHN0aWxsIG1pZ2h0IGZpbmQgYVxuICAgICAgICAgICAgICAgICAgICAvLyBob21lIGluIHRoZSBmaW5hbCBET00gdHJlZS4gQWZ0ZXIgZXZlcnl0aGluZyBpcyBkb25lIHdlIHdpbGwgcmVtb3ZlIGFueSBrZXllZCBub2Rlc1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGF0IGRpZG4ndCBmaW5kIGEgaG9tZVxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBub2RlIGlzIGtleWVkIGl0IG1pZ2h0IGJlIG1hdGNoZWQgdXAgbGF0ZXIgc28gd2UgZGVmZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBhY3R1YWwgcmVtb3ZhbCB0byBsYXRlclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkS2V5ZWRSZW1vdmFsKGN1ckZyb21Ob2RlS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IHdlIHNraXAgbmVzdGVkIGtleWVkIG5vZGVzIGZyb20gYmVpbmcgcmVtb3ZlZCBzaW5jZSB0aGVyZSBpc1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgc3RpbGwgYSBjaGFuY2UgdGhleSB3aWxsIGJlIG1hdGNoZWQgdXAgbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZU5vZGUoY3VyRnJvbU5vZGVDaGlsZCwgZnJvbUVsLCB0cnVlIC8qIHNraXAga2V5ZWQgbm9kZXMgKi8pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgICAgICB9IC8vIEVORDogd2hpbGUoY3VyRnJvbU5vZGVDaGlsZCkge31cblxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGdvdCB0aGlzIGZhciB0aGVuIHdlIGRpZCBub3QgZmluZCBhIGNhbmRpZGF0ZSBtYXRjaCBmb3JcbiAgICAgICAgICAgICAgICAvLyBvdXIgXCJ0byBub2RlXCIgYW5kIHdlIGV4aGF1c3RlZCBhbGwgb2YgdGhlIGNoaWxkcmVuIFwiZnJvbVwiXG4gICAgICAgICAgICAgICAgLy8gbm9kZXMuIFRoZXJlZm9yZSwgd2Ugd2lsbCBqdXN0IGFwcGVuZCB0aGUgY3VycmVudCBcInRvXCIgbm9kZVxuICAgICAgICAgICAgICAgIC8vIHRvIHRoZSBlbmRcbiAgICAgICAgICAgICAgICBpZiAoY3VyVG9Ob2RlS2V5ICYmIChtYXRjaGluZ0Zyb21FbCA9IGZyb21Ob2Rlc0xvb2t1cFtjdXJUb05vZGVLZXldKSAmJiBjb21wYXJlTm9kZU5hbWVzKG1hdGNoaW5nRnJvbUVsLCBjdXJUb05vZGVDaGlsZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbUVsLmFwcGVuZENoaWxkKG1hdGNoaW5nRnJvbUVsKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gTU9SUEhcbiAgICAgICAgICAgICAgICAgICAgbW9ycGhFbChtYXRjaGluZ0Zyb21FbCwgY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvbkJlZm9yZU5vZGVBZGRlZFJlc3VsdCA9IG9uQmVmb3JlTm9kZUFkZGVkKGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9uQmVmb3JlTm9kZUFkZGVkUmVzdWx0ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uQmVmb3JlTm9kZUFkZGVkUmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyVG9Ob2RlQ2hpbGQgPSBvbkJlZm9yZU5vZGVBZGRlZFJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1clRvTm9kZUNoaWxkLmFjdHVhbGl6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1clRvTm9kZUNoaWxkID0gY3VyVG9Ob2RlQ2hpbGQuYWN0dWFsaXplKGZyb21FbC5vd25lckRvY3VtZW50IHx8IGRvYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9tRWwuYXBwZW5kQ2hpbGQoY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlTm9kZUFkZGVkKGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGN1clRvTm9kZUNoaWxkID0gdG9OZXh0U2libGluZztcbiAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjbGVhbnVwRnJvbUVsKGZyb21FbCwgY3VyRnJvbU5vZGVDaGlsZCwgY3VyRnJvbU5vZGVLZXkpO1xuXG4gICAgICAgICAgICB2YXIgc3BlY2lhbEVsSGFuZGxlciA9IHNwZWNpYWxFbEhhbmRsZXJzW2Zyb21FbC5ub2RlTmFtZV07XG4gICAgICAgICAgICBpZiAoc3BlY2lhbEVsSGFuZGxlcikge1xuICAgICAgICAgICAgICAgIHNwZWNpYWxFbEhhbmRsZXIoZnJvbUVsLCB0b0VsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSAvLyBFTkQ6IG1vcnBoQ2hpbGRyZW4oLi4uKVxuXG4gICAgICAgIHZhciBtb3JwaGVkTm9kZSA9IGZyb21Ob2RlO1xuICAgICAgICB2YXIgbW9ycGhlZE5vZGVUeXBlID0gbW9ycGhlZE5vZGUubm9kZVR5cGU7XG4gICAgICAgIHZhciB0b05vZGVUeXBlID0gdG9Ob2RlLm5vZGVUeXBlO1xuXG4gICAgICAgIGlmICghY2hpbGRyZW5Pbmx5KSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgdGhlIGNhc2Ugd2hlcmUgd2UgYXJlIGdpdmVuIHR3byBET00gbm9kZXMgdGhhdCBhcmUgbm90XG4gICAgICAgICAgICAvLyBjb21wYXRpYmxlIChlLmcuIDxkaXY+IC0tPiA8c3Bhbj4gb3IgPGRpdj4gLS0+IFRFWFQpXG4gICAgICAgICAgICBpZiAobW9ycGhlZE5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICBpZiAodG9Ob2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY29tcGFyZU5vZGVOYW1lcyhmcm9tTm9kZSwgdG9Ob2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25Ob2RlRGlzY2FyZGVkKGZyb21Ob2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vcnBoZWROb2RlID0gbW92ZUNoaWxkcmVuKGZyb21Ob2RlLCBjcmVhdGVFbGVtZW50TlModG9Ob2RlLm5vZGVOYW1lLCB0b05vZGUubmFtZXNwYWNlVVJJKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBHb2luZyBmcm9tIGFuIGVsZW1lbnQgbm9kZSB0byBhIHRleHQgbm9kZVxuICAgICAgICAgICAgICAgICAgICBtb3JwaGVkTm9kZSA9IHRvTm9kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1vcnBoZWROb2RlVHlwZSA9PT0gVEVYVF9OT0RFIHx8IG1vcnBoZWROb2RlVHlwZSA9PT0gQ09NTUVOVF9OT0RFKSB7IC8vIFRleHQgb3IgY29tbWVudCBub2RlXG4gICAgICAgICAgICAgICAgaWYgKHRvTm9kZVR5cGUgPT09IG1vcnBoZWROb2RlVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobW9ycGhlZE5vZGUubm9kZVZhbHVlICE9PSB0b05vZGUubm9kZVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3JwaGVkTm9kZS5ub2RlVmFsdWUgPSB0b05vZGUubm9kZVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vcnBoZWROb2RlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRleHQgbm9kZSB0byBzb21ldGhpbmcgZWxzZVxuICAgICAgICAgICAgICAgICAgICBtb3JwaGVkTm9kZSA9IHRvTm9kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobW9ycGhlZE5vZGUgPT09IHRvTm9kZSkge1xuICAgICAgICAgICAgLy8gVGhlIFwidG8gbm9kZVwiIHdhcyBub3QgY29tcGF0aWJsZSB3aXRoIHRoZSBcImZyb20gbm9kZVwiIHNvIHdlIGhhZCB0b1xuICAgICAgICAgICAgLy8gdG9zcyBvdXQgdGhlIFwiZnJvbSBub2RlXCIgYW5kIHVzZSB0aGUgXCJ0byBub2RlXCJcbiAgICAgICAgICAgIG9uTm9kZURpc2NhcmRlZChmcm9tTm9kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodG9Ob2RlLmlzU2FtZU5vZGUgJiYgdG9Ob2RlLmlzU2FtZU5vZGUobW9ycGhlZE5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtb3JwaEVsKG1vcnBoZWROb2RlLCB0b05vZGUsIGNoaWxkcmVuT25seSk7XG5cbiAgICAgICAgICAgIC8vIFdlIG5vdyBuZWVkIHRvIGxvb3Agb3ZlciBhbnkga2V5ZWQgbm9kZXMgdGhhdCBtaWdodCBuZWVkIHRvIGJlXG4gICAgICAgICAgICAvLyByZW1vdmVkLiBXZSBvbmx5IGRvIHRoZSByZW1vdmFsIGlmIHdlIGtub3cgdGhhdCB0aGUga2V5ZWQgbm9kZVxuICAgICAgICAgICAgLy8gbmV2ZXIgZm91bmQgYSBtYXRjaC4gV2hlbiBhIGtleWVkIG5vZGUgaXMgbWF0Y2hlZCB1cCB3ZSByZW1vdmVcbiAgICAgICAgICAgIC8vIGl0IG91dCBvZiBmcm9tTm9kZXNMb29rdXAgYW5kIHdlIHVzZSBmcm9tTm9kZXNMb29rdXAgdG8gZGV0ZXJtaW5lXG4gICAgICAgICAgICAvLyBpZiBhIGtleWVkIG5vZGUgaGFzIGJlZW4gbWF0Y2hlZCB1cCBvciBub3RcbiAgICAgICAgICAgIGlmIChrZXllZFJlbW92YWxMaXN0KSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaT0wLCBsZW49a2V5ZWRSZW1vdmFsTGlzdC5sZW5ndGg7IGk8bGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsVG9SZW1vdmUgPSBmcm9tTm9kZXNMb29rdXBba2V5ZWRSZW1vdmFsTGlzdFtpXV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbFRvUmVtb3ZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVOb2RlKGVsVG9SZW1vdmUsIGVsVG9SZW1vdmUucGFyZW50Tm9kZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjaGlsZHJlbk9ubHkgJiYgbW9ycGhlZE5vZGUgIT09IGZyb21Ob2RlICYmIGZyb21Ob2RlLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIGlmIChtb3JwaGVkTm9kZS5hY3R1YWxpemUpIHtcbiAgICAgICAgICAgICAgICBtb3JwaGVkTm9kZSA9IG1vcnBoZWROb2RlLmFjdHVhbGl6ZShmcm9tTm9kZS5vd25lckRvY3VtZW50IHx8IGRvYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiB3ZSBoYWQgdG8gc3dhcCBvdXQgdGhlIGZyb20gbm9kZSB3aXRoIGEgbmV3IG5vZGUgYmVjYXVzZSB0aGUgb2xkXG4gICAgICAgICAgICAvLyBub2RlIHdhcyBub3QgY29tcGF0aWJsZSB3aXRoIHRoZSB0YXJnZXQgbm9kZSB0aGVuIHdlIG5lZWQgdG9cbiAgICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIG9sZCBET00gbm9kZSBpbiB0aGUgb3JpZ2luYWwgRE9NIHRyZWUuIFRoaXMgaXMgb25seVxuICAgICAgICAgICAgLy8gcG9zc2libGUgaWYgdGhlIG9yaWdpbmFsIERPTSBub2RlIHdhcyBwYXJ0IG9mIGEgRE9NIHRyZWUgd2hpY2hcbiAgICAgICAgICAgIC8vIHdlIGtub3cgaXMgdGhlIGNhc2UgaWYgaXQgaGFzIGEgcGFyZW50IG5vZGUuXG4gICAgICAgICAgICBmcm9tTm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChtb3JwaGVkTm9kZSwgZnJvbU5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1vcnBoZWROb2RlO1xuICAgIH07XG59XG5cbnZhciBtb3JwaGRvbSA9IG1vcnBoZG9tRmFjdG9yeShtb3JwaEF0dHJzKTtcblxuZXhwb3J0IGRlZmF1bHQgbW9ycGhkb207XG4iLCAiaW1wb3J0IHtcbiAgUEhYX0NPTVBPTkVOVCxcbiAgUEhYX0RJU0FCTEVfV0lUSCxcbiAgUEhYX0ZFRURCQUNLX0ZPUixcbiAgUEhYX1BSVU5FLFxuICBQSFhfUk9PVF9JRCxcbiAgUEhYX1NFU1NJT04sXG4gIFBIWF9TS0lQLFxuICBQSFhfU1RBVElDLFxuICBQSFhfVFJJR0dFUl9BQ1RJT04sXG4gIFBIWF9VUERBVEVcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbiAgZGV0ZWN0RHVwbGljYXRlSWRzLFxuICBpc0NpZFxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmltcG9ydCBET00gZnJvbSBcIi4vZG9tXCJcbmltcG9ydCBET01Qb3N0TW9ycGhSZXN0b3JlciBmcm9tIFwiLi9kb21fcG9zdF9tb3JwaF9yZXN0b3JlclwiXG5pbXBvcnQgbW9ycGhkb20gZnJvbSBcIm1vcnBoZG9tXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRE9NUGF0Y2gge1xuICBzdGF0aWMgcGF0Y2hFbChmcm9tRWwsIHRvRWwsIGFjdGl2ZUVsZW1lbnQpe1xuICAgIG1vcnBoZG9tKGZyb21FbCwgdG9FbCwge1xuICAgICAgY2hpbGRyZW5Pbmx5OiBmYWxzZSxcbiAgICAgIG9uQmVmb3JlRWxVcGRhdGVkOiAoZnJvbUVsLCB0b0VsKSA9PiB7XG4gICAgICAgIGlmKGFjdGl2ZUVsZW1lbnQgJiYgYWN0aXZlRWxlbWVudC5pc1NhbWVOb2RlKGZyb21FbCkgJiYgRE9NLmlzRm9ybUlucHV0KGZyb21FbCkpe1xuICAgICAgICAgIERPTS5tZXJnZUZvY3VzZWRJbnB1dChmcm9tRWwsIHRvRWwpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgY29uc3RydWN0b3IodmlldywgY29udGFpbmVyLCBpZCwgaHRtbCwgdGFyZ2V0Q0lEKXtcbiAgICB0aGlzLnZpZXcgPSB2aWV3XG4gICAgdGhpcy5saXZlU29ja2V0ID0gdmlldy5saXZlU29ja2V0XG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXJcbiAgICB0aGlzLmlkID0gaWRcbiAgICB0aGlzLnJvb3RJRCA9IHZpZXcucm9vdC5pZFxuICAgIHRoaXMuaHRtbCA9IGh0bWxcbiAgICB0aGlzLnRhcmdldENJRCA9IHRhcmdldENJRFxuICAgIHRoaXMuY2lkUGF0Y2ggPSBpc0NpZCh0aGlzLnRhcmdldENJRClcbiAgICB0aGlzLmNhbGxiYWNrcyA9IHtcbiAgICAgIGJlZm9yZWFkZGVkOiBbXSwgYmVmb3JldXBkYXRlZDogW10sIGJlZm9yZXBoeENoaWxkQWRkZWQ6IFtdLFxuICAgICAgYWZ0ZXJhZGRlZDogW10sIGFmdGVydXBkYXRlZDogW10sIGFmdGVyZGlzY2FyZGVkOiBbXSwgYWZ0ZXJwaHhDaGlsZEFkZGVkOiBbXSxcbiAgICAgIGFmdGVydHJhbnNpdGlvbnNEaXNjYXJkZWQ6IFtdXG4gICAgfVxuICB9XG5cbiAgYmVmb3JlKGtpbmQsIGNhbGxiYWNrKXsgdGhpcy5jYWxsYmFja3NbYGJlZm9yZSR7a2luZH1gXS5wdXNoKGNhbGxiYWNrKSB9XG4gIGFmdGVyKGtpbmQsIGNhbGxiYWNrKXsgdGhpcy5jYWxsYmFja3NbYGFmdGVyJHtraW5kfWBdLnB1c2goY2FsbGJhY2spIH1cblxuICB0cmFja0JlZm9yZShraW5kLCAuLi5hcmdzKXtcbiAgICB0aGlzLmNhbGxiYWNrc1tgYmVmb3JlJHtraW5kfWBdLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2soLi4uYXJncykpXG4gIH1cblxuICB0cmFja0FmdGVyKGtpbmQsIC4uLmFyZ3Mpe1xuICAgIHRoaXMuY2FsbGJhY2tzW2BhZnRlciR7a2luZH1gXS5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKC4uLmFyZ3MpKVxuICB9XG5cbiAgbWFya1BydW5hYmxlQ29udGVudEZvclJlbW92YWwoKXtcbiAgICBET00uYWxsKHRoaXMuY29udGFpbmVyLCBcIltwaHgtdXBkYXRlPWFwcGVuZF0gPiAqLCBbcGh4LXVwZGF0ZT1wcmVwZW5kXSA+ICpcIiwgZWwgPT4ge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKFBIWF9QUlVORSwgXCJcIilcbiAgICB9KVxuICB9XG5cbiAgcGVyZm9ybSgpe1xuICAgIGxldCB7dmlldywgbGl2ZVNvY2tldCwgY29udGFpbmVyLCBodG1sfSA9IHRoaXNcbiAgICBsZXQgdGFyZ2V0Q29udGFpbmVyID0gdGhpcy5pc0NJRFBhdGNoKCkgPyB0aGlzLnRhcmdldENJRENvbnRhaW5lcihodG1sKSA6IGNvbnRhaW5lclxuICAgIGlmKHRoaXMuaXNDSURQYXRjaCgpICYmICF0YXJnZXRDb250YWluZXIpeyByZXR1cm4gfVxuXG4gICAgbGV0IGZvY3VzZWQgPSBsaXZlU29ja2V0LmdldEFjdGl2ZUVsZW1lbnQoKVxuICAgIGxldCB7c2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZH0gPSBmb2N1c2VkICYmIERPTS5oYXNTZWxlY3Rpb25SYW5nZShmb2N1c2VkKSA/IGZvY3VzZWQgOiB7fVxuICAgIGxldCBwaHhVcGRhdGUgPSBsaXZlU29ja2V0LmJpbmRpbmcoUEhYX1VQREFURSlcbiAgICBsZXQgcGh4RmVlZGJhY2tGb3IgPSBsaXZlU29ja2V0LmJpbmRpbmcoUEhYX0ZFRURCQUNLX0ZPUilcbiAgICBsZXQgZGlzYWJsZVdpdGggPSBsaXZlU29ja2V0LmJpbmRpbmcoUEhYX0RJU0FCTEVfV0lUSClcbiAgICBsZXQgcGh4VHJpZ2dlckV4dGVybmFsID0gbGl2ZVNvY2tldC5iaW5kaW5nKFBIWF9UUklHR0VSX0FDVElPTilcbiAgICBsZXQgcGh4UmVtb3ZlID0gbGl2ZVNvY2tldC5iaW5kaW5nKFwicmVtb3ZlXCIpXG4gICAgbGV0IGFkZGVkID0gW11cbiAgICBsZXQgdXBkYXRlcyA9IFtdXG4gICAgbGV0IGFwcGVuZFByZXBlbmRVcGRhdGVzID0gW11cbiAgICBsZXQgcGVuZGluZ1JlbW92ZXMgPSBbXVxuICAgIGxldCBleHRlcm5hbEZvcm1UcmlnZ2VyZWQgPSBudWxsXG5cbiAgICBsZXQgZGlmZkhUTUwgPSBsaXZlU29ja2V0LnRpbWUoXCJwcmVtb3JwaCBjb250YWluZXIgcHJlcFwiLCAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5idWlsZERpZmZIVE1MKGNvbnRhaW5lciwgaHRtbCwgcGh4VXBkYXRlLCB0YXJnZXRDb250YWluZXIpXG4gICAgfSlcblxuICAgIHRoaXMudHJhY2tCZWZvcmUoXCJhZGRlZFwiLCBjb250YWluZXIpXG4gICAgdGhpcy50cmFja0JlZm9yZShcInVwZGF0ZWRcIiwgY29udGFpbmVyLCBjb250YWluZXIpXG5cbiAgICBsaXZlU29ja2V0LnRpbWUoXCJtb3JwaGRvbVwiLCAoKSA9PiB7XG4gICAgICBtb3JwaGRvbSh0YXJnZXRDb250YWluZXIsIGRpZmZIVE1MLCB7XG4gICAgICAgIGNoaWxkcmVuT25seTogdGFyZ2V0Q29udGFpbmVyLmdldEF0dHJpYnV0ZShQSFhfQ09NUE9ORU5UKSA9PT0gbnVsbCxcbiAgICAgICAgZ2V0Tm9kZUtleTogKG5vZGUpID0+IHtcbiAgICAgICAgICByZXR1cm4gRE9NLmlzUGh4RGVzdHJveWVkKG5vZGUpID8gbnVsbCA6IG5vZGUuaWRcbiAgICAgICAgfSxcbiAgICAgICAgb25CZWZvcmVOb2RlQWRkZWQ6IChlbCkgPT4ge1xuICAgICAgICAgIHRoaXMudHJhY2tCZWZvcmUoXCJhZGRlZFwiLCBlbClcbiAgICAgICAgICByZXR1cm4gZWxcbiAgICAgICAgfSxcbiAgICAgICAgb25Ob2RlQWRkZWQ6IChlbCkgPT4ge1xuICAgICAgICAgIC8vIGhhY2sgdG8gZml4IFNhZmFyaSBoYW5kbGluZyBvZiBpbWcgc3Jjc2V0IGFuZCB2aWRlbyB0YWdzXG4gICAgICAgICAgaWYoZWwgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50ICYmIGVsLnNyY3NldCl7XG4gICAgICAgICAgICBlbC5zcmNzZXQgPSBlbC5zcmNzZXRcbiAgICAgICAgICB9IGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBIVE1MVmlkZW9FbGVtZW50ICYmIGVsLmF1dG9wbGF5KXtcbiAgICAgICAgICAgIGVsLnBsYXkoKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZihET00uaXNOb3dUcmlnZ2VyRm9ybUV4dGVybmFsKGVsLCBwaHhUcmlnZ2VyRXh0ZXJuYWwpKXtcbiAgICAgICAgICAgIGV4dGVybmFsRm9ybVRyaWdnZXJlZCA9IGVsXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vaW5wdXQgaGFuZGxpbmdcbiAgICAgICAgICBET00uZGlzY2FyZEVycm9yKHRhcmdldENvbnRhaW5lciwgZWwsIHBoeEZlZWRiYWNrRm9yKVxuICAgICAgICAgIC8vIG5lc3RlZCB2aWV3IGhhbmRsaW5nXG4gICAgICAgICAgaWYoKERPTS5pc1BoeENoaWxkKGVsKSAmJiB2aWV3Lm93bnNFbGVtZW50KGVsKSkgfHwgRE9NLmlzUGh4U3RpY2t5KGVsKSAmJiB2aWV3Lm93bnNFbGVtZW50KGVsLnBhcmVudE5vZGUpKXtcbiAgICAgICAgICAgIHRoaXMudHJhY2tBZnRlcihcInBoeENoaWxkQWRkZWRcIiwgZWwpXG4gICAgICAgICAgfVxuICAgICAgICAgIGFkZGVkLnB1c2goZWwpXG4gICAgICAgIH0sXG4gICAgICAgIG9uTm9kZURpc2NhcmRlZDogKGVsKSA9PiB7XG4gICAgICAgICAgLy8gbmVzdGVkIHZpZXcgaGFuZGxpbmdcbiAgICAgICAgICBpZihET00uaXNQaHhDaGlsZChlbCkgfHwgRE9NLmlzUGh4U3RpY2t5KGVsKSl7IGxpdmVTb2NrZXQuZGVzdHJveVZpZXdCeUVsKGVsKSB9XG4gICAgICAgICAgdGhpcy50cmFja0FmdGVyKFwiZGlzY2FyZGVkXCIsIGVsKVxuICAgICAgICB9LFxuICAgICAgICBvbkJlZm9yZU5vZGVEaXNjYXJkZWQ6IChlbCkgPT4ge1xuICAgICAgICAgIGlmKGVsLmdldEF0dHJpYnV0ZSAmJiBlbC5nZXRBdHRyaWJ1dGUoUEhYX1BSVU5FKSAhPT0gbnVsbCl7IHJldHVybiB0cnVlIH1cbiAgICAgICAgICBpZihlbC5wYXJlbnROb2RlICE9PSBudWxsICYmIERPTS5pc1BoeFVwZGF0ZShlbC5wYXJlbnROb2RlLCBwaHhVcGRhdGUsIFtcImFwcGVuZFwiLCBcInByZXBlbmRcIl0pICYmIGVsLmlkKXsgcmV0dXJuIGZhbHNlIH1cbiAgICAgICAgICBpZihlbC5nZXRBdHRyaWJ1dGUgJiYgZWwuZ2V0QXR0cmlidXRlKHBoeFJlbW92ZSkpe1xuICAgICAgICAgICAgcGVuZGluZ1JlbW92ZXMucHVzaChlbClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZih0aGlzLnNraXBDSURTaWJsaW5nKGVsKSl7IHJldHVybiBmYWxzZSB9XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgb25FbFVwZGF0ZWQ6IChlbCkgPT4ge1xuICAgICAgICAgIGlmKERPTS5pc05vd1RyaWdnZXJGb3JtRXh0ZXJuYWwoZWwsIHBoeFRyaWdnZXJFeHRlcm5hbCkpe1xuICAgICAgICAgICAgZXh0ZXJuYWxGb3JtVHJpZ2dlcmVkID0gZWxcbiAgICAgICAgICB9XG4gICAgICAgICAgdXBkYXRlcy5wdXNoKGVsKVxuICAgICAgICB9LFxuICAgICAgICBvbkJlZm9yZUVsVXBkYXRlZDogKGZyb21FbCwgdG9FbCkgPT4ge1xuICAgICAgICAgIERPTS5jbGVhbkNoaWxkTm9kZXModG9FbCwgcGh4VXBkYXRlKVxuICAgICAgICAgIGlmKHRoaXMuc2tpcENJRFNpYmxpbmcodG9FbCkpeyByZXR1cm4gZmFsc2UgfVxuICAgICAgICAgIGlmKERPTS5pc1BoeFN0aWNreShmcm9tRWwpKXsgcmV0dXJuIGZhbHNlIH1cbiAgICAgICAgICBpZihET00uaXNJZ25vcmVkKGZyb21FbCwgcGh4VXBkYXRlKSl7XG4gICAgICAgICAgICB0aGlzLnRyYWNrQmVmb3JlKFwidXBkYXRlZFwiLCBmcm9tRWwsIHRvRWwpXG4gICAgICAgICAgICBET00ubWVyZ2VBdHRycyhmcm9tRWwsIHRvRWwsIHtpc0lnbm9yZWQ6IHRydWV9KVxuICAgICAgICAgICAgdXBkYXRlcy5wdXNoKGZyb21FbClcbiAgICAgICAgICAgIERPTS5hcHBseVN0aWNreU9wZXJhdGlvbnMoZnJvbUVsKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKGZyb21FbC50eXBlID09PSBcIm51bWJlclwiICYmIChmcm9tRWwudmFsaWRpdHkgJiYgZnJvbUVsLnZhbGlkaXR5LmJhZElucHV0KSl7IHJldHVybiBmYWxzZSB9XG4gICAgICAgICAgaWYoIURPTS5zeW5jUGVuZGluZ1JlZihmcm9tRWwsIHRvRWwsIGRpc2FibGVXaXRoKSl7XG4gICAgICAgICAgICBpZihET00uaXNVcGxvYWRJbnB1dChmcm9tRWwpKXtcbiAgICAgICAgICAgICAgdGhpcy50cmFja0JlZm9yZShcInVwZGF0ZWRcIiwgZnJvbUVsLCB0b0VsKVxuICAgICAgICAgICAgICB1cGRhdGVzLnB1c2goZnJvbUVsKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgRE9NLmFwcGx5U3RpY2t5T3BlcmF0aW9ucyhmcm9tRWwpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBuZXN0ZWQgdmlldyBoYW5kbGluZ1xuICAgICAgICAgIGlmKERPTS5pc1BoeENoaWxkKHRvRWwpKXtcbiAgICAgICAgICAgIGxldCBwcmV2U2Vzc2lvbiA9IGZyb21FbC5nZXRBdHRyaWJ1dGUoUEhYX1NFU1NJT04pXG4gICAgICAgICAgICBET00ubWVyZ2VBdHRycyhmcm9tRWwsIHRvRWwsIHtleGNsdWRlOiBbUEhYX1NUQVRJQ119KVxuICAgICAgICAgICAgaWYocHJldlNlc3Npb24gIT09IFwiXCIpeyBmcm9tRWwuc2V0QXR0cmlidXRlKFBIWF9TRVNTSU9OLCBwcmV2U2Vzc2lvbikgfVxuICAgICAgICAgICAgZnJvbUVsLnNldEF0dHJpYnV0ZShQSFhfUk9PVF9JRCwgdGhpcy5yb290SUQpXG4gICAgICAgICAgICBET00uYXBwbHlTdGlja3lPcGVyYXRpb25zKGZyb21FbClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGlucHV0IGhhbmRsaW5nXG4gICAgICAgICAgRE9NLmNvcHlQcml2YXRlcyh0b0VsLCBmcm9tRWwpXG4gICAgICAgICAgRE9NLmRpc2NhcmRFcnJvcih0YXJnZXRDb250YWluZXIsIHRvRWwsIHBoeEZlZWRiYWNrRm9yKVxuXG4gICAgICAgICAgbGV0IGlzRm9jdXNlZEZvcm1FbCA9IGZvY3VzZWQgJiYgZnJvbUVsLmlzU2FtZU5vZGUoZm9jdXNlZCkgJiYgRE9NLmlzRm9ybUlucHV0KGZyb21FbClcbiAgICAgICAgICBpZihpc0ZvY3VzZWRGb3JtRWwpe1xuICAgICAgICAgICAgdGhpcy50cmFja0JlZm9yZShcInVwZGF0ZWRcIiwgZnJvbUVsLCB0b0VsKVxuICAgICAgICAgICAgRE9NLm1lcmdlRm9jdXNlZElucHV0KGZyb21FbCwgdG9FbClcbiAgICAgICAgICAgIERPTS5zeW5jQXR0cnNUb1Byb3BzKGZyb21FbClcbiAgICAgICAgICAgIHVwZGF0ZXMucHVzaChmcm9tRWwpXG4gICAgICAgICAgICBET00uYXBwbHlTdGlja3lPcGVyYXRpb25zKGZyb21FbClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZihET00uaXNQaHhVcGRhdGUodG9FbCwgcGh4VXBkYXRlLCBbXCJhcHBlbmRcIiwgXCJwcmVwZW5kXCJdKSl7XG4gICAgICAgICAgICAgIGFwcGVuZFByZXBlbmRVcGRhdGVzLnB1c2gobmV3IERPTVBvc3RNb3JwaFJlc3RvcmVyKGZyb21FbCwgdG9FbCwgdG9FbC5nZXRBdHRyaWJ1dGUocGh4VXBkYXRlKSkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBET00uc3luY0F0dHJzVG9Qcm9wcyh0b0VsKVxuICAgICAgICAgICAgRE9NLmFwcGx5U3RpY2t5T3BlcmF0aW9ucyh0b0VsKVxuICAgICAgICAgICAgdGhpcy50cmFja0JlZm9yZShcInVwZGF0ZWRcIiwgZnJvbUVsLCB0b0VsKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGlmKGxpdmVTb2NrZXQuaXNEZWJ1Z0VuYWJsZWQoKSl7IGRldGVjdER1cGxpY2F0ZUlkcygpIH1cblxuICAgIGlmKGFwcGVuZFByZXBlbmRVcGRhdGVzLmxlbmd0aCA+IDApe1xuICAgICAgbGl2ZVNvY2tldC50aW1lKFwicG9zdC1tb3JwaCBhcHBlbmQvcHJlcGVuZCByZXN0b3JhdGlvblwiLCAoKSA9PiB7XG4gICAgICAgIGFwcGVuZFByZXBlbmRVcGRhdGVzLmZvckVhY2godXBkYXRlID0+IHVwZGF0ZS5wZXJmb3JtKCkpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGxpdmVTb2NrZXQuc2lsZW5jZUV2ZW50cygoKSA9PiBET00ucmVzdG9yZUZvY3VzKGZvY3VzZWQsIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpKVxuICAgIERPTS5kaXNwYXRjaEV2ZW50KGRvY3VtZW50LCBcInBoeDp1cGRhdGVcIilcbiAgICBhZGRlZC5mb3JFYWNoKGVsID0+IHRoaXMudHJhY2tBZnRlcihcImFkZGVkXCIsIGVsKSlcbiAgICB1cGRhdGVzLmZvckVhY2goZWwgPT4gdGhpcy50cmFja0FmdGVyKFwidXBkYXRlZFwiLCBlbCkpXG5cbiAgICBpZihwZW5kaW5nUmVtb3Zlcy5sZW5ndGggPiAwKXtcbiAgICAgIGxpdmVTb2NrZXQudHJhbnNpdGlvblJlbW92ZXMocGVuZGluZ1JlbW92ZXMpXG4gICAgICBsaXZlU29ja2V0LnJlcXVlc3RET01VcGRhdGUoKCkgPT4ge1xuICAgICAgICBwZW5kaW5nUmVtb3Zlcy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICBsZXQgY2hpbGQgPSBET00uZmlyc3RQaHhDaGlsZChlbClcbiAgICAgICAgICBpZihjaGlsZCl7IGxpdmVTb2NrZXQuZGVzdHJveVZpZXdCeUVsKGNoaWxkKSB9XG4gICAgICAgICAgZWwucmVtb3ZlKClcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy50cmFja0FmdGVyKFwidHJhbnNpdGlvbnNEaXNjYXJkZWRcIiwgcGVuZGluZ1JlbW92ZXMpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmKGV4dGVybmFsRm9ybVRyaWdnZXJlZCl7XG4gICAgICBsaXZlU29ja2V0LmRpc2Nvbm5lY3QoKVxuICAgICAgZXh0ZXJuYWxGb3JtVHJpZ2dlcmVkLnN1Ym1pdCgpXG4gICAgfVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpc0NJRFBhdGNoKCl7IHJldHVybiB0aGlzLmNpZFBhdGNoIH1cblxuICBza2lwQ0lEU2libGluZyhlbCl7XG4gICAgcmV0dXJuIGVsLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSAmJiBlbC5nZXRBdHRyaWJ1dGUoUEhYX1NLSVApICE9PSBudWxsXG4gIH1cblxuICB0YXJnZXRDSURDb250YWluZXIoaHRtbCl7XG4gICAgaWYoIXRoaXMuaXNDSURQYXRjaCgpKXsgcmV0dXJuIH1cbiAgICBsZXQgW2ZpcnN0LCAuLi5yZXN0XSA9IERPTS5maW5kQ29tcG9uZW50Tm9kZUxpc3QodGhpcy5jb250YWluZXIsIHRoaXMudGFyZ2V0Q0lEKVxuICAgIGlmKHJlc3QubGVuZ3RoID09PSAwICYmIERPTS5jaGlsZE5vZGVMZW5ndGgoaHRtbCkgPT09IDEpe1xuICAgICAgcmV0dXJuIGZpcnN0XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmaXJzdCAmJiBmaXJzdC5wYXJlbnROb2RlXG4gICAgfVxuICB9XG5cbiAgLy8gYnVpbGRzIEhUTUwgZm9yIG1vcnBoZG9tIHBhdGNoXG4gIC8vIC0gZm9yIGZ1bGwgcGF0Y2hlcyBvZiBMaXZlVmlldyBvciBhIGNvbXBvbmVudCB3aXRoIGEgc2luZ2xlXG4gIC8vICAgcm9vdCBub2RlLCBzaW1wbHkgcmV0dXJucyB0aGUgSFRNTFxuICAvLyAtIGZvciBwYXRjaGVzIG9mIGEgY29tcG9uZW50IHdpdGggbXVsdGlwbGUgcm9vdCBub2RlcywgdGhlXG4gIC8vICAgcGFyZW50IG5vZGUgYmVjb21lcyB0aGUgdGFyZ2V0IGNvbnRhaW5lciBhbmQgbm9uLWNvbXBvbmVudFxuICAvLyAgIHNpYmxpbmdzIGFyZSBtYXJrZWQgYXMgc2tpcC5cbiAgYnVpbGREaWZmSFRNTChjb250YWluZXIsIGh0bWwsIHBoeFVwZGF0ZSwgdGFyZ2V0Q29udGFpbmVyKXtcbiAgICBsZXQgaXNDSURQYXRjaCA9IHRoaXMuaXNDSURQYXRjaCgpXG4gICAgbGV0IGlzQ0lEV2l0aFNpbmdsZVJvb3QgPSBpc0NJRFBhdGNoICYmIHRhcmdldENvbnRhaW5lci5nZXRBdHRyaWJ1dGUoUEhYX0NPTVBPTkVOVCkgPT09IHRoaXMudGFyZ2V0Q0lELnRvU3RyaW5nKClcbiAgICBpZighaXNDSURQYXRjaCB8fCBpc0NJRFdpdGhTaW5nbGVSb290KXtcbiAgICAgIHJldHVybiBodG1sXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNvbXBvbmVudCBwYXRjaCB3aXRoIG11bHRpcGxlIENJRCByb290c1xuICAgICAgbGV0IGRpZmZDb250YWluZXIgPSBudWxsXG4gICAgICBsZXQgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIilcbiAgICAgIGRpZmZDb250YWluZXIgPSBET00uY2xvbmVOb2RlKHRhcmdldENvbnRhaW5lcilcbiAgICAgIGxldCBbZmlyc3RDb21wb25lbnQsIC4uLnJlc3RdID0gRE9NLmZpbmRDb21wb25lbnROb2RlTGlzdChkaWZmQ29udGFpbmVyLCB0aGlzLnRhcmdldENJRClcbiAgICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IGh0bWxcbiAgICAgIHJlc3QuZm9yRWFjaChlbCA9PiBlbC5yZW1vdmUoKSlcbiAgICAgIEFycmF5LmZyb20oZGlmZkNvbnRhaW5lci5jaGlsZE5vZGVzKS5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgLy8gd2UgY2FuIG9ubHkgc2tpcCB0cmFja2FibGUgbm9kZXMgd2l0aCBhbiBJRFxuICAgICAgICBpZihjaGlsZC5pZCAmJiBjaGlsZC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUgJiYgY2hpbGQuZ2V0QXR0cmlidXRlKFBIWF9DT01QT05FTlQpICE9PSB0aGlzLnRhcmdldENJRC50b1N0cmluZygpKXtcbiAgICAgICAgICBjaGlsZC5zZXRBdHRyaWJ1dGUoUEhYX1NLSVAsIFwiXCIpXG4gICAgICAgICAgY2hpbGQuaW5uZXJIVE1MID0gXCJcIlxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgQXJyYXkuZnJvbSh0ZW1wbGF0ZS5jb250ZW50LmNoaWxkTm9kZXMpLmZvckVhY2goZWwgPT4gZGlmZkNvbnRhaW5lci5pbnNlcnRCZWZvcmUoZWwsIGZpcnN0Q29tcG9uZW50KSlcbiAgICAgIGZpcnN0Q29tcG9uZW50LnJlbW92ZSgpXG4gICAgICByZXR1cm4gZGlmZkNvbnRhaW5lci5vdXRlckhUTUxcbiAgICB9XG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBDT01QT05FTlRTLFxuICBEWU5BTUlDUyxcbiAgVEVNUExBVEVTLFxuICBFVkVOVFMsXG4gIFBIWF9DT01QT05FTlQsXG4gIFBIWF9TS0lQLFxuICBSRVBMWSxcbiAgU1RBVElDLFxuICBUSVRMRVxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQge1xuICBpc09iamVjdCxcbiAgbG9nRXJyb3IsXG4gIGlzQ2lkLFxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlcmVkIHtcbiAgc3RhdGljIGV4dHJhY3QoZGlmZil7XG4gICAgbGV0IHtbUkVQTFldOiByZXBseSwgW0VWRU5UU106IGV2ZW50cywgW1RJVExFXTogdGl0bGV9ID0gZGlmZlxuICAgIGRlbGV0ZSBkaWZmW1JFUExZXVxuICAgIGRlbGV0ZSBkaWZmW0VWRU5UU11cbiAgICBkZWxldGUgZGlmZltUSVRMRV1cbiAgICByZXR1cm4ge2RpZmYsIHRpdGxlLCByZXBseTogcmVwbHkgfHwgbnVsbCwgZXZlbnRzOiBldmVudHMgfHwgW119XG4gIH1cblxuICBjb25zdHJ1Y3Rvcih2aWV3SWQsIHJlbmRlcmVkKXtcbiAgICB0aGlzLnZpZXdJZCA9IHZpZXdJZFxuICAgIHRoaXMucmVuZGVyZWQgPSB7fVxuICAgIHRoaXMubWVyZ2VEaWZmKHJlbmRlcmVkKVxuICB9XG5cbiAgcGFyZW50Vmlld0lkKCl7IHJldHVybiB0aGlzLnZpZXdJZCB9XG5cbiAgdG9TdHJpbmcob25seUNpZHMpe1xuICAgIHJldHVybiB0aGlzLnJlY3Vyc2l2ZVRvU3RyaW5nKHRoaXMucmVuZGVyZWQsIHRoaXMucmVuZGVyZWRbQ09NUE9ORU5UU10sIG9ubHlDaWRzKVxuICB9XG5cbiAgcmVjdXJzaXZlVG9TdHJpbmcocmVuZGVyZWQsIGNvbXBvbmVudHMgPSByZW5kZXJlZFtDT01QT05FTlRTXSwgb25seUNpZHMpe1xuICAgIG9ubHlDaWRzID0gb25seUNpZHMgPyBuZXcgU2V0KG9ubHlDaWRzKSA6IG51bGxcbiAgICBsZXQgb3V0cHV0ID0ge2J1ZmZlcjogXCJcIiwgY29tcG9uZW50czogY29tcG9uZW50cywgb25seUNpZHM6IG9ubHlDaWRzfVxuICAgIHRoaXMudG9PdXRwdXRCdWZmZXIocmVuZGVyZWQsIG51bGwsIG91dHB1dClcbiAgICByZXR1cm4gb3V0cHV0LmJ1ZmZlclxuICB9XG5cbiAgY29tcG9uZW50Q0lEcyhkaWZmKXsgcmV0dXJuIE9iamVjdC5rZXlzKGRpZmZbQ09NUE9ORU5UU10gfHwge30pLm1hcChpID0+IHBhcnNlSW50KGkpKSB9XG5cbiAgaXNDb21wb25lbnRPbmx5RGlmZihkaWZmKXtcbiAgICBpZighZGlmZltDT01QT05FTlRTXSl7IHJldHVybiBmYWxzZSB9XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGRpZmYpLmxlbmd0aCA9PT0gMVxuICB9XG5cbiAgZ2V0Q29tcG9uZW50KGRpZmYsIGNpZCl7IHJldHVybiBkaWZmW0NPTVBPTkVOVFNdW2NpZF0gfVxuXG4gIG1lcmdlRGlmZihkaWZmKXtcbiAgICBsZXQgbmV3YyA9IGRpZmZbQ09NUE9ORU5UU11cbiAgICBsZXQgY2FjaGUgPSB7fVxuICAgIGRlbGV0ZSBkaWZmW0NPTVBPTkVOVFNdXG4gICAgdGhpcy5yZW5kZXJlZCA9IHRoaXMubXV0YWJsZU1lcmdlKHRoaXMucmVuZGVyZWQsIGRpZmYpXG4gICAgdGhpcy5yZW5kZXJlZFtDT01QT05FTlRTXSA9IHRoaXMucmVuZGVyZWRbQ09NUE9ORU5UU10gfHwge31cblxuICAgIGlmKG5ld2Mpe1xuICAgICAgbGV0IG9sZGMgPSB0aGlzLnJlbmRlcmVkW0NPTVBPTkVOVFNdXG5cbiAgICAgIGZvcihsZXQgY2lkIGluIG5ld2Mpe1xuICAgICAgICBuZXdjW2NpZF0gPSB0aGlzLmNhY2hlZEZpbmRDb21wb25lbnQoY2lkLCBuZXdjW2NpZF0sIG9sZGMsIG5ld2MsIGNhY2hlKVxuICAgICAgfVxuXG4gICAgICBmb3IobGV0IGNpZCBpbiBuZXdjKXsgb2xkY1tjaWRdID0gbmV3Y1tjaWRdIH1cbiAgICAgIGRpZmZbQ09NUE9ORU5UU10gPSBuZXdjXG4gICAgfVxuICB9XG5cbiAgY2FjaGVkRmluZENvbXBvbmVudChjaWQsIGNkaWZmLCBvbGRjLCBuZXdjLCBjYWNoZSl7XG4gICAgaWYoY2FjaGVbY2lkXSl7XG4gICAgICByZXR1cm4gY2FjaGVbY2lkXVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgbmRpZmYsIHN0YXQsIHNjaWQgPSBjZGlmZltTVEFUSUNdXG5cbiAgICAgIGlmKGlzQ2lkKHNjaWQpKXtcbiAgICAgICAgbGV0IHRkaWZmXG5cbiAgICAgICAgaWYoc2NpZCA+IDApe1xuICAgICAgICAgIHRkaWZmID0gdGhpcy5jYWNoZWRGaW5kQ29tcG9uZW50KHNjaWQsIG5ld2Nbc2NpZF0sIG9sZGMsIG5ld2MsIGNhY2hlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRkaWZmID0gb2xkY1stc2NpZF1cbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXQgPSB0ZGlmZltTVEFUSUNdXG4gICAgICAgIG5kaWZmID0gdGhpcy5jbG9uZU1lcmdlKHRkaWZmLCBjZGlmZilcbiAgICAgICAgbmRpZmZbU1RBVElDXSA9IHN0YXRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5kaWZmID0gY2RpZmZbU1RBVElDXSAhPT0gdW5kZWZpbmVkID8gY2RpZmYgOiB0aGlzLmNsb25lTWVyZ2Uob2xkY1tjaWRdIHx8IHt9LCBjZGlmZilcbiAgICAgIH1cblxuICAgICAgY2FjaGVbY2lkXSA9IG5kaWZmXG4gICAgICByZXR1cm4gbmRpZmZcbiAgICB9XG4gIH1cblxuICBtdXRhYmxlTWVyZ2UodGFyZ2V0LCBzb3VyY2Upe1xuICAgIGlmKHNvdXJjZVtTVEFUSUNdICE9PSB1bmRlZmluZWQpe1xuICAgICAgcmV0dXJuIHNvdXJjZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRvTXV0YWJsZU1lcmdlKHRhcmdldCwgc291cmNlKVxuICAgICAgcmV0dXJuIHRhcmdldFxuICAgIH1cbiAgfVxuXG4gIGRvTXV0YWJsZU1lcmdlKHRhcmdldCwgc291cmNlKXtcbiAgICBmb3IobGV0IGtleSBpbiBzb3VyY2Upe1xuICAgICAgbGV0IHZhbCA9IHNvdXJjZVtrZXldXG4gICAgICBsZXQgdGFyZ2V0VmFsID0gdGFyZ2V0W2tleV1cbiAgICAgIGlmKGlzT2JqZWN0KHZhbCkgJiYgdmFsW1NUQVRJQ10gPT09IHVuZGVmaW5lZCAmJiBpc09iamVjdCh0YXJnZXRWYWwpKXtcbiAgICAgICAgdGhpcy5kb011dGFibGVNZXJnZSh0YXJnZXRWYWwsIHZhbClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gdmFsXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2xvbmVNZXJnZSh0YXJnZXQsIHNvdXJjZSl7XG4gICAgbGV0IG1lcmdlZCA9IHsuLi50YXJnZXQsIC4uLnNvdXJjZX1cbiAgICBmb3IobGV0IGtleSBpbiBtZXJnZWQpe1xuICAgICAgbGV0IHZhbCA9IHNvdXJjZVtrZXldXG4gICAgICBsZXQgdGFyZ2V0VmFsID0gdGFyZ2V0W2tleV1cbiAgICAgIGlmKGlzT2JqZWN0KHZhbCkgJiYgdmFsW1NUQVRJQ10gPT09IHVuZGVmaW5lZCAmJiBpc09iamVjdCh0YXJnZXRWYWwpKXtcbiAgICAgICAgbWVyZ2VkW2tleV0gPSB0aGlzLmNsb25lTWVyZ2UodGFyZ2V0VmFsLCB2YWwpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtZXJnZWRcbiAgfVxuXG4gIGNvbXBvbmVudFRvU3RyaW5nKGNpZCl7IHJldHVybiB0aGlzLnJlY3Vyc2l2ZUNJRFRvU3RyaW5nKHRoaXMucmVuZGVyZWRbQ09NUE9ORU5UU10sIGNpZCkgfVxuXG4gIHBydW5lQ0lEcyhjaWRzKXtcbiAgICBjaWRzLmZvckVhY2goY2lkID0+IGRlbGV0ZSB0aGlzLnJlbmRlcmVkW0NPTVBPTkVOVFNdW2NpZF0pXG4gIH1cblxuICAvLyBwcml2YXRlXG5cbiAgZ2V0KCl7IHJldHVybiB0aGlzLnJlbmRlcmVkIH1cblxuICBpc05ld0ZpbmdlcnByaW50KGRpZmYgPSB7fSl7IHJldHVybiAhIWRpZmZbU1RBVElDXSB9XG5cbiAgdGVtcGxhdGVTdGF0aWMocGFydCwgdGVtcGxhdGVzKXtcbiAgICBpZih0eXBlb2YgKHBhcnQpID09PSBcIm51bWJlclwiKSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGVzW3BhcnRdXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwYXJ0XG4gICAgfVxuICB9XG5cbiAgdG9PdXRwdXRCdWZmZXIocmVuZGVyZWQsIHRlbXBsYXRlcywgb3V0cHV0KXtcbiAgICBpZihyZW5kZXJlZFtEWU5BTUlDU10peyByZXR1cm4gdGhpcy5jb21wcmVoZW5zaW9uVG9CdWZmZXIocmVuZGVyZWQsIHRlbXBsYXRlcywgb3V0cHV0KSB9XG4gICAgbGV0IHtbU1RBVElDXTogc3RhdGljc30gPSByZW5kZXJlZFxuICAgIHN0YXRpY3MgPSB0aGlzLnRlbXBsYXRlU3RhdGljKHN0YXRpY3MsIHRlbXBsYXRlcylcblxuICAgIG91dHB1dC5idWZmZXIgKz0gc3RhdGljc1swXVxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCBzdGF0aWNzLmxlbmd0aDsgaSsrKXtcbiAgICAgIHRoaXMuZHluYW1pY1RvQnVmZmVyKHJlbmRlcmVkW2kgLSAxXSwgdGVtcGxhdGVzLCBvdXRwdXQpXG4gICAgICBvdXRwdXQuYnVmZmVyICs9IHN0YXRpY3NbaV1cbiAgICB9XG4gIH1cblxuICBjb21wcmVoZW5zaW9uVG9CdWZmZXIocmVuZGVyZWQsIHRlbXBsYXRlcywgb3V0cHV0KXtcbiAgICBsZXQge1tEWU5BTUlDU106IGR5bmFtaWNzLCBbU1RBVElDXTogc3RhdGljc30gPSByZW5kZXJlZFxuICAgIHN0YXRpY3MgPSB0aGlzLnRlbXBsYXRlU3RhdGljKHN0YXRpY3MsIHRlbXBsYXRlcylcbiAgICBsZXQgY29tcFRlbXBsYXRlcyA9IHRlbXBsYXRlcyB8fCByZW5kZXJlZFtURU1QTEFURVNdXG5cbiAgICBmb3IobGV0IGQgPSAwOyBkIDwgZHluYW1pY3MubGVuZ3RoOyBkKyspe1xuICAgICAgbGV0IGR5bmFtaWMgPSBkeW5hbWljc1tkXVxuICAgICAgb3V0cHV0LmJ1ZmZlciArPSBzdGF0aWNzWzBdXG4gICAgICBmb3IobGV0IGkgPSAxOyBpIDwgc3RhdGljcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgIHRoaXMuZHluYW1pY1RvQnVmZmVyKGR5bmFtaWNbaSAtIDFdLCBjb21wVGVtcGxhdGVzLCBvdXRwdXQpXG4gICAgICAgIG91dHB1dC5idWZmZXIgKz0gc3RhdGljc1tpXVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGR5bmFtaWNUb0J1ZmZlcihyZW5kZXJlZCwgdGVtcGxhdGVzLCBvdXRwdXQpe1xuICAgIGlmKHR5cGVvZiAocmVuZGVyZWQpID09PSBcIm51bWJlclwiKXtcbiAgICAgIG91dHB1dC5idWZmZXIgKz0gdGhpcy5yZWN1cnNpdmVDSURUb1N0cmluZyhvdXRwdXQuY29tcG9uZW50cywgcmVuZGVyZWQsIG91dHB1dC5vbmx5Q2lkcylcbiAgICB9IGVsc2UgaWYoaXNPYmplY3QocmVuZGVyZWQpKXtcbiAgICAgIHRoaXMudG9PdXRwdXRCdWZmZXIocmVuZGVyZWQsIHRlbXBsYXRlcywgb3V0cHV0KVxuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXQuYnVmZmVyICs9IHJlbmRlcmVkXG4gICAgfVxuICB9XG5cbiAgcmVjdXJzaXZlQ0lEVG9TdHJpbmcoY29tcG9uZW50cywgY2lkLCBvbmx5Q2lkcyl7XG4gICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNbY2lkXSB8fCBsb2dFcnJvcihgbm8gY29tcG9uZW50IGZvciBDSUQgJHtjaWR9YCwgY29tcG9uZW50cylcbiAgICBsZXQgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIilcbiAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSB0aGlzLnJlY3Vyc2l2ZVRvU3RyaW5nKGNvbXBvbmVudCwgY29tcG9uZW50cywgb25seUNpZHMpXG4gICAgbGV0IGNvbnRhaW5lciA9IHRlbXBsYXRlLmNvbnRlbnRcbiAgICBsZXQgc2tpcCA9IG9ubHlDaWRzICYmICFvbmx5Q2lkcy5oYXMoY2lkKVxuXG4gICAgbGV0IFtoYXNDaGlsZE5vZGVzLCBoYXNDaGlsZENvbXBvbmVudHNdID1cbiAgICAgIEFycmF5LmZyb20oY29udGFpbmVyLmNoaWxkTm9kZXMpLnJlZHVjZSgoW2hhc05vZGVzLCBoYXNDb21wb25lbnRzXSwgY2hpbGQsIGkpID0+IHtcbiAgICAgICAgaWYoY2hpbGQubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKXtcbiAgICAgICAgICBpZihjaGlsZC5nZXRBdHRyaWJ1dGUoUEhYX0NPTVBPTkVOVCkpe1xuICAgICAgICAgICAgcmV0dXJuIFtoYXNOb2RlcywgdHJ1ZV1cbiAgICAgICAgICB9XG4gICAgICAgICAgY2hpbGQuc2V0QXR0cmlidXRlKFBIWF9DT01QT05FTlQsIGNpZClcbiAgICAgICAgICBpZighY2hpbGQuaWQpeyBjaGlsZC5pZCA9IGAke3RoaXMucGFyZW50Vmlld0lkKCl9LSR7Y2lkfS0ke2l9YCB9XG4gICAgICAgICAgaWYoc2tpcCl7XG4gICAgICAgICAgICBjaGlsZC5zZXRBdHRyaWJ1dGUoUEhYX1NLSVAsIFwiXCIpXG4gICAgICAgICAgICBjaGlsZC5pbm5lckhUTUwgPSBcIlwiXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBbdHJ1ZSwgaGFzQ29tcG9uZW50c11cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZihjaGlsZC5ub2RlVmFsdWUudHJpbSgpICE9PSBcIlwiKXtcbiAgICAgICAgICAgIGxvZ0Vycm9yKFwib25seSBIVE1MIGVsZW1lbnQgdGFncyBhcmUgYWxsb3dlZCBhdCB0aGUgcm9vdCBvZiBjb21wb25lbnRzLlxcblxcblwiICtcbiAgICAgICAgICAgICAgYGdvdDogXCIke2NoaWxkLm5vZGVWYWx1ZS50cmltKCl9XCJcXG5cXG5gICtcbiAgICAgICAgICAgICAgXCJ3aXRoaW46XFxuXCIsIHRlbXBsYXRlLmlubmVySFRNTC50cmltKCkpXG4gICAgICAgICAgICBjaGlsZC5yZXBsYWNlV2l0aCh0aGlzLmNyZWF0ZVNwYW4oY2hpbGQubm9kZVZhbHVlLCBjaWQpKVxuICAgICAgICAgICAgcmV0dXJuIFt0cnVlLCBoYXNDb21wb25lbnRzXVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGlsZC5yZW1vdmUoKVxuICAgICAgICAgICAgcmV0dXJuIFtoYXNOb2RlcywgaGFzQ29tcG9uZW50c11cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIFtmYWxzZSwgZmFsc2VdKVxuXG4gICAgaWYoIWhhc0NoaWxkTm9kZXMgJiYgIWhhc0NoaWxkQ29tcG9uZW50cyl7XG4gICAgICBsb2dFcnJvcihcImV4cGVjdGVkIGF0IGxlYXN0IG9uZSBIVE1MIGVsZW1lbnQgdGFnIGluc2lkZSBhIGNvbXBvbmVudCwgYnV0IHRoZSBjb21wb25lbnQgaXMgZW1wdHk6XFxuXCIsXG4gICAgICAgIHRlbXBsYXRlLmlubmVySFRNTC50cmltKCkpXG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVTcGFuKFwiXCIsIGNpZCkub3V0ZXJIVE1MXG4gICAgfSBlbHNlIGlmKCFoYXNDaGlsZE5vZGVzICYmIGhhc0NoaWxkQ29tcG9uZW50cyl7XG4gICAgICBsb2dFcnJvcihcImV4cGVjdGVkIGF0IGxlYXN0IG9uZSBIVE1MIGVsZW1lbnQgdGFnIGRpcmVjdGx5IGluc2lkZSBhIGNvbXBvbmVudCwgYnV0IG9ubHkgc3ViY29tcG9uZW50cyB3ZXJlIGZvdW5kLiBBIGNvbXBvbmVudCBtdXN0IHJlbmRlciBhdCBsZWFzdCBvbmUgSFRNTCB0YWcgZGlyZWN0bHkgaW5zaWRlIGl0c2VsZi5cIixcbiAgICAgICAgdGVtcGxhdGUuaW5uZXJIVE1MLnRyaW0oKSlcbiAgICAgIHJldHVybiB0ZW1wbGF0ZS5pbm5lckhUTUxcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRlbXBsYXRlLmlubmVySFRNTFxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZVNwYW4odGV4dCwgY2lkKXtcbiAgICBsZXQgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gICAgc3Bhbi5pbm5lclRleHQgPSB0ZXh0XG4gICAgc3Bhbi5zZXRBdHRyaWJ1dGUoUEhYX0NPTVBPTkVOVCwgY2lkKVxuICAgIHJldHVybiBzcGFuXG4gIH1cbn1cbiIsICJsZXQgdmlld0hvb2tJRCA9IDFcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdIb29rIHtcbiAgc3RhdGljIG1ha2VJRCgpeyByZXR1cm4gdmlld0hvb2tJRCsrIH1cbiAgc3RhdGljIGVsZW1lbnRJRChlbCl7IHJldHVybiBlbC5waHhIb29rSWQgfVxuXG4gIGNvbnN0cnVjdG9yKHZpZXcsIGVsLCBjYWxsYmFja3Mpe1xuICAgIHRoaXMuX192aWV3ID0gdmlld1xuICAgIHRoaXMubGl2ZVNvY2tldCA9IHZpZXcubGl2ZVNvY2tldFxuICAgIHRoaXMuX19jYWxsYmFja3MgPSBjYWxsYmFja3NcbiAgICB0aGlzLl9fbGlzdGVuZXJzID0gbmV3IFNldCgpXG4gICAgdGhpcy5fX2lzRGlzY29ubmVjdGVkID0gZmFsc2VcbiAgICB0aGlzLmVsID0gZWxcbiAgICB0aGlzLmVsLnBoeEhvb2tJZCA9IHRoaXMuY29uc3RydWN0b3IubWFrZUlEKClcbiAgICBmb3IobGV0IGtleSBpbiB0aGlzLl9fY2FsbGJhY2tzKXsgdGhpc1trZXldID0gdGhpcy5fX2NhbGxiYWNrc1trZXldIH1cbiAgfVxuXG4gIF9fbW91bnRlZCgpeyB0aGlzLm1vdW50ZWQgJiYgdGhpcy5tb3VudGVkKCkgfVxuICBfX3VwZGF0ZWQoKXsgdGhpcy51cGRhdGVkICYmIHRoaXMudXBkYXRlZCgpIH1cbiAgX19iZWZvcmVVcGRhdGUoKXsgdGhpcy5iZWZvcmVVcGRhdGUgJiYgdGhpcy5iZWZvcmVVcGRhdGUoKSB9XG4gIF9fZGVzdHJveWVkKCl7IHRoaXMuZGVzdHJveWVkICYmIHRoaXMuZGVzdHJveWVkKCkgfVxuICBfX3JlY29ubmVjdGVkKCl7XG4gICAgaWYodGhpcy5fX2lzRGlzY29ubmVjdGVkKXtcbiAgICAgIHRoaXMuX19pc0Rpc2Nvbm5lY3RlZCA9IGZhbHNlXG4gICAgICB0aGlzLnJlY29ubmVjdGVkICYmIHRoaXMucmVjb25uZWN0ZWQoKVxuICAgIH1cbiAgfVxuICBfX2Rpc2Nvbm5lY3RlZCgpe1xuICAgIHRoaXMuX19pc0Rpc2Nvbm5lY3RlZCA9IHRydWVcbiAgICB0aGlzLmRpc2Nvbm5lY3RlZCAmJiB0aGlzLmRpc2Nvbm5lY3RlZCgpXG4gIH1cblxuICBwdXNoRXZlbnQoZXZlbnQsIHBheWxvYWQgPSB7fSwgb25SZXBseSA9IGZ1bmN0aW9uICgpeyB9KXtcbiAgICByZXR1cm4gdGhpcy5fX3ZpZXcucHVzaEhvb2tFdmVudChudWxsLCBldmVudCwgcGF5bG9hZCwgb25SZXBseSlcbiAgfVxuXG4gIHB1c2hFdmVudFRvKHBoeFRhcmdldCwgZXZlbnQsIHBheWxvYWQgPSB7fSwgb25SZXBseSA9IGZ1bmN0aW9uICgpeyB9KXtcbiAgICByZXR1cm4gdGhpcy5fX3ZpZXcud2l0aGluVGFyZ2V0cyhwaHhUYXJnZXQsICh2aWV3LCB0YXJnZXRDdHgpID0+IHtcbiAgICAgIHJldHVybiB2aWV3LnB1c2hIb29rRXZlbnQodGFyZ2V0Q3R4LCBldmVudCwgcGF5bG9hZCwgb25SZXBseSlcbiAgICB9KVxuICB9XG5cbiAgaGFuZGxlRXZlbnQoZXZlbnQsIGNhbGxiYWNrKXtcbiAgICBsZXQgY2FsbGJhY2tSZWYgPSAoY3VzdG9tRXZlbnQsIGJ5cGFzcykgPT4gYnlwYXNzID8gZXZlbnQgOiBjYWxsYmFjayhjdXN0b21FdmVudC5kZXRhaWwpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoYHBoeDoke2V2ZW50fWAsIGNhbGxiYWNrUmVmKVxuICAgIHRoaXMuX19saXN0ZW5lcnMuYWRkKGNhbGxiYWNrUmVmKVxuICAgIHJldHVybiBjYWxsYmFja1JlZlxuICB9XG5cbiAgcmVtb3ZlSGFuZGxlRXZlbnQoY2FsbGJhY2tSZWYpe1xuICAgIGxldCBldmVudCA9IGNhbGxiYWNrUmVmKG51bGwsIHRydWUpXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoYHBoeDoke2V2ZW50fWAsIGNhbGxiYWNrUmVmKVxuICAgIHRoaXMuX19saXN0ZW5lcnMuZGVsZXRlKGNhbGxiYWNrUmVmKVxuICB9XG5cbiAgdXBsb2FkKG5hbWUsIGZpbGVzKXtcbiAgICByZXR1cm4gdGhpcy5fX3ZpZXcuZGlzcGF0Y2hVcGxvYWRzKG5hbWUsIGZpbGVzKVxuICB9XG5cbiAgdXBsb2FkVG8ocGh4VGFyZ2V0LCBuYW1lLCBmaWxlcyl7XG4gICAgcmV0dXJuIHRoaXMuX192aWV3LndpdGhpblRhcmdldHMocGh4VGFyZ2V0LCB2aWV3ID0+IHZpZXcuZGlzcGF0Y2hVcGxvYWRzKG5hbWUsIGZpbGVzKSlcbiAgfVxuXG4gIF9fY2xlYW51cF9fKCl7XG4gICAgdGhpcy5fX2xpc3RlbmVycy5mb3JFYWNoKGNhbGxiYWNrUmVmID0+IHRoaXMucmVtb3ZlSGFuZGxlRXZlbnQoY2FsbGJhY2tSZWYpKVxuICB9XG59XG4iLCAiaW1wb3J0IERPTSBmcm9tIFwiLi9kb21cIlxuXG5sZXQgSlMgPSB7XG4gIGV4ZWMoZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGRlZmF1bHRzKXtcbiAgICBsZXQgW2RlZmF1bHRLaW5kLCBkZWZhdWx0QXJnc10gPSBkZWZhdWx0cyB8fCBbbnVsbCwge31dXG4gICAgbGV0IGNvbW1hbmRzID0gcGh4RXZlbnQuY2hhckF0KDApID09PSBcIltcIiA/XG4gICAgICBKU09OLnBhcnNlKHBoeEV2ZW50KSA6IFtbZGVmYXVsdEtpbmQsIGRlZmF1bHRBcmdzXV1cblxuICAgIGNvbW1hbmRzLmZvckVhY2goKFtraW5kLCBhcmdzXSkgPT4ge1xuICAgICAgaWYoa2luZCA9PT0gZGVmYXVsdEtpbmQgJiYgZGVmYXVsdEFyZ3MuZGF0YSl7XG4gICAgICAgIGFyZ3MuZGF0YSA9IE9iamVjdC5hc3NpZ24oYXJncy5kYXRhIHx8IHt9LCBkZWZhdWx0QXJncy5kYXRhKVxuICAgICAgfVxuICAgICAgdGhpcy5maWx0ZXJUb0Vscyhzb3VyY2VFbCwgYXJncykuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIHRoaXNbYGV4ZWNfJHtraW5kfWBdKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwgYXJncylcbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcblxuICBpc1Zpc2libGUoZWwpe1xuICAgIHJldHVybiAhIShlbC5vZmZzZXRXaWR0aCB8fCBlbC5vZmZzZXRIZWlnaHQgfHwgZWwuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGggPiAwKVxuICB9LFxuXG4gIC8vIHByaXZhdGVcblxuICAvLyBjb21tYW5kc1xuXG4gIGV4ZWNfZGlzcGF0Y2goZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7dG8sIGV2ZW50LCBkZXRhaWwsIGJ1YmJsZXN9KXtcbiAgICBkZXRhaWwgPSBkZXRhaWwgfHwge31cbiAgICBkZXRhaWwuZGlzcGF0Y2hlciA9IHNvdXJjZUVsXG4gICAgRE9NLmRpc3BhdGNoRXZlbnQoZWwsIGV2ZW50LCB7ZGV0YWlsLCBidWJibGVzfSlcbiAgfSxcblxuICBleGVjX3B1c2goZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCBhcmdzKXtcbiAgICBpZighdmlldy5pc0Nvbm5lY3RlZCgpKXsgcmV0dXJuIH1cblxuICAgIGxldCB7ZXZlbnQsIGRhdGEsIHRhcmdldCwgcGFnZV9sb2FkaW5nLCBsb2FkaW5nLCB2YWx1ZSwgZGlzcGF0Y2hlcn0gPSBhcmdzXG4gICAgbGV0IHB1c2hPcHRzID0ge2xvYWRpbmcsIHZhbHVlLCB0YXJnZXQsIHBhZ2VfbG9hZGluZzogISFwYWdlX2xvYWRpbmd9XG4gICAgbGV0IHRhcmdldFNyYyA9IGV2ZW50VHlwZSA9PT0gXCJjaGFuZ2VcIiAmJiBkaXNwYXRjaGVyID8gZGlzcGF0Y2hlciA6IHNvdXJjZUVsXG4gICAgbGV0IHBoeFRhcmdldCA9IHRhcmdldCB8fCB0YXJnZXRTcmMuZ2V0QXR0cmlidXRlKHZpZXcuYmluZGluZyhcInRhcmdldFwiKSkgfHwgdGFyZ2V0U3JjXG4gICAgdmlldy53aXRoaW5UYXJnZXRzKHBoeFRhcmdldCwgKHRhcmdldFZpZXcsIHRhcmdldEN0eCkgPT4ge1xuICAgICAgaWYoZXZlbnRUeXBlID09PSBcImNoYW5nZVwiKXtcbiAgICAgICAgbGV0IHtuZXdDaWQsIF90YXJnZXQsIGNhbGxiYWNrfSA9IGFyZ3NcbiAgICAgICAgX3RhcmdldCA9IF90YXJnZXQgfHwgKHNvdXJjZUVsIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCA/IHNvdXJjZUVsLm5hbWUgOiB1bmRlZmluZWQpXG4gICAgICAgIGlmKF90YXJnZXQpeyBwdXNoT3B0cy5fdGFyZ2V0ID0gX3RhcmdldCB9XG4gICAgICAgIHRhcmdldFZpZXcucHVzaElucHV0KHNvdXJjZUVsLCB0YXJnZXRDdHgsIG5ld0NpZCwgZXZlbnQgfHwgcGh4RXZlbnQsIHB1c2hPcHRzLCBjYWxsYmFjaylcbiAgICAgIH0gZWxzZSBpZihldmVudFR5cGUgPT09IFwic3VibWl0XCIpe1xuICAgICAgICB0YXJnZXRWaWV3LnN1Ym1pdEZvcm0oc291cmNlRWwsIHRhcmdldEN0eCwgZXZlbnQgfHwgcGh4RXZlbnQsIHB1c2hPcHRzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0Vmlldy5wdXNoRXZlbnQoZXZlbnRUeXBlLCBzb3VyY2VFbCwgdGFyZ2V0Q3R4LCBldmVudCB8fCBwaHhFdmVudCwgZGF0YSwgcHVzaE9wdHMpXG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICBleGVjX2FkZF9jbGFzcyhldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHtuYW1lcywgdHJhbnNpdGlvbiwgdGltZX0pe1xuICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBuYW1lcywgW10sIHRyYW5zaXRpb24sIHRpbWUsIHZpZXcpXG4gIH0sXG5cbiAgZXhlY19yZW1vdmVfY2xhc3MoZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7bmFtZXMsIHRyYW5zaXRpb24sIHRpbWV9KXtcbiAgICB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgW10sIG5hbWVzLCB0cmFuc2l0aW9uLCB0aW1lLCB2aWV3KVxuICB9LFxuXG4gIGV4ZWNfdHJhbnNpdGlvbihldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHt0aW1lLCB0cmFuc2l0aW9ufSl7XG4gICAgbGV0IFt0cmFuc2l0aW9uX3N0YXJ0LCBydW5uaW5nLCB0cmFuc2l0aW9uX2VuZF0gPSB0cmFuc2l0aW9uXG4gICAgbGV0IG9uU3RhcnQgPSAoKSA9PiB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgdHJhbnNpdGlvbl9zdGFydC5jb25jYXQocnVubmluZyksIFtdKVxuICAgIGxldCBvbkRvbmUgPSAoKSA9PiB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgdHJhbnNpdGlvbl9lbmQsIHRyYW5zaXRpb25fc3RhcnQuY29uY2F0KHJ1bm5pbmcpKVxuICAgIHZpZXcudHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCBvbkRvbmUpXG4gIH0sXG5cbiAgZXhlY190b2dnbGUoZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7ZGlzcGxheSwgaW5zLCBvdXRzLCB0aW1lfSl7XG4gICAgdGhpcy50b2dnbGUoZXZlbnRUeXBlLCB2aWV3LCBlbCwgZGlzcGxheSwgaW5zLCBvdXRzLCB0aW1lKVxuICB9LFxuXG4gIGV4ZWNfc2hvdyhldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHtkaXNwbGF5LCB0cmFuc2l0aW9uLCB0aW1lfSl7XG4gICAgdGhpcy5zaG93KGV2ZW50VHlwZSwgdmlldywgZWwsIGRpc3BsYXksIHRyYW5zaXRpb24sIHRpbWUpXG4gIH0sXG5cbiAgZXhlY19oaWRlKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge2Rpc3BsYXksIHRyYW5zaXRpb24sIHRpbWV9KXtcbiAgICB0aGlzLmhpZGUoZXZlbnRUeXBlLCB2aWV3LCBlbCwgZGlzcGxheSwgdHJhbnNpdGlvbiwgdGltZSlcbiAgfSxcblxuICBleGVjX3NldF9hdHRyKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge2F0dHI6IFthdHRyLCB2YWxdfSl7XG4gICAgdGhpcy5zZXRPclJlbW92ZUF0dHJzKGVsLCBbW2F0dHIsIHZhbF1dLCBbXSlcbiAgfSxcblxuICBleGVjX3JlbW92ZV9hdHRyKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge2F0dHJ9KXtcbiAgICB0aGlzLnNldE9yUmVtb3ZlQXR0cnMoZWwsIFtdLCBbYXR0cl0pXG4gIH0sXG5cbiAgLy8gdXRpbHMgZm9yIGNvbW1hbmRzXG5cbiAgc2hvdyhldmVudFR5cGUsIHZpZXcsIGVsLCBkaXNwbGF5LCB0cmFuc2l0aW9uLCB0aW1lKXtcbiAgICBpZighdGhpcy5pc1Zpc2libGUoZWwpKXtcbiAgICAgIHRoaXMudG9nZ2xlKGV2ZW50VHlwZSwgdmlldywgZWwsIGRpc3BsYXksIHRyYW5zaXRpb24sIG51bGwsIHRpbWUpXG4gICAgfVxuICB9LFxuXG4gIGhpZGUoZXZlbnRUeXBlLCB2aWV3LCBlbCwgZGlzcGxheSwgdHJhbnNpdGlvbiwgdGltZSl7XG4gICAgaWYodGhpcy5pc1Zpc2libGUoZWwpKXtcbiAgICAgIHRoaXMudG9nZ2xlKGV2ZW50VHlwZSwgdmlldywgZWwsIGRpc3BsYXksIG51bGwsIHRyYW5zaXRpb24sIHRpbWUpXG4gICAgfVxuICB9LFxuXG4gIHRvZ2dsZShldmVudFR5cGUsIHZpZXcsIGVsLCBkaXNwbGF5LCBpbnMsIG91dHMsIHRpbWUpe1xuICAgIGxldCBbaW5DbGFzc2VzLCBpblN0YXJ0Q2xhc3NlcywgaW5FbmRDbGFzc2VzXSA9IGlucyB8fCBbW10sIFtdLCBbXV1cbiAgICBsZXQgW291dENsYXNzZXMsIG91dFN0YXJ0Q2xhc3Nlcywgb3V0RW5kQ2xhc3Nlc10gPSBvdXRzIHx8IFtbXSwgW10sIFtdXVxuICAgIGlmKGluQ2xhc3Nlcy5sZW5ndGggPiAwIHx8IG91dENsYXNzZXMubGVuZ3RoID4gMCl7XG4gICAgICBpZih0aGlzLmlzVmlzaWJsZShlbCkpe1xuICAgICAgICBsZXQgb25TdGFydCA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgb3V0U3RhcnRDbGFzc2VzLCBpbkNsYXNzZXMuY29uY2F0KGluU3RhcnRDbGFzc2VzKS5jb25jYXQoaW5FbmRDbGFzc2VzKSlcbiAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBvdXRDbGFzc2VzLCBbXSlcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIG91dEVuZENsYXNzZXMsIG91dFN0YXJ0Q2xhc3NlcykpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInBoeDpoaWRlLXN0YXJ0XCIpKVxuICAgICAgICB2aWV3LnRyYW5zaXRpb24odGltZSwgb25TdGFydCwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBbXSwgb3V0Q2xhc3Nlcy5jb25jYXQob3V0RW5kQ2xhc3NlcykpXG4gICAgICAgICAgRE9NLnB1dFN0aWNreShlbCwgXCJ0b2dnbGVcIiwgY3VycmVudEVsID0+IGN1cnJlbnRFbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCIpXG4gICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJwaHg6aGlkZS1lbmRcIikpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZihldmVudFR5cGUgPT09IFwicmVtb3ZlXCIpeyByZXR1cm4gfVxuICAgICAgICBsZXQgb25TdGFydCA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgaW5TdGFydENsYXNzZXMsIG91dENsYXNzZXMuY29uY2F0KG91dFN0YXJ0Q2xhc3NlcykuY29uY2F0KG91dEVuZENsYXNzZXMpKVxuICAgICAgICAgIERPTS5wdXRTdGlja3koZWwsIFwidG9nZ2xlXCIsIGN1cnJlbnRFbCA9PiBjdXJyZW50RWwuc3R5bGUuZGlzcGxheSA9IChkaXNwbGF5IHx8IFwiYmxvY2tcIikpXG4gICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgaW5DbGFzc2VzLCBbXSlcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIGluRW5kQ2xhc3NlcywgaW5TdGFydENsYXNzZXMpKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJwaHg6c2hvdy1zdGFydFwiKSlcbiAgICAgICAgdmlldy50cmFuc2l0aW9uKHRpbWUsIG9uU3RhcnQsICgpID0+IHtcbiAgICAgICAgICB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgW10sIGluQ2xhc3Nlcy5jb25jYXQoaW5FbmRDbGFzc2VzKSlcbiAgICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInBoeDpzaG93LWVuZFwiKSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYodGhpcy5pc1Zpc2libGUoZWwpKXtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJwaHg6aGlkZS1zdGFydFwiKSlcbiAgICAgICAgICBET00ucHV0U3RpY2t5KGVsLCBcInRvZ2dsZVwiLCBjdXJyZW50RWwgPT4gY3VycmVudEVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIilcbiAgICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInBoeDpoaWRlLWVuZFwiKSlcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicGh4OnNob3ctc3RhcnRcIikpXG4gICAgICAgICAgRE9NLnB1dFN0aWNreShlbCwgXCJ0b2dnbGVcIiwgY3VycmVudEVsID0+IGN1cnJlbnRFbC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheSB8fCBcImJsb2NrXCIpXG4gICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJwaHg6c2hvdy1lbmRcIikpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgYWRkcywgcmVtb3ZlcywgdHJhbnNpdGlvbiwgdGltZSwgdmlldyl7XG4gICAgbGV0IFt0cmFuc2l0aW9uX3J1biwgdHJhbnNpdGlvbl9zdGFydCwgdHJhbnNpdGlvbl9lbmRdID0gdHJhbnNpdGlvbiB8fCBbW10sIFtdLCBbXV1cbiAgICBpZih0cmFuc2l0aW9uX3J1bi5sZW5ndGggPiAwKXtcbiAgICAgIGxldCBvblN0YXJ0ID0gKCkgPT4gdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIHRyYW5zaXRpb25fc3RhcnQuY29uY2F0KHRyYW5zaXRpb25fcnVuKSwgW10pXG4gICAgICBsZXQgb25Eb25lID0gKCkgPT4gdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIGFkZHMuY29uY2F0KHRyYW5zaXRpb25fZW5kKSwgcmVtb3Zlcy5jb25jYXQodHJhbnNpdGlvbl9ydW4pLmNvbmNhdCh0cmFuc2l0aW9uX3N0YXJ0KSlcbiAgICAgIHJldHVybiB2aWV3LnRyYW5zaXRpb24odGltZSwgb25TdGFydCwgb25Eb25lKVxuICAgIH1cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGxldCBbcHJldkFkZHMsIHByZXZSZW1vdmVzXSA9IERPTS5nZXRTdGlja3koZWwsIFwiY2xhc3Nlc1wiLCBbW10sIFtdXSlcbiAgICAgIGxldCBrZWVwQWRkcyA9IGFkZHMuZmlsdGVyKG5hbWUgPT4gcHJldkFkZHMuaW5kZXhPZihuYW1lKSA8IDAgJiYgIWVsLmNsYXNzTGlzdC5jb250YWlucyhuYW1lKSlcbiAgICAgIGxldCBrZWVwUmVtb3ZlcyA9IHJlbW92ZXMuZmlsdGVyKG5hbWUgPT4gcHJldlJlbW92ZXMuaW5kZXhPZihuYW1lKSA8IDAgJiYgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpKVxuICAgICAgbGV0IG5ld0FkZHMgPSBwcmV2QWRkcy5maWx0ZXIobmFtZSA9PiByZW1vdmVzLmluZGV4T2YobmFtZSkgPCAwKS5jb25jYXQoa2VlcEFkZHMpXG4gICAgICBsZXQgbmV3UmVtb3ZlcyA9IHByZXZSZW1vdmVzLmZpbHRlcihuYW1lID0+IGFkZHMuaW5kZXhPZihuYW1lKSA8IDApLmNvbmNhdChrZWVwUmVtb3ZlcylcblxuICAgICAgRE9NLnB1dFN0aWNreShlbCwgXCJjbGFzc2VzXCIsIGN1cnJlbnRFbCA9PiB7XG4gICAgICAgIGN1cnJlbnRFbC5jbGFzc0xpc3QucmVtb3ZlKC4uLm5ld1JlbW92ZXMpXG4gICAgICAgIGN1cnJlbnRFbC5jbGFzc0xpc3QuYWRkKC4uLm5ld0FkZHMpXG4gICAgICAgIHJldHVybiBbbmV3QWRkcywgbmV3UmVtb3Zlc11cbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcblxuICBzZXRPclJlbW92ZUF0dHJzKGVsLCBzZXRzLCByZW1vdmVzKXtcbiAgICBsZXQgW3ByZXZTZXRzLCBwcmV2UmVtb3Zlc10gPSBET00uZ2V0U3RpY2t5KGVsLCBcImF0dHJzXCIsIFtbXSwgW11dKVxuXG4gICAgbGV0IGFsdGVyZWRBdHRycyA9IHNldHMubWFwKChbYXR0ciwgX3ZhbF0pID0+IGF0dHIpLmNvbmNhdChyZW1vdmVzKTtcbiAgICBsZXQgbmV3U2V0cyA9IHByZXZTZXRzLmZpbHRlcigoW2F0dHIsIF92YWxdKSA9PiAhYWx0ZXJlZEF0dHJzLmluY2x1ZGVzKGF0dHIpKS5jb25jYXQoc2V0cyk7XG4gICAgbGV0IG5ld1JlbW92ZXMgPSBwcmV2UmVtb3Zlcy5maWx0ZXIoKGF0dHIpID0+ICFhbHRlcmVkQXR0cnMuaW5jbHVkZXMoYXR0cikpLmNvbmNhdChyZW1vdmVzKTtcblxuICAgIERPTS5wdXRTdGlja3koZWwsIFwiYXR0cnNcIiwgY3VycmVudEVsID0+IHtcbiAgICAgIG5ld1JlbW92ZXMuZm9yRWFjaChhdHRyID0+IGN1cnJlbnRFbC5yZW1vdmVBdHRyaWJ1dGUoYXR0cikpXG4gICAgICBuZXdTZXRzLmZvckVhY2goKFthdHRyLCB2YWxdKSA9PiBjdXJyZW50RWwuc2V0QXR0cmlidXRlKGF0dHIsIHZhbCkpXG4gICAgICByZXR1cm4gW25ld1NldHMsIG5ld1JlbW92ZXNdXG4gICAgfSlcbiAgfSxcblxuICBoYXNBbGxDbGFzc2VzKGVsLCBjbGFzc2VzKXsgcmV0dXJuIGNsYXNzZXMuZXZlcnkobmFtZSA9PiBlbC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSkpIH0sXG5cbiAgaXNUb2dnbGVkT3V0KGVsLCBvdXRDbGFzc2VzKXtcbiAgICByZXR1cm4gIXRoaXMuaXNWaXNpYmxlKGVsKSB8fCB0aGlzLmhhc0FsbENsYXNzZXMoZWwsIG91dENsYXNzZXMpXG4gIH0sXG5cbiAgZmlsdGVyVG9FbHMoc291cmNlRWwsIHt0b30pe1xuICAgIHJldHVybiB0byA/IERPTS5hbGwoZG9jdW1lbnQsIHRvKSA6IFtzb3VyY2VFbF1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBKU1xuIiwgImltcG9ydCB7XG4gIEJFRk9SRV9VTkxPQURfTE9BREVSX1RJTUVPVVQsXG4gIENIRUNLQUJMRV9JTlBVVFMsXG4gIENPTlNFQ1VUSVZFX1JFTE9BRFMsXG4gIFBIWF9BVVRPX1JFQ09WRVIsXG4gIFBIWF9DT01QT05FTlQsXG4gIFBIWF9DT05ORUNURURfQ0xBU1MsXG4gIFBIWF9ESVNBQkxFX1dJVEgsXG4gIFBIWF9ESVNBQkxFX1dJVEhfUkVTVE9SRSxcbiAgUEhYX0RJU0FCTEVELFxuICBQSFhfRElTQ09OTkVDVEVEX0NMQVNTLFxuICBQSFhfRVZFTlRfQ0xBU1NFUyxcbiAgUEhYX0VSUk9SX0NMQVNTLFxuICBQSFhfRkVFREJBQ0tfRk9SLFxuICBQSFhfSEFTX1NVQk1JVFRFRCxcbiAgUEhYX0hPT0ssXG4gIFBIWF9QQUdFX0xPQURJTkcsXG4gIFBIWF9QQVJFTlRfSUQsXG4gIFBIWF9QUk9HUkVTUyxcbiAgUEhYX1JFQURPTkxZLFxuICBQSFhfUkVGLFxuICBQSFhfUkVGX1NSQyxcbiAgUEhYX1JPT1RfSUQsXG4gIFBIWF9TRVNTSU9OLFxuICBQSFhfU1RBVElDLFxuICBQSFhfVFJBQ0tfU1RBVElDLFxuICBQSFhfVFJBQ0tfVVBMT0FEUyxcbiAgUEhYX1VQREFURSxcbiAgUEhYX1VQTE9BRF9SRUYsXG4gIFBIWF9WSUVXX1NFTEVDVE9SLFxuICBQVVNIX1RJTUVPVVQsXG4gIFBIWF9NQUlOLFxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQge1xuICBjbG9uZSxcbiAgY2xvc2VzdFBoeEJpbmRpbmcsXG4gIGlzRW1wdHksXG4gIGlzRXF1YWxPYmosXG4gIGxvZ0Vycm9yLFxuICBtYXliZSxcbiAgaXNDaWQsXG59IGZyb20gXCIuL3V0aWxzXCJcblxuaW1wb3J0IEJyb3dzZXIgZnJvbSBcIi4vYnJvd3NlclwiXG5pbXBvcnQgRE9NIGZyb20gXCIuL2RvbVwiXG5pbXBvcnQgRE9NUGF0Y2ggZnJvbSBcIi4vZG9tX3BhdGNoXCJcbmltcG9ydCBMaXZlVXBsb2FkZXIgZnJvbSBcIi4vbGl2ZV91cGxvYWRlclwiXG5pbXBvcnQgUmVuZGVyZWQgZnJvbSBcIi4vcmVuZGVyZWRcIlxuaW1wb3J0IFZpZXdIb29rIGZyb20gXCIuL3ZpZXdfaG9va1wiXG5pbXBvcnQgSlMgZnJvbSBcIi4vanNcIlxuXG5sZXQgc2VyaWFsaXplRm9ybSA9IChmb3JtLCBtZXRhLCBvbmx5TmFtZXMgPSBbXSkgPT4ge1xuICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSlcbiAgbGV0IHRvUmVtb3ZlID0gW11cblxuICBmb3JtRGF0YS5mb3JFYWNoKCh2YWwsIGtleSwgX2luZGV4KSA9PiB7XG4gICAgaWYodmFsIGluc3RhbmNlb2YgRmlsZSl7IHRvUmVtb3ZlLnB1c2goa2V5KSB9XG4gIH0pXG5cbiAgLy8gQ2xlYW51cCBhZnRlciBidWlsZGluZyBmaWxlRGF0YVxuICB0b1JlbW92ZS5mb3JFYWNoKGtleSA9PiBmb3JtRGF0YS5kZWxldGUoa2V5KSlcblxuICBsZXQgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpXG4gIGZvcihsZXQgW2tleSwgdmFsXSBvZiBmb3JtRGF0YS5lbnRyaWVzKCkpe1xuICAgIGlmKG9ubHlOYW1lcy5sZW5ndGggPT09IDAgfHwgb25seU5hbWVzLmluZGV4T2Yoa2V5KSA+PSAwKXtcbiAgICAgIHBhcmFtcy5hcHBlbmQoa2V5LCB2YWwpXG4gICAgfVxuICB9XG4gIGZvcihsZXQgbWV0YUtleSBpbiBtZXRhKXsgcGFyYW1zLmFwcGVuZChtZXRhS2V5LCBtZXRhW21ldGFLZXldKSB9XG5cbiAgcmV0dXJuIHBhcmFtcy50b1N0cmluZygpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXcge1xuICBjb25zdHJ1Y3RvcihlbCwgbGl2ZVNvY2tldCwgcGFyZW50VmlldywgZmxhc2gpe1xuICAgIHRoaXMubGl2ZVNvY2tldCA9IGxpdmVTb2NrZXRcbiAgICB0aGlzLmZsYXNoID0gZmxhc2hcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudFZpZXdcbiAgICB0aGlzLnJvb3QgPSBwYXJlbnRWaWV3ID8gcGFyZW50Vmlldy5yb290IDogdGhpc1xuICAgIHRoaXMuZWwgPSBlbFxuICAgIHRoaXMuaWQgPSB0aGlzLmVsLmlkXG4gICAgdGhpcy5yZWYgPSAwXG4gICAgdGhpcy5jaGlsZEpvaW5zID0gMFxuICAgIHRoaXMubG9hZGVyVGltZXIgPSBudWxsXG4gICAgdGhpcy5wZW5kaW5nRGlmZnMgPSBbXVxuICAgIHRoaXMucHJ1bmluZ0NJRHMgPSBbXVxuICAgIHRoaXMucmVkaXJlY3QgPSBmYWxzZVxuICAgIHRoaXMuaHJlZiA9IG51bGxcbiAgICB0aGlzLmpvaW5Db3VudCA9IHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuam9pbkNvdW50IC0gMSA6IDBcbiAgICB0aGlzLmpvaW5QZW5kaW5nID0gdHJ1ZVxuICAgIHRoaXMuZGVzdHJveWVkID0gZmFsc2VcbiAgICB0aGlzLmpvaW5DYWxsYmFjayA9IGZ1bmN0aW9uKG9uRG9uZSl7IG9uRG9uZSAmJiBvbkRvbmUoKSB9XG4gICAgdGhpcy5zdG9wQ2FsbGJhY2sgPSBmdW5jdGlvbigpeyB9XG4gICAgdGhpcy5wZW5kaW5nSm9pbk9wcyA9IHRoaXMucGFyZW50ID8gbnVsbCA6IFtdXG4gICAgdGhpcy52aWV3SG9va3MgPSB7fVxuICAgIHRoaXMudXBsb2FkZXJzID0ge31cbiAgICB0aGlzLmZvcm1TdWJtaXRzID0gW11cbiAgICB0aGlzLmNoaWxkcmVuID0gdGhpcy5wYXJlbnQgPyBudWxsIDoge31cbiAgICB0aGlzLnJvb3QuY2hpbGRyZW5bdGhpcy5pZF0gPSB7fVxuICAgIHRoaXMuY2hhbm5lbCA9IHRoaXMubGl2ZVNvY2tldC5jaGFubmVsKGBsdjoke3RoaXMuaWR9YCwgKCkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVkaXJlY3Q6IHRoaXMucmVkaXJlY3QgPyB0aGlzLmhyZWYgOiB1bmRlZmluZWQsXG4gICAgICAgIHVybDogdGhpcy5yZWRpcmVjdCA/IHVuZGVmaW5lZCA6IHRoaXMuaHJlZiB8fCB1bmRlZmluZWQsXG4gICAgICAgIHBhcmFtczogdGhpcy5jb25uZWN0UGFyYW1zKCksXG4gICAgICAgIHNlc3Npb246IHRoaXMuZ2V0U2Vzc2lvbigpLFxuICAgICAgICBzdGF0aWM6IHRoaXMuZ2V0U3RhdGljKCksXG4gICAgICAgIGZsYXNoOiB0aGlzLmZsYXNoXG4gICAgICB9XG4gICAgfSlcbiAgICB0aGlzLnNob3dMb2FkZXIodGhpcy5saXZlU29ja2V0LmxvYWRlclRpbWVvdXQpXG4gICAgdGhpcy5iaW5kQ2hhbm5lbCgpXG4gIH1cblxuICBzZXRIcmVmKGhyZWYpeyB0aGlzLmhyZWYgPSBocmVmIH1cblxuICBzZXRSZWRpcmVjdChocmVmKXtcbiAgICB0aGlzLnJlZGlyZWN0ID0gdHJ1ZVxuICAgIHRoaXMuaHJlZiA9IGhyZWZcbiAgfVxuXG4gIGlzTWFpbigpeyByZXR1cm4gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoUEhYX01BSU4pICE9PSBudWxsIH1cblxuICBjb25uZWN0UGFyYW1zKCl7XG4gICAgbGV0IHBhcmFtcyA9IHRoaXMubGl2ZVNvY2tldC5wYXJhbXModGhpcy5lbClcbiAgICBsZXQgbWFuaWZlc3QgPVxuICAgICAgRE9NLmFsbChkb2N1bWVudCwgYFske3RoaXMuYmluZGluZyhQSFhfVFJBQ0tfU1RBVElDKX1dYClcbiAgICAgICAgLm1hcChub2RlID0+IG5vZGUuc3JjIHx8IG5vZGUuaHJlZikuZmlsdGVyKHVybCA9PiB0eXBlb2YgKHVybCkgPT09IFwic3RyaW5nXCIpXG5cbiAgICBpZihtYW5pZmVzdC5sZW5ndGggPiAwKXsgcGFyYW1zW1wiX3RyYWNrX3N0YXRpY1wiXSA9IG1hbmlmZXN0IH1cbiAgICBwYXJhbXNbXCJfbW91bnRzXCJdID0gdGhpcy5qb2luQ291bnRcblxuICAgIHJldHVybiBwYXJhbXNcbiAgfVxuXG4gIGlzQ29ubmVjdGVkKCl7IHJldHVybiB0aGlzLmNoYW5uZWwuY2FuUHVzaCgpIH1cblxuICBnZXRTZXNzaW9uKCl7IHJldHVybiB0aGlzLmVsLmdldEF0dHJpYnV0ZShQSFhfU0VTU0lPTikgfVxuXG4gIGdldFN0YXRpYygpe1xuICAgIGxldCB2YWwgPSB0aGlzLmVsLmdldEF0dHJpYnV0ZShQSFhfU1RBVElDKVxuICAgIHJldHVybiB2YWwgPT09IFwiXCIgPyBudWxsIDogdmFsXG4gIH1cblxuICBkZXN0cm95KGNhbGxiYWNrID0gZnVuY3Rpb24gKCl7IH0pe1xuICAgIHRoaXMuZGVzdHJveUFsbENoaWxkcmVuKClcbiAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWVcbiAgICBkZWxldGUgdGhpcy5yb290LmNoaWxkcmVuW3RoaXMuaWRdXG4gICAgaWYodGhpcy5wYXJlbnQpeyBkZWxldGUgdGhpcy5yb290LmNoaWxkcmVuW3RoaXMucGFyZW50LmlkXVt0aGlzLmlkXSB9XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMubG9hZGVyVGltZXIpXG4gICAgbGV0IG9uRmluaXNoZWQgPSAoKSA9PiB7XG4gICAgICBjYWxsYmFjaygpXG4gICAgICBmb3IobGV0IGlkIGluIHRoaXMudmlld0hvb2tzKXtcbiAgICAgICAgdGhpcy5kZXN0cm95SG9vayh0aGlzLnZpZXdIb29rc1tpZF0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgRE9NLm1hcmtQaHhDaGlsZERlc3Ryb3llZCh0aGlzLmVsKVxuXG4gICAgdGhpcy5sb2coXCJkZXN0cm95ZWRcIiwgKCkgPT4gW1widGhlIGNoaWxkIGhhcyBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgcGFyZW50XCJdKVxuICAgIHRoaXMuY2hhbm5lbC5sZWF2ZSgpXG4gICAgICAucmVjZWl2ZShcIm9rXCIsIG9uRmluaXNoZWQpXG4gICAgICAucmVjZWl2ZShcImVycm9yXCIsIG9uRmluaXNoZWQpXG4gICAgICAucmVjZWl2ZShcInRpbWVvdXRcIiwgb25GaW5pc2hlZClcbiAgfVxuXG4gIHNldENvbnRhaW5lckNsYXNzZXMoLi4uY2xhc3Nlcyl7XG4gICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKFxuICAgICAgUEhYX0NPTk5FQ1RFRF9DTEFTUyxcbiAgICAgIFBIWF9ESVNDT05ORUNURURfQ0xBU1MsXG4gICAgICBQSFhfRVJST1JfQ0xBU1NcbiAgICApXG4gICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpXG4gIH1cblxuICBzaG93TG9hZGVyKHRpbWVvdXQpe1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmxvYWRlclRpbWVyKVxuICAgIGlmKHRpbWVvdXQpe1xuICAgICAgdGhpcy5sb2FkZXJUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zaG93TG9hZGVyKCksIHRpbWVvdXQpXG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcihsZXQgaWQgaW4gdGhpcy52aWV3SG9va3MpeyB0aGlzLnZpZXdIb29rc1tpZF0uX19kaXNjb25uZWN0ZWQoKSB9XG4gICAgICB0aGlzLnNldENvbnRhaW5lckNsYXNzZXMoUEhYX0RJU0NPTk5FQ1RFRF9DTEFTUylcbiAgICB9XG4gIH1cblxuICBoaWRlTG9hZGVyKCl7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMubG9hZGVyVGltZXIpXG4gICAgdGhpcy5zZXRDb250YWluZXJDbGFzc2VzKFBIWF9DT05ORUNURURfQ0xBU1MpXG4gIH1cblxuICB0cmlnZ2VyUmVjb25uZWN0ZWQoKXtcbiAgICBmb3IobGV0IGlkIGluIHRoaXMudmlld0hvb2tzKXsgdGhpcy52aWV3SG9va3NbaWRdLl9fcmVjb25uZWN0ZWQoKSB9XG4gIH1cblxuICBsb2coa2luZCwgbXNnQ2FsbGJhY2spe1xuICAgIHRoaXMubGl2ZVNvY2tldC5sb2codGhpcywga2luZCwgbXNnQ2FsbGJhY2spXG4gIH1cblxuICB0cmFuc2l0aW9uKHRpbWUsIG9uU3RhcnQsIG9uRG9uZSA9IGZ1bmN0aW9uKCl7fSl7XG4gICAgdGhpcy5saXZlU29ja2V0LnRyYW5zaXRpb24odGltZSwgb25TdGFydCwgb25Eb25lKVxuICB9XG5cbiAgd2l0aGluVGFyZ2V0cyhwaHhUYXJnZXQsIGNhbGxiYWNrKXtcbiAgICBpZihwaHhUYXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCB8fCBwaHhUYXJnZXQgaW5zdGFuY2VvZiBTVkdFbGVtZW50KXtcbiAgICAgIHJldHVybiB0aGlzLmxpdmVTb2NrZXQub3duZXIocGh4VGFyZ2V0LCB2aWV3ID0+IGNhbGxiYWNrKHZpZXcsIHBoeFRhcmdldCkpXG4gICAgfVxuXG4gICAgaWYoaXNDaWQocGh4VGFyZ2V0KSl7XG4gICAgICBsZXQgdGFyZ2V0cyA9IERPTS5maW5kQ29tcG9uZW50Tm9kZUxpc3QodGhpcy5lbCwgcGh4VGFyZ2V0KVxuICAgICAgaWYodGFyZ2V0cy5sZW5ndGggPT09IDApe1xuICAgICAgICBsb2dFcnJvcihgbm8gY29tcG9uZW50IGZvdW5kIG1hdGNoaW5nIHBoeC10YXJnZXQgb2YgJHtwaHhUYXJnZXR9YClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrKHRoaXMsIHBhcnNlSW50KHBoeFRhcmdldCkpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB0YXJnZXRzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBoeFRhcmdldCkpXG4gICAgICBpZih0YXJnZXRzLmxlbmd0aCA9PT0gMCl7IGxvZ0Vycm9yKGBub3RoaW5nIGZvdW5kIG1hdGNoaW5nIHRoZSBwaHgtdGFyZ2V0IHNlbGVjdG9yIFwiJHtwaHhUYXJnZXR9XCJgKSB9XG4gICAgICB0YXJnZXRzLmZvckVhY2godGFyZ2V0ID0+IHRoaXMubGl2ZVNvY2tldC5vd25lcih0YXJnZXQsIHZpZXcgPT4gY2FsbGJhY2sodmlldywgdGFyZ2V0KSkpXG4gICAgfVxuICB9XG5cbiAgYXBwbHlEaWZmKHR5cGUsIHJhd0RpZmYsIGNhbGxiYWNrKXtcbiAgICB0aGlzLmxvZyh0eXBlLCAoKSA9PiBbXCJcIiwgY2xvbmUocmF3RGlmZildKVxuICAgIGxldCB7ZGlmZiwgcmVwbHksIGV2ZW50cywgdGl0bGV9ID0gUmVuZGVyZWQuZXh0cmFjdChyYXdEaWZmKVxuICAgIGlmKHRpdGxlKXsgRE9NLnB1dFRpdGxlKHRpdGxlKSB9XG5cbiAgICBjYWxsYmFjayh7ZGlmZiwgcmVwbHksIGV2ZW50c30pXG4gICAgcmV0dXJuIHJlcGx5XG4gIH1cblxuICBvbkpvaW4ocmVzcCl7XG4gICAgbGV0IHtyZW5kZXJlZCwgY29udGFpbmVyfSA9IHJlc3BcbiAgICBpZihjb250YWluZXIpe1xuICAgICAgbGV0IFt0YWcsIGF0dHJzXSA9IGNvbnRhaW5lclxuICAgICAgdGhpcy5lbCA9IERPTS5yZXBsYWNlUm9vdENvbnRhaW5lcih0aGlzLmVsLCB0YWcsIGF0dHJzKVxuICAgIH1cbiAgICB0aGlzLmNoaWxkSm9pbnMgPSAwXG4gICAgdGhpcy5qb2luUGVuZGluZyA9IHRydWVcbiAgICB0aGlzLmZsYXNoID0gbnVsbFxuXG4gICAgQnJvd3Nlci5kcm9wTG9jYWwodGhpcy5saXZlU29ja2V0LmxvY2FsU3RvcmFnZSwgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLCBDT05TRUNVVElWRV9SRUxPQURTKVxuICAgIHRoaXMuYXBwbHlEaWZmKFwibW91bnRcIiwgcmVuZGVyZWQsICh7ZGlmZiwgZXZlbnRzfSkgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJlZCA9IG5ldyBSZW5kZXJlZCh0aGlzLmlkLCBkaWZmKVxuICAgICAgbGV0IGh0bWwgPSB0aGlzLnJlbmRlckNvbnRhaW5lcihudWxsLCBcImpvaW5cIilcbiAgICAgIHRoaXMuZHJvcFBlbmRpbmdSZWZzKClcbiAgICAgIGxldCBmb3JtcyA9IHRoaXMuZm9ybXNGb3JSZWNvdmVyeShodG1sKVxuICAgICAgdGhpcy5qb2luQ291bnQrK1xuXG4gICAgICBpZihmb3Jtcy5sZW5ndGggPiAwKXtcbiAgICAgICAgZm9ybXMuZm9yRWFjaCgoW2Zvcm0sIG5ld0Zvcm0sIG5ld0NpZF0sIGkpID0+IHtcbiAgICAgICAgICB0aGlzLnB1c2hGb3JtUmVjb3ZlcnkoZm9ybSwgbmV3Q2lkLCByZXNwID0+IHtcbiAgICAgICAgICAgIGlmKGkgPT09IGZvcm1zLmxlbmd0aCAtIDEpe1xuICAgICAgICAgICAgICB0aGlzLm9uSm9pbkNvbXBsZXRlKHJlc3AsIGh0bWwsIGV2ZW50cylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vbkpvaW5Db21wbGV0ZShyZXNwLCBodG1sLCBldmVudHMpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGRyb3BQZW5kaW5nUmVmcygpe1xuICAgIERPTS5hbGwoZG9jdW1lbnQsIGBbJHtQSFhfUkVGX1NSQ309XCIke3RoaXMuaWR9XCJdWyR7UEhYX1JFRn1dYCwgZWwgPT4ge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFBIWF9SRUYpXG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoUEhYX1JFRl9TUkMpXG4gICAgfSlcbiAgfVxuXG4gIG9uSm9pbkNvbXBsZXRlKHtsaXZlX3BhdGNofSwgaHRtbCwgZXZlbnRzKXtcbiAgICAvLyBJbiBvcmRlciB0byBwcm92aWRlIGEgYmV0dGVyIGV4cGVyaWVuY2UsIHdlIHdhbnQgdG8gam9pblxuICAgIC8vIGFsbCBMaXZlVmlld3MgZmlyc3QgYW5kIG9ubHkgdGhlbiBhcHBseSB0aGVpciBwYXRjaGVzLlxuICAgIGlmKHRoaXMuam9pbkNvdW50ID4gMSB8fCAodGhpcy5wYXJlbnQgJiYgIXRoaXMucGFyZW50LmlzSm9pblBlbmRpbmcoKSkpe1xuICAgICAgcmV0dXJuIHRoaXMuYXBwbHlKb2luUGF0Y2gobGl2ZV9wYXRjaCwgaHRtbCwgZXZlbnRzKVxuICAgIH1cblxuICAgIC8vIE9uZSBkb3duc2lkZSBvZiB0aGlzIGFwcHJvYWNoIGlzIHRoYXQgd2UgbmVlZCB0byBmaW5kIHBoeENoaWxkcmVuXG4gICAgLy8gaW4gdGhlIGh0bWwgZnJhZ21lbnQsIGluc3RlYWQgb2YgZGlyZWN0bHkgb24gdGhlIERPTS4gVGhlIGZyYWdtZW50XG4gICAgLy8gYWxzbyBkb2VzIG5vdCBpbmNsdWRlIFBIWF9TVEFUSUMsIHNvIHdlIG5lZWQgdG8gY29weSBpdCBvdmVyIGZyb21cbiAgICAvLyB0aGUgRE9NLlxuICAgIGxldCBuZXdDaGlsZHJlbiA9IERPTS5maW5kUGh4Q2hpbGRyZW5JbkZyYWdtZW50KGh0bWwsIHRoaXMuaWQpLmZpbHRlcih0b0VsID0+IHtcbiAgICAgIGxldCBmcm9tRWwgPSB0b0VsLmlkICYmIHRoaXMuZWwucXVlcnlTZWxlY3RvcihgW2lkPVwiJHt0b0VsLmlkfVwiXWApXG4gICAgICBsZXQgcGh4U3RhdGljID0gZnJvbUVsICYmIGZyb21FbC5nZXRBdHRyaWJ1dGUoUEhYX1NUQVRJQylcbiAgICAgIGlmKHBoeFN0YXRpYyl7IHRvRWwuc2V0QXR0cmlidXRlKFBIWF9TVEFUSUMsIHBoeFN0YXRpYykgfVxuICAgICAgcmV0dXJuIHRoaXMuam9pbkNoaWxkKHRvRWwpXG4gICAgfSlcblxuICAgIGlmKG5ld0NoaWxkcmVuLmxlbmd0aCA9PT0gMCl7XG4gICAgICBpZih0aGlzLnBhcmVudCl7XG4gICAgICAgIHRoaXMucm9vdC5wZW5kaW5nSm9pbk9wcy5wdXNoKFt0aGlzLCAoKSA9PiB0aGlzLmFwcGx5Sm9pblBhdGNoKGxpdmVfcGF0Y2gsIGh0bWwsIGV2ZW50cyldKVxuICAgICAgICB0aGlzLnBhcmVudC5hY2tKb2luKHRoaXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uQWxsQ2hpbGRKb2luc0NvbXBsZXRlKClcbiAgICAgICAgdGhpcy5hcHBseUpvaW5QYXRjaChsaXZlX3BhdGNoLCBodG1sLCBldmVudHMpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucm9vdC5wZW5kaW5nSm9pbk9wcy5wdXNoKFt0aGlzLCAoKSA9PiB0aGlzLmFwcGx5Sm9pblBhdGNoKGxpdmVfcGF0Y2gsIGh0bWwsIGV2ZW50cyldKVxuICAgIH1cbiAgfVxuXG4gIGF0dGFjaFRydWVEb2NFbCgpe1xuICAgIHRoaXMuZWwgPSBET00uYnlJZCh0aGlzLmlkKVxuICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKFBIWF9ST09UX0lELCB0aGlzLnJvb3QuaWQpXG4gIH1cblxuICBhcHBseUpvaW5QYXRjaChsaXZlX3BhdGNoLCBodG1sLCBldmVudHMpe1xuICAgIHRoaXMuYXR0YWNoVHJ1ZURvY0VsKClcbiAgICBsZXQgcGF0Y2ggPSBuZXcgRE9NUGF0Y2godGhpcywgdGhpcy5lbCwgdGhpcy5pZCwgaHRtbCwgbnVsbClcbiAgICBwYXRjaC5tYXJrUHJ1bmFibGVDb250ZW50Rm9yUmVtb3ZhbCgpXG4gICAgdGhpcy5wZXJmb3JtUGF0Y2gocGF0Y2gsIGZhbHNlKVxuICAgIHRoaXMuam9pbk5ld0NoaWxkcmVuKClcbiAgICBET00uYWxsKHRoaXMuZWwsIGBbJHt0aGlzLmJpbmRpbmcoUEhYX0hPT0spfV0sIFtkYXRhLXBoeC0ke1BIWF9IT09LfV1gLCBob29rRWwgPT4ge1xuICAgICAgbGV0IGhvb2sgPSB0aGlzLmFkZEhvb2soaG9va0VsKVxuICAgICAgaWYoaG9vayl7IGhvb2suX19tb3VudGVkKCkgfVxuICAgIH0pXG5cbiAgICB0aGlzLmpvaW5QZW5kaW5nID0gZmFsc2VcbiAgICB0aGlzLmxpdmVTb2NrZXQuZGlzcGF0Y2hFdmVudHMoZXZlbnRzKVxuICAgIHRoaXMuYXBwbHlQZW5kaW5nVXBkYXRlcygpXG5cbiAgICBpZihsaXZlX3BhdGNoKXtcbiAgICAgIGxldCB7a2luZCwgdG99ID0gbGl2ZV9wYXRjaFxuICAgICAgdGhpcy5saXZlU29ja2V0Lmhpc3RvcnlQYXRjaCh0bywga2luZClcbiAgICB9XG4gICAgdGhpcy5oaWRlTG9hZGVyKClcbiAgICBpZih0aGlzLmpvaW5Db3VudCA+IDEpeyB0aGlzLnRyaWdnZXJSZWNvbm5lY3RlZCgpIH1cbiAgICB0aGlzLnN0b3BDYWxsYmFjaygpXG4gIH1cblxuICB0cmlnZ2VyQmVmb3JlVXBkYXRlSG9vayhmcm9tRWwsIHRvRWwpe1xuICAgIHRoaXMubGl2ZVNvY2tldC50cmlnZ2VyRE9NKFwib25CZWZvcmVFbFVwZGF0ZWRcIiwgW2Zyb21FbCwgdG9FbF0pXG4gICAgbGV0IGhvb2sgPSB0aGlzLmdldEhvb2soZnJvbUVsKVxuICAgIGxldCBpc0lnbm9yZWQgPSBob29rICYmIERPTS5pc0lnbm9yZWQoZnJvbUVsLCB0aGlzLmJpbmRpbmcoUEhYX1VQREFURSkpXG4gICAgaWYoaG9vayAmJiAhZnJvbUVsLmlzRXF1YWxOb2RlKHRvRWwpICYmICEoaXNJZ25vcmVkICYmIGlzRXF1YWxPYmooZnJvbUVsLmRhdGFzZXQsIHRvRWwuZGF0YXNldCkpKXtcbiAgICAgIGhvb2suX19iZWZvcmVVcGRhdGUoKVxuICAgICAgcmV0dXJuIGhvb2tcbiAgICB9XG4gIH1cblxuICBwZXJmb3JtUGF0Y2gocGF0Y2gsIHBydW5lQ2lkcyl7XG4gICAgbGV0IHJlbW92ZWRFbHMgPSBbXVxuICAgIGxldCBwaHhDaGlsZHJlbkFkZGVkID0gZmFsc2VcbiAgICBsZXQgdXBkYXRlZEhvb2tJZHMgPSBuZXcgU2V0KClcblxuICAgIHBhdGNoLmFmdGVyKFwiYWRkZWRcIiwgZWwgPT4ge1xuICAgICAgdGhpcy5saXZlU29ja2V0LnRyaWdnZXJET00oXCJvbk5vZGVBZGRlZFwiLCBbZWxdKVxuXG4gICAgICBsZXQgbmV3SG9vayA9IHRoaXMuYWRkSG9vayhlbClcbiAgICAgIGlmKG5ld0hvb2speyBuZXdIb29rLl9fbW91bnRlZCgpIH1cbiAgICB9KVxuXG4gICAgcGF0Y2guYWZ0ZXIoXCJwaHhDaGlsZEFkZGVkXCIsIGVsID0+IHtcbiAgICAgIGlmKERPTS5pc1BoeFN0aWNreShlbCkpe1xuICAgICAgICB0aGlzLmxpdmVTb2NrZXQuam9pblJvb3RWaWV3cygpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwaHhDaGlsZHJlbkFkZGVkID0gdHJ1ZVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBwYXRjaC5iZWZvcmUoXCJ1cGRhdGVkXCIsIChmcm9tRWwsIHRvRWwpID0+IHtcbiAgICAgIGxldCBob29rID0gdGhpcy50cmlnZ2VyQmVmb3JlVXBkYXRlSG9vayhmcm9tRWwsIHRvRWwpXG4gICAgICBpZihob29rKXsgdXBkYXRlZEhvb2tJZHMuYWRkKGZyb21FbC5pZCkgfVxuICAgIH0pXG5cbiAgICBwYXRjaC5hZnRlcihcInVwZGF0ZWRcIiwgZWwgPT4ge1xuICAgICAgaWYodXBkYXRlZEhvb2tJZHMuaGFzKGVsLmlkKSl7IHRoaXMuZ2V0SG9vayhlbCkuX191cGRhdGVkKCkgfVxuICAgIH0pXG5cbiAgICBwYXRjaC5hZnRlcihcImRpc2NhcmRlZFwiLCAoZWwpID0+IHtcbiAgICAgIGlmKGVsLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSl7IHJlbW92ZWRFbHMucHVzaChlbCkgfVxuICAgIH0pXG5cbiAgICBwYXRjaC5hZnRlcihcInRyYW5zaXRpb25zRGlzY2FyZGVkXCIsIGVscyA9PiB0aGlzLmFmdGVyRWxlbWVudHNSZW1vdmVkKGVscywgcHJ1bmVDaWRzKSlcbiAgICBwYXRjaC5wZXJmb3JtKClcbiAgICB0aGlzLmFmdGVyRWxlbWVudHNSZW1vdmVkKHJlbW92ZWRFbHMsIHBydW5lQ2lkcylcblxuICAgIHJldHVybiBwaHhDaGlsZHJlbkFkZGVkXG4gIH1cblxuICBhZnRlckVsZW1lbnRzUmVtb3ZlZChlbGVtZW50cywgcHJ1bmVDaWRzKXtcbiAgICBsZXQgZGVzdHJveWVkQ0lEcyA9IFtdXG4gICAgZWxlbWVudHMuZm9yRWFjaChwYXJlbnQgPT4ge1xuICAgICAgbGV0IGNvbXBvbmVudHMgPSBET00uYWxsKHBhcmVudCwgYFske1BIWF9DT01QT05FTlR9XWApXG4gICAgICBsZXQgaG9va3MgPSBET00uYWxsKHBhcmVudCwgYFske3RoaXMuYmluZGluZyhQSFhfSE9PSyl9XWApXG4gICAgICBjb21wb25lbnRzLmNvbmNhdChwYXJlbnQpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBsZXQgY2lkID0gdGhpcy5jb21wb25lbnRJRChlbClcbiAgICAgICAgaWYoaXNDaWQoY2lkKSAmJiBkZXN0cm95ZWRDSURzLmluZGV4T2YoY2lkKSA9PT0gLTEpeyBkZXN0cm95ZWRDSURzLnB1c2goY2lkKSB9XG4gICAgICB9KVxuICAgICAgaG9va3MuY29uY2F0KHBhcmVudCkuZm9yRWFjaChob29rRWwgPT4ge1xuICAgICAgICBsZXQgaG9vayA9IHRoaXMuZ2V0SG9vayhob29rRWwpXG4gICAgICAgIGhvb2sgJiYgdGhpcy5kZXN0cm95SG9vayhob29rKVxuICAgICAgfSlcbiAgICB9KVxuICAgIC8vIFdlIHNob3VsZCBub3QgcHJ1bmVDaWRzIG9uIGpvaW5zLiBPdGhlcndpc2UsIGluIGNhc2Ugb2ZcbiAgICAvLyByZWpvaW5zLCB3ZSBtYXkgbm90aWZ5IGNpZHMgdGhhdCBubyBsb25nZXIgYmVsb25nIHRvIHRoZVxuICAgIC8vIGN1cnJlbnQgTGl2ZVZpZXcgdG8gYmUgcmVtb3ZlZC5cbiAgICBpZihwcnVuZUNpZHMpe1xuICAgICAgdGhpcy5tYXliZVB1c2hDb21wb25lbnRzRGVzdHJveWVkKGRlc3Ryb3llZENJRHMpXG4gICAgfVxuICB9XG5cbiAgam9pbk5ld0NoaWxkcmVuKCl7XG4gICAgRE9NLmZpbmRQaHhDaGlsZHJlbih0aGlzLmVsLCB0aGlzLmlkKS5mb3JFYWNoKGVsID0+IHRoaXMuam9pbkNoaWxkKGVsKSlcbiAgfVxuXG4gIGdldENoaWxkQnlJZChpZCl7IHJldHVybiB0aGlzLnJvb3QuY2hpbGRyZW5bdGhpcy5pZF1baWRdIH1cblxuICBnZXREZXNjZW5kZW50QnlFbChlbCl7XG4gICAgaWYoZWwuaWQgPT09IHRoaXMuaWQpe1xuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5bZWwuZ2V0QXR0cmlidXRlKFBIWF9QQVJFTlRfSUQpXVtlbC5pZF1cbiAgICB9XG4gIH1cblxuICBkZXN0cm95RGVzY2VuZGVudChpZCl7XG4gICAgZm9yKGxldCBwYXJlbnRJZCBpbiB0aGlzLnJvb3QuY2hpbGRyZW4pe1xuICAgICAgZm9yKGxldCBjaGlsZElkIGluIHRoaXMucm9vdC5jaGlsZHJlbltwYXJlbnRJZF0pe1xuICAgICAgICBpZihjaGlsZElkID09PSBpZCl7IHJldHVybiB0aGlzLnJvb3QuY2hpbGRyZW5bcGFyZW50SWRdW2NoaWxkSWRdLmRlc3Ryb3koKSB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgam9pbkNoaWxkKGVsKXtcbiAgICBsZXQgY2hpbGQgPSB0aGlzLmdldENoaWxkQnlJZChlbC5pZClcbiAgICBpZighY2hpbGQpe1xuICAgICAgbGV0IHZpZXcgPSBuZXcgVmlldyhlbCwgdGhpcy5saXZlU29ja2V0LCB0aGlzKVxuICAgICAgdGhpcy5yb290LmNoaWxkcmVuW3RoaXMuaWRdW3ZpZXcuaWRdID0gdmlld1xuICAgICAgdmlldy5qb2luKClcbiAgICAgIHRoaXMuY2hpbGRKb2lucysrXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGlzSm9pblBlbmRpbmcoKXsgcmV0dXJuIHRoaXMuam9pblBlbmRpbmcgfVxuXG4gIGFja0pvaW4oX2NoaWxkKXtcbiAgICB0aGlzLmNoaWxkSm9pbnMtLVxuXG4gICAgaWYodGhpcy5jaGlsZEpvaW5zID09PSAwKXtcbiAgICAgIGlmKHRoaXMucGFyZW50KXtcbiAgICAgICAgdGhpcy5wYXJlbnQuYWNrSm9pbih0aGlzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vbkFsbENoaWxkSm9pbnNDb21wbGV0ZSgpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25BbGxDaGlsZEpvaW5zQ29tcGxldGUoKXtcbiAgICB0aGlzLmpvaW5DYWxsYmFjaygoKSA9PiB7XG4gICAgICB0aGlzLnBlbmRpbmdKb2luT3BzLmZvckVhY2goKFt2aWV3LCBvcF0pID0+IHtcbiAgICAgICAgaWYoIXZpZXcuaXNEZXN0cm95ZWQoKSl7IG9wKCkgfVxuICAgICAgfSlcbiAgICAgIHRoaXMucGVuZGluZ0pvaW5PcHMgPSBbXVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGUoZGlmZiwgZXZlbnRzKXtcbiAgICBpZih0aGlzLmlzSm9pblBlbmRpbmcoKSB8fCAodGhpcy5saXZlU29ja2V0Lmhhc1BlbmRpbmdMaW5rKCkgJiYgIURPTS5pc1BoeFN0aWNreSh0aGlzLmVsKSkpe1xuICAgICAgcmV0dXJuIHRoaXMucGVuZGluZ0RpZmZzLnB1c2goe2RpZmYsIGV2ZW50c30pXG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXJlZC5tZXJnZURpZmYoZGlmZilcbiAgICBsZXQgcGh4Q2hpbGRyZW5BZGRlZCA9IGZhbHNlXG5cbiAgICAvLyBXaGVuIHRoZSBkaWZmIG9ubHkgY29udGFpbnMgY29tcG9uZW50IGRpZmZzLCB0aGVuIHdhbGsgY29tcG9uZW50c1xuICAgIC8vIGFuZCBwYXRjaCBvbmx5IHRoZSBwYXJlbnQgY29tcG9uZW50IGNvbnRhaW5lcnMgZm91bmQgaW4gdGhlIGRpZmYuXG4gICAgLy8gT3RoZXJ3aXNlLCBwYXRjaCBlbnRpcmUgTFYgY29udGFpbmVyLlxuICAgIGlmKHRoaXMucmVuZGVyZWQuaXNDb21wb25lbnRPbmx5RGlmZihkaWZmKSl7XG4gICAgICB0aGlzLmxpdmVTb2NrZXQudGltZShcImNvbXBvbmVudCBwYXRjaCBjb21wbGV0ZVwiLCAoKSA9PiB7XG4gICAgICAgIGxldCBwYXJlbnRDaWRzID0gRE9NLmZpbmRQYXJlbnRDSURzKHRoaXMuZWwsIHRoaXMucmVuZGVyZWQuY29tcG9uZW50Q0lEcyhkaWZmKSlcbiAgICAgICAgcGFyZW50Q2lkcy5mb3JFYWNoKHBhcmVudENJRCA9PiB7XG4gICAgICAgICAgaWYodGhpcy5jb21wb25lbnRQYXRjaCh0aGlzLnJlbmRlcmVkLmdldENvbXBvbmVudChkaWZmLCBwYXJlbnRDSUQpLCBwYXJlbnRDSUQpKXsgcGh4Q2hpbGRyZW5BZGRlZCA9IHRydWUgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9IGVsc2UgaWYoIWlzRW1wdHkoZGlmZikpe1xuICAgICAgdGhpcy5saXZlU29ja2V0LnRpbWUoXCJmdWxsIHBhdGNoIGNvbXBsZXRlXCIsICgpID0+IHtcbiAgICAgICAgbGV0IGh0bWwgPSB0aGlzLnJlbmRlckNvbnRhaW5lcihkaWZmLCBcInVwZGF0ZVwiKVxuICAgICAgICBsZXQgcGF0Y2ggPSBuZXcgRE9NUGF0Y2godGhpcywgdGhpcy5lbCwgdGhpcy5pZCwgaHRtbCwgbnVsbClcbiAgICAgICAgcGh4Q2hpbGRyZW5BZGRlZCA9IHRoaXMucGVyZm9ybVBhdGNoKHBhdGNoLCB0cnVlKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmxpdmVTb2NrZXQuZGlzcGF0Y2hFdmVudHMoZXZlbnRzKVxuICAgIGlmKHBoeENoaWxkcmVuQWRkZWQpeyB0aGlzLmpvaW5OZXdDaGlsZHJlbigpIH1cbiAgfVxuXG4gIHJlbmRlckNvbnRhaW5lcihkaWZmLCBraW5kKXtcbiAgICByZXR1cm4gdGhpcy5saXZlU29ja2V0LnRpbWUoYHRvU3RyaW5nIGRpZmYgKCR7a2luZH0pYCwgKCkgPT4ge1xuICAgICAgbGV0IHRhZyA9IHRoaXMuZWwudGFnTmFtZVxuICAgICAgLy8gRG9uJ3Qgc2tpcCBhbnkgY29tcG9uZW50IGluIHRoZSBkaWZmIG5vciBhbnkgbWFya2VkIGFzIHBydW5lZFxuICAgICAgLy8gKGFzIHRoZXkgbWF5IGhhdmUgYmVlbiBhZGRlZCBiYWNrKVxuICAgICAgbGV0IGNpZHMgPSBkaWZmID8gdGhpcy5yZW5kZXJlZC5jb21wb25lbnRDSURzKGRpZmYpLmNvbmNhdCh0aGlzLnBydW5pbmdDSURzKSA6IG51bGxcbiAgICAgIGxldCBodG1sID0gdGhpcy5yZW5kZXJlZC50b1N0cmluZyhjaWRzKVxuICAgICAgcmV0dXJuIGA8JHt0YWd9PiR7aHRtbH08LyR7dGFnfT5gXG4gICAgfSlcbiAgfVxuXG4gIGNvbXBvbmVudFBhdGNoKGRpZmYsIGNpZCl7XG4gICAgaWYoaXNFbXB0eShkaWZmKSkgcmV0dXJuIGZhbHNlXG4gICAgbGV0IGh0bWwgPSB0aGlzLnJlbmRlcmVkLmNvbXBvbmVudFRvU3RyaW5nKGNpZClcbiAgICBsZXQgcGF0Y2ggPSBuZXcgRE9NUGF0Y2godGhpcywgdGhpcy5lbCwgdGhpcy5pZCwgaHRtbCwgY2lkKVxuICAgIGxldCBjaGlsZHJlbkFkZGVkID0gdGhpcy5wZXJmb3JtUGF0Y2gocGF0Y2gsIHRydWUpXG4gICAgcmV0dXJuIGNoaWxkcmVuQWRkZWRcbiAgfVxuXG4gIGdldEhvb2soZWwpeyByZXR1cm4gdGhpcy52aWV3SG9va3NbVmlld0hvb2suZWxlbWVudElEKGVsKV0gfVxuXG4gIGFkZEhvb2soZWwpe1xuICAgIGlmKFZpZXdIb29rLmVsZW1lbnRJRChlbCkgfHwgIWVsLmdldEF0dHJpYnV0ZSl7IHJldHVybiB9XG4gICAgbGV0IGhvb2tOYW1lID0gZWwuZ2V0QXR0cmlidXRlKGBkYXRhLXBoeC0ke1BIWF9IT09LfWApIHx8IGVsLmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoUEhYX0hPT0spKVxuICAgIGlmKGhvb2tOYW1lICYmICF0aGlzLm93bnNFbGVtZW50KGVsKSl7IHJldHVybiB9XG4gICAgbGV0IGNhbGxiYWNrcyA9IHRoaXMubGl2ZVNvY2tldC5nZXRIb29rQ2FsbGJhY2tzKGhvb2tOYW1lKVxuXG4gICAgaWYoY2FsbGJhY2tzKXtcbiAgICAgIGlmKCFlbC5pZCl7IGxvZ0Vycm9yKGBubyBET00gSUQgZm9yIGhvb2sgXCIke2hvb2tOYW1lfVwiLiBIb29rcyByZXF1aXJlIGEgdW5pcXVlIElEIG9uIGVhY2ggZWxlbWVudC5gLCBlbCkgfVxuICAgICAgbGV0IGhvb2sgPSBuZXcgVmlld0hvb2sodGhpcywgZWwsIGNhbGxiYWNrcylcbiAgICAgIHRoaXMudmlld0hvb2tzW1ZpZXdIb29rLmVsZW1lbnRJRChob29rLmVsKV0gPSBob29rXG4gICAgICByZXR1cm4gaG9va1xuICAgIH0gZWxzZSBpZihob29rTmFtZSAhPT0gbnVsbCl7XG4gICAgICBsb2dFcnJvcihgdW5rbm93biBob29rIGZvdW5kIGZvciBcIiR7aG9va05hbWV9XCJgLCBlbClcbiAgICB9XG4gIH1cblxuICBkZXN0cm95SG9vayhob29rKXtcbiAgICBob29rLl9fZGVzdHJveWVkKClcbiAgICBob29rLl9fY2xlYW51cF9fKClcbiAgICBkZWxldGUgdGhpcy52aWV3SG9va3NbVmlld0hvb2suZWxlbWVudElEKGhvb2suZWwpXVxuICB9XG5cbiAgYXBwbHlQZW5kaW5nVXBkYXRlcygpe1xuICAgIHRoaXMucGVuZGluZ0RpZmZzLmZvckVhY2goKHtkaWZmLCBldmVudHN9KSA9PiB0aGlzLnVwZGF0ZShkaWZmLCBldmVudHMpKVxuICAgIHRoaXMucGVuZGluZ0RpZmZzID0gW11cbiAgfVxuXG4gIG9uQ2hhbm5lbChldmVudCwgY2Ipe1xuICAgIHRoaXMubGl2ZVNvY2tldC5vbkNoYW5uZWwodGhpcy5jaGFubmVsLCBldmVudCwgcmVzcCA9PiB7XG4gICAgICBpZih0aGlzLmlzSm9pblBlbmRpbmcoKSl7XG4gICAgICAgIHRoaXMucm9vdC5wZW5kaW5nSm9pbk9wcy5wdXNoKFt0aGlzLCAoKSA9PiBjYihyZXNwKV0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxpdmVTb2NrZXQucmVxdWVzdERPTVVwZGF0ZSgoKSA9PiBjYihyZXNwKSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgYmluZENoYW5uZWwoKXtcbiAgICAvLyBUaGUgZGlmZiBldmVudCBzaG91bGQgYmUgaGFuZGxlZCBieSB0aGUgcmVndWxhciB1cGRhdGUgb3BlcmF0aW9ucy5cbiAgICAvLyBBbGwgb3RoZXIgb3BlcmF0aW9ucyBhcmUgcXVldWVkIHRvIGJlIGFwcGxpZWQgb25seSBhZnRlciBqb2luLlxuICAgIHRoaXMubGl2ZVNvY2tldC5vbkNoYW5uZWwodGhpcy5jaGFubmVsLCBcImRpZmZcIiwgKHJhd0RpZmYpID0+IHtcbiAgICAgIHRoaXMubGl2ZVNvY2tldC5yZXF1ZXN0RE9NVXBkYXRlKCgpID0+IHtcbiAgICAgICAgdGhpcy5hcHBseURpZmYoXCJ1cGRhdGVcIiwgcmF3RGlmZiwgKHtkaWZmLCBldmVudHN9KSA9PiB0aGlzLnVwZGF0ZShkaWZmLCBldmVudHMpKVxuICAgICAgfSlcbiAgICB9KVxuICAgIHRoaXMub25DaGFubmVsKFwicmVkaXJlY3RcIiwgKHt0bywgZmxhc2h9KSA9PiB0aGlzLm9uUmVkaXJlY3Qoe3RvLCBmbGFzaH0pKVxuICAgIHRoaXMub25DaGFubmVsKFwibGl2ZV9wYXRjaFwiLCAocmVkaXIpID0+IHRoaXMub25MaXZlUGF0Y2gocmVkaXIpKVxuICAgIHRoaXMub25DaGFubmVsKFwibGl2ZV9yZWRpcmVjdFwiLCAocmVkaXIpID0+IHRoaXMub25MaXZlUmVkaXJlY3QocmVkaXIpKVxuICAgIHRoaXMuY2hhbm5lbC5vbkVycm9yKHJlYXNvbiA9PiB0aGlzLm9uRXJyb3IocmVhc29uKSlcbiAgICB0aGlzLmNoYW5uZWwub25DbG9zZShyZWFzb24gPT4gdGhpcy5vbkNsb3NlKHJlYXNvbikpXG4gIH1cblxuICBkZXN0cm95QWxsQ2hpbGRyZW4oKXtcbiAgICBmb3IobGV0IGlkIGluIHRoaXMucm9vdC5jaGlsZHJlblt0aGlzLmlkXSl7XG4gICAgICB0aGlzLmdldENoaWxkQnlJZChpZCkuZGVzdHJveSgpXG4gICAgfVxuICB9XG5cbiAgb25MaXZlUmVkaXJlY3QocmVkaXIpe1xuICAgIGxldCB7dG8sIGtpbmQsIGZsYXNofSA9IHJlZGlyXG4gICAgbGV0IHVybCA9IHRoaXMuZXhwYW5kVVJMKHRvKVxuICAgIHRoaXMubGl2ZVNvY2tldC5oaXN0b3J5UmVkaXJlY3QodXJsLCBraW5kLCBmbGFzaClcbiAgfVxuXG4gIG9uTGl2ZVBhdGNoKHJlZGlyKXtcbiAgICBsZXQge3RvLCBraW5kfSA9IHJlZGlyXG4gICAgdGhpcy5ocmVmID0gdGhpcy5leHBhbmRVUkwodG8pXG4gICAgdGhpcy5saXZlU29ja2V0Lmhpc3RvcnlQYXRjaCh0bywga2luZClcbiAgfVxuXG4gIGV4cGFuZFVSTCh0byl7XG4gICAgcmV0dXJuIHRvLnN0YXJ0c1dpdGgoXCIvXCIpID8gYCR7d2luZG93LmxvY2F0aW9uLnByb3RvY29sfS8vJHt3aW5kb3cubG9jYXRpb24uaG9zdH0ke3RvfWAgOiB0b1xuICB9XG5cbiAgb25SZWRpcmVjdCh7dG8sIGZsYXNofSl7IHRoaXMubGl2ZVNvY2tldC5yZWRpcmVjdCh0bywgZmxhc2gpIH1cblxuICBpc0Rlc3Ryb3llZCgpeyByZXR1cm4gdGhpcy5kZXN0cm95ZWQgfVxuXG4gIGpvaW4oY2FsbGJhY2spe1xuICAgIGlmKHRoaXMuaXNNYWluKCkpe1xuICAgICAgdGhpcy5zdG9wQ2FsbGJhY2sgPSB0aGlzLmxpdmVTb2NrZXQud2l0aFBhZ2VMb2FkaW5nKHt0bzogdGhpcy5ocmVmLCBraW5kOiBcImluaXRpYWxcIn0pXG4gICAgfVxuICAgIHRoaXMuam9pbkNhbGxiYWNrID0gKG9uRG9uZSkgPT4ge1xuICAgICAgb25Eb25lID0gb25Eb25lIHx8IGZ1bmN0aW9uKCl7fVxuICAgICAgY2FsbGJhY2sgPyBjYWxsYmFjayh0aGlzLmpvaW5Db3VudCwgb25Eb25lKSA6IG9uRG9uZSgpXG4gICAgfVxuICAgIHRoaXMubGl2ZVNvY2tldC53cmFwUHVzaCh0aGlzLCB7dGltZW91dDogZmFsc2V9LCAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5jaGFubmVsLmpvaW4oKVxuICAgICAgICAucmVjZWl2ZShcIm9rXCIsIGRhdGEgPT4ge1xuICAgICAgICAgIGlmKCF0aGlzLmlzRGVzdHJveWVkKCkpe1xuICAgICAgICAgICAgdGhpcy5saXZlU29ja2V0LnJlcXVlc3RET01VcGRhdGUoKCkgPT4gdGhpcy5vbkpvaW4oZGF0YSkpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAucmVjZWl2ZShcImVycm9yXCIsIHJlc3AgPT4gIXRoaXMuaXNEZXN0cm95ZWQoKSAmJiB0aGlzLm9uSm9pbkVycm9yKHJlc3ApKVxuICAgICAgICAucmVjZWl2ZShcInRpbWVvdXRcIiwgKCkgPT4gIXRoaXMuaXNEZXN0cm95ZWQoKSAmJiB0aGlzLm9uSm9pbkVycm9yKHtyZWFzb246IFwidGltZW91dFwifSkpXG4gICAgfSlcbiAgfVxuXG4gIG9uSm9pbkVycm9yKHJlc3Ape1xuICAgIGlmKHJlc3AucmVhc29uID09PSBcInVuYXV0aG9yaXplZFwiIHx8IHJlc3AucmVhc29uID09PSBcInN0YWxlXCIpe1xuICAgICAgdGhpcy5sb2coXCJlcnJvclwiLCAoKSA9PiBbXCJ1bmF1dGhvcml6ZWQgbGl2ZV9yZWRpcmVjdC4gRmFsbGluZyBiYWNrIHRvIHBhZ2UgcmVxdWVzdFwiLCByZXNwXSlcbiAgICAgIHJldHVybiB0aGlzLm9uUmVkaXJlY3Qoe3RvOiB0aGlzLmhyZWZ9KVxuICAgIH1cbiAgICBpZihyZXNwLnJlZGlyZWN0IHx8IHJlc3AubGl2ZV9yZWRpcmVjdCl7XG4gICAgICB0aGlzLmpvaW5QZW5kaW5nID0gZmFsc2VcbiAgICAgIHRoaXMuY2hhbm5lbC5sZWF2ZSgpXG4gICAgfVxuICAgIGlmKHJlc3AucmVkaXJlY3QpeyByZXR1cm4gdGhpcy5vblJlZGlyZWN0KHJlc3AucmVkaXJlY3QpIH1cbiAgICBpZihyZXNwLmxpdmVfcmVkaXJlY3QpeyByZXR1cm4gdGhpcy5vbkxpdmVSZWRpcmVjdChyZXNwLmxpdmVfcmVkaXJlY3QpIH1cbiAgICB0aGlzLmxvZyhcImVycm9yXCIsICgpID0+IFtcInVuYWJsZSB0byBqb2luXCIsIHJlc3BdKVxuICAgIGlmKHRoaXMubGl2ZVNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5saXZlU29ja2V0LnJlbG9hZFdpdGhKaXR0ZXIodGhpcykgfVxuICB9XG5cbiAgb25DbG9zZShyZWFzb24pe1xuICAgIGlmKHRoaXMuaXNEZXN0cm95ZWQoKSl7IHJldHVybiB9XG4gICAgaWYodGhpcy5saXZlU29ja2V0Lmhhc1BlbmRpbmdMaW5rKCkgJiYgcmVhc29uICE9PSBcImxlYXZlXCIpe1xuICAgICAgcmV0dXJuIHRoaXMubGl2ZVNvY2tldC5yZWxvYWRXaXRoSml0dGVyKHRoaXMpXG4gICAgfVxuICAgIHRoaXMuZGVzdHJveUFsbENoaWxkcmVuKClcbiAgICB0aGlzLmxpdmVTb2NrZXQuZHJvcEFjdGl2ZUVsZW1lbnQodGhpcylcbiAgICAvLyBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGNhbiBiZSBudWxsIGluIEludGVybmV0IEV4cGxvcmVyIDExXG4gICAgaWYoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCl7IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpIH1cbiAgICBpZih0aGlzLmxpdmVTb2NrZXQuaXNVbmxvYWRlZCgpKXtcbiAgICAgIHRoaXMuc2hvd0xvYWRlcihCRUZPUkVfVU5MT0FEX0xPQURFUl9USU1FT1VUKVxuICAgIH1cbiAgfVxuXG4gIG9uRXJyb3IocmVhc29uKXtcbiAgICB0aGlzLm9uQ2xvc2UocmVhc29uKVxuICAgIGlmKHRoaXMubGl2ZVNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5sb2coXCJlcnJvclwiLCAoKSA9PiBbXCJ2aWV3IGNyYXNoZWRcIiwgcmVhc29uXSkgfVxuICAgIGlmKCF0aGlzLmxpdmVTb2NrZXQuaXNVbmxvYWRlZCgpKXsgdGhpcy5kaXNwbGF5RXJyb3IoKSB9XG4gIH1cblxuICBkaXNwbGF5RXJyb3IoKXtcbiAgICBpZih0aGlzLmlzTWFpbigpKXsgRE9NLmRpc3BhdGNoRXZlbnQod2luZG93LCBcInBoeDpwYWdlLWxvYWRpbmctc3RhcnRcIiwge2RldGFpbDoge3RvOiB0aGlzLmhyZWYsIGtpbmQ6IFwiZXJyb3JcIn19KSB9XG4gICAgdGhpcy5zaG93TG9hZGVyKClcbiAgICB0aGlzLnNldENvbnRhaW5lckNsYXNzZXMoUEhYX0RJU0NPTk5FQ1RFRF9DTEFTUywgUEhYX0VSUk9SX0NMQVNTKVxuICB9XG5cbiAgcHVzaFdpdGhSZXBseShyZWZHZW5lcmF0b3IsIGV2ZW50LCBwYXlsb2FkLCBvblJlcGx5ID0gZnVuY3Rpb24gKCl7IH0pe1xuICAgIGlmKCF0aGlzLmlzQ29ubmVjdGVkKCkpeyByZXR1cm4gfVxuXG4gICAgbGV0IFtyZWYsIFtlbF0sIG9wdHNdID0gcmVmR2VuZXJhdG9yID8gcmVmR2VuZXJhdG9yKCkgOiBbbnVsbCwgW10sIHt9XVxuICAgIGxldCBvbkxvYWRpbmdEb25lID0gZnVuY3Rpb24oKXsgfVxuICAgIGlmKG9wdHMucGFnZV9sb2FkaW5nIHx8IChlbCAmJiAoZWwuZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhQSFhfUEFHRV9MT0FESU5HKSkgIT09IG51bGwpKSl7XG4gICAgICBvbkxvYWRpbmdEb25lID0gdGhpcy5saXZlU29ja2V0LndpdGhQYWdlTG9hZGluZyh7a2luZDogXCJlbGVtZW50XCIsIHRhcmdldDogZWx9KVxuICAgIH1cblxuICAgIGlmKHR5cGVvZiAocGF5bG9hZC5jaWQpICE9PSBcIm51bWJlclwiKXsgZGVsZXRlIHBheWxvYWQuY2lkIH1cbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5saXZlU29ja2V0LndyYXBQdXNoKHRoaXMsIHt0aW1lb3V0OiB0cnVlfSwgKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFubmVsLnB1c2goZXZlbnQsIHBheWxvYWQsIFBVU0hfVElNRU9VVCkucmVjZWl2ZShcIm9rXCIsIHJlc3AgPT4ge1xuICAgICAgICAgIGlmKHJlZiAhPT0gbnVsbCl7IHRoaXMudW5kb1JlZnMocmVmKSB9XG4gICAgICAgICAgbGV0IGZpbmlzaCA9IChob29rUmVwbHkpID0+IHtcbiAgICAgICAgICAgIGlmKHJlc3AucmVkaXJlY3QpeyB0aGlzLm9uUmVkaXJlY3QocmVzcC5yZWRpcmVjdCkgfVxuICAgICAgICAgICAgaWYocmVzcC5saXZlX3BhdGNoKXsgdGhpcy5vbkxpdmVQYXRjaChyZXNwLmxpdmVfcGF0Y2gpIH1cbiAgICAgICAgICAgIGlmKHJlc3AubGl2ZV9yZWRpcmVjdCl7IHRoaXMub25MaXZlUmVkaXJlY3QocmVzcC5saXZlX3JlZGlyZWN0KSB9XG4gICAgICAgICAgICBvbkxvYWRpbmdEb25lKClcbiAgICAgICAgICAgIG9uUmVwbHkocmVzcCwgaG9va1JlcGx5KVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZihyZXNwLmRpZmYpe1xuICAgICAgICAgICAgdGhpcy5saXZlU29ja2V0LnJlcXVlc3RET01VcGRhdGUoKCkgPT4ge1xuICAgICAgICAgICAgICBsZXQgaG9va1JlcGx5ID0gdGhpcy5hcHBseURpZmYoXCJ1cGRhdGVcIiwgcmVzcC5kaWZmLCAoe2RpZmYsIGV2ZW50c30pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZShkaWZmLCBldmVudHMpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIGZpbmlzaChob29rUmVwbHkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmaW5pc2gobnVsbClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIHVuZG9SZWZzKHJlZil7XG4gICAgRE9NLmFsbChkb2N1bWVudCwgYFske1BIWF9SRUZfU1JDfT1cIiR7dGhpcy5pZH1cIl1bJHtQSFhfUkVGfT1cIiR7cmVmfVwiXWAsIGVsID0+IHtcbiAgICAgIGxldCBkaXNhYmxlZFZhbCA9IGVsLmdldEF0dHJpYnV0ZShQSFhfRElTQUJMRUQpXG4gICAgICAvLyByZW1vdmUgcmVmc1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFBIWF9SRUYpXG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoUEhYX1JFRl9TUkMpXG4gICAgICAvLyByZXN0b3JlIGlucHV0c1xuICAgICAgaWYoZWwuZ2V0QXR0cmlidXRlKFBIWF9SRUFET05MWSkgIT09IG51bGwpe1xuICAgICAgICBlbC5yZWFkT25seSA9IGZhbHNlXG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfUkVBRE9OTFkpXG4gICAgICB9XG4gICAgICBpZihkaXNhYmxlZFZhbCAhPT0gbnVsbCl7XG4gICAgICAgIGVsLmRpc2FibGVkID0gZGlzYWJsZWRWYWwgPT09IFwidHJ1ZVwiID8gdHJ1ZSA6IGZhbHNlXG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfRElTQUJMRUQpXG4gICAgICB9XG4gICAgICAvLyByZW1vdmUgY2xhc3Nlc1xuICAgICAgUEhYX0VWRU5UX0NMQVNTRVMuZm9yRWFjaChjbGFzc05hbWUgPT4gRE9NLnJlbW92ZUNsYXNzKGVsLCBjbGFzc05hbWUpKVxuICAgICAgLy8gcmVzdG9yZSBkaXNhYmxlc1xuICAgICAgbGV0IGRpc2FibGVSZXN0b3JlID0gZWwuZ2V0QXR0cmlidXRlKFBIWF9ESVNBQkxFX1dJVEhfUkVTVE9SRSlcbiAgICAgIGlmKGRpc2FibGVSZXN0b3JlICE9PSBudWxsKXtcbiAgICAgICAgZWwuaW5uZXJUZXh0ID0gZGlzYWJsZVJlc3RvcmVcbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFBIWF9ESVNBQkxFX1dJVEhfUkVTVE9SRSlcbiAgICAgIH1cbiAgICAgIGxldCB0b0VsID0gRE9NLnByaXZhdGUoZWwsIFBIWF9SRUYpXG4gICAgICBpZih0b0VsKXtcbiAgICAgICAgbGV0IGhvb2sgPSB0aGlzLnRyaWdnZXJCZWZvcmVVcGRhdGVIb29rKGVsLCB0b0VsKVxuICAgICAgICBET01QYXRjaC5wYXRjaEVsKGVsLCB0b0VsLCB0aGlzLmxpdmVTb2NrZXQuZ2V0QWN0aXZlRWxlbWVudCgpKVxuICAgICAgICBpZihob29rKXsgaG9vay5fX3VwZGF0ZWQoKSB9XG4gICAgICAgIERPTS5kZWxldGVQcml2YXRlKGVsLCBQSFhfUkVGKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBwdXRSZWYoZWxlbWVudHMsIGV2ZW50LCBvcHRzID0ge30pe1xuICAgIGxldCBuZXdSZWYgPSB0aGlzLnJlZisrXG4gICAgbGV0IGRpc2FibGVXaXRoID0gdGhpcy5iaW5kaW5nKFBIWF9ESVNBQkxFX1dJVEgpXG4gICAgaWYob3B0cy5sb2FkaW5nKXsgZWxlbWVudHMgPSBlbGVtZW50cy5jb25jYXQoRE9NLmFsbChkb2N1bWVudCwgb3B0cy5sb2FkaW5nKSl9XG5cbiAgICBlbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoYHBoeC0ke2V2ZW50fS1sb2FkaW5nYClcbiAgICAgIGVsLnNldEF0dHJpYnV0ZShQSFhfUkVGLCBuZXdSZWYpXG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoUEhYX1JFRl9TUkMsIHRoaXMuZWwuaWQpXG4gICAgICBsZXQgZGlzYWJsZVRleHQgPSBlbC5nZXRBdHRyaWJ1dGUoZGlzYWJsZVdpdGgpXG4gICAgICBpZihkaXNhYmxlVGV4dCAhPT0gbnVsbCl7XG4gICAgICAgIGlmKCFlbC5nZXRBdHRyaWJ1dGUoUEhYX0RJU0FCTEVfV0lUSF9SRVNUT1JFKSl7XG4gICAgICAgICAgZWwuc2V0QXR0cmlidXRlKFBIWF9ESVNBQkxFX1dJVEhfUkVTVE9SRSwgZWwuaW5uZXJUZXh0KVxuICAgICAgICB9XG4gICAgICAgIGlmKGRpc2FibGVUZXh0ICE9PSBcIlwiKXsgZWwuaW5uZXJUZXh0ID0gZGlzYWJsZVRleHQgfVxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcIlwiKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIFtuZXdSZWYsIGVsZW1lbnRzLCBvcHRzXVxuICB9XG5cbiAgY29tcG9uZW50SUQoZWwpe1xuICAgIGxldCBjaWQgPSBlbC5nZXRBdHRyaWJ1dGUgJiYgZWwuZ2V0QXR0cmlidXRlKFBIWF9DT01QT05FTlQpXG4gICAgcmV0dXJuIGNpZCA/IHBhcnNlSW50KGNpZCkgOiBudWxsXG4gIH1cblxuICB0YXJnZXRDb21wb25lbnRJRCh0YXJnZXQsIHRhcmdldEN0eCwgb3B0cyA9IHt9KXtcbiAgICBpZihpc0NpZCh0YXJnZXRDdHgpKXsgcmV0dXJuIHRhcmdldEN0eCB9XG5cbiAgICBsZXQgY2lkT3JTZWxlY3RvciA9IHRhcmdldC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFwidGFyZ2V0XCIpKVxuICAgIGlmKGlzQ2lkKGNpZE9yU2VsZWN0b3IpKXtcbiAgICAgIHJldHVybiBwYXJzZUludChjaWRPclNlbGVjdG9yKVxuICAgIH0gZWxzZSBpZih0YXJnZXRDdHggJiYgKGNpZE9yU2VsZWN0b3IgIT09IG51bGwgfHwgb3B0cy50YXJnZXQpKXtcbiAgICAgIHJldHVybiB0aGlzLmNsb3Nlc3RDb21wb25lbnRJRCh0YXJnZXRDdHgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG5cbiAgY2xvc2VzdENvbXBvbmVudElEKHRhcmdldEN0eCl7XG4gICAgaWYoaXNDaWQodGFyZ2V0Q3R4KSl7XG4gICAgICByZXR1cm4gdGFyZ2V0Q3R4XG4gICAgfSBlbHNlIGlmKHRhcmdldEN0eCl7XG4gICAgICByZXR1cm4gbWF5YmUodGFyZ2V0Q3R4LmNsb3Nlc3QoYFske1BIWF9DT01QT05FTlR9XWApLCBlbCA9PiB0aGlzLm93bnNFbGVtZW50KGVsKSAmJiB0aGlzLmNvbXBvbmVudElEKGVsKSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICBwdXNoSG9va0V2ZW50KHRhcmdldEN0eCwgZXZlbnQsIHBheWxvYWQsIG9uUmVwbHkpe1xuICAgIGlmKCF0aGlzLmlzQ29ubmVjdGVkKCkpe1xuICAgICAgdGhpcy5sb2coXCJob29rXCIsICgpID0+IFtcInVuYWJsZSB0byBwdXNoIGhvb2sgZXZlbnQuIExpdmVWaWV3IG5vdCBjb25uZWN0ZWRcIiwgZXZlbnQsIHBheWxvYWRdKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGxldCBbcmVmLCBlbHMsIG9wdHNdID0gdGhpcy5wdXRSZWYoW10sIFwiaG9va1wiKVxuICAgIHRoaXMucHVzaFdpdGhSZXBseSgoKSA9PiBbcmVmLCBlbHMsIG9wdHNdLCBcImV2ZW50XCIsIHtcbiAgICAgIHR5cGU6IFwiaG9va1wiLFxuICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgdmFsdWU6IHBheWxvYWQsXG4gICAgICBjaWQ6IHRoaXMuY2xvc2VzdENvbXBvbmVudElEKHRhcmdldEN0eClcbiAgICB9LCAocmVzcCwgcmVwbHkpID0+IG9uUmVwbHkocmVwbHksIHJlZikpXG5cbiAgICByZXR1cm4gcmVmXG4gIH1cblxuICBleHRyYWN0TWV0YShlbCwgbWV0YSwgdmFsdWUpe1xuICAgIGxldCBwcmVmaXggPSB0aGlzLmJpbmRpbmcoXCJ2YWx1ZS1cIilcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZWwuYXR0cmlidXRlcy5sZW5ndGg7IGkrKyl7XG4gICAgICBpZighbWV0YSl7IG1ldGEgPSB7fSB9XG4gICAgICBsZXQgbmFtZSA9IGVsLmF0dHJpYnV0ZXNbaV0ubmFtZVxuICAgICAgaWYobmFtZS5zdGFydHNXaXRoKHByZWZpeCkpeyBtZXRhW25hbWUucmVwbGFjZShwcmVmaXgsIFwiXCIpXSA9IGVsLmdldEF0dHJpYnV0ZShuYW1lKSB9XG4gICAgfVxuICAgIGlmKGVsLnZhbHVlICE9PSB1bmRlZmluZWQpe1xuICAgICAgaWYoIW1ldGEpeyBtZXRhID0ge30gfVxuICAgICAgbWV0YS52YWx1ZSA9IGVsLnZhbHVlXG5cbiAgICAgIGlmKGVsLnRhZ05hbWUgPT09IFwiSU5QVVRcIiAmJiBDSEVDS0FCTEVfSU5QVVRTLmluZGV4T2YoZWwudHlwZSkgPj0gMCAmJiAhZWwuY2hlY2tlZCl7XG4gICAgICAgIGRlbGV0ZSBtZXRhLnZhbHVlXG4gICAgICB9XG4gICAgfVxuICAgIGlmKHZhbHVlKXtcbiAgICAgIGlmKCFtZXRhKXsgbWV0YSA9IHt9IH1cbiAgICAgIGZvcihsZXQga2V5IGluIHZhbHVlKXsgbWV0YVtrZXldID0gdmFsdWVba2V5XSB9XG4gICAgfVxuICAgIHJldHVybiBtZXRhXG4gIH1cblxuICBwdXNoRXZlbnQodHlwZSwgZWwsIHRhcmdldEN0eCwgcGh4RXZlbnQsIG1ldGEsIG9wdHMgPSB7fSl7XG4gICAgdGhpcy5wdXNoV2l0aFJlcGx5KCgpID0+IHRoaXMucHV0UmVmKFtlbF0sIHR5cGUsIG9wdHMpLCBcImV2ZW50XCIsIHtcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICBldmVudDogcGh4RXZlbnQsXG4gICAgICB2YWx1ZTogdGhpcy5leHRyYWN0TWV0YShlbCwgbWV0YSwgb3B0cy52YWx1ZSksXG4gICAgICBjaWQ6IHRoaXMudGFyZ2V0Q29tcG9uZW50SUQoZWwsIHRhcmdldEN0eCwgb3B0cylcbiAgICB9KVxuICB9XG5cbiAgcHVzaEZpbGVQcm9ncmVzcyhmaWxlRWwsIGVudHJ5UmVmLCBwcm9ncmVzcywgb25SZXBseSA9IGZ1bmN0aW9uICgpeyB9KXtcbiAgICB0aGlzLmxpdmVTb2NrZXQud2l0aGluT3duZXJzKGZpbGVFbC5mb3JtLCAodmlldywgdGFyZ2V0Q3R4KSA9PiB7XG4gICAgICB2aWV3LnB1c2hXaXRoUmVwbHkobnVsbCwgXCJwcm9ncmVzc1wiLCB7XG4gICAgICAgIGV2ZW50OiBmaWxlRWwuZ2V0QXR0cmlidXRlKHZpZXcuYmluZGluZyhQSFhfUFJPR1JFU1MpKSxcbiAgICAgICAgcmVmOiBmaWxlRWwuZ2V0QXR0cmlidXRlKFBIWF9VUExPQURfUkVGKSxcbiAgICAgICAgZW50cnlfcmVmOiBlbnRyeVJlZixcbiAgICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzLFxuICAgICAgICBjaWQ6IHZpZXcudGFyZ2V0Q29tcG9uZW50SUQoZmlsZUVsLmZvcm0sIHRhcmdldEN0eClcbiAgICAgIH0sIG9uUmVwbHkpXG4gICAgfSlcbiAgfVxuXG4gIHB1c2hJbnB1dChpbnB1dEVsLCB0YXJnZXRDdHgsIGZvcmNlQ2lkLCBwaHhFdmVudCwgb3B0cywgY2FsbGJhY2spe1xuICAgIGxldCB1cGxvYWRzXG4gICAgbGV0IGNpZCA9IGlzQ2lkKGZvcmNlQ2lkKSA/IGZvcmNlQ2lkIDogdGhpcy50YXJnZXRDb21wb25lbnRJRChpbnB1dEVsLmZvcm0sIHRhcmdldEN0eClcbiAgICBsZXQgcmVmR2VuZXJhdG9yID0gKCkgPT4gdGhpcy5wdXRSZWYoW2lucHV0RWwsIGlucHV0RWwuZm9ybV0sIFwiY2hhbmdlXCIsIG9wdHMpXG4gICAgbGV0IGZvcm1EYXRhXG4gICAgaWYoaW5wdXRFbC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFwiY2hhbmdlXCIpKSl7XG4gICAgICBmb3JtRGF0YSA9IHNlcmlhbGl6ZUZvcm0oaW5wdXRFbC5mb3JtLCB7X3RhcmdldDogb3B0cy5fdGFyZ2V0fSwgW2lucHV0RWwubmFtZV0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcm1EYXRhID0gc2VyaWFsaXplRm9ybShpbnB1dEVsLmZvcm0sIHtfdGFyZ2V0OiBvcHRzLl90YXJnZXR9KVxuICAgIH1cbiAgICBpZihET00uaXNVcGxvYWRJbnB1dChpbnB1dEVsKSAmJiBpbnB1dEVsLmZpbGVzICYmIGlucHV0RWwuZmlsZXMubGVuZ3RoID4gMCl7XG4gICAgICBMaXZlVXBsb2FkZXIudHJhY2tGaWxlcyhpbnB1dEVsLCBBcnJheS5mcm9tKGlucHV0RWwuZmlsZXMpKVxuICAgIH1cbiAgICB1cGxvYWRzID0gTGl2ZVVwbG9hZGVyLnNlcmlhbGl6ZVVwbG9hZHMoaW5wdXRFbClcbiAgICBsZXQgZXZlbnQgPSB7XG4gICAgICB0eXBlOiBcImZvcm1cIixcbiAgICAgIGV2ZW50OiBwaHhFdmVudCxcbiAgICAgIHZhbHVlOiBmb3JtRGF0YSxcbiAgICAgIHVwbG9hZHM6IHVwbG9hZHMsXG4gICAgICBjaWQ6IGNpZFxuICAgIH1cbiAgICB0aGlzLnB1c2hXaXRoUmVwbHkocmVmR2VuZXJhdG9yLCBcImV2ZW50XCIsIGV2ZW50LCByZXNwID0+IHtcbiAgICAgIERPTS5zaG93RXJyb3IoaW5wdXRFbCwgdGhpcy5saXZlU29ja2V0LmJpbmRpbmcoUEhYX0ZFRURCQUNLX0ZPUikpXG4gICAgICBpZihET00uaXNVcGxvYWRJbnB1dChpbnB1dEVsKSAmJiBpbnB1dEVsLmdldEF0dHJpYnV0ZShcImRhdGEtcGh4LWF1dG8tdXBsb2FkXCIpICE9PSBudWxsKXtcbiAgICAgICAgaWYoTGl2ZVVwbG9hZGVyLmZpbGVzQXdhaXRpbmdQcmVmbGlnaHQoaW5wdXRFbCkubGVuZ3RoID4gMCl7XG4gICAgICAgICAgbGV0IFtyZWYsIF9lbHNdID0gcmVmR2VuZXJhdG9yKClcbiAgICAgICAgICB0aGlzLnVwbG9hZEZpbGVzKGlucHV0RWwuZm9ybSwgdGFyZ2V0Q3R4LCByZWYsIGNpZCwgKF91cGxvYWRzKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhyZXNwKVxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyQXdhaXRpbmdTdWJtaXQoaW5wdXRFbC5mb3JtKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHJlc3ApXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHRyaWdnZXJBd2FpdGluZ1N1Ym1pdChmb3JtRWwpe1xuICAgIGxldCBhd2FpdGluZ1N1Ym1pdCA9IHRoaXMuZ2V0U2NoZWR1bGVkU3VibWl0KGZvcm1FbClcbiAgICBpZihhd2FpdGluZ1N1Ym1pdCl7XG4gICAgICBsZXQgW19lbCwgX3JlZiwgX29wdHMsIGNhbGxiYWNrXSA9IGF3YWl0aW5nU3VibWl0XG4gICAgICB0aGlzLmNhbmNlbFN1Ym1pdChmb3JtRWwpXG4gICAgICBjYWxsYmFjaygpXG4gICAgfVxuICB9XG5cbiAgZ2V0U2NoZWR1bGVkU3VibWl0KGZvcm1FbCl7XG4gICAgcmV0dXJuIHRoaXMuZm9ybVN1Ym1pdHMuZmluZCgoW2VsLCBfcmVmLCBfb3B0cywgX2NhbGxiYWNrXSkgPT4gZWwuaXNTYW1lTm9kZShmb3JtRWwpKVxuICB9XG5cbiAgc2NoZWR1bGVTdWJtaXQoZm9ybUVsLCByZWYsIG9wdHMsIGNhbGxiYWNrKXtcbiAgICBpZih0aGlzLmdldFNjaGVkdWxlZFN1Ym1pdChmb3JtRWwpKXsgcmV0dXJuIHRydWUgfVxuICAgIHRoaXMuZm9ybVN1Ym1pdHMucHVzaChbZm9ybUVsLCByZWYsIG9wdHMsIGNhbGxiYWNrXSlcbiAgfVxuXG4gIGNhbmNlbFN1Ym1pdChmb3JtRWwpe1xuICAgIHRoaXMuZm9ybVN1Ym1pdHMgPSB0aGlzLmZvcm1TdWJtaXRzLmZpbHRlcigoW2VsLCByZWYsIF9jYWxsYmFja10pID0+IHtcbiAgICAgIGlmKGVsLmlzU2FtZU5vZGUoZm9ybUVsKSl7XG4gICAgICAgIHRoaXMudW5kb1JlZnMocmVmKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHB1c2hGb3JtU3VibWl0KGZvcm1FbCwgdGFyZ2V0Q3R4LCBwaHhFdmVudCwgb3B0cywgb25SZXBseSl7XG4gICAgbGV0IGZpbHRlcklnbm9yZWQgPSBlbCA9PiB7XG4gICAgICBsZXQgdXNlcklnbm9yZWQgPSBjbG9zZXN0UGh4QmluZGluZyhlbCwgYCR7dGhpcy5iaW5kaW5nKFBIWF9VUERBVEUpfT1pZ25vcmVgLCBlbC5mb3JtKVxuICAgICAgcmV0dXJuICEodXNlcklnbm9yZWQgfHwgY2xvc2VzdFBoeEJpbmRpbmcoZWwsIFwiZGF0YS1waHgtdXBkYXRlPWlnbm9yZVwiLCBlbC5mb3JtKSlcbiAgICB9XG4gICAgbGV0IGZpbHRlckRpc2FibGVzID0gZWwgPT4ge1xuICAgICAgcmV0dXJuIGVsLmhhc0F0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoUEhYX0RJU0FCTEVfV0lUSCkpXG4gICAgfVxuICAgIGxldCBmaWx0ZXJCdXR0b24gPSBlbCA9PiBlbC50YWdOYW1lID09IFwiQlVUVE9OXCJcblxuICAgIGxldCBmaWx0ZXJJbnB1dCA9IGVsID0+IFtcIklOUFVUXCIsIFwiVEVYVEFSRUFcIiwgXCJTRUxFQ1RcIl0uaW5jbHVkZXMoZWwudGFnTmFtZSlcblxuICAgIGxldCByZWZHZW5lcmF0b3IgPSAoKSA9PiB7XG4gICAgICBsZXQgZm9ybUVsZW1lbnRzID0gQXJyYXkuZnJvbShmb3JtRWwuZWxlbWVudHMpXG4gICAgICBsZXQgZGlzYWJsZXMgPSBmb3JtRWxlbWVudHMuZmlsdGVyKGZpbHRlckRpc2FibGVzKVxuICAgICAgbGV0IGJ1dHRvbnMgPSBmb3JtRWxlbWVudHMuZmlsdGVyKGZpbHRlckJ1dHRvbikuZmlsdGVyKGZpbHRlcklnbm9yZWQpXG4gICAgICBsZXQgaW5wdXRzID0gZm9ybUVsZW1lbnRzLmZpbHRlcihmaWx0ZXJJbnB1dCkuZmlsdGVyKGZpbHRlcklnbm9yZWQpXG5cbiAgICAgIGJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKFBIWF9ESVNBQkxFRCwgYnV0dG9uLmRpc2FibGVkKVxuICAgICAgICBidXR0b24uZGlzYWJsZWQgPSB0cnVlXG4gICAgICB9KVxuICAgICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoUEhYX1JFQURPTkxZLCBpbnB1dC5yZWFkT25seSlcbiAgICAgICAgaW5wdXQucmVhZE9ubHkgPSB0cnVlXG4gICAgICAgIGlmKGlucHV0LmZpbGVzKXtcbiAgICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoUEhYX0RJU0FCTEVELCBpbnB1dC5kaXNhYmxlZClcbiAgICAgICAgICBpbnB1dC5kaXNhYmxlZCA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGZvcm1FbC5zZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9QQUdFX0xPQURJTkcpLCBcIlwiKVxuICAgICAgcmV0dXJuIHRoaXMucHV0UmVmKFtmb3JtRWxdLmNvbmNhdChkaXNhYmxlcykuY29uY2F0KGJ1dHRvbnMpLmNvbmNhdChpbnB1dHMpLCBcInN1Ym1pdFwiLCBvcHRzKVxuICAgIH1cblxuICAgIGxldCBjaWQgPSB0aGlzLnRhcmdldENvbXBvbmVudElEKGZvcm1FbCwgdGFyZ2V0Q3R4KVxuICAgIGlmKExpdmVVcGxvYWRlci5oYXNVcGxvYWRzSW5Qcm9ncmVzcyhmb3JtRWwpKXtcbiAgICAgIGxldCBbcmVmLCBfZWxzXSA9IHJlZkdlbmVyYXRvcigpXG4gICAgICBsZXQgcHVzaCA9ICgpID0+IHRoaXMucHVzaEZvcm1TdWJtaXQoZm9ybUVsLCB0YXJnZXRDdHgsIHBoeEV2ZW50LCBvcHRzLCBvblJlcGx5KVxuICAgICAgcmV0dXJuIHRoaXMuc2NoZWR1bGVTdWJtaXQoZm9ybUVsLCByZWYsIG9wdHMsIHB1c2gpXG4gICAgfSBlbHNlIGlmKExpdmVVcGxvYWRlci5pbnB1dHNBd2FpdGluZ1ByZWZsaWdodChmb3JtRWwpLmxlbmd0aCA+IDApe1xuICAgICAgbGV0IFtyZWYsIGVsc10gPSByZWZHZW5lcmF0b3IoKVxuICAgICAgbGV0IHByb3h5UmVmR2VuID0gKCkgPT4gW3JlZiwgZWxzLCBvcHRzXVxuICAgICAgdGhpcy51cGxvYWRGaWxlcyhmb3JtRWwsIHRhcmdldEN0eCwgcmVmLCBjaWQsIChfdXBsb2FkcykgPT4ge1xuICAgICAgICBsZXQgZm9ybURhdGEgPSBzZXJpYWxpemVGb3JtKGZvcm1FbCwge30pXG4gICAgICAgIHRoaXMucHVzaFdpdGhSZXBseShwcm94eVJlZkdlbiwgXCJldmVudFwiLCB7XG4gICAgICAgICAgdHlwZTogXCJmb3JtXCIsXG4gICAgICAgICAgZXZlbnQ6IHBoeEV2ZW50LFxuICAgICAgICAgIHZhbHVlOiBmb3JtRGF0YSxcbiAgICAgICAgICBjaWQ6IGNpZFxuICAgICAgICB9LCBvblJlcGx5KVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGZvcm1EYXRhID0gc2VyaWFsaXplRm9ybShmb3JtRWwsIHt9KVxuICAgICAgdGhpcy5wdXNoV2l0aFJlcGx5KHJlZkdlbmVyYXRvciwgXCJldmVudFwiLCB7XG4gICAgICAgIHR5cGU6IFwiZm9ybVwiLFxuICAgICAgICBldmVudDogcGh4RXZlbnQsXG4gICAgICAgIHZhbHVlOiBmb3JtRGF0YSxcbiAgICAgICAgY2lkOiBjaWRcbiAgICAgIH0sIG9uUmVwbHkpXG4gICAgfVxuICB9XG5cbiAgdXBsb2FkRmlsZXMoZm9ybUVsLCB0YXJnZXRDdHgsIHJlZiwgY2lkLCBvbkNvbXBsZXRlKXtcbiAgICBsZXQgam9pbkNvdW50QXRVcGxvYWQgPSB0aGlzLmpvaW5Db3VudFxuICAgIGxldCBpbnB1dEVscyA9IExpdmVVcGxvYWRlci5hY3RpdmVGaWxlSW5wdXRzKGZvcm1FbClcbiAgICBsZXQgbnVtRmlsZUlucHV0c0luUHJvZ3Jlc3MgPSBpbnB1dEVscy5sZW5ndGhcblxuICAgIC8vIGdldCBlYWNoIGZpbGUgaW5wdXRcbiAgICBpbnB1dEVscy5mb3JFYWNoKGlucHV0RWwgPT4ge1xuICAgICAgbGV0IHVwbG9hZGVyID0gbmV3IExpdmVVcGxvYWRlcihpbnB1dEVsLCB0aGlzLCAoKSA9PiB7XG4gICAgICAgIG51bUZpbGVJbnB1dHNJblByb2dyZXNzLS1cbiAgICAgICAgaWYobnVtRmlsZUlucHV0c0luUHJvZ3Jlc3MgPT09IDApeyBvbkNvbXBsZXRlKCkgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudXBsb2FkZXJzW2lucHV0RWxdID0gdXBsb2FkZXJcbiAgICAgIGxldCBlbnRyaWVzID0gdXBsb2FkZXIuZW50cmllcygpLm1hcChlbnRyeSA9PiBlbnRyeS50b1ByZWZsaWdodFBheWxvYWQoKSlcblxuICAgICAgbGV0IHBheWxvYWQgPSB7XG4gICAgICAgIHJlZjogaW5wdXRFbC5nZXRBdHRyaWJ1dGUoUEhYX1VQTE9BRF9SRUYpLFxuICAgICAgICBlbnRyaWVzOiBlbnRyaWVzLFxuICAgICAgICBjaWQ6IHRoaXMudGFyZ2V0Q29tcG9uZW50SUQoaW5wdXRFbC5mb3JtLCB0YXJnZXRDdHgpXG4gICAgICB9XG5cbiAgICAgIHRoaXMubG9nKFwidXBsb2FkXCIsICgpID0+IFtcInNlbmRpbmcgcHJlZmxpZ2h0IHJlcXVlc3RcIiwgcGF5bG9hZF0pXG5cbiAgICAgIHRoaXMucHVzaFdpdGhSZXBseShudWxsLCBcImFsbG93X3VwbG9hZFwiLCBwYXlsb2FkLCByZXNwID0+IHtcbiAgICAgICAgdGhpcy5sb2coXCJ1cGxvYWRcIiwgKCkgPT4gW1wiZ290IHByZWZsaWdodCByZXNwb25zZVwiLCByZXNwXSlcbiAgICAgICAgaWYocmVzcC5lcnJvcil7XG4gICAgICAgICAgdGhpcy51bmRvUmVmcyhyZWYpXG4gICAgICAgICAgbGV0IFtlbnRyeV9yZWYsIHJlYXNvbl0gPSByZXNwLmVycm9yXG4gICAgICAgICAgdGhpcy5sb2coXCJ1cGxvYWRcIiwgKCkgPT4gW2BlcnJvciBmb3IgZW50cnkgJHtlbnRyeV9yZWZ9YCwgcmVhc29uXSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgb25FcnJvciA9IChjYWxsYmFjaykgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGFubmVsLm9uRXJyb3IoKCkgPT4ge1xuICAgICAgICAgICAgICBpZih0aGlzLmpvaW5Db3VudCA9PT0gam9pbkNvdW50QXRVcGxvYWQpeyBjYWxsYmFjaygpIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIHVwbG9hZGVyLmluaXRBZGFwdGVyVXBsb2FkKHJlc3AsIG9uRXJyb3IsIHRoaXMubGl2ZVNvY2tldClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgZGlzcGF0Y2hVcGxvYWRzKG5hbWUsIGZpbGVzT3JCbG9icyl7XG4gICAgbGV0IGlucHV0cyA9IERPTS5maW5kVXBsb2FkSW5wdXRzKHRoaXMuZWwpLmZpbHRlcihlbCA9PiBlbC5uYW1lID09PSBuYW1lKVxuICAgIGlmKGlucHV0cy5sZW5ndGggPT09IDApeyBsb2dFcnJvcihgbm8gbGl2ZSBmaWxlIGlucHV0cyBmb3VuZCBtYXRjaGluZyB0aGUgbmFtZSBcIiR7bmFtZX1cImApIH1cbiAgICBlbHNlIGlmKGlucHV0cy5sZW5ndGggPiAxKXsgbG9nRXJyb3IoYGR1cGxpY2F0ZSBsaXZlIGZpbGUgaW5wdXRzIGZvdW5kIG1hdGNoaW5nIHRoZSBuYW1lIFwiJHtuYW1lfVwiYCkgfVxuICAgIGVsc2UgeyBET00uZGlzcGF0Y2hFdmVudChpbnB1dHNbMF0sIFBIWF9UUkFDS19VUExPQURTLCB7ZGV0YWlsOiB7ZmlsZXM6IGZpbGVzT3JCbG9ic319KSB9XG4gIH1cblxuICBwdXNoRm9ybVJlY292ZXJ5KGZvcm0sIG5ld0NpZCwgY2FsbGJhY2spe1xuICAgIHRoaXMubGl2ZVNvY2tldC53aXRoaW5Pd25lcnMoZm9ybSwgKHZpZXcsIHRhcmdldEN0eCkgPT4ge1xuICAgICAgbGV0IGlucHV0ID0gZm9ybS5lbGVtZW50c1swXVxuICAgICAgbGV0IHBoeEV2ZW50ID0gZm9ybS5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9BVVRPX1JFQ09WRVIpKSB8fCBmb3JtLmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoXCJjaGFuZ2VcIikpXG5cbiAgICAgIEpTLmV4ZWMoXCJjaGFuZ2VcIiwgcGh4RXZlbnQsIHZpZXcsIGlucHV0LCBbXCJwdXNoXCIsIHtfdGFyZ2V0OiBpbnB1dC5uYW1lLCBuZXdDaWQ6IG5ld0NpZCwgY2FsbGJhY2s6IGNhbGxiYWNrfV0pXG4gICAgfSlcbiAgfVxuXG4gIHB1c2hMaW5rUGF0Y2goaHJlZiwgdGFyZ2V0RWwsIGNhbGxiYWNrKXtcbiAgICBsZXQgbGlua1JlZiA9IHRoaXMubGl2ZVNvY2tldC5zZXRQZW5kaW5nTGluayhocmVmKVxuICAgIGxldCByZWZHZW4gPSB0YXJnZXRFbCA/ICgpID0+IHRoaXMucHV0UmVmKFt0YXJnZXRFbF0sIFwiY2xpY2tcIikgOiBudWxsXG4gICAgbGV0IGZhbGxiYWNrID0gKCkgPT4gdGhpcy5saXZlU29ja2V0LnJlZGlyZWN0KHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuXG4gICAgbGV0IHB1c2ggPSB0aGlzLnB1c2hXaXRoUmVwbHkocmVmR2VuLCBcImxpdmVfcGF0Y2hcIiwge3VybDogaHJlZn0sIHJlc3AgPT4ge1xuICAgICAgdGhpcy5saXZlU29ja2V0LnJlcXVlc3RET01VcGRhdGUoKCkgPT4ge1xuICAgICAgICBpZihyZXNwLmxpbmtfcmVkaXJlY3Qpe1xuICAgICAgICAgIHRoaXMubGl2ZVNvY2tldC5yZXBsYWNlTWFpbihocmVmLCBudWxsLCBjYWxsYmFjaywgbGlua1JlZilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZih0aGlzLmxpdmVTb2NrZXQuY29tbWl0UGVuZGluZ0xpbmsobGlua1JlZikpe1xuICAgICAgICAgICAgdGhpcy5ocmVmID0gaHJlZlxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFwcGx5UGVuZGluZ1VwZGF0ZXMoKVxuICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGxpbmtSZWYpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGlmKHB1c2gpe1xuICAgICAgcHVzaC5yZWNlaXZlKFwidGltZW91dFwiLCBmYWxsYmFjaylcbiAgICB9IGVsc2Uge1xuICAgICAgZmFsbGJhY2soKVxuICAgIH1cbiAgfVxuXG4gIGZvcm1zRm9yUmVjb3ZlcnkoaHRtbCl7XG4gICAgaWYodGhpcy5qb2luQ291bnQgPT09IDApeyByZXR1cm4gW10gfVxuXG4gICAgbGV0IHBoeENoYW5nZSA9IHRoaXMuYmluZGluZyhcImNoYW5nZVwiKVxuICAgIGxldCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKVxuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IGh0bWxcblxuICAgIHJldHVybiAoXG4gICAgICBET00uYWxsKHRoaXMuZWwsIGBmb3JtWyR7cGh4Q2hhbmdlfV1gKVxuICAgICAgICAuZmlsdGVyKGZvcm0gPT4gZm9ybS5pZCAmJiB0aGlzLm93bnNFbGVtZW50KGZvcm0pKVxuICAgICAgICAuZmlsdGVyKGZvcm0gPT4gZm9ybS5lbGVtZW50cy5sZW5ndGggPiAwKVxuICAgICAgICAuZmlsdGVyKGZvcm0gPT4gZm9ybS5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9BVVRPX1JFQ09WRVIpKSAhPT0gXCJpZ25vcmVcIilcbiAgICAgICAgLm1hcChmb3JtID0+IHtcbiAgICAgICAgICBsZXQgbmV3Rm9ybSA9IHRlbXBsYXRlLmNvbnRlbnQucXVlcnlTZWxlY3RvcihgZm9ybVtpZD1cIiR7Zm9ybS5pZH1cIl1bJHtwaHhDaGFuZ2V9PVwiJHtmb3JtLmdldEF0dHJpYnV0ZShwaHhDaGFuZ2UpfVwiXWApXG4gICAgICAgICAgaWYobmV3Rm9ybSl7XG4gICAgICAgICAgICByZXR1cm4gW2Zvcm0sIG5ld0Zvcm0sIHRoaXMudGFyZ2V0Q29tcG9uZW50SUQobmV3Rm9ybSldXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbZm9ybSwgbnVsbCwgbnVsbF1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5maWx0ZXIoKFtmb3JtLCBuZXdGb3JtLCBuZXdDaWRdKSA9PiBuZXdGb3JtKVxuICAgIClcbiAgfVxuXG4gIG1heWJlUHVzaENvbXBvbmVudHNEZXN0cm95ZWQoZGVzdHJveWVkQ0lEcyl7XG4gICAgbGV0IHdpbGxEZXN0cm95Q0lEcyA9IGRlc3Ryb3llZENJRHMuZmlsdGVyKGNpZCA9PiB7XG4gICAgICByZXR1cm4gRE9NLmZpbmRDb21wb25lbnROb2RlTGlzdCh0aGlzLmVsLCBjaWQpLmxlbmd0aCA9PT0gMFxuICAgIH0pXG4gICAgaWYod2lsbERlc3Ryb3lDSURzLmxlbmd0aCA+IDApe1xuICAgICAgdGhpcy5wcnVuaW5nQ0lEcy5wdXNoKC4uLndpbGxEZXN0cm95Q0lEcylcblxuICAgICAgdGhpcy5wdXNoV2l0aFJlcGx5KG51bGwsIFwiY2lkc193aWxsX2Rlc3Ryb3lcIiwge2NpZHM6IHdpbGxEZXN0cm95Q0lEc30sICgpID0+IHtcbiAgICAgICAgLy8gVGhlIGNpZHMgYXJlIGVpdGhlciBiYWNrIG9uIHRoZSBwYWdlIG9yIHRoZXkgd2lsbCBiZSBmdWxseSByZW1vdmVkLFxuICAgICAgICAvLyBzbyB3ZSBjYW4gcmVtb3ZlIHRoZW0gZnJvbSB0aGUgcHJ1bmluZ0NJRHMuXG4gICAgICAgIHRoaXMucHJ1bmluZ0NJRHMgPSB0aGlzLnBydW5pbmdDSURzLmZpbHRlcihjaWQgPT4gd2lsbERlc3Ryb3lDSURzLmluZGV4T2YoY2lkKSAhPT0gLTEpXG5cbiAgICAgICAgLy8gU2VlIGlmIGFueSBvZiB0aGUgY2lkcyB3ZSB3YW50ZWQgdG8gZGVzdHJveSB3ZXJlIGFkZGVkIGJhY2ssXG4gICAgICAgIC8vIGlmIHRoZXkgd2VyZSBhZGRlZCBiYWNrLCB3ZSBkb24ndCBhY3R1YWxseSBkZXN0cm95IHRoZW0uXG4gICAgICAgIGxldCBjb21wbGV0ZWx5RGVzdHJveUNJRHMgPSB3aWxsRGVzdHJveUNJRHMuZmlsdGVyKGNpZCA9PiB7XG4gICAgICAgICAgcmV0dXJuIERPTS5maW5kQ29tcG9uZW50Tm9kZUxpc3QodGhpcy5lbCwgY2lkKS5sZW5ndGggPT09IDBcbiAgICAgICAgfSlcblxuICAgICAgICBpZihjb21wbGV0ZWx5RGVzdHJveUNJRHMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgdGhpcy5wdXNoV2l0aFJlcGx5KG51bGwsIFwiY2lkc19kZXN0cm95ZWRcIiwge2NpZHM6IGNvbXBsZXRlbHlEZXN0cm95Q0lEc30sIChyZXNwKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVkLnBydW5lQ0lEcyhyZXNwLmNpZHMpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBvd25zRWxlbWVudChlbCl7XG4gICAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZShQSFhfUEFSRU5UX0lEKSA9PT0gdGhpcy5pZCB8fFxuICAgICAgbWF5YmUoZWwuY2xvc2VzdChQSFhfVklFV19TRUxFQ1RPUiksIG5vZGUgPT4gbm9kZS5pZCkgPT09IHRoaXMuaWRcbiAgfVxuXG4gIHN1Ym1pdEZvcm0oZm9ybSwgdGFyZ2V0Q3R4LCBwaHhFdmVudCwgb3B0cyA9IHt9KXtcbiAgICBET00ucHV0UHJpdmF0ZShmb3JtLCBQSFhfSEFTX1NVQk1JVFRFRCwgdHJ1ZSlcbiAgICBsZXQgcGh4RmVlZGJhY2sgPSB0aGlzLmxpdmVTb2NrZXQuYmluZGluZyhQSFhfRkVFREJBQ0tfRk9SKVxuICAgIGxldCBpbnB1dHMgPSBBcnJheS5mcm9tKGZvcm0uZWxlbWVudHMpXG4gICAgdGhpcy5saXZlU29ja2V0LmJsdXJBY3RpdmVFbGVtZW50KHRoaXMpXG4gICAgdGhpcy5wdXNoRm9ybVN1Ym1pdChmb3JtLCB0YXJnZXRDdHgsIHBoeEV2ZW50LCBvcHRzLCAoKSA9PiB7XG4gICAgICBpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiBET00uc2hvd0Vycm9yKGlucHV0LCBwaHhGZWVkYmFjaykpXG4gICAgICB0aGlzLmxpdmVTb2NrZXQucmVzdG9yZVByZXZpb3VzbHlBY3RpdmVGb2N1cygpXG4gICAgfSlcbiAgfVxuXG4gIGJpbmRpbmcoa2luZCl7IHJldHVybiB0aGlzLmxpdmVTb2NrZXQuYmluZGluZyhraW5kKSB9XG59XG4iLCAiLyoqIEluaXRpYWxpemVzIHRoZSBMaXZlU29ja2V0XG4gKlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbmRQb2ludCAtIFRoZSBzdHJpbmcgV2ViU29ja2V0IGVuZHBvaW50LCBpZSwgYFwid3NzOi8vZXhhbXBsZS5jb20vbGl2ZVwiYCxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgXCIvbGl2ZVwiYCAoaW5oZXJpdGVkIGhvc3QgJiBwcm90b2NvbClcbiAqIEBwYXJhbSB7UGhvZW5peC5Tb2NrZXR9IHNvY2tldCAtIHRoZSByZXF1aXJlZCBQaG9lbml4IFNvY2tldCBjbGFzcyBpbXBvcnRlZCBmcm9tIFwicGhvZW5peFwiLiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgICAgaW1wb3J0IHtTb2NrZXR9IGZyb20gXCJwaG9lbml4XCJcbiAqICAgICBpbXBvcnQge0xpdmVTb2NrZXR9IGZyb20gXCJwaG9lbml4X2xpdmVfdmlld1wiXG4gKiAgICAgbGV0IGxpdmVTb2NrZXQgPSBuZXcgTGl2ZVNvY2tldChcIi9saXZlXCIsIFNvY2tldCwgey4uLn0pXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzXSAtIE9wdGlvbmFsIGNvbmZpZ3VyYXRpb24uIE91dHNpZGUgb2Yga2V5cyBsaXN0ZWQgYmVsb3csIGFsbFxuICogY29uZmlndXJhdGlvbiBpcyBwYXNzZWQgZGlyZWN0bHkgdG8gdGhlIFBob2VuaXggU29ja2V0IGNvbnN0cnVjdG9yLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLmRlZmF1bHRzXSAtIFRoZSBvcHRpb25hbCBkZWZhdWx0cyB0byB1c2UgZm9yIHZhcmlvdXMgYmluZGluZ3MsXG4gKiBzdWNoIGFzIGBwaHgtZGVib3VuY2VgLiBTdXBwb3J0cyB0aGUgZm9sbG93aW5nIGtleXM6XG4gKlxuICogICAtIGRlYm91bmNlIC0gdGhlIG1pbGxpc2Vjb25kIHBoeC1kZWJvdW5jZSB0aW1lLiBEZWZhdWx0cyAzMDBcbiAqICAgLSB0aHJvdHRsZSAtIHRoZSBtaWxsaXNlY29uZCBwaHgtdGhyb3R0bGUgdGltZS4gRGVmYXVsdHMgMzAwXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdHMucGFyYW1zXSAtIFRoZSBvcHRpb25hbCBmdW5jdGlvbiBmb3IgcGFzc2luZyBjb25uZWN0IHBhcmFtcy5cbiAqIFRoZSBmdW5jdGlvbiByZWNlaXZlcyB0aGUgZWxlbWVudCBhc3NvY2lhdGVkIHdpdGggYSBnaXZlbiBMaXZlVmlldy4gRm9yIGV4YW1wbGU6XG4gKlxuICogICAgIChlbCkgPT4ge3ZpZXc6IGVsLmdldEF0dHJpYnV0ZShcImRhdGEtbXktdmlldy1uYW1lXCIsIHRva2VuOiB3aW5kb3cubXlUb2tlbn1cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdHMuYmluZGluZ1ByZWZpeF0gLSBUaGUgb3B0aW9uYWwgcHJlZml4IHRvIHVzZSBmb3IgYWxsIHBoeCBET00gYW5ub3RhdGlvbnMuXG4gKiBEZWZhdWx0cyB0byBcInBoeC1cIi5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cy5ob29rc10gLSBUaGUgb3B0aW9uYWwgb2JqZWN0IGZvciByZWZlcmVuY2luZyBMaXZlVmlldyBob29rIGNhbGxiYWNrcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cy51cGxvYWRlcnNdIC0gVGhlIG9wdGlvbmFsIG9iamVjdCBmb3IgcmVmZXJlbmNpbmcgTGl2ZVZpZXcgdXBsb2FkZXIgY2FsbGJhY2tzLlxuICogQHBhcmFtIHtpbnRlZ2VyfSBbb3B0cy5sb2FkZXJUaW1lb3V0XSAtIFRoZSBvcHRpb25hbCBkZWxheSBpbiBtaWxsaXNlY29uZHMgdG8gd2FpdCBiZWZvcmUgYXBwbHlcbiAqIGxvYWRpbmcgc3RhdGVzLlxuICogQHBhcmFtIHtpbnRlZ2VyfSBbb3B0cy5tYXhSZWxvYWRzXSAtIFRoZSBtYXhpbXVtIHJlbG9hZHMgYmVmb3JlIGVudGVyaW5nIGZhaWxzYWZlIG1vZGUuXG4gKiBAcGFyYW0ge2ludGVnZXJ9IFtvcHRzLnJlbG9hZEppdHRlck1pbl0gLSBUaGUgbWluaW11bSB0aW1lIGJldHdlZW4gbm9ybWFsIHJlbG9hZCBhdHRlbXB0cy5cbiAqIEBwYXJhbSB7aW50ZWdlcn0gW29wdHMucmVsb2FkSml0dGVyTWF4XSAtIFRoZSBtYXhpbXVtIHRpbWUgYmV0d2VlbiBub3JtYWwgcmVsb2FkIGF0dGVtcHRzLlxuICogQHBhcmFtIHtpbnRlZ2VyfSBbb3B0cy5mYWlsc2FmZUppdHRlcl0gLSBUaGUgdGltZSBiZXR3ZWVuIHJlbG9hZCBhdHRlbXB0cyBpbiBmYWlsc2FmZSBtb2RlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdHMudmlld0xvZ2dlcl0gLSBUaGUgb3B0aW9uYWwgZnVuY3Rpb24gdG8gbG9nIGRlYnVnIGluZm9ybWF0aW9uLiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgICAgKHZpZXcsIGtpbmQsIG1zZywgb2JqKSA9PiBjb25zb2xlLmxvZyhgJHt2aWV3LmlkfSAke2tpbmR9OiAke21zZ30gLSBgLCBvYmopXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLm1ldGFkYXRhXSAtIFRoZSBvcHRpb25hbCBvYmplY3QgbWFwcGluZyBldmVudCBuYW1lcyB0byBmdW5jdGlvbnMgZm9yXG4gKiBwb3B1bGF0aW5nIGV2ZW50IG1ldGFkYXRhLiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgICAgbWV0YWRhdGE6IHtcbiAqICAgICAgIGNsaWNrOiAoZSwgZWwpID0+IHtcbiAqICAgICAgICAgcmV0dXJuIHtcbiAqICAgICAgICAgICBjdHJsS2V5OiBlLmN0cmxLZXksXG4gKiAgICAgICAgICAgbWV0YUtleTogZS5tZXRhS2V5LFxuICogICAgICAgICAgIGRldGFpbDogZS5kZXRhaWwgfHwgMSxcbiAqICAgICAgICAgfVxuICogICAgICAgfSxcbiAqICAgICAgIGtleWRvd246IChlLCBlbCkgPT4ge1xuICogICAgICAgICByZXR1cm4ge1xuICogICAgICAgICAgIGtleTogZS5rZXksXG4gKiAgICAgICAgICAgY3RybEtleTogZS5jdHJsS2V5LFxuICogICAgICAgICAgIG1ldGFLZXk6IGUubWV0YUtleSxcbiAqICAgICAgICAgICBzaGlmdEtleTogZS5zaGlmdEtleVxuICogICAgICAgICB9XG4gKiAgICAgICB9XG4gKiAgICAgfVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLnNlc3Npb25TdG9yYWdlXSAtIEFuIG9wdGlvbmFsIFN0b3JhZ2UgY29tcGF0aWJsZSBvYmplY3RcbiAqIFVzZWZ1bCB3aGVuIExpdmVWaWV3IHdvbid0IGhhdmUgYWNjZXNzIHRvIGBzZXNzaW9uU3RvcmFnZWAuICBGb3IgZXhhbXBsZSwgVGhpcyBjb3VsZFxuICogaGFwcGVuIGlmIGEgc2l0ZSBsb2FkcyBhIGNyb3NzLWRvbWFpbiBMaXZlVmlldyBpbiBhbiBpZnJhbWUuICBFeGFtcGxlIHVzYWdlOlxuICpcbiAqICAgICBjbGFzcyBJbk1lbW9yeVN0b3JhZ2Uge1xuICogICAgICAgY29uc3RydWN0b3IoKSB7IHRoaXMuc3RvcmFnZSA9IHt9IH1cbiAqICAgICAgIGdldEl0ZW0oa2V5TmFtZSkgeyByZXR1cm4gdGhpcy5zdG9yYWdlW2tleU5hbWVdIH1cbiAqICAgICAgIHJlbW92ZUl0ZW0oa2V5TmFtZSkgeyBkZWxldGUgdGhpcy5zdG9yYWdlW2tleU5hbWVdIH1cbiAqICAgICAgIHNldEl0ZW0oa2V5TmFtZSwga2V5VmFsdWUpIHsgdGhpcy5zdG9yYWdlW2tleU5hbWVdID0ga2V5VmFsdWUgfVxuICogICAgIH1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHMubG9jYWxTdG9yYWdlXSAtIEFuIG9wdGlvbmFsIFN0b3JhZ2UgY29tcGF0aWJsZSBvYmplY3RcbiAqIFVzZWZ1bCBmb3Igd2hlbiBMaXZlVmlldyB3b24ndCBoYXZlIGFjY2VzcyB0byBgbG9jYWxTdG9yYWdlYC5cbiAqIFNlZSBgb3B0cy5zZXNzaW9uU3RvcmFnZWAgZm9yIGV4YW1wbGVzLlxuKi9cblxuaW1wb3J0IHtcbiAgQklORElOR19QUkVGSVgsXG4gIENPTlNFQ1VUSVZFX1JFTE9BRFMsXG4gIERFRkFVTFRTLFxuICBGQUlMU0FGRV9KSVRURVIsXG4gIExPQURFUl9USU1FT1VULFxuICBNQVhfUkVMT0FEUyxcbiAgUEhYX0RFQk9VTkNFLFxuICBQSFhfRFJPUF9UQVJHRVQsXG4gIFBIWF9IQVNfRk9DVVNFRCxcbiAgUEhYX0tFWSxcbiAgUEhYX0xJTktfU1RBVEUsXG4gIFBIWF9MSVZFX0xJTkssXG4gIFBIWF9MVl9ERUJVRyxcbiAgUEhYX0xWX0xBVEVOQ1lfU0lNLFxuICBQSFhfTFZfUFJPRklMRSxcbiAgUEhYX01BSU4sXG4gIFBIWF9QQVJFTlRfSUQsXG4gIFBIWF9WSUVXX1NFTEVDVE9SLFxuICBQSFhfUk9PVF9JRCxcbiAgUEhYX1RIUk9UVExFLFxuICBQSFhfVFJBQ0tfVVBMT0FEUyxcbiAgUEhYX1NFU1NJT04sXG4gIFJFTE9BRF9KSVRURVJfTUlOLFxuICBSRUxPQURfSklUVEVSX01BWCxcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbiAgY2xvbmUsXG4gIGNsb3Nlc3RQaHhCaW5kaW5nLFxuICBjbG9zdXJlLFxuICBkZWJ1ZyxcbiAgaXNPYmplY3QsXG4gIG1heWJlXG59IGZyb20gXCIuL3V0aWxzXCJcblxuaW1wb3J0IEJyb3dzZXIgZnJvbSBcIi4vYnJvd3NlclwiXG5pbXBvcnQgRE9NIGZyb20gXCIuL2RvbVwiXG5pbXBvcnQgSG9va3MgZnJvbSBcIi4vaG9va3NcIlxuaW1wb3J0IExpdmVVcGxvYWRlciBmcm9tIFwiLi9saXZlX3VwbG9hZGVyXCJcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXdcIlxuaW1wb3J0IEpTIGZyb20gXCIuL2pzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGl2ZVNvY2tldCB7XG4gIGNvbnN0cnVjdG9yKHVybCwgcGh4U29ja2V0LCBvcHRzID0ge30pe1xuICAgIHRoaXMudW5sb2FkZWQgPSBmYWxzZVxuICAgIGlmKCFwaHhTb2NrZXQgfHwgcGh4U29ja2V0LmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiT2JqZWN0XCIpe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBcbiAgICAgIGEgcGhvZW5peCBTb2NrZXQgbXVzdCBiZSBwcm92aWRlZCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIHRoZSBMaXZlU29ja2V0IGNvbnN0cnVjdG9yLiBGb3IgZXhhbXBsZTpcblxuICAgICAgICAgIGltcG9ydCB7U29ja2V0fSBmcm9tIFwicGhvZW5peFwiXG4gICAgICAgICAgaW1wb3J0IHtMaXZlU29ja2V0fSBmcm9tIFwicGhvZW5peF9saXZlX3ZpZXdcIlxuICAgICAgICAgIGxldCBsaXZlU29ja2V0ID0gbmV3IExpdmVTb2NrZXQoXCIvbGl2ZVwiLCBTb2NrZXQsIHsuLi59KVxuICAgICAgYClcbiAgICB9XG4gICAgdGhpcy5zb2NrZXQgPSBuZXcgcGh4U29ja2V0KHVybCwgb3B0cylcbiAgICB0aGlzLmJpbmRpbmdQcmVmaXggPSBvcHRzLmJpbmRpbmdQcmVmaXggfHwgQklORElOR19QUkVGSVhcbiAgICB0aGlzLm9wdHMgPSBvcHRzXG4gICAgdGhpcy5wYXJhbXMgPSBjbG9zdXJlKG9wdHMucGFyYW1zIHx8IHt9KVxuICAgIHRoaXMudmlld0xvZ2dlciA9IG9wdHMudmlld0xvZ2dlclxuICAgIHRoaXMubWV0YWRhdGFDYWxsYmFja3MgPSBvcHRzLm1ldGFkYXRhIHx8IHt9XG4gICAgdGhpcy5kZWZhdWx0cyA9IE9iamVjdC5hc3NpZ24oY2xvbmUoREVGQVVMVFMpLCBvcHRzLmRlZmF1bHRzIHx8IHt9KVxuICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IG51bGxcbiAgICB0aGlzLnByZXZBY3RpdmUgPSBudWxsXG4gICAgdGhpcy5zaWxlbmNlZCA9IGZhbHNlXG4gICAgdGhpcy5tYWluID0gbnVsbFxuICAgIHRoaXMub3V0Z29pbmdNYWluRWwgPSBudWxsXG4gICAgdGhpcy5jbGlja1N0YXJ0ZWRBdFRhcmdldCA9IG51bGxcbiAgICB0aGlzLmxpbmtSZWYgPSAxXG4gICAgdGhpcy5yb290cyA9IHt9XG4gICAgdGhpcy5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWZcbiAgICB0aGlzLnBlbmRpbmdMaW5rID0gbnVsbFxuICAgIHRoaXMuY3VycmVudExvY2F0aW9uID0gY2xvbmUod2luZG93LmxvY2F0aW9uKVxuICAgIHRoaXMuaG9va3MgPSBvcHRzLmhvb2tzIHx8IHt9XG4gICAgdGhpcy51cGxvYWRlcnMgPSBvcHRzLnVwbG9hZGVycyB8fCB7fVxuICAgIHRoaXMubG9hZGVyVGltZW91dCA9IG9wdHMubG9hZGVyVGltZW91dCB8fCBMT0FERVJfVElNRU9VVFxuICAgIHRoaXMucmVsb2FkV2l0aEppdHRlclRpbWVyID0gbnVsbFxuICAgIHRoaXMubWF4UmVsb2FkcyA9IG9wdHMubWF4UmVsb2FkcyB8fCBNQVhfUkVMT0FEU1xuICAgIHRoaXMucmVsb2FkSml0dGVyTWluID0gb3B0cy5yZWxvYWRKaXR0ZXJNaW4gfHwgUkVMT0FEX0pJVFRFUl9NSU5cbiAgICB0aGlzLnJlbG9hZEppdHRlck1heCA9IG9wdHMucmVsb2FkSml0dGVyTWF4IHx8IFJFTE9BRF9KSVRURVJfTUFYXG4gICAgdGhpcy5mYWlsc2FmZUppdHRlciA9IG9wdHMuZmFpbHNhZmVKaXR0ZXIgfHwgRkFJTFNBRkVfSklUVEVSXG4gICAgdGhpcy5sb2NhbFN0b3JhZ2UgPSBvcHRzLmxvY2FsU3RvcmFnZSB8fCB3aW5kb3cubG9jYWxTdG9yYWdlXG4gICAgdGhpcy5zZXNzaW9uU3RvcmFnZSA9IG9wdHMuc2Vzc2lvblN0b3JhZ2UgfHwgd2luZG93LnNlc3Npb25TdG9yYWdlXG4gICAgdGhpcy5ib3VuZFRvcExldmVsRXZlbnRzID0gZmFsc2VcbiAgICB0aGlzLmRvbUNhbGxiYWNrcyA9IE9iamVjdC5hc3NpZ24oe29uTm9kZUFkZGVkOiBjbG9zdXJlKCksIG9uQmVmb3JlRWxVcGRhdGVkOiBjbG9zdXJlKCl9LCBvcHRzLmRvbSB8fCB7fSlcbiAgICB0aGlzLnRyYW5zaXRpb25zID0gbmV3IFRyYW5zaXRpb25TZXQoKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZWhpZGVcIiwgX2UgPT4ge1xuICAgICAgdGhpcy51bmxvYWRlZCA9IHRydWVcbiAgICB9KVxuICAgIHRoaXMuc29ja2V0Lm9uT3BlbigoKSA9PiB7XG4gICAgICBpZih0aGlzLmlzVW5sb2FkZWQoKSl7XG4gICAgICAgIC8vIHJlbG9hZCBwYWdlIGlmIGJlaW5nIHJlc3RvcmVkIGZyb20gYmFjay9mb3J3YXJkIGNhY2hlIGFuZCBicm93c2VyIGRvZXMgbm90IGVtaXQgXCJwYWdlc2hvd1wiXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvLyBwdWJsaWNcblxuICBpc1Byb2ZpbGVFbmFibGVkKCl7IHJldHVybiB0aGlzLnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUEhYX0xWX1BST0ZJTEUpID09PSBcInRydWVcIiB9XG5cbiAgaXNEZWJ1Z0VuYWJsZWQoKXsgcmV0dXJuIHRoaXMuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQSFhfTFZfREVCVUcpID09PSBcInRydWVcIiB9XG5cbiAgaXNEZWJ1Z0Rpc2FibGVkKCl7IHJldHVybiB0aGlzLnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUEhYX0xWX0RFQlVHKSA9PT0gXCJmYWxzZVwiIH1cblxuICBlbmFibGVEZWJ1ZygpeyB0aGlzLnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUEhYX0xWX0RFQlVHLCBcInRydWVcIikgfVxuXG4gIGVuYWJsZVByb2ZpbGluZygpeyB0aGlzLnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUEhYX0xWX1BST0ZJTEUsIFwidHJ1ZVwiKSB9XG5cbiAgZGlzYWJsZURlYnVnKCl7IHRoaXMuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQSFhfTFZfREVCVUcsIFwiZmFsc2VcIikgfVxuXG4gIGRpc2FibGVQcm9maWxpbmcoKXsgdGhpcy5zZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFBIWF9MVl9QUk9GSUxFKSB9XG5cbiAgZW5hYmxlTGF0ZW5jeVNpbSh1cHBlckJvdW5kTXMpe1xuICAgIHRoaXMuZW5hYmxlRGVidWcoKVxuICAgIGNvbnNvbGUubG9nKFwibGF0ZW5jeSBzaW11bGF0b3IgZW5hYmxlZCBmb3IgdGhlIGR1cmF0aW9uIG9mIHRoaXMgYnJvd3NlciBzZXNzaW9uLiBDYWxsIGRpc2FibGVMYXRlbmN5U2ltKCkgdG8gZGlzYWJsZVwiKVxuICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQSFhfTFZfTEFURU5DWV9TSU0sIHVwcGVyQm91bmRNcylcbiAgfVxuXG4gIGRpc2FibGVMYXRlbmN5U2ltKCl7IHRoaXMuc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShQSFhfTFZfTEFURU5DWV9TSU0pIH1cblxuICBnZXRMYXRlbmN5U2ltKCl7XG4gICAgbGV0IHN0ciA9IHRoaXMuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQSFhfTFZfTEFURU5DWV9TSU0pXG4gICAgcmV0dXJuIHN0ciA/IHBhcnNlSW50KHN0cikgOiBudWxsXG4gIH1cblxuICBnZXRTb2NrZXQoKXsgcmV0dXJuIHRoaXMuc29ja2V0IH1cblxuICBjb25uZWN0KCl7XG4gICAgLy8gZW5hYmxlIGRlYnVnIGJ5IGRlZmF1bHQgaWYgb24gbG9jYWxob3N0IGFuZCBub3QgZXhwbGljaXRseSBkaXNhYmxlZFxuICAgIGlmKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gXCJsb2NhbGhvc3RcIiAmJiAhdGhpcy5pc0RlYnVnRGlzYWJsZWQoKSl7IHRoaXMuZW5hYmxlRGVidWcoKSB9XG4gICAgbGV0IGRvQ29ubmVjdCA9ICgpID0+IHtcbiAgICAgIGlmKHRoaXMuam9pblJvb3RWaWV3cygpKXtcbiAgICAgICAgdGhpcy5iaW5kVG9wTGV2ZWxFdmVudHMoKVxuICAgICAgICB0aGlzLnNvY2tldC5jb25uZWN0KClcbiAgICAgIH0gZWxzZSBpZih0aGlzLm1haW4pe1xuICAgICAgICB0aGlzLnNvY2tldC5jb25uZWN0KClcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoW1wiY29tcGxldGVcIiwgXCJsb2FkZWRcIiwgXCJpbnRlcmFjdGl2ZVwiXS5pbmRleE9mKGRvY3VtZW50LnJlYWR5U3RhdGUpID49IDApe1xuICAgICAgZG9Db25uZWN0KClcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4gZG9Db25uZWN0KCkpXG4gICAgfVxuICB9XG5cbiAgZGlzY29ubmVjdChjYWxsYmFjayl7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVsb2FkV2l0aEppdHRlclRpbWVyKVxuICAgIHRoaXMuc29ja2V0LmRpc2Nvbm5lY3QoY2FsbGJhY2spXG4gIH1cblxuICByZXBsYWNlVHJhbnNwb3J0KHRyYW5zcG9ydCl7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVsb2FkV2l0aEppdHRlclRpbWVyKVxuICAgIHRoaXMuc29ja2V0LnJlcGxhY2VUcmFuc3BvcnQodHJhbnNwb3J0KVxuICAgIHRoaXMuY29ubmVjdCgpXG4gIH1cblxuICBleGVjSlMoZWwsIGVuY29kZWRKUywgZXZlbnRUeXBlID0gbnVsbCl7XG4gICAgdGhpcy5vd25lcihlbCwgdmlldyA9PiBKUy5leGVjKGV2ZW50VHlwZSwgZW5jb2RlZEpTLCB2aWV3LCBlbCkpXG4gIH1cblxuICAvLyBwcml2YXRlXG5cbiAgdHJpZ2dlckRPTShraW5kLCBhcmdzKXsgdGhpcy5kb21DYWxsYmFja3Nba2luZF0oLi4uYXJncykgfVxuXG4gIHRpbWUobmFtZSwgZnVuYyl7XG4gICAgaWYoIXRoaXMuaXNQcm9maWxlRW5hYmxlZCgpIHx8ICFjb25zb2xlLnRpbWUpeyByZXR1cm4gZnVuYygpIH1cbiAgICBjb25zb2xlLnRpbWUobmFtZSlcbiAgICBsZXQgcmVzdWx0ID0gZnVuYygpXG4gICAgY29uc29sZS50aW1lRW5kKG5hbWUpXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgbG9nKHZpZXcsIGtpbmQsIG1zZ0NhbGxiYWNrKXtcbiAgICBpZih0aGlzLnZpZXdMb2dnZXIpe1xuICAgICAgbGV0IFttc2csIG9ial0gPSBtc2dDYWxsYmFjaygpXG4gICAgICB0aGlzLnZpZXdMb2dnZXIodmlldywga2luZCwgbXNnLCBvYmopXG4gICAgfSBlbHNlIGlmKHRoaXMuaXNEZWJ1Z0VuYWJsZWQoKSl7XG4gICAgICBsZXQgW21zZywgb2JqXSA9IG1zZ0NhbGxiYWNrKClcbiAgICAgIGRlYnVnKHZpZXcsIGtpbmQsIG1zZywgb2JqKVxuICAgIH1cbiAgfVxuXG4gIHJlcXVlc3RET01VcGRhdGUoY2FsbGJhY2spe1xuICAgIHRoaXMudHJhbnNpdGlvbnMuYWZ0ZXIoY2FsbGJhY2spXG4gIH1cblxuICB0cmFuc2l0aW9uKHRpbWUsIG9uU3RhcnQsIG9uRG9uZSA9IGZ1bmN0aW9uKCl7fSl7XG4gICAgdGhpcy50cmFuc2l0aW9ucy5hZGRUcmFuc2l0aW9uKHRpbWUsIG9uU3RhcnQsIG9uRG9uZSlcbiAgfVxuXG4gIG9uQ2hhbm5lbChjaGFubmVsLCBldmVudCwgY2Ipe1xuICAgIGNoYW5uZWwub24oZXZlbnQsIGRhdGEgPT4ge1xuICAgICAgbGV0IGxhdGVuY3kgPSB0aGlzLmdldExhdGVuY3lTaW0oKVxuICAgICAgaWYoIWxhdGVuY3kpe1xuICAgICAgICBjYihkYXRhKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coYHNpbXVsYXRpbmcgJHtsYXRlbmN5fW1zIG9mIGxhdGVuY3kgZnJvbSBzZXJ2ZXIgdG8gY2xpZW50YClcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBjYihkYXRhKSwgbGF0ZW5jeSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgd3JhcFB1c2godmlldywgb3B0cywgcHVzaCl7XG4gICAgbGV0IGxhdGVuY3kgPSB0aGlzLmdldExhdGVuY3lTaW0oKVxuICAgIGxldCBvbGRKb2luQ291bnQgPSB2aWV3LmpvaW5Db3VudFxuICAgIGlmKCFsYXRlbmN5KXtcbiAgICAgIGlmKHRoaXMuaXNDb25uZWN0ZWQoKSAmJiBvcHRzLnRpbWVvdXQpe1xuICAgICAgICByZXR1cm4gcHVzaCgpLnJlY2VpdmUoXCJ0aW1lb3V0XCIsICgpID0+IHtcbiAgICAgICAgICBpZih2aWV3LmpvaW5Db3VudCA9PT0gb2xkSm9pbkNvdW50ICYmICF2aWV3LmlzRGVzdHJveWVkKCkpe1xuICAgICAgICAgICAgdGhpcy5yZWxvYWRXaXRoSml0dGVyKHZpZXcsICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5sb2codmlldywgXCJ0aW1lb3V0XCIsICgpID0+IFtcInJlY2VpdmVkIHRpbWVvdXQgd2hpbGUgY29tbXVuaWNhdGluZyB3aXRoIHNlcnZlci4gRmFsbGluZyBiYWNrIHRvIGhhcmQgcmVmcmVzaCBmb3IgcmVjb3ZlcnlcIl0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwdXNoKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhgc2ltdWxhdGluZyAke2xhdGVuY3l9bXMgb2YgbGF0ZW5jeSBmcm9tIGNsaWVudCB0byBzZXJ2ZXJgKVxuICAgIGxldCBmYWtlUHVzaCA9IHtcbiAgICAgIHJlY2VpdmVzOiBbXSxcbiAgICAgIHJlY2VpdmUoa2luZCwgY2IpeyB0aGlzLnJlY2VpdmVzLnB1c2goW2tpbmQsIGNiXSkgfVxuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmKHZpZXcuaXNEZXN0cm95ZWQoKSl7IHJldHVybiB9XG4gICAgICBmYWtlUHVzaC5yZWNlaXZlcy5yZWR1Y2UoKGFjYywgW2tpbmQsIGNiXSkgPT4gYWNjLnJlY2VpdmUoa2luZCwgY2IpLCBwdXNoKCkpXG4gICAgfSwgbGF0ZW5jeSlcbiAgICByZXR1cm4gZmFrZVB1c2hcbiAgfVxuXG4gIHJlbG9hZFdpdGhKaXR0ZXIodmlldywgbG9nKXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZWxvYWRXaXRoSml0dGVyVGltZXIpXG4gICAgdGhpcy5kaXNjb25uZWN0KClcbiAgICBsZXQgbWluTXMgPSB0aGlzLnJlbG9hZEppdHRlck1pblxuICAgIGxldCBtYXhNcyA9IHRoaXMucmVsb2FkSml0dGVyTWF4XG4gICAgbGV0IGFmdGVyTXMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4TXMgLSBtaW5NcyArIDEpKSArIG1pbk1zXG4gICAgbGV0IHRyaWVzID0gQnJvd3Nlci51cGRhdGVMb2NhbCh0aGlzLmxvY2FsU3RvcmFnZSwgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLCBDT05TRUNVVElWRV9SRUxPQURTLCAwLCBjb3VudCA9PiBjb3VudCArIDEpXG4gICAgaWYodHJpZXMgPiB0aGlzLm1heFJlbG9hZHMpe1xuICAgICAgYWZ0ZXJNcyA9IHRoaXMuZmFpbHNhZmVKaXR0ZXJcbiAgICB9XG4gICAgdGhpcy5yZWxvYWRXaXRoSml0dGVyVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIC8vIGlmIHZpZXcgaGFzIHJlY292ZXJlZCwgc3VjaCBhcyB0cmFuc3BvcnQgcmVwbGFjZWQsIHRoZW4gY2FuY2VsXG4gICAgICBpZih2aWV3LmlzRGVzdHJveWVkKCkgfHwgdmlldy5pc0Nvbm5lY3RlZCgpKXsgcmV0dXJuIH1cbiAgICAgIHZpZXcuZGVzdHJveSgpXG4gICAgICBsb2cgPyBsb2coKSA6IHRoaXMubG9nKHZpZXcsIFwiam9pblwiLCAoKSA9PiBbYGVuY291bnRlcmVkICR7dHJpZXN9IGNvbnNlY3V0aXZlIHJlbG9hZHNgXSlcbiAgICAgIGlmKHRyaWVzID4gdGhpcy5tYXhSZWxvYWRzKXtcbiAgICAgICAgdGhpcy5sb2codmlldywgXCJqb2luXCIsICgpID0+IFtgZXhjZWVkZWQgJHt0aGlzLm1heFJlbG9hZHN9IGNvbnNlY3V0aXZlIHJlbG9hZHMuIEVudGVyaW5nIGZhaWxzYWZlIG1vZGVgXSlcbiAgICAgIH1cbiAgICAgIGlmKHRoaXMuaGFzUGVuZGluZ0xpbmsoKSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHRoaXMucGVuZGluZ0xpbmtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICAgICAgfVxuICAgIH0sIGFmdGVyTXMpXG4gIH1cblxuICBnZXRIb29rQ2FsbGJhY2tzKG5hbWUpe1xuICAgIHJldHVybiBuYW1lICYmIG5hbWUuc3RhcnRzV2l0aChcIlBob2VuaXguXCIpID8gSG9va3NbbmFtZS5zcGxpdChcIi5cIilbMV1dIDogdGhpcy5ob29rc1tuYW1lXVxuICB9XG5cbiAgaXNVbmxvYWRlZCgpeyByZXR1cm4gdGhpcy51bmxvYWRlZCB9XG5cbiAgaXNDb25uZWN0ZWQoKXsgcmV0dXJuIHRoaXMuc29ja2V0LmlzQ29ubmVjdGVkKCkgfVxuXG4gIGdldEJpbmRpbmdQcmVmaXgoKXsgcmV0dXJuIHRoaXMuYmluZGluZ1ByZWZpeCB9XG5cbiAgYmluZGluZyhraW5kKXsgcmV0dXJuIGAke3RoaXMuZ2V0QmluZGluZ1ByZWZpeCgpfSR7a2luZH1gIH1cblxuICBjaGFubmVsKHRvcGljLCBwYXJhbXMpeyByZXR1cm4gdGhpcy5zb2NrZXQuY2hhbm5lbCh0b3BpYywgcGFyYW1zKSB9XG5cbiAgam9pblJvb3RWaWV3cygpe1xuICAgIGxldCByb290c0ZvdW5kID0gZmFsc2VcbiAgICBET00uYWxsKGRvY3VtZW50LCBgJHtQSFhfVklFV19TRUxFQ1RPUn06bm90KFske1BIWF9QQVJFTlRfSUR9XSlgLCByb290RWwgPT4ge1xuICAgICAgaWYoIXRoaXMuZ2V0Um9vdEJ5SWQocm9vdEVsLmlkKSl7XG4gICAgICAgIGxldCB2aWV3ID0gdGhpcy5uZXdSb290Vmlldyhyb290RWwpXG4gICAgICAgIHZpZXcuc2V0SHJlZih0aGlzLmdldEhyZWYoKSlcbiAgICAgICAgdmlldy5qb2luKClcbiAgICAgICAgaWYocm9vdEVsLmdldEF0dHJpYnV0ZShQSFhfTUFJTikpeyB0aGlzLm1haW4gPSB2aWV3IH1cbiAgICAgIH1cbiAgICAgIHJvb3RzRm91bmQgPSB0cnVlXG4gICAgfSlcbiAgICByZXR1cm4gcm9vdHNGb3VuZFxuICB9XG5cbiAgcmVkaXJlY3QodG8sIGZsYXNoKXtcbiAgICB0aGlzLmRpc2Nvbm5lY3QoKVxuICAgIEJyb3dzZXIucmVkaXJlY3QodG8sIGZsYXNoKVxuICB9XG5cbiAgcmVwbGFjZU1haW4oaHJlZiwgZmxhc2gsIGNhbGxiYWNrID0gbnVsbCwgbGlua1JlZiA9IHRoaXMuc2V0UGVuZGluZ0xpbmsoaHJlZikpe1xuICAgIHRoaXMub3V0Z29pbmdNYWluRWwgPSB0aGlzLm91dGdvaW5nTWFpbkVsIHx8IHRoaXMubWFpbi5lbFxuICAgIGxldCBuZXdNYWluRWwgPSBET00uY2xvbmVOb2RlKHRoaXMub3V0Z29pbmdNYWluRWwsIFwiXCIpXG4gICAgdGhpcy5tYWluLnNob3dMb2FkZXIodGhpcy5sb2FkZXJUaW1lb3V0KVxuICAgIHRoaXMubWFpbi5kZXN0cm95KClcblxuICAgIHRoaXMubWFpbiA9IHRoaXMubmV3Um9vdFZpZXcobmV3TWFpbkVsLCBmbGFzaClcbiAgICB0aGlzLm1haW4uc2V0UmVkaXJlY3QoaHJlZilcbiAgICB0aGlzLnRyYW5zaXRpb25SZW1vdmVzKClcbiAgICB0aGlzLm1haW4uam9pbigoam9pbkNvdW50LCBvbkRvbmUpID0+IHtcbiAgICAgIGlmKGpvaW5Db3VudCA9PT0gMSAmJiB0aGlzLmNvbW1pdFBlbmRpbmdMaW5rKGxpbmtSZWYpKXtcbiAgICAgICAgdGhpcy5yZXF1ZXN0RE9NVXBkYXRlKCgpID0+IHtcbiAgICAgICAgICBET00uZmluZFBoeFN0aWNreShkb2N1bWVudCkuZm9yRWFjaChlbCA9PiBuZXdNYWluRWwuYXBwZW5kQ2hpbGQoZWwpKVxuICAgICAgICAgIHRoaXMub3V0Z29pbmdNYWluRWwucmVwbGFjZVdpdGgobmV3TWFpbkVsKVxuICAgICAgICAgIHRoaXMub3V0Z29pbmdNYWluRWwgPSBudWxsXG4gICAgICAgICAgY2FsbGJhY2sgJiYgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNhbGxiYWNrKVxuICAgICAgICAgIG9uRG9uZSgpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHRyYW5zaXRpb25SZW1vdmVzKGVsZW1lbnRzKXtcbiAgICBsZXQgcmVtb3ZlQXR0ciA9IHRoaXMuYmluZGluZyhcInJlbW92ZVwiKVxuICAgIGVsZW1lbnRzID0gZWxlbWVudHMgfHwgRE9NLmFsbChkb2N1bWVudCwgYFske3JlbW92ZUF0dHJ9XWApXG4gICAgZWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICBpZihkb2N1bWVudC5ib2R5LmNvbnRhaW5zKGVsKSl7IC8vIHNraXAgY2hpbGRyZW4gYWxyZWFkeSByZW1vdmVkXG4gICAgICAgIHRoaXMuZXhlY0pTKGVsLCBlbC5nZXRBdHRyaWJ1dGUocmVtb3ZlQXR0ciksIFwicmVtb3ZlXCIpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGlzUGh4VmlldyhlbCl7IHJldHVybiBlbC5nZXRBdHRyaWJ1dGUgJiYgZWwuZ2V0QXR0cmlidXRlKFBIWF9TRVNTSU9OKSAhPT0gbnVsbCB9XG5cbiAgbmV3Um9vdFZpZXcoZWwsIGZsYXNoKXtcbiAgICBsZXQgdmlldyA9IG5ldyBWaWV3KGVsLCB0aGlzLCBudWxsLCBmbGFzaClcbiAgICB0aGlzLnJvb3RzW3ZpZXcuaWRdID0gdmlld1xuICAgIHJldHVybiB2aWV3XG4gIH1cblxuICBvd25lcihjaGlsZEVsLCBjYWxsYmFjayl7XG4gICAgbGV0IHZpZXcgPSBtYXliZShjaGlsZEVsLmNsb3Nlc3QoUEhYX1ZJRVdfU0VMRUNUT1IpLCBlbCA9PiB0aGlzLmdldFZpZXdCeUVsKGVsKSkgfHwgdGhpcy5tYWluXG4gICAgaWYodmlldyl7IGNhbGxiYWNrKHZpZXcpIH1cbiAgfVxuXG4gIHdpdGhpbk93bmVycyhjaGlsZEVsLCBjYWxsYmFjayl7XG4gICAgdGhpcy5vd25lcihjaGlsZEVsLCB2aWV3ID0+IGNhbGxiYWNrKHZpZXcsIGNoaWxkRWwpKVxuICB9XG5cbiAgZ2V0Vmlld0J5RWwoZWwpe1xuICAgIGxldCByb290SWQgPSBlbC5nZXRBdHRyaWJ1dGUoUEhYX1JPT1RfSUQpXG4gICAgcmV0dXJuIG1heWJlKHRoaXMuZ2V0Um9vdEJ5SWQocm9vdElkKSwgcm9vdCA9PiByb290LmdldERlc2NlbmRlbnRCeUVsKGVsKSlcbiAgfVxuXG4gIGdldFJvb3RCeUlkKGlkKXsgcmV0dXJuIHRoaXMucm9vdHNbaWRdIH1cblxuICBkZXN0cm95QWxsVmlld3MoKXtcbiAgICBmb3IobGV0IGlkIGluIHRoaXMucm9vdHMpe1xuICAgICAgdGhpcy5yb290c1tpZF0uZGVzdHJveSgpXG4gICAgICBkZWxldGUgdGhpcy5yb290c1tpZF1cbiAgICB9XG4gICAgdGhpcy5tYWluID0gbnVsbFxuICB9XG5cbiAgZGVzdHJveVZpZXdCeUVsKGVsKXtcbiAgICBsZXQgcm9vdCA9IHRoaXMuZ2V0Um9vdEJ5SWQoZWwuZ2V0QXR0cmlidXRlKFBIWF9ST09UX0lEKSlcbiAgICBpZihyb290ICYmIHJvb3QuaWQgPT09IGVsLmlkKXtcbiAgICAgIHJvb3QuZGVzdHJveSgpXG4gICAgICBkZWxldGUgdGhpcy5yb290c1tyb290LmlkXVxuICAgIH0gZWxzZSBpZihyb290KXtcbiAgICAgIHJvb3QuZGVzdHJveURlc2NlbmRlbnQoZWwuaWQpXG4gICAgfVxuICB9XG5cbiAgc2V0QWN0aXZlRWxlbWVudCh0YXJnZXQpe1xuICAgIGlmKHRoaXMuYWN0aXZlRWxlbWVudCA9PT0gdGFyZ2V0KXsgcmV0dXJuIH1cbiAgICB0aGlzLmFjdGl2ZUVsZW1lbnQgPSB0YXJnZXRcbiAgICBsZXQgY2FuY2VsID0gKCkgPT4ge1xuICAgICAgaWYodGFyZ2V0ID09PSB0aGlzLmFjdGl2ZUVsZW1lbnQpeyB0aGlzLmFjdGl2ZUVsZW1lbnQgPSBudWxsIH1cbiAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzKVxuICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0aGlzKVxuICAgIH1cbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgY2FuY2VsKVxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgY2FuY2VsKVxuICB9XG5cbiAgZ2V0QWN0aXZlRWxlbWVudCgpe1xuICAgIGlmKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGRvY3VtZW50LmJvZHkpe1xuICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlRWxlbWVudCB8fCBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgY2FuIGJlIG51bGwgaW4gSW50ZXJuZXQgRXhwbG9yZXIgMTFcbiAgICAgIHJldHVybiBkb2N1bWVudC5hY3RpdmVFbGVtZW50IHx8IGRvY3VtZW50LmJvZHlcbiAgICB9XG4gIH1cblxuICBkcm9wQWN0aXZlRWxlbWVudCh2aWV3KXtcbiAgICBpZih0aGlzLnByZXZBY3RpdmUgJiYgdmlldy5vd25zRWxlbWVudCh0aGlzLnByZXZBY3RpdmUpKXtcbiAgICAgIHRoaXMucHJldkFjdGl2ZSA9IG51bGxcbiAgICB9XG4gIH1cblxuICByZXN0b3JlUHJldmlvdXNseUFjdGl2ZUZvY3VzKCl7XG4gICAgaWYodGhpcy5wcmV2QWN0aXZlICYmIHRoaXMucHJldkFjdGl2ZSAhPT0gZG9jdW1lbnQuYm9keSl7XG4gICAgICB0aGlzLnByZXZBY3RpdmUuZm9jdXMoKVxuICAgIH1cbiAgfVxuXG4gIGJsdXJBY3RpdmVFbGVtZW50KCl7XG4gICAgdGhpcy5wcmV2QWN0aXZlID0gdGhpcy5nZXRBY3RpdmVFbGVtZW50KClcbiAgICBpZih0aGlzLnByZXZBY3RpdmUgIT09IGRvY3VtZW50LmJvZHkpeyB0aGlzLnByZXZBY3RpdmUuYmx1cigpIH1cbiAgfVxuXG4gIGJpbmRUb3BMZXZlbEV2ZW50cygpe1xuICAgIGlmKHRoaXMuYm91bmRUb3BMZXZlbEV2ZW50cyl7IHJldHVybiB9XG5cbiAgICB0aGlzLmJvdW5kVG9wTGV2ZWxFdmVudHMgPSB0cnVlXG4gICAgLy8gZW50ZXIgZmFpbHNhZmUgcmVsb2FkIGlmIHNlcnZlciBoYXMgZ29uZSBhd2F5IGludGVudGlvbmFsbHksIHN1Y2ggYXMgXCJkaXNjb25uZWN0XCIgYnJvYWRjYXN0XG4gICAgdGhpcy5zb2NrZXQub25DbG9zZShldmVudCA9PiB7XG4gICAgICBpZihldmVudCAmJiBldmVudC5jb2RlID09PSAxMDAwICYmIHRoaXMubWFpbil7XG4gICAgICAgIHRoaXMucmVsb2FkV2l0aEppdHRlcih0aGlzLm1haW4pXG4gICAgICB9XG4gICAgfSlcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKXsgfSkgLy8gZW5zdXJlIGFsbCBjbGljayBldmVudHMgYnViYmxlIGZvciBtb2JpbGUgU2FmYXJpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBlID0+IHtcbiAgICAgIGlmKGUucGVyc2lzdGVkKXsgLy8gcmVsb2FkIHBhZ2UgaWYgYmVpbmcgcmVzdG9yZWQgZnJvbSBiYWNrL2ZvcndhcmQgY2FjaGVcbiAgICAgICAgdGhpcy5nZXRTb2NrZXQoKS5kaXNjb25uZWN0KClcbiAgICAgICAgdGhpcy53aXRoUGFnZUxvYWRpbmcoe3RvOiB3aW5kb3cubG9jYXRpb24uaHJlZiwga2luZDogXCJyZWRpcmVjdFwifSlcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXG4gICAgICB9XG4gICAgfSwgdHJ1ZSlcbiAgICB0aGlzLmJpbmROYXYoKVxuICAgIHRoaXMuYmluZENsaWNrcygpXG4gICAgdGhpcy5iaW5kRm9ybXMoKVxuICAgIHRoaXMuYmluZCh7a2V5dXA6IFwia2V5dXBcIiwga2V5ZG93bjogXCJrZXlkb3duXCJ9LCAoZSwgdHlwZSwgdmlldywgdGFyZ2V0RWwsIHBoeEV2ZW50LCBldmVudFRhcmdldCkgPT4ge1xuICAgICAgbGV0IG1hdGNoS2V5ID0gdGFyZ2V0RWwuZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhQSFhfS0VZKSlcbiAgICAgIGxldCBwcmVzc2VkS2V5ID0gZS5rZXkgJiYgZS5rZXkudG9Mb3dlckNhc2UoKSAvLyBjaHJvbWUgY2xpY2tlZCBhdXRvY29tcGxldGVzIHNlbmQgYSBrZXlkb3duIHdpdGhvdXQga2V5XG4gICAgICBpZihtYXRjaEtleSAmJiBtYXRjaEtleS50b0xvd2VyQ2FzZSgpICE9PSBwcmVzc2VkS2V5KXsgcmV0dXJuIH1cblxuICAgICAgbGV0IGRhdGEgPSB7a2V5OiBlLmtleSwgLi4udGhpcy5ldmVudE1ldGEodHlwZSwgZSwgdGFyZ2V0RWwpfVxuICAgICAgSlMuZXhlYyh0eXBlLCBwaHhFdmVudCwgdmlldywgdGFyZ2V0RWwsIFtcInB1c2hcIiwge2RhdGF9XSlcbiAgICB9KVxuICAgIHRoaXMuYmluZCh7Ymx1cjogXCJmb2N1c291dFwiLCBmb2N1czogXCJmb2N1c2luXCJ9LCAoZSwgdHlwZSwgdmlldywgdGFyZ2V0RWwsIHBoeEV2ZW50LCBldmVudFRhcmdldCkgPT4ge1xuICAgICAgaWYoIWV2ZW50VGFyZ2V0KXtcbiAgICAgICAgbGV0IGRhdGEgPSB7a2V5OiBlLmtleSwgLi4udGhpcy5ldmVudE1ldGEodHlwZSwgZSwgdGFyZ2V0RWwpfVxuICAgICAgICBKUy5leGVjKHR5cGUsIHBoeEV2ZW50LCB2aWV3LCB0YXJnZXRFbCwgW1wicHVzaFwiLCB7ZGF0YX1dKVxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy5iaW5kKHtibHVyOiBcImJsdXJcIiwgZm9jdXM6IFwiZm9jdXNcIn0sIChlLCB0eXBlLCB2aWV3LCB0YXJnZXRFbCwgdGFyZ2V0Q3R4LCBwaHhFdmVudCwgcGh4VGFyZ2V0KSA9PiB7XG4gICAgICAvLyBibHVyIGFuZCBmb2N1cyBhcmUgdHJpZ2dlcmVkIG9uIGRvY3VtZW50IGFuZCB3aW5kb3cuIERpc2NhcmQgb25lIHRvIGF2b2lkIGR1cHNcbiAgICAgIGlmKHBoeFRhcmdldCA9PT0gXCJ3aW5kb3dcIil7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5ldmVudE1ldGEodHlwZSwgZSwgdGFyZ2V0RWwpXG4gICAgICAgIEpTLmV4ZWModHlwZSwgcGh4RXZlbnQsIHZpZXcsIHRhcmdldEVsLCBbXCJwdXNoXCIsIHtkYXRhfV0pXG4gICAgICB9XG4gICAgfSlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIGUgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBlID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgbGV0IGRyb3BUYXJnZXRJZCA9IG1heWJlKGNsb3Nlc3RQaHhCaW5kaW5nKGUudGFyZ2V0LCB0aGlzLmJpbmRpbmcoUEhYX0RST1BfVEFSR0VUKSksIHRydWVUYXJnZXQgPT4ge1xuICAgICAgICByZXR1cm4gdHJ1ZVRhcmdldC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9EUk9QX1RBUkdFVCkpXG4gICAgICB9KVxuICAgICAgbGV0IGRyb3BUYXJnZXQgPSBkcm9wVGFyZ2V0SWQgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZHJvcFRhcmdldElkKVxuICAgICAgbGV0IGZpbGVzID0gQXJyYXkuZnJvbShlLmRhdGFUcmFuc2Zlci5maWxlcyB8fCBbXSlcbiAgICAgIGlmKCFkcm9wVGFyZ2V0IHx8IGRyb3BUYXJnZXQuZGlzYWJsZWQgfHwgZmlsZXMubGVuZ3RoID09PSAwIHx8ICEoZHJvcFRhcmdldC5maWxlcyBpbnN0YW5jZW9mIEZpbGVMaXN0KSl7IHJldHVybiB9XG5cbiAgICAgIExpdmVVcGxvYWRlci50cmFja0ZpbGVzKGRyb3BUYXJnZXQsIGZpbGVzKVxuICAgICAgZHJvcFRhcmdldC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImlucHV0XCIsIHtidWJibGVzOiB0cnVlfSkpXG4gICAgfSlcbiAgICB0aGlzLm9uKFBIWF9UUkFDS19VUExPQURTLCBlID0+IHtcbiAgICAgIGxldCB1cGxvYWRUYXJnZXQgPSBlLnRhcmdldFxuICAgICAgaWYoIURPTS5pc1VwbG9hZElucHV0KHVwbG9hZFRhcmdldCkpeyByZXR1cm4gfVxuICAgICAgbGV0IGZpbGVzID0gQXJyYXkuZnJvbShlLmRldGFpbC5maWxlcyB8fCBbXSkuZmlsdGVyKGYgPT4gZiBpbnN0YW5jZW9mIEZpbGUgfHwgZiBpbnN0YW5jZW9mIEJsb2IpXG4gICAgICBMaXZlVXBsb2FkZXIudHJhY2tGaWxlcyh1cGxvYWRUYXJnZXQsIGZpbGVzKVxuICAgICAgdXBsb2FkVGFyZ2V0LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiaW5wdXRcIiwge2J1YmJsZXM6IHRydWV9KSlcbiAgICB9KVxuICB9XG5cbiAgZXZlbnRNZXRhKGV2ZW50TmFtZSwgZSwgdGFyZ2V0RWwpe1xuICAgIGxldCBjYWxsYmFjayA9IHRoaXMubWV0YWRhdGFDYWxsYmFja3NbZXZlbnROYW1lXVxuICAgIHJldHVybiBjYWxsYmFjayA/IGNhbGxiYWNrKGUsIHRhcmdldEVsKSA6IHt9XG4gIH1cblxuICBzZXRQZW5kaW5nTGluayhocmVmKXtcbiAgICB0aGlzLmxpbmtSZWYrK1xuICAgIHRoaXMucGVuZGluZ0xpbmsgPSBocmVmXG4gICAgcmV0dXJuIHRoaXMubGlua1JlZlxuICB9XG5cbiAgY29tbWl0UGVuZGluZ0xpbmsobGlua1JlZil7XG4gICAgaWYodGhpcy5saW5rUmVmICE9PSBsaW5rUmVmKXtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhyZWYgPSB0aGlzLnBlbmRpbmdMaW5rXG4gICAgICB0aGlzLnBlbmRpbmdMaW5rID0gbnVsbFxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cblxuICBnZXRIcmVmKCl7IHJldHVybiB0aGlzLmhyZWYgfVxuXG4gIGhhc1BlbmRpbmdMaW5rKCl7IHJldHVybiAhIXRoaXMucGVuZGluZ0xpbmsgfVxuXG4gIGJpbmQoZXZlbnRzLCBjYWxsYmFjayl7XG4gICAgZm9yKGxldCBldmVudCBpbiBldmVudHMpe1xuICAgICAgbGV0IGJyb3dzZXJFdmVudE5hbWUgPSBldmVudHNbZXZlbnRdXG5cbiAgICAgIHRoaXMub24oYnJvd3NlckV2ZW50TmFtZSwgZSA9PiB7XG4gICAgICAgIGxldCBiaW5kaW5nID0gdGhpcy5iaW5kaW5nKGV2ZW50KVxuICAgICAgICBsZXQgd2luZG93QmluZGluZyA9IHRoaXMuYmluZGluZyhgd2luZG93LSR7ZXZlbnR9YClcbiAgICAgICAgbGV0IHRhcmdldFBoeEV2ZW50ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlICYmIGUudGFyZ2V0LmdldEF0dHJpYnV0ZShiaW5kaW5nKVxuICAgICAgICBpZih0YXJnZXRQaHhFdmVudCl7XG4gICAgICAgICAgdGhpcy5kZWJvdW5jZShlLnRhcmdldCwgZSwgYnJvd3NlckV2ZW50TmFtZSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy53aXRoaW5Pd25lcnMoZS50YXJnZXQsIHZpZXcgPT4ge1xuICAgICAgICAgICAgICBjYWxsYmFjayhlLCBldmVudCwgdmlldywgZS50YXJnZXQsIHRhcmdldFBoeEV2ZW50LCBudWxsKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIERPTS5hbGwoZG9jdW1lbnQsIGBbJHt3aW5kb3dCaW5kaW5nfV1gLCBlbCA9PiB7XG4gICAgICAgICAgICBsZXQgcGh4RXZlbnQgPSBlbC5nZXRBdHRyaWJ1dGUod2luZG93QmluZGluZylcbiAgICAgICAgICAgIHRoaXMuZGVib3VuY2UoZWwsIGUsIGJyb3dzZXJFdmVudE5hbWUsICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy53aXRoaW5Pd25lcnMoZWwsIHZpZXcgPT4ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGUsIGV2ZW50LCB2aWV3LCBlbCwgcGh4RXZlbnQsIFwid2luZG93XCIpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgYmluZENsaWNrcygpe1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGUgPT4gdGhpcy5jbGlja1N0YXJ0ZWRBdFRhcmdldCA9IGUudGFyZ2V0KVxuICAgIHRoaXMuYmluZENsaWNrKFwiY2xpY2tcIiwgXCJjbGlja1wiLCBmYWxzZSlcbiAgICB0aGlzLmJpbmRDbGljayhcIm1vdXNlZG93blwiLCBcImNhcHR1cmUtY2xpY2tcIiwgdHJ1ZSlcbiAgfVxuXG4gIGJpbmRDbGljayhldmVudE5hbWUsIGJpbmRpbmdOYW1lLCBjYXB0dXJlKXtcbiAgICBsZXQgY2xpY2sgPSB0aGlzLmJpbmRpbmcoYmluZGluZ05hbWUpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBlID0+IHtcbiAgICAgIGxldCB0YXJnZXQgPSBudWxsXG4gICAgICBpZihjYXB0dXJlKXtcbiAgICAgICAgdGFyZ2V0ID0gZS50YXJnZXQubWF0Y2hlcyhgWyR7Y2xpY2t9XWApID8gZS50YXJnZXQgOiBlLnRhcmdldC5xdWVyeVNlbGVjdG9yKGBbJHtjbGlja31dYClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBjbGlja1N0YXJ0ZWRBdFRhcmdldCA9IHRoaXMuY2xpY2tTdGFydGVkQXRUYXJnZXQgfHwgZS50YXJnZXRcbiAgICAgICAgdGFyZ2V0ID0gY2xvc2VzdFBoeEJpbmRpbmcoY2xpY2tTdGFydGVkQXRUYXJnZXQsIGNsaWNrKVxuICAgICAgICB0aGlzLmRpc3BhdGNoQ2xpY2tBd2F5KGUsIGNsaWNrU3RhcnRlZEF0VGFyZ2V0KVxuICAgICAgICB0aGlzLmNsaWNrU3RhcnRlZEF0VGFyZ2V0ID0gbnVsbFxuICAgICAgfVxuICAgICAgbGV0IHBoeEV2ZW50ID0gdGFyZ2V0ICYmIHRhcmdldC5nZXRBdHRyaWJ1dGUoY2xpY2spXG4gICAgICBpZighcGh4RXZlbnQpeyByZXR1cm4gfVxuICAgICAgaWYodGFyZ2V0LmdldEF0dHJpYnV0ZShcImhyZWZcIikgPT09IFwiI1wiKXsgZS5wcmV2ZW50RGVmYXVsdCgpIH1cblxuICAgICAgdGhpcy5kZWJvdW5jZSh0YXJnZXQsIGUsIFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLndpdGhpbk93bmVycyh0YXJnZXQsIHZpZXcgPT4ge1xuICAgICAgICAgIEpTLmV4ZWMoXCJjbGlja1wiLCBwaHhFdmVudCwgdmlldywgdGFyZ2V0LCBbXCJwdXNoXCIsIHtkYXRhOiB0aGlzLmV2ZW50TWV0YShcImNsaWNrXCIsIGUsIHRhcmdldCl9XSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSwgY2FwdHVyZSlcbiAgfVxuXG4gIGRpc3BhdGNoQ2xpY2tBd2F5KGUsIGNsaWNrU3RhcnRlZEF0KXtcbiAgICBsZXQgcGh4Q2xpY2tBd2F5ID0gdGhpcy5iaW5kaW5nKFwiY2xpY2stYXdheVwiKVxuICAgIERPTS5hbGwoZG9jdW1lbnQsIGBbJHtwaHhDbGlja0F3YXl9XWAsIGVsID0+IHtcbiAgICAgIGlmKCEoZWwuaXNTYW1lTm9kZShjbGlja1N0YXJ0ZWRBdCkgfHwgZWwuY29udGFpbnMoY2xpY2tTdGFydGVkQXQpKSl7XG4gICAgICAgIHRoaXMud2l0aGluT3duZXJzKGUudGFyZ2V0LCB2aWV3ID0+IHtcbiAgICAgICAgICBsZXQgcGh4RXZlbnQgPSBlbC5nZXRBdHRyaWJ1dGUocGh4Q2xpY2tBd2F5KVxuICAgICAgICAgIGlmKEpTLmlzVmlzaWJsZShlbCkpe1xuICAgICAgICAgICAgSlMuZXhlYyhcImNsaWNrXCIsIHBoeEV2ZW50LCB2aWV3LCBlbCwgW1wicHVzaFwiLCB7ZGF0YTogdGhpcy5ldmVudE1ldGEoXCJjbGlja1wiLCBlLCBlLnRhcmdldCl9XSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGJpbmROYXYoKXtcbiAgICBpZighQnJvd3Nlci5jYW5QdXNoU3RhdGUoKSl7IHJldHVybiB9XG4gICAgaWYoaGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbil7IGhpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb24gPSBcIm1hbnVhbFwiIH1cbiAgICBsZXQgc2Nyb2xsVGltZXIgPSBudWxsXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgX2UgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KHNjcm9sbFRpbWVyKVxuICAgICAgc2Nyb2xsVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgQnJvd3Nlci51cGRhdGVDdXJyZW50U3RhdGUoc3RhdGUgPT4gT2JqZWN0LmFzc2lnbihzdGF0ZSwge3Njcm9sbDogd2luZG93LnNjcm9sbFl9KSlcbiAgICAgIH0sIDEwMClcbiAgICB9KVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZXZlbnQgPT4ge1xuICAgICAgaWYoIXRoaXMucmVnaXN0ZXJOZXdMb2NhdGlvbih3aW5kb3cubG9jYXRpb24pKXsgcmV0dXJuIH1cbiAgICAgIGxldCB7dHlwZSwgaWQsIHJvb3QsIHNjcm9sbH0gPSBldmVudC5zdGF0ZSB8fCB7fVxuICAgICAgbGV0IGhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZlxuXG4gICAgICB0aGlzLnJlcXVlc3RET01VcGRhdGUoKCkgPT4ge1xuICAgICAgICBpZih0aGlzLm1haW4uaXNDb25uZWN0ZWQoKSAmJiAodHlwZSA9PT0gXCJwYXRjaFwiICYmIGlkID09PSB0aGlzLm1haW4uaWQpKXtcbiAgICAgICAgICB0aGlzLm1haW4ucHVzaExpbmtQYXRjaChocmVmLCBudWxsKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVwbGFjZU1haW4oaHJlZiwgbnVsbCwgKCkgPT4ge1xuICAgICAgICAgICAgaWYocm9vdCl7IHRoaXMucmVwbGFjZVJvb3RIaXN0b3J5KCkgfVxuICAgICAgICAgICAgaWYodHlwZW9mKHNjcm9sbCkgPT09IFwibnVtYmVyXCIpe1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgc2Nyb2xsKVxuICAgICAgICAgICAgICB9LCAwKSAvLyB0aGUgYm9keSBuZWVkcyB0byByZW5kZXIgYmVmb3JlIHdlIHNjcm9sbC5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sIGZhbHNlKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICBsZXQgdGFyZ2V0ID0gY2xvc2VzdFBoeEJpbmRpbmcoZS50YXJnZXQsIFBIWF9MSVZFX0xJTkspXG4gICAgICBsZXQgdHlwZSA9IHRhcmdldCAmJiB0YXJnZXQuZ2V0QXR0cmlidXRlKFBIWF9MSVZFX0xJTkspXG4gICAgICBsZXQgd2FudHNOZXdUYWIgPSBlLm1ldGFLZXkgfHwgZS5jdHJsS2V5IHx8IGUuYnV0dG9uID09PSAxXG4gICAgICBpZighdHlwZSB8fCAhdGhpcy5pc0Nvbm5lY3RlZCgpIHx8ICF0aGlzLm1haW4gfHwgd2FudHNOZXdUYWIpeyByZXR1cm4gfVxuXG4gICAgICBsZXQgaHJlZiA9IHRhcmdldC5ocmVmXG4gICAgICBsZXQgbGlua1N0YXRlID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShQSFhfTElOS19TVEFURSlcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKSAvLyBkbyBub3QgYnViYmxlIGNsaWNrIHRvIHJlZ3VsYXIgcGh4LWNsaWNrIGJpbmRpbmdzXG4gICAgICBpZih0aGlzLnBlbmRpbmdMaW5rID09PSBocmVmKXsgcmV0dXJuIH1cblxuICAgICAgdGhpcy5yZXF1ZXN0RE9NVXBkYXRlKCgpID0+IHtcbiAgICAgICAgaWYodHlwZSA9PT0gXCJwYXRjaFwiKXtcbiAgICAgICAgICB0aGlzLnB1c2hIaXN0b3J5UGF0Y2goaHJlZiwgbGlua1N0YXRlLCB0YXJnZXQpXG4gICAgICAgIH0gZWxzZSBpZih0eXBlID09PSBcInJlZGlyZWN0XCIpe1xuICAgICAgICAgIHRoaXMuaGlzdG9yeVJlZGlyZWN0KGhyZWYsIGxpbmtTdGF0ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGV4cGVjdGVkICR7UEhYX0xJVkVfTElOS30gdG8gYmUgXCJwYXRjaFwiIG9yIFwicmVkaXJlY3RcIiwgZ290OiAke3R5cGV9YClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LCBmYWxzZSlcbiAgfVxuXG4gIGRpc3BhdGNoRXZlbnQoZXZlbnQsIHBheWxvYWQgPSB7fSl7XG4gICAgRE9NLmRpc3BhdGNoRXZlbnQod2luZG93LCBgcGh4OiR7ZXZlbnR9YCwge2RldGFpbDogcGF5bG9hZH0pXG4gIH1cblxuICBkaXNwYXRjaEV2ZW50cyhldmVudHMpe1xuICAgIGV2ZW50cy5mb3JFYWNoKChbZXZlbnQsIHBheWxvYWRdKSA9PiB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQsIHBheWxvYWQpKVxuICB9XG5cbiAgd2l0aFBhZ2VMb2FkaW5nKGluZm8sIGNhbGxiYWNrKXtcbiAgICBET00uZGlzcGF0Y2hFdmVudCh3aW5kb3csIFwicGh4OnBhZ2UtbG9hZGluZy1zdGFydFwiLCB7ZGV0YWlsOiBpbmZvfSlcbiAgICBsZXQgZG9uZSA9ICgpID0+IERPTS5kaXNwYXRjaEV2ZW50KHdpbmRvdywgXCJwaHg6cGFnZS1sb2FkaW5nLXN0b3BcIiwge2RldGFpbDogaW5mb30pXG4gICAgcmV0dXJuIGNhbGxiYWNrID8gY2FsbGJhY2soZG9uZSkgOiBkb25lXG4gIH1cblxuICBwdXNoSGlzdG9yeVBhdGNoKGhyZWYsIGxpbmtTdGF0ZSwgdGFyZ2V0RWwpe1xuICAgIHRoaXMud2l0aFBhZ2VMb2FkaW5nKHt0bzogaHJlZiwga2luZDogXCJwYXRjaFwifSwgZG9uZSA9PiB7XG4gICAgICB0aGlzLm1haW4ucHVzaExpbmtQYXRjaChocmVmLCB0YXJnZXRFbCwgbGlua1JlZiA9PiB7XG4gICAgICAgIHRoaXMuaGlzdG9yeVBhdGNoKGhyZWYsIGxpbmtTdGF0ZSwgbGlua1JlZilcbiAgICAgICAgZG9uZSgpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBoaXN0b3J5UGF0Y2goaHJlZiwgbGlua1N0YXRlLCBsaW5rUmVmID0gdGhpcy5zZXRQZW5kaW5nTGluayhocmVmKSl7XG4gICAgaWYoIXRoaXMuY29tbWl0UGVuZGluZ0xpbmsobGlua1JlZikpeyByZXR1cm4gfVxuXG4gICAgQnJvd3Nlci5wdXNoU3RhdGUobGlua1N0YXRlLCB7dHlwZTogXCJwYXRjaFwiLCBpZDogdGhpcy5tYWluLmlkfSwgaHJlZilcbiAgICB0aGlzLnJlZ2lzdGVyTmV3TG9jYXRpb24od2luZG93LmxvY2F0aW9uKVxuICB9XG5cbiAgaGlzdG9yeVJlZGlyZWN0KGhyZWYsIGxpbmtTdGF0ZSwgZmxhc2gpe1xuICAgIGxldCBzY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWVxuICAgIHRoaXMud2l0aFBhZ2VMb2FkaW5nKHt0bzogaHJlZiwga2luZDogXCJyZWRpcmVjdFwifSwgZG9uZSA9PiB7XG4gICAgICB0aGlzLnJlcGxhY2VNYWluKGhyZWYsIGZsYXNoLCAoKSA9PiB7XG4gICAgICAgIEJyb3dzZXIucHVzaFN0YXRlKGxpbmtTdGF0ZSwge3R5cGU6IFwicmVkaXJlY3RcIiwgaWQ6IHRoaXMubWFpbi5pZCwgc2Nyb2xsOiBzY3JvbGx9LCBocmVmKVxuICAgICAgICB0aGlzLnJlZ2lzdGVyTmV3TG9jYXRpb24od2luZG93LmxvY2F0aW9uKVxuICAgICAgICBkb25lKClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHJlcGxhY2VSb290SGlzdG9yeSgpe1xuICAgIEJyb3dzZXIucHVzaFN0YXRlKFwicmVwbGFjZVwiLCB7cm9vdDogdHJ1ZSwgdHlwZTogXCJwYXRjaFwiLCBpZDogdGhpcy5tYWluLmlkfSlcbiAgfVxuXG4gIHJlZ2lzdGVyTmV3TG9jYXRpb24obmV3TG9jYXRpb24pe1xuICAgIGxldCB7cGF0aG5hbWUsIHNlYXJjaH0gPSB0aGlzLmN1cnJlbnRMb2NhdGlvblxuICAgIGlmKHBhdGhuYW1lICsgc2VhcmNoID09PSBuZXdMb2NhdGlvbi5wYXRobmFtZSArIG5ld0xvY2F0aW9uLnNlYXJjaCl7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXJyZW50TG9jYXRpb24gPSBjbG9uZShuZXdMb2NhdGlvbilcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgYmluZEZvcm1zKCl7XG4gICAgbGV0IGl0ZXJhdGlvbnMgPSAwXG4gICAgdGhpcy5vbihcInN1Ym1pdFwiLCBlID0+IHtcbiAgICAgIGxldCBwaHhFdmVudCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoXCJzdWJtaXRcIikpXG4gICAgICBpZighcGh4RXZlbnQpeyByZXR1cm4gfVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBlLnRhcmdldC5kaXNhYmxlZCA9IHRydWVcbiAgICAgIHRoaXMud2l0aGluT3duZXJzKGUudGFyZ2V0LCB2aWV3ID0+IHtcbiAgICAgICAgSlMuZXhlYyhcInN1Ym1pdFwiLCBwaHhFdmVudCwgdmlldywgZS50YXJnZXQsIFtcInB1c2hcIiwge31dKVxuICAgICAgfSlcbiAgICB9LCBmYWxzZSlcblxuICAgIGZvcihsZXQgdHlwZSBvZiBbXCJjaGFuZ2VcIiwgXCJpbnB1dFwiXSl7XG4gICAgICB0aGlzLm9uKHR5cGUsIGUgPT4ge1xuICAgICAgICBsZXQgcGh4Q2hhbmdlID0gdGhpcy5iaW5kaW5nKFwiY2hhbmdlXCIpXG4gICAgICAgIGxldCBpbnB1dCA9IGUudGFyZ2V0XG4gICAgICAgIGxldCBpbnB1dEV2ZW50ID0gaW5wdXQuZ2V0QXR0cmlidXRlKHBoeENoYW5nZSlcbiAgICAgICAgbGV0IGZvcm1FdmVudCA9IGlucHV0LmZvcm0gJiYgaW5wdXQuZm9ybS5nZXRBdHRyaWJ1dGUocGh4Q2hhbmdlKVxuICAgICAgICBsZXQgcGh4RXZlbnQgPSBpbnB1dEV2ZW50IHx8IGZvcm1FdmVudFxuICAgICAgICBpZighcGh4RXZlbnQpeyByZXR1cm4gfVxuICAgICAgICBpZihpbnB1dC50eXBlID09PSBcIm51bWJlclwiICYmIGlucHV0LnZhbGlkaXR5ICYmIGlucHV0LnZhbGlkaXR5LmJhZElucHV0KXsgcmV0dXJuIH1cblxuICAgICAgICBsZXQgZGlzcGF0Y2hlciA9IGlucHV0RXZlbnQgPyBpbnB1dCA6IGlucHV0LmZvcm1cbiAgICAgICAgbGV0IGN1cnJlbnRJdGVyYXRpb25zID0gaXRlcmF0aW9uc1xuICAgICAgICBpdGVyYXRpb25zKytcbiAgICAgICAgbGV0IHthdDogYXQsIHR5cGU6IGxhc3RUeXBlfSA9IERPTS5wcml2YXRlKGlucHV0LCBcInByZXYtaXRlcmF0aW9uXCIpIHx8IHt9XG4gICAgICAgIC8vIGRldGVjdCBkdXAgYmVjYXVzZSBzb21lIGJyb3dzZXJzIGRpc3BhdGNoIGJvdGggXCJpbnB1dFwiIGFuZCBcImNoYW5nZVwiXG4gICAgICAgIGlmKGF0ID09PSBjdXJyZW50SXRlcmF0aW9ucyAtIDEgJiYgdHlwZSAhPT0gbGFzdFR5cGUpeyByZXR1cm4gfVxuXG4gICAgICAgIERPTS5wdXRQcml2YXRlKGlucHV0LCBcInByZXYtaXRlcmF0aW9uXCIsIHthdDogY3VycmVudEl0ZXJhdGlvbnMsIHR5cGU6IHR5cGV9KVxuXG4gICAgICAgIHRoaXMuZGVib3VuY2UoaW5wdXQsIGUsIHR5cGUsICgpID0+IHtcbiAgICAgICAgICB0aGlzLndpdGhpbk93bmVycyhkaXNwYXRjaGVyLCB2aWV3ID0+IHtcbiAgICAgICAgICAgIERPTS5wdXRQcml2YXRlKGlucHV0LCBQSFhfSEFTX0ZPQ1VTRUQsIHRydWUpXG4gICAgICAgICAgICBpZighRE9NLmlzVGV4dHVhbElucHV0KGlucHV0KSl7XG4gICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlRWxlbWVudChpbnB1dClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEpTLmV4ZWMoXCJjaGFuZ2VcIiwgcGh4RXZlbnQsIHZpZXcsIGlucHV0LCBbXCJwdXNoXCIsIHtfdGFyZ2V0OiBlLnRhcmdldC5uYW1lLCBkaXNwYXRjaGVyOiBkaXNwYXRjaGVyfV0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0sIGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIGRlYm91bmNlKGVsLCBldmVudCwgZXZlbnRUeXBlLCBjYWxsYmFjayl7XG4gICAgaWYoZXZlbnRUeXBlID09PSBcImJsdXJcIiB8fCBldmVudFR5cGUgPT09IFwiZm9jdXNvdXRcIil7IHJldHVybiBjYWxsYmFjaygpIH1cblxuICAgIGxldCBwaHhEZWJvdW5jZSA9IHRoaXMuYmluZGluZyhQSFhfREVCT1VOQ0UpXG4gICAgbGV0IHBoeFRocm90dGxlID0gdGhpcy5iaW5kaW5nKFBIWF9USFJPVFRMRSlcbiAgICBsZXQgZGVmYXVsdERlYm91bmNlID0gdGhpcy5kZWZhdWx0cy5kZWJvdW5jZS50b1N0cmluZygpXG4gICAgbGV0IGRlZmF1bHRUaHJvdHRsZSA9IHRoaXMuZGVmYXVsdHMudGhyb3R0bGUudG9TdHJpbmcoKVxuXG4gICAgdGhpcy53aXRoaW5Pd25lcnMoZWwsIHZpZXcgPT4ge1xuICAgICAgbGV0IGFzeW5jRmlsdGVyID0gKCkgPT4gIXZpZXcuaXNEZXN0cm95ZWQoKSAmJiBkb2N1bWVudC5ib2R5LmNvbnRhaW5zKGVsKVxuICAgICAgRE9NLmRlYm91bmNlKGVsLCBldmVudCwgcGh4RGVib3VuY2UsIGRlZmF1bHREZWJvdW5jZSwgcGh4VGhyb3R0bGUsIGRlZmF1bHRUaHJvdHRsZSwgYXN5bmNGaWx0ZXIsICgpID0+IHtcbiAgICAgICAgY2FsbGJhY2soKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgc2lsZW5jZUV2ZW50cyhjYWxsYmFjayl7XG4gICAgdGhpcy5zaWxlbmNlZCA9IHRydWVcbiAgICBjYWxsYmFjaygpXG4gICAgdGhpcy5zaWxlbmNlZCA9IGZhbHNlXG4gIH1cblxuICBvbihldmVudCwgY2FsbGJhY2spe1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBlID0+IHtcbiAgICAgIGlmKCF0aGlzLnNpbGVuY2VkKXsgY2FsbGJhY2soZSkgfVxuICAgIH0pXG4gIH1cbn1cblxuY2xhc3MgVHJhbnNpdGlvblNldCB7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy50cmFuc2l0aW9ucyA9IG5ldyBTZXQoKVxuICAgIHRoaXMucGVuZGluZ09wcyA9IFtdXG4gICAgdGhpcy5yZXNldCgpXG4gIH1cblxuICByZXNldCgpe1xuICAgIHRoaXMudHJhbnNpdGlvbnMuZm9yRWFjaCh0aW1lciA9PiB7XG4gICAgICBjYW5jZWxUaW1lb3V0KHRpbWVyKVxuICAgICAgdGhpcy50cmFuc2l0aW9ucy5kZWxldGUodGltZXIpXG4gICAgfSlcbiAgICB0aGlzLmZsdXNoUGVuZGluZ09wcygpXG4gIH1cblxuICBhZnRlcihjYWxsYmFjayl7XG4gICAgaWYodGhpcy5zaXplKCkgPT09IDApe1xuICAgICAgY2FsbGJhY2soKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnB1c2hQZW5kaW5nT3AoY2FsbGJhY2spXG4gICAgfVxuICB9XG5cbiAgYWRkVHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCBvbkRvbmUpe1xuICAgIG9uU3RhcnQoKVxuICAgIGxldCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy50cmFuc2l0aW9ucy5kZWxldGUodGltZXIpXG4gICAgICBvbkRvbmUoKVxuICAgICAgaWYodGhpcy5zaXplKCkgPT09IDApeyB0aGlzLmZsdXNoUGVuZGluZ09wcygpIH1cbiAgICB9LCB0aW1lKVxuICAgIHRoaXMudHJhbnNpdGlvbnMuYWRkKHRpbWVyKVxuICB9XG5cbiAgcHVzaFBlbmRpbmdPcChvcCl7IHRoaXMucGVuZGluZ09wcy5wdXNoKG9wKSB9XG5cbiAgc2l6ZSgpeyByZXR1cm4gdGhpcy50cmFuc2l0aW9ucy5zaXplIH1cblxuICBmbHVzaFBlbmRpbmdPcHMoKXtcbiAgICB0aGlzLnBlbmRpbmdPcHMuZm9yRWFjaChvcCA9PiBvcCgpKVxuICAgIHRoaXMucGVuZGluZ09wcyA9IFtdXG4gIH1cbn1cbiIsICIvLyBXZSBuZWVkIHRvIGltcG9ydCB0aGUgQ1NTIHNvIHRoYXQgd2VicGFjayB3aWxsIGxvYWQgaXQuXG4vLyBUaGUgTWluaUNzc0V4dHJhY3RQbHVnaW4gaXMgdXNlZCB0byBzZXBhcmF0ZSBpdCBvdXQgaW50b1xuLy8gaXRzIG93biBDU1MgZmlsZS5cbi8vIGltcG9ydCBcIi4uL2Nzcy9yb290LmNzc1wiXG4vLyB3ZWJwYWNrIGF1dG9tYXRpY2FsbHkgYnVuZGxlcyBhbGwgbW9kdWxlcyBpbiB5b3VyXG4vLyBlbnRyeSBwb2ludHMuIFRob3NlIGVudHJ5IHBvaW50cyBjYW4gYmUgY29uZmlndXJlZFxuLy8gaW4gXCJ3ZWJwYWNrLmNvbmZpZy5qc1wiLlxuLy9cbi8vIEltcG9ydCBkZXBzIHdpdGggdGhlIGRlcCBuYW1lIG9yIGxvY2FsIGZpbGVzIHdpdGggYSByZWxhdGl2ZSBwYXRoLCBmb3IgZXhhbXBsZTpcbi8vXG4vLyAgICAgaW1wb3J0IHtTb2NrZXR9IGZyb20gXCJwaG9lbml4XCJcbi8vICAgICBpbXBvcnQgc29ja2V0IGZyb20gXCIuL3NvY2tldFwiXG4vL1xuaW1wb3J0IFwicGhvZW5peF9odG1sXCJcbmltcG9ydCB7U29ja2V0fSBmcm9tIFwicGhvZW5peFwiXG5pbXBvcnQge0xpdmVTb2NrZXR9IGZyb20gXCJwaG9lbml4X2xpdmVfdmlld1wiXG5pbXBvcnQgdG9wYmFyIGZyb20gXCIuLi92ZW5kb3IvdG9wYmFyXCJcbmltcG9ydCBcIi4uL3ZlbmRvci9hbHBpbmVcIlxuXG5cbmxldCBjc3JmVG9rZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWV0YVtuYW1lPSdjc3JmLXRva2VuJ11cIikuZ2V0QXR0cmlidXRlKFwiY29udGVudFwiKVxuXG5pbXBvcnQge0luaXRUb2FzdH0gZnJvbSBcIi4vaW5pdF90b2FzdC5qc1wiXG5pbXBvcnQge0luaXRDaGVja291dH0gZnJvbSBcIi4vaW5pdF9jaGVja291dFwiXG5cbmxldCBIb29rcyA9IHt9XG5Ib29rcy5Jbml0VG9hc3QgPSBJbml0VG9hc3Rcbkhvb2tzLkluaXRDaGVja291dCA9IEluaXRDaGVja291dFxuXG5sZXQgbGl2ZVNvY2tldCA9IG5ldyBMaXZlU29ja2V0KFwiL2xpdmVcIiwgU29ja2V0LCB7XG4gICAgaG9va3M6IEhvb2tzLFxuICAgIHBhcmFtczoge19jc3JmX3Rva2VuOiBjc3JmVG9rZW59LFxuICAgIGRvbToge1xuICAgICAgICBvbkJlZm9yZUVsVXBkYXRlZChmcm9tLCB0byl7XG4gICAgICAgICAgICBpZihmcm9tLl9feCl7IHdpbmRvdy5BbHBpbmUuY2xvbmUoZnJvbS5fX3gsIHRvKSB9XG4gICAgICAgIH1cbiAgICB9XG59KVxuXG4gaWYgKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IpIHtcbiAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3RlcignL2pzL3NlcnZpY2Utd29ya2VyLmpzJyk7XG4gICB9KTtcbiB9XG5cbi8vIFNob3cgcHJvZ3Jlc3MgYmFyIG9uIGxpdmUgbmF2aWdhdGlvbiBhbmQgZm9ybSBzdWJtaXRzXG50b3BiYXIuY29uZmlnKHtiYXJDb2xvcnM6IHswOiBcIiMyOWRcIn0sIHNoYWRvd0NvbG9yOiBcInJnYmEoMCwgMCwgMCwgLjMpXCJ9KVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwaHg6cGFnZS1sb2FkaW5nLXN0YXJ0XCIsIGluZm8gPT4gdG9wYmFyLnNob3coKSlcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGh4OnBhZ2UtbG9hZGluZy1zdG9wXCIsIGluZm8gPT4gdG9wYmFyLmhpZGUoKSlcblxuLy8gY29ubmVjdCBpZiB0aGVyZSBhcmUgYW55IExpdmVWaWV3cyBvbiB0aGUgcGFnZVxubGl2ZVNvY2tldC5jb25uZWN0KClcblxuLy8gZXhwb3NlIGxpdmVTb2NrZXQgb24gd2luZG93IGZvciB3ZWIgY29uc29sZSBkZWJ1ZyBsb2dzIGFuZCBsYXRlbmN5IHNpbXVsYXRpb246XG4vLyA+PiBsaXZlU29ja2V0LmVuYWJsZURlYnVnKClcbi8vID4+IGxpdmVTb2NrZXQuZW5hYmxlTGF0ZW5jeVNpbSgxMDAwKSAgLy8gZW5hYmxlZCBmb3IgZHVyYXRpb24gb2YgYnJvd3NlciBzZXNzaW9uXG4vLyA+PiBsaXZlU29ja2V0LmRpc2FibGVMYXRlbmN5U2ltKClcbndpbmRvdy5saXZlU29ja2V0ID0gbGl2ZVNvY2tldCIsICJleHBvcnQgY29uc3QgSW5pdFRvYXN0ID0ge1xuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIGluaXQoKVxuICAgIH1cbn1cblxuY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBjb25zdCB0b2FzdEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvYXN0JylcbiAgICBpZiAodG9hc3RFbCAmJiB0b2FzdEVsLmlubmVyVGV4dCAhPT0gJycpIHtcbiAgICAgICAgdG9hc3RFbC5jbGFzc0xpc3QuYWRkKFwibXItNFwiKVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdG9hc3RFbC5jbGFzc0xpc3QudG9nZ2xlKFwiLW1yLTY0XCIsIFwibXItNFwiKVxuICAgICAgICB9LCAzMDAwKTtcbiAgICB9XG59XG5cbmluaXQoKSIsICIvLyBUaGUgcHVibGljIGtleSBjYW4gYmUgZm91bmQgaW4gdGhlIFN0cmlwZSBEYXNoYm9hcmRcbmxldCBzdHJpcGU7XG5cbmV4cG9ydCBjb25zdCBJbml0Q2hlY2tvdXQgPSB7XG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgY29uc3Qgc3VjY2Vzc0NhbGxiYWNrID0gcGF5bWVudEludGVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLnB1c2hFdmVudChcInBheW1lbnQtc3VjY2Vzc1wiLCBwYXltZW50SW50ZW50KTtcbiAgICAgICAgfTtcbiAgICAgICAgaW5pdCh0aGlzLmVsLCBzdWNjZXNzQ2FsbGJhY2spO1xuICAgIH1cbn07XG5cbmNvbnN0IGluaXQgPSAoZm9ybSwgc3VjY2Vzc0NhbGxiYWNrKSA9PiB7XG4gICAgY29uc3QgY2xpZW50S2V5ID0gZm9ybS5kYXRhc2V0LmtleTtcblxuICAgIHN0cmlwZSA9IFN0cmlwZShcbiAgICAgICAgY2xpZW50S2V5XG4gICAgKTtcblxuICAgIGNvbnN0IGNsaWVudFNlY3JldCA9IGZvcm0uZGF0YXNldC5zZWNyZXQ7XG5cbiAgICAvLyBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgRWxlbWVudHMuXG4gICAgdmFyIGVsZW1lbnRzID0gc3RyaXBlLmVsZW1lbnRzKCk7XG5cbiAgICAvLyBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIGNhcmQgRWxlbWVudC5cbiAgICB2YXIgY2FyZCA9IGVsZW1lbnRzLmNyZWF0ZShcImNhcmRcIiwgeyBzdHlsZTogc3R5bGUgfSk7XG5cbiAgICAvLyBBZGQgYW4gaW5zdGFuY2Ugb2YgdGhlIGNhcmQgRWxlbWVudCBpbnRvIHRoZSBgY2FyZC1lbGVtZW50YCA8ZGl2Pi5cbiAgICBjYXJkLm1vdW50KFwiI2NhcmQtZWxlbWVudFwiKTtcblxuICAgIC8vIEhhbmRsZSByZWFsLXRpbWUgdmFsaWRhdGlvbiBlcnJvcnMgZnJvbSB0aGUgY2FyZCBFbGVtZW50LlxuICAgIGNhcmQub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIGRpc3BsYXlFcnJvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FyZC1lcnJvcnNcIik7XG4gICAgICAgIGlmIChldmVudC5lcnJvcikge1xuICAgICAgICAgICAgZGlzcGxheUVycm9yLnRleHRDb250ZW50ID0gZXZlbnQuZXJyb3IubWVzc2FnZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRpc3BsYXlFcnJvci50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBmb3JtIHN1Ym1pc3Npb24uXG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgc3RyaXBlXG4gICAgICAgICAgICAuY29uZmlybUNhcmRQYXltZW50KGNsaWVudFNlY3JldCwge1xuICAgICAgICAgICAgICAgIHBheW1lbnRfbWV0aG9kOiB7XG4gICAgICAgICAgICAgICAgICAgIGNhcmQ6IGNhcmRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBTaG93IGVycm9yIHRvIHlvdXIgY3VzdG9tZXIgKGUuZy4sIGluc3VmZmljaWVudCBmdW5kcylcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0LmVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBwYXltZW50IGhhcyBiZWVuIHByb2Nlc3NlZCFcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5wYXltZW50SW50ZW50LnN0YXR1cyA9PT0gXCJzdWNjZWVkZWRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2hvdyBhIHN1Y2Nlc3MgbWVzc2FnZSB0byB5b3VyIGN1c3RvbWVyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2socmVzdWx0LnBheW1lbnRJbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG4vLyBDdXN0b20gc3R5bGluZyBjYW4gYmUgcGFzc2VkIHRvIG9wdGlvbnMgd2hlbiBjcmVhdGluZyBhbiBFbGVtZW50LlxuLy8gKE5vdGUgdGhhdCB0aGlzIGRlbW8gdXNlcyBhIHdpZGVyIHNldCBvZiBzdHlsZXMgdGhhbiB0aGUgZ3VpZGUgYmVsb3cuKVxuY29uc3Qgc3R5bGUgPSB7XG4gICAgYmFzZToge1xuICAgICAgICBjb2xvcjogXCIjMzIzMjVkXCIsXG4gICAgICAgIGZvbnRGYW1pbHk6ICdcIkhlbHZldGljYSBOZXVlXCIsIEhlbHZldGljYSwgc2Fucy1zZXJpZicsXG4gICAgICAgIGZvbnRTbW9vdGhpbmc6IFwiYW50aWFsaWFzZWRcIixcbiAgICAgICAgZm9udFNpemU6IFwiMTZweFwiLFxuICAgICAgICBcIjo6cGxhY2Vob2xkZXJcIjoge1xuICAgICAgICAgICAgY29sb3I6IFwiI2FhYjdjNFwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGludmFsaWQ6IHtcbiAgICAgICAgY29sb3I6IFwiI2ZhNzU1YVwiLFxuICAgICAgICBpY29uQ29sb3I6IFwiI2ZhNzU1YVwiXG4gICAgfVxufTsiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFNQSxNQUFDLFVBQVUsU0FBUSxXQUFVO0FBQzNCO0FBR0EsUUFBQyxZQUFZO0FBQ1gsY0FBSSxXQUFXO0FBQ2YsY0FBSSxVQUFVLENBQUMsTUFBTSxPQUFPLFVBQVU7QUFDdEMsbUJBQVMsSUFBSSxHQUFHLElBQUksUUFBUSxVQUFVLENBQUMsUUFBTyx1QkFBdUIsRUFBRSxHQUFHO0FBQ3hFLG9CQUFPLHdCQUNMLFFBQU8sUUFBUSxLQUFLO0FBQ3RCLG9CQUFPLHVCQUNMLFFBQU8sUUFBUSxLQUFLLDJCQUNwQixRQUFPLFFBQVEsS0FBSztBQUFBO0FBRXhCLGNBQUksQ0FBQyxRQUFPO0FBQ1Ysb0JBQU8sd0JBQXdCLFNBQVUsVUFBVSxTQUFTO0FBQzFELGtCQUFJLFdBQVcsSUFBSSxPQUFPO0FBQzFCLGtCQUFJLGFBQWEsS0FBSyxJQUFJLEdBQUcsS0FBTSxZQUFXO0FBQzlDLGtCQUFJLEtBQUssUUFBTyxXQUFXLFdBQVk7QUFDckMseUJBQVMsV0FBVztBQUFBLGlCQUNuQjtBQUNILHlCQUFXLFdBQVc7QUFDdEIscUJBQU87QUFBQTtBQUVYLGNB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

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("E", [], factory);
	else if(typeof exports === 'object')
		exports["E"] = factory();
	else
		root["E"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eventTypes": () => (/* binding */ eventTypes),
/* harmony export */   "listeners": () => (/* binding */ listeners),
/* harmony export */   "nonBubblers": () => (/* binding */ nonBubblers),
/* harmony export */   "makeBusStack": () => (/* binding */ makeBusStack),
/* harmony export */   "triggerBus": () => (/* binding */ triggerBus),
/* harmony export */   "maybeRunQuerySelector": () => (/* binding */ maybeRunQuerySelector),
/* harmony export */   "handleDelegation": () => (/* binding */ handleDelegation),
/* harmony export */   "clone": () => (/* binding */ clone)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Holds the SelectorSets for each event type
 * @type {{}}
 */
var eventTypes = {};
/**
 * Holds Bus event stacks
 * @type {{}}
 */

var listeners = {};
/**
 * Events that don't bubble
 * @type {string[]}
 */

var nonBubblers = ['mouseenter', 'mouseleave', 'pointerenter', 'pointerleave', 'blur', 'focus'];
/**
 * Make a bus stack if not already created.
 *
 * @param {string} event
 */

function makeBusStack(event) {
  if (listeners[event] === undefined) {
    listeners[event] = new Set();
  }
}
/**
 * Trigger a bus stack.
 *
 * @param {string} event
 * @param args
 */


function triggerBus(event, args) {
  if (listeners[event]) {
    listeners[event].forEach(function (cb) {
      cb.apply(void 0, _toConsumableArray(args));
    });
  }
}
/**
 * Maybe run querySelectorAll if input is a string.
 *
 * @param {HTMLElement|Element|string} el
 * @returns {NodeListOf<Element>}
 */


function maybeRunQuerySelector(el) {
  return typeof el === 'string' ? document.querySelectorAll(el) : el;
}
/**
 * Handle delegated events
 *
 * @param {Event} e
 */


function handleDelegation(e) {
  var matches = traverse(eventTypes[e.type], e.target);

  if (matches.length) {
    for (var i = 0; i < matches.length; i++) {
      for (var i2 = 0; i2 < matches[i].stack.length; i2++) {
        if (nonBubblers.indexOf(e.type) !== -1) {
          addDelegateTarget(e, matches[i].delegatedTarget);

          if (e.target === matches[i].delegatedTarget) {
            matches[i].stack[i2].data(e);
          }
        } else {
          addDelegateTarget(e, matches[i].delegatedTarget);
          matches[i].stack[i2].data(e);
        }
      }
    }
  }
}
/**
 * Find a matching selector for delegation
 *
 * @param {SelectorSet} listeners
 * @param {HTMLElement|Element|EventTarget} target
 * @returns {[]}
 */


function traverse(listeners, target) {
  var queue = [];
  var node = target;

  do {
    if (node.nodeType !== 1) {
      break;
    }

    var matches = listeners.matches(node);

    if (matches.length) {
      queue.push({
        delegatedTarget: node,
        stack: matches
      });
    }
  } while (node = node.parentElement);

  return queue;
}
/**
 * Add delegatedTarget attribute to dispatched delegated events
 *
 * @param {Event} event
 * @param {HTMLElement|Element} delegatedTarget
 */


function addDelegateTarget(event, delegatedTarget) {
  Object.defineProperty(event, 'currentTarget', {
    configurable: true,
    enumerable: true,
    get: function get() {
      return delegatedTarget;
    }
  });
}
/**
 * Creates a deep clone of an object.
 *
 * @param object
 * @returns {Object.<string, array>}
 */


function clone(object) {
  var copy = {};

  for (var key in object) {
    copy[key] = _toConsumableArray(object[key]);
  }

  return copy;
}



/***/ }),

/***/ "./node_modules/selector-set/selector-set.next.js":
/*!********************************************************!*\
  !*** ./node_modules/selector-set/selector-set.next.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SelectorSet)
/* harmony export */ });
// Public: Create a new SelectorSet.
function SelectorSet() {
  // Construct new SelectorSet if called as a function.
  if (!(this instanceof SelectorSet)) {
    return new SelectorSet();
  }

  // Public: Number of selectors added to the set
  this.size = 0;

  // Internal: Incrementing ID counter
  this.uid = 0;

  // Internal: Array of String selectors in the set
  this.selectors = [];

  // Internal: Map of selector ids to objects
  this.selectorObjects = {};

  // Internal: All Object index String names mapping to Index objects.
  this.indexes = Object.create(this.indexes);

  // Internal: Used Object index String names mapping to Index objects.
  this.activeIndexes = [];
}

// Detect prefixed Element#matches function.
var docElem = window.document.documentElement;
var matches =
  docElem.matches ||
  docElem.webkitMatchesSelector ||
  docElem.mozMatchesSelector ||
  docElem.oMatchesSelector ||
  docElem.msMatchesSelector;

// Public: Check if element matches selector.
//
// Maybe overridden with custom Element.matches function.
//
// el       - An Element
// selector - String CSS selector
//
// Returns true or false.
SelectorSet.prototype.matchesSelector = function(el, selector) {
  return matches.call(el, selector);
};

// Public: Find all elements in the context that match the selector.
//
// Maybe overridden with custom querySelectorAll function.
//
// selectors - String CSS selectors.
// context   - Element context
//
// Returns non-live list of Elements.
SelectorSet.prototype.querySelectorAll = function(selectors, context) {
  return context.querySelectorAll(selectors);
};

// Public: Array of indexes.
//
// name     - Unique String name
// selector - Function that takes a String selector and returns a String key
//            or undefined if it can't be used by the index.
// element  - Function that takes an Element and returns an Array of String
//            keys that point to indexed values.
//
SelectorSet.prototype.indexes = [];

// Index by element id
var idRe = /^#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
SelectorSet.prototype.indexes.push({
  name: 'ID',
  selector: function matchIdSelector(sel) {
    var m;
    if ((m = sel.match(idRe))) {
      return m[0].slice(1);
    }
  },
  element: function getElementId(el) {
    if (el.id) {
      return [el.id];
    }
  }
});

// Index by all of its class names
var classRe = /^\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
SelectorSet.prototype.indexes.push({
  name: 'CLASS',
  selector: function matchClassSelector(sel) {
    var m;
    if ((m = sel.match(classRe))) {
      return m[0].slice(1);
    }
  },
  element: function getElementClassNames(el) {
    var className = el.className;
    if (className) {
      if (typeof className === 'string') {
        return className.split(/\s/);
      } else if (typeof className === 'object' && 'baseVal' in className) {
        // className is a SVGAnimatedString
        // global SVGAnimatedString is not an exposed global in Opera 12
        return className.baseVal.split(/\s/);
      }
    }
  }
});

// Index by tag/node name: `DIV`, `FORM`, `A`
var tagRe = /^((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
SelectorSet.prototype.indexes.push({
  name: 'TAG',
  selector: function matchTagSelector(sel) {
    var m;
    if ((m = sel.match(tagRe))) {
      return m[0].toUpperCase();
    }
  },
  element: function getElementTagName(el) {
    return [el.nodeName.toUpperCase()];
  }
});

// Default index just contains a single array of elements.
SelectorSet.prototype.indexes['default'] = {
  name: 'UNIVERSAL',
  selector: function() {
    return true;
  },
  element: function() {
    return [true];
  }
};

// Use ES Maps when supported
var Map;
if (typeof window.Map === 'function') {
  Map = window.Map;
} else {
  Map = (function() {
    function Map() {
      this.map = {};
    }
    Map.prototype.get = function(key) {
      return this.map[key + ' '];
    };
    Map.prototype.set = function(key, value) {
      this.map[key + ' '] = value;
    };
    return Map;
  })();
}

// Regexps adopted from Sizzle
//   https://github.com/jquery/sizzle/blob/1.7/sizzle.js
//
var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;

// Internal: Get indexes for selector.
//
// selector - String CSS selector
//
// Returns Array of {index, key}.
function parseSelectorIndexes(allIndexes, selector) {
  allIndexes = allIndexes.slice(0).concat(allIndexes['default']);

  var allIndexesLen = allIndexes.length,
    i,
    j,
    m,
    dup,
    rest = selector,
    key,
    index,
    indexes = [];

  do {
    chunker.exec('');
    if ((m = chunker.exec(rest))) {
      rest = m[3];
      if (m[2] || !rest) {
        for (i = 0; i < allIndexesLen; i++) {
          index = allIndexes[i];
          if ((key = index.selector(m[1]))) {
            j = indexes.length;
            dup = false;
            while (j--) {
              if (indexes[j].index === index && indexes[j].key === key) {
                dup = true;
                break;
              }
            }
            if (!dup) {
              indexes.push({ index: index, key: key });
            }
            break;
          }
        }
      }
    }
  } while (m);

  return indexes;
}

// Internal: Find first item in Array that is a prototype of `proto`.
//
// ary   - Array of objects
// proto - Prototype of expected item in `ary`
//
// Returns object from `ary` if found. Otherwise returns undefined.
function findByPrototype(ary, proto) {
  var i, len, item;
  for (i = 0, len = ary.length; i < len; i++) {
    item = ary[i];
    if (proto.isPrototypeOf(item)) {
      return item;
    }
  }
}

// Public: Log when added selector falls under the default index.
//
// This API should not be considered stable. May change between
// minor versions.
//
// obj - {selector, data} Object
//
//   SelectorSet.prototype.logDefaultIndexUsed = function(obj) {
//     console.warn(obj.selector, "could not be indexed");
//   };
//
// Returns nothing.
SelectorSet.prototype.logDefaultIndexUsed = function() {};

// Public: Add selector to set.
//
// selector - String CSS selector
// data     - Optional data Object (default: undefined)
//
// Returns nothing.
SelectorSet.prototype.add = function(selector, data) {
  var obj,
    i,
    indexProto,
    key,
    index,
    objs,
    selectorIndexes,
    selectorIndex,
    indexes = this.activeIndexes,
    selectors = this.selectors,
    selectorObjects = this.selectorObjects;

  if (typeof selector !== 'string') {
    return;
  }

  obj = {
    id: this.uid++,
    selector: selector,
    data: data
  };
  selectorObjects[obj.id] = obj;

  selectorIndexes = parseSelectorIndexes(this.indexes, selector);
  for (i = 0; i < selectorIndexes.length; i++) {
    selectorIndex = selectorIndexes[i];
    key = selectorIndex.key;
    indexProto = selectorIndex.index;

    index = findByPrototype(indexes, indexProto);
    if (!index) {
      index = Object.create(indexProto);
      index.map = new Map();
      indexes.push(index);
    }

    if (indexProto === this.indexes['default']) {
      this.logDefaultIndexUsed(obj);
    }
    objs = index.map.get(key);
    if (!objs) {
      objs = [];
      index.map.set(key, objs);
    }
    objs.push(obj);
  }

  this.size++;
  selectors.push(selector);
};

// Public: Remove selector from set.
//
// selector - String CSS selector
// data     - Optional data Object (default: undefined)
//
// Returns nothing.
SelectorSet.prototype.remove = function(selector, data) {
  if (typeof selector !== 'string') {
    return;
  }

  var selectorIndexes,
    selectorIndex,
    i,
    j,
    k,
    selIndex,
    objs,
    obj,
    indexes = this.activeIndexes,
    selectors = (this.selectors = []),
    selectorObjects = this.selectorObjects,
    removedIds = {},
    removeAll = arguments.length === 1;

  selectorIndexes = parseSelectorIndexes(this.indexes, selector);
  for (i = 0; i < selectorIndexes.length; i++) {
    selectorIndex = selectorIndexes[i];

    j = indexes.length;
    while (j--) {
      selIndex = indexes[j];
      if (selectorIndex.index.isPrototypeOf(selIndex)) {
        objs = selIndex.map.get(selectorIndex.key);
        if (objs) {
          k = objs.length;
          while (k--) {
            obj = objs[k];
            if (obj.selector === selector && (removeAll || obj.data === data)) {
              objs.splice(k, 1);
              removedIds[obj.id] = true;
            }
          }
        }
        break;
      }
    }
  }

  for (i in removedIds) {
    delete selectorObjects[i];
    this.size--;
  }

  for (i in selectorObjects) {
    selectors.push(selectorObjects[i].selector);
  }
};

// Sort by id property handler.
//
// a - Selector obj.
// b - Selector obj.
//
// Returns Number.
function sortById(a, b) {
  return a.id - b.id;
}

// Public: Find all matching decendants of the context element.
//
// context - An Element
//
// Returns Array of {selector, data, elements} matches.
SelectorSet.prototype.queryAll = function(context) {
  if (!this.selectors.length) {
    return [];
  }

  var matches = {},
    results = [];
  var els = this.querySelectorAll(this.selectors.join(', '), context);

  var i, j, len, len2, el, m, match, obj;
  for (i = 0, len = els.length; i < len; i++) {
    el = els[i];
    m = this.matches(el);
    for (j = 0, len2 = m.length; j < len2; j++) {
      obj = m[j];
      if (!matches[obj.id]) {
        match = {
          id: obj.id,
          selector: obj.selector,
          data: obj.data,
          elements: []
        };
        matches[obj.id] = match;
        results.push(match);
      } else {
        match = matches[obj.id];
      }
      match.elements.push(el);
    }
  }

  return results.sort(sortById);
};

// Public: Match element against all selectors in set.
//
// el - An Element
//
// Returns Array of {selector, data} matches.
SelectorSet.prototype.matches = function(el) {
  if (!el) {
    return [];
  }

  var i, j, k, len, len2, len3, index, keys, objs, obj, id;
  var indexes = this.activeIndexes,
    matchedIds = {},
    matches = [];

  for (i = 0, len = indexes.length; i < len; i++) {
    index = indexes[i];
    keys = index.element(el);
    if (keys) {
      for (j = 0, len2 = keys.length; j < len2; j++) {
        if ((objs = index.map.get(keys[j]))) {
          for (k = 0, len3 = objs.length; k < len3; k++) {
            obj = objs[k];
            id = obj.id;
            if (!matchedIds[id] && this.matchesSelector(el, obj.selector)) {
              matchedIds[id] = true;
              matches.push(obj);
            }
          }
        }
      }
    }
  }

  return matches.sort(sortById);
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./src/e.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var selector_set__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! selector-set */ "./node_modules/selector-set/selector-set.next.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



/**
 * Public API
 */

var E = /*#__PURE__*/function () {
  function E() {
    _classCallCheck(this, E);
  }

  _createClass(E, [{
    key: "bindAll",
    value:
    /**
     * Binds all provided methods to a provided context.
     *
     * @param {object} context
     * @param {string[]} [methods] Optional.
     */
    function bindAll(context, methods) {
      if (!methods) {
        methods = Object.getOwnPropertyNames(Object.getPrototypeOf(context));
      }

      for (var i = 0; i < methods.length; i++) {
        context[methods[i]] = context[methods[i]].bind(context);
      }
    }
    /**
     * Bind event to a string, NodeList, or element.
     *
     * @param {string} event
     * @param {string|NodeList|NodeListOf<Element>|HTMLElement|HTMLElement[]|Window|Document|function} el
     * @param {*} [callback]
     * @param {{}|boolean} [options]
     */

  }, {
    key: "on",
    value: function on(event, el, callback, options) {
      var events = event.split(' ');

      for (var i = 0; i < events.length; i++) {
        if (typeof el === 'function' && callback === undefined) {
          (0,_utils__WEBPACK_IMPORTED_MODULE_1__.makeBusStack)(events[i]);
          _utils__WEBPACK_IMPORTED_MODULE_1__.listeners[events[i]].add(el);
          continue;
        }

        if (el.nodeType && el.nodeType === 1 || el === window || el === document) {
          el.addEventListener(events[i], callback, options);
          continue;
        }

        el = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.maybeRunQuerySelector)(el);

        for (var n = 0; n < el.length; n++) {
          el[n].addEventListener(events[i], callback, options);
        }
      }
    }
    /**
     * Add a delegated event.
     *
     * @param {string} event
     * @param {string|NodeList|HTMLElement|Element} delegate
     * @param {*} [callback]
     */

  }, {
    key: "delegate",
    value: function delegate(event, _delegate, callback) {
      var events = event.split(' ');

      for (var i = 0; i < events.length; i++) {
        var map = _utils__WEBPACK_IMPORTED_MODULE_1__.eventTypes[events[i]];

        if (map === undefined) {
          map = new selector_set__WEBPACK_IMPORTED_MODULE_0__["default"]();
          _utils__WEBPACK_IMPORTED_MODULE_1__.eventTypes[events[i]] = map;

          if (_utils__WEBPACK_IMPORTED_MODULE_1__.nonBubblers.indexOf(events[i]) !== -1) {
            document.addEventListener(events[i], _utils__WEBPACK_IMPORTED_MODULE_1__.handleDelegation, true);
          } else {
            document.addEventListener(events[i], _utils__WEBPACK_IMPORTED_MODULE_1__.handleDelegation);
          }
        }

        map.add(_delegate, callback);
      }
    }
    /**
     * Remove a callback from a DOM element, or one or all Bus events.
     *
     * @param {string} event
     * @param {string|NodeList|HTMLElement|Element|Window|undefined} [el]
     * @param {*} [callback]
     * @param {{}|boolean} [options]
     */

  }, {
    key: "off",
    value: function off(event, el, callback, options) {
      var events = event.split(' ');

      for (var i = 0; i < events.length; i++) {
        if (el === undefined) {
          var _listeners$events$i;

          (_listeners$events$i = _utils__WEBPACK_IMPORTED_MODULE_1__.listeners[events[i]]) === null || _listeners$events$i === void 0 ? void 0 : _listeners$events$i.clear();
          continue;
        }

        if (typeof el === 'function') {
          (0,_utils__WEBPACK_IMPORTED_MODULE_1__.makeBusStack)(events[i]);
          _utils__WEBPACK_IMPORTED_MODULE_1__.listeners[events[i]]["delete"](el);
          continue;
        }

        var map = _utils__WEBPACK_IMPORTED_MODULE_1__.eventTypes[events[i]];

        if (map !== undefined) {
          map.remove(el, callback);

          if (map.size === 0) {
            delete _utils__WEBPACK_IMPORTED_MODULE_1__.eventTypes[events[i]];

            if (_utils__WEBPACK_IMPORTED_MODULE_1__.nonBubblers.indexOf(events[i]) !== -1) {
              document.removeEventListener(events[i], _utils__WEBPACK_IMPORTED_MODULE_1__.handleDelegation, true);
            } else {
              document.removeEventListener(events[i], _utils__WEBPACK_IMPORTED_MODULE_1__.handleDelegation);
            }

            continue;
          }
        }

        if (el.removeEventListener !== undefined) {
          el.removeEventListener(events[i], callback, options);
          continue;
        }

        el = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.maybeRunQuerySelector)(el);

        for (var n = 0; n < el.length; n++) {
          el[n].removeEventListener(events[i], callback, options);
        }
      }
    }
    /**
     * Emit a Bus event.
     *
     * @param {string} event
     * @param {...*} args
     */

  }, {
    key: "emit",
    value: function emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (0,_utils__WEBPACK_IMPORTED_MODULE_1__.triggerBus)(event, args);
    }
    /**
     * Return a clone of the delegated event stack for debugging.
     *
     * @returns {Object.<string, array>}
     */

  }, {
    key: "debugDelegated",
    value: function debugDelegated() {
      return JSON.parse(JSON.stringify(_utils__WEBPACK_IMPORTED_MODULE_1__.eventTypes));
    }
    /**
     * Return a clone of the bus event stack for debugging.
     *
     * @returns {Object.<string, array>}
     */

  }, {
    key: "debugBus",
    value: function debugBus() {
      return (0,_utils__WEBPACK_IMPORTED_MODULE_1__.clone)(_utils__WEBPACK_IMPORTED_MODULE_1__.listeners);
    }
    /**
     * Checks if a given bus event has listeners.
     *
     * @param {string} event
     * @returns {boolean}
     */

  }, {
    key: "hasBus",
    value: function hasBus(event) {
      return this.debugBus().hasOwnProperty(event);
    }
  }]);

  return E;
}();

var instance = new E();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (instance);
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/storage */ "./src/storage.js");

/* harmony default export */ __webpack_exports__["default"] = (_src_storage__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./node_modules/@konata9/typecheck.js/dist/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@konata9/typecheck.js/dist/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);t.default=function(e){var t=Object.prototype.toString.call(e);return t.toLowerCase().slice(8,t.length-1)}}]).default;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _konata9_typecheck_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @konata9/typecheck.js */ "./node_modules/@konata9/typecheck.js/dist/index.js");
/* harmony import */ var _konata9_typecheck_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_konata9_typecheck_js__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  // CONSTANT VALUE
  ONE_MINUTE: 1000 * 60,
  ONE_HOUR: undefined.ONE_MINUTE * 60,
  ONE_DAY: undefined.ONE_HOUR * 24,
  ONE_MONTH: undefined.ONE_DAY * 30,
  // type value & function
  type:  false || "session",
  getType: function getType() {
    return this.type;
  },
  setType: function setType(type) {
    if (!type) {
      throw new Error("Storage type can not be null.");
    }

    this.type = type;
  },
  // storage function
  set: function set(insertItem) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var expireKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var expires = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.ONE_DAY;

    if (_konata9_typecheck_js__WEBPACK_IMPORTED_MODULE_0___default()(insertItem) === "object") {
      for (var key in insertItem) {
        if (insertItem.hasOwnProperty(key)) {
          window["".concat(this.type, "Storage")].setItem(key, JSON.stringify(insertItem[key]));
        }
      }
    } else if (_konata9_typecheck_js__WEBPACK_IMPORTED_MODULE_0___default()(insertItem) === "string") {
      if (expireKey) {
        window["".concat(this.type, "Storage")].setItem("__".concat(insertItem, "__"), JSON.stringify(+new Date() + expires));
      }

      window["".concat(this.type, "Storage")].setItem(insertItem, JSON.stringify(value));
    } else {
      throw new Error("InsertItem only accept object or string.");
    }
  },
  get: function get(keyItem) {
    var _this = this;

    if (_konata9_typecheck_js__WEBPACK_IMPORTED_MODULE_0___default()(keyItem) === "array") {
      return keyItem.map(function (key) {
        if (_this.checkExpired(key)) {
          _this.remove([keyItem, "__".concat(keyItem, "__")]);

          return null;
        } else {
          return window["".concat(_this.type, "Storage")].getItem(JSON.parse(key));
        }
      });
    } else if (_konata9_typecheck_js__WEBPACK_IMPORTED_MODULE_0___default()(keyItem) === "string") {
      if (this.checkExpired(keyItem)) {
        this.remove([keyItem, "__".concat(keyItem, "__")]);
        return null;
      } else {
        return window["".concat(this.type, "Storage")].getItem(JSON.parse(keyItem));
      }
    } else {
      throw new Error("KeyItem only accept array or string.");
    }
  },
  remove: function remove() {
    var keyItem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    if (_konata9_typecheck_js__WEBPACK_IMPORTED_MODULE_0___default()(keyItem) === "array") {
      for (var key in keyItem) {
        window["".concat(this.type, "Storage")].removeItem(key);
      }
    } else if (_konata9_typecheck_js__WEBPACK_IMPORTED_MODULE_0___default()(keyItem) === "string") {
      window["".concat(this.type, "Storage")].removeItem(keyItem);
    } else {
      throw new Error("KeyItem only accept array or string.");
    }
  },
  clear: function clear() {
    window["".concat(this.type, "Storage")].clear();
  },
  hasKey: function hasKey(key) {
    if (_konata9_typecheck_js__WEBPACK_IMPORTED_MODULE_0___default()(key) !== "string") {
      throw new Error("Key must be a string.");
    }

    return this.listKeys().includes(key);
  },
  listKeys: function listKeys() {
    var keyList = [];

    for (var key in window["".concat(this.type, "Storage")]) {
      if (window["".concat(this.type, "Storage")].hasOwnProperty(key)) {
        keyList.push(key);
      }
    }

    return keyList;
  },
  checkExpired: function checkExpired(key) {
    if (_konata9_typecheck_js__WEBPACK_IMPORTED_MODULE_0___default()(key) !== 'string') {
      throw new Error("Key must be a string.");
    }

    var expireKey = "__".concat(key, "__");

    if (this.hasKey(expireKey)) {
      return this.get(expireKey) < +new Date();
    } else {
      return null;
    }
  }
});

/***/ })

/******/ });
//# sourceMappingURL=storage.test.js.map
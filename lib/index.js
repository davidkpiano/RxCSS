'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _rxjs = require('rxjs');

var _unit = require('./unit');

var _unit2 = _interopRequireDefault(_unit);

var _rect = require('./rect');

var _rect2 = _interopRequireDefault(_rect);

var _lerp = require('./lerp');

var _lerp2 = _interopRequireDefault(_lerp);

var _animationFrame = require('./animationFrame');

var _animationFrame2 = _interopRequireDefault(_animationFrame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var parse = function parse(val) {
  return typeof val === 'boolean' ? !!val ? 1 : 0 : val;
};

var styledash = function styledash() {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.documentElement;
  return {
    set: function set(key, val) {
      if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object' && !val) {
        return Object.keys(key).map(function (subKey) {
          return styledash(target).set(subKey, key[subKey]);
        });
      }

      if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
        return Object.keys(val).forEach(function (subkey) {
          styledash(target).set(key + '-' + subkey, val[subkey]);
        });
      }

      return target.style.setProperty('--' + key, parse(val));
    },
    get: function get(key) {
      return target.style.getPropertyValue('--' + key);
    }
  };
};

function RxCSS(observableMap) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;

  var style$ = _rxjs.Observable.merge.apply(_rxjs.Observable, _toConsumableArray(Object.keys(observableMap).map(function (key) {
    var observable = observableMap[key];

    if (!(observable instanceof _rxjs.Observable)) {
      observable = _rxjs.Observable.of(observable);
    }

    return observable.map(function (val) {
      return _defineProperty({}, key, val);
    });
  }))).scan(function (state, style) {
    return _extends({}, state, style);
  }, {});

  style$.subscribe(function (style) {
    return styledash(target).set(style);
  });

  return style$;
}

RxCSS.styledash = styledash;
RxCSS.unit = _unit2.default;
RxCSS.rect = _rect2.default;
RxCSS.lerp = _lerp2.default;
RxCSS.animationFrame = _animationFrame2.default;

module.exports = RxCSS;
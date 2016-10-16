'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _Observable = require('rxjs/Observable');

require('rxjs/add/operator/map');

require('rxjs/observable/of');

require('rxjs/observable/merge');

var _Subject = require('rxjs/Subject');

var _unit = require('./unit');

var _unit2 = _interopRequireDefault(_unit);

var _rect = require('./rect');

var _rect2 = _interopRequireDefault(_rect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

window.Observable = _Observable.Observable;

var docStyle = document.documentElement.style;

var parse = function parse(val) {
  if (typeof val === 'boolean') {
    return val ? 1 : 0;
  }

  return val;
};

var styledash = {
  set: function set(key, val) {
    if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object' && !val) {
      return Object.keys(key).map(function (subKey) {
        return styledash.set(subKey, key[subKey]);
      });
    }

    if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
      return Object.keys(val).forEach(function (subkey) {
        styledash.set(key + '-' + subkey, val[subkey]);
      });
    }

    return docStyle.setProperty('--' + key, parse(val));
  },
  get: function get(key) {
    return docStyle.getPropertyValue('--' + key);
  }
};

function RxCSS(observableMap) {
  var subject$ = new Rx.Subject();
  var state = {};

  var style$ = _Observable.Observable.merge.apply(_Observable.Observable, _toConsumableArray(Object.keys(observableMap).map(function (key) {
    var observable = observableMap[key];

    if (!(observable instanceof _Observable.Observable)) {
      observable = _Observable.Observable.of(observableMap[key]);
    }

    return observable.map(function (val) {
      return _defineProperty({}, key, val);
    });
  })));

  style$.subscribe(function (style) {
    var nextState = _extends({}, state, style);
    styledash.set(style);
    subject$.next(nextState);
  });

  return subject$;
}

RxCSS.styledash = styledash;
RxCSS.unit = _unit2.default;
RxCSS.rect = _rect2.default;

module.exports = RxCSS;
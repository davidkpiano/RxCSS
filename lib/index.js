'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var docStyle = document.documentElement.style;
var Observable = _Rx2.default.Observable;


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

    return docStyle.setProperty('--' + key, val);
  },
  get: function get(key) {
    return docStyle.getPropertyValue('--' + key);
  }
};

function RxCSS(observableMap) {
  var subject$ = new _Rx2.default.Subject();
  var state = {};

  var style$ = Observable.merge.apply(Observable, _toConsumableArray(Object.keys(observableMap).map(function (key) {
    var observable = observableMap[key];

    if (!(observable instanceof Observable)) {
      observable = Observable.just(observableMap[key]);
    }

    return observable.map(function (val) {
      return _defineProperty({}, key, val);
    });
  })));

  style$.subscribe(function (style) {
    Object.assign(state, style);
    styledash.set(style);
    subject$.onNext(style);
  });

  return subject$;
}

RxCSS.styledash = styledash;

module.exports = RxCSS;
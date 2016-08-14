'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styledash = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _rxDom = require('rx-dom');

var _rxDom2 = _interopRequireDefault(_rxDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var docStyle = document.documentElement.style;

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
    return docStyle.getProperty('--' + key);
  }
};

var RxCSS = function () {
  function RxCSS() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, RxCSS);

    this.subject = new Rx.Subject();
    this.state = {};
    this.subscribe = this.subject.subscribe;
  }

  _createClass(RxCSS, [{
    key: 'get',
    value: function get(key) {
      return this.state[key];
    }
  }, {
    key: 'set',
    value: function set(key, value) {
      this.state[key] = value;

      styledash.set(key, value);

      return this.subject.onNext(this.state);
    }
  }, {
    key: 'style',
    value: function style(observableMap) {
      var initialStyle = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var style$ = Object.keys(observableMap).map(function (key) {
        var observable = observableMap[key];

        if (!(observable instanceof Rx.Observable)) {
          observable = Rx.Observable.just(observableMap[key]);
        }

        return observable.map(function (val) {
          return _defineProperty({}, key, val);
        });
      }).reduce(function (a, b) {
        return Rx.Observable.combineLatest(a, b, function (a, b) {
          return _extends({}, a, b);
        });
      }, Rx.Observable.just(initialStyle));

      style$.subscribe(function (style) {
        styledash.merge(style);
      });
    }
  }]);

  return RxCSS;
}();

exports.default = RxCSS;
exports.styledash = styledash;
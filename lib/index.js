'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _rxDom = require('rx-dom');

var _rxDom2 = _interopRequireDefault(_rxDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.Rx = _rx2.default;

var docStyle = document.documentElement.style;

var styledash = {
  set: function set(key, val) {
    if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object' && !val) {
      return styledash.merge(key);
    }

    return docStyle.setProperty('--' + key, val);
  },
  get: function get(key) {
    return docStyle.getProperty('--' + key);
  },
  merge: function merge(mapping) {
    return Object.keys(mapping).map(function (key) {
      return styledash.set(key, mapping[key]);
    });
  }
};

var RxCSS = function () {
  function RxCSS() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, RxCSS);

    this.subject = new _rx2.default.Subject();

    this.state = {};
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

      docStyle.setProperty('--' + key, value);

      return this.subject.onNext(this.state);
    }
  }, {
    key: 'subscribe',
    value: function subscribe() {
      var _subject;

      return (_subject = this.subject).subscribe.apply(_subject, arguments);
    }
  }, {
    key: 'style',
    value: function style(observableMap) {
      var initialStyle = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var style$ = Object.keys(observableMap).map(function (key) {
        var observable = observableMap[key];

        return observable.map(function (val) {
          return _defineProperty({}, key, val);
        });
      }).reduce(function (a, b) {
        return _rx2.default.Observable.combineLatest(a, b, function (a, b) {
          return _extends({}, a, b);
        });
      }, _rx2.default.Observable.just(initialStyle));

      style$.subscribe(function (style) {
        console.log(style);
        styledash.merge(style);
      });
    }
  }]);

  return RxCSS;
}();

window.rxcss = new RxCSS();
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _mapValues = require('./utils/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lerp = function lerp(rate) {
  return function (value, targetValue) {
    if (value !== null && ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' || typeof value === 'array')) {
      return (0, _mapValues2.default)(value, function (subVal, key) {
        var delta = (targetValue[key] - subVal) * rate;

        return subVal + delta;
      });
    }

    var delta = (targetValue - value) * rate;

    return value + delta;
  };
};

exports.default = lerp;
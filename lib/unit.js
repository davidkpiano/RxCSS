'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mapValues = require('./utils/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unit = {
  px: function px(o$) {
    return o$.map(function (values) {
      if (typeof values === 'number') return values + 'px';

      return (0, _mapValues2.default)(values, function (value) {
        return value + 'px';
      });
    });
  }
};

exports.default = unit;
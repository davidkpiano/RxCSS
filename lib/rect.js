'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rect;

var _observable = require('./observable');

var _observable2 = _interopRequireDefault(_observable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function rect(node) {
  var sampler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _observable2.default.just(null);

  return sampler.map(function () {
    return node.getBoundingClientRect();
  });
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rect;

var _rxjs = require('rxjs');

function rect(node) {
  var sampler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _rxjs.Observable.just(null);

  return sampler.map(function () {
    return node.getBoundingClientRect();
  });
}
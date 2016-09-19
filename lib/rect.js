'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rect;

var _Rx = require('rxjs/Rx');

function rect(node) {
  var sampler = arguments.length <= 1 || arguments[1] === undefined ? _Rx.Observable.just(null) : arguments[1];

  return sampler.map(function () {
    return node.getBoundingClientRect();
  });
}
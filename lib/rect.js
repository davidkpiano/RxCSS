'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rect;

var _Observable = require('rxjs/Observable');

function rect(node) {
  var sampler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Observable.Observable.just(null);

  return sampler.map(function () {
    return node.getBoundingClientRect();
  });
}
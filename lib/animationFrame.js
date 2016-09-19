'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Rx = require('rxjs/Rx');

var animationFrame$ = _Rx.Observable.create(function (observer) {
  var active = true;

  var dispatch = function dispatch() {
    observer.onNext(null);

    if (active) requestAnimationFrame(dispatch);
  };

  dispatch();

  return function () {
    return active = false;
  };
});

exports.default = animationFrame$;
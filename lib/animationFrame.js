'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAnimationFrameTicker = createAnimationFrameTicker;

var _Observable = require('rxjs/Observable');

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

function createAnimationFrameTicker() {
  return _Observable.Observable.create(function (observer) {
    var active = true;
    var lastTick = Date.now();
    var currentTick = Date.now();

    var dispatch = function dispatch() {
      var delta = Date.now() - lastTick;

      observer.next(delta);

      if (active) requestAnimationFrame(dispatch);
    };

    dispatch();

    return function () {
      return active = false;
    };
  });
}

exports.default = createAnimationFrameTicker();
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAnimationFrameTicker = createAnimationFrameTicker;

var _observable = require('./observable');

var _observable2 = _interopRequireDefault(_observable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

function createAnimationFrameTicker() {
  return _observable2.default.create(function (observer) {
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
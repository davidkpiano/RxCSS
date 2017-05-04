'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rect;

var _observable = require('./observable');

var _observable2 = _interopRequireDefault(_observable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function rect(node) {
  if (node instanceof Element) {
    var nodeRect = node.getBoundingClientRect();

    return {
      top: nodeRect.top,
      bottom: nodeRect.bottom,
      left: nodeRect.left,
      right: nodeRect.right,
      height: nodeRect.height,
      width: nodeRect.width
    };
  } else {
    throw new Error(node + ' is not an element.');
  }
}
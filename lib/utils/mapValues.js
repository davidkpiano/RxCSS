"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function mapValues(object, iteratee) {
  var result = {};

  Object.keys(object || {}).forEach(function (key) {
    result[key] = iteratee(object[key], key, object);
  });

  return result;
}

exports.default = mapValues;
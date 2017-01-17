'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Subject = window.Rx ? Rx.Subject : require('rxjs/Subject').Subject;

exports.default = Subject;
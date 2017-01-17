'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('rxjs/add/observable/merge');

require('rxjs/add/observable/of');

require('rxjs/add/operator/scan');

require('rxjs/add/operator/map');

var Observable = window.Rx ? Rx.Observable : require('rxjs/Observable').Observable;

exports.default = Observable;
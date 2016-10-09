import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/observable/of';
import 'rxjs/observable/merge';

import { Subject } from 'rxjs/Subject';

import unit from './unit';
import rect from './rect';

window.Observable = Observable;

const docStyle = document.documentElement.style;

const styledash = {
  set: (key, val) => {
    if (typeof key === 'object' && !val) {
      return Object.keys(key)
        .map((subKey) => styledash.set(subKey, key[subKey]));
    }

    if (typeof val === 'object') {
      return Object.keys(val).forEach((subkey) => {
        styledash.set(`${key}-${subkey}`, val[subkey]);
      });
    }

    return docStyle.setProperty(`--${key}`, val);
  },
  get: (key) => docStyle.getPropertyValue(`--${key}`),
};

function RxCSS(observableMap) {
  const subject$ = new Rx.Subject();
  const state = {};

  const style$ = Observable.merge(...Object.keys(observableMap)
    .map((key) => {
      let observable = observableMap[key];

      if (!(observable instanceof Observable)) {
        observable = Observable.of(observableMap[key]);
      }

      return observable.map((val) => ({ [key]: val }));
    }));

  style$.subscribe((style) => {
    const nextState = {...state, ...style};
    styledash.set(style);
    subject$.next(nextState);
  });

  return subject$;
}

RxCSS.styledash = styledash;
RxCSS.unit = unit;
RxCSS.rect = rect;

module.exports = RxCSS;

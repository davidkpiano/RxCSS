import Observable from './observable';

import unit from './unit';
import rect from './rect';
import lerp from './lerp';
import animationFrame from './animationFrame';

const parse = (val) => {
  return (typeof val === 'boolean')
    ? (!!val ? 1 : 0)
    : val;
};

const isObservable = (o) =>
  o && typeof o.subscribe === 'function';

const styledash = (target = document.documentElement) => ({
  set: (key, val) => {
    if (typeof key === 'object' && !val) {
      return Object.keys(key)
        .map((subKey) => styledash(target).set(subKey, key[subKey]));
    }

    if (typeof val === 'object') {
      return Object.keys(val).forEach((subkey) => {
        styledash(target).set(`${key}-${subkey}`, val[subkey]);
      });
    }

    return target.style.setProperty(`--${key}`, parse(val));
  },
  get: (key) => target.style.getPropertyValue(`--${key}`),
});

function RxCSS(observableMap, target = document.documentElement) {
  const style$ = Observable
    .merge(...Object.keys(observableMap)
      .map((key) => {
        let observable = observableMap[key];

        if (!isObservable(observable)) {
          observable = Observable.of(observable);
        }

        return observable.map((val) => ({ [key]: val }));
      }))
    .scan((state, style) => ({
      ...state,
      ...style,
    }), {})

  style$.subscribe(style => styledash(target).set(style));

  return style$;
}

RxCSS.styledash = styledash;
RxCSS.unit = unit;
RxCSS.rect = rect;
RxCSS.lerp = lerp;
RxCSS.animationFrame = animationFrame;

module.exports = RxCSS;

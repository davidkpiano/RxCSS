import Observable from './observable';
import Subject from './subject';

import unit from './unit';
import rect from './rect';
import lerp from './lerp';
import animationFrame from './animationFrame';
import styledash from './styledash';

const isObservable = (o): boolean =>
  o && typeof o.subscribe === 'function';

interface IObservable {
  subscribe: Function;
  map: ((value: any) => any);
}

interface IObservableMap {
  [key: string]: IObservable | string | number | boolean;
}

export = class RxCSS {
  static set = (node: HTMLElement, key: string | {}, val?: any) =>
    styledash(node).set(key, val);

  static get = (node: HTMLElement, key: string) =>
    styledash(node).get(key);

  static unit = unit;
  static rect = rect;
  static lerp = lerp;
  static animationFrame = animationFrame;

  constructor(observableMap: IObservableMap, target: HTMLElement = document.documentElement) {
    const style$ = Observable
      .merge(...Object.keys(observableMap)
        .map((key) => {
          let observable = observableMap[key] as IObservable;

          if (!isObservable(observable)) {
            observable = Observable.of(observable);
          }

          return observable.map((val) => ({ [key]: val }));
        }))
      .scan((state, style) => ({
        ...state,
        ...style,
      }), {});

    const sub$ = new Subject();

    // setTimeout is used here to ensure that
    // the style$ observable is subscribed to
    // only after it is returned
    setTimeout(() => style$.subscribe(style => {
      styledash(target).set(style);
      sub$.next(style);
    }));

    return sub$;
  }
}

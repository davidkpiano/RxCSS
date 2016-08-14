import RxDOM from 'rx-dom';

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
  get: (key) => docStyle.getProperty(`--${key}`),
};

class RxCSS {
  constructor(options = {}) {
    this.subject = new Rx.Subject();
    this.state = {};
    this.subscribe = this.subject.subscribe;
  }

  get(key) {
    return this.state[key];
  }

  set(key, value) {
    this.state[key] = value;

    styledash.set(key, value);

    return this.subject.onNext(this.state);
  }

  style(observableMap, initialStyle = {}) {
    const style$ = Object.keys(observableMap).map((key) => {
      let observable = observableMap[key];

      if (!(observable instanceof Rx.Observable)) {
        observable = Rx.Observable.just(observableMap[key]);
      }

      return observable.map((val) => ({ [key]: val }));
    }).reduce((a, b) => Rx.Observable.combineLatest(a, b,
      (a, b) => ({ ...a, ...b })),
      Rx.Observable.just(initialStyle));

    style$.subscribe((style) => {
      styledash.set(style);
    });
  }
}

export default RxCSS;
export {
  styledash,
};

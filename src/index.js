import RxDOM from 'rx-dom';

const docStyle = document.documentElement.style;

const styledash = {
  set: (key, val) => {
    console.log('setting', key, val);
    if (typeof key === 'object' && !val) {
      return styledash.merge(key);
    }

    if (typeof val === 'object') {
      return Object.keys(val).forEach((subkey) => {
        styledash.set(`${key}-${subkey}`, val[subkey]);
      });
    }

    return docStyle.setProperty(`--${key}`, val);
  },
  get: (key) => docStyle.getProperty(`--${key}`),
  merge: (mapping) => Object.keys(mapping)
    .map((key) => styledash.set(key, mapping[key]))
};

class RxCSS {
  constructor(options = {}) {
    this.subject = new Rx.Subject();
    
    this.state = {};
  }

  get(key) {
    return this.state[key];
  }

  set(key, value) {
    this.state[key] = value;

    docStyle.setProperty(`--${key}`, value);

    return this.subject.onNext(this.state);
  }

  subscribe(...args) {
    return this.subject.subscribe(...args);
  }

  style(observableMap, initialStyle = {}) {
    const style$ = Object.keys(observableMap).map((key) => {
      let observable = observableMap[key];

      if (!(observable instanceof Rx.Observable)) {
        observable = Rx.Observable.just(observableMap[key]);
      }

      return observable.map((val) => ({ [key]: val }));
    }).reduce((a, b) => Rx.Observable.combineLatest(a, b,
      (a, b) => ({ ...a, ...b })), Rx.Observable.just(initialStyle));

    style$.subscribe((style) => {
      styledash.merge(style);
    });
  }
}

window.Rx = RxDOM;
window.RxCSS = RxCSS;

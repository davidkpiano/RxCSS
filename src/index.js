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
  
  const style$ = Rx.Observable.merge(...Object.keys(observableMap)
    .map((key) => {
      let observable = observableMap[key];

      if (!(observable instanceof Rx.Observable)) {
        observable = Rx.Observable.just(observableMap[key]);
      }

      return observable.map((val) => ({ [key]: val }));
    }));

  style$.subscribe((style) => {
    Object.assign(state, style);
    styledash.set(style);
    subject$.onNext(style);
  });
}

RxCSS.styledash = styledash;

module.exports = RxCSS;

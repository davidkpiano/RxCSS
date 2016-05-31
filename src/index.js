import Rx from 'rx';

window.Rx = Rx;

const docStyle = document.documentElement.style;

const styledash = {
  set: (key, val) => {
    if (typeof key === 'object' && !val) {
      return styledash.merge(key);
    }

    return docStyle.setProperty(`--${key}`, val);
  },
  get: (key) => docStyle.getProperty(`--${key}`),
  merge: (mapping) => Object.keys(mapping)
    .map((key) => styledash.set(key, mapping[key]))
};

class RxCSS extends Rx.Subject {
  constructor(options = {}) {
    super();
    
    this._state = {};
  }

  get(key) {
    return this._state[key];
  }

  set(key, value) {
    this._state[key] = value;

    docStyle.setProperty(`--${key}`, value);

    return this.onNext(this._state);
  }
}

window.rxcss = new RxCSS();

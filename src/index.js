import Rx from 'rxjs/Rx';

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

class RxCSS {
  constructor(options = {}) {
    this.state = {};
  }

  get(key) {
    return this.state[key];
  }

  set(key, value) {
    this.state[key] = value;

    docStyle.setProperty(`--${key}`, value);

    return this;
  }
}

window.rxcss = new RxCSS();

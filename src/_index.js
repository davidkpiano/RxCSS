
const docStyle = document.documentElement.style;
const { fromEvent } = Rx.Observable;

function getRandomId() {
  return Math.random().toString(36).substr(2, 5);
}

const styledash = {
  set: (key, val) => docStyle.setProperty(`--${key}`, val),
  get: (key) => docStyle.getProperty(`--${key}`),
  merge: (mapping) => Object.keys(mapping)
    .map((key) => styledash.set(key, mapping[key]))
};

window.vars = new Map();

function css(strings, ...values) {
  let result = '';

  values.forEach((value, i) => {
    let customProp;
    let cssValue = value;

    result += strings[i].trim();

    if (value.constructor && value.constructor.name === 'MapObservable') {
      customProp = getRandomId();

      window.vars.set(customProp, value);

      value.subscribe(val => {
        styledash.set(customProp, val);
      });
    }

    if (customProp) {
      result += `var(--${customProp})`;
    } else {
      result += cssValue;
    }
  });

  const resultCSS = result + strings[strings.length - 1];

  window.vars.forEach((value, key) => {
    value.subscribe
  })

  return resultCSS
}

// Rx.Observable.fromEvent(document.querySelector('body'), 'mousemove').subscribe(x=>console.log(x))

const pos = fromEvent(document.querySelector('body'), 'mousemove')
  .debounce(300)
  .map(({offsetX, offsetY}) => ({offsetX, offsetY}));

document.getElementById('style').innerHTML = css`
  body, html {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
  }

  #foo {
    width: 1rem;
    height: 1rem;
    background: green;
    position: absolute;
    transform: translateX(calc(${pos.pluck('offsetX')} * 1px))
      translateY(calc(${pos.pluck('offsetY')} * 1px));
    pointer-events: none;
    transition: transform 0.3s ease-in-out;
  }
`;

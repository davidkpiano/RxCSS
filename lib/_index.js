'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  body, html {\n    height: 100%;\n    width: 100%;\n    margin: 0;\n    padding: 0;\n  }\n\n  * {\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n    position: relative;\n  }\n\n  #foo {\n    width: 1rem;\n    height: 1rem;\n    background: green;\n    position: absolute;\n    transform: translateX(calc(', ' * 1px))\n      translateY(calc(', ' * 1px));\n    pointer-events: none;\n    transition: transform 0.3s ease-in-out;\n  }\n'], ['\n  body, html {\n    height: 100%;\n    width: 100%;\n    margin: 0;\n    padding: 0;\n  }\n\n  * {\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n    position: relative;\n  }\n\n  #foo {\n    width: 1rem;\n    height: 1rem;\n    background: green;\n    position: absolute;\n    transform: translateX(calc(', ' * 1px))\n      translateY(calc(', ' * 1px));\n    pointer-events: none;\n    transition: transform 0.3s ease-in-out;\n  }\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var docStyle = document.documentElement.style;
var fromEvent = Rx.Observable.fromEvent;


function getRandomId() {
  return Math.random().toString(36).substr(2, 5);
}

var styledash = {
  set: function set(key, val) {
    return docStyle.setProperty('--' + key, val);
  },
  get: function get(key) {
    return docStyle.getProperty('--' + key);
  },
  merge: function merge(mapping) {
    return Object.keys(mapping).map(function (key) {
      return styledash.set(key, mapping[key]);
    });
  }
};

window.vars = new Map();

function css(strings) {
  var result = '';

  for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  values.forEach(function (value, i) {
    var customProp = void 0;
    var cssValue = value;

    result += strings[i].trim();

    if (value.constructor && value.constructor.name === 'MapObservable') {
      customProp = getRandomId();

      window.vars.set(customProp, value);

      value.subscribe(function (val) {
        styledash.set(customProp, val);
      });
    }

    if (customProp) {
      result += 'var(--' + customProp + ')';
    } else {
      result += cssValue;
    }
  });

  var resultCSS = result + strings[strings.length - 1];

  window.vars.forEach(function (value, key) {
    value.subscribe;
  });

  return resultCSS;
}

// Rx.Observable.fromEvent(document.querySelector('body'), 'mousemove').subscribe(x=>console.log(x))

var pos = fromEvent(document.querySelector('body'), 'mousemove').debounce(300).map(function (_ref) {
  var offsetX = _ref.offsetX;
  var offsetY = _ref.offsetY;
  return { offsetX: offsetX, offsetY: offsetY };
});

document.getElementById('style').innerHTML = css(_templateObject, pos.pluck('offsetX'), pos.pluck('offsetY'));
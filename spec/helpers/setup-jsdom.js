var jsdom = require("jsdom");

// Setup the jsdom environment
// @see https://github.com/facebook/react/issues/5046
global.document = jsdom.jsdom(`
  <!doctype html><html><body></body></html>
`);
global.window = document.defaultView;
global.navigator = global.window.navigator;

global.document.documentElement.style.getPropertyValue = function(property) {
  if (property.indexOf('--') === 0) {
    const actualProperty = property.charAt(2).toUpperCase() + property.slice(3);

    return global.document.documentElement.style[actualProperty];
  }

  return global.document.documentElement.style.getPropertyValue(property);
}

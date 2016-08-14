/* eslint strict:0 */
var path = require('path');

'use strict';

module.exports = {
  externals: {
    'rx-dom': {
      root: 'Rx',
      commonjs2: 'Rx',
      commonjs: 'Rx',
      amd: 'Rx',
    },
  },
  entry: path.join(__dirname, 'src/index'),
  output: {
    library: 'RxCSS',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
    ],
  },
  resolve: {
    extensions: ['', '.js'],
  },
  plugins: [],
  // devtool: 'inline-source-map'
};

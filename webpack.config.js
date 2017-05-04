/* eslint strict:0 */
var path = require('path');

'use strict';

module.exports = {
  entry: path.join(__dirname, 'src/index.ts'),
  output: {
    library: 'RxCSS',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
      { test: /\.ts$/, loaders: ['ts-loader'], exclude: /node_modules/ },      
    ],
  },
  resolve: {
    extensions: ['', '.js', '.ts'],
  },
  plugins: [],
  // devtool: 'inline-source-map'
};

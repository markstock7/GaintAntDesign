var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var entry = {};
entry['index'] = './scripts/importCss.js';
entry['demo'] = './scripts/demo.js';

module.exports = {
  entry: entry,
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].js'
  }
}

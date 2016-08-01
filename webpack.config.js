var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var entry = {};

// entry.index = './scripts/importCss.js';
// entry.domo = './scripts/demo.js';
entry['index'] = './scripts/importCss.js';
entry['demo'] = './scripts/demo.js';

module.exports = {
  entry: entry,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react', 'stage-0'],
        plugins: ['add-module-exports']
      }
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract(
        'css?sourceMap&-minimize!autoprefixer-loader!less?sourceMap'
      )
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
        'css?sourceMap&-minimize!autoprefixer-loader'
      )
    }, {
      test: /\.svg$/,
      loader: 'svg-sprite?' + JSON.stringify({
        name: '[name]',
        prefixize: true
      })
    }, {
      test: /\.(png|jpg)$/,
      loader: 'file?name=img-[sha512:hash:base64:7].[ext]'
    }]
    // preLoaders: [{
    //   test: /\.jsx?$/,
    //   exclude: [/node_modules/],
    //   include: path.resolve('.'),
    //   loaders: ['eslint']
    // }]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.SourceMapDevToolPlugin()
  ]
};

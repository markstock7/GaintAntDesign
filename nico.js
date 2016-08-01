var path = require('path');
var pkg = require('./package.json');
var webpack = require('webpack');
var ProgressPlugin = require('webpack/lib/ProgressPlugin');
var inspect = require('util').inspect;
var Busboy = require('busboy');
var chalk = require('chalk');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('./webpack.deploy.config');
var webpackCompiler = webpack(webpackConfig);
var handler;

// 统计加载进度
webpackCompiler.apply(new ProgressPlugin((percentage, msg) => {
  var stream = process.stderr;
  if (stream.isTTY && percentage < 0.71) {
    stream.cursorTo(0);
    stream.write('📦  ' + chalk.magenta(msg));
    stream.clearLine(1);
  } else if (percentage === 1) {
    console.log(chalk.green('\nwebpack: bundle build is now finished.'));
  }
}));

// settings for nico
exports.site = {
  name: pkg.title,
  description: pkg.description,
  repo: pkg.repository.url
};

// PRODUCTION
if (process.env.NODE_ENV === 'PRODUCTION') {
  exports.minimized = '.min';
} else {
  exports.minimized = '';
}

exports.package = pkg;
exports.theme = 'site';
exports.source = process.cwd();
exports.output = path.join(process.cwd(), '_site');
exports.permalink = '{{directory}}/{{filename}}';
exports.giuiCssUrl = '../dist/' + pkg.name + '-' + pkg.version + exports.minimized + '.css';
exports.giuiJsUrl = '../dist/' + pkg.name + '-' + pkg.version + exports.minimized + '.js';

exports.ignorefilter = (filepath, subdir) => {
  var extname = path.extname(filepath);
  if (extname === '.tmp' || extname === '.bak') {
    return false;
  }
  if (/\.DS_Store/.test(filepath)) {
    return false;
  }
  if (/^(_site|_theme|node_modules|site|\.idea)/.test(subdir)) {
    return false;
  }
  return true;
};
exports.middlewares = [{
  name: 'upload',
  filter: /upload\.do?$/,
  handle: (req, res) => {
    var busboy;
    if (req.method === 'POST') {
      busboy = new Busboy({
        headers: req.headers
      });
      busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
        file.on('data', (data) => {
          console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        });
        file.on('end', () => {
          console.log('File [' + fieldname + '] Finished');
        });
      });
      busboy.on('field', (fieldname, val) => {
        console.log('Field [' + fieldname + ']: value: ' + inspect(val));
      });
      busboy.on('finish', () => {
        console.log('Done parsing form!');
        // res.writeHead(303, { Connection: 'close', Location: '/' });
        res.end(JSON.stringify({
          status: 'success',
          url: '/example.file'
        }));
      });
      req.pipe(busboy);
    }
  }
}, {
  name: 'webpackDevMiddleware',
  filter: /\.(js|css)(\.map)?$/,
  handle: (req, res, next) => {
    handler = handler || webpackMiddleware(webpackCompiler, {
      publicPath: '/dist/',
      lazy: false,
      watchOptions: {
        aggregateTimeout: 300,
        poll: true
      },
      noInfo: true
    });
    try {
      return handler(req, res, next);
    } catch (e) {
      return null;
    }
  }
}];

exports.writers = [
  'nico-jsx.PageWriter',
  'nico-jsx.StaticWriter',
  'nico-jsx.FileWriter'
];

process.on('uncaughtException', (err) => {
  console.log(err);
});

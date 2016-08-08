var fs = require('fs');
var path = require('path');
// var _ = require('lodash');
// var rimraf = require('rimraf');
var file = module.exports = {};

/**
 * 将路径标准化
 */
function unixifyPath(filepath) {
  if (process.platform === 'win32') {
    return filepath.replace(/\\/g, '/');
  }
  return filepath;
}

file.isroot = function _isroot(str) {
  if (process.platform === 'win32') {
    return path.normalize(str).slice(1, 3) === ':\\';
  }
  return str.charAt(0) === '/';
};

/**
 * 获取目录的绝对路径
 */
file.abspath = function _abspath(str) {
  if (!file.isroot(str)) {
    return path.normalize(path.join(process.cwd(), path.normalize(str)));
  }
  return str;
};

/**
 * 检查文件是否存在
 */
file.exists = function _exists(filepath) {
  return fs.existsSync(filepath);
};

/**
 * 检查当前路径是否包含filepath
 */
file.contain = function _contain(base, filepath) {
  return path.resolve(base).indexOf(path.resolve(filepath)) === 0;
};

/**
 * 递归便利文件夹
 * @param dir {String}
 * @param callback {Function}
 * @param filter {Function}
 */
file.recurse = function recurse(dir, callback, filter) {
  var abspath = file.abspath(dir);
  fs.readdirSync(abspath).forEach(function each(filename) {
    var filepath = path.join(abspath, filename);
    if (!fs.existsSync(filepath)) {
      return;
    }

    if (fs.statSync(filepath).isDirectory()) {
      recurse(filepath, callback, filter);
    } else {
      if (filter && !filter(filepath, filename)) {
        return;
      }
      callback(unixifyPath(filepath), filename);
    }
  });
};

/**
 * 列出某个目录下的所有文件
 */
file.list = function _list(src, filter) {
  var files = [];
  file.recurse(src, function _getFile(filepath) {
    files.push(filepath);
  }, filter);
  return files;
};

file.read = function _read(filepath) {
  var content = fs.readFileSync(filepath);
  if (content.charAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
};

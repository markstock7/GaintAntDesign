// var path = require('path');
// var _ = require('underscore');
// var uuid = require('uuid');
var chalk = require('chalk');
var files = require('../lib/files');
var allFiles = null;
 /**
  * 具有缓存功能，每一篇markdown均有一个hashcode
  */
function BaseWriter() {}

BaseWriter.prototype.render = function _render(data) {
  console.log(data);
};

BaseWriter.prototype.mdFilter = function _mdFilter(filepath) {
  return filepath.indexOf('.md') === (filepath.length - 3);
};

/**
 * 加载所有的markdown文件
 */
BaseWriter.prototype.loadMarkdown = function _loadMarkdown() {
  allFiles = allFiles || files.list('src/', this.mdFilter);
  return allFiles;
};

/**
 * 初始化writer，并尝试加载所有的md文件
 */
BaseWriter.prototype.init = function _init() {
  console.log(chalk.green('load', this.constructor.name));
  if (this.loadMarkdown) {
    this.loadMarkdown();
  }
  return this;
};

module.exports = BaseWriter;

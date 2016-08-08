var BaseWriter = require('./base');
var _ = require('lodash');

/**
 *
 *
 */
function PostWriter() {}

/**
 * 加载所有的markdown文件
 *
 */
PostWriter.prototype.loadMarkdown = function _loadMarkdown(basepath) {
};

_.extend(PostWriter.prototype, BaseWriter.prototype);

export default PostWriter;

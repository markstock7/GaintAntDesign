/**
 * 解析出所有的文档，并存储在window.GDOC中
 *
 */
var BaseWriter = require('./writers/base');
var basewriter = new BaseWriter();
console.log(basewriter.loadMarkdown());

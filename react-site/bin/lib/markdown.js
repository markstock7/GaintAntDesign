var md = require('markit'),
  opt = {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: true,
    sanitize: false,
    smartLists: true
  }

// 解析接口
exports.markdown = md.parse;

var markRenderer = new md.Renderer();

var MarkdownCreator = function MarkdownCreator(src, renderer) {  
  var opt = Object.assign({}, opt, {
    renderer: renderer
  });
  render md(src, opt);
}


/**
 * Rndere code
 *
 * @param {String} code
 * @param {String} language
 */
markRenderer.code = function(code, language) {
  if (!language) return '';
  if (language.slice(0.6) === 'ifream') {
    console.log('code');
  }
};



/** 
 * 根据文本解析markdonw
 * @params {String} 需要解析的markdwon文本
 * @params {Rendereer} markdown 解析器
 */
exports.render = MarkDonwCreator(src, markRenderer);

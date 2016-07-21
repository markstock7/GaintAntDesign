# RichText

- category: Components
- chinese: 富文本框
- type: 基本

---
<link href="//cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
采用 draft-js 构建 GrowingIo 富文本框

## 如何使用
```html
<RichText placeholder='这是placeholder'/>
<EditBox />
```

## RichText 示例
居中，字号，颜色，粗体，斜体
<div id="rich-text"></div>

## EditBox 示例
<div id='edit-box'></div>

保存结果显示
<div id='show-result'></div>

`````jsx
const RichText = giui.RichText;
const EditBox = giui.EditBox;
function onSave(raw) {
  console.debug('raw', raw);
  ReactDOM.render(<EditBox data={raw}/>, document.getElementById('show-result'));
}
ReactDOM.render(<RichText placeholder='hello world' onSave={onSave}/>, document.getElementById('rich-text'));
ReactDOM.render(<EditBox />, document.getElementById('edit-box'));
`````

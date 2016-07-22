# RichText

- category: Components
- chinese: 富文本框
- type: 基本

---
<link href="//cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
采用 draft-js 构建 GrowingIo 富文本框

## 如何使用
```html
<RichEditor placeholder='这是placeholder'/>
<ViewBox data={raw} />
```

## RichEditor 示例
居中，字号，颜色，粗体，斜体
<div id="rich-editor"></div>


## ViewBox 显示，点击RichEditor保存后显示
<div id='view-box'></div>

`````jsx
const RichEditor = giui.RichEditor;
const ViewBox = RichEditor.ViewBox;
function onSave(raw) {
  clearViewBox();
  ReactDOM.render(<ViewBox data={raw}/>, document.getElementById('view-box'));
}

function clearViewBox() {
  var viewBox = document.getElementById("view-box");
  var childs = viewBox.childNodes;
  for(var i = 0; i < childs.length; i++) {
    viewBox.removeChild(childs[i]);
  }   
}
ReactDOM.render(<RichEditor placeholder='hello world' onSave={onSave}/>, document.getElementById('rich-editor'));
`````

# RichEditor

- category: Components
- chinese: 富文本框
- type: 文本编辑与显示

---
<link href="//cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
采用 draft-js 构建 GrowingIo 富文本框

## 如何使用
```html
raw 为RawDraftContentState 类型数据， 详情查看(http://facebook.github.io/draft-js/docs/api-reference-data-conversion.html#content)
<RichEditor placeholder='这是placeholder' onSave={(raw) => {}}/>
<ViewBox data={raw} />
```

## RichEditor 示例
<div id="rich-editor"></div>


## ViewBox 显示，点击RichEditor保存后显示
<div id='view-box'></div>

## EditableWhiteBoard
<div id='edit-white-borad'></div>

`````jsx
const RichEditor = giui.RichEditor;
const ViewBox = RichEditor.ViewBox;
const EditableWhiteBoard = RichEditor.EditableWhiteBoard;
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
ReactDOM.render(<EditableWhiteBoard />, document.getElementById('edit-white-borad'));
`````

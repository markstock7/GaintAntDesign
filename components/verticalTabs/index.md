# VerticalTabs

- category: Components
- chinese: 垂直面板
- type: 基本

---
<link href="//cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
GrowingIo 最值面板

## 如何使用
```html
<VerticalTabs defaultKey='1'>
  <VerticalTabPane key='1' iconType='audit' name='看板一'>
    <Menu>
      <Menu.Item>菜单项</Menu.Item>
      <Menu.Item>菜单项</Menu.Item>
      <Menu.Item>菜单项</Menu.Item>
    </Menu>
  </VerticalTabPane>
  <VerticalTabPane key='2' iconType='audit' name='看板二'></VerticalTabPane>
  <VerticalTabPane key='3' iconType='audit' name='看板三'></VerticalTabPane>
</VerticalTabs>
```

## 垂直面板 示例
<div id="verticalTabs"></div>
<style>
</style>

`````jsx
const BubbleMenu = giui.BubbleMenu;
const BubbleMenuItem = BubbleMenu.BubbleMenuItem;
const VerticalTabs = giui.VerticalTabs;
const VerticalTabPane = VerticalTabs.VerticalTabPane;

ReactDOM.render(
  <BubbleMenu defaultKey='1'>
    <BubbleMenuItem key='1' iconType='audit' name='看板一'>
      <VerticalTabs>
        <VerticalTabPane />
        <VerticalTabPane />
        <VerticalTabPane />
        <VerticalTabPane />
      </VerticalTabs>
    </BubbleMenuItem>
    <BubbleMenuItem key='2' iconType='audit' name='看板二' />
    <BubbleMenuItem key='3' iconType='audit' name='看板三' />
  </BubbleMenu>, document.getElementById('verticalTabs'));
`````

# BubbleMenu

- category: Components
- chinese: 气泡目录
- type: 基本

---
<link href="//cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
GrowingIo 最值面板

## 如何使用
```html
<BubbleMenu defaultKey='1'>
  <BubbleMenuItem key='1' iconType='audit' name='看板一'>
  </BubbleMenuItem>
  <BubbleMenuItem key='2' iconType='audit' name='看板二' />
  <BubbleMenuItem key='3' iconType='audit' name='看板三' />
</BubbleMenu>
```

## API
- selectedKey
- onItemOpen
- onItemClose
- _close_items


## 垂直面板 示例
<div id="BubbleMenu"></div>
<style>
  .template-panel header{
    font-size: 14px;
    padding: 6px;
    font-weight: bold;
  }
</style>

`````jsx
const BubbleMenu = giui.BubbleMenu;
const BubbleMenuItem = BubbleMenu.BubbleMenuItem;
const VerticalTabs = giui.VerticalTabs;
const VerticalTabPane = VerticalTabs.VerticalTabPane;

function handlePaneClose() {

}

ReactDOM.render(
  <BubbleMenu defaultKey='1'>
    <BubbleMenuItem key='1' iconType='audit' name='看板一'>
      <VerticalTabs defaultKey='1' width='400' >
        <VerticalTabPane key='1' label='Tab1'>
          <div className='template-panel'>
            <header>
              互联网金融模版
            </header>
          </div>
        </VerticalTabPane>
        <VerticalTabPane key='2' label='Tab2'>
          <div className='template-panel'>
            <header>
              互联网金融模版
            </header>
          </div>
        </VerticalTabPane>
        <VerticalTabPane key='3' label='Tab3'>
          <div className='template-panel'>
            <header>
              互联网金融模版
            </header>
          </div>
        </VerticalTabPane>
      </VerticalTabs>
    </BubbleMenuItem>
  </BubbleMenu>, document.getElementById('BubbleMenu'));
`````

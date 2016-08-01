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
  <BubbleMenuItem key='1' iconType='meh' name='我是看板一'>
    <div className='pane1 pane'>
      高性能移动Web相较PC的场景需要考虑的因素也相对更多更复杂，我们总结为以下几点： 流量、功耗与流畅度。 在PC时代我们更多的是考虑体验上的流畅度，而在Mobile端本身丰富的场景下，需要额外关注对用户基站网络流量使用的情况，设备耗电量的情况。
    </div>
  </BubbleMenuItem>
  <BubbleMenuItem key='2' iconType='team' name='我是看板二'>
    <div className='pane2 pane'>
      关于流畅度，主要体现在前端动画中，在现有的前端动画体系中，通常有两种模式：JS动画与CSS3动画。 JS动画是通过JS动态改写样式实现动画能力的一种方案，在PC端兼容低端浏览器中不失为一种推荐方案。
    </div>
  </BubbleMenuItem>
  <BubbleMenuItem key='3' iconType='windows' name='我是看板三'>
    <div className='pane3 pane'>
      而在移动端，我们选择性能更优浏览器原生实现方案：CSS3动画。
      然而，CSS3动画在移动多终端设备场景下，相比PC会面对更多的性能问题，主要体现在动画的卡顿与闪烁。
    </div>
  </BubbleMenuItem>
</BubbleMenu>
```

### BubbleMenu props

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| defaultKey   | 默认选中项目 | (String Or Number)   |  |
| onItemOpen   | 当其中一个item被打开时，会传递当前item的key给函数 | Function | null |
| onItemClose   | 当其中一个item被关闭时，会传递当前item的key给函数 | Function | null |
| _close_items   | 隐藏参数，当将这个值设置为true的时候，会触发关闭操作，可用于在menu外部自定义关闭按钮, 记得需要调用e.stopPropagation() 来防止关闭后触发item click又重新打开 | Boolean | - |


### BubbleMenuItem props

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| key   | 当前item的key值 | (String Or Number)   |  |
| iconType   | 当前item的图标类型，此属性必须和为Icon类型的type | String Or React.Component | null |
| name   | 当前item的名称 | String | '' |

## 垂直面板 示例
<div id="BubbleMenu"></div>
<style>
  .template-panel header{

  }
  .pane {
    padding: 10px 10px 10px 20px;
    color: #fff;
  }
</style>

`````jsx
const BubbleMenu = giui.BubbleMenu;
const BubbleMenuItem = BubbleMenu.BubbleMenuItem;
const VerticalTabs = giui.VerticalTabs;
const VerticalTabPane = VerticalTabs.VerticalTabPane;
const Icon = giui.GIcon;

ReactDOM.render(
  <BubbleMenu defaultKey='1'>
    <BubbleMenuItem key='1' iconType={<Icon type="meh" />} name='我是看板一'>
      <div className='pane1 pane'>
        高性能移动Web相较PC的场景需要考虑的因素也相对更多更复杂，我们总结为以下几点： 流量、功耗与流畅度。 在PC时代我们更多的是考虑体验上的流畅度，而在Mobile端本身丰富的场景下，需要额外关注对用户基站网络流量使用的情况，设备耗电量的情况。
      </div>
    </BubbleMenuItem>
    <BubbleMenuItem key='2' iconType='team' name='我是看板二'>
      <div className='pane2 pane'>
        关于流畅度，主要体现在前端动画中，在现有的前端动画体系中，通常有两种模式：JS动画与CSS3动画。 JS动画是通过JS动态改写样式实现动画能力的一种方案，在PC端兼容低端浏览器中不失为一种推荐方案。
      </div>
    </BubbleMenuItem>
    <BubbleMenuItem key='3' iconType='windows' name='我是看板三'>
      <div className='pane3 pane'>
        而在移动端，我们选择性能更优浏览器原生实现方案：CSS3动画。
        然而，CSS3动画在移动多终端设备场景下，相比PC会面对更多的性能问题，主要体现在动画的卡顿与闪烁。
      </div>
    </BubbleMenuItem>
  </BubbleMenu>, document.getElementById('BubbleMenu'));
`````

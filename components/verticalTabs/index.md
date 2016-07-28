# VerticalTabs

- category: Components
- chinese: 垂直面板
- type: 基本

---
## TODO
- <font color='red' style='background: #FFFF66'>增加type属性，支持多个显示样式</font>
- <font color='red' style='background: #FFFF66'>增加onEdit属性，支持用户增加和删除tab的功能</font>


## 如何使用
```html
<VerticalTabs defaultKey='1'>
  <VerticalTabPane key='1' label='面板一' >
    <div className='tab'>
      React 是 React 库的入口。如果使用的是预编译包，则 React 是全局的；如果使用 CommonJS 模块系统，则可以用 require() 函数引入 React。
    </div>
  </VerticalTabPane>
  <VerticalTabPane key='2' label='面板二' >
    <div className='tab'>
      My name is Lea Verou (Lea being short for Michailia or Μιχαήλια) and I’m a computer scientist / web standards geek / front-end developer / web designer / speaker / author,  originally from Greece. I’m currently a Research Assistant at MIT CSAIL, in David Karger’s Haystack group and an Invited Expert in the W3C CSS Working Group.
    </div>
  </VerticalTabPane>
  <VerticalTabPane key='3' label='面板三' >
    <div className='tab'>
      To find out more about me in a more formal and unavoidably braggy format:
    </div>
  </VerticalTabPane>
  <VerticalTabPane key='4' label='面板四' >
    <div className='tab'>
      创建一个组件类，并作出定义。组件实现了 render() 方法，该方法返回一个子级。该子级可能包含很深的子级结构。组件与标准原型类的不同之处在于，你不需要使用 new 来实例化。 组件是一种很方便的封装，可以（通过 new ）为你创建后台实例。
    </div>
  </VerticalTabPane>
</VerticalTabs>
```

### VerticalTabs Props

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| defaultKey   | 默认选中项目 | (String Or Number)   |  |
| onTabClick   | tab 被点击的回调 | Function | 无 |
| type   | 标签页的样式 | Function | 无 |
| width   | 宽度 | (String Or Number) | 自适应 |

### VerticalTabPane Props

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| key   | 每一个tab的key值 | String Or Number   |  |
| label   | 选项卡头显示文字| React.Element or String | 无 |

## 垂直面板 示例
<div id="verticalTabs"></div>
<style>
  .tab {
    padding: 10px;
  }
</style>

`````jsx
const VerticalTabs = giui.VerticalTabs;
const VerticalTabPane = VerticalTabs.VerticalTabPane;

ReactDOM.render(
  <VerticalTabs defaultKey='1'>
    <VerticalTabPane key='1' label='面板一' >
      <div className='tab'>
        React 是 React 库的入口。如果使用的是预编译包，则 React 是全局的；如果使用 CommonJS 模块系统，则可以用 require() 函数引入 React。
      </div>
    </VerticalTabPane>
    <VerticalTabPane key='2' label='面板二' >
      <div className='tab'>
        My name is Lea Verou (Lea being short for Michailia or Μιχαήλια) and I’m a computer scientist / web standards geek / front-end developer / web designer / speaker / author,  originally from Greece. I’m currently a Research Assistant at MIT CSAIL, in David Karger’s Haystack group and an Invited Expert in the W3C CSS Working Group.
      </div>
    </VerticalTabPane>
    <VerticalTabPane key='3' label='面板三' >
      <div className='tab'>
        To find out more about me in a more formal and unavoidably braggy format:
      </div>
    </VerticalTabPane>
    <VerticalTabPane key='4' label='面板四' >
      <div className='tab'>
        创建一个组件类，并作出定义。组件实现了 render() 方法，该方法返回一个子级。该子级可能包含很深的子级结构。组件与标准原型类的不同之处在于，你不需要使用 new 来实例化。 组件是一种很方便的封装，可以（通过 new ）为你创建后台实例。
      </div>
    </VerticalTabPane>
  </VerticalTabs>
  , document.getElementById('verticalTabs'));
`````

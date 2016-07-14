# Icon

- category: Components
- chinese: 图标
- type: 基本

---

采用 iconfont 和 svg 构建图标
- 公司自定义的svg图标均放在icons目录下
- 文件命名规则为`[icon名]-[形状可选]-[描线与否]-[方向可选].svg`

## 图标的命名规范

我们为每个图标赋予了语义化的命名，命名规则如下:

- 实心和描线图标保持同名，用 `-o` 来区分，比如 `question-circle`(实心) 和 `question-circle-o`(描线)；

- 命名顺序：`[icon名]-[形状可选]-[描线与否]-[方向可选]`。

## 如何使用

使用 `<Icon />` 标签声明组件，指定图标对应的 type 属性，示例代码如下:

```html
<Icon type="link" />
```

最终会渲染为：

```html
<i class="anticon anticon-${type}"></i>
```

## 图标列表

> 点击图标复制代码。

### 一. 方向性图标

<div id="iconset-direction"></div>

### 二. 提示建议性图标

<div id="iconset-hint"></div>

### 三. 网站通用图标

<div id="iconset-common"></div>

<style>
ul.anticons-list {
  margin: 20px 0;
  list-style: none;
  width: 120%;
  overflow: hidden;
}
ul.anticons-list li {
  float: left;
  margin: 5px 5px 5px 0;
  width: 155px;
  text-align: center;
  list-style: none;
  cursor: pointer;
  height: 110px;
  color: #5C6B77;
  transition: all 0.2s ease;
  position: relative;
  padding-top: 10px;
}
ul.anticons-list li:hover {
  background-color: #4BB8FF;
  color: #fff;
  border-radius: 4px;
}
ul.anticons-list li.copied:hover {
  color: rgba(255,255,255,0.2);
}
ul.anticons-list li:after {
  position: absolute;
  top: 10px;
  left: 0;
  height: 100%;
  width: 100%;
  content: "Copied!";
  text-align: center;
  line-height: 110px;
  color: #fff;
  transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  opacity: 0;
}
ul.anticons-list li.copied:after {
  opacity: 1;
  top: 0;
}
.anticon {
  font-size: 26px;
  margin: 12px 0 16px;
}
.anticon-class {
  display: block;
  text-align: center;
  word-wrap: break-word;
  transform: scale(0.83);
  font-family: Consolas;
}
</style>

`````jsx
const Icon = giui.GIcon;
console.debug(Icon);
const CopyableIcon = React.createClass({
  getInitialState() {
    return {
      justCopied: false
    };
  },
  onCopied(e) {
    this.setState({ justCopied: true }, () => {
      setTimeout(() => {
        this.setState({ justCopied: false });
      }, 1000);
    });
  },
  getCopyCode(type) {
    return '<Icon type="' + type + '" />';
  },
  render() {
    return (
      <Clip component="li" data-clipboard-text={this.getCopyCode(this.props.type)}
        onSuccess={this.onCopied} className={this.state.justCopied ? 'copied' : ''}>
        <Icon type={this.props.type} />
        <span className="anticon-class">{this.props.type}</span>
      </Clip>
    );
  }
});

const IconSet = React.createClass({
  getDefaultProps() {
    return {
      icons: []
    };
  },
  render() {
    return (
      <ul className="anticons-list clearfix">
        {this.props.icons.map((type, i) => <CopyableIcon key={i} type={type} />)}
      </ul>
    );
  }
});

const icons = ['face', 'phone', 'help', 'heatmap-mode'];

ReactDOM.render(<IconSet icons={icons} />, document.getElementById('iconset-common'));
`````

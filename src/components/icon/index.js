import React, { Component } from 'react';

// 加载ant-design Icon Component
import { Icon as AntdIcon } from 'antd';

var icons = [];

// 此处的键值和 icons目录中的文件名 一一对应
const iconsMap = {};

export default class Icon extends Component {
  render() {
    let { size = 1, type, className = '', ...other } = this.props;
    if (icons.indexOf(type) === -1) {
      return (<AntdIcon {...this.props} />);
    }
    if (!iconsMap[type]) {
      iconsMap[type] = require(`../../icons/${type}.svg`);
    }
    // 默认优先使用自定义的icons
    className += ` gi-icon gi-icon-${type} gi-icon-${size}x`;

    return (
      <svg {...other} className={className} dangerouslySetInnerHTML={{ __html: '<use xlink:href="' + iconsMap[type] + '"></use>' }} />
    );
  }
}

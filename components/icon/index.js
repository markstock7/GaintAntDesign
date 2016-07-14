import React from 'react';
// 加载ant-design Icon Component
import { Icon as AntdIcon } from 'antd';

// 此处的键值和 icons目录中的文件名 一一对应
const icons = {
  face: require('./icons/face.svg'),
  phone: require('./icons/phone.svg'),
  help: require('./icons/help.svg'),
  "heatmap-mode": require('./icons/heatmap-mode.svg')
};

export default class Icon {
  render() {
    let { type, className = '', ...other } = this.props;
    // 默认优先使用自定义的icons
    className += ' svg-icon';
    return (
      <svg {...other} className={className} dangerouslySetInnerHTML={{__html: '<use xlink:href="' + icons[type] + '"></use>'}}/>
    );
  }
}

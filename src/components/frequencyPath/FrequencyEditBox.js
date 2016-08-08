/**
 * 频繁路径编辑框，用来生成漏斗
 * visiable
 */

import React                      from 'react';
import VerticalFrequencyPath      from './VerticalFrequencyPath';
import Button                     from 'antd/lib/button';
const FrequencyEditBox = React.createClass({
  statics: {
    __FrequencyEditBox__: true
  },

  render() {
    return (
      <div className={`path-edit-c ${this.props.visiable ? 'active' : ''}`}>
        <div className='header-panel'></div>
        <VerticalFrequencyPath path={this.props.path} changeHighlightingNode={this.props.changeHighlightingNode} highlightingNode={this.props.highlightingNode} />
        <div className='footer-panel'>
          <p className='hint'>(回溯时间通常为数小时)<br />由于指标的新建，数据正在回溯过程中，请那心耐心等待。</p>
          <Button type='primary'>保存方案至漏斗</Button>
        </div>
      </div>
    );
  }
});
export default FrequencyEditBox;

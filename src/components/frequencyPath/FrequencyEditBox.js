/**
 * 每个频繁路径的编辑框
 * FrequencyEditBox Props
 *
 * path                   {Object}    路径的详细信息
 * visiable               {Boolean}   是否显示
 * pathIndex              {Int}       path的index
 * changeHighlightingNode {Function}  改变正在编辑的节点
 * highlightingNode       {Object}    正在编辑的节点
 */
import React                      from 'react';
import VerticalFrequencyPath      from './VerticalFrequencyPath';
import Button                     from 'antd/lib/button';
import FrequencyEditBoxHeader     from './FrequencyEditBoxHeader';

var PropTypes = React.PropTypes;
const FrequencyEditBox = React.createClass({
  statics: {
    __FrequencyEditBox__: true
  },

  propTypes: {
    visiable: PropTypes.bool,
    pathIndex: PropTypes.number.isRequired,
    path: PropTypes.object.isRequired,
    highlightingNode: PropTypes.object.isRequired,
    changeHighlightingNode: PropTypes.func.isRequired
  },

  render() {
    return (
      <div className={`path-edit-c ${this.props.visiable ? 'active' : ''}`}>
        <FrequencyEditBoxHeader />
        <VerticalFrequencyPath
          path={this.props.path}
          pathIndex={this.props.pathIndex}
          changeHighlightingNode={this.props.changeHighlightingNode}
          highlightingNode={this.props.highlightingNode}
        />
        <div className='footer-panel'>
          <p className='hint'>(回溯时间通常为数小时)<br />由于指标的新建，数据正在回溯过程中，请那心耐心等待。</p>
          <Button type='primary'>保存方案至漏斗</Button>
        </div>
      </div>
    );
  }
});
export default FrequencyEditBox;

/**
 * FrequencyPath Props
 *
 * path                     {Object}  当前路径的详细信息
 * index                    {Int}     当前路径的编号
 * editingPath              {Int}     当前正在编辑的path id
 * highlightingNode         {Object}  当强正在高亮的节点
 * changeCurrentEditingPath {Fn}      改变正在编辑的path
 * changeHighlightingNode   {Fn}      改变正在高亮的节点
 */
import React             from 'react';
import Button            from 'antd/lib/button';

import FrequencyPathNode from './FrequencyPathNode';
import FrequencyEditBox  from './FrequencyEditBox';

var PropTypes = React.PropTypes;
const FrequencyPath = React.createClass({
  statics: {
    __FrequencyPath__: true,
    prefixClass: 'gr_c-freq_path'
  },

  propTypes: {
    path: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    editingPath: PropTypes.number.isRequired,
    highlightingNode: PropTypes.object.isRequired,
    changeCurrentEditingPath: PropTypes.func.isRequired,
    changeHighlightingNode: PropTypes.func.isRequired
  },

  getInitialState() {
    return {};
  },

  /**
   * 生成 FrequencyPathNode 节点
   */
  _generateNode() {
    return this.props.path.items.map((item, index) => {
      return (
        <FrequencyPathNode
          node={item}
          index={index}
          key={index}
          pathIndex={this.props.index}
          changeHighlightingNode={this._changeHighlightingNode}
          highlightingNode={this.props.highlightingNode}
        />
      );
    });
  },

  /**
   * toggle 编辑框
   */
  _toggleEditBox() {
    if (this.props.index === this.props.editingPath) {
      this.props.changeCurrentEditingPath(-1);
    } else {
      this.props.changeCurrentEditingPath(this.props.index);
    }
    this.props.changeHighlightingNode(-1);
  },

  /**
   * 检查当前节点是否为编辑状态
   *
   * @param {Any} trueV 当为编辑状态时返回
   * @param {Any} falseV 当为关闭状态时返回
   */
  _checkIsEditing(trueV, falseV) {
    return this.props.index === this.props.editingPath ? trueV : falseV;
  },

  /**
   * 改变横向的节点高亮
   * @param nodeIndex {Int} node的节点号
   */
  _changeHighlightingNode(nodeIndex) {
    this.props.changeHighlightingNode(this.props.index, nodeIndex, 0);
  },

  /**
   * 改变纵向的节点高亮
   * @param nodeIndex {Int} node的节点号
   */
  _changeHighlightingVerticalNode(nodeIndex) {
    this.props.changeHighlightingNode(this.props.index, nodeIndex, 1);
  },

  render() {
    return (
      <div className={`${FrequencyPath.prefixClass}-container`}>
        <div className='path-view-c  clearfix'>
          <div className='path-info'>
            <div className='frequency'>
              <span>频繁度: {this.props.index}</span>
            </div>
            <div className='instr'>
              <p>{(parseFloat(this.props.path.freq) * 100).toFixed(0)}%的用户<br />通过这样的路径进行转换</p>
            </div>
          </div>
          {this._generateNode()}
          <div className='tool-bar'>
            <Button type='primary' disabled={this.props.editingPath > -1 && !this._checkIsEditing(true, false) ? 'disabled' : ''} onClick={this._toggleEditBox}>{this._checkIsEditing('取消', '保存漏斗')}</Button>
          </div>
        </div>
        <FrequencyEditBox
          path={this.props.path}
          pathIndex={this.props.index}
          highlightingNode={this.props.highlightingNode}
          visiable={this._checkIsEditing(true, false)}
          changeHighlightingNode={this._changeHighlightingVerticalNode}
        />
      </div>
    );
  }
});

export default FrequencyPath;

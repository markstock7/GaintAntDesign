  /**
 * FrequencyPath Props
 * path {Object}
 * index {Int}
 * editingPath {Int} 当前正在编辑的path id
 * openEditBox {Fn} 打开编辑窗口
 * closeEditBox {Fn} 关闭编辑窗口
 * changeHighlightingNode {Fn} 改变正在高亮的节点
 * highlightingNode {Object} 当强正在高亮的节点
 */
import React          from 'react';
import Button         from 'antd/lib/button';

import FrequencyPathNode from './FrequencyPathNode';
import FrequencyEditBox  from './FrequencyEditBox';

var PropTypes = React.PropTypes;
const FrequencyPath = React.createClass({
  statics: {
    __FrequencyPath__: true,
    prefixClass: 'gr_c-freq_path'
  },

  propTypes: {
    path: PropTypes.object,
    index: PropTypes.number,
    editingPath: PropTypes.number,
    openEditBox: PropTypes.func,
    closeEditBox: PropTypes.func
  },

  getInitialState() {
    return {
      // 正在编辑的节点
      editingNodeIndex: -1
    };
  },

  _generateNode() {
    return this.props.path.items.map((item, index) => {
      return (<FrequencyPathNode node={item} index={index} key={index} pathIndex={this.props.index} changeHighlightingNode={this._changeHighlightingNode} highlightingNode={this.props.highlightingNode} />);
    });
  },

  _toggleEditBox() {
    if (this.props.index === this.props.editingPath) {
      this.props.closeEditBox();
    } else {
      this.props.openEditBox(this.props.index);
    }
    this.props.changeHighlightingNode(-1);
  },

  _checkIsEditing(trueV, falseV) {
    return this.props.index === this.props.editingPath ? trueV : falseV;
  },

  /**
   * 改变正在高亮的节点
   * @param nodeIndex {Int} node的节点号
   * @param pathIndex {Int | NULL} 当不设置的时候为取消
   */
  _changeHighlightingNode(nodeIndex) {
    this.props.changeHighlightingNode(this.props.index, nodeIndex);
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
        <FrequencyEditBox visiable={this._checkIsEditing(true, false)} path={this.props.path} changeHighlightingNode={this._changeHighlightingNode} highlightingNode={this.props.highlightingNode} />
      </div>
    );
  }
});

export default FrequencyPath;

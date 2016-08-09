/**
 * 竖直频繁路径中的每个节点
 *
 * FrequencyPath Props
 *
 * node {Object}
 * index {Int}
 * total {Index}
 * pathIndex {Index}
 * changeHighlightingNode {Function}
 * highlightingNode {Object}
 *
 */

import React          from 'react';
import Icon           from 'antd/lib/icon';
import Popover        from 'antd/lib/popover';

var PropTypes = React.PropTypes;
const VerticalFrequencyPathNode = React.createClass({
  statics: {
    __FrequencyPathNode__: true
  },

  propTypes: {
    index: PropTypes.number.isRequired,
    node: PropTypes.object.isRequired,
    total: PropTypes.number.isRequired,
    pathIndex: PropTypes.number.isRequired,
    changeHighlightingNode: PropTypes.func.isRequired,
    highlightingNode: PropTypes.object.isRequired
  },

  getInitialState() {
    return { active: false  };
  },

  componentWillReceiveProps(nextProps) {
    var active = nextProps.highlightingNode.node === nextProps.index && nextProps.highlightingNode.path === nextProps.pathIndex && nextProps.highlightingNode.pos === 1;
    if (active !== this.state.active) {
      this.setState({ active });
    }
  },

  /**
   * 生成节点之间的链接
   */
  _generateNodeLinker() {
    if (this.props.index === (this.props.total - 1)) return null;
    return (
      <div className='node-linker'>
        <div className='line'></div>
      </div>
    );
  },

  /**
   * 将数字映射为汉字
   */
  _numToChinese(index) {
    var numMap = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
    return numMap[index];
  },

  _generateIcon(type) {
    switch (type) {
      case 'click':
        return (<Icon type='pushpin' />);
      case 'page':
        return (<Icon type='book' />);
      case 'text':
        return (<Icon type='edit' />);
      default:
        return null;
    }
  },

  // {this._generateNodeLinker()}
  _isFirstNode() {
    return this.props.index === 0 ? 'first' : '';
  },

  _isLastNode() {
    return this.props.index === (this.props.total - 1) ? 'last' : '';
  },

  /**
   * 生成节点详细信息tooltip
   * @param node {Object}
   */
  _generateTooltipContent(node) {
    return (
      <div className='event-info'>
        <div className='n-row'>
          <b className='t'>页面名称：</b><span>{node.name}</span>
        </div>
        <div className='n-row'>
          <b className='t'>步骤类型：</b><span>第{this._numToChinese(this.props.index)}步</span>
        </div>
        <div className='n-row'>
          <b className='t'>具体域名：</b><span>node.d</span>
        </div>
        <div className='n-row'>
          <b className='t'>标题样例：</b><span></span>
        </div>
        <div className='n-row'>
          <b className='t'>元素文本：</b><span></span>
        </div>
        <div className='separation'></div>
        <div className='screenshot'></div>
        <div className='createor'>mark stock 修改于：2015-23-01</div>
      </div>
    );
  },

  _generateTooltipHeader() {
    return (
      <div className='header'>步骤详情<Icon type='cross' className='icon' onClick={() => this.props.changeHighlightingNode(-1)} /></div>
    );
  },

  render() {
    var node = this.props.node;
    return (
      <div className='path-node'>
        <div className={`node-info-wrapper ${this._isLastNode()} ${this._isFirstNode()}`}>
          <div className='node-info'>
            <div className='name noevent' title={node.name}>
              <div className='node-name'>{node.name}</div>
              <div className='event-name'>指标名称: 暂时还木有<i className='anticon anticon-right'></i></div>
            </div>
            <Popover placement='rightTop' content={this._generateTooltipContent(node)} title={this._generateTooltipHeader()} trigger='click' overlayClassName='event-info-box' visible={this.state.active}>
              <div className={`node-icon ${this.state.active ? 'active highlight' : ''} ${node.t}`} onClick={() => this.props.changeHighlightingNode(this.props.index)}>
                {this._generateIcon(node.t)}
              </div>
            </Popover>
          </div>
          {this._generateNodeLinker()}
        </div>
        <div className={`node-value ${this._isLastNode()} ${this._isFirstNode()}`}>
          <div className='inner'></div>
          <p className='value'>123,121</p>
        </div>
      </div>
    );
  }
});

export default VerticalFrequencyPathNode;

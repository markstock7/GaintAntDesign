/**
 * 每个频繁路径中的一个节点
 *
 * FrequencyPath Props
 * node {Object} 节点的信息
 * index {Int} 编号
 * pathIndex {Int} path的index
 * changeHighlightingNode {Function} 改变正在编辑的节点
 * highlightingNode {Object} 正在编辑的节点
 */
import React          from 'react';
import Icon           from 'antd/lib/icon';
import Popover        from 'antd/lib/popover';

var PropTypes = React.PropTypes;
const FrequencyPathNode = React.createClass({
  statics: {
    __FrequencyPathNode__: true
  },

  propTypes: {
    index: PropTypes.number,
    node: PropTypes.object,
    pathIndex: PropTypes.number,
    changeHighlightingNode: PropTypes.func,
    highlightingNode: PropTypes.object
  },

  getInitialState() {
    return {
      // 正在编辑的节点
      active: false
    };
  },

  componentWillReceiveProps(nextProps) {
    var active = nextProps.highlightingNode.node === nextProps.index && nextProps.highlightingNode.path === nextProps.pathIndex;
    if (active !== this.state.active) {
      this.setState({ active });
    }
  },

  /**
   * 将数字映射为汉字
   */
  _numToChinese(index) {
    var numMap = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
    return numMap[index];
  },

  /**
   * 生成节点之间的链接
   */
  _generateNode() {
    if (this.props.index === 0) return null;
    return (
      <div className='node-linker'>
        <div className='line'></div>
        <div className='icon'>
          <Icon type='arrow-right' />
        </div>
      </div>
    );
  },


  /**
   * 根据节点的类型，来选择合适的图标
   * @param type {String}
   */
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
      <div className='header'>步骤详情<Icon type='cross' className='icon' onClick={() => this._changeHighlightingNode(-1)} /></div>
    );
  },

  _changeHighlightingNode(nodeIndex) {
    this.props.changeHighlightingNode(nodeIndex);
  },

  render() {
    var node = this.props.node;
    return (
      <div className='path-node'>
        {this._generateNode()}
        <div className='node-info'>
          <div className='name' title={node.name}>{node.name}</div>
          <Popover placement='leftTop' content={this._generateTooltipContent(node)} title={this._generateTooltipHeader()} trigger='click' overlayClassName='event-info-box' visible={this.state.active}>
            <div className={`node-icon ${this.state.active ? 'active highlight' : ''} ${node.t}`} onClick={() => this._changeHighlightingNode(this.props.index)}>
              {this._generateIcon(node.t)}
            </div>
          </Popover>
          <div className='step'>第{this._numToChinese(this.props.index)}步</div>
        </div>
      </div>
    );
  }
});

export default FrequencyPathNode;

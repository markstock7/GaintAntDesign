'use strict';

/**
 * 设计: 大丹
 * 实现: Mark Stock
 *
 */
import React from 'react';
import Icon from '../icon';

var PropTypes = React.PropTypes,
    BubbleMenuItem;

BubbleMenuItem = React.createClass({
  statics: {
    __BubbleMenuItem__: true
  },

  /**
   * 默认为关闭状态，鼠标经过后进入hover状态，点击为open状态
   */
  getInitialState() {
    return { status: 'expand' };
  },

  propTypes: {
    name: PropTypes.string,
    iconType: React.PropTypes.node,
    enableHover: PropTypes.bool,
    selectedKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedKey !== this.props._key) {
      this.setState({
        status: 'collapse'
      });
    }
  },

  _handleClick(e) {
    e.stopPropagation();
    this.setState({
      status: 'open'
    }, () => {
      if (this.props.handlePaneOpen) {
        this.props.handlePaneOpen(this.props._key);
      }
    });
  },

  _changeStatus(status) {
    if (this.props.enableHover && this.state.status !== 'open') {
      this.setState({status});
    }
  },

  _handleMouseEnter(e) {
    e.stopPropagation();
    this._changeStatus('expand');
  },

  _handleMouseLeave(e) {
    e.stopPropagation();
    this._changeStatus('collapse');
  },

  render() {
    return (
      <div role='tab'
        className={`gui-bubble-menu ${this.state.status}`}
        style={{zIndex: `${this.props_index}`}}
        onClick={this._handleClick}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave} >
        <div className='gui-bubble-menu-brife'>
          <div className='icon'>
            {this.props.iconType}
          </div>
          <div className='name'>{this.props.name}</div>
        </div>
        <div className='gui-bubble-menu-inner clearfix'>
          <div className='circle'>
            <div className='circle-inner'></div>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
});

export default BubbleMenuItem;

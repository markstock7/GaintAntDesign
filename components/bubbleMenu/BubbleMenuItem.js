'use strict';

/**
 * 设计: 大丹
 * 实现: markstock7
 *
 */
import React from 'react';
import Icon from '../icon';

var ReactChildren = React.Children;

// var PropTypes = React.PropTypes;

var BubbleMenuItem = React.createClass({
  statics: {
    __BubbleMenuItem__: true
  },

  getInitialState() {
    /**
     * 默认为关闭状态，鼠标经过后进入hover状态，点击为open状态
     */
    var state = {
      status: 'expand'
    };
    return state;
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedKey !== this.props._key) {
      this.setState({
        status: 'close'
      });
    }
  },

  _handleClick(e) {
    e.stopPropagation();
    this.setState({
      status: 'open'
    }, () => {
      if (this.props.handleClick) {
        this.props.handleClick(this.props._key);
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
        className={`gui-bubble-menu large ${this.state.status}`}
        style={{zIndex: `${this.props_index}`}}
        onClick={this._handleClick}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}>
        <div className='gui-bubble-menu-brife'>
          <div className='icon'><Icon type={this.props.iconType} /></div>
          <div className='name'>{this.props.name}</div>
        </div>
        <div className='gui-bubble-menu-inner clearfix'>
          <div className='circle'>
            <div className='circle-inner'></div>
          </div>
          <button onClick={this.props.handlePanelClose}>close</button>
          {this.props.children}
        </div>
      </div>
    );
  }
});

export default BubbleMenuItem;

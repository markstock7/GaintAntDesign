'use strict';

/**
 * 设计: 大丹
 * 实现: markstock7
 *
 */
import React from 'react';

var VerticalTabsPane = React.createClass({
  statics: {
    __VerticalTabsPane__: true
  },

  getInitialState() {
    /**
     * 默认为关闭状态，鼠标经过后进入hover状态，点击为open状态
     */
    var state = {
      active: this.props.selectedKey === this.props._key
    };
    return state;
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      active : nextProps.selectedKey === this.props._key
    });
  },

  _handleClick(e) {
    e.stopPropagation();
    this.setState({
      active: true
    }, () => {
      if (this.props.handleClick) {
        this.props.handleClick(this.props._key);
      }
    });
  },

  render() {
    return (
      <div className={`gui-vertical-tab ${this.state.active ? 'active' : ''}`} onClick={this._handleClick}>
        <span>{this.props.label}</span>
      </div>
    );
  }
});

export default VerticalTabsPane;

'use strict';

/**
 * 设计: 大丹
 * 实现: markstock7
 *
 */
import React from 'react';
import VerticalTabPane from './VerticalTabPane';
var ReactChildren = React.Children, VerticalTabs;

VerticalTabs = React.createClass({
  statics: {
    __VerticalTabs__: true
  },

  getInitialState() {
    /**
     * 默认为关闭状态，鼠标经过后进入hover状态，点击为open状态
     */
    var state = {
      selectedKey: this.props.defaultKey,
      currentContent: null
    };
    return state;
  },

  _handleClick(e) {
    e.stopPropagation();
  },

  _handleMouseEnter(e) {
    e.stopPropagation();
  },

  _handleMouseLeave(e) {
    e.stopPropagation();
  },

  _handlePaneClick(key) {
    this.setState({
      selectedKey: key
    });
  },

  _transformPane() {
    var index = 0;
    return ReactChildren.map(this.props.children, (child) => {
      if (child.type.__VerticalTabsPane__) {
        if (!child.props.handleClick) {
          return <VerticalTabPane {...child.props} handleClick={this._handlePaneClick} _key={child.key} _index={index++} selectedKey={this.state.selectedKey} />;
        }
        return child;
      }
      return null;
    });
  },

  _currentPaneContent() {
    return ReactChildren.map(this.props.children, (child) => {
      if (child.key === this.state.selectedKey)
        return child.props.children;
      return null;
    })
  },

  render() {
    return (
      <div className='gui-vertical-tab-wrap clearfix' style={{width: this.props.width}}>
        <div className='gui-vertical-tab-container'>
          <div className='gui-vertical-tab-panes'>
            {this._transformPane()}
          </div>
          <div className='gui-vertical-tab-content'>
            {this._currentPaneContent()}
          </div>
        </div>

      </div>
    );
  }
});

export default VerticalTabs;

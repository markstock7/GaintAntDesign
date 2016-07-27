'use strict';

/**
 * 设计: 大丹
 * 实现: markstock7
 *
 * 最开始所有的 MenuItem 均为 expand打开状态, 此时也应该关闭hover效果
 * 当其中有一个的状态为打开的时候，其它的均没有hover 拉长效果
 * 当没有 item 被打开的生活，恢复所有 item 的hover 拉长效果
 *
 * you
 */
import React from 'react';
import BubbleMenuItem from './BubbleMenuItem';


var ReactChildren = React.Children;

var PropTypes = React.PropTypes;

var BubbleMenu = React.createClass({
  statics: {
    __VerticalTabs__: true
  },

  propTypes: {
    defaultKey: PropTypes.string,
    onItemOpen: PropTypes.func,
    onItemClose: PropTypes.func
  },

  getInitialState() {
    var state = {
      selectedKey: this.props.defaultKey,
      enableHover: false
    };
    return state;
  },

  _callUserDefindFn(fn) {
    if (fn) {
      var attrs = Array.prototype.slice.call(arguments, 1);
      setTimeout(() => {
        fn(attrs);
      }, 0);
    }
  },
  /**
   * 当menuItem被打开的生活调用
   */
  _handlePaneOpen(key) {
    this.setState({
      selectedKey: key,
      enableHover: false
    });
  },

  /**
   * 用来封装用户传递的handelPaneOpen
   */
  _wrap_handlePaneOpen(fn) {
    return (key) => {
      this._handlePaneOpen(key);
      this._callUserDefindFn(fn, key);
    };
  },

  /**
   * 当menuItem被关闭的时候调用
   */
  _handlePaneClose() {
    this.setState({
      selectedKey: null,
      enableHover: true
    })
  },

  /**
   * 用来封装用户传递的handelPaneOpen
   */
  _wrap_handlePaneClose(fn) {
    return (key) => {
      this._handlePaneClose(key);
      this._callUserDefindFn(fn, key);
    }
  },

  _transformPane() {
    var index = 1;
    return ReactChildren.map(this.props.children, (child) => {
      if (child.type.__BubbleMenuItem__) {
        return <BubbleMenuItem
          {...child.props}
          _key={child.key}
          _index={index++}
          enableHover={this.state.enableHover}
          selectedKey={this.state.selectedKey}
          handleClick={this._wrap_handlePaneOpen(this.props.handleClick)}
          handlePanelClose={this._wrap_handlePaneClose(this.props.handlePanelClose)}
        />;
      }
      return null;
    });
  },

  render() {
    return (
      <div className='gui-bubble-menus-wrap'>
        <div className='gui-bubble-menus'>
          {this._transformPane()}
        </div>
      </div>
    );
  }
});

export default BubbleMenu;

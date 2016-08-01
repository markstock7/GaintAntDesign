'use strict';

/**
 * 设计: 大丹
 * 实现: markstock7
 *
 *
 * 最开始所有的 MenuItem 均为 expand打开状态, 此时也应该关闭hover效果
 * 当其中有一个的状态为打开的时候，其它的均没有hover 拉长效果
 * 当没有 item 被打开的生活，恢复所有 item 的hover 拉长效果
 *
 *
 * 同时我们支持使用传递的props.defaultKey, props.enableHover 来控制menu的显示
 * 这样可以从外部编写方法来关闭按钮功能
 *
 */
import React from 'react';
import BubbleMenuItem from './BubbleMenuItem';

var ReactChildren = React.Children,
    PropTypes = React.PropTypes,
    BubbleMenu;

BubbleMenu = React.createClass({
  statics: {
    __VerticalTabs__: true
  },

  propTypes: {
    defaultKey: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    onItemOpen: PropTypes.func,
    onItemClose: PropTypes.func,
    _close_items: PropTypes.bool
  },

  getInitialState() {
    var state = {
      selectedKey: this.props.defaultKey,
      enableHover: false
    };
    return state;
  },

  componentWillMount() {
      this.handlePaneClose = this._wrap_handlePaneClose(this.props.onItemClose);
      this.handlePaneOpen = this._wrap_handlePaneOpen(this.props.onItemOpen);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps._close_items) {
      this.handlePaneClose();
    }
  },

  /**
   * 用于处理用户自定义函数，当用户自定义函数时调用该函数，否则忽略
   */
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
    });
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
        index++;
        return <BubbleMenuItem
          {...child.props}
          _key={child.key}
          _index={index}
          enableHover={this.state.enableHover}
          selectedKey={this.state.selectedKey}
          handlePaneOpen={this.handlePaneOpen}
          handlePaneClose={this.handlePaneClose}
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

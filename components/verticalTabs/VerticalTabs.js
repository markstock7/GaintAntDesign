'use strict';

/**
 * 设计: 大丹
 * 实现: Mark Stock
 *
 */
import React from 'react';
import VerticalTabPane from './VerticalTabPane';
var ReactChildren = React.Children,
    PropTypes = React.PropTypes,
    VerticalTabs;

VerticalTabs = React.createClass({
  statics: {
    __VerticalTabs__: true
  },

  propTypes: {
    defaultKey: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    width: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    onTabClick: PropTypes.func
  },

  getInitialState() {
    /**
     * 默认为关闭状态，鼠标经过后进入hover状态，点击为open状态
     */
    return { selectedKey: this.props.defaultKey };
  },

  componentWillMount() {
    this.handlePaneClick = (() => {
      if (this.props.onTabClick) {
        return (key) => {
          this._handlePaneClick(key);
          this.props.onTabClick(key);
        }
      }
      return this._handlePaneClick;
    })();
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
          index = index + 1;
          return <VerticalTabPane
            {...child.props}
            handleClick={this.handlePaneClick}
            _key={child.key}
            _index={index}
            selectedKey={this.state.selectedKey}
          />;
        }
        return child;
      }
      return null;
    });
  },

  /**
   * 显示当前选中项目的pane的内容
   */
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

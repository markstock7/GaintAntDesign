import React from 'react';

/**
 * active 为开启状态
 * content 为需要编辑的文本
 */
export default class BlockStyleControl extends React.Component {
  constructor(props) {
    super(props);
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    }
  }
  render() {
    let className = ` fa ${this.props.icon} toolbar-item`;
    if (this.props.active) {
      className += ' active';
    }
    return (
      <i className={className} onMouseDown={this.onToggle}></i>
    );
  }
}

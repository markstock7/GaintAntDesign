import React from 'react';
/**
 * active 为开启状态
 * content 为需要编辑的文本
 */
export default class InlineStyleControl extends React.Component {
  constructor(props) {
    super(props);
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    }
  }
  render() {
    let className = 'RichEditor-styleButton toolbar-item';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

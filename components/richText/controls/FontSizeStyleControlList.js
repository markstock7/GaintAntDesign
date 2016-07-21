import React from 'react';
import Select from 'antd/lib/select';
export default class FontSizeStyleControlList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: '16px'
    }
  }

  componentWillReceiveProps(props) {
    const styles = props.editorState.getCurrentInlineStyle();
    for(var type in this.props.fontSize) {
      if (styles.has(type)) {
        this.setState({
          fontSize: type
        });
        return;
      }
    }
    this.setState({
      fontSize: '16px'
    });
  }

  handleChange(fontSize) {
    this.props.onToggle(fontSize);
  }

  render() {
    var fontSizeStyleControlList = [];
    var fontSize = this.props.fontSize;
    for (var type in fontSize) {
      fontSizeStyleControlList.push(
        <Option value={type} key={type}>
          {type}
        </Option>
      );
    }
    return (
      <div className='font-size-controls-list'>
        <Select value={this.state.fontSize} onChange={this.handleChange.bind(this)} style={{width: '80px', marginTop: '-2px'}}>
          {fontSizeStyleControlList}
        </Select>
      </div>
    );
  }
}

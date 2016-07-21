import React from 'react';
import Select from 'antd/lib/select';
import Popover from 'antd/lib/popover';

export default class ColorStyleControlList extends React.Component {
  constructor(props) {
    super(props);
    this.colors = [];
    this.state = {
      selectedColor: '#000'
    }
  }

  componentWillReceiveProps(props) {
    const styles = props.editorState.getCurrentInlineStyle();
    for(var type in this.props.colors) {
      if (styles.has(type)) {
        this.setState({
          selectedColor: this.props.colors[type].color
        });
        return;
      }
    }
    this.setState({
      selectedColor: '#000'
    });
  }

  handleChange(e, color) {
    e.preventDefault();
    this.setState({
      selectedColor: color.color
    }, () => {
      this.props.onToggle(color.style);
    });
  }

  getColorContent(colors) {
    var newLine = [], counter = 0, i = 0, len, finalContent = [];
    var colorsArray = [];
    // 将color object 转变为array
    for (var type in colors) {
      colorsArray.push(colors[type]);
    }

    for(len = colorsArray.length; i < len;) {
      if( i % 7 === 0) {
        while(counter < 7 && i < len) {
          newLine.push(
            <td key={i}>
              <span className='color' style={{backgroundColor: colorsArray[i].color}} onClick={((i) => {return (e) => { this.handleChange(e, colorsArray[i]); }})(i)}/>
            </td>
          );
          counter++; i++;
        }
        counter = 0;
        finalContent.push(<tr key={i}>{newLine}</tr>);
        newLine = [];
      }
    }
    return (
      <table className='colorsTable' border='0' cellSpacing='1'>
        {finalContent}
      </table>
    );
  }

  render() {
    return (
      <div className='color-controls-list'>
        <Popover content={this.getColorContent(this.props.colors)} title='' trigger='click'>
          <span className='toolbar-item'>
            <span className='selectedColor' style={{ background: this.state.selectedColor }}></span>
          </span>
        </Popover>
      </div>
    )
  }
}

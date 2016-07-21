import React from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, convertFromRaw } from 'draft-js';
import { BLOCKCONTROLS, INLINECONTROLS, COLORCONTROLS, FONTSIZES  } from './controlsConfig';

import * as utils from './utils';
// 合并自定义样式
const CustomStyleMap = utils.customStyleMap(COLORCONTROLS, FONTSIZES);

export default class EditBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: props.data ? EditorState.createWithContent(convertFromRaw(props.data)) : EditorState.createEmpty(),
      visible: true
    };

    this.onChange = (editorState) => {
      this.setState({editorState});
    }
    this.getBlockStyle = (block) => this._getBlockStyle(block);
  }

  _getBlockStyle(block) {
    let alignment = utils.getBlockAlignment(block);
    if (!block.getText()) {
      let previousBlock = this.state.editorState.getCurrentContent().getBlockBefore(block.getKey());
      if (previousBlock) {
        alignment = utils.getBlockAlignment(previousBlock);
      }
    }
    return `alignment-${alignment}`;
  }

  render() {
    const boxStyle = {
      display: this.state.visible ? 'block' : 'hidden'
    }
    return (
      <div className='RichEditor-root' style={boxStyle}>
        <Editor
          blockStyleFn={this.getBlockStyle}
          editorState={this.state.editorState}
          onChange={this.onChange}
          placeholder={this.props.placeholder || ''}
          customStyleMap={CustomStyleMap}
          ref='editor'
        />
      </div>
    );
  }
}

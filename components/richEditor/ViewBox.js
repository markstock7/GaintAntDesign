import React from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { COLORCONTROLS, FONTSIZES  } from './controlsConfig';
import * as utils from './utils';

// 合并自定义样式
const CustomStyleMap = utils.customStyleMap(COLORCONTROLS, FONTSIZES);

export default class ViewBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: props.data ? EditorState.createWithContent(convertFromRaw(props.data)) : EditorState.createEmpty()
    };
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
    return (
      <div className='RichEditor-editor' style={{cursor: 'auto'}}>
        <Editor
          blockStyleFn={this.getBlockStyle}
          editorState={this.state.editorState}
          onChange={this.onChange}
          placeholder={this.props.placeholder || ''}
          customStyleMap={CustomStyleMap}
          readOnly={true}
          ref='editor'
        />
      </div>
    );
  }
}

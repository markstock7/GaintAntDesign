import React from 'react';
import { Editor, EditorState, RichUtils,  Modifier, convertToRaw } from 'draft-js';
import * as utils from './utils';
import { BLOCKCONTROLS, INLINECONTROLS, COLORCONTROLS, FONTSIZES  } from './controlsConfig';
import BlockStyleControlList from './controls/BlockStyleControlList';
import InlineStyleControlList from './controls/InlineStyleControlList';
import ColorStyleControlList from './controls/ColorStyleControlList';
import FontSizeStyleControlList from './controls/FontSizeStyleControlList';
import Button from 'antd/lib/button';

require('./style');

// 合并自定义样式
const CustomStyleMap = utils.customStyleMap(COLORCONTROLS, FONTSIZES);


export default class RichEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => { this.setState({editorState}); }
    this.handleKeyCommand = (command) => this.__handleKeyCommand(command);
    this.getBlockStyle = (block) => this._getBlockStyle(block);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.toggledColor = (toggledColor) => this._toggleColor(toggledColor);
    this.toggledFontSize = (toggleFontSize) => this._toggleFontSize(toggleFontSize);
    this.onSave = () => this.__onSave();
    this.undo = () => this.__undo();
  }


  /**
   * 处理用户的输入命令
   */
  __handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  __undo() {
    const newState = EditorState.undo(this.state.editorState);
    if (newState) {
      this.onChange(newState);
    }
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

  // 设置文本样式
  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    )
  }

  // 设置行样式
  _toggleBlockType(blockType) {
    switch(blockType) {
      case 'left':
        return this.onChange(utils.styleWholeSelectedBlocksModifier(this.state.editorState, 'left', ['right', 'center']));
      case 'right':
        return this.onChange(utils.styleWholeSelectedBlocksModifier(this.state.editorState, 'right', ['left', 'center']));
      case 'center':
        return this.onChange(utils.styleWholeSelectedBlocksModifier(this.state.editorState, 'center', ['left', 'right']));
      default:
        this.onChange(
          RichUtils.toggleBlockType(
            this.state.editorState,
            blockType
          )
        );
    }
  }

  _toggleColor(toggledColor) {
    const { editorState } = this.state;
    const selection = editorState.getSelection();

    // 去除所有的颜色，避免颜色叠加
    const nextContentState = Object.keys(COLORCONTROLS).reduce((contentState, color) => {
      return Modifier.removeInlineStyle(contentState, selection, color);
    }, editorState.getCurrentContent());

    //添加一个状态
    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-line-style'
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    // 关闭已有的颜色
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }

    this.onChange(nextEditorState);
  }

  _toggleFontSize(toggledColor) {
    const { editorState } =this.state;
    const selection = editorState.getSelection();

    // 去除所有的font-size 设置
    const nextContentState = Object.keys(FONTSIZES).reduce((contentState, fontsize) => {
      return Modifier.removeInlineStyle(contentState, selection, fontsize);
    }, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-line-style'
    );

    const currentStyle = editorState.getCurrentContent();

    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, fontsize) => {
        return RichUtils.toggleInlineStyle(state, fontsize);
      }, nextEditorState);
    }

    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }

    return this.onChange(nextEditorState);
  }

  /**
   * 保存的时候解析出html，然后调用onSave函数
   */
  __onSave() {
    var raw = this.state.editorState.getCurrentContent();
    if (this.props.onSave) {
      this.props.onSave(convertToRaw(raw));
    }
  }


  render() {
    const { editorState } = this.state;
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return (
      <div className='RichEditor-root'>
        <div className='gio-editor-toolbar'>
          <FontSizeStyleControlList
            editorState={editorState}
            fontSize= {FONTSIZES}
            onToggle={this.toggledFontSize}
          />
          <span className='separator'></span>
          <BlockStyleControlList
            editorState={editorState}
            controls={BLOCKCONTROLS}
            onToggle={this.toggleBlockType}
          />
          <span className='separator'></span>
          <InlineStyleControlList
            editorState={editorState}
            controls={INLINECONTROLS}
            onToggle={this.toggleInlineStyle}
          />
          <ColorStyleControlList
            editorState={editorState}
            colors={COLORCONTROLS}
            onToggle={this.toggledColor}
          />
          <span className='separator'></span>
          <i className='toolbar-item fa fa-undo' onClick={this.undo}/>
        </div>
        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={this.getBlockStyle}
            editorState={this.state.editorState}
            customStyleMap={CustomStyleMap}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            placeholder={this.props.placeholder || ''}
            ref='editor'
          />
        </div>
        <div className='footer-toolbar'>
          <Button type='primary' onClick={this.onSave}>保存</Button>
        </div>
      </div>
    );
  }
}

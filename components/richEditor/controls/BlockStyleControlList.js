import React from 'react';
import StyleControl from './StyleControl';
import * as utils from '../utils';

var BlockStyleControlList = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
  const alignType = utils.getBlockAlignment(editorState.getCurrentContent().getBlockForKey(selection.getStartKey()))
  return (
    <div className="RichEditor-controls">
      {
        props.controls.map((type) =>
          <StyleControl
            key={type.label}
            active={type.style === blockType || alignType === type.style}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
            icon={type.icon}
          />
        )
      }
    </div>
  );
};
export default BlockStyleControlList;

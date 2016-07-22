import React from 'react';
import StyleControl from './StyleControl';
var InlineStyleControlList = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className='RichEditor-controls'>
      {
        props.controls.map(type => (
          <StyleControl
            key = {type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
            icon={type.icon}
          />
        ))
      }
    </div>
  )
}
export default InlineStyleControlList;

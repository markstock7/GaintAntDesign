import { EditorState, RichUtils, getDefaultKeyBinding, Modifier } from 'draft-js';

/**
 * 将多个对象合并为一个
 */
 export function customStyleMap() {
  var styles = Array.prototype.slice.call(arguments, 0);
  var finalStyle = {};
  styles.forEach((style) => {
    finalStyle = Object.assign(finalStyle, style);
  });
  return finalStyle;
}

// 获取block的align
export function getBlockAlignment(block) {
  let style = 'left';
  block.findStyleRanges(function(e) {
    if (e.hasStyle('center')) style = 'center';
    if (e.hasStyle('right')) style = 'right';
  })
  return style;
}


/**
USAGE
style = alignment you want (e.g. "left")
removeStyles = alignments to remove (["center", "right"])
**/
export function styleWholeSelectedBlocksModifier(editorState, style, removeStyles = []) {

  let currentContent = editorState.getCurrentContent();
  let selection = editorState.getSelection();
  let focusBlock = currentContent.getBlockForKey(selection.getFocusKey());
  let anchorBlock = currentContent.getBlockForKey(selection.getAnchorKey());
  let selectionIsBackward = selection.getIsBackward();

  let changes = {
    anchorOffset: 0,
    focusOffset: focusBlock.getLength()
  }

  if (selectionIsBackward) {
    changes = {
      focusOffset: 0,
      anchorOffset: anchorBlock.getLength()
    }
  }
   let selectWholeBlocks = selection.merge(changes)
   let modifiedContent = Modifier.applyInlineStyle(currentContent, selectWholeBlocks, style);
   let finalContent = removeStyles.reduce(function(content, style) {
      return Modifier.removeInlineStyle(content, selectWholeBlocks, style);
   }, modifiedContent);
   return EditorState.push(editorState, finalContent, 'change-inline-style');
}

/**
 * VerticalFrequencyPath Props
 * path {Object}
 * index {Int}
 */
import React          from 'react';
// import Button         from 'antd/lib/button';

import VerticalFrequencyPathNode from './VerticalFrequencyPathNode';

var PropTypes = React.PropTypes;
const VerticalFrequencyPath = React.createClass({
  statics: {
    __VerticalFrequencyPath__: true,
    prefixClass: 'gr_c-v-freq_path'
  },

  propTypes: {
    path: PropTypes.object,
    index: PropTypes.number
  },

  _generateNode() {
    var len = this.props.path.items.length;
    return this.props.path.items.map((item, index) => {
      return (<VerticalFrequencyPathNode node={item} total={len} index={index} key={index} changeHighlightingNode={this.props.changeHighlightingNode} highlightingNode={this.props.highlightingNode} />);
    });
  },

  render() {
    return (
      <div className={`${VerticalFrequencyPath.prefixClass}-container`}>
        {this._generateNode()}
      </div>
    );
  }
});

export default VerticalFrequencyPath;

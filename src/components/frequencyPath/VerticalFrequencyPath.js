/**
 * 纵向的频繁路径
 *
 * VerticalFrequencyPath Props
 *
 * path                   {Object}
 * pathIndex              {Int}
 * changeHighlightingNode {Function}
 * highlightingNode       {Object}
 */


import React          from 'react';

import VerticalFrequencyPathNode from './VerticalFrequencyPathNode';

var PropTypes = React.PropTypes;
const VerticalFrequencyPath = React.createClass({
  statics: {
    __VerticalFrequencyPath__: true,
    prefixClass: 'gr_c-v-freq_path'
  },

  propTypes: {
    path: PropTypes.object.isRequired,
    pathIndex: PropTypes.number.isRequired,
    changeHighlightingNode: PropTypes.func.isRequired,
    highlightingNode: PropTypes.object.isRequired
  },

  _generateNode() {
    var len = this.props.path.items.length;
    return this.props.path.items.map((item, index) => {
      return (
        <VerticalFrequencyPathNode
          node={item}
          total={len}
          index={index}
          key={index}
          pathIndex={this.props.pathIndex}
          changeHighlightingNode={this.props.changeHighlightingNode}
          highlightingNode={this.props.highlightingNode}
        />
      );
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

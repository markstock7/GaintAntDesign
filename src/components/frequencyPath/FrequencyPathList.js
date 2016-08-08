import React              from 'react';
import FrequencyPath      from './FrequencyPath';

var PropTypes = React.PropTypes;

const FrequencyPathList = React.createClass({
  statics: {
    __FrequencyPathList__: true,
    prefixClass: 'gr_c-freq_path-l'
  },

  getInitialState() {
    return {
      /**
       * 当前正在编辑的路径
       */
      editingPath: -1,

      // 当前正在高亮节点，为path号*node号
      highlightingNode: {
        path: -1,
        node: -1
      }
    };
  },

  propTypes: {
    paths: PropTypes.array
  },

  _changeCurrentEditingPath(index) {
    this.setState({
      editingPath: index
    });
  },

  _closeCurrentEditingPath() {
    this.setState({
      editingPath: -1
    });
  },

  /**
   * 生成 FrequencyPath 路径
   */
  _generateFrequencyPaths() {
    return this.props.paths.map((path, index) => {
      return (
        <FrequencyPath
          path={path}
          key={index}
          index={index}
          editingPath={this.state.editingPath}
          openEditBox={this._changeCurrentEditingPath}
          closeEditBox={this._closeCurrentEditingPath}
          changeHighlightingNode={this.changeHighlightingNode}
          highlightingNode={this.state.highlightingNode}
        />
      );
    });
  },

  /**
   * 改变正在highlight的节点
   * @param {Int} path default -1
   * @param {Int} node default -1
   */
  changeHighlightingNode(path, node) {
    this.setState({
      highlightingNode: {
        path: path > -1 ? path : -1,
        node: node > -1 ? node : -1
      }
    });
  },

  render() {
    return (
      <div className={FrequencyPathList.prefixClass}>
        {this._generateFrequencyPaths()}
      </div>
    );
  }
});
export default FrequencyPathList;

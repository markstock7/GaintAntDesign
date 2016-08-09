import React              from 'react';
import FrequencyPath      from './FrequencyPath';

var PropTypes = React.PropTypes;

const FrequencyPathList = React.createClass({
  statics: {
    __FrequencyPathList__: true,
    prefixClass: 'gr_c-freq_path-l'
  },

  propTypes: {
    paths: PropTypes.array
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
        node: -1,
        pos: ''  // inner 或 outter
      }
    };
  },

  /**
   * 改变当前正在编辑的路径
   * 当需要关闭的时候将index设置为－1
   * @param {Int} index 节点的id
   */
  _changeCurrentEditingPath(index) {
    this.setState({
      editingPath: index
    });
  },

  /**
   * 生成 FrequencyPath 路径列表
   */
  _generateFrequencyPaths() {
    return this.props.paths.map((path, index) => {
      return (
        <FrequencyPath
          path={path}
          key={index}
          index={index}
          editingPath={this.state.editingPath}
          highlightingNode={this.state.highlightingNode}
          changeHighlightingNode={this.changeHighlightingNode}
          changeCurrentEditingPath={this._changeCurrentEditingPath}
        />
      );
    });
  },

  /**
   * 改变正在highlight的节点
   * @param {Int} path default -1
   * @param {Int} node default -1
   * @param {Boolean} pos PathNode 为 0， VerticalPathNode 为 1
   */
  changeHighlightingNode(path, node, pos) {
    this.setState({
      highlightingNode: {
        path: path > -1 ? path : -1,
        node: node > -1 ? node : -1,
        pos
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

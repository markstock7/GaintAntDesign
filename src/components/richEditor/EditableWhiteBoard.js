import React      from 'react';
import RichEditor from './RichEditor';
import Modal      from 'antd/lib/modal';

export default class EditableWhiteBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      visible: false
    };
    this.onSaveEditor = (() => {
      if (this.props.onSave) {
        return (rawState) => {
          this.setState({
            visible: false
          });
          this.props.onSave(rawState);
        };
      }
      return (rawState) => { this._onSaveEditor(rawState); };
    })();
    this.showModal = () => this._showModal();
    this.hideModal = () => this._hideModal();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.data) {
      this.setState({
        data: nextProps.data
      });
    }
  }

  _onSaveEditor(rawState) {
    this.setState({
      data: rawState,
      visible: false
    });
  }
  _showModal() {
    this.setState({
      visible: true
    });
  }
  _hideModal() {
    this.setState({
      visible: false
    });
  }

  render() {
    var hasText = false;
    if (this.state.data) {
      hasText = true;
    }
    return (
      <div className='gui-editable-whiteboard'>
        <div className='editContent' style={{ display: hasText ? '' : 'none' }} onDoubleClick={this.showModal}>
          <RichEditor.ViewBox  data={this.state.data} />
        </div>
        <div className='editHint' onDoubleClick={this.showModal} style={{ display: hasText ? 'none' : ''  }}>
          <span className='editHint-text'>点击内容可进行编辑</span>
        </div>
        <Modal  className='richEditorModal' title='Modal' visible={this.state.visible} onCancel={this.hideModal} footer='' >
          <RichEditor onSave={this.onSaveEditor} />
        </Modal>
      </div>
    );
  }
}

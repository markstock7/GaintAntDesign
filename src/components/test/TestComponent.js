import React from 'react';
import Button from 'antd/lib/button';
import BubbleMenu from '../bubbleMenu';
import VerticalTabs from '../verticalTabs';
import './style/index.less';

const BubbleMenuItem = BubbleMenu.BubbleMenuItem;
const VerticalTabPane = VerticalTabs.VerticalTabPane;

var TestComponent = React.createClass({
    getInitialState() {
        return {
            currentKey: 1,
            _close_items: false
        };
    },

    handlePaneClose(e) {
      e.stopPropagation();
      this.setState({
        _close_items: true
      });
    },

    render() {
        return (
            <BubbleMenu defaultKey={this.state.currentKey} _close_items={this.state._close_items}>
              <BubbleMenuItem key='1' iconType='audit' name='选择模版'>
                <VerticalTabs defaultKey='1' width='400' >
                  <VerticalTabPane key='1' label='互联网金融'>
                    <div className='dashboard-bubble-menu-pane'>
                      <div className='pane-header'>
                        <span className='label'>互联网金融模版</span>
                        <div className='tool'>
                          <Button type="primary" shape='circle' icon='cross' size='small' onClick={this.handlePaneClose} />
                        </div>
                      </div>
                      <div className='pane-body'>
                        <p>描述如何使用和配置该模版，比如需要用户需要配置指标，选择纬度等。</p>
                      </div>
                      <div className='pane-footer'>
                        <Button type='primary'>立即使用</Button>
                      </div>
                    </div>
                  </VerticalTabPane>
                  <VerticalTabPane key='2' label='SaaS'>
                    <div className='dashboard-bubble-menu-pane'>
                      <div className='pane-header'>
                        <span className='label'>SaaS模版</span>
                        <div className='tool'>
                          <Button type="primary" shape='circle' icon='cross' size='small' onClick={this.handlePaneClose} />
                        </div>
                      </div>
                      <div className='pane-body'>
                        <p>描述如何使用和配置该模版，比如需要用户需要配置指标，选择纬度等。</p>
                      </div>
                      <div className='pane-footer'>
                        <Button type='primary'>立即使用</Button>
                      </div>
                    </div>
                  </VerticalTabPane>
                </VerticalTabs>
              </BubbleMenuItem>
              <BubbleMenuItem key='2' iconType='audit' name='看板ER'>
                <div className='chartList'>
                  搜索框
                </div>
              </BubbleMenuItem>
            </BubbleMenu>
        );
    }
});

export default TestComponent;

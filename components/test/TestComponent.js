import React from 'react';

var ReactChildren = React.Children;
var PropTypes = React.PropTypes;

import BubbleMenu from '../bubbleMenu';
import VerticalTabs from '../verticalTabs';

const BubbleMenuItem = BubbleMenu.BubbleMenuItem;
const VerticalTabPane = VerticalTabs.VerticalTabPane;

var TestComponent = React.createClass({
    getInitialState() {
        return {
            currentKey: 1
        };
    },

    handlePaneClose() {
        this.setState({
            currentKey: ''
        });
    },

    render() {
        return (
            <BubbleMenu defaultKey={this.state.currentKey}>
              <BubbleMenuItem key='1' iconType='audit' name='看板一'>
                <VerticalTabs defaultKey='1' width='400' >
                  <VerticalTabPane key='1' label='Tab1'>
                    <div className='template-panel'>
                      <header>
                        互联网金融模版
                      </header>
                    </div>
                  </VerticalTabPane>
                  <VerticalTabPane key='2' label='Tab2'>
                    <div className='template-panel'>
                      <header>
                        互联网金融模版
                        <button onClick={this.handlePaneClose}>关闭</button>
                      </header>
                    </div>
                  </VerticalTabPane>
                  <VerticalTabPane key='3' label='Tab3'>
                    <div className='template-panel'>
                      <header>
                        互联网金融模版
                      </header>
                    </div>
                  </VerticalTabPane>
                </VerticalTabs>
              </BubbleMenuItem>
              <BubbleMenuItem key='2' iconType='audit' name='看板ER'>
                <VerticalTabs defaultKey='1' width='400' >
                  <VerticalTabPane key='1' label='Tab1'>
                    <div className='template-panel'>
                      <header>
                        互联网金融模版
                      </header>
                    </div>
                  </VerticalTabPane>
                  <VerticalTabPane key='2' label='Tab2'>
                    <div className='template-panel'>
                      <header>
                        互联网金融模版
                        <button onClick={this.handlePaneClose}>关闭</button>
                      </header>
                    </div>
                  </VerticalTabPane>
                  <VerticalTabPane key='3' label='Tab3'>
                    <div className='template-panel'>
                      <header>
                        互联网金融模版
                      </header>
                    </div>
                  </VerticalTabPane>
                </VerticalTabs>
              </BubbleMenuItem>
            </BubbleMenu>
        );
    }
});

export default TestComponent;

import React from 'react';
import 'antd/dist/antd.css';
var warning = require('warning');
var semver = require('semver');
const reactVersionInDeps = require('./package.json').devDependencies.react;


var Icon = require('./src/components/icon');
var RichEditor = require('./src/components/richEditor');
var BubbleMenu = require('./src/components/bubbleMenu');
var VerticalTabs = require('./src/components/verticalTabs');
var TestComponent = require('./src/components/test/TestComponent');


const giui = {
  Icon,
  RichEditor,
  BubbleMenu,
  VerticalTabs,
  TestComponent
};


giui.version = require('./package.json').version;
if (process.env.NODE_ENV !== 'production') {
  warning(semver.satisfies(React.version, reactVersionInDeps) || semver.gtr(React.version, reactVersionInDeps),
    `antd@${giui.version} need react@${reactVersionInDeps} or higher, which is react@${React.version} now.`);
}

module.exports = giui;

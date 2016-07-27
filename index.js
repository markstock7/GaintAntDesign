import React from 'react';
import 'antd/dist/antd.css';
const giui = {
  GIcon: require('./components/icon'),
  RichEditor: require('./components/RichEditor'),
  BubbleMenu: require('./components/bubbleMenu'),
  VerticalTabs: require('./components/verticalTabs'),
  TestComponent: require('./components/test/TestComponent')
};

giui.version = require('./package.json').version;

if (process.env.NODE_ENV !== 'production') {
  const warning = require('warning');
  const semver = require('semver');
  const reactVersionInDeps = require('./package.json').devDependencies.react;
  warning(semver.satisfies(React.version, reactVersionInDeps) || semver.gtr(React.version, reactVersionInDeps),
    `antd@${giui.version} need react@${reactVersionInDeps} or higher, which is react@${React.version} now.`);
}

module.exports = giui;

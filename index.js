import React from 'react';

const giui = {
  GIcon: require('./components/icon')
  // Button: require('./components/button')
}
giui.version = require('./package.json').version;

if (process.env.NODE_ENV !== 'production') {
  const warning = require('warning');
  const semver = require('semver');
  const reactVersionInDeps = require('./package.json').devDependencies.react;
  warning(semver.satisfies(React.version, reactVersionInDeps) || semver.gtr(React.version, reactVersionInDeps),
    `antd@${giui.version} need react@${reactVersionInDeps} or higher, which is react@${React.version} now.`);
}

module.exports = giui;

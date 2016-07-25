#!/usr/bin/env node

'use strict';

require('colorful').colorful();

const program = require('commander');
const packageInfo = require('../package.json');
const gulp = require('gulp');
require('../gulpfile');

program
  .version(packageInfo.version)
  .command('run [name]', 'run specified task')
  .parse(process.argv);

const proc = program.runningCommand;
if (proc) {
  proc.on('close', process.exit.bind(process));
  proc.on('error', () => {
    process.exit(1);
  });
}

const task = program.args[0];

switch (task) {
  case 'run':
    return gulp.start(task);
  default:
    program.help();
}

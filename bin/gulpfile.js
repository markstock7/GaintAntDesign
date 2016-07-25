'use strict';

const merge2 = require('merge2');
const execSync = require('child_process').execSync;
const through2 = require('through2');
const transformLess = require('atool-build/libtransformLess');
const babelConfig = require('atool-build/lib/getBabelCommonConfig')();
delete babelConfig.cacheDirectory;
const babel = require('gulp-babel');
const selfPackage = require('../package.json');
const chalk = require('chalk');
const path = require('path');
const eslint = require('gulp-eslint');

const gulp = require('gulp');

gulp.task('clean', () => {
  execSync('rm -rf _site');
});

gulp.task('dist', () => {
  execSync('rm -rf dist');
});

gulp.task('lint', () => {
  return gulp.src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('deploy', (done) => {
  execSync('rm -rf node_modules');
  done();
});

gulp.task('compile', () => {
  execSync('rm -rf lib');
  const less = gulp.src(['src/**/*.less'])
    .pipe(through2.obj(function(file, encoding, next) {
      this.push(file.clone());
    }));
});

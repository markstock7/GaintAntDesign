var runCommand = require('./utils/runCommand');
var getNpm = require('./utils/getNpm');

/**
 * 调用npm安装依赖包
 *
 */
module.exports = function install(done) {
  getNpm((npm) => {
    console.log(`${npm} installing`.to.blue.color);
    runCommand(npm, ['install'], (c) => {
      console.log(`${npm} install end`.to.blue.color);
      done(c);
    });
  });
};

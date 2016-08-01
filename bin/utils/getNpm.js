var runCommand = require('./runCommand');

/**
 * 如果安装cnpm则优先使用cnpm，否则使用npm
 */
module.exports = function getNpm(done) {
  if (process.env.NPM_CLI) {
    done(process.env.NPM_CLI);
    return;
  }

  runCommand('which', ['cnpm'], (code) => {
    var npm = 'npm';
    if (!code) {
      npm = 'cnpm';
    }
    done(npm);
  });
};

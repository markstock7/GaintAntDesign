const path = require('path');

var env = null;

module.exports = function getRunCmdEnv() {
  var key;
  if (env !== null) return env;

  for (key in process.env) {
    if (process.env.hasOwnProperty(key)) {
      env[key] = process.env[key];
    }
  }

  const nodeModulesBinDir = path.join(__dirname, '../../node_modules/.bin');
  env.PATH = env.PATH ? `${nodeModulesBinDir}:${env.PATH}` : nodeModulesBinDir;
  return env;
};

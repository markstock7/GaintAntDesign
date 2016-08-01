const getRunCmdEnv = require('./getRunCmdEnv');
const childProcess = require('child_process');

/**
 * 以 spawn的方式启动子进程，并提供env参数，可以方式子进程因为max_buffer设置不当而终止
 */
function runCommand(cmd, _args, fn) {
  const args = _args || [];
  const runner = childProcess.spawn(cmd, args, {
    env: getRunCmdEnv()
  });

  const out = [];

  runner.stdout.on('data', (data) => {
    out.push(data);
  });

  runner.on('close', (code) => {
    if (fn) {
      fn(code, out.join(''));
    }
  });
}

module.exports = runCommand;

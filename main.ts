#!/usr/bin/env bun
import {
  userInfo as _userInfo,
  hostname as _hostname,
  release as _release,
} from 'os';
import osName from 'os-name';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  fgBlack: '\x1b[30m',
  fgRed: '\x1b[31m',
  fgGreen: '\x1b[32m',
  fgYellow: '\x1b[33m',
  fgBlue: '\x1b[34m',
  fgMagenta: '\x1b[35m',
  fgCyan: '\x1b[36m',
  fgWhite: '\x1b[37m',
};

interface SystemInfo {
  userInfo: {
    username: string;
  };
  hostname: string;
  release: string;
  osName: string;
  shell?: string;
}

function getSystemInfo(): SystemInfo {
  const userInfo = _userInfo();
  const hostname = _hostname();
  const release = _release();
  const shell = process.env.SHELL;

  return {
    userInfo,
    hostname,
    release,
    osName: osName(),
    shell,
  };
}

function displaySystemInfo(info: SystemInfo) {
  console.log(`
  (\\ /)       ${colors.fgBlue}${info.userInfo.username}${colors.reset}@${colors.fgBlue}${info.hostname}${colors.reset} 
  ( . .)      ${colors.fgYellow}OS:${colors.reset} ${info.osName}
  c(${colors.fgRed}"${colors.reset})(${colors.fgRed}"${colors.reset})     ${colors.fgMagenta}Kernel:${colors.reset} ${info.release}
              ${colors.fgCyan}Shell:${colors.reset} ${info.shell} 
  `);
}

const systemInfo = getSystemInfo();
displaySystemInfo(systemInfo);

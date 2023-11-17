#!/usr/bin/env node
import { userInfo, hostname, release } from 'os';
import osName from 'os-name';
import { exec } from 'child_process';

const colors = {
  reset: '\x1b[0m',
  fgBlue: '\x1b[34m',
  fgYellow: '\x1b[33m',
  fgRed: '\x1b[31m',
  fgMagenta: '\x1b[35m',
  fgCyan: '\x1b[36m',
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

function getLinuxDistribution(): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(
      'cat /etc/os-release | grep "^ID=" | cut -d "=" -f 2',
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        const distribution = stdout.trim();
        resolve(distribution);
      }
    );
  });
}

async function getSystemInfo(): Promise<SystemInfo> {
  const userInfoResult = userInfo();
  const hostnameResult = hostname();
  const releaseResult = release();
  const shellPath = process.env.SHELL;
  const osNameResult = await getLinuxDistribution();

  // Extract the shell name without the path
  const shell = shellPath ? shellPath.split('/').pop() : undefined;

  return {
    userInfo: userInfoResult,
    hostname: hostnameResult,
    release: releaseResult,
    osName: osNameResult,
    shell,
  };
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function displaySystemInfo(info: SystemInfo) {
  const capitalizedOsName = capitalizeFirstLetter(info.osName);

  console.log(`
  (\\ /)       ${colors.fgBlue}${info.userInfo.username}${colors.reset}@${colors.fgBlue}${info.hostname}${colors.reset} 
  ( . .)      ${colors.fgYellow}OS:${colors.reset} ${capitalizedOsName}
  c(${colors.fgRed}"${colors.reset})(${colors.fgRed}"${colors.reset})     ${colors.fgMagenta}Kernel:${colors.reset} ${info.release}
              ${colors.fgCyan}Shell:${colors.reset} ${info.shell} 
  `);
}

async function main() {
  try {
    const systemInfo = await getSystemInfo();
    displaySystemInfo(systemInfo);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();


import os from 'os'
import path from 'path';
import fs from 'fs/promises';


const homeDir = os.homedir()
const foundDirs = []


async function searchDir(dirPath:string, searchName: string) {
  
}


async function main() {
  // 找到路径
  await searchDir(homeDir, 'node_modules')
  // 写入found文件夹 os.EOL换行符
  await fs.writeFile('./found', foundDirs.join(os.EOL))

  console.log("DOWN");
  
}

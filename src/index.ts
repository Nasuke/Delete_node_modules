
import os from 'os'
import path from 'path';
import fs from 'fs/promises';


const homeDir = os.homedir()
const foundDirs = []


async function searchDir(dirPath:string, searchName: string) {
  // 读取当前目录下的内容
  let children;
  try {
    children = await fs.readdir(dirPath)
  }catch(e){
    return
  }

  const len = children.length
  for(let i = 0; i < len; i++){
    const child = children[i]

    // 拼接路径以及判断是不是软连接
    const childPath = path.join(dirPath, child)
    const res = await fs.lstat(childPath)

    // 软连接则跳出
    if(await res.isSymbolicLink()){
      break;
    }

    // 找出目录并且并非隐藏目录(以.开头)
    if(res.isDirectory() && !child.startsWith('.')){
      if(child === 'node_modules'){
        console.log(childPath);
        foundDirs.push(childPath)
      }else {
        // 递归调用
        await searchDir(childPath, searchName)
      }
    }
  }    
}

async function dirSize(dirPath) {
  let totalSize = 0;
  let children;

  try {
      children = await fs.readdir(dirPath);
  } catch(e) {
      return;
  }

  for(let i = 0; i< children.length; i++) {
      const child = children[i];

      const childPath = path.join(dirPath, child);
      const res = await fs.lstat(childPath);

      if(await res.isSymbolicLink()) {
          break;
      }

      if(res.isDirectory()) {
          totalSize += await dirSize(childPath);
      } else {
          totalSize += res.size;
      }
  }
  return totalSize;
}

async function fileExists(filePath:string) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function removeFileOrDir(dirs: string[]){
  for(let i = 0; i < dirs.length; i++) {
    if(await fileExists(dirs[i])){
      await fs.rm(dirs[i], {recursive: true})
      console.log(dirs[i], 'removed');
      
    }
  }
}


async function main() {
  // // 找到路径
  // await searchDir(homeDir, 'node_modules')
  // // 写入found文件夹 os.EOL换行符
  // await fs.writeFile('./found', foundDirs.join(os.EOL))

  const str = await fs.readFile('./found', {encoding: 'utf-8'})
  const dirs = str.split(os.EOL)
  await removeFileOrDir(dirs)
  console.log("DOWN");
  
}

main()




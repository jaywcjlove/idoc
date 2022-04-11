import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import { copyFile } from '../utils/copy';

export async function init(folder: string) {
  const initFolder = path.resolve(process.cwd(), folder);
  if (!fs.existsSync(initFolder)) {
    await fs.ensureDir(initFolder);
  }
  const option = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      default: path.basename(initFolder) || 'my-app',
      message: '新项目名称'
    },
    {
      type: 'confirm',
      name: 'force',
      default: false,
      message: '是否强制重新生成目录文件'
    },
    {
      type: 'confirm',
      name: 'theme',
      default: false,
      message: '是否暴露模板(Theme)文件，自己修改定义',
    },
    {
      type: 'input',
      name: 'dir',
      default: 'docs',
      message: '修改指定文档目录位置',
      filter: (input) => path.resolve(initFolder, input || 'docs'),
    },
    {
      type: 'input',
      name: 'output',
      default: 'dist',
      message: '修改指定输出静态页面目录位置',
      filter: (input) => path.resolve(initFolder, input || 'dist'),
    }
  ]);

  if (option.force) {
    await fs.emptyDir(initFolder);
  }
  if (option.theme) {
    const themepath = path.resolve(__dirname, '../../themes');
    await fs.copy(themepath, path.resolve(initFolder, 'themes'))
  }
  
  const temp = path.resolve(__dirname, '../../template/');
  const pkg = await fs.readJSON(path.resolve(temp, 'package.json'));

  await copyFile(path.resolve(temp, 'rdoc.yml'), path.resolve(initFolder, 'rdoc.yml'), {
    dir: path.basename(option.dir),
    output: path.basename(option.output),
    site: option.projectName,
    theme: option.theme ? 'themes/default' : 'default',
  });

  await copyFile(path.resolve(temp, 'package.json'), path.resolve(initFolder, 'package.json'), {
    name: option.projectName,
    version: pkg.version,
  });

  await fs.copy(path.resolve(temp, 'docs'), option.dir);
  console.log()
  console.log(` \x1b[32;1m✔\x1b[0m Start documentation with \x1b[35;1midoc\x1b[0m!`);
  console.log()
}
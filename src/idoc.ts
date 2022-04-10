#!/usr/bin/env node
import path from 'path';
import minimist from 'minimist';
import { build } from './scripts/build';
import { watch } from './scripts/watch';
import { config } from './utils/conf';

function outputHelp() {
  console.log(' Usage: idoc [options] [--help|h] [--version|v]');
  console.log('\n Options:');
  console.log('');
  console.log('   -v, --version,', 'Show version number');
  console.log('   -h, --help,', 'Displays help information.');
  console.log('   -d, --dir <dir-path>,', 'Markdown file directory. defalut(docs)');
  console.log('   -o, --output <dir-path>,', 'Output directory. defalut(dist)');
  console.log('   -w, --watch,', 'Watch and compile Markdown files.');
  console.log('   -t, --theme,', 'Customize theme settings. defalut(defalut)');
  console.log('');
  console.log(' Example:');
  console.log('');
  console.log('   \x1b[35mnpm\x1b[0m idoc \x1b[33m--theme\x1b[0m="defalut"');
  console.log('   \x1b[35mnpm\x1b[0m idoc \x1b[33m--dir\x1b[0m="docs"');
  console.log('   \x1b[35mnpm\x1b[0m idoc \x1b[33m--output\x1b[0m="dist"');
  console.log('   \x1b[35mnpm\x1b[0m idoc \x1b[33m--watch\x1b[0m \x1b[33m--output\x1b[0m="www"');
  console.log('');
  console.log(' ------------------------------------')
  console.log("    ,,        ,,                    ");
  console.log("    db      `7MM                    ");
  console.log("              MM                    ");
  console.log("  `7MM   ,M\"\"bMM  ,pW\"Wq.   ,p6\"bo  ");
  console.log("    MM ,AP    MM 6W'   `Wb 6M'  OO  ");
  console.log("    MM 8MI    MM 8M     M8 8M       ");
  console.log("    MM `Mb    MM YA.   ,A9 YM.    , ");
  console.log("  .JMML.`Wbmd\"MML.`Ybmd9'   YMbmd'  ");
  console.log(' ------------------------------------')
  console.log('')
}

const argvs = minimist(process.argv.slice(2));
if (argvs.h || argvs.help) {
  outputHelp();
  process.exit(0);
}

const { version } = require('../package.json');
if (argvs.v || argvs.version) {
  console.log(` \x1b[35midoc\x1b[0m v${version}\n`);
  process.exit(0);
}

argvs.output = argvs.o = argvs.output || argvs.o || path.resolve(process.cwd(), 'dist');
argvs.dir = argvs.d = argvs.dir || argvs.d || path.resolve(process.cwd(), 'docs');
argvs.watch = argvs.w = argvs.watch || argvs.w;
argvs.theme = argvs.t = argvs.theme || argvs.t || path.resolve(process.cwd(), 'themes/default');

;(async () => {
  try {
    config.data.dir = argvs.dir;
    config.data.theme = argvs.theme;
    config.data.output = argvs.output;

    await config.initConf();
    await config.getChaptersConf();
    await config.getFiles();

    if (argvs.watch) {
      await watch();
    } else {
      await build();
    }
  } catch (error) {
    // if (error instanceof Error) {
    //   console.log(` \x1b[31midoc:\x1b[0m \x1b[31m${error.name} ${error.message}\x1b[0m`);
    // }
    console.log(` \x1b[31midoc:\x1b[0m`, error);
    process.exit(1);
  }
})();
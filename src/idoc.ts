#!/usr/bin/env node
import path from 'path';
import { fileURLToPath } from 'url';
import minimist from 'minimist';
import fs from 'fs-extra';
import { build } from './scripts/build.js';
import { watch } from './scripts/watch.js';
import { config } from './utils/conf.js';
import { init } from './scripts/init.js';
import { newDoc } from './scripts/new-doc.js';

const helpStr = `
 Usage: idoc [init|new][options] [--help|h] [--version|v]

 Options:

   -v, --version, Show version number
   -h, --help,    Displays help information.
   -f, --force,   Force file regeneration.
   -s, --site,    Set website name.
   -d, --dir <dir-path>, Markdown file directory. defalut(docs)
   -o, --output <dir-path>, Output directory. defalut(dist)
   -w, --watch,   Watch and compile Markdown files.
   -t, --theme,   Customize theme settings. defalut(defalut)
   -m, --minify,  minify HTML

 Example:

   \x1b[35m$\x1b[0m idoc \x1b[33minit\x1b[0m \x1b[34;1m<folder>\x1b[0m
   \x1b[35m$\x1b[0m idoc \x1b[33mnew\x1b[0m introduce/README.md
   \x1b[35m$\x1b[0m idoc \x1b[33mnew\x1b[0m introduce/README.md "Hello World" -f
   \x1b[35m$\x1b[0m idoc \x1b[33m--theme\x1b[0m="defalut"
   \x1b[35m$\x1b[0m idoc \x1b[33m--dir\x1b[0m="docs"
   \x1b[35m$\x1b[0m idoc \x1b[33m--output\x1b[0m="dist"
   \x1b[35m$\x1b[0m idoc \x1b[33m--watch\x1b[0m \x1b[33m--output\x1b[0m="www"

 ------------------------------------
    ,,        ,,                    
    db      \`7MM                    
              MM                    
  \`7MM   ,M""bMM  ,pW"Wq.   ,p6"bo  
    MM ,AP    MM 6W'   \`Wb 6M'  OO  
    MM 8MI    MM 8M     M8 8M       
    MM \`Mb    MM YA.   ,A9 YM.    , 
  .JMML.\`Wbmd\"MML.\`Ybmd9'   YMbmd'  
 ------------------------------------

`;

function outputHelp() {
  console.log(helpStr);
}

const argvs = minimist(process.argv.slice(2));
if (argvs.h || argvs.help) {
  outputHelp();
  process.exit(0);
}

(async () => {
  try {
    if (argvs.v || argvs.version) {
      const pkgpath = fileURLToPath(new URL('../package.json', import.meta.url));
      const { version } = await fs.readJSON(pkgpath);
      console.log(` \x1b[35midoc\x1b[0m v${version}\n`);
      process.exit(0);
    }

    argvs.output = argvs.o = argvs.output || argvs.o;
    argvs.dir = argvs.d = argvs.dir || argvs.d;
    argvs.watch = argvs.w = argvs.watch || argvs.w;
    argvs.theme = argvs.t = argvs.theme || argvs.t;
    argvs.force = argvs.f = argvs.force || argvs.f;
    argvs.site = argvs.s = argvs.site || argvs.s;
    argvs.minify = argvs.m = argvs.minify || argvs.m;

    if (argvs._[0] === 'init') {
      await init(argvs._[1] || './');
      return;
    }
    if (argvs._[0] === 'new') {
      await newDoc(argvs._[1] || './README.md', argvs._[2], argvs);
      return;
    }
    if (argvs.dir) config.data.dir = path.resolve(process.cwd(), argvs.dir);
    if (argvs.output) config.data.output = path.resolve(process.cwd(), argvs.output);
    if (argvs.theme) config.data.theme = path.resolve(process.cwd(), argvs.theme);
    if (argvs.minify) config.data.minify = argvs.minify;
    await config.initConf({ site: argvs.site });
    await config.getChaptersConf();
    await config.getFiles();
    await config.getReadme();
    if (argvs.force) {
      await fs.emptyDir(config.data.output);
    }

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

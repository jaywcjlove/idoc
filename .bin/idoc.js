#!/usr/bin/env node

var commander = require('commander');
var appInfo = require('../package');
var idoc  = require('..');
var log =console.log;
require('colorful').toxic()

commander
    .usage('[options]')
    .version(appInfo.version);


commander
    .option("-C, --Create <file>", "Select Directory Makefile.")
    .option("-v", "App version information.")
    .option('init','init a documentation.')
    .option('build','Markdown produces static pages document.')
    .option('watch','Listener "md" file is automatically generated pages.')
    .option('server','Open local static html server.')
    .option('clean','Clear the generate static files.')
    .option('deploy','Publish to a gh-pages branch on GitHub.')

commander
    .on('--help',function(){
        log('  Examples:'.bold.blue);
        log('')
        log('    $ idoc init');
        log('    $ idoc init [path] ');
        log('    $ idoc init [path] -C ~/idoc/');
        log('    $ idoc watch');
        log('    $ idoc server');
        log('    $ idoc clean');

        
        // 图片文字 http://patorjk.com/software/taag/#p=testall&f=Graffiti&t=idoc

        log('')
        log('')
        log('')
        log('')
        log("    ,,        ,,                    ".bold.grey)
        log("    db      `7MM                    ".bold.grey)
        log("              MM                    ".bold.grey)
        log("  `7MM   ,M\"\"bMM  ,pW\"Wq.   ,p6\"bo  ".bold.grey)
        log("    MM ,AP    MM 6W'   `Wb 6M'  OO  ".bold.grey)
        log("    MM 8MI    MM 8M     M8 8M       ".bold.grey)
        log("    MM `Mb    MM YA.   ,A9 YM.    , ".bold.grey)
        log("  .JMML.`Wbmd\"MML.`Ybmd9'   YMbmd'  ".bold.grey)
        log('')
        log('')

    })

commander.parse(process.argv);

if (!process.argv[2]) {
    commander.help();
    console.log();
}

idoc(commander)
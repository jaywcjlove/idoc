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
    .option('init','init a documentation.')
    .option('build','Markdown produces static pages document.')

commander
    .on('--help',function(){
        log('  Examples:'.bold.blue);
        log('')
        log('    $ idoc init');
        log('    $ idoc init [path] ');
        log('    $ idoc init [path] -C ~/idoc/');

        
        // 图片文字 http://patorjk.com/software/taag/#p=testall&f=Graffiti&t=idoc

        log('')
        log('')
        log('')
        log('')
        log("    ,,        ,,                    ")
        log("    db      `7MM                    ")
        log("              MM                    ")
        log("  `7MM   ,M\"\"bMM  ,pW\"Wq.   ,p6\"bo  ")
        log("    MM ,AP    MM 6W'   `Wb 6M'  OO  ")
        log("    MM 8MI    MM 8M     M8 8M       ")
        log("    MM `Mb    MM YA.   ,A9 YM.    , ")
        log("  .JMML.`Wbmd\"MML.`Ybmd9'   YMbmd'  ")
        log('')
        log('')

    })

commander.parse(process.argv);

if (!process.argv[2]) {
    commander.help();
    console.log();
}

idoc(commander)
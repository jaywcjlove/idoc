#!/usr/bin/env node

var commander = require('commander');
var appInfo = require('../package');
var idoc  = require('..');
var log =console.log;
// require('colorful').toxic()

commander
    .usage('[options]')
    .version(appInfo.version);


commander
    .option("-C, --Create <file>", "Select Directory Makefile.")
    .option('init','init a documentation.')
    .option('build','Markdown produces static pages document.')

commander
    .on('--help',function(){
        // 图片文字 http://ascii.mastervb.net/text_to_ascii.php
        
        log('    █░░░█ █▀▀ ░░▀');
        log('    █▄█▄█ █░░ ░░█');
        log('    ░▀░▀░ ▀▀▀ █▄█');
        log('')

    })

commander.parse(process.argv);

if (!process.argv[2]) {
    commander.help();
    console.log();
}

idoc(commander)
#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var inquirer = require('inquirer');
var semver = require('semver');
var underscore = require('underscore');
var mkdirp = require('mkdirp');
var color = require('colorful').color;
var log = console.log;

/**
 * 这里执行 init 任务
 */
function runTask(commander){
    var done;
    //建package.json文件
    inquirer.prompt([{
        message: 'Package name',
        name: 'name',
        default: path.basename(process.cwd()),
        validate: function(input) {
            done = this.async();
            //检测只准输入小写字母，数字，横线或者英文句号
            if (!/^[A-z][A-z0-9\-\.]*$/.test(input)) {
                console.warn(color.red('Must be only lowercase letters, numbers, dashes or dots, and start with lowercase letter.'));
                return;
            }
            done(true);
        }
    },{
        message: 'Version',
        name: 'version',
        default: '0.0.1',
        validate: function(input){
            done = this.async();
            //分析版本是否正确或者null
            if (!semver.valid(input)) {
                console.warn(color.red('Must be a valid semantic version (semver.org).'));
                return;
            }
            done(true);
        }
    },{
        message: 'Description',
        name: 'description'
    },{
        type: "input",
        name: 'keywords',
        message: 'keywords'
    },{
        type: "list",
        name: 'licenses',
        message: 'licenses',
        default: ["MIT"],
        choices: ["MIT", "Apache", "GPL", "Artistic", "BSD", "Affero", "LGPL", "EPL", "LGPL", "MPL"]
    },{
        type: "list",
        name: "idoctheme",
        message: "Choose a theme.",
        choices: [ "default", "henry"]
    },{
        message: 'Author',
        name: 'author',
        //获取我的git上的名字和邮箱
        default: require('whoami')
    }],function(answers){

        var pk = require('./pk.json');
        var tofile = '';

        //关键词、关键字
        answers.keywords = answers.keywords.split(' ');

        //需要生成的md文件路径
        if(commander.init){

            if(commander.args.length === 0) answers.idocmd = ["index.md"];
            else {
                answers.idocmd = commander.args;
            }
        }

        //指定生成的目录位置
        if(commander.Create){
            answers.idocto = commander.Create;
            if(!/\/$/.test(answers.idocto)) answers.idocto = answers.idocto + '/';
        }else{
            answers.idocto = './';
        }

        //package.json合并输出
        var new_answers = underscore.extend(pk,answers);

        tofile = new_answers.idocto;

        if(commander.Create){
            // 生成目录
            mkdirp(tofile, function (err,info) {
                //生成文件写入指定目录
                writeFile(tofile + 'package.json',JSON.stringify(new_answers, null, 4));
            });

        }else{
            writeFile(tofile + 'package.json',JSON.stringify(new_answers, null, 4));
        }

    })
    return;
}

function writeFile(path,str){
    //生成文件写入指定目录
    fs.writeFile(path,str,function(err,info){
        if(err) return console.log(err);
        // fs.renameSync('./spmignore', './.spmignore');
        console.log("Write "+ path + " success!".green);
    })
}

exports.init = function(commander){
    runTask(commander);
};
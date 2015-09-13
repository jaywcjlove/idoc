#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var inquirer = require('inquirer');
var semver = require('semver');
var underscore = require('underscore');
var color = require('colorful')
var copyDir = require('copy-dir');
var file = require('./file')
var log = console.log;

var template = path.dirname(__dirname) + '/lib/';
var default_package = {}
/**
 * 这里执行 init 任务
 */
function runTask(commander){
    //建package.json文件
    inquirer.prompt([{
        message: 'Package name',
        name: 'name',
        default: path.basename(process.cwd()),
        validate: function(input) {
            var done = this.async();
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
            var done = this.async();
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

        // console.log("该行代码所在的目录::",__dirname);
        // console.log("返回一个路径的目录名称::",path.dirname(__dirname));
        // console.log("命令传进来的目录::",commander.Create);
        // console.log("当前目录名字::",path.basename(process.cwd()));
        // console.log("当前目录::",process.cwd());
        if(commander.Create){
            //指定生成的目录位置
            answers.idocto = commander.Create;
        }else{
            //记录当前目录位置
            answers.idocto = process.cwd();
        }
        if(!/\/$/.test(answers.idocto)) answers.idocto = answers.idocto + '/';


        //需要生成的md文件路径
        if(commander.init){

            if(commander.args.length === 0){
                //在没有目录参数的情况下

                var files = fs.readdirSync(process.cwd()),
                    mdArr = [];

                //循环找出 md 文件
                files.forEach(function(itm,idx){
                    if(itm.match(/\.(md|markdown)$/i)) mdArr.push(itm);
                })

                answers.idocmd = mdArr;

                if(mdArr.length <= 0){
                    //如果当前目录没有文件自动生成index.md
                    file.write(process.cwd() + '/index.md','# '+answers.name);
                }

            }else {
                //当指定md文件的情况下
                answers.idocmd = commander.args;

                //将指定的文件拷贝到当前目录下
                commander.args.forEach(function(item,idx){
                    copyDir(path.dirname(item), answers.idocto,function(_stat, _path, _file){
                        var stat = false;
                        if(_file === path.basename(item)) stat = true;
                        return stat;
                    },function(ed){
                        // log("Write "+ answers.idocto + path.basename(item) + color.green(' success!'))
                    });
                })
            }
        }

        //package.json合并输出
        default_package = underscore.extend(pk,answers);

        tofile = default_package.idocto;

        if(commander.Create){
            // 生成目录
            file.mkdirs(tofile,0777,function(strr){
                //生成文件写入指定目录
                writeFile(tofile + 'package.json',JSON.stringify(default_package, null, 4));
            })
        }else{
            writeFile(tofile + 'package.json',JSON.stringify(default_package, null, 4));
        }

    })
    return;
}

function writeFile(path,str){
    //生成文件写入指定目录
    fs.writeFile(path,str,function(err,info){
        if(err) return console.log(err);
        // console.log("Write "+ path + color.green(' success!'));
        var themeurl = template + '/idoc-theme/' + default_package.idoctheme;

        var todir = default_package.idocto?default_package.idocto:__dirname;

        //生成 .gitignore 文件
        copyDir(__dirname, todir,function(_stat, _path, _file){
            var stat = false;
            if(_file === 'gitignore') stat = true;
            return stat;
        },function(){
            //更改文件名字
            fs.renameSync(todir+'gitignore',todir+ '.gitignore');
        });

        //生成皮肤相关文件 模板文件除外
        copyDir(themeurl, todir,function(_stat, _path, _file){
            var stat = true;
            if(_file.match(/\.(ejs)$/i)) stat = false;
            return stat;
        },function(){

        });


        log()
        log(color.green('Initialization is successful! Please run "idoc build" command!'));
        log()
    })
}

function init(commander){
    if(fs.existsSync(template + 'idoc-theme/default/')){
        runTask(commander);
    }else{
        log(color.red("Initialization failed!"));
    }
}

module.exports = init;

#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var inquirer = require('inquirer');
var semver = require('semver');
var _ = require('underscore');
var color = require('colorful')
var ncp = require('ncp').ncp;
var file = require('./file')
var log = console.log;

var template = path.dirname(__dirname) + '/lib';
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
        choices: function(){
            return file.currentDir(template + '/theme/');
        }
    },{
        message: 'Author',
        name: 'author',
        //获取我的git上的名字和邮箱
        default: require('whoami')
    }],function(answers){

        var pk = require('./pk.json');

        //关键词、关键字
        answers.keywords = answers.keywords.split(' ');
        answers.idoc = {}
        // console.log("该行代码所在的目录::",__dirname);
        // console.log("返回一个路径的目录名称::",path.dirname(__dirname));
        // console.log("命令传进来的目录::",commander.Create);
        // console.log("当前目录名字::",path.basename(process.cwd()));
        // console.log("当前目录::",process.cwd());
        //指定生成的目录位置
        if(commander.Create){
            answers.idoc.todir = commander.Create;
        }else{
            //记录当前目录位置
            answers.idoc.todir = process.cwd();
        }
        if(!/\/$/.test(answers.idoc.todir)) answers.idoc.todir = answers.idoc.todir + '/';

        if(answers.idoctheme){
            answers.idoc.theme = answers.idoctheme;
            delete answers.idoctheme;
        }


        //需要生成的md文件路径
        if(commander.init){

        var files = fs.readdirSync(process.cwd()),
            mdArr = [];

            if(commander.args.length === 0){
                //在没有目录参数的情况下
                //循环找出 md 文件
                files.forEach(function(itm,idx){
                    if(itm.match(/\.(md|markdown)$/i)) mdArr.push(itm);
                })

                if(mdArr.length <= 0){
                    //如果当前目录没有文件自动生成index.md
                    file.write(process.cwd() + '/index.md','# '+answers.name);
                    mdArr.push('index.md');
                }

            }else {

                //将指定的文件拷贝到当前目录下
                commander.args.forEach(function(item,idx){
                    var a = 0
                    //复制复制所有静态资源到生产目录里面
                    ncp(path.dirname(item), answers.idoc.todir,{filter:function(_file){
                        if(a ===0) {a++; return true;}
                        if(_file === item) return true;
                    }},function (err) {
                        if(err) return console.error(err);
                    });
                })
                
                commander.args.forEach(function(itm,idx){
                    if(itm.match(/\.(md|markdown)$/i)) mdArr.push(path.basename(itm));
                })
            }
            // 存在 index.md 将其移动到第一位
            mdArr = _.without(mdArr,"index.md")
            mdArr.unshift("index.md")
            answers.idoc.md = mdArr;
        }

        //package.json合并输出
        default_package = _.extend(pk,answers);

        // 生成目录
        file.write(default_package.idoc.todir + 'package.json',JSON.stringify(default_package, null, 4));

        // 皮肤路径
        var themeurl = template + '/theme/' + default_package.idoc.theme;

        // 初始化到指定目录或者当前目录
        var todir = default_package.idoc.todir?default_package.idoc.todir:__dirname;

        //复制复制所有静态资源到生产目录里面
        ncp(themeurl+'/source/', todir, {filter:function(_file){
            if(!/\.(styl)$/.test(_file)) {
                return true;
            }else{
                return false;
            }
        }},function (err) {
            if(err) return console.error(err);
        });

        log()
        log(color.green('Initialization is successful! Please run "idoc build" command!'));
        log()

    })
    return;
}

function init(commander){
    if(fs.existsSync(template + '/theme/default/')){
        runTask(commander);
    }else{
        log(color.red("Initialization failed!"));
    }
}

module.exports = init;

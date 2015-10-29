#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var inquirer = require('inquirer');
var semver = require('semver');
var _ = require('underscore');
var color = require('colorful');
var copy = require('./copy');
var file = require('./file');
var theme  = require('./theme');
var menu_json = require('./menu_json');
var log = console.log;

var template = path.dirname(__dirname);
var default_package = {}
/**
 * 这里执行 init 任务
 */
function runTask(commander){
    if(commander.Create) file.mkdirsSync(commander.Create,0777);
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
        choices: theme.themeList()
    },{
        message: 'Author',
        name: 'author',
        //获取我的git上的名字和邮箱
        default: require('./whoami')
    }],function(answers){

        var pk = require('./pk.json');
        var todir = ''

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
            todir = commander.Create;
        }else{
            //记录当前目录位置
            todir = process.cwd();
        }

        // 处理指定目录路径
        if(!/\/$/.test(todir)) todir = todir + '/';

        // 记录皮肤名字
        if(answers.idoctheme){
            answers.idoc.theme = answers.idoctheme;
            delete answers.idoctheme;
        }

        //需要生成的md文件路径
        if(commander.init){
            var mdurl = path.normalize(todir + '/md');
            // 判断md 目录存在不生成目录
            if( !file.exists(mdurl) ) file.mkdirsSync(mdurl,0777);

            if(commander.args.length>0){
                // 判断是否指定某个目录里面 md 拷贝到当前项目目录下
                commander.args.forEach(function(item,idx){
                    copy(path.resolve(item),todir+'md/',{
                        filter:function(_file){
                            if(/\.(md)$/.test(_file)) return true;
                            else false;
                        }
                    },function(err,_file){
                        if(err) return console.log(err);
                        // console.log("复制成功！:",_file);
                    })
                })
            }

            //移动根目录的md文件到md目录中，并解决冲突
            _.filter(file.currentFile(todir),function(_filename){
                return /\.(md)$/.test(_filename)
            }).forEach(function(_fname){
                var pt = todir+'md/'+_fname;
                var _nname = "";
                if(file.exists(pt)) _nname = path.basename(pt, '.md') + parseInt(Math.random()*1000000) + '.md';
                else _nname = _fname;

                //复制到指定目录更改名字
                fs.renameSync(todir+_fname,todir+'md/'+_nname);
            })

            //递归获取 md 下面所有的md文件 返回json
            answers.idoc.md = menu_json(todir + 'md/');
        }

        //package.json合并输出
        default_package = _.extend(pk,answers);

        // 生成目录
        file.write(todir + 'package.json',JSON.stringify(default_package, null, 4));

        // 皮肤路径
        var themeurl = template + '/theme/' + default_package.idoc.theme;

        // 初始化到指定目录或者当前目录
        var todir = default_package.idoc.todir?default_package.idoc.todir:__dirname;

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

var path = require('path');
var inquirer = require('inquirer');
var semver = require('semver');
var underscore = require('underscore')
var color = require('colorful').color;
var log = console.log;

/**
 * 这里执行 init 任务
 */
function runTask(){
    console.log("message");
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
        message: 'keywords',
        default: ["MIT"]
    },{
        type: "list",
        name: 'licenses',
        message: 'licenses',
        default: ["MIT"],
        choices: ["MIT", "Apache", "GPL", "Artistic", "BSD", "Affero", "LGPL", "EPL", "LGPL", "MPL"]
    },{
        type: "list",
        name: "idocTheme",
        message: "Choose a theme.",
        choices: [ "default", "henry"]
    },{
        message: 'Author',
        name: 'author',
        //获取我的git上的名字和邮箱
        default: require('whoami')
    }],function(answers){
        var pk = require('./pk.json')
        var new_answers = underscore.extend(pk,answers)
        console.log("new_answers:",new_answers);
    })
    return;
}


exports.init = function(){
    runTask();
};
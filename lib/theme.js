/**
 * 选择主题命令
 */
var inquirer = require('inquirer');
var file = require('./file');
var path = require('path');
var build   = require('./build');
var server  = require('ssr');

var template = path.dirname(__dirname);

var theme = module.exports = {
    runTask:runTask,
    themeList:themeList
}

function runTask(commander){

    var pkg = require(path.resolve('package.json'));

    if(commander.theme && commander.args.length > 0){
        build(commander);
        server();
    }else{

        inquirer.prompt([{
            type: "list",
            name: "theme",
            message: " Choose a theme.",
            choices: themeList()
        }],function(answers){
            pkg.idoc.theme = answers.theme;
            file.write(process.cwd() + '/package.json',JSON.stringify(pkg, null, 4));
            build(commander);
        })

    }

}

/**
 * [themeList 获取主题列表]
 * @return {[type]} [array]
 */
function themeList(){
    var _def = file.currentDir(template + '/theme/');

    var _m = file.currentDir(process.cwd() + '/')
    
    for (var i = 0; i < _m.length; i++) {
        if(/^idoc\-theme./.test(_m[i])){
            _def.push(_m[i])
        }
    };

    return _def
}
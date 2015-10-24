var fs = require('fs');
var chokidar = require('chokidar');
var color = require('colorful');
var path    = require('path');
var file    = require('./file');
var log = console.log;

function watch(commander,build){

    // 过滤文件
    var filter = function(pattern, fn) {
        return function(filename) {
            if (pattern.test(filename)) {
                fn(filename);
            }
        }
    }

    var file = fs.readdirSync(process.cwd());

    log(color.green("Waiting...") );
    log(color.blue("idoc is running. Press Ctrl+C to stop."));
    log();

    var now = new Date();

    var watcher = chokidar.watch(process.cwd()+'/md', {
        // ignored: /[^\.md]$/, //正则过滤哪些被监控
        persistent: true,
        ignoreInitial:true// 初始化不执行事件
    });

    var _path = '';
    var _root = process.cwd()+'/md'
    
    watcher
        .on('add', function(path) { // 添加文件

            changMenuBuild(commander,build, color.blue('File') + path.replace(_root,'') + 'has been added');

        })
        .on('change', function(path) { // 文件更改
            
            build(commander,path);
            log( color.blue('File'), details.path.replace(_root,''), color.blue('has been changed!') );
            
        })
        .on('unlink', function(path) { // 删除文件

            changMenuBuild(commander,build, color.blue('File') + path.replace(_root,'') + 'has been removed');

        })
        // More events. 
        .on('addDir', function(path) { // 添加文件夹

            changMenuBuild(commander,build, color.blue('Directory') + path.replace(_root,'') + 'has been added');
            
        })
        .on('unlinkDir', function(path) {// 删除文件夹

            changMenuBuild(commander,build, color.blue('Directory') + path.replace(_root,'') + 'has been removed');

        })
        .on('error', function(error) { log('Error happened', error); })
        .on('ready', function() { log('Initial scan complete. Ready for changes.\n'); })
        .on('raw', function(event, path, details) { 
            // log('\n Raw event info:', event, path, details,'\n');
        });
}
module.exports = watch;

function changMenuBuild(commander,build, str){
    require('./menu_update')();
    log(str);
    build(commander);
}
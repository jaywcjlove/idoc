var fs = require('fs');
var chokidar = require('chokidar');
var color = require('colorful');
var path    = require('path');
var file    = require('./file');
var menuInit = require('./menuInit');
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
        // .on('add', function(path) { // 添加文件
        //     changePkg("add",path.replace(_root,''));

        //     log('File', path.replace(_root,''), 'has been added'); 
        //     // build(commander);
        // })
        // .on('change', function(path) { // 文件更改
        //     changePkg("change",path.replace(_root,''));

        //     log('File', path.replace(_root,''), 'has been changed'); 
        //     build(commander,path);
        // })
        // .on('unlink', function(path) { // 删除文件
        //     changePkg("unlink",path.replace(_root,''));

        //     log('File', path.replace(_root,''), 'has been removed'); 

        //     // build(commander);
        // })
        // // More events. 
        // .on('addDir', function(path) { // 添加文件夹
        //     changePkg("addDir",path.replace(_root,''));
            
        //     log('Directory', path.replace(_root,''), 'has been added');
        //     // build(commander); 
        // })
        // .on('unlinkDir', function(path) {// 删除文件夹
        //     changePkg("unlinkDir",path.replace(_root,''));

        //     log('Directory', path.replace(_root,''), 'has been removed');
        //     // build(commander);
        // })
        .on('error', function(error) { log('Error happened', error); })
        .on('ready', function() { log('Initial scan complete. Ready for changes.\n'); })
        .on('raw', function(event, path, details) { 
            if(details.event !== 'modified'){
                changePkg();
                build(commander);
                // log("\n其它操作:\n");
            }else{
                build(commander,path);
                log( color.blue('File'), details.path.replace(_root,''), color.blue('has been changed!') ); 
            }
            // log('\n Raw event info:', event, path, details,'\n');
        });
}

function changePkg(){
    var pkg = require(path.resolve('package.json'));
    var mddata = pkg.idoc.md;

    // 初始化菜单
    if(pkg&&pkg.idoc&&pkg.idoc.md){
        //递归获取 md 下面所有的md文件 返回json
        var mdjson = menuInit(process.cwd() + '/md/');

        pkg.idoc.md = moveElement(mddata,mdjson);
        // 生成目录
        file.write(process.cwd() + '/package.json',JSON.stringify(pkg, null, 4));
    }
}

/**
 * [moveElement 合并两个数组以及JSON，保留老的数组中元素的位置]
 * @param  {[array]} _old [老的数组]
 * @param  {[array]} _new [新的数组]
 * @return {[array]}      [返回合并后的数组]
 */
function moveElement(_old,_new){
    var empty = [],newEmpty = [];
    for (var i = 0; i < _new.length; i++) {

        var idx = _old.indexOf(_new[i]),
            item = _new[i];

        if(typeof(item) === 'string'){
            // 字符串移动
            if(idx === -1) newEmpty.push(item);
            else empty.splice(idx, 0, item);
        }else{
            // JSON对象移动
            idx = null;
            console.log("message:key:",item);
            var key = Object.keys(item)[0],_json={};
            for (var a = 0; a < _old.length; a++) {
                if(typeof(_old[a]) === 'object' && Object.keys(item)[0] === Object.keys(_old[a])[0]) idx = a;
            };
            if(idx){
                _json[key] = moveElement(_old[idx][key],item[key]);
                empty.splice( idx, 0, _json );
            }
        }
    }
    return empty.concat(newEmpty);
}

module.exports = watch;
var fs = require('fs');
var file = require('./file');
var log = console.log;
var color = require('colorful');
// var exec = require('child_process').exec

module.exports = clean

function clean(commander){

    var url = process.cwd();
    var arr = fs.readdirSync(url);
    for (var i = 0; i < arr.length; i++) {
        // 使用系统的命令删除文件夹
        // exec('rm -rf '+arr[i],function(err,out) { 
        //     console.log(out); err && console.log(err); 
        // });
        if( file.isDir(url+'/'+arr[i]) && (arr[i] === 'html' || arr[i] === 'static') ){
            deleteFolderRecursive(url+'/'+arr[i])
            log( color.green('delete "/') + arr[i] + color.green('" Success !') );
        }else if( file.isFile(url+'/'+arr[i]) && arr[i] === 'index.html' ){
            fs.unlinkSync( url+'/'+arr[i] );
            log( color.green('delete "/') + arr[i] + color.green('" Success !') );
        }
    };
}

// 使用递归删除文件
deleteFolderRecursive = function(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
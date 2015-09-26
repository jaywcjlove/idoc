var fs = require('fs');
var file = require('./file');
var log = console.log;
var exec = require('child_process').exec

module.exports = clean

function clean(commander){

    var url = process.cwd();
    var arr = fs.readdirSync(url);

    for (var i = 0; i < arr.length; i++) {

        if( (file.isFile(url+'/'+arr[i]) && arr[i] !== 'package.json') || 
            (file.isDir(url+'/'+arr[i]) && arr[i] !== 'md') ){

            if( file.isFile(url+'/'+arr[i]) ){
                fs.unlinkSync( url+'/'+arr[i] );
            }else{
                deleteFolderRecursive(url+'/'+arr[i]);
                // 使用系统的命令删除文件夹
                // exec('rm -rf '+arr[i],function(err,out) { 
                //     console.log(out); err && console.log(err); 
                // });
            }
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
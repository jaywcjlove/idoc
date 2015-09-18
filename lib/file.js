var fs = require('fs')
var path = require('path');
var _ejs = require('ejs');
var _ = require('underscore');

var file = module.exports = {
    mkdirs:mkdirs,
    exists:exists,
    read:read,
    write:write,
    ejs:ejs,
    isDir:isDir,
    isFile:isFile,
    mkdirsSync:mkdirsSync,
    currentDir:currentDir,
    currentFile:currentFile
};

// 波浪号的绝对路径
function resolvePath (string) {
    if (string.substr(0,1) === '~')
    string = process.env.HOME + string.substr(1)
    return path.resolve(string)
}

// 同步循环创建所有目录
function mkdirsSync(dirpath, mode) {
    var _path = dirpath.replace(/\/$/, '').split('/');
    for (var i = 1; i <= _path.length; i++) {
        var segment = resolvePath(_path.slice(0, i).join('/')) ;
        !exists(segment) ? fs.mkdirSync(segment,mode) : null ;
    }
};
// 异步循环创建所有目录
function mkdirs(dirpath, mode, callback) {
    //Call the standard fs.mkdir
    fs.mkdir(dirpath, mode, function(error) {
        //When it fail in this way, do the custom steps
        if (error && error.errno === 34) {
            //Create all the parents recursively
            !exists(path.dirname(dirpath))&&mkdirs(path.dirname(dirpath), mode, callback);
            //And then the directory
            !exists(dirpath)&&mkdirs(dirpath, mode, callback);
        }
        //Manually run the callback since we used our own callback to do all these
        !error&&callback && callback(error);
    });
};
//读取文件内容，路径不存在返回空
function read(filepath) {
    return fs.readFileSync(filepath, 'utf8');
};

//复制文件
function copyFile(){

}

//写文件
function write(filepath, content) {
    mkdirs(path.dirname(filepath));
    return fs.writeFileSync(filepath, content);
};

//模板输出 HTML 代码
function ejs(path,data){
    return _ejs.render(file.read(path),_.extend({filename: path},data) );
}

//检查指定路径的文件或者目录是否存在
function exists(path){
    return fs.existsSync(path);
}

//判断是不是文件
function isFile(path){
    return exists(path) && fs.statSync(path).isFile();  
} 

//判断是不是目录
function isDir(path){
    return exists(path) && fs.statSync(path).isDirectory();  
}

//获取路径下面的所有dir
function currentDir(path){
    return _.filter(fs.readdirSync(path),function(dirname){
        return isDir(path+dirname);
    })
}
//获取路径下面的所有file
function currentFile(path){
    return _.filter(fs.readdirSync(path),function(dirname){
        return isFile(path+dirname);
    })
}

//获取目录下所有md文件的相对路径
function getMdPaths(path){

}
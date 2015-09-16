var fs = require('fs')
var path = require('path');
var _ejs = require('ejs');
var _ = require('underscore');

var file = module.exports = {
    mkdirs:mkdirs,
    read:read,
    write:write,
    ejs:ejs,
    isDir:isDir,
    isFile:isFile,
    currentDir:currentDir
};

// 循环创建所有目录
function mkdirs(dirpath, mode, callback) {
    fs.exists(dirpath, function(exists) {
        if(exists) {
            if(callback) callback(dirpath);
        } else {
            //尝试创建父目录，然后再创建当前目录
            mkdirs(path.dirname(dirpath), mode, function(){
                    fs.mkdir(dirpath, mode, callback);
            });
        }
    });
};
//读取文件内容
function read(filepath) {
    return fs.readFileSync(filepath, 'utf8');
};

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

//获取路径下面的所有目录
function currentDir(path){
    return _.filter(fs.readdirSync(path),function(dirname){
        return isDir(path+dirname);
    })
}
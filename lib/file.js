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
    readMDSync:readMDSync,
    readMDJSONSync:readMDJSONSync,
    mkdirsSync:mkdirsSync,
    currentDir:currentDir,
    currentFile:currentFile,
    relativePath:relativePath
};
//判断是否存在这个方法
if(!String.repeat ){
    //创建 repeat 方法: 重复复制字符串
    String.prototype.repeat = function(num){
        return new Array(isNaN(num)? 1 : ++num).join(this);
        //创建元素值为空、个数为重复次数+1的数组，用字符串自身做为分隔符连接起来，返回连接后的值。
    }
}
// 返回相对路径
// from 文件绝对路径
// to 指定到目录的相对目录
function relativePath(from,to){
    var url = from.replace(to + '/','');
    // console.log("relativePath:123:",'\n  ',from,'\n  ',to);
    // console.log("relativePath:",url);
    var len = url.split('/').length;
    if(len < 2) return '';
    else return '../'.repeat(len-1);
}

// 波浪号的绝对路径
function tildePath (string) {
    if (string.substr(0,1) === '~')
    string = process.env.HOME + string.substr(1);
    return path.resolve(string)
}

// 同步循环创建所有目录 resolvePath
function mkdirsSync(dirpath, mode) {
    var _path = dirpath.replace(/\/$/, '').split('/');
    for (var i = 1; i <= _path.length; i++) {
        var segment = tildePath(_path.slice(0, i).join('/')) ;
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

//返回 MD 所有路径的 Array
function readMDSync(filepath){
    var str = '',files = fs.readdirSync(filepath);
    for (var i = 0; i < files.length; i++) {
        if(isDir(filepath+files[i])) str +=  readMDSync(filepath+files[i]+'/');
        else if(/\.(md)$/.test(files[i])){
            str += (filepath + files[i] + ',');
        } 
    };
    return str;
}

//返回 MD JSON，路径拆分
function readMDJSONSync(filepath){
    var arr = [],_json,files = fs.readdirSync(filepath);
    for (var i = 0; i < files.length; i++) {
        if(isDir(filepath+files[i])) {
            _json = {};
            _json[files[i]]=readMDJSONSync(filepath+files[i]+'/');
            arr.push(_json)
        }else if(/\.(md)$/.test(files[i])){
            arr.push(files[i])
        } 
    };
    return arr;
}

//写文件
function write(filepath, content) {
    mkdirsSync(path.dirname(filepath));
    return fs.writeFileSync(filepath, content);
};

//模板输出 HTML 代码
function ejs(_path,data){

    return _ejs.compile(file.read(_path), {filename: _path})(data);
    return _ejs.render(file.read(_path),_.extend({filename: _path},data) );
}

//检查指定路径的文件或者目录是否存在
function exists(_path){
    return fs.existsSync(_path);
}

//判断是不是文件
function isFile(_path){
    return exists(_path) && fs.statSync(_path).isFile();  
} 

//判断是不是目录
function isDir(_path){
    return exists(_path) && fs.statSync(_path).isDirectory();  
}

//获取路径下面的所有dir
function currentDir(_path){
    if(exists(_path))
    return _.filter(fs.readdirSync(_path),function(dirname){
        return isDir(_path+dirname);
    })
}
//获取路径下面的所有file
function currentFile(_path){
    return _.filter(fs.readdirSync(_path),function(dirname){
        return isFile(_path+dirname);
    })
}

//获取目录下所有md文件的相对路径
function getMdPaths(_path){

}
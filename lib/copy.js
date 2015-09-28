/* 

// 调用方法
copy(source, destination, option, function (err) {
    if (err) {
        return console.error(err);
    }
    console.log('done!');
});


option.filter 过滤文件是否要复制

 */


var fs = require('fs'),
    path = require('path'),
    out = process.stdout,
    stat = fs.stat,
    option = null;

module.exports = copy;


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
// 判断是否为 json
function isJSON(obj) {
    var isjson = typeof(obj) == "object" &&
        toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    return isjson;
}

// 循环异步创建所有目录
function mkdirs(dirPath, mode, callback) {
    //Call the standard fs.mkdir
    fs.mkdir(dirPath, mode, function(error) {
        //When it fail in this way, do the custom steps
        if (error && error.errno === 34) {
            //Create all the parents recursively
            !exists(path.dirname(dirPath))&&mkdirs(path.dirname(dirPath), mode, callback);
            //And then the directory
            !exists(dirPath)&&mkdirs(dirPath, mode, callback);
        }
        //Manually run the callback since we used our own callback to do all these
        !error&&callback && callback(error);
    });
};

// 波浪号的绝对路径
function resolvePath (string) {
    if (string.substr(0, 2) === '~/')
    string =  (process.env.HOME || process.env.HOMEPATH || process.env.HOMEDIR || process.cwd()) + string.substr(1);
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

// 复制文件 或 文件夹
function copy(from,to,_option,cb){

    // 选项设置如果存在，赋值给全局变量
    if(_option&&isJSON(_option)) option = _option;

    // 回调函数如果不存在 _option 不为参数
    if(!cb && !isJSON(_option)) cb = _option || function(){};

    // 回调函数如果不存在
    if(!cb && isJSON(_option)) cb = function(){};

    if(isFile(from)){
        // 循环创建目录
        mkdirsSync(to,0777,function(err){
            if(err) return console.log("err11",err);
        });
        // 拷贝文件
        copyfile(from,to,cb);
    }else{
        copyDir(from,to,cb)
    }
}

function copyDir(from,to,cb){
    // 异步读取指定目录中的内容
    var paths = fs.readdirSync(from);
    paths.forEach(function(_path){
        var _src = path.normalize(from + '/' +  _path),
            _dst = path.normalize(to  + '/' +  _path);

        if(isFile(_src)){
            copyfile(_src,_dst,cb)
        }else if(isDir(_src)){
            existDir( _src, _dst, copyDir , cb);
        }
    });
}

// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
function existDir( src, dst, copyd ,cb){
    // 循环创建目录
    mkdirsSync(dst,0777,function(err){
        if(err) return console.log("err11",err);
    });
    copyd( src, dst, cb);
}

// 复制文件
function copyfile(from,to,cb){

    // 判断是否过滤
    if( option && option.filter && !option.filter(from) ) return;

    // 复制到目录中没有指定文件名，指定默认的文件名字
    if(isDir(to)) to += path.basename(from);

    var err = null;

    // 没有指定的目录判断
    if(!to) return cb('Do not specify a path.');

    if (!(from && to && exists(from))) return cb('Error: no such file or directory ' + from);

    // 创建读取流
    var readStream = fs.createReadStream( from ,{
        flags : 'r',
        encoding : null,
        mode : 0666
    });
    // 创建写入流
    var writeStream = fs.createWriteStream( to ,{
        flags: 'a',
        encoding: null,
        mode: 0666   
    });
    // // 通过管道来传输流
    // readStream.pipe( writeStream );


    // 获取文件的基本信息
    var stats = fs.statSync(from);

    var totalSize = stats.size;
    var passedLength = 0;
    var lastSize = 0;
    var startTime = Date.now();

    //回调
    cb = cb || function(){};

    // 当有数据流出时，写入数据
    readStream.on('data', function(chunk) {
        passedLength += chunk.length;
        // 如果没有写完，暂停读取流
        if (writeStream.write(chunk) === false) {
            readStream.pause();
        }
    });

    // 当没有数据时，关闭数据流
    readStream.on('end', function() {
        writeStream.end();
        cb(err,from);
    });

    // 写完后，继续读取
    writeStream.on('drain', function() {
        readStream.resume();
    });



    //大文件复制
    // setTimeout(function show() {
    //     var percent = Math.ceil((passedLength / totalSize) * 100);
    //     var size = Math.ceil(passedLength / 1000000);
    //     var diff = size - lastSize;
    //     lastSize = size;
    //     out.clearLine();
    //     out.cursorTo(0);
    //     out.write('Completed:' + size + 'MB, ' + (percent?percent:100) + '%, Speed：' + diff * 2 + 'MB/s' + '; file：' + from);
    //     if (passedLength < totalSize) {
    //         setTimeout(show, 500);
    //     } else {
    //         var endTime = Date.now();
    //         console.log();
    //         console.log('Total：' + (endTime - startTime) / 1000 + 's。');
    //     }
    // }, 500);
}

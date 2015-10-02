/**
 * 获取某文件夹下的所有 `md` 文件的一个 json 数据
 */

var _ = require('underscore');
var file = require('./file');

module.exports = menuInit


function menuInit(_path){
    //_path = todir + 'md/'
    //递归获取 md 下面所有的md文件
    var files,mdArr = file.readMDJSONSync(_path);

    //获取当前目录下的所有 md 文件
    files = file.currentFile(_path).map(function(elem, index) {
        if(/\.(md)$/.test(elem)) return elem;
    });
    // 去掉不存在的空或者 null | undefined 的元素
    files = _.compact(files);

    //如果当前目录下没有文件(非文件夹)自动生成 index.md （目录里面的除外）
    //md 根目录必须有一个 md文件
    if(mdArr.length <= 0 || files.length === 0){
        file.write(_path + 'index.md','# '+answers.name);
        //添加到数组的第一个位置
        mdArr.unshift('index.md');
    }else{
        // 将数组中的 md 移动到第一的位置 为默认生成index.html
        mdArr = _.without(mdArr,files[0]);
        mdArr.unshift(files[0]);
    }

    return mdArr;
}
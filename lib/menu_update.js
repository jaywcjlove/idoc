var path = require("path");
var menu_json = require('./menu_json');
var file    = require('./file');

function changePkg(){
    var pkg = require(path.resolve('package.json'));
    var mddata = pkg.idoc.md;

    // 初始化菜单
    if(pkg&&pkg.idoc&&pkg.idoc.md){
        //递归获取 md 下面所有的md文件 返回json
        var mdjson = menu_json(process.cwd() + '/md/');

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
            // console.log("message:key:",item);
            var key = Object.keys(item)[0],_json={};
            for (var a = 0; a < _old.length; a++) {
                if(typeof(_old[a]) === 'object' && Object.keys(item)[0] === Object.keys(_old[a])[0]) idx = a;
            };
            if(idx){
                _json[key] = moveElement(_old[idx][key],item[key]);
                empty.splice( idx, 0, _json );
            }else{
                empty.push(_new[i])
            }
        }
    }
    return empty.concat(newEmpty);
}

module.exports = function(){
    changePkg()
};
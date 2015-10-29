var path = require("path");
var menu_json = require('./menu_json');
var file    = require('./file');


Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

/**
 * [moveElement 合并两个数组以及JSON，保留老的数组中元素的位置]
 * @param  {[array]} _old [老的数组]
 * @param  {[array]} _new [新的数组]
 * @return {[array]}      [返回合并后的数组]
 */
function moveElement(_old,_new){
    var _o_a = _old, _n_a = _new;

    for (var i = 0; i < _new.length; i++) {
        var idx = _old.indexOf(_new[i]),
            item = _new[i];

        if(typeof(item) === 'string'){
            if(idx === -1) _o_a.push(item);
        }else{
            var key = Object.keys(item)[0];
                idx = null;
            for (var a = 0; a < _old.length; a++) {
                if(typeof(_old[a]) === 'object' && key === Object.keys(_old[a])[0]) idx = a;
            };
            if(idx){
                item[key] = moveElement(_old[idx][key],item[key])
            }else{
                _o_a.push(item);
            }
        }
    };

    for (var i = 0; i < _old.length; i++) {
        var idx = _new.indexOf(_old[i]),
            item = _old[i];

        if(typeof(item) === 'string'){
            if(idx === -1) _o_a.remove(item)
        }else{
            var key = Object.keys(item)[0];
                idx = null;
            for (var a = 0; a < _new.length; a++) {
                if(typeof(_new[a]) === 'object' && key === Object.keys(_new[a])[0]) idx = a;
            };
            if(!idx) _o_a.remove(item);
        }
    };
    return _o_a
}

module.exports = function(){
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
};
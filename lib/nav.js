// 导航生成
var path    = require('path')
var log = console.log;

module.exports = nav;

function nav(arr,_path){
    var html = '<ul>'
    for (var i = 0; i < arr.length; i++) {

        if(path.basename(_path) === arr[i]){
            html+='<li class="active">';
        }else{
            html+='<li>';
        }

        if(typeof arr[i] === 'object'){
            for (var a in arr[i]) {
                html+='<a href="#"><span></span>'+ a +'</a>';
                html+=nav(arr[i][a],_path);
            };
        }else{
            //判断是否为首页
            if(arr[i] === 'index.md'){

            }
            html+='<a href="1">'+ arr[i].replace(/\.md/,'') +'</a>';
        }
        html+='</li>';
    };
    html += '</ul>';
    return html;
}
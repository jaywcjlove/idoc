// 导航生成
var path    = require('path')
var log = console.log;

module.exports = nav;

function nav(arr,_path,_url){
    var html = '<ul>',_url = _url? _url : '/';
    for (var i = 0; i < arr.length; i++) {

        if(path.basename(_path) === arr[i]){
            html+='<li class="active">';
        }else{
            html+='<li>';
        }

        if(typeof arr[i] === 'object'){
            for (var a in arr[i]) {
                _url = _url? _url + a + '/' : '/';
                html+='<a href="#"><span></span>'+ a +'</a>';
                html+=nav(arr[i][a],_path,_url);
            };
        }else{
            //判断是否为首页
            if(arr[i] !== 'index.md'){
                _url = '/html' + _url;
            }
            html+='<a href="'+_url+arr[i].replace(/\.md/,'.html')+'">'+ arr[i].replace(/\.md/,'') +'</a>';
        }
        html+='</li>';
    };
    html += '</ul>';
    return html;
}
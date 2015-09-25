// 导航生成
var path    = require('path')
var log = console.log;

module.exports = nav;

//arr 导航json 
//_path 选中的连接
//_url 所有url Array
function nav(arr,_path,_url){
    var html = '<ul>',url ='';
    for (var i = 0; i < arr.length; i++) {

        if(path.basename(_path) === arr[i]){
            html+='<li class="active">';
        }else{
            html+='<li>';
        }

        if(typeof arr[i] === 'object'){
            for (var a in arr[i]) {
                html+='<a href="#"><span></span>'+ a +'</a>';
                html+=nav(arr[i][a],_path,_url);
            };
        }else{
            url = pathto(_url,arr[i]);
            html+='<a href="'+ pathto(_url,arr[i]) +'">'+ arr[i].replace(/\.md/,'') +'</a>';
        }
        html+='</li>';
    };
    html += '</ul>';
    return html;
}

// 返回当前文件的url
function pathto(urlarr,basename){
    var url = '';
    for (var i = 0; i < urlarr.length; i++) {
        if(urlarr[i].indexOf(basename) > -1) url = urlarr[i];
    };

    if(basename === 'index.md'){
        url = '/'+basename;
    }else{
        url = url.replace(process.cwd()+'/md','/html');
    }
    return url.replace(/\.md/,'.html');
}

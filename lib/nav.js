// 导航生成
var path    = require('path')
var log = console.log;

module.exports = nav;


/**
 * arr 导航json 
 * _path 选中的连接
 * _url 所有url Array
 * _sub 是否在回调的第一次，如果是为空
 */
function nav(arr,_path,_url,_sub){
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
                html+=nav(arr[i][a],_path,_url,'sub');
            };
        }else{
            if(i ===0 && !_sub){
                url = pathto(_url,arr[i],0);
            }else{
                url = pathto(_url,arr[i]);
            }
            html+='<a href="'+ url +'">'+ arr[i].replace(/\.md/,'') +'</a>';
        }
        html+='</li>';
    };
    html += '</ul>';
    return html;
}

// 返回当前文件的url
function pathto(urlarr,basename,index){
    var url = '';
    for (var i = 0; i < urlarr.length; i++) {
        if(urlarr[i].indexOf(basename) > -1) url = urlarr[i];
    };

    // 首页判断
    if(index === 0){
        url = '/index.html';
    }else{
        url = url.replace(process.cwd()+'/md','/html').replace(/\.md/,'.html');
    }
    return url;
}

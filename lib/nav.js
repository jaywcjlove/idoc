// 导航生成
var path    = require('path')
var file    = require('./file')
var log = console.log;

module.exports = nav;


/**
 * arr 导航json 
 * current 当前页面的路径
 * _url 所有url Array
 * _sub 是否在回调的第一次，如果是为空
 * floor 导航菜单是否为第一层
 */

var indexname = '';
var floornum = 0;
function nav(arr, current, _url, floor, _sub){
    var html = '<ul>',url ='';
    for (var i = 0; i < arr.length; i++) {

        var s = _sub ? _sub+'/'+arr[i]:arr[i];

        if(current.replace(process.cwd()+'/md/','') === s){
            html+='<li class="active">';
        }else{
            html+='<li>';
        }

        if(typeof arr[i] === 'object'){
            for (var a in arr[i]) {
                html+='<a href="#"><span></span>'+ a +'</a>';
                html+=nav(arr[i][a],current,_url,floor, (_sub? _sub + '/' + a:a));
            };
        }else{

            // 获取首页 markdown 的文件名
            if(i ===0 && !_sub) indexname = arr[i];
            // 返回相对路径
            url = pathto(_url,
                (_sub ? _sub+'/'+ arr[i] : arr[i]),
                current,indexname,floor);

            html+='<a href="'+ url +'">'+ arr[i].replace(/\.md/,'') +'</a>';
        }
        html+='</li>';
    };
    html += '</ul>';
    return html;
}

// 导航菜单跳转的 path
// urlarr 所有url Array
// basename url元素
// current 当前页面的路径
// index 首页name
// floor 导航菜单目录层级
function pathto(urlarr,basename,current,index,floor){
    // console.log("pathto:",'\n',urlarr,'\n',basename,'\n当前:',current,'\n首页：',index);
    // console.log("basename::",basename);
    var url = '',temp='';
    for (var i = 0; i < urlarr.length; i++) {
        if(urlarr[i].indexOf(basename) > -1) url = urlarr[i];
    };

    // 传进来的 url 处理
    url = url.replace(process.cwd()+'/md',process.cwd() + '/html').replace(/\.md/,'.html');

    // 当前md 的 url 处理
    current = current.replace(process.cwd()+'/md',process.cwd() + '/html').replace(/\.md/,'.html');

    // 跳转首页相对地址 特殊处理
    var _index = index;

    index = index.replace(/\.md/,'.html');
    if(_index === basename){
        url = url.replace(process.cwd()+'/html/','').replace(index,'index.html')
    }else{
        url = url.replace(process.cwd()+'/','')
    }

    // 获取相对路径
    temp = file.relativePath(current ,process.cwd());
    
    // 首页跳转到其他页面的特殊处理
    if(floor === 0) temp = "";

    temp += url;
    return temp;
}


// // 返回当前文件的url
// function pathto(urlarr,basename,index){
//     var url = '';
//     for (var i = 0; i < urlarr.length; i++) {
//         if(urlarr[i].indexOf(basename) > -1) url = urlarr[i];
//     };

//     // 首页判断
//     if(index === 0){
//         url = '/index.html';
//     }else{
//         url = url.replace(process.cwd()+'/md','/html').replace(/\.md/,'.html');
//     }
//     return url;
// }

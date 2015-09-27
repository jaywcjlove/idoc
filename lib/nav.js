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
 */

var indexname = ''
function nav(arr,current,_url,_sub){
    var html = '<ul>',url ='';
    for (var i = 0; i < arr.length; i++) {

        if(path.basename(current) === arr[i]){
            html+='<li class="active">';
        }else{
            html+='<li>';
        }

        if(typeof arr[i] === 'object'){
            for (var a in arr[i]) {
                html+='<a href="#"><span></span>'+ a +'</a>';
                html+=nav(arr[i][a],current,_url,'sub');
            };
        }else{
            var isIndex = false
            if(i ===0 && !_sub){
                indexname = arr[i];
                isIndex = true;
            }
            url = pathto(_url,arr[i],current,indexname,isIndex);

            // console.log("url:2:",file.relativePath(url));
            // url = file.relativePath(url) + url.replace(/^\//,'');
            // console.log("url:1:",url);
            // console.log("url:3:",url);
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
// isIndex 是否为首页
function pathto(urlarr,basename,current,index,isIndex){
    // console.log("pathto:",'\n',urlarr,'\n',basename,'\n当前:',current,'\n首页：',index);
    var url = '',temp='';
    for (var i = 0; i < urlarr.length; i++) {
        if(urlarr[i].indexOf(basename) > -1) url = urlarr[i];
    };

    // 传进来的 url 处理
    url = url.replace(process.cwd()+'/md',process.cwd() + '/html').replace(/\.md/,'.html');

    // 当前md 的 url 处理
    current = current.replace(process.cwd()+'/md',process.cwd() + '/html').replace(/\.md/,'.html');

    // 跳转首页相对地址 特殊处理
    index = index.replace(/\.md/,'.html');
    var reg = new RegExp('\/'+index+'$','i')
    if(reg.test(url)){
        url = url.replace(process.cwd()+'/html/','').replace(index,'index.html')
    }else{
        url = url.replace(process.cwd()+'/','')
    }


    temp = file.relativePath(current ,process.cwd());
    // 首页跳转到其他页面的处理
    if(reg.test(current)){
        temp = "";
    }
    temp += url
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

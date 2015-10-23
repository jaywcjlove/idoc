var cheerio = require('cheerio');
var hljs = require("highlight.js");
var log = console.log;

module.exports = toc

function toc(str,cb){

    var option = {}
    $ = cheerio.load(str)

    // 代码高亮使用 highlight.js 
    // 网站 http://adilapapaya.com/docs/highlight.js/#nodejs
    // 官网 https://highlightjs.org/
    $('pre code').each(function(i, e) {
        var htstr,el = $(this),lang = el.attr('class');
        lang = lang?lang.replace('lang-',''):'';
        if(lang){
            try{
                htstr = hljs.highlight(lang,$(this).text()).value;
            }catch(e){
                htstr = $(this).text();
            }
            $(this).html(htstr);
        }
    });

    // 1. markd模块 中文标题生成 ID bug；
    // 2. 序列号一个导航菜单
    tocCreate($('h1,h2,h3,h4,h5,h6').attr('id',function(idx,elm){
        return 't'+idx+$(this).text();
    }).map(function(idx,itm){
        return {
            title:$(itm).text(),
            tag:$(itm).get(0).tagName.replace(/^(h)/g,''),
            id:$(itm).attr('id')
        }
    }), function(op){
        option.toc = op.tocHTML;
        option.tocJSON = op.tocJSON;
    });
    $('h1,h2,h3,h4,h5,h6').each(function(i){
        $(this).html($(this).text() + ' <a href="#'+'t'+i+ $(this).text() +'"> # </a>')
    })

    //github 中的任务列表增强
    $('ul li').each(function(idx,el){
        var txt = $(this).html();
        var chtml = '';
        if(/^(\[x\])/.test(txt)){
            chtml = 'checked="checked"';
        }else if(/^(\[\ \])/.test(txt)){
            chtml = '';
        };

        if(/^(\[x\]|\[\ \])/.test(txt)){
            txt = txt.replace(/^(\[x\]|\[\ \])/g,'')
            $(this).html('').prepend('<input type="checkbox" class="task-list-item-checkbox" '+ chtml +' disabled="disabled">'+txt)
            $(this).addClass('task-list-item').parent().addClass('task-list-item');
        };

    });
    // 回调返回 菜单静态页面
    cb&&cb(option);
    // 返回HTML
    return $.html();
}

// 树形菜单 - 序列化成JSON，生成 HTML
// tocJSON 返回toc的JSON
// tocHTML 返回toc的HTML静态页面
function tocCreate(arr,cb){
    // console.log("message:arr",arr);
    var newArr = []
    for (var i = 0; i < arr.length; i++) {
        if(i===0) newArr.push(arr[i]);
        else{
           newArr = pushArr(newArr,arr[i])
        }
    };
    var html = tocCreatHTML(newArr);
    cb&&cb({
        tocJSON:newArr,
        tocHTML:html
    });
}

// 树形菜单 - 序列化成JSON
function pushArr(_group,_new){
    var last = _group[_group.length-1]
    var tag = last.tag
    if(tag === _new.tag || tag > _new.tag){
        _group.push(_new)
    }else{
        if(last.submenu){
            pushArr(last.submenu,_new);
        }else{
            last.submenu = [];
            last.submenu.push(_new);
        }
    }
    return _group;
}

// 树形菜单 - 生成HTML
function tocCreatHTML(arr){
    // console.log("arr:",arr);
    var str = '<ul>';
    for (var i = 0; i < arr.length; i++) {
        toc_num = (i+1);
        str += '<li><a href="#' + arr[i].id +'">' + arr[i].title + '</a>';
        if(arr[i].submenu){
           str += tocCreatHTML(arr[i].submenu);
        }
        str += '</li>';
    };
    str += '</ul>';
    return str;
}
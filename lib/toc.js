var cheerio = require('cheerio');
var hljs = require("highlight.js");
var log = console.log;

module.exports = toc

function toc(str,cb){

    $ = cheerio.load(str)

    // 代码高亮使用 highlight.js 
    // 网站 http://adilapapaya.com/docs/highlight.js/#nodejs
    // 官网 https://highlightjs.org/
    $('pre code').each(function(i, e) {
        var htstr = hljs.highlightAuto($(this).text()).value;
        // $(this).replaceWith(htstr);
        $(this).html(htstr);

    });

    // markd模块 中文标题生成bug
    $('h1,h2,h3,h4,h5,h6').attr('id',function(idx,elm){
        return $(this).text();
    });

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

    })

    // $('ul').addClass('task-list').find('li').addClass('task-list-item').each(function(index, el) {
    //     var txt = $(this).text();
    //     console.log("this::",txt);
    // });

    return $.html();
}
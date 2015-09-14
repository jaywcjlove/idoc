var fs      = require("fs");
var path    = require('path')
var file    = require("./file");
var marked  = require('marked');
var color   = require('colorful');
var log     = console.log;

var template = ''

function build(commander){

    // 载入配置文件
    var pkg = require(path.resolve('package.json'));

    // 模板目录
    template = path.dirname(__dirname) + '/lib/idoc-theme/' + pkg.idoctheme;

    var name = pkg.name;
    var idocmd = pkg.idocmd;
    var html = '';
    var markedstr;

    idocmd.forEach(function(item,idx){
        markedstr = marked(file.read(process.cwd() + '/' + item));
        html = file.ejs(template + '/layout.ejs',{
            title: pkg.name
        });
        file.write( process.cwd() + '/' + (idx === 0?'index.html':item.replace('.md',".html")  ) ,html.replace('{{content}}',markedstr) );
        log(color.green('Successful build static pages!') );
    })
}

module.exports = build;


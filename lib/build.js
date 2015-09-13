var fs      = require("fs");
var ejs     = require('ejs');
var path    = require('path')
var file    = require("./file");
var marked  = require('marked')
var log     = console.log;

var template = ''

function build(commander){

    // 载入配置文件
    var pkg = require(path.resolve('package.json'));

    // 模板目录
    template = path.dirname(__dirname) + '/lib/idoc-theme/' + pkg.idoctheme;

    var name = pkg.name;
    var idocmd = pkg.idocmd;
    var html = ''

    idocmd.forEach(function(item,idx){
        html = markedTohtml(file.read(process.cwd() + '/' + item))
        html = ejs.render(html, {title: pkg.name});
        file.write(process.cwd() + '/' + (idx === 0?'index.html':item.replace('.md',".html")  ) ,html);
    })
}

function markedTohtml(markedstr){
    var htmlstr;
    if(!markedstr) return;
    return file.read(template + '/header.ejs') + marked(markedstr) + file.read(template + '/footer.ejs');
}

module.exports = build;


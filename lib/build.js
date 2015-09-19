var fs      = require("fs");
var path    = require('path')
var file    = require("./file");
var marked  = require('marked');
var color   = require('colorful');
var stylus = require('./stylus');
var copy = require('./copy');
var log     = console.log;

var template = ''

function build(commander){

    // 载入配置文件
    var pkg = require(path.resolve('package.json'));

    // 模板目录
    template = path.dirname(__dirname) + '/lib/theme/' + pkg.idoc.theme;

    var name = pkg.name;
    var idocmd = pkg.idoc.md;
    var todir = pkg.idoc.todir;
    var html = '';
    var markedstr;
    
    idocmd.forEach(function(item,idx){
        markedstr = marked(file.read(process.cwd() + '/md/' + item));
        html = file.ejs(template + '/layout.ejs',{
            title: pkg.name
        });
        file.write( process.cwd() + '/' + (idx === 0?'index.html':item.replace('.md',".html")  ) ,html.replace('{{content}}',markedstr) );
    })

    // 复制复制所有静态资源到生产目录里面
    copy( template +'/source/', todir,{
        filter:function(_file){
            if(!/\.(styl)$/.test(_file)) {
                return true;
            }else{
                return false;
            }
        }
    },function(err,_file){
        if(err) return console.error(err);
    })

    // css如果是 stylus 生成 css
    stylus(template+'/source/css/main.styl',function(err,css){
        if(err) return log(err);
        file.write(todir+ 'css/main.css',css);
    });

    log(color.green('Successful build static pages!') );
}

module.exports = build;


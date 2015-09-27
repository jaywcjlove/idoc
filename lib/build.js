var fs      = require("fs");
var path    = require('path')
var file    = require("./file");
var marked  = require('marked');
var color   = require('colorful');
var stylus = require('./stylus');
var copy = require('./copy');
var toc = require('./toc');
var nav = require('./nav');
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
    var html = ''; //
    var markedstr; // markdown 生成HTML
    var _path;
    var tocHTML = '';//单页面导航静态页面
    var navHTML = '';
    var pathArr = file.readMDSync(todir + 'md/').replace(/\,$/,'').split(',');

    pathArr.forEach(function(item,idx){
        //菜单层级
        var len = item.replace(process.cwd()+'/md/','').split('/').length;

        if(path.basename(item) === idocmd[0]) len = 0;
        //导航菜单生成
        var navHTML = nav(idocmd,item,pathArr,len);

        // markdown 生成HTML
        markedstr = marked(file.read(item));

        // markdown 增强 及树菜单生成
        markedstr = toc(markedstr,function(_html){
            tocHTML = _html.toc
        });
        
        // 获取 md 的相对目录
        item = item.replace(process.cwd() + '/md/','');

        // 指定HTML路径
        _path = idocmd[0] === item ? 
            (process.cwd() + '/' + item).replace(item,"index.html"):
            (process.cwd() + '/html/' + item).replace('.md',".html");

        // ejs 模板生成HTML
        html = file.ejs(template + '/layout.ejs',{
            title: pkg.name,//项目工程名字
            relative_path:file.relativePath(_path,process.cwd()),//相对路径
            menu_html: navHTML,//页面之间的超链接导航
            toc_html: tocHTML,// markdown 导航
            markdown_html: markedstr // markdown 生成字符串
        });

        //写入指定目录中
        file.write(_path,html);
        log(color.blue('Generates') + ' "' + item.replace('.html',".md") + '"' + color.blue(" Success ! ") + new Date() );
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

    log();
    log(color.green('Successful build static pages!') );
}


module.exports = build;

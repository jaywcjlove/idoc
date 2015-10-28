var fs      = require("fs");
var path    = require('path')
var file    = require("./file");
var marked  = require('marked');
var color   = require('colorful');
var stylus = require('./stylus');
var copy = require('./copy');
var toc = require('./toc');
var nav = require('./nav');
var imgPath = require('./imgPath');
var log     = console.log;

var template = ''

function build(commander,changeFile){

    require('./menu_update')();

    // 载入配置文件
    var pkg = require(path.resolve('package.json'));

    
    // 指定模板目录
    if(commander.theme && commander.args.length > 0) template = commander.args[0];
    else{
        // 模板目录
        template = path.dirname(__dirname) + '/theme/' + pkg.idoc.theme;
        if(!file.isDir(template)){
            template = process.cwd()+ '/' +pkg.idoc.theme;
        }
    }
    // 皮肤目录不存在判断
    if(!file.isDir(template)) return log(color.red('\nTheme directory does not exist.!\n') )

    var name = pkg.name;
    var idocmd = pkg.idoc.md;
    var todir = process.cwd() + '/';
    var html = ''; //
    var markedstr; // markdown 生成HTML
    var _path;
    var tocHTML = '';//单页面导航静态页面
    var navHTML = '';
    var pathArr = file.readMDSync(todir + 'md/').replace(/\,$/,'').split(',');


    if(changeFile) pathArr = [changeFile];

    pathArr.forEach(function(item,idx){
        //菜单层级
        var isIndex = false
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
        item = path.normalize(item)

        // 获取 md 的相对目录
        item = item.replace(path.normalize(process.cwd() + '/md/'),'');

        // 是否为首页判断
        idocmd[0] === item ? isIndex = true : isIndex = false;

        // 指定HTML路径
        _path = idocmd[0] === item ? 
            (path.normalize(process.cwd() + '/' + item)).replace(item,"index.html"):
            (path.normalize(process.cwd() + '/html/' + item)).replace('.md',".html");

        // 图片引用路径处理
        markedstr  = imgPath(markedstr,_path);

        // ejs 模板生成HTML
        html = file.ejs(template + '/layout.ejs',{
            title: pkg.name,//项目工程名字
            index:isIndex,//是否为首页
            pkg:pkg,
            relative_path:file.relativePath(_path,process.cwd()),//相对路径
            menu_html: navHTML,//页面之间的超链接导航
            toc_html: tocHTML,// markdown 导航
            markdown_html: markedstr // markdown 生成字符串
        });

        //写入指定目录中
        file.write(_path,html);
        if(!changeFile) log(color.blue('Generates') + ' "' + item.replace('.html',".md") + '"' + color.blue(" Success ! ") + new Date() );
    })

    // 复制复制所有静态资源到生产目录里面
    copy( template +'/source/', todir+'static',{
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
    
    // 复制 gitignore 到项目的根目录中
    if( !file.exists(todir + '.gitignore') ) copy( template +'/gitignore', todir ,function(err,_file){
        if(err) return console.error(err);
        fs.renameSync(todir + 'gitignore', todir + '.gitignore')
    });

    // css如果是 stylus 生成 css
    stylus(template+'/source/css/main.styl',function(err,css){
        if(err) return log(err);
        file.write(todir+ 'static/css/main.css',css);
    });

    log();
    if(!changeFile) log(color.green('Successful build static pages!') );
}


module.exports = build;

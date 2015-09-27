
# AIP文档生成工具

通过markdown生成静态页面的AIP文档生成工具。[生成的页面预览效果](http://jaywcjlove.github.io/idoc)

```
    ,,        ,,
    db      `7MM
              MM
  `7MM   ,M""bMM  ,pW"Wq.   ,p6"bo
    MM ,AP    MM 6W'   `Wb 6M'  OO
    MM 8MI    MM 8M     M8 8M
    MM `Mb    MM YA.   ,A9 YM.    ,
  .JMML.`Wbmd"MML.`Ybmd9'   YMbmd'
```


# 命令使用

命令使用帮助。

```
  Usage: idoc [options]

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -C, --Create <file>  Select Directory Makefile.
    init                 init a documentation.
    build                Markdown produces static pages document.
    watch                Listener "md" file is automatically generated pages.
    server               Open local static html server.
    clean                Clear the generate static files.

  Examples:

    $ idoc init
    $ idoc init [path]
    $ idoc init [path] -C ~/idoc/
    $ idoc watch
    $ idoc server
    $ idoc clean
```

## install

通过 npm 全局安装 idoc

```sh
$ npm install idoc -g
```


## init

初始化文档文件

```sh
# 默认生成模板和配置文件，将当前文件夹根目录的所有md文件参数生成到配置文件package.json中
$ idoc init
# 将指定的 md 文件拷贝到当前目录下，生成模板和配置文件
$ idoc init ~/md/JSLite.md
# 将指定的两个 md 文件拷贝到当前目录下
$ idoc init ~/git/_idc/package.md  ~/git/_idc/dir/directory.md
# 将指定的 _idc 目录下的所有 md 文件拷贝到当前目录下
$ idoc init ~/git/_idc/

# 指定生成模板和配置文件
# 将“JSLite.md hotkeys.md”两个 md 文件拷贝到指定目录 `~/idoc/` 下面
# 生成模板需要的文件
# 第一个 md 文件是首页
$ idoc init JSLite.md hotkeys.md -C ~/idoc/
```

## build

生成静态 HTML 页面到指定目录中。

```sh
$ idoc build
```

## watch

监控 md 文件发生变化自动 build。

```sh
$ idoc watch
```


## server

打开本地静态 html 服务器，预览你生成的页面。

```sh
$ idoc server
```

## clean

清除生成的静态文件。

```sh
$ idoc clean
```

# 模板目录

```bash
# idoc/lib/theme/default/
./default
  ├── footer.ejs
  ├── gitignore
  ├── head.ejs
  ├── header.ejs
  ├── layout.ejs
  └── source
      ├── css
      │   ├── highlight.styl
      │   ├── main.styl
      │   ├── markdown.styl
      │   ├── reset.styl
      │   └── vendor.styl
      ├── img
      └── js
```

## css

样式使用 [stylus](http://learnboost.github.io/stylus/) 来写默认 `main.styl` 会自动生成 `main.css` ，供页面引用。你也可以写纯css 在页面中引用。

## source

默认会将此目录的中除 `.styl` 以外的文件复制到根目录中。

## layout

布局文件默认放到主题目录的根目录，例如：主题`default`的布局文件默认是更目录的所有ejs，默认 `layout.ejs` 为入口模板

## 主题工具

主题里面使用的工具说明

### ejs 

选择 `ejs` 作为模板引擎，模板引擎选择ejs，我只想要一个简单的帮我填充数据的模板。[github](https://github.com/tj/ejs) [文档](http://www.embeddedjs.com/) [ejs.co](http://ejs.co/)

### stylus 

Stylus功能上更为强壮，和js联系更加紧密。[官方文档](http://learnboost.github.io/stylus/) [张鑫旭老师的中文翻译](http://www.zhangxinxu.com/jq/stylus/) [Try Stylus!](http://learnboost.github.io/stylus/try.html)

# TODO

- [x] idoc 基本命令定义
- [x] 添加 build 命令，markdown生成静态页面
- [x] 添加 watch 命令，监控markdown文件自动生成HMTL页面
- [x] 默认模板制作
- [x] 树形菜单生成
- [x] 添加 server 命令，预览生成的静态页面
- [x] 添加多页面导航菜单
- [x] 添加 clean 命令
- [ ] 静态资源相对路径引用
- [ ] 判断是否存在树形导航菜单
- [ ] 第二个模板制作
- [ ] 模板切换命令
- [ ] api 检索功能
- [ ] 兼容windows路径
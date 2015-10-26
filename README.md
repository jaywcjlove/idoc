
# AIP文档生成工具

简单的文档生成工具! [生成的页面预览效果](http://jaywcjlove.github.io/idoc) [Details document](http://jaywcjlove.github.io/idoc)

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

# 全局安装

```bash
$ sudo npm install idoc -g
```


# 收录使用者

## 提交收录

1. 直接在 `README.md` 中添加然后 `Pull requests` 。

2. 在 [issues](https://github.com/jaywcjlove/idoc/issues) 中提交你的连接，我讲收录在此。格式如下：

```bash
# 我的 xxx 使用 idoc 生成文档
[文档名称](连接地址) 
```


## 收录文档

这些文档是都是使用idoc生成的页面哦，可以提交用idoc生成的文档哦。这里[添加](https://github.com/jaywcjlove/idoc/issues) 

1. [JSLite.io - 这个是现代浏览器类似jQuery的库，体积小。](http://jslite.github.io/JSLite/) 
2. [idoc - 通过markdown生成静态页面的工具](http://jaywcjlove.github.io/idoc)
3. [store.js - js本地存储操作](http://jaywcjlove.github.io/store.js)
4. [cookie.js - js本地cookie操作](http://jslite.io/cookie.js/)
5. [iNotify - 浏览器各种方法通知](http://jaywcjlove.github.io/iNotify)


# 命令使用

命令使用帮助。


```sh
  Usage: idoc [options]

    Simple document generation tool!

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -C, --Create <file>  Select Directory Makefile.
    -v                   App version information.
    -i, init             Init a documentation.
    -b, build            Markdown produces static pages document.
    -w, watch            Listener "md" file is automatically generated pages.
    -s, server           Open local static html server.
    -c, clean            Clear the generate static files.
    -t, theme            Choose a theme.
    -d, deploy           Publish to a gh-pages branch on GitHub.

  Examples:

    $ idoc init
    $ idoc init [path]
    $ idoc init [path] -C ~/idoc/
    $ idoc watch
    $ idoc server
    $ idoc clean
    $ idoc deploy
    $ idoc theme
    $ idoc -t ~/git/idoc-theme-slate/
```


# TODO

- [x] idoc 基本命令定义
- [x] 添加 build 命令，markdown生成静态页面
- [x] 添加 watch 命令，监控markdown文件自动生成HMTL页面
- [x] 默认模板制作
- [x] 树形菜单生成
- [x] 添加 server 命令，预览生成的静态页面
- [x] 添加多页面导航菜单
- [x] 添加 clean 命令
- [x] 静态资源相对路径引用
- [x] github 连接地址添加
- [x] `idoc deploy` === `git push -f origin gh-pages`
- [ ] 配置文件配置下载 md 文件
- [x] 解决server 端口冲突
- [ ] 判断是否存在markdown树形导航菜单
- [x] 第二个模板制作
- [x] 模板切换命令
- [ ] api 检索功能
- [x] 兼容windows路径(cmd工具冒得问题嘞)
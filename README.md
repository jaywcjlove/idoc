
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
    -i, init             init a documentation.
    -b, build            Markdown produces static pages document.
    -w, watch            Listener "md" file is automatically generated pages.
    -s, server           Open local static html server.
    -c, clean            Clear the generate static files.
    -d, deploy           Publish to a gh-pages branch on GitHub.

  Examples:

    $ idoc init
    $ idoc init [path]
    $ idoc init [path] -C ~/idoc/
    $ idoc watch
    $ idoc server
    $ idoc clean
    $ idoc deploy
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
- [ ] 解决server 端口冲突
- [ ] 判断是否存在markdown树形导航菜单
- [ ] 第二个模板制作
- [ ] 模板切换命令
- [ ] api 检索功能
- [x] 兼容windows路径(cmd工具冒得问题嘞)
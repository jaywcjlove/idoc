
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

命令使用帮助。[Details document](http://jaywcjlove.github.io/idoc)


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
- [ ] 判断是否存在markdown树形导航菜单
- [ ] 第二个模板制作
- [ ] 模板切换命令
- [ ] api 检索功能
- [ ] 兼容windows路径
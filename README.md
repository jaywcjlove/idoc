
# AIP文档生成工具

通过markdown生成静态页面的AIP文档生成工具。

## install

通过 npm 全局安装 idoc

```sh
$ npm install idoc -g
```


## init

初始化文档文件

```sh
# 默认将当前文件夹的所有md文件生成静态文件到当前目录
$ idoc init

# 将“JSLite.md hotkeys.md”两个markdown文件生成静态文件到指定目录 `~/idoc/` 下面
# 第一个md文件是首页
$ idoc init JSLite.md hotkeys.md -C ~/idoc/
```

## build

生成静态 HTML 页面到指定目录中

```sh
$ idoc build
```

# 模板目录

`idoc/lib/idoc-theme/default/`  

# TODO

- [x] idoc 基本命令定义
- [ ] 默认模板制作
- [ ] 生成静态文件
- [ ] markdown生成静态页面
- [ ] 监控markdown文件自动生成HMTL页面
- [ ] 添加 clean 命令
- [ ] 添加 watch 命令
- [ ] 第二个模板制作
- [ ] 兼容windows路径
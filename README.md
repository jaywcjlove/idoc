
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
# 默认生成模板和配置文件，将当前文件夹根目录的所有md文件参数生成到配置文件package.json中
$ idoc init
# 将指定的 md 文件拷贝到当前目录下，生成模板和配置文件
$ idoc init ~/md/JSLite.md

# 生成模板和配置文件
# 将“JSLite.md hotkeys.md”两个 md 文件拷贝到指定目录 `~/idoc/` 下面
# 生成模板需要的文件
# 第一个 md 文件是首页
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
- [ ] 模板切换命令
- [ ] 兼容windows路径
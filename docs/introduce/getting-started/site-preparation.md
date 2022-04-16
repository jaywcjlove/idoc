网站准备
===

我们只需要运行 `npx idoc init myapp` 命令，就会生成一个 `myapp` 文件夹，已经为你的网站准备好了一个最简单的实例。如果你不是初始化一个工程，那你在创建一个文档网站前，需要做一些准备工作，规划你的网站目录。

## 初始化工程

```bash
$ npx idoc init myapp
# Or
$ npx idoc@1.4.2 init myapp
```

## 准备好的目录

从命令行运行 `idoc init myapp` 生成器将创建一个包含以下元素的目录结构：

```bash
├── docs
│   ├── README.md
│   └── about.md
├── package.json
└── idoc.yml
```

如果你在生成器初始化项目过程中，选择生成默认主题自己修改，那么将创建一个包含 `themes` 的目录结构：

```
├── docs
│   ├── README.md
│   └── about.md
├── idoc.yml
├── package.json
└── themes
    └── default
```

此时，你的配置主题值产生了变化，如下：

```yml
theme: themes/default
```
定制主题
===

创建 `idoc` 主题非常容易，您只要在 `themes` 文件夹内，新增一个任意名称的文件夹，并修改 [idoc.yml](../api/config.md) 内的 `theme` 设定，即可切换主题。

## `idoc.yml`

在项目的根目录，这是配置 `theme` 主题的位置。主题默认值 `default`，通常这不需要设置，自动读取自带主题。

```yml
theme: default
```
<!--rehype:style=background-color: #c0d2f342-->
## 修改默认主题

创建项目通过 init 参数，在命令行询问是否自定义模板，输入 `y` 可生成默认主题，提供给您修改。

```bash
$ idoc init myapp

? new project name myapp
? Whether to force regeneration of catalog files No
? Whether to customize the template(Theme) Yes
? Modify the specified document directory location /idoc/myapp/docs
? Modify the specified output static page directory location /idoc/myapp/dist

 🎉  ✔ Start documentation with idoc!
```

准备好的目录 `themes` 中包含 `default` 主题

```bash
$ tree -I 'node_modules' -L 3
.
├── docs
│   ├── README.md
│   └── about.md
├── idoc.yml
├── package.json
└── themes          # 👈 🎁 主题文件夹
    └── default     # 👈 默认主题
        ├── css
        ├── js
        ├── markdown.ejs
        └── partial
```

注意，这时候主题配置值发生了改变，请查看 `idoc.yml` 配置文件：

```yml
theme: "themes/default"
```

如果你需要更改主题，您可以查看[模版文档](./templates.md)。
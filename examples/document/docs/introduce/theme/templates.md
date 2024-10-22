模版
===

模板决定了网站内容的呈现方式，主题使用的 [EJS](https://github.com/mde/ejs) 模版引擎。

## 文章模板

文件 `markdown.ejs` 是默认文章编译使用的模板。可以在 markdown 配置中配置自定义模板。应用场景，如自定义首页，默认 `项目根目录` 或者 `指定文档目录` 根目录下的 `README.md` 视为首页，在里面配置模板，配置如下：

```markdown
<!--idoc:config:
layout: home.ejs
-->
```
<!--rehype:style=background-color: #c0d2f342-->

自定义模板文件 `home.ejs` 需要放到自定义主题目录下。

```bash
├── docs
├── idoc.yml
├── package.json
└── themes               # 👈 🎁 主题文件夹
    └── default
        ├── css
        ├── js
        ├── markdown.ejs # 👈 默认模板
        ├── home.ejs     # 👈 自定义模板
        └── partial
```

> 🚧  注意：默认主题文件夹是不存在，如果您需要暴露默认模板，可以在初始化项目 `idoc init myapp` 的时候选择暴露模板

## 局部模版（Partial）

局部模板让您在不同模板之间共享相同的组件，例如页首（Header）、页脚（Footer）或侧边栏（Sidebar）等，可利用局部模板功能分割为个别文件，让维护更加便利。举例来说：

`partial/header.ejs`

```html
<h1 id="logo"><%= title %></h1>
```

`home.ejs`

```html
<%- partial('partial/header') %>
<div id="content">Home page</div>
```

生成：

```html
<h1 id="logo">My Site</h1>
<div id="content">Home page</div>
```
<!--rehype:style=background: #41ae622b;-->

## 局部变量使用

您可以在局部模板中指定局部变量并使用。

`partial/header.ejs`

```html
<h1 id="logo"><%= title_partial %></h1>
```

`home.ejs`

```html
<%- partial('partial/header', { title_partial: 'Hello World' }) %>
<div id="content">Home page</div>
```

生成：

```html
<h1 id="logo">Hello World</h1>
<div id="content">Home page</div>
```
<!--rehype:style=background: #41ae622b;-->

更多使用方式请查看 [EJS](https://github.com/mde/ejs) 模版引擎文档
网站首页
===

默认网站首页内容通过 `README.md` 生成 `index.html`。

## 添加首页

```bash
├── docs
│   ├── README.md  # 👈 默认文档首页（优先 ⚠️ ）
│   └── about.md
├── package.json
├── idoc.yml
└── README.md      # 👈 默认文档首页
```

默认指定输出目录添加 `README.md` 文件视为首页，如果没有定义 `README.md`，根目录下的 `README.md` 视为首页。这是为了支持生成单页面站点。

## 注意 ⚠️

默认 `README.md` -> `index.html` 与 `index.md` -> `index.html` 生成的文件冲突。

```bash
├── docs
│   ├── README.md  # 👈 冲突 -> `index.html`
│   └── index.md   # 👈 冲突 -> `index.html`
```

`README.md` 特殊处理生成 `index.html`，是因为在 GitHub 默认预览 `README.md`，所以建议使用 `README.md` 作为首页命名，这可在 GitHub 和 idoc 文档保持一致的体验。


## 定制首页样式

Markdown 文本中 HTML/CSS 是起作用的，可以自己定义一些内容，你可以将下面代码复制到您的文档中测试一下

⚠️ 注意：在 GitHub 中预览是无效的，会影响在 GitHub 中预览展示。

```html
<style>
body, html { background: #fff; }
.jumbotron {
  position: absolute;
  left: 0;
  right: 0;
  background-color: #383838;
  padding-top: 100px;
  min-height: 300px;
  color: #c1c1c1;
}
.jumbotron-block { min-height: 330px; }
.jumbotron-warpper { max-width: 1200px; margin: 0 auto; text-align: center; }
.jumbotron-title { font-size: 30px; font-weight: bold; }
</style>
<div class="jumbotron">
  <div class="jumbotron-warpper">
    <div class="jumbotron-title">idoc </div>
    <div class="jumbotron-des">idoc 是一个文档生成工具，用于生成文档网站或简单的博客网站，简单到你只需写 Markdown 文件就可以帮助你生成网站。同时可以方便的集成到你的项目工程中。
    </div>
  </div>
</div>
<div class="jumbotron-block"> </div>
```

## 单独定制首页模板
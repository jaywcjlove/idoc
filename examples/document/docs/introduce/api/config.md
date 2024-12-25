配置文件
===

配置文件可以添加设置网站内容和主题等。

## 添加配置

目前有三种配置，每种配置方式都起不通的作用，都不是必要的配置，配置格式均使用 [yaml](https://yaml.org/)。三种配置：

- [x] `idoc.yml` 在根目录下添加（可选配置）。
- [x] `idoc.chapters.yml` 左侧栏文件导航（SiderBar），在根目录下添加（可选配置）。
- [x] `注释配置` 在 markdown 文档中添加的配置（可选配置）。

## `idoc.yml`

在你的配置顶部添加 [schema](https://www.schemastore.org/)，进行数据有效性验证，有助于解决配置错误问题。如果你使用 [Visual Studio Code](https://code.visualstudio.com/)，需要安装 [YAML](https://github.com/redhat-developer/vscode-yaml.git) 插件来支持此功能。从 `v1.26` 版本开始，支持更多类型的配置文件：

> [!NOTE/注意]
> 由 [Auto Config Loader](https://github.com/jaywcjlove/auto-config-loader) 提供动力支持多种格式的配置。

```bash
idoc.yml                   .idoc.yml
.idocrc                    .idocrc.json
.idocrc.json5              .idocrc.jsonc
.idocrc.yaml               .idocrc.yml
.idocrc.toml               .idocrc.ini
.idocrc.js                 .idocrc.ts
.idocrc.cjs                .idocrc.mjs
.config/idocrc             .config/idocrc.json
.config/idocrc.json5       .config/idocrc.jsonc
.config/idocrc.yaml        .config/idocrc.yml
.config/idocrc.toml        .config/idocrc.ini
.config/idocrc.js          .config/idocrc.ts
.config/idocrc.cjs         .config/idocrc.mjs
idoc.config.js             idoc.config.ts
idoc.config.cjs            idoc.config.mjs
```

也支持在 `pacakge.json` 的 `{ idoc: {} }` 上面配置

```js
{
  "idoc": {
    "dir": "docs",
    "site": "Project Name"
  }
}
```

```yml
# yaml-language-server: $schema=https://jaywcjlove.github.io/idoc/schema
# yaml-language-server: $schema=https://jaywcjlove.gitee.io/idoc/schema
```
<!--rehype:style=background: #41ae622b;-->

下面是 `idoc.yml` 配置示例，更多示例查看下面更多文档：

```yml
# yaml-language-server: $schema=https://jaywcjlove.github.io/idoc/schema
# yaml-language-server: $schema=https://jaywcjlove.gitee.io/idoc/schema

## directory of document source files
## defalut: `docs`
# -----------------------
dir: docs

## Output directory of generated documents
## defalut: `dist`
# -----------------------
output: dist

## site name
# -----------------------
site: iDoc

## Page title
# -----------------------
title: Config page iDoc

## Site description
# -----------------------
description: Website description

## The keywords of your website.
# -----------------------
keywords: idoc,document,doc

## Customize theme settings.
## defalut: `default`
# -----------------------
theme: default

## Website logo icon
## defalut: `data:image/png;base64,iVBOR......`
# -----------------------
logo: ./logo.png

## Website favicon icon
## defalut: `data:image/png;base64,iVBOR......`
# -----------------------
favicon: ./logo.png

# Show open source button
openSource: https://github.com/jaywcjlove/idoc

# Display the edit button, need to configure `openSource`.
editButton: 
  label: Edit this page on GitHub
  url: https://github.com/jaywcjlove/idoc/blob/master/

## chapters scopes
# -----------------------
# scope: 
#   - introduce

# Navigation Menu.
menus:
  # Label: <URL> [scope]
  Docs: introduce/getting-started/installation.html introduce
  Markdown: markdown.html
  About: about.html
  Github: 
    url: https://github.com/jaywcjlove/idoc
    target: __blank

footer: |
  Released under the MIT License. Copyright © 2022 Kenny Wong<br />
  Generated by <a href="https://github.com/jaywcjlove/idoc" target="_blank">idoc</a> v{{idocVersion}}

## Copy Assets
# -----------------------
# https://github.com/micromatch/micromatch
# 
copyAssets: '**/assets/*.{mp3,ogm}'

## Template Data
# -----------------------
data: 
  good: test

## Add giscus comment
# -----------------------
giscus: 
  src: https://giscus.app/client.js
  data-repo: jaywcjlove/idoc
  data-repo-id: MDEwOlJlcG9zaXRvcnk0MjM4MTA2Nw==
  data-category: Q&A
  data-category-id: DIC_kwDOAoavC84CZOtP
  data-mapping: pathname
  data-strict: 0
  data-reactions-enabled: 1
  data-emit-metadata: 0
  data-input-position: top
  data-theme: dark
  data-lang: zh-CN
  data-loading: lazy
  crossorigin: anonymous
  async: true
```

### `dir`

文档（markdown）所在的目录，默认配置当前项目根目录下的 `docs` 文件夹中。

### `output`

文档（markdown）输出的 HTML 所在的目录，默认配置当前项目根目录下的 `dist` 文件夹中。

### `site`

自定义网站的名称，也将用户导航菜单 logo 旁边显示的文本。

```yml
site: iDoc
```

如果你没有配置，将会自动读取 `package.json` 中的 `name` -> `title` 字段，优先 `title` 字段。

```json
{
  "name": "idoc",
  "title": "idoc book",
}
```

使用 `{{version}}` 模版标记，支持在标题上显示版本号信息：

```yml
site: iDoc {{version}}
site: iDoc {{version:v1.2.3}}
```

可以使用 `idoc --site "iDoc {{version}}"` 命令参数配置网站名称，他们的权重 `idoc.yml` -> `package.json` -> `idoc -s`

### `description`

对网页的一个简单概述，默认获取当前 Markdown 页面第一段文本。

```yml
description: idoc description
```

如果你没有配置，将会自动读取 `package.json` 中的 `description` 字段

```json
{
  "description": "idoc description",
}
```

### `keywords`

搜索引擎能搜索到的关键词，每个关键词之间用英文逗号 `,` 隔开，必须是英文的逗号。`package.json` -> `idoc.yml` -> `注释配置`

```yml
keywords: idoc,markdown,api,document,tool
```

如果你没有配置，将会自动读取 `package.json` 中的 `keywords` 字段

```json
{
  "keywords": [
    "idoc",
    "markdown",
    "api",
    "document",
    "tool"
  ]
}
```

```yml
keywords: idoc,document,doc
```

### `tocs`

全局配置，隐藏所有的页面目录。

```yml
tocs: false
```

### `logo`

自定义网站的导航菜单 `logo`，默认内置了 `logo`。

```yml
## Website logo icon
## defalut: `data:image/png;base64,iVBOR......`
# -----------------------
logo: ./logo.png
```

支持 base64 字符串，和图片文件相对目录配置，如果配置 svg 图标路径，自动将 svg 代码生成到页面中，这将有助于解决明暗主题样式、logo 模糊等问题。


### `favicon`

自定义网站的 `favicon` 图标，默认内置了图标。

```yml
## Website favicon icon
## defalut: `data:image/png;base64,iVBOR......`
# -----------------------
favicon: ./logo.png
```

### `meta`

meta 标记描述 HTML 文档中的元数据，值支持模板变量

```yml
data: 
  site_name: idoc # 向 meta 配置模板中添加模板数据
meta:
  - <meta name="author" content="Kenny Wong">
  - <meta property="og:site_name" content="<%= data.site_name %>">
  - <meta property="og:url" content="">
  - <meta property="og:image" content="<%=homepage%>logo.png">
  - <meta property="og:type" content="website">
  - <meta property="og:title" content="<%= title %>">
  - <meta property="og:description" content="<%= description%>">
```

头信息中生成 `HTML` 如下：

```html
<meta name="author" content="Kenny Wong">
<meta property="og:site_name" content="idoc">
<meta property="og:url" content="">
<meta property="og:image" content="https://wangchujiang.com/idoc/logo.png">
<meta property="og:type" content="website">
<meta property="og:title" content="配置文件">
<meta property="og:description" content="配置文件可以添加设置网站内容和主题等。">
```

配置 Twitter 卡片

```yml
data: 
  site_name: idoc # 向 meta 配置模板中添加模板数据

copyAssets: 
  - '*/assets/*.(png|jpg)' # 存放在 `docs` 目录中匹配的资源
meta:
  - <meta property="twitter:image:src" content="<%=homepage%>assets/banner.png">
  - <meta property="twitter:site" content="@jaywcjlove">
  - <meta property="twitter:creator" content="jaywcjlove">
  - <meta property="twitter:card" content="summary_large_image">
  - <meta property="twitter:title" content="<%= title %>">
  - <meta property="twitter:description" content="<%= description%>">
```

### `element`

模板中的某些节点 props 设置部位样式，例如设置 `wrapper` 定义网页最外层最大宽度：

```yml
element: 
  # 用于定义最外层宽度样式
  wrapper: style=max-width:690px;
```

> [!WARNING]
> 目前只扩展了一个 `wrapper`

### `homepage`

主要用于生成 [sitemap.txt](https://www.sitemaps.org/) 文件。当前配置也将传递到模版中使用。

```yml
homepage: https://jaywcjlove.github.io/idoc/
```

> [!TIP]
> 提示请查看 [Google 文档](https://developers.google.com/search/docs/advanced/sitemaps/build-sitemap?hl=zh-cn#text)。

### `minify`

压缩生成后的 HTML，默认值为 `false`。

```yml
minify: true
```

### `cacheFileStat`

缓存 md 文件统计信息，主要解决时间更新问题（[#58](https://github.com/jaywcjlove/idoc/issues/58)）。

```yml
cacheFileStat: true
```

### `copyAssets`

使用 [通配模式](https://github.com/micromatch/micromatch) 拷贝指定的资源。

```yml
## Copy Assets
# -----------------------
copyAssets: '**/assets/*.(mp3,ogm)'

copyAssets: 
  - '**/assets/*.mp3'
  - '**/assets/*.ogm'
```

> [!TIP]
> 在 `markdown` 中引入图片等资源会自动拷贝，不需要配置 `copyAssets`。

### `theme`

主题定制，默认值为 `default`，你也可以自定义主题，可以使用 `idoc init myapp` 生成项目工程的时候，选择暴露模版文件，主题将被生成到 `themes/default` 目录中

```yml
## Customize theme settings.
## defalut: `default`
# -----------------------
theme: themes/default
```

### `openSource`

默认页面顶部 GitHub 按钮菜单自定义。

```yml
openSource: https://github.com/jaywcjlove/idoc
```

如果你没有配置，将会自动读取 `package.json` 中的 `repository` 字段

```json
"repository": {
  "type": "git",
  "url": "https://github.com/jaywcjlove/idoc.git"
},
```

### `editButton`

默认页面 `编辑按钮` 定义。

```yml
editButton: 
  label: Edit this page on GitHub
  url: https://github.com/jaywcjlove/idoc/blob/master/
```

### `scope`

范围是指能匹配到文件输出路径的一段字符串。

这个配置将为你过滤左边 SiderBar 章节菜单展示内容，作用是根据范围（scope），过滤 `idoc.chapters.yml` 配置中的数据。

```yml
scope: 
  - introduce/getting-started
```

与在 [`menus`](#menus) 中定义 `scope` 效果是一样的

```yml
menus:
  Docs: introduce/getting-started/installation.html 
  Markdown: markdown/basic-syntax.html markdown
```

> [!TIP]
> 
> - 范围 `scope` 配置，在匹配到的页面，展示匹配中的章节(SiderBar)菜单。
> - 范围 `scope` 没有配置，所有页面展示章节(SiderBar)菜单。
> - 范围是匹配文件路径，配置使用 `/` idoc 工具帮助转换兼容 Windows。
> - 范围 `scope` 配置，是过滤 `idoc.chapters.yml` 中的数据。

### `scopePrivate`

某一些页面展示指定范围的的章节(SiderBar)菜单，其它页面展示剩余范围的的章节(SiderBar)菜单。

```yml
scopePrivate: 
  - tutorial
```

> [!TIP]
>  注意：需要删除 ~~`scope`~~ 配置选项，上面需求才能实现。

### `sideEffectFiles`

添加副作用 `Markdown` 文件，如果你有一些文件不在指定文档目录（默认 `docs`），这些文件不会编译输出 `html`，也不会监听，通过 `sideEffectFiles` 配置，将实现在指定文档目录之外的 `Markdown` 文档也能编译。

```yml
sideEffectFiles:
  - README.zh.md
```

> [!TIP]
>  注意：如果你在实时编译文档，修改此配置将需要重启监听服务。

### `menus`

默认主题顶部导航菜单定义

```yml
menus:
  # Label: <URL> [scope]
  Docs: introduce/getting-started/installation.html introduce
  Markdown: markdown.html
  About: about.html
  Github: 
    url: https://github.com/jaywcjlove/idoc
    target: __blank
```

定义范围 `scope`，下面示例定义了个范围名字叫 `introduce`，这个范围表示，匹配到 `introduce` 开头的页面，页面导航 `Docs` 选中效果。

```yml
menus:
  # Label: <URL> [scope]
  Docs: introduce/getting-started/installation.html introduce
```

> [!TIP]
>  注意：这个 `scope` 范围，如果没有任何菜单定义 `scope` 范围，将在所有页面展示一样的 `SiderBar` 左侧边菜单栏。如果你定义了 `scope`，根据你定义的范围(`scope`) 在匹配页面路由，将在侧边栏展示不同的 `SiderBar`。`SiderBar` 需要在 `idoc.chapters.yml` 中定义，并且需要在 `idoc.yml` 中定义 `menus`。

### `footer`

页脚自定义。

```yml
footer: |
  Released under the MIT License. Copyright © {{idocYear}} Kenny Wong<br />
  Generated by <a href="https://github.com/jaywcjlove/idoc" target="_blank">idoc</a> v{{idocVersion}}
```

这里预留了 `{{idocVersion}}` 和 `{{version}}` 两个字符串，用于替换 idoc 当前的版本，或者项目 `package.json` 中的版本信息。

### `data`

默认主题模版变量传递，这将对自定义主题可能会起到很大的帮助。除了以上定义，定义多余的变量也会被传递到模板中。

```yml
data:
  name: value
```

目前保留这个配置作用是，如果配置使用了 `schema`，传递的变量放到 `data` 配置(**idoc.yml**)不会报错 :)，还有避免覆盖内置变量。

### `giscus`

添加 [`giscus`](https://giscus.app/) 评论，在 [`giscus`](https://giscus.app/) 官网上配置，生成如下 HTML 代码转换为配置即可：

```html
<script src="https://giscus.app/client.js"
  data-repo="jaywcjlove/idoc"
  data-repo-id="MDEwOlJlcG9zaXRvcnk0MjM4MTA2Nw=="
  data-category="Q&A"
  data-category-id="DIC_kwDOAoavC84CZOtP"
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="top"
  data-theme="dark"
  data-lang="zh-CN"
  data-loading="lazy"
  crossorigin="anonymous"
  async>
</script>
```

将生成的上面 HTML 代码装为配置

```yml
giscus: 
  src: https://giscus.app/client.js
  data-repo: jaywcjlove/idoc
  data-repo-id: MDEwOlJlcG9zaXRvcnk0MjM4MTA2Nw==
  data-category: Q&A
  data-category-id: DIC_kwDOAoavC84CZOtP
  data-mapping: pathname
  data-strict: 0
  data-reactions-enabled: 1
  data-emit-metadata: 0
  data-input-position: top
  data-theme: dark
  data-lang: zh-CN
  data-loading: lazy
  crossorigin: anonymous
  async: true
```

> [!TIP]
>  请注意，必须满足下面 3 点配置才能起作用：
>
> 1. 该仓库是[公开的](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/setting-repository-visibility#making-a-repository-public)，否则访客将无法查看 discussion。
> 2. [giscus app](https://github.com/apps/giscus) 已安装，否则访客将无法评论和回应。
> 3. Discussions 功能已[在你的仓库中启用](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/enabling-or-disabling-github-discussions-for-a-repository)。

### `rewrite`

这是利用 rehype 插件 [rehype-rewrite](https://github.com/jaywcjlove/rehype-rewrite) 对 HTML 元素进行重写，可帮助您修改页面上的任何 HTML 元素和文档内容。以下配置仅在 JS 配置中生效：

```js
// .idocrc.mjs
/**
 * @typedef {import("idoc").Config} Config
 * @type {Config} 
 */
export default {
  rewrite: (node, index, parent) => {
    console.log(index)
  },
}
```

应用示例 [RegExp Example](https://github.com/jaywcjlove/regexp-example)，这个示例是一个正则表达式搜集备忘清单，我们将在这个示例生成 HTML 的同时，给示例添加验证功能等自定义特性。

## `idoc.chapters.yml`

定义左侧边栏(SiderBar)菜单，同时可以控制顺序，可以在 `idoc.yml` 配置中定义 `scope`，顶部一级导航根据匹配 `scope` 来展示不同的 (SiderBar)菜单。

```yml
- introduce/getting-started: 入门
- introduce/getting-started/installation.md: 安装
- introduce/getting-started/publish.md: 发布网站
- introduce/getting-started/site-creation.md: 创建网站
- introduce/getting-started/site-preparation.md: 网站准备
- introduce/api: API
- introduce/api/command.md: 命令
- introduce/api/config.md: 配置文件说明

# 单页面中没有 scope 配置，网址 `https://....` 将起作用
- reference/: 参考网站
- https://jaywcjlove.github.io/idoc/: 官网
- https://google.com: Google
```

支持添加如下配置文件：

```bash
idoc.chapters.yml                 .config/idoc.chaptersrc
.idoc.chapters.yml                .config/idoc.chaptersrc.json
.idoc.chaptersrc                  .config/idoc.chaptersrc.json5
.idoc.chaptersrc.json             .config/idoc.chaptersrc.jsonc
.idoc.chaptersrc.json5            .config/idoc.chaptersrc.yaml
.idoc.chaptersrc.jsonc            .config/idoc.chaptersrc.yml
.idoc.chaptersrc.yaml             .config/idoc.chaptersrc.toml
.idoc.chaptersrc.yml              .config/idoc.chaptersrc.ini
.idoc.chaptersrc.toml             .config/idoc.chaptersrc.js
.idoc.chaptersrc.ini              .config/idoc.chaptersrc.ts
.idoc.chaptersrc.js               .config/idoc.chaptersrc.cjs
.idoc.chaptersrc.ts               .config/idoc.chaptersrc.mjs          
.idoc.chaptersrc.cjs               
.idoc.chaptersrc.mjs
idoc.chapters.config.js
idoc.chapters.config.ts
idoc.chapters.config.cjs
idoc.chapters.config.mjs
```

## 注释配置

这种配置是指在 `markdown` 文档中添加的配置，主要用于控制类似于 `tocs` 页面导航是否显示，页面标题展示，翻页等功能。在 `markdown` 注释配置所在的页面起作用。

### 配置方法

在 markdown 文本中，任意位置添加一条特定标记(`<!--idoc:config:<您的配置>-->`)的注视，将 [yaml](https://yaml.org/) 格式的配置添加到注释中即可：

```markdown
<!--idoc:config:
tocs: false
site: 网站名称
-->
```
<!--rehype:style=background-color: #c0d2f342-->

### 详细配置说明

🚧  注意：部分[注释配置](#注释配置)将覆盖全局配置，所有参数均为选配参数。

```yml
# 页面目录隐藏
tocs: false
# 当前页面网站名称，可以全局 `idoc.yml` 中配置
# 🚧 Logo 旁边的 <网站名称>，和 <title> 的名称配置
# 可以全局 `idoc.yml` 中配置，
# 都没有配置在 `package.json` 中读取 `name` 字段信息
site: 网站名称
# 在浏览器标签处显示的内容
# 默认 Markdown 文档第一个标题 <h1>
title: 网页标题
# 对网页的一个简单概述，默认获取当前 Markdown 页面第一段文本
description: 网页简述
# 搜索引擎能搜索到的关键词，每个关键词之间用逗号，隔开，必须是英文的逗号。
keywords: 关键词
# 自定义网站的 favicon 图标，默认内置了图标。
favicon: page.favicon || config.data.favicon,
# 自定义网站的导航菜单 logo，默认内置了 logo。
logo: page.logo || config.data.logo,
# 显示编辑按钮
editButton: 
  label: Edit this page on GitHub
  url: https://github.com/jaywcjlove/idoc/blob/master/
# 导航栏 GitHub 按钮
openSource: https://github.com/jaywcjlove/idoc
# 🚧  翻页默认不需要配置，默认是根据 `idoc.chapters.yml` 的顺序自动生成。
# 👈 上一页，raw 配置指定目录（默认 docs）全路径，idoc 会处理成正确的目录。
prevPage: 
  raw: introduce/getting-started/site-add.md
  label: 添加文档  # 🤙 可以单独只配 label 覆盖默认的 label
# 🚧  翻页默认不需要配置，默认是根据 `idoc.chapters.yml` 的顺序自动生成。
# 👉 下一页，raw 配置指定目录（默认 docs）全路径，idoc 会处理成正确的目录
nextPage: 
  raw: introduce/getting-started/site-add.md
  label: 添加文档  # 🤙 可以单独只配 label 覆盖默认的 label
# 当前页面<页脚>配置
footer: |
  Released under the MIT License. Copyright © 2022 Kenny Wong<br />
  Generated by <a href="https://github.com/jaywcjlove/idoc" target="_blank">idoc</a> v{{idocVersion}}
# 🚧 当前文件信息，不准确，比如 CI 在服务端生成，没有办法记录 修改时间。
fileStat:
  # 配置当前文档的修改时间，展示在页脚
  mtimeStr: 2022/04/13
```

### tocs

如果全局配置，隐藏所有的页面目录，在页面中注释配置 `tocs=true`，让某个页面显示页面目录。

```markdown
<!--idoc:config:
tocs: true
-->
```

### layout

布局模版配置，默认值 `markdown.ejs` 不需要配置，这将在您自定义模板的时候很有用，例如您需要自定义首页。

```markdown
<!--idoc:config:
layout: markdown.ejs
-->
```
<!--rehype:style=background-color: #c0d2f342-->

🚧  注意：默认不需要配置，自定义主题的时候可以用得到。

<!--idoc:config:
keywords: idoc,config,api
fileStat:
  mtimeStr: 2022/04/13
-->
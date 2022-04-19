变量
===

变量用于模板开发使用，方便展示内容。

## 全局变量

全局变量在 [rdoc.yml](../api/config.md) 配置中定义，详细使用查看 [rdoc.yml](../api/config.md#idocyml) 详细说明。

```ts
interface SiteGlobalConfig {
  /** 网站名称 */
  site?: string;
  /** 网站标题 */
  title?: string;
  /** 搜索引擎能搜索到的关键词 */
  keywords?: string;
  /** 对网页的一个简单概述，默认获取当前 Markdown 页面第一段文本 **/
  description?: string;
  /** 导航上的logo */
  logo?: LogoOrFavicon;
  /** 网站 favicon 设置 */
  favicon?: LogoOrFavicon;
  editButton?: {
    label?: string;
    url?: string;
  };
  openSource?:
    | string
    | {
        type: string;
        url: string;
      };
  footer?: string;
  /** 传递到页面上成为页面变量，值发生了变化 */
  menus?: Record<string, string | {
    url: string;
    active: boolean;
    target: string;
  }>;
}
```

### logo

```ts
type LogoOrFavicon = {
  href?: string;
  raw?: string;
  path?: string;
  base64?: string;
  /** svg code */
  code?: string;
}
```

模板中使用示例：

```ejs
<% if (logo.code) { %>
  <%- logo.code %>
<%} else if(logo.href) { %>
  <img alt="<%=site%> logo" src="<%= RELATIVE_PATH %><%=logo.href%>">
<%} else if (logo.base64) { %>
  <img alt="<%=site%> logo" src="<%=logo.base64%>">
<% } %>
```

### favicon

```ts
type LogoOrFavicon = {
  href?: string;
  raw?: string;
  path?: string;
  base64?: string;
  /** svg code */
  code?: string;
}
```

模板中使用示例：

```ejs
<% if (favicon.href) { %>
  <link rel="icon" href="<%=favicon.href%>" type="image/x-icon">
<% } else if (favicon.base64) { %>
  <link rel="icon" href="<%=favicon.base64%>" type="image/x-icon">
<% } %>
```

### editButton

```js
{
  label: 'Edit this page on GitHub',
  url: 'https://github.com/jaywcjlove/idoc/blob/master/README.md'
}
```

模板中使用示例：

```ejs
<% if (editButton && editButton.url && editButton.label) { %>
<a href="<%=editButton.url || '' %>" class="edit-button" target="_blank" rel="noopener noreferrer">
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
  </svg>
  <span><%=editButton.label%></span>
</a>
<% } %>
```

## 页面变量

`页面变量` 可以覆盖 `全局变量`，请谨慎使用。`页面变量` 在页面当中通过 [注释配置](../api/config.md#注释配置) 定义。在 markdown 注释配置所在的页面起作用。

```html
<!--idoc:config:
tocs: false
site: 网站名称
-->
```

页面注释配置，会覆盖全局变量

```ts
interface PageConfig extends Omit<SiteGlobalConfig, 'menus'> {
  /** 禁用 toc 展示 **/
  tocs?: Toc[] | false;
  layout?: string;
  prevPage?: Chapter;
  nextPage?: Chapter;
  fileStat?: Partial<IFileDirStat> & {
    atimeStr?: string;
    mtimeStr?: string;
    ctimeStr?: string;
  };
}
interface TemplateData extends Omit<Config, 'menus' | 'chapters'> {
  RELATIVE_PATH?: string;
  markdown?: string;
  html?: string;
  menus?: MenuData[];
  chapters?: Array<Chapter>;
}
type Chapter = {
  from?: string;
  to?: string;
  raw?: string;
  href?: string;
  current?: string;
  label?: string;
  isFolder?: boolean;
  active?: boolean;
};
```

### RELATIVE_PATH

此变量表示，`当前页` 面到 `指定` 输出根目录的相对目录，作用在于引入静态资源，例如引入 JS/CSS 等文件：

```html
<link href="<%= RELATIVE_PATH %>css/copy.css" rel="stylesheet" type="text/css"/>
<script src="<%= RELATIVE_PATH %>js/dark-mode.js"></script>
<script src="<%= RELATIVE_PATH %>js/markdown-style.js"></script>
```

所有 `HTML` 页面是根据 `markdown` 所在目录，生成到对应的目录中，所以相对地址访问静态资源，每个目录会不太一样。

### html

将 `Markdown` 转换成 `HTML` 传递给模板。下面示例将给 HTML 添加样式代码高亮。

```ejs
<script src="https://unpkg.com/@wcj/markdown-style"></script>
<markdown-style>
  <%- html %>
</markdown-style>
```

### markdown

此变量将 `Markdown` 原始没有处理的字符串传递给模版。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.0/dist/katex.min.css">
<link rel="stylesheet" href="https://unpkg.com/@wcj/markdown-to-html/dist/marked.css">

<script src="https://unpkg.com/@wcj/markdown-to-html/dist/markdown.min.js"></script>
<script type="text/javascript">
  ;(() => {
    const div = document.createElement('div');
    div.className = 'markdown-body';
    div.innerHTML = markdown.default('<%= markdown %>')
    document.body.appendChild(div)
  })();
</script>
```

### menus

导航菜单数据，此部分数据来自于 [idoc.yml](../api/config.md#menus) 中配置 [`menus`](../api/config.md#menus)，数据被转换如下：

```js
[
  {
    name: 'Docs',
    raw: 'introduce/getting-started/installation.html',
    active: true,
    target: '',
    url: '../getting-started/installation.html'
  },
  // 👈 更多数据....
]
```

模板中使用示例：

```ejs
<ul class="menu">
  <% menus.forEach(function(item) { %>
  <li>
    <a href="<%= item.url %>" class="<%- item.active ? 'active' : '' %>">
      <%= item.name %>
    </a>
  </li>
  <% }); %>
</ul>
```

如果你使用[静态服务](../getting-started/site-creation.md#静态服务预览)，预览您的静态页面，你可以使用绝对路径：

```ejs
<a href="/<%= item.raw %>">
```

### chapters

左侧 SiderBar 章节导航，数据来源于您自定义的 [`idoc.chapters.yml`](../api/config.md#idocchaptersyml) 配置中定义。

```js
[
  {
    from: '/idoc/docs/introduce/README.md',
    to: '/idoc/dist/introduce/index.html',
    relative: 'introduce/README.md',
    label: '自述',
    isFolder: false,
    active: false,
    href: '../index.html'
  },
  // 👈 更多数据....
}
```

模板中使用示例：

```ejs
<% if (chapters && chapters.length > 0) {%>
<div class="sidebar-border">
  <aside class="sidebar" role="navigation">
    <div>
    <% chapters.forEach((chapter) => {%>
      <% if (chapter.isFolder) {%>
        <label><%= chapter.label %></label>
      <% } else { %>
        <a href="<%= chapter.href %>" class="<%- chapter.active ? 'active' : ''  %>"><%= chapter.label %></a>
      <% } %>
    <% }) %>
    </div>
  </aside>
</div>
<% } %>
```

配置中的 `chapters` 原始数据通过 `global.chapters` 获取：

```js
[
  { 'introduce/README.md': '自述' },
  { 'introduce/getting-started': '入门' },
  { 'introduce/getting-started/installation.md': '安装' },
  { 'introduce/getting-started/publish.md': '发布网站' },
  { 'introduce/api': 'API' },
  { 'introduce/api/command.md': '命令帮助' },
  { 'introduce/api/config.md': '配置文件' },
  { 'introduce/theme': '主题' },
  { 'introduce/theme/theme-defalut.md': '定制主题' },
  { 'introduce/theme/templates.md': '模板' },
  { 'introduce/theme/variables.md': '变量' }
]
```

### prevPage

👈 向前翻一页，默认使用 `href` 和 `label` 两个字段展现界面。

```js
{
  from: '/idoc/docs/markdown/line-html.md',
  to: '/idoc/dist/markdown/line-html.html',
  raw: 'markdown/line-html.md',
  label: 'HTML 元素',
  isFolder: false,
  active: false,
  href: 'line-html.html'
}
```

模板中使用示例：

```ejs
<% if (page.prevPage && page.prevPage.href && page.prevPage.label) { %>
<a class="prev" href="<%= page.prevPage.href %>">
  <span>
    <%= page.prevPage.label %>
  </span>
</a>
<% } %>
```

### nextPage

👉 向后翻一页，默认使用 `href` 和 `label` 两个字段展现界面。

```js
{
  from: '/idoc/docs/markdown/line-html.md',
  to: '/idoc/dist/markdown/line-html.html',
  raw: 'markdown/line-html.md',
  label: 'HTML 元素',
  isFolder: false,
  active: false,
  href: 'line-html.html'
}
```

模板中使用示例：

```ejs
<% if (page.nextPage && page.nextPage.href && page.nextPage.label) { %>
<a class="next" href="<%= page.nextPage.href %>">
  <span>
    <%= page.nextPage.label %>
  </span>
</a>
<% } %>
```

## 内置变量

我们的想法是可以做到 `0` 配置编译文档，所以内置配置包含全局配置的默认值。

```typescript
import { IFileDirStat } from 'recursive-readdir-files';
export interface Config extends SiteGlobalConfig {
  root: string;
  /** markdown 文档所在目录位置 **/
  dir: string;
  /** 输出目录位置 **/
  output: string;
  /** Sider Bar 数据和顺序 **/
  chapters: Array<Record<string, string>>;
  /** 所有 markdown 资源位置体积大小等信息 **/
  asset: IFileDirStat[];
  /** 两个配置的位置 **/
  config?: Partial<Record<'conf' | 'chapters', string>>;
  /** 主题的文件目录位置 **/
  theme?: string;
  /** 默认首页 markdown 所在位置 `<process.cwd()>/README.md` */
  readme?: string;
  /** Template Data 目前没有什么作用的变量 */
  data?: Record<string, any>;
  /** project version */
  version?: string;
  /** idoc version */
  idocVersion?: string;
  scope?: string[];
  global?: Config;
  /** 页面中 - 注释配置的原始配置数据，看下面详细解释文档 **/
  page?: PageConfig;
}
```

```typescript
type Toc = {
  number?: number;
  label?: string;
  href?: string;
  class?: string;
};
```

```typescript
type MenuData = {
  name: string;
  url?: string;
  raw?: string;
  target?: string;
  active?: boolean;
};
```

### tocs

页面目录数据变量，是根据 `Markdown` 标题自动生成的的数据，如果 [注释配置](../api/config.md#注释配置) 中没有设置 `tocs: false` 禁用目录，将得到如下数据：

```js
[
  { number: 1, href: '配置文件', label: '配置文件', class: 'toc1' },
  { number: 2, href: '添加配置', label: '添加配置', class: 'toc2' },
  { number: 2, href: 'idocyml', class: 'toc2' },
  { number: 3, href: 'dir', class: 'toc3' },
  { number: 2, href: '注释配置', label: '注释配置', class: 'toc2' },
  { number: 3, href: '配置方法', label: '配置方法', class: 'toc3' },
  { number: 3, href: '详细配置说明', label: '详细配置说明', class: 'toc3' },
  { number: 3, href: 'layout', label: 'layout', class: 'toc3' }
]
```

模板中使用示例：

```ejs
<% if (tocs && tocs.length > 0 ) { %>
  <nav class="tocs">
    <% tocs.forEach(function(item) { %>
      <a href="#<%= item.href %>" class="<%= item.class %>">
        <%= item.label %>
      </a>
    <% }); %>
  </nav>
<% } %>
```

### page

变量包含 [`注释配置`](../api/config.md#注释配置) 的原始配置数据信息，定制主题可以用到它，帮助你主题提供更多单独页面功能的配置。`注释配置` 变量默认直接传递到模版中使用，定义的其它变量使用需要加上 `page` 前缀，示例：

```html
<h1><%= page.example %></h1>
```

### global

在变量没有被 [`注释配置`](../api/config.md#注释配置) 变量覆盖之前的全局配置。例如 `menus`：

使用 `global.menus` 获取原始配置数据：

```js
{
  Docs: 'introduce/getting-started/installation.html introduce',
  Markdown: 'markdown.html',
  About: 'about.html'
}
```

使用 [`menus`](#menus) 直接得到处理之后给到模板的数据：

```js
[
  {
    name: 'Docs',
    target: '',
    active: true,
    raw: 'introduce/getting-started/installation.html',
    url: '../getting-started/installation.html'
  },
  {
    name: 'Markdown',
    target: '',
    active: false,
    raw: 'markdown.html',
    url: '../../markdown.html'
  },
  {
    name: 'About',
    target: '',
    active: false,
    raw: 'about.html',
    url: '../../about.html'
  },
  {
    name: 'UIW',
    target: '__blank',
    active: false,
    raw: 'https://github.com/jaywcjlove/idoc',
    url: 'https://github.com/jaywcjlove/idoc'
  }
]
```

左边 SiderBar 提供的章节 [`chapters`](#chapters) 数据也是如此。
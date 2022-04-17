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
  logo?: string;
  /** 网站 favicon 设置 */
  favicon?: string;
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
  menus?: Record<string, string>;
}
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
  fileStat?: Partial<IFileDirStat> & {
    atimeStr?: string;
    mtimeStr?: string;
    ctimeStr?: string;
  };
}
interface TemplateData extends Omit<Config, 'menus' | 'chapters'> {
  RELATIVE_PATH?: string;
  markdown?: string;
  menus?: MenuData[];
  chapters?: Array<Chapters>;
}
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
  active?: boolean;
};
```

### page

变量包含 [`注释配置`](../api/config.md#注释配置) 的原始配置数据信息，定制主题可以用到它，帮助你主题提供更多单独页面功能的配置。`注释配置` 变量默认直接传递到模版中使用，定义的其它变量使用需要加上 `page` 前缀，例如：

```html
<h1><%= page.example %></h1>
```

### global

在变量没有被 [`注释配置`](../api/config.md#注释配置) 变量覆盖之前的全局配置。例如 `menus`：

原始配置得到的数据：

```js
{
  Docs: 'introduce/getting-started/installation.html introduce',
  Markdown: 'markdown.html',
  About: 'about.html'
}
```

处理之后给到模板的数据：

```js
[
  { name: 'Docs', active: true, url: '../getting-started/installation.html' },
  { name: 'Markdown', active: false, url: '../../markdown.html' },
  { name: 'About', active: false, url: '../../about.html' }
]
```

左边 SiderBar 提供的章节 `chapters` 数据也是如此。
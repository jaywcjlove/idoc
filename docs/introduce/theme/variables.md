变量
===

变量用于模板开发使用，方便展示内容。

## 全局变量

全局变量在 [rdoc.yml](../api/config.md) 配置中定义，详细使用查看 [rdoc.yml](../api/config.md#idocyml) 详细说明。

```ts
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
  label: string;
  url: string;
};
openSource?:
  | string
  | {
      type: string;
      url: string;
    };
footer?: string;
menus?: Record<string, string>;
```

## 页面变量

`页面变量` 可以覆盖 `全局变量`，请谨慎使用。`页面变量` 在页面当中通过 [注释配置](../api/config.md#注释配置) 定义。

```html
<!--idoc:config:
tocs: false
site: 网站名称
-->
```

```ts
interface SiteGlobalConfig {
  /** 禁用 toc 展示 **/
  tocs?: false;
  /** site name */
  site?: string;
  title?: string;
  keywords?: string;
  description?: string;
  /** website logo icon */
  logo?: string;
  /** website favicon icon */
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
  menus?: Record<string, string>;
  fileStat: Partial<IFileDirStat> & {
      atimeStr?: string;
      mtimeStr?: string;
      ctimeStr?: string;
  };
}
```

## 内置变量

我们的想法是可以做到 0 配置编译文档，所以内置配置包含全局配置的默认值。

```typescript
interface Config extends SiteGlobalConfig {
  root: string;
  /** markdown 文档所在目录位置 **/
  dir: string;
  /** 输出目录位置 **/
  output: string;
  /** Sider Bar 数据和顺序 **/
  chapters: Array<Record<string, string>>;
  /** 所有 markdown 资源位置 **/
  asset: IFileDirStat[];
  /** 两个配置的位置 **/
  config?: Partial<Record<'conf' | 'chapters', string>>;
  /** 主题的文件目录位置 **/
  theme?: string;
  /** 默认首页 markdown 所在位置 `<process.cwd()>/README.md` */
  readme?: string;
  /** Template Data */
  data?: Record<string, any>;
  /** project version */
  version?: string;
  /** idoc version */
  idocVersion?: string;
  scope?: string[];
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
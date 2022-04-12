Markdown 使用说明
===

使用 [Markdown](https://github.github.com/gfm/)<!--rehype:target="__blank"--> 解析文章，除了支持 [`Github GFM`](https://github.github.com/gfm/)<!--rehype:target="__blank"-->，还有一些特殊的使用方法，后期可以定义一些特殊的使用方法。

## 特殊语法

下面介绍的不是 Markdown 的标准语法，一些属于 idoc 自定义的语法，还有一些属于 [`Github GFM`](https://github.github.com/gfm/) 中的一些语法。

### 隐藏内容

我们使用 `<!--idoc:ignore:start-->`<!--rehype:style=background: #7ee787; color: #333;--> 与 `<!--idoc:ignore:end-->`<!--rehype:style=background: #7ee787; color: #333;--> 这个注释语法，忽略被包裹在中间的内容，这很有用，在 GitHub Markdown 预览文件中注释不会显示，在编译后的 HTML 中，忽略被包裹的 Markdown 内容：

```markdown
<!--idoc:ignore:start-->
idoc
===
<!--idoc:ignore:end-->
```

### 定义样式

默认 Markdown 语法解析有很多限制，`idoc` 通过使用 [rehype-attr](https://github.com/jaywcjlove/rehype-attr) 让文档可以使用 HTML 注释 `<!--rehype:xxx-->`<!--rehype:style=color: #070707; background: #ffef66cc;--> 自定义样式。

```markdown
## Title
<!--rehype:style=display: flex; height: 230px; align-items: center; justify-content: center; font-size: 38px;-->

Markdown Supports **Style**<!--rehype:style=color: red;-->
```

## 其它参考链接

有一些其它地方对 Markdown 语法介绍教程，可以看看。

- https://commonmark.org/
- https://github.github.com/gfm/

扩展语法
===

下面介绍的不是 Markdown 的标准语法，一些属于 idoc 自定义的语法，还有一些属于 [`Github GFM`](https://github.github.com/gfm/) 中的一些语法。

## 隐藏内容

我们使用 `<!--idoc:ignore:start-->`<!--rehype:style=background: #7ee787; color: #333;--> 与 `<!--idoc:ignore:end-->`<!--rehype:style=background: #7ee787; color: #333;--> 这个注释语法，忽略被包裹在中间的内容，这很有用，在 GitHub 中预览 Markdown 注释会被忽略，在编译后的 HTML 中，忽略被包裹的 Markdown 内容：

```markdown
<!--idoc:ignore:start-->
idoc
===
<!--idoc:ignore:end-->
```

## 定义样式

通过使用 [HTML](https://github.com/jaywcjlove/rehype-attr)<!--rehype:target="__blank"--> 注释 `<!--rehype:xxx-->`<!--rehype:style=color: #070707; background: #ffef66cc;--> ，解锁 Markdown 语法解析自生的一些限制，比如设置颜色，定义一个链接地址在新窗口中打开等。

```markdown
## Title
<!--rehype:style=display: flex; height: 230px; align-items: center; justify-content: center; font-size: 38px;-->

Markdown Supports **Style**<!--rehype:style=color: red;-->

[HTML](https://github.com/jaywcjlove/rehype-attr)<!--rehype:target="__blank"-->
```

## GFM 脚注

```markdown
Markdown[^1] 可以提高排版效率，并将文本转换为 HTML[^html]

[^1]: Markdown 是一种纯文本标记语言
[^html]: HyperText Markup Language 超文本标记语言
```

示例展示：来自 GFM[^1] 特性


[^1]: https://github.blog/changelog/2021-09-30-footnotes-now-supported-in-markdown-fields/
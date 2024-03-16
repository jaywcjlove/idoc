扩展语法
===

下面介绍的不是 Markdown 的标准语法，一些属于 idoc 自定义的语法，还有一些属于 [`Github GFM`](https://github.github.com/gfm/) 中的一些语法。

```
conso
```

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
```

### 超链接新窗口打开

```markdown
[HTML](https://github.com/jaywcjlove/rehype-attr)<!--rehype:target="__blank"-->
```

### 表格宽度设置

```markdown
表头 | xxx 
---- | ----
表头 | xxx 
<!--rehype:style=width: 100%; display: inline-table;-->
```

## GFM 脚注

```markdown
Markdown[^1] 可以提高排版效率，并将文本转换为 HTML[^html]

[^1]: Markdown 是一种纯文本标记语言
[^html]: HyperText Markup Language 超文本标记语言
```

示例展示：来自 GFM[^1] 特性

## 警报

```markdown
> [!NOTE]
> 用户应该知道的有用信息，即使在浏览内容时也是如此。

> [!TIP]
> 有助于更好或更轻松地做事的有用建议。

> [!IMPORTANT]
> 用户需要了解实现其目标的关键信息。

> [!WARNING]
> 需要用户立即注意以避免出现问题的紧急信息。

> [!CAUTION]
> 针对某些行动的风险或负面结果提出建议。
```


> [!NOTE]
> 用户应该知道的有用信息，即使在浏览内容时也是如此。

> [!TIP]
> 有助于更好或更轻松地做事的有用建议。

> [!IMPORTANT]
> 用户需要了解实现其目标的关键信息。

> [!WARNING]
> 需要用户立即注意以避免出现问题的紧急信息。

> [!CAUTION]
> 针对某些行动的风险或负面结果提出建议。

支持**修改标题**，但是破坏在 GitHub 上正常效果展示

> [!NOTE/笔记]
> 用户应该知道的有用信息，即使在浏览内容时也是如此。

## 示例预览

示例语法扩展，正对需要预览的 HTML 提供了一个 `idoc:preview` 标记，会自动生成 HTML 预览结果到页面，通过按钮点击可以切换 `代码` 和 `预览`，注意下面示例中的 `idoc:preview` 标记：


### `idoc:preview`

代码块添加 `idoc:preview` 标记，示例将被生成在当前页面上预览，`<script>` 脚本将失效。

```markdown
```html idoc:preview
<div style="color:red;">
  Test Preview HTML Example.
</div>
\```
```

```html idoc:preview
<div style="color:red;">
  Test Preview HTML Example.
</div>
```

### `idoc:preview:iframe`

代码块添加 `idoc:preview:iframe` 标记，示例将被生成到当前页面中的 `<iframe>` 中预览。

```markdown
```html idoc:preview:iframe
<div style="color:red;">
  Test Preview HTML Example.
</div>
\```
```

```html idoc:preview:iframe
<div style="color:red;">
  Test Preview HTML Example.
</div>
```


[^1]: https://github.blog/changelog/2021-09-30-footnotes-now-supported-in-markdown-fields/

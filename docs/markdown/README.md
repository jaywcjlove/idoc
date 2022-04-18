Markdown 语法指南
===

使用 [Markdown](http://spec.commonmark.org/)<!--rehype:target="__blank"--> 解析文章，支持 [`GFM`](https://github.github.com/gfm/)<!--rehype:target="__blank"-->(GitHub Flavored Markdown)语法，这是目前 GitHub.com 和 GitHub Enterprise 上的用户内容支持的 Markdown 方言，是基于 [CommonMark](http://spec.commonmark.org/) 规范的正式规范定义了这种方言的语法和语义。

GFM 是 CommonMark 的严格超集。 因此，GitHub 用户内容中支持的所有功能以及原始 CommonMark 规范中未指定的所有功能都称为扩展，并因此突出显示。

虽然 GFM 支持广泛的输入，但值得注意的是 idoc 在 GFM 转换为 HTML 后会执行额外的处理，以扩展更多的特殊使用方法。

## 什么是 Markdown？

Markdown 是一种用于编写结构化文档的纯文本格式，基于在电子邮件和 usenet 帖子中指示格式的约定。 它由 John Gruber（在 Aaron Swartz 的帮助下）开发，并于 2004 年以[语法描述](https://daringfireball.net/projects/markdown/syntax)和用于将 Markdown 转换为 HTML 的 Perl 脚本 (`Markdown.pl`) 的形式发布。 在接下来的十年中，以多种语言开发了数十种实现。 有些人使用脚注、表格和其他文档元素的约定扩展了原始的 Markdown 语法。 有些允许 Markdown 文档以 HTML 以外的格式呈现。 Reddit、StackOverflow 和 GitHub 等网站有数百万人使用 Markdown。 Markdown 开始在网络之外使用，用于创作书籍、文章、幻灯片、信件和演讲笔记。

## 参考链接

- https://commonmark.org/
- https://github.github.com/gfm/

添加文档
===

你可以执行下列命令来创建一篇新文章或者新的页面。

```bash
$ idoc new <path> [title]
```

## 命令添加文档

idoc 命令提供一个简单的命令，生成文档，示例：

```bash
$ idoc new introduce/README.md "Hello World" -f
```

上面示例命令，在默认的 `docs` 文档文件夹下，创建 `introduce` 文件夹，并在里面生成了 `README.md` 文档文件，默认为文档添加了一个 `Hello World` 的标题。 `-f` 参数表示如果文档存在直接覆盖文档。

## 手动添加文档

你可以在指定或默认 `docs` 的文档文件夹下，添加以 `.md` 为后缀的文本文件，并根据其内容建立文章。idoc 工具将自动根据位置生成 HTML。

## 添加配置

文本文档中可以通过[注释配置](../api/config.md#注释配置)，添加配置来设置一些功能，如隐藏 `toc`，添加创建时间等。

```markdown
<!--idoc:config:
tocs: false
site: 网站名称
-->
```

## 添加章节(SiderBar)导航

通过添加 [`idoc.chapters.yml`](../api/config.md#idocchaptersyml) 配置，设置默认主题的左侧 SiderBar 章节导航。详细配置说参考 [`idoc.chapters.yml`](../api/config.md#idocchaptersyml) 文档。

## 文档标题

在 Markdown 文档中第一个大标题 `<h1>` 视为标题，如：

```markdown
添加文档
===
```

不推荐下面写法，推荐上面 👆 写法，与文档中的小标题做区分。

```markdown
# 添加文档
```

会生成到 `<head>` 页头中：

```html
<title>添加文档 iDoc </title>
```

Markdown 页面中生成：

```html
<h1>添加文档 </h1>
```

## 文档目录

当前文档 `<h2>` ~ `<h6>` 视为文档目录标题，将生成到文档默认主题的右边，模板中使用 [`tocsTree`](../theme/variables.md#tocstree) 变量。

```markdown
## 标题 2
### 标题 3
#### 标题 4
##### 标题 5
###### 标题 6
```

```html
标题 2
----        👉  <h2>标题 2<h2>

## 标题 2    👉  <h2>标题 2<h2>
### 标题 3    👉  <h3>标题 3<h3>
#### 标题 4    👉  <h4>标题 4<h4>
##### 标题 5    👉  <h5>标题 5<h5>
###### 标题 6    👉  <h6>标题 6<h6>
```

## 添加概述

在 Markdown 文档中，第一段文本视为当前网页的概述，如：

```markdown
添加文档
===

你可以执行下列命令来创建一篇新文章或者新的页面。
```

生成 HTML 代码：

```html
<meta name="description" content="你可以执行下列命令来创建一篇新文章或者新的页面。">
```
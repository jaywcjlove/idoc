HTML 元素
===

目前支持部分 HTML 元素效果，包括 `<kdb>` `<b>` `<i>` `<em>` `<sup>` `<sub>` `<br>` 等

## 键位显示

```markdown
使用 <kbd>Enter</kbd> 键换行
```

示例：<kbd>Enter</kbd>

## 代码块

```markdown
使用 <pre></pre> 元素同样可以形成代码块
```

## 粗体

```markdown
<b>Markdown 在此处同样适用，如 **加粗**</b>
```

示例：<b>加粗</b>

## 斜体

```markdown
<i>Markdown 在此处同样适用，如 _斜体_<i>
```

示例：<i>斜体</i>

```markdown
<em>Markdown 在此处同样适用，如 _斜体_</em>
```

示例：<em>斜体</em>

## 上标

```markdown
这个文本包含 <sup>上标</sup> 文本。
```

示例：包含 <sup>上标</sup>

## 下标

```markdown
这个文本包含 <sub>下标</sub>文本。
```

下标：包含 <sub>下标</sub>

## 明暗图片

用于明暗主题切换图片实用

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/cheatsheets-foreach-1.dark.png">
  <source media="(prefers-color-scheme: light)" srcset="assets/cheatsheets-foreach-1.png">
  <img src="assets/cheatsheets-foreach-1.png" width="466px" />
</picture>
```

## 折叠面板

可以折叠/展开的内容区域。

```html
<details>
<summary>折叠面板 标题</summary>
折叠面板内容展示区域，支持 `markdown` 语法
</details>
```


<details>
<summary>示例 - 折叠面板标题</summary>

```html
<details>
<summary>折叠面板 标题</summary>
折叠面板内容展示区域，支持 `markdown` 语法
</details>
```

</details>

## 分组

这是用于对表单中的控制元素进行分组的 html 标签，展示效果用做特殊用法。


```markdown
<fieldset>
<legend>分组标题</legend>

分组面板内容展示区域，支持 `markdown` 语法
</fieldset>
```

示例效果：

<fieldset>
<legend>分组标题</legend>

分组面板内容展示区域，支持 `markdown` 语法
</fieldset>

🚧  注意：这在 GitHub 中并不支持。

插入图片
===

在 [基本语法](./basic-syntax.md#图片) 中已经解释了通用插入图片的方法。下面详细解释使用方法

## 基本使用

跟链接的方法区别在于前面加了个感叹号 `!`。

```markdown
![图像的替代文本 - 图片名称](../../logo.png)
![图像的替代文本 - 图片名称](http://图片网址)
当然，你也可以像网址那样对图片网址使用变量

这个链接用 1 作为网址变量 ![baidu][1].
然后在文档的结尾位变量赋值（网址）

[1]: https://jaywcjlove.github.io/logo.png

可以使用下面标签引入图片

<img src="https://jaywcjlove.github.io/logo.png">
```

🚧  注意：相对于 markdown 的图片插入，将自动拷贝放到输出目录，这在 idoc 工具中是自动的。但是资源不能放到指定文档目录（docs）之外

## 图片尺寸

扩展语法设置尺寸，紧跟随图片语法后面。这种语法是 idoc 扩展而来，不是标准语法，在 GitHub 上预览 html 注释将被忽略。优势对响应式页面会友好，比如最大宽度定义。

```markdown
![](https://jaywcjlove.github.io/logo.png)<!--rehype:style=max-width: 230px;-->
```

另外一种语法直接使用 `<img>` 标签引入图片：

```markdown
<img height="200" src="https://jaywcjlove.github.io/logo.png">
```

## 存放位置

在文档中，引入本地图片，都是相对于 Markdown 文件的位置引入图片。

```bash
├── docs
│   ├── README.md   # 👈  引用图片资源页面
│   └── about.md
├── logo.svg        # 👈  图片资源
```

文档 Markdown 中引入 `logo.svg` 图片

```markdown
![](../logo.svg)

<img src="../logo.svg">
```
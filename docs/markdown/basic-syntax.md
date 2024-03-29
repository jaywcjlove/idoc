基本语法
===

## 代码

如果你只想高亮语句中的某个函数名或关键字，可以使用反引号 <kbd>\`function_name()\`</kbd> 实现。

通常代码片段，需要你使用 <kbd>`</kbd> 包裹一段代码，并指定一种语言，示例：


```markdown
```javascript
$(document).ready(function () {
    alert('hello world');
});
\```
```

也可以使用 4 空格缩进，再贴上代码，实现相同的的效果：

```markdown
    $(document).ready(function () {
        alert('hello world');
    });
```

## 标题

文章内容较多时，可以用标题分段：

```markdown
# 大标题

## 大标题

### 中标题

#### 小标题
```

## 文章标题

默认读取文章第一个大标题 `<h1>` 的内容，并在浏览器的标签上显示，为了区分可以使用下面方式：

```markdown
网页标题
===

# 大标题
```

## 粗体、斜体

```markdown
**粗体文本**

__粗体文本__

*斜体文本*

_斜体文本_

***粗斜体文本***

___粗体文本___
```

## 链接

### 常用链接：

```markdown
文字链接 [idoc](https://github.com/jaywcjlove/idoc)
网址链接 <https://github.com/jaywcjlove/idoc>
```

### 高级链接：

```markdown
这个链接用 1 作为网址变量 [百度][1]
这个链接用 Taobao 作为网址变量 [Taobao][taobao]
然后在文档的结尾为变量赋值（网址）

[1]: https://www.baidu.com
[taobao]: https://www.taobao.com
```

## 列表

### 无序列表

```markdown
* 列表文本前使用 `星号 + 空格`
+ 列表文本前使用 `加号 + 空格`
- 列表文本前使用 `减号 + 空格`
```

### 有序列表

```markdown
1. 列表前使用 `数字 + . + 空格`
2. 我们会自动帮你添加数字
7. 不用担心数字不对，显示的时候我们会自动把这行的 7 纠正为 3
```

### 列表嵌套

```markdown
1. 列出所有元素：
   - 无序列表元素 A
      1. 元素 A 的有序子列表
      2. 元素 A 的有序子列表
   - 前面加三个空格
2. 列表里的多段换行：
   新的一个段落
   这样换行，整体的格式不会乱
3. 列表里引用：
   > 引用内容
   > 引用内容
4. 列表里代码段：
···```
···前面三个空格，之后用三个反引号形成代码块
···```
```

## 引用

### 普通引用

```markdown
> 引用文本前使用 `大于号 + 空格`
> 折行可以不加，新起一行都要加上哦
```

### 嵌套引用

```markdown
> 最外层引用
> > 第二层引用
> > > 可以嵌套很多层
```

### 引用里嵌套列表

```markdown
> - 这是引用里嵌套的一个列表
> - 还可以有子列表
> ···- 子列表 前面一个 tab 或者三个空格
> ···- 子列表
```

### 引用里嵌套代码块

```markdown
> ····同样的，在前面加四个空格形成代码块
>  
> ```
> 或者使用三个反引号形成代码块
> ```
```

## 图片

跟链接的方法区别在于前面加了个感叹号 `!`，这样是不是觉得好记多了呢？

```markdown
![图像的替代文本 - 图片名称](../../logo.png)
![图像的替代文本 - 图片名称](http://图片网址)
当然，你也可以像网址那样对图片网址使用变量

这个链接用 1 作为网址变量 [baidu][1].
然后在文档的结尾位变量赋值（网址）

[1]: http://www.idoc.com/logo.png
```

## 换行

```markdown
如果另起一行，只需在当前行结尾加 2 个空格：

在当前行的结尾加 2 个空格··
这行就会新起一行


在当前行的结尾加 1 个反斜杠\
这行就会新起一行
```

如果是要起一个新段落，只需要空出一行即可。

## 分隔符

如果你有写分割线的习惯，可以新起一行输入三个减号 `-`。当前后都有段落时，请空出一行：

```markdown
前面的段落

---

后面的段落
```
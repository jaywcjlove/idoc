命令帮助
===

idoc 是主要命令，用于构建你的 idoc 文档网站站点。

## 帮助

```bash
Usage: idoc [init][options] [--help|h] [--version|v]

Options:

  -v, --version, Show version number
  -h, --help, Displays help information.
  -f, --force, Force file regeneration.
  -d, --dir <dir-path>, Markdown file directory. defalut(docs)
  -o, --output <dir-path>, Output directory. defalut(dist)
  -w, --watch, Watch and compile Markdown files.
  -t, --theme, Customize theme settings. defalut(defalut)

Example:

  npm idoc init <folder>
  npm idoc --theme="defalut"
  npm idoc --dir="docs"
  npm idoc --output="dist"
  npm idoc --watch --output="www"

------------------------------------
  ,,        ,,
  db      `7MM
            MM
`7MM   ,M""bMM  ,pW"Wq.   ,p6"bo
  MM ,AP    MM 6W'   `Wb 6M'  OO
  MM 8MI    MM 8M     M8 8M
  MM `Mb    MM YA.   ,A9 YM.    ,
.JMML.`Wbmd"MML.`Ybmd9'   YMbmd'
------------------------------------
```

## 创建项目

```bash
$ idoc init my-app
```

## 监听编译

```bash
$ idoc --watch
```

监听 markdown 文件，编译并将静态页面输出到 `dist` 目录中。

## 编译

```bash
$ idoc --force
```

默认将编译好的静态页面输出到 `dist` 目录中。
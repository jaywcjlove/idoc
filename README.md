<!--idoc:ignore:start-->
idoc
===
<!--idoc:ignore:end-->

Generate static pages from all Markdown in a folder.

```
    ,,        ,,
    db      `7MM
              MM
  `7MM   ,M""bMM  ,pW"Wq.   ,p6"bo
    MM ,AP    MM 6W'   `Wb 6M'  OO
    MM 8MI    MM 8M     M8 8M
    MM `Mb    MM YA.   ,A9 YM.    ,
  .JMML.`Wbmd"MML.`Ybmd9'   YMbmd'
```


## Install

```bash
$ sudo npm install idoc -g
```

## Command Help

```bash
Usage: idoc [options] [--help|h] [--version|v]

Options:

  -v, --version, Show version number
  -h, --help, Displays help information.
  -d, --dir <dir-path>, Markdown file directory. defalut(docs)
  -o, --output <dir-path>, Output directory. defalut(dist)
  -w, --watch, Watch and compile Markdown files.
  -t, --theme, Watch and compile Markdown files. defalut(defalut)

Example:

  npm idoc --theme="defalut"
  npm idoc --dir="docs"
  npm idoc --output="dist"
  npm idoc --watch --output="www"
```

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/jaywcjlove/idoc/graphs/contributors">
  <img src="https://jaywcjlove.github.io/idoc/CONTRIBUTORS.svg" />
</a>

Made with [action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

Licensed under the MIT License.
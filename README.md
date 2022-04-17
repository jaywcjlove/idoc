<!--idoc:ignore:start-->
idoc
===
<!--idoc:ignore:end-->

[![Downloads](https://img.shields.io/npm/dm/idoc.svg?style=flat)](https://www.npmjs.com/package/idoc)
[![NPM version](https://img.shields.io/npm/v/idoc.svg?style=flat)](https://npmjs.org/package/idoc)
[![Build](https://github.com/jaywcjlove/idoc/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/idoc/actions/workflows/ci.yml)

Generate static pages from all Markdown in a folder.

```bash
  ,,        ,,
  db      `7MM
            MM
`7MM   ,M""bMM  ,pW"Wq.   ,p6"bo
  MM ,AP    MM 6W'   `Wb 6M'  OO
  MM 8MI    MM 8M     M8 8M
  MM `Mb    MM YA.   ,A9 YM.    ,
.JMML.`Wbmd"MML.`Ybmd9'   YMbmd'
```

## Quick Start

Create a idoc site using the beautiful defalut theme.

```bash
$ npx idoc init myapp
```

Or

```bash
$ sudo npm i idoc -g
$ idoc init myapp
```

Running the `idoc init myapp` generator from the command line will create a directory structure with the following elements:

```bash
├── docs
│   ├── README.md
│   └── about.md
├── package.json
└── idoc.yml
```

## Command Help

```bash
Usage: idoc [init|new][options] [--help|h] [--version|v]

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
  npm idoc new introduce/README.md
  npm idoc new introduce/README.md "Hello World" -f
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

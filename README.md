<!--idoc:ignore:start-->
idoc
===
<!--idoc:ignore:end-->

[![NPM version](https://img.shields.io/npm/v/idoc.svg?style=flat)](https://npmjs.org/package/idoc)
[![CI](https://github.com/jaywcjlove/idoc/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/idoc/actions/workflows/ci.yml)
[![Dependents Repo](https://badgen.net/github/dependents-repo/jaywcjlove/idoc)](https://github.com/jaywcjlove/idoc/network/dependents)
[![npm Downloads](https://img.shields.io/npm/dw/idoc?style=flat-square)](https://www.npmjs.com/package/idoc)
[![npm Downloads](https://img.shields.io/npm/dm/idoc?style=flat-square)](https://www.npmjs.com/package/idoc)
[![npm Downloads](https://img.shields.io/npm/dy/idoc?style=flat-square)](https://www.npmjs.com/package/idoc)

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

## Compiled with idoc

| Repo | Starred  | Website |
| ---- | ---- | ---- |
| [Awesome Mac](https://github.com/jaywcjlove/awesome-mac) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/awesome-mac.svg)](https://github.com/jaywcjlove/awesome-mac/stargazers) | [Preview Website](https://jaywcjlove.github.io/awesome-mac) |
| [MySQL Tutorial](https://github.com/jaywcjlove/mysql-tutorial) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/mysql-tutorial.svg)](https://github.com/jaywcjlove/mysql-tutorial/stargazers) | [Preview Website](https://jaywcjlove.github.io/mysql-tutorial) |
| [Docker Tutorial](https://github.com/jaywcjlove/docker-tutorial) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/docker-tutorial.svg)](https://github.com/jaywcjlove/docker-tutorial/stargazers) | [Preview Website](https://jaywcjlove.github.io/docker-tutorial) |
| [Nginx Tutorial](https://github.com/jaywcjlove/nginx-tutorial) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/nginx-tutorial.svg)](https://github.com/jaywcjlove/nginx-tutorial/stargazers) | [Preview Website](https://jaywcjlove.github.io/nginx-tutorial) |
| [Vim Web](https://github.com/jaywcjlove/vim-web) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/vim-web.svg)](https://github.com/jaywcjlove/vim-web/stargazers) | [Preview Website](https://jaywcjlove.github.io/vim-web) |
| [Git Tips](https://github.com/jaywcjlove/git-tips) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/git-tips.svg)](https://github.com/jaywcjlove/git-tips/stargazers) | [Preview Website](https://jaywcjlove.github.io/git-tips) |
| [Awesome UIKit](https://github.com/jaywcjlove/awesome-uikit) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/awesome-uikit.svg)](https://github.com/jaywcjlove/awesome-uikit/stargazers) | [Preview Website](https://jaywcjlove.github.io/awesome-uikit) |
| [Shell Tutorial](https://github.com/jaywcjlove/shell-tutorial) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/shell-tutorial.svg)](https://github.com/jaywcjlove/shell-tutorial/stargazers) | [Preview Website](https://jaywcjlove.github.io/shell-tutorial) |
| [SwiftUI Example](https://github.com/jaywcjlove/swiftui-example) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/swiftui-example.svg)](https://github.com/jaywcjlove/swiftui-example/stargazers) | [Preview Website](https://jaywcjlove.github.io/swiftui-example) |
| [Swift Tutorial](https://github.com/jaywcjlove/swift-tutorial) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/swift-tutorial.svg)](https://github.com/jaywcjlove/swift-tutorial/stargazers) | [Preview Website](https://jaywcjlove.github.io/swift-tutorial) |
| [Handbook](https://github.com/jaywcjlove/handbook) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/handbook.svg)](https://github.com/jaywcjlove/handbook/stargazers) | [Preview Website](https://jaywcjlove.github.io/handbook) |
| [GitHub Actions](https://github.com/jaywcjlove/github-actions) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/github-actions.svg)](https://github.com/jaywcjlove/github-actions/stargazers) | [Preview Website](https://jaywcjlove.github.io/github-actions) |
| [HTML Tutorial](https://github.com/jaywcjlove/html-tutorial) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/html-tutorial.svg)](https://github.com/jaywcjlove/html-tutorial/stargazers) | [Preview Website](https://jaywcjlove.github.io/html-tutorial) |
| [C Tutorial](https://github.com/jaywcjlove/c-tutorial) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/c-tutorial.svg)](https://github.com/jaywcjlove/c-tutorial/stargazers) | [Preview Website](https://jaywcjlove.github.io/c-tutorial) |
<!--rehype:style=width: 100%; display: inline-table;-->

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/jaywcjlove/idoc/graphs/contributors">
  <img src="https://jaywcjlove.github.io/idoc/CONTRIBUTORS.svg" />
</a>

Made with [action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

Licensed under the MIT License.

<!--idoc:ignore:start-->
idoc
===
<!--idoc:ignore:end-->

[![NPM version](https://img.shields.io/npm/v/idoc.svg?style=flat)](https://npmjs.org/package/idoc)
[![CI](https://github.com/jaywcjlove/idoc/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/idoc/actions/workflows/ci.yml)
[![Dependents Repo](https://badgen.net/github/dependents-repo/jaywcjlove/idoc)](https://github.com/jaywcjlove/idoc/network/dependents)
[![npm Downloads](https://img.shields.io/npm/dw/idoc?style=flat)](https://www.npmjs.com/package/idoc)
[![npm Downloads](https://img.shields.io/npm/dm/idoc?style=flat)](https://www.npmjs.com/package/idoc)
[![npm Downloads](https://img.shields.io/npm/dy/idoc?style=flat)](https://www.npmjs.com/package/idoc)

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
  -h, --help,    Displays help information.
  -f, --force,   Force file regeneration.
  -s, --site,    Set website name.
  -d, --dir <dir-path>, Markdown file directory. defalut(docs)
  -o, --output <dir-path>, Output directory. defalut(dist)
  -w, --watch,   Watch and compile Markdown files.
  -t, --theme,   Customize theme settings. defalut(defalut)
  -m, --minify,  minify HTML

Example:

  $ idoc init <folder>
  $ idoc new introduce/README.md
  $ idoc new introduce/README.md "Hello World" -f
  $ idoc --theme="defalut"
  $ idoc --dir="docs"
  $ idoc --output="dist"
  $ idoc --watch --output="www"

```

## Compiled with idoc

| Repo | Starred | Last Commit | Website |
| ---- | ---- | ---- | ---- |
| [Awesome Mac](https://github.com/jaywcjlove/awesome-mac) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/awesome-mac.svg)](https://github.com/jaywcjlove/awesome-mac/stargazers) | [![GitHub last commit](https://img.shields.io/github/last-commit/jaywcjlove/awesome-mac?style=flat&label=last)](https://github.com/jaywcjlove/awesome-mac/commits) | [Preview Website](https://jaywcjlove.github.io/awesome-mac) |
| [MySQL Tutorial](https://github.com/jaywcjlove/mysql-tutorial) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/mysql-tutorial.svg)](https://github.com/jaywcjlove/mysql-tutorial/stargazers) | [![GitHub last commit](https://img.shields.io/github/last-commit/jaywcjlove/mysql-tutorial?style=flat&label=last)](https://github.com/jaywcjlove/mysql-tutorial/commits) | [Preview Website](https://jaywcjlove.github.io/mysql-tutorial) |
| [Docker Tutorial](https://github.com/jaywcjlove/docker-tutorial) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/docker-tutorial.svg)](https://github.com/jaywcjlove/docker-tutorial/stargazers) | [![GitHub last commit](https://img.shields.io/github/last-commit/jaywcjlove/docker-tutorial?style=flat&label=last)](https://github.com/jaywcjlove/docker-tutorial/commits) | [Preview Website](https://jaywcjlove.github.io/docker-tutorial) |
| [Nginx Tutorial](https://github.com/jaywcjlove/nginx-tutorial) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/nginx-tutorial.svg)](https://github.com/jaywcjlove/nginx-tutorial/stargazers) | [![GitHub last commit](https://img.shields.io/github/last-commit/jaywcjlove/nginx-tutorial?style=flat&label=last)](https://github.com/jaywcjlove/nginx-tutorial/commits) | [Preview Website](https://jaywcjlove.github.io/nginx-tutorial) |
| [Vim Web](https://github.com/jaywcjlove/vim-web) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/vim-web.svg)](https://github.com/jaywcjlove/vim-web/stargazers) | [![GitHub last commit](https://img.shields.io/github/last-commit/jaywcjlove/vim-web?style=flat&label=last)](https://github.com/jaywcjlove/vim-web/commits) | [Preview Website](https://jaywcjlove.github.io/vim-web) |
| [Git Tips](https://github.com/jaywcjlove/git-tips) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/git-tips.svg)](https://github.com/jaywcjlove/git-tips/stargazers) | [![GitHub last commit](https://img.shields.io/github/last-commit/jaywcjlove/git-tips?style=flat&label=last)](https://github.com/jaywcjlove/git-tips/commits) | [Preview Website](https://jaywcjlove.github.io/git-tips) |
| [Awesome UIKit](https://github.com/jaywcjlove/shell-tutorialawesome-uikit) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/awesome-uikit.svg)](https://github.com/jaywcjlove/awesome-uikit/stargazers) | [![GitHub last commit](https://img.shields.io/github/last-commit/jaywcjlove/awesome-uikit?style=flat&label=last)](https://github.com/jaywcjlove/awesome-uikit/commits) | [Preview Website](https://jaywcjlove.github.io/awesome-uikit) |
| [Shell Tutorial](https://github.com/jaywcjlove/shell-tutorial) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/shell-tutorial.svg)](https://github.com/jaywcjlove/shell-tutorial/stargazers) | [![GitHub last commit](https://img.shields.io/github/last-commit/jaywcjlove/shell-tutorial?style=flat&label=last)](https://github.com/jaywcjlove/shell-tutorial/commits) | [Preview Website](https://jaywcjlove.github.io/shell-tutorial) |
| [SwiftUI Example](https://github.com/jaywcjlove/swiftui-example) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/swiftui-example.svg)](https://github.com/jaywcjlove/swiftui-example/stargazers) | [![GitHub last commit](https://img.shields.io/github/last-commit/jaywcjlove/swiftui-example?style=flat&label=last)](https://github.com/jaywcjlove/swiftui-example/commits) | [Preview Website](https://jaywcjlove.github.io/swiftui-example) |
| [Swift Tutorial](https://github.com/jaywcjlove/swift-tutorial) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/swift-tutorial.svg)](https://github.com/jaywcjlove/swift-tutorial/stargazers) | [![GitHub last commit](https://img.shields.io/github/last-commit/jaywcjlove/swift-tutorial?style=flat&label=last)](https://github.com/jaywcjlove/swift-tutorial/commits) | [Preview Website](https://jaywcjlove.github.io/swift-tutorial) |
| [Handbook](https://github.com/jaywcjlove/handbook) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/handbook.svg)](https://github.com/jaywcjlove/handbook/stargazers) | [![GitHub last commit](https://img.shields.io/github/last-commit/jaywcjlove/handbook?style=flat&label=last)](https://github.com/jaywcjlove/handbook/commits) | [Preview Website](https://jaywcjlove.github.io/handbook) |
| [GitHub Actions](https://github.com/jaywcjlove/github-actions) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/github-actions.svg)](https://github.com/jaywcjlove/github-actions/stargazers) | [![GitHub last commit](https://img.shields.io/github/last-commit/jaywcjlove/github-actions?style=flat&label=last)](https://github.com/jaywcjlove/github-actions/commits) | [Preview Website](https://jaywcjlove.github.io/github-actions) |
| [HTML Tutorial](https://github.com/jaywcjlove/html-tutorial) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/html-tutorial.svg)](https://github.com/jaywcjlove/html-tutorial/stargazers) | [![GitHub last commit](https://img.shields.io/github/last-commit/jaywcjlove/html-tutorial?style=flat&label=last)](https://github.com/jaywcjlove/html-tutorial/commits) | [Preview Website](https://jaywcjlove.github.io/html-tutorial) |
| [C Tutorial](https://github.com/jaywcjlove/c-tutorial) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/c-tutorial.svg)](https://github.com/jaywcjlove/c-tutorial/stargazers) | [![GitHub last commit](https://img.shields.io/github/last-commit/jaywcjlove/c-tutorial?style=flat&label=last)](https://github.com/jaywcjlove/c-tutorial/commits) | [Preview Website](https://jaywcjlove.github.io/c-tutorial) |
| [React Native](https://github.com/jaywcjlove/react-native) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/react-native.svg)](https://github.com/jaywcjlove/react-native/stargazers) | [![GitHub last commit](https://img.shields.io/github/last-commit/jaywcjlove/react-native?style=flat&label=last)](https://github.com/jaywcjlove/react-native/commits) | [Preview Website](https://jaywcjlove.github.io/react-native) |
| [TypeNexus](https://github.com/jaywcjlove/typenexus) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/typenexus.svg)](https://github.com/jaywcjlove/typenexus/stargazers) | [![GitHub last commit](https://img.shields.io/github/last-commit/jaywcjlove/typenexus?style=flat&label=last)](https://github.com/jaywcjlove/typenexus/commits) | [Preview Website](https://jaywcjlove.github.io/typenexus) |
| [Awesome ChatGPT](https://github.com/jaywcjlove/awesome-chatgpt) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/awesome-chatgpt.svg)](https://github.com/jaywcjlove/awesome-chatgpt/stargazers) | [![GitHub last commit](https://img.shields.io/github/last-commit/jaywcjlove/awesome-chatgpt?style=flat&label=last)](https://github.com/jaywcjlove/awesome-chatgpt/commits) | [Preview Website](https://jaywcjlove.github.io/awesome-chatgpt) |
| [React Components Awesome](https://github.com/jaywcjlove/react-components-awesome) | [![Github Stars](https://img.shields.io/github/stars/jaywcjlove/react-components-awesome.svg)](https://github.com/jaywcjlove/react-components-awesome/stargazers) | [![GitHub last commit](https://img.shields.io/github/last-commit/jaywcjlove/react-components-awesome?style=flat&label=last)](https://github.com/jaywcjlove/react-components-awesome/commits) | [Preview Website](https://jaywcjlove.github.io/react-components-awesome) |
<!--rehype:style=width: 100%; display: inline-table;-->

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/jaywcjlove/idoc/graphs/contributors">
  <img src="https://jaywcjlove.github.io/idoc/CONTRIBUTORS.svg" />
</a>

Made with [action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

Licensed under the MIT License.

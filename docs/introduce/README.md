自述
===

`idoc` 是一个快速、简洁且高效的文档生成工具。`idoc` 使用 [Markdown](https://github.github.com/gfm/) 解析文章，在几秒内，即可利用默认主题生成静态网页。

<!--idoc:config:
tocs: false
-->

### 为什么开发 `idoc` ？

在 2015年有一些自动生成文档的需求，开发了 `idoc`，由于工作的原因，idoc 停滞到现在。中间尝试使用 react 封装 [rdoc](https://github.com/jaywcjlove/rdoc) 工具，搞了 [markdown-to-html-cli](https://github.com/jaywcjlove/markdown-to-html-cli) 命令工具，帮助小的仓库方便生成单个静态页面，作为文档网站，让它同时支持 GitHub Action CI 中生成页面，即使你不是一个 node 项目，也可以生成简单的文档网站。

在多年的积累下，积攒了一些笔记，突然想把这些笔记整理到一起，之前的工具又不适合超多的 markdown 文件生成和菜单管理，还需要更好的与 GitHub 融合展示，想通过更为简单的工具解决这一些问题，这就有了重构 idoc 的想法。通过这些年，一系列的工具、经验积攒下，让我重构 idoc 变得非常简单，主程序开发设计只花费了一两天天时间，剩下的是各种小功能的慢慢集成和修补。

自述
===

`idoc` 是一个快速、简洁且高效的文档生成工具。`idoc` 使用 [Markdown](https://github.github.com/gfm/) 解析文章，在几秒内，即可利用默认主题生成静态网页。

<!--idoc:config:
tocs: false
-->

## 为什么开发 `idoc` ？

在 2015年有一些自动生成文档的需求，开发了 `idoc`，由于工作的原因，idoc 停滞到现在。中间尝试使用 react 封装 [rdoc](https://github.com/jaywcjlove/rdoc) 工具，开发 [markdown-to-html-cli](https://github.com/jaywcjlove/markdown-to-html-cli) 命令工具，帮助小的仓库方便生成单个静态页面，作为文档网站，让它同时支持 GitHub Action CI 中生成页面，即使你不是一个 node 项目，也可以生成简单的文档网站。这些工具在不同的应用场景，有着不同的作用，但是我眼下的一个想法，让我之前的工具并不能满足我眼下的需求，让我有了重构 idoc 的冲动。

在过去的积累下，积攒了一些笔记，查看非常不方便，突然想把这些笔记整理到一起，之前的工具又不适合现有的想法，如在生成出 html 的同时很好的在 GitHub 中展示，给文档网站添加章节目录，文档导航目录，菜单自定义等多个问题。这就有了重构 idoc 的想法。通过这些年，一系列的工具、经验积攒下，让我重构 idoc 变得非常简单，于是真的开始动手重构了，主程序开发设计只花费了一两天时间，剩下的是各种小功能的慢慢集成和修补吧 :)。


## 应用场景

通过 idoc 更好，更方便，更快捷的生成文档网站，可以轻松的根据文档定制自己的主题，管理菜单。未来希望支持博客生成，可能内置一个博客主题，需要在此基础上提供翻页变量，tag 标签，列表索引等。
安装
===

欢迎使用 `idoc`，本文档将帮助您快速上手。安装 `idoc` 只需几分钟时间，若您在安装过程中遇到问题或无法找到解决方式，请查在 [提交问题](https://github.com/jaywcjlove/idoc/issues) 上提问。

## 安装前提

安装 idoc 相当简单，只需要先安装下列应用程序即可：

[Node.js](http://nodejs.org/) (版本需不低于 10.13，建议使用 Node.js `12.0` 及以上版本)

如果您的电脑中已经安装上述必备程序，那么恭喜您！你可以直接前往 安装 idoc 步骤。如果您的电脑中尚未安装所需要的程序，请根据以下安装指示完成安装。

## 安装 Node.js

Node.js 为大多数平台提供了官方的 [安装程序](https://nodejs.org/en/download/)。对于中国大陆地区用户，可以前往 [淘宝 Node.js 镜像](https://npmmirror.com/mirrors/node/) 下载。

其它的安装方法：

- Windows：通过 [nvs](https://github.com/jasongin/nvs/) 或者 [nvm](https://github.com/nvm-sh/nvm) 或者 [n](https://github.com/tj/n) （推荐）安装。
- Mac：使用 [Homebrew](https://brew.sh/) 或 [MacPorts](http://www.macports.org/) 安装。
- Linux（DEB/RPM-based）：从 [NodeSource](https://github.com/nodesource/distributions) 安装。
- 其它：使用相应的软件包管理器进行安装，可以参考由 Node.js 提供的 指导。
- 对于 Mac 和 Linux 同样建议使用 nvs 或者 nvm，以避免可能会出现的权限问题。

对于 Mac 和 Linux 同样建议使用 nvs 或者 nvm，以避免可能会出现的权限问题。

## 安装 idoc

所有必备的应用程序安装完成后，即可使用 npm 安装 idoc。

```bash
$ npm install -g idoc
```

恭喜您！你可以全局使用 [idoc](../api/command.md) 命令创建自己的文档网站了。

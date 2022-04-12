创建网站
===

根据你创建的目录结构，配置命令生成网站

## 配置命令

如果你全局安装了 `idoc` 工具，下面的命令直接可以运行生成静态页面，但是不建议这么干，推荐将下面命令到 `package.json` 中

```bash
$ rdoc
```

配置到 `package.json` 中有一些优势，可以锁定 `idoc` 的版本，不会引发 `idoc` 版本不一致导致的问题。

```diff
{
  "scripts": {
    "start": "idoc --watch",
    "build": "idoc"
  },
  "devDependencies": {
+    "idoc": "^1.0.0-beta.12"
  }
}
```

## 实时编译

我们需要监听 Markdown 文件，实时生成 HTML 文件，您需要运行下面命令：

```bash
$ rdoc --watch

✔ copy: themes/default/css/main.css -> css/main.css
✔ copy: themes/default/js/dark-mode.js -> js/dark-mode.js
✔ copy: themes/default/js/markdown-style.js -> js/markdown-style.js
✔ idoc: about.md -> about.html
✔ idoc: docs/markdown.md -> docs/markdown.html
✔ idoc: docs/config.md -> docs/config.html
✔ idoc: ../README.md -> index.html
```

## 本地预览

默认使用 `rdoc` 命令，将 `Markdown` 文件生成到默认的 `dist` 目录中，直接在浏览器里面打开 `index.html` 即可。

如果你想编辑 `Markdown` 文件生成的静态页面，在浏览器中自动在浏览器中刷新，可以使用类似 [`sgo`](https://www.npmjs.com/package/sgo) 工具预览你的静态网站。

```bash
$ npx sgo --port 5858

 🗂  Serving files from ./ on  http://localhost:5858
 📡 Exposed to the network on  http://192.168.31.179:5858
 🖥  Using index.html as the fallback for route requests
 ♻️  Reloading the browser when files under ./ change

 200  /index.html
 200  /css/main.css
 200  /js/dark-mode.js
 200  /js/markdown-style.js
```

恭喜你！打开网址 `http://localhost:5858/` 即可访问网站。
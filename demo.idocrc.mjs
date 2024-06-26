export default {
  rewrite: (node, index, parent) => {
    console.log(index)
  },
  "output": "dist",
  "site": "iDoc {{version}}",
  "cacheFileStat": true,
  "homepage": "https://wangchujiang.com/idoc/",
  "theme": "default",
  "logo": "./logo.png",
  "favicon": "./logo.png",
  "keywords": "idoc,document,doc",
  "openSource": "https://github.com/jaywcjlove/idoc",
  "editButton": {
    "label": "Edit this page on GitHub",
    "url": "https://github.com/jaywcjlove/idoc/blob/master/"
  },
  "scope": [
    "introduce",
    "markdown"
  ],
  "data": {
    "site_name": "idoc"
  },
  "meta": [
    "<meta name=\"author\" content=\"Kenny Wong\">",
    "<meta property=\"og:site_name\" content=\"<%= data.site_name %>\">",
    "<meta property=\"og:url\" content=\"<%=homepage%><%=RESOLVE_PATH%>\">",
    "<meta property=\"og:image\" content=\"<%=homepage%>logo.png\">",
    "<meta property=\"og:type\" content=\"website\">",
    "<meta property=\"og:title\" content=\"<%= title %> - idoc\">",
    "<meta property=\"og:description\" content=\"<%= description%>\">",
    "<meta property=\"twitter:image:src\" content=\"<%=homepage%>assets/banner.png\">",
    "<meta property=\"twitter:site\" content=\"@jaywcjlove\">",
    "<meta property=\"twitter:creator\" content=\"jaywcjlove\">",
    "<meta property=\"twitter:card\" content=\"summary_large_image\">",
    "<meta property=\"twitter:title\" content=\"<%= title %>\">",
    "<meta property=\"twitter:description\" content=\"<%= description%>\">"
  ],
  "copyAssets": [
    "*/assets/*.(png|jpg)"
  ],
  "menus": {
    "Home": "index.html",
    "Docs": "introduce/getting-started/installation.html",
    "Markdown": "markdown/basic-syntax.html",
    "About": "about.html"
  },
  "footer": "Released under the MIT License. Copyright © {{idocYear}} Kenny Wong<br />\nGenerated by <a href=\"https://github.com/jaywcjlove/idoc\" target=\"_blank\">idoc</a> v{{idocVersion}}\n",
  "giscus": {
    "src": "https://giscus.app/client.js",
    "data-repo": "jaywcjlove/idoc",
    "data-repo-id": "MDEwOlJlcG9zaXRvcnk0MjM4MTA2Nw==",
    "data-category": "Q&A",
    "data-category-id": "DIC_kwDOAoavC84CZOtP",
    "data-mapping": "pathname",
    "data-strict": 0,
    "data-reactions-enabled": 1,
    "data-emit-metadata": 0,
    "data-input-position": "top",
    "data-theme": "dark",
    "data-lang": "zh-CN",
    "data-loading": "lazy",
    "crossorigin": "anonymous",
    "async": true
  }
}
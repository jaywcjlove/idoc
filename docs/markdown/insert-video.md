插入视频
===

`idoc v1.33.0` 支持视频预览，要求视频文件以 `.mp4` 或 `.mov` 后缀结尾，或是 GitHub 视频链接，并在 URL 中添加 `rehype=video` 参数。

```markdown
https://example.com/001.mp4

https://example.com/002.mov
```

## Github 视频链接

```markdown
https://github.com/user-attachments/assets/0d808e2e-84c7-46ca-a220-440fa9f34118?title=Rehype%20video&rehype=video
```

示例添加了标题参数 `title=Rehype%20video` 和视频标记参数 `rehype=video`，预览如下：

https://github.com/user-attachments/assets/0d808e2e-84c7-46ca-a220-440fa9f34118?title=Rehype%20video&rehype=video
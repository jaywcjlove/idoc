import path from 'path';
import { Root, RootContent } from 'hast';
import { isAbsoluteURL, isOutReadme } from './utils.js';
import { config } from '../utils/conf.js';

export default function rehypeUrls(node: Root | RootContent, fromPath: string) {
  if (node.type === 'element' && node.properties.href && /.md/.test(node.properties.href as string)) {
    let href = node.properties.href as string;
    if (!isAbsoluteURL(href) && typeof href === 'string') {
      const isOutDocs = isOutReadme(fromPath);
      if (isOutDocs) {
        href = path
          .relative(config.data.dir, path.resolve(config.data.root, href))
          .split(path.sep)
          .join('/')
          .replace(/([^\.\/\\]+)\.(md|markdown)/gi, '$1.html');
      }
      if (/readme\.(md|markdown)$/i.test(href)) {
        node.properties.href = href.toLocaleLowerCase().replace(/readme\.(md|markdown)/gi, 'index.html');
      } else {
        node.properties.href = href.toLocaleLowerCase().replace(/([^\.\/\\]+)\.(md|markdown)/gi, '$1.html');
      }
    }
  }
}

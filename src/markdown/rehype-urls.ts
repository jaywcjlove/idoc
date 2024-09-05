import path from 'path';
import type { Root, RootContent } from 'hast';
import { isAbsoluteURL, isOutReadme } from './utils.js';
import { config } from '../utils/conf.js';
import { getOutput } from '../scripts/build.js';

export default function rehypeUrls(node: Root | RootContent, fromPath: string) {
  if (node.type === 'element' && node.properties?.href && /.md/.test(node.properties.href as string)) {
    let href = node.properties.href as string;
    if (!isAbsoluteURL(href) && typeof href === 'string') {
      const isOutDocs = isOutReadme(fromPath);
      if (isOutDocs) {
        const output = getOutput(path.resolve(config.data.root, href));
        href = path
          .relative(config.data.output, output)
          .split(path.sep)
          .join('/')
          .replace(/([^\.\/\\]+)\.(md|markdown)/gi, '$1.html');
      }
      if (/(README)\.?(\w+)?\.(md|markdown)$/i.test(href)) {
        node.properties.href = href
          .toLocaleLowerCase()
          .replace(/(README)\.?(\w+)?\.(md|markdown)$/i, (match, p1, p2) => {
            return `index${p2 ? '.' + p2 : ''}.html`;
          });
      } else {
        node.properties.href = href.replace(/([^\.\/\\]+)\.(md|markdown)/gi, '$1.html');
      }
    }
  }
}

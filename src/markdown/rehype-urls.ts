import path from 'path';
import { Root, RootContent } from 'hast';
import { isAbsoluteURL } from './utils.js';
import { config } from '../utils/conf.js';

export default function rehypeUrls(node: Root | RootContent, fromPath: string) {
  if (node.type === 'element' && node.properties.href && /.md/.test(node.properties.href as string)) {
    let href = node.properties.href as string;
    if (!isAbsoluteURL(href) && typeof href === 'string') {
      const isOutDocs = !fromPath.startsWith(config.data.dir);
      if (isOutDocs) {
        console.log(isOutDocs, path.relative(config.data.dir, path.resolve(config.data.root, href)));
        href = path.relative(config.data.dir, path.resolve(config.data.root, href));
      }

      console.log(node.properties.href);
      // console.log(path.resolve(href))
      // console.log(path.resolve())
      if (/readme\.(md|markdown)$/i.test(href)) {
        node.properties.href = href.toLocaleLowerCase().replace(/readme\.(md|markdown)/gi, 'index.html');
      } else {
        node.properties.href = href.toLocaleLowerCase().replace(/([^\.\/\\]+)\.(md|markdown)/gi, '$1.html');
      }
      console.log('~~~', node.properties.href);
    }
  }
}

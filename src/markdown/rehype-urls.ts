import { Root, RootContent } from 'hast';

const isAbsoluteURL = (str: string) => /^[a-z][a-z0-9+.-]*:/.test(str);

export default function rehypeUrls(node: Root | RootContent) {
  if (node.type === 'element' && node.properties.href && /.md/.test(node.properties.href as string)) {
    const href = node.properties.href as string;
    if (!isAbsoluteURL(href)) {
      if (/readme\.(md|markdown)$/i.test(href)) {
        node.properties.href = href.toLocaleLowerCase().replace(/readme\.(md|markdown)/gi, 'index.html');
      } else {
        console.log('href', node, href, href.replace(/([^\.\/\\]+)\.(md|markdown)/gi, '$1.html'));
        node.properties.href = href.toLocaleLowerCase().replace(/([^\.\/\\]+)\.(md|markdown)/gi, '$1.html');
      }
    }
  }
}

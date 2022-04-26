import { Plugin } from 'unified';
import { Root, RootContent } from 'hast';
import { visit } from 'unist-util-visit';
import { getCodeString } from 'rehype-rewrite';

export type CodePreviewOptions = {};

export const codePreview: Plugin<[CodePreviewOptions?], Root> = (options = {}) => {
  return (tree) => {
    visit(tree, (node: Root | RootContent, index, parent) => {
      if (node.type === 'element' && node.tagName === 'code' && node.data && node.data.meta) {
        const [meta = ''] = /idoc:(.\w+)/i.exec(String(node.data.meta)) || [];
        node.properties['data-meta'] = meta;
        const metaType = meta.replace(/^idoc:/i, '');
        if (metaType === 'preview' && parent.type === 'element') {
          const lang = String(
            Array.isArray(node.properties.className)
              ? node.properties.className.find((name: string) => name.startsWith('language-'))
              : node.properties.className,
          );
          const code = getCodeString(node.children) || '';

          parent.properties.className = 'idoc-demo-warpper';
          parent.children.push({
            type: 'element',
            tagName: 'iframe',
            children: [],
            properties: {
              title: 'Demo Preview',
              width: '100%',
              height: '100%',
              allowTransparency: true,
              className: 'idoc-demo-previw' + (lang ? ` ${lang}` : ''),
              srcdoc: code,
            },
          });
          parent.children.push({
            type: 'element',
            tagName: 'input',
            properties: {
              type: 'hidden',
              'data-lang': lang,
              'data-idoc-type': metaType,
              value: code,
            },
            children: [],
          });
          parent.children.push({
            type: 'element',
            tagName: 'button',
            properties: {
              type: 'button',
              className: 'idoc-toggle-previw',
            },
            children: [
              {
                type: 'text',
                value: 'Show Code',
              },
            ],
          });
        }
      }
    });
  };
};

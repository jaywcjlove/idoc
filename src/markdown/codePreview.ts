import type { Plugin } from 'unified';
import type { Root, RootContent } from 'hast';
import { visit } from 'unist-util-visit';
import { getCodeString } from 'rehype-rewrite';

export type CodePreviewOptions = {};

/**
 * - `idoc:preview`
 * - `idoc:preview:iframe`
 * @returns
 * ```js
 * {
 *    preview: true,
 *    iframe: false
 * }
 * ```
 */
export function getCodeMeta(meta: string = ''): Record<'preview' | 'iframe', boolean> {
  const result = { preview: false, iframe: false };
  const [metaRaw = ''] = /idoc:(.[\w|:]+)/i.exec(meta) || [];
  typeof metaRaw === 'string' &&
    metaRaw.split(':').forEach((key: keyof typeof result) => {
      if (typeof result[key] === 'boolean') {
        result[key] = true;
      }
    });
  return result;
}

export const codePreviewWarpperStyle = (node: Root | RootContent) => {
  if (
    node.type === 'element' &&
    node.tagName === 'pre' &&
    node.properties.className &&
    Array.isArray(node.properties.className) &&
    node.properties.className.includes('idoc-demo-warpper')
  ) {
    node.tagName = 'div';
    node.children = node.children.map((elm) => {
      if (elm.type === 'element' && elm.tagName === 'code') {
        elm.tagName = 'pre';
      }
      return elm;
    });
  }
};

export const codePreview: Plugin<[CodePreviewOptions?], Root> = (options = {}) => {
  return (tree) => {
    visit(tree, (node: Root | RootContent, index, parent) => {
      if (node.type === 'element' && node.tagName === 'pre') {
        const code = getCodeString(node.children) || '';
        node.children.push({
          type: 'element',
          tagName: 'input',
          properties: {
            type: 'hidden',
            value: code,
          },
          children: [],
        });
      }
      const metaRaw = (node.data as any)?.meta as string;
      if (node.type === 'element' && node.tagName === 'code' && metaRaw) {
        const metaData = getCodeMeta(metaRaw);
        node.properties['data-meta'] = Object.keys(metaData)
          .filter((key: keyof typeof metaData) => metaData[key])
          .join(':');
        if (metaData.preview && parent.type === 'element') {
          const lang = String(
            Array.isArray(node.properties.className)
              ? node.properties.className.find((name: string) => name.startsWith('language-'))
              : node.properties.className,
          );
          const code = getCodeString(node.children) || '';

          parent.properties.className = 'idoc-demo-warpper';
          if (metaData.iframe) {
            parent.children.push({
              type: 'element',
              tagName: 'iframe',
              children: [],
              properties: {
                title: 'Demo Preview',
                width: '100%',
                height: '100%',
                allowTransparency: true,
                'data-previw': true,
                className: 'idoc-demo-previw',
                srcdoc: code,
              },
            });
          } else {
            parent.children.push({
              type: 'element',
              tagName: 'div',
              children: [],
              properties: {
                'data-previw': true,
                className: 'idoc-demo-previw',
              },
            });
          }
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

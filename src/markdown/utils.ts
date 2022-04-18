import { getCodeString } from 'rehype-rewrite';
import { Root } from 'hast';

export function getTitle(node: Root) {
  const h1Elm = node.children.find((item) => item.type === 'element' && item.tagName === 'h1');
  if (h1Elm && h1Elm.type === 'element') {
    return getCodeString(h1Elm.children).replace(/\n/g, '').trim().slice(0, 120);
  }
}

export function getDescription(node: Root) {
  const desElm = node.children.find((item) => {
    if (item.type === 'element' && item.tagName === 'p') {
      return !!item.children.find((item) => item.type === 'text' && item.value.trim().replace(/\n/g, ''));
    }
    return false;
  });
  if (desElm && desElm.type === 'element') {
    return getCodeString(desElm.children);
  }
}

export const isAbsoluteURL = (str: string) => /^[a-z][a-z0-9+.-]*:/.test(str);

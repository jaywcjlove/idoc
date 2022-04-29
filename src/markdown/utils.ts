import path from 'path';
import { getCodeString } from 'rehype-rewrite';
import { Root } from 'hast';
import { config } from '../utils/conf.js';
import { Chapter, getFormatChapter } from '../utils/chapters.js';

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
export const isOutReadme = (mdPath: string) =>
  path.relative(config.data.root, mdPath).toLocaleLowerCase() === 'readme.md';
export function getPrevOrNextPage(
  type: 'prev' | 'next',
  { raw, label }: Chapter,
  chapters: Chapter[] = [],
  mdPath: string,
  htmlPath: string,
): Chapter {
  const entirePath = path.resolve(config.data.dir, mdPath);
  const outputPath = path.resolve(config.data.output, htmlPath);
  const outReadme = isOutReadme(mdPath);
  const index = chapters.findIndex((item) => {
    if (outReadme && item.from === path.resolve(config.data.dir, path.basename(mdPath))) {
      return true;
    }
    return item.from === entirePath;
  });
  let result: Chapter = {};
  if (raw && label) {
    return getFormatChapter({ [raw]: label }, outputPath);
  }
  if (type === 'next') {
    let n = index;
    while (n < chapters.length) {
      n++;
      const chapter = chapters[n];
      if (chapter && !chapter.isFolder) {
        result = chapter;
        break;
      }
    }
  }
  if (type === 'prev') {
    let n = index;
    while (n > -1) {
      n--;
      const chapter = chapters[n];
      if (chapter && !chapter.isFolder) {
        result = chapter;
        break;
      }
    }
  }
  if (label) {
    result.label = label;
  }
  return result;
}

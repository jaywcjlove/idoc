import type { Toc, TocTree } from './markdown.js';

export function getTocsTree(arr: Toc[], result: Toc[] = []) {
  let n = 0;
  let level = -1;

  while (n < arr.length) {
    const toc = arr[n] as TocTree;

    if (level === -1) {
      level = toc.number;
    }

    if (toc.number === level) {
      result.push(toc);
      if (arr[n + 1] && arr[n + 1].number === level + 1) {
        toc.children = getTocsTree(arr.slice(n + 1));
      }
    } else if (toc.number < level) {
      break;
    }

    n++;
  }
  return result;
}

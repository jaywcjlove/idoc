import path from 'path';
import { config, isScope } from '../utils/conf.js';

export type Chapter = {
  from?: string;
  to?: string;
  raw?: string;
  href?: string;
  current?: string;
  label?: string;
  isFolder?: boolean;
  active?: boolean;
};

export function getFormatChapter(chapter: Record<string, string>, current?: string): Chapter {
  const obj: Chapter = {};
  Object.keys(chapter).forEach((key) => {
    obj.from = path.resolve(config.data.dir, key).split(path.sep).join('/');
    obj.to = path
      .resolve(config.data.output, key)
      .replace(/\.(md|markdown)/i, '.html')
      .split(path.sep)
      .join('/')
      // .replace(/\/(README).html$/i, '/index.html')
      .replace(/\/(README)\.?(\w+)?\.html$/i, (match, p1, p2) => {
        return `/index${p2 ? '.' + p2 : ''}.html`;
      });
    obj.raw = key.replace(new RegExp(`(\/|\)$`, 'g'), '');
    obj.label = chapter[key];
    obj.isFolder = !obj.to.endsWith('.html') && !/^https?:\/\//.test(key);
    obj.active = current === obj.to;
    if (/^https?:\/\//.test(key)) {
      obj.href = key;
    } else {
      obj.href = path
        .relative(path.dirname(current), obj.to)
        .split(path.sep)
        .join('/')
        // .replace(/\/(README).(html|md|markdown)$/i, '/index.html')
        .replace(/\/(README)\.?(\w+)?\.(html|md|markdown)$/i, (match, p1, p2) => {
          return `/index${p2 ? '.' + p2 : ''}.html`;
        });
    }
  });
  return obj;
}

export function formatChapters(arr: Array<Record<string, string>> = [], current?: string): Chapter[] {
  const findScopePrivate = config.data.scopePrivate.find((item) => isScope(current, item));
  if (findScopePrivate) {
    return arr
      .map((item) => {
        const obj: Chapter = getFormatChapter(item, current);
        if (!isScope(obj.to, findScopePrivate)) {
          return;
        }
        return obj;
      })
      .filter(Boolean);
  }

  const findScope = config.data.scope.find((item) => isScope(current, item));
  if (!findScope && config.data.scope.length > 0) {
    return [];
  }
  const chapters = arr.map((item) => {
    const obj: Chapter = getFormatChapter(item, current);
    if (!isScope(obj.to, findScope) && config.data.scope.length > 0) {
      return;
    }
    const scopePrivate = config.data.scopePrivate.find((item) => isScope(obj.to, item));
    if (isScope(obj.to, scopePrivate)) {
      return;
    }
    return obj;
  });
  return [...chapters].filter(Boolean);
}

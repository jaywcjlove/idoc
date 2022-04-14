import path from 'path';
import { config } from '../utils/conf.js';

export type Chapters = {
  from?: string;
  to?: string;
  relative?: string;
  href?: string;
  current?: string;
  label?: string;
  class?: string;
  isFolder?: boolean;
  active?: boolean;
};

export function formatChapters(arr: Array<Record<string, string>> = [], current?: string): Chapters[] {
  const chapters = arr.map((item) => {
    const obj: Chapters = {};
    Object.keys(item).forEach((key) => {
      obj.from = path.resolve(config.data.dir, key).split(path.sep).join('/');
      obj.to = path
        .resolve(config.data.output, key)
        .replace(/\.(md|markdown)/, '.html')
        .split(path.sep)
        .join('/');
      obj.relative = key.replace(/\/$/, '');
      obj.label = item[key];
      obj.isFolder = !obj.to.endsWith('.html');
      obj.active = current === obj.to;
      obj.href = path.relative(path.dirname(current), obj.to).split(path.sep).join('/');
    });
    return obj;
  });
  return [...chapters].filter(Boolean);
}

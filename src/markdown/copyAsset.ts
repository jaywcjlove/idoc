import fs from 'fs-extra';
import path from 'path';
import type { Root, RootContent } from 'hast';
import { isAbsoluteURL } from './utils.js';
import { getOutput } from '../scripts/build.js';
import * as log from '../utils/log.js';
import { cacheCopyiedFiles } from '../utils/conf.js';

export function copyied(fromPath: string, toPath: string) {
  const stat = fs.statSync(fromPath);
  if (!stat.isFile()) {
    return;
  }
  fs.ensureDir(path.dirname(toPath), (err) => {
    if (err) {
      console.log(` \x1b[31midoc:copy:\x1b[0m`, err);
      return;
    }
    fs.copyFile(decodeURIComponent(fromPath), decodeURIComponent(toPath))
      .then((result) => {
        log.output('\x1b[35;1mcopy\x1b[0m')(decodeURIComponent(fromPath), decodeURIComponent(toPath));
      })
      .catch((err) => {
        console.log(` \x1b[31midoc:asset:copy:\x1b[0m`, err);
      });
  });
}

export function copyAsset(node: Root | RootContent, mdpath: string) {
  if (
    node.type !== 'element' ||
    !/^(img|a|video|source|audio)$/.test(node.tagName) ||
    Array.isArray(node.properties.src)
  )
    return;
  let href = '';
  if (node.tagName === 'img' || node.tagName === 'video' || node.tagName === 'source' || node.tagName === 'audio') {
    if (typeof node.properties.src !== 'string' || isAbsoluteURL(node.properties.src)) return;
    href = node.properties.src;
  }
  if (node.tagName === 'a') {
    if (
      typeof node.properties.href !== 'string' ||
      isAbsoluteURL(node.properties.href) ||
      node.properties.href.startsWith('#')
    )
      return;
    href = node.properties.href;
  }
  const assetPath = path.resolve(path.dirname(mdpath), decodeURIComponent(href)).replace(/[?#].*$/, '');
  if (assetPath.toLocaleLowerCase().endsWith('.html')) return;
  if (!fs.existsSync(assetPath)) return;
  const output = getOutput(assetPath);
  node.properties.src = path.relative(path.dirname(getOutput(mdpath)), output);
  if (!cacheCopyiedFiles.includes(assetPath)) {
    copyied(assetPath, output);
    cacheCopyiedFiles.push(assetPath);
  }
}

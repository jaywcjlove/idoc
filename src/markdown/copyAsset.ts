import fs from 'fs-extra';
import path from 'path';
import { Root, RootContent } from 'hast';
import { config, getOutputCurrentPath } from '../utils/conf.js';
import { isAbsoluteURL, isOutReadme } from './utils.js';
import { getOutputPath } from '../scripts/build.js';
import * as log from '../utils/log.js';

export function copyied(fromPath: string, toPath: string) {
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
        console.log(` \x1b[31midoc:copy:\x1b[0m`, err);
      });
  });
}

export function copyAsset(node: Root | RootContent, mdpath: string) {
  if (node.type !== 'element' || !/^(img|a)$/.test(node.tagName) || Array.isArray(node.properties.src)) return;
  let href = '';
  if (node.tagName === 'img') {
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

  const outReadme = isOutReadme(mdpath);
  if (outReadme && mdpath.toLocaleLowerCase().endsWith('readme.md')) {
    const assetPath = path.resolve(config.data.root, href);
    if (!fs.existsSync(assetPath) || !assetPath.startsWith(config.data.root)) return;
    const isIncludesDocs = assetPath.startsWith(config.data.dir);
    const outputPath = path.resolve(config.data.output, href);
    if (!isIncludesDocs) {
      copyied(assetPath, outputPath);
    } else {
      node.properties.src = path.relative(config.data.dir, assetPath).split(path.sep).join('/');
    }
  }

  if (!outReadme) {
    const assetPath = path.resolve(path.dirname(mdpath), href);
    if (!fs.existsSync(assetPath)) {
      return;
    }
    const isIncludesDocs = assetPath.startsWith(config.data.dir);
    const output = isIncludesDocs ? getOutputPath(assetPath) : getOutputCurrentPath(assetPath);
    if (!output.startsWith(config.data.root)) {
      log.output('\x1b[35;1mcopy\x1b[0m')(decodeURIComponent(assetPath), decodeURIComponent(output));
      console.log(
        `    ╰┈\x1b[33;1mwarning\x1b[0m ->`,
        `In "\x1b[33;1m${path.relative(config.data.root, decodeURIComponent(mdpath))}\x1b[0m"`,
      );
      return;
    }
    if (!isIncludesDocs) {
      node.properties.src = path.relative(config.data.dir, assetPath).split(path.sep).join('/');
    }
    copyied(assetPath, output);
  }
}

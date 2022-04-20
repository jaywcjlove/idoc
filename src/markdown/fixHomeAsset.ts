import fs from 'fs-extra';
import path from 'path';
import { Root, RootContent } from 'hast';
import { config, getOutputCurrentPath } from '../utils/conf.js';
import { isAbsoluteURL } from './utils.js';
import { getOutputPath } from '../scripts/build.js';
import * as log from '../utils/log.js';

export function copyied(fromPath: string, toPath: string) {
  fs.ensureDir(path.dirname(toPath), (err) => {
    if (err) {
      console.log(` \x1b[31midoc:copy:\x1b[0m`, err);
      return;
    }
    fs.copyFile(fromPath, toPath)
      .then((result) => {
        log.output('\x1b[35;1mcopy\x1b[0m')(fromPath, toPath);
      })
      .catch((err) => {
        console.log(` \x1b[31midoc:copy:\x1b[0m`, err);
      });
  });
}

export function fixHomeAsset(node: Root | RootContent, mdpath: string) {
  const isOutReadme = path.relative(config.data.root, mdpath).toLocaleLowerCase() === 'readme.md';
  if (node.type !== 'element' || node.tagName !== 'img' || Array.isArray(node.properties.src)) return;
  if (typeof node.properties.src === 'boolean') return;
  if (typeof node.properties.src === 'number') return;
  if (!isAbsoluteURL(node.properties.src) && isOutReadme && mdpath.toLocaleLowerCase().endsWith('readme.md')) {
    const assetPath = path.resolve(config.data.root, node.properties.src);
    if (!fs.existsSync(assetPath) || !assetPath.startsWith(config.data.root)) return;
    const isIncludesDocs = assetPath.startsWith(config.data.dir);
    const outputPath = path.resolve(config.data.output, node.properties.src);
    if (!isIncludesDocs) {
      copyied(assetPath, outputPath);
    } else {
      node.properties.src = path.relative(config.data.dir, assetPath).split(path.sep).join('/');
    }
  }
  if (!isAbsoluteURL(node.properties.src) && !isOutReadme) {
    const assetPath = path.resolve(path.dirname(mdpath), node.properties.src);
    const isIncludesDocs = assetPath.startsWith(config.data.dir);
    const output = isIncludesDocs ? getOutputPath(assetPath) : getOutputCurrentPath(assetPath);
    if (!output.startsWith(config.data.root)) {
      log.output('\x1b[35;1mcopy\x1b[0m')(assetPath, output);
      console.log(
        `    ╰┈\x1b[33;1mwarning\x1b[0m ->`,
        `In "\x1b[33;1m${path.relative(config.data.root, mdpath)}\x1b[0m"`,
      );
      return;
    }
    if (!isIncludesDocs) {
      node.properties.src = path.relative(config.data.dir, assetPath).split(path.sep).join('/');
    }
    copyied(assetPath, output);
  }
}

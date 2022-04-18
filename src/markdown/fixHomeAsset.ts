import fs from 'fs-extra';
import path from 'path';
import { Root, RootContent } from 'hast';
import { config } from '../utils/conf.js';
import { isAbsoluteURL } from './utils.js';
import * as log from '../utils/log.js';

/**
 * The HOME page README.md is not in the `docs` directory, causing the reference to static resources not to exist.
 */
export function fixHomeAsset(node: Root | RootContent, mdpath: string) {
  const isOutReadme = path.relative(config.data.root, mdpath).toLocaleLowerCase() === 'readme.md';
  if (node.type !== 'element' || node.tagName !== 'img' || !isOutReadme || Array.isArray(node.properties.src)) return;
  if (typeof node.properties.src === 'boolean') return;
  if (typeof node.properties.src === 'number') return;
  if (!isAbsoluteURL(node.properties.src) && mdpath.toLocaleLowerCase().endsWith('readme.md')) {
    const assetPath = path.resolve(config.data.root, node.properties.src);
    if (!fs.existsSync(assetPath)) return;
    const isIncludesDocs = assetPath.startsWith(config.data.dir);
    const outputPath = path.resolve(config.data.output, node.properties.src);
    if (!isIncludesDocs) {
      fs.copyFile(assetPath, outputPath)
        .then((result) => {
          log.output('\x1b[35;1mcopy\x1b[0m')(assetPath, outputPath);
        })
        .catch((err) => {
          console.log(` \x1b[31midoc:copy:\x1b[0m`, err);
        });
    } else {
      node.properties.src = path.relative(config.data.dir, assetPath).split(path.sep).join('/');
    }
  }
}

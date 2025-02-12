import fs from 'fs-extra';
import path from 'path';
import readdirFiles from 'recursive-readdir-files';
import { createHTML } from '../markdown/markdown.js';
import * as log from '../utils/log.js';
import { config, isIncludesDocs } from '../utils/conf.js';
import { cacheFile } from '../utils/cacheFileStat.js';
import { createSitemap } from '../utils/createSitemap.js';

export function getOutput(filepath: string = '') {
  filepath = /(README)\.?(\w+)?\.(md|markdown)$/i.test(path.basename(filepath).toLocaleLowerCase())
    ? path.resolve(filepath).replace(/(README)\.?(\w+)?\.(md|markdown)$/i, (match, p1, p2) => {
        return `index${p2 ? '.' + p2 : ''}.html`;
      })
    : filepath;
  filepath = filepath.replace(/\.(md|markdown)$/, '.html');
  let relativePath = '';
  if (isIncludesDocs(filepath)) {
    relativePath = path.relative(config.data.dir, filepath);
  } else {
    relativePath = path.relative(config.data.root, filepath);
  }
  return path.resolve(config.data.output, relativePath);
}

export async function compilation(filepath: string) {
  const mdStr = await fs.readFile(filepath);
  const htmlPath = getOutput(filepath);
  const htmlStr = await createHTML(mdStr.toString(), filepath, htmlPath);
  await fs.ensureDir(path.dirname(htmlPath));
  if (/\.(md|markdown)$/.test(filepath.toLocaleLowerCase())) {
    await fs.writeFile(htmlPath, htmlStr);
    log.output()(filepath, htmlPath);
  } else {
    await fs.copyFile(filepath, htmlPath);
    log.output('\x1b[35;1mcopy\x1b[0m')(filepath, htmlPath);
  }
}

export async function copyThemeAsset() {
  const assetTemp = await readdirFiles(config.data.theme, {
    ignored: /\/(\.git)/,
    exclude: /(\.ejs|\.DS_Store)$/,
  });

  return new Promise<void>(async (resolve) => {
    for (let i = 0; i < assetTemp.length; i++) {
      await copyThemeFileAsset(assetTemp[i].path);
    }
    resolve();
  });
}

export async function copyThemeFileAsset(file: string) {
  const outPath = path.join(config.data.output, path.relative(config.data.theme, file));
  await fs.copy(file, outPath);
  log.output('\x1b[35;1mcopy\x1b[0m')(file, outPath);
}

export function compilationAll() {
  const { asset = [] } = config.data || {};
  return new Promise<void>(async (resolve) => {
    for (let i = 0; i < asset.length; i++) {
      await compilation(asset[i].path);
    }
    resolve();
  });
}

export async function build() {
  try {
    await config.getChaptersConf();
    await config.getFiles();
    await config.getReadme();
    await compilationAll();
    await copyThemeAsset();
    await cacheFile.save();
    await createSitemap();
    console.log(`\n \x1b[34;1m 🎉 Compliled successfully!\x1b[0m\n`);
  } catch (error) {
    console.log(` \x1b[31midoc:\x1b[0m`, error);
  }
}

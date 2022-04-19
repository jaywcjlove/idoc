import fs from 'fs-extra';
import path from 'path';
import readdirFiles from 'recursive-readdir-files';
import { createHTML } from '../markdown/markdown.js';
import * as log from '../utils/log.js';
import { config } from '../utils/conf.js';

export function getOutputPath(filepath: string) {
  const relativePath = path.relative(config.data.dir, filepath);
  let htmlPath = path.resolve(config.data.output, relativePath).replace(/\.(md|markdown)$/, '.html');
  if (/\/readme\.(md|markdown)$/i.test(filepath.toLocaleLowerCase())) {
    if (filepath === config.data.readme) {
      htmlPath = path.resolve(config.data.output, 'index.html');
    }
    htmlPath = htmlPath.replace(/\/readme\.(html)$/i, '/index.html');
  }
  return path.resolve(htmlPath);
}

export async function compilation(filepath: string) {
  const mdStr = await fs.readFile(filepath);
  const htmlPath = getOutputPath(filepath);
  const htmlStr = await createHTML(mdStr.toString(), filepath, htmlPath);
  await fs.ensureDir(path.dirname(htmlPath));
  if (/\.(md|markdown)$/.test(filepath.toLocaleLowerCase())) {
    await fs.writeFile(htmlPath, htmlStr);
    log.output()(filepath, htmlPath);
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
    console.log(`\n \x1b[34;1m 🎉 Compliled successfully!\x1b[0m\n`);
  } catch (error) {
    console.log(` \x1b[31midoc:\x1b[0m`, error);
  }
}

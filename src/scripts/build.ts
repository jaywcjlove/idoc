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
  readdirFiles(
    config.data.theme,
    {
      ignored: /\/(\.git)/,
      exclude: /(\.ejs|\.DS_Store)$/,
    },
    (_, stat) => {
      if (stat.isFile()) {
        copyThemeFileAsset(stat.path);
      }
    },
  );
}

export async function copyThemeFileAsset(file: string) {
  const outPath = path.join(config.data.output, path.relative(config.data.theme, file));
  fs.copy(file, outPath, (err) => {
    if (err) {
      console.log(` \x1b[31midoc:copy:theme:asset:\x1b[0m`, err);
      return;
    }
    log.output('\x1b[35;1mcopy\x1b[0m')(file, outPath);
  });
}

export async function compilationAll() {
  const { asset = [] } = config.data || {};
  asset.map(async (item) => compilation(item.path));
}

export async function build() {
  try {
    await config.getChaptersConf();
    await config.getFiles();
    await config.getReadme();
    compilationAll();
    copyThemeAsset();
    console.log(`\n \x1b[34;1m 🎉 Compliled successfully!\x1b[0m\n`);
  } catch (error) {
    console.log(` \x1b[31midoc:\x1b[0m`, error);
  }
}

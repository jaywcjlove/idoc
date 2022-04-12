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
  const { dir, output } = config.data || {};
  const mdStr = await fs.readFile(filepath);
  const htmlPath = getOutputPath(filepath);
  const htmlStr = await createHTML(mdStr.toString(), filepath, htmlPath);
  await fs.ensureDir(path.dirname(htmlPath));
  if (/\.(md|markdown)$/.test(filepath.toLocaleLowerCase())) {
    await fs.writeFile(htmlPath, htmlStr);
    log.output()(path.relative(dir, filepath), path.relative(output, htmlPath));
  }
}

export async function copyThemeAsset() {
  const assetTemp = await readdirFiles(config.data.theme, {
    ignored: /\/(node_modules|\.git)/,
    exclude: /(\.ejs)$/,
  });

  await Promise.all(
    assetTemp.map(async (item) => {
      await copyThemeFileAsset(item.path);
    }),
  );
}

export async function copyThemeFileAsset(file: string) {
  const outPath = path.join(config.data.output, path.relative(config.data.theme, file));
  await fs.copy(file, outPath);
  log.output('\x1b[35;1mcopy\x1b[0m')(
    path.relative(config.data.root, file),
    path.relative(config.data.output, outPath),
  );
}

export async function build() {
  const { asset = [] } = config.data || {};
  try {
    await Promise.all(
      asset.map(async (item) => {
        await compilation(item.path);
      }),
    );
    await copyThemeAsset();
    console.log(`\n \x1b[34;1m Compliled successfully!\x1b[0m\n`);
  } catch (error) {
    console.log(` \x1b[31midoc:\x1b[0m`, error);
  }
}

import path from 'path';
import chokidar from 'chokidar';
import fs from 'fs-extra';
import { compilation, compilationAll, copyThemeAsset, getOutputPath, copyThemeFileAsset } from './build.js';
import * as log from '../utils/log.js';
import { config } from '../utils/conf.js';

export function watch() {
  const watchPaths = [
    config.data.dir,
    config.data.theme,
    config.data.config.conf,
    config.data.config.chapters,
    config.data.readme,
  ].filter(Boolean);

  const watcher = chokidar.watch(watchPaths, {
    ignored: /(\.DS_Store)/,
  });

  watcher.on('change', async (filepath, stats) => {
    const isTheme = new RegExp(`^${config.data.theme}`).test(filepath);
    // Modify Theme files
    if (config.data.config.conf === filepath) {
      log.log('\x1b[33;1mupdate\x1b[0m')(filepath);
      await config.initConf();
      await config.getChaptersConf();
      await config.getFiles();
      await config.getReadme();
      compilationAll();
      copyThemeAsset();
    } else if (config.data.config.chapters === filepath) {
      log.log('\x1b[33;1mupdate\x1b[0m')(filepath);
      await config.initConf();
      await config.getChaptersConf();
      await config.getFiles();
      await config.getReadme();
      compilationAll();
      copyThemeAsset();
    } else if (isTheme && /\.ejs/i.test(filepath)) {
      compilationAll();
    } else if (isTheme) {
      copyThemeFileAsset(filepath);
    } else if (/\.(md|markdown)/i.test(filepath)) {
      compilation(filepath);
    } else {
      const assetPath = getOutputPath(filepath);
      await fs.ensureDir(path.dirname(assetPath));
      await fs.copyFile(filepath, assetPath);
      log.output('\x1b[35;1mcopy\x1b[0m')(filepath, assetPath);
    }
  });

  watcher.on('add', async (filepath) => {
    if (/\.(md|markdown)/i.test(filepath)) {
      await compilation(filepath);
    }
  });
  watcher.on('unlink', async (filepath) => {
    watcher.unwatch(filepath);
    const isTheme = new RegExp(`^${config.data.theme}`).test(filepath);
    if (/\.(md|markdown)$/i.test(filepath)) {
      let assetPath = getOutputPath(filepath);
      await fs.remove(assetPath);
      log.output('\x1b[35;1mremove\x1b[0m')(filepath, assetPath);
    } else if (isTheme) {
      // Theme
      let assetPath = path.join(config.data.output, path.relative(config.data.theme, filepath));
      await fs.remove(assetPath);
      log.output('\x1b[35;1mremove\x1b[0m')(filepath, assetPath);
    } else {
      let assetPath = getOutputPath(filepath);
      await fs.remove(assetPath);
      log.output('\x1b[35;1mremove\x1b[0m')(filepath, assetPath);
    }
  });

  watcher.on('error', (err) => {
    console.log(` \x1b[31midoc:watch:\x1b[0m`, err);
  });

  watcher.on('ready', () => {
    copyThemeAsset();
  });
}

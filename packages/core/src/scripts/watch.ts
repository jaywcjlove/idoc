import path from 'path';
import chokidar from 'chokidar';
import fs from 'fs-extra';
import { compilation, compilationAll, copyThemeAsset, getOutput, copyThemeFileAsset } from './build.js';
import * as log from '../utils/log.js';
import { config, cacheCopyiedFiles } from '../utils/conf.js';
import { cacheFile } from '../utils/cacheFileStat.js';

export function watch() {
  const watchPaths = [
    config.data.dir,
    config.data.theme,
    config.data.config.conf,
    config.data.config.chapters,
    config.data.readme,
    ...(config.data.sideEffectFiles || []),
  ].filter(Boolean);

  const watcher = chokidar.watch(watchPaths, {
    ignored: /(\.DS_Store|node_modules)/,
    ignoreInitial: true,
  });

  watcher.on('change', async (filepath, stats) => {
    if (filepath instanceof Error) {
      log.log('\x1b[31midoc:watch:\x1b[0m')(filepath.message);
      return;
    }
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
      await cacheFile.update(filepath);
      await cacheFile.save();
      compilation(filepath);
    } else {
      const assetPath = getOutput(filepath);
      await fs.ensureDir(path.dirname(assetPath));
      await fs.copyFile(filepath, assetPath);
      log.output('\x1b[35;1mcopy\x1b[0m')(filepath, assetPath);
    }
  });

  watcher.on('add', async (filepath) => {
    if (filepath instanceof Error) {
      log.log('\x1b[31midoc:watch:\x1b[0m')(filepath.message);
      return;
    }
    watcher.add(filepath);
    if (/\.(md|markdown)/i.test(filepath)) {
      await compilation(filepath);
    }
  });
  watcher.on('unlink', async (filepath) => {
    if (filepath instanceof Error) {
      log.log('\x1b[31midoc:watch:\x1b[0m')(filepath.message);
      return;
    }
    watcher.unwatch(filepath);
    const isTheme = new RegExp(`^${config.data.theme}`).test(filepath);
    if (/\.(md|markdown)$/i.test(filepath)) {
      let assetPath = getOutput(filepath);
      await fs.remove(assetPath);
      log.output('\x1b[35;1mremove\x1b[0m')(filepath, assetPath);
    } else if (isTheme) {
      // Theme
      let assetPath = path.join(config.data.output, path.relative(config.data.theme, filepath));
      await fs.remove(assetPath);
      log.output('\x1b[35;1mremove\x1b[0m')(filepath, assetPath);
    } else {
      let assetPath = getOutput(filepath);
      await fs.remove(assetPath);
      cacheCopyiedFiles.splice(cacheCopyiedFiles.indexOf(filepath), 1);
      log.output('\x1b[35;1mremove\x1b[0m')(filepath, assetPath);
    }
  });

  watcher.on('error', (err) => {
    console.log(` \x1b[31midoc:watch:\x1b[0m`, err);
  });

  watcher.on('ready', () => {
    copyThemeAsset();
    compilationAll();
  });
}

import path from 'path';
import chokidar from 'chokidar';
import fs from 'fs-extra';
import { build, compilation, copyThemeAsset, getOutputPath, copyThemeFileAsset } from './build.js';
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
  const watcher = chokidar.watch(watchPaths);
  watcher.on('change', async (filepath, stats) => {
    const isTheme = new RegExp(`^${config.data.theme}`).test(filepath);
    // Modify Theme files
    if (config.data.config.conf === filepath) {
      await config.initConf();
      await build();
    } else if (config.data.config.chapters === filepath) {
      await config.getChaptersConf();
      await build();
    } else if (isTheme && /\.ejs/i.test(filepath)) {
      await build();
    } else if (isTheme) {
      await copyThemeFileAsset(filepath);
    } else if (/\.(md|markdown)/i.test(filepath)) {
      await compilation(filepath);
    } else {
      const assetPath = getOutputPath(filepath);
      await fs.copyFile(filepath, assetPath);
    }
  });

  watcher.on('add', async (filepath) => {
    if (/\.(md|markdown)/i.test(filepath)) {
      await compilation(filepath);
    }
  });
  watcher.on('unlink', async (filepath) => {
    const isTheme = new RegExp(`^${config.data.theme}`).test(filepath);
    if (/\.(md|markdown)$/i.test(filepath)) {
      let assetPath = getOutputPath(filepath);
      await fs.remove(assetPath);
      log.output('\x1b[35;1mremove\x1b[0m')(
        path.relative(config.data.dir, filepath),
        path.relative(config.data.output, assetPath),
      );
    } else if (isTheme) {
      // Theme
      let assetPath = path.join(config.data.output, path.relative(config.data.theme, filepath));
      await fs.remove(assetPath);
      log.output('\x1b[35;1mremove\x1b[0m')(
        path.relative(config.data.theme, filepath),
        path.relative(config.data.output, assetPath),
      );
    } else {
      let assetPath = getOutputPath(filepath);
      await fs.remove(assetPath);
      log.output('\x1b[35;1mremove\x1b[0m')(
        path.relative(config.data.dir, filepath),
        path.relative(config.data.output, assetPath),
      );
    }
  });

  watcher.on('error', (err) => {
    console.log(` \x1b[31midoc:watch:\x1b[0m`, err);
  });

  watcher.on('ready', async () => {
    await copyThemeAsset();
  });
}

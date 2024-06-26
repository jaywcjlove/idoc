import fs from 'fs-extra';
import path from 'path';
import type { ParsedArgs } from 'minimist';
import { config } from '../utils/conf.js';

interface Options extends Partial<ParsedArgs> {
  force?: boolean;
}

export async function newDoc(filename: string, title: string, options: Options = {}) {
  const filepath = path.resolve(config.data.dir, filename);
  if (!fs.existsSync(filepath)) {
    await fs.ensureDir(path.dirname(filepath));
  } else if (options.force) {
    await fs.remove(filepath);
  } else {
    console.log(`\n  \x1b[31;1mError:\x1b[0m File already exists!`);
    console.log(`   ╰┈\x1b[31;1m✗\x1b[0m File: \x1b[33;1m${filepath}\x1b[0m`);
    console.log();
    return;
  }
  const name = path.basename(filepath).replace(/.(md|markdown)$/i, '');
  await fs.writeFile(filepath, `${title || name}\n===`);
  console.log();
  console.log(
    ` 🎉  \x1b[32;1m✔\x1b[0m The \x1b[35;1m${path.basename(filepath)}\x1b[0m document was successfully created!`,
  );
  console.log();
}

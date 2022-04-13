import path from 'path';
import { config } from './conf.js';

export const output =
  (mark: string = 'idoc') =>
  (form: string, to: string) => {
    console.log(
      `  \x1b[32;1m✔\x1b[0m ${mark}: \x1b[37;1m${path.relative(
        config.data.root,
        form,
      )}\x1b[0m -> \x1b[32;1m${path.relative(config.data.root, to)}\x1b[0m`,
    );
  };

import { parse } from 'yaml';
import fs from 'fs-extra';
import path from 'path';
import image2uri from 'image2uri';
import readdirFiles, { getExt, IFileDirStat } from 'recursive-readdir-files';
import { logo } from './logo.js';

export interface Config {
  root: string;
  dir: string;
  output: string;
  chapters: Array<Record<string, string>>;
  asset: IFileDirStat[];
  config?: Partial<Record<'conf' | 'chapters', string>>;
  theme?: string;
  /** `<process.cwd()>/README.md` */
  readme?: string;
  /** site name */
  site?: string;
  keywords?: string;
  footer?: string;
  /** website logo icon */
  logo?: string;
  /** website favicon icon */
  favicon?: string;
  /** Template Data */
  data?: Record<string, any>;
  /** project version */
  version?: string;
  /** idoc version */
  idocVersion?: string;
  scope?: string[];
}

export type MenuData = {
  name: string;
  url?: string;
  active?: boolean;
};

export class Conf {
  constructor() {
    this.initConf();
  }
  data: Config = {
    root: process.cwd(),
    dir: path.resolve(process.cwd(), 'docs'),
    output: path.resolve(process.cwd(), 'dist'),
    chapters: [],
    config: {},
    asset: [],
    scope: [],
    data: {},
    site: 'idoc',
    logo: logo,
    keywords: '',
    footer: '',
  };
  get all() {
    return this.data;
  }
  async initConf() {
    const pkgpath = path.resolve(this.data.root, 'package.json');
    if (fs.existsSync(pkgpath)) {
      const pkg = await fs.readJSON(pkgpath);
      this.data.version = pkg.version;
      this.data.site = pkg.name || '';
      this.data.data.openSource = pkg.repository ? pkg.repository || pkg.repository.url || '' : '';
    }
    const confPath = path.resolve(this.data.root, 'idoc.yml');
    if (fs.existsSync(confPath)) {
      this.data.config.conf = confPath;
      const conf = await fs.readFile(confPath, 'utf8');
      const data: Config = parse(conf);
      if (data.dir) {
        data.dir = path.resolve(process.cwd(), data.dir);
      }
      if (data.output) {
        data.output = path.resolve(process.cwd(), data.output);
      }
      if (data.logo) {
        data.logo = await image2uri(data.logo);
      }
      if (data.favicon) {
        data.favicon = await image2uri(data.favicon);
      }
      if (!data.logo) data.logo = logo;
      if (!data.favicon) data.favicon = logo;
      this.data = Object.assign(this.data, data);
    }

    if (this.data.theme === 'default' || !this.data.theme) {
      this.data.theme = path.resolve(new URL('../../themes/default', import.meta.url).pathname);
    }

    const pkgIdoc = await fs.readJSON(new URL('../../package.json', import.meta.url).pathname);
    this.data.idocVersion = pkgIdoc.version;
    return this.data;
  }
  async getChaptersConf() {
    const chaptersPath = path.resolve(this.data.root, 'idoc.chapters.yml');
    if (fs.existsSync(chaptersPath)) {
      const chapters = await fs.promises.readFile(chaptersPath, 'utf8');
      this.data.config.chapters = chaptersPath;
      this.data.chapters = parse(chapters) || [];
    }
  }
  async getFiles() {
    const files = await readdirFiles(this.data.dir, {
      ignored: /\/(node_modules|\.git)/,
    });
    this.data.asset = files;
    await this.getReadme();
  }
  async getReadme() {
    const readmePath = path.resolve(this.data.root, 'README.md');
    const existsReadme = this.data.asset.find((item) => /\/(readme.md)/.test(item.path.toString()));
    if (existsReadme) {
      this.data.readme = existsReadme.path;
    } else if (fs.existsSync(readmePath) && !existsReadme) {
      this.data.readme = readmePath;
      const stat = (await fs.promises.stat(readmePath)) as IFileDirStat;
      stat.path = path.resolve(this.data.root, 'README.md');
      stat.ext = await getExt(stat.path);
      stat.name = path.basename(stat.path);
      this.data.asset.push(stat);
    }
  }
  getRelativePath(toPath: string) {
    const rel = path.relative(path.dirname(toPath), config.data.output).split(path.sep).join('/');
    return rel ? rel + '/' : '';
  }
  getMenuData(toPath: string) {
    const data: MenuData[] = [];
    if (this.data.data.menus) {
      Object.keys(this.data.data.menus).forEach((key) => {
        const [value, scope] = this.data.data.menus[key].split(' ').map((val: string) => (val || '').trim());
        const menu: MenuData = { name: key };
        const current = path.join(this.data.output, value);
        const active = isActive(current, toPath, scope);
        if (scope) this.data.scope.push(scope.trim());
        menu.active = active;
        if (toPath === current) {
          menu.url = path.basename(current);
        } else {
          const rel = path.relative(path.dirname(toPath), path.dirname(path.join(this.data.output, value)));
          if (!rel) {
            menu.url = path.basename(value);
          } else if (rel.startsWith('..')) {
            menu.url = path.join(rel, path.basename(value)).split(path.sep).join('/');
          } else {
            menu.url = value;
          }
        }
        data.push(menu);
      });
    }
    return data;
  }
}

export function isScope(toPath: string, scope?: string) {
  if (scope) {
    scope = scope.split(path.sep).join(path.sep);
    let relative = path.relative(config.data.output, toPath).split(path.sep).join(path.sep);
    if (new RegExp(`^${scope.split(path.sep).join(path.sep)}`, 'i').test(relative)) {
      return true;
    }
  }
  return false;
}

export function isActive(from: string, toPath: string, scope?: string) {
  from = from.split(path.sep).join(path.sep);
  toPath = toPath.split(path.sep).join(path.sep);

  if (scope) {
    return isScope(toPath, scope);
  }

  if (from === toPath) {
    return true;
  }
  const formatFrom = path.dirname(from).replace(config.data.output, '');
  const formatToPath = toPath.replace(config.data.output, '');
  if (formatFrom && formatToPath.includes(formatFrom)) {
    return true;
  }
  return false;
}

export const config = new Conf();

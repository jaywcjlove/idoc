import { parse } from 'yaml';
import fs from 'fs-extra';
import path from 'path';
import image2uri from 'image2uri';
import readdirFiles, { getExt, IFileDirStat } from 'recursive-readdir-files';
import { logo } from './logo.js';
import { PageConfig } from '../markdown/markdown.js';
import { isAbsoluteURL } from '../markdown/utils.js';

export interface SiteGlobalConfig {
  /** site name */
  site?: string;
  title?: string;
  keywords?: string;
  description?: string;
  /** website logo icon */
  logo?: string;
  /** website favicon icon */
  favicon?: string;
  editButton?: {
    label?: string;
    url?: string;
  };
  openSource?:
    | string
    | {
        type: string;
        url: string;
      };
  footer?: string;
  menus?: Record<
    string,
    | string
    | {
        url: string;
        active: boolean;
        target: string;
      }
  >;
}

export interface Config extends SiteGlobalConfig {
  root: string;
  dir: string;
  output: string;
  chapters: Array<Record<string, string>>;
  asset: IFileDirStat[];
  config?: Partial<Record<'conf' | 'chapters', string>>;
  theme?: string;
  /** `<process.cwd()>/README.md` */
  readme?: string;
  /** Template Data */
  data?: Record<string, any>;
  /** project version */
  version?: string;
  /** idoc version */
  idocVersion?: string;
  scope?: string[];
  global?: Config;
  page?: PageConfig;
}

export type MenuData = {
  name: string;
  url?: string;
  raw?: string;
  active?: boolean;
  target?: string;
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
    global: {} as Config,
    page: {},
  };
  get all() {
    return this.data;
  }
  set all(data: Config) {
    Object.keys(data).forEach((key: keyof Config) => {
      if ((key === 'favicon' || key === 'logo') && data[key] && !/^data:image\//.test(data[key])) {
        const filePath = path.resolve(this.data.root, data[key]);
        if (fs.existsSync(filePath)) {
          this.data[key] = image2uri(filePath) as string;
        }
      } else {
        this.data[key] = data[key] as never;
      }
    });
  }
  async initConf() {
    const pkgpath = path.resolve(this.data.root, 'package.json');
    if (fs.existsSync(pkgpath)) {
      const pkg = await fs.readJSON(pkgpath);
      this.data.version = pkg.version;
      this.data.site = pkg.name || '';
      this.data.openSource = pkg.repository || '';
    }
    const confPath = path.resolve(this.data.root, 'idoc.yml');
    if (fs.existsSync(confPath)) {
      this.data.config.conf = confPath;
      const conf = await fs.readFile(confPath, 'utf8');
      const data: Config = parse(conf);
      config.data.global = { ...data };

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
      config.data.global.chapters = [...this.data.chapters];
    }
  }
  async getFiles() {
    if (!fs.existsSync(this.data.dir)) {
      return;
    }
    const files = await readdirFiles(this.data.dir, {
      ignored: /\/(node_modules|\.git)/,
    });
    this.data.asset = files;
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
      config.data.global.asset = [...this.data.asset];
    }
  }
  getRelativePath(toPath: string) {
    const rel = path.relative(path.dirname(toPath), config.data.output).split(path.sep).join('/');
    return rel ? rel + '/' : '';
  }
  getMenuData(toPath: string) {
    const data: MenuData[] = [];
    if (this.data.menus) {
      Object.keys(this.data.menus).forEach((key) => {
        const url = this.data.menus[key];
        const urlhref = typeof url === 'object' ? url.url : url;
        const [value, scope] = urlhref.split(' ').map((val: string) => (val || '').trim());
        const menu: MenuData = { name: key, raw: value, target: '' };
        if (typeof url === 'object' && url.target) {
          menu.target = url.target;
        }
        const current = path.join(this.data.output, value);
        const active = isActive(current, toPath, scope);
        if (scope && !this.data.scope.includes(scope)) this.data.scope.push(scope.trim());
        menu.active = active;
        if (isAbsoluteURL(value)) {
          menu.url = value;
        } else if (toPath === current) {
          menu.url = path.basename(current);
        } else {
          const rel = path.relative(path.dirname(toPath), path.dirname(path.join(this.data.output, value)));
          if (!rel) {
            menu.url = path.basename(value);
          } else if (rel.startsWith('..')) {
            menu.url = path.join(rel, path.basename(value)).split(path.sep).join('/');
          } else if (rel) {
            menu.url = path.relative(path.dirname(toPath), current).split(path.sep).join('/');
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

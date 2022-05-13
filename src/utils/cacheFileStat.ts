import path from 'path';
import fs from 'fs-extra';
import { IFileDirStat, getStat } from 'recursive-readdir-files';

export type CacheFileOptions = {
  folder?: string;
  isSave?: boolean;
};

export class CacheFile {
  data: Record<string, Partial<IFileDirStat>> = {};
  path: string;
  filename = '.filesStat.json';
  folder: string = '';
  isSave: boolean = false;
  constructor(folder = '.idoc') {
    this.folder = path.resolve(process.cwd(), folder);
    this.path = path.resolve(this.folder, this.filename);
  }
  async init(isSave: boolean = false) {
    if (isSave) {
      this.isSave = isSave;
      await fs.ensureDir(this.folder);
    }
    return this;
  }
  async load() {
    if (this.isSave && fs.existsSync(this.path)) {
      this.data = await fs.readJSON(this.path);
    }
  }
  async save() {
    if (this.isSave) {
      await fs.writeFile(this.path, JSON.stringify(this.data, null, 2));
    }
  }
  getPath(rawPath: string) {
    return path.relative(process.cwd(), rawPath);
  }
  get(rawPath: string) {
    const mdPath = this.getPath(rawPath);
    return this.data[mdPath] ? this.data[mdPath] : {};
  }
  add(stat: IFileDirStat, update?: boolean) {
    const { atime, mtime, ctime, birthtime, path: mdRawPath } = stat || {};
    const mdPath = this.getPath(mdRawPath);
    if (update || !this.data[mdPath]) {
      this.data[mdPath] = { atime, mtime, ctime, birthtime };
    }
    return this;
  }
  async update(filepath: string) {
    const stat = await getStat(filepath);
    return this.add(stat, true);
  }
  remove(rawPath: string) {
    const mdPath = this.getPath(rawPath);
    if (this.data[mdPath]) {
      delete this.data[mdPath];
    }
  }
}

export const cacheFile = new CacheFile();

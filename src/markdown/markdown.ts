import path from 'path';
import fs from 'fs-extra';
import { render, Data } from 'ejs';
import { Options } from '@wcj/markdown-to-html';
import formatter from '@uiw/formatter';
import { rehypeAutolinkHeadings, rehypeSlug, rehypeIgnore, markdownToHTML } from './plugins';
import { IFileDirStat } from 'recursive-readdir-files';
import { config, MenuData } from '../utils/conf';

export type TemplateData = {
  RELATIVE_PATH?: string;
  version?: string;
  idocVersion?: string;
  markdown?: string;
  openSource?: string;
  editButton?: {
    label: string;
    url: string;
  };
  edit?: string;
  title?: string;
  site?: string;
  menus?: MenuData[];
  fileStat: Partial<IFileDirStat> & {
    atimeStr?: string,
    mtimeStr?: string,
    ctimeStr?: string,
  };
}

export async function createHTML(str: string = '', from: string, to: string) {
  const mdOptions: Options = {};
  const autolinkHeadings = await rehypeAutolinkHeadings();
  const slug = await rehypeSlug();
  const ignore = await rehypeIgnore();
  mdOptions.rehypePlugins = [[ignore, {
    openDelimiter: 'idoc:ignore:start',
    closeDelimiter: 'idoc:ignore:end',
  }], [slug], [autolinkHeadings]];

  mdOptions.rewrite = (node, index, parent) => {
    if (node.type == 'element' && /h(1|2|3|4|5|6)/.test(node.tagName) && node.children && Array.isArray(node.children) && node.children.length > 0) {
      node.children = node.children.map(item => {
        if (item.type === 'element' && item.tagName === 'a') {
          item.properties.class = 'anchor'
        }
        return item
      });
    }
  }
  const mdHtml = await markdownToHTML(str, mdOptions) as string;
  const tempPath = path.resolve(config.data.theme, 'markdown.ejs')
  const tmpStr = await fs.readFile(tempPath);
  const data: Data & TemplateData = { fileStat: {} }
  data.markdown = mdHtml;
  data.site = config.data.site || 'idoc';
  data.title = config.data.site;
  data.version = config.data.version;
  data.idocVersion = config.data.idocVersion;
  data.RELATIVE_PATH = config.getRelativePath(to);

  if (config.data.data) {
    data.openSource = config.data.data.openSource || '';
    data.editButton = { ...config.data.data.editButton };
    if (data.editButton.url) {
      data.editButton.url = `${data.editButton.url.replace(/\/$/, '')}/${path.relative(config.data.root, from)}`
    }
    if (config.data.data.menus) {
      data.menus = config.getMenuData(to);
    }
  }

  // File Stat
  data.fileStat = config.data.asset.find(item => item.path === from) || {};
  const getKeys = <T>(obj: T) => Object.keys(obj) as Array<keyof T>;
  for (const key of getKeys(data.fileStat)) {
    if((key === 'atime' || key === 'ctime' || key === 'mtime') && data.fileStat[key]) {
      data.fileStat = { ...data.fileStat, ...{ [`${key}Str`]: formatter('YYYY/MM/DD', data.fileStat[key]) as any } }
    }
  }
  return render(tmpStr.toString(), { ...config.data.data, ...data }, {
    filename: tempPath
  });
}
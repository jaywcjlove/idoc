import path from 'path';
import fs from 'fs-extra';
import { render, Data } from 'ejs';
import { parse } from 'yaml';
import { Options } from '@wcj/markdown-to-html';
import formatter from '@uiw/formatter';
import { IFileDirStat } from 'recursive-readdir-files';
import autolinkHeadings from 'rehype-autolink-headings';
import markdownToHTML from '@wcj/markdown-to-html';
import ignore from 'rehype-ignore';
import { getCodeString } from 'rehype-rewrite';
import slug from 'rehype-slug';
import { config, MenuData, Config, SiteGlobalConfig } from '../utils/conf.js';
import rehypeUrls from './rehype-urls.js';
import { formatChapters, Chapters } from '../utils/chapters.js';

export interface TemplateData extends Omit<SiteGlobalConfig, 'menus'> {
  RELATIVE_PATH?: string;
  version?: string;
  idocVersion?: string;
  markdown?: string;
  menus?: MenuData[];
  tocs?: Toc[];
  fileStat: Partial<IFileDirStat> & {
    atimeStr?: string;
    mtimeStr?: string;
    ctimeStr?: string;
  };
  chapters?: Array<Chapters>;
}

type Toc = {
  number?: number;
  label?: string;
  href?: string;
  class?: string;
};

interface ConfigData extends TemplateData {}

export async function createHTML(str: string = '', from: string, toPath: string) {
  const mdOptions: Options = {};
  mdOptions.rehypePlugins = [
    [
      ignore,
      {
        openDelimiter: 'idoc:ignore:start',
        closeDelimiter: 'idoc:ignore:end',
      },
    ],
    [slug],
    [autolinkHeadings],
  ];

  const tocs: Toc[] = [];
  let tocsStart: number = 6;
  let configMarkdownStr = '';
  let pagetitle = '';
  let description = '';
  mdOptions.rewrite = (node, index, parent) => {
    rehypeUrls(node);
    if (node.type === 'root') {
      // get title
      const h1Elm = node.children.find((item) => item.type === 'element' && item.tagName === 'h1');
      if (h1Elm && h1Elm.type === 'element') {
        pagetitle = getCodeString(h1Elm.children);
      }
      // get description
      const desElm = node.children.find((item) => {
        if (item.type === 'element' && item.tagName === 'p') {
          return !!item.children.find((item) => item.type === 'text' && item.value.trim().replace(/\n/g, ''));
        }
        return false;
      });
      if (desElm && desElm.type === 'element') {
        description = getCodeString(desElm.children) || pagetitle;
      }
    }
    if (
      node.type == 'element' &&
      /h(1|2|3|4|5|6)/.test(node.tagName) &&
      node.children &&
      Array.isArray(node.children) &&
      node.children.length > 0
    ) {
      const num = Number(node.tagName.replace('h', ''));
      const tocItem: Toc = { number: num };
      tocItem.href = node.properties.id as string;
      if (num < tocsStart) tocsStart = num;
      node.children = node.children.map((item) => {
        if (item.type === 'element' && item.tagName === 'a') {
          item.properties.class = 'anchor';
        }
        if (item.type === 'text') {
          tocItem.label = item.value;
        }
        return item;
      });
      tocs.push(tocItem);
    }
    if (node.type === 'comment' && /^idoc:config:/i.test(node.value.trimStart())) {
      configMarkdownStr = node.value.replace(/^idoc:config:/i, '');
    }
  };
  const mdHtml = (await markdownToHTML(str, mdOptions)) as string;
  const tempPath = path.resolve(config.data.theme, 'markdown.ejs');
  const tmpStr = await fs.readFile(tempPath);
  const tocsArr = tocs.map((item) => ({
    ...item,
    class: `toc${item.number - tocsStart + 1}`,
  }));

  const data: Data & TemplateData = { fileStat: {}, tocs: [...tocsArr], menus: [] };
  data.markdown = mdHtml;
  data.version = config.data.version;
  data.idocVersion = config.data.idocVersion;
  data.RELATIVE_PATH = config.getRelativePath(toPath);

  // Markdown comment config.
  const { fileStat, ...mdConf }: ConfigData = parse(configMarkdownStr) || {};
  if (typeof mdConf.tocs === 'boolean' && mdConf.tocs === false) {
    data.tocs = mdConf.tocs;
  }
  config.all = {
    site: mdConf.site || config.data.site,
    keywords: mdConf.keywords || config.data.keywords,
    favicon: mdConf.favicon || config.data.favicon,
    logo: mdConf.logo || config.data.logo,
    title: mdConf.title || pagetitle.replace(/\n/g, '').trim().slice(0, 120) || config.data.title,
    description: mdConf.description || description.replace(/\n/g, '').trim().slice(0, 120) || config.data.description,
    footer: mdConf.footer || config.data.footer || '',
    editButton: mdConf.editButton || config.data.editButton,
    openSource: mdConf.openSource || config.data.openSource,
  } as unknown as Config;

  if (config.data.editButton && config.data.editButton.url) {
    config.data.editButton.url = `${config.data.editButton.url.replace(/\/$/, '')}/${path.relative(
      config.data.root,
      from,
    )}`;
  }

  if (config.data.menus) {
    data.menus = config.getMenuData(toPath);
  }

  // File Stat
  data.fileStat = config.data.asset.find((item) => item.path === from) || {};
  data.fileStat = { ...data.fileStat, ...fileStat };
  const getKeys = <T>(obj: T) => Object.keys(obj) as Array<keyof T>;
  for (const key of getKeys(data.fileStat)) {
    if ((key === 'atime' || key === 'ctime' || key === 'mtime') && data.fileStat[key]) {
      data.fileStat = { ...data.fileStat, ...{ [`${key}Str`]: formatter('YYYY/MM/DD', data.fileStat[key]) as any } };
    }
  }
  const varData: ConfigData = { ...config.all, ...data, menus: data.menus };
  varData.chapters = formatChapters(config.data.chapters, toPath);
  return render(tmpStr.toString(), varData, {
    filename: tempPath,
  });
}

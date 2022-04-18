import path from 'path';
import fs from 'fs-extra';
import { render, Data } from 'ejs';
import { parse } from 'yaml';
import markdownToHTML, { Options } from '@wcj/markdown-to-html';
import formatter from '@uiw/formatter';
import { IFileDirStat } from 'recursive-readdir-files';
import autolinkHeadings from 'rehype-autolink-headings';
import ignore from 'rehype-ignore';
import { getCodeString } from 'rehype-rewrite';
import slug from 'rehype-slug';
import { config, MenuData, Config, SiteGlobalConfig } from '../utils/conf.js';
import rehypeUrls from './rehype-urls.js';
import { formatChapters, Chapter } from '../utils/chapters.js';
import { copyButton } from './copy-button.js';
import { getTitle, getDescription } from './utils.js';
import { fixHomeAsset } from './fixHomeAsset.js';
import { getPrevOrNextPage } from './utils.js';

export interface PageConfig extends Omit<SiteGlobalConfig, 'menus'> {
  tocs?: Toc[] | false;
  layout?: string;
  prevPage?: Chapter;
  nextPage?: Chapter;
  fileStat?: Partial<IFileDirStat> & {
    atimeStr?: string;
    mtimeStr?: string;
    ctimeStr?: string;
  };
}

export interface TemplateData extends Omit<Config, 'menus' | 'chapters'> {
  RELATIVE_PATH?: string;
  markdown?: string;
  html?: string;
  menus?: MenuData[];
  chapters?: Array<Chapter>;
}

export type Toc = {
  number?: number;
  label?: string;
  href?: string;
  class?: string;
};

interface ConfigData extends TemplateData, PageConfig {}

export async function createHTML(mdStr: string = '', fromPath: string, toPath: string) {
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
    fixHomeAsset(node, fromPath);
    if (node.type === 'root') {
      pagetitle = getTitle(node) || pagetitle;
      description = getDescription(node) || pagetitle;
    }
    if (node.type == 'element' && node.tagName === 'pre') {
      node.children.push(copyButton(getCodeString(node.children)));
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
  const mdHtml = (await markdownToHTML(mdStr, mdOptions)) as string;
  const tocsArr = tocs.map((item) => ({
    ...item,
    class: `toc${item.number - tocsStart + 1}`,
  }));

  const data = { fileStat: {}, tocs: [...tocsArr], menus: [], editButton: {} } as Data & ConfigData;
  data.version = config.data.version;
  data.idocVersion = config.data.idocVersion;
  data.RELATIVE_PATH = config.getRelativePath(toPath);
  const { global, ...other } = config.data;
  config.data.global = { ...other };
  data.chapters = formatChapters(config.data.chapters, toPath);

  // Markdown comment config.
  const page: PageConfig = parse(configMarkdownStr) || {};
  if (typeof page.tocs === 'boolean' && page.tocs === false) {
    data.tocs = page.tocs;
  }

  // Paging....
  page.prevPage = getPrevOrNextPage('prev', page.prevPage || {}, data.chapters, fromPath, toPath);
  page.nextPage = getPrevOrNextPage('next', page.nextPage || {}, data.chapters, fromPath, toPath);

  config.all = {
    site: page.site || config.data.site,
    keywords: page.keywords || config.data.keywords,
    favicon: page.favicon || config.data.favicon,
    logo: page.logo || config.data.logo,
    title: page.title || pagetitle.replace(/\n/g, '').trim().slice(0, 120) || config.data.title,
    description: page.description || description.replace(/\n/g, '').trim().slice(0, 120) || config.data.description,
    footer: page.footer || config.data.footer || '',
    editButton: page.editButton || config.data.editButton,
    openSource: page.openSource || config.data.openSource,
    page,
  } as unknown as Config;

  if (config.data.editButton && config.data.editButton.url) {
    data.editButton.label = config.data.editButton.label;
    data.editButton.url = `${config.data.editButton.url.replace(/\/$/, '')}/${path.relative(
      config.data.root,
      fromPath,
    )}`;
  }

  if (config.data.menus) {
    data.menus = config.getMenuData(toPath);
  }

  // File Stat
  data.fileStat = config.data.asset.find((item) => item.path === fromPath) || {};
  data.fileStat = { ...data.fileStat, ...page.fileStat };
  const getKeys = <T>(obj: T) => Object.keys(obj) as Array<keyof T>;
  for (const key of getKeys(data.fileStat)) {
    if ((key === 'atime' || key === 'ctime' || key === 'mtime') && data.fileStat[key]) {
      data.fileStat = { ...data.fileStat, ...{ [`${key}Str`]: formatter('YYYY/MM/DD', data.fileStat[key]) as any } };
    }
  }
  const varData: ConfigData = { ...config.all, ...data, menus: data.menus, page, markdown: mdStr, html: mdHtml };

  const tempPath = path.resolve(config.data.theme, page.layout || 'markdown.ejs');
  const tmpStr = await fs.readFile(tempPath);
  return render(tmpStr.toString(), varData, {
    filename: tempPath,
  });
}

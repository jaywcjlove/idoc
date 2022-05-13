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
import { addCopyButton } from './copyButton.js';
import { getTitle, getDescription } from './utils.js';
import { copyAsset } from './copyAsset.js';
import { codePreview, codePreviewWarpperStyle } from './codePreview.js';
import { getPrevOrNextPage } from './utils.js';
import * as log from '../utils/log.js';
import { getTocsTree } from './tocsTree.js';
import { cacheFile } from '../utils/cacheFileStat.js';

export interface PageConfig extends Omit<SiteGlobalConfig, 'menus'> {
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
  tocsTree?: Array<TocTree>;
}

export interface TocTree extends Toc {
  children?: Array<TocTree>;
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
  mdOptions.filterPlugins = (type, plugins) => {
    if (type === 'rehype') {
      plugins.unshift([codePreview, {}]);
    }
    return plugins;
  };
  mdOptions.rewrite = (node, index, parent) => {
    codePreviewWarpperStyle(node);
    rehypeUrls(node, fromPath);
    copyAsset(node, fromPath);
    addCopyButton(node);
    if (node.type === 'root') {
      pagetitle = getTitle(node) || pagetitle;
      description = getDescription(node) || pagetitle;
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
        if (
          item.type === 'element' &&
          item.tagName === 'a' &&
          item.children[0] &&
          item.children[0].type === 'element'
        ) {
          if (item.children[0].properties.className.toString().indexOf('icon-link') > -1) {
            item.properties.class = 'anchor';
          }
        }
        return item;
      });
      tocItem.label = getCodeString(node.children) || '';
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
  const data = {
    fileStat: {},
    tocs: [...tocsArr],
    tocsTree: getTocsTree([...tocs.filter((item) => item.number !== 1)]),
    menus: [],
    editButton: {},
  } as Data & ConfigData;
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

  if (config.data.tocs === false && page.tocs !== true) {
    data.tocs = false;
    data.tocsTree = [];
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
  const cacheFileStat = cacheFile.get(data.fileStat.path);
  data.fileStat = { ...data.fileStat, ...cacheFileStat, ...page.fileStat };
  const getKeys = <T>(obj: T) => Object.keys(obj) as Array<keyof T>;
  for (const key of getKeys(data.fileStat)) {
    if ((key === 'atime' || key === 'ctime' || key === 'mtime') && data.fileStat[key]) {
      const date = data.fileStat[key] instanceof Date ? data.fileStat[key] : new Date(data.fileStat[key]);
      data.fileStat = { ...data.fileStat, ...{ [`${key}Str`]: formatter('YYYY/MM/DD', date) } };
    }
  }
  const varData: ConfigData = { ...config.all, ...data, menus: data.menus, page, markdown: mdStr, html: mdHtml };
  let tempPath = path.resolve(config.data.theme, page.layout || 'markdown.ejs');
  if (page.layout) {
    tempPath = path.resolve(config.data.root, page.layout);
  }
  if (!fs.existsSync(tempPath)) {
    log.log('\x1b[31;1mcreate\x1b[0m')(fromPath);
    console.log(
      `    ╰┈\x1b[31;1m FAIL\x1b[0m ->`,
      `Template \x1b[33;1m${tempPath}\x1b[0m does not exist. \n`,
      `              Please check your configuration.`,
    );
    return '';
  }
  try {
    const tmpStr = await fs.readFile(tempPath);
    return render(tmpStr.toString(), varData, {
      filename: tempPath,
    });
  } catch (error) {
    console.log(
      `    ╰┈\x1b[31;1m FAIL\x1b[0m ->`,
      `please check template \x1b[33;1m${tempPath}\x1b[0m.\n`,
      `              Error: \x1b[31;1m${error.message || error}\x1b[0m.`,
    );
    return error.message || error;
  }
}

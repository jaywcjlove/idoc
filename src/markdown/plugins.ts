import { Options } from '@wcj/markdown-to-html';

export const rehypeAutolinkHeadings = async () => {
  // https://github.com/microsoft/TypeScript/issues/43329#issuecomment-922544562
  const autolink = await ((await Function('return import("rehype-autolink-headings")')()) as Promise<
    typeof import('rehype-autolink-headings')
  >);
  return autolink.default;
};

export const rehypeSlug = async () => {
  // https://github.com/microsoft/TypeScript/issues/43329#issuecomment-922544562
  const slug = await ((await Function('return import("rehype-slug")')()) as Promise<typeof import('rehype-slug')>);
  return slug.default;
};

export const rehypeIgnore = async () => {
  // https://github.com/microsoft/TypeScript/issues/43329#issuecomment-922544562
  const ignore = await ((await Function('return import("rehype-ignore")')()) as Promise<
    typeof import('rehype-ignore')
  >);
  return ignore.default;
};

export const markdownToHTML = async (str: string, opt: Options) => {
  // https://github.com/microsoft/TypeScript/issues/43329#issuecomment-922544562
  const markdown = await ((await Function('return import("@wcj/markdown-to-html")')()) as Promise<
    typeof import('@wcj/markdown-to-html')
  >);
  return markdown.default(str, opt);
};

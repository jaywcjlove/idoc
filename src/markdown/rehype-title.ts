import type { Plugin } from 'unified';
import type { Root, RootContent } from 'hast';
import { visit } from 'unist-util-visit';
import { getTitle, getDescription } from './utils.js';

type RehypeTitleProps = (title: string, description: string) => void;
const rehypeTitle: Plugin<[RehypeTitleProps?], Root> = (callback) => {
  return (tree) => {
    visit(tree, (node: Root | RootContent) => {
      if (node.type === 'root') {
        callback && callback(getTitle(node), getDescription(node));
      }
    });
  };
};

export default rehypeTitle;

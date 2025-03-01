import type { RemarkPlugin } from '@astrojs/markdown-remark'

import { toString } from 'mdast-util-to-string'

export const remarkExcerpt: RemarkPlugin = () => (tree, { data }) => {
  if (data.astro?.frontmatter === undefined) {
    return
  }

  data.astro.frontmatter.excerpt = toString(
    tree.children.find((node) => node.type === 'paragraph'),
  )
}

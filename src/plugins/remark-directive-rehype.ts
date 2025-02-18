import type { RemarkPlugin } from "@astrojs/markdown-remark"
import { h } from "hastscript"
import { visit } from "unist-util-visit"

export const parseDirectiveNode: RemarkPlugin = () => (tree) => {
  visit(tree, (node) => {
    if (
      node.type === "containerDirective" ||
      node.type === "leafDirective" ||
      node.type === "textDirective"
    ) {
      node.data ??= {}
      node.attributes ??= {}

      const [firstChild] = node.children
      if (
        firstChild?.type === "paragraph" &&
        firstChild.data?.directiveLabel === true
      ) {
        node.attributes["has-directive-label"] = "true"
      }

      const hast = h(node.name, node.attributes)

      node.data.hName = hast.tagName
      node.data.hProperties = hast.properties
    }
  })
}

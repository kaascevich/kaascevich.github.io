import type { RemarkPlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";

/** A plugin to extract filenames from code blocks. */
export default function remarkReadingTime(): ReturnType<RemarkPlugin> {
  return (tree) => visit(tree, "code", (node, index) => {
    if (node.meta) {
      const matches = [...node.meta.matchAll(/file="(.*?)"/g)];
      const filename = matches[0][1];
      if (filename && node.data?.hProperties) {
        node.data.hProperties["data-filename"] = filename;
        // let data = {
        //   ...node.data,
        //   hProperties: {
        //     ...node.data?.hProperties,
        //     "data-filename": filename,
        //   },
        // };
        // console.log(data);
        // node.data = data;
      }
    }
  });
}

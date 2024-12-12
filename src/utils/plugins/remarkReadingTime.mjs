import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

/**
 * A plugin to calculate reading times for posts, and
 * then inject these reading times into the frontmatter.
 * */
export default function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    data.astro.frontmatter.readingTime = readingTime.text;
  };
}

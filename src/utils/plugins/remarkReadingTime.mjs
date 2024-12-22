import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

/**
 * A plugin to calculate reading times for posts, and
 * then inject these reading times into the frontmatter.
 * */
export default function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const { minutes } = getReadingTime(textOnPage);
    const roundedMinutes = Math.ceil(minutes);

    data.astro.frontmatter.readingTime = `About ${roundedMinutes} ${roundedMinutes === 1 ? "minute" : "minutes"}`;
  };
}

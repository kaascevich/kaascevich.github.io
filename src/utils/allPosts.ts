import { SITE } from "@config";
import { getCollection } from "astro:content";
import day from "dayjs";
import type { Post, PostInfo } from "@content.config";

function getPostSortIndex({ data }: Post) {
  return Math.floor(day(data.modified ?? data.published).valueOf() / 1000);
}

/** A list of all blog posts, sorted by publication or modification date. */
export const allPostsRaw: Post[] = (await getCollection("posts", post => {
  const isPublishTimePassed = day() > day(post.data.published).subtract(SITE.scheduledPostMargin, "minutes");
  return import.meta.env.DEV || isPublishTimePassed;
}))
  .sort((a, b) => getPostSortIndex(b) - getPostSortIndex(a));

/** A list of all blog post metadata, sorted by publication or modification date. */
const allPosts: PostInfo[] = allPostsRaw
  .map(({ id, data }) => ({ id, ...data }));

export default allPosts;

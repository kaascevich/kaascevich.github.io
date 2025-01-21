import { getCollection } from "astro:content";
import postFilter from "@utils/postFilter";
import day from "dayjs";
import type { Post, PostInfo } from "@content.config";

function getPostSortIndex({ data }: Post) {
  return Math.floor(day(data.modified ?? data.published).valueOf() / 1000);
}

/**
 * Gets all blog posts, sorted by publication or modification date.
 * @returns A list of posts, sorted by date in descending order.
 */
export default async function getPosts(): Promise<PostInfo[]> {
  return (await getPostsRaw())
    .map(({ id, data }) => ({ id, ...data }));
}

/**
 * Gets all blog posts, sorted by publication or modification date.
 * @returns A list of posts, sorted by date in descending order.
 */
export async function getPostsRaw(): Promise<Post[]> {
  return (await getCollection("posts"))
    .filter(postFilter)
    .sort((a, b) => getPostSortIndex(b) - getPostSortIndex(a));
}

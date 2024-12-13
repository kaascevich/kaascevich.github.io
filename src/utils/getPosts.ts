import { getCollection, type CollectionEntry } from "astro:content";
import postFilter from "@utils/postFilter";

function getPostSortIndex({ data }: CollectionEntry<"blog">) {
  return Math.floor(new Date(data.modified ?? data.published).getTime() / 1000);
}

/**
 * Gets all blog posts, sorted by publication or modification date.
 * @returns A list of posts, sorted by date in descending order.
 */
export default async function getPosts(): Promise<CollectionEntry<"blog">[]> {
  const posts = await getCollection("blog");
  return posts
    .filter(postFilter)
    .sort((a, b) => getPostSortIndex(b) - getPostSortIndex(a));
}

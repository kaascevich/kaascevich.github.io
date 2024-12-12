import { getCollection, type CollectionEntry } from "astro:content";
import postFilter from "@utils/postFilter";

function getPostSortIndex({ data }: CollectionEntry<"blog">) {
  return Math.floor(new Date(data.modified ?? data.published).getTime() / 1000);
}

/**
 * Sorts all blog posts by publication or modification date.
 * @returns A list of posts, sorted by date in descending order.
 */
export default async function getSortedPosts(): Promise<CollectionEntry<"blog">[]> {
  return sortPosts(await getCollection("blog"));
}


/**
 * Sorts blog posts by publication or modification date.
 * @param posts - The posts to sort.
 * @returns A list of posts, sorted by date in descending order.
 */
export function sortPosts(posts: CollectionEntry<"blog">[]): CollectionEntry<"blog">[] {
  return posts
    .filter(postFilter)
    .sort((a, b) => getPostSortIndex(b) - getPostSortIndex(a));
}

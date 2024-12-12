import type { CollectionEntry } from "astro:content";
import getSortedPosts from "@utils/getSortedPosts";

/**
 * Filters all blog posts by tag.
 * @param posts - A list of posts to filter.
 * @param tag - The tag to filter by.
 * @returns A list of filtered posts.
 * */
export default function getPostsByTag(
  posts: CollectionEntry<"blog">[],
  tag: string
): CollectionEntry<"blog">[] {
  return getSortedPosts(
    posts.filter(post => post.data.tags.includes(tag))
  );
}

import type { CollectionEntry } from "astro:content";
import postFilter from "@utils/postFilter";

/** A blog post tag. */
type Tag = string;

/**
 * Gets all unique tags from a list of blog posts.
 * @param posts - A list of blog posts.
 * @returns A list of unique tags.
 */
export default function getUniqueTags(posts: CollectionEntry<"blog">[]): Tag[] {
  return posts
    .filter(postFilter)
    .flatMap(post => post.data.tags)
    .filter(
      (value, index, self) =>
        self.findIndex(tag => tag === value) === index
    )
    .sort((tagA, tagB) => tagA.localeCompare(tagB));
}


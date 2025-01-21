import allPosts from "@utils/allPosts";
import postFilter from "@utils/postFilter";
import type { Tag } from "@types";

/**
 * Gets all unique tags from all blog posts.
 * @returns A list of unique tags.
 */
export default async function getUniqueTags(): Promise<Tag[]> {
  return allPosts
    .filter(postFilter)
    .flatMap(post => post.tags)
    .filter(
      (value, index, self) =>
        self.findIndex(tag => tag === value) === index
    )
    .sort((tagA, tagB) => tagA.localeCompare(tagB));
}


import allPosts from "@/utils/allPosts";

/**
 * Gets all unique tags from all blog posts.
 * @returns A list of unique tags.
 */
export default function getUniqueTags(): string[] {
  return allPosts
    .flatMap(post => post.tags)
    .filter(
      (value, index, all) => all.findIndex(tag => tag === value) === index
    )
    .sort((tagA, tagB) => tagA.localeCompare(tagB));
}

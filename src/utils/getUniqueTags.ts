import getPosts from "@utils/getPosts";
import postFilter from "@utils/postFilter";

/** A blog post tag. */
type Tag = string;

/**
 * Gets all unique tags from all blog posts.
 * @returns A list of unique tags.
 */
export default async function getUniqueTags(): Promise<Tag[]> {
  const posts = await getPosts();
  return posts
    .filter(postFilter)
    .flatMap(post => post.data.tags)
    .filter(
      (value, index, self) =>
        self.findIndex(tag => tag === value) === index
    )
    .sort((tagA, tagB) => tagA.localeCompare(tagB));
}


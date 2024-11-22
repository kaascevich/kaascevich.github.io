import type { CollectionEntry } from "astro:content";
import getSortedPosts from "@utils/getSortedPosts";

const getPostsByTag = (posts: CollectionEntry<"blog">[], tag: string) =>
  getSortedPosts(
    posts.filter(post => post.data.tags.includes(tag))
  );

export default getPostsByTag;

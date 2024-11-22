import type { CollectionEntry } from "astro:content";
import postFilter from "@utils/postFilter";

type Tag = string;

const getUniqueTags = (posts: CollectionEntry<"blog">[]): Tag[] => posts
  .filter(postFilter)
  .flatMap(post => post.data.tags)
  .filter(
    (value, index, self) =>
      self.findIndex(tag => tag === value) === index
  )
  .sort((tagA, tagB) => tagA.localeCompare(tagB));

export default getUniqueTags;

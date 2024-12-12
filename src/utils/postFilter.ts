import { SITE } from "@config";
import type { CollectionEntry } from "astro:content";

/**
 * Checks if a post has a published date in the future.
 * @param post - A blog post.
 * @returns Whether `post` has a published date in the future.
 */
export default function postFilter({ data }: CollectionEntry<"blog">) {
  const isPublishTimePassed =
    Date.now() >
    new Date(data.published).getTime() - SITE.scheduledPostMargin;
  return import.meta.env.DEV || isPublishTimePassed;
};

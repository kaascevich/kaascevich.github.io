import { SITE } from "@config";
import type { Post } from "@content.config";
import day from "dayjs";

/**
 * Checks if a post has a publish date in the future.
 * 
 * When running on the dev server, this function always returns `true`.
 * 
 * @param post - A blog post.
 * @returns Whether `post` has a published date in the future.
 */
export default function postFilter(post: Post) {
  const isPublishTimePassed = day() > day(post.data.published).subtract(SITE.scheduledPostMargin, "minutes");
  return import.meta.env.DEV || isPublishTimePassed;
};

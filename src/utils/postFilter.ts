import { SITE } from "@config";
import type { PostInfo } from "@content.config";
import day from "dayjs";

/**
 * Checks if a post has a published date in the future.
 * 
 * When running on the dev server, this function always returns `true`.
 * @param post - A blog post.
 * @returns Whether `post` has a published date in the future.
 */
export default function postFilter(post: PostInfo) {
  const isPublishTimePassed = day() > day(post.published).subtract(SITE.scheduledPostMargin, "milliseconds");
  return import.meta.env.DEV || isPublishTimePassed;
};

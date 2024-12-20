import type socialIcons from "@assets/socialIcons";

/** Global configuration for the site. */
export type Site = {
  /** The site's URL. */
  url: string,
  /** The site's author. */
  author: string,
  /** The author's profile page. */
  profile: string,
  /** The site's description. */
  description: string,
  /** The site's title. */
  title: string,
  /** The number of posts to show on the main page. */
  postsPerIndex: number,
  /** The number of posts to show on each page. */
  postsPerPage: number,
  /**
   * The number of milliseconds before a post's publish
   * date when the post should become visible.
   */
  scheduledPostMargin: number,
};

/** A blog post tag. */
export type Tag = string;

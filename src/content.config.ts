import { glob, file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

/** The schema for a blog post. */
const post = defineCollection({
  loader: glob({
    // only show draft posts when we're on the dev server
    pattern: import.meta.env.DEV ? ["*.md", "drafts/*.md"] : "*.md",
    base: "src/content/posts",
  }),
  schema: z.object({
    /** The date this post was published. */
    published: z.string().datetime({ offset: true }),
    /** The date this post was last modified, if any. */
    modified: z.string().datetime({ offset: true }).optional(),
    /** This post's title. */
    title: z.string(),
    /** Whether this post should be featured on the main page. */
    isFeatured: z.boolean().optional(),
    /** This post's tags. */
    tags: z.string().regex(/^[a-z0-9]+(?:\-[a-z0-9]+)*$/)
      .array().default(["other"]),
    /** This post's description. */
    description: z.string(),
  }).readonly(),
});

/** The schema for a song. */
const song = defineCollection({
  loader: file("src/content/songs.yaml"),
  schema: z.object({
    /** This song's title. */
    title: z.string(),
    /** Remix-specific metadata. */
    remixDetails: z.object({
      /** The song's original composer. */
      composer: z.string(),
      /** A URL to the original song. */
      originalLink: z.string().url(),
    }).optional().readonly(),
  }).readonly(),
});

export const collections = {
  "posts": post,
  "songs": song,
};

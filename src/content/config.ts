import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

/** A blog post. */
const post = defineCollection({
  loader: glob({
    pattern: import.meta.env.PROD ? ["**/*.md", "!drafts/**/*"] : "**/*.md",
    base: "src/content/blog",
  }),
  schema: () => z.object({
    /** The date this post was published. */
    published: z.date(),
    /**
     * The date this post was last modified, or `null`
     * if it has not yet been modified.
     */
    modified: z.date().optional(),
    /** This post's title. */
    title: z.string(),
    /** Whether this post should be featured on the main page. */
    featured: z.boolean().optional(),
    /** This post's tags. */
    tags: z.array(z.string().toLowerCase()).default(["other"]),
    /** This post's description. */
    description: z.string(),
    /** The amount of time it should take to read this post. */
    readingTime: z.string().optional(),
  }),
});

/** A song. */
const song = defineCollection({
  type: "data",
  schema: () => z.object({
    /** This song's title. */
    title: z.string(),
    /** The path to this song's audio file, with a base of "/assets/songs". */
    sourcePath: z.string().endsWith(".mp3"),
    /** Remix-specific metadata. */
    remixDetails: z.object({
      /** The song's original composer. */
      composer: z.string(),
      /** A URL to the original song. */
      linkToOriginal: z.string().url(),
    }).optional()
  }),
});

export const collections = {
  "blog": post,
  "songs": song,
};

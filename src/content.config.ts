import { glob } from "astro/loaders"
import { defineCollection, z } from "astro:content"
import strings from "./config/strings"

function internalOnly(name: string): z.ZodEffects<z.ZodOptional<z.ZodString>> {
  return z
    .string()
    .optional()
    .refine(
      (value) => value === undefined,
      `\`${name}\` is for internal use only and must not be specified`,
    )
}

const internalProperties = z.object({
  prevTitle: internalOnly("prevTitle"),
  prevID: internalOnly("prevID"),
  nextTitle: internalOnly("nextTitle"),
  nextID: internalOnly("nextID"),
})

const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z
    .object({
      /** The title of the post. */
      title: z.string().nonempty(),

      /** The date the post was published. */
      published: z.date(),

      /** The date the post was last updated. */
      updated: z.date().optional(),

      /**
       * Whether the post is a draft.
       *
       * Draft posts won't be shown in production.
       */
      draft: z.boolean().optional().default(false),

      /** The description of the post. */
      description: z.string().nonempty().optional(),

      /**
       * The cover image for the post.
       *
       * - If this is a URL, the image is fetched from that URL.
       * - If this is a path relative to `/`, the image is fetched from the site
       *   root.
       * - Otherwise, it's interpreted as a path relative to the post's Markdown
       *   file.
       */
      image: z
        .object({
          /**
           * The cover image for the post.
           *
           * - If this is a URL, the image is fetched from that URL.
           * - If this is a path relative to `/`, the image is fetched from the site
           *   root.
           * - Otherwise, it's interpreted as a path relative to the post's Markdown
           *   file.
           */
          source: z.string().nonempty(),

          /** The alt text for the image. */
          alt: z.string(),
        })
        .optional(),

      /**
       * A list of the post's tags.
       *
       * This array must not contain duplicates.
       */
      tags: z
        .array(z.string())
        .readonly()
        .default([])
        .refine(
          (tags) => tags.length === new Set(tags).size,
          "tags array must not contain duplicates",
        ),

      /** The category of the post. */
      category: z.string().nonempty().default(strings.categories.none),
    })
    .readonly()
    .and(internalProperties),
})

export const collections = {
  posts: postsCollection,
}

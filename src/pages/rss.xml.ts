import rss from "@astrojs/rss"
import day from "dayjs"
import type { APIRoute } from "astro"
import { getEntry } from "astro:content"

import { SITE } from "@/config"
import { allPosts } from "@/utils/allPosts"

export const GET: APIRoute = async () => {
  const renderedPosts = await Promise.all(allPosts.map(async post => {
    const rawPost = await getEntry("posts", post.id)!
    return { ...post, rendered: rawPost.rendered! }
  }))

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: SITE.url,
    trailingSlash: false,
    items: renderedPosts.map(post => ({
      link: `posts/${post.id}/`,
      title: post.title,
      author: SITE.author,
      description: post.description,
      pubDate: day(post.published).toDate(),
      categories: post.tags,
      content: post.rendered.html,
    })),
  })
}

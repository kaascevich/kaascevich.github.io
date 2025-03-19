import type { APIContext } from 'astro'

import siteConfig from '$/config/site'
import { getSortedPosts } from '$/utils/content'
import { getPostUrlByID } from '$/utils/urls'
import rss from '@astrojs/rss'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'

const parser = new MarkdownIt()

export async function GET(context: APIContext) {
  const posts = await getSortedPosts()

  return rss({
    title: siteConfig.title,
    description: siteConfig.subtitle,
    site: context.site ?? siteConfig.url,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.published,
      description: post.data.description,
      link: getPostUrlByID(post.id),
      categories: post.data.tags as string[],
      content: sanitizeHtml(parser.render(post.body!), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      }),
    })),
  })
}

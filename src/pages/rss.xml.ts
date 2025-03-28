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

  const items = posts.map((post) => {
    const content = sanitizeHtml(parser.render(post.body!), {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    })

    // if (post.data.title === 'Aurora (part 2)') {
    //   console.log(content.replace(/\[2m/, ''))
    // }

    // filter out ANSI escapes from code blocks
    // eslint-disable-next-line no-control-regex
    const filteredContent = content.replaceAll(/\x1B\[\d+(?:;\d+)*m/g, '')

    return {
      title: post.data.title,
      pubDate: post.data.published,
      description: post.data.description,
      link: getPostUrlByID(post.id),
      categories: post.data.tags as string[],
      content: filteredContent,
    }
  })

  return rss({
    title: siteConfig.title,
    description: siteConfig.subtitle,
    site: context.site ?? siteConfig.url,
    items,
  })
}

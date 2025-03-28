import type { APIContext } from 'astro'

import siteConfig from '$/config/site'
import { getSortedPosts } from '$/utils/content'
import { getPostUrlByID } from '$/utils/urls'
import { getContainerRenderer as getMDXRenderer } from '@astrojs/mdx'
import rss from '@astrojs/rss'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { loadRenderers } from 'astro:container'
import { render } from 'astro:content'

export async function GET(context: APIContext) {
  const renderers = await loadRenderers([getMDXRenderer()])
  const container = await AstroContainer.create({ renderers })
  const posts = await getSortedPosts()

  const items = []
  for (const post of posts) {
    const { Content } = await render(post)
    const content = await container.renderToString(Content, {
      locals: {
        rss: true,
      },
    })

    // filter out ANSI escapes from code blocks
    // eslint-disable-next-line no-control-regex
    const filteredContent = content.replaceAll(/\x1B\[\d+(?:;\d+)*m/g, '')

    items.push({
      title: post.data.title,
      pubDate: post.data.published,
      description: post.data.description,
      link: getPostUrlByID(post.id),
      categories: post.data.tags as string[],
      content: filteredContent,
    })
  }

  return rss({
    title: siteConfig.title,
    description: siteConfig.subtitle,
    site: context.site ?? siteConfig.url,
    items,
  })
}

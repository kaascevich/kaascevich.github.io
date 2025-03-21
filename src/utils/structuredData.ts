import type { Post } from '$/types/content'
import type { BlogPosting } from 'schema-dts'

import siteConfig from '$/config/site'
import strings from '$/config/strings'

import { formatDate } from './dates'

export function postStructuredData(
  post: Post,
  pluginFrontmatter: Record<string, any>,
): BlogPosting {
  return {
    '@type': 'BlogPosting',

    'headline': post.data.title,
    'description': post.data.description,
    'keywords': [post.data.category, ...post.data.tags],
    'inLanguage': 'en-US',
    'author': {
      '@type': 'Person',
      'name': siteConfig.profile.name,
      'url': siteConfig.url,
    },

    'datePublished': formatDate(post.data.published),
    'dateModified': formatDate(post.data.updated ?? post.data.published),

    'wordCount': Number(pluginFrontmatter.words),
    'timeRequired': strings.meta.minutes(Number(pluginFrontmatter.minutes)),

    'copyrightYear': new Date().getFullYear(),
    'license': siteConfig.license?.url,
  }
}

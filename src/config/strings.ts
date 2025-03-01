import type { StringList } from '../types/config'

function count(num: number, singular: string, plural: string): string {
  return `${num} ${num === 1 ? singular : plural}`
}

export default {
  nav: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    archive: 'Archive',
    search: 'Search',
  },
  tags: {
    label: 'Tags',
    none: 'No tags',
  },
  categories: {
    label: 'Categories',
    none: 'Uncategorized',
  },
  widget: {
    more: 'More',
  },
  meta: {
    words: (wordCount: number) => count(wordCount, 'word', 'words'),
    minutes: (readingTime: number) => count(readingTime, 'minute', 'minutes'),
    posts: (postCount: number) => count(postCount, 'post', 'posts'),
  },
  theme: {
    themeColor: 'Theme Color',

    lightMode: 'Light',
    darkMode: 'Dark',
    systemMode: 'System',
  },
  license: {
    author: 'Author',
    publishedAt: 'Published at',
    license: 'License',
  },
  alts: {
    pageNum: (page: number) => `Page ${page}`,
    prevPage: 'Previous page',
    nextPage: 'Next page',

    tag: (tag: string) => `All posts tagged with ${tag}`,
    category: (category: string) => `All posts categorized under ${category}`,
    profile: 'My profile',
    banner: 'Site banner',
    bannerCredit: 'Visit image source',
  },
} satisfies StringList

import type { ColorScheme, StringList } from '../types/config'

function count(num: number, singular: string, plural: string) {
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

    colorScheme: {
      light: 'Light',
      dark: 'Dark',
      auto: 'Auto',
    } satisfies Record<ColorScheme, unknown>,
  },
  license: {
    author: 'Author',
    publishedAt: 'Published at',
    license: 'License',
    copyright: (year: number, name: string) => `\u00A9 ${year} ${name}`,
  },
  github: {
    loading: 'Waiting for the GitHub API...',

    starCount: (stars: number) => count(stars, 'star', 'stars'),
    forkCount: (forks: number) => count(forks, 'fork', 'forks'),
    license: (license: string) => `License: ${license}`,

    noDescription: 'No description',
    noLicense: 'No license',
  },
  alts: {
    prevPage: 'Previous page',
    nextPage: 'Next page',
    pageNum: (page: number) => `Page ${page}`,

    tag: (tag: string) => `All posts tagged with ${tag}`,
    category: (category: string) => `All posts categorized under ${category}`,

    goToAbout: 'Go to about page',
    profile: 'My profile',

    banner: 'Site banner',
    bannerCredit: 'Visit image source',

    hueSettings: 'Color settings',
    resetHue: 'Reset to default',
    themeButton: 'Switch theme',

    backToTop: 'Back to top',
    navMenuButton: 'Nav menu',

    wordCount: 'Word count',
    readingTime: 'Reading time',
    published: 'Publish date',
    updated: 'Last updated',
    categories: 'Categories',
    tags: 'Tags',
  },
} satisfies StringList

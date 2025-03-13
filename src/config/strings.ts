import type { ColorScheme, StringList } from '../types/config'

function count<Singular extends string, Plural extends string>(
  num: number,
  singular: Singular,
  plural: Plural,
) {
  return `${num} ${num === 1 ? singular : plural}` as const
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
      auto: 'System',
    } satisfies Record<ColorScheme, unknown>,
  },
  license: {
    author: 'Author',
    publishedAt: 'Published at',
    license: 'License',
    copyright: (year: number, name: string) =>
      `\u00A9 ${year} ${name}` as const,
  },
  github: {
    loading: 'Waiting for the GitHub API...',

    starCount: (stars: number) => count(stars, 'star', 'stars'),
    forkCount: (forks: number) => count(forks, 'fork', 'forks'),
    license: (license: string) => `License: ${license}` as const,

    noDescription: 'No description',
    noLicense: 'No license',
  },
  alts: {
    prevPage: 'Previous page',
    nextPage: 'Next page',
    pageNum: (page: number) =>
      `Page ${page}` as const,

    tag: (tag: string) =>
      `All posts tagged with ${tag}` as const,
    category: (category: string) =>
      `All posts categorized under ${category}` as const,

    goToAbout: 'Go to about page',
    profile: 'My profile',

    banner: 'Site banner',
    bannerCredit: 'Visit image source',

    hueSettings: 'Color settings',
    resetHue: 'Reset to default',
    themeButton: 'Switch theme',

    backToTop: 'Back to top',
    navMenuButton: 'Nav menu',
  },
} as const satisfies StringList

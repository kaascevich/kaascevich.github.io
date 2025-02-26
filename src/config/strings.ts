import type { StringList } from "../types/config"

export default {
  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    archive: "Archive",
    search: "Search",
  },
  tags: {
    label: "Tags",
    none: "No tags",
  },
  categories: {
    label: "Categories",
    none: "Uncategorized",
  },
  widget: {
    more: "More",
  },
  meta: {
    words: (wordCount: number) =>
      `${wordCount} ${wordCount === 1 ? "word" : "words"}`,
    minutes: (readingTime: number) =>
      `${readingTime} ${readingTime === 1 ? "minute" : "minutes"}`,
    posts: (postCount: number) =>
      `${postCount} ${postCount === 1 ? "post" : "posts"}`,
  },
  theme: {
    themeColor: "Theme Color",

    lightMode: "Light",
    darkMode: "Dark",
    systemMode: "System",
  },
  license: {
    author: "Author",
    publishedAt: "Published at",
    license: "License",
  },
  alts: {
    pageNum: (page: number) => `Page ${page}`,
    prevPage: "Previous page",
    nextPage: "Next page",

    tag: (tag: string) => `All posts tagged with ${tag}`,
    category: (category: string) => `All posts categorized under ${category}`,
    profile: "My profile",
    banner: "Site banner",
    bannerCredit: "Visit image source",
  },
} satisfies StringList

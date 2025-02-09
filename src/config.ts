import type { Social } from "@/types"

/** Global configuration for the site. */
export const SITE = {
  /** The site's URL. */
  url: "https://kaascevich.github.io/",
  /** The site's author. */
  author: "Kaleb A. Ascevich",
  /** The site's description. */
  description: "my tiny little haven on the internet",
  /** The site's title. */
  title: "kaascevich",
  /** The number of posts to show on the main page. */
  postsPerIndex: 5,
  /** The number of posts to show on each page. */
  postsPerPage: 10,
  /**
   * The number of minutes before a post's publish date when the post should
   * become visible.
   */
  scheduledPostMargin: 15,
} as const

/** A list of social media links. */
export const SOCIALS: Social[] = [
  {
    name: "GitHub",
    title: `${SITE.title} on GitHub`,
    href: "https://github.com/kaascevich",
  },
  {
    name: "Mail",
    title: `send an email to ${SITE.title}`,
    href: "mailto:cloths-fringe0s@icloud.com",
  },
  {
    name: "Discord",
    title: `${SITE.title} on Discord`,
    href: "https://discord.com/users/1181742723917688882",
  },
  {
    name: "Steam",
    title: `${SITE.title} on Steam`,
    href: "https://steamcommunity.com/id/macOSisthebestOS/",
  },
]

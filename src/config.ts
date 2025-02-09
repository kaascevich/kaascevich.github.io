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
  postsPerPage: 5,
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

/** A list of platforms posts can be shared on. */
export const SHARE_LINKS: Social[] = [
  {
    name: "WhatsApp",
    title: "share this post via WhatsApp",
    href: "https://wa.me/?text=",
  },
  {
    name: "Telegram",
    title: "share this post via Telegram",
    href: "https://t.me/share/url?url=",
  },
  {
    name: "Pinterest",
    title: "share this post on Pinterest",
    href: "https://pinterest.com/pin/create/button/?url=",
  },
  {
    name: "Reddit",
    title: "share this post on Reddit",
    href: "https://www.reddit.com/submit?title=Check%20out%20this%20post%21&url=",
  },
  {
    name: "Mail",
    title: "share this post via email",
    href: "mailto:?subject=See%20this%20post&body=",
  },
]

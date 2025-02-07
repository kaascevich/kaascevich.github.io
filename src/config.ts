import type { GiscusProps } from "@giscus/react"
import type { Site, Social } from "@/types"

/** Global configuration for the site. */
export const SITE: Site = {
  url: "https://kaascevich.github.io/",
  author: "Kaleb A. Ascevich",
  profile: "https://kaascevich.github.io/about",
  description: "my tiny little haven on the internet",
  title: "kaascevich",
  postsPerIndex: 5,
  postsPerPage: 5,
  scheduledPostMargin: 15,
}

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

/** Configuration for the Giscus comments system. */
export const GISCUS: GiscusProps = {
  repo: "kaascevich/kaascevich.github.io",
  repoId: "R_kgDOM1clig",
  category: "Comments",
  categoryId: "DIC_kwDOM1clis4CiycT",
  mapping: "og:title",
  strict: "1",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "top",
  lang: "en",
}

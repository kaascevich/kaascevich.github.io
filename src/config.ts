import {
  type LicenseConfig,
  type NavBarConfig,
  type ProfileConfig,
  type SiteConfig,
  LinkPreset,
} from "./types/config"

export const siteConfig: SiteConfig = {
  title: "Fuwari",
  subtitle: "Demo Site",
  lang: "en",
  themeColor: {
    hue: 250,
    fixed: false,
  },
  banner: {
    enable: true,
    src: "assets/images/banner.png",
    position: "center",
    credit: {
      enable: true,
      text: "Basic Apple Guy",
      url: "https://basicappleguy.com/basicappleblog/strokes",
    },
  },
  toc: {
    enable: true,
    depth: 3,
  },
  favicon: [],
}

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Archive,
    LinkPreset.About,
    {
      name: "GitHub",
      url: "https://github.com/kaascevich", // internal links should not include the base path, as it is automatically added
      external: true, // show an external link icon and will open in a new tab
    },
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: "assets/images/demo-avatar.png",
  name: "Kaleb Ascevich",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  links: [
    {
      name: "GitHub",
      icon: "fa6-brands:github", // visit https://icones.js.org/ for icon codes
      // you will need to install the corresponding icon set if it's not already included
      // `pnpm add @iconify-json/<icon-set-name>`
      url: "https://github.com/kaascevich",
    },
    {
      name: "Discord",
      icon: `fa6-brands:discord`,
      url: "https://discord.com/users/1181742723917688882",
    },
    {
      name: "Steam",
      icon: "fa6-brands:steam",
      url: "https://steamcommunity.com/id/macOSisthebestOS/",
    },
    {
      name: "Mail",
      icon: `fa6-regular:envelope`,
      url: "mailto:cloths-fringe0s@icloud.com",
    },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: "CC BY-NC-SA 4.0",
  url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
}

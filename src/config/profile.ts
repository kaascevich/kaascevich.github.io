import { config, type ProfileConfig } from "$/types/config"

export default config<ProfileConfig>({
  avatar: "assets/images/demo-avatar.png",
  name: "Kaleb A. Ascevich",
  bio: "A hobbyist Swift programmer with all the ADHD.",
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
})

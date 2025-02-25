import { config, type NavBarConfig } from "$/types/config"
import strings from "$/config/strings"

export default config<NavBarConfig>({
  links: [
    {
      name: strings.nav.archive,
      url: "/archive/",
    },
    {
      name: strings.nav.about,
      url: "/about/",
    },
    {
      name: strings.nav.projects,
      url: "/projects/",
    },
    {
      name: "GitHub",
      url: "https://github.com/kaascevich",
      external: true,
    },
  ],
})

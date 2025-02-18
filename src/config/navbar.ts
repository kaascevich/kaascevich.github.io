import { config, type NavBarConfig } from "$/types/config"
import { i18n } from "$/i18n/translation"
import I18nKey from "$/i18n/i18nKey"

export default config<NavBarConfig>({
  links: [
    {
      name: i18n(I18nKey.archive),
      url: "/archive/",
    },
    {
      name: i18n(I18nKey.about),
      url: "/about/",
    },
    {
      name: "GitHub",
      url: "https://github.com/kaascevich",
      external: true,
    },
  ],
})

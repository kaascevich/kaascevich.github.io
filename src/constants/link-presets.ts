import { LinkPreset, type NavBarLink } from "@/types/config"
import I18nKey from "@i18n/i18nKey"
import { i18n } from "@i18n/translation"

export const LinkPresets: Readonly<Record<LinkPreset, NavBarLink>> = {
  [LinkPreset.Archive]: {
    name: i18n(I18nKey.archive),
    url: "/archive/",
  },
  [LinkPreset.About]: {
    name: i18n(I18nKey.about),
    url: "/about/",
  },
} as const

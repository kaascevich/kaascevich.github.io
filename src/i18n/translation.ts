import siteConfig from "$/config/site"
import type I18nKey from "$/i18n/i18nKey"
import { en } from "$/i18n/languages/en"

export type Translation = Readonly<Record<I18nKey, string>>

const map = {
  en,

  en_US: en,
  en_GB: en,
  en_AU: en,
} as const satisfies Record<string, Translation>

export type Lang = keyof typeof map

export function i18n(key: I18nKey): string {
  return map[siteConfig.lang][key]
}

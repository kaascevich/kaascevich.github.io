import siteConfig from "$/config/site"
import type I18nKey from "$/i18n/i18nKey"
import { en } from "$/i18n/languages/en"

export type Translation = Readonly<Record<I18nKey, string>>

const map = {
  en,
  "en-US": en,
  "en-GB": en,
  "en-AU": en,
} as const satisfies Record<Intl.UnicodeBCP47LocaleIdentifier, Translation>
export type Lang = keyof typeof map

export function i18n(key: I18nKey): string {
  return map[siteConfig.lang][key]
}

import { siteConfig } from "$/config"
import type I18nKey from "$/i18n/i18nKey"
import { en } from "$/i18n/languages/en"
import { es } from "$/i18n/languages/es"
import { ja } from "$/i18n/languages/ja"
import { ko } from "$/i18n/languages/ko"
import { th } from "$/i18n/languages/th"
import { zh_CN } from "$/i18n/languages/zh_CN"
import { zh_TW } from "$/i18n/languages/zh_TW"

export type Translation = Readonly<Record<I18nKey, string>>

const map = {
  es,
  en,
  zh_CN,
  zh_TW,
  ja,
  ko,
  th,

  en_US: en,
  en_GB: en,
  en_AU: en,
  ja_JP: ja,
  ko_KR: ko,
  th_TH: th,
} as const satisfies Record<string, Translation>

export type Lang = keyof typeof map

export function i18n(key: I18nKey): string {
  return map[siteConfig.lang][key]
}

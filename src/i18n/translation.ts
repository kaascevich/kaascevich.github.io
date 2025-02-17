import { siteConfig } from "../config"
import type I18nKey from "./i18nKey"
import { en } from "./languages/en"
import { es } from "./languages/es"
import { ja } from "./languages/ja"
import { ko } from "./languages/ko"
import { th } from "./languages/th"
import { zh_CN } from "./languages/zh_CN"
import { zh_TW } from "./languages/zh_TW"

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
  const lang = siteConfig.lang ?? "en"
  return map[lang][key]
}

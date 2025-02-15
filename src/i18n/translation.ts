import { siteConfig } from "../config"
import type I18nKey from "./i18nKey"
import { en } from "./languages/en"
import { es } from "./languages/es"
import { ja } from "./languages/ja"
import { ko } from "./languages/ko"
import { th } from "./languages/th"
import { zh_cn } from "./languages/zh_cn"
import { zh_tw } from "./languages/zh_tw"

export type Translation = Record<I18nKey, string>

const defaultTranslation = en

const map: Record<string, Translation> = {
  es,
  en,
  en_us: en,
  en_gb: en,
  en_au: en,
  zh_cn,
  zh_tw,
  ja,
  ja_jp: ja,
  ko,
  ko_kr: ko,
  th,
  th_th: th,
}

export function getTranslation(lang: string): Translation {
  return map[lang.toLowerCase()] ?? defaultTranslation
}

export function i18n(key: I18nKey): string {
  const lang = siteConfig.lang || "en"
  return getTranslation(lang)[key]
}

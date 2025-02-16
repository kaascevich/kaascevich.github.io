import i18nKey from "@i18n/i18nKey"
import { i18n } from "@i18n/translation"

export function pathsEqual(path1: string, path2: string): boolean {
  const normalize = (path: string): string =>
    path.replace(/^\/|\/$/g, "").toLowerCase()

  return normalize(path1) === normalize(path2)
}

function joinUrl(...parts: readonly string[]): string {
  return parts.join("/").replace(/\/+/g, "/")
}

export function getPostUrlBySlug(slug: string): string {
  return url(`/posts/${slug}/`)
}

export function getCategoryUrl(category: string): string {
  return url(
    `/archive/category/${
      category === i18n(i18nKey.uncategorized) ? "uncategorized" : category
    }/`,
  )
}

export function getDir(path: string): string {
  const lastSlashIndex = path.lastIndexOf("/")
  return lastSlashIndex < 0 ? "/" : path.substring(0, lastSlashIndex + 1)
}

export function url(path: string): string {
  return joinUrl("", import.meta.env.BASE_URL, path)
}

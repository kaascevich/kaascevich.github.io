import type { ColorScheme } from "$/types/config"
import siteConfig from "$/config/site"
import { DEFAULT_COLOR_SCHEME } from "$/constants/constants.ts"

export function getHue(): number {
  const stored = localStorage.getItem("hue")
  return stored === null ? siteConfig.themeColor : Number.parseInt(stored)
}

export function setHue(hue: number): void {
  localStorage.setItem("hue", String(hue))
  document
    .querySelector<HTMLElement>(":root")
    ?.style
    .setProperty("--hue", String(hue))
}

export function applyColorScheme(colorScheme: ColorScheme): void {
  document.documentElement.dataset.colorScheme
    = colorScheme === "auto"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : colorScheme
}

export function setColorScheme(colorScheme: ColorScheme): void {
  localStorage.setItem("colorScheme", colorScheme)
  applyColorScheme(colorScheme)
}

export function getStoredColorScheme(): ColorScheme {
  return (
    (localStorage.getItem("colorScheme") as ColorScheme | null)
    ?? DEFAULT_COLOR_SCHEME
  )
}

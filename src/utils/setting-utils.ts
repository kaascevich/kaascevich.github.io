import type { Theme } from "@/types/config"
import { DEFAULT_THEME } from "@constants/constants.ts"

export function getDefaultHue(): number {
  const fallback = "250"
  const configCarrier = document.getElementById("config-carrier")
  return Number.parseInt(configCarrier?.dataset.hue ?? fallback)
}

export function getHue(): number {
  const stored = localStorage.getItem("hue")
  return stored === null ? getDefaultHue() : Number.parseInt(stored)
}

export function setHue(hue: number): void {
  localStorage.setItem("hue", String(hue))
  document
    .querySelector<HTMLElement>(":root")
    ?.style.setProperty("--hue", String(hue))
}

export function applyThemeToDocument(theme: Theme): void {
  switch (theme) {
    case "light":
      document.documentElement.classList.remove("dark")
      break
    case "dark":
      document.documentElement.classList.add("dark")
      break
    case "auto":
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
      break
  }
}

export function setTheme(theme: Theme): void {
  localStorage.setItem("theme", theme)
  applyThemeToDocument(theme)
}

export function getStoredTheme(): Theme {
  return (localStorage.getItem("theme") as Theme | null) ?? DEFAULT_THEME
}

import type { ColorScheme } from "$/types/config"
import { DEFAULT_COLOR_SCHEME } from "$/constants/constants.ts"

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

export function applyColorScheme(colorScheme: ColorScheme): void {
  switch (colorScheme) {
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

export function setColorScheme(colorScheme: ColorScheme): void {
  localStorage.setItem("colorScheme", colorScheme)
  applyColorScheme(colorScheme)
}

export function getStoredColorScheme(): ColorScheme {
  return (
    (localStorage.getItem("colorScheme") as ColorScheme | null) ??
    DEFAULT_COLOR_SCHEME
  )
}

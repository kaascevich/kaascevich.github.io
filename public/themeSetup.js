"use strict"

/** @typedef {"light" | "dark"} Theme A light or dark theme. */

/** A wrapper for managing the site's theme. */
const theme = {
  /** The current site theme. @type {Theme} */
  get current() {
    const theme = localStorage.getItem("theme")
    return theme === "light" || theme === "dark"
      ? theme
      : matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  },
  
  set current(theme) {
    localStorage.setItem("theme", theme)
    this.apply()
  },
  
  /** Applies the current theme to the site. */
  apply() {
    document.documentElement.dataset.theme = this.current
    document.getElementById("theme-button")?.setAttribute(
      "title",
      `current theme: ${this.current}`,
    )

    if (document.body) {
      const backgroundColor = getComputedStyle(document.body).backgroundColor
      document.querySelector("meta[name='theme-color']")?.setAttribute(
        "content",
        backgroundColor,
      )
    }
  }
}

// set early to avoid flashes
theme.apply()

onload = () => {
  function setUpTheme() {
    theme.apply()

    document.getElementById("theme-button")?.addEventListener(
      "click",
      () => theme.current = theme.current === "light" ? "dark" : "light",
    )
  }

  setUpTheme()
  document.addEventListener("astro:after-swap", setUpTheme)
}

// sync with system changes
matchMedia("(prefers-color-scheme: dark)").addEventListener(
  "change",
  ({ matches: isDark }) => theme.current = isDark ? "dark" : "light",
)

"use strict";

/** @typedef {"light" | "dark" | null} Theme */

/**
 * Gets the current site theme.
 * @returns {Theme} The current site theme.
*/
function getTheme() {
  return localStorage.getItem("theme");
}

/**
 * Sets the current site theme.
 * @param {Theme} theme - The new site theme.
 */
function setTheme(theme) {
  localStorage.setItem("theme", theme);
  applyTheme();
}

/** Applies the current theme to the site. */
function applyTheme() {
  document.documentElement.dataset.theme = getTheme() ?? undefined;
  document.getElementById("theme-button")?.setAttribute(
    "title",
    `current theme: ${getTheme()}`,
  );

  if (document.body) {
    const backgroundColor = getComputedStyle(document.body).backgroundColor;
    document.querySelector("meta[name='theme-color']")?.setAttribute(
      "content",
      backgroundColor,
    );
  }
}

if (getTheme() === null) {
  setTheme(
    matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
  );
}

// set early to avoid flashes
applyTheme();

onload = () => {
  function setUpThemes() {
    applyTheme();

    document.getElementById("theme-button")?.addEventListener(
      "click", () => setTheme(getTheme() === "light" ? "dark" : "light"),
    );
  }

  setUpThemes();
  document.addEventListener("astro:after-swap", setUpThemes);
};

// sync with system changes
matchMedia("(prefers-color-scheme: dark)").addEventListener(
  "change",
  ({ matches: isDark }) => setTheme(isDark ? "dark" : "light"),
);

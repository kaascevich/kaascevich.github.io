/**
 * Gets the current site theme.
 * @returns {string | null} The current site theme.
*/
function getTheme() {
  return localStorage.getItem("theme");
}

/**
 * Sets the current site theme.
 * @param {string} theme - The new site thee.
 */
function setTheme(theme) {
  localStorage.setItem("theme", theme);
  reflectThemePreference();
}

/** Applies the current theme to the site. */
function reflectThemePreference() {
  document.documentElement.dataset.theme = getTheme();
  document.getElementById("theme-button")?.setAttribute("aria-label", getTheme());

  if (document.body) {
    const backgroundColor = getComputedStyle(document.body).backgroundColor;
    document.querySelector("meta[name='theme-color']")?.setAttribute("content", backgroundColor);
  }
}

if (getTheme() === null) {
  setTheme(matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

// set early to avoid flashes
reflectThemePreference();

onload = () => {
  function setThemeFeature() {
    reflectThemePreference();

    // now this script can find and listen for clicks on the control
    document.getElementById("theme-button")?.addEventListener(
      "click",
      () => setTheme(getTheme() === "light" ? "dark" : "light")
    );
  }

  setThemeFeature();
  document.addEventListener("astro:after-swap", setThemeFeature);
};

// sync with system changes
matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => setTheme(isDark ? "dark" : "light"));

import typography from "@tailwindcss/typography"
import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,mjs}"],
  darkMode: [
    "variant",
    "&:where([data-color-scheme=\"dark\"], [data-color-scheme=\"dark\"] *)",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Playpen Sans Variable",
          "sans-serif",
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  plugins: [typography],
}

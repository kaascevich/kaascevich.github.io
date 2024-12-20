function withOpacity(variableName) {
  return ({ opacityValue }) => opacityValue !== undefined
    ? `rgba(var(${variableName}), ${opacityValue})`
    : `rgb(var(${variableName}))`;
}

/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: ["selector", "[data-theme='dark']"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    // Remove the following screen breakpoint or add other breakpoints
    // if one breakpoint is not enough for you
    screens: {
      sm: "640px",
    },

    extend: {
      typography: {
        DEFAULT: {
          css: {
            pre: {
              color: false,
            },
            code: {
              color: false,
            },
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    ({ addUtilities }) => addUtilities({
      ".display-none": {
        display: "none",
      },
    }),
  ],
};

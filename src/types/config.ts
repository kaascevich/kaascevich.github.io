/** Site-wide configuration. */
export type SiteConfig = {
  /** The title of the site. */
  title: string
  /** The subtitle of the site. */
  subtitle?: string | undefined

  /** The primary language of the site. */
  lang: string

  themeColor: {
    /** The default theme hue, from 0 to 360. */
    hue: number
    /** Whether to hide the theme color picker. */
    fixed: boolean
  }
  /** Configuration for the site-wide banner. */
  banner: {
    /** Whether to enable the site-wide banner. */
    enable: boolean
    /**
     * The path to the banner image.
     *
     * Relative to `/src`, or to `/public` if it's an absolute path.
     */
    src: string
    /**
     * The value of the banner's `object-position` property.
     *
     * Defaults to `center`.
     */
    position?: "top" | "center" | "bottom" | undefined
    /** Configuration for the banner attribution link. */
    credit: {
      /** Whether to show an attribution link for the banner image. */
      enable: boolean
      /** The name of the person who created the banner image. */
      text: string
      /** A link to the original image. */
      url?: string | undefined
    }
  }
  /** Configuration for the table of contents. */
  toc: {
    /** Whether to show the table of contents on the right side of the page. */
    enable: boolean
    /** The maximum heading depth to show in the table of contents. */
    depth: 1 | 2 | 3
  }

  /** A list of favicons to use for the site. */
  favicon: Favicon[]
}

/** A favicon. */
export type Favicon = {
  /** The path to this favicon, relative to `/public`. */
  src: string
  /**
   * Whether this favicon is intended for light or dark mode.
   *
   * Leave unset if the favicon should be used regardless of the color scheme.
   */
  theme?: "light" | "dark" | undefined
  /** The size of this favicon. */
  sizes?: string | undefined
}

/** A built-in navbar link. */
export enum LinkPreset {
  Archive,
  About,
}

/** A navbar link. */
export type NavBarLink = {
  /** The name of this navbar link. */
  name: string
  /** The URL of this navbar link. */
  url: string
  /** Whether this navbar link leads to an external site. */
  external?: boolean | undefined
}

/** Navbar configuration. */
export type NavBarConfig = {
  /** A list of navbar links. */
  links: (NavBarLink | LinkPreset)[]
}

/** Profile configuration. */
export type ProfileConfig = {
  avatar?: string | undefined
  name: string
  bio?: string | undefined
  links: {
    name: string
    url: string
    icon: string
  }[]
}

/** License configuration. */
export type LicenseConfig = {
  /** Whether to enable post licenses. */
  enable: boolean
  /** The name of the license. */
  name: string
  /** The URL to the license. */
  url: string
}

export type Theme = "light" | "dark" | "auto"

import { config, type SiteConfig } from "../types/config"

export default config<SiteConfig>({
  url: "https://kaascevich.github.io",
  title: "Haven",
  subtitle: "my little home on the internet",
  lang: "en",
  themeColor: 250,
  banner: {
    enable: true,
    src: "assets/images/banner.png",
    position: "center",
    credit: {
      enable: true,
      text: "Basic Apple Guy",
      url: "https://basicappleguy.com/basicappleblog/strokes",
    },
  },
  toc: {
    enable: true,
    depth: 3,
  },
})

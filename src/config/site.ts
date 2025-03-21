import type { Config } from '../types/config'

import { config } from '../types/config'

import licenseConfig from './license'
import navbarConfig from './navbar'
import profileConfig from './profile'

export default config<Config>({
  url: 'https://kaascevich.github.io',
  title: 'Haven',
  subtitle: 'my little home on the internet',
  defaultHue: 250,
  banner: {
    src: 'assets/images/banner.png',
    position: 'center',
    credit: {
      text: 'Basic Apple Guy',
      url: 'https://basicappleguy.com/basicappleblog/strokes',
    },
  },
  toc: {
    depth: 2,
  },
  navbar: navbarConfig,
  profile: profileConfig,
  license: licenseConfig,
})

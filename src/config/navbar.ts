import type { NavBarConfig } from '../types/config'

import { config } from '../types/config'

import strings from './strings'

export default config<NavBarConfig>({
  links: [
    {
      name: strings.nav.archive,
      url: '/archive/',
    },
    {
      name: strings.nav.about,
      url: '/about/',
    },
    {
      name: strings.nav.projects,
      url: '/projects/',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/kaascevich',
      external: true,
    },
  ],
})

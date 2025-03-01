import { config, type ProfileConfig } from '../types/config'

export default config<ProfileConfig>({
  avatar: 'assets/images/me (bg-less).png',
  name: 'Kaleb A. Ascevich',
  bio: 'A hobbyist Swift programmer with all the ADHD.',
  links: [
    {
      name: 'GitHub',
      icon: 'tabler:brand-github', // https://icones.js.org
      url: 'https://github.com/kaascevich',
    },
    {
      name: 'Discord',
      icon: `tabler:brand-discord`,
      url: 'https://discord.com/users/1181742723917688882',
    },
    {
      name: 'Steam',
      icon: 'tabler:brand-steam',
      url: 'https://steamcommunity.com/id/macOSisthebestOS/',
    },
    {
      name: 'Mail',
      icon: `tabler:mail`,
      url: 'mailto:cloths-fringe0s@icloud.com',
    },
  ],
})

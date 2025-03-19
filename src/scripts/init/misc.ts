import { BANNER_HEIGHT } from '$/constants/constants'
import { pathsEqual } from '$/utils/urls'
import { sleep } from '$/utils/promises'

export default function setup(swupGlobal: NonNullable<typeof window.swup>) {
  swupGlobal.hooks.on('link:click', () => {
    // remove first load delay
    document.documentElement.style.setProperty('--content-delay', '0ms')

    // prevent elements from overlapping the navbar
    if (document.getElementById('banner-wrapper') === null) {
      return
    }

    const threshold = window.innerHeight * (BANNER_HEIGHT / 100) - 72 - 16
    const navbar = document.getElementById('navbar-wrapper')

    if (navbar === null || !document.body.classList.contains('full-height-banner')) {
      return
    }

    if (
      document.body.scrollTop >= threshold ||
      document.documentElement.scrollTop >= threshold
    ) {
      navbar.classList.add('navbar-hidden')
    }
  })

  swupGlobal.hooks.on('visit:start', (visit) => {
    // change banner height immediately when a link is clicked
    if (visit.to.document?.body.classList.contains('full-height-banner')) {
      document.body?.classList.add('full-height-banner')
    } else {
      document.body?.classList.remove('full-height-banner')
    }

    // increase page height during transition to keep scroll animation from jumping
    document.getElementById('page-height-extend')?.classList.remove('hidden')

    // hide the TOC while scrolling back to top
    document.getElementById('toc-wrapper')?.classList.add('toc-not-ready')
  })

  swupGlobal.hooks.on('page:view', () => {
    // hide the temp high element when the transition is done
    document.getElementById('page-height-extend')?.classList.remove('hidden')
  })

  swupGlobal.hooks.on('visit:end', async () => {
    await sleep(200)
    document.getElementById('page-height-extend')?.classList.add('hidden')
    document
      .getElementById('toc-wrapper')
      ?.classList.remove('toc-not-ready')
  })
}

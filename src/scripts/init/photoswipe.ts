import PhotoSwipeLightbox from 'photoswipe/lightbox'

import 'photoswipe/style.css'

let lightbox: PhotoSwipeLightbox | undefined

function initLightbox() {
  lightbox = new PhotoSwipeLightbox({
    gallery: ':is(article.markdown, #post-cover) img',
    // eslint-disable-next-line ts/return-await
    pswpModule: async () => await import('photoswipe'),

    closeSVG: `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M18 6L6 18M6 6l12 12' /></svg>`,
    zoomSVG: `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m4 0h6m-3-3v6m11 8l-6-6' /></svg>`,

    padding: { top: 20, bottom: 20, left: 20, right: 20 },
    wheelToZoom: true,
    arrowPrev: false,
    arrowNext: false,
    imageClickAction: 'close',
    tapAction: 'close',
    doubleTapAction: 'zoom',
  })

  lightbox.addFilter('domItemData', (itemData, element) => {
    if (element instanceof HTMLImageElement) {
      itemData.src = element.src

      itemData.width = element.naturalWidth || window.innerWidth
      itemData.height = element.naturalHeight || window.innerHeight

      itemData.msrc = element.src
    }

    return itemData
  })

  lightbox.init()
}

export default function setup(swupGlobal: NonNullable<typeof window.swup>) {
  if (lightbox === undefined) {
    initLightbox()
  }

  swupGlobal.hooks.on('page:view', initLightbox)
  swupGlobal.hooks.on('content:replace', () => lightbox?.destroy(), {
    before: true,
  })
}

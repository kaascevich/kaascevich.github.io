import type { Page } from 'astro'
import type { CollectionEntry } from 'astro:content'

function range(first: number, last: number): number[] {
  return Array.from(
    Array.from({ length: last - first + 1 }).keys(),
    (n) => n + first,
  )
}

export type PageLinkLayout = [1 | null, number[], number | null]

export function pageLinkLayout(
  page: Page<CollectionEntry<'posts'>>,
): PageLinkLayout {
  const INCLUSION_THRESHOLD = 2
  const VISIBLE = INCLUSION_THRESHOLD * 2 + 1

  const first = 1
  const current = page.currentPage
  const last = page.lastPage

  let leftmost = current - INCLUSION_THRESHOLD
  let rightmost = current + INCLUSION_THRESHOLD

  // we always want to show at least `VISIBLE` pages, so if the current page
  // is close to the start/end, hardcode the boundary
  if (current - 1 >= last - INCLUSION_THRESHOLD) {
    leftmost = last - VISIBLE + 1
  }
  if (current + 1 <= first + INCLUSION_THRESHOLD) {
    rightmost = first + VISIBLE - 1
  }

  // if there's only `INCLUSION_THRESHOLD` pages cut out, just include them
  if (leftmost <= first + INCLUSION_THRESHOLD) {
    leftmost = first
  }
  if (rightmost >= last - INCLUSION_THRESHOLD) {
    rightmost = last
  }

  const leftPage = leftmost > first + INCLUSION_THRESHOLD ? first : null
  const rightPage = rightmost < last - INCLUSION_THRESHOLD ? last : null
  const middlePages = range(leftmost, rightmost)

  return [leftPage, middlePages, rightPage]
}

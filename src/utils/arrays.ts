import { countBy, entries, pipe } from 'remeda'

export function elementCounts<Items extends readonly PropertyKey[]>(array: Items) {
  return pipe(
    array,
    countBy((x) => x),
    entries(),
    (x) => new Map(x),
  )
}

import { countBy, entries, pipe } from 'remeda'

export function elementCounts<Items extends readonly PropertyKey[]>(
  array: Items
): [item: Items[number], count: number][] {
  return pipe(
    array,
    countBy((x) => x),
    entries(),
  )
}

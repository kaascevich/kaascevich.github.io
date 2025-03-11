import * as R from 'remeda'

export function elementCounts<Items extends readonly PropertyKey[]>(array: Items) {
  return R.pipe(
    array,
    R.countBy(R.identity()),

    R.entries(),
    (x) => new Map(x),
  )
}

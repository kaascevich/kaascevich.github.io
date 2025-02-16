export function elementCounts<K>(array: K[]): Map<K, number> {
  const counts = new Map<K, number>()
  array.forEach((item) => counts.set(item, (counts.get(item) ?? 0) + 1))
  return counts
}

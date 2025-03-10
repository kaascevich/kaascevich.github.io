export function elementCounts<K>(array: readonly K[]) {
  const counts = new Map<K, number>()
  for (const item of array) {
    counts.set(item, (counts.get(item) ?? 0) + 1)
  }
  return counts
}

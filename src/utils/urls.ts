export function pathsEqual(path1: string, path2: string) {
  const normalize = (path: string) =>
    path.replace(/^\/|\/$/g, '').toLowerCase()

  return normalize(path1) === normalize(path2)
}

export function getPostUrlByID(id: string) {
  return `/posts/${id}/` as const
}

export function getDir(path: string) {
  const lastSlashIndex = path.lastIndexOf('/')
  return lastSlashIndex < 0
    ? '/'
    : path.substring(0, lastSlashIndex + 1) as `${string}/`
}

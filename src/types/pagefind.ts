export type Pagefind = {
  search: (query: string) => Promise<PagefindResponse>
}

export type PagefindResponse = {
  results: PagefindResultFragment[]
}

export type PagefindResultFragment = {
  id: string
  data: () => Promise<PagefindResult>
}

export type PagefindResult = {
  url: string
  excerpt: string
  filters?: Record<string, string | string[]> | undefined
  meta: {
    title: string
    image?: string | undefined
  }
  content?: string | undefined
  word_count?: number | undefined
}

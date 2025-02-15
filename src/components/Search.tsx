import Fuse from "fuse.js"
import { useEffect, useRef, useState, useMemo } from "react"
import styles from "@/styles/modules/Search.module.sass"

import SearchIcon from "@/assets/icons/search.svg?react"
import Card from "@/components/Card"
import type { EntryInfo } from "@/types"

type Props = Readonly<{
  /** The list of posts that can be searched through. */
  posts: readonly EntryInfo<"posts">[]
}>

/** A search interface for searching through blog posts. */
export default function Search({ posts }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState("")
  const [results, setResults] = useState<EntryInfo<"posts">[]>([])

  const fuse = useMemo(
    () => new Fuse(posts, {
      keys: ["title", "description"],
      threshold: 0.3,
    }),
    [posts]
  )

  useEffect(() => {
    // if the URL has a search query, insert that
    const searchURL = new URLSearchParams(location.search)
    const searchString = searchURL.get("query")
    if (searchString) { setInputValue(searchString) }

    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    setResults(fuse.search(inputValue).map(result => result.item))

    // update search string in URL
    if (inputValue.length > 0) {
      const searchParams = new URLSearchParams(location.search)
      searchParams.set("query", inputValue)
      const newQuery = `${location.pathname}?${searchParams}`
      history.replaceState(history.state, "", newQuery)
    } else {
      history.replaceState(history.state, "", location.pathname)
    }
  }, [inputValue])

  return <>
    <search className={styles.search}>
      <label htmlFor="search-input" aria-label="search">
        <SearchIcon aria-hidden={true}/>
      </label>
      <input
        id="search-input"
        placeholder="type something here..."
        type="search"
        name="search"
        value={inputValue}
        onChange={event => setInputValue(event.currentTarget.value)}
        autoComplete="off"
        ref={inputRef}
      />
    </search>

    {inputValue.length > 0 && <>
      <div className={styles.resultsCount}>
        found {results.length} {results.length === 1 ? "result" : "results"}
      </div>

      <output><ul>
        {results.map(post => <Card post={post} key={post.id}/>)}
      </ul></output>
    </>}
    <noscript>
      <div className={styles["search-results-text"]}>
        JavaScript needs to be enabled for searching to work. No pressure,
        though. You do you.
      </div>
    </noscript>
  </>
}

import Fuse from "fuse.js"
import { useEffect, useRef, useState, useMemo, type FormEvent } from "react"
import styles from "@/styles/modules/Search.module.sass"

import SearchIcon from "@/assets/icons/search.svg?react"
import Card from "@/components/Card"
import type { EntryInfo } from "@/types"

interface Props {
  /** The list of posts that can be searched through. */
  posts: EntryInfo<"posts">[],
}

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

    // put cursor at the end
    setTimeout(() => {
      const searchStringLength = searchString?.length ?? 0
      inputRef.current!.selectionStart = searchStringLength
      inputRef.current!.selectionEnd = searchStringLength
    }, 50)
  }, [])

  useEffect(() => {
    setResults(inputValue.length > 0
      ? fuse.search(inputValue).map(result => result.item)
      : []
    )

    // update search string in URL
    if (inputValue.length > 0) {
      const searchParams = new URLSearchParams(location.search)
      searchParams.set("query", inputValue)
      const newRelativePathQuery = `${location.pathname}?${searchParams}`
      history.replaceState(history.state, "", newRelativePathQuery)
    } else {
      history.replaceState(history.state, "", location.pathname)
    }
  }, [inputValue])

  const handleChange = (event: FormEvent<HTMLInputElement>) => setInputValue(
    event.currentTarget.value
  )

  return <>
    <search className={styles["search-bar"]}>
      <label htmlFor="search-input" aria-label="search">
        <SearchIcon aria-hidden={true}/>
      </label>
      <input
        id="search-input"
        placeholder="type something here..."
        type="search"
        name="search"
        value={inputValue}
        onChange={handleChange}
        autoComplete="off"
        ref={inputRef}
      />
    </search>

    {inputValue.length > 0 && <>
      <div className={styles["search-results-text"]}>
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

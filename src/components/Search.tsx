import Fuse from "fuse.js";
import { useEffect, useRef, useState, useMemo, type FormEvent } from "react";
import Card from "@components/Card";
import type { CollectionEntry } from "astro:content";
import styles from "@styles/modules/Search.module.scss";

interface Props {
  /** The list of posts that can be searched through. */
  posts: CollectionEntry<"blog">[],
}

/** A search interface for searching through blog posts. */
export default function Search({ posts }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputVal] = useState("");
  const [searchResults, setSearchResults] = useState<CollectionEntry<"blog">[]>([]);

  const fuse = useMemo(
    () => new Fuse(posts, {
      keys: ["data.title", "data.description"],
      threshold: 0.3,
    }),
    [posts]
  );

  useEffect(() => {
    // if the URL has a search query, insert that
    const searchURL = new URLSearchParams(location.search);
    const searchString = searchURL.get("query");
    if (searchString) { setInputVal(searchString); }

    // put cursor at the end
    setTimeout(() => {
      const searchStringLength = searchString?.length ?? 0;
      inputRef.current!.selectionStart = searchStringLength;
      inputRef.current!.selectionEnd = searchStringLength;
    }, 50);
  }, []);

  useEffect(() => {
    setSearchResults(inputValue.length > 0
      ? fuse.search(inputValue).map(result => result.item)
      : []
    );
    console.log(searchResults);

    // update search string in URL
    if (inputValue.length > 0) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("query", inputValue);
      const newRelativePathQuery = `${location.pathname}?${searchParams}`;
      history.replaceState(history.state, "", newRelativePathQuery);
    } else {
      history.replaceState(history.state, "", location.pathname);
    }
  }, [inputValue]);

  const handleChange = (event: FormEvent<HTMLInputElement>) => setInputVal(event.currentTarget.value);

  return <>
    <search className={styles["search-bar"]}>
      <label aria-label="search">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"/>
        </svg>
      </label>
      <input
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
        found {searchResults.length} {searchResults.length === 1 ? "result" : "results"} for "{inputValue}"
      </div>

      <ul>
        {searchResults.map((item) =>
          <Card
            id={item.id}
            data={item.data}
            key={item.id}
          />
        )}
      </ul>
    </>}
  </>;
}

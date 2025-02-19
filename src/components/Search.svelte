<script lang="ts" module>
  import type { Pagefind } from "vite-plugin-pagefind/types"
  declare var pagefind: Pagefind
</script>

<script lang="ts">
  import type { PagefindSearchFragment } from "vite-plugin-pagefind/types"
  import { i18n } from "$/i18n/translation"
  import I18nKey from "$/i18n/i18nKey"
  import Icon from "@iconify/svelte"

  let keywordDesktop = $state("")
  let keywordMobile = $state("")
  let results: PagefindSearchFragment[] = $state([])

  const search = async (keyword: string, isDesktop: boolean) => {
    let panel = document.getElementById("search-panel")
    if (panel === null) return

    if (keyword === "" && isDesktop) {
      panel.classList.add("float-panel-closed")
      return
    }

    const tempResults = await Promise.all(
      (await pagefind.search(keyword)).results.map(
        async (item) => await item.data(),
      ),
    )

    if (tempResults.length === 0 && isDesktop) {
      panel.classList.add("float-panel-closed")
      return
    }

    if (isDesktop) {
      panel.classList.remove("float-panel-closed")
    }
    results = tempResults
  }

  const togglePanel = () =>
    document
      .getElementById("search-panel")
      ?.classList.toggle("float-panel-closed")

  $effect(() => {
    search(keywordDesktop, true)
  })
  $effect(() => {
    search(keywordMobile, false)
  })
</script>

<!-- search bar for desktop view -->
<div
  id="search-bar"
  class="hidden lg:flex transition-all items-center h-11 mr-2 rounded-lg bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06] dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10"
>
  <Icon
    icon="tabler:search"
    height="1.25rem"
    width="1.25rem"
    class="absolute pointer-events-none ml-3 transition my-auto text-black/30 dark:text-white/30"
  />
  <input
    placeholder={i18n(I18nKey.search)}
    bind:value={keywordDesktop}
    onfocus={() => search(keywordDesktop, true)}
    class="transition-all pl-10 text-sm bg-transparent outline-0 h-full w-40 active:w-60 focus:w-60 text-black/50 dark:text-white/50"
  />
</div>

<!-- toggle btn for phone/tablet view -->
<button
  onclick={togglePanel}
  aria-label="Search Panel"
  id="search-switch"
  class="btn-plain scale-animation lg:!hidden rounded-lg w-11 h-11 active:scale-90"
>
  <Icon icon="tabler:search" height="1.25rem" width="1.25rem" />
</button>

<!-- search panel -->
<div
  id="search-panel"
  class="float-panel float-panel-closed search-panel absolute md:w-[30rem] top-20 left-4 md:left-[unset] right-4 shadow-2xl rounded-2xl p-2"
>
  <!-- search bar inside panel for phone/tablet -->
  <div
    id="search-bar-inside"
    class="flex relative lg:hidden transition-all items-center h-11 rounded-xl bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06] dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10"
  >
    <Icon
      icon="tabler:search"
      height="1.25rem"
      width="1.25rem"
      class="absolute pointer-events-none ml-3 transition my-auto text-black/30 dark:text-white/30"
    />
    <input
      placeholder="Search"
      bind:value={keywordMobile}
      class="pl-10 absolute inset-0 text-sm bg-transparent outline-0 focus:w-60 text-black/50 dark:text-white/50"
    />
  </div>

  <!-- search results -->
  {#each results as item}
    <a
      href={item.url}
      class="transition first-of-type:mt-2 lg:first-of-type:mt-0 group block rounded-xl text-lg px-3 py-2 hover:bg-[--btn-plain-bg-hover] active:bg-[--btn-plain-bg-active]"
    >
      <div
        class="transition text-90 inline-flex font-bold group-hover:text-[--primary]"
      >
        {item.meta.title}<Icon
          icon="tabler:chevron-right"
          class="transition translate-x-1 my-auto text-[--primary]"
        />
      </div>
      <div class="transition text-sm text-50">
        {@html item.excerpt}
      </div>
    </a>
  {/each}
</div>

<style>
  input:focus {
    outline: 0;
  }
</style>

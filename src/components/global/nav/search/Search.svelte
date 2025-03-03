<script lang='ts' module>
  import type { Pagefind } from 'vite-plugin-pagefind/types'

  declare let pagefind: Pagefind
</script>

<script lang='ts'>
  import type { PagefindSearchFragment } from 'vite-plugin-pagefind/types'

  import SearchResult from '$/components/global/nav/search/SearchResult.svelte'
  import strings from '$/config/strings'
  import Icon from '@iconify/svelte'

  let keywordDesktop = $state('')
  let keywordMobile = $state('')
  let results: PagefindSearchFragment[] = $state([])

  async function search(keyword: string, isDesktop: boolean): Promise<void> {
    const panel = document.getElementById('search-panel')
    if (panel === null) {
      return
    }

    if (keyword === '' && isDesktop) {
      panel.classList.add('float-panel-closed')
      return
    }

    const tempResults = await Promise.all(
      (await pagefind.search(keyword)).results.map(
        async (item) => await item.data(),
      ),
    )

    if (tempResults.length === 0 && isDesktop) {
      panel.classList.add('float-panel-closed')
      return
    }

    if (isDesktop) {
      panel.classList.remove('float-panel-closed')
    }
    results = tempResults
  }

  function togglePanel(): void {
    document
      .getElementById('search-panel')
      ?.classList
      .toggle('float-panel-closed')
  }

  $effect(() => {
    void search(keywordDesktop, true)
  })
  $effect(() => {
    void search(keywordMobile, false)
  })
</script>

<!-- search bar for desktop -->
<search
  id='search-bar'
  class='hidden lg:flex transition-all items-center h-11 mr-2 rounded-lg bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06] dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10'
>
  <Icon
    icon='tabler:search'
    height='1.25rem'
    width='1.25rem'
    class='absolute pointer-events-none ml-3 transition my-auto text-black/30 dark:text-white/30'
  />
  <input
    placeholder={strings.nav.search}
    bind:value={keywordDesktop}
    onfocus={() => search(keywordDesktop, true)}
    class='transition-all pl-10 text-sm bg-transparent outline-0 h-full w-40 active:w-60 focus:w-60 text-black/50 dark:text-white/50'
  />
</search>

<!-- toggle button for mobile -->
<button
  onclick={togglePanel}
  aria-label='Search Panel'
  id='search-switch'
  class='btn-plain expand-animation lg:!hidden rounded-lg w-11 h-11 active:scale-90'
>
  <Icon icon='tabler:search' height='1.25rem' width='1.25rem' />
</button>

<!-- search panel -->
<div
  id='search-panel'
  class='float-panel float-panel-closed search-panel absolute md:w-[30rem] top-20 left-4 md:left-[unset] right-4 shadow-2xl rounded-2xl p-2'
>
  <!-- search bar inside panel for mobile -->
  <search
    id='search-bar-inside'
    class='flex relative lg:hidden transition-all items-center h-11 rounded-xl bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06] dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10'
  >
    <Icon
      icon='tabler:search'
      height='1.25rem'
      width='1.25rem'
      class='absolute pointer-events-none ml-3 transition my-auto text-black/30 dark:text-white/30'
    />
    <input
      placeholder={strings.nav.search}
      bind:value={keywordMobile}
      class='pl-10 absolute inset-0 text-sm bg-transparent outline-0 focus:w-60 text-black/50 dark:text-white/50'
    />
  </search>

  {#each results as item}
    <SearchResult {item} />
  {/each}
</div>

<style lang='scss'>
  input:focus {
    outline: 0;
  }
</style>

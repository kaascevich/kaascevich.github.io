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
<search id='search-bar'>
  <Icon icon='tabler:search' />
  <input
    placeholder={strings.nav.search}
    bind:value={keywordDesktop}
    onfocus={() => search(keywordDesktop, true)}
  />
</search>

<!-- toggle button for mobile -->
<button onclick={togglePanel} aria-label='Search Panel' id='search-switch'>
  <Icon icon='tabler:search' />
</button>

<!-- search panel -->
<div id='search-panel' class='float-panel-closed'>
  <!-- search bar inside panel for mobile -->
  <search id='search-bar-inside'>
    <Icon icon='tabler:search' />
    <input placeholder={strings.nav.search} bind:value={keywordMobile} />
  </search>

  {#each results as item}
    <SearchResult {item} />
  {/each}
</div>

<style lang='scss'>
  @use "../../../../styles/main";
  @use "../../../../styles/theme" as *;
  @use "../../../../styles/utils" as *;
  @use "../../../../styles/variants";

  // MARK: All devices

  input:focus {
    outline: 0;
  }

  #search-panel {
    @extend .float-panel;
    position: absolute;
    top: spacing(20);
    left: spacing(4);
    right: spacing(4);
    padding: spacing(2);
    border-radius: $radius-xl2;
    box-shadow: $shadow-xl2;

    @include variants.md {
      width: spacing(120);
      left: unset;
    }

    :global(mark) {
      background-color: transparent;
      color: var(--primary);
    }
  }

  search {
    @include transition($properties: all);
    align-items: center;
    height: spacing(11);

    background-color: black(4%);
    &:hover, &:focus-within {
      background-color: black(6%);
    }

    @include variants.dark {
      background-color: white(5%);
      &:hover, &:focus-within {
        background-color: white(10%);
      }
    }

    :global(svg) {
      position: absolute;
      pointer-events: none;
      margin: auto spacing(3);
      @include transition;
      width: spacing(5);
      height: spacing(5);
      @include text-plain(30%);
    }

    input {
      @include text-plain(50%);
      padding-left: spacing(10);
      @include font-size($text-sm);
      outline-width: 0px;
      background-color: transparent;
    }
  }

  // MARK: Desktop

  #search-bar {
    display: none;
    margin-right: spacing(2);
    border-radius: $radius-lg;

    @include variants.lg {
      display: flex;
    }

    input {
      @include transition($properties: all);
      height: 100%;
      width: spacing(40);
      &:active, &:focus {
        width: spacing(60);
      }
    }
  }

  // MARK: Mobile

  #search-switch {
    @extend .btn-plain, .expand-animation;
    border-radius: $radius-lg;
    width: spacing(11);
    height: spacing(11);

    &:active {
      scale: 90%;
    }

    @include variants.lg {
      display: none !important;
    }

    :global(svg) {
      width: spacing(5);
      height: spacing(5);
    }
  }

  #search-bar-inside {
    display: flex;
    position: relative;
    border-radius: $radius-xl;

    @include variants.lg {
      display: none;
    }

    input {
      position: absolute;
      inset: 0;
    }
  }
</style>

<script lang='ts'>
  import type { PagefindSearchFragment } from 'vite-plugin-pagefind/types'

  import strings from '$/config/strings'
  import Icon from '@iconify/svelte'
  import { map, pipe } from 'remeda'

  import SearchResult from './SearchResult.svelte'

  let keywordDesktop = $state('')
  let keywordMobile = $state('')
  let results: PagefindSearchFragment[] = $state([])

  async function search(keyword: string, isDesktop: boolean) {
    if (window.pagefind === undefined) {
      return
    }

    const panel = document.getElementById('search-panel')
    if (panel === null) {
      return
    }

    if (keyword === '' && isDesktop) {
      panel.classList.add('float-panel-closed')
      return
    }

    results = await pipe(
      await window.pagefind.search(keyword),
      (x) => x.results,
      map((x) => x.data()),
      (x) => Promise.all(x),
    )

    if (isDesktop) {
      if (results.length === 0) {
        panel.classList.add('float-panel-closed')
      } else {
        panel.classList.remove('float-panel-closed')
      }
    }
  }

  function togglePanel() {
    document
      .getElementById('search-panel')
      ?.classList
      .toggle('float-panel-closed')
  }

  $effect(() => {
    search(keywordDesktop, true)
  })
  $effect(() => {
    search(keywordMobile, false)
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
<button onclick={togglePanel} aria-label={strings.nav.search} id='search-switch'>
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
  @use '../../../../styles/main';
  @use '../../../../styles/theme' as *;
  @use '../../../../styles/utils' as *;
  @use '../../../../styles/variants' as *;

  // MARK: All devices

  input:focus {
    outline: 0;
  }

  #search-panel {
    @extend %float-panel;

    position: absolute;
    inset-block-start: spacing(20);
    inset-inline: spacing(4);

    border-radius: var(--radius-xl2);

    box-shadow: var(--shadow-xl2);

    padding-block: spacing(2);
    padding-inline: spacing(2);

    @media (width >= $breakpoint-md) {
      inset-inline-start: unset;

      inline-size: spacing(120);
    }
  }

  search {
    @include transition($properties: all);

    align-items: center;

    background-color: var(--color-search-bar-bg);

    block-size: spacing(11);

    &:hover, &:focus-within {
      background-color: var(--color-search-bar-bg-hover);
    }

    :global(svg) {
      position: absolute;

      margin-block: auto;
      margin-inline: spacing(3);

      block-size: spacing(5);
      inline-size: spacing(5);

      color: var(--color-search-icon);

      pointer-events: none;
    }

    // stylelint-disable-next-line no-descending-specificity
    input {
      @include font-size($text-sm);

      outline-width: 0;

      background-color: transparent;

      padding-inline-start: spacing(10);

      color: var(--color-search-text);
    }
  }

  // MARK: Desktop

  #search-bar {
    display: block flex;

    margin-inline-end: spacing(2);

    border-radius: var(--radius-lg);

    input {
      @include transition($properties: all);

      block-size: 100%;
      inline-size: spacing(40);

      &:active, &:focus {
        inline-size: spacing(60);
      }
    }

    @media (width < $breakpoint-lg) {
      display: none;
    }
  }

  // MARK: Mobile

  #search-switch {
    @extend %btn-plain, %expand-animation;

    border-radius: var(--radius-lg);

    block-size: spacing(11);
    inline-size: spacing(11);

    &:active {
      scale: 90%;
    }

    :global(svg) {
      block-size: spacing(5);
      inline-size: spacing(5);
    }

    @media (width >= $breakpoint-lg) {
      display: none !important;
    }
  }

  #search-bar-inside {
    display: block flex;
    position: relative;

    border-radius: var(--radius-xl);

    // only include bottom margin if there's at least 1 search result
    &:has(+ :global(*)) {
      margin-block-end: spacing(2);
    }

    // stylelint-disable-next-line no-descending-specificity
    input {
      position: absolute;
      inset: 0;
    }

    @media (width >= $breakpoint-lg) {
      display: none;
    }
  }
</style>

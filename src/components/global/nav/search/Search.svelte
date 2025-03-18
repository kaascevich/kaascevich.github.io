<script lang='ts' module>
  import type { Pagefind } from 'vite-plugin-pagefind/types'

  declare let pagefind: Pagefind
</script>

<script lang='ts'>
  import type { PagefindSearchFragment } from 'vite-plugin-pagefind/types'

  import SearchResult from '$/components/global/nav/search/SearchResult.svelte'
  import strings from '$/config/strings'
  import Icon from '@iconify/svelte'
  import * as R from 'remeda'

  let keywordDesktop = $state('')
  let keywordMobile = $state('')
  let results: PagefindSearchFragment[] = $state([])

  async function search(keyword: string, isDesktop: boolean) {
    const panel = document.getElementById('search-panel')
    if (panel === null) {
      return
    }

    if (keyword === '' && isDesktop) {
      panel.classList.add('float-panel-closed')
      return
    }

    results = await R.pipe(
      await pagefind.search(keyword),
      R.prop('results'),
      R.map((x) => x.data()),
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

    border-radius: $radius-xl2;

    box-shadow: $shadow-xl2;

    padding: spacing(2);

    :global(mark) {
      background-color: transparent;

      color: var(--primary);
    }

    @include md {
      inset-inline-start: unset;

      inline-size: spacing(120);
    }
  }

  search {
    @include transition($properties: all);

    align-items: center;

    background-color: light-dark(black(4%), white(5%));

    block-size: spacing(11);

    &:hover, &:focus-within {
      background-color: light-dark(black(6%), white(10%));
    }

    :global(svg) {
      position: absolute;

      margin-block: auto;
      margin-inline: spacing(3);

      block-size: spacing(5);
      inline-size: spacing(5);

      color: bw(30%);

      pointer-events: none;
    }

    // stylelint-disable-next-line no-descending-specificity
    input {
      @include font-size($text-sm);

      outline-width: 0;

      background-color: transparent;

      padding-inline-start: spacing(10);

      color: bw(50%);
    }
  }

  // MARK: Desktop

  #search-bar {
    display: none;

    margin-inline-end: spacing(2);

    border-radius: $radius-lg;

    input {
      @include transition($properties: all);

      block-size: 100%;
      inline-size: spacing(40);

      &:active, &:focus {
        inline-size: spacing(60);
      }
    }

    @include lg {
      display: block flex;
    }
  }

  // MARK: Mobile

  #search-switch {
    @extend %btn-plain, %expand-animation;

    border-radius: $radius-lg;

    block-size: spacing(11);
    inline-size: spacing(11);

    &:active {
      scale: 90%;
    }

    :global(svg) {
      block-size: spacing(5);
      inline-size: spacing(5);
    }

    @include lg {
      display: none !important;
    }
  }

  #search-bar-inside {
    display: block flex;
    position: relative;

    border-radius: $radius-xl;

    // stylelint-disable-next-line no-descending-specificity
    input {
      position: absolute;
      inset: 0;
    }

    @include lg {
      display: none;
    }
  }
</style>

<script lang='ts'>
  import type { PagefindSearchFragment } from 'vite-plugin-pagefind/types'

  import Icon from '@iconify/svelte'

  export interface Props {
    item: PagefindSearchFragment
  }
  const { item }: Props = $props()
</script>

<a href={item.url}>
  <header>
    {item.meta.title}
    <Icon icon='tabler:chevron-right' />
  </header>
  <div class='excerpt'>
    <!--
      this has already been sanitized by Pagefind -- it needs to be `@html` in
      order to keep the `<mark>` elements intact
    -->
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html item.excerpt}
  </div>
</a>

<style lang='scss'>
  @use '../../../../styles/main';
  @use '../../../../styles/theme' as *;
  @use '../../../../styles/utils' as *;
  @use '../../../../styles/variants' as *;

  a {
    @include transition;
    @include font-size($text-lg);

    display: block flow;

    border-radius: var(--radius-xl);

    padding-block: spacing(2);
    padding-inline: spacing(3);

    &:first-of-type {
      margin-block-start: spacing(2);

      @include lg {
        margin-block-start: 0;
      }
    }

    &:hover {
      background-color: var(--color-btn-plain-bg-hover);

      header {
        color: var(--color-primary);
      }
    }

    &:active {
      background-color: var(--color-btn-plain-bg-active);
    }

    header {
      display: inline flex;

      color: var(--color-search-result-title);

      font-weight: var(--fw-bold);

      :global(svg) {
        translate: spacing(1);

        margin-block: auto;

        color: var(--color-primary);
      }
    }

    .excerpt {
      @include font-size($text-sm);
      color: var(--color-search-result-excerpt);

      :global(mark) {
        background-color: transparent;

        color: var(--color-primary);
      }
    }
  }
</style>

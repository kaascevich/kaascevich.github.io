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
      this has already been sanitized by Pagefind -- it needs to be `@html`
      instead of `@text` to keep the `<mark>` element intact
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

    border-radius: $radius-xl;

    padding-block: spacing(2);
    padding-inline: spacing(3);

    &:first-of-type {
      margin-block-start: spacing(2);

      @include lg {
        margin-block-start: 0;
      }
    }

    &:hover {
      background-color: var(--btn-plain-bg-hover);

      header {
        color: var(--primary);
      }
    }

    &:active {
      background-color: var(--btn-plain-bg-active);
    }

    header {
      display: inline flex;

      color: bw(90%);

      font-weight: $font-weight-bold;

      :global(svg) {
        translate: spacing(1);

        margin-block: auto;

        color: var(--primary);
      }
    }

    .excerpt {
      @include font-size($text-sm);
      color: bw(50%);
    }
  }
</style>

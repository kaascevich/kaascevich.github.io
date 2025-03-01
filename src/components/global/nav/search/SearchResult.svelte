<script lang='ts'>
  import type { PagefindSearchFragment } from 'vite-plugin-pagefind/types'
  import Icon from '@iconify/svelte'

  type Props = Readonly<{
    item: PagefindSearchFragment
  }>
  const { item }: Props = $props()
</script>

<a href={item.url}>
  <header>
    {item.meta.title}
    <Icon icon='tabler:chevron-right' />
  </header>
  <div class='excerpt'>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html item.excerpt}
  </div>
</a>

<style lang='scss'>
  @use "../../../../styles/theme" as *;
  @use "../../../../styles/utils" as *;
  @use "../../../../styles/variants";

  a {
    @include transition();
    display: block;
    border-radius: $radius-xl;
    @include font-size($text-lg);
    padding: spacing(2) spacing(3);

    &:first-of-type {
      margin-top: spacing(2);
      @include variants.lg {
        margin-top: 0;
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
      @include transition();
      @include text-plain(90%);
      display: inline flex;
      font-weight: $font-weight-bold;

      :global(svg) {
        @include transition();
        translate: spacing(1);
        @include margin-y(auto);
        color: var(--primary);
      }
    }

    .excerpt {
      @include transition();
      @include font-size($text-sm);
      @include text-plain(50%);
    }
  }
</style>

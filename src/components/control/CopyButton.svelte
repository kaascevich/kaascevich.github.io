<script lang='ts'>
  import Icon from '@iconify/svelte'

  export interface Props {
    text: string
  }
  const { text }: Props = $props()

  let copyButton: HTMLButtonElement

  // make the copy button do the copy thing
  let timeout: ReturnType<typeof setTimeout> | undefined = $state()
  async function copy() {
    if (timeout !== undefined) {
      clearTimeout(timeout)
    }

    await navigator.clipboard.writeText(text)

    copyButton.classList.add('success')
    timeout = setTimeout(() => copyButton.classList.remove('success'), 1000)
  }
</script>

<button
  class='copy-btn'
  tabindex='0'
  onclick={copy}
  bind:this={copyButton}
  aria-label='Copy code'
>
  <div>
    <Icon icon='tabler:copy' class='copy-icon' />
    <Icon icon='tabler:check' class='success-icon' />
  </div>
</button>

<style lang='scss'>
  @use '../../styles/main';
  @use '../../styles/theme' as *;
  @use '../../styles/utils' as *;
  @use '../../styles/variants' as *;

  :global {
    .copy-btn {
      @include font-size($text-sm);
      @include transition($properties: all);

      display: block flex;
      position: absolute;
      inset-block-start: spacing(2);
      inset-inline-end: spacing(2);

      align-items: center;
      justify-content: center;

      opacity: 75%;

      border-radius: var(--radius-lg);

      background-color: var(--color-copy-btn-bg);

      padding-block: spacing(1.5);
      padding-inline: spacing(1.5);

      block-size: spacing(8);
      inline-size: spacing(8);

      &:not(.success):hover {
        background-color: var(--color-copy-btn-bg-hover);
      }

      &:not(.success):active {
        scale: 90%;

        background-color: var(--color-copy-btn-bg-active);
      }

      &.success {
        background-color: var(--color-copy-btn-bg-success);

        .copy-icon {
          opacity: 0%;
        }

        .success-icon {
          opacity: 100%;
        }
      }

      .copy-icon {
        opacity: 100%;

        color: var(--color-copy-btn-icon);
      }

      .success-icon {
        opacity: 0%;

        color: var(--color-deep-text);
      }

      :is(.copy-icon, .success-icon) {
        @include transition;

        position: absolute;
        inset-block-start: 50%;
        inset-inline-start: 50%;

        translate: -50% -50%;

        block-size: spacing(4.5);
        inline-size: spacing(4.5);
      }
    }
  }
</style>

<script lang='ts'>
  import siteConfig from '$/config/site'
  import strings from '$/config/strings'
  import { getHue, setHue } from '$/utils/settings/hue'
  import Icon from '@iconify/svelte'

  let hue = $state(getHue())

  function resetHue() {
    hue = siteConfig.defaultHue
  }

  function togglePanel() {
    document
      .getElementById('color-settings')
      ?.classList
      .toggle('float-panel-closed')
  }

  $effect(() => {
    setHue(hue)
  })
</script>

<button
  aria-label={strings.alts.hueSettings}
  id='color-settings-switch'
  onclick={togglePanel}
>
  <Icon icon='tabler:palette' />
</button>

<div id='color-settings' class='float-panel-closed'>
  <header>
    <div class='title'>
      {strings.theme.themeColor}
      <button
        aria-label={strings.alts.resetHue}
        class={['reset', { inactive: hue === siteConfig.defaultHue }]}
        onclick={resetHue}
      >
        <Icon icon='tabler:x' />
      </button>
    </div>
    <div id='hue-value'>
      {hue}&deg;
    </div>
  </header>

  <div class='hue-slider-wrapper'>
    <input
      aria-label={strings.theme.themeColor}
      type='range'
      min='0'
      max='359'
      bind:value={hue}
    />
  </div>
</div>

<style lang='scss'>
  @use '../../../styles/main';
  @use '../../../styles/theme' as *;
  @use '../../../styles/utils' as *;
  @use '../../../styles/variants' as *;

  @mixin slider-thumb {
    appearance: none;

    border-width: 0;

    border-radius: var(--radius-sm);

    box-shadow: var(--shadow-none);

    background-color: var(--color-hue-picker-thumb);

    block-size: spacing(4);
    inline-size: spacing(2);

    &:hover {
      background-color: var(--color-hue-picker-thumb-hover);
    }

    &:active {
      background-color: var(--color-hue-picker-thumb-active);
    }
  }

  #color-settings-switch {
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
  }

  #color-settings {
    @extend %float-panel;
    @include transition($properties: all);

    position: absolute;
    inset-inline-end: spacing(4);

    padding-block: spacing(4);
    padding-inline: spacing(4);

    inline-size: spacing(80);

    header {
      display: block flex;

      flex-direction: row;

      gap: spacing(2);

      align-items: center;
      justify-content: space-between;

      margin-block-end: spacing(3);

      .title {
        @include font-size($text-lg);

        display: block flex;
        position: relative;

        gap: spacing(2);

        margin-inline-start: spacing(3);

        color: var(--color-hue-picker-title);

        font-weight: var(--fw-bold);

        &::before {
          position: absolute;
          inset-block-start: spacing(calc(4 / 3));
          inset-inline-start: spacing(-3);

          border-radius: var(--radius-md);

          background-color: var(--color-primary);

          block-size: spacing(4);
          inline-size: spacing(1);

          content: '';
        }
      }

      button.reset {
        @extend %btn-regular;

        border-radius: var(--radius-md);

        block-size: spacing(7);
        inline-size: spacing(7);

        &:active {
          scale: 90%;
        }

        :global(svg) {
          block-size: spacing(3.5);
          inline-size: spacing(3.5);

          color: var(--color-btn-content);
        }

        &.inactive {
          visibility: hidden;
        }
      }

      #hue-value {
        @include font-size($text-sm);

        display: block flex;

        align-items: center;
        justify-content: center;

        border-radius: var(--radius-md);

        background-color: var(--color-hue-picker-value-bg);

        block-size: spacing(7);
        inline-size: spacing(12);

        color: var(--color-hue-picker-value);

        font-weight: var(--fw-bold);
      }
    }

    .hue-slider-wrapper {
      border-radius: var(--radius-sm);

      background-color: var(--color-hue-picker-gradient);

      padding-inline: spacing(1);

      block-size: spacing(6);
      inline-size: 100%;

      user-select: none;

      input[type='range'] {
        @include transition($properties: background-image);

        appearance: none;

        background-image: linear-gradient(
          to right in oklch longer hue,
          var(--color-hue-picker-gradient) 0% 100%
        );

        block-size: spacing(6);
        inline-size: 100%;

        &::-webkit-slider-thumb {
          @include slider-thumb;
        }

        &::-moz-range-thumb {
          @include slider-thumb;
        }

        &::-ms-thumb {
          @include slider-thumb;
        }
      }
    }
  }
</style>

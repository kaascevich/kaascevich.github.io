<script lang='ts'>
  import siteConfig from '$/config/site'
  import strings from '$/config/strings'
  import { getHue, setHue } from '$/utils/settings'
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
  @use "../../../styles/main";
  @use "../../../styles/theme" as *;
  @use "../../../styles/utils" as *;
  @use "../../../styles/variants";

  @mixin slider-thumb {
    appearance: none;

    border-width: 0;

    border-radius: $radius-sm;

    box-shadow: $shadow-none;

    background-color: white(70%);

    block-size: spacing(4);
    inline-size: spacing(2);

    &:hover {
      background-color: white(80%);
    }

    &:active {
      background-color: white(60%);
    }
  }

  #color-settings-switch {
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
  }

  #color-settings {
    @extend %float-panel;
    @include transition($properties: all);

    position: absolute;
    inset-inline-end: spacing(4);

    padding: spacing(4);

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

        color: gray(20.5%);

        font-weight: $font-weight-bold;

        &::before {
          position: absolute;
          inset-block-start: calc(1rem / 3);
          inset-inline-start: spacing(-3);

          border-radius: $radius-md;

          background-color: var(--primary);

          block-size: spacing(4);
          inline-size: spacing(1);

          content: "";
        }

        @include variants.dark {
          color: gray(97%);
        }
      }

      button.reset {
        @extend %btn-regular;

        border-radius: $radius-md;

        block-size: spacing(7);
        inline-size: spacing(7);

        &:active {
          scale: 90%;
        }

        :global(svg) {
          block-size: spacing(3.5);
          inline-size: spacing(3.5);

          color: var(--btn-content);
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

        border-radius: $radius-md;

        background-color: var(--btn-regular-bg);

        block-size: spacing(7);
        inline-size: spacing(12);

        color: var(--btn-content);

        font-weight: $font-weight-bold;
      }
    }

    .hue-slider-wrapper {
      border-radius: $radius-sm;

      background-color: oklch(80% 25% 0deg);

      padding-inline: spacing(1);

      block-size: spacing(6);
      inline-size: 100%;

      user-select: none;

      @include variants.dark {
        background-color: oklch(70% 25% 0deg);
      }

      input[type="range"] {
        @include transition($properties: background-image);

        appearance: none;

        background-image: var(--color-selection-bar);

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

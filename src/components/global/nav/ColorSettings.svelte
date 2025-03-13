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
  @use "sass:math";
  @use "../../../styles/main";
  @use "../../../styles/theme" as *;
  @use "../../../styles/utils" as *;
  @use "../../../styles/variants";

  @mixin slider-thumb {
    width: spacing(2);
    height: spacing(4);

    border-width: 0;
    border-radius: $radius-sm;

    background-color: white(70%);
    box-shadow: $shadow-none;
    appearance: none;

    &:hover {
      background-color: white(80%);
    }

    &:active {
      background-color: white(60%);
    }
  }

  #color-settings-switch {
    @extend %btn-plain, %expand-animation;
    width: spacing(11);
    height: spacing(11);

    border-radius: $radius-lg;

    &:active {
      scale: 90%;
    }

    :global(svg) {
      width: spacing(5);
      height: spacing(5);
    }
  }

  #color-settings {
    @extend %float-panel;
    @include transition($properties: all);

    position: absolute;
    right: spacing(4);
    width: spacing(80);
    padding: spacing(4);

    header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-bottom: spacing(3);
      gap: spacing(2);

      .title {
        @include transition;
        @include font-size($text-lg);

        display: flex;
        position: relative;
        margin-left: spacing(3);

        color: $color-neutral-900;
        font-weight: $font-weight-bold;
        gap: spacing(2);

        @include variants.dark {
          color: $color-neutral-100;
        }

        &::before {
          content: "";

          position: absolute;
          top: math.div(1rem, 3);
          left: spacing(-3);
          width: spacing(1);
          height: spacing(4);

          border-radius: $radius-md;

          background-color: var(--primary);
        }
      }

      button.reset {
        @extend %btn-regular;
        width: spacing(7);
        height: spacing(7);

        border-radius: $radius-md;

        &:active {
          scale: 90%;
        }

        :global(svg) {
          width: spacing(3.5);
          height: spacing(3.5);

          color: var(--btn-content);
        }

        &.inactive {
          visibility: hidden;
        }
      }

      #hue-value {
        @include transition;
        @include font-size($text-sm);

        display: flex;
        align-items: center;
        justify-content: center;
        width: spacing(12);
        height: spacing(7);

        border-radius: $radius-md;

        background-color: var(--btn-regular-bg);

        color: var(--btn-content);
        font-weight: $font-weight-bold;
      }
    }

    .hue-slider-wrapper {
      width: 100%;
      height: spacing(6);
      padding-right: spacing(1);
      padding-left: spacing(1);

      border-radius: $radius-sm;

      background-color: oklch(80% 0.1 0deg);

      user-select: none;

      @include variants.dark {
        background-color: oklch(70% 0.1 0deg);
      }

      input[type="range"] {
        @include transition($properties: background-image);

        appearance: none;

        width: 100%;
        height: spacing(6);

        background-image: var(--color-selection-bar);

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

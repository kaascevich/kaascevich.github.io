<script lang="ts">
  import strings from "$/config/strings"
  import siteConfig from "$/config/site"
  import { getHue, setHue } from "$/utils/settings"
  import Icon from "@iconify/svelte"

  let hue = $state(getHue())

  function resetHue(): void {
    hue = siteConfig.themeColor
  }

  function togglePanel(): void {
    document
      .getElementById("color-settings")
      ?.classList.toggle("float-panel-closed")
  }

  $effect(() => {
    setHue(hue)
  })
</script>

<button
  aria-label="Color Settings"
  id="color-settings-switch"
  onclick={togglePanel}
>
  <Icon icon="tabler:palette" height="1.25rem" width="1.25rem" />
</button>

<div id="color-settings" class="float-panel-closed">
  <header>
    <div class="title">
      {strings.theme.themeColor}
      <button
        aria-label="Reset to default"
        class={{ inactive: hue === siteConfig.themeColor }}
        onclick={resetHue}
      >
        <div class="icon-wrapper">
          <Icon icon="tabler:x" />
        </div>
      </button>
    </div>
    <div class="hue-value-wrapper">
      <div id="hue-value">
        {hue}&deg;
      </div>
    </div>
  </header>

  <div class="hue-slider-wrapper">
    <input
      aria-label={strings.theme.themeColor}
      type="range"
      min="0"
      max="360"
      bind:value={hue}
      class="slider"
      step="5"
    />
  </div>
</div>

<style lang="scss">
  @use "sass:math";
  @use "../../../styles/main";
  @use "../../../styles/theme" as *;
  @use "../../../styles/utils" as *;
  @use "../../../styles/variants";

  @mixin slider-thumb {
    appearance: none;
    box-shadow: $shadow-none;
    border-width: 0;
    border-radius: $radius-sm;

    background-color: white(70%);
    width: spacing(2);
    height: spacing(4);
    &:hover {
      background-color: white(80%);
    }
    &:active {
      background-color: white(60%);
    }
  }

  #color-settings-switch {
    @extend .btn-plain, .expand-animation;
    border-radius: $radius-lg;
    width: spacing(11);
    height: spacing(11);
    &:active {
      scale: 90%;
    }
  }

  #color-settings {
    @extend .float-panel;
    position: absolute;
    @include transition($properties: all);
    right: spacing(4);
    padding: spacing(4);
    width: spacing(80);

    header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: spacing(2);
      margin-bottom: spacing(3);

      .title {
        display: flex;
        gap: spacing(2);
        font-weight: $font-weight-bold;
        @include font-size($text-lg);
        color: $color-neutral-900;
        @include transition;
        position: relative;
        margin-left: spacing(3);

        @include variants.dark {
          color: $color-neutral-100;
        }

        @include before {
          position: absolute;
          top: math.div(1rem, 3);
          left: spacing(-3);
          border-radius: $radius-md;
          background-color: var(--primary);
          width: spacing(1);
          height: spacing(4);
        }
      }

      button {
        @extend .btn-regular;
        border-radius: $radius-md;
        width: spacing(7);
        height: spacing(7);
        &:active {
          scale: 90%;
        }

        .icon-wrapper {
          color: var(--btn-content);

          :global(svg) {
            width: spacing(3.5);
            height: spacing(3.5);
          }
        }

        &.inactive {
          opacity: 0;
          pointer-events: none;
        }
      }

      .hue-value-wrapper {
        display: flex;
        gap: spacing(1);

        #hue-value {
          @include transition();
          display: flex;
          justify-content: center;
          border-radius: $radius-md;
          background-color: var(--btn-regular-bg);
          width: spacing(12);
          height: spacing(7);
          font-weight: $font-weight-bold;
          @include font-size($text-sm);
          align-items: center;
          color: var(--btn-content);
        }
      }
    }

    .hue-slider-wrapper {
      width: 100%;
      height: spacing(6);
      @include padding-x(spacing(1));
      border-radius: $radius-sm;

      background-color: oklch(80% 0.1 0deg);
      user-select: none;
      @include variants.dark {
        background-color: oklch(70% 0.1 0deg);
      }

      input[type="range"] {
        appearance: none;
        width: 100%;
        height: spacing(6);
        @include transition($properties: background-image);
        background-image: var(--color-selection-bar);

        &::-webkit-slider-thumb {
          @include slider-thumb();
        }
        &::-moz-range-thumb {
          @include slider-thumb();
        }
        &::-ms-thumb {
          @include slider-thumb();
        }
      }
    }
  }
</style>

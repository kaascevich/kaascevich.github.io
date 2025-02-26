<script lang="ts">
  import strings from "$/config/strings"
  import { getDefaultHue, getHue, setHue } from "$/utils/settings"
  import Icon from "@iconify/svelte"

  let hue = $state(getHue())
  const defaultHue = getDefaultHue()

  function resetHue() {
    hue = getDefaultHue()
  }

  function togglePanel() {
    document
      .getElementById("color-settings")
      ?.classList.toggle("float-panel-closed")
  }

  $effect(() => setHue(hue))
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
        class:opacity-0={hue === defaultHue}
        class:pointer-events-none={hue === defaultHue}
        onclick={resetHue}
      >
        <div class="icon-wrapper">
          <Icon icon="tabler:x" height="0.875rem" width="0.875rem" />
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
    height: spacing(4);
    width: spacing(2);
    border-radius: $radius-sm;
    border-width: 0;
    box-shadow: $shadow-none;

    background-color: white(70%);
    &:hover {
      background-color: white(80%);
    }
    &:active {
      background-color: white(60%);
    }
  }

  #color-settings-switch {
    @extend .btn-plain, .scale-animation;
    border-radius: $radius-lg;
    height: spacing(11);
    width: spacing(11);
    &:active {
      scale: 90%;
    }
  }

  #color-settings {
    @extend .float-panel;
    position: absolute;
    @include transition($properties: all);
    width: spacing(80);
    right: spacing(4);
    padding: spacing(4);

    header {
      display: flex;
      flex-direction: row;
      gap: spacing(2);
      margin-bottom: spacing(3);
      align-items: center;
      justify-content: space-between;

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
          width: spacing(1);
          height: spacing(4);
          border-radius: $radius-md;
          background-color: var(--primary);
          position: absolute;
          left: spacing(-3);
          top: math.div(1rem, 3);
        }
      }

      button {
        @extend .btn-regular;
        width: spacing(7);
        height: spacing(7);
        border-radius: $radius-md;
        &:active {
          scale: 90%;
        }

        .icon-wrapper {
          color: var(--btn-content);
        }
      }

      .hue-value-wrapper {
        display: flex;
        gap: spacing(1);

        #hue-value {
          @include transition();
          background-color: var(--btn-regular-bg);
          width: spacing(12);
          height: spacing(7);
          border-radius: $radius-md;
          display: flex;
          justify-content: center;
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
      user-select: none;

      background-color: oklch(80% 0.1 0deg);
      @include variants.dark {
        background-color: oklch(70% 0.1 0deg);
      }

      input[type="range"] {
        width: 100%;
        appearance: none;
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

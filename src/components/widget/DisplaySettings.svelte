<script lang="ts">
  import { i18n } from "$/i18n/translation"
  import I18nKey from "$/i18n/i18nKey"
  import { getDefaultHue, getHue, setHue } from "$/utils/settings"
  import Icon from "@iconify/svelte"

  let hue = $state(getHue())
  const defaultHue = getDefaultHue()

  function resetHue() {
    hue = getDefaultHue()
  }

  $effect(() => setHue(hue))
</script>

<div
  id="display-setting"
  class="float-panel float-panel-closed absolute transition-all w-80 right-4 px-4 py-4"
>
  <div class="flex flex-row gap-2 mb-3 items-center justify-between">
    <div
      class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3 before:w-1 before:h-4 before:rounded-md before:bg-[--primary] before:absolute before:-left-3 before:top-[0.33rem]"
    >
      {i18n(I18nKey.themeColor)}
      <button
        aria-label="Reset to Default"
        class="btn-regular w-7 h-7 rounded-md active:scale-90"
        class:opacity-0={hue === defaultHue}
        class:pointer-events-none={hue === defaultHue}
        onclick={resetHue}
      >
        <div class="text-[--btn-content]">
          <Icon icon="tabler:x" height="0.875rem" width="0.875rem" />
        </div>
      </button>
    </div>
    <div class="flex gap-1">
      <div
        id="hueValue"
        class="transition bg-[--btn-regular-bg] w-10 h-7 rounded-md flex justify-center font-bold text-sm items-center text-[--btn-content]"
      >
        {hue}
      </div>
    </div>
  </div>
  <div
    class="w-full h-6 px-1 bg-[oklch(0.80_0.10_0)] dark:bg-[oklch(0.70_0.10_0)] rounded select-none"
  >
    <input
      aria-label={i18n(I18nKey.themeColor)}
      type="range"
      min="0"
      max="360"
      bind:value={hue}
      class="slider"
      id="colorSlider"
      step="5"
      style="width: 100%"
    />
  </div>
</div>

<style lang="scss">
  #display-setting {
    input[type="range"] {
      @apply appearance-none h-6 transition-[background-image];
      background-image: var(--color-selection-bar);

      &::-webkit-slider-thumb {
        @apply appearance-none h-4 w-2 rounded-sm shadow-none bg-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,0.8)] active:bg-[rgba(255,255,255,0.6)];
      }

      &::-moz-range-thumb {
        @apply appearance-none h-4 w-2 rounded-sm border-0 shadow-none bg-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,0.8)] active:bg-[rgba(255,255,255,0.6)];
      }

      &::-ms-thumb {
        @apply appearance-none h-4 w-2 rounded-sm shadow-none bg-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,0.8)] active:bg-[rgba(255,255,255,0.6)];
      }
    }
  }
</style>

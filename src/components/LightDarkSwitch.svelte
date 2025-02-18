<script lang="ts">
  import type { Theme } from "$/types/config"
  import I18nKey from "$/i18n/i18nKey"
  import { i18n } from "$/i18n/translation"
  import Icon from "@iconify/svelte"
  import {
    applyThemeToDocument,
    getStoredTheme,
    setTheme,
  } from "$/utils/setting-utils.ts"
  import { onMount } from "svelte"

  const allModes: readonly Theme[] = ["light", "dark", "auto"]
  let mode: Theme = $state("auto")

  onMount(() => {
    mode = getStoredTheme()
    const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)")
    const changeThemeWhenSchemeChanged = () => applyThemeToDocument(mode)

    darkModePreference.addEventListener("change", changeThemeWhenSchemeChanged)
    return () =>
      darkModePreference.removeEventListener(
        "change",
        changeThemeWhenSchemeChanged,
      )
  })

  function switchScheme(newMode: Theme): void {
    mode = newMode
    setTheme(newMode)
  }

  function toggleScheme(): void {
    const currentModeIndex = allModes.findIndex((m) => m === mode)
    switchScheme(allModes[(currentModeIndex + 1) % allModes.length]!)
  }

  function showPanel(): void {
    document
      .querySelector("#light-dark-panel")
      ?.classList.remove("float-panel-closed")
  }

  function hidePanel(): void {
    document
      .querySelector("#light-dark-panel")
      ?.classList.add("float-panel-closed")
  }

  const buttons: Record<Theme, { key: I18nKey; icon: string }> = {
    light: {
      key: I18nKey.lightMode,
      icon: "material-symbols:wb-sunny-outline-rounded",
    },
    dark: {
      key: I18nKey.darkMode,
      icon: "material-symbols:dark-mode-outline-rounded",
    },
    auto: {
      key: I18nKey.systemMode,
      icon: "material-symbols:radio-button-partial-outline",
    },
  }
</script>

<div class="relative z-50" role="menu" tabindex="-1" onmouseleave={hidePanel}>
  <button
    aria-label="Light/Dark Mode"
    role="menuitem"
    class="relative btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90"
    id="scheme-switch"
    onclick={toggleScheme}
    onmouseenter={showPanel}
  >
    {#each Object.entries(buttons) as [theme, { icon }]}
      <div class="absolute" class:opacity-0={mode !== theme}>
        <Icon {icon} class="text-[1.25rem]" />
      </div>
    {/each}
  </button>

  <div
    id="light-dark-panel"
    class="hidden lg:block absolute transition float-panel-closed top-11 -right-2 pt-5"
  >
    <div class="card-base float-panel p-2">
      {#each Object.entries(buttons) as [theme, { key, icon }]}
        <button
          class="flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95 mb-0.5"
          class:current-theme-btn={mode === theme}
          onclick={() => switchScheme(theme as Theme)}
        >
          <Icon {icon} class="text-[1.25rem] mr-3" />
          {i18n(key)}
        </button>
      {/each}
    </div>
  </div>
</div>

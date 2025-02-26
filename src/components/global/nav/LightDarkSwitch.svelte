<script lang="ts">
  import type { ColorScheme } from "$/types/config"
  import strings from "$/config/strings"
  import Icon from "@iconify/svelte"
  import {
    applyColorScheme,
    getStoredColorScheme,
    setColorScheme,
  } from "$/utils/settings"
  import { onMount } from "svelte"

  const allModes: readonly ColorScheme[] = ["light", "dark", "auto"]
  let mode: ColorScheme = $state("auto")

  onMount(() => {
    mode = getStoredColorScheme()
    const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)")
    const updateColorScheme = () => applyColorScheme(mode)

    darkModePreference.addEventListener("change", updateColorScheme)
    return () =>
      darkModePreference.removeEventListener("change", updateColorScheme)
  })

  function switchScheme(newMode: ColorScheme): void {
    mode = newMode
    setColorScheme(newMode)
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

  const buttons = new Map<
    ColorScheme,
    { key: keyof typeof strings.theme; icon: string }
  >([
    ["light", { key: "lightMode", icon: "tabler:sun" }],
    ["dark", { key: "darkMode", icon: "tabler:moon" }],
    ["auto", { key: "systemMode", icon: "tabler:brightness-filled" }],
  ])
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
    {#each buttons as [colorScheme, { icon }]}
      <div class="absolute" class:opacity-0={mode !== colorScheme}>
        <Icon {icon} height="1.25rem" width="1.25rem" />
      </div>
    {/each}
  </button>

  <div
    id="light-dark-panel"
    class="hidden lg:block absolute transition float-panel-closed top-11 -right-2 pt-5"
  >
    <div class="card-base float-panel p-2">
      {#each buttons as [colorScheme, { key, icon }]}
        <button
          class="flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95 mb-0.5"
          class:current-color-scheme-btn={mode === colorScheme}
          onclick={() => switchScheme(colorScheme)}
        >
          <Icon {icon} height="1.25rem" width="1.25rem" class="mr-3" />
          {strings.theme[key]}
        </button>
      {/each}
    </div>
  </div>
</div>

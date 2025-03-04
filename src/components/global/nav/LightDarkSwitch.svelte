<script lang='ts'>
  import type { ColorScheme } from '$/types/config'

  import strings from '$/config/strings'
  import {
    applyColorScheme,
    getStoredColorScheme,
    setColorScheme,
  } from '$/utils/settings'
  import Icon from '@iconify/svelte'
  import { onMount } from 'svelte'

  const allModes: readonly ColorScheme[] = ['light', 'dark', 'auto']
  let mode: ColorScheme = $state('auto')

  onMount(() => {
    mode = getStoredColorScheme()
    const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)')
    const updateColorScheme = () => applyColorScheme(mode)

    darkModePreference.addEventListener('change', updateColorScheme)
    return () => {
      darkModePreference.removeEventListener('change', updateColorScheme)
    }
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
      .querySelector('#scheme-panel')
      ?.classList
      .remove('float-panel-closed')
  }

  function hidePanel(): void {
    document.querySelector('#scheme-panel')?.classList.add('float-panel-closed')
  }

  const buttons = new Map<
    ColorScheme,
    { key: keyof typeof strings.theme, icon: string }
  >([
    ['light', { key: 'lightMode', icon: 'tabler:sun' }],
    ['dark', { key: 'darkMode', icon: 'tabler:moon' }],
    ['auto', { key: 'systemMode', icon: 'tabler:brightness-filled' }],
  ])
</script>

<div role='menu' tabindex='-1' onmouseleave={hidePanel}>
  <button
    aria-label='Light/Dark Mode'
    role='menuitem'
    id='scheme-switch'
    onclick={toggleScheme}
    onmouseenter={showPanel}
  >
    {#each buttons as [colorScheme, { icon }]}
      <div class={{ inactive: mode !== colorScheme }}>
        <Icon {icon} />
      </div>
    {/each}
  </button>

  <div id='scheme-panel' class='float-panel-closed'>
    <div>
      {#each buttons as [colorScheme, { key, icon }]}
        <button
          class={{ 'current-scheme-btn': mode === colorScheme }}
          onclick={() => {
            switchScheme(colorScheme)
          }}
        >
          <Icon {icon} />
          {strings.theme[key]}
        </button>
      {/each}
    </div>
  </div>
</div>

<style lang='scss'>
  @use "../../../styles/main";
  @use "../../../styles/theme" as *;
  @use "../../../styles/utils" as *;
  @use "../../../styles/variants";

  [role="menu"] {
    position: relative;
    z-index: 50;

    button#scheme-switch {
      @extend .btn-plain, .expand-animation;
      position: relative;
      border-radius: $radius-lg;
      width: spacing(11);
      height: spacing(11);
      &:active {
        scale: 90%;
      }

      div {
        position: absolute;

        &.inactive {
          opacity: 0%;
        }
        :global(svg) {
          width: spacing(5);
          height: spacing(5);
        }
      }
    }

    #scheme-panel {
      position: absolute;
      @include transition();
      display: none;
      top: spacing(11);
      right: spacing(-2);
      padding-top: spacing(5);

      @include variants.lg {
        display: block;
      }

      > div {
        @extend .card-base, .float-panel;
        padding: spacing(2);

        button {
          @extend .btn-plain, .expand-animation;
          @include transition();
          display: flex;
          justify-content: flex-start !important;
          align-items: center;
          border-radius: $radius-lg;
          width: 100%;
          height: spacing(9);
          white-space: nowrap;
          @include padding-x(spacing(3));
          margin-bottom: spacing(0.5);
          font-weight: $font-weight-medium;

          &:active {
            scale: 95%;
          }

          &.current-scheme-btn {
            color: var(--primary) !important;
            &::before {
              content: '';
              scale: 100%;
              opacity: 100%;
              background-color: var(--btn-plain-bg-hover);
            }
          }

          :global(svg) {
            margin-right: spacing(3);
            width: spacing(5);
            height: spacing(5);
          }
        }
      }
    }
  }
</style>

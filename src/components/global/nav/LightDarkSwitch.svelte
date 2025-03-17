<script lang='ts'>
  import type { ColorScheme } from '$/types/config'

  import strings from '$/config/strings'
  import { colorSchemes } from '$/types/config'
  import {
    applyColorScheme,
    getColorScheme,
    setColorScheme,
  } from '$/utils/settings'
  import Icon from '@iconify/svelte'
  import { onMount } from 'svelte'

  let mode: ColorScheme = $state('auto')

  onMount(() => {
    mode = getColorScheme()
    const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)')
    const updateColorScheme = () => applyColorScheme(mode)

    darkModePreference.addEventListener('change', updateColorScheme)
    return () => {
      darkModePreference.removeEventListener('change', updateColorScheme)
    }
  })

  function switchScheme(newMode: ColorScheme) {
    mode = newMode
    setColorScheme(newMode)
  }

  function toggleScheme() {
    const currentIndex = colorSchemes.findIndex((m) => m === mode)
    const nextIndex = (currentIndex + 1) % colorSchemes.length
    const nextScheme = colorSchemes[nextIndex]!
    switchScheme(nextScheme)
  }

  function showPanel() {
    document
      .getElementById('scheme-panel')
      ?.classList
      .remove('float-panel-closed')
  }

  function hidePanel() {
    document.getElementById('scheme-panel')?.classList.add('float-panel-closed')
  }

  const icons = new Map<ColorScheme, string>([
    ['light', 'tabler:sun'],
    ['dark', 'tabler:moon'],
    ['auto', 'tabler:brightness-filled'],
  ])
</script>

<div role='menu' tabindex='-1' onmouseleave={hidePanel}>
  <button
    aria-label={strings.alts.themeButton}
    role='menuitem'
    id='scheme-switch'
    onclick={toggleScheme}
    onmouseenter={showPanel}
  >
    {#each icons as [colorScheme, icon]}
      <div class={{ inactive: mode !== colorScheme }}>
        <Icon {icon} />
      </div>
    {/each}
  </button>

  <div id='scheme-panel' class='float-panel-closed'>
    <menu>
      {#each icons as [colorScheme, icon]}
        <button
          class={{ 'current-scheme-btn': mode === colorScheme }}
          onclick={() => switchScheme(colorScheme)}
        >
          <Icon {icon} />
          {strings.theme.colorScheme[colorScheme]}
        </button>
      {/each}
    </menu>
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
      @extend %btn-plain, %expand-animation;

      position: relative;
      block-size: spacing(11);
      inline-size: spacing(11);

      border-radius: $radius-lg;

      &:active {
        scale: 90%;
      }

      div {
        position: absolute;

        &.inactive {
          opacity: 0%;
        }

        :global(svg) {
          block-size: spacing(5);
          inline-size: spacing(5);
        }
      }
    }

    #scheme-panel {
      display: none;
      position: absolute;
      inset-block-start: spacing(11);
      inset-inline-end: spacing(-2);

      padding-block-start: spacing(5);

      @include transition;

      @include variants.lg {
        display: block;
      }

      menu {
        @extend %card-base, %float-panel;

        padding: spacing(2);

        button {
          @extend %btn-plain, %expand-animation;
          @include transition;

          display: flex;
          align-items: center;
          justify-content: flex-start !important;
          block-size: spacing(9);
          inline-size: 100%;
          margin-block-end: spacing(0.5);
          padding-inline: spacing(3);

          border-radius: $radius-lg;

          font-weight: $font-weight-medium;
          white-space: nowrap;

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
            block-size: spacing(5);
            inline-size: spacing(5);
            margin-inline-end: spacing(3);
          }
        }
      }
    }
  }
</style>

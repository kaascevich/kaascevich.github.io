<script lang='ts'>
  import type { ColorScheme } from '$/types/theme'

  import strings from '$/config/strings'
  import { colorSchemes } from '$/types/theme'
  import {
    applyColorScheme,
    getColorScheme,
    getComputedColorScheme,
    setColorScheme,
  } from '$/utils/settings/colorScheme'
  import Icon from '@iconify/svelte'
  import { onMount, tick } from 'svelte'

  let currentScheme: ColorScheme = $state('auto')

  onMount(() => {
    currentScheme = getColorScheme()
    const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)')
    const updateColorScheme = () => applyColorScheme(currentScheme)

    darkModePreference.addEventListener('change', updateColorScheme)
    return () => {
      darkModePreference.removeEventListener('change', updateColorScheme)
    }
  })

  function switchScheme(newScheme: ColorScheme) {
    const oldScheme = currentScheme
    currentScheme = newScheme

    if (getComputedColorScheme(newScheme) === getComputedColorScheme(oldScheme)) {
      return // skip the transition if nothing's changed
    }

    document.documentElement.classList.add('transitioning')

    if (!document.startViewTransition) {
      // fallback if we don't support view transitions
      setColorScheme(newScheme)
      document.documentElement.classList.remove('transitioning')
      return
    }

    document.startViewTransition(async () => {
      await tick()
      setColorScheme(newScheme)
      document.documentElement.classList.remove('transitioning')
    })
  }

  function toggleScheme() {
    const currentIndex = colorSchemes.findIndex((m) => m === currentScheme)
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
      <div class={{ inactive: currentScheme !== colorScheme }}>
        <Icon {icon} />
      </div>
    {/each}
  </button>

  <div id='scheme-panel' class='float-panel-closed'>
    <menu>
      {#each icons as [colorScheme, icon]}
        <button
          class={{ 'current-scheme-btn': currentScheme === colorScheme }}
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
  @use '../../../styles/main';
  @use '../../../styles/theme' as *;
  @use '../../../styles/utils' as *;
  @use '../../../styles/variants' as *;

  [role='menu'] {
    position: relative;

    z-index: 50;

    button#scheme-switch {
      @extend %btn-plain, %expand-animation;

      position: relative;

      border-radius: var(--radius-lg);

      block-size: spacing(11);
      inline-size: spacing(11);

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
      @include transition;

      position: absolute;
      inset-block-start: spacing(11);
      inset-inline-end: spacing(-2);

      padding-block-start: spacing(5);

      menu {
        @extend %card-base, %float-panel;

        padding-block: spacing(2);
        padding-inline: spacing(2);

        button {
          @extend %btn-plain, %expand-animation;
          @include transition;

          display: block flex;

          align-items: center;
          justify-content: flex-start;

          margin-block-end: spacing(0.5);

          border-radius: var(--radius-lg);

          padding-inline: spacing(3);

          block-size: spacing(9);
          inline-size: 100%;

          white-space: nowrap;

          font-weight: var(--fw-medium);

          &:active {
            scale: 95%;
          }

          &.current-scheme-btn {
            color: var(--color-primary);

            &::before {
              scale: 100%;

              opacity: 100%;

              background-color: var(--color-btn-plain-bg-hover);

              content: '';
            }
          }

          :global(svg) {
            margin-inline-end: spacing(3);

            block-size: spacing(5);
            inline-size: spacing(5);
          }
        }
      }

      @media (width < $breakpoint-lg) {
        display: none;
      }
    }
  }
</style>

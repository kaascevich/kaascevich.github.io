<script lang='ts'>
  import type { FullRepository } from '$/types/github'
  import Icon from '@iconify/svelte'
  import { onMount } from 'svelte'

  type Props = Readonly<{
    /** A GitHub repository, in the form "owner/repo". */
    repo: `${string}/${string}`
  }>
  const { repo: repository }: Props = $props()
  const [owner, repo] = repository.split('/')

  let card: HTMLElement | undefined = $state()

  onMount(async () => {
    if (card === undefined) {
      return
    }

    try {
      const response = await fetch(
        `https://api.github.com/repos/${repository}`,
        { referrerPolicy: 'no-referrer' },
      )
      const data: FullRepository = await response.json()

      const numberFormatter = new Intl.NumberFormat('en-us', {
        notation: 'compact',
        maximumFractionDigits: 1,
      })

      card.querySelector<HTMLElement>('.description')!.textContent
        = data.description?.replace(/:\w+:/g, '') ?? '<description not set>'

      card.querySelector<HTMLElement>('.forks')!.textContent = numberFormatter
        .format(data.forks)
        .replaceAll('\u202F', '')

      card.querySelector<HTMLElement>('.stars')!.textContent = numberFormatter
        .format(data.stargazers_count)
        .replaceAll('\u202F', '')

      const avatar = card.querySelector<HTMLElement>('.avatar')!
      avatar.style.backgroundImage = `url(${data.owner.avatar_url})`
      avatar.style.backgroundColor = 'transparent'

      card.querySelector<HTMLElement>('.license')!.textContent
        = data.license?.spdx_id ?? 'no license'

      card.classList.remove('fetch-waiting')
    } catch (err) {
      card.classList.add('fetch-error')
      console.warn(`[GITHUB-CARD] error loading card for ${repository}: ${String(err)}`)
    }
  })
</script>

<a
  bind:this={card}
  class='fetch-waiting no-styling'
  href={`https://github.com/${repo}`}
  target='_blank'
>
  <header>
    <div class='titlebar-left'>
      <div class='owner'>
        <div class='avatar'></div>
        <div class='user'>{owner}</div>
      </div>
      <div class='repo'>{repo}</div>
    </div>
    <Icon icon='tabler:brand-github' />
  </header>

  <div class='description'></div>

  <footer>
    <div class='stars'></div>
    <div class='forks'></div>
    <div class='license'></div>
  </footer>
</a>

<style lang='scss'>
  @use "sass:math";
  @use "../../styles/theme" as *;
  @use "../../styles/utils" as *;
  @use "../../styles/variants";

  a {
    @include transition();
    display: block;
    position: relative;
    margin: spacing(2) spacing(0);
    border-radius: $radius-xl2;
    background-color: var(--license-block-bg);
    padding: spacing(4.5) spacing(4);
    color: var(--tw-prose-body);
    text-decoration-line: none;
    text-decoration-thickness: 0px;

    @include variants.md {
      padding: spacing(4.5) spacing(6);
    }

    &:hover {
      background-color: var(--btn-regular-bg-hover);

      header {
        color: var(--btn-content);
      }

      .stars,
      .forks,
      .license,
      .description {
        color: var(--tw-prose-headings);
        @include before {
          background-color: var(--tw-prose-headings);
        }
      }
    }

    &:active {
      scale: 98%;
      background-color: var(--btn-regular-bg-active);
    }

    header {
      display: flex;
      justify-content: space-between;
      margin-bottom: spacing(2);
      color: var(--tw-prose-headings);
      @include font-size($text-lg);
      font-weight: $font-weight-medium;

      @include variants.md {
        @include font-size($text-xl);
      }

      .titlebar-left {
        display: flex;
        flex-flow: column nowrap;
        gap: spacing(1);
        @include variants.md {
          flex-flow: row nowrap;
          gap: spacing(2);
        }

        .owner {
          display: flex;
          position: relative;
          flex-flow: row nowrap;
          align-items: center;
          gap: spacing(2);
          font-weight: $font-weight-light;

          .avatar {
            display: block;
            border-radius: 50%;
            width: spacing(6);
            height: spacing(6);
            overflow: hidden;
            background: {
              color: var(--primary);
              size: cover;
            }
          }

          @include after("/") {
            display: none;
            font-weight: $font-weight-normal;
            @include variants.md {
              display: block;
            }
          }
        }

        .repo {
          font-weight: $font-weight-bold;
        }
      }

      :global(svg) {
        width: spacing(6);
        height: spacing(6);
      }
    }

    .description {
      margin-bottom: spacing(3);
      @include font-size($text-base);
      color: var(--tw-prose-body);
      font-weight: $font-weight-light;
    }

    footer {
      display: flex;
      flex-flow: row nowrap;
      gap: spacing(6);
      width: fit-content;
      color: var(--tw-prose-body);
    }

    .stars,
    .forks,
    .license {
      font-weight: $font-weight-medium;
      @include font-size($text-sm);
      opacity: 90%;

      @include before(" ") {
        display: inline-block;
        vertical-align: spacing(-1);
        margin-right: spacing(1);
        background-color: var(--tw-prose-body);
        width: 1.3em;
        height: 1.3em;
        overflow: visible;
        @include transition(
          $properties: (
            background-color,
            background,
          )
        );
        mask-position: center;
        mask-size: contain;
        mask-repeat: no-repeat;
        font-size: inherit;
      }
    }

    .stars::before {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z'/%3E%3C/svg%3E");
    }

    .license::before {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 21H6a3 3 0 0 1-3-3v-1h10v2a2 2 0 0 0 4 0V5a2 2 0 1 1 2 2h-2m2-4H8a3 3 0 0 0-3 3v11M9 7h4m-4 4h4'/%3E%3C/svg%3E");
      margin-right: spacing(2);
    }

    .forks::before {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' width='16' height='16' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Cpath d='M10 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0M5 6a2 2 0 1 0 4 0a2 2 0 1 0-4 0m10 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0'/%3E%3Cpath d='M7 8v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V8m-5 4v4'/%3E%3C/g%3E%3C/svg%3E");
    }
  }

  a.card-github.fetch-waiting {
    opacity: 70%;
    pointer-events: none;
    @include transition($properties: opacity);

    .description,
    footer,
    .avatar {
      opacity: 50%;
      animation: pulsate 2s infinite linear;
      background-color: var(--tw-prose-body);
      color: transparent;
      user-select: none;
      @include before {
        background-color: transparent;
      }
    }

    .description,
    footer {
      border-radius: $radius-lg;
    }
  }

  a.card-github.fetch-error {
    opacity: 100%;
    pointer-events: all;
  }

  @keyframes pulsate {
    0% {
      opacity: 15%;
    }
    50% {
      opacity: 25%;
    }
    100% {
      opacity: 15%;
    }
  }

  .card-github,
  .description,
  header,
  .stars,
  .forks,
  .license,
  .avatar,
  .github-logo {
    @include transition();
  }
</style>

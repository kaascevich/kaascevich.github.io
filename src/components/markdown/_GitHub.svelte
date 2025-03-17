<script lang='ts'>
  import strings from '$/config/strings'
  import Icon from '@iconify/svelte'
  import { Octokit } from 'octokit'
  import { onMount } from 'svelte'

  interface Props {
    owner: string
    repo: string
  }
  const { owner, repo }: Props = $props()

  let card: HTMLElement
  let avatar: HTMLElement

  let description: string = $state(strings.github.loading)
  let stars = $state(Number.NaN)
  let forks = $state(Number.NaN)
  let license = $state('')

  onMount(async () => {
    try {
      const octokit = new Octokit()
      const { data } = await octokit.rest.repos.get({ owner, repo })

      avatar.style.backgroundImage = `url('${data.owner.avatar_url}')`
      avatar.style.backgroundColor = 'transparent'

      description = data.description?.replace(/:\w+:/g, '')
        ?? strings.github.noDescription

      stars = data.stargazers_count
      forks = data.forks_count
      license = data.license?.spdx_id ?? strings.github.noLicense

      card.classList.remove('fetch-waiting')
    } catch (err) {
      card.classList.add('fetch-error')
      console.warn(`Error loading GitHub card for ${owner}/${repo}: ${String(err)}`)
    }
  })

  const numberFormatter = new Intl.NumberFormat('en-us', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format

  const footerItems: Record<string, {
    icon: string
    label: string
    content: string
  }> = $derived({
    stars: {
      icon: 'tabler:star',
      label: strings.github.starCount(stars),
      content: numberFormatter(stars),
    },
    forks: {
      icon: 'tabler:git-fork',
      label: strings.github.forkCount(forks),
      content: numberFormatter(forks),
    },
    license: {
      icon: 'tabler:license',
      label: strings.github.license(license),
      content: license,
    },
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
        <div class='avatar' bind:this={avatar}></div>
        <div class='user'>{owner}</div>
      </div>
      <div class='repo'>{repo}</div>
    </div>
    <Icon icon='tabler:brand-github' class='github-logo' />
  </header>

  <div class='description'>
    {description}
  </div>

  <footer>
    {#each Object.entries(footerItems) as [name, { icon, label, content }]}
      <div class={name} aria-label={label}>
        <Icon {icon} />
        {content}
      </div>
    {/each}
  </footer>
</a>

<style lang='scss'>
  @use "../../styles/main";
  @use "../../styles/theme" as *;
  @use "../../styles/utils" as *;
  @use "../../styles/variants";

  a {
    display: block flow;
    position: relative;

    margin-block: spacing(2);
    margin-inline: 0;

    border-radius: $radius-xl2;

    background-color: var(--license-block-bg);

    padding-block: spacing(4.5);
    padding-inline: spacing(4);

    text-decoration-line: none;

    color: var(--tw-prose-body);
    text-decoration-thickness: 0;

    &:hover {
      background-color: var(--btn-regular-bg-hover);

      header {
        color: var(--btn-content);

        :global(svg) {
          color: var(--tw-prose-headings);
        }
      }

      .stars,
      .forks,
      .license,
      .description {
        color: var(--tw-prose-headings);
      }
    }

    &:active {
      scale: 98%;

      background-color: var(--btn-regular-bg-active);
    }

    header {
      @include font-size($text-lg);

      display: block flex;

      justify-content: space-between;

      margin-block-end: spacing(2);

      color: var(--tw-prose-headings);

      font-weight: $font-weight-medium;

      .titlebar-left {
        display: block flex;

        flex-flow: column nowrap;

        gap: spacing(1);

        .owner {
          display: block flex;
          position: relative;

          flex-flow: row nowrap;

          gap: spacing(2);

          align-items: center;

          font-weight: $font-weight-light;

          &::after {
            display: none;

            font-weight: $font-weight-normal;

            content: "/";

            @include variants.md {
              display: block flow;
            }
          }

          .avatar {
            display: block flow;

            border-radius: 50%;

            background-color: var(--primary);
            background-size: cover;

            block-size: spacing(6);
            inline-size: spacing(6);

            overflow: hidden;
          }
        }

        .repo {
          font-weight: $font-weight-bold;
        }

        @include variants.md {
          flex-flow: row nowrap;

          gap: spacing(2);
        }
      }

      :global(.github-logo) {
        block-size: spacing(6);
        inline-size: spacing(6);
      }

      @include variants.md {
        @include font-size($text-xl);
      }
    }

    .description {
      @include font-size($text-base);

      margin-block-end: spacing(3);

      color: var(--tw-prose-body);

      font-weight: $font-weight-light;
    }

    footer {
      display: block flex;

      flex-flow: row nowrap;

      gap: spacing(6);

      inline-size: fit-content;

      color: var(--tw-prose-body);
    }

    .stars,
    .forks,
    .license {
      @include font-size($text-sm);

      display: block flex;

      flex-direction: row;

      align-items: center;

      opacity: 90%;

      font-weight: $font-weight-medium;

      :global(svg) {
        @include transition(
          $properties: (
            background-color,
            background,
          )
        );
        margin-inline-end: spacing(1);

        block-size: spacing(5);
        inline-size: spacing(5);

        overflow: visible;

        font-size: inherit;
      }
    }

    @include variants.md {
      padding-block: spacing(4.5);
      padding-inline: spacing(6);
    }
  }

  a.fetch-waiting {
    @include transition($properties: opacity);
    opacity: 70%;

    pointer-events: none;

    .description,
    footer,
    .avatar {
      opacity: 50%;

      background-color: var(--tw-prose-body);

      animation-name: pulsate;
      animation-duration: 2s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;

      color: transparent;

      user-select: none;

      &::before {
        background-color: transparent;

        content: '';
      }
    }

    .description, footer {
      border-radius: $radius-lg;
    }
  }

  a.fetch-error {
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
</style>

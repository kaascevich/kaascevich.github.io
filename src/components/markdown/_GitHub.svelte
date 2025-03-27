<script lang='ts'>
  import strings from '$/config/strings'
  import Icon from '@iconify/svelte'
  import { Octokit } from 'octokit'
  import { onMount } from 'svelte'

  export interface Props {
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
      license = data.license?.name ?? strings.github.noLicense

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
  data-pagefind-ignore
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
  @use '../../styles/classes';
  @use '../../styles/theme' as *;

  a {
    display: block flow;

    transition-duration: var(--transition-duration);
    transition-property: var(--transition-properties);
    transition-timing-function: var(--transition-function);

    margin-block: spacing(2);
    margin-inline: 0;

    border-radius: var(--radius-xl2);

    background-color: var(--color-license-bg);

    padding-block: spacing(4.5);
    padding-inline: spacing(6);

    text-decoration-line: none;

    color: var(--tw-prose-body);
    text-decoration-thickness: 0;

    &:hover {
      background-color: var(--color-btn-regular-bg-hover);

      header {
        color: var(--color-btn-content);

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

      background-color: var(--color-btn-regular-bg-active);
    }

    header {
      display: block flex;

      justify-content: space-between;

      margin-block-end: spacing(1);

      color: var(--tw-prose-headings);

      font-size: var(--text-xl);
      font-weight: var(--fw-medium);

      .titlebar-left {
        display: block flex;

        flex-flow: row nowrap;

        gap: spacing(2);

        transition-duration: var(--transition-duration);
        transition-property: var(--transition-properties);
        transition-timing-function: var(--transition-function);

        .owner {
          display: block flex;
          position: relative;

          flex-flow: row nowrap;

          gap: spacing(2);

          align-items: center;

          font-weight: var(--fw-light);

          .avatar {
            display: block flow;

            border-radius: 50%;

            background-color: var(--color-primary);
            background-size: cover;

            block-size: spacing(6);
            inline-size: spacing(6);

            overflow: hidden;
          }

          @media (width >= $breakpoint-md) {
            &::after {
              display: block flow;

              font-weight: var(--fw-normal);

              content: '/';
            }
          }
        }

        .repo {
          font-weight: var(--fw-bold);
        }

        @media (width < $breakpoint-md) {
          flex-flow: column nowrap;

          gap: spacing(1);
        }
      }

      :global(.github-logo) {
        block-size: spacing(6);
        inline-size: spacing(6);
      }

      @media (width < $breakpoint-md) {
        font-size: var(--text-lg);
      }
    }

    .description {
      transition-duration: var(--transition-duration);
      transition-property: var(--transition-properties);
      transition-timing-function: var(--transition-function);

      margin-block-end: spacing(2);

      color: var(--tw-prose-body);

      font-weight: var(--fw-light);
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
      display: block flex;

      flex-direction: row;

      align-items: center;

      transition-duration: var(--transition-duration);
      transition-property: var(--transition-properties);
      transition-timing-function: var(--transition-function);

      opacity: 90%;

      font-size: var(--text-sm);
      font-weight: var(--fw-medium);

      :global(svg) {
        transition-duration: var(--transition-duration);
        transition-property: background-color, background;
        transition-timing-function: var(--transition-function);

        margin-inline-end: spacing(1);

        block-size: spacing(5);
        inline-size: spacing(5);

        overflow: visible;

        font-size: inherit;
      }
    }

    @media (width < $breakpoint-md) {
      padding-inline: spacing(4);
    }
  }

  a.fetch-waiting {
    transition-duration: var(--transition-duration);
    transition-property: opacity;
    transition-timing-function: var(--transition-function);

    opacity: 70%;

    pointer-events: none;

    .description,
    footer,
    .avatar {
      opacity: 50%;

      background-color: var(--tw-prose-body);

      animation-name: pulsate;
      animation-duration: 2s;
      animation-timing-function: var(--transition-function);
      animation-iteration-count: infinite;

      color: transparent;

      user-select: none;

      &::before {
        background-color: transparent;

        content: '';
      }
    }

    .description, footer {
      border-radius: var(--radius-lg);
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

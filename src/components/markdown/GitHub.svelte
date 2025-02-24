<script lang="ts">
  import Icon from "@iconify/svelte"
  import type { FullRepository } from "$/types/github"
  import { onMount } from "svelte"

  type Props = {
    /** A GitHub repository, in the form "owner/repo". */
    repo: `${string}/${string}`
  }
  const { repo: repository }: Props = $props()
  const [owner, repo] = repository.split("/")

  let card: HTMLElement | undefined = $state()

  onMount(async () => {
    if (card === undefined) return

    try {
      const response = await fetch(
        `https://api.github.com/repos/${repository}`,
        { referrerPolicy: "no-referrer" },
      )
      const data: FullRepository = await response.json()

      const numberFormatter = Intl.NumberFormat("en-us", {
        notation: "compact",
        maximumFractionDigits: 1,
      })

      card.querySelector<HTMLElement>(".description")!.innerText =
        data.description?.replace(/:\w+:/g, "") ?? "description not set"

      card.querySelector<HTMLElement>(".forks")!.innerText = numberFormatter
        .format(data.forks)
        .replaceAll("\u202f", "")

      card.querySelector<HTMLElement>(".stars")!.innerText = numberFormatter
        .format(data.stargazers_count)
        .replaceAll("\u202f", "")

      const avatarEl = card.querySelector<HTMLElement>(".avatar")!
      avatarEl.style.backgroundImage = `url(${data.owner.avatar_url})`
      avatarEl.style.backgroundColor = "transparent"

      card.querySelector<HTMLElement>(".license")!.innerText =
        data.license?.spdx_id ?? "no license"

      card.classList.remove("fetch-waiting")

      console.log(`[GITHUB-CARD] loaded card for ${repository}`)
    } catch (err) {
      card.classList.add("fetch-error")
      console.warn(`[GITHUB-CARD] error loading card for ${repository}: ${err}`)
    }
  })
</script>

<a
  bind:this={card}
  class="card-github fetch-waiting no-styling"
  href={`https://github.com/${repo}`}
  target="_blank"
>
  <header>
    <div class="titlebar-left">
      <div class="owner">
        <div class="avatar"></div>
        <div class="user">{owner}</div>
      </div>
      <div class="repo">{repo}</div>
    </div>
    <Icon icon="tabler:brand-github" width="1.5rem" height="1.5rem" />
  </header>

  <div class="description"></div>

  <footer>
    <div class="stars"></div>
    <div class="forks"></div>
    <div class="license"></div>
  </footer>
</a>

<style lang="scss">
  @use "sass:math";
  @use "../../styles/theme" as *;
  @use "../../styles/utils" as *;
  @use "../../styles/variants";

  a.card-github {
    @include transition();
    display: block;
    background-color: var(--license-block-bg);
    position: relative;
    margin: spacing(2) spacing(0);
    padding: spacing(4.5) spacing(4);
    color: var(--tw-prose-body);
    border-radius: $radius-xl2;
    text-decoration-thickness: 0px;
    text-decoration-line: none;

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
        gap: spacing(1);
        flex-flow: column nowrap;
        @include variants.md {
          gap: spacing(2);
          flex-flow: row nowrap;
        }

        .owner {
          font-weight: $font-weight-light;
          position: relative;
          display: flex;
          gap: spacing(2);
          align-items: center;
          flex-flow: row nowrap;

          .avatar {
            display: block;
            overflow: hidden;
            width: spacing(6);
            height: spacing(6);
            background: {
              color: var(--primary);
              size: cover;
            }
            border-radius: 50%;
          }

          @include after("/") {
            font-weight: $font-weight-normal;
            display: none;
            @include variants.md {
              display: block;
            }
          }
        }

        .repo {
          font-weight: $font-weight-bold;
        }
      }
    }

    .description {
      margin-bottom: spacing(3);
      @include font-size($text-base);
      font-weight: $font-weight-light;
      color: var(--tw-prose-body);
    }

    footer {
      display: flex;
      gap: spacing(6);
      color: var(--tw-prose-body);
      width: fit-content;
      flex-flow: row nowrap;
    }

    .stars,
    .forks,
    .license {
      font-weight: $font-weight-medium;
      @include font-size($text-sm);
      opacity: 90%;

      @include before(" ") {
        display: inline-block;
        width: 1.3em;
        height: 1.3em;
        margin-right: spacing(1);
        vertical-align: spacing(-1);
        background-color: var(--tw-prose-body);
        overflow: visible;
        @include transition(
          $properties: (
            background-color,
            background,
          )
        );
        font-size: inherit;
        mask-size: contain;
        mask-position: center;
        mask-repeat: no-repeat;
      }
    }

    .stars::before {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z'/%3E%3C/svg%3E");
    }

    .license::before {
      margin-right: spacing(2);
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 21H6a3 3 0 0 1-3-3v-1h10v2a2 2 0 0 0 4 0V5a2 2 0 1 1 2 2h-2m2-4H8a3 3 0 0 0-3 3v11M9 7h4m-4 4h4'/%3E%3C/svg%3E");
    }

    .forks::before {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' width='16' height='16' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Cpath d='M10 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0M5 6a2 2 0 1 0 4 0a2 2 0 1 0-4 0m10 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0'/%3E%3Cpath d='M7 8v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V8m-5 4v4'/%3E%3C/g%3E%3C/svg%3E");
    }
  }

  a.card-github.fetch-waiting {
    pointer-events: none;
    opacity: 70%;
    @include transition($properties: opacity);

    .description,
    footer,
    .avatar {
      background-color: var(--tw-prose-body);
      color: transparent;
      opacity: 50%;
      user-select: none;
      animation: pulsate 2s infinite linear;
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

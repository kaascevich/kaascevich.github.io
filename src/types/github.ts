/** A full GitHub repository. */
export type FullRepository = Repository & {
  template_repository?: Repository | null
  use_squash_pr_title_as_default?: boolean
  subscribers_count: number
  network_count: number
  organization?: User | null
  parent?: Repository | null
  source?: Repository | null
  code_of_conduct?: CodeOfConduct | null
  security_and_analysis?: {
    advanced_security?: {
      status?: "enabled" | "disabled" | null
    } | null
    /** Enable or disable Dependabot security updates for the repository. */
    dependabot_security_updates?: {
      /**
       * The enablement status of Dependabot security updates for the
       * repository.
       */
      status?: "enabled" | "disabled" | null
    } | null
    secret_scanning?: {
      status?: "enabled" | "disabled" | null
    } | null
    secret_scanning_push_protection?: {
      status?: "enabled" | "disabled" | null
    } | null
    secret_scanning_non_provider_patterns?: {
      status?: "enabled" | "disabled" | null
    } | null
    secret_scanning_ai_detection?: {
      status?: "enabled" | "disabled" | null
    } | null
  } | null

  /**
   * The custom properties that were defined for the repository. The keys are
   * the custom property names, and the values are the corresponding custom
   * property values.
   */
  custom_properties?: Record<string, unknown> | null
}

/** A GitHub user. */
export type User = {
  name?: string | null
  email?: string | null
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string | null
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  starred_at?: string | null
  user_view_type?: string | null
}

/** A repository on GitHub. */
export type Repository = {
  /** The unique identifier of the repository. */
  id: number
  node_id: string
  /** The name of the repository. */
  name: string
  full_name: string
  license: License | null
  forks: number
  permissions?: {
    admin: boolean
    pull: boolean
    triage?: boolean | null
    push: boolean
    maintain?: boolean | null
  } | null
  owner: User
  /** Whether the repository is private or public. */
  private: boolean
  html_url: string
  description: string | null
  fork: boolean
  url: string
  archive_url: string
  assignees_url: string
  blobs_url: string
  branches_url: string
  collaborators_url: string
  comments_url: string
  commits_url: string
  compare_url: string
  contents_url: string
  contributors_url: string
  deployments_url: string
  downloads_url: string
  events_url: string
  forks_url: string
  git_commits_url: string
  git_refs_url: string
  git_tags_url: string
  git_url: string
  issue_comment_url: string
  issue_events_url: string
  issues_url: string
  keys_url: string
  labels_url: string
  languages_url: string
  merges_url: string
  milestones_url: string
  notifications_url: string
  pulls_url: string
  releases_url: string
  ssh_url: string
  stargazers_url: string
  statuses_url: string
  subscribers_url: string
  subscription_url: string
  tags_url: string
  teams_url: string
  trees_url: string
  clone_url: string
  mirror_url: string | null
  hooks_url: string
  svn_url: string
  homepage: string | null
  language: string | null
  forks_count: number
  stargazers_count: number
  watchers_count: number
  /**
   * The size of the repository, in kilobytes.
   *
   * Size is calculated hourly. When a repository is initially created, the size
   * is 0.
   */
  size: number
  /** The default branch of the repository. */
  default_branch: string
  open_issues_count: number
  /**
   * Whether this repository acts as a template that can be used to generate new
   * repositories.
   */
  is_template?: boolean | null
  topics?: string[] | null
  /** Whether issues are enabled. */
  has_issues: boolean
  /** Whether projects are enabled. */
  has_projects: boolean
  /** Whether the wiki is enabled. */
  has_wiki: boolean
  has_pages: boolean
  /** Whether downloads are enabled. */
  has_downloads: boolean
  /** Whether discussions are enabled. */
  has_discussions?: boolean | null
  /** Whether the repository is archived. */
  archived: boolean
  /** Whether or not this repository is disabled. */
  disabled: boolean
  /** The repository visibility: public, private, or internal. */
  visibility?: "public" | "private" | "internal" | null
  pushed_at: string | null
  created_at: string | null
  updated_at: string | null
  /** Whether to allow rebase merges for pull requests. */
  allow_rebase_merge?: boolean | null
  temp_clone_token?: string | null
  /** Whether to allow squash merges for pull requests. */
  allow_squash_merge?: boolean | null
  /** Whether to allow auto-merge to be used on pull requests. */
  allow_auto_merge?: boolean | null
  /** Whether to delete head branches when pull requests are merged. */
  delete_branch_on_merge?: boolean | null
  /**
   * Whether or not a pull request head branch that is behind its base branch
   * can always be updated even if it is not required to be up to date before
   * merging.
   */
  allow_update_branch?: boolean | null
  /**
   * The default value for a squash merge commit title.
   *
   * - `PR_TITLE` - default to the pull request's title.
   * - `COMMIT_OR_PR_TITLE` - default to the commit's title (if only one commit)
   *   or the pull request's title (when more than one commit).
   */
  squash_merge_commit_title?: "PR_TITLE" | "COMMIT_OR_PR_TITLE" | null
  /**
   * The default value for a squash merge commit message.
   *
   * - `PR_BODY` - default to the pull request's body.
   * - `COMMIT_MESSAGES` - default to the branch's commit messages.
   * - `BLANK` - default to a blank commit message.
   */
  squash_merge_commit_message?: "PR_BODY" | "COMMIT_MESSAGES" | "BLANK" | null
  /**
   * The default value for a merge commit title.
   *
   * - `PR_TITLE` - default to the pull request's title.
   * - `MERGE_MESSAGE` - default to the classic title for a merge message (e.g.,
   *   Merge pull request #123 from branch-name).
   */
  merge_commit_title?: "PR_TITLE" | "MERGE_MESSAGE" | null
  /**
   * The default value for a merge commit message.
   *
   * - `PR_TITLE` - default to the pull request's title.
   * - `PR_BODY` - default to the pull request's body.
   * - `BLANK` - default to a blank commit message.
   */
  merge_commit_message?: "PR_BODY" | "PR_TITLE" | "BLANK" | null
  /** Whether to allow merge commits for pull requests. */
  allow_merge_commit?: boolean | null
  /** Whether to allow forking this repo. */
  allow_forking?: boolean | null
  /** Whether to require contributors to sign off on web-based commits */
  web_commit_signoff_required?: boolean | null
  open_issues: number
  watchers: number
  master_branch?: string | null
  starred_at?: string | null
  /** Whether anonymous git access is enabled for this repository. */
  anonymous_access_enabled?: boolean | null
}

/** A license. */
export type License = {
  key: string
  name: string
  url: string | null
  spdx_id: string | null
  node_id: string
  html_url?: string | null
}

/** A code of conduct. */
export type CodeOfConduct = {
  url: string
  key: string
  name: string
  html_url: string | null
}

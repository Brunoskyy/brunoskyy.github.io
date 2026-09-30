/**
 * The projects shown on the page, in order. Repo metadata (stars, language,
 * last push) is fetched from GitHub at build time and merged in; everything
 * written here is the part the API cannot know.
 */
export interface Project {
  /** GitHub repository name under Brunoskyy. */
  repo: string
  name: string
  description: string
  /** One sentence on the part worth reading. */
  interesting: string
  stack: string[]
  /** Public URL of a running instance, if any. */
  live?: string
  /** True while the repository is private. The card says so instead of linking. */
  private?: boolean
  /** True while still being built. */
  wip?: boolean
}

export const featured: Project[] = [
  {
    repo: 'switchboard',
    name: 'Switchboard',
    description:
      'Feature flags for several tenants at once: targeting rules, percentage rollouts per environment, roles that really restrict things, and an audit trail of who changed what.',
    interesting:
      'The evaluation engine never throws. A broken config degrades to the off variant, and the strictness lives on the write side instead.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Postgres', 'Prisma 7', 'Radix', '98 tests'],
  },
  {
    repo: 'git-retime',
    name: 'git-retime',
    description:
      'A command line tool that audits and repairs commit dates through git plumbing: wrong clocks, wrong zones, migrations from other systems, folders that were never versioned. Every rewrite has an undo.',
    interesting:
      'Objects are rewritten byte for byte except for the two date lines, and refs move in one transaction after the backup refs exist.',
    stack: ['TypeScript', 'Node', 'git plumbing', 'vitest', '76 tests'],
    private: true,
  },
  {
    repo: 'tandem',
    name: 'Tandem',
    description:
      'A realtime collaborative board. Several people on the same canvas with live cursors, presence and conflict-free edits.',
    interesting: 'In progress. The interesting part will be how concurrent edits converge.',
    stack: ['React', 'TypeScript', 'WebSockets'],
    wip: true,
  },
]

export interface OlderRepo {
  repo: string
  /** Shown instead of the GitHub description, which some of these never got. */
  description?: string
}

/**
 * Older public repositories listed under "Older work". Language and last push
 * come from GitHub at build time; the order here is the order on the page.
 *
 * TODO: revise this list after going through the old repositories.
 */
export const otherWork: OlderRepo[] = [
  {
    repo: 'Be-The-Hero',
    description:
      'Full app from a Rocketseat week: Node API, React web and React Native, for NGOs that rescue animals.',
  },
  { repo: 'jamstack', description: 'A blog on Next.js and a headless CMS, statically generated.' },
  {
    repo: 'svg-ceara_scale',
    description: 'An SVG map of Ceará with a scale, for infographics and charts.',
  },
  {
    repo: 'react-next-boilerplate',
    description: 'The Next.js starter I used before create-next-app caught up.',
  },
]

export const profile = {
  login: 'Brunoskyy',
  name: 'Artur Bruno',
  email: 'arturbrunoferreira@gmail.com',
  location: 'Fortaleza, Brazil',
  url: 'https://brunoskyy.github.io',
}

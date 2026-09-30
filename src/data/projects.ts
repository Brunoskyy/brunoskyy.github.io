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
      'A realtime board for retros and brainstorms: sticky notes, votes and live cursors for everyone with the link. People write in private first, then the board is revealed and the result exports as markdown.',
    interesting:
      'No CRDT library. Every change is an op, the server orders them, and each client replays its own unconfirmed ops on top of the confirmed state, so edits show up instantly and survive a dropped connection.',
    stack: ['React 19', 'TypeScript', 'WebSockets', 'Node 24', 'SQLite', '43 tests'],
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
 * Chosen for how much of the code is mine rather than a course's.
 */
export const otherWork: OlderRepo[] = [
  {
    repo: 'BankAppOficial',
    description:
      'A bank dashboard from a hiring challenge: login, transactions, a three-step payroll wizard, all against a mocked API.',
  },
  {
    repo: 'greenMile-Challenge',
    description:
      'Hiring test: look up a GitHub user, put their location on a map, list what they starred. React with Testing Library.',
  },
  {
    repo: 'jamstack',
    description: 'A blog on Next.js and Prismic, statically generated, with reading time.',
  },
  {
    repo: 'svg-ceara_scale',
    description:
      'A choropleth of Ceará in plain SVG and JavaScript: color the municipalities from a JSON file, get a legend for free.',
  },
]

export const profile = {
  login: 'Brunoskyy',
  name: 'Artur Bruno',
  email: 'arturbrunoferreira@gmail.com',
  location: 'Fortaleza, Brazil',
  url: 'https://brunoskyy.github.io',
}

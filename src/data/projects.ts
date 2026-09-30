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
  /** Small mark shown next to the title, under public/. */
  logo?: string
  /** A screenshot under public/, with its alt text. */
  image?: { src: string; alt: string; width: number; height: number }
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
    logo: '/projects/switchboard-logo.svg',
    image: {
      src: '/projects/switchboard.jpg',
      alt: 'The flags list in Switchboard, one row per flag with its state in each environment',
      width: 1400,
      height: 867,
    },
  },
  {
    repo: 'tandem',
    name: 'Tandem',
    description:
      'A realtime board for retros and brainstorms: sticky notes, votes and live cursors for everyone with the link. People write in private first, then the board is revealed and the result exports as markdown.',
    interesting:
      'No CRDT library. Every change is an op, the server orders them, and each client replays its own unconfirmed ops on top of the confirmed state, so edits show up instantly and survive a dropped connection.',
    stack: ['React 19', 'TypeScript', 'WebSockets', 'Node 24', 'SQLite', '52 tests'],
    logo: '/projects/tandem-logo.svg',
    image: {
      src: '/projects/tandem.jpg',
      alt: 'A Tandem board in the discussion phase, with colored notes, votes and a second person editing',
      width: 1280,
      height: 760,
    },
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
    repo: 'Be-The-Hero',
    description:
      'NGOs post incidents and people help: Express and SQLite API, React web app, an Expo client. An OmniStack week project, brought to current Node and Vite with tests.',
  },
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
    description:
      'A blog on Next.js and Prismic, statically generated, with reading time. Runs on fixtures without an account.',
  },
  {
    repo: 'rocketMarket',
    description:
      'A shopping cart with stock checks and persistence, from a Rocketseat challenge: moved to Vite and React 19, 23 tests.',
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

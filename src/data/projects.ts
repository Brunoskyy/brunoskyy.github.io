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
  /** Same shot in the dark theme, same size. Shown instead of `image` when the page is dark. */
  imageDark?: string
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
  {
    repo: 'cite',
    name: 'Cite',
    description:
      'Ask the TanStack Query docs a question and get a streamed answer where every claim links to the exact lines it came from. When the docs do not say, it says so instead of guessing.',
    interesting:
      'Retrieval is measured, not assumed: an eval set of 41 questions with known sources took recall@5 from 0.66 with keyword search to 0.90 with hybrid search and a local reranker.',
    stack: [
      'Next.js 16',
      'TypeScript',
      'Claude API',
      'pgvector',
      'Postgres full-text',
      'local embeddings',
      'evals',
    ],
    logo: '/projects/cite-logo.svg',
    image: {
      src: '/projects/cite.jpg',
      alt: 'Cite answering how to cancel a query, with numbered citations and the cited source lines highlighted',
      width: 1400,
      height: 988,
    },
    imageDark: '/projects/cite-dark.jpg',
  },
  {
    repo: 'hookline',
    name: 'Hookline',
    description:
      'Webhook delivery as a service: accept events, fan them out to subscriber endpoints, sign every request, retry with backoff, dead-letter what never lands, and show each attempt on a timeline.',
    interesting:
      'A Postgres queue on SELECT … FOR UPDATE SKIP LOCKED with leases, so a crashed worker’s deliveries come back on their own; the same interface runs on SQS in the AWS deployment.',
    stack: [
      'Python 3.13',
      'FastAPI',
      'SQLAlchemy 2',
      'Postgres',
      'htmx',
      'AWS Lambda + SQS',
      'Terraform',
      '106 tests',
    ],
    logo: '/projects/hookline-logo.svg',
    image: {
      src: '/projects/hookline.jpg',
      alt: 'A delivery in Hookline: two failed attempts with their backoff, then a 200, next to the signed payload',
      width: 1400,
      height: 897,
    },
    imageDark: '/projects/hookline-dark.jpg',
  },
  {
    repo: 'pulse',
    name: 'Pulse',
    description:
      'An uptime monitor in one Go binary: HTTP, TCP, DNS and certificate checks on a schedule, incidents that open and resolve on their own, and a public status page with 90 days of history.',
    interesting:
      'Uptime is weighted by time, not by probe count, so a burst of fast failures cannot outweigh hours of history, and a restart replays recent results instead of forgetting a failure streak.',
    stack: [
      'Go',
      'net/http',
      'SQLite (pure Go)',
      'html/template',
      'Prometheus',
      'AWS ECS Fargate',
      'Terraform',
      '61 tests',
    ],
    logo: '/projects/pulse-logo.svg',
    image: {
      src: '/projects/pulse.jpg',
      alt: 'The Pulse status page: overall status, then each service with a 90-day bar strip, uptime and p95 latency',
      width: 1280,
      height: 820,
    },
    imageDark: '/projects/pulse-dark.jpg',
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

export type DiagramStep = { label: string; note?: string }

/** A small diagram drawn in HTML: either a left-to-right flow or before/after rows. */
export type Diagram =
  | { kind: 'flow'; title: string; steps: DiagramStep[]; aside?: DiagramStep[] }
  | {
      kind: 'before-after'
      title: string
      rows: Array<{ before: DiagramStep; after: DiagramStep }>
    }

/** One client project inside a consultancy role. */
export interface Engagement {
  client: string
  period: string
  about: string
  highlights: string[]
  stack: string[]
  diagram?: Diagram
  links?: Array<{ label: string; href: string }>
  current?: boolean
}

export interface Experience {
  company: string
  product: string
  role: string
  /** What the product is, one sentence. */
  about: string
  /** What I did there, one or two sentences. */
  did?: string
  /** Free-form period; left out when not stated. */
  period?: string
  logo?: string
  /** A monogram to draw when there is no logo. */
  monogram?: string
  links: Array<{ label: string; href: string }>
  current?: boolean
  engagements?: Engagement[]
}

/** Places I've worked, most recent first. */
export const experience: Experience[] = [
  {
    company: 'FullstackLabs',
    product: 'Software consultancy',
    role: 'Senior fullstack engineer',
    period: 'Mar 2023 – now',
    about:
      'A consultancy that builds and modernizes software for US companies. I work on client teams, across the stack.',
    monogram: 'F',
    links: [{ label: 'fullstacklabs.co', href: 'https://www.fullstacklabs.co' }],
    current: true,
    engagements: [
      {
        client: 'Paciolan',
        period: '2024 – now',
        about:
          'Ticketing and fundraising software used by universities and venues across the United States.',
        highlights: [
          'Helped design the move from an Express monolith to NestJS microservices that talk over Kafka and cache in Redis.',
          'Led the migration of the API edge from Kong to AWS API Gateway, with the whole setup defined in Terraform.',
          'Rebuilding the back office: legacy UniVerse screens become React micro-frontends on Python APIs, keeping every rule the old system enforced.',
        ],
        stack: ['NestJS', 'Kafka', 'Redis', 'AWS API Gateway', 'Terraform', 'React', 'Python'],
        diagram: {
          kind: 'before-after',
          title: 'What changed',
          rows: [
            {
              before: { label: 'Kong', note: 'API edge' },
              after: { label: 'AWS API Gateway', note: 'Terraform' },
            },
            {
              before: { label: 'Express monolith' },
              after: { label: 'NestJS services', note: 'Kafka · Redis' },
            },
            {
              before: { label: 'UniVerse back office' },
              after: { label: 'React micro-frontends', note: 'Python APIs' },
            },
          ],
        },
        links: [{ label: 'paciolan.com', href: 'https://www.paciolan.com' }],
        current: true,
      },
      {
        client: 'Jointly',
        period: '2023 – 2024',
        about:
          'A California marketplace for cannabis products, where a chat helps each customer find the right product for what they need.',
        highlights: [
          'Built the storefront in Next.js on a Strapi CMS, mostly on the frontend, working closely with the Lambda backend.',
          'Worked on the recommendation chat: a GPT agent grounded in the company’s own product documents, run on AWS Lambda and streamed to the browser over WebSockets.',
          'Wired in Algolia for product recommendations and the Shopify integration.',
        ],
        stack: ['Next.js', 'Strapi', 'AWS Lambda', 'WebSockets', 'OpenAI', 'Algolia', 'Shopify'],
        diagram: {
          kind: 'flow',
          title: 'How a recommendation reached the customer',
          steps: [
            { label: 'Chat', note: 'Next.js' },
            { label: 'WebSocket' },
            { label: 'AWS Lambda' },
            { label: 'GPT agent', note: 'product documents' },
            { label: 'Recommendations', note: 'Algolia' },
          ],
          aside: [{ label: 'Catalog', note: 'Strapi · Shopify' }],
        },
      },
    ],
  },
  {
    company: 'meutudo',
    product: 'Credit app for CLT and INSS workers',
    role: 'Frontend and mobile developer',
    about:
      'A Brazilian fintech where people simulate and take FGTS advances, payroll loans and credit cards from their phone, without a branch or a phone call. Rated 4.2 by 39 thousand people on the App Store.',
    did: 'Frontend and mobile developer on the app and its web flows: the screens where someone finds out what they can borrow and gets to the end of the contract on their own.',
    logo: '/work/meutudo.png',
    links: [
      {
        label: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=br.com.meutudo',
      },
      {
        label: 'App Store',
        href: 'https://apps.apple.com/br/app/meutudo-empr%C3%A9stimos-clt-fgts/id1375736043',
      },
    ],
  },
  {
    company: 'GreenMile',
    product: 'Descartes GreenMile, last-mile logistics',
    role: 'Frontend developer',
    about:
      'A cloud platform for route planning and live tracking of deliveries, used by drivers, dispatchers and supervisors. Now part of Descartes.',
    did: 'Frontend developer on the web product, in React: the screens dispatchers and supervisors keep open all day.',
    monogram: 'G',
    links: [
      {
        label: 'descartes.com/greenmile',
        href: 'https://www.descartes.com/br/lp/descartes-greenmile',
      },
    ],
  },
]

export const profile = {
  login: 'Brunoskyy',
  name: 'Artur Bruno',
  email: 'arturbrunoferreira@gmail.com',
  linkedin: 'https://www.linkedin.com/in/artur-duarte-dev/',
  location: 'Fortaleza, Brazil',
  url: 'https://brunoskyy.github.io',
}

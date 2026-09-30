import Link from 'next/link'

import { ProjectCard } from '@/components/project-card'
import { RepoRow } from '@/components/repo-row'
import { Section } from '@/components/section'
import { featured, otherWork, profile } from '@/data/projects'
import { loadProjects, loadRepos } from '@/lib/github'

export default async function Home() {
  const [projects, repos] = await Promise.all([loadProjects(featured), loadRepos(otherWork)])
  const github = `https://github.com/${profile.login}`

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
      <a
        href="#featured"
        className="focus:bg-surface sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:px-3 focus:py-2"
      >
        Skip to projects
      </a>

      <header className="flex items-center justify-between py-6 text-sm">
        <Link href="/" className="font-medium">
          {profile.name}
        </Link>
        <nav aria-label="Sections">
          <ul className="text-muted flex gap-5">
            <li>
              <a href="#featured" className="hover:text-ink">
                Work
              </a>
            </li>
            <li>
              <a href="#other" className="hover:text-ink">
                Older
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-ink">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="pt-16 sm:pt-28" aria-labelledby="intro">
          <p className="text-muted mb-5 font-mono text-xs">
            Frontend engineer · {profile.location}
          </p>
          <h1
            id="intro"
            className="display max-w-[14ch] text-[2.6rem] leading-[1.02] text-balance sm:text-6xl"
          >
            Interfaces that hold up under load, and under review.
          </h1>
          <p className="text-muted mt-7 max-w-prose text-base leading-relaxed sm:text-lg">
            I work in React and TypeScript, mostly on the parts of a product where state gets
            awkward: permissions, rule builders, optimistic updates, tables that stay fast. The
            projects below are complete, tested and documented. Each has a line about the part worth
            reading.
          </p>
          <ul className="mt-8 flex gap-5 text-sm">
            <li>
              <a href={github} className="prose-link">
                GitHub
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className="prose-link">
                Email
              </a>
            </li>
          </ul>
        </section>

        <Section index="01" title="Featured" id="featured">
          <div className="border-line border-t">
            {projects.map((p) => (
              <ProjectCard key={p.repo} project={p} />
            ))}
          </div>
        </Section>

        <Section index="02" title="Older work" id="other">
          {repos.length > 0 ? (
            <ul className="border-line border-t">
              {repos.map((r) => (
                <RepoRow key={r.name} repo={r} />
              ))}
            </ul>
          ) : (
            <p className="text-muted text-sm">
              Older repositories are listed from GitHub at build time. See{' '}
              <a href={github} className="prose-link">
                the profile
              </a>{' '}
              in the meantime.
            </p>
          )}
          <p className="text-muted mt-4 text-sm">
            Earlier work from bootcamps and courses stays on{' '}
            <a href={`${github}?tab=repositories`} className="prose-link">
              the repositories page
            </a>
            , unedited. It shows where I started.
          </p>
        </Section>

        <Section index="03" title="Contact" id="contact">
          <p className="max-w-prose text-base leading-relaxed sm:text-lg">
            Open to frontend roles, remote or in Fortaleza. The quickest way is email:{' '}
            <a href={`mailto:${profile.email}`} className="prose-link">
              {profile.email}
            </a>
            .
          </p>
        </Section>
      </main>

      <footer className="border-line text-muted mt-24 flex flex-wrap justify-between gap-2 border-t pt-6 font-mono text-xs">
        <span>{profile.name}</span>
        <span>Static Next.js, built by GitHub Actions, served from GitHub Pages.</span>
      </footer>
    </div>
  )
}

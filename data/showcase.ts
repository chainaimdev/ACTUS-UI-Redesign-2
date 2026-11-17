/**
 * Content for the combined "Use cases · Projects · Winners" box on the home page.
 *
 * PLACEHOLDER content — every entry below is an intentionally empty slot.
 * Fill in `title`, `description` and `href` when real content is ready;
 * the components render a placeholder state for any field left empty.
 */

export type ShowcaseEntry = {
  id: string
  /** Leave empty to render the placeholder label. */
  title: string
  description: string
  /** Leave empty ('') to hide the "Read more" link. */
  href: string
}

export type ShowcaseSectionCopy = {
  eyebrow?: string
  title: string
  description?: string
}

export const useCasesSection: ShowcaseSectionCopy = {
  eyebrow: 'In practice',
  title: 'ACTUS Use cases',
}

export const useCaseItems: ShowcaseEntry[] = [
  { id: 'use-case-1', title: '', description: '', href: '' },
  { id: 'use-case-2', title: '', description: '', href: '' },
  { id: 'use-case-3', title: '', description: '', href: '' },
]

export const projectsSection: ShowcaseSectionCopy = {
  eyebrow: 'Community',
  title: 'ACTUS Projects',
}

export const projectItems: ShowcaseEntry[] = [
  { id: 'project-1', title: '', description: '', href: '' },
  { id: 'project-2', title: '', description: '', href: '' },
  { id: 'project-3', title: '', description: '', href: '' },
]

/* ---------- Winners carousel (inside the same box, below projects) ---------- */

export const winnersSection: ShowcaseSectionCopy = {
  title: 'Winners of ACTUS projects',
}

export type WinnerEntry = {
  id: string
  /** Mock dashboard banner drawn in the active theme's colours (see components/home/winner-banners.tsx). */
  banner: 'loan' | 'bond' | 'registry' | 'risk'
  /** Real banner image under /public (e.g. '/winners/team-alpha.jpg'). When set, it replaces the mock banner. */
  image: string
  /** Award line shown on the badge, e.g. "Winner · Lending". */
  award: string
  project: string
  team: string
  summary: string
  /** Event or edition the award came from. */
  edition: string
  /** Optional link to the project; leave '' for no link. */
  href: string
}

/**
 * SAMPLE DATA — fictional teams and projects for layout only.
 * Replace with the real winners before publishing.
 */
export const winnerItems: WinnerEntry[] = [
  {
    id: 'winner-1',
    banner: 'loan',
    image: '',
    award: 'Winner · Lending',
    project: 'Loan cash-flow engine',
    team: 'Team Alpha',
    summary: 'Generates every payment of an amortising loan from its ACTUS contract terms.',
    edition: 'ACTUS Hackathon (sample)',
    href: '',
  },
  {
    id: 'winner-2',
    banner: 'bond',
    image: '',
    award: 'Winner · Fixed income',
    project: 'Bond analytics dashboard',
    team: 'Team Beta',
    summary: 'Projects coupons and principal for a bond portfolio in one consistent view.',
    edition: 'ACTUS Hackathon (sample)',
    href: '',
  },
  {
    id: 'winner-3',
    banner: 'registry',
    image: '',
    award: 'Winner · Digital assets',
    project: 'Tokenised contract registry',
    team: 'Team Gamma',
    summary: 'Links on-chain assets to machine-readable ACTUS contract definitions.',
    edition: 'ACTUS Hackathon (sample)',
    href: '',
  },
  {
    id: 'winner-4',
    banner: 'risk',
    image: '',
    award: 'Winner · Risk',
    project: 'Scenario risk simulator',
    team: 'Team Delta',
    summary: 'Stress-tests contract cash flows under interest-rate scenarios.',
    edition: 'ACTUS Hackathon (sample)',
    href: '',
  },
]

/** Winners carousel autoplay settings. */
export const winnersCarousel = {
  autoplay: true,
  intervalMs: 4500,
}

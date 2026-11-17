/**
 * Gallery content.
 *
 * PLACEHOLDER content: titles and descriptions are generic stand-ins (no real
 * event names, dates or winners). Replace each entry with real material:
 *  - `image`: path under /public (e.g. '/gallery/hackathon-2026.jpg'). When empty,
 *    the card renders generated ACTUS tile artwork in the active theme's colours.
 *  - `href`:  link to the full post or event page. When empty, the card is not a link.
 */

export type GalleryCategoryId = 'hackathons' | 'announcements' | 'winners' | 'upcoming'

export const galleryCategories: { id: GalleryCategoryId; label: string; description: string }[] = [
  { id: 'hackathons', label: 'Hackathons', description: 'Recaps and highlights from ACTUS hackathons.' },
  {
    id: 'announcements',
    label: 'Announcements',
    description: 'News and updates about the ACTUS standard and its community.',
  },
  { id: 'winners', label: 'Previous Winners', description: 'Teams and projects recognised at past ACTUS events.' },
  { id: 'upcoming', label: 'Upcoming Events', description: 'What is coming up next across the ACTUS community.' },
]

export type GalleryItem = {
  id: string
  category: GalleryCategoryId
  title: string
  description: string
  /** Short meta line, e.g. a date or "Date TBA". */
  meta: string
  image: string
  href: string
  /** Layout hints for the "All" view: featured = 2×2 tile, wide = 2×1 tile. */
  featured?: boolean
  wide?: boolean
}

export const gallerySection = {
  eyebrow: 'Community',
  title: 'Gallery',
  description: 'Hackathons, announcements, past winners and what is coming next across the ACTUS community.',
  /** "Read more" button under the home-page gallery → dedicated gallery page. */
  readMore: { label: 'Read more', href: '/gallery' },
  /**
   * Items shown on the home page, in order. The first is the large primary card.
   * The /gallery page always shows every item.
   */
  homeItemIds: ['ann-1', 'ann-2', 'hack-1'],
}

/** Copy for the dedicated /gallery page. */
export const galleryPage = {
  metaTitle: 'Gallery | ACTUS',
  metaDescription:
    'Hackathons, announcements, previous winners and upcoming events from the ACTUS community.',
  eyebrow: 'ACTUS Community',
  title: 'Gallery',
  description:
    'Everything happening around the ACTUS standard in one place: hackathon highlights, announcements, the teams recognised at past events, and what is coming next.',
  backLabel: 'Go back to home page',
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'hack-1',
    category: 'hackathons',
    title: 'ACTUS hackathon highlights',
    description: 'Teams turning financial contracts into executable code with the ACTUS standard.',
    meta: 'Event recap',
    image: '',
    href: '',
    featured: true,
  },
  {
    id: 'up-1',
    category: 'upcoming',
    title: 'Next ACTUS hackathon',
    description: 'Registration details will be announced here.',
    meta: 'Date TBA',
    image: '',
    href: '',
  },
  {
    id: 'win-1',
    category: 'winners',
    title: 'Winning team spotlight',
    description: 'The top project from a past ACTUS hackathon.',
    meta: 'Past edition',
    image: '',
    href: '',
  },
  {
    id: 'ann-1',
    category: 'announcements',
    title: 'Standard update',
    description: 'Release notes and changes to the ACTUS specification.',
    meta: 'Announcement',
    image: '',
    href: '',
    wide: true,
  },
  {
    id: 'hack-2',
    category: 'hackathons',
    title: 'Build sprint showcase',
    description: 'Prototypes built on ACTUS contract types.',
    meta: 'Event recap',
    image: '',
    href: '',
  },
  {
    id: 'ann-2',
    category: 'announcements',
    title: 'Community news',
    description: 'News from the ACTUS foundation and its members.',
    meta: 'Announcement',
    image: '',
    href: '',
  },
  {
    id: 'win-2',
    category: 'winners',
    title: 'Honourable mentions',
    description: 'Standout entries recognised by the judges.',
    meta: 'Past edition',
    image: '',
    href: '',
  },
  {
    id: 'up-2',
    category: 'upcoming',
    title: 'Community webinar',
    description: 'A live session on applying the ACTUS standard.',
    meta: 'Date TBA',
    image: '',
    href: '',
  },
]

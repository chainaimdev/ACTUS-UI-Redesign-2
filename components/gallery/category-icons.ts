import { CalendarClock, Code2, Megaphone, Trophy, type LucideIcon } from 'lucide-react'
import type { GalleryCategoryId } from '@/data/gallery'

/** Icon per gallery category, shared by the home-page gallery and the /gallery page. */
export const categoryIcon: Record<GalleryCategoryId, LucideIcon> = {
  hackathons: Code2,
  announcements: Megaphone,
  winners: Trophy,
  upcoming: CalendarClock,
}

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { IconBadge } from '@/components/section'
import type { FeatureCard as FeatureCardData } from '@/data/home'
import { cn } from '@/lib/utils'

export function FeatureCard({ card, className }: { card: FeatureCardData; className?: string }) {
  return (
    <article className={cn('card-brand flex h-full flex-col p-7 md:p-9', className)}>
      <IconBadge icon={card.icon} size="lg" />
      <h3 className="mt-6 text-2xl">{card.title}</h3>
      <p className="mt-3 flex-1 leading-relaxed text-ink-muted">{card.description}</p>
      <Link
        href={card.cta.href}
        className="group mt-6 inline-flex w-fit items-center gap-1.5 rounded-md font-semibold text-brand hover:underline hover:underline-offset-4"
      >
        {card.cta.label}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        <span className="sr-only">{`: ${card.title}`}</span>
      </Link>
    </article>
  )
}

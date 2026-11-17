'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { ArrowRight, Pause, Play, Trophy } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { FadeUp } from '@/components/fade-up'
import { ShowcaseCard } from '@/components/home/showcase-card'
import { WinnerBanner } from '@/components/home/winner-banners'
import {
  projectItems,
  projectsSection,
  useCaseItems,
  useCasesSection,
  winnerItems,
  winnersCarousel,
  winnersSection,
  type ShowcaseSectionCopy,
  type WinnerEntry,
} from '@/data/showcase'
import { cn } from '@/lib/utils'

/* ---------- Shared sub-section heading inside the box ---------- */

function SubHeading({ id, copy }: { id: string; copy: ShowcaseSectionCopy }) {
  return (
    <div className="mb-8 max-w-2xl">
      {copy.eyebrow && (
        <p className="mb-2 text-sm font-semibold tracking-widest text-brand uppercase">{copy.eyebrow}</p>
      )}
      <h2 id={id} className="text-2xl md:text-3xl">
        {copy.title}
      </h2>
      <div className="divider-gradient mt-4" aria-hidden="true" />
      {copy.description && <p className="mt-4 text-ink-muted">{copy.description}</p>}
    </div>
  )
}

/* ---------- Winner card ---------- */

function WinnerCard({
  winner,
  index,
  total,
  active,
}: {
  winner: WinnerEntry
  index: number
  total: number
  active: boolean
}) {
  return (
    <article className="relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-[var(--footer-bg)] shadow-[0_24px_48px_-28px_rgb(var(--shadow-rgb)/0.45)] lg:block lg:h-[540px]">
      {/* Banner image: on top for phones/tablets, full-bleed behind the text on desktop */}
      <div className="relative h-64 shrink-0 overflow-hidden sm:h-80 lg:absolute lg:inset-0 lg:-z-20 lg:h-auto">
        <div
          className={cn(
            'h-full w-full transition-transform duration-[6000ms] ease-out motion-reduce:transition-none',
            active ? 'scale-[1.04]' : 'scale-100',
          )}
        >
          {winner.image ? (
            // eslint-disable-next-line @next/next/no-img-element -- images.unoptimized is set in next.config
            <img src={winner.image} alt="" className="h-full w-full object-cover" />
          ) : (
            <WinnerBanner banner={winner.banner} uid={winner.id} />
          )}
        </div>
        {/* phones/tablets: soft fade into the text panel */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,var(--footer-bg)_0%,transparent_35%)] lg:hidden"
        />
      </div>

      {/* desktop: left-side scrim behind the text */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,var(--footer-bg)_0%,var(--footer-bg)_28%,color-mix(in_srgb,var(--footer-bg)_70%,transparent)_38%,transparent_46%)] lg:block"
      />

      {/* Text */}
      <div className="flex flex-1 flex-col p-6 text-white sm:p-8 lg:h-full lg:max-w-[38%] lg:justify-center lg:p-12">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold backdrop-blur-sm">
            <Trophy className="size-4" aria-hidden="true" />
            {winner.award}
          </span>
          <span className="text-sm text-white/70">{`Winner ${index + 1} of ${total}`}</span>
        </div>
        <h3 className="mt-5 text-2xl text-white sm:text-3xl lg:text-4xl">{winner.project}</h3>
        <p className="mt-2 text-lg font-semibold text-[var(--logo-inverted-mid)]">{winner.team}</p>
        <p className="mt-4 leading-relaxed text-white/80">{winner.summary}</p>
        <p className="mt-6 text-xs font-semibold tracking-widest text-white/55 uppercase">{winner.edition}</p>
        {winner.href && (
          <Link
            href={winner.href}
            className="group mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[var(--footer-bg)]"
          >
            View project
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            <span className="sr-only">{`: ${winner.project}`}</span>
          </Link>
        )}
      </div>
    </article>
  )
}

/* ---------- Auto-sliding winners carousel ---------- */

function WinnersCarousel({
  autoplay = winnersCarousel.autoplay,
  intervalMs = winnersCarousel.intervalMs,
}: {
  autoplay?: boolean
  intervalMs?: number
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [selected, setSelected] = useState(0)
  const [snapCount, setSnapCount] = useState(0)
  const [playing, setPlaying] = useState(autoplay)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)

  // Respect reduced-motion: start paused, the visitor can still press play.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(false)
  }, [])

  useEffect(() => {
    if (!api) return
    const update = () => {
      setSnapCount(api.scrollSnapList().length)
      setSelected(api.selectedScrollSnap())
    }
    update()
    api.on('select', update)
    api.on('reInit', update)
    return () => {
      api.off('select', update)
      api.off('reInit', update)
    }
  }, [api])

  // Advance on a timer; pauses while hovered, focused, or the tab is hidden.
  useEffect(() => {
    if (!api || !playing || hovered || focused) return
    const id = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return
      // Wrap to the first winner when looping isn't possible (few slides on wide screens).
      if (api.canScrollNext()) api.scrollNext()
      else api.scrollTo(0)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [api, playing, hovered, focused, intervalMs])

  const togglePlay = useCallback(() => setPlaying((p) => !p), [])

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: 'start', loop: true }}
      aria-label="Winners of ACTUS projects"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false)
      }}
    >
      <CarouselContent className="-ml-5 py-2" aria-live={playing ? 'off' : 'polite'}>
        {winnerItems.map((winner, index) => (
          <CarouselItem
            key={winner.id}
            className="basis-full pl-5"
            aria-label={`${index + 1} of ${winnerItems.length}`}
          >
            <WinnerCard winner={winner} index={index} total={winnerItems.length} active={index === selected} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? 'Pause automatic sliding' : 'Start automatic sliding'}
            className="inline-flex size-11 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-brand hover:text-brand"
          >
            {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
          </button>
          <div className="flex items-center gap-2" role="group" aria-label="Choose slide">
            {Array.from({ length: snapCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === selected ? 'true' : undefined}
                className={cn(
                  'h-2.5 rounded-full transition-all',
                  i === selected ? 'bg-brand-gradient w-8' : 'w-2.5 bg-silver/50 hover:bg-silver',
                )}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <CarouselPrevious className="static size-11 translate-x-0 translate-y-0 rounded-full border-border text-ink hover:border-brand hover:text-brand" />
          <CarouselNext className="static size-11 translate-x-0 translate-y-0 rounded-full border-border text-ink hover:border-brand hover:text-brand" />
        </div>
      </div>
    </Carousel>
  )
}

/* ---------- The combined box ---------- */

export function ShowcaseHub() {
  return (
    <section id="showcase" aria-label="ACTUS use cases, projects and winners" className="scroll-mt-20 bg-surface py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="rounded-3xl border border-border bg-elevated shadow-[0_1px_3px_rgb(var(--shadow-rgb)/0.06),0_24px_48px_-32px_rgb(var(--shadow-rgb)/0.25)]">
            <div id="use-cases" aria-labelledby="use-cases-heading" role="region" className="scroll-mt-24 p-6 sm:p-8 lg:p-12">
              <SubHeading id="use-cases-heading" copy={useCasesSection} />
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {useCaseItems.map((entry, index) => (
                  <li key={entry.id}>
                    <ShowcaseCard entry={entry} index={index} placeholderLabel="Use case" />
                  </li>
                ))}
              </ul>
            </div>

            <div
              id="projects"
              aria-labelledby="projects-heading"
              role="region"
              className="scroll-mt-24 border-t border-border p-6 sm:p-8 lg:p-12"
            >
              <SubHeading id="projects-heading" copy={projectsSection} />
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projectItems.map((entry, index) => (
                  <li key={entry.id}>
                    <ShowcaseCard entry={entry} index={index} placeholderLabel="Project" />
                  </li>
                ))}
              </ul>
            </div>

            <div
              id="winners"
              aria-labelledby="winners-heading"
              role="region"
              className="scroll-mt-24 rounded-b-3xl border-t border-border bg-surface/60 p-6 sm:p-8 lg:p-12"
            >
              <SubHeading id="winners-heading" copy={winnersSection} />
              <WinnersCarousel />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

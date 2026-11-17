'use client'

/* eslint-disable @next/next/no-img-element -- images.unoptimized is set in next.config */
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { categoryIcon } from '@/components/gallery/category-icons'
import {
  galleryCategories,
  galleryItems,
  gallerySection,
  type GalleryCategoryId,
  type GalleryItem,
} from '@/data/gallery'
import { cn } from '@/lib/utils'

const categoryLabel = Object.fromEntries(galleryCategories.map((c) => [c.id, c.label])) as Record<
  GalleryCategoryId,
  string
>

/* ---------- Generated ACTUS tile artwork (used when an item has no image) ---------- */

function seededRandom(seed: string) {
  let h = 1779033703 ^ seed.length
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    return ((h ^= h >>> 16) >>> 0) / 4294967296
  }
}

const TILE_FILLS = ['var(--grad-from)', 'var(--grad-via)', 'var(--grad-to)', '#ffffff'] as const

/** Grid of rounded squares echoing the ACTUS logo mark; deterministic per item (SSR-safe). */
function TileArt({ seed }: { seed: string }) {
  const tiles = useMemo(() => {
    const rand = seededRandom(seed)
    const cols = 12
    const rows = 9
    const out: { x: number; y: number; fill: string; opacity: number; twinkle: boolean }[] = []
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        // Density rises toward the upper right so the composition reads as a lit corner.
        const weight = (x / cols) * 0.6 + (1 - y / rows) * 0.4
        if (rand() > weight * weight * 0.95) continue
        const pick = rand()
        const fill = pick < 0.12 ? TILE_FILLS[3] : TILE_FILLS[Math.min(2, Math.floor(rand() * 3))]
        out.push({
          x,
          y,
          fill,
          opacity: fill === TILE_FILLS[3] ? 0.1 + rand() * 0.15 : 0.35 + rand() * 0.6,
          twinkle: rand() < 0.18,
        })
      }
    }
    return out
  }, [seed])

  return (
    <svg viewBox="0 0 120 90" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      {tiles.map((t) => (
        <rect
          key={`${t.x}-${t.y}`}
          x={t.x * 10 + 1}
          y={t.y * 10 + 1}
          width="8"
          height="8"
          rx="1.6"
          style={{ fill: t.fill, opacity: t.opacity, animationDelay: `${(t.x + t.y) * 90}ms` }}
          className={t.twinkle ? 'gallery-twinkle' : undefined}
        />
      ))}
    </svg>
  )
}

/* ---------- Card ---------- */

export function GalleryCard({ item, large }: { item: GalleryItem; large: boolean }) {
  const Icon = categoryIcon[item.category]
  const isUpcoming = item.category === 'upcoming'

  const inner = (
    <>
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]">
        {item.image ? (
          <img src={item.image} alt="" className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="relative h-full w-full" style={{ background: 'var(--gallery-card-bg)' }}>
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(70% 70% at 85% 10%, color-mix(in srgb, var(--grad-to) 38%, transparent), transparent 70%)',
              }}
            />
            <TileArt seed={item.id} />
          </div>
        )}
      </div>
      {/* Legibility scrim + hover sheen */}
      <div aria-hidden="true" className="gallery-scrim absolute inset-0" />
      <div aria-hidden="true" className="gallery-sheen absolute inset-0" />

      <div className="relative flex h-full flex-col justify-between p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/25 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
            <Icon className="size-3.5" aria-hidden="true" />
            {categoryLabel[item.category]}
          </span>
          {item.href && (
            <span className="inline-flex size-9 translate-y-1 items-center justify-center rounded-full bg-white text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </span>
          )}
        </div>

        <div>
          <p className="flex items-center gap-2 text-xs font-semibold tracking-wider text-white/70 uppercase">
            {isUpcoming && (
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--gallery-accent)] opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-[var(--gallery-accent)]" />
              </span>
            )}
            {item.meta}
          </p>
          <h3
            className={cn(
              'mt-2 font-heading font-bold tracking-tight text-balance text-white',
              large ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl',
            )}
          >
            {item.title}
          </h3>
          <p
            className={cn(
              'mt-2 text-sm leading-relaxed text-white/75',
              large ? 'max-w-md' : 'line-clamp-2 max-h-0 opacity-0 transition-all duration-500 group-hover:max-h-12 group-hover:opacity-100 group-focus-within:max-h-12 group-focus-within:opacity-100',
            )}
          >
            {item.description}
          </p>
        </div>
      </div>
    </>
  )

  const cardClass = cn(
    'gallery-card group relative isolate block h-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_40px_-24px_rgb(0_0_0/0.6)] transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_30px_60px_-28px_rgb(0_0_0/0.75)]',
  )
  return item.href ? (
    <Link href={item.href} className={cardClass}>
      {inner}
    </Link>
  ) : (
    <article className={cardClass}>
      {inner}
    </article>
  )
}

/* ---------- Section ---------- */

export function Gallery() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Home page shows a curated subset, in order (first = primary/large card).
  // The full set lives on the /gallery page.
  const items = gallerySection.homeItemIds
    .map((id) => galleryItems.find((item) => item.id === id))
    .filter((item): item is GalleryItem => Boolean(item))

  return (
    <section
      id="gallery"
      ref={sectionRef}
      aria-labelledby="gallery-heading"
      className={cn('gallery-stage relative isolate scroll-mt-20 overflow-hidden py-16 text-white md:py-24', visible && 'is-visible')}
    >
      <div aria-hidden="true" className="gallery-backdrop pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="gallery-head max-w-2xl">
          <p className="mb-3 text-sm font-semibold tracking-widest text-[var(--gallery-accent)] uppercase">
            {gallerySection.eyebrow}
          </p>
          <h2 id="gallery-heading" className="text-4xl text-white md:text-5xl lg:text-6xl">
            {gallerySection.title}
          </h2>
          <div aria-hidden="true" className="gallery-rule mt-5 h-[3px] w-16 rounded-full" />
          <p className="mt-5 text-lg leading-relaxed text-pretty text-white/70">{gallerySection.description}</p>
        </div>

        <ul className="mt-10 grid auto-rows-[240px] grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14 lg:auto-rows-[230px] lg:grid-cols-3">
          {items.map((item, index) => {
            const primary = index === 0
            return (
              <li
                key={item.id}
                style={{ '--i': index } as React.CSSProperties}
                className={cn('gallery-item', primary && 'sm:col-span-2 sm:row-span-2 lg:col-span-2')}
              >
                <GalleryCard item={item} large={primary} />
              </li>
            )
          })}
        </ul>

        <div className="gallery-head mt-12 flex justify-center">
          <Link
            href={gallerySection.readMore.href}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[var(--footer-bg)] shadow-[0_10px_30px_-12px_rgb(255_255_255/0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-14px_rgb(255_255_255/0.6)]"
          >
            {gallerySection.readMore.label}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

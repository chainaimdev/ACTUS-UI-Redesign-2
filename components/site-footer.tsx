import Link from 'next/link'
import { ActusLogo } from '@/components/actus-logo'
import { NewsletterForm } from '@/components/newsletter-form'
import { footerColumns } from '@/data/navigation'
import { foundationInfo } from '@/data/home'

export function SiteFooter() {
  return (
    <footer className="bg-footer text-white">
      <div aria-hidden="true" className="h-1 w-full" style={{ backgroundImage: 'var(--brand-gradient)' }} />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <ActusLogo variant="foundation" tone="reverse" className="h-14 sm:h-16" />
            <p className="mt-4 max-w-sm leading-relaxed text-white/75">{foundationInfo.tagline}</p>
            <div className="mt-8">
              <h2 className="font-heading text-base font-semibold text-white">Sign up for news</h2>
              <NewsletterForm />
            </div>
          </div>

          <nav aria-label="Site map" className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="font-heading text-sm font-semibold tracking-wider text-white uppercase">{column.title}</h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="rounded-sm text-sm text-white/75 transition-colors hover:text-white focus-visible:outline-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/15 pt-8 text-sm text-white/70 sm:flex-row sm:justify-between">
          <p>{`© ${foundationInfo.copyrightYear} ${foundationInfo.name}`}</p>
          <p>{foundationInfo.location}</p>
        </div>
      </div>
    </footer>
  )
}

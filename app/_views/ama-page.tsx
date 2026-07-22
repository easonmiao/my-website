import type { Metadata } from 'next'

import { T } from '~/lib/i18n'
import { localeMetadata } from '~/lib/locale-metadata'
import type { Locale } from '~/lib/locale-route'
import { publicPageMetadata } from '~/lib/public-page-metadata'

export function amaPageMetadata(locale: Locale): Metadata {
  const copy = publicPageMetadata.ama[locale]
  return localeMetadata({ locale, path: '/ama', ...copy })
}

// The public route is disabled by proxy.ts until HooMee Coffee supplies an
// offering. This neutral fallback prevents upstream biography leakage if the
// component is rendered directly in development.
export function AmaPageView({ locale: _locale }: { locale: Locale }) {
  return (
    <div className="mx-auto w-full max-w-[37.5rem] px-6">
      <h1 className="page-eyebrow enter">
        <T zh="暂未开放" en="Not available yet" />
      </h1>
    </div>
  )
}


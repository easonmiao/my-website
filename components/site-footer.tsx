import { cacheLife } from 'next/cache'
import Link from 'next/link'

import { EmailCard } from '~/components/social-cards'
import { brailleText } from '~/lib/braille'
import { T } from '~/lib/i18n'
import { localePath, type Locale } from '~/lib/locale-route'
import { siteProfile } from '~/lib/site-profile'

function Tree({
  zh,
  en,
  children,
}: {
  zh: string
  en: string
  children: React.ReactNode
}) {
  return (
    <div className="footer-tree">
      <h2 className="footer-label">
        <T zh={zh} en={en} />
      </h2>
      <ul>{children}</ul>
    </div>
  )
}

async function CopyrightYear() {
  'use cache'
  cacheLife({ stale: 86_400, revalidate: 86_400, expire: 86_400 })
  return new Date().getFullYear()
}

export function SiteFooter({ locale = 'zh' }: {
  locale?: Locale
  social?: unknown
  github?: unknown
}) {
  return (
    <footer className="mx-auto mt-24 w-full max-w-[37.5rem] px-6 pb-24 text-sm text-muted-foreground sm:pb-12">
      <div className="hairline-top grid grid-cols-2 gap-x-6 gap-y-8 pt-8 sm:grid-cols-3">
        <Tree zh="联系" en="contact">
          <li>
            <EmailCard address={siteProfile.email} />
          </li>
        </Tree>
        <Tree zh="索引" en="index">
          <li>
            <Link href={localePath(locale, '/')} className="footer-tree-link">
              <T zh="首页" en="Home" />
            </Link>
          </li>
        </Tree>
        <div className="footer-colophon col-span-2 sm:order-first sm:col-span-1">
          <div>
            <p>© <CopyrightYear /> {siteProfile.name}</p>
            <p className="footer-braille" aria-hidden>
              {brailleText(siteProfile.nameBraille)}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

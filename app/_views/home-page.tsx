import { HomeIntroduction } from '~/components/home-introduction'
import { PixelCluster } from '~/components/pixel-cluster'
import type { Locale } from '~/lib/locale-route'
import { siteProfile } from '~/lib/site-profile'

export function HomePageView({ locale: _locale }: { locale: Locale }) {
  return (
    <div className="mx-auto w-full max-w-[37.5rem] px-6">
      <div className="enter max-w-[22rem]">
        <div className="flex items-center gap-2">
          <h1 className="text-base font-semibold tracking-tight text-foreground">
            {siteProfile.name}
          </h1>
          <PixelCluster variant={2} className="shrink-0" />
        </div>
        <div className="mt-4">
          <HomeIntroduction />
        </div>
      </div>
    </div>
  )
}


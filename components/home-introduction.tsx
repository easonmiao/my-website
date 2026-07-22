import { EmailCard } from '~/components/social-cards'
import { T } from '~/lib/i18n'
import { siteProfile } from '~/lib/site-profile'

export function HomeIntroduction() {
  return (
    <div className="home-introduction">
      <p className="text-sm leading-relaxed text-muted-foreground">
        <T
          zh={siteProfile.description.zh}
          en={siteProfile.description.en}
        />
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        <T zh="联系我：" en="Contact: " />
        <EmailCard
          address={siteProfile.email}
          trigger={siteProfile.email}
          triggerClassName="home-contact-link"
        />
      </p>
    </div>
  )
}


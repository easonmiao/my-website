import type { MetadataRoute } from 'next'

import { getAllPosts } from '~/lib/content'
import { localeRoutePair } from '~/lib/locale-metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  // newest first per getAllPosts — the site "changed" when the latest post landed
  const latest = posts[0]?.publishedAt

  const pairedEntry = (path: string, lastModified?: Date): MetadataRoute.Sitemap => {
    const pair = localeRoutePair(path)
    const alternates = { languages: pair.languages }

    return [
      { url: pair.zh.href, lastModified, alternates },
      { url: pair.en.href, lastModified, alternates },
    ]
  }

  const staticPages: MetadataRoute.Sitemap = [
    '/tech/',
    '/life/',
    '/pets/',
    '/about/',
    '/about/history/',
    '/memories/',
    '/tujie/',
    '/articles/ai-morning/2026-07-06/',
    '/articles/finance-morning/2026-07-06/',
    '/articles/tech-sharing/alphago/',
    '/articles/banking/city-and-finance/',
    '/articles/life/daily-notes/',
    '/articles/pets/banban-diary/',
  ].map((path) => ({
    url: `https://www.hoomee.cc${path}`,
    lastModified: new Date('2026-07-26'),
  }))

  return [
    ...pairedEntry('/', latest),
    ...staticPages,
  ]
}

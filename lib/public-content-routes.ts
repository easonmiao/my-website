// Publishing a post requires adding its directory slug here. The public-route
// proxy, post index, feeds, and sitemap all consume this explicit allowlist.
export const publishedPostSlugs: readonly string[] = []

export const archivedNewsletterIds: readonly string[] = []

export type ArchivedNewsletterId = (typeof archivedNewsletterIds)[number]

export function isPublishedPostSlug(slug: string) {
  return publishedPostSlugs.some((publishedSlug) => publishedSlug === slug)
}

export function isArchivedNewsletterId(
  id: string,
): id is ArchivedNewsletterId {
  return archivedNewsletterIds.some((knownId) => knownId === id)
}

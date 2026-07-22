import { HooMeeArticle } from '~/components/hoomee-site'
export default async function ArticlePage({ params }: { params: Promise<{ slug: string; date: string }> }) { const { slug, date } = await params; return <HooMeeArticle slug={slug} date={date} /> }

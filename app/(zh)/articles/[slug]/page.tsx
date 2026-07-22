import { HooMeeArticleIndex } from '~/components/hoomee-site'
export default async function ArticleIndexPage({ params }: { params: Promise<{ slug: string }> }) { return <HooMeeArticleIndex slug={(await params).slug} /> }

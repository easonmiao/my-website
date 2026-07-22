import { cacheLife } from 'next/cache'

import { buildChineseFeedXml } from '~/lib/feeds'

async function getChineseFeedXml() {
  'use cache'
  cacheLife('max')
  return buildChineseFeedXml()
}

export async function GET() {
  return new Response(await getChineseFeedXml(), {
    headers: { 'content-type': 'application/xml' },
  })
}


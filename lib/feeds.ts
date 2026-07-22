import RSS from 'rss'

import { getAllPosts } from './content'
import { seo, seoEn } from './seo'

export function buildChineseFeedXml() {
  const feed = new RSS({
    title: seo.title,
    description: seo.description,
    site_url: seo.url.href,
    feed_url: new URL('/feed.xml', seo.url).href,
    language: 'zh-CN',
    image_url: new URL('/icon.png', seo.url).href,
    generator: 'HooMee Coffee',
  })

  for (const post of getAllPosts()) {
    const url = new URL(`/blog/${post.slug}`, seo.url).href
    feed.item({
      title: post.title,
      guid: url,
      url,
      description: post.description ?? '',
      date: post.publishedAt,
      ...(post.cover && { enclosure: { url: new URL(post.cover.src, seo.url).href } }),
    })
  }

  return feed.xml()
}

export function buildEnglishFeedXml() {
  const siteUrl = new URL('/en', seoEn.url).href
  const feed = new RSS({
    title: seoEn.title,
    description: seoEn.description,
    site_url: siteUrl,
    feed_url: new URL('/feed.en.xml', seoEn.url).href,
    language: 'en-US',
    image_url: new URL('/icon.png', seoEn.url).href,
    generator: 'HooMee Coffee',
  })

  for (const post of getAllPosts()) {
    const url = new URL(`/en/blog/${post.slug}`, seoEn.url).href
    feed.item({
      title: post.titleEn,
      guid: url,
      url,
      description: post.descriptionEn,
      date: post.publishedAt,
      ...(post.cover && { enclosure: { url: new URL(post.cover.src, seoEn.url).href } }),
    })
  }

  return feed.xml()
}


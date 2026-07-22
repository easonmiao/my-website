import { siteProfile } from './site-profile'

export const publicPageMetadata = {
  home: {
    zh: {
      title: siteProfile.name,
      description: siteProfile.description.zh,
      ogDescription: siteProfile.description.zh,
    },
    en: {
      title: siteProfile.name,
      description: siteProfile.description.en,
      ogDescription: siteProfile.description.en,
    },
  },
  blog: {
    zh: {
      title: '写作',
      description: 'HooMee Coffee 的文章。',
    },
    en: {
      title: 'Writing',
      description:
        'Essays by HooMee Coffee.',
    },
  },
  photos: {
    zh: { title: '照片', description: 'HooMee Coffee 的照片。' },
    en: {
      title: 'Photos',
      description: 'Photos by HooMee Coffee.',
    },
  },
  projects: {
    zh: {
      title: '项目',
      description: 'HooMee Coffee 的项目。',
    },
    en: {
      title: 'Projects',
      description: 'Projects by HooMee Coffee.',
    },
  },
  ama: {
    zh: {
      title: '一对一',
      description: '暂未开放。',
    },
    en: {
      title: 'AMA',
      description: 'Not available yet.',
    },
  },
} as const

export type PublicSection = Exclude<keyof typeof publicPageMetadata, 'home'>

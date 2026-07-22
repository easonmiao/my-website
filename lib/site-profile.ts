export const siteProfile = {
  name: 'HooMee Coffee',
  nameBraille: 'hoomee coffee',
  email: 'emiiao@qq.com',
  url: 'https://www.hoomee.cc',
  description: {
    zh: 'HooMee Coffee 的个人网站。',
    en: 'The personal website of HooMee Coffee.',
  },
} as const

export const publicSections = {
  blog: true,
  photos: true,
  projects: true,
  ama: false,
} as const

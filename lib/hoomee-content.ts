export type HooMeeSection = 'tech' | 'life' | 'pets'

export const hoomeeSections = {
  tech: {
    label: '科技·资讯',
    title: '把技术变化，变成可行动的判断',
    description: 'AI、商业财经与效率工具的长期观察。每一次更新，都留下能继续使用的线索。',
    icon: '/hoomee/icons/emiao.png',
    hero: '/hoomee/tech/ai.jpeg',
    categories: [
      ['ai-morning', 'AI 早报', '模型、产品和工具更新。', '/hoomee/tech/ai-morning.png'],
      ['finance-morning', '商业财经早报', '宏观、银行和区域金融。', '/hoomee/tech/finance-morning.png'],
      ['tech-share', '科技分享', '效率工具、网页制作和工作流。', '/hoomee/tech/ai.jpeg'],
      ['bank-map', '银行图鉴', '银行经营的白话拆解。', '/hoomee/tech/bank.jpg'],
    ],
  },
  life: {
    label: '生活·记录',
    title: '把日常留在能被再次找到的地方',
    description: '居家、美食、影音和书籍，让普通的一天也有可回看的坐标。',
    icon: '/hoomee/icons/hannah.png',
    hero: '/hoomee/life/home.jpeg',
    categories: [
      ['life-note', '居家', '桌面、收纳、香气和光线。', '/hoomee/life/home.jpeg'],
      ['life-note', '美食', '咖啡、家常饭与城市小店。', '/hoomee/life/food.jpeg'],
      ['life-note', '影音', '电影、剧集和音乐记录。', '/hoomee/life/media.jpg'],
      ['life-note', '书籍', '读过、想读和反复翻开的书。', '/hoomee/life/study.jpg'],
    ],
  },
  pets: {
    label: '萌宠·探索',
    title: '把陪伴，认真存成日常',
    description: 'BanBan 的照片、状态和家里的小片段，不让可爱只停留在相册里。',
    icon: '/hoomee/icons/banban.png',
    hero: '/hoomee/pets/banban-04.jpg',
    categories: [
      ['banban-daily', 'BanBan 日常', '照片、状态和家里的陪伴片段。', '/hoomee/pets/banban-01.jpeg'],
      ['banban-daily', '小红书记录', '更多 BanBan 的外部记录。', '/hoomee/pets/banban-02.jpeg'],
    ],
  },
} as const

export type ArticleKey = 'ai-morning' | 'finance-morning' | 'tech-share' | 'bank-map' | 'life-note' | 'banban-daily'

export type ContentIssue = {
  date: string
  title: string
  description: string
  image: string
}

export const featureIssues: Record<ArticleKey, readonly ContentIssue[]> = {
  'ai-morning': [
    { date: '2026-07-06', title: '07-06 AI 早报｜模型、产品与智能体的新变化', description: '整理模型产品、数据中心、智能体和数字生活的重点变化。', image: '/hoomee/tech/ai-morning.png' },
    { date: '2026-07-03', title: '07-03 AI 早报｜Gemini Spark、Meta 云业务与 PorTAL', description: '从模型、云算力到应用入口，追踪本周的重要动向。', image: '/hoomee/tech/ai.jpeg' },
    { date: '2026-06-26', title: '06-26 AI 早报｜Apple 调整产品价格、Google Computer Use', description: '聚合端侧产品、工具和行业动态。', image: '/hoomee/tech/ai-morning.png' },
  ],
  'finance-morning': [
    { date: '2026-07-06', title: '07-06 商业财经早报｜利率、银行与区域金融', description: '用清楚的结构跟踪宏观、银行和企业经营。', image: '/hoomee/tech/finance-morning.png' },
    { date: '2026-06-26', title: '06-26 商业财经早报｜年中流动性与贵州银行化险', description: '央行流动性、海外通胀和地方金融改革线索。', image: '/hoomee/tech/finance-morning.png' },
  ],
  'tech-share': [
    { date: '2026-06-24', title: '从工具变化看实际工作流', description: '把效率工具、网页制作和设备经验拆成可复用的方法。', image: '/hoomee/tech/ai.jpeg' },
  ],
  'bank-map': [
    { date: '2026-06-20', title: '中国工商银行总行大楼，金融基础设施的现实坐标', description: '银行不只是资产负债表，也有组织、网点和城市空间。', image: '/hoomee/tech/bank.jpg' },
  ],
  'life-note': [
    { date: '2026-06-25', title: '把桌面重新留白，让一天开始得更轻', description: '让常用物品回到顺手的位置。', image: '/hoomee/life/home.jpeg' },
    { date: '2026-06-23', title: '咖啡、甜点和家常饭，构成可回看的日常', description: '把饭桌上的小片段留下来。', image: '/hoomee/life/food.jpeg' },
    { date: '2026-06-21', title: '电影和音乐不是背景音，是生活情绪的索引', description: '用短评记录当时的心境。', image: '/hoomee/life/media.jpg' },
  ],
  'banban-daily': [
    { date: '2026-07-06', title: 'BanBan 的照片、状态和家里的陪伴片段', description: '把可爱的表情和窗边的发呆整理成一组可回看的记录。', image: '/hoomee/pets/banban-01.jpeg' },
  ],
} as const

export const articleSections = {
  'ai-morning': ['AI 早报', '每天整理模型、产品和工具变化。'],
  'finance-morning': ['商业财经早报', '给早晨一份清楚的财经地图。'],
  'tech-share': ['科技分享', '设备、工具和自动化经验。'],
  'bank-map': ['银行图鉴', '用白话拆解银行经营。'],
  'life-note': ['生活记录', '把日常整理成可回看的生活索引。'],
  'banban-daily': ['BanBan 日常', '记录家里的陪伴片段。'],
} as const

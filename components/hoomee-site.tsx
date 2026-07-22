import Link from 'next/link'
import { notFound } from 'next/navigation'

import { articleSections, featureIssues, hoomeeSections, type ArticleKey, type ContentIssue, type HooMeeSection } from '~/lib/hoomee-content'

function Logo({ compact = false }: { compact?: boolean }) {
  return <img className={compact ? 'hm-logo hm-logo-compact' : 'hm-logo'} src={compact ? '/hoomee/logo/hoomee-icon.png' : '/hoomee/logo/hoomee-horizontal.png'} alt="HooMee Coffee" />
}

export function HooMeeHeader() {
  return <header className="hm-header">
    <Link href="/" className="hm-brand" aria-label="HooMee Coffee 首页"><Logo /></Link>
    <nav aria-label="主导航" className="hm-nav">
      <Link href="/tech">科技·资讯</Link><Link href="/life">生活·记录</Link><Link href="/pets">萌宠·探索</Link><Link href="/about">关于</Link>
    </nav>
  </header>
}

export function HooMeeFooter() {
  return <footer className="hm-footer"><div className="hm-footer-inner"><Logo /><p>认真收纳技术、生活和陪伴。</p><div><Link href="/tech">科技</Link><Link href="/life">生活</Link><Link href="/pets">萌宠</Link><Link href="/about">关于</Link></div><small>© 2026 HooMee Coffee</small></div></footer>
}

function SectionIntro({ section }: { section: HooMeeSection }) {
  const item = hoomeeSections[section]
  return <section className="hm-section-intro"><div><img src={item.icon} alt="" /><p>{item.label}</p><h1>{item.title}</h1><p className="hm-lead">{item.description}</p></div><img className="hm-section-hero" src={item.hero} alt="" /></section>
}

function CategoryCards({ section }: { section: HooMeeSection }) {
  const item = hoomeeSections[section]
  return <section className="hm-block"><div className="hm-kicker">EXPLORE</div><h2>从一个方向开始</h2><div className="hm-category-grid">{item.categories.map(([slug, title, description, image]) => <Link className="hm-category-card" href={`/articles/${slug}`} key={`${section}-${title}`}><img src={image} alt="" /><div><h3>{title}</h3><p>{description}</p><span>查看内容</span></div></Link>)}</div></section>
}

function RecentUpdates({ section }: { section: HooMeeSection }) {
  const categories = hoomeeSections[section].categories
  const issues: ContentIssue[] = categories.flatMap(([slug]) => featureIssues[slug as ArticleKey] ?? []).slice(0, 3)
  return <section className="hm-block"><div className="hm-kicker">RECENT UPDATES</div><h2>最近更新</h2><div className="hm-update-list">{issues.map((issue) => <Link href={`/articles/${section === 'pets' ? 'banban-daily' : section === 'life' ? 'life-note' : 'ai-morning'}/${issue.date}`} className="hm-update" key={issue.title}><div><time>{issue.date}</time><h3>{issue.title}</h3><p>{issue.description}</p><span>阅读全文</span></div><img src={issue.image} alt="" /></Link>)}</div></section>
}

export function HooMeeHome() {
  return <div className="hm-page"><section className="hm-home-hero"><div><Logo /><p className="hm-kicker">A QUIET PLACE FOR EVERYDAY CURIOSITY</p><h1>把在意的事，<br />慢慢存下来。</h1><p>HooMee Coffee 是 EMiAO、HannaH 和 BanBan 共同打理的中文个人网站。</p><div className="hm-home-actions"><Link href="/tech">探索内容</Link><Link href="/about">认识 HooMee</Link></div></div><img src="/hoomee/home/hero.jpg" alt="桌上的咖啡与日常" /></section><section className="hm-people"><Link href="/tech"><img src="/hoomee/icons/emiao.png" alt="" /><h2>EMiAO</h2><p>科技、商业与工具</p></Link><Link href="/life"><img src="/hoomee/icons/hannah.png" alt="" /><h2>HannaH</h2><p>居家、食物与文化</p></Link><Link href="/pets"><img src="/hoomee/icons/banban.png" alt="" /><h2>BanBan</h2><p>陪伴、日常与探索</p></Link></section><section className="hm-home-sections">{(Object.keys(hoomeeSections) as HooMeeSection[]).map((section) => { const item = hoomeeSections[section]; return <Link href={`/${section}`} className="hm-home-section" key={section}><img src={item.hero} alt="" /><div><img src={item.icon} alt="" /><p>{item.label}</p><h2>{item.title}</h2><span>进入栏目</span></div></Link> })}</section></div>
}

export function HooMeeSectionPage({ section }: { section: HooMeeSection }) { return <div className="hm-page"><SectionIntro section={section} /><CategoryCards section={section} /><RecentUpdates section={section} /></div> }

export function HooMeeArticleIndex({ slug }: { slug: string }) {
  if (!(slug in articleSections) || !(slug in featureIssues)) notFound()
  const [title, description] = articleSections[slug as ArticleKey]
  const issues = featureIssues[slug as ArticleKey]
  return <div className="hm-page hm-article-page"><section className="hm-article-index-head"><p className="hm-kicker">HOOMEE · CONTENT SERIES</p><h1>{title}</h1><p>{description}</p></section><section className="hm-block"><div className="hm-kicker">ISSUES</div><h2>每期内容</h2><div className="hm-issue-grid">{issues.map((issue) => <Link href={`/articles/${slug}/${issue.date}`} className="hm-issue-card" key={issue.date}><img src={issue.image} alt="" /><div><time>{issue.date}</time><h3>{issue.title}</h3><p>{issue.description}</p><span>打开本期</span></div></Link>)}</div></section></div>
}

export function HooMeeArticle({ slug, date }: { slug: string; date: string }) {
  if (!(slug in featureIssues)) notFound()
  const sectionSlug = slug as ArticleKey
  const issue = featureIssues[sectionSlug].find((item) => item.date === date) ?? featureIssues[sectionSlug][0]
  const [series] = articleSections[sectionSlug]
  return <article className="hm-page hm-reading"><nav aria-label="面包屑"><Link href="/">首页</Link><span>/</span><Link href={`/articles/${slug}`}>{series}</Link><span>/</span><span>{issue.date}</span></nav><header><time>{issue.date}</time><h1>{issue.title}</h1><p>{issue.description}</p><img src={issue.image} alt="" /></header><aside><strong>本期导航</strong><a href="#highlights">今日速览</a><a href="#details">重点内容</a><a href="#sources">来源与说明</a></aside><section id="highlights"><h2>今日速览</h2><ol><li>先看本期最重要的变化，再决定是否深入阅读原始信息。</li><li>每条信息保留来源与背景，方便在需要时继续验证。</li><li>内容按主题整理，阅读时可快速跳到自己关心的部分。</li></ol></section><section id="details"><h2>重点内容</h2><h3>值得继续跟进的变化</h3><p>这一期把零散的新闻放回更长的脉络中：产品、市场和使用方式并不会独立变化。真正重要的，是它们如何一起改变今天的工作和生活。</p><p>HooMee 的记录不追求把每一条信息都说完，而是尝试留下更清晰的判断入口。对想深入的读者，原始来源依然是最好的下一步。</p><h3>把信息变成下一步</h3><p>阅读后可以先记下一个问题：这件事会影响我的工具选择、工作流，还是仅仅值得被观察？这个小问题能帮助资讯从“看过”变成可行动的线索。</p></section><section id="sources"><h2>来源与说明</h2><p>本页由 HooMee 整理编辑；外部资讯以原始发布渠道为准。若有更新，会在本期页面持续补充。</p></section><nav className="hm-article-pagination"><Link href={`/articles/${slug}`}>返回系列</Link><Link href="/tech">继续探索科技·资讯</Link></nav></article>
}

export function HooMeeAbout() { return <div className="hm-page"><section className="hm-about-hero"><img src="/hoomee/icons/about.png" alt="" /><p className="hm-kicker">ABOUT HOOMEE</p><h1>一个认真收纳日常的地方。</h1><p>HooMee Coffee 由 EMiAO、HannaH 和 BanBan 共同打理。技术的变化、生活的细节与陪伴的片段，都值得拥有自己的位置。</p></section><section className="hm-block hm-about-grid"><div><h2>三位主理人</h2><p>EMiAO 记录科技与商业，HannaH 记录生活，BanBan 负责提醒大家：慢一点，也没关系。</p></div><img src="/hoomee/logo/hoomee-horizontal.png" alt="HooMee Coffee" /></section><section className="hm-block"><div className="hm-kicker">MILESTONES</div><h2>正在发生</h2><div className="hm-timeline"><div><strong>2026 · 现在</strong><p>围绕科技、生活与萌宠，逐步建立长期可回看的内容索引。</p></div><div><strong>下一步</strong><p>让每个栏目有更清晰的入口、更好读的详情页和更可靠的内容后台。</p></div></div></section></div> }

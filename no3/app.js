const observer=new IntersectionObserver((entries)=>entries.forEach((entry)=>{if(entry.isIntersecting)entry.target.classList.add('is-visible')}),{threshold:.03,rootMargin:'0px 0px -4% 0px'});
document.querySelectorAll('[data-reveal]').forEach((el)=>observer.observe(el));

const siteSearch=document.querySelector('.portrait-claim');
const siteSearchInput=siteSearch?.querySelector('input[type="search"]');
const siteSearchResults=document.querySelector('#site-search-results');
const sitePages=[
  {title:'HooMee 首页',description:'科技、生活与萌宠，共同写在这里。',url:'https://www.hoomee.cc/',keywords:'首页 hoomee coffee emiao hannah banban'},
  {title:'科技 · 资讯',description:'AI 早报、科技分享、商业财经与产品观察。',url:'https://www.hoomee.cc/tech/',keywords:'科技 资讯 ai 人工智能 早报 商业 财经 金融 银行 视频 播客 emiao'},
  {title:'生活 · 记录',description:'居家、美食、旅行、影音与书籍。',url:'https://www.hoomee.cc/life/',keywords:'生活 日常 居家 美食 旅行 电影 影音 阅读 书籍 hannah'},
  {title:'萌宠 · 探索',description:'BanBan 的照片、状态与陪伴片段。',url:'https://www.hoomee.cc/pets/',keywords:'萌宠 宠物 猫 banban 斑斑 日常 陪伴'},
  {title:'图解 · Tujie',description:'用图解读银行、商业与重要概念。',url:'https://www.hoomee.cc/tujie/',keywords:'图解 tujie 银行图鉴 金融 商业 数据 解释'},
  {title:'回忆 · Memories',description:'回看 HooMee 的过往内容与设计记录。',url:'https://www.hoomee.cc/memories/',keywords:'回忆 memories 档案 存档 旧版 历史 过去'},
  {title:'关于 HooMee',description:'认识 EMiAO、HannaH 和 BanBan。',url:'https://www.hoomee.cc/about/',keywords:'关于 主理人 团队 emiao hannah banban hoomee'}
];
let siteMatches=[];

function rankSitePages(rawQuery){
  const query=rawQuery.toLocaleLowerCase().replace(/\s+/g,' ').trim();
  if(!query)return [];
  const terms=query.split(' ');
  return sitePages.map((page,index)=>{
    const title=page.title.toLocaleLowerCase();
    const haystack=`${title} ${page.description.toLocaleLowerCase()} ${page.keywords}`;
    let score=terms.reduce((total,term)=>{
      if(title===term)return total+120;
      if(title.includes(term))return total+55;
      if(page.keywords.includes(term))return total+28;
      if(haystack.includes(term))return total+12;
      return total;
    },0);
    if(title===query)score+=180;
    return {...page,index,score};
  }).filter((page)=>page.score>0).sort((a,b)=>b.score-a.score||a.index-b.index);
}

function setSearchResults(matches,query){
  if(!siteSearchResults||!siteSearchInput)return;
  siteMatches=matches;
  siteSearchResults.replaceChildren();
  if(!query){
    siteSearchResults.hidden=true;
    siteSearchInput.setAttribute('aria-expanded','false');
    return;
  }
  if(matches.length===0){
    const empty=document.createElement('p');
    empty.className='portrait-search-results__empty';
    empty.textContent='没有找到匹配栏目，可以试试“科技”“生活”或“萌宠”。';
    siteSearchResults.append(empty);
  }else{
    matches.forEach((match,index)=>{
      const link=document.createElement('a');
      link.href=match.url;
      link.className='portrait-search-result';
      link.dataset.searchResult=String(index);
      const title=document.createElement('strong');
      title.textContent=match.title;
      const description=document.createElement('span');
      description.textContent=match.description;
      link.append(title,description);
      siteSearchResults.append(link);
    });
  }
  siteSearchResults.hidden=false;
  siteSearchInput.setAttribute('aria-expanded','true');
}

siteSearchInput?.addEventListener('input',()=>{
  const query=siteSearchInput.value.trim();
  setSearchResults(rankSitePages(query),query);
});
siteSearchInput?.addEventListener('keydown',(event)=>{
  if(event.key==='Escape'){
    setSearchResults([],'');
    return;
  }
  if(event.key==='ArrowDown'&&!siteSearchResults?.hidden){
    const first=siteSearchResults.querySelector('[data-search-result="0"]');
    if(first){
      event.preventDefault();
      first.focus();
    }
  }
});
siteSearchResults?.addEventListener('keydown',(event)=>{
  const links=[...siteSearchResults.querySelectorAll('[data-search-result]')];
  const current=links.indexOf(document.activeElement);
  if(event.key==='ArrowDown'&&current>-1){
    event.preventDefault();
    links[(current+1)%links.length]?.focus();
  }else if(event.key==='ArrowUp'&&current>-1){
    event.preventDefault();
    if(current===0)siteSearchInput?.focus();
    else links[current-1]?.focus();
  }else if(event.key==='Escape'){
    setSearchResults([],'');
    siteSearchInput?.focus();
  }
});
siteSearch?.addEventListener('submit',(event)=>{
  event.preventDefault();
  const query=siteSearchInput?.value.trim()||'';
  if(!query){
    siteSearchInput?.focus();
    return;
  }
  const matches=rankSitePages(query);
  setSearchResults(matches,query);
  if(matches[0])window.location.href=matches[0].url;
});

document.querySelectorAll('[data-accordion]').forEach((button)=>button.addEventListener('click',()=>{
  const item=button.closest('.faq-item');
  const open=item.classList.toggle('is-open');
  button.setAttribute('aria-expanded',String(open));
}));

const steps=document.querySelectorAll('[data-step]');
const stage=document.querySelector('.creation-stage');
steps.forEach((step)=>step.addEventListener('click',()=>{
  steps.forEach((item)=>{item.classList.remove('is-active');item.setAttribute('aria-selected','false')});
  step.classList.add('is-active');
  step.setAttribute('aria-selected','true');
  if(stage)stage.dataset.state=step.dataset.step;
}));

const balances=['$421.67','$1,250.00','2.14 ETH','$2,450.00'];
document.querySelectorAll('[data-balance-dot]').forEach((dot,index)=>dot.addEventListener('click',()=>{
  document.querySelectorAll('[data-balance-dot]').forEach((item)=>item.classList.remove('is-active'));
  dot.classList.add('is-active');
  const value=document.querySelector('[data-balance-value]');
  if(value)value.textContent=balances[index];
}));

const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');

function initPortraitAssembly(){
  const shell=document.querySelector('[data-assembly-shell]');
  const tiles=[...document.querySelectorAll('[data-assembly-tile]')];
  if(!shell||tiles.length===0)return;

  const poses={
    hiker:{x:.057,y:277,scale:.7,rotate:-6,z:4},
    dog:{x:.036,y:637,scale:.65,rotate:-15,z:3},
    women:{x:.959,y:266,scale:.6,rotate:12,z:5},
    gap:{x:.043,y:767,scale:.65,rotate:10,z:4},
    matcha:{x:.801,y:887,scale:.65,rotate:-8,z:4},
    article:{x:.884,y:857,scale:.75,rotate:6,z:3}
  };
  let offsets=new Map();
  let frame=0;

  function measure(){
    tiles.forEach((tile)=>{tile.style.transform='none'});
    const yScale=Math.min(1.18,Math.max(.85,window.innerHeight/1000));
    offsets=new Map(tiles.map((tile)=>{
      const pose=poses[tile.dataset.assemblyTile];
      const rect=tile.getBoundingClientRect();
      const targetX=rect.left+window.scrollX+rect.width/2;
      const targetY=rect.top+window.scrollY+rect.height/2;
      return [tile,{...pose,dx:window.innerWidth*pose.x-targetX,dy:pose.y*yScale-targetY}];
    }));
    render();
  }

  function render(){
    frame=0;
    const desktop=window.innerWidth>760;
    const progress=(!desktop||reducedMotion.matches)?1:Math.min(1,Math.max(0,window.scrollY/720));
    shell.style.setProperty('--assembly-progress',progress.toFixed(4));
    shell.classList.toggle('is-assembled',progress>.985);
    shell.classList.toggle('is-assembling',progress<=.985&&desktop&&!reducedMotion.matches);
    tiles.forEach((tile)=>{
      const pose=offsets.get(tile);
      if(!pose)return;
      const remaining=1-progress;
      tile.style.zIndex=progress>.98?'':String(pose.z);
      tile.style.transform=`translate3d(${(pose.dx*remaining).toFixed(2)}px,${(pose.dy*remaining).toFixed(2)}px,0) scale(${(pose.scale+(1-pose.scale)*progress).toFixed(4)}) rotate(${(pose.rotate*remaining).toFixed(3)}deg)`;
    });
  }

  function requestRender(){if(!frame)frame=requestAnimationFrame(render)}
  shell.classList.add('has-assembly');
  shell.classList.add('is-visible');
  measure();
  addEventListener('scroll',requestRender,{passive:true});
  addEventListener('resize',()=>requestAnimationFrame(measure),{passive:true});
  reducedMotion.addEventListener?.('change',measure);
}

function initFeatureCarousel(){
  const carousel=document.querySelector('[data-feature-carousel]');
  const track=carousel?.querySelector('[data-feature-track]');
  if(!carousel||!track)return;
  const originals=[...track.querySelectorAll('[data-feature-slide]')];
  const dots=[...carousel.querySelectorAll('[data-carousel-dot]')];
  const toggle=carousel.querySelector('[data-carousel-toggle]');
  if(originals.length<2)return;

  const lastClone=originals.at(-1).cloneNode(true);
  const firstClone=originals[0].cloneNode(true);
  lastClone.classList.remove('is-active');
  firstClone.classList.remove('is-active');
  lastClone.dataset.carouselClone='true';
  firstClone.dataset.carouselClone='true';
  lastClone.setAttribute('aria-hidden','true');
  firstClone.setAttribute('aria-hidden','true');
  track.prepend(lastClone);
  track.append(firstClone);
  let slides=[...track.querySelectorAll('[data-feature-slide]')];
  let physical=1;
  let logical=0;
  let timer=0;
  let manualPaused=false;
  const interval=3800;

  function position(animate=true){
    track.classList.toggle('is-snapping',!animate);
    const slide=slides[physical];
    const offset=carousel.clientWidth/2-(slide.offsetLeft+slide.offsetWidth/2);
    track.style.transform=`translate3d(${Math.round(offset)}px,0,0)`;
    originals.forEach((item,index)=>{
      item.classList.toggle('is-active',index===logical);
      item.setAttribute('aria-hidden',String(index!==logical));
    });
    dots.forEach((dot,index)=>{
      const active=index===logical;
      dot.classList.toggle('is-active',active);
      dot.setAttribute('aria-current',active?'true':'false');
      dot.setAttribute('aria-selected',String(active));
    });
  }

  function goTo(index,animate=true){
    logical=(index+originals.length)%originals.length;
    physical=logical+1;
    position(animate);
  }

  function advance(){
    logical=(logical+1)%originals.length;
    physical+=1;
    position(true);
  }

  function stop(){clearInterval(timer);timer=0}
  function start(){
    stop();
    if(!manualPaused&&!reducedMotion.matches&&!document.hidden)timer=setInterval(advance,interval);
  }

  track.addEventListener('transitionend',(event)=>{
    if(event.propertyName!=='transform')return;
    if(physical===slides.length-1){
      physical=1;
      requestAnimationFrame(()=>position(false));
    }else if(physical===0){
      physical=slides.length-2;
      requestAnimationFrame(()=>position(false));
    }
  });
  dots.forEach((dot,index)=>dot.addEventListener('click',()=>{goTo(index);start()}));
  toggle?.addEventListener('click',()=>{
    manualPaused=!manualPaused;
    toggle.classList.toggle('is-paused',manualPaused);
    toggle.textContent=manualPaused?'▶':'Ⅱ';
    toggle.setAttribute('aria-label',manualPaused?'Resume carousel':'Pause carousel');
    manualPaused?stop():start();
  });
  carousel.addEventListener('mouseenter',stop);
  carousel.addEventListener('mouseleave',start);
  carousel.addEventListener('focusin',stop);
  carousel.addEventListener('focusout',(event)=>{if(!carousel.contains(event.relatedTarget))start()});
  document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
  addEventListener('resize',()=>requestAnimationFrame(()=>position(false)),{passive:true});
  reducedMotion.addEventListener?.('change',start);
  requestAnimationFrame(()=>{position(false);requestAnimationFrame(start)});
}

initPortraitAssembly();
initFeatureCarousel();

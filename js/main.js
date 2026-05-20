/* js/main.js */

// 1. 动态注入导航栏和页脚
document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';

    // 自动判定当前高亮菜单
    const isActive = (target) => page.includes(target) || (target === 'index' && (page === 'index.html' || page === '')) ? 'active' : '';

    const navHTML = `
        <nav>
            <a href="index.html" class="nav-logo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                HooMee
            </a>
            <ul class="nav-links">
                <li><a href="index.html" class="${isActive('index')}">首页</a></li>
                <li><a href="info.html" class="${isActive('info')}">资讯</a></li>
                <li><a href="life.html" class="${isActive('life')}">生活</a></li>
                <li><a href="pet.html" class="${isActive('pet')}">萌宠</a></li>
                <li><a href="about.html" class="${isActive('about')}">关于</a></li>
                <li><button class="theme-toggle" onclick="toggleTheme()" id="theme-btn">日 · 夜</button></li>
            </ul>
            <button class="hamburger" onclick="openMenu()" aria-label="菜单">
                <span></span><span></span><span></span>
            </button>
        </nav>
        <div class="mobile-menu" id="mobileMenu">
            <button class="mobile-close" onclick="closeMenu()">✕</button>
            <a href="index.html" class="${isActive('index')}" onclick="closeMenu()">首页</a>
            <a href="info.html" class="${isActive('info')}" onclick="closeMenu()">资讯</a>
            <a href="life.html" class="${isActive('life')}" onclick="closeMenu()">生活</a>
            <a href="pet.html" class="${isActive('pet')}" onclick="closeMenu()">萌宠</a>
            <a href="about.html" class="${isActive('about')}" onclick="closeMenu()">关于</a>
            <button class="theme-toggle" onclick="toggleTheme(); closeMenu();" id="mobile-theme-btn" style="margin-top:2rem">日 · 夜</button>
        </div>
    `;

    const footerHTML = `
        <footer>
            <img src="images/EMiAO.png" class="footer-avatar" onerror="this.src='images/BanBan.png'">
            <p>© 2026 HooMee Coffee. All rights reserved.</p>
        </footer>
    `;

    const navPlaceholder = document.getElementById('nav-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if(navPlaceholder) navPlaceholder.innerHTML = navHTML;
    if(footerPlaceholder) footerPlaceholder.innerHTML = footerHTML;

    // 同步主题按钮文字
    updateThemeBtnText();

    // 如果是首页，初始化打字机特效
    if(document.getElementById('type-text')) {
        initTypewriter();
    }
});

// 2. 主题与菜单控制
function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeBtnText();
}

function updateThemeBtnText() {
    const isDark = document.documentElement.classList.contains('dark');
    const text = isDark ? '夜 · 日' : '日 · 夜';
    const btn = document.getElementById('theme-btn');
    const mbtn = document.getElementById('mobile-theme-btn');
    if (btn) btn.textContent = text;
    if (mbtn) mbtn.textContent = text;
}

// 移动端菜单
function openMenu() {
    document.getElementById('mobileMenu').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeMenu() {
    document.getElementById('mobileMenu').classList.remove('open');
    document.body.style.overflow = '';
}

// 3. 首页打字机逻辑 (完美实现头像、名字、背景色同步与无限循环)
function initTypewriter() {
    const names = ["EMiAO", "HannaH", "BanBan"];
    // 对应三位主理人的专属头像图片路径
    const avatars = ["images/EMiAO.png", "images/HannaH.png", "images/BanBan.png"];
    // 对应三位主理人的专属视觉背景色
    const avatarColors = ["#ff6b6b", "#4ecdc4", "#ffe66d"];
    
    let nameIndex = 0, charIndex = 0, isDeleting = false;
    const el = document.getElementById('type-text');
    const avatarBg = document.getElementById('avatar-bg');
    const avatarImg = document.getElementById('avatar-img'); // 获取首页头像元素
    const base = "I'm ";

    function typeLoop() {
        const fullText = base + names[nameIndex];
        
        if (isDeleting) {
            if (charIndex > base.length) {
                el.textContent = fullText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // 当名字退格完全删掉，在敲入下一个名字前一瞬间同步切换：
                isDeleting = false;
                nameIndex = (nameIndex + 1) % names.length; // 保证0,1,2无限循环
                charIndex = base.length;
                
                // 头像、背景色同步变幻
                if (avatarBg) avatarBg.style.background = avatarColors[nameIndex];
                if (avatarImg) {
                    avatarImg.src = avatars[nameIndex];
                    avatarImg.alt = names[nameIndex];
                }
                
                setTimeout(typeLoop, 500);
                return;
            }
        } else {
            el.textContent = fullText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let speed = isDeleting ? 80 : 150;
        if (!isDeleting && charIndex === fullText.length) {
            speed = 2000; // 名字完整打印后在屏幕上定格停留 2 秒
            isDeleting = true;
        }
        setTimeout(typeLoop, speed);
    }
    
    // 初始化首位主理人（EMiAO）状态
    el.textContent = base;
    charIndex = base.length;
    if (avatarBg) avatarBg.style.background = avatarColors[0];
    if (avatarImg) avatarImg.src = avatars[0];
    
    setTimeout(typeLoop, 800);
}
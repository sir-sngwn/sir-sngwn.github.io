/**
 * Main Application Script for Documentation Site
 * Handles: Theme toggle, Mobile sidebar, Table of Contents ScrollSpy, Instant Search Modal
 */

// Search Index Data
const SEARCH_INDEX = [
  {
    title: "AI 에이전트 문서 포털 홈",
    snippet: "에이전트 아키텍처, 프롬프트 엔지니어링 및 통합 도구 가이드",
    url: "index.html"
  },
  {
    title: "AI 에이전트 아키텍처",
    snippet: "Percept-Reason-Act 루프, 메모리 계층 및 멀티 에이전트 오케스트레이션",
    url: "docs/agent-architecture.html"
  },
  {
    title: "에이전트 프롬프트 엔지니어링",
    snippet: "시스템 프롬프트 구조화, XML 태그 활용법, 페르소나 및 제약조건",
    url: "docs/prompt-engineering.html"
  },
  {
    title: "도구 호출 및 MCP 연동",
    snippet: "Model Context Protocol (MCP) 표준, 도구 정의 및 실행 안전성",
    url: "docs/tool-calling-mcp.html"
  },
  {
    title: "C++ STL & 알고리즘 마스터리",
    snippet: "모던 C++ 컨테이너(vector, map), 반복자, 시간 복잡도 및 실전 알고리즘 패턴",
    url: "docs/cpp-mastery.html"
  },
  {
    title: "재활용 가능한 UI 컴포넌트",
    snippet: "콜아웃 알림창, 코드 블록, 탭, 스텝 가이드, 카드 및 뱃지 쇼케이스",
    url: "docs/reusable-components.html"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileSidebar();
  initScrollSpy();
  initSearchModal();
});

/**
 * 1. Theme Switcher (Light / Dark)
 */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('site-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      localStorage.setItem('site-theme', nextTheme);
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    if (theme === 'dark') {
      // Show sun icon when in dark mode
      themeIcon.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
    } else {
      // Show moon icon when in light mode
      themeIcon.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    }
  }
}

/**
 * 2. Mobile Sidebar & Drawer
 */
function initMobileSidebar() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  if (!menuBtn || !sidebar || !overlay) return;

  function toggleSidebar(open) {
    if (open) {
      sidebar.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  menuBtn.addEventListener('click', () => {
    const isOpen = sidebar.classList.contains('open');
    toggleSidebar(!isOpen);
  });

  overlay.addEventListener('click', () => {
    toggleSidebar(false);
  });
}

/**
 * 3. Table of Contents ScrollSpy
 */
function initScrollSpy() {
  const tocLinks = document.querySelectorAll('.toc-link');
  const headings = document.querySelectorAll('.content-body h2, .content-body h3');

  if (tocLinks.length === 0 || headings.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (!id) return;
        
        tocLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '0px 0px -70% 0px',
    threshold: 0.1
  });

  headings.forEach(heading => observer.observe(heading));
}

/**
 * 4. Instant Search Modal (Cmd+K / Ctrl+K)
 */
function initSearchModal() {
  const backdrop = document.getElementById('search-modal-backdrop');
  const triggers = document.querySelectorAll('.search-trigger');
  const input = document.getElementById('search-modal-input');
  const resultsContainer = document.getElementById('search-results-list');

  if (!backdrop || !input || !resultsContainer) return;

  function openSearch() {
    backdrop.classList.add('open');
    input.value = '';
    renderSearchResults('');
    setTimeout(() => input.focus(), 50);
  }

  function closeSearch() {
    backdrop.classList.remove('open');
    input.blur();
  }

  triggers.forEach(trigger => trigger.addEventListener('click', openSearch));

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeSearch();
  });

  // Keyboard shortcut listener
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (backdrop.classList.contains('open')) {
        closeSearch();
      } else {
        openSearch();
      }
    }
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closeSearch();
    }
  });

  // Instant filter on type
  input.addEventListener('input', (e) => {
    renderSearchResults(e.target.value.trim());
  });

  function renderSearchResults(query) {
    const q = query.toLowerCase();
    const filtered = SEARCH_INDEX.filter(item => {
      return !q || item.title.toLowerCase().includes(q) || item.snippet.toLowerCase().includes(q);
    });

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <li style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
          검색 결과가 없습니다.
        </li>
      `;
      return;
    }

    // Determine correct relative path from current location
    const isInsideDocs = window.location.pathname.includes('/docs/');
    
    resultsContainer.innerHTML = filtered.map(item => {
      let targetUrl = item.url;
      if (isInsideDocs) {
        if (targetUrl.startsWith('docs/')) {
          targetUrl = targetUrl.replace('docs/', '');
        } else if (targetUrl === 'index.html') {
          targetUrl = '../index.html';
        }
      } else {
        // At root
        if (!targetUrl.startsWith('docs/') && targetUrl !== 'index.html') {
          targetUrl = 'docs/' + targetUrl;
        }
      }

      return `
        <li>
          <a href="${targetUrl}" class="search-result-item">
            <div class="search-result-title">${item.title}</div>
            <div class="search-result-snippet">${item.snippet}</div>
          </a>
        </li>
      `;
    }).join('');
  }
}

# AgentDocs - AI 에이전트 엔지니어링 문서 포털

> 자율 AI 에이전트(Autonomous Agents) 아키텍처 설계, 프롬프트 엔지니어링, MCP(Model Context Protocol) 연동 및 재활용 UI 컴포넌트 킷을 제공하는 정적 문서 웹사이트입니다.

🌐 **웹사이트**: [https://sir-sngwn.github.io](https://sir-sngwn.github.io)

---

## ✨ 주요 특징

- **🎨 Modern Design System**: VitePress/Starlight 스타일의 깔끔한 글래스모피즘 헤더, 미려한 다크/라이트 모드 지원 (`localStorage` 및 시스템 설정 자동 감지).
- **🧩 재활용 컴포넌트 킷 (Reusable UI Kit)**:
  - 콜아웃 알림창 (Note, Tip, Important, Warning, Caution)
  - 원클릭 복사 지원 코드 블록 (Code Block with Copy)
  - 다중 탭 (Interactive Tabs)
  - 스텝별 타임라인 (Steps Timeline)
  - 에이전트 라이프사이클 상태 뱃지 (Pulsing Badges)
  - 접이식 아코디언 (Accordion/FAQ)
  - 카드 그리드 (Card Grids)
- **🔍 실시간 문서 검색 (Instant Search)**: <kbd>Cmd+K</kbd> / <kbd>Ctrl+K</kbd> 단축키로 주요 문서 및 컴포넌트 즉각 검색.
- **⚡ Zero Build Dependencies**: 외부 의존성(Node/npm/번들러) 없이 브라우저 표준(HTML5, CSS3, ES6+)만으로 구동되어 GitHub Pages에서 즉시 배포.

---

## 📂 디렉토리 구조

```
sir-sngwn.github.io/
├── index.html                 # 문서 포털 홈 & 빠른 시작
├── css/
│   ├── style.css              # 전역 테마 토큰, 레이아웃, 헤더, 사이드바, 반응형 스타일
│   └── components.css         # 재활용 컴포넌트 스타일 (콜아웃, 코드블록, 탭, 카드 등)
├── js/
│   ├── app.js                 # 다크모드, 실시간 검색 모달, 목차 ScrollSpy, 모바일 서랍
│   └── components.js          # 복사 버튼, 탭 전환, 컴포넌트 인터랙션
└── docs/
    ├── agent-architecture.html     # 에이전트 실행 루프 & 메모리 계층 문서
    ├── prompt-engineering.html    # 시스템 프롬프트 구조화 및 XML 템플릿
    ├── tool-calling-mcp.html      # 도구 호출 규격 및 MCP 프로토콜 가이드
    └── reusable-components.html   # 모든 UI 컴포넌트 실시간 프리뷰 & 복사 코드
```

---

## 🚀 로컬 미리보기

별도의 설치 과정 없이 Python 기본 HTTP 서버로 즉시 확인할 수 있습니다:

```bash
# 저장소 루트에서 실행
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000`으로 접속하여 확인합니다.

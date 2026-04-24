# StockBoard: 종합 주식 현황판 (Stock Dashboard)

"주식 투자의 첫걸음, 시장의 흐름을 한눈에 파악하는 것부터 시작하세요!"

**StockBoard**는 복잡한 시장 데이터와 기업의 재무 정보를 직관적이고 세련된 다크 모드 UI로 제공하는 초보자 친화적 주식 대시보드 웹 애플리케이션입니다. 환율부터 글로벌 주요 지수, 개별 기업의 핵심 지표까지 실시간(Yahoo Finance API 연동)으로 파악하여 현명한 투자 결정을 내릴 수 있도록 돕습니다.

---

## 🌟 주요 기능 (Features)

1. **실시간 트렌드 티커 (Market Ticker)**
   상단 스크롤 바를 통해 KOSPI, NASDAQ, S&P 500, USD/KRW(환율) 등의 글로벌 주요 지수와 지표를 실시간으로 모니터링합니다.

2. **카테고리별 주식 탐색**
   * **국내 주식:** 삼성전자, 현대차 등 시가총액 상위 종목
   * **해외 주식:** 애플(AAPL), 엔비디아(NVDA) 등 글로벌 테크 기업
   * **ETF:** KODEX, TIGER 등 인기 상장지수펀드 탐색 제공

3. **인터랙티브 주가 차트 (Interactive Charts)**
   `Recharts` 라이브러리를 활용하여 실시간 가격 흐름을 시각화합니다. (상승은 붉은색, 하락은 푸른색으로 표시되는 한국 거래소 테마를 반영했습니다.)

4. **핵심 재무제표 요약 - 기업 건강검진 (Fundamentals)**
   * **매출액 & 영업이익:** 최근 3년(2021~2023) 치 실적 백분율 바(Bar) 차트
   * **ROE (자기자본이익률):** 자본 대비 효율성을 보여주는 지표 표기
   * **PER (주가수익비율):** 업종 평균 대비 고평가/저평가 여부를 직관적인 프로그레스 바 형태로 시각화

5. **포트폴리오 & 커뮤니티 (Portfolio & Community)**
   * 자산 뷰, 관심 종목(Watchlist), 그리고 투자자 인사이트를 나눌 수 있는 게시판 레이아웃을 제공합니다.

---

## 🛠 기술 스택 (Tech Stack)

### **Frontend**
* **Framework:** React 19, TypeScript
* **Styling:** Tailwind CSS (다크 모드 및 Glassmorphism UI 적용)
* **Charts & Icons:** Recharts, Lucide React, Google Material Symbols
* **Bundler:** Vite
* **Routing:** React Router DOM

### **Backend & API**
* **Framework:** Node.js, Express
* **Data Source:** Yahoo! Finance API (데이터 페칭 프록시 서버 구현으로 CORS 이슈 해결)

---

## 🚀 시작하기 (Getting Started)

클라이언트(SPA) 서버와 API 프록시 서버가 Express + Vite Middleware 형태로 통합되어 있습니다.

### 1. 패키지 설치
```bash
npm install
# 또는
yarn install
```

### 2. 환경 변수 설정 (필요시)
루트 디렉토리에 `.env` 파일을 만들고 필요한 변수를 추가합니다. (템플릿: `.env.example`)

### 3. 개발 서버 실행
```bash
npm run dev
```
로컬호스트 [http://localhost:3000](http://localhost:3000) 에서 대시보드를 확인할 수 있습니다. 모든 변경 사항은 실시간으로 반영됩니다.

### 4. 프로덕션 빌드 및 실행
```bash
npm run build
npm start
```

---

## 📁 주요 프로젝트 구조

```
📦 StockBoard
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┗ 📂 layout        # 전역 Layout 및 Navigation
 ┃ ┣ 📂 lib             # 유틸리티 함수 (cn 등)
 ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📜 Home.tsx      # 메인 대시보드 (티커, 보유주식 요약)
 ┃ ┃ ┣ 📜 Detail.tsx    # 종목 상세페이지 (인터랙티브 차트 및 재무제표)
 ┃ ┃ ┣ 📜 Community.tsx # 투자자 커뮤니티 Mock UI
 ┃ ┃ ┗ 📜 Portfolio.tsx # 내 자산 및 포트폴리오 뷰
 ┃ ┣ 📜 App.tsx         # 메인 라우터 진입점
 ┃ ┣ 📜 index.css       # Tailwind CSS 전역 스타일 및 커스텀 테마 변수
 ┃ ┗ ...
 ┣ 📜 server.ts         # Express 백엔드 서버 (Yahoo Finance API 프록시)
 ┣ 📜 vite.config.ts    # Vite 번들러 설정
 ┗ 📜 package.json      # 프로젝트 의존성 및 스크립트
```

---

## 💡 디자인 원칙

* **Analytical Sophistication:** 정보의 밀도가 높은 금융 데이터를 다루기 때문에 명확한 윤곽과 가독성을 해치지 않도록 **Glassmorphism**(반투명 UI)과 섬세한 Tonal Layering을 사용했습니다.
* **사용성 중심의 색상:** 한국 주식 앱 표준(상승 시 레드 계열, 하락 시 블루 계열)을 따라 직관성을 높였습니다. 
* **모바일 퍼스트 (Responsive):** 데스크톱의 12-컬럼 그리드 뿐만 아니라, 모바일 환경에서는 하단 네비게이션(Bottom Nav)과 꽉 찬 레이아웃으로 최적의 경험을 제공합니다.

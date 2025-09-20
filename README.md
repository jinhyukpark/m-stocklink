# StockLink 📱

중권 데이터를 분석하는 모바일 증권 서비스입니다. Next.js와 Zustand를 사용하여 구축되었습니다.

## 🚀 주요 기능

### 📊 대시보드
- 공포탐욕지수 실시간 모니터링
- 실시간 차트 및 시장 현황
- 뜨는 카테고리 및 주가 등락률 분포
- 투자주체별 매수매도 비중 분석
- 이시간 뉴스 및 주요 지수 정보

### 📈 스톡 분석
- 테마별/산업분류별 종목 리스트
- 거래량, 거래대금, 시가총액, 등락률 기준 정렬
- 실시간 검색 및 즐겨찾기 기능
- 상세한 종목 정보 제공

### 🔗 관계뷰
- 증권 데이터 관계망 시각화
- 종목 간 연관성 분석
- 인터랙티브 네트워크 그래프

### ⚡ 모멘텀 (개발 예정)
- 모멘텀 지표 분석
- 트렌드 분석 및 신호 알림

### 👤 마이페이지
- 내 정보 관리 (닉네임, 이메일, 비밀번호)
- 알림 설정 (가격, 뉴스, 시장 알림)
- 결제 내역 및 구독 관리
- 프리미엄/프로 플랜 지원

## 🛠 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Heroicons (SVG)
- **PWA**: Web App Manifest

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── dashboard/          # 대시보드 페이지
│   ├── stocks/             # 스톡 페이지
│   ├── relationship/       # 관계뷰 페이지
│   ├── momentum/           # 모멘텀 페이지
│   ├── profile/            # 마이페이지
│   └── layout.tsx          # 루트 레이아웃
├── components/             # 재사용 가능한 컴포넌트
│   ├── MobileLayout.tsx    # 모바일 레이아웃
│   ├── Header.tsx          # 헤더 컴포넌트
│   ├── BottomNavigation.tsx # 하단 네비게이션
│   ├── Sidebar.tsx         # 사이드바
│   ├── LoadingSpinner.tsx  # 로딩 스피너
│   └── ToastContainer.tsx  # 토스트 컨테이너
├── stores/                 # Zustand 스토어
│   └── useAppStore.ts      # 전역 상태 관리
├── hooks/                  # 커스텀 훅
│   ├── useLocalStorage.ts  # 로컬 스토리지 훅
│   ├── useNetworkStatus.ts # 네트워크 상태 훅
│   └── useDebounce.ts      # 디바운스 훅
├── data/                   # 더미 데이터
│   └── mockData.ts         # 모의 데이터
├── types/                  # TypeScript 타입 정의
│   └── index.ts            # 공통 타입
├── utils/                  # 유틸리티 함수
│   └── index.ts            # 헬퍼 함수들
└── constants/              # 상수 정의
    └── index.ts            # 앱 상수들
```

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 3. 빌드

```bash
npm run build
```

### 4. 프로덕션 서버 실행

```bash
npm start
```

## 📱 모바일 최적화

- 터치 친화적인 UI
- iOS Safari safe area 지원
- PWA 설치 가능
- 반응형 디자인
- 최적화된 폰트 크기

## 🎨 테마 지원

- 라이트 테마
- 다크 테마
- 시스템 테마 (자동)

## 🔧 사용 가능한 스크립트

- `npm run dev` - 개발 서버 실행
- `npm run build` - 프로덕션 빌드
- `npm run start` - 프로덕션 서버 실행
- `npm run lint` - ESLint 실행
- `npm run lint:fix` - ESLint 자동 수정
- `npm run type-check` - TypeScript 타입 체크
- `npm run clean` - 빌드 파일 정리

## 📦 주요 패키지

- `next` - React 프레임워크
- `react` - UI 라이브러리
- `zustand` - 상태 관리
- `tailwindcss` - CSS 프레임워크
- `typescript` - 타입 안전성

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

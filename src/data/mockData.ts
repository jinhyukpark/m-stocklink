// 더미 데이터

// 공포탐욕지수
export const fearGreedIndex = {
  current: 45,
  previous: 38,
  level: '공포',
  description: '시장이 공포 상태에 있습니다.',
  trend: 'up' as 'up' | 'down' | 'stable'
}

// 실시간 차트 데이터
export const chartData = [
  { time: '09:00', value: 2456.78 },
  { time: '09:30', value: 2467.23 },
  { time: '10:00', value: 2458.91 },
  { time: '10:30', value: 2462.45 },
  { time: '11:00', value: 2459.67 },
  { time: '11:30', value: 2465.12 },
  { time: '12:00', value: 2468.34 },
  { time: '12:30', value: 2461.89 },
  { time: '13:00', value: 2457.56 },
  { time: '13:30', value: 2463.78 },
  { time: '14:00', value: 2467.45 },
  { time: '14:30', value: 2469.23 },
  { time: '15:00', value: 2471.67 },
  { time: '15:30', value: 2468.91 },
  { time: '16:00', value: 2465.34 },
]

// 뜨는 카테고리
export const trendingCategories = [
  { name: 'AI/반도체', change: 3.2, stocks: 45 },
  { name: '바이오/헬스케어', change: 2.8, stocks: 32 },
  { name: '신재생에너지', change: 2.1, stocks: 28 },
  { name: '금융', change: 1.9, stocks: 67 },
  { name: '화학', change: 1.5, stocks: 23 },
]

// 주가 등락률 분포
export const priceDistribution = {
  rise: { count: 456, percentage: 45.6 },
  fall: { count: 389, percentage: 38.9 },
  unchanged: { count: 155, percentage: 15.5 }
}

// 투자주체별 매수매도 비중
export const investorTrading = {
  individuals: { buy: 45.2, sell: 54.8 },
  institutions: { buy: 52.3, sell: 47.7 },
  foreigners: { buy: 48.9, sell: 51.1 },
  others: { buy: 50.1, sell: 49.9 }
}

// 이시간 뉴스
export const news = [
  {
    id: '1',
    title: '삼성전자, 3분기 실적 발표...매출 67조원 기록',
    time: '14:30',
    category: '실적',
    impact: 'positive' as 'positive' | 'negative' | 'neutral'
  },
  {
    id: '2',
    title: '미국 연준, 기준금리 동결 결정',
    time: '14:15',
    category: '금리',
    impact: 'positive' as 'positive' | 'negative' | 'neutral'
  },
  {
    id: '3',
    title: '중국 경제지표 부진...수출 감소 우려',
    time: '13:45',
    category: '경제',
    impact: 'negative' as 'positive' | 'negative' | 'neutral'
  },
  {
    id: '4',
    title: 'AI 반도체 수요 급증...SK하이닉스 주가 상승',
    time: '13:20',
    category: '산업',
    impact: 'positive' as 'positive' | 'negative' | 'neutral'
  }
]

// 주요 지수들
export const indices = [
  { name: 'KOSPI', value: 2456.78, change: -12.34, changeRate: -0.50 },
  { name: 'KOSDAQ', value: 789.12, change: 5.67, changeRate: 0.72 },
  { name: 'S&P 500', value: 4321.45, change: 23.67, changeRate: 0.55 },
  { name: '나스닥', value: 13456.78, change: -45.23, changeRate: -0.33 },
  { name: '다우존스', value: 34567.89, change: 123.45, changeRate: 0.36 }
]

// 스톡 데이터
export const stocks = [
  {
    id: '1',
    name: '삼성전자',
    code: '005930',
    price: 71500,
    change: 1500,
    changeRate: 2.14,
    volume: 12345678,
    amount: 882345678900,
    marketCap: 4270000000000000,
    category: 'theme',
    theme: 'AI/반도체',
    industry: '전자부품',
    isFavorite: false
  },
  {
    id: '2',
    name: 'SK하이닉스',
    code: '000660',
    price: 123000,
    change: -2000,
    changeRate: -1.60,
    volume: 5678901,
    amount: 698765432100,
    marketCap: 890000000000000,
    category: 'theme',
    theme: 'AI/반도체',
    industry: '반도체',
    isFavorite: true
  },
  {
    id: '3',
    name: 'LG화학',
    code: '051910',
    price: 456000,
    change: 12000,
    changeRate: 2.70,
    volume: 2345678,
    amount: 1069876543210,
    marketCap: 320000000000000,
    category: 'theme',
    theme: '신재생에너지',
    industry: '화학',
    isFavorite: false
  },
  {
    id: '4',
    name: 'NAVER',
    code: '035420',
    price: 234000,
    change: 3000,
    changeRate: 1.30,
    volume: 3456789,
    amount: 809876543210,
    marketCap: 380000000000000,
    category: 'theme',
    theme: 'AI/반도체',
    industry: 'IT서비스',
    isFavorite: true
  },
  {
    id: '5',
    name: '카카오',
    code: '035720',
    price: 45600,
    change: -1200,
    changeRate: -2.57,
    volume: 4567890,
    amount: 208765432109,
    marketCap: 95000000000000,
    category: 'theme',
    theme: 'AI/반도체',
    industry: 'IT서비스',
    isFavorite: false
  },
  {
    id: '6',
    name: '현대차',
    code: '005380',
    price: 234000,
    change: 5000,
    changeRate: 2.18,
    volume: 1234567,
    amount: 289012345678,
    marketCap: 500000000000000,
    category: 'industry',
    theme: '자동차',
    industry: '자동차',
    isFavorite: false
  },
  {
    id: '7',
    name: 'POSCO홀딩스',
    code: '005490',
    price: 456000,
    change: -8000,
    changeRate: -1.72,
    volume: 789012,
    amount: 359876543210,
    marketCap: 130000000000000,
    category: 'industry',
    theme: '철강',
    industry: '철강',
    isFavorite: false
  },
  {
    id: '8',
    name: '셀트리온',
    code: '068270',
    price: 178000,
    change: 3000,
    changeRate: 1.71,
    volume: 2345678,
    amount: 417654321098,
    marketCap: 120000000000000,
    category: 'theme',
    theme: '바이오/헬스케어',
    industry: '제약',
    isFavorite: true
  }
]

// 테마별 분류
export const themes = [
  'AI/반도체',
  '바이오/헬스케어',
  '신재생에너지',
  '금융',
  '화학',
  '자동차',
  '철강',
  'IT서비스'
]

// 산업별 분류
export const industries = [
  '전자부품',
  '반도체',
  '화학',
  'IT서비스',
  '자동차',
  '철강',
  '제약',
  '금융'
]

// 정렬 옵션
export const sortOptions = [
  { value: 'volume', label: '거래량' },
  { value: 'amount', label: '거래대금' },
  { value: 'marketCap', label: '시가총액' },
  { value: 'changeRate', label: '등락률' }
]

// 사용자 정보
export const userInfo = {
  id: '1',
  nickname: '투자왕',
  email: 'investor@example.com',
  subscription: 'premium' as 'free' | 'premium' | 'pro',
  avatar: '',
  joinDate: '2024-01-15',
  lastLogin: '2024-12-19'
}

// 알림 설정
export const notificationSettings = {
  priceAlerts: true,
  newsAlerts: true,
  marketAlerts: true,
  pushNotifications: true,
  emailNotifications: false,
  smsNotifications: false
}

// 결제 내역
export const paymentHistory = [
  {
    id: '1',
    date: '2024-12-01',
    item: '프리미엄 구독 (1개월)',
    amount: 9900,
    status: 'completed' as 'completed' | 'pending' | 'failed'
  },
  {
    id: '2',
    date: '2024-11-01',
    item: '프리미엄 구독 (1개월)',
    amount: 9900,
    status: 'completed' as 'completed' | 'pending' | 'failed'
  },
  {
    id: '3',
    date: '2024-10-01',
    item: '프리미엄 구독 (1개월)',
    amount: 9900,
    status: 'completed' as 'completed' | 'pending' | 'failed'
  }
]

// AI 종목 추천 데이터
export const aiStockRecommendations = [
  {
    id: '1',
    code: '200230',
    name: '텔콘RF제약',
    currentPrice: 1332,
    change: 17,
    changeRate: 1.3,
    aiScore: 9.5,
    marketComparison: {
      '10일': 0.01,
      '20일': -3.65
    },
    stockStrength: {
      '10일': {
        upwardElasticity: 0.77,
        downwardDefense: -5.00
      },
      '20일': {
        upwardElasticity: 0.77,
        downwardDefense: -5.02
      }
    },
    chartData: [
      { date: '09-01', price: 1200 },
      { date: '09-02', price: 1220 },
      { date: '09-03', price: 1180 },
      { date: '09-04', price: 1250 },
      { date: '09-05', price: 1280 },
      { date: '09-06', price: 1300 },
      { date: '09-07', price: 1320 },
      { date: '09-08', price: 1315 },
      { date: '09-09', price: 1332 }
    ],
    isFavorite: false
  },
  {
    id: '2',
    code: '005930',
    name: '삼성전자',
    currentPrice: 71200,
    change: 1200,
    changeRate: 1.7,
    aiScore: 8.2,
    marketComparison: {
      '10일': 2.15,
      '20일': 1.85
    },
    stockStrength: {
      '10일': {
        upwardElasticity: 1.25,
        downwardDefense: -2.30
      },
      '20일': {
        upwardElasticity: 0.95,
        downwardDefense: -3.15
      }
    },
    chartData: [
      { date: '09-01', price: 68000 },
      { date: '09-02', price: 68500 },
      { date: '09-03', price: 69000 },
      { date: '09-04', price: 69500 },
      { date: '09-05', price: 70000 },
      { date: '09-06', price: 70500 },
      { date: '09-07', price: 71000 },
      { date: '09-08', price: 70800 },
      { date: '09-09', price: 71200 }
    ],
    isFavorite: true
  },
  {
    id: '3',
    code: '000660',
    name: 'SK하이닉스',
    currentPrice: 125000,
    change: -2500,
    changeRate: -1.96,
    aiScore: 7.8,
    marketComparison: {
      '10일': -1.25,
      '20일': 0.45
    },
    stockStrength: {
      '10일': {
        upwardElasticity: 0.45,
        downwardDefense: -3.20
      },
      '20일': {
        upwardElasticity: 0.85,
        downwardDefense: -2.80
      }
    },
    chartData: [
      { date: '09-01', price: 128000 },
      { date: '09-02', price: 127500 },
      { date: '09-03', price: 126000 },
      { date: '09-04', price: 125500 },
      { date: '09-05', price: 126500 },
      { date: '09-06', price: 127000 },
      { date: '09-07', price: 126800 },
      { date: '09-08', price: 125500 },
      { date: '09-09', price: 125000 }
    ],
    isFavorite: false
  },
  {
    id: '4',
    code: '035420',
    name: 'NAVER',
    currentPrice: 185000,
    change: 3500,
    changeRate: 1.93,
    aiScore: 8.9,
    marketComparison: {
      '10일': 3.25,
      '20일': 2.15
    },
    stockStrength: {
      '10일': {
        upwardElasticity: 1.85,
        downwardDefense: -1.95
      },
      '20일': {
        upwardElasticity: 1.45,
        downwardDefense: -2.25
      }
    },
    chartData: [
      { date: '09-01', price: 175000 },
      { date: '09-02', price: 178000 },
      { date: '09-03', price: 180000 },
      { date: '09-04', price: 182000 },
      { date: '09-05', price: 183500 },
      { date: '09-06', price: 184000 },
      { date: '09-07', price: 185500 },
      { date: '09-08', price: 184500 },
      { date: '09-09', price: 185000 }
    ],
    isFavorite: true
  },
  {
    id: '5',
    code: '207940',
    name: '삼성바이오로직스',
    currentPrice: 890000,
    change: 15000,
    changeRate: 1.71,
    aiScore: 9.1,
    marketComparison: {
      '10일': 4.25,
      '20일': 3.85
    },
    stockStrength: {
      '10일': {
        upwardElasticity: 2.15,
        downwardDefense: -1.25
      },
      '20일': {
        upwardElasticity: 1.95,
        downwardDefense: -1.85
      }
    },
    chartData: [
      { date: '09-01', price: 850000 },
      { date: '09-02', price: 860000 },
      { date: '09-03', price: 865000 },
      { date: '09-04', price: 870000 },
      { date: '09-05', price: 875000 },
      { date: '09-06', price: 880000 },
      { date: '09-07', price: 885000 },
      { date: '09-08', price: 888000 },
      { date: '09-09', price: 890000 }
    ],
    isFavorite: false
  }
]

// 구독 플랜
export const subscriptionPlans = [
  {
    id: 'free',
    name: '무료',
    price: 0,
    features: ['기본 주식 정보', '일일 차트', '뉴스 알림'],
    popular: false
  },
  {
    id: 'premium',
    name: '프리미엄',
    price: 9900,
    features: ['실시간 데이터', '고급 차트', '알림 설정', '관심종목 관리'],
    popular: true
  },
  {
    id: 'pro',
    name: '프로',
    price: 19900,
    features: ['모든 프리미엄 기능', 'AI 분석', '전문가 리포트', '우선 고객지원'],
    popular: false
  }
]

// 색상 스펙트럼 함수 (부정: 빨간색 → 긍정: 초록색)
export const getSentimentColor = (importance: number): string => {
  // 0-100 범위를 0-1로 정규화
  const normalized = importance / 100
  
  // 빨간색(부정)에서 초록색(긍정)으로 그라데이션
  if (normalized <= 0.5) {
    // 빨간색에서 노란색으로 (0-0.5)
    const ratio = normalized * 2
    const r = 255
    const g = Math.round(255 * ratio)
    const b = 0
    return `rgb(${r}, ${g}, ${b})`
  } else {
    // 노란색에서 초록색으로 (0.5-1)
    const ratio = (normalized - 0.5) * 2
    const r = Math.round(255 * (1 - ratio))
    const g = 255
    const b = 0
    return `rgb(${r}, ${g}, ${b})`
  }
}

// 증권 뉴스 키워드 버블차트 데이터 (중요도와 감정 점수 포함)
export const newsKeywords = [
  { keyword: '삼성전자', importance: 95, sentiment: 85 }, // 긍정적
  { keyword: 'AI', importance: 88, sentiment: 90 }, // 매우 긍정적
  { keyword: '반도체', importance: 85, sentiment: 80 }, // 긍정적
  { keyword: 'SK하이닉스', importance: 82, sentiment: 75 }, // 긍정적
  { keyword: '코스피', importance: 80, sentiment: 70 }, // 긍정적
  { keyword: '연준', importance: 75, sentiment: 60 }, // 중립적
  { keyword: '금리', importance: 72, sentiment: 45 }, // 약간 부정적
  { keyword: '외국인', importance: 68, sentiment: 80 }, // 긍정적
  { keyword: '실적', importance: 65, sentiment: 75 }, // 긍정적
  { keyword: '매수세', importance: 62, sentiment: 85 }, // 매우 긍정적
  { keyword: '중국', importance: 58, sentiment: 30 }, // 부정적
  { keyword: '경제지표', importance: 55, sentiment: 40 }, // 부정적
  { keyword: '수출', importance: 52, sentiment: 35 }, // 부정적
  { keyword: '바이오', importance: 48, sentiment: 70 }, // 긍정적
  { keyword: '헬스케어', importance: 45, sentiment: 65 }, // 긍정적
  { keyword: '신재생에너지', importance: 42, sentiment: 80 }, // 매우 긍정적
  { keyword: '금융', importance: 38, sentiment: 50 }, // 중립적
  { keyword: '화학', importance: 35, sentiment: 45 }, // 약간 부정적
  { keyword: '투자', importance: 32, sentiment: 70 }, // 긍정적
  { keyword: '시장', importance: 28, sentiment: 55 } // 중립적
]

// 주간 추천 데이터
export const weeklyRecommendations = {
  '2024-09-15': [
    {
      id: '1',
      name: '미래에셋증권',
      code: '006800',
      currentPrice: 22100,
      change: 350,
      changeRate: 1.6,
      score: 10,
      tags: ['증권', '금융', '투자', '리테일', '시장활성화'],
      descriptions: [
        '증시 활성화로 거래대금 증가',
        '투자상품 다양화로 수익성 개선',
        '리테일 투자자 유입 지속'
      ],
      isFavorite: false
    },
    {
      id: '2',
      name: '삼성전자',
      code: '005930',
      currentPrice: 71500,
      change: 1600,
      changeRate: 2.3,
      score: 9.5,
      tags: ['반도체', 'AI', '메모리', '스마트폰', '디스플레이'],
      descriptions: [
        '3분기 실적 발표로 매출 67조원 기록',
        'AI 반도체 수요 급증으로 수익성 개선',
        '메모리 가격 상승세 지속'
      ],
      isFavorite: false
    },
    {
      id: '3',
      name: 'SK하이닉스',
      code: '000660',
      currentPrice: 128000,
      change: 5000,
      changeRate: 4.1,
      score: 9.2,
      tags: ['메모리', '반도체', 'AI', '서버', 'HBM'],
      descriptions: [
        '메모리 반도체 가격 상승',
        'AI 서버 수요 증가로 실적 개선 전망',
        'HBM3E 양산 확대로 경쟁력 강화'
      ],
      isFavorite: true
    },
    {
      id: '4',
      name: 'LG에너지솔루션',
      code: '373220',
      currentPrice: 425000,
      change: 7500,
      changeRate: 1.8,
      score: 8.8,
      tags: ['배터리', '전기차', '에너지', '북미', '양극재'],
      descriptions: [
        '전기차 배터리 시장 성장',
        '북미 진출 확대로 수익성 개선 기대',
        '양극재 자체 생산으로 원가 절감'
      ],
      isFavorite: false
    },
    {
      id: '5',
      name: 'NAVER',
      code: '035420',
      currentPrice: 185000,
      change: 5700,
      changeRate: 3.2,
      score: 8.5,
      tags: ['인터넷', 'AI', '클라우드', '검색', '커머스'],
      descriptions: [
        '클라우드 사업 확장',
        'AI 기술 도입으로 새로운 성장 동력 확보',
        '검색 광고 수익 안정적 증가'
      ],
      isFavorite: true
    }
  ],
  '2024-09-08': [
    {
      id: '6',
      name: '카카오',
      code: '035720',
      currentPrice: 52000,
      change: 2600,
      changeRate: 5.2,
      score: 8.2,
      tags: ['인터넷', '플랫폼', '금융', '모바일', '결제'],
      descriptions: [
        '모바일 결제 서비스 확장',
        '금융 사업 성장으로 수익성 개선',
        '플랫폼 사업 안정적 성장'
      ],
      isFavorite: false
    },
    {
      id: '7',
      name: 'POSCO홀딩스',
      code: '005490',
      currentPrice: 425000,
      change: 15500,
      changeRate: 3.8,
      score: 7.8,
      tags: ['철강', '자동차', '건설', '원자재', '수출'],
      descriptions: [
        '철강 가격 상승',
        '자동차용 강판 수요 증가로 실적 개선',
        '해외 수출 확대로 수익성 개선'
      ],
      isFavorite: true
    },
    {
      id: '8',
      name: 'LG화학',
      code: '051910',
      currentPrice: 485000,
      change: 10000,
      changeRate: 2.1,
      score: 7.5,
      tags: ['화학', '배터리', '전기차', '소재', '양극재'],
      descriptions: [
        '배터리 소재 사업 확장',
        '전기차 시장 성장 수혜',
        '양극재 자체 생산으로 원가 절감'
      ],
      isFavorite: false
    }
  ],
  '2024-09-01': [
    {
      id: '9',
      name: '셀트리온',
      code: '068270',
      currentPrice: 185000,
      change: 8000,
      changeRate: 4.5,
      score: 8.9,
      tags: ['바이오', '제약', '신약', '해외진출', 'R&D'],
      descriptions: [
        '바이오 신약 개발 성과',
        '해외 진출 확대로 성장 기대',
        'R&D 투자 확대로 파이프라인 강화'
      ],
      isFavorite: true
    },
    {
      id: '10',
      name: 'SK텔레콤',
      code: '017670',
      currentPrice: 52000,
      change: 1000,
      changeRate: 1.9,
      score: 7.2,
      tags: ['통신', '5G', '클라우드', '데이터센터', 'B2B'],
      descriptions: [
        '5G 서비스 확산',
        '클라우드 사업 성장으로 수익성 개선',
        'B2B 사업 확대로 안정적 수익 창출'
      ],
      isFavorite: false
    }
  ]
}

// 주간 선택 옵션
export const weeklyOptions = [
  { label: '2024년 9월 3주차 (09/15)', value: '2024-09-15' },
  { label: '2024년 9월 2주차 (09/08)', value: '2024-09-08' },
  { label: '2024년 9월 1주차 (09/01)', value: '2024-09-01' }
]

// 관심그룹 데이터
export const interestGroups = [
  {
    id: 'news',
    name: '관련뉴스',
    stocks: [
      { id: '1', name: '삼성전자', code: '005930', price: 71500, change: 1200, changeRate: 1.7, score: 11.2, isFavorite: true },
      { id: '2', name: 'SK하이닉스', code: '000660', price: 128000, change: 3500, changeRate: 2.8, score: 10.8, isFavorite: true },
      { id: '3', name: 'NAVER', code: '035420', price: 185000, change: 2800, changeRate: 1.5, score: 9.5, isFavorite: true }
    ]
  },
  {
    id: 'group1',
    name: '관심그룹1',
    stocks: [
      { id: '4', name: 'LG에너지솔루션', code: '373220', price: 425000, change: 8500, changeRate: 2.0, score: 8.7, isFavorite: true },
      { id: '5', name: '현대차', code: '005380', price: 245000, change: 3200, changeRate: 1.3, score: 7.9, isFavorite: true },
      { id: '6', name: '카카오', code: '035720', price: 52000, change: 1200, changeRate: 2.4, score: 6.8, isFavorite: true }
    ]
  },
  {
    id: 'group2',
    name: '관심그룹2',
    stocks: [
      { id: '7', name: 'POSCO홀딩스', code: '005490', price: 425000, change: 6800, changeRate: 1.6, score: 5.4, isFavorite: true },
      { id: '8', name: 'LG화학', code: '051910', price: 485000, change: 9200, changeRate: 1.9, score: 4.2, isFavorite: true }
    ]
  },
  {
    id: 'group3',
    name: '관심그룹3',
    stocks: [
      { id: '9', name: '셀트리온', code: '068270', price: 185000, change: 4200, changeRate: 2.3, score: 3.7, isFavorite: true },
      { id: '10', name: 'SK텔레콤', code: '017670', price: 52000, change: 800, changeRate: 1.6, score: 2.1, isFavorite: true }
    ]
  }
]

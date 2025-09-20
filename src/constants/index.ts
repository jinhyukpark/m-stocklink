// 앱 상수들

// API 관련 상수
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  USER: 'm_stocklink_user',
  SETTINGS: 'm_stocklink_settings',
  THEME: 'm_stocklink_theme',
  FAVORITES: 'm_stocklink_favorites',
  RECENT_SEARCHES: 'm_stocklink_recent_searches',
} as const

// 테마 관련 상수
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const

// 네비게이션 관련 상수
export const NAVIGATION = {
  HOME: 'home',
  SEARCH: 'search',
  FAVORITES: 'favorites',
  PROFILE: 'profile',
} as const

// 화면 크기 브레이크포인트
export const BREAKPOINTS = {
  XS: 375,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const

// 애니메이션 지속 시간
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const

// 색상 상수
export const COLORS = {
  PRIMARY: '#3B82F6',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#06B6D4',
} as const

// 폰트 크기
export const FONT_SIZES = {
  XS: 'text-xs',
  SM: 'text-sm',
  BASE: 'text-base',
  LG: 'text-lg',
  XL: 'text-xl',
  '2XL': 'text-2xl',
  '3XL': 'text-3xl',
} as const

// 간격 상수
export const SPACING = {
  XS: 'space-y-1',
  SM: 'space-y-2',
  BASE: 'space-y-4',
  LG: 'space-y-6',
  XL: 'space-y-8',
} as const

// 에러 메시지
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
  SERVER_ERROR: '서버 오류가 발생했습니다.',
  UNAUTHORIZED: '로그인이 필요합니다.',
  FORBIDDEN: '접근 권한이 없습니다.',
  NOT_FOUND: '요청한 데이터를 찾을 수 없습니다.',
  VALIDATION_ERROR: '입력값을 확인해주세요.',
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
} as const

// 성공 메시지
export const SUCCESS_MESSAGES = {
  SAVE_SUCCESS: '저장되었습니다.',
  DELETE_SUCCESS: '삭제되었습니다.',
  UPDATE_SUCCESS: '수정되었습니다.',
  LOGIN_SUCCESS: '로그인되었습니다.',
  LOGOUT_SUCCESS: '로그아웃되었습니다.',
} as const

// 정규식 패턴
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/,
  STOCK_CODE: /^[0-9]{6}$/,
} as const

// 페이지네이션 기본값
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const

// 캐시 시간 (밀리초)
export const CACHE_TIME = {
  SHORT: 5 * 60 * 1000, // 5분
  MEDIUM: 30 * 60 * 1000, // 30분
  LONG: 60 * 60 * 1000, // 1시간
  VERY_LONG: 24 * 60 * 60 * 1000, // 24시간
} as const

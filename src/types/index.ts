// 공통 타입 정의

// 사용자 관련 타입
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

// API 응답 타입
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// 페이지네이션 타입
export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

// 페이지네이션된 응답 타입
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: Pagination
}

// 테마 타입
export type Theme = 'light' | 'dark' | 'system'

// 네비게이션 아이템 타입
export interface NavItem {
  id: string
  label: string
  icon: string
  href: string
  badge?: number
}

// 모바일 앱 관련 타입
export interface MobileConfig {
  version: string
  buildNumber: string
  platform: 'ios' | 'android' | 'web'
  deviceInfo: {
    model: string
    osVersion: string
    screenSize: {
      width: number
      height: number
    }
  }
}

// 에러 타입
export interface AppError {
  code: string
  message: string
  details?: any
  timestamp: Date
}

// 로딩 상태 타입
export interface LoadingState {
  isLoading: boolean
  message?: string
  progress?: number
}

// 폼 상태 타입
export interface FormState<T = any> {
  data: T
  errors: Partial<Record<keyof T, string>>
  isSubmitting: boolean
  isDirty: boolean
}

// 모달 타입
export interface ModalState {
  isOpen: boolean
  type?: string
  data?: any
}

// 토스트 메시지 타입
export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

// 네트워크 상태 타입
export interface NetworkState {
  isOnline: boolean
  connectionType?: 'wifi' | 'cellular' | 'ethernet' | 'unknown'
  lastSyncTime?: Date
  isSyncing: boolean
}

// 설정 타입
export interface AppSettings {
  notifications: {
    enabled: boolean
    push: boolean
    email: boolean
    sms: boolean
  }
  privacy: {
    analytics: boolean
    crashReporting: boolean
    personalizedAds: boolean
  }
  appearance: {
    theme: Theme
    fontSize: 'small' | 'medium' | 'large'
    language: string
  }
}

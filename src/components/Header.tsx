'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/stores/useAppStore'

interface HeaderProps {
  title?: string
  actions?: React.ReactNode
  showBackButton?: boolean
  onBackClick?: () => void
  showLogo?: boolean
}

export default function Header({
  title,
  actions,
  showBackButton = false,
  onBackClick,
  showLogo = false,
}: HeaderProps) {
  const router = useRouter()

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      {/* 로고 - 왼쪽 위치 */}
      {showLogo && (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">StockLink</span>
        </div>
      )}
      
      {/* 오른쪽 액션 버튼들 */}
      <div className="flex items-center space-x-2">
        {/* FREE | 업데이트하기 버튼 */}
        {showLogo && (
          <button 
            onClick={() => {
              router.push('/license')
            }}
            className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-sm active:scale-95"
          >
            <span className="text-xs font-bold">FREE</span>
            <span className="text-gray-300">|</span>
            <span>업데이트하기</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        )}
        
        {/* 기존 액션 버튼들 */}
        {actions && (
          <div className="flex items-center space-x-2">
            {actions}
          </div>
        )}
      </div>
    </header>
  )
}

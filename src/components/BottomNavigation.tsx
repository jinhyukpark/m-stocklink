'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/stores/useAppStore'

const navigationItems = [
  {
    id: 'dashboard',
    label: '대시보드',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
      </svg>
    ),
    href: '/dashboard',
  },
  {
    id: 'stocks',
    label: '관심종목',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    href: '/stocks',
  },
  {
    id: 'ai-recommendations',
    label: 'AI추천',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    href: '/ai-recommendations',
    isSpecial: true, // AI 추천 메뉴 강조를 위한 플래그
  },
  {
    id: 'relationship',
    label: '트랜드',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    href: '/relationship',
  },
  {
    id: 'profile',
    label: '마이페이지',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    href: '/profile',
  },
]

export default function BottomNavigation() {
  const { ui, setBottomNavActive } = useAppStore()
  const router = useRouter()

  const handleItemClick = (itemId: string) => {
    setBottomNavActive(itemId as 'dashboard' | 'ai-recommendations' | 'stocks' | 'relationship' | 'profile')
    const href = navigationItems.find(item => item.id === itemId)?.href || '/'
    router.push(href)
  }

  return (
    <nav className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-2 py-2 safe-bottom shadow-lg">
              <div className="flex justify-around">
                {navigationItems.map((item) => {
                  const isActive = ui.bottomNavActive === item.id
                  const isSpecial = item.isSpecial

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`flex flex-col items-center py-3 px-2 rounded-xl transition-all duration-200 relative ${
                        isSpecial
                          ? isActive
                            ? 'text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/25'
                            : 'text-purple-600 dark:text-purple-400 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-800/30 dark:hover:to-blue-800/30'
                          : isActive
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      {/* AI 추천 특별 효과 */}
                      {isSpecial && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                      )}
                      
                      <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'scale-100'} ${isSpecial ? 'relative' : ''}`}>
                        {item.icon}
                      </div>
                      <span className={`text-xs mt-1 font-medium ${isSpecial ? 'font-bold' : ''}`}>
                        {item.label}
                      </span>
                      
                      {/* AI 추천 특별 배경 효과 */}
                      {isSpecial && (
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 hover:opacity-100 transition-opacity duration-200"></div>
                      )}
                    </button>
                  )
                })}
              </div>
    </nav>
  )
}

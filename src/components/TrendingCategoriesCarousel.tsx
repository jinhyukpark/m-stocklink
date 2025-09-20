'use client'

import React from 'react'
import TrendingCategoryCard from './TrendingCategoryCard'

const trendingCategoriesData = [
  {
    rank: 1,
    icon: (
      <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    name: '전자결제(전체)',
    performance: 4.83,
    risingStocks: 11,
    totalStocks: 13,
    topStocks: [
      { name: '다날', changeRate: 21.60 },
      { name: 'NHN KCP', changeRate: 14.82 },
      { name: '헥토파이낸셜', changeRate: 5.26 }
    ]
  },
  {
    rank: 2,
    icon: (
      <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
    ),
    name: '스테이블코인',
    performance: 4.67,
    risingStocks: 17,
    totalStocks: 22,
    topStocks: [
      { name: '다날', changeRate: 21.60 },
      { name: '뱅크웨어글로벌', changeRate: 15.97 },
      { name: 'NHN KCP', changeRate: 14.82 }
    ]
  },
  {
    rank: 3,
    icon: (
      <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
      </svg>
    ),
    name: '보안주(정보)',
    performance: 3.84,
    risingStocks: 34,
    totalStocks: 50,
    topStocks: [
      { name: '에스투더블유', changeRate: 81.44 },
      { name: '소프트캠프', changeRate: 30.00 },
      { name: '싸이버원', changeRate: 18.49 }
    ]
  },
  {
    rank: 4,
    icon: (
      <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 4V2c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v2h3c.6 0 1 .4 1 1s-.4 1-1 1h-1v12c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V6H4c-.6 0-1-.4-1-1s.4-1 1-1h3zm2-2h6v2H9V2z"/>
      </svg>
    ),
    name: '2025 하반기',
    performance: 3.31,
    risingStocks: 9,
    totalStocks: 26,
    topStocks: [
      { name: '에스투더블유', changeRate: 81.44 },
      { name: '아이티켐', changeRate: 30.00 },
      { name: '지투지바이오', changeRate: 9.86 }
    ]
  },
  {
    rank: 5,
    icon: (
      <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    name: '애플',
    performance: 2.85,
    risingStocks: 5,
    totalStocks: 8,
    topStocks: [
      { name: 'NHN', changeRate: 12.45 },
      { name: '엑스플', changeRate: 8.92 },
      { name: 'KGOL', changeRate: 6.33 }
    ]
  },
  {
    rank: 6,
    icon: (
      <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    name: 'AI/반도체',
    performance: 2.45,
    risingStocks: 28,
    totalStocks: 45,
    topStocks: [
      { name: '삼성전자', changeRate: 3.25 },
      { name: 'SK하이닉스', changeRate: 2.18 },
      { name: 'NAVER', changeRate: 1.85 }
    ]
  }
]

export default function TrendingCategoriesCarousel() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
          <span className="text-red-500 mr-2">🔥</span>
          지금 뜨는 카테고리
        </h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          9월 19일 22:10 기준
        </div>
      </div>

      {/* 카루셀 */}
      <div className="relative">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 pb-2">
            {trendingCategoriesData.map((category) => (
              <TrendingCategoryCard
                key={category.rank}
                rank={category.rank}
                icon={category.icon}
                name={category.name}
                performance={category.performance}
                risingStocks={category.risingStocks}
                totalStocks={category.totalStocks}
                topStocks={category.topStocks}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

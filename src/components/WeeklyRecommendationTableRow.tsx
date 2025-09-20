'use client'

import React from 'react'

interface WeeklyRecommendationTableRowProps {
  stock: {
    id: string
    name: string
    code: string
    currentPrice: number
    change: number
    changeRate: number
    score: number
    tags: string[]
    descriptions: string[]
    isFavorite: boolean
  }
  rank: number
  onFavoriteToggle?: (stockId: string) => void
}

export default function WeeklyRecommendationTableRow({ 
  stock, 
  rank, 
  onFavoriteToggle 
}: WeeklyRecommendationTableRowProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-3">
      <div className="grid grid-cols-12 gap-4 items-start">
        {/* 순위 */}
        <div className="col-span-1 flex items-center justify-center">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">
              {rank}
            </span>
          </div>
        </div>

        {/* 종목명 및 상세 정보 */}
        <div className="col-span-7">
          {/* 종목명 */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-lg">
              {stock.name}
            </h3>
            {onFavoriteToggle && (
              <button
                onClick={() => onFavoriteToggle(stock.id)}
                className={`p-1 rounded-full transition-all duration-200 ${
                  stock.isFavorite
                    ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <svg className="w-4 h-4" fill={stock.isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            )}
          </div>

          {/* 태그들 */}
          <div className="flex flex-wrap gap-1 mb-3">
            {stock.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 설명 포인트들 */}
          <div className="space-y-1">
            {stock.descriptions.map((description, index) => (
              <div key={index} className="flex items-start">
                <span className="text-gray-400 dark:text-gray-500 mr-2 text-sm">•</span>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {description}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 현재가 */}
        <div className="col-span-2 text-center">
          <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            {stock.currentPrice.toLocaleString()}
          </div>
          <div className="flex items-center justify-center">
            <span className={`text-sm font-medium ${
              stock.change >= 0 ? 'text-red-500' : 'text-blue-500'
            }`}>
              {stock.change >= 0 ? '▲' : '▼'} {Math.abs(stock.change).toLocaleString()}
            </span>
          </div>
        </div>

        {/* 점수 */}
        <div className="col-span-2 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {stock.score}
          </div>
        </div>
      </div>
    </div>
  )
}

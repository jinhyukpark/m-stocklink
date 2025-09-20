'use client'

import React from 'react'

interface WeeklyRecommendationCardProps {
  stock: {
    id: string
    name: string
    code: string
    currentPrice: number
    changeRate: number
    reason: string
    isFavorite?: boolean
  }
  onFavoriteToggle?: (stockId: string) => void
}

export default function WeeklyRecommendationCard({ stock, onFavoriteToggle }: WeeklyRecommendationCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
      <div className="flex items-start justify-between mb-3">
        {/* 종목 정보 */}
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">
              {stock.name}
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {stock.code}
            </span>
          </div>
          
          {/* 현재가 및 등락률 */}
          <div className="flex items-center space-x-3">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {stock.currentPrice.toLocaleString()}원
            </span>
            <span className={`text-sm font-medium px-2 py-1 rounded ${
              stock.changeRate >= 0 
                ? 'text-red-500 bg-red-50 dark:bg-red-900/20' 
                : 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
            }`}>
              {stock.changeRate >= 0 ? '+' : ''}{stock.changeRate}%
            </span>
          </div>
        </div>

        {/* 별 토글 버튼 */}
        {onFavoriteToggle && (
          <button
            onClick={() => onFavoriteToggle(stock.id)}
            className={`p-2 rounded-full transition-all duration-200 ${
              stock.isFavorite
                ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                : 'text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <svg className="w-5 h-5" fill={stock.isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        )}
      </div>

      {/* 상승 이유 */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          📈 상승 이유
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {stock.reason}
        </p>
      </div>
    </div>
  )
}

'use client'

import React from 'react'
import { aiStockRecommendations } from '@/data/mockData'

interface AIStockCardProps {
  stock: typeof aiStockRecommendations[0]
  onFavoriteToggle?: (stockId: string) => void
}

export default function AIStockCard({ stock, onFavoriteToggle }: AIStockCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-red-500'
    if (score >= 8) return 'text-orange-500'
    if (score >= 7) return 'text-yellow-500'
    if (score >= 6) return 'text-green-500'
    return 'text-gray-500'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 9) return 'bg-red-500'
    if (score >= 8) return 'bg-orange-500'
    if (score >= 7) return 'bg-yellow-500'
    if (score >= 6) return 'bg-green-500'
    return 'bg-gray-500'
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{stock.code}</span>
            <button
              onClick={() => onFavoriteToggle?.(stock.id)}
              className={`p-1 rounded-full transition-colors ${
                stock.isFavorite
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-gray-400 hover:text-red-500'
              }`}
            >
              <svg className="w-3 h-3" fill={stock.isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </button>
          </div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">{stock.name}</h3>
        </div>
      </div>

      {/* 가격 정보 */}
      <div className="mb-3">
        <div className="text-lg font-bold text-gray-900 dark:text-white">
          {stock.currentPrice.toLocaleString()}원
        </div>
        <div className={`text-sm font-semibold ${
          stock.change >= 0 ? 'text-red-500' : 'text-blue-500'
        }`}>
          {stock.change >= 0 ? '+' : ''}{stock.change.toLocaleString()}원
        </div>
        <div className={`text-xs font-medium ${
          stock.changeRate >= 0 ? 'text-red-500' : 'text-blue-500'
        }`}>
          {stock.changeRate >= 0 ? '+' : ''}{stock.changeRate.toFixed(1)}%
        </div>
      </div>

      {/* AI 점수 */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">AI점수</span>
          <span className={`text-sm font-bold ${getScoreColor(stock.aiScore)}`}>
            {stock.aiScore}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${getScoreBgColor(stock.aiScore)}`}
            style={{ width: `${(stock.aiScore / 10) * 100}%` }}
          />
        </div>
      </div>

      {/* 시장대비 상승률 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">10일</span>
          <span className={`text-xs font-semibold ${
            stock.marketComparison['10일'] >= 0 ? 'text-red-500' : 'text-blue-500'
          }`}>
            {stock.marketComparison['10일'] >= 0 ? '+' : ''}{stock.marketComparison['10일'].toFixed(2)}%
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">20일</span>
          <span className={`text-xs font-semibold ${
            stock.marketComparison['20일'] >= 0 ? 'text-red-500' : 'text-blue-500'
          }`}>
            {stock.marketComparison['20일'] >= 0 ? '+' : ''}{stock.marketComparison['20일'].toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  )
}

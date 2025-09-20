'use client'

import React from 'react'
import { aiStockRecommendations } from '@/data/mockData'

interface AIStockRecommendationProps {
  stock: typeof aiStockRecommendations[0]
  onFavoriteToggle?: (stockId: string) => void
}

export default function AIStockRecommendation({ stock, onFavoriteToggle }: AIStockRecommendationProps) {
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
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stock.code}</span>
            <button
              onClick={() => onFavoriteToggle?.(stock.id)}
              className={`p-1 rounded-full transition-colors ${
                stock.isFavorite
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-gray-400 hover:text-red-500'
              }`}
            >
              <svg className="w-4 h-4" fill={stock.isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </button>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stock.name}</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {stock.currentPrice.toLocaleString()}원
          </div>
          <div className={`text-lg font-semibold ${
            stock.change >= 0 ? 'text-red-500' : 'text-blue-500'
          }`}>
            {stock.change >= 0 ? '+' : ''}{stock.change.toLocaleString()}원
          </div>
          <div className={`text-base font-medium ${
            stock.changeRate >= 0 ? 'text-red-500' : 'text-blue-500'
          }`}>
            {stock.changeRate >= 0 ? '+' : ''}{stock.changeRate.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* 차트 영역 */}
      <div className="mb-6">
        <div className="h-24 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden">
          {/* 간단한 라인 차트 */}
          <svg className="w-full h-full" viewBox="0 0 300 80">
            <polyline
              fill="none"
              stroke={stock.change >= 0 ? '#ef4444' : '#3b82f6'}
              strokeWidth="2"
              points={stock.chartData.map((point, index) => {
                const x = (index / (stock.chartData.length - 1)) * 280 + 10
                const y = 70 - ((point.price - Math.min(...stock.chartData.map(p => p.price))) / 
                  (Math.max(...stock.chartData.map(p => p.price)) - Math.min(...stock.chartData.map(p => p.price)))) * 60
                return `${x},${y}`
              }).join(' ')}
            />
            {/* 마지막 점 */}
            <circle
              cx={(stock.chartData.length - 1) / (stock.chartData.length - 1) * 280 + 10}
              cy={70 - ((stock.chartData[stock.chartData.length - 1].price - Math.min(...stock.chartData.map(p => p.price))) / 
                (Math.max(...stock.chartData.map(p => p.price)) - Math.min(...stock.chartData.map(p => p.price)))) * 60}
              r="3"
              fill={stock.change >= 0 ? '#ef4444' : '#3b82f6'}
            />
          </svg>
        </div>
      </div>

      {/* AI 점수 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">09월 15일 기준</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">AI점수</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">10일 이내</div>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-bold ${getScoreColor(stock.aiScore)}`}>
              {stock.aiScore}
            </div>
          </div>
        </div>
        
        {/* AI 점수 바 */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${getScoreBgColor(stock.aiScore)}`}
            style={{ width: `${(stock.aiScore / 10) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>0</span>
          <span>10</span>
        </div>
      </div>

      {/* 성과 지표 테이블 */}
      <div className="space-y-4">
        {/* 시장대비 상승률 */}
        <div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white mb-3">시장대비 상승률</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">10일</div>
              <div className={`text-lg font-bold ${
                stock.marketComparison['10일'] >= 0 ? 'text-red-500' : 'text-blue-500'
              }`}>
                {stock.marketComparison['10일'] >= 0 ? '+' : ''}{stock.marketComparison['10일'].toFixed(2)}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">20일</div>
              <div className={`text-lg font-bold ${
                stock.marketComparison['20일'] >= 0 ? 'text-red-500' : 'text-blue-500'
              }`}>
                {stock.marketComparison['20일'] >= 0 ? '+' : ''}{stock.marketComparison['20일'].toFixed(2)}%
              </div>
            </div>
          </div>
        </div>

        {/* 10일간 주가 강도 */}
        <div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white mb-3">10일간 주가 강도</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">상승탄력</div>
              <div className={`text-lg font-bold ${
                stock.stockStrength['10일'].upwardElasticity >= 0 ? 'text-red-500' : 'text-blue-500'
              }`}>
                {stock.stockStrength['10일'].upwardElasticity >= 0 ? '+' : ''}{stock.stockStrength['10일'].upwardElasticity.toFixed(2)}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">하락 방어</div>
              <div className={`text-lg font-bold ${
                stock.stockStrength['10일'].downwardDefense >= 0 ? 'text-red-500' : 'text-blue-500'
              }`}>
                {stock.stockStrength['10일'].downwardDefense >= 0 ? '+' : ''}{stock.stockStrength['10일'].downwardDefense.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>

        {/* 20일간 주가 강도 */}
        <div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white mb-3">20일간 주가 강도</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">상승탄력</div>
              <div className={`text-lg font-bold ${
                stock.stockStrength['20일'].upwardElasticity >= 0 ? 'text-red-500' : 'text-blue-500'
              }`}>
                {stock.stockStrength['20일'].upwardElasticity >= 0 ? '+' : ''}{stock.stockStrength['20일'].upwardElasticity.toFixed(2)}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">하락 방어</div>
              <div className={`text-lg font-bold ${
                stock.stockStrength['20일'].downwardDefense >= 0 ? 'text-red-500' : 'text-blue-500'
              }`}>
                {stock.stockStrength['20일'].downwardDefense >= 0 ? '+' : ''}{stock.stockStrength['20일'].downwardDefense.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

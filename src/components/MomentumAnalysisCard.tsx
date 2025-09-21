'use client'

import React from 'react'

interface MomentumAnalysisCardProps {
  stock: {
    id: string
    name: string
    code: string
    currentPrice: number
    change: number
    changeRate: number
    aiScore: number
    marketComparison: {
      '10일': number
      '20일': number
    }
    stockStrength: {
      '10일': {
        upwardElasticity: number
        downwardDefense: number
      }
      '20일': {
        upwardElasticity: number
        downwardDefense: number
      }
    }
    chartData: Array<{ date: string; price: number }>
    isFavorite: boolean
  }
  onFavoriteToggle?: (stockId: string) => void
  onStockClick?: (stockId: string) => void
}

export default function MomentumAnalysisCard({ 
  stock, 
  onFavoriteToggle,
  onStockClick
}: MomentumAnalysisCardProps) {
  return (
    <div 
      onClick={() => onStockClick?.(stock.id)}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
    >
      {/* 상단 섹션 */}
      <div className="flex justify-between items-start mb-4">
        {/* 종목 정보 */}
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">{stock.code}</span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{stock.name}</h3>
          </div>
          
          {/* 차트 영역 - 1/3 너비로 제한 */}
          <div className="relative h-16 mb-2 w-1/3">
            <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
              {/* 차트 라인 */}
              <polyline
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                points={stock.chartData.map((point, index) => 
                  `${(index / (stock.chartData.length - 1)) * 200},${60 - ((point.price - Math.min(...stock.chartData.map(p => p.price))) / (Math.max(...stock.chartData.map(p => p.price)) - Math.min(...stock.chartData.map(p => p.price)))) * 60}`
                ).join(' ')}
              />
              {/* 마지막 점 */}
              <circle
                cx={200}
                cy={60 - ((stock.chartData[stock.chartData.length - 1].price - Math.min(...stock.chartData.map(p => p.price))) / (Math.max(...stock.chartData.map(p => p.price)) - Math.min(...stock.chartData.map(p => p.price)))) * 60}
                r="3"
                fill="#ef4444"
              />
            </svg>
          </div>
          
          {/* 종가 정보 */}
          <div className="text-sm">
            <span className="text-gray-600 dark:text-gray-400">종가 </span>
            <span className="font-semibold text-gray-900 dark:text-white">{stock.currentPrice.toLocaleString()}원</span>
            <span className={`ml-2 font-semibold ${
              stock.changeRate >= 0 ? 'text-red-500' : 'text-blue-500'
            }`}>
              {stock.changeRate >= 0 ? '+' : ''}{stock.changeRate}%
            </span>
          </div>
        </div>

        {/* AI 점수 섹션 */}
        <div className="text-right">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">09월 15일 기준</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white mb-2">AI점수</div>
          
          {/* AI 점수 바 */}
          <div className="w-24 h-6 bg-gray-200 dark:bg-gray-700 rounded-full relative overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-gray-600 to-red-500 rounded-full"
              style={{ width: `${(stock.aiScore / 10) * 100}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-white">{stock.aiScore}</span>
            </div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">10일 이내</div>
          
          {/* 즐겨찾기 버튼 */}
          {onFavoriteToggle && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onFavoriteToggle(stock.id)
              }}
              className={`mt-2 p-1 rounded-full transition-all duration-200 ${
                stock.isFavorite
                  ? 'text-yellow-500'
                  : 'text-gray-400 hover:text-yellow-500'
              }`}
            >
              <svg className="w-4 h-4" fill={stock.isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 하단 테이블 섹션 */}
      <div className="grid grid-cols-3 gap-4">
        {/* 시장대비 상승률 */}
        <div className="text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">시장대비 상승률</div>
          <div className="space-y-1">
            <div className="text-xs">
              <span className="text-gray-600 dark:text-gray-400">10일</span>
              <span className={`ml-1 font-semibold ${
                stock.marketComparison['10일'] >= 0 ? 'text-red-500' : 'text-blue-500'
              }`}>
                {stock.marketComparison['10일'] >= 0 ? '+' : ''}{stock.marketComparison['10일']}%
              </span>
            </div>
            <div className="text-xs">
              <span className="text-gray-600 dark:text-gray-400">20일</span>
              <span className={`ml-1 font-semibold ${
                stock.marketComparison['20일'] >= 0 ? 'text-red-500' : 'text-blue-500'
              }`}>
                {stock.marketComparison['20일'] >= 0 ? '+' : ''}{stock.marketComparison['20일']}%
              </span>
            </div>
          </div>
        </div>

        {/* 10일간 주가 강도 */}
        <div className="text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">10일간 주가 강도</div>
          <div className="space-y-1">
            <div className="text-xs">
              <span className="text-gray-600 dark:text-gray-400">상승탄력</span>
              <span className={`ml-1 font-semibold ${
                stock.stockStrength['10일'].upwardElasticity >= 0 ? 'text-red-500' : 'text-blue-500'
              }`}>
                {stock.stockStrength['10일'].upwardElasticity >= 0 ? '+' : ''}{stock.stockStrength['10일'].upwardElasticity}%
              </span>
            </div>
            <div className="text-xs">
              <span className="text-gray-600 dark:text-gray-400">하락 방어</span>
              <span className={`ml-1 font-semibold ${
                stock.stockStrength['10일'].downwardDefense >= 0 ? 'text-red-500' : 'text-blue-500'
              }`}>
                {stock.stockStrength['10일'].downwardDefense >= 0 ? '+' : ''}{stock.stockStrength['10일'].downwardDefense}%
              </span>
            </div>
          </div>
        </div>

        {/* 20일간 주가 강도 */}
        <div className="text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">20일간 주가 강도</div>
          <div className="space-y-1">
            <div className="text-xs">
              <span className="text-gray-600 dark:text-gray-400">상승탄력</span>
              <span className={`ml-1 font-semibold ${
                stock.stockStrength['20일'].upwardElasticity >= 0 ? 'text-red-500' : 'text-blue-500'
              }`}>
                {stock.stockStrength['20일'].upwardElasticity >= 0 ? '+' : ''}{stock.stockStrength['20일'].upwardElasticity}%
              </span>
            </div>
            <div className="text-xs">
              <span className="text-gray-600 dark:text-gray-400">하락 방어</span>
              <span className={`ml-1 font-semibold ${
                stock.stockStrength['20일'].downwardDefense >= 0 ? 'text-red-500' : 'text-blue-500'
              }`}>
                {stock.stockStrength['20일'].downwardDefense >= 0 ? '+' : ''}{stock.stockStrength['20일'].downwardDefense}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

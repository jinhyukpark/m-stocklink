'use client'

import React from 'react'

interface AIRecommendationCardProps {
  stock: {
    id: string
    code: string
    name: string
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
  onFavoriteToggle: (stockId: string) => void
}

export default function AIRecommendationCard({ stock, onFavoriteToggle }: AIRecommendationCardProps) {
  // 추천 상승률 계산 (AI 점수 기반으로 임의 계산)
  const recommendedIncreaseRate = (stock.aiScore * 5.5).toFixed(2)
  
  // 누적 상승률 계산 (임의 값)
  const cumulativeIncreaseRate = (stock.changeRate + Math.random() * 20).toFixed(0)
  
  // 종목명 축약 (첫 글자만 표시)
  const shortName = stock.name.charAt(0) + ' •••••'
  
  // 설명 텍스트 생성
  const getDescription = () => {
    if (stock.changeRate > 0) {
      return `누적 상승률 ${cumulativeIncreaseRate}% 돌파...목표가 세번째 상향`
    } else {
      return `2분기도 고속 성장...시간외서 8% 이상 급등`
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
      <div className="flex items-start justify-between">
        {/* 왼쪽 정보 */}
        <div className="flex-1 pr-4">
          {/* 종목명 */}
          <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
            {shortName}
          </h3>
          
          {/* 설명 */}
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {getDescription()}
          </p>
        </div>

        {/* 오른쪽 정보 */}
        <div className="flex flex-col items-end space-y-3">
          {/* 목표가 */}
          <div className="text-center">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              목표가
            </div>
            <button className="w-16 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </button>
          </div>

          {/* 추천 상승률 */}
          <div className="text-center">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              추천 상승률
            </div>
            <div className="text-lg font-bold text-red-500">
              {recommendedIncreaseRate}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

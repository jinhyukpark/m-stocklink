'use client'

import React, { useState, useEffect } from 'react'
import MobileLayout from '@/components/MobileLayout'
import { aiStockRecommendations } from '@/data/mockData' // Use aiStockRecommendations
import MomentumAnalysisCard from '@/components/MomentumAnalysisCard'

export default function MomentumPage() {
  const [stockData, setStockData] = useState(aiStockRecommendations) // Set initial data

  return (
    <MobileLayout headerTitle="모멘텀">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center">
          {/* 아이콘 */}
          <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          {/* 제목 */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            모멘텀 분석
          </h2>

          {/* 설명 */}
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-sm">
            주식의 모멘텀을 분석하여 투자 기회를 찾아보세요. 
            곧 더 많은 기능이 추가될 예정입니다.
          </p>

          {/* 종목 리스트 */}
          <div className="space-y-4 max-w-sm">
            {stockData.map((stock, index) => (
              <MomentumAnalysisCard
                key={stock.code}
                stock={stock}
                index={index}
              />
            ))}
          </div>

          {/* 알림 */}
          <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-sm text-yellow-800 dark:text-yellow-200">
                모멘텀 기능은 현재 개발 중입니다. 곧 만나보실 수 있습니다!
              </span>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}

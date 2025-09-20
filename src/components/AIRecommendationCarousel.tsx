'use client'

import React, { useState } from 'react'
import AIStockRecommendation from './AIStockRecommendation'
import { aiStockRecommendations } from '@/data/mockData'

interface AIRecommendationCarouselProps {
  onViewAll?: () => void
  onFavoriteToggle?: (stockId: string) => void
}

export default function AIRecommendationCarousel({ onViewAll, onFavoriteToggle }: AIRecommendationCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // 2개씩 그룹으로 나누기
  const groupedStocks = []
  for (let i = 0; i < aiStockRecommendations.length; i += 2) {
    groupedStocks.push(aiStockRecommendations.slice(i, i + 2))
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % groupedStocks.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + groupedStocks.length) % groupedStocks.length)
  }

  if (groupedStocks.length === 0) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <span className="text-blue-500 mr-2">🤖</span>
          AI 종목 추천
        </h2>
        <button 
          onClick={onViewAll}
          className="text-sm text-blue-500 hover:text-blue-600 font-medium"
        >
          전체보기
        </button>
      </div>

      {/* 카루셀 컨테이너 */}
      <div className="relative">
        <div className="overflow-hidden rounded-2xl">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {groupedStocks.map((group, groupIndex) => (
              <div key={groupIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 gap-4">
                  {group.map((stock) => (
                    <AIStockRecommendation 
                      key={stock.id} 
                      stock={stock}
                      onFavoriteToggle={onFavoriteToggle}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 네비게이션 버튼들 */}
        {groupedStocks.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* 인디케이터 */}
        {groupedStocks.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {groupedStocks.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex 
                    ? 'bg-blue-500' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import React from 'react'

interface TrendingCategoryCardProps {
  rank: number
  icon: React.ReactNode
  name: string
  performance: number
  risingStocks: number
  totalStocks: number
  topStocks: Array<{
    name: string
    changeRate: number
  }>
}

export default function TrendingCategoryCard({
  rank,
  icon,
  name,
  performance,
  risingStocks,
  totalStocks,
  topStocks
}: TrendingCategoryCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 min-w-[280px] flex-shrink-0">
      {/* 순위 */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-bold text-gray-500 dark:text-gray-400">
          {rank}위
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {totalStocks}개 중 {risingStocks}개 종목 상승
        </div>
      </div>

      {/* 아이콘과 카테고리명 */}
      <div className="flex items-center mb-3">
        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mr-3">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">
            {name}
          </h3>
          <div className="text-lg font-bold text-red-500">
            +{performance.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* 상위 종목들 */}
      <div className="space-y-2">
        {topStocks.map((stock, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-xs text-gray-600 dark:text-gray-300 truncate flex-1 mr-2">
              {stock.name}
            </span>
            <span className="text-xs font-semibold text-red-500">
              +{stock.changeRate.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

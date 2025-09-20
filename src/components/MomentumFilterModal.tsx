'use client'

import React from 'react'

interface MomentumFilterModalProps {
  isOpen: boolean
  onClose: () => void
  predictionPeriod: string
  setPredictionPeriod: (period: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
}

const predictionPeriodOptions = [
  { label: '5일', value: '5' },
  { label: '10일', value: '10' },
  { label: '20일', value: '20' },
  { label: '30일', value: '30' },
]

const sortOptions = [
  { label: 'AI 점수 높은순', value: 'aiScore' },
  { label: '등락률 높은순', value: 'changeRate' },
  { label: '추천 상승률 높은순', value: 'recommendedRate' },
  { label: '종목명순', value: 'name' },
]

export default function MomentumFilterModal({
  isOpen,
  onClose,
  predictionPeriod,
  setPredictionPeriod,
  sortBy,
  setSortBy,
}: MomentumFilterModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Dimmed background */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="relative w-full bg-white dark:bg-gray-800 rounded-t-3xl shadow-lg transform transition-transform duration-300 ease-out translate-y-0 flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">필터</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-6 overflow-y-auto flex-1">
          {/* 예측기간 선택 */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">예측기간 선택</h3>
            <div className="flex space-x-2 overflow-x-auto">
              {predictionPeriodOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setPredictionPeriod(option.value)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    predictionPeriod === option.value
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* 정렬 옵션 */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">정렬 옵션</h3>
            <div className="flex space-x-2 overflow-x-auto">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    sortBy === option.value
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-colors"
          >
            적용
          </button>
        </div>
      </div>
    </div>
  )
}

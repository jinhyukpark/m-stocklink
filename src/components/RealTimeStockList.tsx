'use client'

import React, { useState } from 'react'
import { stocks } from '@/data/mockData'

const sortTabs = [
  { id: 'amount', label: '거래대금' },
  { id: 'rise', label: '급상승' },
  { id: 'fall', label: '급하락' },
]

const timeFilters = [
  { id: 'realtime', label: '실시간' },
  { id: '1day', label: '1일' },
  { id: '1week', label: '1주일' },
  { id: '1month', label: '1개월' },
  { id: '3months', label: '3개월' },
  { id: '6months', label: '6개월' },
  { id: '1year', label: '1년' },
]

export default function RealTimeStockList() {
  const [selectedSort, setSelectedSort] = useState('amount')
  const [selectedTime, setSelectedTime] = useState('realtime')
  const [hideRiskyStocks, setHideRiskyStocks] = useState(false)

  // 정렬된 주식 데이터
  const sortedStocks = [...stocks].sort((a, b) => {
    switch (selectedSort) {
      case 'amount':
        return b.amount - a.amount
      case 'rise':
        return b.changeRate - a.changeRate
      case 'fall':
        return a.changeRate - b.changeRate
      default:
        return 0
    }
  }).slice(0, 10) // 상위 10개만 표시

  const formatAmount = (amount: number) => {
    if (amount >= 1000000000000) {
      return `${Math.floor(amount / 1000000000000)}조 ${Math.floor((amount % 1000000000000) / 100000000)}억원`
    } else if (amount >= 100000000) {
      return `${Math.floor(amount / 100000000)}억 ${Math.floor((amount % 100000000) / 10000)}만원`
    } else {
      return `${amount.toLocaleString()}원`
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      {/* 헤더 */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">실시간 차트</h3>
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400">9월 19일 22:11 기준</div>
            <label className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-300">
              <input
                type="checkbox"
                checked={hideRiskyStocks}
                onChange={(e) => setHideRiskyStocks(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="ml-2">투자위험 주식 숨기기</span>
            </label>
          </div>
        </div>

        {/* 정렬 탭 */}
        <div className="flex space-x-6 mb-4">
          {sortTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedSort(tab.id)}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                selectedSort === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 시간 필터 */}
        <div className="flex space-x-2 overflow-x-auto">
          {timeFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedTime(filter.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                selectedTime === filter.id
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* 주식 리스트 헤더 */}
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
          <div className="col-span-4 text-left">종목</div>
          <div className="col-span-3 text-right">현재가</div>
          <div className="col-span-2 text-right">등락률</div>
          <div className="col-span-3 text-right">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded">
              거래대금 많은 순
            </span>
          </div>
        </div>
      </div>

      {/* 주식 리스트 */}
      <div className="divide-y divide-gray-200 dark:divide-gray-600">
        {sortedStocks.map((stock, index) => (
          <div key={stock.id} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* 순위 및 즐겨찾기 */}
              <div className="col-span-1 flex items-center">
                <div className="flex items-center">
                  <svg className={`w-4 h-4 mr-1 ${
                    index < 3 ? 'text-yellow-500 fill-current' : 'text-gray-300 dark:text-gray-600'
                  }`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </span>
                </div>
              </div>

              {/* 종목 정보 */}
              <div className="col-span-3 flex items-center">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                    {stock.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {stock.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {stock.code}
                  </div>
                </div>
              </div>

              {/* 현재가 */}
              <div className="col-span-3 text-right">
                <div className="text-sm font-bold text-gray-900 dark:text-white">
                  {stock.price.toLocaleString()}원
                </div>
              </div>

              {/* 등락률 */}
              <div className="col-span-2 text-right">
                <div className={`text-sm font-bold ${
                  stock.changeRate > 0 ? 'text-red-500' :
                  stock.changeRate < 0 ? 'text-blue-500' : 'text-gray-500'
                }`}>
                  {stock.changeRate > 0 ? '+' : ''}{stock.changeRate.toFixed(2)}%
                </div>
              </div>

              {/* 거래대금 */}
              <div className="col-span-3 text-right">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatAmount(stock.amount)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

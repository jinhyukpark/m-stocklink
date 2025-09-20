'use client'

import React from 'react'
import DonutChart from './DonutChart'

const priceDistributionData = [
  {
    label: '하락',
    value: 52.9,
    color: '#60a5fa' // light blue
  },
  {
    label: '상승',
    value: 39.0,
    color: '#3b82f6' // blue
  },
  {
    label: '보합',
    value: 8.0,
    color: '#eab308' // yellow
  }
]

const investorTradingData = [
  {
    label: '개인',
    value: 50.6,
    color: '#3b82f6' // blue
  },
  {
    label: '외국인',
    value: 40.8,
    color: '#eab308' // yellow
  },
  {
    label: '기관',
    value: 8.6,
    color: '#60a5fa' // light blue
  }
]

export default function StockDistributionCharts() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* 주가 등락률 분포 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <DonutChart
          data={priceDistributionData}
          title="주가 등락률 분포 (상승/하락/보합)"
          size={160}
          strokeWidth={25}
        />
      </div>

      {/* 투자주체별 매수/매도 비중 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <DonutChart
          data={investorTradingData}
          title="투자주체별 매수/매도 비중"
          size={160}
          strokeWidth={25}
        />
      </div>
    </div>
  )
}

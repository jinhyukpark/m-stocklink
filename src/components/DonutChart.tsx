'use client'

import React from 'react'

interface DonutChartData {
  label: string
  value: number
  color: string
}

interface DonutChartProps {
  data: DonutChartData[]
  title: string
  size?: number
  strokeWidth?: number
}

export default function DonutChart({ 
  data, 
  title, 
  size = 200, 
  strokeWidth = 40 
}: DonutChartProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const center = size / 2

  let cumulativePercentage = 0

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 text-center">
        {title}
      </h3>
      
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* 배경 원 */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            className="dark:stroke-gray-600"
          />
          
          {/* 데이터 세그먼트들 */}
          {data.map((item, index) => {
            const percentage = item.value
            const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`
            const strokeDashoffset = -((cumulativePercentage / 100) * circumference)
            
            cumulativePercentage += percentage

            return (
              <circle
                key={index}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            )
          })}
        </svg>

      {/* 중앙 텍스트 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {data.reduce((sum, item) => sum + item.value, 0).toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">전체</div>
        </div>
      </div>
      </div>

      {/* 범례 */}
      <div className="mt-3 space-y-1.5 w-full">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div 
                className="w-2.5 h-2.5 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-gray-600 dark:text-gray-300">
                {item.label}
              </span>
            </div>
            <span className="text-xs font-semibold text-gray-900 dark:text-white">
              {item.value.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

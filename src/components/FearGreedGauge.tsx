'use client'

import React from 'react'

interface FearGreedGaugeProps {
  value: number
  level: string
  description: string
  previousValue?: number
}

export default function FearGreedGauge({ value, level, description, previousValue }: FearGreedGaugeProps) {
  const getGaugeColor = (val: number) => {
    if (val <= 20) return '#ef4444' // 빨강 - 극도 공포
    if (val <= 40) return '#f97316' // 주황 - 공포
    if (val <= 60) return '#eab308' // 노랑 - 중립
    if (val <= 80) return '#22c55e' // 초록 - 탐욕
    return '#16a34a' // 진한 초록 - 극도 탐욕
  }

  const getLevelColor = (val: number) => {
    if (val <= 20) return 'text-red-500'
    if (val <= 40) return 'text-orange-500'
    if (val <= 60) return 'text-yellow-500'
    if (val <= 80) return 'text-green-500'
    return 'text-green-600'
  }

  const change = previousValue ? value - previousValue : 0
  const changeText = change > 0 ? `+${change}` : change.toString()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">공포탐욕지수</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>

      {/* 게이지 */}
      <div className="relative flex justify-center mb-6">
        <div className="relative w-48 h-24">
          {/* 배경 반원 */}
          <svg className="w-full h-full" viewBox="0 0 200 100">
            {/* 배경 호 */}
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="12"
              className="dark:stroke-gray-600"
            />
            {/* 진행 호 */}
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              fill="none"
              stroke={getGaugeColor(value)}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${(value / 100) * 251.2} 251.2`}
              className="transition-all duration-1000 ease-out"
            />
            {/* 눈금 표시 */}
            {[0, 25, 50, 75, 100].map((tick, index) => {
              const angle = (tick / 100) * 180 - 90
              const x1 = 100 + 70 * Math.cos((angle * Math.PI) / 180)
              const y1 = 80 - 70 * Math.sin((angle * Math.PI) / 180)
              const x2 = 100 + 85 * Math.cos((angle * Math.PI) / 180)
              const y2 = 80 - 85 * Math.sin((angle * Math.PI) / 180)
              
              return (
                <g key={index}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#6b7280"
                    strokeWidth="2"
                    className="dark:stroke-gray-400"
                  />
                  <text
                    x={100 + 95 * Math.cos((angle * Math.PI) / 180)}
                    y={80 - 95 * Math.sin((angle * Math.PI) / 180) + 4}
                    textAnchor="middle"
                    className="text-xs fill-gray-500 dark:fill-gray-400 font-medium"
                  >
                    {tick}
                  </text>
                </g>
              )
            })}
            {/* 현재 값 표시 */}
            <circle
              cx={100 + 70 * Math.cos(((value / 100) * 180 - 90) * Math.PI / 180)}
              cy={80 - 70 * Math.sin(((value / 100) * 180 - 90) * Math.PI / 180)}
              r="6"
              fill={getGaugeColor(value)}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          
          {/* 중앙 값 표시 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-gray-900 dark:text-white">
              {value}
            </div>
            <div className={`text-lg font-semibold ${getLevelColor(value)}`}>
              {level}
            </div>
            {change !== 0 && (
              <div className={`text-sm font-medium ${
                change > 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {change > 0 ? '▲' : '▼'} {Math.abs(change)}pts
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 범례 */}
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>극도 공포</span>
        <span>중립</span>
        <span>극도 탐욕</span>
      </div>
    </div>
  )
}

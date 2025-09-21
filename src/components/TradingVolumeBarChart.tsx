'use client'

import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface TradingVolumeData {
  period: string
  individual: number
  foreign: number
  institution: number
}

interface TradingVolumeBarChartProps {
  data: TradingVolumeData[]
  title: string
  unit: string
}

export default function TradingVolumeBarChart({ data, title, unit }: TradingVolumeBarChartProps) {
  const chartData = data.map(item => ({
    period: item.period,
    개인: item.individual / 1000, // 천주 단위로 변환
    외국인: item.foreign / 1000,
    기관: item.institution / 1000,
  }))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()} {unit}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="period" 
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="개인" fill="#3b82f6" />
          <Bar dataKey="외국인" fill="#10b981" />
          <Bar dataKey="기관" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

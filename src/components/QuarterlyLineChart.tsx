'use client'

import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface QuarterlyData {
  quarter: string
  actual: number
  estimate: number
}

interface QuarterlyLineChartProps {
  data: QuarterlyData[]
  title: string
  unit: string
}

export default function QuarterlyLineChart({ data, title, unit }: QuarterlyLineChartProps) {
  const chartData = data.map(item => ({
    quarter: item.quarter,
    actual: item.actual,
    estimate: item.estimate,
  }))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">{label}</p>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            실제: {payload[0].value.toLocaleString()} {unit}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            예상: {payload[1].value.toLocaleString()} {unit}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="quarter" 
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="estimate" 
            stroke="#6b7280" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: '#6b7280', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

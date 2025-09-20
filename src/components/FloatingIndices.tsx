'use client'

import React, { useState, useEffect } from 'react'
import { indices } from '@/data/mockData'

export default function IndicesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // 2개씩 그룹으로 나누기
  const groupedIndices = []
  for (let i = 0; i < indices.length; i += 2) {
    groupedIndices.push(indices.slice(i, i + 2))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % groupedIndices.length)
    }, 3000) // 3초마다 변경

    return () => clearInterval(interval)
  }, [groupedIndices.length])

  const nextIndex = () => {
    setCurrentIndex((prev) => (prev + 1) % groupedIndices.length)
  }

  const prevIndex = () => {
    setCurrentIndex((prev) => (prev - 1 + groupedIndices.length) % groupedIndices.length)
  }

  return (
    <div className="bg-gray-900 dark:bg-gray-800 rounded-lg py-3 px-4 shadow-sm">
      {/* 카루셀 컨테이너 */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {groupedIndices.map((group, groupIndex) => (
            <div key={groupIndex} className="w-full flex-shrink-0">
              <div className="grid grid-cols-2 gap-6">
                {group.map((index, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-white font-medium text-sm mb-1">{index.name}</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-white font-semibold text-sm">
                        {index.value.toLocaleString()}
                      </div>
                      <div className={`text-xs font-medium ${
                        index.change >= 0 ? 'text-red-400' : 'text-blue-400'
                      }`}>
                        {index.change >= 0 ? '+' : ''}{index.change} ({index.changeRate >= 0 ? '+' : ''}{index.changeRate}%)
                      </div>
                    </div>
                  </div>
                ))}
                {/* 빈 공간 채우기 (2개가 안 될 때) */}
                {group.length < 2 && (
                  <div className="text-center">
                    <div className="text-gray-500 text-sm mb-1">-</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-gray-500 text-sm">-</div>
                      <div className="text-gray-500 text-xs">-</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 인디케이터 */}
      <div className="flex justify-center mt-2 space-x-1">
        {groupedIndices.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              index === currentIndex 
                ? 'bg-white' 
                : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

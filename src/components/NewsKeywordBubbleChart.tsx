'use client'

import React, { useState, useEffect } from 'react'
import { newsKeywords, getSentimentColor } from '@/data/mockData'

interface KeywordBubble {
  keyword: string
  importance: number
  sentiment: number
  color: string
  x: number
  y: number
  size: number
}

export default function NewsKeywordBubbleChart() {
  const [bubbles, setBubbles] = useState<KeywordBubble[]>([])
  const [hoveredBubble, setHoveredBubble] = useState<string | null>(null)

  useEffect(() => {
    // 버블 크기 계산 (중요도에 따라 20px ~ 80px)
    const minSize = 20
    const maxSize = 80
    const minImportance = Math.min(...newsKeywords.map(k => k.importance))
    const maxImportance = Math.max(...newsKeywords.map(k => k.importance))

    const generateBubbles = () => {
      const containerWidth = 300 // 컨테이너 너비
      const containerHeight = 200 // 컨테이너 높이
      const newBubbles: KeywordBubble[] = []

      newsKeywords.forEach((keyword, index) => {
        let attempts = 0
        let x, y, size

        // 크기 계산
        size = minSize + ((keyword.importance - minImportance) / (maxImportance - minImportance)) * (maxSize - minSize)

        // 위치 생성 (겹치지 않도록)
        do {
          x = Math.random() * (containerWidth - size)
          y = Math.random() * (containerHeight - size)
          attempts++
        } while (
          attempts < 50 && 
          newBubbles.some(bubble => {
            const distance = Math.sqrt(
              Math.pow(bubble.x + bubble.size/2 - (x + size/2), 2) + 
              Math.pow(bubble.y + bubble.size/2 - (y + size/2), 2)
            )
            return distance < (bubble.size + size) / 2 + 10 // 10px 여백
          })
        )

        newBubbles.push({
          keyword: keyword.keyword,
          importance: keyword.importance,
          sentiment: keyword.sentiment,
          color: getSentimentColor(keyword.sentiment),
          x,
          y,
          size
        })
      })

      setBubbles(newBubbles)
    }

    generateBubbles()

    // 5초마다 버블 위치 재생성
    const interval = setInterval(generateBubbles, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="text-red-500 mr-2">📰</span>
        이시간 뉴스 키워드
      </h3>
      
      <div className="relative" style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
        {bubbles.map((bubble, index) => (
          <div
            key={index}
            className="absolute flex items-center justify-center text-white font-medium cursor-pointer transition-all duration-300 hover:scale-110"
            style={{
              left: `${bubble.x}px`,
              top: `${bubble.y}px`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              backgroundColor: bubble.color,
              borderRadius: '50%',
              fontSize: `${Math.max(10, bubble.size * 0.2)}px`,
              zIndex: hoveredBubble === bubble.keyword ? 10 : 1,
              boxShadow: hoveredBubble === bubble.keyword 
                ? `0 0 20px ${bubble.color}40` 
                : `0 2px 8px ${bubble.color}30`
            }}
            onMouseEnter={() => setHoveredBubble(bubble.keyword)}
            onMouseLeave={() => setHoveredBubble(null)}
            title={`${bubble.keyword}\n중요도: ${bubble.importance}%\n감정: ${bubble.sentiment}%`}
          >
            {bubble.keyword}
          </div>
        ))}
      </div>

      {/* 색상 스펙트럼 띠 */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">감정 점수</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">부정 → 긍정</span>
        </div>
        <div className="relative h-4 rounded-full overflow-hidden">
          {/* 그라데이션 배경 */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00)'
            }}
          />
          {/* 구분선 */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-600"></div>
          {/* 라벨 */}
          <div className="absolute left-0 top-0 bottom-0 flex items-center">
            <span className="text-xs text-white font-medium ml-1">0</span>
          </div>
          <div className="absolute left-1/2 top-0 bottom-0 flex items-center transform -translate-x-1/2">
            <span className="text-xs text-gray-800 font-medium">50</span>
          </div>
          <div className="absolute right-0 top-0 bottom-0 flex items-center">
            <span className="text-xs text-white font-medium mr-1">100</span>
          </div>
        </div>
        
      </div>
    </div>
  )
}

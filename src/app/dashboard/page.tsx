'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import MobileLayout from '@/components/MobileLayout'
import FearGreedGauge from '@/components/FearGreedGauge'
import AIStockGrid from '@/components/AIStockGrid'
import RealTimeStockList from '@/components/RealTimeStockList'
import TrendingCategoriesCarousel from '@/components/TrendingCategoriesCarousel'
import StockDistributionCharts from '@/components/StockDistributionCharts'
import IndicesCarousel from '@/components/FloatingIndices'
import NewsKeywordBubbleChart from '@/components/NewsKeywordBubbleChart'
import {
  fearGreedIndex,
  chartData,
  trendingCategories,
  priceDistribution,
  investorTrading,
  indices
} from '@/data/mockData'

export default function DashboardPage() {
  const router = useRouter()

  return (
    <MobileLayout headerTitle="대시보드" showLogo={true}>
      <div className="flex-1 flex flex-col overflow-hidden">
                {/* 검색창 */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="종목명 또는 종목코드 검색"
                      onClick={() => router.push('/search')}
                      readOnly
                      className="w-full pl-10 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm cursor-pointer"
                    />
                    <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

        {/* 메인 컨텐츠 */}
        <div className="flex-1 p-4 space-y-6 overflow-y-auto">
          {/* 주요 지수 카루셀 */}
          <IndicesCarousel />

        {/* 공포탐욕지수 */}
        <FearGreedGauge 
          value={fearGreedIndex.current}
          level={fearGreedIndex.level}
          description={fearGreedIndex.description}
          previousValue={fearGreedIndex.previous}
        />

        {/* AI 종목 추천 그리드 */}
        <AIStockGrid 
          onViewAll={() => router.push('/ai-recommendations')}
          onFavoriteToggle={(stockId) => {
            // TODO: 즐겨찾기 토글 로직 구현
            console.log('Toggle favorite:', stockId)
          }}
        />

        {/* 실시간 주식 리스트 */}
        <RealTimeStockList />

        {/* 뜨는 카테고리 카루셀 */}
        <TrendingCategoriesCarousel />

        {/* 주가 등락률 분포 & 투자주체별 매수/매도 비중 */}
        <StockDistributionCharts />

          {/* 이시간 뉴스 키워드 버블차트 */}
          <NewsKeywordBubbleChart />
        </div>
      </div>
    </MobileLayout>
  )
}

'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import MobileLayout from '@/components/MobileLayout'
import AIRecommendationCard from '@/components/AIRecommendationCard'
import MomentumAnalysisCard from '@/components/MomentumAnalysisCard'
import WeeklyRecommendationGridItem from '@/components/WeeklyRecommendationGridItem'
import MomentumFilterModal from '@/components/MomentumFilterModal'
import { aiStockRecommendations, weeklyRecommendations, weeklyOptions } from '@/data/mockData'

const sortOptions = [
  { label: 'AI 점수 높은순', value: 'aiScore' },
  { label: '등락률 높은순', value: 'changeRate' },
  { label: '추천 상승률 높은순', value: 'recommendedRate' },
  { label: '종목명순', value: 'name' },
]

const predictionPeriodOptions = [
  { label: '5일', value: '5' },
  { label: '10일', value: '10' },
  { label: '20일', value: '20' },
  { label: '30일', value: '30' },
]

export default function AIRecommendationsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'weekly' | 'momentum'>('weekly')
  const [sortBy, setSortBy] = useState('aiScore')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedWeek, setSelectedWeek] = useState('2024-09-15')
  const [predictionPeriod, setPredictionPeriod] = useState('20')
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  // 주간 추천 데이터
  const weeklyStocks = (weeklyRecommendations[selectedWeek as keyof typeof weeklyRecommendations] || []) as Array<{
    id: string
    name: string
    code: string
    currentPrice: number
    change: number
    changeRate: number
    score: number
    tags: string[]
    descriptions: string[]
    isFavorite: boolean
  }>

  // 모멘텀 분석 데이터 (기존 AI 추천)
  const filteredAndSortedStocks = aiStockRecommendations
    .filter(stock => 
      stock.name.includes(searchQuery) || 
      stock.code.includes(searchQuery)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'aiScore':
          return b.aiScore - a.aiScore
        case 'changeRate':
          return b.changeRate - a.changeRate
        case 'recommendedRate':
          return (b.aiScore * 5.5) - (a.aiScore * 5.5)
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  const handleFavoriteToggle = (stockId: string) => {
    // TODO: 즐겨찾기 토글 로직 구현
    console.log('Toggle favorite:', stockId)
  }

  const handleStockClick = (stockId: string) => {
    router.push(`/stock/${stockId}`)
  }

  return (
    <MobileLayout headerTitle="AI 종목 추천">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 탭 메뉴 */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            onClick={() => setActiveTab('weekly')}
            className={`flex-1 py-4 px-4 text-center font-semibold transition-colors ${
              activeTab === 'weekly'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            주간추천
          </button>
          <button
            onClick={() => setActiveTab('momentum')}
            className={`flex-1 py-4 px-4 text-center font-semibold transition-colors ${
              activeTab === 'momentum'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            모멘텀분석
          </button>
        </div>

        {/* 주간 추천 탭 */}
        {activeTab === 'weekly' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* 주간 선택 */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="relative">
                <select
                  value={selectedWeek}
                  onChange={(e) => setSelectedWeek(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm appearance-none"
                >
                  {weeklyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* 주간 추천 리스트 */}
            <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
              <div className="p-4">
                {/* 제목 섹션 */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
                  {/* 20 Days Scoring 배너 */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg p-3 mb-4">
                    <h3 className="text-white font-bold text-center">20 Days Scoring</h3>
                  </div>

                  {/* 메인 제목 */}
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      KOSPI & KOSDAQ
                    </h2>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Ranking Powered by AI
                    </h3>
                  </div>

                  {/* 설명 문장 */}
                  <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    <p className="mb-2">
                      안녕하세요 <span className="text-blue-600 dark:text-blue-400 font-semibold">jhpark</span>님!
                    </p>
                    <p className="mb-2">
                      이는 Stocklink 고객에게 제공되는 <span className="text-blue-600 dark:text-blue-400 font-semibold">오늘의 주식 Score</span> 랭킹입니다.
                    </p>
                    <p className="mb-2">
                      이 랭킹은 Stocklink의 독자적인 <span className="text-blue-600 dark:text-blue-400 font-semibold">AI 점수</span>를 기반으로,
                    </p>
                    <p className="mb-2">
                      국내 <span className="text-blue-600 dark:text-blue-400 font-semibold">KOSDAQ, KOSPI</span> 주식 중 <span className="text-blue-600 dark:text-blue-400 font-semibold">20일 내</span>
                    </p>
                    <p>
                      시장 대비 초과 수익 가능성을 <span className="text-blue-600 dark:text-blue-400 font-semibold">1~10점</span> 수준으로 평가합니다.
                    </p>
                  </div>
                </div>

                {/* 주간 추천 그리드 */}
                <div className="space-y-3">
                  {weeklyStocks.map((stock, index) => (
                    <WeeklyRecommendationGridItem
                      key={stock.id}
                      stock={stock}
                      rank={index + 1}
                      onFavoriteToggle={handleFavoriteToggle}
                      onStockClick={handleStockClick}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 모멘텀 분석 탭 */}
        {activeTab === 'momentum' && (
          <div className="flex-1 flex flex-col overflow-hidden">
                    {/* 안내 문구 */}
                    <div className="p-4 bg-yellow-100 text-yellow-800 text-sm rounded-lg mb-4 flex justify-between items-center">
                      <span>모든 종목의 Scoring 정보 및 모멘텀 정보를 보시려면 Pro 라이센스 이상 필요합니다.</span>
                      <button 
                        onClick={() => router.push('/license')}
                        className="bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-md hover:bg-blue-600 transition-colors"
                      >
                        Pro 업그레이드
                      </button>
                    </div>
                    {/* 검색바 */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                      <div className="flex items-center space-x-3">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            placeholder="종목명 또는 종목코드 검색"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                          />
                          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        
                        {/* 필터 아이콘 */}
                        <button 
                          onClick={() => setIsFilterModalOpen(true)}
                          className="p-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 shadow-sm"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                          </svg>
                        </button>
                      </div>
                    </div>


            {/* 모멘텀 분석 리스트 */}
            <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
              <div className="p-4">
                {filteredAndSortedStocks.map((stock, index) => (
                  <MomentumAnalysisCard 
                    key={stock.id} 
                    stock={stock}
                    onFavoriteToggle={handleFavoriteToggle}
                    onStockClick={handleStockClick}
                    index={index} // Pass index to control skeleton
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 필터 모달 */}
      <MomentumFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        predictionPeriod={predictionPeriod}
        setPredictionPeriod={setPredictionPeriod}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </MobileLayout>
  )
}

'use client'

import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import MobileLayout from '@/components/MobileLayout'
import ProUpgradeOverlay from '@/components/ProUpgradeOverlay'
import { useAppStore } from '@/stores/useAppStore'
import { stocks, themes, industries, sortOptions, interestGroups } from '@/data/mockData'

export default function StocksPage() {
  const router = useRouter()
  const { stocks: stockState, setStockCategory, setStockSortBy, setStockSearchQuery, toggleFavorite } = useAppStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('news')
  const [customGroups, setCustomGroups] = useState(interestGroups)
  
  // 사용자 상태 (실제 앱에서는 로그인 상태나 라이센스 상태를 확인)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // 로그인 상태
  const [hasProLicense, setHasProLicense] = useState(false) // Pro 라이센스 보유 상태

  // 새 탭 추가 기능
  const addNewTab = () => {
    const newGroupId = `group${customGroups.length + 1}`
    const newGroup = {
      id: newGroupId,
      name: `관심그룹${customGroups.length + 1}`,
      stocks: []
    }
    setCustomGroups([...customGroups, newGroup])
    setActiveTab(newGroupId)
  }

  // 현재 활성 탭의 데이터
  const currentGroupData = useMemo(() => {
    return customGroups.find(group => group.id === activeTab) || customGroups[0]
  }, [activeTab, customGroups])

  // 필터링된 스톡 데이터 (현재 탭의 종목들)
  const filteredStocks = useMemo(() => {
    let filtered = currentGroupData.stocks

    // 검색어 필터링
    if (searchQuery) {
      filtered = filtered.filter(stock => 
        stock.name.includes(searchQuery) || 
        stock.code.includes(searchQuery)
      )
    }

    // 정렬
    filtered.sort((a, b) => {
      switch (stockState.sortBy) {
        case 'volume':
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return (b as any).volume - (a as any).volume
        case 'amount':
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return (b as any).amount - (a as any).amount
        case 'marketCap':
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return (b as any).marketCap - (a as any).marketCap
        case 'changeRate':
          return b.changeRate - a.changeRate
        default:
          return 0
      }
    })

    return filtered
  }, [currentGroupData.stocks, stockState.sortBy, searchQuery])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setStockSearchQuery(query)
  }

  const handleStockClick = (stockId: string) => {
    router.push(`/stock/${stockId}`)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000000000) {
      return (num / 1000000000000).toFixed(1) + 'T'
    } else if (num >= 100000000) {
      return (num / 100000000).toFixed(1) + '억'
    } else if (num >= 10000) {
      return (num / 10000).toFixed(1) + '만'
    }
    return num.toLocaleString()
  }

  return (
    <MobileLayout headerTitle="관심종목">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 검색바 */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="relative">
            <input
              type="text"
              placeholder="종목명 또는 종목코드 검색"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {/* 테스트용 토글 버튼 (실제 앱에서는 제거) */}
          <div className="flex items-center justify-center mt-3 space-x-4">
            <button
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                isLoggedIn 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}
            >
              {isLoggedIn ? '로그인됨' : '로그인 안됨'}
            </button>
            <button
              onClick={() => setHasProLicense(!hasProLicense)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                hasProLicense 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' 
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}
            >
              {hasProLicense ? 'Pro 라이센스' : 'Free 라이센스'}
            </button>
          </div>
        </div>

        {/* 탭 메뉴 - 아이폰 스타일 */}
        <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex space-x-1 overflow-x-auto">
            {/* 메인 탭들 */}
            <div className="flex bg-gray-200 dark:bg-gray-700 rounded-xl p-1 flex-1 min-w-0">
              {customGroups.map((group, index) => (
                <button
                  key={group.id}
                  onClick={() => setActiveTab(group.id)}
                  className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    activeTab === group.id
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {group.name}
                </button>
              ))}
            </div>
            
            {/* + 버튼 - 아이폰 스타일 */}
            <button
              onClick={addNewTab}
              className="ml-2 p-2.5 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 flex items-center justify-center min-w-[44px]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* 정렬 옵션 */}
        <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex space-x-2 overflow-x-auto">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setStockSortBy(option.value as 'volume' | 'amount' | 'marketCap' | 'changeRate')}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  stockState.sortBy === option.value
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* 스톡 리스트 */}
        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="p-4 space-y-4">
            {filteredStocks.length > 0 ? (
              filteredStocks.map((stock, index) => (
                <div
                  key={stock.id}
                  onClick={() => handleStockClick(stock.id)}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{stock.name}</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{stock.code}</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(stock.id)
                      }}
                      className={`p-3 rounded-full transition-all duration-200 ${
                        stock.isFavorite
                          ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                          : 'text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <svg className="w-5 h-5" fill={stock.isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>

                          <div className="flex items-center justify-between mb-4">
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                              {stock.price.toLocaleString()}원
                            </div>
                            <div className="text-right">
                              <div className={`text-xl font-bold ${
                                stock.change >= 0 ? 'text-red-500' : 'text-blue-500'
                              }`}>
                                {stock.change >= 0 ? '+' : ''}{stock.change.toLocaleString()}원
                              </div>
                              <div className={`text-base font-semibold ${
                                stock.changeRate >= 0 ? 'text-red-500' : 'text-blue-500'
                              }`}>
                                {stock.changeRate >= 0 ? '+' : ''}{stock.changeRate.toFixed(2)}%
                              </div>
                            </div>
                          </div>

                          {/* Score 표시 */}
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              종목 추천 Score
                            </div>
                            <div className="flex items-center space-x-2 relative">
                              {/* 첫 번째 종목이거나 Pro 라이센스가 있는 경우 정상 표시 */}
                              {(index === 0 || hasProLicense) ? (
                                <>
                                  <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"
                                      style={{ width: `${(stock.score / 12) * 100}%` }}
                                    />
                                  </div>
                                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                                    {stock.score}/12
                                  </span>
                                </>
                              ) : (
                                /* 두 번째 종목부터는 Pro 업그레이드 오버레이 표시 */
                                <div className="relative">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full opacity-30"
                                        style={{ width: `${(stock.score / 12) * 100}%` }}
                                      />
                                    </div>
                                    <span className="text-sm font-bold text-gray-400 dark:text-gray-500">
                                      {stock.score}/12
                                    </span>
                                  </div>
                                  <ProUpgradeOverlay />
                                </div>
                              )}
                            </div>
                          </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                  {currentGroupData.name}에 종목이 없습니다
                </div>
                <div className="text-gray-400 dark:text-gray-500 text-sm">
                  관심 종목을 추가해보세요
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}

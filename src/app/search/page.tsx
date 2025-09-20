'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MobileLayout from '@/components/MobileLayout'

// 검색 추천 종목 데이터
const searchSuggestions = [
  { id: '1', name: '레인보우로보틱스', code: '277810', market: '코스닥', category: '삼성' },
  { id: '2', name: '삼성전자', code: '005930', market: '코스피', category: '삼성' },
  { id: '3', name: '삼성SDI', code: '006400', market: '코스피', category: '삼성' },
  { id: '4', name: '삼성전기', code: '009150', market: '코스피', category: '삼성' },
  { id: '5', name: '삼성중공업', code: '010140', market: '코스피', category: '삼성' },
  { id: '6', name: 'LG화학', code: '051910', market: '코스피', category: 'LG' },
  { id: '7', name: 'LG전자', code: '066570', market: '코스피', category: 'LG' },
  { id: '8', name: 'LG에너지솔루션', code: '373220', market: '코스피', category: 'LG' },
  { id: '9', name: 'SK하이닉스', code: '000660', market: '코스피', category: 'SK' },
  { id: '10', name: 'SK텔레콤', code: '017670', market: '코스피', category: 'SK' },
  { id: '11', name: '현대차', code: '005380', market: '코스피', category: '현대' },
  { id: '12', name: '기아', code: '000270', market: '코스피', category: '현대' },
  { id: '13', name: 'NAVER', code: '035420', market: '코스피', category: 'IT' },
  { id: '14', name: '카카오', code: '035720', market: '코스피', category: 'IT' },
  { id: '15', name: 'POSCO홀딩스', code: '005490', market: '코스피', category: '철강' }
]

// 최근 조회 종목 데이터
const recentStocks = [
  {
    id: '1',
    name: 'Apple',
    koreanName: '애플',
    price: 245.50,
    change: 3.20,
    changeRate: 3.20,
    isUp: true
  },
  {
    id: '2',
    name: 'Samsung Electronics',
    koreanName: '삼성전자',
    price: 79700,
    change: -0.99,
    changeRate: -0.99,
    isUp: false
  },
  {
    id: '3',
    name: 'C-EARS',
    koreanName: '씨어스',
    price: 64100,
    change: 1.25,
    changeRate: 1.25,
    isUp: true
  }
]

// 실시간 인기 검색 데이터
const popularSearches = [
  { id: '1', name: 'Alteogen', koreanName: '알테오젠', trend: 'up' },
  { id: '2', name: 'Samsung Electronics', koreanName: '삼성전자', trend: 'neutral' },
  { id: '3', name: 'Robotis', koreanName: '로보티즈', trend: 'down' },
  { id: '4', name: 'Hyundai Motor Company', koreanName: '현대차', trend: 'new' },
  { id: '5', name: 'IonQ', koreanName: '아이온큐', trend: 'down' },
  { id: '6', name: 'Danal', koreanName: '다날', trend: 'neutral' },
  { id: '7', name: 'Robostar', koreanName: '로보스타', trend: 'up' }
]

// 검색 태그 데이터
const initialSearchTags = ['오로라', '포스코', '뷰노', 'LIG넥스원']

export default function SearchPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchTags, setSearchTags] = useState(initialSearchTags)
  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // 검색어에 따른 추천 종목 필터링
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = searchSuggestions.filter(stock =>
        stock.name.includes(searchQuery) ||
        stock.code.includes(searchQuery) ||
        stock.category.includes(searchQuery)
      )
      setFilteredSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setFilteredSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchQuery])

  const handleBack = () => {
    router.back()
  }

  const handleTagRemove = (tagToRemove: string) => {
    setSearchTags(prev => prev.filter(tag => tag !== tagToRemove))
  }

  const handleStockClick = (stock: any) => {
    // 종목 상세 페이지로 이동
    router.push(`/stock/${stock.id}`)
  }

  const handleSuggestionClick = (suggestion: any) => {
    setSearchQuery(suggestion.name)
    setShowSuggestions(false)
    // 종목 상세 페이지로 이동
    router.push(`/stock/${suggestion.id}`)
  }

  const handleSearchClick = (searchTerm: string) => {
    setSearchQuery(searchTerm)
    setShowSuggestions(false)
    // 검색 실행
    console.log('Search for:', searchTerm)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return (
          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        )
      case 'down':
        return (
          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )
      case 'new':
        return (
          <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">NEW</span>
        )
      default:
        return (
          <div className="w-4 h-0.5 bg-gray-400"></div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* 상태바 */}
      <div className="bg-white dark:bg-gray-900 px-4 py-2">
        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <span>1:59 AM</span>
          <div className="flex items-center space-x-1">
            <span>55%</span>
            <div className="w-6 h-3 border border-gray-400 rounded-sm">
              <div className="w-4/5 h-full bg-green-500 rounded-sm"></div>
            </div>
            <span>HD voice</span>
          </div>
        </div>
      </div>

      {/* 네비게이션 바 */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">검색 Plus</h1>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            인공지능 검색
          </button>
        </div>
      </div>

      {/* 검색 입력 영역 */}
      <div className="bg-white dark:bg-gray-900 px-4 py-4">
        <div className="relative">
          <input
            type="text"
            placeholder="인공지능을 검색해보세요"
            value={searchQuery}
            onChange={handleInputChange}
            className="w-full pl-4 pr-12 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
        </div>

        {/* 검색 태그 - 검색어가 없을 때만 표시 */}
        {!searchQuery && (
          <div className="flex flex-wrap gap-2 mt-3">
            {searchTags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full text-sm"
              >
                <span>{tag}</span>
                <button
                  onClick={() => handleTagRemove(tag)}
                  className="ml-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full p-0.5 transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 검색 추천어구 */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="bg-white dark:bg-gray-900 px-4 py-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{searchQuery}</h2>
            <button
              onClick={() => setShowSuggestions(false)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-2">
            {filteredSuggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                    {suggestion.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    A{suggestion.code} {suggestion.market}
                  </div>
                </div>
                <button className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  검색 Plus &gt;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 최근 조회 종목 - 검색어가 없을 때만 표시 */}
      {!searchQuery && (
        <div className="bg-white dark:bg-gray-900 px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">최근조회 종목</h2>
            <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              전체삭제
            </button>
          </div>
          
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {recentStocks.map((stock) => (
              <div
                key={stock.id}
                onClick={() => handleStockClick(stock)}
                className="flex-shrink-0 bg-gray-50 dark:bg-gray-800 rounded-xl p-4 min-w-[140px] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  {stock.koreanName}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {stock.name}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {stock.price.toLocaleString()}
                  </span>
                  <div className={`flex items-center text-xs font-semibold ${
                    stock.isUp ? 'text-red-500' : 'text-blue-500'
                  }`}>
                    {stock.isUp ? (
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    {stock.changeRate > 0 ? '+' : ''}{stock.changeRate}%
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            국내종목 KRX시세 기준
          </div>
        </div>
      )}

      {/* 실시간 인기 검색 - 검색어가 없을 때만 표시 */}
      {!searchQuery && (
        <div className="bg-white dark:bg-gray-900 px-4 py-4">
          <div className="flex items-center mb-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">실시간 인기 검색</h2>
            <button className="ml-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            09.21 01:30 기준
          </div>

          <div className="space-y-3">
            {popularSearches.map((search, index) => (
              <div
                key={search.id}
                onClick={() => handleSearchClick(search.koreanName)}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 w-6">
                    {index + 1}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {search.koreanName}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {search.name}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  {getTrendIcon(search.trend)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 하단 네비게이션 공간 */}
      <div className="h-20"></div>
    </div>
  )
}

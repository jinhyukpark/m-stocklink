'use client'

import React, { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import MobileLayout from '@/components/MobileLayout'

// 종목 상세 데이터 (실제로는 API에서 가져올 데이터)
const stockData: { [key: string]: any } = {
  '1': {
    id: '1',
    name: '레인보우로보틱스',
    code: '277810',
    market: '코스닥',
    currentPrice: 125000,
    change: 2500,
    changeRate: 2.04,
    isUp: true,
    volume: 1250000,
    marketCap: 1250000000000,
    high: 128000,
    low: 122000,
    open: 123000,
    previousClose: 122500,
    description: '로봇 기술 개발 및 제조업체',
    sector: '기술',
    industry: '로봇공학'
  },
  '2': {
    id: '2',
    name: '삼성전자',
    code: '005930',
    market: '코스피',
    currentPrice: 79700,
    change: -800,
    changeRate: -0.99,
    isUp: false,
    volume: 8500000,
    marketCap: 475000000000000,
    high: 81000,
    low: 79500,
    open: 80500,
    previousClose: 80500,
    description: '전자제품 제조 및 판매',
    sector: '기술',
    industry: '반도체'
  },
  '3': {
    id: '3',
    name: '삼성SDI',
    code: '006400',
    market: '코스피',
    currentPrice: 425000,
    change: 8500,
    changeRate: 2.04,
    isUp: true,
    volume: 450000,
    marketCap: 32000000000000,
    high: 430000,
    low: 420000,
    open: 416500,
    previousClose: 416500,
    description: '배터리 및 전자소재 제조',
    sector: '기술',
    industry: '배터리'
  }
}

export default function StockDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'company' | 'earnings' | 'dividend' | 'news' | 'disclosure' | 'investors' | 'financial' | 'metrics'>('company')
  const [newsFilter, setNewsFilter] = useState<'all' | 'neutral' | 'positive' | 'negative'>('all')
  
  const resolvedParams = use(params)
  const stock = stockData[resolvedParams.id] || stockData['1'] // 기본값으로 삼성전자

  const handleBack = () => {
    router.back()
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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* 상태바 */}
      <div className="bg-white dark:bg-gray-900 px-4 py-2">
        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <span>2:07</span>
          <div className="flex items-center space-x-1">
            <span>54%</span>
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
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{stock.name}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 종목 기본 정보 */}
      <div className="bg-white dark:bg-gray-900 px-4 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{stock.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{stock.code} {stock.market}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stock.currentPrice.toLocaleString()}원
            </div>
            <div className={`text-sm font-semibold ${
              stock.isUp ? 'text-red-500' : 'text-blue-500'
            }`}>
              {stock.isUp ? '+' : ''}{stock.change.toLocaleString()}원 ({stock.isUp ? '+' : ''}{stock.changeRate}%)
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mt-4 text-center">
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400">고가</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">{stock.high.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400">저가</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">{stock.low.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400">시가</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">{stock.open.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400">전일종가</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">{stock.previousClose.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="flex overflow-x-auto">
          {[
            { id: 'company', label: '기업정보' },
            { id: 'earnings', label: '실적' },
            { id: 'dividend', label: '배당' },
            { id: 'news', label: '뉴스' },
            { id: 'disclosure', label: '공시' },
            { id: 'investors', label: '투자자 동향' },
            { id: 'financial', label: '재무분석' },
            { id: 'metrics', label: '투자지표' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-shrink-0 py-4 px-4 text-center font-semibold transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-900">
        {activeTab === 'company' && (
          <div className="p-4 space-y-4">
            {/* 기업소개 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">기업소개</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">사업자번호</span>
                  <span className="text-gray-900 dark:text-white">113-81-44055</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">대표이사</span>
                  <span className="text-gray-900 dark:text-white">백현숙</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">설립일자</span>
                  <span className="text-gray-900 dark:text-white">1997년 07월 04일</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">기업규모</span>
                  <span className="text-gray-900 dark:text-white">중견기업</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">직원 수</span>
                  <span className="text-gray-900 dark:text-white">233명</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">회사주소</span>
                  <span className="text-gray-900 dark:text-white text-right text-sm">경기 성남시 분당구 분당로 55, 9층<br />(서현동,분당퍼스트타워)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">종목</span>
                  <span className="text-gray-900 dark:text-white text-right text-sm">소프트웨어 개발,공급<br />(모바일콘텐츠,유무선전화결제)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">홈페이지</span>
                  <a href="https://www.danal.co.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">www.danal.co.kr</a>
                </div>
              </div>
            </div>

            {/* 회사 소개 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">소개</h3>
              <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-3">
                <p>
                  동사는 소프트웨어 개발, 수출 및 판매 등을 영위할 목적으로 1997년 7월 설립되어 2004년 7월 코스닥시장에 상장됨.
                </p>
                <p>
                  휴대폰 결제 서비스를 주 사업으로 국내 뿐 아니라 해외에서도 결제 및 인증사업을 진행하고 있으며, 온/오프라인 휴대폰 결제를 비롯하여, 신용카드, 바코드 결제 등의 커머스사업을 진행하고 있음.
                </p>
                <p>
                  연결종속회사들의 사업부문은 커머스사업부문, 디지털콘텐츠부문, 프랜차이즈부문, 렌탈서비스부문으로 구별됨.
                </p>
              </div>
            </div>

            {/* 실적 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">실적</h3>
              <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-3">
                <p>
                  2024년 9월 전년동기 대비 연결기준 매출액은 <span className="text-red-600 dark:text-red-400 font-semibold">8.8% 감소</span>, 
                  영업이익은 <span className="text-green-600 dark:text-green-400 font-semibold">47.1% 증가</span>, 
                  당기순손실은 <span className="text-green-600 dark:text-green-400 font-semibold">55.7% 감소</span>.
                </p>
                <p>
                  동사는 온라인쇼핑시장 호조 및 신용카드 PG사업 확대 및 계열사 연구개발, 마케팅등 비용 감소로 이익성 증가하였음.
                </p>
                <p>
                  휴대폰 결제 내역을 활용한 비금융데이터를 이용한 신용평가 모델을 개발을 완료하였고, 온라인쇼핑 시장의 성장, 다날 신용카드 PG사업 확대 등에 따라 성장이 기대됨.
                </p>
              </div>
            </div>

            {/* 주주 정보 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">주주 정보</h3>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">As of: 2025년 01월 06일</div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">박성찬 외 1인</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">12,157,000주</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">17.63%</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">한국증권금융</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">3,491,090주</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">5.06%</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">자사주</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">2,156,040주</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">3.13%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 주요 제품 매출 구성 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">주요 제품 매출 구성</h3>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">As of: 2024년 09월</div>
              
              {/* 도넛 차트 */}
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    {/* 커머스사업부문 83.02% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="8"
                      strokeDasharray={`${83.02 * 2.51} ${(100 - 83.02) * 2.51}`}
                      strokeDashoffset="0"
                    />
                    {/* 디지털콘텐츠부문 11.86% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#14B8A6"
                      strokeWidth="8"
                      strokeDasharray={`${11.86 * 2.51} ${(100 - 11.86) * 2.51}`}
                      strokeDashoffset={`-${83.02 * 2.51}`}
                    />
                    {/* 프랜차이즈부문 5.12% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="8"
                      strokeDasharray={`${5.12 * 2.51} ${(100 - 5.12) * 2.51}`}
                      strokeDashoffset={`-${(83.02 + 11.86) * 2.51}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">100%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 범례 */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">커머스사업부문</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white ml-auto">83.02%</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-teal-500 rounded-full"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">디지털콘텐츠부문</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white ml-auto">11.86%</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">프랜차이즈부문</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white ml-auto">5.12%</span>
                </div>
              </div>
            </div>

            {/* 주요 제품 시장 점유율 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">주요 제품 시장 점유율</h3>
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">준비된 정보가 없습니다.</p>
                </div>
              </div>
            </div>
          </div>
        )}


        {activeTab === 'earnings' && (
          <div className="p-4 space-y-6">
            {/* 매출액 차트 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">매출액</h3>
                <div className="flex space-x-2">
                  <select className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>연결</option>
                    <option>별도</option>
                  </select>
                  <select className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>분기</option>
                    <option>연간</option>
                  </select>
                </div>
              </div>
              
              {/* 매출액 차트 */}
              <div className="h-64 mb-4">
                <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                  {/* Y축 그리드 라인 */}
                  <line x1="50" y1="20" x2="50" y2="180" stroke="#374151" strokeWidth="1"/>
                  <line x1="50" y1="180" x2="380" y2="180" stroke="#374151" strokeWidth="1"/>
                  
                  {/* Y축 라벨 */}
                  <text x="45" y="25" textAnchor="end" className="text-xs fill-gray-500">700억</text>
                  <text x="45" y="55" textAnchor="end" className="text-xs fill-gray-500">650억</text>
                  <text x="45" y="85" textAnchor="end" className="text-xs fill-gray-500">600억</text>
                  <text x="45" y="115" textAnchor="end" className="text-xs fill-gray-500">550억</text>
                  
                  {/* X축 라벨 */}
                  <text x="100" y="195" textAnchor="middle" className="text-xs fill-gray-500">24년 09월</text>
                  <text x="180" y="195" textAnchor="middle" className="text-xs fill-gray-500">24년 12월</text>
                  <text x="260" y="195" textAnchor="middle" className="text-xs fill-gray-500">25년 03월</text>
                  <text x="340" y="195" textAnchor="middle" className="text-xs fill-gray-500">25년 06월</text>
                  
                  {/* 그리드 라인 */}
                  <line x1="50" y1="40" x2="380" y2="40" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  <line x1="50" y1="70" x2="380" y2="70" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  <line x1="50" y1="100" x2="380" y2="100" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  <line x1="50" y1="130" x2="380" y2="130" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  
                  {/* 데이터 포인트 */}
                  <circle cx="100" cy="25" r="4" fill="#3B82F6"/>
                  <circle cx="180" cy="130" r="4" fill="#3B82F6"/>
                  <circle cx="260" cy="128" r="4" fill="#3B82F6"/>
                  <circle cx="340" cy="130" r="4" fill="#3B82F6"/>
                  
                  {/* 라인 연결 */}
                  <polyline
                    points="100,25 180,130 260,128 340,130"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              
              {/* 매출액 테이블 */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                      <th className="text-left py-2 text-gray-600 dark:text-gray-400">구분</th>
                      <th className="text-center py-2 text-gray-600 dark:text-gray-400">2024년 3분기</th>
                      <th className="text-center py-2 text-gray-600 dark:text-gray-400">2024년 4분기</th>
                      <th className="text-center py-2 text-gray-600 dark:text-gray-400">2025년 1분기</th>
                      <th className="text-center py-2 text-gray-600 dark:text-gray-400">2025년 2분기</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-2 text-gray-900 dark:text-white">실제 매출액</td>
                      <td className="text-center py-2 text-gray-900 dark:text-white">682억</td>
                      <td className="text-center py-2 text-gray-900 dark:text-white">565억</td>
                      <td className="text-center py-2 text-gray-900 dark:text-white">567억</td>
                      <td className="text-center py-2 text-gray-900 dark:text-white">565억</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-900 dark:text-white">예상 매출액</td>
                      <td className="text-center py-2 text-gray-500 dark:text-gray-400">-</td>
                      <td className="text-center py-2 text-gray-500 dark:text-gray-400">-</td>
                      <td className="text-center py-2 text-gray-500 dark:text-gray-400">-</td>
                      <td className="text-center py-2 text-gray-500 dark:text-gray-400">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 영업이익 차트 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">영업이익</h3>
                <div className="flex space-x-2">
                  <select className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>연결</option>
                    <option>별도</option>
                  </select>
                  <select className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>분기</option>
                    <option>연간</option>
                  </select>
                </div>
              </div>
              
              {/* 영업이익 차트 */}
              <div className="h-64 mb-4">
                <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                  {/* Y축 그리드 라인 */}
                  <line x1="50" y1="20" x2="50" y2="180" stroke="#374151" strokeWidth="1"/>
                  <line x1="50" y1="180" x2="380" y2="180" stroke="#374151" strokeWidth="1"/>
                  
                  {/* Y축 라벨 */}
                  <text x="45" y="25" textAnchor="end" className="text-xs fill-gray-500">100억</text>
                  <text x="45" y="55" textAnchor="end" className="text-xs fill-gray-500">50억</text>
                  <text x="45" y="105" textAnchor="end" className="text-xs fill-gray-500">0</text>
                  <text x="45" y="155" textAnchor="end" className="text-xs fill-gray-500">-50억</text>
                  <text x="45" y="185" textAnchor="end" className="text-xs fill-gray-500">-100억</text>
                  
                  {/* X축 라벨 */}
                  <text x="100" y="195" textAnchor="middle" className="text-xs fill-gray-500">24년 09월</text>
                  <text x="180" y="195" textAnchor="middle" className="text-xs fill-gray-500">24년 12월</text>
                  <text x="260" y="195" textAnchor="middle" className="text-xs fill-gray-500">25년 03월</text>
                  <text x="340" y="195" textAnchor="middle" className="text-xs fill-gray-500">25년 06월</text>
                  
                  {/* 그리드 라인 */}
                  <line x1="50" y1="40" x2="380" y2="40" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  <line x1="50" y1="70" x2="380" y2="70" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  <line x1="50" y1="100" x2="380" y2="100" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  <line x1="50" y1="130" x2="380" y2="130" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  <line x1="50" y1="160" x2="380" y2="160" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  
                  {/* 데이터 포인트 */}
                  <circle cx="100" cy="70" r="4" fill="#3B82F6"/>
                  <circle cx="180" cy="160" r="4" fill="#3B82F6"/>
                  <circle cx="260" cy="120" r="4" fill="#3B82F6"/>
                  <circle cx="340" cy="140" r="4" fill="#3B82F6"/>
                  
                  {/* 라인 연결 */}
                  <polyline
                    points="100,70 180,160 260,120 340,140"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              
              {/* 영업이익 테이블 */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                      <th className="text-left py-2 text-gray-600 dark:text-gray-400">구분</th>
                      <th className="text-center py-2 text-gray-600 dark:text-gray-400">2024년 3분기</th>
                      <th className="text-center py-2 text-gray-600 dark:text-gray-400">2024년 4분기</th>
                      <th className="text-center py-2 text-gray-600 dark:text-gray-400">2025년 1분기</th>
                      <th className="text-center py-2 text-gray-600 dark:text-gray-400">2025년 2분기</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-2 text-gray-900 dark:text-white">실제 영업이익</td>
                      <td className="text-center py-2 text-gray-900 dark:text-white">55억</td>
                      <td className="text-center py-2 text-red-500 dark:text-red-400">-61억</td>
                      <td className="text-center py-2 text-gray-900 dark:text-white">23억</td>
                      <td className="text-center py-2 text-gray-900 dark:text-white">11억</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-900 dark:text-white">예상 영업이익</td>
                      <td className="text-center py-2 text-gray-500 dark:text-gray-400">-</td>
                      <td className="text-center py-2 text-gray-500 dark:text-gray-400">-</td>
                      <td className="text-center py-2 text-gray-500 dark:text-gray-400">-</td>
                      <td className="text-center py-2 text-gray-500 dark:text-gray-400">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dividend' && (
          <div className="p-4 space-y-4">
            {/* 다날 최근 12개월 배당 요약 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">다날 최근 12개월</h3>
              <div className="grid grid-cols-3 gap-3">
                {/* 지급한 횟수 */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">지급한 횟수</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">4번</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">6월, 9월, 12월, 3월</div>
                </div>
                
                {/* 1주당 배당금 */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">1주당 배당금</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">연 1,444원</div>
                </div>
                
                {/* 배당 수익률 */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">배당 수익률</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">연 1.77%</div>
                </div>
              </div>
            </div>

            {/* 배당내역 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">배당내역 한국시간 기준</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                      <th className="text-left py-3 text-gray-600 dark:text-gray-400">배당락일</th>
                      <th className="text-left py-3 text-gray-600 dark:text-gray-400">배당지급일</th>
                      <th className="text-right py-3 text-gray-600 dark:text-gray-400">1주당 배당금</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 text-gray-900 dark:text-white">2024년 3월 28일</td>
                      <td className="py-3 text-gray-900 dark:text-white">2024년 5월 20일</td>
                      <td className="text-right py-3 text-gray-900 dark:text-white font-semibold">361원</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 text-gray-900 dark:text-white">2023년 12월 28일</td>
                      <td className="py-3 text-gray-900 dark:text-white">2024년 2월 20일</td>
                      <td className="text-right py-3 text-gray-900 dark:text-white font-semibold">361원</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 text-gray-900 dark:text-white">2023년 9월 28일</td>
                      <td className="py-3 text-gray-900 dark:text-white">2023년 11월 20일</td>
                      <td className="text-right py-3 text-gray-900 dark:text-white font-semibold">361원</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 text-gray-900 dark:text-white">2023년 6월 28일</td>
                      <td className="py-3 text-gray-900 dark:text-white">2023년 8월 20일</td>
                      <td className="text-right py-3 text-gray-900 dark:text-white font-semibold">361원</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-900 dark:text-white">2023년 3월 28일</td>
                      <td className="py-3 text-gray-900 dark:text-white">2023년 5월 20일</td>
                      <td className="text-right py-3 text-gray-900 dark:text-white font-semibold">361원</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="p-4 space-y-4">
            {/* 필터 버튼 */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {[
                  { id: 'all', label: '전체' },
                  { id: 'neutral', label: '중립' },
                  { id: 'positive', label: '긍정' },
                  { id: 'negative', label: '부정' }
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setNewsFilter(filter.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      newsFilter === filter.id
                        ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              
              {/* 정렬 옵션 */}
              <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                <span>최신순</span>
              </div>
            </div>

            {/* 뉴스 리스트 */}
            <div className="space-y-3">
              {[
                {
                  id: '1',
                  title: `${stock.name} 관련 최신 뉴스`,
                  summary: `${stock.name}의 최신 실적과 전망에 대한 분석이 나왔습니다.`,
                  time: '25.09.15',
                  source: '한국경제',
                  sentiment: 'neutral',
                  stockName: stock.name
                },
                {
                  id: '2',
                  title: `${stock.name} 투자 포인트`,
                  summary: `전문가들이 ${stock.name}의 투자 가치에 대해 평가했습니다.`,
                  time: '25.09.15',
                  source: '이데일리',
                  sentiment: 'positive',
                  stockName: stock.name
                },
                {
                  id: '3',
                  title: `${stock.name} 시장 동향`,
                  summary: `${stock.name} 관련 시장의 최신 동향을 분석합니다.`,
                  time: '25.09.15',
                  source: '조선비즈',
                  sentiment: 'positive',
                  stockName: stock.name
                },
                {
                  id: '4',
                  title: `${stock.name} 실적 발표`,
                  summary: `${stock.name}의 3분기 실적이 시장 기대를 상회했습니다.`,
                  time: '25.09.14',
                  source: '이데일리',
                  sentiment: 'negative',
                  stockName: stock.name
                },
                {
                  id: '5',
                  title: `${stock.name} 신사업 진출`,
                  summary: `${stock.name}이 새로운 사업 영역으로 진출한다고 발표했습니다.`,
                  time: '25.09.13',
                  source: '머니투데이',
                  sentiment: 'neutral',
                  stockName: stock.name
                }
              ]
              .filter(news => newsFilter === 'all' || news.sentiment === newsFilter)
              .map((news) => (
                <div key={news.id} className="bg-white dark:bg-gray-800 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          news.sentiment === 'positive' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : news.sentiment === 'negative'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {news.sentiment === 'positive' ? '긍정' : news.sentiment === 'negative' ? '부정' : '중립'}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{news.time} · {news.source}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2 leading-relaxed">
                        {news.title}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                          {news.stockName}
                        </span>
                        <div className="w-16 h-12 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'disclosure' && (
          <div className="p-4 space-y-3">
            {[
              {
                id: '1',
                title: '주요사항보고서 (실적공시)',
                summary: '2024년 3분기 연결기준 매출액 682억원, 영업이익 55억원',
                time: '2024.10.15',
                source: 'DART',
                type: '실적공시'
              },
              {
                id: '2',
                title: '임시주주총회 소집결의',
                summary: '2024년 12월 20일 임시주주총회 소집을 결의하였습니다.',
                time: '2024.11.20',
                source: 'DART',
                type: '주주총회'
              },
              {
                id: '3',
                title: '배당기준일 및 배당금 지급 결정',
                summary: '2024년 3분기 배당금 361원을 2025년 5월 20일 지급하기로 결정',
                time: '2024.09.28',
                source: 'DART',
                type: '배당'
              },
              {
                id: '4',
                title: '신규사업 진출 관련 공시',
                summary: 'AI 기반 결제 솔루션 신규사업 진출을 위한 투자 결정',
                time: '2024.08.15',
                source: 'DART',
                type: '사업계획'
              },
              {
                id: '5',
                title: '대표이사 변경 공시',
                summary: '백현숙 대표이사 취임에 관한 공시',
                time: '2024.07.01',
                source: 'DART',
                type: '임원변경'
              }
            ].map((disclosure) => (
              <div key={disclosure.id} className="bg-white dark:bg-gray-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    disclosure.type === '실적공시' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : disclosure.type === '배당'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                      : disclosure.type === '주주총회'
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
                      : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                  }`}>
                    {disclosure.type}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{disclosure.time}</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                  {disclosure.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  {disclosure.summary}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {disclosure.source}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'investors' && (
          <div className="p-4 space-y-4">
            {/* 기간별 거래량 차트 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">기간별 거래량</h3>
                <div className="flex space-x-1">
                  <button className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded">주</button>
                  <button className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700">월</button>
                  <button className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700">년</button>
                </div>
              </div>
              
              {/* 차트 */}
              <div className="h-64 mb-4">
                <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                  {/* Y축 그리드 라인 */}
                  <line x1="60" y1="20" x2="60" y2="180" stroke="#374151" strokeWidth="1"/>
                  <line x1="60" y1="180" x2="580" y2="180" stroke="#374151" strokeWidth="1"/>
                  
                  {/* Y축 라벨 */}
                  <text x="55" y="25" textAnchor="end" className="text-xs fill-gray-500">+2M</text>
                  <text x="55" y="55" textAnchor="end" className="text-xs fill-gray-500">+1M</text>
                  <text x="55" y="105" textAnchor="end" className="text-xs fill-gray-500">0</text>
                  <text x="55" y="155" textAnchor="end" className="text-xs fill-gray-500">-1M</text>
                  <text x="55" y="185" textAnchor="end" className="text-xs fill-gray-500">-2M</text>
                  
                  {/* X축 라벨 */}
                  <text x="120" y="195" textAnchor="middle" className="text-xs fill-gray-500">8월 2주</text>
                  <text x="200" y="195" textAnchor="middle" className="text-xs fill-gray-500">8월 3주</text>
                  <text x="280" y="195" textAnchor="middle" className="text-xs fill-gray-500">8월 4주</text>
                  <text x="360" y="195" textAnchor="middle" className="text-xs fill-gray-500">9월 1주</text>
                  <text x="440" y="195" textAnchor="middle" className="text-xs fill-gray-500">9월 2주</text>
                  <text x="520" y="195" textAnchor="middle" className="text-xs fill-gray-500">9월 3주</text>
                  
                  {/* 그리드 라인 */}
                  <line x1="60" y1="40" x2="580" y2="40" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  <line x1="60" y1="70" x2="580" y2="70" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  <line x1="60" y1="100" x2="580" y2="100" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  <line x1="60" y1="130" x2="580" y2="130" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  <line x1="60" y1="160" x2="580" y2="160" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  
                  {/* 개인 (파란색) - 8월 2주부터 9월 2주까지는 작은 음수, 9월 3주는 큰 음수 */}
                  <rect x="100" y="110" width="40" height="20" fill="#3B82F6" opacity="0.8"/>
                  <rect x="180" y="110" width="40" height="20" fill="#3B82F6" opacity="0.8"/>
                  <rect x="260" y="110" width="40" height="20" fill="#3B82F6" opacity="0.8"/>
                  <rect x="340" y="110" width="40" height="20" fill="#3B82F6" opacity="0.8"/>
                  <rect x="420" y="110" width="40" height="20" fill="#3B82F6" opacity="0.8"/>
                  <rect x="500" y="150" width="40" height="60" fill="#3B82F6" opacity="0.8"/>
                  
                  {/* 외국인 (주황색) - 8월 2주부터 9월 2주까지는 작은 양수, 9월 3주는 큰 양수 */}
                  <rect x="110" y="100" width="40" height="20" fill="#F97316" opacity="0.8"/>
                  <rect x="190" y="100" width="40" height="20" fill="#F97316" opacity="0.8"/>
                  <rect x="270" y="100" width="40" height="20" fill="#F97316" opacity="0.8"/>
                  <rect x="350" y="100" width="40" height="20" fill="#F97316" opacity="0.8"/>
                  <rect x="430" y="100" width="40" height="20" fill="#F97316" opacity="0.8"/>
                  <rect x="510" y="80" width="40" height="40" fill="#F97316" opacity="0.8"/>
                  
                  {/* 기관 (청록색) - 8월 2주부터 9월 2주까지는 작은 양수, 9월 3주는 중간 양수 */}
                  <rect x="120" y="105" width="40" height="15" fill="#14B8A6" opacity="0.8"/>
                  <rect x="200" y="105" width="40" height="15" fill="#14B8A6" opacity="0.8"/>
                  <rect x="280" y="105" width="40" height="15" fill="#14B8A6" opacity="0.8"/>
                  <rect x="360" y="105" width="40" height="15" fill="#14B8A6" opacity="0.8"/>
                  <rect x="440" y="105" width="40" height="15" fill="#14B8A6" opacity="0.8"/>
                  <rect x="520" y="90" width="40" height="30" fill="#14B8A6" opacity="0.8"/>
                </svg>
              </div>
              
              {/* 범례 */}
              <div className="flex justify-center space-x-6 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">개인</span>
                  <span className="font-semibold text-gray-900 dark:text-white">-4,096,929</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">외국인</span>
                  <span className="font-semibold text-gray-900 dark:text-white">+3,497,693</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-teal-500 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">기관</span>
                  <span className="font-semibold text-gray-900 dark:text-white">+731,791</span>
                </div>
              </div>
            </div>

            {/* 일별 거래량 테이블 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">일별 거래량</h3>
                <div className="flex space-x-1">
                  <button className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded">투자자별</button>
                  <button className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700">기관별</button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                      <th className="text-left py-2 text-gray-600 dark:text-gray-400">날짜</th>
                      <th className="text-right py-2 text-gray-600 dark:text-gray-400">개인</th>
                      <th className="text-right py-2 text-gray-600 dark:text-gray-400">외국인</th>
                      <th className="text-right py-2 text-gray-600 dark:text-gray-400">기관</th>
                      <th className="text-right py-2 text-gray-600 dark:text-gray-400">기타법인</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { date: '09.19', individual: -3514926, foreigner: 3106060, institution: 678928, other: -259577 },
                      { date: '09.18', individual: -943508, foreigner: 755282, institution: 77149, other: 110127 },
                      { date: '09.17', individual: 274223, foreigner: -154802, institution: -104427, other: -20483 },
                      { date: '09.16', individual: 88963, foreigner: -140400, institution: 32556, other: 18044 },
                      { date: '09.15', individual: -1681, foreigner: -68447, institution: 47585, other: 18410 },
                      { date: '09.12', individual: 372541, foreigner: -518170, institution: 304702, other: -122380 },
                      { date: '09.11', individual: 450029, foreigner: -408664, institution: 61856, other: -109924 },
                      { date: '09.10', individual: -1470344, foreigner: 1376193, institution: 4519, other: 79125 },
                      { date: '09.09', individual: 189713, foreigner: -162669, institution: -22250, other: -2105 },
                      { date: '09.08', individual: -86534, foreigner: 95438, institution: -10559, other: -2363 },
                      { date: '09.05', individual: 194801, foreigner: -201548, institution: -325, other: 10267 },
                      { date: '09.04', individual: -164702, foreigner: 1229, institution: 55071, other: 113180 },
                      { date: '09.03', individual: 127880, foreigner: -106897, institution: 14214, other: -28247 },
                      { date: '09.02', individual: 492096, foreigner: -584613, institution: 78172, other: 20350 },
                      { date: '09.01', individual: -629426, foreigner: 738229, institution: -97579, other: -22990 }
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-2 text-gray-900 dark:text-white">{row.date}</td>
                        <td className={`text-right py-2 font-semibold ${
                          row.individual >= 0 ? 'text-red-500' : 'text-blue-500'
                        }`}>
                          {row.individual >= 0 ? '+' : ''}{row.individual.toLocaleString()}
                        </td>
                        <td className={`text-right py-2 font-semibold ${
                          row.foreigner >= 0 ? 'text-red-500' : 'text-blue-500'
                        }`}>
                          {row.foreigner >= 0 ? '+' : ''}{row.foreigner.toLocaleString()}
                        </td>
                        <td className={`text-right py-2 font-semibold ${
                          row.institution >= 0 ? 'text-red-500' : 'text-blue-500'
                        }`}>
                          {row.institution >= 0 ? '+' : ''}{row.institution.toLocaleString()}
                        </td>
                        <td className={`text-right py-2 font-semibold ${
                          row.other >= 0 ? 'text-red-500' : 'text-blue-500'
                        }`}>
                          {row.other >= 0 ? '+' : ''}{row.other.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'financial' && (
          <div className="p-4 space-y-4">
            {/* 재무제표 보기 버튼 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <button className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <span>재무제표 보기</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* 실적 섹션 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">실적</h3>
                <div className="flex space-x-1">
                  <button className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded">연결</button>
                  <button className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded">분기</button>
                </div>
              </div>
              
              {/* 실적 지표 선택 */}
              <div className="flex space-x-2 mb-4">
                <button className="px-3 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded">매출</button>
                <button className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700">영업이익</button>
              </div>
              
              {/* 실적 차트 */}
              <div className="h-48 mb-4">
                <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                  {/* Y축 그리드 라인 */}
                  <line x1="50" y1="20" x2="50" y2="130" stroke="#374151" strokeWidth="1"/>
                  <line x1="50" y1="130" x2="450" y2="130" stroke="#374151" strokeWidth="1"/>
                  
                  {/* Y축 라벨 */}
                  <text x="45" y="25" textAnchor="end" className="text-xs fill-gray-500">50억</text>
                  <text x="45" y="55" textAnchor="end" className="text-xs fill-gray-500">40억</text>
                  <text x="45" y="85" textAnchor="end" className="text-xs fill-gray-500">30억</text>
                  <text x="45" y="115" textAnchor="end" className="text-xs fill-gray-500">20억</text>
                  <text x="45" y="135" textAnchor="end" className="text-xs fill-gray-500">10억</text>
                  
                  {/* X축 라벨 */}
                  <text x="100" y="145" textAnchor="middle" className="text-xs fill-gray-500">24년 06월</text>
                  <text x="180" y="145" textAnchor="middle" className="text-xs fill-gray-500">24년 09월</text>
                  <text x="260" y="145" textAnchor="middle" className="text-xs fill-gray-500">24년 12월</text>
                  <text x="340" y="145" textAnchor="middle" className="text-xs fill-gray-500">25년 03월</text>
                  <text x="420" y="145" textAnchor="middle" className="text-xs fill-gray-500">25년 06월</text>
                  
                  {/* 그리드 라인 */}
                  <line x1="50" y1="40" x2="450" y2="40" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  <line x1="50" y1="70" x2="450" y2="70" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  <line x1="50" y1="100" x2="450" y2="100" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  <line x1="50" y1="130" x2="450" y2="130" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  
                  {/* 매출 데이터 포인트 */}
                  <circle cx="100" cy="120" r="4" fill="#3B82F6"/>
                  <circle cx="180" cy="100" r="4" fill="#3B82F6"/>
                  <circle cx="260" cy="80" r="4" fill="#3B82F6"/>
                  <circle cx="340" cy="125" r="4" fill="#3B82F6"/>
                  <circle cx="420" cy="110" r="4" fill="#3B82F6"/>
                  
                  {/* 매출 라인 연결 */}
                  <polyline
                    points="100,120 180,100 260,80 340,125 420,110"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              
              {/* 범례 */}
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">추정치</span>
                  <span className="text-gray-500 dark:text-gray-400">-</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">발표치</span>
                  <span className="font-semibold text-gray-900 dark:text-white">38억</span>
                </div>
              </div>
            </div>

            {/* 재무 섹션 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">재무</h3>
                <div className="flex space-x-1">
                  <button className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded">연결</button>
                  <button className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded">분기</button>
                </div>
              </div>
              
              {/* 재무 차트 */}
              <div className="h-48 mb-4">
                <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                  {/* Y축 그리드 라인 */}
                  <line x1="50" y1="20" x2="50" y2="130" stroke="#374151" strokeWidth="1"/>
                  <line x1="50" y1="130" x2="450" y2="130" stroke="#374151" strokeWidth="1"/>
                  
                  {/* Y축 라벨 */}
                  <text x="45" y="25" textAnchor="end" className="text-xs fill-gray-500">+50억</text>
                  <text x="45" y="55" textAnchor="end" className="text-xs fill-gray-500">+25억</text>
                  <text x="45" y="85" textAnchor="end" className="text-xs fill-gray-500">0</text>
                  <text x="45" y="115" textAnchor="end" className="text-xs fill-gray-500">-25억</text>
                  <text x="45" y="135" textAnchor="end" className="text-xs fill-gray-500">-50억</text>
                  
                  {/* X축 라벨 */}
                  <text x="100" y="145" textAnchor="middle" className="text-xs fill-gray-500">24년 06월</text>
                  <text x="180" y="145" textAnchor="middle" className="text-xs fill-gray-500">24년 09월</text>
                  <text x="260" y="145" textAnchor="middle" className="text-xs fill-gray-500">24년 12월</text>
                  <text x="340" y="145" textAnchor="middle" className="text-xs fill-gray-500">25년 03월</text>
                  <text x="420" y="145" textAnchor="middle" className="text-xs fill-gray-500">25년 06월</text>
                  
                  {/* 그리드 라인 */}
                  <line x1="50" y1="40" x2="450" y2="40" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  <line x1="50" y1="70" x2="450" y2="70" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  <line x1="50" y1="100" x2="450" y2="100" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  <line x1="50" y1="130" x2="450" y2="130" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  
                  {/* 25년 03월 - 파란색 바 (양수) */}
                  <rect x="320" y="80" width="40" height="20" fill="#60A5FA" opacity="0.8"/>
                  
                  {/* 25년 03월 - 회색 바 (음수) */}
                  <rect x="330" y="110" width="40" height="20" fill="#6B7280" opacity="0.8"/>
                  
                  {/* 25년 06월 - 주황색 바 (음수) */}
                  <rect x="400" y="120" width="40" height="10" fill="#F97316" opacity="0.8"/>
                  
                  {/* 25년 06월 - 노란색 바 (음수) */}
                  <rect x="410" y="125" width="40" height="5" fill="#FBBF24" opacity="0.8"/>
                </svg>
              </div>
              
              {/* 재무 지표 */}
              <div className="flex justify-center space-x-8 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">매출</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">38억</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">영업이익</span>
                  <span className="text-sm font-semibold text-red-500">-24억</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">순이익</span>
                  <span className="text-sm font-semibold text-red-500">-25억</span>
                </div>
              </div>
              
            </div>

            {/* 안정성 섹션 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">안정성</h3>
                <div className="flex space-x-1">
                  <button className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded">연결</button>
                  <button className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded">분기</button>
                </div>
              </div>
              
              {/* 안정성 지표 선택 */}
              <div className="flex space-x-2 mb-4">
                <button className="px-3 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded">부채비율</button>
                <button className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700">유동비율</button>
              </div>
              
              {/* 안정성 차트 */}
              <div className="h-48 mb-4">
                <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                  {/* Y축 그리드 라인 */}
                  <line x1="50" y1="20" x2="50" y2="130" stroke="#374151" strokeWidth="1"/>
                  <line x1="50" y1="130" x2="450" y2="130" stroke="#374151" strokeWidth="1"/>
                  
                  {/* Y축 라벨 */}
                  <text x="45" y="25" textAnchor="end" className="text-xs fill-gray-500">120%</text>
                  <text x="45" y="55" textAnchor="end" className="text-xs fill-gray-500">100%</text>
                  <text x="45" y="85" textAnchor="end" className="text-xs fill-gray-500">80%</text>
                  <text x="45" y="115" textAnchor="end" className="text-xs fill-gray-500">60%</text>
                  
                  {/* X축 라벨 */}
                  <text x="100" y="145" textAnchor="middle" className="text-xs fill-gray-500">24년 06월</text>
                  <text x="180" y="145" textAnchor="middle" className="text-xs fill-gray-500">24년 09월</text>
                  <text x="260" y="145" textAnchor="middle" className="text-xs fill-gray-500">24년 12월</text>
                  <text x="340" y="145" textAnchor="middle" className="text-xs fill-gray-500">25년 03월</text>
                  <text x="420" y="145" textAnchor="middle" className="text-xs fill-gray-500">25년 06월</text>
                  
                  {/* 그리드 라인 */}
                  <line x1="50" y1="40" x2="450" y2="40" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  <line x1="50" y1="70" x2="450" y2="70" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  <line x1="50" y1="100" x2="450" y2="100" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  
                  {/* 부채비율 라인 차트 */}
                  <polyline
                    points="100,95 180,75 260,55 340,85 420,90"
                    fill="none"
                    stroke="#F97316"
                    strokeWidth="2"
                  />
                  
                  {/* 데이터 포인트 */}
                  <circle cx="100" cy="95" r="3" fill="#F97316"/>
                  <circle cx="180" cy="75" r="3" fill="#F97316"/>
                  <circle cx="260" cy="55" r="3" fill="#F97316"/>
                  <circle cx="340" cy="85" r="3" fill="#F97316"/>
                  <circle cx="420" cy="90" r="3" fill="#F97316"/>
                  
                  {/* 데이터 라벨 */}
                  <text x="100" y="90" textAnchor="middle" className="text-xs fill-gray-500">73.36%</text>
                  <text x="180" y="70" textAnchor="middle" className="text-xs fill-gray-500">93.03%</text>
                  <text x="260" y="50" textAnchor="middle" className="text-xs fill-gray-500">117.29%</text>
                  <text x="340" y="80" textAnchor="middle" className="text-xs fill-gray-500">97.69%</text>
                  <text x="420" y="85" textAnchor="middle" className="text-xs fill-gray-500">92.95%</text>
                </svg>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="p-4 space-y-4">
            {/* 투자지표 섹션 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">투자지표</h3>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <select className="px-3 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option>연결</option>
                  <option>별도</option>
                </select>
              </div>
              
              {/* 투자지표 그리드 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">시가총액</div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">6,988억 2,000만</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">배당수익률</div>
                  <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">-</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">PBR</div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">6.88배</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">PER</div>
                  <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">-</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">ROE</div>
                  <div className="text-sm font-semibold text-red-500">-7.06%</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">PSR</div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">68.30배</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 col-span-2">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">외국인 지분율</div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">3.75%</div>
                </div>
              </div>
            </div>

            {/* 가치평가지표 섹션 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">가치 평가 지표</h3>
                <div className="flex space-x-2">
                  <select className="px-3 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>연결</option>
                    <option>별도</option>
                  </select>
                  <select className="px-3 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>분기</option>
                    <option>연간</option>
                  </select>
                </div>
              </div>
              
              {/* 가치평가 라인 차트 */}
              <div className="h-64 mb-4">
                <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                  {/* Y축 그리드 라인 */}
                  <line x1="60" y1="20" x2="60" y2="180" stroke="#374151" strokeWidth="1"/>
                  <line x1="60" y1="180" x2="540" y2="180" stroke="#374151" strokeWidth="1"/>
                  
                  {/* Y축 라벨 */}
                  <text x="55" y="25" textAnchor="end" className="text-xs fill-gray-500">200</text>
                  <text x="55" y="55" textAnchor="end" className="text-xs fill-gray-500">150</text>
                  <text x="55" y="85" textAnchor="end" className="text-xs fill-gray-500">100</text>
                  <text x="55" y="115" textAnchor="end" className="text-xs fill-gray-500">50</text>
                  <text x="55" y="145" textAnchor="end" className="text-xs fill-gray-500">0</text>
                  
                  {/* X축 라벨 */}
                  <text x="120" y="195" textAnchor="middle" className="text-xs fill-gray-500">24년 06월</text>
                  <text x="200" y="195" textAnchor="middle" className="text-xs fill-gray-500">24년 09월</text>
                  <text x="280" y="195" textAnchor="middle" className="text-xs fill-gray-500">24년 12월</text>
                  <text x="360" y="195" textAnchor="middle" className="text-xs fill-gray-500">25년 03월</text>
                  <text x="440" y="195" textAnchor="middle" className="text-xs fill-gray-500">25년 06월</text>
                  
                  {/* 그리드 라인 */}
                  <line x1="60" y1="40" x2="540" y2="40" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  <line x1="60" y1="70" x2="540" y2="70" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  <line x1="60" y1="100" x2="540" y2="100" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  <line x1="60" y1="130" x2="540" y2="130" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  <line x1="60" y1="160" x2="540" y2="160" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  
                  {/* PER 라인 (파란색) - 24년 06월부터 급상승 */}
                  <circle cx="120" cy="85" r="4" fill="#3B82F6"/>
                  <circle cx="200" cy="80" r="4" fill="#3B82F6"/>
                  <circle cx="280" cy="120" r="4" fill="#3B82F6"/>
                  <circle cx="360" cy="50" r="4" fill="#3B82F6"/>
                  <circle cx="440" cy="30" r="4" fill="#3B82F6"/>
                  
                  <polyline
                    points="120,85 200,80 280,120 360,50 440,30"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                  />
                  
                  {/* PBR 라인 (청록색) - 낮은 수준에서 안정적 */}
                  <circle cx="120" cy="160" r="4" fill="#14B8A6"/>
                  <circle cx="200" cy="155" r="4" fill="#14B8A6"/>
                  <circle cx="280" cy="165" r="4" fill="#14B8A6"/>
                  <circle cx="360" cy="158" r="4" fill="#14B8A6"/>
                  <circle cx="440" cy="162" r="4" fill="#14B8A6"/>
                  
                  <polyline
                    points="120,160 200,155 280,165 360,158 440,162"
                    fill="none"
                    stroke="#14B8A6"
                    strokeWidth="2"
                  />
                  
                  {/* PSR 라인 (보라색) - PBR보다 약간 높은 수준에서 안정적 */}
                  <circle cx="120" cy="150" r="4" fill="#8B5CF6"/>
                  <circle cx="200" cy="145" r="4" fill="#8B5CF6"/>
                  <circle cx="280" cy="155" r="4" fill="#8B5CF6"/>
                  <circle cx="360" cy="148" r="4" fill="#8B5CF6"/>
                  <circle cx="440" cy="152" r="4" fill="#8B5CF6"/>
                  
                  <polyline
                    points="120,150 200,145 280,155 360,148 440,152"
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              
              {/* 범례 */}
              <div className="flex justify-center space-x-6 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">PER</span>
                  <span className="font-semibold text-gray-900 dark:text-white">205.14배</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">PBR</span>
                  <span className="font-semibold text-gray-900 dark:text-white">3.48배</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">PSR</span>
                  <span className="font-semibold text-gray-900 dark:text-white">17.88배</span>
                </div>
              </div>
            </div>

            {/* 더 보기 버튼 */}
            <div className="text-center">
              <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center justify-center space-x-1 mx-auto">
                <span>더 보기</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* 하단 네비게이션 공간 */}
      <div className="h-20"></div>
    </div>
  )
}

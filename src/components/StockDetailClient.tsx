'use client'

import React, { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import MobileLayout from '@/components/MobileLayout'
import QuarterlyLineChart from '@/components/QuarterlyLineChart'
import TradingVolumeBarChart from '@/components/TradingVolumeBarChart'
import FinancialLineChart from '@/components/FinancialLineChart'
import ValuationMetricsChart from '@/components/ValuationMetricsChart'
import DonutChart from '@/components/DonutChart'

// 종목 상세 데이터 (실제로는 API에서 가져올 데이터)
const stockData: { [key: string]: unknown } = {
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
    prevClose: 122500,
    description: '로봇 기술 개발 및 제조업체',
    sector: '기술',
    industry: '로봇공학',
    employees: 500,
    founded: '2015-02-01',
    ceo: '이정호',
    headquarters: '대전광역시 유성구',
    website: 'https://www.rainbow-robotics.com',
    revenue: 100000000000,
    operatingProfit: 10000000000,
    netProfit: 8000000000,
    debtToEquity: 50,
    roe: 15,
    per: 30,
    pbr: 5,
    psr: 2,
    dividendYield: 0.5,
    foreignOwnership: 10,
    majorShareholders: [
      { name: '삼성전자', percentage: 15 },
      { name: '국민연금', percentage: 5 },
    ],
    productSales: [
      { product: '협동 로봇', percentage: 60 },
      { product: '이족 보행 로봇', percentage: 30 },
      { product: '기타', percentage: 10 },
    ],
    quarterlyRevenue: [
      { quarter: '23.1Q', actual: 200, estimate: 190 },
      { quarter: '23.2Q', actual: 220, estimate: 210 },
      { quarter: '23.3Q', actual: 250, estimate: 240 },
      { quarter: '23.4Q', actual: 280, estimate: 270 },
      { quarter: '24.1Q', actual: 300, estimate: 290 },
    ],
    quarterlyOperatingProfit: [
      { quarter: '23.1Q', actual: 20, estimate: 18 },
      { quarter: '23.2Q', actual: 25, estimate: 23 },
      { quarter: '23.3Q', actual: 30, estimate: 28 },
      { quarter: '23.4Q', actual: 35, estimate: 33 },
      { quarter: '24.1Q', actual: 40, estimate: 38 },
    ],
    dividendHistory: [
      { date: '2023-12-31', amount: 100 },
      { date: '2022-12-31', amount: 80 },
      { date: '2021-12-31', amount: 70 },
    ],
    news: [
      { title: '레인보우로보틱스, 삼성전자와 협력 강화', summary: '삼성전자와의 협력으로 로봇 시장 확대 기대', time: '2024-01-15', source: '연합뉴스', sentiment: 'positive' },
      { title: '로봇 산업 성장세 지속, 레인보우로보틱스 수혜', summary: '글로벌 로봇 시장 확대에 따른 실적 개선 전망', time: '2024-01-10', source: '한국경제', sentiment: 'positive' },
      { title: '레인보우로보틱스, 신규 로봇 모델 출시 임박', summary: '차세대 로봇 기술을 적용한 신제품 공개 예정', time: '2024-01-05', source: '전자신문', sentiment: 'neutral' },
      { title: '로봇 관련주 투자 주의보, 과열 양상', summary: '단기 급등에 따른 조정 가능성 제기', time: '2024-01-03', source: '매일경제', sentiment: 'negative' },
    ],
    disclosures: [
      { title: '주요사업보고서 제출', type: '사업보고서', date: '2024-03-31' },
      { title: '유상증자 결정', type: '유상증자', date: '2024-02-10' },
      { title: '최대주주 변경', type: '지분변동', date: '2024-01-20' },
    ],
    tradingVolume: [
      { period: '1주', individual: 100000, foreign: 50000, institution: 30000 },
      { period: '1개월', individual: 400000, foreign: 200000, institution: 150000 },
      { period: '3개월', individual: 1200000, foreign: 600000, institution: 450000 },
    ],
    dailyTradingVolume: [
      { date: '2024-05-20', individual: 50000, foreign: 20000, institution: 10000 },
      { date: '2024-05-17', individual: 45000, foreign: 18000, institution: 9000 },
      { date: '2024-05-16', individual: 60000, foreign: 25000, institution: 12000 },
    ],
    financialData: [
      { quarter: '23.1Q', revenue: 200, operatingProfit: 20, netProfit: 15 },
      { quarter: '23.2Q', revenue: 220, operatingProfit: 25, netProfit: 18 },
      { quarter: '23.3Q', revenue: 250, operatingProfit: 30, netProfit: 22 },
      { quarter: '23.4Q', revenue: 280, operatingProfit: 35, netProfit: 25 },
      { quarter: '24.1Q', revenue: 300, operatingProfit: 40, netProfit: 28 },
    ],
    valuationMetrics: [
      { quarter: '23.1Q', per: 25, pbr: 4, psr: 1.8 },
      { quarter: '23.2Q', per: 27, pbr: 4.2, psr: 1.9 },
      { quarter: '23.3Q', per: 30, pbr: 4.5, psr: 2.0 },
      { quarter: '23.4Q', per: 32, pbr: 4.8, psr: 2.1 },
      { quarter: '24.1Q', per: 35, pbr: 5.0, psr: 2.2 },
    ],
  },
  '2': {
    id: '2',
    name: '삼성전자',
    code: '005930',
    market: '코스피',
    currentPrice: 78000,
    change: -500,
    changeRate: -0.64,
    isUp: false,
    volume: 5000000,
    marketCap: 465000000000000,
    high: 78500,
    low: 77500,
    open: 78200,
    prevClose: 78500,
    description: '글로벌 전자제품 및 반도체 제조업체',
    sector: '기술',
    industry: '반도체',
    employees: 110000,
    founded: '1969-01-13',
    ceo: '한종희, 경계현',
    headquarters: '경기도 수원시',
    website: 'https://www.samsung.com/sec/',
    revenue: 300000000000000,
    operatingProfit: 30000000000000,
    netProfit: 25000000000000,
    debtToEquity: 30,
    roe: 12,
    per: 15,
    pbr: 1.5,
    psr: 1.0,
    dividendYield: 1.8,
    foreignOwnership: 52,
    majorShareholders: [
      { name: '국민연금', percentage: 8 },
      { name: '삼성생명', percentage: 7 },
    ],
    productSales: [
      { product: '반도체', percentage: 50 },
      { product: '모바일', percentage: 30 },
      { product: '가전', percentage: 20 },
    ],
    quarterlyRevenue: [
      { quarter: '23.1Q', actual: 7000, estimate: 6900 },
      { quarter: '23.2Q', actual: 7200, estimate: 7100 },
      { quarter: '23.3Q', actual: 7500, estimate: 7400 },
      { quarter: '23.4Q', actual: 7800, estimate: 7700 },
      { quarter: '24.1Q', actual: 8000, estimate: 7900 },
    ],
    quarterlyOperatingProfit: [
      { quarter: '23.1Q', actual: 700, estimate: 680 },
      { quarter: '23.2Q', actual: 750, estimate: 730 },
      { quarter: '23.3Q', actual: 800, estimate: 780 },
      { quarter: '23.4Q', actual: 850, estimate: 830 },
      { quarter: '24.1Q', actual: 900, estimate: 880 },
    ],
    dividendHistory: [
      { date: '2023-12-31', amount: 361 },
      { date: '2023-09-30', amount: 361 },
      { date: '2023-06-30', amount: 361 },
      { date: '2023-03-31', amount: 361 },
    ],
    news: [
      { title: '삼성전자, AI 반도체 시장 선도', summary: 'HBM 기술력으로 AI 시대 주도', time: '2024-05-20', source: '전자신문', sentiment: 'positive' },
      { title: '갤럭시 신제품 출시, 시장 반응은?', summary: '새로운 폴더블폰에 대한 기대와 우려 공존', time: '2024-05-18', source: 'IT조선', sentiment: 'neutral' },
      { title: '반도체 업황 둔화 우려, 삼성전자 주가 하락', summary: '글로벌 경기 침체로 인한 수요 감소 전망', time: '2024-05-15', source: '조선비즈', sentiment: 'negative' },
    ],
    disclosures: [
      { title: '분기보고서 제출', type: '분기보고서', date: '2024-05-15' },
      { title: '주주총회 소집 결의', type: '주주총회', date: '2024-03-01' },
    ],
    tradingVolume: [
      { period: '1주', individual: 500000, foreign: 1000000, institution: 800000 },
      { period: '1개월', individual: 2000000, foreign: 4000000, institution: 3000000 },
      { period: '3개월', individual: 6000000, foreign: 12000000, institution: 9000000 },
    ],
    dailyTradingVolume: [
      { date: '2024-05-20', individual: 200000, foreign: 400000, institution: 300000 },
      { date: '2024-05-17', individual: 180000, foreign: 350000, institution: 280000 },
      { date: '2024-05-16', individual: 250000, foreign: 450000, institution: 320000 },
    ],
    financialData: [
      { quarter: '23.1Q', revenue: 7000, operatingProfit: 700, netProfit: 500 },
      { quarter: '23.2Q', revenue: 7200, operatingProfit: 750, netProfit: 550 },
      { quarter: '23.3Q', revenue: 7500, operatingProfit: 800, netProfit: 600 },
      { quarter: '23.4Q', revenue: 7800, operatingProfit: 850, netProfit: 650 },
      { quarter: '24.1Q', revenue: 8000, operatingProfit: 900, netProfit: 700 },
    ],
    valuationMetrics: [
      { quarter: '23.1Q', per: 14, pbr: 1.4, psr: 0.9 },
      { quarter: '23.2Q', per: 15, pbr: 1.5, psr: 1.0 },
      { quarter: '23.3Q', per: 16, pbr: 1.6, psr: 1.1 },
      { quarter: '23.4Q', per: 17, pbr: 1.7, psr: 1.2 },
      { quarter: '24.1Q', per: 18, pbr: 1.8, psr: 1.3 },
    ],
  },
}

export default function StockDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'company' | 'earnings' | 'dividend' | 'news' | 'disclosure' | 'investors' | 'financial' | 'metrics'>('company')
  const [newsFilter, setNewsFilter] = useState<'all' | 'neutral' | 'positive' | 'negative'>('all')
  
  const resolvedParams = use(params)
  const stock = (stockData[resolvedParams.id] || stockData['1']) as {
    id: string
    name: string
    code: string
    market: string
    currentPrice: number
    change: number
    changeRate: number
    isUp: boolean
    volume: number
    marketCap: number
    high: number
    low: number
    open: number
    prevClose: number
    description: string
    sector: string
    industry: string
    employees: number
    founded: string
    ceo: string
    headquarters: string
    website: string
    revenue: number
    operatingProfit: number
    netProfit: number
    debtToEquity: number
    roe: number
    per: number
    pbr: number
    psr: number
    dividendYield: number
    foreignOwnership: number
    majorShareholders: Array<{ name: string; percentage: number }>
    productSales: Array<{ product: string; percentage: number }>
    quarterlyRevenue: Array<{ quarter: string; actual: number; estimate: number }>
    quarterlyOperatingProfit: Array<{ quarter: string; actual: number; estimate: number }>
    dividendHistory: Array<{ date: string; amount: number }>
    news: Array<{ title: string; summary: string; time: string; source: string; sentiment: string }>
    disclosures: Array<{ title: string; type: string; date: string }>
    tradingVolume: Array<{ period: string; individual: number; foreign: number; institution: number }>
    dailyTradingVolume: Array<{ date: string; individual: number; foreign: number; institution: number }>
    financialData: Array<{ quarter: string; revenue: number; operatingProfit: number; netProfit: number }>
    valuationMetrics: Array<{ quarter: string; per: number; pbr: number; psr: number }>
  }

  const handleBack = () => {
    router.back()
  }
  
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'negative':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'neutral':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1_000_000_000_000) return `${(num / 1_000_000_000_000).toFixed(2)}조`
    if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(2)}억`
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}백만`
    if (num >= 1_000) return `${(num / 1_000).toFixed(2)}천`
    return num.toLocaleString()
  }

  const getDisclosureTagColor = (type: string) => {
    switch (type) {
      case '사업보고서': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case '유상증자': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
      case '지분변동': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case '분기보고서': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case '주주총회': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const filteredNews = stock.news.filter((n: { sentiment: string }) => newsFilter === 'all' || n.sentiment === newsFilter)

  return (
    <MobileLayout>
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
        {/* 상단 헤더 */}
        <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <button onClick={handleBack} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{stock.name}</h1>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* 종목 현재가 정보 */}
        <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{formatNumber(stock.currentPrice)}</span>
            <span className={`text-lg font-semibold ${stock.isUp ? 'text-red-500' : 'text-blue-500'}`}>
              {stock.isUp ? '▲' : '▼'} {formatNumber(stock.change)} ({stock.changeRate.toFixed(2)}%)
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>{stock.market} {stock.code}</span>
            <span>거래량 {formatNumber(stock.volume)}</span>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 overflow-x-auto scrollbar-hide">
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
                onClick={() => setActiveTab(tab.id as 'company' | 'earnings' | 'dividend' | 'news' | 'disclosure' | 'investors' | 'financial' | 'metrics')}
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
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">기업 소개</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {stock.description}
                </p>
              </div>

              {/* 기업 개요 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">기업 개요</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className="text-gray-600 dark:text-gray-400">산업</div>
                  <div className="text-gray-900 dark:text-white">{stock.industry}</div>
                  <div className="text-gray-600 dark:text-gray-400">설립일</div>
                  <div className="text-gray-900 dark:text-white">{stock.founded}</div>
                  <div className="text-gray-600 dark:text-gray-400">직원 수</div>
                  <div className="text-gray-900 dark:text-white">{formatNumber(stock.employees)}명</div>
                  <div className="text-gray-600 dark:text-gray-400">CEO</div>
                  <div className="text-gray-900 dark:text-white">{stock.ceo}</div>
                  <div className="text-gray-600 dark:text-gray-400">본사</div>
                  <div className="text-gray-900 dark:text-white">{stock.headquarters}</div>
                  <div className="text-gray-600 dark:text-gray-400">웹사이트</div>
                  <a href={stock.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 truncate">
                    {stock.website}
                  </a>
                </div>
              </div>

              {/* 주요 제품 매출 구성 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">주요 제품 매출 구성</h3>
                <div className="mb-4">
                  <DonutChart 
                    data={stock.productSales.map(item => ({
                      label: item.product,
                      value: item.percentage,
                      color: '#' + Math.floor(Math.random()*16777215).toString(16) // 임시 랜덤 색상
                    }))}
                    title="주요 제품 매출 구성" 
                  />
                </div>
                <ul className="mt-4 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  {stock.productSales.map((item: { product: string; percentage: number }, index: number) => (
                    <li key={index} className="flex justify-between">
                      <span>{item.product}</span>
                      <span>{item.percentage}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'earnings' && (
            <div className="p-4 space-y-4">
              {/* 매출액 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">매출액 (단위: 억원)</h3>
                <div className="mb-4">
                  <QuarterlyLineChart 
                    data={stock.quarterlyRevenue} 
                    title="매출액" 
                    unit="억원" 
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-gray-700 dark:text-gray-300">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="py-2 text-left">분기</th>
                        <th className="py-2 text-right">실제</th>
                        <th className="py-2 text-right">예상</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stock.quarterlyRevenue.map((data: { quarter: string; actual: number; estimate: number }, index: number) => (
                        <tr key={index} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                          <td className="py-2">{data.quarter}</td>
                          <td className="py-2 text-right">{formatNumber(data.actual)}</td>
                          <td className="py-2 text-right">{formatNumber(data.estimate)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 영업이익 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">영업이익 (단위: 억원)</h3>
                <div className="mb-4">
                  <QuarterlyLineChart 
                    data={stock.quarterlyOperatingProfit} 
                    title="영업이익" 
                    unit="억원" 
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-gray-700 dark:text-gray-300">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="py-2 text-left">분기</th>
                        <th className="py-2 text-right">실제</th>
                        <th className="py-2 text-right">예상</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stock.quarterlyOperatingProfit.map((data: { quarter: string; actual: number; estimate: number }, index: number) => (
                        <tr key={index} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                          <td className="py-2">{data.quarter}</td>
                          <td className="py-2 text-right">{formatNumber(data.actual)}</td>
                          <td className="py-2 text-right">{formatNumber(data.estimate)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dividend' && (
            <div className="p-4 space-y-4">
              {/* 다날 최근 12개월 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">다날 최근 12개월</h3>
                <div className="flex justify-around text-center text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">배당수익률</p>
                    <p className="font-bold text-gray-900 dark:text-white">{stock.dividendYield}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">주당배당금</p>
                    <p className="font-bold text-gray-900 dark:text-white">{formatNumber(stock.dividendHistory[0]?.amount || 0)}원</p>
                  </div>
                </div>
              </div>

              {/* 배당내역 한국시간 기준 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">배당내역 (한국시간 기준)</h3>
                <table className="min-w-full text-sm text-gray-700 dark:text-gray-300">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="py-2 text-left">구분</th>
                      <th className="py-2 text-right">배당금</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stock.dividendHistory.map((div: { date: string; amount: number }, index: number) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                        <td className="py-3 text-gray-900 dark:text-white">{div.date}</td>
                        <td className="text-right py-3 text-gray-900 dark:text-white font-semibold">{formatNumber(div.amount)}원</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                      onClick={() => setNewsFilter(filter.id as 'all' | 'neutral' | 'positive' | 'negative')}
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
              </div>

              {/* 뉴스 리스트 */}
              <div className="space-y-4">
                {filteredNews.map((newsItem: { title: string; summary: string; time: string; source: string; sentiment: string }, index: number) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-base">{newsItem.title}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getSentimentColor(newsItem.sentiment)}`}>
                        {newsItem.sentiment === 'positive' ? '긍정' : newsItem.sentiment === 'negative' ? '부정' : '중립'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 line-clamp-2">{newsItem.summary}</p>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{newsItem.source}</span>
                      <span>{newsItem.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'disclosure' && (
            <div className="p-4 space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">공시 정보 (DART 기준)</h3>
                <div className="space-y-3">
                  {stock.disclosures.map((disclosure: { title: string; type: string; date: string }, index: number) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                      <div className="flex-1 mr-2">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">{disclosure.title}</h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{disclosure.date}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDisclosureTagColor(disclosure.type)}`}>
                        {disclosure.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'investors' && (
            <div className="p-4 space-y-4">
              {/* 기간별 거래량 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">기간별 거래량 (단위: 천주)</h3>
                <div className="mb-4">
                  <TradingVolumeBarChart 
                    data={stock.tradingVolume} 
                    title="기간별 거래량" 
                    unit="천주" 
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-gray-700 dark:text-gray-300">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="py-2 text-left">기간</th>
                        <th className="py-2 text-right">개인</th>
                        <th className="py-2 text-right">외국인</th>
                        <th className="py-2 text-right">기관</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stock.tradingVolume.map((data: { period: string; individual: number; foreign: number; institution: number }, index: number) => (
                        <tr key={index} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                          <td className="py-2">{data.period}</td>
                          <td className="py-2 text-right">{formatNumber(data.individual / 1000)}</td>
                          <td className="py-2 text-right">{formatNumber(data.foreign / 1000)}</td>
                          <td className="py-2 text-right">{formatNumber(data.institution / 1000)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 일별 거래량 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">일별 거래량 (단위: 천주)</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-gray-700 dark:text-gray-300">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="py-2 text-left">날짜</th>
                        <th className="py-2 text-right">개인</th>
                        <th className="py-2 text-right">외국인</th>
                        <th className="py-2 text-right">기관</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stock.dailyTradingVolume.map((data: { date: string; individual: number; foreign: number; institution: number }, index: number) => (
                        <tr key={index} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                          <td className="py-2">{data.date}</td>
                          <td className="py-2 text-right">{formatNumber(data.individual / 1000)}</td>
                          <td className="py-2 text-right">{formatNumber(data.foreign / 1000)}</td>
                          <td className="py-2 text-right">{formatNumber(data.institution / 1000)}</td>
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
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium mb-4 hover:bg-blue-600 transition-colors">
                  재무제표 보기
                </button>

                {/* 실적 */}
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">실적 (단위: 억원)</h3>
                <div className="mb-4">
                  <FinancialLineChart 
                    data={stock.financialData} 
                    title="매출액" 
                    unit="억원"
                    dataKey="revenue"
                  />
                </div>

                {/* 재무 */}
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 mt-6">재무 (단위: 억원)</h3>
                <div className="mb-4">
                  <FinancialLineChart 
                    data={stock.financialData} 
                    title="영업이익" 
                    unit="억원"
                    dataKey="operatingProfit"
                  />
                </div>

                {/* 안정성 */}
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 mt-6">안정성 (%)</h3>
                <div className="mb-4">
                  <FinancialLineChart 
                    data={stock.financialData} 
                    title="순이익" 
                    unit="억원"
                    dataKey="netProfit"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="p-4 space-y-4">
              {/* 투자지표 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">투자지표</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">시가총액</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{formatNumber(stock.marketCap)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">배당수익률</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{stock.dividendYield}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">PBR</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{stock.pbr.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">PER</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{stock.per.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">ROE</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{stock.roe.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">PSR</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{stock.psr.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">외국인 지분율</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{stock.foreignOwnership}%</span>
                  </div>
                </div>
              </div>

              {/* 가치평가지표 차트 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">가치평가지표</h3>
                <div className="flex justify-end space-x-2 text-xs mb-3">
                  <button className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">연결/별도</button>
                  <button className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">분기/연간</button>
                </div>
                <div className="mb-4">
                  <ValuationMetricsChart 
                    data={stock.valuationMetrics} 
                    title="가치평가지표" 
                  />
                </div>
                <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  더 보기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  )
}

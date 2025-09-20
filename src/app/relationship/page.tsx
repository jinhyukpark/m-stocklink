'use client'

import React, { useState } from 'react'
import MobileLayout from '@/components/MobileLayout'
import HierarchicalBubbleChart from '@/components/HierarchicalBubbleChart'
import { newsKeywords, getSentimentColor } from '@/data/mockData'

// 키워드별 관련 주식 데이터
const keywordStocks: { [key: string]: Array<{
  id: string
  name: string
  code: string
  currentPrice: number
  change: number
  changeRate: number
  theme: string
  score: number
  isFavorite: boolean
}> } = {
  '삼성전자': [
    { id: '1', name: '삼성전자', code: '005930', currentPrice: 71500, change: 1600, changeRate: 2.3, theme: '반도체', score: 11.2, isFavorite: true },
    { id: '2', name: '삼성SDI', code: '006400', currentPrice: 425000, change: 8500, changeRate: 2.0, theme: '배터리', score: 8.7, isFavorite: false },
    { id: '3', name: '삼성물산', code: '028260', currentPrice: 125000, change: 2500, changeRate: 2.0, theme: '건설', score: 6.5, isFavorite: false }
  ],
  'AI': [
    { id: '4', name: 'NAVER', code: '035420', currentPrice: 185000, change: 5700, changeRate: 3.2, theme: 'AI', score: 9.5, isFavorite: true },
    { id: '5', name: '카카오', code: '035720', currentPrice: 52000, change: 2600, changeRate: 5.2, theme: 'AI', score: 6.8, isFavorite: false },
    { id: '6', name: 'LG CNS', code: '000120', currentPrice: 125000, change: 2500, changeRate: 2.0, theme: 'AI', score: 5.2, isFavorite: false }
  ],
  '반도체': [
    { id: '7', name: 'SK하이닉스', code: '000660', currentPrice: 128000, change: 5000, changeRate: 4.1, theme: '반도체', score: 10.8, isFavorite: true },
    { id: '8', name: 'SK텔레콤', code: '017670', currentPrice: 52000, change: 1000, changeRate: 1.9, theme: '통신', score: 2.1, isFavorite: false },
    { id: '9', name: 'LG이노텍', code: '011070', currentPrice: 425000, change: 8500, changeRate: 2.0, theme: '반도체', score: 7.3, isFavorite: false }
  ],
  'SK하이닉스': [
    { id: '10', name: 'SK하이닉스', code: '000660', currentPrice: 128000, change: 5000, changeRate: 4.1, theme: '메모리', score: 10.8, isFavorite: true },
    { id: '11', name: 'SK텔레콤', code: '017670', currentPrice: 52000, change: 1000, changeRate: 1.9, theme: '통신', score: 2.1, isFavorite: false }
  ],
  '코스피': [
    { id: '12', name: '삼성전자', code: '005930', currentPrice: 71500, change: 1600, changeRate: 2.3, theme: '대형주', score: 11.2, isFavorite: true },
    { id: '13', name: 'SK하이닉스', code: '000660', currentPrice: 128000, change: 5000, changeRate: 4.1, theme: '대형주', score: 10.8, isFavorite: true },
    { id: '14', name: 'NAVER', code: '035420', currentPrice: 185000, change: 5700, changeRate: 3.2, theme: '대형주', score: 9.5, isFavorite: true }
  ],
  '연준': [
    { id: '15', name: 'KB금융', code: '105560', currentPrice: 52000, change: 1000, changeRate: 1.9, theme: '금융', score: 4.5, isFavorite: false },
    { id: '16', name: '신한지주', code: '055550', currentPrice: 42500, change: 850, changeRate: 2.0, theme: '금융', score: 3.8, isFavorite: false }
  ],
  '금리': [
    { id: '17', name: 'KB금융', code: '105560', currentPrice: 52000, change: 1000, changeRate: 1.9, theme: '금융', score: 4.5, isFavorite: false },
    { id: '18', name: '신한지주', code: '055550', currentPrice: 42500, change: 850, changeRate: 2.0, theme: '금융', score: 3.8, isFavorite: false },
    { id: '19', name: '하나금융지주', code: '086790', currentPrice: 48500, change: 970, changeRate: 2.0, theme: '금융', score: 3.2, isFavorite: false }
  ],
  '외국인': [
    { id: '20', name: '삼성전자', code: '005930', currentPrice: 71500, change: 1600, changeRate: 2.3, theme: '외국인선호', score: 11.2, isFavorite: true },
    { id: '21', name: 'SK하이닉스', code: '000660', currentPrice: 128000, change: 5000, changeRate: 4.1, theme: '외국인선호', score: 10.8, isFavorite: true },
    { id: '22', name: 'LG에너지솔루션', code: '373220', currentPrice: 425000, change: 8500, changeRate: 2.0, theme: '외국인선호', score: 8.7, isFavorite: false }
  ],
  '실적': [
    { id: '23', name: '삼성전자', code: '005930', currentPrice: 71500, change: 1600, changeRate: 2.3, theme: '실적주', score: 11.2, isFavorite: true },
    { id: '24', name: 'SK하이닉스', code: '000660', currentPrice: 128000, change: 5000, changeRate: 4.1, theme: '실적주', score: 10.8, isFavorite: true },
    { id: '25', name: 'NAVER', code: '035420', currentPrice: 185000, change: 5700, changeRate: 3.2, theme: '실적주', score: 9.5, isFavorite: true }
  ],
  '매수세': [
    { id: '26', name: '삼성전자', code: '005930', currentPrice: 71500, change: 1600, changeRate: 2.3, theme: '매수세', score: 11.2, isFavorite: true },
    { id: '27', name: 'SK하이닉스', code: '000660', currentPrice: 128000, change: 5000, changeRate: 4.1, theme: '매수세', score: 10.8, isFavorite: true },
    { id: '28', name: 'LG에너지솔루션', code: '373220', currentPrice: 425000, change: 8500, changeRate: 2.0, theme: '매수세', score: 8.7, isFavorite: false }
  ],
  '중국': [
    { id: '29', name: 'POSCO홀딩스', code: '005490', currentPrice: 425000, change: 6800, changeRate: 1.6, theme: '중국수출', score: 5.4, isFavorite: false },
    { id: '30', name: 'LG화학', code: '051910', currentPrice: 485000, change: 9200, changeRate: 1.9, theme: '중국수출', score: 4.2, isFavorite: false }
  ],
  '경제지표': [
    { id: '31', name: 'KB금융', code: '105560', currentPrice: 52000, change: 1000, changeRate: 1.9, theme: '경제민감주', score: 4.5, isFavorite: false },
    { id: '32', name: '신한지주', code: '055550', currentPrice: 42500, change: 850, changeRate: 2.0, theme: '경제민감주', score: 3.8, isFavorite: false }
  ],
  '수출': [
    { id: '33', name: '삼성전자', code: '005930', currentPrice: 71500, change: 1600, changeRate: 2.3, theme: '수출주', score: 11.2, isFavorite: true },
    { id: '34', name: 'SK하이닉스', code: '000660', currentPrice: 128000, change: 5000, changeRate: 4.1, theme: '수출주', score: 10.8, isFavorite: true },
    { id: '35', name: '현대차', code: '005380', currentPrice: 245000, change: 3200, changeRate: 1.3, theme: '수출주', score: 7.9, isFavorite: false }
  ],
  '바이오': [
    { id: '36', name: '셀트리온', code: '068270', currentPrice: 185000, change: 8000, changeRate: 4.5, theme: '바이오', score: 8.9, isFavorite: true },
    { id: '37', name: '유한양행', code: '000100', currentPrice: 125000, change: 2500, changeRate: 2.0, theme: '바이오', score: 6.2, isFavorite: false }
  ],
  '헬스케어': [
    { id: '38', name: '셀트리온', code: '068270', currentPrice: 185000, change: 8000, changeRate: 4.5, theme: '헬스케어', score: 8.9, isFavorite: true },
    { id: '39', name: '유한양행', code: '000100', currentPrice: 125000, change: 2500, changeRate: 2.0, theme: '헬스케어', score: 6.2, isFavorite: false },
    { id: '40', name: '대웅제약', code: '069620', currentPrice: 85000, change: 1700, changeRate: 2.0, theme: '헬스케어', score: 5.8, isFavorite: false }
  ],
  '신재생에너지': [
    { id: '41', name: 'LG에너지솔루션', code: '373220', currentPrice: 425000, change: 8500, changeRate: 2.0, theme: '신재생에너지', score: 8.7, isFavorite: false },
    { id: '42', name: '한화솔루션', code: '009830', currentPrice: 125000, change: 2500, changeRate: 2.0, theme: '신재생에너지', score: 6.5, isFavorite: false }
  ],
  '금융': [
    { id: '43', name: 'KB금융', code: '105560', currentPrice: 52000, change: 1000, changeRate: 1.9, theme: '금융', score: 4.5, isFavorite: false },
    { id: '44', name: '신한지주', code: '055550', currentPrice: 42500, change: 850, changeRate: 2.0, theme: '금융', score: 3.8, isFavorite: false },
    { id: '45', name: '하나금융지주', code: '086790', currentPrice: 48500, change: 970, changeRate: 2.0, theme: '금융', score: 3.2, isFavorite: false }
  ],
  '화학': [
    { id: '46', name: 'LG화학', code: '051910', currentPrice: 485000, change: 9200, changeRate: 1.9, theme: '화학', score: 4.2, isFavorite: false },
    { id: '47', name: '한화솔루션', code: '009830', currentPrice: 125000, change: 2500, changeRate: 2.0, theme: '화학', score: 6.5, isFavorite: false }
  ],
  '투자': [
    { id: '48', name: '삼성전자', code: '005930', currentPrice: 71500, change: 1600, changeRate: 2.3, theme: '투자주', score: 11.2, isFavorite: true },
    { id: '49', name: 'SK하이닉스', code: '000660', currentPrice: 128000, change: 5000, changeRate: 4.1, theme: '투자주', score: 10.8, isFavorite: true },
    { id: '50', name: 'NAVER', code: '035420', currentPrice: 185000, change: 5700, changeRate: 3.2, theme: '투자주', score: 9.5, isFavorite: true }
  ],
  '시장': [
    { id: '51', name: '삼성전자', code: '005930', currentPrice: 71500, change: 1600, changeRate: 2.3, theme: '시장지수', score: 11.2, isFavorite: true },
    { id: '52', name: 'SK하이닉스', code: '000660', currentPrice: 128000, change: 5000, changeRate: 4.1, theme: '시장지수', score: 10.8, isFavorite: true },
    { id: '53', name: 'NAVER', code: '035420', currentPrice: 185000, change: 5700, changeRate: 3.2, theme: '시장지수', score: 9.5, isFavorite: true }
  ]
}

export default function RelationshipPage() {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null)
  const [selectedStocks, setSelectedStocks] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<'news' | 'stocks'>('news')
  const [stocksData, setStocksData] = useState(keywordStocks)

  const handleKeywordClick = (keyword: string) => {
    setSelectedKeyword(keyword)
    setSelectedStocks(stocksData[keyword] || [])
    setActiveTab('news') // 기본적으로 뉴스 탭으로 설정
  }

  const handleFavoriteToggle = (stockId: string) => {
    // stocksData에서 해당 종목의 즐겨찾기 상태 업데이트
    const updatedStocksData = { ...stocksData }
    Object.keys(updatedStocksData).forEach(keyword => {
      const stockIndex = updatedStocksData[keyword].findIndex(stock => stock.id === stockId)
      if (stockIndex !== -1) {
        updatedStocksData[keyword][stockIndex] = {
          ...updatedStocksData[keyword][stockIndex],
          isFavorite: !updatedStocksData[keyword][stockIndex].isFavorite
        }
      }
    })
    setStocksData(updatedStocksData)
    
    // selectedStocks 상태도 업데이트
    setSelectedStocks(prev => 
      prev.map(stock => 
        stock.id === stockId 
          ? { ...stock, isFavorite: !stock.isFavorite }
          : stock
      )
    )
  }

  // 모든 뉴스 데이터 (키워드별로 분류)
  const allNews = [
    {
      id: '1',
      title: '삼성전자 주가 급등, AI 반도체 수요 증가로 투자자 관심 집중',
      summary: '삼성전자가 AI 반도체 수요 증가로 주가가 급등하고 있습니다. 메모리 반도체 시장의 회복세가 지속되고 있어 투자자들의 관심이 높아지고 있습니다.',
      time: '2시간 전',
      source: '매일경제',
      sentiment: 'positive',
      keyword: '삼성전자'
    },
    {
      id: '2',
      title: 'AI 기술 혁신, 글로벌 기업들 투자 확대',
      summary: 'AI 기술의 급속한 발전으로 글로벌 기업들이 AI 관련 투자를 대폭 확대하고 있습니다. 특히 생성형 AI 분야에서 경쟁이 치열해지고 있습니다.',
      time: '3시간 전',
      source: '한국경제',
      sentiment: 'positive',
      keyword: 'AI'
    },
    {
      id: '3',
      title: '반도체 업계 실적 개선, 메모리 가격 상승세 지속',
      summary: '반도체 업계의 실적이 개선되고 있으며, 메모리 반도체 가격 상승세가 지속되고 있습니다. 특히 DDR5 메모리 수요가 급증하고 있습니다.',
      time: '4시간 전',
      source: '조선비즈',
      sentiment: 'positive',
      keyword: '반도체'
    },
    {
      id: '4',
      title: 'SK하이닉스, HBM3E 양산 시작으로 주가 상승',
      summary: 'SK하이닉스가 HBM3E 메모리 양산을 시작하면서 주가가 상승하고 있습니다. AI 서버 수요 증가로 고성능 메모리 시장이 확대되고 있습니다.',
      time: '5시간 전',
      source: '이데일리',
      sentiment: 'positive',
      keyword: 'SK하이닉스'
    },
    {
      id: '5',
      title: '코스피 상승세 지속, 외국인 매수세 확대',
      summary: '코스피가 상승세를 지속하고 있으며, 외국인 투자자들의 매수세가 확대되고 있습니다. 특히 대형주 중심의 상승이 두드러지고 있습니다.',
      time: '6시간 전',
      source: '디지털타임스',
      sentiment: 'positive',
      keyword: '코스피'
    },
    {
      id: '6',
      title: '연준 금리 정책, 시장 불확실성 지속',
      summary: '연준의 금리 정책에 대한 시장의 불확실성이 지속되고 있습니다. 인플레이션 지표에 따라 금리 정책 방향이 결정될 것으로 예상됩니다.',
      time: '7시간 전',
      source: '머니투데이',
      sentiment: 'neutral',
      keyword: '연준'
    },
    {
      id: '7',
      title: '금리 상승 우려, 금융주 하락세',
      summary: '금리 상승 우려로 금융주들이 하락세를 보이고 있습니다. 특히 은행주들의 실적 압박이 우려되고 있습니다.',
      time: '8시간 전',
      source: '한국경제',
      sentiment: 'negative',
      keyword: '금리'
    },
    {
      id: '8',
      title: '외국인 투자자들, 한국 주식 매수 확대',
      summary: '외국인 투자자들이 한국 주식에 대한 매수를 확대하고 있습니다. 특히 반도체와 배터리 관련 종목에 대한 관심이 높습니다.',
      time: '9시간 전',
      source: '매일경제',
      sentiment: 'positive',
      keyword: '외국인'
    },
    {
      id: '9',
      title: '3분기 실적 발표, 대부분 기업 호실적',
      summary: '3분기 실적 발표가 시작되면서 대부분의 기업들이 호실적을 기록하고 있습니다. 특히 기술주들의 실적이 시장 기대를 상회하고 있습니다.',
      time: '10시간 전',
      source: '조선비즈',
      sentiment: 'positive',
      keyword: '실적'
    },
    {
      id: '10',
      title: '매수세 확대, 개인투자자들 적극 참여',
      summary: '주식 시장에서 매수세가 확대되고 있으며, 개인투자자들이 적극적으로 참여하고 있습니다. 특히 테마주들에 대한 관심이 높습니다.',
      time: '11시간 전',
      source: '이데일리',
      sentiment: 'positive',
      keyword: '매수세'
    },
    {
      id: '11',
      title: '중국 경제 둔화, 수출주들 압박',
      summary: '중국 경제 둔화로 수출 의존도가 높은 기업들이 압박을 받고 있습니다. 특히 화학과 철강 업종의 영향이 클 것으로 예상됩니다.',
      time: '12시간 전',
      source: '한국경제',
      sentiment: 'negative',
      keyword: '중국'
    },
    {
      id: '12',
      title: '경제지표 발표, 성장률 둔화 우려',
      summary: '최근 발표된 경제지표에서 성장률 둔화 우려가 나타나고 있습니다. 정부의 경제 정책에 대한 관심이 높아지고 있습니다.',
      time: '13시간 전',
      source: '매일경제',
      sentiment: 'negative',
      keyword: '경제지표'
    },
    {
      id: '13',
      title: '수출 증가세 둔화, 무역수지 악화',
      summary: '수출 증가세가 둔화되면서 무역수지가 악화되고 있습니다. 특히 반도체 수출 감소가 주요 원인으로 지적되고 있습니다.',
      time: '14시간 전',
      source: '조선비즈',
      sentiment: 'negative',
      keyword: '수출'
    },
    {
      id: '14',
      title: '바이오 업계, 신약 개발 성과 주목',
      summary: '바이오 업계에서 신약 개발 성과가 주목받고 있습니다. 특히 항암제와 당뇨병 치료제 분야에서 긍정적인 결과가 나오고 있습니다.',
      time: '15시간 전',
      source: '디지털타임스',
      sentiment: 'positive',
      keyword: '바이오'
    },
    {
      id: '15',
      title: '헬스케어 시장 확대, 디지털 헬스케어 주목',
      summary: '헬스케어 시장이 확대되면서 디지털 헬스케어 분야가 주목받고 있습니다. 특히 원격진료와 AI 진단 기술이 관심을 끌고 있습니다.',
      time: '16시간 전',
      source: '머니투데이',
      sentiment: 'positive',
      keyword: '헬스케어'
    },
    {
      id: '16',
      title: '신재생에너지 투자 확대, 태양광 시장 성장',
      summary: '신재생에너지 투자가 확대되면서 태양광 시장이 성장하고 있습니다. 정부의 탄소중립 정책이 시장 성장을 견인하고 있습니다.',
      time: '17시간 전',
      source: '한국경제',
      sentiment: 'positive',
      keyword: '신재생에너지'
    },
    {
      id: '17',
      title: '금융업계, 디지털 전환 가속화',
      summary: '금융업계에서 디지털 전환이 가속화되고 있습니다. 특히 핀테크와 디지털 뱅킹 서비스 확대가 두드러지고 있습니다.',
      time: '18시간 전',
      source: '매일경제',
      sentiment: 'positive',
      keyword: '금융'
    },
    {
      id: '18',
      title: '화학 업계, 친환경 소재 개발 경쟁',
      summary: '화학 업계에서 친환경 소재 개발 경쟁이 치열해지고 있습니다. 특히 바이오 플라스틱과 재생 가능한 소재에 대한 관심이 높습니다.',
      time: '19시간 전',
      source: '조선비즈',
      sentiment: 'neutral',
      keyword: '화학'
    },
    {
      id: '19',
      title: '투자 심리 개선, 위험 자산 선호',
      summary: '투자 심리가 개선되면서 위험 자산에 대한 선호가 높아지고 있습니다. 특히 성장주와 테마주에 대한 관심이 증가하고 있습니다.',
      time: '20시간 전',
      source: '이데일리',
      sentiment: 'positive',
      keyword: '투자'
    },
    {
      id: '20',
      title: '시장 변동성 증가, 투자 주의 필요',
      summary: '시장 변동성이 증가하면서 투자자들의 주의가 필요합니다. 특히 글로벌 경제 불확실성으로 인한 리스크 관리가 중요합니다.',
      time: '21시간 전',
      source: '디지털타임스',
      sentiment: 'neutral',
      keyword: '시장'
    }
  ]

  // 필터링된 뉴스 데이터
  const filteredNews = selectedKeyword 
    ? allNews.filter(news => news.keyword === selectedKeyword)
    : allNews

  // 모든 관련 종목 데이터 (키워드별로 분류)
  const allStocks = Object.values(stocksData).flat()

  // 필터링된 종목 데이터
  const filteredStocks = selectedKeyword 
    ? (stocksData[selectedKeyword] || [])
    : allStocks

  return (
    <MobileLayout headerTitle="트랜드">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 뉴스 키워드 계층적 버블 차트 */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            뉴스 트렌드 키워드
          </h2>
          <HierarchicalBubbleChart
            selectedKeyword={selectedKeyword}
            onKeywordClick={handleKeywordClick}
          />
        </div>

        {/* 뉴스 및 종목 정보 */}
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
          {/* 탭 메뉴 */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <button
              onClick={() => setActiveTab('news')}
              className={`flex-1 py-4 px-4 text-center font-semibold transition-colors ${
                activeTab === 'news'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              상세 뉴스
            </button>
            <button
              onClick={() => setActiveTab('stocks')}
              className={`flex-1 py-4 px-4 text-center font-semibold transition-colors ${
                activeTab === 'stocks'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              관련 종목
            </button>
          </div>

          {/* 탭 컨텐츠 */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {selectedKeyword 
                    ? `"${selectedKeyword}" ${activeTab === 'news' ? '뉴스' : '관련 종목'}`
                    : `전체 ${activeTab === 'news' ? '뉴스' : '관련 종목'}`
                  }
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {activeTab === 'news' ? `${filteredNews.length}개` : `${filteredStocks.length}개`}
                </span>
              </div>

              {/* 뉴스 탭 */}
              {activeTab === 'news' && (
                <div className="space-y-3">
                  {filteredNews.map((news) => (
                    <div
                      key={news.id}
                      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-relaxed">
                          {news.title}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${
                          news.sentiment === 'positive' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : news.sentiment === 'negative'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {news.sentiment === 'positive' ? '긍정' : news.sentiment === 'negative' ? '부정' : '중립'}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {news.summary}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-xs">
                            {news.keyword}
                          </span>
                          <span>{news.source}</span>
                        </div>
                        <span>{news.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 관련 종목 탭 */}
              {activeTab === 'stocks' && (
                <div className="space-y-3">
                  {filteredStocks.map((stock) => (
                    <div
                      key={stock.id}
                      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-bold text-gray-900 dark:text-white">{stock.name}</h4>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{stock.code}</span>
                          </div>
                          <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                            {stock.theme}
                          </div>
                        </div>
                        <button
                          onClick={() => handleFavoriteToggle(stock.id)}
                          className={`p-2 rounded-full transition-all duration-200 ${
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

                      <div className="flex items-center justify-between mb-3">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {stock.currentPrice.toLocaleString()}원
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${
                            stock.change >= 0 ? 'text-red-500' : 'text-blue-500'
                          }`}>
                            {stock.change >= 0 ? '+' : ''}{stock.change.toLocaleString()}원
                          </div>
                          <div className={`text-sm font-semibold ${
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
                        <div className="flex items-center space-x-2">
                          <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"
                              style={{ width: `${(stock.score / 12) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {stock.score}/12
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
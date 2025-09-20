'use client'

import React from 'react'
import { newsKeywords, getSentimentColor } from '@/data/mockData'

interface HierarchicalBubbleChartProps {
  selectedKeyword: string | null
  onKeywordClick: (keyword: string) => void
}

export default function HierarchicalBubbleChart({
  selectedKeyword,
  onKeywordClick
}: HierarchicalBubbleChartProps) {
  return (
    <div className="relative w-full h-96 bg-white dark:bg-gray-900 rounded-xl overflow-hidden">
      {/* 계층적 버블 차트 */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* 중앙 메인 키워드 - AI */}
        <button
          onClick={() => onKeywordClick('AI')}
          className={`absolute flex items-center justify-center rounded-full text-white font-bold cursor-pointer transition-all duration-300 ease-out hover:scale-110 ${
            selectedKeyword === 'AI' 
              ? 'ring-4 ring-blue-500 ring-opacity-50 scale-110' 
              : 'hover:shadow-lg'
          }`}
          style={{
            width: '120px',
            height: '120px',
            fontSize: '18px',
            backgroundColor: '#3B82F6',
            boxShadow: selectedKeyword === 'AI'
              ? '0 0 25px #3B82F650'
              : '0 4px 12px #3B82F630'
          }}
          title="AI\n중요도: 88%\n감정: 90%"
        >
          AI
        </button>

        {/* 1차 키워드들 */}
        {/* 삼성전자 - 상단 */}
        <button
          onClick={() => onKeywordClick('삼성전자')}
          className={`absolute flex items-center justify-center rounded-full text-white font-bold cursor-pointer transition-all duration-300 ease-out hover:scale-110 ${
            selectedKeyword === '삼성전자' 
              ? 'ring-4 ring-blue-500 ring-opacity-50 scale-110' 
              : 'hover:shadow-lg'
          }`}
          style={{
            width: '100px',
            height: '100px',
            fontSize: '14px',
            backgroundColor: '#10B981',
            boxShadow: selectedKeyword === '삼성전자'
              ? '0 0 25px #10B98150'
              : '0 4px 12px #10B98130',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
          title="삼성전자\n중요도: 95%\n감정: 85%"
        >
          삼성전자
        </button>

        {/* 반도체 - 좌측 */}
        <button
          onClick={() => onKeywordClick('반도체')}
          className={`absolute flex items-center justify-center rounded-full text-white font-bold cursor-pointer transition-all duration-300 ease-out hover:scale-110 ${
            selectedKeyword === '반도체' 
              ? 'ring-4 ring-blue-500 ring-opacity-50 scale-110' 
              : 'hover:shadow-lg'
          }`}
          style={{
            width: '90px',
            height: '90px',
            fontSize: '13px',
            backgroundColor: '#059669',
            boxShadow: selectedKeyword === '반도체'
              ? '0 0 25px #05966950'
              : '0 4px 12px #05966930',
            top: '50%',
            left: '20px',
            transform: 'translateY(-50%)'
          }}
          title="반도체\n중요도: 85%\n감정: 80%"
        >
          반도체
        </button>

        {/* SK하이닉스 - 우측 */}
        <button
          onClick={() => onKeywordClick('SK하이닉스')}
          className={`absolute flex items-center justify-center rounded-full text-white font-bold cursor-pointer transition-all duration-300 ease-out hover:scale-110 ${
            selectedKeyword === 'SK하이닉스' 
              ? 'ring-4 ring-blue-500 ring-opacity-50 scale-110' 
              : 'hover:shadow-lg'
          }`}
          style={{
            width: '90px',
            height: '90px',
            fontSize: '12px',
            backgroundColor: '#0D9488',
            boxShadow: selectedKeyword === 'SK하이닉스'
              ? '0 0 25px #0D948850'
              : '0 4px 12px #0D948830',
            top: '50%',
            right: '20px',
            transform: 'translateY(-50%)'
          }}
          title="SK하이닉스\n중요도: 82%\n감정: 75%"
        >
          SK하이닉스
        </button>

        {/* 코스피 - 하단 */}
        <button
          onClick={() => onKeywordClick('코스피')}
          className={`absolute flex items-center justify-center rounded-full text-white font-bold cursor-pointer transition-all duration-300 ease-out hover:scale-110 ${
            selectedKeyword === '코스피' 
              ? 'ring-4 ring-blue-500 ring-opacity-50 scale-110' 
              : 'hover:shadow-lg'
          }`}
          style={{
            width: '80px',
            height: '80px',
            fontSize: '12px',
            backgroundColor: '#0891B2',
            boxShadow: selectedKeyword === '코스피'
              ? '0 0 25px #0891B250'
              : '0 4px 12px #0891B230',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
          title="코스피\n중요도: 80%\n감정: 70%"
        >
          코스피
        </button>

        {/* 2차 키워드들 */}
        {/* 연준 - 상단 좌측 */}
        <button
          onClick={() => onKeywordClick('연준')}
          className={`absolute flex items-center justify-center rounded-full text-white font-medium cursor-pointer transition-all duration-300 ease-out hover:scale-110 ${
            selectedKeyword === '연준' 
              ? 'ring-4 ring-blue-500 ring-opacity-50 scale-110' 
              : 'hover:shadow-lg'
          }`}
          style={{
            width: '60px',
            height: '60px',
            fontSize: '10px',
            backgroundColor: '#0EA5E9',
            boxShadow: selectedKeyword === '연준'
              ? '0 0 25px #0EA5E950'
              : '0 4px 12px #0EA5E930',
            top: '40px',
            left: '80px'
          }}
          title="연준\n중요도: 75%\n감정: 60%"
        >
          연준
        </button>

        {/* 금리 - 상단 우측 */}
        <button
          onClick={() => onKeywordClick('금리')}
          className={`absolute flex items-center justify-center rounded-full text-white font-medium cursor-pointer transition-all duration-300 ease-out hover:scale-110 ${
            selectedKeyword === '금리' 
              ? 'ring-4 ring-blue-500 ring-opacity-50 scale-110' 
              : 'hover:shadow-lg'
          }`}
          style={{
            width: '60px',
            height: '60px',
            fontSize: '10px',
            backgroundColor: '#F59E0B',
            boxShadow: selectedKeyword === '금리'
              ? '0 0 25px #F59E0B50'
              : '0 4px 12px #F59E0B30',
            top: '40px',
            right: '80px'
          }}
          title="금리\n중요도: 72%\n감정: 45%"
        >
          금리
        </button>

        {/* 외국인 - 좌측 하단 */}
        <button
          onClick={() => onKeywordClick('외국인')}
          className={`absolute flex items-center justify-center rounded-full text-white font-medium cursor-pointer transition-all duration-300 ease-out hover:scale-110 ${
            selectedKeyword === '외국인' 
              ? 'ring-4 ring-blue-500 ring-opacity-50 scale-110' 
              : 'hover:shadow-lg'
          }`}
          style={{
            width: '60px',
            height: '60px',
            fontSize: '10px',
            backgroundColor: '#10B981',
            boxShadow: selectedKeyword === '외국인'
              ? '0 0 25px #10B98150'
              : '0 4px 12px #10B98130',
            bottom: '80px',
            left: '40px'
          }}
          title="외국인\n중요도: 68%\n감정: 80%"
        >
          외국인
        </button>

        {/* 실적 - 우측 하단 */}
        <button
          onClick={() => onKeywordClick('실적')}
          className={`absolute flex items-center justify-center rounded-full text-white font-medium cursor-pointer transition-all duration-300 ease-out hover:scale-110 ${
            selectedKeyword === '실적' 
              ? 'ring-4 ring-blue-500 ring-opacity-50 scale-110' 
              : 'hover:shadow-lg'
          }`}
          style={{
            width: '60px',
            height: '60px',
            fontSize: '10px',
            backgroundColor: '#10B981',
            boxShadow: selectedKeyword === '실적'
              ? '0 0 25px #10B98150'
              : '0 4px 12px #10B98130',
            bottom: '80px',
            right: '40px'
          }}
          title="실적\n중요도: 65%\n감정: 75%"
        >
          실적
        </button>

        {/* 3차 키워드들 */}
        {/* 매수세 - 상단 중앙 좌측 */}
        <button
          onClick={() => onKeywordClick('매수세')}
          className={`absolute flex items-center justify-center rounded-full text-white font-medium cursor-pointer transition-all duration-300 ease-out hover:scale-110 ${
            selectedKeyword === '매수세' 
              ? 'ring-4 ring-blue-500 ring-opacity-50 scale-110' 
              : 'hover:shadow-lg'
          }`}
          style={{
            width: '50px',
            height: '50px',
            fontSize: '9px',
            backgroundColor: '#22C55E',
            boxShadow: selectedKeyword === '매수세'
              ? '0 0 25px #22C55E50'
              : '0 4px 12px #22C55E30',
            top: '60px',
            left: '120px'
          }}
          title="매수세\n중요도: 62%\n감정: 85%"
        >
          매수세
        </button>

        {/* 중국 - 상단 중앙 우측 */}
        <button
          onClick={() => onKeywordClick('중국')}
          className={`absolute flex items-center justify-center rounded-full text-white font-medium cursor-pointer transition-all duration-300 ease-out hover:scale-110 ${
            selectedKeyword === '중국' 
              ? 'ring-4 ring-blue-500 ring-opacity-50 scale-110' 
              : 'hover:shadow-lg'
          }`}
          style={{
            width: '50px',
            height: '50px',
            fontSize: '9px',
            backgroundColor: '#EF4444',
            boxShadow: selectedKeyword === '중국'
              ? '0 0 25px #EF444450'
              : '0 4px 12px #EF444430',
            top: '60px',
            right: '120px'
          }}
          title="중국\n중요도: 58%\n감정: 30%"
        >
          중국
        </button>

        {/* 경제지표 - 하단 중앙 좌측 */}
        <button
          onClick={() => onKeywordClick('경제지표')}
          className={`absolute flex items-center justify-center rounded-full text-white font-medium cursor-pointer transition-all duration-300 ease-out hover:scale-110 ${
            selectedKeyword === '경제지표' 
              ? 'ring-4 ring-blue-500 ring-opacity-50 scale-110' 
              : 'hover:shadow-lg'
          }`}
          style={{
            width: '50px',
            height: '50px',
            fontSize: '8px',
            backgroundColor: '#F59E0B',
            boxShadow: selectedKeyword === '경제지표'
              ? '0 0 25px #F59E0B50'
              : '0 4px 12px #F59E0B30',
            bottom: '120px',
            left: '120px'
          }}
          title="경제지표\n중요도: 55%\n감정: 40%"
        >
          경제지표
        </button>

        {/* 수출 - 하단 중앙 우측 */}
        <button
          onClick={() => onKeywordClick('수출')}
          className={`absolute flex items-center justify-center rounded-full text-white font-medium cursor-pointer transition-all duration-300 ease-out hover:scale-110 ${
            selectedKeyword === '수출' 
              ? 'ring-4 ring-blue-500 ring-opacity-50 scale-110' 
              : 'hover:shadow-lg'
          }`}
          style={{
            width: '50px',
            height: '50px',
            fontSize: '9px',
            backgroundColor: '#F59E0B',
            boxShadow: selectedKeyword === '수출'
              ? '0 0 25px #F59E0B50'
              : '0 4px 12px #F59E0B30',
            bottom: '120px',
            right: '120px'
          }}
          title="수출\n중요도: 52%\n감정: 35%"
        >
          수출
        </button>

        {/* 4차 키워드들 */}
        {/* 바이오 - 좌측 상단 */}
        <button
          onClick={() => onKeywordClick('바이오')}
          className={`absolute flex items-center justify-center rounded-full text-white font-medium cursor-pointer transition-all duration-300 ease-out hover:scale-110 ${
            selectedKeyword === '바이오' 
              ? 'ring-4 ring-blue-500 ring-opacity-50 scale-110' 
              : 'hover:shadow-lg'
          }`}
          style={{
            width: '40px',
            height: '40px',
            fontSize: '8px',
            backgroundColor: '#8B5CF6',
            boxShadow: selectedKeyword === '바이오'
              ? '0 0 25px #8B5CF650'
              : '0 4px 12px #8B5CF630',
            top: '100px',
            left: '60px'
          }}
          title="바이오\n중요도: 48%\n감정: 70%"
        >
          바이오
        </button>

        {/* 헬스케어 - 우측 상단 */}
        <button
          onClick={() => onKeywordClick('헬스케어')}
          className={`absolute flex items-center justify-center rounded-full text-white font-medium cursor-pointer transition-all duration-300 ease-out hover:scale-110 ${
            selectedKeyword === '헬스케어' 
              ? 'ring-4 ring-blue-500 ring-opacity-50 scale-110' 
              : 'hover:shadow-lg'
          }`}
          style={{
            width: '40px',
            height: '40px',
            fontSize: '7px',
            backgroundColor: '#8B5CF6',
            boxShadow: selectedKeyword === '헬스케어'
              ? '0 0 25px #8B5CF650'
              : '0 4px 12px #8B5CF630',
            top: '100px',
            right: '60px'
          }}
          title="헬스케어\n중요도: 45%\n감정: 65%"
        >
          헬스케어
        </button>

        {/* 신재생에너지 - 좌측 하단 */}
        <button
          onClick={() => onKeywordClick('신재생에너지')}
          className={`absolute flex items-center justify-center rounded-full text-white font-medium cursor-pointer transition-all duration-300 ease-out hover:scale-110 ${
            selectedKeyword === '신재생에너지' 
              ? 'ring-4 ring-blue-500 ring-opacity-50 scale-110' 
              : 'hover:shadow-lg'
          }`}
          style={{
            width: '40px',
            height: '40px',
            fontSize: '6px',
            backgroundColor: '#10B981',
            boxShadow: selectedKeyword === '신재생에너지'
              ? '0 0 25px #10B98150'
              : '0 4px 12px #10B98130',
            bottom: '100px',
            left: '60px'
          }}
          title="신재생에너지\n중요도: 42%\n감정: 80%"
        >
          신재생에너지
        </button>

        {/* 금융 - 우측 하단 */}
        <button
          onClick={() => onKeywordClick('금융')}
          className={`absolute flex items-center justify-center rounded-full text-white font-medium cursor-pointer transition-all duration-300 ease-out hover:scale-110 ${
            selectedKeyword === '금융' 
              ? 'ring-4 ring-blue-500 ring-opacity-50 scale-110' 
              : 'hover:shadow-lg'
          }`}
          style={{
            width: '40px',
            height: '40px',
            fontSize: '8px',
            backgroundColor: '#6B7280',
            boxShadow: selectedKeyword === '금융'
              ? '0 0 25px #6B728050'
              : '0 4px 12px #6B728030',
            bottom: '100px',
            right: '60px'
          }}
          title="금융\n중요도: 38%\n감정: 50%"
        >
          금융
        </button>

        {/* 화학 - 좌측 중앙 */}
        <button
          onClick={() => onKeywordClick('화학')}
          className={`absolute flex items-center justify-center rounded-full text-white font-medium cursor-pointer transition-all duration-300 ease-out hover:scale-110 ${
            selectedKeyword === '화학' 
              ? 'ring-4 ring-blue-500 ring-opacity-50 scale-110' 
              : 'hover:shadow-lg'
          }`}
          style={{
            width: '40px',
            height: '40px',
            fontSize: '8px',
            backgroundColor: '#F59E0B',
            boxShadow: selectedKeyword === '화학'
              ? '0 0 25px #F59E0B50'
              : '0 4px 12px #F59E0B30',
            top: '50%',
            left: '10px',
            transform: 'translateY(-50%)'
          }}
          title="화학\n중요도: 35%\n감정: 45%"
        >
          화학
        </button>

        {/* 투자 - 우측 중앙 */}
        <button
          onClick={() => onKeywordClick('투자')}
          className={`absolute flex items-center justify-center rounded-full text-white font-medium cursor-pointer transition-all duration-300 ease-out hover:scale-110 ${
            selectedKeyword === '투자' 
              ? 'ring-4 ring-blue-500 ring-opacity-50 scale-110' 
              : 'hover:shadow-lg'
          }`}
          style={{
            width: '40px',
            height: '40px',
            fontSize: '8px',
            backgroundColor: '#10B981',
            boxShadow: selectedKeyword === '투자'
              ? '0 0 25px #10B98150'
              : '0 4px 12px #10B98130',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)'
          }}
          title="투자\n중요도: 32%\n감정: 70%"
        >
          투자
        </button>

        {/* 시장 - 하단 중앙 */}
        <button
          onClick={() => onKeywordClick('시장')}
          className={`absolute flex items-center justify-center rounded-full text-white font-medium cursor-pointer transition-all duration-300 ease-out hover:scale-110 ${
            selectedKeyword === '시장' 
              ? 'ring-4 ring-blue-500 ring-opacity-50 scale-110' 
              : 'hover:shadow-lg'
          }`}
          style={{
            width: '40px',
            height: '40px',
            fontSize: '8px',
            backgroundColor: '#6B7280',
            boxShadow: selectedKeyword === '시장'
              ? '0 0 25px #6B728050'
              : '0 4px 12px #6B728030',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
          title="시장\n중요도: 28%\n감정: 55%"
        >
          시장
        </button>
      </div>
    </div>
  )
}

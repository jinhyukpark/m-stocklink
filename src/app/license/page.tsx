'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import MobileLayout from '@/components/MobileLayout'

export default function LicensePage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'business' | 'enterprise'>('enterprise')

  const handleBack = () => {
    router.back()
  }

  const handlePlanChange = (plan: 'free' | 'business' | 'enterprise') => {
    setSelectedPlan(plan)
  }

  const plans = [
    {
      id: 'free' as const,
      name: 'Guest',
      price: 'Free',
      priceDetail: '',
      tag: '광고 포함',
      buttonText: '변경하기',
      buttonStyle: 'bg-white text-gray-900',
      features: {
        community: {
          participation: false,
          createRooms: 1,
          invitePeople: 5
        },
        graphAnalysis: {
          included: [
            '노드 사이즈', '타임라인', '증권 - 테마', '노드 형태', 
            '증권 - 산업분류', '클러스터링', '선택 노드 추출', 
            'Graph 분석', '확장·축소'
          ],
          excluded: ['데이터 추출', '필터', '투영']
        },
        stockAnalysis: {
          gptSearch: '월 50회 제공',
          aiReport: false,
          aiScoring: false,
          momentumAnalysis: false,
          realtimeTracking: false
        }
      }
    },
    {
      id: 'business' as const,
      name: 'Business',
      price: '50,000원',
      priceDetail: '/월',
      tag: '',
      buttonText: '변경하기',
      buttonStyle: 'bg-white text-gray-900',
      features: {
        community: {
          participation: false,
          createRooms: 5,
          invitePeople: 100
        },
        graphAnalysis: {
          included: [
            '노드 사이즈', '타임라인', '증권 - 테마', '노드 형태', 
            '증권 - 산업분류', '클러스터링', '선택 노드 추출', 
            'Graph 분석', '확장·축소', '데이터 추출', '필터'
          ],
          excluded: ['투영']
        },
        stockAnalysis: {
          gptSearch: '무제한',
          aiReport: '무제한',
          aiScoring: '1회 / 주',
          momentumAnalysis: false,
          realtimeTracking: '50개'
        }
      }
    },
    {
      id: 'enterprise' as const,
      name: 'Enterprise',
      price: '80,000원',
      priceDetail: '/월',
      tag: '',
      buttonText: '적용 중',
      buttonStyle: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
      features: {
        community: {
          participation: false,
          createRooms: 20,
          invitePeople: 200
        },
        graphAnalysis: {
          included: [
            '노드 사이즈', '타임라인', '증권 - 테마', '노드 형태', 
            '증권 - 산업분류', '클러스터링', '선택 노드 추출', 
            'Graph 분석', '확장·축소', '데이터 추출', '필터', '투영'
          ],
          excluded: []
        },
        stockAnalysis: {
          gptSearch: '무제한',
          aiReport: '무제한',
          aiScoring: '1회 / 주',
          momentumAnalysis: '무제한',
          realtimeTracking: '100개'
        }
      }
    }
  ]

  return (
    <MobileLayout headerTitle="라이센스">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 헤더 */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <button onClick={handleBack} className="text-gray-600 dark:text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Pricing</h1>
            <div className="w-6 h-6"></div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
            증권 관계 분석부터 AI 분석까지 모든 것을 제공합니다.
          </p>
        </div>

        {/* 요금제 카드들 - 가로 나열 (모바일 최적화) */}
        <div className="px-3 py-2">
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border-2 transition-all duration-200 flex-shrink-0 w-48 ${
                  selectedPlan === plan.id 
                    ? 'border-blue-500 dark:border-blue-400' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {/* 플랜 헤더 */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    {plan.name}
                  </h3>
                  {plan.tag && (
                    <span className="px-1.5 py-0.5 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 text-xs font-medium rounded-full">
                      {plan.tag}
                    </span>
                  )}
                </div>

                {/* 가격 */}
                <div className="mb-3">
                  <div className="flex items-baseline">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                      {plan.priceDetail}
                    </span>
                  </div>
                </div>

                {/* 변경 버튼 */}
                <button
                  onClick={() => handlePlanChange(plan.id)}
                  className={`w-full py-2 px-2 rounded-lg font-medium text-xs transition-all duration-200 ${plan.buttonStyle} ${
                    selectedPlan === plan.id 
                      ? 'opacity-100' 
                      : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 선택된 요금제 상세 기능 */}
        <div className="p-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
              {plans.find(p => p.id === selectedPlan)?.name} 상세 기능
            </h3>

            {/* 커뮤니티 섹션 */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                커뮤니티 (정식버전 제공 예정)
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-xs text-gray-600 dark:text-gray-400">커뮤니티 참여</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {plans.find(p => p.id === selectedPlan)?.features.community.participation ? '✓' : '×'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-xs text-gray-600 dark:text-gray-400">커뮤니티 방 만들기</span>
                  <span className="text-xs text-gray-900 dark:text-white font-medium">
                    {plans.find(p => p.id === selectedPlan)?.features.community.createRooms}개
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-xs text-gray-600 dark:text-gray-400">커뮤니티 초대하기</span>
                  <span className="text-xs text-gray-900 dark:text-white font-medium">
                    {plans.find(p => p.id === selectedPlan)?.features.community.invitePeople}명
                  </span>
                </div>
              </div>
            </div>

            {/* 그래프 분석 섹션 */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                그래프 분석
              </h4>
              <div className="space-y-2">
                {[
                  '노드 사이즈', '타임라인', '증권 - 테마', '노드 형태', 
                  '증권 - 산업분류', '클러스터링', '선택 노드 추출', 
                  'Graph 분석', '확장·축소', '데이터 추출', '필터', '투영'
                ].map((feature) => {
                  const isIncluded = plans.find(p => p.id === selectedPlan)?.features.graphAnalysis.included.includes(feature) || false
                  return (
                    <div key={feature} className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-xs text-gray-600 dark:text-gray-400">{feature}</span>
                      <span className={`text-xs font-medium ${isIncluded ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                        {isIncluded ? '✓' : '×'}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 주식 분석 섹션 */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                주식 분석
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-xs text-gray-600 dark:text-gray-400">GPT 주식 검색</span>
                  <span className="text-xs text-gray-900 dark:text-white font-medium">
                    {plans.find(p => p.id === selectedPlan)?.features.stockAnalysis.gptSearch || '×'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-xs text-gray-600 dark:text-gray-400">AI 주식 레포트</span>
                  <span className={`text-xs font-medium ${plans.find(p => p.id === selectedPlan)?.features.stockAnalysis.aiReport ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                    {plans.find(p => p.id === selectedPlan)?.features.stockAnalysis.aiReport ? '✓' : '×'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-xs text-gray-600 dark:text-gray-400">AI Scoring letter</span>
                  <span className="text-xs text-gray-900 dark:text-white font-medium">
                    {plans.find(p => p.id === selectedPlan)?.features.stockAnalysis.aiScoring || '×'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-xs text-gray-600 dark:text-gray-400">모멘텀 분석 기능</span>
                  <span className={`text-xs font-medium ${plans.find(p => p.id === selectedPlan)?.features.stockAnalysis.momentumAnalysis ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                    {plans.find(p => p.id === selectedPlan)?.features.stockAnalysis.momentumAnalysis ? '✓' : '×'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-xs text-gray-600 dark:text-gray-400">실시간 호가 트래킹 (정식버전 제공 예정)</span>
                  <span className="text-xs text-gray-900 dark:text-white font-medium">
                    {plans.find(p => p.id === selectedPlan)?.features.stockAnalysis.realtimeTracking || '×'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 고지사항 */}
        <div className="p-3">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center leading-relaxed">
            illunex, Inc. is registered for sales tax purposes in certain countries. As a result, depending on your location, a sales tax could be added to your final bill.
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}

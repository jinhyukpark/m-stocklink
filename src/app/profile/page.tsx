'use client'

import React, { useState } from 'react'
import MobileLayout from '@/components/MobileLayout'
import AuthModal from '@/components/AuthModal'
import { useAppStore } from '@/stores/useAppStore'
import { userInfo, notificationSettings, paymentHistory, subscriptionPlans } from '@/data/mockData'

export default function ProfilePage() {
  const { user, updateUserInfo, logout } = useAppStore()
  const [activeTab, setActiveTab] = useState<'info' | 'notifications' | 'payment' | 'subscription'>('info')
  const [isEditing, setIsEditing] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [editForm, setEditForm] = useState({
    nickname: user.nickname || userInfo.nickname,
    email: user.email || userInfo.email,
  })

  const handleSave = () => {
    updateUserInfo(editForm)
    setIsEditing(false)
  }

  const handleLogin = () => {
    setAuthMode('login')
    setShowAuthModal(true)
  }

  const handleRegister = () => {
    setAuthMode('register')
    setShowAuthModal(true)
  }

  const handleLogout = () => {
    logout()
  }

  const getSubscriptionBadge = (subscription: string) => {
    switch (subscription) {
      case 'free':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      case 'premium':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'pro':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getSubscriptionLabel = (subscription: string) => {
    switch (subscription) {
      case 'free':
        return '무료'
      case 'premium':
        return '프리미엄'
      case 'pro':
        return '프로'
      default:
        return '무료'
    }
  }

  return (
    <MobileLayout headerTitle="마이페이지">
      <div className="flex-1 flex flex-col overflow-hidden">
        {!user.isLoggedIn ? (
          // 로그인되지 않은 상태
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                로그인이 필요합니다
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                StockLink의 모든 기능을 이용하려면<br />
                로그인 또는 회원가입을 해주세요.
              </p>
            </div>

            <div className="w-full max-w-sm space-y-3">
              <button
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                로그인
              </button>
              <button
                onClick={handleRegister}
                className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-4 px-6 rounded-xl font-semibold text-lg border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                회원가입
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                로그인 없이도 이용할 수 있는 기능
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                  주식 정보 조회
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                  뉴스 확인
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                  차트 분석
                </span>
              </div>
            </div>
          </div>
        ) : (
          // 로그인된 상태
          <>
            {/* 사용자 정보 헤더 */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{editForm.nickname}</h2>
                  <p className="text-blue-100">{editForm.email}</p>
                  <div className="mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSubscriptionBadge(user.subscription)}`}>
                      {getSubscriptionLabel(user.subscription)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-white/80 hover:text-white text-sm"
                >
                  로그아웃
                </button>
              </div>
            </div>

            {/* 탭 네비게이션 */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <div className="flex">
                {[
                  { id: 'info', label: '내 정보' },
                  { id: 'notifications', label: '알림' },
                  { id: 'payment', label: '결제내역' },
                  { id: 'subscription', label: '구독관리' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 py-4 px-2 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 탭 컨텐츠 */}
            <div className="flex-1 overflow-y-auto">
          {activeTab === 'info' && (
            <div className="p-4 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">기본 정보</h3>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-blue-600 dark:text-blue-400 text-sm font-medium"
                  >
                    {isEditing ? '취소' : '수정'}
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      닉네임
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.nickname}
                        onChange={(e) => setEditForm({ ...editForm, nickname: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{editForm.nickname}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      이메일
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{editForm.email}</p>
                    )}
                  </div>

                  {isEditing && (
                    <div className="flex space-x-3">
                      <button
                        onClick={handleSave}
                        className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                      >
                        저장
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">비밀번호 변경</h3>
                <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  비밀번호 변경하기
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="p-4 space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">알림 설정</h3>
                <div className="space-y-4">
                  {Object.entries(notificationSettings).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {key === 'priceAlerts' ? '가격 알림' :
                           key === 'newsAlerts' ? '뉴스 알림' :
                           key === 'marketAlerts' ? '시장 알림' :
                           key === 'pushNotifications' ? '푸시 알림' :
                           key === 'emailNotifications' ? '이메일 알림' :
                           key === 'smsNotifications' ? 'SMS 알림' : key}
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={value}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="p-4 space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">결제 내역</h3>
                <div className="space-y-3">
                  {paymentHistory.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{payment.item}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{payment.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {payment.amount.toLocaleString()}원
                        </div>
                        <div className={`text-sm ${
                          payment.status === 'completed' ? 'text-green-600' :
                          payment.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {payment.status === 'completed' ? '완료' :
                           payment.status === 'pending' ? '대기중' : '실패'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="p-4 space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">구독 플랜</h3>
                <div className="space-y-3">
                  {subscriptionPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`p-4 rounded-lg border-2 ${
                        plan.id === user.subscription
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{plan.name}</h4>
                          {plan.popular && (
                            <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                              인기
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {plan.price === 0 ? '무료' : `${plan.price.toLocaleString()}원`}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      {plan.id !== user.subscription && (
                        <button className="w-full mt-3 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                          {plan.price === 0 ? '다운그레이드' : '업그레이드'}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            )}
            </div>
          </>
        )}

        {/* 인증 모달 */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode={authMode}
        />
      </div>
    </MobileLayout>
  )
}

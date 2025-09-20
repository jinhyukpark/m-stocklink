'use client'

import React, { useState } from 'react'
import { useAppStore } from '@/stores/useAppStore'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: 'login' | 'register'
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { setUser } = useAppStore()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // 비밀번호 확인 (회원가입 시)
      if (mode === 'register' && formData.password !== formData.confirmPassword) {
        setError('비밀번호가 일치하지 않습니다.')
        setIsLoading(false)
        return
      }

      // 간단한 유효성 검사
      if (!formData.email || !formData.password) {
        setError('이메일과 비밀번호를 입력해주세요.')
        setIsLoading(false)
        return
      }

      if (mode === 'register' && !formData.nickname) {
        setError('닉네임을 입력해주세요.')
        setIsLoading(false)
        return
      }

      // 실제 구현에서는 API 호출
      // 여기서는 더미 데이터로 로그인/회원가입 처리
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (mode === 'login') {
        // 로그인 성공
        setUser({
          id: '1',
          email: formData.email,
          nickname: '사용자',
          isLoggedIn: true,
          subscription: 'free'
        })
      } else {
        // 회원가입 성공
        setUser({
          id: '1',
          email: formData.email,
          nickname: formData.nickname,
          isLoggedIn: true,
          subscription: 'free'
        })
      }

      onClose()
      setFormData({ email: '', password: '', confirmPassword: '', nickname: '' })
    } catch (err) {
      setError(mode === 'login' ? '로그인에 실패했습니다.' : '회원가입에 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const switchMode = () => {
    setMode(prev => prev === 'login' ? 'register' : 'login')
    setError('')
    setFormData({ email: '', password: '', confirmPassword: '', nickname: '' })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {mode === 'login' ? '로그인' : '회원가입'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 이메일 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              이메일
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="이메일을 입력하세요"
              required
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          {/* 비밀번호 확인 (회원가입 시) */}
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                비밀번호 확인
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="비밀번호를 다시 입력하세요"
                required
              />
            </div>
          )}

          {/* 닉네임 (회원가입 시) */}
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                닉네임
              </label>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="닉네임을 입력하세요"
                required
              />
            </div>
          )}

          {/* 에러 메시지 */}
          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? '처리 중...' : (mode === 'login' ? '로그인' : '회원가입')}
          </button>
        </form>

        {/* 모드 전환 */}
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {mode === 'login' ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}
          </span>
          <button
            onClick={switchMode}
            className="ml-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            {mode === 'login' ? '회원가입' : '로그인'}
          </button>
        </div>
      </div>
    </div>
  )
}

'use client'

import React from 'react'
import { useAppStore } from '@/stores/useAppStore'
import BottomNavigation from './BottomNavigation'
import Header from './Header'
import Sidebar from './Sidebar'
import LoadingSpinner from './LoadingSpinner'
import ToastContainer from './ToastContainer'

interface MobileLayoutProps {
  children: React.ReactNode
  showHeader?: boolean
  showBottomNav?: boolean
  headerTitle?: string
  headerActions?: React.ReactNode
  showLogo?: boolean
}

export default function MobileLayout({
  children,
  showHeader = true,
  showBottomNav = true,
  headerTitle,
  headerActions,
  showLogo = false,
}: MobileLayoutProps) {
  const { ui } = useAppStore()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* 헤더 */}
      {showHeader && (
        <Header
          title={headerTitle}
          actions={headerActions}
          showLogo={showLogo}
        />
      )}

      {/* 메인 컨텐츠 */}
      <main className="flex-1 flex flex-col overflow-hidden pb-20">
        {children}
      </main>

      {/* 하단 네비게이션 - 고정 */}
      {showBottomNav && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <BottomNavigation />
        </div>
      )}

      {/* 사이드바 */}
      <Sidebar />

      {/* 로딩 스피너 */}
      {ui.isLoading && <LoadingSpinner />}

      {/* 토스트 컨테이너 */}
      <ToastContainer />
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/stores/useAppStore'

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const { setOnlineStatus } = useAppStore()

  useEffect(() => {
    // 초기 온라인 상태 설정
    setIsOnline(navigator.onLine)
    setOnlineStatus(navigator.onLine)

    const handleOnline = () => {
      setIsOnline(true)
      setOnlineStatus(true)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setOnlineStatus(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [setOnlineStatus])

  return isOnline
}

'use client'

import React from 'react'

// 간단한 토스트 컨테이너 (나중에 확장 가능)
export default function ToastContainer() {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {/* 토스트 메시지들이 여기에 표시됩니다 */}
    </div>
  )
}

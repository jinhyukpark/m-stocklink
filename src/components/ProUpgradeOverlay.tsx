'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

interface ProUpgradeOverlayProps {
  onClick?: () => void
}

export default function ProUpgradeOverlay({ onClick }: ProUpgradeOverlayProps) {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      router.push('/license')
    }
  }

  return (
    <div 
      onClick={handleClick}
      className="absolute inset-0 bg-white/30 dark:bg-gray-800/30 backdrop-blur-[0.5px] rounded-lg flex items-center justify-end cursor-pointer hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all duration-200 group pr-2"
    >
      <div className="text-center">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-md group-hover:shadow-lg transition-shadow duration-200">
          Pro 업그레이드
        </div>
      </div>
    </div>
  )
}

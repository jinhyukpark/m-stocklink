'use client'

import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  message?: string
  overlay?: boolean
}

export default function LoadingSpinner({ 
  size = 'md', 
  message,
  overlay = true 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-blue-600`}
      />
      {message && (
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          {message}
        </p>
      )}
    </div>
  )

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 flex items-center justify-center z-50">
        {spinner}
      </div>
    )
  }

  return spinner
}

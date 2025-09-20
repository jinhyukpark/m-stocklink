import React from 'react'
import StockDetailClient from '@/components/StockDetailClient'

// 정적 생성용 함수
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' }
  ]
}

export default function StockDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <StockDetailClient params={params} />
}

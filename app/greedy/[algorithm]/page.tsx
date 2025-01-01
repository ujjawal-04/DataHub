'use client'

import { useParams } from 'next/navigation'
import activityselection from '@/components/greedy/activityselection'
import fractionalknapsack from '@/components/greedy/fractionalknapsack'
import huffmancoding from '@/components/greedy/huffmancoding'

const algorithmComponents = {
  'activity-selection': activityselection,
  'fractional-knapsack': fractionalknapsack,
  'huffman-coding': huffmancoding,
}

export default function AlgorithmPage() {
  const params = useParams()
  const algorithm = params.algorithm as string
  const AlgorithmComponent = algorithmComponents[algorithm as keyof typeof algorithmComponents]

  if (!AlgorithmComponent) {
    return <div>Algorithm not found</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <AlgorithmComponent />
      </div>
    </div>
  )
}


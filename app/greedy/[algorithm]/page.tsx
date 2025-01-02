'use client'

import { useParams } from 'next/navigation'
import activityselection from '@/components/greedy/activityselection'
import fractionalknapsack from '@/components/greedy/fractionalknapsack'
import huffmancoding from '@/components/greedy/huffmancoding'
import BackButton from '@/components/BackButton'

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
    return <div className="text-center text-xl text-red-500">Algorithm not found</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <BackButton/>
          <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 bg-clip-text">
            {algorithm.replace('-', ' ').toUpperCase()}
          </h1>
        </div>
        <div className="transition-opacity duration-500 opacity-100">
          <AlgorithmComponent />
        </div>
      </div>
    </div>
  )
}

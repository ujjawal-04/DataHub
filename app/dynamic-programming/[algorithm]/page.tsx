'use client'

import { useParams } from 'next/navigation'
import LCS from '@/components/dynamic-programming/lcs'
import Knapsack from '@/components/dynamic-programming/knapsack'
import MatrixChain from '@/components/dynamic-programming/matrixchain'
import BackButton from '@/components/BackButton'

const algorithmComponents = {
  'longest-common-subsequence': LCS,
  'knapsack-problem': Knapsack,
  'matrix-chain-multiplication': MatrixChain,
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 text-transparent bg-clip-text">
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

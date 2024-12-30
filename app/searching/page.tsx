'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import LinearSearchVisualizer from '../../components/searching/LinearSearchVisualizer'
import BinarySearchVisualizer from '../../components/searching/BinarySearchVisualizer'
import JumpSearchVisualizer from '../../components/searching/JumpSearchVisualizer'
import InterpolationSearchVisualizer from '../../components/searching/InterpolationSearchVisualizer'
import ExponentialSearchVisualizer from '../../components/searching/ExponentialSearchVisualizer'

const searchingAlgorithms = [
  { name: 'Linear Search', component: LinearSearchVisualizer },
  { name: 'Binary Search', component: BinarySearchVisualizer },
  { name: 'Jump Search', component: JumpSearchVisualizer },
  { name: 'Interpolation Search', component: InterpolationSearchVisualizer },
  { name: 'Exponential Search', component: ExponentialSearchVisualizer },
]

export default function SearchingPage() {
  const [selectedAlgo, setSelectedAlgo] = useState(searchingAlgorithms[0])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Searching Algorithms</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          {searchingAlgorithms.map((algo, index) => (
            <button
              key={index}
              className={`w-full text-left p-4 rounded-lg mb-2 ${
                selectedAlgo.name === algo.name ? 'bg-primary text-primary-foreground' : 'bg-card text-card-foreground'
              }`}
              onClick={() => setSelectedAlgo(algo)}
            >
              {algo.name}
            </button>
          ))}
        </div>
        <div className="col-span-2">
          <h2 className="text-2xl font-semibold mb-4">{selectedAlgo.name}</h2>
          {selectedAlgo.component && <selectedAlgo.component />}
        </div>
      </div>
    </div>
  )
}


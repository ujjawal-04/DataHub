'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import BubbleSortVisualizer from '../../components/sorting/BubbleSortVisualizer'
import SelectionSortVisualizer from '../../components/sorting/SelectionSortVisualizer'
import InsertionSortVisualizer from '../../components/sorting/InsertionSortVisualizer'
import MergeSortVisualizer from '../../components/sorting/MergeSortVisualizer'
import QuickSortVisualizer from '../../components/sorting/QuickSortVisualizer'
import HeapSortVisualizer from '../../components/sorting/HeapSortVisualizer'

const sortingAlgorithms = [
  { name: 'Bubble Sort', component: BubbleSortVisualizer },
  { name: 'Selection Sort', component: SelectionSortVisualizer },
  { name: 'Insertion Sort', component: InsertionSortVisualizer },
  { name: 'Merge Sort', component: MergeSortVisualizer },
  { name: 'Quick Sort', component: QuickSortVisualizer },
  { name: 'Heap Sort', component: HeapSortVisualizer },
]

export default function SortingPage() {
  const [selectedAlgo, setSelectedAlgo] = useState(sortingAlgorithms[0])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Sorting Algorithms</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          {sortingAlgorithms.map((algo, index) => (
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


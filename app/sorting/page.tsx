'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 ml-10 mr-10">
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-8 text-blue-800 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Sorting Algorithms
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <div className="md:hidden mb-4">
              <button
                className="w-full bg-blue-600 text-white p-4 rounded-lg flex justify-between items-center"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span>{selectedAlgo.name}</span>
                <ChevronDown className={`transform transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            <motion.div
              className={`md:block ${isMenuOpen ? 'block' : 'hidden'}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              {sortingAlgorithms.map((algo, index) => (
                <motion.button
                  key={index}
                  className={`w-full text-left p-4 rounded-lg mb-2 transition-colors ${
                    selectedAlgo.name === algo.name 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-blue-800 hover:bg-blue-100'
                  }`}
                  onClick={() => {
                    setSelectedAlgo(algo)
                    setIsMenuOpen(false)
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {algo.name}
                </motion.button>
              ))}
            </motion.div>
          </div>
          <motion.div 
            className="col-span-2 bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">{selectedAlgo.name}</h2>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedAlgo.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {selectedAlgo.component && <selectedAlgo.component />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
        </motion.div>
      </div>
    </div>
  )
}


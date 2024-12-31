'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const dpAlgorithms = [
  { name: 'Fibonacci Sequence', link: '/dynamic-programming/fibonacci' },
  { name: 'Longest Common Subsequence', link: '/dynamic-programming/lcs' },
  { name: '0/1 Knapsack Problem', link: '/dynamic-programming/knapsack' },
  { name: 'Matrix Chain Multiplication', link: '/dynamic-programming/matrix-chain' },
]

export default function DynamicProgrammingPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 ml-10 mr-10">
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-8 text-blue-800 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Dynamic Programming Algorithms
        </motion.h1>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {dpAlgorithms.map((algo, index) => (
            <motion.div 
              key={index} 
              className="bg-white text-blue-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <h3 className="text-xl font-semibold mb-4">{algo.name}</h3>
              <Link 
                href={algo.link} 
                className="text-blue-600 hover:text-blue-800 flex items-center transition-colors duration-300"
              >
                Explore 
                <motion.div
                  animate={{ x: hoveredIndex === index ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="ml-2" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
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


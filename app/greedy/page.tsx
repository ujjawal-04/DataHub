'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import activityselection from '@/components/greedy/activityselection'
import fractionalknapsack from '@/components/greedy/fractionalknapsack'
import huffmancoding from '@/components/greedy/huffmancoding'
import BackButton from '@/components/BackButton'

const greedyAlgorithms = [
  { name: 'Activity Selection', component: activityselection },
  { name: 'Fractional Knapsack', component: fractionalknapsack },
  { name: 'Huffman Coding', component: huffmancoding },
]

export default function GreedyPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 ml-10 mr-10">
      <div className="container mx-auto px-4 py-12">
        <BackButton/>
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-8 text-transparent bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 bg-clip-text text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Greedy Algorithms
        </motion.h1>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {greedyAlgorithms.map((algo, index) => (
            <motion.div 
              key={index} 
              className="bg-white text-teal-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
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
                href={ {
                  pathname: '/greedy/[algorithm]',
                  query: { algorithm: algo.name.toLowerCase().replace(' ', '-') },
                }}
                as={`/greedy/${algo.name.toLowerCase().replace(' ', '-')}`}
                className="text-teal-600 hover:text-teal-800 flex items-center transition-colors duration-300"
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

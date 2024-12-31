'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BarChart2, Search, Share2, Database, GitBranch, Scissors } from 'lucide-react'

const features = [
  {
    icon: Database,
    title: 'Data Structures',
    description: 'Explore various data structures with interactive visualizations.',
    link: '/data-structures'
  },
  {
    icon: BarChart2,
    title: 'Sorting Algorithms',
    description: 'Visualize and compare various sorting algorithms in action.',
    link: '/sorting'
  },
  {
    icon: Search,
    title: 'Searching Algorithms',
    description: 'Explore different searching techniques with interactive demos.',
    link: '/searching'
  },
  {
    icon: Share2,
    title: 'Graph Algorithms',
    description: 'Understand complex graph algorithms through step-by-step visualizations.',
    link: '/graph'
  },
  {
    icon: GitBranch,
    title: 'Dynamic Programming',
    description: 'Learn dynamic programming concepts with interactive examples of dynamic programming.',
    link: '/dynamic-programming'
  },
  {
    icon: Scissors,
    title: 'Greedy Algorithms',
    description: 'Explore greedy algorithms and their applications which help in data visualization.',
    link: '/greedy'
  }
]

export default function GetStartedPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 ml-10 mr-10">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-6 text-blue-800 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Get Started with AlgoViz Pro
        </motion.h1>
        <motion.p 
          className="text-blue-600 mb-12 text-center text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Choose a topic below to start exploring interactive visualizations and learning about algorithms and data structures.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white text-blue-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <motion.div
                className="absolute inset-0 bg-blue-50"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: hoveredIndex === index ? 1 : 0, opacity: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <feature.icon className="w-12 h-12 text-blue-600 mb-6 relative z-10" />
              <h3 className="text-2xl font-semibold mb-3 relative z-10">{feature.title}</h3>
              <p className="text-blue-600 mb-6 relative z-10">{feature.description}</p>
              <Link 
                href={feature.link} 
                className="text-blue-600 hover:text-blue-800 flex items-center font-medium transition-colors duration-300 relative z-10"
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
        </div>
      </div>
    </div>
  )
}


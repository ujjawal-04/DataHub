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
    description: 'Learn dynamic programming concepts with interactive examples.',
    link: '/dynamic-programming'
  },
  {
    icon: Scissors,
    title: 'Greedy Algorithms',
    description: 'Explore greedy algorithms and their applications.',
    link: '/greedy'
  }
]

export default function GetStartedPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Get Started with AlgoViz Pro</h1>
      <p className="text-muted-foreground mb-8">
        Choose a topic below to start exploring interactive visualizations and learning about algorithms and data structures.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            className="bg-card text-card-foreground p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <feature.icon className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground mb-4">{feature.description}</p>
            <Link href={feature.link} className="text-primary hover:text-primary/80 flex items-center">
              Explore <ArrowRight className="ml-2" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}


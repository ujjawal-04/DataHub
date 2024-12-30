'use client'

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

export default function Home() {
  return (
    <div className="bg-white">
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 text-[#1D3354]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to <span className="text-[#D64045]">AlgoViz Pro</span>
          </motion.h1>
          <motion.p 
            className="text-xl mb-8 text-[#467599]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore algorithms and data structures through interactive visualizations
          </motion.p>
          <Link href="/get-started">
            <motion.button 
              className="bg-[#D64045] text-white px-6 py-3 rounded-md hover:bg-[#D64045]/90 transition-colors inline-flex items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Get Started
              <ArrowRight className="ml-2" />
            </motion.button>
          </Link>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#E9FFF9]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#1D3354]">Why Choose AlgoViz Pro?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-[#1D3354]">Interactive Learning</h3>
              <p className="text-[#467599]">Engage with algorithms and data structures through hands-on visualizations.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-[#1D3354]">Comprehensive Coverage</h3>
              <p className="text-[#467599]">Explore a wide range of topics from basic to advanced concepts.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-[#1D3354]">Step-by-Step Explanations</h3>
              <p className="text-[#467599]">Understand complex algorithms with detailed, step-by-step breakdowns.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#1D3354]">Explore Our Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-[#9ED8DB] p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <feature.icon className="w-12 h-12 text-[#D64045] mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-[#1D3354]">{feature.title}</h3>
                <p className="text-[#467599] mb-4">{feature.description}</p>
                <Link href={feature.link} className="text-[#D64045] flex items-center">
                  Explore <ArrowRight className="ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#E9FFF9]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-[#1D3354]">Ready to Master Algorithms?</h2>
          <p className="text-xl mb-8 text-[#467599]">
            Join thousands of students and professionals who have accelerated their learning with AlgoViz Pro.
          </p>
          <Link href="/about" className="bg-[#D64045] text-white px-6 py-3 rounded-md hover:bg-[#D64045]/90 transition-colors inline-flex items-center">
            Learn More About Us
            <ArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  )
}


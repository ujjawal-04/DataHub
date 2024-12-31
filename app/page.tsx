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

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function Home() {
  return (
    <div className="bg-white text-gray-900">
      <motion.section 
        className="py-24 px-4 bg-gradient-to-r from-blue-50 to-indigo-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
            {...fadeInUp}
          >
            Welcome to DataHub
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-10 text-gray-700"
            {...fadeInUp}
            transition={{ delay: 0.2, ...fadeInUp.transition }}
          >
            Explore algorithms and data structures through interactive visualizations
          </motion.p>
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4, ...fadeInUp.transition }}
          >
            <Link href="/get-started">
              <motion.button 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-colors inline-flex items-center shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <ArrowRight className="ml-2" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        className="py-24 px-4 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold mb-16 text-center text-gray-900"
            {...fadeInUp}
          >
            Why Choose DataHub?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Interactive Learning', description: 'Engage with algorithms and data structures through hands-on visualizations.', icon: '🎨' },
              { title: 'Comprehensive Coverage', description: 'Explore a wide range of topics from basic to advanced concepts.', icon: '📚' },
              { title: 'Step-by-Step Explanations', description: 'Understand complex algorithms with detailed, step-by-step breakdowns.', icon: '🔍' }
            ].map((item, index) => (
              <motion.div 
                key={item.title}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg"
                {...fadeInUp}
                transition={{ delay: 0.1 * index, ...fadeInUp.transition }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section 
        className="py-24 px-4 bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold mb-16 text-center text-gray-900"
            {...fadeInUp}
          >
            Explore Our Topics
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                {...fadeInUp}
                transition={{ delay: 0.1 * index, ...fadeInUp.transition }}
              >
                <feature.icon className="w-16 h-16 text-blue-500 mb-6" />
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-700 mb-6">{feature.description}</p>
                <Link href={feature.link} className="text-blue-600 font-semibold flex items-center group hover:text-indigo-600 transition-colors">
                  Explore 
                  <motion.span
                    className="ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight />
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section 
        className="py-24 px-4 bg-gradient-to-r from-blue-100 to-indigo-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            className="text-4xl font-bold mb-8 text-gray-900"
            {...fadeInUp}
          >
            Ready to Master Algorithms?
          </motion.h2>
          <motion.p 
            className="text-xl mb-10 text-gray-700"
            {...fadeInUp}
            transition={{ delay: 0.2, ...fadeInUp.transition }}
          >
            Join thousands of students and professionals who have accelerated their learning with DataHub.
          </motion.p>
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4, ...fadeInUp.transition }}
          >
            <Link href="/about">
              <motion.button
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-colors inline-flex items-center shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More About Us
                <ArrowRight className="ml-2" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}


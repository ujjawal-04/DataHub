'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChartBarIcon, CodeBracketIcon, ServerIcon, LightBulbIcon, RocketLaunchIcon, BookOpenIcon, UsersIcon } from '@heroicons/react/24/outline'
import { ArrowRight } from 'lucide-react'
import BackButton from '@/components/BackButton'

const features = [
  {
    name: 'Interactive Visualizations',
    description: 'Engage with dynamic, interactive visualizations that bring data concepts to life.',
    icon: ChartBarIcon,
  },
  {
    name: 'Comprehensive Coverage',
    description: 'Explore a wide range of data structures, algorithms, and data science topics.',
    icon: CodeBracketIcon,
  },
  {
    name: 'Data Resources',
    description: 'Access detailed explanations, complexity analysis, and real-world data applications.',
    icon: ServerIcon,
  },
  {
    name: 'Practice Exercises',
    description: 'Reinforce your understanding with hands-on coding exercises and data challenges.',
    icon: LightBulbIcon,
  },
]

const learningPaths = [
  {
    name: 'Data Fundamentals',
    description: 'Start your journey with basic data structures, algorithms, and data analysis techniques.',
    icon: RocketLaunchIcon,
  },
  {
    name: 'Advanced Analytics',
    description: 'Dive deeper into advanced data structures, machine learning, and data visualization.',
    icon: BookOpenIcon,
  },
  {
    name: 'Data Science Pro',
    description: 'Master complex algorithms, big data technologies, and advanced statistical methods.',
    icon: UsersIcon,
  },
]

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 text-gray-900 ml-20 mr-20">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-20">
        <BackButton/>
          </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-br from-teal-500 via-emerald-500 to-cyan-500 text-transparent bg-clip-text">About DataHub</h1>
          <p className="text-gray-700 mb-8 text-lg">
            DataHub is an interactive platform designed to help students, developers, and data enthusiasts learn and visualize various data structures, algorithms, and data science concepts. Our goal is to make complex data-related topics more accessible and engaging through interactive visualizations and comprehensive resources.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600">What We Offer</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {['Data Structures', 'Algorithms', 'Machine Learning', 'Data Visualization', 'Big Data Technologies', 'Statistical Analysis'].map((item, index) => (
              <motion.li
                key={item}
                className="flex items-center text-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <svg className="h-6 w-6 text-teal-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600">Why Choose DataHub?</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-600 text-white mb-4">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                <p className="mt-2 text-base text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600">Learning Paths</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {learningPaths.map((path, index) => (
              <motion.div
                key={path.name}
                className="bg-white p-6 rounded-lg shadow-md border border-teal-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 text-teal-600 mb-4">
                  <path.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{path.name}</h3>
                <p className="text-gray-600">{path.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            At DataHub, we believe that understanding data structures, algorithms, and data science concepts is fundamental to becoming a proficient data professional. Our mission is to demystify these concepts and make them accessible to everyone, regardless of their background or experience level.
          </p>
          <p className="text-gray-700">
            Whether you&apos;re a student preparing for exams, a developer looking to enhance your data skills, or a data enthusiast curious about advanced analytics, DataHub provides an intuitive and interactive way to explore these essential concepts in the world of data.
          </p>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600">Get Started Today</h2>
          <p className="text-gray-700 mb-6">
            Ready to dive into the world of data structures, algorithms, and data science? Start your journey with DataHub!
          </p>
          <Link href="/get-started">
            <motion.button
              className="bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-400 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-teal-600 hover:via-emerald-600 hover:to-cyan-500 transition-colors inline-flex items-center shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Now
              <ArrowRight className="ml-2" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

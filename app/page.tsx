'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion} from 'framer-motion'
import { ArrowRight, BarChart2, Search, Share2, Database, GitBranch, Scissors, BookOpen, Users, Zap, Brain, Lightbulb, Rocket } from 'lucide-react'

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
    <div className="bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 text-gray-900 overflow-hidden">
      <motion.section 
        className="relative py-24 px-4 bg-gradient-to-r from-teal-500 via-emerald-800 to-cyan-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold mb-6 text-white"
            {...fadeInUp}
          >
            Welcome to <span className=" bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400">DataHub</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-12 text-cyan-100"
            {...fadeInUp}
            transition={{ delay: 0.2, ...fadeInUp.transition }}
          >
            Explore algorithms and data structures through interactive explanations
          </motion.p>
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4, ...fadeInUp.transition }}
          >
            <Link href="/get-started">
              <motion.button 
                className="bg-white text-teal-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-cyan-50 transition-colors inline-flex items-center shadow-lg"
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
        className="relative py-24 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600"
            {...fadeInUp}
          >
            Why Choose DataHub?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Interactive Learning', description: 'Engage with algorithms and data structures through hands-on explanations.', icon: BookOpen },
              { title: 'Comprehensive Coverage', description: 'Explore a wide range of topics from basic to advanced concepts.', icon: Users },
              { title: 'Step-by-Step Explanations', description: 'Understand complex algorithms with detailed, step-by-step breakdowns.', icon: Zap }
            ].map((item, index) => (
              <motion.div 
                key={item.title}
                className="bg-white p-8 rounded-2xl shadow-lg"
                {...fadeInUp}
                transition={{ delay: 0.1 * index, ...fadeInUp.transition }}
                whileHover={{ scale: 1.05 }}
              >
                <item.icon className="w-12 h-12 text-emerald-600 mb-4" />
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section 
        className="relative py-24 px-4 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <motion.h2 
              className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600"
              {...fadeInUp}
            >
              Ready to Master Algorithms?
            </motion.h2>
            <motion.p 
              className="text-xl mb-10 text-gray-700"
              {...fadeInUp}
              transition={{ delay: 0.2, ...fadeInUp.transition }}
            >
              Join thousands of students and professionals who have accelerated their learning with DataHub. Our interactive platform makes complex concepts easy to understand and remember.
            </motion.p>
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4, ...fadeInUp.transition }}
            >
              <Link href="/about">
                <motion.button
                  className="bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-400 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-teal-600 hover:via-emerald-600 hover:to-cyan-500 transition-colors inline-flex items-center shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More About Us
                  <ArrowRight className="ml-2" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <StudentVisualization />
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        className="relative py-24 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600"
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
                whileHover={{ y: -10 }}
              >
                <feature.icon className="w-16 h-16 text-emerald-600 mb-6" />
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <Link href={feature.link} className="text-emerald-600 font-semibold flex items-center group hover:text-teal-600 transition-colors">
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
        className="relative py-24 px-4 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600"
            {...fadeInUp}
          >
            Discover Data Structures & Algorithms
          </motion.h2>
          <InteractiveImageCollage />
        </div>
      </motion.section>

      <motion.section 
        className="relative py-24 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600"
            {...fadeInUp}
          >
            Start Your Learning Journey Today
          </motion.h2>
          <motion.p 
            className="text-xl mb-10 text-gray-700"
            {...fadeInUp}
            transition={{ delay: 0.2, ...fadeInUp.transition }}
          >
            Whether you&apos;re a beginner or an experienced programmer, DataHub has something for everyone. Dive into our interactive lessons and take your skills to the next level.
          </motion.p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            {...fadeInUp}
            transition={{ delay: 0.4, ...fadeInUp.transition }}
          >
            {[
              { icon: Brain, title: 'Boost Your Problem-Solving Skills', description: 'Tackle complex problems with confidence using our step-by-step guides.' },
              { icon: Lightbulb, title: 'Gain Deep Insights', description: 'Understand the underlying principles of algorithms and data structures.' },
              { icon: Rocket, title: 'Accelerate Your Career', description: 'Master the skills that top tech companies look for in candidates.' }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <item.icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </motion.div>
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.6, ...fadeInUp.transition }}
          >
            <Link href="/get-started">
              <motion.button
                className="bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-400 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-teal-600 hover:via-emerald-600 hover:to-cyan-500 transition-colors inline-flex items-center shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Learning Now
                <ArrowRight className="ml-2" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

function StudentVisualization() {
  return (
    <motion.div
      className="w-full h-80 rounded-lg overflow-hidden bg-white shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <svg width="100%" height="100%" viewBox="0 0 400 300">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#0d9488', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <motion.path
          d="M 50 150 L 350 150"
          stroke="#E5E7EB"
          strokeWidth="2"
          fill="none"
        />
        <motion.path
          d="M 50 50 L 50 250"
          stroke="#E5E7EB"
          strokeWidth="2"
          fill="none"
        />
        <motion.path
          d="M50 150 Q125 50 200 150 T350 150"
          fill="none"
          stroke="url(#grad1)"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
      </svg>
    </motion.div>
  )
}

function InteractiveImageCollage() {
  const images = [
    { src: "https://images.javatpoint.com/ds/images/binary-search-tree1.png", alt: "Binary Search Tree", title: "Binary Search Trees" },
    { src: "https://images.deepai.org/glossary-terms/a5228ea07c794b468efd1b7f758b9ead/Quicksort.png", alt: "Quicksort Algorithm", title: "Quicksort" },
    { src: "https://datastructures.maximal.io/img/graphs/traversal.svg", alt: "Depth First Search", title: "Graph Traversal" },
    { src: "https://platform.text.com/resource-center/text-platform-dynamic-programming.jpg", alt: "Dynamic Programming", title: "Dynamic Programming" },
    { src: "https://cdn.programiz.com/sites/tutorial2program/files/stack.png", alt: "stack", title: "Stack" },
    { src: "https://i.imgur.com/1mghTRv.png", alt: "heap", title: "Heap" },
  ]

  return (
    <motion.div 
      className="grid grid-cols-3 gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {images.map((img, index) => (
        <motion.div
          key={index}
          className={`relative overflow-hidden rounded-lg shadow-lg ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            width={600}
            height={400}
            className="object-contain w-full h-full"
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-teal-500/75 via-emerald-600/75 to-cyan-500/75"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <h3 className="text-2xl font-bold text-white">{img.title}</h3>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  )
}


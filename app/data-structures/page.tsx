'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import ArrayVisualizer from '../../components/data-structures/ArrayVisualizer'
import LinkedListVisualizer from '../../components/data-structures/LinkedListVisualizer'
import StackVisualizer from '../../components/data-structures/StackVisualizer'
import QueueVisualizer from '../../components/data-structures/QueueVisualizer'
import TreeVisualizer from '../../components/data-structures/TreeVisualizer'
import GraphVisualizer from '../../components/data-structures/GraphVisualizer'
import HashTableVisualizer from '../../components/data-structures/HashTableVisualizer'
import BackButton from '@/components/BackButton'

const dataStructures = [
  { name: 'Arrays', component: ArrayVisualizer },
  { name: 'Linked Lists', component: LinkedListVisualizer },
  { name: 'Stacks', component: StackVisualizer },
  { name: 'Queues', component: QueueVisualizer },
  { name: 'Trees', component: TreeVisualizer },
  { name: 'Graphs', component: GraphVisualizer },
  { name: 'Hash Tables', component: HashTableVisualizer },
]

export default function DataStructuresPage() {
  const [selectedDS, setSelectedDS] = useState(dataStructures[0])
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 ml-10 mr-10">
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-6 text-blue-800 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BackButton/>
          Data Structures
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <div className="md:hidden mb-4">
              <button
                className="w-full bg-blue-600 text-white p-4 rounded-lg flex justify-between items-center"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span>{selectedDS.name}</span>
                <ChevronDown className={`transform transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            <motion.div
              className={`md:block ${isMenuOpen ? 'block' : 'hidden'}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              {dataStructures.map((ds, index) => (
                <motion.button
                  key={index}
                  className={`w-full text-left p-4 rounded-lg mb-2 transition-colors ${
                    selectedDS.name === ds.name 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-blue-800 hover:bg-blue-100'
                  }`}
                  onClick={() => {
                    setSelectedDS(ds)
                    setIsMenuOpen(false)
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {ds.name}
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
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">{selectedDS.name}</h2>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDS.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {selectedDS.component && <selectedDS.component />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
        </motion.div>
      </div>
    </div>
  )
}


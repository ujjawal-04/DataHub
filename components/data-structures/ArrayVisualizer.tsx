'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ArrayVisualizer() {
  const [array, setArray] = useState<number[]>([10, 20, 30, 40, 50])
  const [newItem, setNewItem] = useState('')

  const addItem = () => {
    if (newItem.trim() !== '') {
      setArray([...array, parseInt(newItem)])
      setNewItem('')
    }
  }

  const removeItem = (index: number) => {
    setArray(array.filter((_, i) => i !== index))
  }

  const clearArray = () => {
    setArray([])
  }

  // Function to remove item on double-click
  const handleDoubleClick = (index: number) => {
    removeItem(index)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {/* Note about double-click feature */}
      <div className="mb-4 text-sm text-gray-600">
        <strong>Note:</strong> Double-click on any element in the array to remove it.
      </div>

      {/* Input & Buttons */}
      <motion.div
        className="mb-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <input
          type="number"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="border border-blue-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-40"
          placeholder="Enter a number"
        />
        <button
          onClick={addItem}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Add Item
        </button>
        <button
          onClick={clearArray}
          className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors duration-300"
        >
          Clear Array
        </button>
      </motion.div>

      {/* Array Visualization (Horizontal Line with Elements Only) */}
      <motion.div
        className="flex flex-wrap justify-start gap-4 mb-6 overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence>
          {array.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
              onDoubleClick={() => handleDoubleClick(index)} // Double-click to remove
            >
              {/* Box representing the array element */}
              <motion.div
                style={{
                  height: '40px',  // Fixed height
                  width: '40px',   // Fixed width
                  backgroundColor: '#4A90E2',
                  borderRadius: '4px',
                  border: '2px solid #1C3D6D',  // Adding a border to make it look like a box
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <span className="text-white font-semibold">{item}</span>
              </motion.div>
              {/* Index Number Above the Box */}
              <span className="text-blue-600 font-medium mt-2">{index}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Array Length */}
      <motion.div
        className="text-center text-blue-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Array Length: {array.length}
      </motion.div>
    </div>
  )
}

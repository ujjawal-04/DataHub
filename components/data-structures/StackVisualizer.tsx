'use client'

import { useState} from 'react'
import { motion } from 'framer-motion'

export default function StackVisualizer() {
  // Initialize the stack with default values
  const [stack, setStack] = useState<number[]>([10, 20, 30])
  const [newItem, setNewItem] = useState('')

  // Push a new item to the stack
  const push = () => {
    if (newItem.trim() !== '') {
      setStack([parseInt(newItem), ...stack]) // Adds the new item at the top
      setNewItem('') // Clear the input field
    }
  }

  // Pop an item from the top of the stack
  const pop = () => {
    if (stack.length > 0) {
      setStack(stack.slice(1)) // Removes the topmost item from the stack
    }
  }

  // Remove an item by double-clicking
  const handleDoubleClick = (index: number) => {
    setStack(stack.filter((_, i) => i !== index)) // Remove the clicked item
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {/* Input and Buttons */}
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <input
          type="number"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="border border-blue-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-40"
          placeholder="Enter a number"
        />
        <button
          onClick={push}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Push
        </button>
        <button
          onClick={pop}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300"
        >
          Pop
        </button>
      </div>

      {/* Stack Visualization */}
      <motion.div
        className="flex flex-col items-center gap-2 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {stack.map((item, index) => (
          <motion.div
            key={index}
            className="bg-blue-100 text-blue-800 p-4 rounded-lg shadow-md w-full text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onDoubleClick={() => handleDoubleClick(index)} // Remove the item on double click
          >
            {item}
          </motion.div>
        ))}
      </motion.div>

      {/* Stack Length */}
      <motion.div
        className="text-center text-blue-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Stack Length: {stack.length}
      </motion.div>

      {/* Notes */}
      <div className="mt-6 text-sm text-gray-600">
        <p><strong>Note:</strong> Double-click any stack element to remove it. Use &quot;Pop&quot; to remove the topmost element.</p>
      </div>
    </div>
  )
}

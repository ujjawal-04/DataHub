'use client'

import { useState} from 'react'
import { motion } from 'framer-motion'

export default function QueueVisualizer() {
  // Initialize the queue with default values
  const [queue, setQueue] = useState<number[]>([10, 20, 30])
  const [newItem, setNewItem] = useState('')

  // Enqueue (Add item to the end of the queue)
  const enqueue = () => {
    if (newItem.trim() !== '') {
      setQueue([...queue, parseInt(newItem)])
      setNewItem('')
    }
  }

  // Dequeue (Remove item from the front of the queue)
  const dequeue = () => {
    if (queue.length > 0) {
      setQueue(queue.slice(1))
    }
  }

  // Remove an item by double-clicking
  const handleDoubleClick = (index: number) => {
    setQueue(queue.filter((_, i) => i !== index)) // Remove the clicked item
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
          onClick={enqueue}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Enqueue
        </button>
        <button
          onClick={dequeue}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300"
        >
          Dequeue
        </button>
      </div>

      {/* Queue Visualization */}
      <motion.div
        className="flex items-center gap-2 overflow-x-auto pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {queue.map((item, index) => (
          <motion.div
            key={index}
            className="bg-blue-100 text-blue-800 p-4 rounded-lg shadow-md flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            onDoubleClick={() => handleDoubleClick(index)} // Handle double-click to remove
          >
            {item}
          </motion.div>
        ))}
      </motion.div>

      {/* Queue Length */}
      <motion.div
        className="text-center text-blue-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Queue Length: {queue.length}
      </motion.div>

      {/* Notes */}
      <div className="mt-6 text-sm text-gray-600">
        <p><strong>Note:</strong> Double-click any queue element to remove it. Use "Enqueue" to add items, and "Dequeue" to remove the front item.</p>
      </div>
    </div>
  )
}

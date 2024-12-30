'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function QueueVisualizer() {
  const [queue, setQueue] = useState<number[]>([])
  const [newItem, setNewItem] = useState('')

  const enqueue = () => {
    if (newItem.trim() !== '') {
      setQueue([...queue, parseInt(newItem)])
      setNewItem('')
    }
  }

  const dequeue = () => {
    if (queue.length > 0) {
      setQueue(queue.slice(1))
    }
  }

  return (
    <div>
      <div className="mb-4">
        <input
          type="number"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="border rounded px-2 py-1 mr-2"
          placeholder="Enter a number"
        />
        <button onClick={enqueue} className="btn-primary mr-2">Enqueue</button>
        <button onClick={dequeue} className="btn-secondary">Dequeue</button>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto pb-4">
        {queue.map((item, index) => (
          <motion.div
            key={index}
            className="bg-card text-card-foreground p-4 rounded-lg shadow-md flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {item}
          </motion.div>
        ))}
      </div>
    </div>
  )
}


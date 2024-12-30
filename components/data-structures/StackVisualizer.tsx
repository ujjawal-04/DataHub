'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function StackVisualizer() {
  const [stack, setStack] = useState<number[]>([])
  const [newItem, setNewItem] = useState('')

  const push = () => {
    if (newItem.trim() !== '') {
      setStack([parseInt(newItem), ...stack])
      setNewItem('')
    }
  }

  const pop = () => {
    if (stack.length > 0) {
      setStack(stack.slice(1))
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
        <button onClick={push} className="btn-primary mr-2">Push</button>
        <button onClick={pop} className="btn-secondary">Pop</button>
      </div>
      <div className="flex flex-col-reverse items-center gap-2">
        {stack.map((item, index) => (
          <motion.div
            key={index}
            className="bg-card text-card-foreground p-4 rounded-lg shadow-md w-full text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {item}
          </motion.div>
        ))}
      </div>
    </div>
  )
}


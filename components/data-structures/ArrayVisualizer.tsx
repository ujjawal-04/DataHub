'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ArrayVisualizer() {
  const [array, setArray] = useState<number[]>([1, 2, 3, 4, 5])
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
        <button onClick={addItem} className="btn-primary">Add Item</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {array.map((item, index) => (
          <motion.div
            key={index}
            className="bg-card text-card-foreground p-4 rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <span className="mr-2">{item}</span>
            <button onClick={() => removeItem(index)} className="text-destructive">Remove</button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}


'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface HashItem {
  key: string
  value: string
}

export default function HashTableVisualizer() {
  const [table, setTable] = useState<HashItem[][]>(Array(10).fill([]))
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')

  const hash = (key: string) => {
    let total = 0
    for (let i = 0; i < key.length; i++) {
      total += key.charCodeAt(i)
    }
    return total % table.length
  }

  const set = () => {
    if (key && value) {
      const index = hash(key)
      const newTable = [...table]
      newTable[index] = [...newTable[index], { key, value }]
      setTable(newTable)
      setKey('')
      setValue('')
    }
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="border rounded px-2 py-1"
          placeholder="Key"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border rounded px-2 py-1"
          placeholder="Value"
        />
        <button onClick={set} className="btn-primary">
          Set
        </button>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {table.map((bucket, index) => (
          <motion.div
            key={index}
            className="bg-card text-card-foreground p-2 rounded-lg shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className="font-bold mb-1">Bucket {index}</div>
            {bucket.map((item, itemIndex) => (
              <div key={itemIndex} className="ml-4">
                {item.key}: {item.value}
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  )
}


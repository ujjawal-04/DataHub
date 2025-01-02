'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface HashItem {
  key: string
  value: string
}

export default function HashTableVisualizer() {
  const defaultTable: HashItem[][] = [
    [{ key: 'apple', value: 'fruit' }],
    [{ key: 'banana', value: 'fruit' }],
    [],
    [{ key: 'carrot', value: 'vegetable' }],
    [{ key: 'dog', value: 'animal' }],
    [],
    [],
    [{ key: 'elephant', value: 'animal' }],
    [{ key: 'fish', value: 'animal' }],
    [],
  ]
  
  const [table, setTable] = useState<HashItem[][]>(defaultTable)
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')
  const [updateKey, setUpdateKey] = useState('')
  const [updateValue, setUpdateValue] = useState('')

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
      const bucket = newTable[index]

      // Check if the key exists already in the bucket and update its value if so
      const existingItem = bucket.find(item => item.key === key)
      if (existingItem) {
        existingItem.value = value
      } else {
        newTable[index] = [...bucket, { key, value }]
      }
      setTable(newTable)
      setKey('')
      setValue('')
    }
  }

  const remove = (keyToRemove: string) => {
    const index = hash(keyToRemove)
    const newTable = [...table]
    // Remove the item from the bucket by filtering it out
    newTable[index] = newTable[index].filter(item => item.key !== keyToRemove)
    setTable(newTable)
  }

  const handleDoubleClick = (keyToRemove: string) => {
    remove(keyToRemove)
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="border rounded px-2 py-1 w-48"
          placeholder="Key"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border rounded px-2 py-1 w-48"
          placeholder="Value"
        />
        <button
          onClick={set}
          className="btn-primary w-24 bg-blue-600 text-white hover:bg-blue-700"
        >
          Set
        </button>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          value={updateKey}
          onChange={(e) => setUpdateKey(e.target.value)}
          className="border rounded px-2 py-1 w-48"
          placeholder="Update Key"
        />
        <input
          type="text"
          value={updateValue}
          onChange={(e) => setUpdateValue(e.target.value)}
          className="border rounded px-2 py-1 w-48"
          placeholder="New Value"
        />
        <button
          onClick={set}
          className="btn-primary w-24 bg-yellow-600 text-white hover:bg-yellow-700"
        >
          Update
        </button>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {table.map((bucket, index) => (
          <motion.div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg border"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className="font-bold text-gray-700 mb-1">Bucket {index}</div>
            {bucket.length === 0 ? (
              <div className="text-gray-400">No items</div>
            ) : (
              bucket.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="ml-4 mb-2 cursor-pointer"
                  onDoubleClick={() => handleDoubleClick(item.key)} // Double-click to remove
                >
                  <span className="text-gray-600">
                    {item.key}: {item.value}
                  </span>
                </div>
              ))
            )}
          </motion.div>
        ))}
      </div>
      <div className="mt-4 text-gray-600 text-sm">
        <strong>Note:</strong> Double-click on any key-value pair to remove it from the table.
      </div>
    </div>
  )
}

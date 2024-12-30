'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function BubbleSortVisualizer() {
  const [array, setArray] = useState<number[]>([])
  const [sorting, setSorting] = useState(false)

  useEffect(() => {
    resetArray()
  }, [])

  const resetArray = () => {
    const newArray = []
    for (let i = 0; i < 20; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 1)
    }
    setArray(newArray)
  }

  const bubbleSort = async () => {
    setSorting(true)
    const arr = [...array]
    const n = arr.length
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          setArray([...arr])
          await new Promise(resolve => setTimeout(resolve, 50))
        }
      }
    }
    setSorting(false)
  }

  return (
    <div>
      <div className="mb-4">
        <button onClick={resetArray} disabled={sorting} className="btn-secondary mr-2">
          Reset Array
        </button>
        <button onClick={bubbleSort} disabled={sorting} className="btn-primary">
          Sort
        </button>
      </div>
      <div className="flex items-end h-64">
        {array.map((value, idx) => (
          <motion.div
            key={idx}
            className="bg-primary"
            style={{
              height: `${value}%`,
              width: `${100 / array.length}%`,
              margin: '0 1px',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.02 }}
          />
        ))}
      </div>
    </div>
  )
}


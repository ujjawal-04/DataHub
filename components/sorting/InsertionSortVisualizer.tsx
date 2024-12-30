'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function InsertionSortVisualizer() {
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

  const insertionSort = async () => {
    setSorting(true)
    const arr = [...array]
    const n = arr.length
    for (let i = 1; i < n; i++) {
      let key = arr[i]
      let j = i - 1
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j]
        j = j - 1
        setArray([...arr])
        await new Promise(resolve => setTimeout(resolve, 50))
      }
      arr[j + 1] = key
      setArray([...arr])
      await new Promise(resolve => setTimeout(resolve, 50))
    }
    setSorting(false)
  }

  return (
    <div>
      <div className="mb-4">
        <button onClick={resetArray} disabled={sorting} className="btn-secondary mr-2">
          Reset Array
        </button>
        <button onClick={insertionSort} disabled={sorting} className="btn-primary">
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


'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function QuickSortVisualizer() {
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

  const quickSort = async (arr: number[], low: number, high: number) => {
    if (low < high) {
      const pi = await partition(arr, low, high)
      await quickSort(arr, low, pi - 1)
      await quickSort(arr, pi + 1, high)
    }
  }

  const partition = async (arr: number[], low: number, high: number) => {
    const pivot = arr[high]
    let i = low - 1

    for (let j = low; j <= high - 1; j++) {
      if (arr[j] < pivot) {
        i++
        [arr[i], arr[j]] = [arr[j], arr[i]]
        setArray([...arr])
        await new Promise(resolve => setTimeout(resolve, 50))
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
    setArray([...arr])
    await new Promise(resolve => setTimeout(resolve, 50))

    return i + 1
  }

  const startQuickSort = async () => {
    setSorting(true)
    await quickSort([...array], 0, array.length - 1)
    setSorting(false)
  }

  return (
    <div>
      <div className="mb-4">
        <button onClick={resetArray} disabled={sorting} className="btn-secondary mr-2">
          Reset Array
        </button>
        <button onClick={startQuickSort} disabled={sorting} className="btn-primary">
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


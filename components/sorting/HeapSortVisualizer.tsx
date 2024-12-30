'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function HeapSortVisualizer() {
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

  const heapSort = async (arr: number[]) => {
    const n = arr.length

    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i)
    }

    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
      // Move current root to end
      [arr[0], arr[i]] = [arr[i], arr[0]]
      setArray([...arr])
      await new Promise(resolve => setTimeout(resolve, 50))

      // call max heapify on the reduced heap
      await heapify(arr, i, 0)
    }
  }

  const heapify = async (arr: number[], n: number, i: number) => {
    let largest = i // Initialize largest as root
    const l = 2 * i + 1 // left = 2*i + 1
    const r = 2 * i + 2 // right = 2*i + 2

    // If left child is larger than root
    if (l < n && arr[l] > arr[largest]) {
      largest = l
    }

    // If right child is larger than largest so far
    if (r < n && arr[r] > arr[largest]) {
      largest = r
    }

    // If largest is not root
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]]
      setArray([...arr])
      await new Promise(resolve => setTimeout(resolve, 50))

      // Recursively heapify the affected sub-tree
      await heapify(arr, n, largest)
    }
  }

  const startHeapSort = async () => {
    setSorting(true)
    await heapSort([...array])
    setSorting(false)
  }

  return (
    <div>
      <div className="mb-4">
        <button onClick={resetArray} disabled={sorting} className="btn-secondary mr-2">
          Reset Array
        </button>
        <button onClick={startHeapSort} disabled={sorting} className="btn-primary">
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


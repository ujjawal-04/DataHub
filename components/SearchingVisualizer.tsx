'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const SearchingVisualizer = () => {
  const [array, setArray] = useState<number[]>([])
  const [target, setTarget] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [found, setFound] = useState(false)
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    resetArray()
  }, [])

  const resetArray = () => {
    const newArray = []
    for (let i = 0; i < 20; i++) {
      newArray.push(Math.floor(Math.random() * 100))
    }
    newArray.sort((a, b) => a - b)
    setArray(newArray)
    setTarget(newArray[Math.floor(Math.random() * newArray.length)])
    setCurrentIndex(-1)
    setFound(false)
  }

  const linearSearch = async () => {
    setSearching(true)
    setFound(false)
    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i)
      await new Promise(resolve => setTimeout(resolve, 500))
      if (array[i] === target) {
        setFound(true)
        setSearching(false)
        return
      }
    }
    setSearching(false)
  }

  const binarySearch = async () => {
    setSearching(true)
    setFound(false)
    let left = 0
    let right = array.length - 1

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      setCurrentIndex(mid)
      await new Promise(resolve => setTimeout(resolve, 500))

      if (array[mid] === target) {
        setFound(true)
        setSearching(false)
        return
      }

      if (array[mid] < target) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }

    setSearching(false)
  }

  const jumpSearch = async () => {
    setSearching(true)
    setFound(false)
    const n = array.length
    const step = Math.floor(Math.sqrt(n))
    let prev = 0

    while (array[Math.min(step, n) - 1] < target) {
      setCurrentIndex(Math.min(step, n) - 1)
      await new Promise(resolve => setTimeout(resolve, 500))
      prev = step
      step += Math.floor(Math.sqrt(n))
      if (prev >= n) {
        setSearching(false)
        return
      }
    }

    while (array[prev] < target) {
      setCurrentIndex(prev)
      await new Promise(resolve => setTimeout(resolve, 500))
      prev++
      if (prev === Math.min(step, n)) {
        setSearching(false)
        return
      }
    }

    if (array[prev] === target) {
      setCurrentIndex(prev)
      setFound(true)
    }

    setSearching(false)
  }

  return (
    <div className="tech-card">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Searching Visualizer</h2>
      <div className="mb-4 flex flex-wrap gap-4">
        <button
          onClick={resetArray}
          disabled={searching}
          className="btn-secondary"
        >
          Generate New Array
        </button>
        <button
          onClick={linearSearch}
          disabled={searching}
          className="btn-primary"
        >
          Linear Search
        </button>
        <button
          onClick={binarySearch}
          disabled={searching}
          className="btn-primary"
        >
          Binary Search
        </button>
        <button
          onClick={jumpSearch}
          disabled={searching}
          className="btn-primary"
        >
          Jump Search
        </button>
      </div>
      <p className="mb-4 text-muted-foreground">Target: {target}</p>
      <div className="algo-canvas flex items-center justify-center">
        {array.map((value, idx) => (
          <motion.div
            key={idx}
            className={`w-10 h-10 flex items-center justify-center m-1 rounded ${
              idx === currentIndex
                ? found
                  ? 'bg-green-500'
                  : 'bg-yellow-500'
                : 'bg-primary'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
          >
            {value}
          </motion.div>
        ))}
      </div>
      {found && <p className="mt-4 text-green-500">Target found!</p>}
      {!found && !searching && currentIndex !== -1 && <p className="mt-4 text-red-500">Target not found.</p>}
    </div>
  )
}

export default SearchingVisualizer


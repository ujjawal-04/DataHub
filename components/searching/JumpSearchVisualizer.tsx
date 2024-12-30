'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function JumpSearchVisualizer() {
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
      newArray.push(Math.floor(Math.random() * 100) + 1)
    }
    newArray.sort((a, b) => a - b)
    setArray(newArray)
    setTarget(newArray[Math.floor(Math.random() * newArray.length)])
    setCurrentIndex(-1)
    setFound(false)
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
    <div>
      <div className="mb-4">
        <button onClick={resetArray} disabled={searching} className="btn-secondary mr-2">
          Reset Array
        </button>
        <button onClick={jumpSearch} disabled={searching} className="btn-primary">
          Search
        </button>
      </div>
      <p className="mb-4">Target: {target}</p>
      <div className="flex items-center justify-center">
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


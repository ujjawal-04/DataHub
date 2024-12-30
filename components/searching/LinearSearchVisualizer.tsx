'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function LinearSearchVisualizer() {
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

  return (
    <div>
      <div className="mb-4">
        <button onClick={resetArray} disabled={searching} className="btn-secondary mr-2">
          Reset Array
        </button>
        <button onClick={linearSearch} disabled={searching} className="btn-primary">
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


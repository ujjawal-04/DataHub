'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function BinarySearchVisualizer() {
  const [array, setArray] = useState<number[]>([])
  const [target, setTarget] = useState(0)
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [mid, setMid] = useState(0)
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
    setLeft(0)
    setRight(newArray.length - 1)
    setMid(0)
    setFound(false)
  }

  const binarySearch = async () => {
    setSearching(true)
    setFound(false)
    let l = 0
    let r = array.length - 1

    while (l <= r) {
      const m = Math.floor((l + r) / 2)
      setLeft(l)
      setRight(r)
      setMid(m)
      await new Promise(resolve => setTimeout(resolve, 500))

      if (array[m] === target) {
        setFound(true)
        setSearching(false)
        return
      }

      if (array[m] < target) {
        l = m + 1
      } else {
        r = m - 1
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
        <button onClick={binarySearch} disabled={searching} className="btn-primary">
          Search
        </button>
      </div>
      <p className="mb-4">Target: {target}</p>
      <div className="flex items-center justify-center">
        {array.map((value, idx) => (
          <motion.div
            key={idx}
            className={`w-10 h-10 flex items-center justify-center m-1 rounded ${
              idx === mid
                ? found
                  ? 'bg-green-500'
                  : 'bg-yellow-500'
                : idx >= left && idx <= right
                ? 'bg-primary'
                : 'bg-gray-300'
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
      {!found && !searching && mid !== 0 && <p className="mt-4 text-red-500">Target not found.</p>}
    </div>
  )
}


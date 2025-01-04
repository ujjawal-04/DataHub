'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function BinarySearchVisualizer() {
  const [defaultArray, setDefaultArray] = useState<number[]>([])
  const [currentArray, setCurrentArray] = useState<number[]>([])
  const [target, setTarget] = useState<number>(0)
  const [left, setLeft] = useState<number>(0)
  const [right, setRight] = useState<number>(0)
  const [mid, setMid] = useState<number>(0)
  const [found, setFound] = useState<boolean>(false)
  const [searching, setSearching] = useState<boolean>(false)
  const [steps, setSteps] = useState<string[]>([])
  const [inputArray, setInputArray] = useState<string>('')
  const [inputTarget, setInputTarget] = useState<string>('')
  const [usingDefaultArray, setUsingDefaultArray] = useState<boolean>(true)

  useEffect(() => {
    resetDefaultArray()
  }, [])

  const resetDefaultArray = () => {
    const newArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1).sort((a, b) => a - b)
    const newTarget = newArray[Math.floor(Math.random() * newArray.length)]
    setDefaultArray(newArray)
    setCurrentArray(newArray)
    setTarget(newTarget)
    setLeft(0)
    setRight(newArray.length - 1)
    setMid(0)
    setFound(false)
    setSteps([])
    setInputArray(newArray.join(', '))
    setInputTarget(newTarget.toString())
    setUsingDefaultArray(true)
  }

  const binarySearch = async () => {
    setSearching(true)
    setFound(false)
    setSteps([])
    let l = 0
    let r = currentArray.length - 1

    setSteps(prev => [...prev, "Step 1: Initialize left pointer to 0 and right pointer to the last index of the array"])

    while (l <= r) {
      const m = Math.floor((l + r) / 2)
      setLeft(l)
      setRight(r)
      setMid(m)
      setSteps(prev => [...prev, `Step 2: Calculate mid index: (${l} + ${r}) / 2 = ${m}`])
      await new Promise(resolve => setTimeout(resolve, 500))

      setSteps(prev => [...prev, `Step 3: Compare mid element (${currentArray[m]}) with target (${target})`])

      if (currentArray[m] === target) {
        setSteps(prev => [...prev, `Step 4: Target found at index ${m}!`])
        setFound(true)
        setSearching(false)
        return
      }

      if (currentArray[m] < target) {
        setSteps(prev => [...prev, `Step 4: ${currentArray[m]} < ${target}, so search in the right half`])
        l = m + 1
      } else {
        setSteps(prev => [...prev, `Step 4: ${currentArray[m]} > ${target}, so search in the left half`])
        r = m - 1
      }

      setSteps(prev => [...prev, `Step 5: Update search range - Left: ${l}, Right: ${r}`])
    }

    setSteps(prev => [...prev, "Step 6: Target not found in the array"])
    setSearching(false)
  }

  const handleInputArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputArray(e.target.value)
    const newArray = e.target.value.split(',').map(val => parseInt(val.trim())).filter(val => !isNaN(val)).sort((a, b) => a - b)
    setCurrentArray(newArray)
    setUsingDefaultArray(false)
    setFound(false)
    setLeft(0)
    setRight(newArray.length - 1)
    setMid(0)
    setSteps([])
  }

  const handleInputTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTarget(e.target.value)
    setTarget(parseInt(e.target.value) || 0)
    setFound(false)
    setLeft(0)
    setRight(currentArray.length - 1)
    setMid(0)
    setSteps([])
  }

  const startSearchWithInput = () => {
    if (currentArray.length === 0) {
      alert('Please enter a valid array of numbers.')
      return
    }

    const parsedTarget = parseInt(inputTarget.trim())
    if (isNaN(parsedTarget)) {
      alert('Please enter a valid target number.')
      return
    }

    setTarget(parsedTarget)
    setFound(false)
    setLeft(0)
    setRight(currentArray.length - 1)
    setMid(0)
    binarySearch()
  }

  const switchToDefaultArray = () => {
    setCurrentArray(defaultArray)
    setUsingDefaultArray(true)
    setLeft(0)
    setRight(defaultArray.length - 1)
    setMid(0)
    setFound(false)
    setInputArray(defaultArray.join(', '))
    setTarget(parseInt(inputTarget) || 0)
    setSteps([])
  }

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <div className="mb-6 flex flex-wrap justify-center gap-2 sm:gap-4">
        <button
          onClick={resetDefaultArray}
          disabled={searching}
          className="bg-blue-500 text-white py-2 px-4 sm:px-6 rounded-md shadow-lg hover:bg-blue-600 disabled:opacity-50 transition-colors w-full sm:w-auto text-sm sm:text-base"
        >
          Reset Default Array
        </button>
        <button
          onClick={binarySearch}
          disabled={searching}
          className="bg-green-500 text-white py-2 px-4 sm:px-6 rounded-md shadow-lg hover:bg-green-600 disabled:opacity-50 transition-colors w-full sm:w-auto text-sm sm:text-base"
        >
          Start Search
        </button>
        <button
          onClick={switchToDefaultArray}
          disabled={searching || usingDefaultArray}
          className="bg-yellow-500 text-white py-2 px-4 sm:px-6 rounded-md shadow-lg hover:bg-yellow-600 disabled:opacity-50 transition-colors w-full sm:w-auto text-sm sm:text-base"
        >
          Use Default Array
        </button>
      </div>

      <div className="mb-4">
        <p className="text-center text-lg sm:text-xl font-semibold mb-2">Enter Custom Array and Target</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Enter sorted array (comma-separated)"
            value={inputArray}
            onChange={handleInputArrayChange}
            className="p-2 border rounded-md flex-grow text-sm sm:text-base"
            aria-label="Enter array"
          />
          <input
            type="number"
            placeholder="Enter target"
            value={inputTarget}
            onChange={handleInputTargetChange}
            className="p-2 border rounded-md w-full sm:w-24 text-sm sm:text-base"
            aria-label="Enter target"
          />
          <button
            onClick={startSearchWithInput}
            className="bg-purple-500 text-white py-2 px-4 sm:px-6 rounded-md shadow-lg hover:bg-purple-600 transition-colors w-full sm:w-auto text-sm sm:text-base"
          >
            Search Custom
          </button>
        </div>
      </div>

      <p className="mb-2 text-center text-lg sm:text-xl font-semibold">Target: {target}</p>
      <p className="mb-4 text-center text-base sm:text-lg font-semibold">
        {usingDefaultArray ? "Using Default Array" : "Using Custom Array"}
      </p>

      <div className="flex items-center justify-center mb-4 flex-wrap">
        {currentArray.map((value, idx) => (
          <motion.div
            key={idx}
            className={`w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center m-1 rounded-md text-white font-bold text-xs sm:text-base ${
              idx === mid
                ? found
                  ? 'bg-green-500' // Mid element when target is found
                  : 'bg-yellow-500' // Current mid element
                : idx >= left && idx <= right
                ? 'bg-blue-500' // Elements in the current search range
                : 'bg-gray-300' // Other elements outside the search range
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
          >
            {value}
          </motion.div>
        ))}
      </div>

      <div className="mt-4 text-center text-lg sm:text-xl font-semibold mb-6">
        {found && <p className="text-green-500">Target found!</p>}
        {!found && !searching && mid !== 0 && <p className="text-red-500">Target not found.</p>}
        {searching && <p className="text-blue-500">Searching...</p>}
      </div>

      <div className="border rounded-md p-4 bg-gray-50">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Search Steps</h2>
        <ul className="list-disc list-inside text-sm sm:text-base">
          {steps.map((step, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-2"
            >
              {step}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  )
}


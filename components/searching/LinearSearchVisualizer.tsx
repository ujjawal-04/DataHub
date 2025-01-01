'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function LinearSearchVisualizer() {
  const [defaultArray, setDefaultArray] = useState<number[]>([])
  const [currentArray, setCurrentArray] = useState<number[]>([])
  const [target, setTarget] = useState<number>(0)
  const [currentIndex, setCurrentIndex] = useState<number>(-1)
  const [found, setFound] = useState<boolean>(false)
  const [searching, setSearching] = useState<boolean>(false)
  const [inputArray, setInputArray] = useState<string>('')
  const [inputTarget, setInputTarget] = useState<string>('')
  const [usingDefaultArray, setUsingDefaultArray] = useState<boolean>(true)
  const [steps, setSteps] = useState<string[]>([])

  useEffect(() => {
    resetDefaultArray()
  }, [])

  const resetDefaultArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1)
    const newTarget = newArray[Math.floor(Math.random() * newArray.length)]
    setDefaultArray(newArray)
    setCurrentArray(newArray)
    setTarget(newTarget)
    setCurrentIndex(-1)
    setFound(false)
    setInputTarget(newTarget.toString())
    setUsingDefaultArray(true)
    setInputArray(newArray.join(', '))
    setSteps([])
  }

  const linearSearchAlgorithm = async (searchArray: number[], searchTarget: number) => {
    setSearching(true)
    setFound(false)
    setCurrentIndex(-1)
    setSteps([])

    await new Promise(resolve => setTimeout(resolve, 500))

    setSteps(prev => [...prev, "Step 1: Start at the beginning of the array"])

    for (let i = 0; i < searchArray.length; i++) {
      setCurrentIndex(i)
      setSteps(prev => [...prev, `Step 2: Check element at index ${i}`])
      
      await new Promise(resolve => setTimeout(resolve, 500))

      setSteps(prev => [...prev, `Step 3: Compare ${searchArray[i]} with target ${searchTarget}`])

      if (searchArray[i] === searchTarget) {
        setSteps(prev => [...prev, `Step 4: ${searchArray[i]} matches the target!`])
        setFound(true)
        setSearching(false)
        return i
      }

      setSteps(prev => [...prev, `Step 4: ${searchArray[i]} does not match the target. Move to the next element.`])
    }

    setSteps(prev => [...prev, "Step 5: Target not found in the array"])
    setSearching(false)
    return -1
  }

  const linearSearch = async () => {
    setFound(false)
    setCurrentIndex(-1)
    setSearching(true)

    const resultIndex = await linearSearchAlgorithm(currentArray, target)

    if (resultIndex !== -1) {
      setFound(true)
      setCurrentIndex(resultIndex)
    } else {
      setFound(false)
    }

    setSearching(false)
  }

  const handleInputArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputArray(e.target.value)
    const newArray = e.target.value.split(',').map(val => parseInt(val.trim())).filter(val => !isNaN(val))
    setCurrentArray(newArray)
    setUsingDefaultArray(false)
    setFound(false)
    setCurrentIndex(-1)
    setSteps([])
  }

  const handleInputTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTarget(e.target.value)
    setTarget(parseInt(e.target.value) || 0)
    setFound(false)
    setCurrentIndex(-1)
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
    setCurrentIndex(-1)
    linearSearch()
  }

  const switchToDefaultArray = () => {
    setCurrentArray(defaultArray)
    setUsingDefaultArray(true)
    setCurrentIndex(-1)
    setFound(false)
    setInputArray(defaultArray.join(', '))
    setTarget(parseInt(inputTarget) || 0)
    setSteps([])
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Linear Search Visualizer</h1>
      <div className="mb-6 flex justify-center space-x-4">
        <button 
          onClick={resetDefaultArray} 
          disabled={searching} 
          className="bg-blue-500 text-white py-2 px-6 rounded-md shadow-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
        >
          Reset Default Array
        </button>
        <button 
          onClick={linearSearch} 
          disabled={searching} 
          className="bg-green-500 text-white py-2 px-6 rounded-md shadow-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
        >
          Start Search
        </button>
        <button 
          onClick={switchToDefaultArray} 
          disabled={searching || usingDefaultArray} 
          className="bg-yellow-500 text-white py-2 px-6 rounded-md shadow-lg hover:bg-yellow-600 disabled:opacity-50 transition-colors"
        >
          Use Default Array
        </button>
      </div>

      <div className="mb-4">
        <p className="text-center text-xl font-semibold mb-2">Enter Custom Array and Target</p>
        <div className="flex justify-center space-x-4">
          <input
            type="text"
            placeholder="Enter array (comma-separated)"
            value={inputArray}
            onChange={handleInputArrayChange}
            className="p-2 border rounded-md flex-grow"
            aria-label="Enter array"
          />
          <input
            type="number"
            placeholder="Enter target"
            value={inputTarget}
            onChange={handleInputTargetChange}
            className="p-2 border rounded-md w-24"
            aria-label="Enter target"
          />
          <button
            onClick={startSearchWithInput}
            className="bg-purple-500 text-white py-2 px-6 rounded-md shadow-lg hover:bg-purple-600 transition-colors"
          >
            Search Custom
          </button>
        </div>
      </div>

      <p className="mb-4 text-center text-xl font-semibold">Target: {target}</p>
      <p className="mb-4 text-center text-lg font-semibold">
        {usingDefaultArray ? "Using Default Array" : "Using Custom Array"}
      </p>

      <div className="flex items-center justify-center flex-wrap mb-6">
        {currentArray.map((value, idx) => (
          <motion.div
            key={idx}
            className={`w-12 h-12 flex items-center justify-center m-1 rounded-md text-white font-bold ${
              idx === currentIndex
                ? found
                  ? 'bg-green-500' // Highlight target in green when found
                  : 'bg-yellow-500' // Highlight current element being checked in yellow
                : 'bg-blue-500'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
          >
            {value}
          </motion.div>
        ))}
      </div>

      <div className="mt-4 text-center text-xl font-semibold mb-6">
        {found && <p className="text-green-500">Target found!</p>}
        {!found && !searching && currentIndex !== -1 && <p className="text-red-500">Target not found.</p>}
        {searching && <p className="text-blue-500">Searching...</p>}
      </div>

      <div className="border rounded-md p-4 bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Search Steps</h2>
        <ul className="list-disc list-inside">
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


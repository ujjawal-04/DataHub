'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function InsertionSortVisualizer() {
  const [array, setArray] = useState<number[]>([])
  const [sorting, setSorting] = useState(false)
  const [arraySize, setArraySize] = useState(20)
  const [steps, setSteps] = useState<string[]>([]) // To store the array state after each step for visualization
  const [inputValues, setInputValues] = useState('') // To allow user input for custom array

  // Reset array when size changes or user input changes
  useEffect(() => {
    resetArray()
  }, [arraySize])

  // Reset array with random values
  const resetArray = () => {
    const newArray = []
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 1)
    }
    setArray(newArray)
    setSteps([]) // Reset steps when array is reset
    setInputValues('') // Clear user input when resetting
  }

  // Function to handle user input and set the array
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues(e.target.value)
  }

  const handleSubmitInput = () => {
    const inputArray = inputValues.split(',').map((str) => {
      const num = parseInt(str.trim())
      return isNaN(num) ? 0 : num // Set 0 if the input is not a valid number
    })
    setArray(inputArray)
    setSteps([]) // Clear the steps when setting a custom array
  }

  // Insertion Sort Algorithm
  const insertionSort = async () => {
    setSorting(true)
    const arr = [...array]
    const n = arr.length
    let currentSteps: string[] = []

    for (let i = 1; i < n; i++) {
      let key = arr[i]
      let j = i - 1

      // Move elements of arr[0..i-1] that are greater than key to one position ahead of their current position
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j] // Shift the element to the right
        j = j - 1
      }
      arr[j + 1] = key // Insert the key into the correct position
      currentSteps.push(`Step ${currentSteps.length + 1}: ${arr.join(', ')}`) // Record the state after each insertion
      setArray([...arr]) // Update the displayed array
      setSteps([...currentSteps]) // Update steps array
      await new Promise(resolve => setTimeout(resolve, 200)) // Delay for visualization
    }

    setSorting(false) // Sorting finished
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <button
          onClick={resetArray}
          disabled={sorting}
          className="bg-blue-200 text-blue-800 hover:bg-blue-300 px-4 py-2 rounded-lg transition-all"
        >
          Reset Array
        </button>
        <button
          onClick={insertionSort}
          disabled={sorting}
          className="bg-green-600 text-white hover:bg-green-500 px-4 py-2 rounded-lg transition-all ml-2"
        >
          Sort with Insertion Sort
        </button>
      </div>

      {/* Input for custom array values */}
      <div className="flex mb-4">
        <div className="mr-4">
          <label className="text-blue-800">Enter Array (comma separated)</label>
          <input
            type="text"
            value={inputValues}
            onChange={handleInputChange}
            className="p-2 rounded-lg border-2 border-blue-300 w-full"
            placeholder="e.g., 34, 7, 23, 5"
          />
        </div>
        <button
          onClick={handleSubmitInput}
          className="bg-blue-500 text-white hover:bg-blue-400 px-4 py-2 rounded-lg mt-6"
        >
          Set Array
        </button>
      </div>

      {/* Show Sorting Steps in Boxes */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-blue-800">Sorting Steps</h2>
        <div className="bg-blue-100 p-4 rounded-lg mt-2">
          {steps.length === 0 ? (
            <p>No steps yet. Start sorting!</p>
          ) : (
            steps.map((step, idx) => (
              <div key={idx} className="bg-white p-4 mb-2 rounded-lg shadow-md">
                <p className="text-sm text-blue-800">{step}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Show the final sorted array in a single line */}
      {steps.length > 0 && !sorting && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-blue-800">Sorted Array</h2>
          <div className="bg-white p-4 rounded-lg shadow-md mt-2 flex justify-center flex-wrap gap-2">
            {array.map((value, idx) => (
              <motion.div
                key={idx}
                className="bg-blue-600 text-white p-2 rounded-lg shadow-md"
                style={{ minWidth: '50px', textAlign: 'center' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                {value}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

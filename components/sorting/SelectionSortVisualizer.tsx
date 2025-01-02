'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function SelectionSortVisualizer() {
  const [array, setArray] = useState<number[]>([])
  const [sorting, setSorting] = useState(false)
  const [arraySize] = useState(20)
  const [steps, setSteps] = useState<string[]>([]) // To store the array state after each swap for visualization
  const [inputValues, setInputValues] = useState('')

  // Wrap the resetArray function in useCallback to prevent unnecessary recreation of the function
  const resetArray = useCallback(() => {
    const newArray = []
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 1)
    }
    setArray(newArray)
    setSteps([])
    setInputValues('')
  }, [arraySize]) // Dependency array ensures resetArray is recreated only when arraySize changes

  // Use useEffect to call resetArray when arraySize changes
  useEffect(() => {
    resetArray()
  }, [arraySize, resetArray]) // Trigger resetArray only when arraySize or resetArray changes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues(e.target.value)
  }

  const handleSubmitInput = () => {
    const inputArray = inputValues.split(',').map((str) => {
      const num = parseInt(str.trim())
      return isNaN(num) ? 0 : num
    })
    setArray(inputArray)
    setSteps([]) // Clear the steps when setting a custom array
  }

  const selectionSort = async () => {
    setSorting(true)
    const arr = [...array]
    const n = arr.length
    const currentSteps: string[] = []

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j
        }
      }
      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
        currentSteps.push(`Step ${currentSteps.length + 1}: ${arr.join(', ')}`)
        setSteps([...currentSteps])
        setArray([...arr])
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }
    setSorting(false)
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg">
      {/* Same structure for UI controls as in Bubble Sort */}
      <div className="mb-4">
        <button onClick={resetArray} disabled={sorting} className="bg-blue-200 text-blue-800 hover:bg-blue-300 px-4 py-2 rounded-lg transition-all">Reset Array</button>
        <button onClick={selectionSort} disabled={sorting} className="bg-green-600 text-white hover:bg-green-500 px-4 py-2 rounded-lg transition-all ml-2">Sort</button>
      </div>
      {/* Input for custom array values */}
      <div className="flex mb-4">
        <div className="mr-4">
          <label className="text-blue-800">Enter Array (comma separated)</label>
          <input type="text" value={inputValues} onChange={handleInputChange} className="p-2 rounded-lg border-2 border-blue-300 w-full" placeholder="e.g., 34, 7, 23, 5" />
        </div>
        <button onClick={handleSubmitInput} className="bg-blue-500 text-white hover:bg-blue-400 px-4 py-2 rounded-lg mt-6">Set Array</button>
      </div>
      
      {/* Sorting Steps */}
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

      {/* Final Sorted Array */}
      {steps.length > 0 && !sorting && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-blue-800">Sorted Array</h2>
          <div className="bg-white p-4 rounded-lg shadow-md mt-2 flex justify-center flex-wrap gap-2">
            {array.map((value, idx) => (
              <motion.div key={idx} className="bg-yellow-600 text-white p-2 rounded-lg shadow-md" style={{ minWidth: '50px', textAlign: 'center' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.05 }}>
                {value}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

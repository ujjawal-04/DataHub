'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const SortingVisualizer = () => {
  const [array, setArray] = useState<number[]>([])
  const [sorting, setSorting] = useState(false)

  useEffect(() => {
    resetArray()
  }, [])

  const resetArray = () => {
    const newArray = []
    for (let i = 0; i < 50; i++) {
      newArray.push(Math.floor(Math.random() * 500) + 5)
    }
    setArray(newArray)
  }

  const bubbleSort = async () => {
    setSorting(true)
    const arr = [...array]
    const n = arr.length
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          setArray([...arr])
          await new Promise(resolve => setTimeout(resolve, 10))
        }
      }
    }
    setSorting(false)
  }

  const selectionSort = async () => {
    setSorting(true)
    const arr = [...array]
    const n = arr.length
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j
        }
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
        setArray([...arr])
        await new Promise(resolve => setTimeout(resolve, 50))
      }
    }
    setSorting(false)
  }

  const insertionSort = async () => {
    setSorting(true)
    const arr = [...array]
    const n = arr.length
    for (let i = 1; i < n; i++) {
      let key = arr[i]
      let j = i - 1
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j]
        j = j - 1
        setArray([...arr])
        await new Promise(resolve => setTimeout(resolve, 50))
      }
      arr[j + 1] = key
      setArray([...arr])
      await new Promise(resolve => setTimeout(resolve, 50))
    }
    setSorting(false)
  }

  const quickSort = async () => {
    setSorting(true)
    const arr = [...array]
    await quickSortHelper(arr, 0, arr.length - 1)
    setSorting(false)
  }

  const quickSortHelper = async (arr: number[], low: number, high: number) => {
    if (low < high) {
      const pi = await partition(arr, low, high)
      await quickSortHelper(arr, low, pi - 1)
      await quickSortHelper(arr, pi + 1, high)
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

  const mergeSort = async () => {
    setSorting(true)
    const arr = [...array]
    await mergeSortHelper(arr, 0, arr.length - 1)
    setSorting(false)
  }

  const mergeSortHelper = async (arr: number[], left: number, right: number) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2)
      await mergeSortHelper(arr, left, mid)
      await mergeSortHelper(arr, mid + 1, right)
      await merge(arr, left, mid, right)
    }
  }

  const merge = async (arr: number[], left: number, mid: number, right: number) => {
    const n1 = mid - left + 1
    const n2 = right - mid
    const L = new Array(n1)
    const R = new Array(n2)

    for (let i = 0; i < n1; i++) L[i] = arr[left + i]
    for (let j = 0; j < n2; j++) R[j] = arr[mid + 1 + j]

    let i = 0, j = 0, k = left

    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i]
        i++
      } else {
        arr[k] = R[j]
        j++
      }
      k++
      setArray([...arr])
      await new Promise(resolve => setTimeout(resolve, 50))
    }

    while (i < n1) {
      arr[k] = L[i]
      i++
      k++
      setArray([...arr])
      await new Promise(resolve => setTimeout(resolve, 50))
    }

    while (j < n2) {
      arr[k] = R[j]
      j++
      k++
      setArray([...arr])
      await new Promise(resolve => setTimeout(resolve, 50))
    }
  }

  return (
    <div className="tech-card">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Sorting Visualizer</h2>
      <div className="mb-4 flex flex-wrap gap-4">
        <button
          onClick={resetArray}
          disabled={sorting}
          className="btn-secondary"
        >
          Generate New Array
        </button>
        <button
          onClick={bubbleSort}
          disabled={sorting}
          className="btn-primary"
        >
          Bubble Sort
        </button>
        <button
          onClick={selectionSort}
          disabled={sorting}
          className="btn-primary"
        >
          Selection Sort
        </button>
        <button
          onClick={insertionSort}
          disabled={sorting}
          className="btn-primary"
        >
          Insertion Sort
        </button>
        <button
          onClick={quickSort}
          disabled={sorting}
          className="btn-primary"
        >
          Quick Sort
        </button>
        <button
          onClick={mergeSort}
          disabled={sorting}
          className="btn-primary"
        >
          Merge Sort
        </button>
      </div>
      <div className="algo-canvas flex items-end">
        {array.map((value, idx) => (
          <motion.div
            key={idx}
            className="bg-primary"
            style={{
              height: `${value / 5}%`,
              width: `${100 / array.length}%`,
              margin: '0 1px',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.01 }}
          />
        ))}
      </div>
    </div>
  )
}

export default SortingVisualizer


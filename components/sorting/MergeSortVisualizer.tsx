'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function MergeSortVisualizer() {
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

  const mergeSort = async (arr: number[], start: number, end: number) => {
    if (start < end) {
      const mid = Math.floor((start + end) / 2)
      await mergeSort(arr, start, mid)
      await mergeSort(arr, mid + 1, end)
      await merge(arr, start, mid, end)
    }
  }

  const merge = async (arr: number[], start: number, mid: number, end: number) => {
    const leftArr = arr.slice(start, mid + 1)
    const rightArr = arr.slice(mid + 1, end + 1)
    let i = 0, j = 0, k = start

    while (i < leftArr.length && j < rightArr.length)while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i]
        i++
      } else {
        arr[k] = rightArr[j]
        j++
      }
      k++
      setArray([...arr])
      await new Promise(resolve => setTimeout(resolve, 50))
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i]
      i++
      k++
      setArray([...arr])
      await new Promise(resolve => setTimeout(resolve, 50))
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j]
      j++
      k++
      setArray([...arr])
      await new Promise(resolve => setTimeout(resolve, 50))
    }
  }

  const startMergeSort = async () => {
    setSorting(true)
    await mergeSort([...array], 0, array.length - 1)
    setSorting(false)
  }

  return (
    <div>
      <div className="mb-4">
        <button onClick={resetArray} disabled={sorting} className="btn-secondary mr-2">
          Reset Array
        </button>
        <button onClick={startMergeSort} disabled={sorting} className="btn-primary">
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


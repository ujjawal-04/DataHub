'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Activity {
  id: number
  start: number
  finish: number
}

interface Item {
  id: number
  weight: number
  value: number
}

interface HuffmanNode {
  char: string
  freq: number
  left?: HuffmanNode
  right?: HuffmanNode
  code?: string
}

const GreedyAlgorithmVisualizer = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [selectedItems, setSelectedItems] = useState<Item[]>([])
  const [capacity, setCapacity] = useState(50)
  const [huffmanInput, setHuffmanInput] = useState('abcdefgh')
  const [huffmanTree, setHuffmanTree] = useState<HuffmanNode | null>(null)

  useEffect(() => {
    // Initialize with some example activities and items
    setActivities([
      { id: 1, start: 1, finish: 4 },
      { id: 2, start: 3, finish: 5 },
      { id: 3, start: 0, finish: 6 },
      { id: 4, start: 5, finish: 7 },
      { id: 5, start: 3, finish: 9 },
      { id: 6, start: 5, finish: 9 },
      { id: 7, start: 6, finish: 10 },
      { id: 8, start: 8, finish: 11 },
      { id: 9, start: 8, finish: 12 },
      { id: 10, start: 2, finish: 14 },
    ])

    setItems([
      { id: 1, weight: 10, value: 60 },
      { id: 2, weight: 20, value: 100 },
      { id: 3, weight: 30, value: 120 },
      { id: 4, weight: 15, value: 80 },
      { id: 5, weight: 25, value: 110 },
    ])
  }, [])

  useEffect(() => {
    buildHuffmanTree()
  }, [huffmanInput])

  const activitySelection = () => {
    const sortedActivities = [...activities].sort((a, b) => a.finish - b.finish)
    const selected: Activity[] = []

    if (sortedActivities.length > 0) {
      selected.push(sortedActivities[0])
      let lastFinish = sortedActivities[0].finish

      for (let i = 1; i < sortedActivities.length; i++) {
        if (sortedActivities[i].start >= lastFinish) {
          selected.push(sortedActivities[i])
          lastFinish = sortedActivities[i].finish
        }
      }
    }

    setSelectedActivities(selected)
  }

  const fractionalKnapsack = () => {
    const sortedItems = [...items].sort((a, b) => b.value / b.weight - a.value / a.weight)
    let currentWeight = 0
    const selected: Item[] = []

    for (const item of sortedItems) {
      if (currentWeight + item.weight <= capacity) {
        selected.push({ ...item, fraction: 1 })
        currentWeight += item.weight
      } else {
        const remainingCapacity = capacity - currentWeight
        const fraction = remainingCapacity / item.weight
        selected.push({ ...item, fraction })
        break
      }
    }

    setSelectedItems(selected)
  }

  const buildHuffmanTree = () => {
    const charFreq: { [key: string]: number } = {}
    for (const char of huffmanInput) {
      charFreq[char] = (charFreq[char] || 0) + 1
    }

    const nodes: HuffmanNode[] = Object.entries(charFreq).map(([char, freq]) => ({ char, freq }))

    while (nodes.length > 1) {
      nodes.sort((a, b) => a.freq - b.freq)
      const left = nodes.shift()!
      const right = nodes.shift()!
      const parent: HuffmanNode = {
        char: left.char + right.char,
        freq: left.freq + right.freq,
        left,
        right,
      }
      nodes.push(parent)
    }

    const root = nodes[0]
    assignCodes(root)
    setHuffmanTree(root)
  }

  const assignCodes = (node: HuffmanNode, code: string = '') => {
    if (node.left || node.right) {
      if (node.left) assignCodes(node.left, code + '0')
      if (node.right) assignCodes(node.right, code + '1')
    } else {
      node.code = code
    }
  }

  const renderHuffmanTree = (node: HuffmanNode | null): JSX.Element | null => {
    if (!node) return null
    return (
      <div className="flex flex-col items-center">
        <div className="bg-primary text-white p-2 rounded-full">
          {node.char} ({node.freq})
          {node.code && <div>Code: {node.code}</div>}
        </div>
        {(node.left || node.right) && (
          <div className="flex mt-2">
            <div className="mr-2">{renderHuffmanTree(node.left)}</div>
            <div className="ml-2">{renderHuffmanTree(node.right)}</div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="tech-card">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Greedy Algorithm Visualizer</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Activity Selection Problem</h3>
        <button onClick={activitySelection} className="btn-primary mb-4">
          Select Activities
        </button>
        <div className="algo-canvas flex flex-wrap gap-2">
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              className={`p-2 rounded ${
                selectedActivities.includes(activity) ? 'bg-green-500' : 'bg-primary'
              } text-white`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {`(${activity.start}, ${activity.finish})`}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Fractional Knapsack Problem</h3>
        <div className="mb-4 flex flex-wrap gap-4">
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(parseInt(e.target.value))}
            className="border rounded px-2 py-1"
            placeholder="Enter knapsack capacity"
          />
          <button onClick={fractionalKnapsack} className="btn-primary">
            Solve Knapsack
          </button>
        </div>
        <div className="algo-canvas flex flex-wrap gap-2">
          {items.map((item) => (
            <motion.div
              key={item.id}
              className={`p-2 rounded ${
                selectedItems.find(i => i.id === item.id) ? 'bg-green-500' : 'bg-primary'
              } text-white`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {`W: ${item.weight}, V: ${item.value}`}
              {selectedItems.find(i => i.id === item.id)?.fraction && (
                <div>{`Fraction: ${selectedItems.find(i => i.id === item.id)!.fraction!.toFixed(2)}`}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Huffman Coding</h3>
        <div className="mb-4">
          <input
            type="text"
            value={huffmanInput}
            onChange={(e) => setHuffmanInput(e.target.value)}
            className="border rounded px-2 py-1"
            placeholder="Enter string for Huffman coding"
          />
        </div>
        <div className="algo-canvas overflow-x-auto">
          {renderHuffmanTree(huffmanTree)}
        </div>
      </div>
    </div>
  )
}

export default GreedyAlgorithmVisualizer


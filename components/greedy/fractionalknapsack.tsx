'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Item {
  id: number;
  weight: number;
  value: number;
  fraction?: number;  // Add the fraction field as an optional property
}

const FractionalKnapsack: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, weight: 10, value: 60 },
    { id: 2, weight: 20, value: 100 },
    { id: 3, weight: 30, value: 120 },
  ])
  const [newWeight, setNewWeight] = useState<number>(0)
  const [newValue, setNewValue] = useState<number>(0)
  const [capacity, setCapacity] = useState<number>(50)
  const [result, setResult] = useState<{ selectedItems: Item[], totalValue: number }>({ selectedItems: [], totalValue: 0 })

  const addItem = () => {
    if (newWeight > 0 && newValue > 0) {
      setItems([...items, { id: items.length + 1, weight: newWeight, value: newValue }])
      setNewWeight(0)
      setNewValue(0)
    }
  }

  const fractionalKnapsack = () => {
    const sortedItems = [...items].sort((a, b) => (b.value / b.weight) - (a.value / a.weight))
    let remainingCapacity = capacity
    let totalValue = 0
    const selectedItems: Item[] = []

    for (const item of sortedItems) {
      if (remainingCapacity >= item.weight) {
        selectedItems.push({ ...item, fraction: 1 }) // Add fraction for full item
        totalValue += item.value
        remainingCapacity -= item.weight
      } else if (remainingCapacity > 0) {
        const fraction = remainingCapacity / item.weight
        selectedItems.push({ ...item, fraction }) // Add fraction for partial item
        totalValue += item.value * fraction
        remainingCapacity = 0
      } else {
        break
      }
    }

    setResult({ selectedItems, totalValue })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 text-blue-800"
    >
       <motion.div 
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-xl font-semibold mb-2">Add New Item</h2>
        <div className="flex gap-4 mb-2">
          <div>
            <Label htmlFor="weight">Weight</Label>
            <Input
              id="weight"
              type="number"
              value={newWeight}
              onChange={(e) => setNewWeight(Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              type="number"
              value={newValue}
              onChange={(e) => setNewValue(Number(e.target.value))}
              min="0"
            />
          </div>
        </div>
        <Button onClick={addItem} className="bg-blue-600 hover:bg-blue-700 text-white">Add Item</Button>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <h2 className="text-xl font-semibold mb-2">Available Items</h2>
        <ul className="space-y-2">
          <AnimatePresence>
            {items.map((item) => (
              <motion.li
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
                className="bg-blue-100 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden"
              >
                <motion.div
                  className="absolute top-0 left-0 h-1 bg-blue-400"
                  style={{ width: `${(item.value / item.weight) * 20}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.value / item.weight) * 20}%` }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="flex justify-between items-center"
                >
                  <span className="font-semibold">Item {item.id}</span>
                  <span className="text-blue-600">Value/Weight: {(item.value / item.weight).toFixed(2)}</span>
                </motion.div>
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="mt-2 flex justify-between"
                >
                  <span>Weight: {item.weight}</span>
                  <span>Value: {item.value}</span>
                </motion.div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </motion.div>

      <motion.div 
        initial={{ x: 20 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-xl font-semibold mb-2">Knapsack Capacity</h2>
        <div className="flex gap-4 items-end">
          <div className="flex-grow">
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              id="capacity"
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              min="0"
            />
          </div>
          <Button onClick={fractionalKnapsack} className="bg-blue-600 hover:bg-blue-700 text-white">
            Solve Knapsack
          </Button>
        </div>
      </motion.div>

      {result.selectedItems.length > 0 && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <h2 className="text-xl font-semibold mb-2">Knapsack Solution</h2>
          <p className="mb-2">Total Value: {result.totalValue.toFixed(2)}</p>
          <ul className="space-y-2">
            <AnimatePresence>
              {result.selectedItems.map((item) => (
                <motion.li
                  key={item.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-blue-200 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden"
                >
                  <motion.div
                    className="absolute top-0 left-0 h-1 bg-blue-600"
                    style={{ width: `${(item.fraction || 0) * 100}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.fraction || 0) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="flex justify-between items-center"
                  >
                    <span className="font-semibold">Item {item.id}</span>
                    <span className="text-blue-700">Fraction: {(item.fraction || 0).toFixed(2)}</span>
                  </motion.div>
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="mt-2 flex justify-between"
                  >
                    <span>Weight: {item.weight}</span>
                    <span>Value: {item.value}</span>
                  </motion.div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </motion.div>
      )}

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-blue-50 p-4 rounded-lg"
      >
        <h2 className="text-xl font-semibold mb-2">How It Works</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Calculate the value-to-weight ratio for each item.</li>
          <li>Sort the items in descending order of their value-to-weight ratios.</li>
          <li>Initialize the knapsack with the given capacity.</li>
          <li>Iterate through the sorted items:</li>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>If the item fits entirely, add it to the knapsack.</li>
            <li>If it doesn&apos;t fit entirely, add a fraction of the item to fill the remaining capacity.</li>
            <li>Stop when the knapsack is full or all items have been considered.</li>
          </ul>
          <li>The result is the optimal solution that maximizes the total value in the knapsack.</li>
        </ol>
      </motion.div>
    </motion.div>
  )
}

export default FractionalKnapsack

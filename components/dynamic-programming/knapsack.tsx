'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import BackButton from '../BackButton'

interface Item {
  weight: number;
  value: number;
}

const Knapsack: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { weight: 10, value: 60 },
    { weight: 20, value: 100 },
    { weight: 30, value: 120 }
  ]);
  const [capacity, setCapacity] = useState<number>(50);
  const [dpTable, setDpTable] = useState<number[][]>([]);
  const [selectedItems, setSelectedItems] = useState<boolean[]>([]);
  const [maxValue, setMaxValue] = useState<number>(0);

  const addItem = () => {
    setItems([...items, { weight: 0, value: 0 }]);
  };

  const updateItem = (index: number, field: 'weight' | 'value', value: string) => {
    const newItems = [...items];
    newItems[index][field] = parseInt(value) || 0;
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const solveKnapsack = () => {
    const n = items.length;
    const dp: number[][] = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
      for (let w = 0; w <= capacity; w++) {
        if (items[i - 1].weight <= w) {
          dp[i][w] = Math.max(
            items[i - 1].value + dp[i - 1][w - items[i - 1].weight],
            dp[i - 1][w]
          );
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }

    setDpTable(dp);
    setMaxValue(dp[n][capacity]);

    // Backtrack to find selected items
    let w = capacity;
    const selected: boolean[] = new Array(n).fill(false);
    for (let i = n; i > 0 && w > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        selected[i - 1] = true;
        w -= items[i - 1].weight;
      }
    }
    setSelectedItems(selected);
  };

  useEffect(() => {
    solveKnapsack();
  }, [items, capacity]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 text-blue-800"
    >
    <BackButton/>
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-4"
      >
        0/1 Knapsack Problem
      </motion.h1>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <h2 className="text-xl font-semibold mb-2">Items</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Weight</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input
                    type="number"
                    value={item.weight}
                    onChange={(e) => updateItem(index, 'weight', e.target.value)}
                    min={0}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.value}
                    onChange={(e) => updateItem(index, 'value', e.target.value)}
                    min={0}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => removeItem(index)} variant="destructive">Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={addItem} className="mt-2 bg-blue-600 hover:bg-blue-700 text-white">Add Item</Button>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-6">
        <Label htmlFor="capacity">Knapsack Capacity</Label>
        <Input
          id="capacity"
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(parseInt(e.target.value) || 0)}
          min={0}
        />
      </motion.div>

      <motion.div variants={containerVariants} className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Dynamic Programming Table</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item / Weight</TableHead>
                {Array.from({ length: capacity + 1 }, (_, i) => (
                  <TableHead key={i}>{i}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {dpTable.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{i === 0 ? '0' : `${items[i-1].weight},${items[i-1].value}`}</TableCell>
                  {row.map((cell, j) => (
                    <TableCell 
                      key={j}
                      className={selectedItems[i-1] && j === capacity ? 'bg-green-200' : ''}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Result</h2>
        <p className="text-2xl font-mono bg-blue-100 p-4 rounded">
          Maximum Value: {maxValue}
        </p>
        <p className="mt-2">
          Selected Items: {selectedItems.map((selected, index) => selected ? `${items[index].weight}` : '').filter(Boolean).join(', ')}
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-blue-50 p-4 rounded-lg"
      >
        <h2 className="text-xl font-semibold mb-2">How 0/1 Knapsack Works</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Create a table with rows representing items and columns representing weights from 0 to the knapsack capacity.</li>
          <li>Initialize the first row and column with zeros.</li>
          <li>For each item i and weight w:</li>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>If the item's weight is less than or equal to w, choose the maximum of:</li>
            <ul className="list-disc list-inside ml-8 space-y-1">
              <li>The value of the item plus the value of the remaining capacity (i-1, w-weight[i])</li>
              <li>The value without including this item (i-1, w)</li>
            </ul>
            <li>If the item's weight is greater than w, copy the value from the previous row (i-1, w)</li>
          </ul>
          <li>The bottom-right cell contains the maximum value achievable.</li>
          <li>Backtrack through the table to determine which items were selected.</li>
        </ol>
        <p className="mt-4">
          The highlighted cells in the table show the optimal solution path.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default Knapsack


'use client'

import { JSX, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TreeNode {
  value: number
  left: TreeNode | null
  right: TreeNode | null
}

export default function TreeVisualizer() {
  const [root, setRoot] = useState<TreeNode | null>(null)
  const [newValue, setNewValue] = useState('')
  const [error, setError] = useState('')

  // Default values to initialize the tree with
  const defaultValues = [10, 20, 5, 15, 30, 25]

  // Insert a new node in the binary tree
  const insertNode = useCallback((value: number, node: TreeNode | null): TreeNode => {
    if (node === null) {
      return { value, left: null, right: null }
    }

    if (value < node.value) {
      node.left = insertNode(value, node.left)
    } else if (value > node.value) {
      node.right = insertNode(value, node.right)
    }

    return node
  }, [])

  // Add node to the tree
  const addNode = useCallback(() => {
    if (newValue.trim() !== '') {
      const value = parseInt(newValue)
      if (isNaN(value)) {
        setError('Please enter a valid number')
        return
      }
      setRoot((prevRoot) => {
        const newRoot = { ...prevRoot } as TreeNode
        return insertNode(value, newRoot)
      })
      setNewValue('')
      setError('')
    } else {
      setError('Please enter a value')
    }
  }, [newValue, insertNode])

  // Remove node from the tree
  const removeNode = useCallback((value: number, node: TreeNode | null): TreeNode | null => {
    if (!node) return null

    if (value < node.value) {
      node.left = removeNode(value, node.left)
    } else if (value > node.value) {
      node.right = removeNode(value, node.right)
    } else {
      // Node to be deleted is found
      if (!node.left) return node.right
      if (!node.right) return node.left

      // Node has two children
      let minNode = node.right
      while (minNode?.left) {
        minNode = minNode.left
      }

      if (minNode) {
        node.value = minNode.value
        node.right = removeNode(minNode.value, node.right)
      }
    }

    return node
  }, [])

  // Handle double-click to remove a node
  const handleDoubleClick = useCallback((value: number) => {
    setRoot((prevRoot) => {
      if (!prevRoot) return null
      const newRoot = { ...prevRoot }
      return removeNode(value, newRoot)
    })
  }, [removeNode])

  // Render the tree in a readable format
  const renderTree = useCallback((node: TreeNode | null, x: number = 0, y: number = 0, level: number = 0): JSX.Element | null => {
    if (!node) return null

    const horizontalSpacing = 80 / (level + 1)
    const verticalSpacing = 80

    return (
      <motion.g layout layoutId={`node-${node.value}`} transition={{ duration: 0.2 }} key={node.value}>
        {(node.left || node.right) && (
          <>
            {node.left && (
              <motion.line
                x1={x}
                y1={y}
                x2={x - horizontalSpacing}
                y2={y + verticalSpacing}
                stroke="#888"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
            {node.right && (
              <motion.line
                x1={x}
                y1={y}
                x2={x + horizontalSpacing}
                y2={y + verticalSpacing}
                stroke="#888"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </>
        )}
        <motion.circle
          cx={x}
          cy={y}
          r={20}
          fill="#E6F3FF"
          stroke="#3B82F6"
          strokeWidth={2}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onDoubleClick={() => handleDoubleClick(node.value)}
        />
        <motion.text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#1E40AF"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {node.value}
        </motion.text>
        {renderTree(node.left, x - horizontalSpacing, y + verticalSpacing, level + 1)}
        {renderTree(node.right, x + horizontalSpacing, y + verticalSpacing, level + 1)}
      </motion.g>
    )
  }, [handleDoubleClick])

  // Initialize the tree with default values
  useEffect(() => {
    let newRoot: TreeNode | null = null
    defaultValues.forEach((value) => {
      newRoot = insertNode(value, newRoot)
    })
    setRoot(newRoot)
  }, [insertNode])

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <input
          type="number"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="border border-blue-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-40"
          placeholder="Enter a number"
        />
        <button
          onClick={addNode}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Add Node
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <AnimatePresence mode="popLayout">
        <motion.div
          key="tree"
          className="overflow-x-auto pb-4"
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg width="100%" height="400" viewBox="-200 -50 400 400">
            {renderTree(root)}
          </svg>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 text-sm text-gray-600">
        <p><strong>Note:</strong> Double-click any node to remove it. Use "Add Node" to insert nodes into the tree.</p>
      </div>
    </div>
  )
}


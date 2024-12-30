'use client'

import { JSX, useState } from 'react'
import { motion } from 'framer-motion'

interface TreeNode {
  value: number
  left: TreeNode | null
  right: TreeNode | null
}

export default function TreeVisualizer() {
  const [root, setRoot] = useState<TreeNode | null>(null)
  const [newValue, setNewValue] = useState('')

  const insertNode = (value: number, node: TreeNode | null): TreeNode => {
    if (node === null) {
      return { value, left: null, right: null }
    }

    if (value < node.value) {
      node.left = insertNode(value, node.left)
    } else if (value > node.value) {
      node.right = insertNode(value, node.right)
    }

    return node
  }

  const addNode = () => {
    if (newValue.trim() !== '') {
      const value = parseInt(newValue)
      setRoot((prevRoot) => insertNode(value, prevRoot))
      setNewValue('')
    }
  }

  const renderTree = (node: TreeNode | null): JSX.Element | null => {
    if (!node) return null

    return (
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-card text-card-foreground p-2 rounded-full shadow-md mb-2">
          {node.value}
        </div>
        <div className="flex gap-4">
          {renderTree(node.left)}
          {renderTree(node.right)}
        </div>
      </motion.div>
    )
  }

  return (
    <div>
      <div className="mb-4">
        <input
          type="number"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="border rounded px-2 py-1 mr-2"
          placeholder="Enter a number"
        />
        <button onClick={addNode} className="btn-primary">Add Node</button>
      </div>
      <div className="overflow-x-auto pb-4">
        {renderTree(root)}
      </div>
    </div>
  )
}


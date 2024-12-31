'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Node {
  id: string
  value: number
  next: Node | null
}

export default function LinkedListVisualizer() {
  const [head, setHead] = useState<Node | null>(null)
  const [newValue, setNewValue] = useState('')
  const [error, setError] = useState('')

  // Generate a unique ID for each node
  const generateId = useCallback(() => {
    return Math.random().toString(36).substr(2, 9)
  }, [])

  // Initialize with default values on mount
  useEffect(() => {
    const defaultValues = [5, 10, 15] // Default values to show
    let initialHead: Node | null = null
    let currentNode: Node | null = null

    // Create linked list with default values
    defaultValues.forEach((value) => {
      const newNode: Node = { id: generateId(), value, next: null }
      if (!initialHead) {
        initialHead = newNode
        currentNode = newNode
      } else {
        if (currentNode) {
          currentNode.next = newNode
          currentNode = newNode
        }
      }
    })

    setHead(initialHead) // Set the initial linked list
  }, [generateId])

  const addNode = useCallback(() => {
    if (newValue.trim() !== '') {
      const value = parseInt(newValue)
      if (isNaN(value)) {
        setError('Please enter a valid number')
        return
      }
      const newNode: Node = { id: generateId(), value, next: null }
      setHead((prevHead) => {
        if (!prevHead) {
          return newNode
        }
        let current = prevHead
        while (current.next) {
          current = current.next
        }
        current.next = newNode
        return { ...prevHead }
      })
      setNewValue('') // Clear input field after adding
      setError('')
    } else {
      setError('Please enter a value')
    }
  }, [newValue, generateId])

  const removeNode = useCallback((id: string) => {
    setHead((prevHead) => {
      if (!prevHead) return null

      if (prevHead.id === id) {
        return prevHead.next
      }

      let current = prevHead
      while (current.next) {
        if (current.next.id === id) {
          current.next = current.next.next
          return { ...prevHead }
        }
        current = current.next
      }

      return prevHead
    })
  }, [])

  const clearList = useCallback(() => {
    setHead(null) // Clear the entire linked list
  }, [])

  const renderList = useCallback(() => {
    const nodes = []
    let current = head
    while (current) {
      nodes.push(current)
      current = current.next
    }
    return nodes
  }, [head])

  const handleDoubleClick = useCallback((id: string) => {
    removeNode(id)
  }, [removeNode])

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
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
        <button
          onClick={clearList}
          className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors duration-300"
        >
          Delete List
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <AnimatePresence initial={false}>
        <motion.div
          className="flex items-center gap-1 mb-6 flex-wrap justify-center"
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderList().map((node) => (
            <motion.div
              key={node.id}
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              layout
            >
              <motion.div
                className="bg-blue-100 text-blue-800 p-2 rounded-lg shadow-md flex items-center justify-between min-w-[70px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onDoubleClick={() => handleDoubleClick(node.id)}
              >
                <span className="text-lg font-semibold">{node.value}</span>
              </motion.div>
              {node.next && (
                <motion.div
                  className="mx-1 text-blue-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  →
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 text-center text-blue-600">
        Linked List Length: {renderList().length}
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <p><strong>Note:</strong> Double-click any node to remove it from the linked list.</p>
      </div>
    </div>
  )
}


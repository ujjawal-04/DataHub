'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Node {
  value: number
  next: Node | null
}

export default function LinkedListVisualizer() {
  const [head, setHead] = useState<Node | null>(null)
  const [newValue, setNewValue] = useState('')

  const addNode = () => {
    if (newValue.trim() !== '') {
      const newNode: Node = { value: parseInt(newValue), next: null }
      if (!head) {
        setHead(newNode)
      } else {
        let current = head
        while (current.next) {
          current = current.next
        }
        current.next = newNode
      }
      setNewValue('')
    }
  }

  const removeNode = (value: number) => {
    if (!head) return
    if (head.value === value) {
      setHead(head.next)
      return
    }
    let current = head
    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next
        return
      }
      current = current.next
    }
  }

  const renderList = () => {
    const nodes = []
    let current = head
    while (current) {
      nodes.push(current)
      current = current.next
    }
    return nodes
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
      <div className="flex flex-wrap items-center gap-2">
        {renderList().map((node, index) => (
          <motion.div
            key={index}
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-card text-card-foreground p-4 rounded-lg shadow-md">
              <span className="mr-2">{node.value}</span>
              <button onClick={() => removeNode(node.value)} className="text-destructive">Remove</button>
            </div>
            {node.next && <div className="mx-2">→</div>}
          </motion.div>
        ))}
      </div>
    </div>
  )
}


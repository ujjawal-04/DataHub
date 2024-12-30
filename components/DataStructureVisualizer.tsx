'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Node {
  value: number
  next?: Node
}

interface TreeNode {
  value: number
  left?: TreeNode
  right?: TreeNode
}

const DataStructureVisualizer = () => {
  const [array, setArray] = useState<number[]>([])
  const [stack, setStack] = useState<number[]>([])
  const [queue, setQueue] = useState<number[]>([])
  const [linkedList, setLinkedList] = useState<Node | null>(null)
  const [binaryTree, setBinaryTree] = useState<TreeNode | null>(null)
  const [input, setInput] = useState('')

  const addToArray = () => {
    if (input) {
      setArray([...array, parseInt(input)])
      setInput('')
    }
  }

  const removeFromArray = () => {
    if (array.length > 0) {
      setArray(array.slice(0, -1))
    }
  }

  const pushToStack = () => {
    if (input) {
      setStack([parseInt(input), ...stack])
      setInput('')
    }
  }

  const popFromStack = () => {
    if (stack.length > 0) {
      setStack(stack.slice(1))
    }
  }

  const enqueue = () => {
    if (input) {
      setQueue([...queue, parseInt(input)])
      setInput('')
    }
  }

  const dequeue = () => {
    if (queue.length > 0) {
      setQueue(queue.slice(1))
    }
  }

  const addToLinkedList = () => {
    if (input) {
      const newNode: Node = { value: parseInt(input) }
      if (!linkedList) {
        setLinkedList(newNode)
      } else {
        let current = linkedList
        while (current.next) {
          current = current.next
        }
        current.next = newNode
      }
      setInput('')
    }
  }

  const removeFromLinkedList = () => {
    if (linkedList) {
      setLinkedList(linkedList.next || null)
    }
  }

  const addToBinaryTree = () => {
    if (input) {
      const newNode: TreeNode = { value: parseInt(input) }
      if (!binaryTree) {
        setBinaryTree(newNode)
      } else {
        const insert = (node: TreeNode, value: number) => {
          if (value < node.value) {
            if (node.left) {
              insert(node.left, value)
            } else {
              node.left = { value }
            }
          } else {
            if (node.right) {
              insert(node.right, value)
            } else {
              node.right = { value }
            }
          }
        }
        insert(binaryTree, newNode.value)
      }
      setInput('')
    }
  }

  const renderTree = (node: TreeNode | null): JSX.Element | null => {
    if (!node) return null
    return (
      <div className="flex flex-col items-center">
        <div className="bg-primary text-white p-2 rounded-full">{node.value}</div>
        <div className="flex mt-2">
          <div className="mr-2">{renderTree(node.left)}</div>
          <div className="ml-2">{renderTree(node.right)}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="tech-card">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Data Structure Visualizer</h2>
      <div className="mb-4">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border rounded px-2 py-1 mr-2"
          placeholder="Enter a number"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">Array</h3>
          <button onClick={addToArray} className="btn-primary mr-2">Add</button>
          <button onClick={removeFromArray} className="btn-secondary">Remove</button>
          <div className="mt-2 bg-gray-100 p-2 rounded flex flex-wrap">
            {array.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="bg-primary text-white p-2 m-1 rounded"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Stack</h3>
          <button onClick={pushToStack} className="btn-primary mr-2">Push</button>
          <button onClick={popFromStack} className="btn-secondary">Pop</button>
          <div className="mt-2 bg-gray-100 p-2 rounded">
            {stack.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-primary text-white p-2 mb-1 rounded"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Queue</h3>
          <button onClick={enqueue} className="btn-primary mr-2">Enqueue</button>
          <button onClick={dequeue} className="btn-secondary">Dequeue</button>
          <div className="mt-2 bg-gray-100 p-2 rounded flex">
            {queue.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-primary text-white p-2 mr-1 rounded"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Linked List</h3>
          <button onClick={addToLinkedList} className="btn-primary mr-2">Add</button>
          <button onClick={removeFromLinkedList} className="btn-secondary">Remove</button>
          <div className="mt-2 bg-gray-100 p-2 rounded flex flex-wrap">
            {(() => {
              const elements = []
              let current = linkedList
              while (current) {
                elements.push(
                  <motion.div
                    key={current.value}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="bg-primary text-white p-2 mr-1 mb-1 rounded flex items-center"
                  >
                    {current.value}
                    {current.next && <span className="ml-1">→</span>}
                  </motion.div>
                )
                current = current.next
              }
              return elements
            })()}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Binary Tree</h3>
          <button onClick={addToBinaryTree} className="btn-primary mr-2">Add</button>
          <div className="mt-2 bg-gray-100 p-2 rounded overflow-auto" style={{ maxHeight: '300px' }}>
            {renderTree(binaryTree)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataStructureVisualizer


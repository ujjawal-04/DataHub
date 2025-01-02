'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

type Node = {
  id: number
  x: number
  y: number
}

type Edge = {
  from: number
  to: number
}

type Graph = {
  nodes: Node[]
  edges: Edge[]
}

type Step = {
  description: string
  visited: number[]
  queue: number[]
  current: number | null
}

export default function BFSVisualizer() {
  const [graph, setGraph] = useState<Graph>({
    nodes: [
      { id: 0, x: 50, y: 50 },
      { id: 1, x: 200, y: 50 },
      { id: 2, x: 350, y: 50 },
      { id: 3, x: 50, y: 200 },
      { id: 4, x: 200, y: 200 },
      { id: 5, x: 350, y: 200 },
    ],
    edges: [
      { from: 0, to: 1 },
      { from: 0, to: 3 },
      { from: 1, to: 2 },
      { from: 1, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 4 },
      { from: 4, to: 5 },
    ],
  })

  const [startNode, setStartNode] = useState<number>(0)
  const [steps, setSteps] = useState<Step[]>([])
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  
  // State for user input
  const [newNodeId, setNewNodeId] = useState<number>(6)
  const [newEdgeFrom, setNewEdgeFrom] = useState<number | string>('')
  const [newEdgeTo, setNewEdgeTo] = useState<number | string>('')

  const [hasMounted, setHasMounted] = useState<boolean>(false) // State to track mounting

  useEffect(() => {
    setHasMounted(true) // Set to true when the component is mounted on the client side
  }, [])

  // Reset graph visualization
  const resetVisualization = () => {
    setSteps([])
    setCurrentStep(0)
    setIsRunning(false)
  }

  // Add a new node to the graph
  const addNode = () => {
    const newNode = { id: newNodeId, x: Math.random() * 350, y: Math.random() * 200 }
    setGraph((prevGraph) => ({
      ...prevGraph,
      nodes: [...prevGraph.nodes, newNode],
    }))
    setNewNodeId(newNodeId + 1) // Increment for next node id
  }

  // Add a new edge to the graph
  const addEdge = () => {
    if (newEdgeFrom && newEdgeTo && newEdgeFrom !== newEdgeTo) {
      setGraph((prevGraph) => ({
        ...prevGraph,
        edges: [...prevGraph.edges, { from: Number(newEdgeFrom), to: Number(newEdgeTo) }],
      }))
    }
    setNewEdgeFrom('')
    setNewEdgeTo('')
  }

  // Select start node for BFS
  const handleStartNodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartNode(parseInt(e.target.value))
    resetVisualization() // Reset visualization when starting node changes
  }

  useEffect(() => {
    resetVisualization()
  }, [startNode])

  // Run BFS algorithm
  const runBFS = () => {
    setIsRunning(true)
    const newSteps: Step[] = []
    const visited: number[] = []
    const queue: number[] = [startNode]

    newSteps.push({
      description: `Start BFS from node ${startNode}`,
      visited: [],
      queue: [startNode],
      current: null,
    })

    while (queue.length > 0) {
      const current = queue.shift()!
      if (!visited.includes(current)) {
        visited.push(current)
        newSteps.push({
          description: `Visit node ${current}`,
          visited: [...visited],
          queue: [...queue],
          current: current,
        })

        const neighbors = graph.edges
          .filter((e) => e.from === current && !visited.includes(e.to))
          .map((e) => e.to)

        queue.push(...neighbors)

        if (neighbors.length > 0) {
          newSteps.push({
            description: `Add neighbors ${neighbors.join(', ')} to the queue`,
            visited: [...visited],
            queue: [...queue],
            current: null,
          })
        }
      }
    }

    setSteps(newSteps)
  }

  // Step forward in BFS process
  const stepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsRunning(false)
    }
  }

  // Step backward in BFS process
  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Auto-play BFS steps
  const autoPlay = async () => {
    for (let i = currentStep; i < steps.length; i++) {
      if (!isRunning) break
      setCurrentStep(i)
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
    setIsRunning(false)
  }

  useEffect(() => {
    if (isRunning) {
      autoPlay()
    }
  }, [isRunning])

  // Prevent rendering random values on the server-side
  if (!hasMounted) {
    return null
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      
      {/* User Inputs for Graph (Nodes and Edges) */}
      <div className="mb-6 flex flex-col items-center space-y-4">
        <div className="flex space-x-4">
          <button
            onClick={addNode}
            className="bg-blue-500 text-white py-2 px-6 rounded-md shadow-lg hover:bg-blue-600 transition-colors"
          >
            Add Node
          </button>
          <button
            onClick={addEdge}
            className="bg-green-500 text-white py-2 px-6 rounded-md shadow-lg hover:bg-green-600 transition-colors"
          >
            Add Edge
          </button>
        </div>

        <div className="flex space-x-4">
          <div>
            <label className="text-lg">New Node ID</label>
            <input
              type="number"
              value={newNodeId}
              disabled
              className="mt-2 p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="text-lg">Edge From</label>
            <input
              type="number"
              value={newEdgeFrom}
              onChange={(e) => setNewEdgeFrom(e.target.value)}
              className="mt-2 p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="text-lg">Edge To</label>
            <input
              type="number"
              value={newEdgeTo}
              onChange={(e) => setNewEdgeTo(e.target.value)}
              className="mt-2 p-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Start Node Selection */}
      <div className="mb-6">
        <label className="text-lg">Select Start Node</label>
        <select
          value={startNode}
          onChange={handleStartNodeChange}
          className="p-2 border rounded-md mt-2"
        >
          {graph.nodes.map((node) => (
            <option key={node.id} value={node.id}>
              Node {node.id}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons for BFS */}
      <div className="mb-6 flex justify-center space-x-4">
        <button
          onClick={runBFS}
          disabled={isRunning}
          className="bg-blue-500 text-white py-2 px-6 rounded-md shadow-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
        >
          Run BFS
        </button>
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="bg-green-500 text-white py-2 px-6 rounded-md shadow-lg hover:bg-green-600 transition-colors"
        >
          {isRunning ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={stepBackward}
          disabled={currentStep === 0}
          className="bg-yellow-500 text-white py-2 px-6 rounded-md shadow-lg hover:bg-yellow-600 disabled:opacity-50 transition-colors"
        >
          Step Back
        </button>
        <button
          onClick={stepForward}
          disabled={currentStep === steps.length - 1}
          className="bg-yellow-500 text-white py-2 px-6 rounded-md shadow-lg hover:bg-yellow-600 disabled:opacity-50 transition-colors"
        >
          Step Forward
        </button>
        <button
          onClick={resetVisualization}
          className="bg-red-500 text-white py-2 px-6 rounded-md shadow-lg hover:bg-red-600 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Graph Visualization */}
      <div className="mb-8">
        <svg width="400" height="250" className="mx-auto">
          {graph.edges.map((edge, index) => {
            const fromNode = graph.nodes.find((n) => n.id === edge.from)!
            const toNode = graph.nodes.find((n) => n.id === edge.to)!
            return (
              <line
                key={index}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="#999"
                strokeWidth="2"
              />
            )
          })}
          {graph.nodes.map((node) => {
            const currentStepData = steps[currentStep]
            const isVisited = currentStepData?.visited.includes(node.id)
            const isInQueue = currentStepData?.queue.includes(node.id)
            const isCurrent = currentStepData?.current === node.id

            let fillColor = '#fff'
            if (isCurrent) fillColor = '#fbbf24'
            else if (isVisited) fillColor = '#34d399'
            else if (isInQueue) fillColor = '#60a5fa'

            return (
              <motion.circle
                key={node.id}
                cx={node.x}
                cy={node.y}
                r="20"
                fill={fillColor}
                stroke="#000"
                strokeWidth="2"
                initial={{ scale: 1 }}
                animate={{ scale: isCurrent ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <title>Node {node.id}</title>
              </motion.circle>
            )
          })}
          {graph.nodes.map((node) => (
            <text
              key={node.id}
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dy=".3em"
              fontSize="12"
              fontWeight="bold"
            >
              {node.id}
            </text>
          ))}
        </svg>
      </div>

      {/* Step Description */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Current Step</h2>
        <div className="bg-gray-100 p-4 rounded-md">
          <p>{steps[currentStep]?.description || 'No steps yet'}</p>
        </div>
      </div>

      {/* Queue */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Queue</h2>
        <div className="flex space-x-2">
          {steps[currentStep]?.queue.map((nodeId) => (
            <div
              key={nodeId}
              className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full"
            >
              {nodeId}
            </div>
          ))}
        </div>
      </div>

      {/* Visited Nodes */}
      <div>
        <h2 className="text-xl font-bold mb-2">Visited Nodes</h2>
        <div className="flex space-x-2">
          {steps[currentStep]?.visited.map((nodeId) => (
            <div
              key={nodeId}
              className="bg-green-500 text-white w-8 h-8 flex items-center justify-center rounded-full"
            >
              {nodeId}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

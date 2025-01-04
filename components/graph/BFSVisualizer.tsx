'use client'

import React, { useState, useEffect, useCallback } from 'react'
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
  
  const [newNodeId, setNewNodeId] = useState<number>(6)
  const [newEdgeFrom, setNewEdgeFrom] = useState<number | string>('')
  const [newEdgeTo, setNewEdgeTo] = useState<number | string>('')

  const [hasMounted, setHasMounted] = useState<boolean>(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const resetVisualization = () => {
    setSteps([])
    setCurrentStep(0)
    setIsRunning(false)
  }

  const addNode = () => {
    const newNode = { id: newNodeId, x: Math.random() * 350, y: Math.random() * 200 }
    setGraph((prevGraph) => ({
      ...prevGraph,
      nodes: [...prevGraph.nodes, newNode],
    }))
    setNewNodeId(newNodeId + 1)
  }

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

  const handleStartNodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartNode(parseInt(e.target.value))
    resetVisualization()
  }

  useEffect(() => {
    resetVisualization()
  }, [startNode])

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

  const stepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsRunning(false)
    }
  }

  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const autoPlay = useCallback(async () => {
    for (let i = currentStep; i < steps.length; i++) {
      if (!isRunning) break
      setCurrentStep(i)
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
    setIsRunning(false)
  }, [currentStep, steps.length, isRunning])

  useEffect(() => {
    if (isRunning) {
      autoPlay()
    }
  }, [isRunning, autoPlay])

  if (!hasMounted) {
    return null
  }

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <div className="mb-6 flex flex-col items-center space-y-4">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={addNode}
            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
          >
            Add Node
          </button>
          <button
            onClick={addEdge}
            className="bg-green-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-green-600 transition-colors text-sm sm:text-base"
          >
            Add Edge
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <div>
            <label className="text-sm sm:text-base">New Node ID</label>
            <input
              type="number"
              value={newNodeId}
              disabled
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="text-sm sm:text-base">Edge From</label>
            <input
              type="number"
              value={newEdgeFrom}
              onChange={(e) => setNewEdgeFrom(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="text-sm sm:text-base">Edge To</label>
            <input
              type="number"
              value={newEdgeTo}
              onChange={(e) => setNewEdgeTo(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="text-sm sm:text-base">Select Start Node</label>
        <select
          value={startNode}
          onChange={handleStartNodeChange}
          className="p-2 border rounded-md mt-2 w-full"
        >
          {graph.nodes.map((node) => (
            <option key={node.id} value={node.id}>
              Node {node.id}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6 flex flex-wrap justify-center gap-2">
        <button
          onClick={runBFS}
          disabled={isRunning}
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-600 disabled:opacity-50 transition-colors text-sm sm:text-base"
        >
          Run BFS
        </button>
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="bg-green-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-green-600 transition-colors text-sm sm:text-base"
        >
          {isRunning ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={stepBackward}
          disabled={currentStep === 0}
          className="bg-yellow-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-yellow-600 disabled:opacity-50 transition-colors text-sm sm:text-base"
        >
          Step Back
        </button>
        <button
          onClick={stepForward}
          disabled={currentStep === steps.length - 1}
          className="bg-yellow-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-yellow-600 disabled:opacity-50 transition-colors text-sm sm:text-base"
        >
          Step Forward
        </button>
        <button
          onClick={resetVisualization}
          className="bg-red-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-red-600 transition-colors text-sm sm:text-base"
        >
          Reset
        </button>
      </div>

      <div className="mb-8 overflow-x-auto">
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

      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-bold mb-2">Current Step</h2>
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-sm sm:text-base">{steps[currentStep]?.description || 'No steps yet'}</p>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-bold mb-2">Queue</h2>
        <div className="flex flex-wrap gap-2">
          {steps[currentStep]?.queue.map((nodeId, index) => (
            <div
              key={`queue-${currentStep}-${index}-${nodeId}`}
              className="bg-blue-500 text-white w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs sm:text-sm"
            >
              {nodeId}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg sm:text-xl font-bold mb-2">Visited Nodes</h2>
        <div className="flex flex-wrap gap-2">
          {steps[currentStep]?.visited.map((nodeId, index) => (
            <div
              key={`visited-${currentStep}-${index}-${nodeId}`}
              className="bg-green-500 text-white w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs sm:text-sm"
            >
              {nodeId}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


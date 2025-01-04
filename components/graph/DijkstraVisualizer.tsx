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
  weight: number
}

type Graph = {
  nodes: Node[]
  edges: Edge[]
}

type Step = {
  description: string
  visited: number[]
  distances: { [key: number]: number }
  current: number | null
  path: number[]
}

export default function DijkstraVisualizer() {
  const [graph] = useState<Graph>({
    nodes: [
      { id: 0, x: 50, y: 50 },
      { id: 1, x: 200, y: 50 },
      { id: 2, x: 350, y: 50 },
      { id: 3, x: 50, y: 200 },
      { id: 4, x: 200, y: 200 },
      { id: 5, x: 350, y: 200 },
    ],
    edges: [
      { from: 0, to: 1, weight: 4 },
      { from: 0, to: 3, weight: 2 },
      { from: 1, to: 2, weight: 3 },
      { from: 1, to: 4, weight: 1 },
      { from: 2, to: 5, weight: 5 },
      { from: 3, to: 4, weight: 3 },
      { from: 4, to: 5, weight: 4 },
    ],
  })
  const [startNode, setStartNode] = useState<number>(0)
  const [endNode, setEndNode] = useState<number>(5)
  const [steps, setSteps] = useState<Step[]>([])
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  useEffect(() => {
    resetVisualization()
  }, [startNode, endNode])

  const resetVisualization = () => {
    setSteps([])
    setCurrentStep(0)
    setIsRunning(false)
  }

  const runDijkstra = () => {
    setIsRunning(true)
    const newSteps: Step[] = []
    const distances: { [key: number]: number } = {}
    const previous: { [key: number]: number | null } = {}
    const unvisited = new Set(graph.nodes.map((node) => node.id))

    graph.nodes.forEach((node) => {
      distances[node.id] = node.id === startNode ? 0 : Infinity
      previous[node.id] = null
    })

    newSteps.push({
      description: `Initialize Dijkstra's algorithm from node ${startNode}`,
      visited: [],
      distances: { ...distances },
      current: null,
      path: [],
    })

    while (unvisited.size > 0) {
      const current = Array.from(unvisited).reduce((a, b) =>
        distances[a] < distances[b] ? a : b
      )
      unvisited.delete(current)

      if (current === endNode) {
        const path = reconstructPath(previous, endNode)
        newSteps.push({
          description: `Reached the end node ${endNode}. Shortest path found!`,
          visited: graph.nodes.map((node) => node.id).filter((id) => !unvisited.has(id)),
          distances: { ...distances },
          current: current,
          path: path,
        })
        break
      }

      newSteps.push({
        description: `Visit node ${current}`,
        visited: graph.nodes.map((node) => node.id).filter((id) => !unvisited.has(id)),
        distances: { ...distances },
        current: current,
        path: reconstructPath(previous, current),
      })

      const neighbors = graph.edges
        .filter((e) => e.from === current && unvisited.has(e.to))
        .map((e) => ({ node: e.to, weight: e.weight }))

      for (const { node: neighbor, weight } of neighbors) {
        const alt = distances[current] + weight
        if (alt < distances[neighbor]) {
          distances[neighbor] = alt
          previous[neighbor] = current
          newSteps.push({
            description: `Update distance to node ${neighbor} through ${current}`,
            visited: graph.nodes.map((node) => node.id).filter((id) => !unvisited.has(id)),
            distances: { ...distances },
            current: neighbor,
            path: reconstructPath(previous, neighbor),
          })
        }
      }
    }

    setSteps(newSteps)
  }

  const reconstructPath = (previous: { [key: number]: number | null }, end: number): number[] => {
    const path: number[] = []
    let current: number | null = end
    while (current !== null) {
      path.unshift(current)
      current = previous[current]
    }
    return path
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
  }, [currentStep, isRunning, steps.length])

  useEffect(() => {
    if (isRunning) {
      autoPlay()
    }
  }, [isRunning, autoPlay])

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        <select
          value={startNode}
          onChange={(e) => setStartNode(parseInt(e.target.value))}
          className="p-2 border rounded-md text-sm sm:text-base"
        >
          {graph.nodes.map((node) => (
            <option key={node.id} value={node.id}>
              Start: Node {node.id}
            </option>
          ))}
        </select>
        <select
          value={endNode}
          onChange={(e) => setEndNode(parseInt(e.target.value))}
          className="p-2 border rounded-md text-sm sm:text-base"
        >
          {graph.nodes.map((node) => (
            <option key={node.id} value={node.id}>
              End: Node {node.id}
            </option>
          ))}
        </select>
        <button
          onClick={runDijkstra}
          disabled={isRunning}
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-600 disabled:opacity-50 transition-colors text-sm sm:text-base"
        >
          Run Dijkstra
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
              <g key={index}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="#999"
                  strokeWidth="2"
                />
                <text
                  x={(fromNode.x + toNode.x) / 2}
                  y={(fromNode.y + toNode.y) / 2}
                  textAnchor="middle"
                  dy="-5"
                  fontSize="12"
                  fill="#666"
                >
                  {edge.weight}
                </text>
              </g>
            )
          })}
          {graph.nodes.map((node) => {
            const currentStepData = steps[currentStep]
            const isVisited = currentStepData?.visited.includes(node.id)
            const isCurrent = currentStepData?.current === node.id
            const isInPath = currentStepData?.path.includes(node.id)

            let fillColor = '#fff'
            if (isCurrent) fillColor = '#fbbf24'
            else if (isInPath) fillColor = '#f472b6'
            else if (isVisited) fillColor = '#34d399'

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
        <h2 className="text-lg sm:text-xl font-bold mb-2">Distances</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(steps[currentStep]?.distances || {}).map(([node, distance]) => (
            <div
              key={node}
              className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs sm:text-sm"
            >
              Node {node}: {distance === Infinity ? '∞' : distance}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg sm:text-xl font-bold mb-2">Shortest Path</h2>
        <div className="flex flex-wrap gap-2">
          {steps[currentStep]?.path.map((nodeId) => (
            <div
              key={nodeId}
              className="bg-pink-500 text-white w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs sm:text-sm"
            >
              {nodeId}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


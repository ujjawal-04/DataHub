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
  mstEdges: Edge[]
  visited: number[]
}

export default function KruskalVisualizer() {
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
  const [steps, setSteps] = useState<Step[]>([])
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  useEffect(() => {
    resetVisualization()
  }, [])

  const resetVisualization = () => {
    setSteps([])
    setCurrentStep(0)
    setIsRunning(false)
  }

  const runKruskal = () => {
    setIsRunning(true)
    const newSteps: Step[] = []
    const parent: { [key: number]: number } = {}
    const rank: { [key: number]: number } = {}

    const find = (node: number) => {
      if (parent[node] !== node) {
        parent[node] = find(parent[node]) // Path compression
      }
      return parent[node]
    }

    const union = (node1: number, node2: number) => {
      const root1 = find(node1)
      const root2 = find(node2)

      if (root1 !== root2) {
        // Union by rank
        if (rank[root1] > rank[root2]) {
          parent[root2] = root1
        } else if (rank[root1] < rank[root2]) {
          parent[root1] = root2
        } else {
          parent[root2] = root1
          rank[root1] += 1
        }
      }
    }

    // Initialize parent and rank
    graph.nodes.forEach((node) => {
      parent[node.id] = node.id
      rank[node.id] = 0
    })

    // Sort edges by weight
    const sortedEdges = [...graph.edges].sort((a, b) => a.weight - b.weight)

    const mstEdges: Edge[] = []
    const visited: number[] = []

    newSteps.push({
      description: "Initialize Kruskal's algorithm, sort edges by weight.",
      mstEdges: [],
      visited: [],
    })

    for (const edge of sortedEdges) {
      const { from, to } = edge
      const root1 = find(from)
      const root2 = find(to)

      if (root1 !== root2) {
        mstEdges.push(edge)
        visited.push(from, to)
        union(from, to)

        newSteps.push({
          description: `Add edge ${from} - ${to} with weight ${edge.weight}`,
          mstEdges: [...mstEdges],
          visited: [...new Set(visited)], // Avoid duplicates
        })
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
  }, [currentStep, isRunning, steps.length])

  useEffect(() => {
    if (isRunning) {
      autoPlay()
    }
  }, [isRunning, autoPlay])

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        <button
          onClick={runKruskal}
          disabled={isRunning}
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-600 disabled:opacity-50 transition-colors text-sm sm:text-base"
        >
          Run Kruskal
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
                  stroke={steps[currentStep]?.mstEdges.includes(edge) ? '#34d399' : '#999'}
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
            const isVisited = steps[currentStep]?.visited.includes(node.id)
            const fillColor = isVisited ? '#34d399' : '#fff'

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
                animate={{ scale: isVisited ? 1.2 : 1 }}
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
        <h2 className="text-lg sm:text-xl font-bold mb-2">Minimum Spanning Tree Edges</h2>
        <div className="flex flex-wrap gap-2">
          {steps[currentStep]?.mstEdges.map((edge, index) => (
            <div
              key={index}
              className="bg-green-500 text-white px-2 py-1 rounded-full text-xs sm:text-sm"
            >
              {edge.from} - {edge.to} ({edge.weight})
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


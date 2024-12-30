'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Node {
  id: string
  x: number
  y: number
}

interface Edge {
  source: string
  target: string
}

export default function GraphVisualizer() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [nodeInput, setNodeInput] = useState('')
  const [edgeSource, setEdgeSource] = useState('')
  const [edgeTarget, setEdgeTarget] = useState('')
  const svgRef = useRef<SVGSVGElement>(null)

  const addNode = () => {
    if (nodeInput && !nodes.some(node => node.id === nodeInput)) {
      const newNode: Node = { 
        id: nodeInput, 
        x: Math.random() * (svgRef.current?.clientWidth || 600), 
        y: Math.random() * (svgRef.current?.clientHeight || 400) 
      }
      setNodes([...nodes, newNode])
      setNodeInput('')
    }
  }

  const addEdge = () => {
    if (edgeSource && edgeTarget && edgeSource !== edgeTarget) {
      if (!edges.some(edge => edge.source === edgeSource && edge.target === edgeTarget)) {
        setEdges([...edges, { source: edgeSource, target: edgeTarget }])
        setEdgeSource('')
        setEdgeTarget('')
      }
    }
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          value={nodeInput}
          onChange={(e) => setNodeInput(e.target.value)}
          className="border rounded px-2 py-1"
          placeholder="Node ID"
        />
        <button onClick={addNode} className="btn-primary">
          Add Node
        </button>
        <input
          type="text"
          value={edgeSource}
          onChange={(e) => setEdgeSource(e.target.value)}
          className="border rounded px-2 py-1"
          placeholder="Edge Source"
        />
        <input
          type="text"
          value={edgeTarget}
          onChange={(e) => setEdgeTarget(e.target.value)}
          className="border rounded px-2 py-1"
          placeholder="Edge Target"
        />
        <button onClick={addEdge} className="btn-primary">
          Add Edge
        </button>
      </div>
      <svg ref={svgRef} className="w-full h-64 bg-muted rounded-lg shadow-inner">
        {edges.map((edge, index) => {
          const source = nodes.find(node => node.id === edge.source)
          const target = nodes.find(node => node.id === edge.target)
          if (source && target) {
            return (
              <line
                key={index}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke="#4B5563"
                strokeWidth="2"
              />
            )
          }
          return null
        })}
        {nodes.map((node) => (
          <motion.g
            key={node.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r="20"
              fill="#3B82F6"
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dy=".3em"
              fill="white"
            >
              {node.id}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}


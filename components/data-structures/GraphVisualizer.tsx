'use client'

import { useState, useRef } from 'react'
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

  const svgWidth = svgRef.current?.clientWidth || 600
  const svgHeight = svgRef.current?.clientHeight || 400
  const nodeRadius = 20 // Radius of the node
  const nodeSpacing = 100 // Distance between nodes

  // Add a new node at a calculated position to avoid overlap
  const addNode = () => {
    if (nodeInput && !nodes.some(node => node.id === nodeInput)) {
      const angle = Math.random() * 2 * Math.PI // Random angle for circular placement
      const x = svgWidth / 2 + Math.cos(angle) * nodeSpacing * nodes.length
      const y = svgHeight / 2 + Math.sin(angle) * nodeSpacing * nodes.length

      // Ensure node stays within the SVG boundaries
      const newNode: Node = {
        id: nodeInput,
        x: Math.min(Math.max(x, nodeRadius), svgWidth - nodeRadius), 
        y: Math.min(Math.max(y, nodeRadius), svgHeight - nodeRadius),
      }
      setNodes([...nodes, newNode])
      setNodeInput('')
    }
  }

  // Add an edge between two nodes
  const addEdge = () => {
    if (edgeSource && edgeTarget && edgeSource !== edgeTarget) {
      if (!edges.some(edge => edge.source === edgeSource && edge.target === edgeTarget)) {
        setEdges([...edges, { source: edgeSource, target: edgeTarget }])
        setEdgeSource('')
        setEdgeTarget('')
      }
    }
  }

  // Function to handle node dragging and prevent out-of-bounds movement
  const handleDrag = (e: React.MouseEvent<SVGCircleElement>, nodeId: string) => {
    const svgRect = svgRef.current?.getBoundingClientRect()
    const offsetX = svgRect?.left || 0
    const offsetY = svgRect?.top || 0
    let mouseX = e.clientX - offsetX
    let mouseY = e.clientY - offsetY

    // Ensure the node stays within the canvas bounds after dragging
    mouseX = Math.min(Math.max(mouseX, nodeRadius), svgWidth - nodeRadius)
    mouseY = Math.min(Math.max(mouseY, nodeRadius), svgHeight - nodeRadius)

    setNodes(nodes.map(node =>
      node.id === nodeId ? { ...node, x: mouseX, y: mouseY } : node
    ))
  }

  // Function to calculate Bezier curve for edges to avoid overlap
  const getBezierPath = (source: Node, target: Node) => {
    // Control points for the Bezier curve
    const cp1x = Math.min(Math.max(source.x + (target.x - source.x) / 2, nodeRadius), svgWidth - nodeRadius)
    const cp1y = Math.min(Math.max(source.y - 100, nodeRadius), svgHeight - nodeRadius) // Bend the line upward
    const cp2x = Math.min(Math.max(target.x + (source.x - target.x) / 2, nodeRadius), svgWidth - nodeRadius)
    const cp2y = Math.min(Math.max(target.y - 100, nodeRadius), svgHeight - nodeRadius) // Bend the line upward

    return `M${source.x},${source.y} C${cp1x},${cp1y} ${cp2x},${cp2y} ${target.x},${target.y}`
  }

  return (
    <div>
      {/* Controls for adding nodes and edges */}
      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          value={nodeInput}
          onChange={(e) => setNodeInput(e.target.value)}
          className="border rounded px-4 py-2 w-48"
          placeholder="Node ID"
        />
        <button 
          onClick={addNode} 
          className="btn-primary w-32 bg-blue-600 text-white hover:bg-blue-700 transform transition duration-300 ease-in-out"
        >
          Add Node
        </button>
        <input
          type="text"
          value={edgeSource}
          onChange={(e) => setEdgeSource(e.target.value)}
          className="border rounded px-4 py-2 w-48"
          placeholder="Edge Source"
        />
        <input
          type="text"
          value={edgeTarget}
          onChange={(e) => setEdgeTarget(e.target.value)}
          className="border rounded px-4 py-2 w-48"
          placeholder="Edge Target"
        />
        <button 
          onClick={addEdge} 
          className="btn-primary w-32 bg-green-600 text-white hover:bg-green-700 transform transition duration-300 ease-in-out"
        >
          Add Edge
        </button>
      </div>

      {/* SVG canvas for graph */}
      <svg ref={svgRef} className="w-full h-96 bg-gray-100 rounded-lg shadow-inner">
        {/* Render edges with Bezier curve */}
        {edges.map((edge, index) => {
          const source = nodes.find(node => node.id === edge.source)
          const target = nodes.find(node => node.id === edge.target)
          if (source && target) {
            const pathData = getBezierPath(source, target)
            return (
              <path
                key={index}
                d={pathData}
                stroke="#4B5563"
                strokeWidth="2"
                fill="transparent"
              />
            )
          }
          return null
        })}

        {/* Render nodes */}
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
              r={nodeRadius}
              fill="#3B82F6"
              className="cursor-pointer"
              onMouseDown={(e) => handleDrag(e, node.id)}
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dy=".3em"
              fill="white"
              fontSize="14"
              fontWeight="bold"
            >
              {node.id}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}

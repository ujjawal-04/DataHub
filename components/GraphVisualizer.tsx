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

const GraphVisualizer = () => {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [nodeInput, setNodeInput] = useState('')
  const [edgeSource, setEdgeSource] = useState('')
  const [edgeTarget, setEdgeTarget] = useState('')
  const [visitedNodes, setVisitedNodes] = useState<string[]>([])
  const [currentNode, setCurrentNode] = useState<string | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    resetGraph()
  }, [])

  const resetGraph = () => {
    const newNodes: Node[] = [
      { id: 'A', x: 100, y: 100 },
      { id: 'B', x: 200, y: 200 },
      { id: 'C', x: 300, y: 100 },
      { id: 'D', x: 400, y: 200 },
    ]
    const newEdges: Edge[] = [
      { source: 'A', target: 'B' },
      { source: 'B', target: 'C' },
      { source: 'C', target: 'D' },
      { source: 'D', target: 'A' },
    ]
    setNodes(newNodes)
    setEdges(newEdges)
    setVisitedNodes([])
    setCurrentNode(null)
  }

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

  const dfs = async (startNode: string) => {
    setVisitedNodes([])
    setCurrentNode(null)
    const visited = new Set<string>()
    const stack: string[] = [startNode]

    while (stack.length > 0) {
      const node = stack.pop()!
      if (!visited.has(node)) {
        setCurrentNode(node)
        await new Promise(resolve => setTimeout(resolve, 1000))
        visited.add(node)
        setVisitedNodes([...visited])

        const neighbors = edges
          .filter(edge => edge.source === node)
          .map(edge => edge.target)
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            stack.push(neighbor)
          }
        }
      }
    }
    setCurrentNode(null)
  }

  const bfs = async (startNode: string) => {
    setVisitedNodes([])
    setCurrentNode(null)
    const visited = new Set<string>()
    const queue: string[] = [startNode]
    visited.add(startNode)

    while (queue.length > 0) {
      const node = queue.shift()!
      setCurrentNode(node)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setVisitedNodes([...visited])

      const neighbors = edges
        .filter(edge => edge.source === node)
        .map(edge => edge.target)
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor)
          queue.push(neighbor)
        }
      }
    }
    setCurrentNode(null)
  }

  return (
    <div className="tech-card">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Graph Visualizer</h2>
      <div className="mb-4 flex flex-wrap gap-4">
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
        <button onClick={resetGraph} className="btn-secondary">
          Reset Graph
        </button>
        <button onClick={() => dfs(nodes[0].id)} className="btn-primary">
          DFS
        </button>
        <button onClick={() => bfs(nodes[0].id)} className="btn-primary">
          BFS
        </button>
      </div>
      <svg ref={svgRef} className="algo-canvas" viewBox="0 0 600 400">
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
              fill={visitedNodes.includes(node.id) ? '#10B981' : currentNode === node.id ? '#FBBF24' : '#3B82F6'}
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

export default GraphVisualizer


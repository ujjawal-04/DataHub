'use client'

import { useState, useEffect } from 'react'
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

export default function BFSVisualizer() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [visitedNodes, setVisitedNodes] = useState<string[]>([])
  const [currentNode, setCurrentNode] = useState<string | null>(null)

}

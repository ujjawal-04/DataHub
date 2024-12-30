'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import BFSVisualizer from '../../components/graph/BFSVisualizer'
import DFSVisualizer from '../../components/graph/DFSVisualizer'
import DijkstraVisualizer from '../../components/graph/DijkstraVisualizer'
import BellmanFordVisualizer from '../../components/graph/BellmanFordVisualizer'
import PrimsVisualizer from '../../components/graph/PrimsVisualizer'
import KruskalsVisualizer from '../../components/graph/KruskalsVisualizer'

const graphAlgorithms = [
  { name: 'Breadth-First Search (BFS)', component: BFSVisualizer },
  { name: 'Depth-First Search (DFS)', component: DFSVisualizer },
  { name: 'Dijkstra\'s Algorithm', component: DijkstraVisualizer },
  { name: 'Bellman-Ford Algorithm', component: BellmanFordVisualizer },
  { name: 'Prim\'s Algorithm', component: PrimsVisualizer },
  { name: 'Kruskal\'s Algorithm', component: KruskalsVisualizer },
]

export default function GraphPage() {
  const [selectedAlgo, setSelectedAlgo] = useState(graphAlgorithms[0])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Graph Algorithms</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          {graphAlgorithms.map((algo, index) => (
            <button
              key={index}
              className={`w-full text-left p-4 rounded-lg mb-2 ${
                selectedAlgo.name === algo.name ? 'bg-primary text-primary-foreground' : 'bg-card text-card-foreground'
              }`}
              onClick={() => setSelectedAlgo(algo)}
            >
              {algo.name}
            </button>
          ))}
        </div>
        <div className="col-span-2">
          <h2 className="text-2xl font-semibold mb-4">{selectedAlgo.name}</h2>
          {selectedAlgo.component && <selectedAlgo.component />}
        </div>
      </div>
    </div>
  )
}


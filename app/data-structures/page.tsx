'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ArrayVisualizer from '../../components/data-structures/ArrayVisualizer'
import LinkedListVisualizer from '../../components/data-structures/LinkedListVisualizer'
import StackVisualizer from '../../components/data-structures/StackVisualizer'
import QueueVisualizer from '../../components/data-structures/QueueVisualizer'
import TreeVisualizer from '../../components/data-structures/TreeVisualizer'
import GraphVisualizer from '../../components/data-structures/GraphVisualizer'
import HashTableVisualizer from '../../components/data-structures/HashTableVisualizer'

const dataStructures = [
  { name: 'Arrays', component: ArrayVisualizer },
  { name: 'Linked Lists', component: LinkedListVisualizer },
  { name: 'Stacks', component: StackVisualizer },
  { name: 'Queues', component: QueueVisualizer },
  { name: 'Trees', component: TreeVisualizer },
  { name: 'Graphs', component: GraphVisualizer },
  { name: 'Hash Tables', component: HashTableVisualizer },
]

export default function DataStructuresPage() {
  const [selectedDS, setSelectedDS] = useState(dataStructures[0])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Data Structures</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          {dataStructures.map((ds, index) => (
            <button
              key={index}
              className={`w-full text-left p-4 rounded-lg mb-2 ${
                selectedDS.name === ds.name ? 'bg-primary text-primary-foreground' : 'bg-card text-card-foreground'
              }`}
              onClick={() => setSelectedDS(ds)}
            >
              {ds.name}
            </button>
          ))}
        </div>
        <div className="col-span-2">
          <h2 className="text-2xl font-semibold mb-4">{selectedDS.name}</h2>
          {selectedDS.component && <selectedDS.component />}
        </div>
      </div>
    </div>
  )
}


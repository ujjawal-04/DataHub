import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const greedyAlgorithms = [
  { name: 'Activity Selection', link: '/greedy/activity-selection' },
  { name: 'Fractional Knapsack', link: '/greedy/fractional-knapsack' },
  { name: 'Huffman Coding', link: '/greedy/huffman-coding' },
  { name: 'Job Sequencing', link: '/greedy/job-sequencing' },
  { name: 'Prim\'s Algorithm', link: '/greedy/prims' },
  { name: 'Kruskal\'s Algorithm', link: '/greedy/kruskals' },
]

export default function GreedyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Greedy Algorithms</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {greedyAlgorithms.map((algo, index) => (
          <div key={index} className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{algo.name}</h3>
            <Link href={algo.link} className="text-primary hover:text-primary/80 flex items-center">
              Explore <ArrowRight className="ml-2" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}


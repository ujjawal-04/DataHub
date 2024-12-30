import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const dpAlgorithms = [
  { name: 'Fibonacci Sequence', link: '/dynamic-programming/fibonacci' },
  { name: 'Longest Common Subsequence', link: '/dynamic-programming/lcs' },
  { name: '0/1 Knapsack Problem', link: '/dynamic-programming/knapsack' },
  { name: 'Matrix Chain Multiplication', link: '/dynamic-programming/matrix-chain' },
  { name: 'Longest Increasing Subsequence', link: '/dynamic-programming/lis' },
  { name: 'Edit Distance', link: '/dynamic-programming/edit-distance' },
]

export default function DynamicProgrammingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Dynamic Programming Algorithms</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dpAlgorithms.map((algo, index) => (
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


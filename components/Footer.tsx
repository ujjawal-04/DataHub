"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Github, Twitter, Linkedin, ArrowUp, Brain } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const algorithmChallenges = [
  "Implement a function to reverse a linked list",
  "Write a function to find the longest palindromic substring",
  "Implement a binary search algorithm",
  "Create a function to detect a cycle in a directed graph",
  "Implement the quicksort algorithm",
  "Write a function to find the kth largest element in an unsorted array",
  "Implement a trie data structure",
  "Create a function to solve the N-Queens problem",
  "Implement the Dijkstra's algorithm for finding shortest paths",
  "Write a function to perform matrix multiplication"
]

const Footer = () => {
  const [email, setEmail] = useState('')
  const [dailyChallenge, setDailyChallenge] = useState('')

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * algorithmChallenges.length)
    setDailyChallenge(algorithmChallenges[randomIndex])
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup logic here
    console.log('Signed up with:', email)
    setEmail('')
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500">DataHub</h3>
            <p className="text-gray-600 mb-4">Visualize and learn algorithms interactively. Empowering learners to master data structures and algorithms through engaging visualizations.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <h4 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h4>
            <ul className="space-y-2 col-span-2">
              <li><Link href="/data-structures" className="text-gray-600 hover:text-blue-600 transition-colors">Data Structures</Link></li>
              <li><Link href="/sorting" className="text-gray-600 hover:text-blue-600 transition-colors">Sorting Algorithms</Link></li>
              <li><Link href="/searching" className="text-gray-600 hover:text-blue-600 transition-colors">Searching Algorithms</Link></li>
              <li><Link href="/graph" className="text-gray-600 hover:text-blue-600 transition-colors">Graph Algorithms</Link></li>
              <li><Link href="/dynamic-programming" className="text-gray-600 hover:text-blue-600 transition-colors">Dynamic Programming</Link></li>
              <li><Link href="/greedy" className="text-gray-600 hover:text-blue-600 transition-colors">Greedy Algorithms</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">Documentation</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">Tutorials</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">Blog</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900">Stay Updated</h4>
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
              <Button type="submit" className="w-full bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 text-white">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">&copy; 2025 DataHub. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <Button
                onClick={scrollToTop}
                className="bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 transition-colors"
              >
                <ArrowUp size={16} className="mr-2" />
                Back to Top
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


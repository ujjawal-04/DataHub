import Link from 'next/link'
import { Github, Twitter, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2 text-blue-600">AlgoViz Pro</h3>
            <p className="text-gray-600">Visualize and learn algorithms interactively.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2 text-blue-600">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/data-structures" className="text-gray-600 hover:text-blue-600">Data Structures</Link></li>
              <li><Link href="/sorting" className="text-gray-600 hover:text-blue-600">Sorting Algorithms</Link></li>
              <li><Link href="/searching" className="text-gray-600 hover:text-blue-600">Searching Algorithms</Link></li>
              <li><Link href="/graph" className="text-gray-600 hover:text-blue-600">Graph Algorithms</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2 text-blue-600">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Github size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-gray-600">
          <p>&copy; 2023 AlgoViz Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

const Footer = () => {
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
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h4>
            <ul className="space-y-2">
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
              <li><Link href="/tutorials" className="text-gray-600 hover:text-blue-600 transition-colors">Tutorials</Link></li>
              <li><Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="text-gray-600 hover:text-blue-600 transition-colors">FAQ</Link></li>
              <li><Link href="/api-documentation" className="text-gray-600 hover:text-blue-600 transition-colors">API Documentation</Link></li>
              <li><Link href="/community" className="text-gray-600 hover:text-blue-600 transition-colors">Community Forum</Link></li>
              <li><Link href="/changelog" className="text-gray-600 hover:text-blue-600 transition-colors">Changelog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600">
                <Mail size={16} className="mr-2" />
                <a href="mailto:info@datahub.com" className="hover:text-blue-600 transition-colors">info@datahub.com</a>
              </li>
              <li className="flex items-center text-gray-600">
                <Phone size={16} className="mr-2" />
                <a href="tel:+1234567890" className="hover:text-blue-600 transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center text-gray-600">
                <MapPin size={16} className="mr-2" />
                <span>123 Algorithm Street, Data City, 12345</span>
              </li>
            </ul>
            <div className="mt-4">
              <Link href="/contact" className="inline-block bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-teal-100 hover:to-cyan-100 transition-all">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap justify-between items-center">
            <p className="text-gray-600 text-sm">&copy; 2023 DataHub. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <Link href="/privacy-policy" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">Terms of Service</Link>
              <Link href="/sitemap" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

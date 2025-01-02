'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

const BackButton = () => {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="mb-4 flex items-center bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-teal-300 hover:to-cyan-300 transition-all"
    >
      <ArrowLeft className="mr-2" size={20} />
      Back
    </button>
  )
}

export default BackButton


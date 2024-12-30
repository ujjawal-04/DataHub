'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

const BackButton = () => {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="mb-4 flex items-center text-primary hover:text-primary/80"
    >
      <ArrowLeft className="mr-2" size={20} />
      Back
    </button>
  )
}

export default BackButton


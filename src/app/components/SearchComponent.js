"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchComponent({ initialQuery }) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)

  const handleSearch = (e) => {
    e.preventDefault()

    if (!query || query.trim() === '') {
      router.push('/')
    } else {
      router.push(`/?query=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="mt-8 w-full max-w-lg flex shadow-lg rounded-lg overflow-hidden">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for file names (e.g., control systems, midterm.pdf)"
        // --- FIX: Removed "text-gray-800" ---
        className="w-full p-4 text-lg border-none focus:ring-0 focus:outline-none"
      />
      <button 
        type="submit" 
        className="bg-blue-600 text-white p-4 text-lg hover:bg-blue-700 transition duration-150 flex items-center"
      >
        <svg xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.197 5.197a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </button>
    </form>
  )
}
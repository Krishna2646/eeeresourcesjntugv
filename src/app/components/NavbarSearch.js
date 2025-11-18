"use client"

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function NavbarSearch() {
  const [term, setTerm] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const inputRef = useRef(null)

  useEffect(() => {
    setTerm(searchParams.get('q') || '')
  }, [searchParams])

  useEffect(() => {
    if (mobileOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [mobileOpen])

  const handleSearch = (e) => {
    e.preventDefault()
    // Close mobile search on submit
    if (window.innerWidth < 768) setMobileOpen(false)
    
    if (!term.trim()) {
      router.push('/resources')
    } else {
      router.push(`/resources?q=${encodeURIComponent(term)}`)
    }
  }

  return (
    <>
      {/* --- DESKTOP & CLOSED MOBILE STATE --- */}
      {/* This creates the container for the form. 
          On Mobile Open: It becomes absolute and covers the logo. */}
      <form 
        onSubmit={handleSearch} 
        className="search-container"
        style={mobileOpen ? {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'white', // Covers the logo
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          padding: '0 1rem'
        } : {
          display: 'flex',
          alignItems: 'center'
        }}
      >
        
        {/* INPUT FIELD */}
        <input 
          ref={inputRef}
          type="text" 
          placeholder="Search..." 
          className={`search-input ${mobileOpen ? 'mobile-active' : ''}`}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          // Remove onBlur closing so user can type comfortably
        />
        
        {/* CLOSE BUTTON (Only visible when Mobile Open) */}
        {mobileOpen && (
          <div 
            onClick={() => setMobileOpen(false)}
            style={{ 
              marginLeft: '10px', 
              cursor: 'pointer',
              padding: '5px',
              color: '#666'
            }}
          >
            {/* Simple X Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </div>
        )}

        {/* SEARCH ICON (Only visible when Mobile Closed) */}
        {!mobileOpen && (
          <div 
            className="search-toggle-icon" 
            onClick={() => setMobileOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
          </div>
        )}

        <button type="submit" style={{ display: 'none' }}></button>
      </form>
    </>
  )
}
"use client"

import { useState } from 'react'
import Link from 'next/link'
import NavbarSearch from './NavbarSearch'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="nav-content">
        
        {/* 1. Logo */}
        <Link href="/" className="logo" onClick={() => setIsMenuOpen(false)}>
          eeeresources jntugv
        </Link>

        {/* 2. Desktop Links (Hidden on Mobile) */}
        <div className="nav-links">
          <Link href="/resources">Subjects</Link>
          {/*<Link href="/events">Events</Link>*/}
          <Link href="/about">About</Link>
          {/* --- FIX: Point to the new Admin Login folder --- */}
          <Link href="/admin/login" style={{ color: '#003366', fontWeight: '700' }}>Admin</Link>
        </div>

        {/* 3. Right Side Actions */}
        <div className="nav-actions">
          {/* The Search Bar Component */}
          <NavbarSearch />

          {/* Hamburger Button (Visible on Mobile) */}
          <button 
            className="hamburger-btn" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              // Close Icon (X)
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              // Hamburger Icon (Three lines)
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>

        {/* 4. Mobile Menu Dropdown (Visible when Open) */}
        {isMenuOpen && (
          <div className="mobile-menu-dropdown">
            <Link href="/resources" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
              Subjects
            </Link>
            <Link href="/events" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
              Events
            </Link>
            <Link href="/about" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            {/* --- FIX: Point to the new Admin Login folder --- */}
            <Link href="/admin/login" className="mobile-link" onClick={() => setIsMenuOpen(false)} style={{ color: '#003366' }}>
              Admin Login
            </Link>
          </div>
        )}

      </div>
    </nav>
  )
}
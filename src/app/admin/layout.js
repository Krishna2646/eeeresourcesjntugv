"use client"

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter, usePathname } from 'next/navigation'

export default function AdminLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Define the check function
    const checkSession = async () => {
      // Exception: Don't protect the login page itself
      if (pathname === '/admin/login') {
        setLoading(false)
        return
      }

      // Use getSession() instead of getUser(). 
      // getSession reads from the browser's LocalStorage instantly (Fast & Persistent).
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        // No saved session found -> Login
        router.push('/admin/login')
      } else {
        // Saved session found -> Let them in
        setLoading(false)
      }
    }

    // 2. Run the check immediately
    checkSession()

    // 3. Set up a listener for future changes (Sign Out / Token Refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (pathname === '/admin/login') return

      if (event === 'SIGNED_OUT') {
        router.push('/admin/login')
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setLoading(false)
      }
    })

    // Cleanup the listener when leaving
    return () => {
      subscription.unsubscribe()
    }
  }, [router, pathname])

  if (loading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#f8f9fa',
        color: '#003366',
        fontWeight: '600'
      }}>
        Verifying Admin Access...
      </div>
    )
  }

  return <>{children}</>
}
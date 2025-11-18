"use client"

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter, usePathname } from 'next/navigation' // Added usePathname

export default function AdminLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname() // Get the current URL
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      // 1. EXCEPTION: If we are already on the login page, stop checking.
      if (pathname === '/admin/login') {
        setLoading(false)
        return
      }

      // 2. CHECK: Ask Supabase for the user
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        // If not logged in, send to the NEW admin login page
        router.push('/admin/login')
      } else {
        // If logged in, allow access
        setLoading(false)
      }
    }

    checkAuth()
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
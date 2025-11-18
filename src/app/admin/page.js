"use client"

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState('')
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)

  useEffect(() => {
    async function getData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/admin/login')
        return
      }
      setUserEmail(user.email)

      // Check Role
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (roleData?.role === 'super_admin') {
        setIsSuperAdmin(true)
      }
      setLoading(false)
    }
    getData()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (loading) return <div className="container" style={{paddingTop:'3rem'}}>Loading...</div>

  return (
    <main className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
      
      <div style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'end', 
        marginBottom: '3rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e5e7eb' 
      }}>
        <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#003366', marginBottom: '0.5rem', lineHeight: '1' }}>
              Admin Dashboard
            </h1>
            <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
              Hello, <span style={{color: '#1f2937', fontWeight: '600'}}>{userEmail}</span> 
              {isSuperAdmin && <span style={{marginLeft:'10px', background:'#e0e7ff', color:'#3730a3', padding:'4px 8px', borderRadius:'4px', fontSize:'0.8rem', fontWeight:'700'}}>SUPER ADMIN</span>}
            </p>
        </div>
        
        <button onClick={handleSignOut} className="btn" style={{ backgroundColor: 'white', border: '1px solid #dc2626', color: '#dc2626' }}>Sign Out</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* 1. UPLOAD */}
        <Link href="/admin/upload" style={{ textDecoration: 'none' }}>
            <div className="feature-card" style={{ padding: '2.5rem', background: 'white', borderRadius: '16px', border: '1px solid #e5e7eb', height: '100%' }}>
                <div style={{ width: '56px', height: '56px', background: '#eff6ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#2563eb' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>Upload Files</h3>
                <p style={{ color: '#6b7280', margin: '0.5rem 0 1.5rem' }}>Add notes and papers.</p>
                <span style={{ color: '#2563eb', fontWeight: '600' }}>Go to Upload &rarr;</span>
            </div>
        </Link>

        {/* 2. MANAGE */}
        <Link href="/admin/manage" style={{ textDecoration: 'none' }}>
             <div className="feature-card" style={{ padding: '2.5rem', background: 'white', borderRadius: '16px', border: '1px solid #e5e7eb', height: '100%' }}>
                <div style={{ width: '56px', height: '56px', background: '#fff1f2', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#e11d48' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>Manage Library</h3>
                <p style={{ color: '#6b7280', margin: '0.5rem 0 1.5rem' }}>Edit or delete files.</p>
                <span style={{ color: '#e11d48', fontWeight: '600' }}>Go to Manager &rarr;</span>
            </div>
        </Link>

        {/* 3. MANAGE TEAM (SUPER ADMIN ONLY) */}
        {isSuperAdmin && (
            <Link href="/admin/team" style={{ textDecoration: 'none' }}>
                <div className="feature-card" style={{ padding: '2.5rem', background: 'white', borderRadius: '16px', border: '1px solid #e5e7eb', height: '100%' }}>
                    <div style={{ width: '56px', height: '56px', background: '#f0fdf4', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#16a34a' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>Manage Team</h3>
                    <p style={{ color: '#6b7280', margin: '0.5rem 0 1.5rem' }}>Create or remove Admins.</p>
                    <span style={{ color: '#16a34a', fontWeight: '600' }}>Manage Admins &rarr;</span>
                </div>
            </Link>
        )}

      </div>
    </main>
  )
}
"use client"

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ManageTeam() {
  const router = useRouter()
  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Form State
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    checkAccessAndFetch()
  }, [])

  async function checkAccessAndFetch() {
    // 1. Get Current User
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/admin/login')
      return
    }

    // 2. SECURITY CHECK: Is this user a Super Admin?
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('id', user.id)
      .single()

    // If NOT super_admin, kick them back to dashboard
    if (roleData?.role !== 'super_admin') {
      alert("Access Denied: Super Admin privileges required.")
      router.push('/admin')
      return
    }

    // 3. If Safe, Fetch the Team List
    const { data } = await supabase.from('user_roles').select('*')
    if (data) setAdmins(data)
    setLoading(false)
  }

  const handleCreateAdmin = async (e) => {
    e.preventDefault()
    setCreating(true)

    if (newPassword.length < 6) {
        alert("Password must be at least 6 characters")
        setCreating(false)
        return
    }

    // Call the RPC function we created in SQL
    const { error } = await supabase.rpc('create_admin_user', {
      new_email: newEmail,
      new_password: newPassword
    })

    if (error) {
      alert("Error: " + error.message)
    } else {
      alert("Admin created successfully!")
      setNewEmail('')
      setNewPassword('')
      checkAccessAndFetch() // Refresh list
    }
    setCreating(false)
  }

  if (loading) return <div className="container" style={{paddingTop:'3rem'}}>Verifying Super Admin Access...</div>

  return (
    <main className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#003366' }}>Manage Team</h1>
        <Link href="/admin" className="btn btn-outline">Back</Link>
      </div>

      {/* 1. Create Admin Form */}
      <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e5e7eb', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>Add New Admin</h2>
        <form onSubmit={handleCreateAdmin} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <input 
                type="email" placeholder="New Admin Email" required
                value={newEmail} onChange={(e) => setNewEmail(e.target.value)}
                style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <input 
                type="text" placeholder="Password (min 6 chars)" required
                value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <button disabled={creating} className="btn btn-primary">
                {creating ? 'Creating...' : 'Create Admin'}
            </button>
        </form>
      </div>

      {/* 2. List Admins */}
      <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>Current Team</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {admins.map(admin => (
            <div key={admin.id} style={{ 
                background: 'white', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid #eee',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
                <div>
                    <div style={{ fontWeight: '600', fontSize: '1rem' }}>{admin.email}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666', textTransform:'uppercase', letterSpacing:'1px', fontWeight:'700', marginTop:'4px' }}>
                        {admin.role === 'super_admin' ? <span style={{color:'#7c3aed'}}>Super Admin</span> : 'Admin'}
                    </div>
                </div>
            </div>
        ))}
      </div>
    </main>
  )
}
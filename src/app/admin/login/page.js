"use client"

import { useState } from 'react'
import { supabase } from '../../../lib/supabase'

// Redirect to the Main Dashboard
const REDIRECT_URL = '/admin' 

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" style={{ width: '20px', height: '20px' }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
)

const EyeSlashedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" style={{ width: '20px', height: '20px' }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.243 4.243L6.228 6.228" />
  </svg>
)

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault() 
    setLoading(true)
    setMessage('') 

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      setMessage(`Error: ${error.message}`)
      setLoading(false)
    } else {
      await supabase.auth.setSession(data.session)
      window.location.href = REDIRECT_URL
    }
  }

  // Common input style to ensure full width and correct padding
  const inputStyle = {
    width: '100%', 
    padding: '0.75rem 1rem',
    borderRadius: '8px', 
    border: '1px solid #ced4da',
    fontSize: '0.9rem',
    color: '#495057',
    outline: 'none',
    transition: 'border-color 0.2s'
  }

  return (
    <main className="container" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      paddingBottom: '4rem'
    }}>
      <div style={{
        width: '100%', maxWidth: '400px', background: 'white', padding: '2.5rem',
        borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#003366', marginBottom: '0.5rem' }}>
            Admin Portal
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>Secure Access</p>
        </div>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem', color: '#374151' }}>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={inputStyle} 
              onFocus={(e) => e.target.style.borderColor = '#003366'}
              onBlur={(e) => e.target.style.borderColor = '#ced4da'}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem', color: '#374151' }}>Password</label>
            <div style={{ position: 'relative', width: '100%' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                style={{
                    ...inputStyle,
                    paddingRight: '2.5rem' // Make room for the icon inside
                }}
                onFocus={(e) => e.target.style.borderColor = '#003366'}
                onBlur={(e) => e.target.style.borderColor = '#ced4da'}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                style={{ 
                  position: 'absolute', 
                  right: '12px', // Positioned inside the padding area
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  color: '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0
                }}
              >
                {showPassword ? <EyeSlashedIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>
          
          <button type="submit" disabled={loading} style={{ marginTop: '0.5rem', width: '100%', padding: '0.85rem', borderRadius: '8px', border: 'none', backgroundColor: '#003366', color: 'white', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
          
          {message && <div style={{ padding: '0.75rem', borderRadius: '8px', fontSize: '0.9rem', textAlign: 'center', backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}>{message}</div>}
        </form>
      </div>
    </main>
  )
}
"use client"

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

// (Your icon components are still here...)
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
)
const EyeSlashedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.243 4.243L6.228 6.228" />
  </svg>
)

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault() 
    setMessage('Signing in...') 

    // We ask for 'data' in addition to 'error'
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      // --- THIS IS THE CRUCIAL FIX ---
      // Manually set the session in the client *before* redirecting
      await supabase.auth.setSession(data.session)

      setMessage('Login successful! Redirecting...')

      // We can keep the small delay, it's safe
      setTimeout(() => {
        window.location.href = '/upload'
      }, 500) 
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Admin Login</h1>

      <form 
        onSubmit={handleLogin} 
        className="mt-10 flex flex-col gap-4 w-full max-w-sm"
      >
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </label>

        <label>
          Password:
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded pr-10" 
            />
            <button
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1.2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeSlashedIcon /> : <EyeIcon />}
            </button>
          </div>
        </label>

        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Sign In
        </button>

        {message && <p className="text-center">{message}</p>}
      </form>
    </main>
  )
}
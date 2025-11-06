"use client"

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
// --- 0. We need the router to redirect unauthenticated users ---
import { useRouter } from 'next/navigation'

export default function Upload() {
  const router = useRouter()

  // --- 1. NEW STATE: Check if the user is logged in ---
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // Start in a loading state

  // State for the list of subjects
  const [subjects, setSubjects] = useState([])

  // State for the form inputs
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)

  // State for loading and messages
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)

  // --- 2. CHECK AUTHENTICATION ON PAGE LOAD ---
  useEffect(() => {
    async function getUser() {
      // Get the current user from Supabase
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        // If user is logged in, save them to state
        setUser(user)
        setLoading(false)
      } else {
        // If no user, redirect to login page
        router.push('/login')
      }
    }

    getUser()
  }, [router]) // Run this check when the page loads

  // --- 3. Fetch subjects (only if logged in) ---
  useEffect(() => {
    // This 'if' is important! Only fetch if the user check is done.
    if (user) {
      async function getSubjects() {
        const { data, error } = await supabase
          .from('subjects')
          .select('id, name')

        if (data) {
          setSubjects(data)
          if (data.length > 0) {
            setSelectedSubject(data[0].id)
          }
        } else {
          console.error('Error fetching subjects:', error)
        }
      }

      getSubjects()
    }
  }, [user]) // This now depends on 'user'

  // --- 4. Handle the file upload (this code is the same) ---
  const handleUpload = async (e) => {
    e.preventDefault()
    if (!selectedFile) {
      setMessage('Please select a file to upload.')
      return
    }

    setUploading(true)
    setMessage('Uploading file...')
    const fileName = `${selectedFile.name}-${Date.now()}`

    try {
      const { data: storageData, error: storageError } = await supabase
        .storage
        .from('resources')
        .upload(fileName, selectedFile)

      if (storageError) throw storageError

      const { data: urlData } = supabase
        .storage
        .from('resources')
        .getPublicUrl(fileName)

      const publicUrl = urlData.publicUrl

      const { error: dbError } = await supabase
        .from('resources')
        .insert({
          file_name: selectedFile.name,
          file_url: publicUrl,
          file_type: selectedFile.type,
          subject_id: selectedSubject
        })

      if (dbError) throw dbError

      setMessage('File uploaded successfully!')

    } catch (error) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  // --- 5. NEW RENDER LOGIC ---
  // If still loading, show a loading message
  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center p-24">
        <p>Loading user...</p>
      </main>
    )
  }

  // If we are done loading and 'user' exists, show the form
  // If 'user' doesn't exist, we will have already redirected
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Upload New Resource</h1>

      <form 
        onSubmit={handleUpload} 
        className="mt-10 flex flex-col gap-4 w-full max-w-sm"
      >
        <label>
          Subject:
          <select 
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            required
            className="w-full p-2 border rounded"
          >
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          File:
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            required
            className="w-full p-2 border rounded"
          />
        </label>

        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload File'}
        </button>

        {message && <p className="text-center">{message}</p>}
      </form>
    </main>
  )
}
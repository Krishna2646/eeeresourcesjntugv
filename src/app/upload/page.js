"use client"

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

// These are the standard blocks for your system
const CATEGORIES = ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Textbooks", "Lab Manuals", "Previous Papers"]

export default function Upload() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [subjects, setSubjects] = useState([])
  
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]) // Default to Unit 1
  const [selectedFile, setSelectedFile] = useState(null)
  
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)

  // 1. Auth Check
  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        setLoading(false)
      } else {
        router.push('/login')
      }
    }
    getUser()
  }, [router])

  // 2. Fetch Subjects
  useEffect(() => {
    if (user) {
      async function getSubjects() {
        const { data } = await supabase.from('subjects').select('id, name').order('name')
        if (data) {
          setSubjects(data)
          if (data.length > 0) setSelectedSubject(data[0].id)
        }
      }
      getSubjects()
    }
  }, [user])

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!selectedFile) return
    
    setUploading(true)
    setMessage('Uploading...')
    
    // Sanitize file name to avoid issues
    const fileExt = selectedFile.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`
    
    try {
      // A. Storage Upload
      const { error: storageError } = await supabase
        .storage
        .from('resources')
        .upload(fileName, selectedFile)

      if (storageError) throw storageError
      
      // B. Get URL
      const { data: urlData } = supabase
        .storage
        .from('resources')
        .getPublicUrl(fileName)

      // C. Database Insert (WITH CATEGORY)
      const { error: dbError } = await supabase
        .from('resources')
        .insert({
          file_name: selectedFile.name,
          file_url: urlData.publicUrl,
          file_type: fileExt,
          subject_id: selectedSubject,
          category: selectedCategory // <--- The new System field
        })
      
      if (dbError) throw dbError
      
      setMessage('Success!')
      setSelectedFile(null) // Reset file input
      // Optional: Reset file input visually if you used a ref, but this is simple enough

    } catch (error) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  if (loading) return <p className="container" style={{marginTop:'2rem'}}>Loading...</p>

  return (
    <main className="container" style={{ paddingTop: '2rem', maxWidth: '600px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Admin Upload</h1>
      
      <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Subject</label>
          <select 
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
          >
            {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Category (The System)</label>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
          >
            {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>File</label>
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            style={{ width: '100%', padding: '0.8rem', background: 'white', border: '1px solid #ddd', borderRadius: '8px' }}
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={uploading}
          style={{ marginTop: '1rem' }}
        >
          {uploading ? 'Uploading...' : 'Upload Resource'}
        </button>
        
        {message && <p style={{ textAlign: 'center', color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
      </form>
    </main>
  )
}
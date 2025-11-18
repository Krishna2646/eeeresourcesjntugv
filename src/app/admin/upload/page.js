"use client"

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import Link from 'next/link'

// The exact categories used in your subject page grid
const CATEGORIES = ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Textbooks", "Lab Manuals", "Previous Papers"]

export default function AdminUpload() {
  // --- STATE ---
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Form Data
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0])
  const [selectedFile, setSelectedFile] = useState(null)
  
  // Status
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  // --- 1. FETCH SUBJECTS ON LOAD ---
  useEffect(() => {
    async function fetchSubjects() {
      const { data, error } = await supabase
        .from('subjects')
        .select('id, name')
        .order('name')
      
      if (data) {
        setSubjects(data)
        // Automatically select the first subject to prevent empty state
        if (data.length > 0) setSelectedSubject(data[0].id)
      }
      setLoading(false)
    }
    fetchSubjects()
  }, [])

  // --- HELPER: Clean names for storage paths ---
  // Turns "Network Analysis" into "network_analysis"
  const sanitize = (name) => {
    return name.replace(/[^a-z0-9]/gi, '_').toLowerCase()
  }

  // --- 2. UPLOAD LOGIC ---
  const handleUpload = async (e) => {
    e.preventDefault()
    if (!selectedFile || !selectedSubject) {
      setMessage('Please select a file and subject.')
      return
    }

    setUploading(true)
    setMessage('Starting upload...')

    try {
      // A. Prepare Names & Paths
      const subjectName = subjects.find(s => s.id == selectedSubject)?.name || 'unknown'
      const fileExt = selectedFile.name.split('.').pop()
      // We create a unique system name for storage to prevent overwrites
      const storageName = `${sanitize(selectedFile.name.split('.')[0])}_${Date.now()}.${fileExt}`
      
      // B. Create the Folder Path: Subject / Category / File
      const storagePath = `${sanitize(subjectName)}/${sanitize(selectedCategory)}/${storageName}`

      // C. Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('resources')
        .upload(storagePath, selectedFile)

      if (uploadError) throw uploadError

      // D. Get the Public Download URL
      const { data: urlData } = supabase.storage
        .from('resources')
        .getPublicUrl(storagePath)

      // E. Insert Record into Database
      const { error: dbError } = await supabase
        .from('resources')
        .insert({
          file_name: selectedFile.name, // We save the REAL, readable name here
          file_url: urlData.publicUrl,
          file_type: fileExt,
          subject_id: selectedSubject,
          category: selectedCategory
        })

      if (dbError) throw dbError

      // Success!
      setMessage('✅ Success! File uploaded and linked.')
      setSelectedFile(null)
      document.getElementById('file-upload').value = '' // Reset input

    } catch (error) {
      setMessage(`❌ Error: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  if (loading) return <div className="container" style={{paddingTop:'3rem'}}>Loading uploader...</div>

  return (
    <main className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#003366', marginBottom: '0.5rem' }}>
            Upload Resource
          </h1>
          <p style={{ color: '#6b7280' }}>Add materials to the student library.</p>
        </div>
        <Link href="/admin" className="btn btn-outline">Back to Dashboard</Link>
      </div>

      {/* Upload Form Card */}
      <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '2.5rem', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        
        <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Subject Dropdown */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>Select Subject</label>
            <select 
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none' }}
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Category Dropdown */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>Category (Folder)</label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none' }}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* File Input */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>Choose File (PDF, PPT, DOC)</label>
            <input
              id="file-upload"
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              style={{ width: '100%', padding: '0.8rem', background: '#f9fafb', border: '1px solid #d1d5db', borderRadius: '8px' }}
            />
          </div>
          
          {/* Upload Button */}
          <button 
            type="submit" 
            disabled={uploading}
            className="btn"
            style={{ 
              marginTop: '1rem', width: '100%', padding: '1rem', fontSize: '1rem', fontWeight: '700',
              backgroundColor: '#003366', color: 'white', opacity: uploading ? 0.7 : 1,
              cursor: uploading ? 'not-allowed' : 'pointer'
            }}
          >
            {uploading ? 'Uploading to Cloud...' : 'Upload Resource'}
          </button>
          
          {/* Status Message */}
          {message && (
            <div style={{ 
              padding: '1rem', borderRadius: '8px', marginTop: '1rem', textAlign: 'center', fontWeight: '500',
              backgroundColor: message.includes('Error') ? '#fef2f2' : '#f0fdf4',
              color: message.includes('Error') ? '#dc2626' : '#16a34a',
              border: `1px solid ${message.includes('Error') ? '#fecaca' : '#bbf7d0'}`
            }}>
              {message}
            </div>
          )}
        </form>
      </div>

    </main>
  )
}
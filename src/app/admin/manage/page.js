"use client"

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import Link from 'next/link'

const CATEGORIES = ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Textbooks", "Lab Manuals", "Previous Papers"]

export default function ManageFiles() {
  const [files, setFiles] = useState([])
  const [subjects, setSubjects] = useState([]) 
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  
  const [deleting, setDeleting] = useState(null)
  const [editingId, setEditingId] = useState(null) 
  const [editForm, setEditForm] = useState({}) 

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    const { data: fileData } = await supabase
      .from('resources')
      .select('*, subjects(name)')
      .order('created_at', { ascending: false })
    
    const { data: subjectData } = await supabase
      .from('subjects')
      .select('id, name')
      .order('name')

    if (fileData) setFiles(fileData)
    if (subjectData) setSubjects(subjectData)
    setLoading(false)
  }

  const startEditing = (file) => {
    setEditingId(file.id)
    setEditForm({
      file_name: file.file_name,
      category: file.category || CATEGORIES[0],
      subject_id: file.subject_id
    })
  }

  const saveChanges = async () => {
    try {
      const { error } = await supabase
        .from('resources')
        .update({
          file_name: editForm.file_name,
          category: editForm.category,
          subject_id: editForm.subject_id
        })
        .eq('id', editingId)

      if (error) throw error

      setFiles(files.map(f => {
        if (f.id === editingId) {
          const newSubName = subjects.find(s => s.id == editForm.subject_id)?.name
          return { ...f, ...editForm, subjects: { name: newSubName } }
        }
        return f
      }))

      setEditingId(null) 
      alert("Updated!")

    } catch (error) {
      alert("Error: " + error.message)
    }
  }

  async function handleDelete(fileId, filePath) {
    if (!confirm("Delete this file?")) return
    setDeleting(fileId)

    try {
      const relativePath = filePath.split('/resources/')[1]
      if (relativePath) {
         await supabase.storage.from('resources').remove([decodeURIComponent(relativePath)])
      }
      const { error } = await supabase.from('resources').delete().eq('id', fileId)
      if (error) throw error
      setFiles(files.filter(f => f.id !== fileId))
    } catch (error) {
      alert("Error: " + error.message)
    } finally {
      setDeleting(null)
    }
  }

  const filteredFiles = files.filter(file => 
    file.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.subjects?.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      
      {/* Header */}
      <div style={{ 
        display: 'flex', flexWrap: 'wrap', gap: '1rem', 
        justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' 
      }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#003366', margin: 0 }}>Manage Files</h1>
        <Link href="/admin" className="btn btn-outline" style={{fontSize: '0.85rem', padding: '0.5rem 1rem'}}>Back to Dashboard</Link>
      </div>

      <input 
        type="text" 
        placeholder="Search..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%', padding: '0.8rem', marginBottom: '1.5rem',
          borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem'
        }}
      />

      {loading ? <p>Loading...</p> : (
        <div style={{ display: 'grid', gap: '0.8rem' }}>
          {filteredFiles.map(file => (
            <div key={file.id} style={{ 
              background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid #e5e7eb',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
              overflow: 'hidden' // Prevents anything from spilling out
            }}>
              
              {editingId === file.id ? (
                // --- EDIT MODE ---
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <h3 style={{fontSize:'0.85rem', fontWeight:'700', color:'#003366', textTransform:'uppercase'}}>Editing</h3>
                  
                  <input 
                    type="text" 
                    value={editForm.file_name}
                    onChange={(e) => setEditForm({...editForm, file_name: e.target.value})}
                    style={{ width: '100%', padding: '0.6rem', border: '1px solid #003366', borderRadius: '6px', fontSize: '0.9rem' }}
                  />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <select 
                      value={editForm.subject_id}
                      onChange={(e) => setEditForm({...editForm, subject_id: e.target.value})}
                      style={{ width: '100%', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '6px', fontSize: '0.9rem' }}
                    >
                      {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                    
                    <select 
                      value={editForm.category}
                      onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                      style={{ width: '100%', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '6px', fontSize: '0.9rem' }}
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '0.5rem' }}>
                    <button onClick={saveChanges} className="btn btn-primary" style={{backgroundColor: '#16a34a', border:'none', flex: 1}}>Save</button>
                    <button onClick={() => setEditingId(null)} className="btn btn-outline" style={{background:'white', flex: 1}}>Cancel</button>
                  </div>
                </div>

              ) : (
                // --- VIEW MODE ---
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '1rem', 
                  alignItems: 'center', 
                  justifyContent: 'space-between' 
                }}>
                  
                  {/* Text Area: CRITICAL FIX */}
                  {/* 'minWidth: 0' and 'width: 100%' ensures the flex child shrinks properly */}
                  <div style={{ flex: '1 1 200px', minWidth: '0', width: '100%' }}>
                    <div style={{ 
                      fontWeight: '600', color: '#1f2937', fontSize: '1rem', 
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      maxWidth: '100%' 
                    }}>
                      {file.file_name}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      <span style={{fontWeight:'600', color:'#003366'}}>{file.subjects?.name}</span> 
                      <span style={{color:'#ccc'}}>|</span> 
                      <span style={{fontWeight:'600', color:'#4b5563'}}>{file.category}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                    <button 
                      onClick={() => startEditing(file)}
                      className="btn"
                      style={{ 
                        backgroundColor: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe',
                        padding: '0.4rem 0.8rem', fontSize: '0.85rem', borderRadius: '6px'
                      }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(file.id, file.file_url)}
                      disabled={deleting === file.id}
                      className="btn"
                      style={{ 
                        backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca',
                        padding: '0.4rem 0.8rem', fontSize: '0.85rem', borderRadius: '6px'
                      }}
                    >
                      {deleting === file.id ? '...' : 'Delete'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filteredFiles.length === 0 && <p style={{textAlign: 'center', color: '#888'}}>No files found.</p>}
        </div>
      )}
    </main>
  )
}
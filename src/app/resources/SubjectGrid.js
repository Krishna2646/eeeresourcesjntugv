"use client"

import Link from 'next/link'

function SubjectCard({ subject }) {
  // Color Logic
  const level = subject.level || 1;
  const styles = {
    1: { bg: '#f0fdf4', text: '#16a34a' }, // Green
    2: { bg: '#eff6ff', text: '#2563eb' }, // Blue
    3: { bg: '#fff1f2', text: '#e11d48' }, // Red
  }[level];

  return (
    <Link 
      href={`/subjects/${subject.id}`}
      className="feature-card"
      style={{ 
        backgroundColor: styles.bg, 
        borderRadius: '12px', // Slightly smaller radius for a list look
        padding: '1.0rem',   // Compact padding
        display: 'flex',
        alignItems: 'center', // Vertically center content
        justifyContent: 'space-between',
        minHeight: '80px',    // Reduced height (was 140px)
        position: 'relative',
        boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
        border: '1px solid rgba(0,0,0,0.02)'
      }}
    >
      {/* Title Area */}
      <div style={{ paddingRight: '10px' }}>
        <h3 style={{ 
          fontSize: '1rem', 
          fontWeight: '700', 
          color: '#1f2937', 
          margin: 0, 
          lineHeight: '1.0' 
        }}>
          {subject.name}
        </h3>
      </div>

      {/* Right Arrow Icon (Replaces "Open Folder" text) */}
      <div style={{ 
        color: styles.text, 
        display: 'flex', 
        alignItems: 'center',
        opacity: 0.8 
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </div>
    </Link>
  )
}

export default function SubjectGrid({ subjects }) {
  return (
    <div style={{ 
      display: 'grid', 
      // On mobile (<560px), this forces 1 column (List View).
      // On desktop, it expands to multiple columns.
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
      gap: '1rem' 
    }}>
      {subjects.length > 0 ? (
        subjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))
      ) : (
        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '2rem', color: '#666' }}>
          <p>No subjects found.</p>
        </div>
      )}
    </div>
  )
}
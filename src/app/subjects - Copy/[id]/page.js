import { supabase } from '../../../lib/supabase'
import Link from 'next/link'

// --- 1. DYNAMIC SEO TITLE ---
export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const subjectID = resolvedParams.id

  const { data: subject } = await supabase
    .from('subjects')
    .select('name')
    .eq('id', subjectID)
    .single()

  return {
    title: subject ? `${subject.name} | JNTU-GV Resources` : 'Subject Not Found',
    description: `Download PDF notes, previous question papers, and lab manuals for ${subject?.name}.`,
  }
}

export const revalidate = 0

// --- SVG ICONS ---
const PdfIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="file-icon" style={{color: '#ef4444'}}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 2H7a2 2 0 00-2 2v15a2 2 0 002 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-6 4h6m-6-8h6" />
  </svg>
)

const DefaultIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="file-icon" style={{color: '#6b7280'}}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

// --- INTERNAL HEADER COMPONENT (No Import Needed) ---
function PageHeader({ title, subtitle, parentLink = "/" }) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <Link href={parentLink} style={{ 
        display: 'inline-flex', alignItems: 'center', gap: '5px',
        color: '#6b7280', fontWeight: '600', marginBottom: '1rem', fontSize: '0.9rem',
        textDecoration: 'none'
      }}>
        <span>&larr;</span> Back
      </Link>
      
      <h1 style={{ 
        fontSize: '2.5rem', fontWeight: '800', color: '#111827',
        marginBottom: '0.5rem', lineHeight: 1.2
      }}>
        {title}
      </h1>

      {subtitle && (
        <p style={{ color: '#4b5563', fontSize: '1.1rem', maxWidth: '700px', lineHeight: 1.6 }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default async function SubjectPage({ params }) {
  const resolvedParams = await params
  const subjectID = resolvedParams.id

  // 1. Fetch Subject Details
  const { data: subject } = await supabase
    .from('subjects')
    .select('name')
    .eq('id', subjectID)
    .single()

  // 2. Fetch Resources
  const { data: resources } = await supabase
    .from('resources')
    .select('*')
    .eq('subject_id', subjectID)
    .order('created_at', { ascending: false })

  // 3. Group by Category
  const grouped = resources?.reduce((acc, file) => {
    const cat = file.category || 'Uncategorized'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(file)
    return acc
  }, {}) || {}

  // Standard Sort Order
  const categoryOrder = ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Textbooks", "Lab Manuals", "Previous Papers", "Uncategorized"]
  
  const sortedCategories = Object.keys(grouped).sort((a, b) => {
    return categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  })

  return (
    <main className="page-container">
      
      {/* Use the Internal Header */}
      <PageHeader 
        title={subject?.name || "Loading..."} 
        subtitle="Access notes, assignments, and references below."
        parentLink="/resources"
      />

      {/* Content Area */}
      {resources?.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
          <p>No files uploaded for this subject yet.</p>
        </div>
      ) : (
        <div>
          {sortedCategories.map((category) => (
            <div key={category}>
              
              <h3 className="category-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
                {category}
              </h3>

              <div className="file-grid">
                {grouped[category].map((file) => (
                  <a 
                    key={file.id} 
                    href={file.file_url} 
                    target="_blank" 
                    className="file-card"
                  >
                    <div className="file-preview">
                       {file.file_type?.includes('pdf') || file.file_name?.endsWith('.pdf') 
                         ? <PdfIcon /> 
                         : <DefaultIcon />
                       }
                    </div>

                    <div className="file-info">
                      <span className="file-name" title={file.file_name}>
                        {file.file_name}
                      </span>
                      <span className="file-meta">
                        {file.file_type || 'FILE'}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
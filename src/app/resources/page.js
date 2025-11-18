import { supabase } from '../../lib/supabase'
import Link from 'next/link'
import SubjectGrid from './SubjectGrid'

export const revalidate = 0 

export default async function ResourcesPage({ searchParams }) {
  // 1. Get the search query
  const resolvedParams = await searchParams
  const query = resolvedParams?.q || ''

  let subjects = []
  let error = null

  // 2. Build the Database Query
  let dbQuery = supabase
    .from('subjects')
    .select('id, name, level')
    .order('level', { ascending: true })

  // 3. If there is a search term, add the filter
  if (query) {
    // 'ilike' is Case Insensitive. '%query%' matches anywhere in the name.
    dbQuery = dbQuery.ilike('name', `%${query}%`)
  }

  // 4. Execute the query
  const result = await dbQuery
  subjects = result.data
  error = result.error

  if (error) {
    return <div className="container" style={{paddingTop: '2rem'}}>Error loading subjects.</div>
  }

  return (
    <main className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/" style={{ 
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '40px', height: '40px', borderRadius: '50%',
          backgroundColor: 'white', border: '1px solid #e5e7eb',
          color: '#374151', marginBottom: '1.5rem',
          boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
          textDecoration: 'none'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </Link>
        
        <h1 style={{ 
          // CHANGE IS HERE: clamp(min, ideal, max) makes it responsive
          fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', 
          fontWeight: '800', 
          color: '#111827', 
          marginBottom: '0.5rem' 
        }}>
          {query ? `Results for "${query}"` : " Resources"}
        </h1>
        <p style={{ color: '#4b5563', fontSize: '1.1rem', maxWidth: '600px' }}>
          {query 
             ? `Found ${subjects?.length || 0} subjects matching your search.`
             : ""
          }
        </p>
      </div>

      {/* Pass the results to the Grid */}
      <SubjectGrid subjects={subjects || []} />
      
    </main>
  )
}
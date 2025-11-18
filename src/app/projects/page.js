import Link from 'next/link'

export const metadata = {
  title: 'Project Ideas | eeeresources jntugv',
  description: 'Innovative project ideas for EEE students.',
}

export default function ProjectsPage() {
  return (
    <main className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', textAlign: 'center' }}>
      
      <div style={{ 
        maxWidth: '600px', margin: '0 auto', background: 'white', 
        padding: '3rem', borderRadius: '20px', border: '1px solid #e5e7eb',
        boxShadow: '0 10px 30px rgba(0,0,0,0.03)' 
      }}>
        {/* Lightbulb Icon */}
        <div style={{ 
          width: '80px', height: '80px', background: '#f0fdf4', borderRadius: '50%', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto', color: '#16a34a'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="9" y1="18" x2="15" y2="18"></line>
            <line x1="10" y1="22" x2="14" y2="22"></line>
            <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 12 3a4.65 4.65 0 0 0-4.5 8.5c.75.75 1.23 1.51 1.4 2.5h6.18z"></path>
          </svg>
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#1f2937', marginBottom: '1rem' }}>
          Ideas Brewing...
        </h1>
        
        <p style={{ color: '#6b7280', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
          We are currently compiling a list of innovative Mini and Major project ideas for EEE students. 
          Check back soon for circuit diagrams, code snippets, and inspiration!
        </p>

        <Link href="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          Back to Home
        </Link>
      </div>

    </main>
  )
}
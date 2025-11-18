import Link from 'next/link'

export const metadata = {
  title: 'Events | eeeresources jntugv',
  description: 'Upcoming campus events.',
}

export default function EventsPage() {
  return (
    <main className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', textAlign: 'center' }}>
      
      <div style={{ 
        maxWidth: '600px', margin: '0 auto', background: 'white', 
        padding: '3rem', borderRadius: '20px', border: '1px solid #e5e7eb',
        boxShadow: '0 10px 30px rgba(0,0,0,0.03)' 
      }}>
        <div style={{ 
          width: '80px', height: '80px', background: '#fff1f2', borderRadius: '50%', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto', color: '#e11d48'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#1f2937', marginBottom: '1rem' }}>
          Events Coming Soon
        </h1>
        
        <p style={{ color: '#6b7280', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
          We are working on a calendar to track all workshops, fests, and guest lectures at JNTU-GV. Stay tuned!
        </p>

        <Link href="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          Back to Home
        </Link>
      </div>

    </main>
  )
}
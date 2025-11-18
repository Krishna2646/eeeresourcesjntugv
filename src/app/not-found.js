import Link from 'next/link'

export const metadata = {
  title: 'Page Not Found | eeeresources jntugv',
}

export default function NotFound() {
  return (
    <main className="container" style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      
      {/* 404 Illustration (SVG) */}
      <div style={{ marginBottom: '2rem' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="#e5e7eb" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="9" y1="15" x2="15" y2="15"></line>
          <line x1="10" y1="12" x2="10" y2="12.01"></line>
          <line x1="14" y1="12" x2="14" y2="12.01"></line>
        </svg>
      </div>

      <h1 style={{ fontSize: '4rem', fontWeight: '800', color: '#003366', lineHeight: '1', marginBottom: '1rem' }}>
        404
      </h1>
      
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
        Oops! Page Not Found
      </h2>
      
      <p style={{ color: '#6b7280', fontSize: '1.1rem', maxWidth: '500px', marginBottom: '2rem', lineHeight: '1.6' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <Link href="/" className="btn btn-primary" style={{ textDecoration: 'none', padding: '0.8rem 2rem', fontSize: '1rem' }}>
        Back to Homepage
      </Link>

    </main>
  )
}
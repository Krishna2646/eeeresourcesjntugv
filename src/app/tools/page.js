import Link from 'next/link'

export const metadata = {
  title: 'Tools | eeeresources jntugv',
  description: 'Essential software and calculators for EEE students.',
}

export default function ToolsPage() {
  return (
    <main className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', textAlign: 'center' }}>
      
      <div style={{ 
        maxWidth: '600px', margin: '0 auto', background: 'white', 
        padding: '3rem', borderRadius: '20px', border: '1px solid #e5e7eb',
        boxShadow: '0 10px 30px rgba(0,0,0,0.03)' 
      }}>
        {/* Gear Icon */}
        <div style={{ 
          width: '80px', height: '80px', background: '#faf5ff', borderRadius: '50%', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto', color: '#9333ea'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.39a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#1f2937', marginBottom: '1rem' }}>
          Digital Toolbox
        </h1>
        
        <p style={{ color: '#6b7280', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
          We are collecting useful online calculators, circuit simulators (like MATLAB/Simulink guides), 
          and software references for EEE students.
        </p>

        <Link href="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          Back to Home
        </Link>
      </div>

    </main>
  )
}
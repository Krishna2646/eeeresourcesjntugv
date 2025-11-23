import Link from 'next/link'

export const metadata = {
  title: 'About Us | eeeresources jntugv',
  description: 'Built by EEE students for EEE students.',
}

export default function AboutPage() {
  return (
    <main className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
      
      {/* --- HERO SECTION --- */}
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ 
          fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
          fontWeight: '800', 
          color: '#003366', 
          marginBottom: '1.5rem',
          lineHeight: '1.1'
        }}>
          Built by Students,<br /> For Students.
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: '1.7' }}>
          We are a team of EEE students from JNTU-GV dedicated to making academic life easier. 
          Our mission is simple: to create a central hub where knowledge, resources, and opportunities 
          are shared freely among peers.
        </p>
      </div>

      {/* --- HOW THE PLATFORM WORKS --- */}
      <section style={{ marginBottom: '5rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '700', color: '#003366', marginBottom: '2.5rem' }}>
          How It Works
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2rem' 
        }}>
          
          {/* 1. Uploads */}
          <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ width: '50px', height: '50px', background: '#eff6ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: '#2563eb' }}>
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>Who Uploads?</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              To maintain quality and safety, only verified <strong>Student Admins</strong> can upload files. We select ~2 representatives from each academic year (1st to 4th) to manage content for their batch.
            </p>
          </div>

           {/* 2. Downloads */}
           <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ width: '50px', height: '50px', background: '#f0fdf4', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: '#16a34a' }}>
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>Who Downloads?</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              <strong>Everyone!</strong> Any student can access, search, and download files instantly. No login or account creation is required for students to access resources.
            </p>
          </div>

           {/* 3. Admin Roles */}
           <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ width: '50px', height: '50px', background: '#fff1f2', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: '#e11d48' }}>
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>Becoming an Admin</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Admins are volunteers who help organize the library. If you are responsible and want to contribute to the EEE community, you can request to join the team.
            </p>
          </div>
        </div>
      </section>

      {/* --- MISSION CARD --- */}
      <div style={{ 
        background: '#003366', 
        borderRadius: '20px', 
        padding: '3rem 2rem', 
        textAlign: 'center',
        color: 'white',
        marginBottom: '4rem'
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>Our Philosophy</h2>
        <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto', opacity: 0.9, lineHeight: '1.8' }}>
          "Knowledge increases by sharing, not by saving." <br/>
          We built this platform to bridge the gap between seniors and juniors, ensuring that valuable notes and project ideas are passed down rather than lost.
        </p>
      </div>

      {/* --- WHAT YOU'LL FIND GRID --- */}
      <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '700', color: '#003366', marginBottom: '3rem' }}>
        What You'll Find Here
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        
        {/* Card 1: Notes */}
        <div style={{ background: '#eff6ff', padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>Academic Notes</h3>
          <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>Curated lecture notes and textbooks for every semester and unit.</p>
        </div>

        {/* Card 2: Projects */}
        <div style={{ background: '#f0fdf4', padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="19" x2="8" y2="21"/><line x1="16" y1="19" x2="16" y2="21"/><line x1="12" y1="19" x2="12" y2="21"/><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/></svg>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>Project Ideas</h3>
          <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>Innovative ideas and resources for mini and major projects.</p>
        </div>

        {/* Card 3: Events */}
        <div style={{ background: '#fff1f2', padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>Campus Events</h3>
          <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>Updates on workshops, fests, and guest lectures happening at JNTU-GV.</p>
        </div>

      </div>

      {/* --- FOOTER CTA --- */}
      <div style={{ marginTop: '5rem', textAlign: 'center', padding: '2rem', borderTop: '1px solid #eee' }}>
        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Have something to share? Want to join the team?</p>
        <Link href="mailto:contacteeevolve@gmail.com" style={{ color: '#003366', fontWeight: '700', textDecoration: 'underline' }}>
          Contact the Admin
        </Link>
      </div>

    </main>
  )
}
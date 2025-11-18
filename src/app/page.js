import Link from 'next/link'

function FeatureCard({ title, caption, linkText, colorTheme, imageUrl, href }) {
  // Define colors based on the theme prop
  const styles = {
    blue:   { bg: '#eff6ff', text: '#2563eb' },
    green:  { bg: '#f0fdf4', text: '#16a34a' },
    pink:   { bg: '#fff0f3', text: '#e11d48' },
    purple: { bg: '#faf5ff', text: '#9333ea' },
  }[colorTheme] || { bg: '#fff', text: '#000' };

  return (
    <Link 
      href={href} 
      className="feature-card" // <--- This class applies the CSS hover animation
      style={{ 
        backgroundColor: styles.bg, 
        borderRadius: '16px', 
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '180px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }}
    >
      {/* Image in the block */}
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={title} 
          style={{ 
            position: 'absolute', 
            right: '10px', 
            bottom: '10px', 
            width: '80px', 
            height: '80px', 
            objectFit: 'contain', 
            opacity: 0.6,
            pointerEvents: 'none'
          }} 
        />
      )}

      {/* Top Section: Title and Caption */}
      <div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', letterSpacing: '0.5px', marginBottom: '0.5rem', color: '#333' }}>
          {title}
        </h3>
        <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.4' }}>
          {caption}
        </p>
      </div>

      {/* Bottom Link Text */}
      <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', fontWeight: '600', color: styles.text }}>
        {linkText} <span>&rarr;</span>
      </div>
    </Link>
  )
}

export default function Home() {
  return (
    <main className="container" style={{ paddingTop: '1.5rem', paddingBottom: '4rem' }}>
      
      {/* --- Main Heading --- */}
      <h1 style={{ 
        fontSize: '2.0rem', 
        fontWeight: '800', 
        color: '#212529', 
        textAlign: 'center', 
        marginTop: '2rem', 
        marginBottom: '3rem' 
      }}>
        
      </h1>

      {/* --- FEATURE GRID --- */}
      <section style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', /* Adjusted for better desktop spacing */
        gap: '1.5rem' 
      }}>
        
        <FeatureCard 
          href="/resources"
          colorTheme="blue"
          title="Subjects"
          caption="View and download notes from seniors and peers."
          linkText="Explore Subjects"          
        />
          {/*imageUrl="/images/book-icon.png"*/}
        {/*
        <FeatureCard 
          href="#"
          colorTheme="pink"
          title="Events"
          caption="See upcoming workshops, guest lectures, and fests."
          linkText="View Events"
          imageUrl="/images/calendar-icon.png" 
        />*/}

        <FeatureCard 
          href="/projects"
          colorTheme="green"
          title="Project Ideas"
          caption="Discover inspiration and resources for your projects."
          linkText="Browse Projects"           
        />

        <FeatureCard 
          href="/tools"
          colorTheme="purple"
          title="Tools"
          caption="Essential software and utilities for EEE students."
          linkText="Check Tools" 
        />
      </section>
    </main>
  )
}
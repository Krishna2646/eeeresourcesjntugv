import Link from 'next/link'

export default function PageHeader({ title, subtitle, parentLink = "/" }) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Standard Back Button */}
      <Link href={parentLink} style={{ 
        display: 'inline-flex', alignItems: 'center', gap: '5px',
        color: '#6b7280', fontWeight: '600', marginBottom: '1rem', fontSize: '0.9rem',
        textDecoration: 'none'
      }}>
        <span>&larr;</span> Back
      </Link>
      
      {/* Standard Title Style */}
      <h1 style={{ 
        fontSize: '2.5rem', 
        fontWeight: '800', 
        color: '#111827',
        marginBottom: '0.5rem',
        lineHeight: 1.2
      }}>
        {title}
      </h1>

      {/* Standard Subtitle Style */}
      {subtitle && (
        <p style={{ color: '#4b5563', fontSize: '1.1rem', maxWidth: '700px', lineHeight: 1.6 }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
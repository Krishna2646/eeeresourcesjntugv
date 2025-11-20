import { Suspense } from 'react';
import "./globals.css";
import Navbar from './components/Navbar';

export const metadata = {
  title: 'All EEE Subjects | JNTU-GV Syllabus',
  description: 'Browse the complete list of JNTU-GV EEE subjects. Access notes for R23, R20, and R19 regulations grouped by semester.',
}

**For `src/app/events/page.js`:**
Add this at the top:
```javascript
export const metadata = {
  title: 'Campus Events & Fests | JNTU-GV',
  description: 'Stay updated with the latest workshops, tech fests, and guest lectures happening at JNTU-GV College of Engineering.',
}

**For `src/app/projects/page.js`:**
Add this at the top:
```javascript
export const metadata = {
  title: 'EEE Project Ideas | Mini & Major Projects',
  description: 'Innovative electrical engineering project ideas for B.Tech students. Circuit diagrams, code, and abstract references.',
}

---

### **Final Step: Redeploy**

1.  **Save all files.**
2.  **Push to GitHub:**
    ```bash
    git add .
    git commit -m "SEO: Add Structured Data and Rich Keywords"
    git push
    
**When will you see results?**
* Google takes **3-4 days** to re-crawl your site after you submit the sitemap.
* Once indexed, searching "JNTU-GV [Subject Name]" should start showing your site near the top because your titles match exactly what students search for!
export const metadata = {
  metadataBase: new URL('https://eeeresourcesjntugv.vercel.app'),
  verification: {
    google: 'f7ILGVqQ7FT-6HagtB0D4q5adGJ5WJuciN2P8zkwsfs',
  },
  title: {
    default: 'eeeresources jntugv | Official Student Portal',
    template: '%s | eeeresources jntugv',
  },
  description: 'The #1 resource hub for JNTU-GV EEE students. Download lecture notes, R23/R20 syllabus previous papers, lab manuals, and project ideas.',
  keywords: ['JNTU-GV', 'EEE', 'JNTU Vizianagaram', 'B.Tech Notes', 'R23 Syllabus', 'R20 Syllabus', 'Electrical Engineering Resources', 'JNTU-GV EEE Notes'],
  openGraph: {
    title: 'eeeresources jntugv',
    description: 'Access JNTU-GV EEE notes, papers, and resources instantly.',
    url: 'https://eeeresourcesjntugv.vercel.app',
    siteName: 'eeeresources jntugv',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'eeeresources jntugv',
    url: 'https://eeeresourcesjntugv.vercel.app',
    logo: 'https://eeeresourcesjntugv.vercel.app/favicon.ico',
    sameAs: [
      'https://jntugv.edu.in', 
    ],
    description: 'A student-driven platform sharing academic resources for EEE students at JNTU-GV.',
  }

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Suspense fallback={<div style={{height: '60px', background: 'white'}}></div>}>
          <Navbar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}

import { Suspense } from 'react';
import "./globals.css";
import Navbar from './components/Navbar';

export const metadata = {
  // 1. Base URL (Crucial for indexing)
  metadataBase: new URL('https://eeeresourcesjntugv.vercel.app'),

  // 2. Google Verification (This proves ownership)
  verification: {
    google: 'f7ILGVqQ7FT-6HagtB0D4q5adGJ5WJuciN2P8zkwsfs',
  },

  // 3. Standard SEO
  title: {
    default: 'eeeresources jntugv | Student Learning Platform',
    template: '%s | eeeresources jntugv',
  },
  description: 'A student-driven platform for EEE resources, events, and opportunities at JNTU-GV. Download notes, previous papers, and lab manuals.',
  keywords: ['JNTU-GV', 'EEE', 'Resources', 'Notes', 'JNTU Vizianagaram', 'Electrical Engineering'],

  // 4. Open Graph (Social Media Previews)
  openGraph: {
    title: 'eeeresources jntugv',
    description: 'Access EEE notes, papers, and resources instantly.',
    url: 'https://eeeresourcesjntugv.vercel.app',
    siteName: 'eeeresources jntugv',
    locale: 'en_US',
    type: 'website',
  },

  // 5. Robots (Allow Google to scan)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div style={{height: '60px', background: 'white'}}></div>}>
          <Navbar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}

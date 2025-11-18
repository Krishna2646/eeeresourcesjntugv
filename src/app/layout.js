import { Suspense } from 'react';
import "./globals.css";
import Navbar from './components/Navbar';

export const metadata = {
  title: 'eeeresources jntugv', 
  description: 'Student learning platform',
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
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // Keep Google out of your admin panel!
    },
    sitemap: 'https://eeeresourcesjntugv.vercel.app/sitemap.xml', // Change to your actual domain
  }
}
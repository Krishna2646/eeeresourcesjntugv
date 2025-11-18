import { supabase } from '../lib/supabase'

export default async function sitemap() {
  const baseUrl = 'https://eeeresourcesjntugv.vercel.app' // Change this to your actual Vercel domain

  // 1. Get all subjects
  const { data: subjects } = await supabase
    .from('subjects')
    .select('id')

  // 2. Create URLs for each subject
  const subjectUrls = subjects.map((subject) => ({
    url: `${baseUrl}/subjects/${subject.id}`,
    lastModified: new Date(),
  }))

  // 3. Add static pages
  const routes = ['', '/about', '/resources', '/events', '/projects', '/tools'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }))

  return [...routes, ...subjectUrls]
}
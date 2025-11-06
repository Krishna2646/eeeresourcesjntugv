import { supabase } from '../../../lib/supabase'
import Link from 'next/link'

export default async function SubjectPage({ params }) {

  // --- THIS IS THE FIX ---
  // As per the error, we "await" the params object to get its values
  const resolvedParams = await params
  const subjectID = resolvedParams.id
  // --- END OF FIX ---

  const revalidate = 0

  // This check is still important
  if (!subjectID) {
    return (
      <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-4xl font-bold">Error</h1>
        <p>No subject ID found.</p>
        <Link href="/" className="mt-4 text-blue-500 hover:underline">
          &larr; Back to all subjects
        </Link>
      </main>
    )
  }

  // --- 1. Get the Subject's Name ---
  const { data: subject, error: subjectError } = await supabase
    .from('subjects')
    .select('name')
    .eq('id', subjectID) 
    .single() 

  // --- 2. Get the Resources for that Subject ---
  const { data: resources, error: resourcesError } = await supabase
    .from('resources')
    .select('file_name, file_url, file_type')
    .eq('subject_id', subjectID) 

  // Handle any errors
  if (subjectError || resourcesError) {
    return <p>Error loading data: {subjectError?.message || resourcesError?.message}</p>
  }

  // If we are here, we have our data!
  return (
    <main className="flex min-h-screen flex-col items-center p-24">

      {/* Back button */}
      <div className="w-full max-w-4xl">
        <Link href="/" className="text-blue-500 hover:underline">
          &larr; Back to all subjects
        </Link>
      </div>

      {/* Page Title */}
      <h1 className="text-4xl font-bold mt-4">
        {subject.name}
      </h1>

      {/* List of Files */}
      <div className="mt-10 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold">Resources</h2>
        <ul className="mt-4 space-y-2">
          {resources.map((resource) => (
            <li key={resource.file_name} className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <span className="font-medium">{resource.file_name}</span>
                <span className="ml-4 text-sm text-gray-500">({resource.file_type})</span>
              </div>
              <a 
                href={resource.file_url} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}